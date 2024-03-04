using System.Text.Json;
using api.Security;
using api.StaticHelpers;
using Carter;

using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models; //add this


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
        //
        //
        // if (!Env.ASPNETCORE_ENVIRONMENT.Equals("Production") && !Env.SKIP_DB_CONTAINER_BUILDING.Equals("true"))
        // {
        //     Log.Information("Building DB in container...");
        //     BuildDbContainer.StartDbInContainer().Wait();
        // }
        //
        bld.Services
            .AddNpgsqlDataSource(Env.PG_CONN, cfg => cfg.EnableParameterLogging())
            //   .AddSingleton<DbScripts>()
            .AddSingleton<CredentialService>()
            .AddSingleton<TokenService>()
            .AddCarter()
            .AddEndpointsApiExplorer()
            .AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description =
                        "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
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
        
        
        
        
        if(Env.ASPNETCORE_ENVIRONMENT.Equals("Testing"))
            bld.WebHost.UseUrls("http://localhost:9999");

        var app = bld.Build();
        if (!Env.ASPNETCORE_ENVIRONMENT.Equals("Production"))
        {
          //  app.Services.GetService<DbScripts>()!.RebuildDbSchema();
          if (!Env.ASPNETCORE_ENVIRONMENT.Equals("Testing")) ;
          //     app.Services.GetService<DbScripts>()!.SeedDB();
        }

        app.MapGet("/do", () =>
        {
            return "hey";
        });
        app
            .UseSwagger()
        .UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));

        
        app.MapCarter();
        return app;
    }
}

//
// public class GlobalLogicMiddleware
// {
//     private readonly RequestDelegate _next;
//
//     public GlobalLogicMiddleware(RequestDelegate next)
//     {
//         _next = next;
//     }
//
//     public async Task InvokeAsync(HttpContext context)
//     {
//         var endpoint = context.GetEndpoint();
//         if (endpoint != null)
//         {
//             // Check if the endpoint has the 'AllowAnonymous' metadata
//             var allowAnonymous = endpoint.Metadata.GetMetadata<IAllowAnonymous>();
//             
//             if (allowAnonymous != null)
//             {
//
//                 Console.WriteLine("hey");
//                 // This endpoint allows anonymous access, so skip your custom authentication logic
//                 await _next(context);
//                 return;
//             }
//
//             Console.WriteLine("hwyayasddddddd");
//         }
//
//         // Custom authentication logic here...
//         // For example, checking a custom header or token and setting the context.User if authenticated
//
//         // Proceed to the next middleware (or endpoint)
//         await _next(context);
//     }
// }
