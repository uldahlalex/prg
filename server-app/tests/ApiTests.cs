using System.Net.Http.Json;
using System.Text.Json;
using api.Boilerplate.DbHelpers;
using api.Boilerplate.ReusableHelpers.GlobalModels;
using api.Boilerplate.ReusableHelpers.Security;
using api.Boilerplate.UtilityFunctions;
using Dapper;
using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using NUnit.Framework;

namespace tests;

[TestFixture]
public class ApiTests
{
    [SetUp]
    public void BeforeEachTest()
    {
        _setup.App.Services.GetService<DbScripts>()!.RebuildDbSchema();
    }

    private readonly TestSetup _setup = new();

    [Test]
    public async Task CreateUserTest()
    {
        var response = _setup.HttpClient.PostAsJsonAsync("/api/user", _setup.TestUser).Result;
        var token = await response.Content.ReadAsStringAsync();

        using (var conn = _setup.App.Services.GetService<NpgsqlDataSource>().OpenConnection())
        {
            var count = conn.ExecuteScalar("SELECT COUNT(*) FROM todo_manager.user WHERE username = 'Bob'");
            Assert.That(count, Is.EqualTo(1), "Correct insertion to DB");
        }

        Assert.DoesNotThrow(() => new TokenService().ValidateJwtAndReturnClaims(token), "Token validation");
        Assert.True(response.IsSuccessStatusCode, "Http response code");
    }


    [Test]
    public async Task CreateTodo()
    {
        //dont forget token
        _setup.HttpClient.PostAsJsonAsync("/api/register", _setup.TestUser).Wait();
        var response = _setup.HttpClient.PostAsJsonAsync("/api/todos", _setup.TestTodo).Result;
        Console.WriteLine(JsonSerializer.Serialize(response));
        Console.WriteLine(response);
        var body = response.Content.ReadAsStringAsync().Result;
        Console.WriteLine(body);
        var responseTodo = (await response.Content.ReadAsStringAsync()).Deserialize<TodoWithTags>();
        _setup.TestTodo.Should().BeEquivalentTo(responseTodo);
        Assert.True(response.IsSuccessStatusCode, "Http response code");
    }
}