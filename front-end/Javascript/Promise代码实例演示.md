```js
   let name = prompt("请输入用户名", "张三");

    const p = new Promise((resolve, reject) => {
        if (name == "张三") {
            resolve("你好，" + name + "稍等！")
        } else {
            reject("用户名错误，你不应该是" + name)
        }
        ;
    });

    p.then(res => {
        console.log(res);
        //新增一个promise对象
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("模拟从服务器获取数据中。。")
            }, 2000);
        });
    }).then(res => { //使用链式调用,这里的then有个.
        //上一个promise对象执行成功后，执行这个then
        console.log(res); //res是上一个promise对象的resolve的返回值
    }).catch(err => { //如果任何一个 Promise 被拒绝，则会进入这里
        console.log(err);
    }).finally(() => {
        console.log("不管成功还是失败，都会执行:'下次再见！' ");
    })

```

