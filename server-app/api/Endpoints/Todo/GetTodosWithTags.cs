using System.Runtime.CompilerServices;
using System.Text.Json;
using api.Boilerplate.EndpointFilters;
using api.Boilerplate.ReusableHelpers.GlobalModels;
using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Endpoints.Todo;



public class GetTodosWithTags : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/todos", async (
            [FromServices] NpgsqlDataSource ds,
            [FromQuery]string OrderBy,
        [FromQuery]string Direction,
        [FromQuery]int Limit,
            [FromQuery]int[] Tags,
            HttpContext context) =>
        {
            IEnumerable<dynamic> todos;
            await using (var con = ds.OpenConnection())
            {
                todos = con.Query(@$"
SELECT 
    t.id, 
    t.title, 
    t.description, 
    t.duedate, 
    t.iscompleted, 
    t.createdat, 
    t.priority, 
    t.userid,
    COALESCE(json_agg(json_build_object('Id', tag.id, 'Name', tag.name)) FILTER (WHERE tag.id IS NOT NULL), '[]') AS tags
FROM todo_manager.todo t
LEFT JOIN todo_manager.todo_tag tt ON t.id = tt.todoid
LEFT JOIN todo_manager.tag tag ON tt.tagid = tag.id
WHERE t.userid = @UserId and tag.id = ANY(@Tags)
GROUP BY t.id
ORDER BY t.{OrderBy} {Direction}
LIMIT {Limit};
", new 
                {
                    UserId = Boilerplate.ReusableHelpers.GlobalModels.User.FromHttpItemsPayload(context).Id,
                    Tags = Tags
                });
            }

            return todos.Select(row =>
            {
                var todo = new TodoWithTags
                {
                    Id = row.id,
                    Title = row.title,
                    Description = row.description,
                    DueDate = row.duedate,
                    IsCompleted = row.iscompleted,
                    CreatedAt = row.createdat,
                    Priority = row.priority,
                    UserId = row.userid,
                    Tags = System.Text.Json.JsonSerializer.Deserialize<List<Boilerplate.ReusableHelpers.GlobalModels.Tag>>(row.tags)
                };

                return todo;
            }).ToList();
        }).AddEndpointFilter<VerifyJwtAndSetPayloadAsHttpItem>();
    }
}