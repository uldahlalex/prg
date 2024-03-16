using System.Text.Json;
using api.Boilerplate.DbHelpers;
using api.Boilerplate.ReusableHelpers.GlobalValues;
using api.Boilerplate.ReusableHelpers.Security;
using Carter;
using Hellang.Middleware.ProblemDetails;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Extensions;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;

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
        if (Env.ASPNETCORE_ENVIRONMENT != StringConstants.Environments.Production)
        {
            
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
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
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
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                }); 
                c.SwaggerDoc( "v1", new OpenApiInfo { Title = "My API", Version = "v1" });

            }); 
        builder.Services.AddHostedService<SwaggerJsonGeneratorService>();



        if (Env.ASPNETCORE_ENVIRONMENT.Equals(StringConstants.Environments.Testing))
            builder.WebHost.UseUrls("http://localhost:9999");
        var app = builder.Build();
        app.UseSwagger().UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        });
        app.MapCarter();
        app.UseCors(options =>
        {
            options.SetIsOriginAllowed(_ => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
        // app.UseExceptionHandler(appError =>
        // {
        //     appError.Run(async context =>
        //     {
        //         context.Response.StatusCode = 500; // Default to internal server error
        //         context.Response.ContentType = "application/json";
        //
        //         var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
        //         if (contextFeature != null)
        //         {
        //             // Check if the exception is an AuthenticationException
        //             if (contextFeature.Error is System.Security.Authentication.AuthenticationException)
        //             {
        //                 context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        //             }
        //             // You can log the error or set a response body here
        //         }
        //     });
        // });
        app.UseExceptionHandler(exceptionHandlerApp 
            => exceptionHandlerApp.Run(async context 
                => await Results.Problem()
                    .ExecuteAsync(context)));

        app.UseStatusCodePages();


        return app;
    }
}