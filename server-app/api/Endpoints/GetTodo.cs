using FastEndpoints;
using infrastructure;
using infrastructure.DomainModels;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints;

public class GetTodoRequestDto
{
    [BindFrom(nameof(Id))]
    public int Id { get; set; }
}

public class GetTodo(Db db) : Endpoint<GetTodoRequestDto, Todo>
{
    public override void Configure()
    {
        Get("/api/todo/id");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(GetTodoRequestDto dto, CancellationToken ct)
    {

        await SendAsync(db.GetTodo(dto.Id), cancellation: ct);
    }
}
