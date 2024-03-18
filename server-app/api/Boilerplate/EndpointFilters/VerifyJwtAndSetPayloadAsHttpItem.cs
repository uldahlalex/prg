using System.Security.Authentication;
using api.Boilerplate.ReusableHelpers.GlobalValues;
using api.Boilerplate.ReusableHelpers.Security;

namespace api.Boilerplate.EndpointFilters;

public class VerifyJwtAndSetPayloadAsHttpItem(TokenService tokenService) : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        try
        {
            var jwt = context.HttpContext.Request.Headers[StringConstants.JwtConstants.Authorization][0] ??
                      throw new InvalidOperationException("Could not find token in headers!");
            var payload = tokenService.ValidateJwtAndReturnClaims(jwt);
            context.HttpContext.Items.Add(StringConstants.JwtConstants.Payload, payload);
            return await next(context);
        }
        catch (Exception e)
        {
            Console.WriteLine("Failed to verify jwt and set payload as http item");
            Console.WriteLine(e.Message);
            Console.WriteLine(e.InnerException);
            Console.WriteLine(e.StackTrace);
            throw new AuthenticationException("Authentication error regarding token");
        }
    }
}