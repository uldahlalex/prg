using System.Text.Json;
using api;
using api.StaticHelpers;
using Dapper;
using FastEndpoints;
using FastEndpoints.Swagger;
using infrastructure;
using Npgsql;

public class Program
{
    public static void Main()
    {
        var app = Startup();
        app.Run();
    }

    public static WebApplication Startup()
    {
        Console.WriteLine("BUILDING API WITH ENVIRONMENT: +" +
                          JsonSerializer.Serialize(Environment.GetEnvironmentVariables()));
        var bld = WebApplication.CreateBuilder();
        BuildDbContainer.StartDbInContainer().Wait();


        bld.Services
            .AddNpgsqlDataSource(Env.PG_CONN, cfg => cfg.EnableParameterLogging())
            .AddFastEndpoints()
            .SwaggerDocument();
        if (Env.ASPNETCORE_ENVIRONMENT.Equals("Testing"))
            bld.WebHost.UseUrls("http://localhost:9999");
        var app = bld.Build();
        using (var conn = app.Services.GetService<NpgsqlDataSource>().OpenConnection())
        {
            conn.Execute(SqlScripts.Schema);
            conn.Execute(SqlScripts.Seed);
            conn.Close();
        }

        app.UseFastEndpoints()
            .UseSwaggerGen();
        return app;
    }
}