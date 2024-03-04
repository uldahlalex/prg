using Dapper;
using Npgsql;

namespace api.DbHelpers;

public class DbScripts(NpgsqlDataSource dataSource)
{
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
  name text not null
);

create table todo_manager.todo_tag (
  todoid int references todo_manager.todo(id) on delete cascade, 
  tagid int references todo_manager.tag(id) on delete cascade ,
  primary key (todoid, tagid)
);
";
        using (var conn = dataSource.OpenConnection())
        {
            conn.Execute(sql);
        }
    }

    public void SeedDB()
    {
        var sql = @"
insert into todo_manager.user (username, passwordhash, salt) values ('admin', 'passwordhash', 'salt');
insert into todo_manager.tag (name) values ('home'), ('work');
insert into todo_manager.todo (title, description, priority, duedate, userid) values ('clean', 'clean the house',2, now() + interval '1 week', 1);
insert into todo_manager.todo (title, description, duedate, userid) values ('work', 'finish the project', now() + interval '1 week', 1);
insert into todo_manager.todo (title, description, duedate, userid) values ('work', 'finish the project', now() + interval '1 week', 1);
insert into todo_manager.todo_tag (todoid, tagid) values (1, 1), (2, 2), (3, 2);
";
        using (var conn = dataSource.OpenConnection())
        {
            conn.Execute(sql);
        }
    }
}