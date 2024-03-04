using Dapper;
using FastEndpoints;
using Npgsql;
using YamlDotNet.Core.Tokens;

namespace api.Endpoints;

sealed class CreateTodoRequestDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public int Priority { get; set; }
    public int UserId { get; set; }
    public IEnumerable<Tag> Tags { get; set; }
}

sealed class CreateTodoResponseDto
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
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
sealed class MyEndpoint(NpgsqlDataSource db) : Endpoint<CreateTodoRequestDto, CreateTodoResponseDto>
{
    public override void Configure()
    {
        Post("/api/todos");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CreateTodoRequestDto req, CancellationToken c)
    {
        // todo validate the dto uid is also the requester uid
        await using var conn = await db.OpenConnectionAsync(c);
        var todo = await conn.QueryFirstAsync<CreateTodoResponseDto>(@"
insert into todo_manager.todo (title, description, duedate, userid, priority) 
VALUES (@Title, @Description, @DueDate, @UserId, @Priority) returning *;", req);
        foreach (var tag in req.Tags) await conn.ExecuteAsync(@"
insert into todo_manager.todo_tag (todoid, tagid) values (@TodoId, @TagId);", new { TodoId = todo.Id, TagId = tag.Id });
        todo.Tags = req.Tags;
        await SendAsync(todo, cancellation: c);
    }
}