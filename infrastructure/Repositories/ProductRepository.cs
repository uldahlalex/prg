namespace infrastructure.Repositories;

public class ProductRepository
{
    public Todo CreateTodo(CreateTodoParams createTodoParams)
    {
        return new Todo();
    }
    
    public Todo UpdateTodo(UpdateTodoParams updateTodoParams)
    {
        return new Todo();
    }

    public Todo GetTodo(int id)
    {
        return new Todo();
    }
    public bool DeleteTodo(int id)
    {
        return true;
    }
    
    
    
}