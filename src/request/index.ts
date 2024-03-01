

interface HttpResponse<T>  {
    success: boolean;
    message: string;
    data?: T;
  }
  export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
    const response: Response= await fetch(request);
  
    try {
      // 如果没有响应内容，这里可能会报错
      return await response.json();
    } catch (ex) {

        return {
          success: false,
          message: "服务器异常"
        };
    }
  
  }

  export async function get<T>(
    path: string,
    args: RequestInit = { method: "get" }
  ): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, args));
  };
  
  export async function post<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "post", body: JSON.stringify(body) }
  ): Promise<HttpResponse<T>>  {
    return await http<T>(new Request(path, args));
  };
  
  export async function put<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "put", body: JSON.stringify(body) }
  ): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, args));
};
  
export async function deleteOne<T>(
  path: string,
  body: any,
  args: RequestInit = { method: "delete", body: JSON.stringify(body) }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
};
  

  


