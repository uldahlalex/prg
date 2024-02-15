using FastEndpoints;
using infrastructure;


public class UpdateTodoRequestDto
{
    [BindFrom(nameof(Id))]
    public int Id { get; set; }
}

public class UpdateTask : Endpoint<UpdateTodoRequestDto, Todo>
{
    public override void Configure()
    {
        Put("/api/todo/id");
        AllowAnonymous();
    }

    public override async Task HandleAsync(UpdateTodoRequestDto req, CancellationToken ct)
    {
        // Your handling logic here
        await SendOkAsync(new Todo(), ct);
    }
}