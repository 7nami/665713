```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>超时重连Promise</title>
</head>

<body>
    <div
        style="background-color: red;width: 200px;height: 200px;display: flex;align-items: center;justify-content: center;">

        <div style="background-color: brown;width: 100px;height: 100px;"></div>
    </div>
    <div>
        测试获取数据 测api
    </div>
</body>
<script>
    // 测试超时重连
    const url = 'https://reqres.in/api/users?page=2'

    function fetchWithRetry(url, retries = 3) { //默认参数3次
        return new Promise((resolve, reject) => {
            function tryFetch(count) {
                fetch(url).then((res) => {
                    if (!res.ok) {
                        throw new Error(res.statusText + "网络超时或其他错误")
                    }
                    return resolve(res)
                    // return resolve(res.json())
                }).catch((error) => {
                    if (count <= retries) {
                        console.log('正在重连' + count + '次');
                        setTimeout(() => tryFetch(count + 1), 1000);
                    } else {
                        reject(error)
                    }

                })
            }
            tryFetch(1)
        })
    }

    fetchWithRetry(url,3).then((data) => console.log(data))
    .catch((error) => console.log(error))

</script>

</html>
```

