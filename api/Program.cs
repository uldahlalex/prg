using FastEndpoints;
using FastEndpoints.Swagger;
using infrastructure;
using infrastructure.Repositories;

var bld = WebApplication.CreateBuilder();


bld.Services
    .AddSingleton<ProductRepository>()
    .AddFastEndpoints()
    .SwaggerDocument(); 

var app = bld.Build();
app.UseFastEndpoints()
    .UseSwaggerGen(); 
app.Run();