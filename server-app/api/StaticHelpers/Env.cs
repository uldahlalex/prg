using System.Collections;
using System.ComponentModel;
using System.Reflection;
using Serilog;

namespace api.StaticHelpers;

public static class Env
{

    public static string PG_CONN = Environment.GetEnvironmentVariable(nameof(PG_CONN)) ??
                                   "Server=localhost;Port=5432;Database=postgres;User Id=postgres;Password=postgres;";
    public static string SKIP_DB_CONTAINER_BUILDING = Environment.GetEnvironmentVariable(nameof(SKIP_DB_CONTAINER_BUILDING)) ?? "false";

    public static string ASPNETCORE_ENVIRONMENT =
        Environment.GetEnvironmentVariable(nameof(ASPNETCORE_ENVIRONMENT)) ?? "Development";

    public static string JWT_KEY = Environment.GetEnvironmentVariable(nameof(JWT_KEY)) ??
                                   "hdsfkyudsfksahfkdsahfffukdsafhkdsaufhidsafhkdsahfkdsahfiudsahfkdsahfkudsahfkudsahfkudsahfkudsahfkdsahfkuds";

    public static void PrintInMemoryEnvironment()
    {
        FieldInfo[] staticFields = typeof(Env).GetFields(BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic);
        Dictionary<string,string> map = new Dictionary<string,string>();
        foreach (FieldInfo field in staticFields)
        {
            object value = field.GetValue(null);
            map.Add(field.Name, value.ToString());
        }

        foreach (string key in map.Keys)
        {
            Log.Information(key + "     " + map[key]);

        }
    }
}