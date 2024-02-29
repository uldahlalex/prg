using FastEndpoints;
using infrastructure;


public class UpdateTodoRequestDto
{
    [BindFrom(nameof(Id))]
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
}

public class UpdateTask(Db db) : Endpoint<UpdateTodoRequestDto, Todo>
{
    public override void Configure()
    {
        Put("/api/todo/id");
        AllowAnonymous();
    }

    public override async Task HandleAsync(UpdateTodoRequestDto req, CancellationToken ct)
    {
        // Your handling logic here
        await SendOkAsync(db.UpdateTodo(new UpdateTodoParams()
        {
            Id = req.Id,
            Title = req.Title,
            Description = req.Description,
            DueDate = req.DueDate,
        }));
    }
}