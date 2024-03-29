using api.Boilerplate.EndpointHelpers;
using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Endpoints.Tag;

public class RemoveTagToTodo : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/tags/{tagId}/removeFromTodo/{todoId}",
            (HttpContext context,
                [FromServices] NpgsqlDataSource dataSource,
                [FromRoute] int tagId,
                [FromRoute] int todoId) =>
            {
                ApiHelper.TriggerJwtValidationAndGetUserDetails(context);

                var sql = @"
DELETE FROM todo_manager.todo_tag
WHERE todoid = @todoId AND tagId = @tagId;
";
                using (var conn = dataSource.OpenConnection())
                {
                             var execution = conn.Execute(sql, new { todoId, tagId });
                                    if (execution == 0)
                                        throw new InvalidOperationException("Could not delete tag to todo.");
                }

                

                return new { success = true };
            });
    }
}