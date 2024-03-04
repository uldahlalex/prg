using Microsoft.AspNetCore.Mvc;
using services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<CreateTodo>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
var app = builder.Build();

app.MapPost("/api/createTodoCommand", ([FromBody]CreateTodoCommand cmd, CreateTodo createTodo) 
    => createTodo.HandleCreateTodo(cmd));

app.Run();

