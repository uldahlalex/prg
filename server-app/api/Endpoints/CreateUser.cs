// using System.Text.Json;
// using api.Security;
// using Docker.DotNet;
// using FastEndpoints;
// using infrastructure;
// using infrastructure.DomainModels;
// using Microsoft.AspNetCore.Identity;
// using Serilog;
//
// namespace api.Endpoints;
//
//
// sealed class CreateUser(Db db, CredentialService credService, TokenService tokenservice) : Endpoint<User, object>
// {
//     public override void Configure()
//     {
//         Post("/api/user");
//         AllowAnonymous();
//     }
//
//     public override async Task HandleAsync(User createUserDto, CancellationToken c)
//     {
//         createUserDto.Salt = credService.GenerateSalt();
//         createUserDto.PasswordHash = credService.Hash(createUserDto.Password, createUserDto.Salt);
//         var createdUser = db.CreateUser(createUserDto);
//         var token = tokenservice.IssueJwt(createdUser);
//         var verify = tokenservice.ValidateJwtAndReturnClaims(token);
//         Log.Information(JsonSerializer.Serialize(verify));
//         Log.Information(token);
//         await SendAsync(new Token(){TokenString = token});
//     }
// }