using api.Boilerplate.EndpointFilters;
using api.Boilerplate.ReusableHelpers.GlobalModels;
using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Endpoints.Tag;

public class CreateTagRequestDto
{
    public string Name { get; set; }
}

public class Createtag : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/tags", (
            [FromBody] CreateTagRequestDto dto,
            HttpContext context,
            [FromServices] NpgsqlDataSource ds) =>
        {
            using (var conn = ds.OpenConnection())
            {
                var userId = User.FromHttpItemsPayload(context).Id;

                var insertedTag = conn.QueryFirst<Boilerplate.ReusableHelpers.GlobalModels.Tag>(
                    "insert into todo_manager.tag (name, userid) values (@name, @userid) returning *;",
                new {
                    name = dto.Name,
                    userid = userId
                }) ?? throw new InvalidOperationException("Could not create tag");
                conn.Close();
                return insertedTag;
            }
        }).AddEndpointFilter<VerifyJwtAndSetPayloadAsHttpItem>();
    }
}