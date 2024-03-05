using api.Endpoints.Todo;
using Xunit;
using Xunit.Sdk;

namespace xunit;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {

        var d = new GetTodosWithTags();
        d.AddRoutes(null);
    }
}