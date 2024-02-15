drop schema todo cascade;
create schema todo;

create table todo.priority
(
    id   integer primary key generated always as identity,
    name text
);
create table todo.todo
(
    id          integer primary key generated always as identity,
    done       boolean default false,
    description text,
    due         date,
    priorityId  integer references todo.priority (id),
    title       text
);
create table todo.tag
(
    id   integer primary key generated always as identity,
    name text
);

create table todo.todo_tag
(
    todo_id integer references todo.todo (id),
    tag_id  integer references todo.tag (id),
    primary key (todo_id, tag_id)
);

