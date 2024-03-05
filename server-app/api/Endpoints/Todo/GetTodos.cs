using api.ReusableHelpers.GlobalModels;
using Carter;
using Dapper;
using Npgsql;

namespace api.Endpoints.Todo;

public class GetTodos : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/todos", (NpgsqlDataSource ds) =>
        {
            var conn = ds.OpenConnection();
            var userId = 1;
            var sql = @"
SELECT t.id, t.title, t.description, t.duedate, t.priority, tt.tagid, tag.name
FROM todo_manager.todo t
JOIN todo_manager.todo_tag tt on t.id = tt.todoid
JOIN todo_manager.tag tag on tt.tagid = tag.id
WHERE t.userid = @userId;
";
            var todos = conn.Query<TodoWithTags>(sql, new {userId = userId}).ToList();
            conn.Close();
            return todos;

        });
    }
}