using api.Boilerplate.ReusableHelpers.Security;
using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Endpoints.UserEndpoints;

public class SignIn : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/signin", (
            [FromBody] AuthenticationRequestDto req,
            [FromServices] NpgsqlDataSource ds,
            [FromServices] CredentialService credService,
            [FromServices] TokenService tokenService) =>
        {
            using var conn = ds.OpenConnection();
            var userToCheck = conn.QueryFirstOrDefault<Boilerplate.ReusableHelpers.GlobalModels.User>(
                "SELECT * FROM todo_manager.user where username = @username;",
                new
                {
                    req.Username
                }) ?? throw new InvalidOperationException("Could not create user");
            conn.Close();

            if (CredentialService.Hash(req.Password, userToCheck.Salt) != userToCheck.PasswordHash)
                throw new InvalidOperationException("Invalid password");

            return new
            {
                token = TokenService.IssueJwt(new { userToCheck.Username, userToCheck.Id })
            };
        });
    }
}