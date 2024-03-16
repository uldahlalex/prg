using api;
using api.Boilerplate.ReusableHelpers.GlobalModels;
using api.Boilerplate.ReusableHelpers.Security;
using Microsoft.AspNetCore.Builder;

namespace tests;

public class TestSetup
{
    public CredentialService CredentialService = new CredentialService();
    public TokenService TokenService = new TokenService();
    public HttpClient HttpClient = new();
    public WebApplication App;
    public  TestSetup()
    {
        HttpClient.BaseAddress = new Uri("http://localhost:9999");
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Testing");
        App = Program.Startup().Result;
        App.StartAsync();
    }
    
    
    public User TestUser = new User
    {
        Id = 1,
        Username = "blaaah",
        Password = "blaaah"
    };
    public Tag TestTag = new Tag
    {
        Name = "TestTag",
        UserId = 1
    };
    public TodoWithTags TestTodo = new TodoWithTags()
    {
        Title = "TestTodo",
        Description = "TestDescription",
        Tags = new List<Tag> {},
        DueDate = DateTime.Now
        
    };
}

