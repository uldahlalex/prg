using api.ReusableHelpers.Security;
using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Endpoints.User;

public class CreateUserRequestDto
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string? PasswordHash { get; set; }
    public string? Password { get; set; }
    public string? Salt { get; set; }
}

public class Delete : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/register", ([FromBody]CreateUserRequestDto req, [FromServices]NpgsqlDataSource ds, [FromServices]CredentialService credService, [FromServices]TokenService tokenservice) =>
        {
            var salt = credService.GenerateSalt();
            var hash = credService.Hash(req.Password, salt);
            using var conn = ds.OpenConnection();
            var user = conn.QueryFirstOrDefault<User>(
                "insert into todo_manager.user (username, passwordhash, salt) values (@Username, @PasswordHash, @Salt) RETURNING *;",
                new
                {
                    Username = req.Username,
                    PasswordHash = hash,
                    Salt = salt
                }) ?? throw new InvalidOperationException("Could not create user");
            conn.Close();

            return tokenservice.IssueJwt(new { Username = user.Username, Id = user.Username });
        });
    }
}