using api.ReusableHelpers.GlobalValues;
using api.ReusableHelpers.Security;

namespace api.EndpointFilters;

public class VerifyJwtAndSetPayloadAsHttpItem(TokenService tokenService) : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var jwt = context.HttpContext.Request.Headers[StringConstants.JwtConstants.Authorization][0]!;
        var payload = tokenService.ValidateJwtAndReturnClaims(jwt);
        context.HttpContext.Items.Add(StringConstants.JwtConstants.Payload, payload);
        return await next(context);
    }
}