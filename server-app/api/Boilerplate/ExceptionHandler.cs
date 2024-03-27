using System.Security.Authentication;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;

namespace api.Boilerplate;

public static class ExceptionHandler
{
    public static WebApplication UseCustomExceptionHandling(this WebApplication app)
    {
        app.UseExceptionHandler(appError =>
        {
            appError.Run(async context =>
            {
                var env = context.RequestServices.GetRequiredService<IWebHostEnvironment>();
                context.Response.ContentType = "application/json";
                var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                if (contextFeature != null)
                {
                    var exception = contextFeature.Error;
                    string message;
                    int statusCode;
                    if (exception is AuthenticationException)
                    {
                        statusCode = StatusCodes.Status401Unauthorized;
                        message = exception.Message;
                    }
                    else if (exception is ValidationException ||
                             exception is System.ComponentModel.DataAnnotations.ValidationException)
                    {
                        statusCode = StatusCodes.Status400BadRequest;
                        message = exception.Message;
                    }
                    else
                    {
                        statusCode = StatusCodes.Status500InternalServerError;
                        message = env.IsDevelopment() ? exception.Message : "An unexpected error occurred.";
                    }

                    context.Response.StatusCode = statusCode;
                    await context.Response.WriteAsJsonAsync(new
                    {
                        message
                    });
                }
            });
        });
        return app;
    }
}