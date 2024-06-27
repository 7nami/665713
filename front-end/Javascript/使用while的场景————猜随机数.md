```javascript
//使用while的场景————猜随机数
let randomNum = parseInt(math.random() * 100 + 1)
console.log(randomNum);

//用户输入一个数字进行猜数
let input = prompt('请输入一个100以内的数字：') - 0;
let sum = 0;
while (input != randomNum) {
    //判断是猜大了还是小了
    if (input > randomNum) {
        alert('猜大了');
    } else {
        alert('猜小了');
    }
    input = prompt('请再输入一个100以内的数字：') - 0;
    sum++;
}

alert('你猜对了，一共猜了' + sum + '次')
```

