using api.Boilerplate.EndpointFilters;
using Carter;
using Dapper;
using Npgsql;

namespace api.Endpoints.Tag;

public class GetTags : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/tags", (NpgsqlDataSource ds) =>
            {
                List<Boilerplate.ReusableHelpers.GlobalModels.Tag> tags;
                using (var conn = ds.OpenConnection())
                {
                    tags = conn.Query<Boilerplate.ReusableHelpers.GlobalModels.Tag>(@"
select * from todo_manager.tag where userid = 1;
")
                        .ToList();
                    conn.Close();
                }

                return tags;
            }
        ).AddEndpointFilter<VerifyJwtAndSetPayloadAsHttpItem>();
    }
}