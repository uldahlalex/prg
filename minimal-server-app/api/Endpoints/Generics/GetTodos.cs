using FastEndpoints;

namespace api.Endpoints;

sealed class MyRequest
{
    public string Completeted { get; set; }
    public string DueDate { get; set; }
    public string Priority { get; set; }
    public string UserId { get; set; }
    public string[] Tags { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string CreatedAt { get; set; }
    public string Id { get; set; }
    public string IsCompleted { get; set; }
    
}

sealed class MyResponse
{

}

sealed class GetTodos : Endpoint<MyRequest, MyResponse>
{
    public override void Configure()
    {
        Get("/api/todos");
        AllowAnonymous();
    }

    public override async Task HandleAsync(MyRequest r, CancellationToken c)
    {
        
    }
}