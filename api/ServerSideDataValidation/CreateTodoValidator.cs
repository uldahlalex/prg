using FastEndpoints;
using FluentValidation;

namespace api.ServerSideDataValidation;

public class CreateTodoValidator : Validator<CreateTodoRequestDto>
{
    public CreateTodoValidator()
    {
        RuleFor(t => t.Title)
            .MaximumLength(50);
    }
}