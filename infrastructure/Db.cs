using System.Net;
using System.Net.NetworkInformation;
using Dapper;
using Docker.DotNet;
using Docker.DotNet.Models;
using Npgsql;

namespace infrastructure;

public class Db(NpgsqlDataSource dataSource)
{
    public Todo CreateTodo(CreateTodoParams createTodoParams)
    {
        var sql = @$"
insert into todo_manager.todo (title, description, due_date)
VALUES (@Title, @Description, @DueDate) RETURNING *;
";
        using(var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<Todo>(sql, createTodoParams);
        }
    }

    public Todo UpdateTodo(UpdateTodoParams updateTodoParams)
    {
        var sql = $@"
UPDATE todo_manager.todo SET (title, description, due_date, completed) 
VALUES (@Title, @Description, @DueDate, @Completed) 
WHERE id = @Id RETURNING *;
";
        using(var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<Todo>(sql, updateTodoParams);
        }
    }

    public Todo GetTodo(int id)
    {
        var sql = "select * from todo_manager.todo where id = @id";
        using(var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<Todo>(sql, new { id });
        }
    }

    public bool DeleteTodo(int id)
    {
        var sql = "delete from todo_manager.todo where id = @id";
        using(var conn = dataSource.OpenConnection())
        {
            var success =  conn.Execute(sql, new { id }) == 1;
            if (!success) throw new InvalidOperationException("Could not delete");
            return success;
        }
    }

    public void RebuildDbSchema()
    {
        var sql = @"drop schema if exists todo_manager cascade;
create schema todo_manager;
create table todo_manager.todo (
  id serial primary key,
  title text not null,
  description text,
  created_date timestamp not null default (now() at time zone 'utc'),
    due_date timestamp not null default (now() at time zone 'utc') + interval '1 week',
  completed boolean not null default false
);

create table todo_manager.tag (
  id serial primary key,
  name text not null
);

create table todo_manager.todo_tag (
  todo_id int references todo_manager.todo(id),
  tag_id int references todo_manager.tag(id),
  primary key (todo_id, tag_id)
);

insert into todo_manager.todo (title, description, due_date, completed) values
  ('Buy groceries', 'Milk, eggs, bread', '2020-12-01', false),
  ('Clean the house', 'Vacuum, dust, mop', '2020-12-05', false),
  ('Do homework', 'Math, science, history', '2020-12-10', false),
  ('Go to the gym', 'Cardio, weights, stretching', '2020-12-15', false);
";
        using (var conn = dataSource.OpenConnection())
        {
            conn.Execute(sql);
        }
    }

    public static async Task StartDbInContainer()
    {
        try
        {
            string dockerSocketPath = GetDockerSocketPath();
            DockerClient client = new DockerClientConfiguration(new Uri(dockerSocketPath)).CreateClient();
            string imageName = "postgres:latest";
            string containerName = "postgres";

            IList<ImagesListResponse> images =
                await client.Images.ListImagesAsync(new ImagesListParameters { All = true });
            if (!images.Any(i => i.RepoTags.Contains(imageName)))
            {
                await client.Images.CreateImageAsync(
                    new ImagesCreateParameters { FromImage = imageName }, null, new Progress<JSONMessage>());
            }

            var existingContainer = await client.Containers.ListContainersAsync(
                new ContainersListParameters()
                {
                    All = true, Filters = new Dictionary<string, IDictionary<string, bool>>()
                    {
                        { "name", new Dictionary<string, bool>() { { containerName, true } } }
                    }
                });

            if (existingContainer.Any())
            {
                await StartExistingContainer(existingContainer, client);
            }
            else
            {
                await CreateContainerFromImage(client, imageName, containerName);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error during container operations: " + ex.Message);
            Console.WriteLine(ex.InnerException);
            Console.WriteLine(ex.StackTrace);
        }
    }

    private static async Task<bool> StartExistingContainer(IList<ContainerListResponse> existingContainer,
        DockerClient client)
    {
        var containerId = existingContainer[0].ID;
        Console.WriteLine("Existing PostgreSQL container found.");

        bool isPortInUse = IsPortInUse(5432);

        if (isPortInUse)
        {
            Console.WriteLine("Port 5432 is already in use. Stopping existing container.");
            await client.Containers.StopContainerAsync(containerId, new ContainerStopParameters());
        }
        else
        {
            Console.WriteLine("Port 5432 is available. Container will be reused.");
            await client.Containers.StartContainerAsync(containerId, new ContainerStartParameters());
            Console.WriteLine("PostgreSQL container started.");
            return true;
        }

        await client.Containers.StartContainerAsync(containerId, new ContainerStartParameters());

        Console.WriteLine("PostgreSQL container started.");
        return false;
    }

    private static async Task CreateContainerFromImage(DockerClient client, string imageName, string containerName)
    {
        var response = await client.Containers.CreateContainerAsync(new CreateContainerParameters
        {
            Image = imageName,
            Name = containerName,
            ExposedPorts = new Dictionary<string, EmptyStruct>
            {
                { "5432/tcp", new EmptyStruct() }
            },
            HostConfig = new HostConfig
            {
                PortBindings = new Dictionary<string, IList<PortBinding>>
                {
                    { "5432/tcp", new List<PortBinding> { new PortBinding { HostPort = "5432" } } }
                }
            },
            Env = new List<string>
            {
                "POSTGRES_DB=postgres",
                "POSTGRES_USER=postgres",
                "POSTGRES_PASSWORD=postgres"
            }
        });

        await client.Containers.StartContainerAsync(response.ID, new ContainerStartParameters());
        Task.Delay(2000).Wait();
    }

    private static string GetDockerSocketPath()
    {
        if (OperatingSystem.IsWindows()) return "npipe://./pipe/docker_engine";
        if (OperatingSystem.IsLinux())
            return "unix:///home/alex/.docker/desktop/docker.sock"; //"unix:///var/run/docker.sock"; 
        if (OperatingSystem.IsMacOS()) return "unix:///var/run/docker.sock";
        throw new PlatformNotSupportedException("Unsupported operating system");
    }

    private static bool IsPortInUse(int port)
    {
        IPGlobalProperties properties = IPGlobalProperties.GetIPGlobalProperties();
        IPEndPoint[] endpoints = properties.GetActiveTcpListeners();
        return endpoints.Any(endpoint => endpoint.Port == port);
    }
}