using api.EndpointFilters;
using Carter;

namespace api.Endpoints.User;

public class Test : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/test", (int id, HttpContext context) =>
        {
            return context.Items;
        }).AddEndpointFilter<VerifyJwtAndSetUserId>();
    }
}