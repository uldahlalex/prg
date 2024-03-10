using System.Text.Json;
using api.DbHelpers;
using api.ReusableHelpers.GlobalValues;
using api.ReusableHelpers.Security;
using Carter;
using Microsoft.OpenApi.Models;

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
            .AddNpgsqlDataSource(Env.PG_CONN, cfg => cfg.EnableParameterLogging())
            .AddSingleton<DbScripts>()
            .AddSingleton<CredentialService>()
            .AddSingleton<TokenService>()
            .AddCarter()
            .AddCors()
            .AddEndpointsApiExplorer()
            .AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description =
                        "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = StringConstants.JwtConstants.Authorization,
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });


        if (Env.ASPNETCORE_ENVIRONMENT.Equals(StringConstants.Environments.Testing))
            builder.WebHost.UseUrls("http://localhost:9999");
        var app = builder.Build();
        app.UseSwagger().UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
        app.MapCarter();
        app.UseCors(options =>
        {
            options.SetIsOriginAllowed(_ => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
        return app;
    }
}