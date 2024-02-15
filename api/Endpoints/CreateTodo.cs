using FastEndpoints;
using infrastructure;
using infrastructure.Repositories;

public class CreateTodoRequestDto
{
    public string? Title { get; set; }
}

public class CreateTodo(ProductRepository repo) : Endpoint<CreateTodoRequestDto, Todo>
{
    public override void Configure()
    {
        Post("/api/product/create");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(CreateTodoRequestDto dto, CancellationToken c)
    {
        var resp =repo.CreateTodo(new CreateTodoParams() { });
        await SendAsync(resp);
    }
}