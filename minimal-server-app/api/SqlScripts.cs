namespace api;

/// <summary>
/// Class contians sql scripts that are used more than 1 time
/// </summary>
public static class SqlScripts
{
    public static string Seed = @"
insert into todo_manager.user (username, passwordhash, salt) values ('admin', 'passwordhash', 'salt');
insert into todo_manager.tag (name) values ('home'), ('work');
insert into todo_manager.todo (title, description, priority, duedate, userid) values ('clean', 'clean the house',2, now() + interval '1 week', 1);
insert into todo_manager.todo (title, description, duedate, userid) values ('work', 'finish the project', now() + interval '1 week', 1);
insert into todo_manager.todo (title, description, duedate, userid) values ('work', 'finish the project', now() + interval '1 week', 1);
insert into todo_manager.todo_tag (todoid, tagid) values (1, 1), (2, 2), (3, 2);
";

    public static string Schema = @"
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

    public static string GetTodoByIdWithTags = @"
select todo.* from todo_manager.todo
        join todo_manager.todo_tag on todo_manager.todo.id = todo_manager.todo_tag.todoid
        join todo_manager.tag on todo_manager.todo_tag.tagid = todo_manager.tag.id         
where todo_manager.todo.id = @id;
";
}