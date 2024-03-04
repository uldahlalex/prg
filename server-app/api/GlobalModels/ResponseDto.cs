namespace api;

public class ResponseDto<T>
{
    public T ResponseData;
    public object Metadata;

    public ResponseDto(T data)
    {
        this.ResponseData = data;
    }
}