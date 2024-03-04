using System.Text.Json;
using api.Endpoints.CreateTodo;
using api.Security;
using api.StaticHelpers;
using FastEndpoints;
using FastEndpoints.Swagger;
using infrastructure;
using Serilog;

public class Program
{
    public static void Main()
    {
        var app = Startup();
        app.Run();
    }

    public static WebApplication Startup()
    {
        
        Console.WriteLine("BUILDING API WITH ENVIRONMENT: +"+JsonSerializer.Serialize(Environment.GetEnvironmentVariables()));

        var bld = WebApplication.CreateBuilder();

        Log.Logger = new LoggerConfiguration()
            .WriteTo.Console(
                outputTemplate: "\n{Timestamp:yyyy-MM-dd HH:mm:ss} [{Level}] {Message}{NewLine}{Exception}\n")
            .CreateLogger();
        if (!Env.ASPNETCORE_ENVIRONMENT.Equals("Production") && !Env.SKIP_DB_CONTAINER_BUILDING.Equals("true"))
        {
            Log.Information("Building DB in container...");
            BuildDbContainer.StartDbInContainer().Wait();
        }
            
        bld.Services
            .AddNpgsqlDataSource(Env.PG_CONN, cfg => cfg.EnableParameterLogging())
            .AddSingleton<DbScripts>()
            .AddSingleton<CredentialService>()
            .AddSingleton<TokenService>()
            .AddSingleton<CreateTodoQueries>()
            .AddFastEndpoints()
            .SwaggerDocument();
        if(Env.ASPNETCORE_ENVIRONMENT.Equals("Testing"))
            bld.WebHost.UseUrls("http://localhost:9999");

        var app = bld.Build();
        if (!Env.ASPNETCORE_ENVIRONMENT.Equals("Production"))
        {
            app.Services.GetService<DbScripts>()!.RebuildDbSchema();
            if(!Env.ASPNETCORE_ENVIRONMENT.Equals("Testing")) 
                app.Services.GetService<DbScripts>()!.SeedDB();
        }
            
        app.UseFastEndpoints()
            .UseSwaggerGen();
        Env.PrintInMemoryEnvironment();
        return app;
    }
}
