using System.Net;
using NUnit.Framework;

namespace tests;

[TestFixture]
public class ApiTests
{
    [OneTimeSetUp]
    public void Setup()
    {
        var app = Program.Startup();
        app.StartAsync();
    }

    [Test]
    public async Task TestMethod1()
    {
        var client = new HttpClient();
        var response = client.GetAsync("http://localhost:5000/api/todo/1").Result;
        await response.Content.ReadAsStringAsync();
        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
    }
}
