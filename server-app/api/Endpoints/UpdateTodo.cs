// using FastEndpoints;
// using infrastructure;
// using infrastructure.DomainModels;
//
//
// // public class UpdateTodoRequestDto
// // {
// //     [BindFrom(nameof(Id))]
// //     public int Id { get; set; }
// //     public string Title { get; set; }
// //     public string Description { get; set; }
// //     public DateTime DueDate { get; set; }
// // }
//
// namespace api.Endpoints;
//
// public class UpdateTodo(Db db) : Endpoint<Todo, Todo>
// {
//     public override void Configure()
//     {
//         Put("/api/todo/{id}");
//         AllowAnonymous();
//     }
//
//     public override async Task HandleAsync(Todo todo, CancellationToken ct) 
//         => await SendOkAsync(db.UpdateTodo(todo));
//     
// }