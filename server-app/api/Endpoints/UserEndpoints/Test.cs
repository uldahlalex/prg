using api.Boilerplate.EndpointFilters;
using Carter;

namespace api.Endpoints.UserEndpoints;

public class Test : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/test", (int id, HttpContext context) => { return context.Items; })
            .AddEndpointFilter<VerifyJwtAndSetPayloadAsHttpItem>();
    }
}