using System.Net;
using System.Net.NetworkInformation;
using Docker.DotNet;
using Docker.DotNet.Models;

namespace infrastructure;

public static class BuildDbContainer
{
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
        Task.Delay(4000).Wait();
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