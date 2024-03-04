using FastEndpoints;

namespace api.Endpoints.CreateTodo;

public sealed class CreateTodoRequestDto
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Priority { get; set; }
    public DateTime DueDate { get; set; } = default!;
    public IEnumerable<Tag> Tags { get; set; } = [];
    
    
}

public class CreateTodo(CreateTodoQueries db) : Endpoint<CreateTodoRequestDto, ResponseDto<TodoWithTags>>
{
    public override void Configure()
    {
        Post("/api/todo");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CreateTodoRequestDto req, CancellationToken c)
    {
        var userId = 1;
        TodoWithTags todo = db.CreateTodo(new CreateTodoQueryParams(req, userId));

        await SendAsync(new ResponseDto<TodoWithTags>(todo));
    }
}