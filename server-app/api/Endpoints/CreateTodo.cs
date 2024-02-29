using System.ComponentModel.DataAnnotations;
using FastEndpoints;
using infrastructure;

public class CreateTodoRequestDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime? DueDate { get; set; }
}

public class CreateTodo(Db db) : Endpoint<CreateTodoRequestDto, Todo>
{
    public override void Configure()
    {
        Post("/api/product/create");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(CreateTodoRequestDto dto, CancellationToken c)
    {
        var resp =db.CreateTodo(new CreateTodoParams()
        {
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
        });
        await SendAsync(resp);
    }
}