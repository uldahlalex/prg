using api.Boilerplate.EndpointFilters;
using Carter;
using Microsoft.VisualBasic;

namespace api.Endpoints.User;

public class Test : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/test", (int id, HttpContext context) =>
        {
            return context.Items;
        }).AddEndpointFilter<VerifyJwtAndSetPayloadAsHttpItem>();
    }
}