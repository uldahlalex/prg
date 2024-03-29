using System.Security.Authentication;
using System.Text.Json;
using api.Boilerplate.ReusableHelpers.GlobalModels;
using api.Boilerplate.ReusableHelpers.GlobalValues;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace api.Boilerplate.EndpointHelpers;

public static class ApiHelper
{
    public static User TriggerJwtValidationAndGetUserDetails(HttpContext context)
    {
        try
        {
            var jwt = context.Request.Headers[StringConstants.JwtConstants.Authorization][0] ??
                      throw new InvalidOperationException("Could not find token in headers!");
            IJsonSerializer serializer = new JsonNetSerializer();
            var provider = new UtcDateTimeProvider();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtValidator validator = new JwtValidator(serializer, provider);
            IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder, new HMACSHA512Algorithm());
            var claims = decoder.Decode(jwt, Env.JWT_KEY);
            return JsonSerializer.Deserialize<User>(claims, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = false
            }) ?? throw new InvalidOperationException("Could not deserialize user from claims");
        }
        catch (Exception e)
        {
            Console.WriteLine("Failed to verify jwt and set payload as http item");
            Console.WriteLine(e.Message);
            Console.WriteLine(e.InnerException);
            Console.WriteLine(e.StackTrace);
            throw new AuthenticationException("Authentication error regarding token");
        }
    }
    
 
}