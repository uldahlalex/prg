using System.Text.Json;
using api.Security;
using Carter;

namespace api.Endpoints.User;

public class Test : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/test", (int id, HttpContext context) =>
        {
            return context.Items;
        }).AddEndpointFilter<ExecutionTimeFilter>();
    }
}


public class ExecutionTimeFilter(TokenService tokenService) : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        Console.WriteLine(JsonSerializer.Serialize(context.HttpContext.Request.Headers.ToList()));
        // Start timing
      //  var jwt = context.HttpContext.Request.Headers["jwt"][0]!;
      //  var payload = tokenService.ValidateJwtAndReturnClaims(jwt);

            context.HttpContext.Items.Add("payload", context.HttpContext.Request.Headers);
            // Execute the endpoint
            var result = await next(context);


            return result;
        
 
    }
}