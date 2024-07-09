### 1xx（信息响应）

- `100 Continue`：请求头部接收完毕，客户端应继续发送请求主体。
- `101 Switching Protocols`：服务器将遵循客户端的请求转换到另一个协议。

### 2xx（成功）

- `200 OK`：请求成功，一切正常。
- `201 Created`：请求已完成，并新的资源已被创建。
- `204 No Content`：请求成功但没有要返回的信息。

### 3xx（重定向）

- `300 Multiple Choices`：对应多个资源可供选择。
- `301 Moved Permanently`：资源永久移动到新位置。
- `302 Found`：临时移动资源。
- `304 Not Modified`：资源自从上次请求后没有更改过。

### 4xx（客户端错误）

- `400 Bad Request`：服务器无法理解请求。
- `401 Unauthorized`：请求要求身份验证。
- `403 Forbidden`：服务器理解请求，但拒绝执行。
- `404 Not Found`：请求的资源在服务器上未找到。

### 5xx（服务器错误）

- `500 Internal Server Error`：服务器内部错误。
- `501 Not Implemented`：服务器不支持实现请求所需要的功能。
- `502 Bad Gateway`：一个服务器或网关作为代理向上游服务器传送无效响应。
- `503 Service Unavailable`：由于临时的服务器维护或过载，服务器当前无法处理请求。