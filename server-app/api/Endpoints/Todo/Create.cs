using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using api.Boilerplate.EndpointHelpers;
using api.Boilerplate.ReusableHelpers.GlobalModels;
using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Endpoints.Todo;

public class Create : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/todos", (
            [FromBody] CreateTodoRequestDto req,
            [FromServices] NpgsqlDataSource ds,
            HttpContext context) =>
        {
   
            var user = ApiHelper.TriggerJwtValidationAndGetUserDetails(context);
            ApiHelper.ValidateModel(req);
            var transaction = ds.OpenConnection().BeginTransaction();
            var todo = transaction.Connection!.QueryFirstOrDefault<TodoWithTags>(@"
insert into todo_manager.todo (title, description, duedate, userid, priority)
VALUES (@Title, @Description, @DueDate, @UserId, @Priority) returning *;
        ", new
                {
                    req.Title,
                    req.Description,
                    req.DueDate,
                    UserId = user.Id,
                    req.Priority
                }
            ) ?? throw new InvalidOperationException("Could not insert todo");
            if (req.Tags == null && req.Tags.Count > 0)
            {
                            req.Tags.ForEach(tag =>
                            {
                                if (transaction.Connection!.Execute(
                                        "insert into todo_manager.todo_tag (todoid, tagid) values (@TodoId, @TagId);",
                                        new { TodoId = todo.Id, TagId = tag.Id }) == 0)
                                    throw new InvalidOperationException("Could not associate tag with todo");
                            });
                           
            }


            transaction.Commit();
            transaction.Connection!.Close();

            using (var conn = ds.OpenConnection())
            {
                var tags = conn.Query<Boilerplate.ReusableHelpers.GlobalModels.Tag>(
                    @"
SELECT * FROM todo_manager.tag WHERE id IN (SELECT tagid FROM todo_manager.todo_tag WHERE todoid = @id);
",
                    new { id = todo.Id }).ToList() ?? throw new InvalidOperationException("Could not retrieve tags");
                var str = JsonSerializer.Serialize(tags);
                Console.WriteLine("HERE THEY ARE: "+str);
                todo.Tags = tags;
            }
            return todo;
        });
    }
}

public class CreateTodoRequestDto
{
    [NotNull][MinLength(1)]
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime DueDate { get; set; }
    public int Priority { get; set; }
    public List<Boilerplate.ReusableHelpers.GlobalModels.Tag> Tags { get; set; } = default!;
}