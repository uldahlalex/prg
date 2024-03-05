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

                var conn = ds.OpenConnection();
                var tags = conn.Query<ReusableHelpers.GlobalModels.Tag>(@"
select * from todo_manager.tag where userid = 1;
").ToList();
                conn.Close();
                return tags;
            }
        );
    }
}