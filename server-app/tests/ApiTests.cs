using System.Net;
using infrastructure.DomainModels;
using NUnit.Framework;

namespace tests;

[TestFixture]
public class ApiTests
{
    private readonly HttpClient _httpClient = new HttpClient();

    [OneTimeSetUp]
    public void Setup()
    {
        _httpClient.BaseAddress = new Uri("http://localhost:9999");
        Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Testing");
        var app = Program.Startup();
        app.StartAsync();
    }

    [Test]
    public async Task TestMethod1()
    {
        var statusCode = _httpClient.GetAsync("/api/todo/1").Result.StatusCode;
        Assert.That(statusCode, Is.EqualTo(HttpStatusCode.OK));
    }
    
    
}
