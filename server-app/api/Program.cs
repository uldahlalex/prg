using System.Text.Json;
using api.Boilerplate;
using api.Boilerplate.DbHelpers;
using api.Boilerplate.ReusableHelpers.GlobalValues;
using api.Boilerplate.ReusableHelpers.Security;
using Carter;

namespace api;

public class Program
{
    public static async Task Main()
    {
        var app = await Startup();
        if (!Env.ASPNETCORE_ENVIRONMENT.Equals(StringConstants.Environments.Production))
        {
            app.Services.GetService<DbScripts>()!.RebuildDbSchema();
            app.Services.GetService<DbScripts>()!.SeedDB();
        }

        app.Run();
    }

    public static async Task<WebApplication> Startup()
    {
        Console.WriteLine("BUILDING API WITH ENVIRONMENT: +" +
                          JsonSerializer.Serialize(Environment.GetEnvironmentVariables()));
        if (!Env.ASPNETCORE_ENVIRONMENT.Equals(StringConstants.Environments.Production) &&
            !Env.SKIP_DB_CONTAINER_BUILDING.Equals("true"))
            await BuildDbContainer.StartDbInContainer();

        var builder = WebApplication.CreateBuilder();
        builder.Services
            .AddProblemDetails()
            .AddNpgsqlDataSource(Env.PG_CONN, cfg => cfg.EnableParameterLogging())
            .AddSingleton<DbScripts>()
            .AddSingleton<CredentialService>()
            .AddSingleton<TokenService>()
            .AddCarter()
            .AddCors()
            .AddEndpointsApiExplorer()
            .AddSwaggerDefinition();
        builder.Services.AddHostedService<SwaggerJsonGeneratorService>();

        if (Env.ASPNETCORE_ENVIRONMENT.Equals(StringConstants.Environments.Testing))
            builder.WebHost.UseUrls("http://localhost:9999");
        var app = builder.Build();
        app.UseCustomExceptionHandling()
            .UseSwagger()
            .UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1"); })
            .UseCors(options =>
            {
                options.SetIsOriginAllowed(_ => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        app.MapCarter();

        return app;
    }
}