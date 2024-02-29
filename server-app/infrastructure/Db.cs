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
        var sql = @$"
insert into todo_manager.todo (title, description, duedate)
VALUES (@Title, @Description, @DueDate) RETURNING *;
";
        using(var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<Todo>(sql, todo);
        }
    }

    public Todo UpdateTodo(Todo todo)
    {
        var sql = $@"
UPDATE todo_manager.todo SET (title, description, duedate, completed) 
VALUES (@Title, @Description, @DueDate, @Completed) 
WHERE id = @Id RETURNING *;
";
        using(var conn = dataSource.OpenConnection())
        {
            return conn.QueryFirstOrDefault<Todo>(sql, todo);
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
        var sql = @"
drop schema if exists todo_manager cascade;
create schema todo_manager;

create table todo_manager.user (
  id serial primary key,
  username text not null,
  passwordhash text not null,
  salt text not null
);

create table todo_manager.todo (
  id serial primary key,
  title text not null,
    priority int not null default 0,
  description text,
  createdat timestamp not null default (now() at time zone 'utc'),
    duedate timestamp not null default (now() at time zone 'utc') + interval '1 week',
  iscompleted boolean not null default false,
userid int references todo_manager.user(id)
);

create table todo_manager.tag (
  id serial primary key,
  userid int references todo_manager.user(id),
  name text not null
);

create table todo_manager.todo_tag (
  todoid int references todo_manager.todo(id),
  tagid int references todo_manager.tag(id),
  primary key (todoid, tagid)
);

insert into todo_manager.user (username, passwordhash, salt) values ('admin', 'passwordhash', 'salt');
insert into todo_manager.tag (name) values ('home'), ('work');
insert into todo_manager.todo (title, description, priority, duedate, userid) values ('clean', 'clean the house',2, now() + interval '1 week', 1);
insert into todo_manager.todo (title, description, duedate, userid) values ('work', 'finish the project', now() + interval '1 week', 1);
insert into todo_manager.todo (title, description, duedate, userid) values ('work', 'finish the project', now() + interval '1 week', 1);
";
        using (var conn = dataSource.OpenConnection())
        {
            conn.Execute(sql);
        }
    }

    
}