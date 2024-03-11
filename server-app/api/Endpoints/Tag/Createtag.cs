using Carter;
using Dapper;
using Npgsql;

namespace api.Endpoints.Tag;

public class CreateTagRequestDto
{
    public string Name { get; set; }
    public int userId { get; set; }
}

public class Createtag : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/tags", (CreateTagRequestDto dto, NpgsqlDataSource ds) =>
        {
            using (var conn = ds.OpenConnection())
            {
                var insertedTag = conn.QueryFirst<Boilerplate.ReusableHelpers.GlobalModels.Tag>(
                    "insert into todo_manager.tag (name, userid) values (@name, @userid) returning *;",
                    dto) ?? throw new InvalidOperationException("Could not create tag");
                conn.Close();
                return insertedTag;
            }
        });
    }
}