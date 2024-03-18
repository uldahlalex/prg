using api;
using api.Boilerplate.ReusableHelpers.GlobalModels;
using api.Boilerplate.ReusableHelpers.Security;
using Microsoft.AspNetCore.Builder;

namespace tests;

public class TestSetup
{
    public WebApplication App;
    public CredentialService CredentialService = new();
    public HttpClient HttpClient = new();

    public Tag TestTag = new()
    {
        Name = "TestTag",
        UserId = 1
    };

    public TodoWithTags TestTodo = new()
    {
        Title = "TestTodo",
        Description = "TestDescription",
        Tags = new List<Tag>(),
        DueDate = DateTime.Now
    };


    public User TestUser = new()
    {
        Id = 1,
        Username = "blaaah",
        Password = "blaaah"
    };

    public TokenService TokenService = new();

    public TestSetup()
    {
        HttpClient.BaseAddress = new Uri("http://localhost:9999");
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Testing");
        App = Program.Startup().Result;
        App.StartAsync();
    }
}