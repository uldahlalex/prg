using System.Net;
using System.Net.NetworkInformation;
using Dapper;
using Docker.DotNet;
using Docker.DotNet.Models;
using Npgsql;

namespace infrastructure;

public class Db(NpgsqlDataSource dataSource)
{
    public Todo CreateTodo(CreateTodoParams createTodoParams)
    {
        var sql = @$"
insert into todo_manager.todo (title, description, due_date)
VALUES (@Title, @Description, @DueDate) RETURNING *;
";
        using(var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<Todo>(sql, createTodoParams);
        }
    }

    public Todo UpdateTodo(UpdateTodoParams updateTodoParams)
    {
        var sql = $@"
UPDATE todo_manager.todo SET (title, description, due_date, completed) 
VALUES (@Title, @Description, @DueDate, @Completed) 
WHERE id = @Id RETURNING *;
";
        using(var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<Todo>(sql, updateTodoParams);
        }
    }

    public Todo GetTodo(int id)
    {
        var sql = "select * from todo_manager.todo where id = @id";
        using(var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<Todo>(sql, new { id });
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

    public void RebuildDbSchema()
    {
        var sql = @"drop schema if exists todo_manager cascade;
create schema todo_manager;
create table todo_manager.todo (
  id serial primary key,
  title text not null,
  description text,
  created_date timestamp not null default (now() at time zone 'utc'),
    due_date timestamp not null default (now() at time zone 'utc') + interval '1 week',
  completed boolean not null default false
);

create table todo_manager.tag (
  id serial primary key,
  name text not null
);

create table todo_manager.todo_tag (
  todo_id int references todo_manager.todo(id),
  tag_id int references todo_manager.tag(id),
  primary key (todo_id, tag_id)
);

insert into todo_manager.todo (title, description, due_date, completed) values
  ('Buy groceries', 'Milk, eggs, bread', '2020-12-01', false),
  ('Clean the house', 'Vacuum, dust, mop', '2020-12-05', false),
  ('Do homework', 'Math, science, history', '2020-12-10', false),
  ('Go to the gym', 'Cardio, weights, stretching', '2020-12-15', false);
";
        using (var conn = dataSource.OpenConnection())
        {
            conn.Execute(sql);
        }
    }

    
}