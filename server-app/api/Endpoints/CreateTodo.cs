using System.ComponentModel.DataAnnotations;
using FastEndpoints;
using infrastructure;
using infrastructure.DomainModels;

// public class CreateTodoRequestDto
// {
//     public string? Title { get; set; }
//     public string? Description { get; set; }
//     public DateTime? DueDate { get; set; }
// }

public class CreateTodo(Db db) : Endpoint<Todo, Todo>
{
    public override void Configure()
    {
        Post("/api/todo");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(Todo dto, CancellationToken c)
    {
        var todo = db.CreateTodo(dto);
        var links = db.LinkTodoAndTag(todo.Id, dto.Tags);
        var result = db.GetTodoWithTags(dto.Id);
        await SendAsync(result);
    }
}