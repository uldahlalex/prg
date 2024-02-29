using System.Text.Json;
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
        DbHelper.StartDbInContainer().Wait();
        bld.Services
            .AddNpgsqlDataSource(Env.PG_CONN, cfg => cfg.EnableParameterLogging())
            .AddSingleton<Db>()
            .AddFastEndpoints()
            .SwaggerDocument();

        var app = bld.Build();
        if (!Env.ASPNETCORE_ENVIRONMENT.Equals("Production"))
            app.Services.GetService<Db>()!.RebuildDbSchema();
        app.UseFastEndpoints()
            .UseSwaggerGen();
        Env.PrintInMemoryEnvironment();
        return app;
    }
}
