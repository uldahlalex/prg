namespace infrastructure.DomainModels;

public class Todo
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public int Priority { get; set; }
    public int UserId { get; set; }
    public List<Tag> Tags { get; set; } = [];
}