// using System.Net;
// using System.Net.Http.Json;
// using api.Security;
// using Dapper;
// using infrastructure;
// using infrastructure.DomainModels;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.Extensions.DependencyInjection;
// using Npgsql;
// using NUnit.Framework;
// using Serilog;
//
// namespace tests;
//
// [TestFixture]
// public class ApiTests
// {
//     private TestSetup setup = new();
//
//     [SetUp]
//     public void BeforeEachTest()
//     {
//         setup.App.Services.GetService<DbScripts>()!.RebuildDbSchema();
//     }
//     
//     [Test]
//     public async Task CreateUserTest()
//     {
//         //Act
//         var response = setup.HttpClient.PostAsJsonAsync("/api/user", setup.TestUser).Result;
//         var token = (await response.Content.ReadAsStringAsync()).Deserialize<Token>();
//         
//         //Assert
//         using (var conn = setup.App.Services.GetService<NpgsqlDataSource>().OpenConnection())
//         {
//             var count = conn.ExecuteScalar("SELECT COUNT(*) FROM todo_manager.user WHERE username = 'Bob'");
//             Assert.That(count, Is.EqualTo(1), "Correct insertion to DB");
//         } 
//         Assert.DoesNotThrow(() => new TokenService().ValidateJwtAndReturnClaims(token.TokenString), "Token validation");
//         Assert.True(response.IsSuccessStatusCode, "Http response code"); 
//     }
//     
//
//     [Test]
//     public async Task CreateTodoItem()
//     {
//         //Arrange
//         setup.App.Services.GetService<Db>()!.CreateUser(setup.TestUser);
//         
//         //Act
//         var response = setup.HttpClient.PostAsJsonAsync("/api/todo", setup.TestTodo).Result;
//         Todo todo = (await response.Content.ReadAsStringAsync()).Deserialize<Todo>();
//         
//         //Assert
//         using (var conn = setup.App.Services.GetService<NpgsqlDataSource>().OpenConnection())
//         {
//             var count = conn.ExecuteScalar($"SELECT COUNT(*) FROM todo_manager.todo WHERE title = '{todo.Title}';");
//             Assert.That(count, Is.EqualTo(1), "Correct insertion to DB");
//         } 
//         Assert.True(response.IsSuccessStatusCode, "Http response code"); 
//         Log.Information(todo.Serialize() + setup.TestTodo.Serialize());
//         Assert.That(new List<Todo>() {todo}, Is.EqualTo(new List<Todo>() {setup.TestTodo}), "Correct response");
//     }
//
//     
//     
// }

