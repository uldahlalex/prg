using System.Text.Json;
using api.ReusableHelpers.Security;

namespace api.EndpointFilters;

public class VerifyJwtAndSetUserId(TokenService tokenService) : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        Console.WriteLine(JsonSerializer.Serialize(context.HttpContext.Request.Headers.ToList()));
   
         var jwt = context.HttpContext.Request.Headers["jwt"][0]!;
         var payload = tokenService.ValidateJwtAndReturnClaims(jwt);

        context.HttpContext.Items.Add("payload", context.HttpContext.Request.Headers);
        // Execute the endpoint
        var result = await next(context);


        return result;
        
 
    }
}