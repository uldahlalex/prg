// using api;
// using api.Security;
// using Dapper;
// using infrastructure.DomainModels;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.Extensions.DependencyInjection;
// using Npgsql;
//
// namespace tests;
//
// public class TestSetup
// {
//     public CredentialService _credentialService;
//     public TestSetup()
//     {
//         _credentialService = new CredentialService();
//         HttpClient.BaseAddress = new Uri("http://localhost:9999");
//         Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Testing");
//         App = Program.Startup();
//         App.StartAsync();
//        
//     }
//     
//     public readonly HttpClient HttpClient = new();
//     public readonly WebApplication App;
//
//     public User TestUser = new()
//     {
//         Password = "123456",
//         Id = 1,
//         PasswordHash = "wPlcz3CuJvd57bOijksXAjec/d4mK22dt3XMDNyupKs=",
//         Salt = "u/DPbIGC972ZLJv77eJdhw==",
//         Username = "Bob",
//     };
//
//     public Tag TestTag = new()
//     {
//         Id = 1,
//         Name = "Work stuff"
//     };
//
//     public Todo TestTodo = new Todo() 
//     {
//         Id = 1,
//         Title = "Do stuff",
//         Description = "Do it this way ...",
//         Priority = 1,
//         Tags = new List<Tag>()
//         {
//             new Tag()
//             {
//                 Id = 1,
//                 Name = "Home"
//             }
//         },
//         CreatedAt = new DateTime(),
//         DueDate = new DateTime().AddDays(1),
//         UserId = 1
//     };
//
//
//
// }

