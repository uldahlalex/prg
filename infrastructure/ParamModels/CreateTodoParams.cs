namespace infrastructure;

public class CreateTodoParams
{
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime? DueDate { get; set; }
}