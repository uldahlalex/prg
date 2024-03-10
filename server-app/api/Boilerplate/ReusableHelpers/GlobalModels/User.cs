using System.Text.Json;

namespace api.Endpoints.User;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string? PasswordHash { get; set; }
    public string? Password { get; set; }
    public string? Salt { get; set; }


    public static User FromHttpItemsPayload(HttpContext context)
    {
        return JsonSerializer.Deserialize<User>(JsonSerializer.Serialize(context.Items["Payload"])) ?? throw new InvalidOperationException("Could not create user from HTTP items");
    }
}