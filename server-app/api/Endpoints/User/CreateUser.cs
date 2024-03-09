using api.ReusableHelpers.Security;
using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Endpoints.User;

public class AuthenticationRequestDto
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class Register : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/register", ([FromBody]AuthenticationRequestDto req, [FromServices]NpgsqlDataSource ds, [FromServices]CredentialService credService, [FromServices]TokenService tokenservice) =>
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

            return new
            {
    token = tokenservice.IssueJwt(new { Username = user.Username, Id = user.Id })
            };
        });
    }
}