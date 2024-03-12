using api.Boilerplate.EndpointFilters;
using api.Boilerplate.ReusableHelpers.GlobalModels;
using Carter;
using Dapper;
using Npgsql;

namespace api.Endpoints.Todo;

public class Create : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/todos", (CreateTodoRequestDto req, NpgsqlDataSource ds, HttpContext context) =>
        {
            var user = Boilerplate.ReusableHelpers.GlobalModels.User.FromHttpItemsPayload(context);
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
            req.Tags.ForEach(e =>
            {
                if (transaction.Connection!.Execute(
                        "insert into todo_manager.todo_tag (todoid, tagid) values (@TodoId, @TagId);",
                        new { TodoId = todo.Id, TagId = e.Id }) == 0)
                    throw new InvalidOperationException("Could not associate tag with todo");
            });
            todo.Tags = transaction.Connection!.Query<Boilerplate.ReusableHelpers.GlobalModels.Tag>(
                "select * from todo_manager.tag join todo_manager.todo_tag tt on tag.id = tt.tagid where tt.todoid = @id;",
                new { id = todo.Id }).ToList() ?? throw new InvalidOperationException("Could not retrieve tags");

            transaction.Commit();
            transaction.Connection!.Close();
            return todo;
        }).AddEndpointFilter<VerifyJwtAndSetPayloadAsHttpItem>();
    }
}

public class CreateTodoRequestDto
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime DueDate { get; set; }
    public int Priority { get; set; }
    public List<Boilerplate.ReusableHelpers.GlobalModels.Tag> Tags { get; set; } = default!;
}