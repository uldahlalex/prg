using Carter;
using Dapper;
using Npgsql;

namespace api.Endpoints.Tag;

public class Createtag : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/tags", (string tag, NpgsqlDataSource ds) =>
        {
            using var conn = ds.OpenConnection();
            var insertedTag = conn.QueryFirst<ReusableHelpers.GlobalModels.Tag>("insert into todo_manager.tag (name) values (@tag) returning *;", 
                new { tag = tag }) ?? throw new InvalidOperationException("Could not create tag");
            conn.Close();
            return insertedTag;
        });
    }
}