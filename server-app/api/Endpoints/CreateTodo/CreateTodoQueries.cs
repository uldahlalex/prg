using Dapper;
using Npgsql;

namespace api.Endpoints.CreateTodo;

public class CreateTodoQueries(NpgsqlDataSource dataSource)
{
    public TodoWithTags CreateTodo(CreateTodoQueryParams createTodoQueryParams)
    {
        var conn = dataSource.OpenConnection();
        var transaction = conn.BeginTransaction();
        var todoInsertion = Insertion(createTodoQueryParams, transaction);
        LinkTodoAndTag(createTodoQueryParams.TagIds, todoInsertion.Id, transaction);
        transaction.Commit();
        conn.Close();
        return todoInsertion;
    }
    
    private TodoWithTags Insertion(CreateTodoQueryParams todo, NpgsqlTransaction transaction)
    {
        var todoSql = @"
insert into todo_manager.todo (title, description, duedate, userid, priority)
VALUES (@Title, @Description, @DueDate, @UserId, @Priority) returning *;
";
        return transaction.Connection!.QueryFirstOrDefault<TodoWithTags>(todoSql, todo) ??
               throw new InvalidOperationException("Could not insert todo");
    }

    private void LinkTodoAndTag(IEnumerable<int> tagIds, int todoId, NpgsqlTransaction transaction)
    {
        var sql = @"insert into todo_manager.todo_tag (todoid, tagid) values (@TodoId, @TagId);";
        foreach (var tagId in tagIds)
        {
            var insertion = transaction.Connection.Execute(sql, new { todoId, TagId = tagId });
            if (insertion != 1) throw new InvalidOperationException("Could not insert");
        }
    }


}