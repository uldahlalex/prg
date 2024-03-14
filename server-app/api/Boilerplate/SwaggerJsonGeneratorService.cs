using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Extensions;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;

public class SwaggerJsonGeneratorService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;

    public SwaggerJsonGeneratorService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Wait a short period to ensure the application is fully started
        await Task.Delay(1000, stoppingToken);

        using (var scope = _serviceProvider.CreateScope())
        {
            var swaggerProvider = scope.ServiceProvider.GetRequiredService<ISwaggerProvider>();
            var doc = swaggerProvider.GetSwagger("v1");
            var swaggerFile = doc.SerializeAsJson(OpenApiSpecVersion.OpenApi3_0);
            var outputPath = Path.Combine(_serviceProvider.GetRequiredService<IWebHostEnvironment>().ContentRootPath+"/../../", "swagger.json");

            System.IO.File.WriteAllText(outputPath, swaggerFile);
        }
    }
}