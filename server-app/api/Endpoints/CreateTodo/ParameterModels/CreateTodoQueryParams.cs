namespace api.Endpoints.CreateTodo;

public sealed class CreateTodoQueryParams
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime? DueDate { get; set; }
    public int Priority { get; set; }
    public int UserId { get; set; }
    public IEnumerable<int> TagIds { get; set; }

    public CreateTodoQueryParams(CreateTodoRequestDto dto, int userId)
    {
        Title = dto.Title;
        Description = dto.Description;
        DueDate = dto.DueDate;
        Priority = dto.Priority;
        UserId = userId;
        TagIds = dto.Tags.Select(t => t.Id);
    }
}