// using System.Net;
// using System.Net.NetworkInformation;
// using Dapper;
// using Docker.DotNet;
// using Docker.DotNet.Models;
// using infrastructure.DomainModels;
// using Npgsql;
//
// namespace infrastructure;
//
// public class Db(NpgsqlDataSource dataSource)
// {
//
//     public Todo UpdateTodo(Todo todo)
//     {
//         var sql = $@"
// UPDATE todo_manager.todo SET (title, description, duedate, iscompleted) 
// VALUES (@Title, @Description, @DueDate, @IsCompleted) 
// WHERE id = @Id RETURNING *;
// ";
//         using(var conn = dataSource.OpenConnection())
//         {
//             return conn.QueryFirstOrDefault<Todo>(sql, todo);
//         }
//     }
//
//
//
//     public bool DeleteTodo(int id)
//     {
//         var sql = "delete from todo_manager.todo where id = @id";
//         using(var conn = dataSource.OpenConnection())
//         {
//             var success =  conn.Execute(sql, new { id }) == 1;
//             if (!success) throw new InvalidOperationException("Could not delete");
//             return success;
//         }
//     }
//
//    
//
//
//     public void DeleteTag(int id)
//     {
//         var sql = "delete from todo_manager.tag where id = @id";
//         using(var conn = dataSource.OpenConnection())
//         {
//             var success =conn.Execute(sql, new { id }) != 0;
//             if (!success)
//                 throw new InvalidOperationException("Could not delete!");
//         }
//     }
//
//     public User CreateUser(User user)
//     {
//         var sql = "insert into todo_manager.user (username, passwordhash, salt) values (@Username, @PasswordHash, @Salt) RETURNING *;";
//         using (var conn = dataSource.OpenConnection())
//         {
//             return conn.QueryFirstOrDefault<User>(sql, user);
//         }
//     }
//
//
//
//     public IEnumerable<Todo> GetFilterFeed()
//     {
//         var sql = @"
// select * from todo_manager.todo
//         join todo_manager.todo_tag on todo_manager.todo.id = todo_manager.todo_tag.todoid
//         join todo_manager.tag on todo_manager.todo_tag.tagid = todo_manager.tag.id         
// where iscompleted = false 
// and duedate > now()
// and priority = 1
// order by duedate asc;
// ";
//         using (var conn = dataSource.OpenConnection())
//         {
//             return conn.Query<Todo>(sql);
//         }
//     }
// }