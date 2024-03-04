namespace api;

public class ResponseDto<T>(T data, object? metadata = null)
{
    public T ResponseData = data;
    public object? Metadata = metadata;
}