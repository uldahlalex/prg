
using System.Text.Json;

namespace tests;

public static class TestHelper
{
    public static T Deserialize<T>(this string jsonText)
    {
        return JsonSerializer.Deserialize<T>(jsonText, new JsonSerializerOptions()
        {
            PropertyNameCaseInsensitive = true
        }) ?? throw new InvalidCastException("Could not deserialize from "+jsonText + " to " + typeof(T).Name);
    }
}