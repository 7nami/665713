# vue.nextTick()方法的使用详解

**1，什么是Vue.nextTick()**

理解：nextTick()，是将回调函数延迟在下一次dom更新数据后调用，简单的理解是：`当数据更新了，在dom中渲染后自动执行该函数，`

```vue
 1 <template>
 2   <div class="hello">
 3     <div>
 4       <button id="firstBtn" @click="testClick()" ref="aa">{{testMsg}}</button>
 5     </div>
 6   </div>
 7 </template>
 8  
 9 <script>
10 export default {
11   name: 'HelloWorld',
12   data () {
13     return {
14       testMsg:"原始值",
15     }
16   },
17   methods:{
18     testClick:function(){
19       let that=this;
20       that.testMsg="修改后的值";
21       console.log(that.$refs.aa.innerText);   //that.$refs.aa获取指定DOM，输出：原始值
22     }
23   }
24 }
25 </script>
```



使用this.$nextTick()



```vue
1   methods:{
2     testClick:function(){
3       let that=this;
4       that.testMsg="修改后的值";
5       that.$nextTick(function(){
6         console.log(that.$refs.aa.innerText);  //输出：修改后的值
7       });
8     }
9   }
```



注意：Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。$nextTick 是在

​     下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM，

**2，什么时候需要用的Vue.nextTick()**

1）Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中，原因是在created()钩子函数执行

   的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进

   Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载已完成



```vue
1   created(){
2     let that=this;
3     that.$nextTick(function(){  //不使用this.$nextTick()方法会报错
4         that.$refs.aa.innerHTML="created中更改了按钮内容";  //写入到DOM元素
5     });
6   },
```



2）当项目中你想在改变DOM元素的数据后基于新的dom做点什么，对新DOM一系列的js操作都需要放进Vue.nextTick()的

   回调函数中；通俗的理解是：更改数据后当你想立即使用js操作新的视图的时候需要使用它



```vue
 1 <template>
 2   <div class="hello">
 3     <h3 id="h">{{testMsg}}</h3>
 4   </div>
 5 </template>
 6  
 7 <script>
 8 export default {
 9   name: 'HelloWorld',
10   data () {
11     return {
12       testMsg:"原始值",
13     }
14   },
15   methods:{
16     changeTxt:function(){
17       let that=this;
18       that.testMsg="修改后的文本值";  //vue数据改变，改变dom结构
19       let domTxt=document.getElementById('h').innerText;  //后续js对dom的操作
20       console.log(domTxt);  //输出可以看到vue数据修改后DOM并没有立即更新，后续的dom都不是最新的
21       if(domTxt==="原始值"){
22         console.log("文本data被修改后dom内容没立即更新");
23       }else {
24         console.log("文本data被修改后dom内容被马上更新了");
25       }
26     },
27  
28   }
29 }
30 </script>
31  
```



正确的用法是：vue改变dom元素结构后使用vue.$nextTick()方法来实现dom数据更新后延迟执行后续代码



```vue
 1     changeTxt:function(){
 2       let that=this;
 3       that.testMsg="修改后的文本值";  //修改dom结构
 4        
 5       that.$nextTick(function(){  //使用vue.$nextTick()方法可以dom数据更新后延迟执行
 6         let domTxt=document.getElementById('h').innerText; 
 7         console.log(domTxt);  //输出可以看到vue数据修改后并没有DOM没有立即更新，
 8         if(domTxt==="原始值"){
 9           console.log("文本data被修改后dom内容没立即更新");
10         }else {
11           console.log("文本data被修改后dom内容被马上更新了");
12         }
13       });
14     },
```



**3、在使用某个第三方插件时 ，希望在vue生成的某些dom动态发生变化时重新应用该插件，也会用到该方法**

   **这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法**

### 4，Vue.nextTick(callback) 使用原理：

原因是，Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOm操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新。
当你设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的DOM更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。