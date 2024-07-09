```js
 export function ajax({url,method="GET",data}){
    return new Promise((resolve,reject)=>{
        $.ajax({
            url:基础链接,在js文件里字符串拼接一级二级路由,
            method,
            dataType:"json",
            data,
            success(res){
                resolve(res);
            },
            error(err){
                reject(err);
            }
        })
    })
} 


```

