# 本地存储 cookie、localStorage、sessionStorage 的以及 session 的区别

首先，四者最大的区别在于 cookie、localStorage、sessionStorage 都是前端的本地存储，数据保存在浏览器中；而 session 是后端的本地存储，数据保存在服务器中。

1. 数据有效期：
   - cookie：一般由服务器生成，可设置失效时间。如果在浏览器生成，默认是关闭浏览器后失效；
   - localStorage：除非手动删除，否则永久保存；
   - sessionStorage：仅在当前会话有效，关闭浏览器或浏览器窗口后被清除；
   - session：由服务器生成，可设置失效时间。
2. 作用范围：
   - cookie：在所有同源窗口中共享；
   - localStorage：在所有同源窗口中共享；
   - sessionStorage：只在当前窗口有效；
3. 存储大小：
   - cookie：4KB；
   - localStorage：一般 5MB；
   - sessionStorage：一般 5MB；
4. 与服务器通信：
   - cookie：每次请求都会携带在 HTTP 请求头中，如果使用 cookie 保存过多数据会带来性能问题；
   - localStorage：不会主动把数据发送给服务器，仅在本地保存；
   - sessionStorage：不会主动把数据发送给服务器，仅在本地保存；