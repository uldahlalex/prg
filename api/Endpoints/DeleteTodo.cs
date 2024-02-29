using FastEndpoints;
using infrastructure;
using Microsoft.AspNetCore.Mvc;

public class DeleteTodoRequestDto
{
    [FromRoute]
    public int Id { get; set; }
}

public class DeleteTodo(Db db) : EndpointWithoutRequest<bool>
{
    public override void Configure()
    {
        Delete("/api/todo/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        db.DeleteTodo(Route<int>("id"));
        await SendAsync(true);
    }
}