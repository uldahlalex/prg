using FastEndpoints;
using FluentValidation;
using infrastructure.DomainModels;

namespace api.ServerSideDataValidation;

public class CreateTodoValidator : Validator<Todo>
{
    public CreateTodoValidator() //todo multiple situational validators for same object ? 
    {
        RuleFor(t => t.Title)
            .MaximumLength(50);
    }
}