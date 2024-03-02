using System.Net;
using System.Net.NetworkInformation;
using Dapper;
using Docker.DotNet;
using Docker.DotNet.Models;
using infrastructure.DomainModels;
using Npgsql;

namespace infrastructure;

public class Db(NpgsqlDataSource dataSource)
{
    public Todo CreateTodo(Todo todo)
    {
        var todoSql = @$"
insert into todo_manager.todo (title, description, duedate, userid, priority)
VALUES (@Title, @Description, @DueDate, @UserId, @Priority) returning *;
";
        using(var conn = dataSource.OpenConnection())
        {
           return conn.QueryFirstOrDefault<Todo>(todoSql, todo) ??                 throw new InvalidOperationException("Could not insert todo");

        }
    }

    public Todo UpdateTodo(Todo todo)
    {
        var sql = $@"
UPDATE todo_manager.todo SET (title, description, duedate, iscompleted) 
VALUES (@Title, @Description, @DueDate, @IsCompleted) 
WHERE id = @Id RETURNING *;
";
        using(var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<Todo>(sql, todo);
        }
    }

    public Todo GetTodoWithTags(int id)
    {
        var todoSql = @"
SELECT *
FROM todo_manager.todo
WHERE id = @id;";
        var tagsSql = $@"
SELECT tag.id, tag.name from todo_manager.tag tag
JOIN todo_manager.todo_tag ON tag.id = todo_manager.todo_tag.tagid
WHERE todo_manager.todo_tag.todoid = @id;";
        
        using (var conn = dataSource.OpenConnection())
        {
           var todo = conn.QueryFirst<Todo>(todoSql, new { id });
           var tags = conn.Query<Tag>(tagsSql, new { id });
           todo.Tags = tags;
           return todo;
        }
    }

    public bool DeleteTodo(int id)
    {
        var sql = "delete from todo_manager.todo where id = @id";
        using(var conn = dataSource.OpenConnection())
        {
            var success =  conn.Execute(sql, new { id }) == 1;
            if (!success) throw new InvalidOperationException("Could not delete");
            return success;
        }
    }

   


    public void DeleteTag(int id)
    {
        var sql = "delete from todo_manager.tag where id = @id";
        using(var conn = dataSource.OpenConnection())
        {
            var success =conn.Execute(sql, new { id }) != 0;
            if (!success)
                throw new InvalidOperationException("Could not delete!");
        }
    }

    public User CreateUser(User user)
    {
        var sql = "insert into todo_manager.user (username, passwordhash, salt) values (@Username, @PasswordHash, @Salt) RETURNING *;";
        using (var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<User>(sql, user);
        }
    }

    public object LinkTodoAndTag(int todoId, IEnumerable<Tag> dtoTags)
    {
        throw new NotImplementedException();
        var sql = @"";
        using (var conn = dataSource.OpenConnection())
        {
            foreach (var tag in dtoTags)
            {
            }
        }
    }
}