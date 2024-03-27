using api.Boilerplate.ReusableHelpers.GlobalValues;
using JWT;
using JWT.Algorithms;
using JWT.Serializers;

namespace api.Boilerplate.ReusableHelpers.Security;

public class TokenService
{
    public static string IssueJwt(object o)
    {
        try
        {
            IJwtAlgorithm algorithm = new HMACSHA512Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

            return encoder.Encode(o, Env.JWT_KEY);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw new InvalidOperationException("User authentication succeeded, but could not create token");
        }
    }


}