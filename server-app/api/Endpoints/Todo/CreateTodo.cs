using System.Data;
using Dapper;
using FastEndpoints;
using FluentValidation;
using Npgsql;
using NSwag.AspNetCore;

namespace api.Endpoints.CreateTodo;

public sealed class CreateTodoRequestDto
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int Priority { get; set; }
    public DateTime DueDate { get; set; } = default!;
    public List<Tag> Tags { get; set; } = [];
}

public class CreateTodo(NpgsqlDataSource ds) : Endpoint<CreateTodoRequestDto, ResponseDto<TodoWithTags>>
{
    public override void Configure()
    {
        Post("/api/todo");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CreateTodoRequestDto req, CancellationToken c)
    {
        var transaction = ds.OpenConnection().BeginTransaction();
        
        TodoWithTags todo = transaction.Connection!.QueryFirstOrDefault<TodoWithTags>(@"
insert into todo_manager.todo (title, description, duedate, userid, priority)
VALUES (@Title, @Description, @DueDate, @UserId, @Priority) returning *;
        ", new {}) ?? throw new InvalidOperationException("Could not insert todo");
        todo.Tags = req.Tags;
        todo.Tags.ForEach(e =>
        {
            if (transaction.Connection!.Execute("insert into todo_manager.todo_tag (todoid, tagid) values (@TodoId, @TagId);", new { TodoId = todo.Id, TagId = e.Id }) == 0)
                throw new InvalidOperationException("Could not associate tag with todo");
        });
        
        transaction.Commit();
        transaction.Connection!.Close();
        await SendAsync(new ResponseDto<TodoWithTags>(todo));
    }
}

public class CreateTodoRequestDtoValidator : Validator<CreateTodoRequestDto>
{
    public CreateTodoRequestDtoValidator()
    {
        RuleFor(x => x.Description)
            .MinimumLength(5);
        RuleFor(x => x.Priority)
            .GreaterThan(0);
        
    }
}