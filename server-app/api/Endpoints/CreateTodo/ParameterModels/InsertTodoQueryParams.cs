namespace api.Endpoints.CreateTodo;

public class InsertTodoQueryParams(CreateTodoRequestDto dto, int userId)
{
    public string Title { get; set; } = dto.Title;
    public string Description { get; set; } = dto.Description;
    public DateTime? DueDate { get; set; } = dto.DueDate;
    public int Priority { get; set; } = dto.Priority;
    public int UserId { get; set; } = userId;
}