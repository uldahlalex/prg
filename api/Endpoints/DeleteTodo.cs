using FastEndpoints;
using infrastructure;

public class DeleteTodoRequestDto
{
    [BindFrom("id")]
    public int Id { get; set; }
}

public class DeleteTodo : Endpoint<DeleteTodoRequestDto, Todo>
{
    public override void Configure()
    {
        Delete("/api/todo/id");
        AllowAnonymous();
    }

    public override async Task HandleAsync(DeleteTodoRequestDto req, CancellationToken ct)
    {
        await SendOkAsync(new Todo(), ct);
    }
}
