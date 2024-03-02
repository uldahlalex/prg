using FastEndpoints;
using infrastructure;

namespace api.Endpoints;

sealed class DeleteTag(Db db) : EndpointWithoutRequest
{
    public override void Configure()
    {
        Delete("/api/tags/{id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken c)
    {
        var id = Route<int>("id");
        db.DeleteTag(id);
    }
}