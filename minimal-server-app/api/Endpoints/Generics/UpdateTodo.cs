using Dapper;
using FastEndpoints;
using Npgsql;

namespace api.Endpoints;

sealed class UpdateTodoRequestDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public int Priority { get; set; }
    public int UserId { get; set; }
    public IEnumerable<Tag> Tags { get; set; }
}

sealed class UpdateTodoResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public int Priority { get; set; }
    public int UserId { get; set; }
    public IEnumerable<Tag> Tags { get; set; }
}

sealed class UpdateTodo(NpgsqlDataSource db) : Endpoint<UpdateTodoRequestDto, UpdateTodoResponseDto>
{
    public override void Configure()
    {
        Put("/api/todos/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(UpdateTodoRequestDto r, CancellationToken c)
    {
        await using var conn = await db.OpenConnectionAsync(c);
        var todo = await conn.QueryFirstAsync<UpdateTodoResponseDto>(@"
UPDATE todo_manager.todo SET title = @title, description = @description, duedate = @duedate, priority = @priority
WHERE id = @id RETURNING *;", r);
        await SendAsync(todo);
    }
}