using Microsoft.OpenApi.Extensions;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;

namespace api.Boilerplate;
public class WriteSwaggerJsonMiddleware(RequestDelegate next)
{
    private static bool _swaggerJsonGenerated = false;

    public async Task InvokeAsync(HttpContext context, IServiceProvider serviceProvider)
    {
   
        ISwaggerProvider sw = serviceProvider.GetRequiredService<ISwaggerProvider>();
        OpenApiDocument doc = sw.GetSwagger("My API V1", null, "/swagger/v1/swagger.json");
        string swaggerFile = doc.SerializeAsJson(Microsoft.OpenApi.OpenApiSpecVersion.OpenApi3_0);
        File.WriteAllText("swaggerfile.json", swaggerFile);
        await next(context);
    }
}
