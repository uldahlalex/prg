using api.Boilerplate.EndpointFilters;
using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Endpoints.Tag;

public class RemoveTagToTodo : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/todos/{todoId}/addTag/{tagId}",
            (HttpContext context,
                [FromServices] NpgsqlDataSource dataSource,
                [FromRoute] int tagId,
                [FromRouteAttribute] int todoId) =>
            {
                var sql = @"
DELETE FROM todo_manager.todo_tag
WHERE todoid = @todoId AND tagid = @tagId;
";
                using var conn = dataSource.OpenConnection();
                {
                    var execution = conn.Execute(sql, new { todoId, tagId });
                    if (execution == 0)
                        throw new InvalidOperationException("Could not delete tag to todo.");
                }

                return new { success = true };
            }).AddEndpointFilter<VerifyJwtAndSetPayloadAsHttpItem>();
    }
}