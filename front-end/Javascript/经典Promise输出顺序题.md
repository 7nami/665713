```js
console.log('1')
new promise((resolve,reject)=>{
    resolve('2')
}).then((res)=>{
    console.log(res)
})
setTimeout(()=>{
    console.log('3')
},3000)

new promise((resolve,reject)=>{
    resolve('4')
}).then((res)=>{
    console.log(res)
})
console.log('5')
```

请计算输出顺序：