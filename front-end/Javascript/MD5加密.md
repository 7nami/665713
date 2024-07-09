```js
//引入nodejs密码模块
let crypto = require('crypto');
//定义函数实现数据md5加密
function getMd5(data) {
    //获取md5加密对象
    let md5 = crypto.createHash('md5');
    //定义密钥
    let secret = 'xumin';
    //加密数据
    return md5.update(data + secret).digest('hex');
}
module.exports = {
    getMd5
}


```

