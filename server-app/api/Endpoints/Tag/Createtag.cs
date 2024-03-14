using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Endpoints.Tag;

public class CreateTagRequestDto
{
    /// <summary>
    /// 
    /// </summary>
    /// <example>Bob</example>
    public string Name { get; set; }
    /// <summary>
    /// 
    /// </summary>
    /// </example>1</example>
    public int userId { get; set; }
}

public class Createtag : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/tags", (
            [FromBody] CreateTagRequestDto dto,
            [FromServices] NpgsqlDataSource ds,
            [FromHeader]string Authorization ) =>
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