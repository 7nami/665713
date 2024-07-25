## 一、简介

> typescript是js的超集，主要学习ts里面的原始类型、[字面量](https://so.csdn.net/so/search?q=字面量&spm=1001.2101.3001.7020)类型、数组类型、函数类型、类类型、接口类型、类型别名，联合与交叉类型、枚举类型、泛型等类型元素，以及类型推断，本型断育、类型缩小、类型放大等特性。相比js更加严谨。编写代码的时候有静态类型的校验。

---

1. 基本类型：number、string、boolean、null、undefined、symbol、bigint
2. 复合类型：object、array、function、**tuple（元组）、enum（枚举）**
3. 特殊类型：**any、unknown、void、never**
4. 高级类型：联合类型、交叉类型

> 字面量不仅可以表示值，还可以表示类型；TypeScript支持3 种字面量类型：string字面量类型、number字面量类型、boolean字面量类型

## 二、原始类型

> string，number，boolean，symbol，null，undefined

```TypeScript
let num: number = 1; // number
let str:string = "2"; // string
let bool:boolean = true; // boolean 
let sy:symbol = Symbol(); // symbol
let undef:undefined = undefined; // undefined 
let nul:null = null; // null
let vd:void = undefined; // 可以把undefined类型赋值给void类型，但是反过来不行
//函教没有通回值，那么画数的返图值类型就是void
function fn():void{ 
    return undefined;
}
```

**注意：**

1. **void只用在函数没有返回值的情形下。**
2. **undefined和null最大的价值主要体现在接口类型上，表示可缺省、未定义的属性；null表示对象或者属性是空值。**这个可以先有个印象，后面说到接口会讲
3. **单纯声明Undefined或者null类型的变量是无比鸡肋的，上面的例子只是说明原始类型**
4. **如果不写类型，typescript是可以推断类型的，但注意let、const的区别**

## 三、非原始类型(上文提到的复合类型)

非原始类型在 TypeScript 中通常指的是对象类型（Object Types），包括类（class）、接口（interface）、数组（array）、元组（tuple）、枚举（enum）、函数（function）等。这些类型是由原始类型构建而来，或者是更复杂的数据结构。

下面是一些示例代码展示 TypeScript 中的非原始类型的使用：

### object, Object, {}

> object：代表的是非原始类型的类型，也就是不能是string ，number，boolean，symbol，严格模式：多包括null，undefined

> Object：代表所有拥有toString、hasOwnProperty 方法的类型，所以所有原始类型、⾮原始类型都可以赋给Object，严格模式下不包括null，undefined。

> {}：空对象类型和Object 一样。

```ts
//object(常用) Object {}
let obj:object = {a:1};
let arr:object = [1];
let num:object = 1 //报错 不包含number类型
//object 不包含基础数据类型
 
let obj1:Object = {a:1};
let arr1:Object = [1];
let num1:Object = 1;
let str1:Object = "1"
let bool1:Object = true;
//Object 包含基础数据类型
 
let obj2:{} = {a:1};
let arr2:{} = [1];
let num2:{} = 1;
let str2:{} = "1"
let bool2:{} = true;
//{}等效于Object 包含基础数据类型
```

```ts
object 对象
let student: { id: number, name: string } = {
    id: 1,
    name: '张三'
}
let student: { id: number, name: string, age?: number } = {
    id: 1,
    name: '张三',
}

可以在属性名后面添加 ? 来表示当前属性“可选”。
```



#### 接口（Interfaces）

```ts
//1.定义接口类型 --- 给对象用
interface Person {
    name: string;
    age: number;
    height:number;
}
 
// 使用接口
let person: Person = {
    name: "Alice",
    age: 30
};


//2.定义接口类型 --- 给数组用
interface ArrItf{
    //[idx:number] 下标类型:值类型
    [idx:number]:number|string
}
 
let arr:ArrItf = [10,"20"]
 
//3.定义接口类型 --- 给函数用
interface FnItf{
    //形参及类型：返回值类型
    (p:string,a:number):void
}
 
let fn:FnItf = (p:string,a:number)=>{}

fn("aaa",123)
```

> 继承：extends 多个不同接口之间是可以实现继承的，但是如果继承的接口PersonInfo和被继承的接口NameInfo有相同的属性，并且类型不兼容，那么就会报错。
>
> 同名：多个相同名字的接口，会进行合并，得到一个新的接口；这个接口的特性一般用在扩展第三方库的接口类型。
>
> 缺省：用？表示该属性是可以缺省的属性
>
> 只读：用readonly表示该属性是只能读取的属性，无法对该属性进行写入操作

```ts
interface NameItf{
    name:string
}
interface AgeItf{
    age:number
}
//接口继承的格式, 特点:具有父接口的属性类型
interface PersonItf extends NameItf,AgeItf{
    height:number
}
let p:PersonItf;
p={
    name:"张三",
    age:18,
    height:188
}
 
//接口可以同名, 特点:合并了所有的属性类型
interface AItf{
    a:string
}
interface AItf{
    b:number
}
let a:AItf = {
    a:"1",
    b:2
}
 
//在数据类型前加?表示该属性可以缺省
interface BItf{
    type?:string
    num:number
}
let b:BItf = {num:2}
 
//只读 在属性前加readonly表示该属性只能读取无法修改
interface RItf{
    readonly read:string
}
let r:RItf = {read:"book"}
// r.read = "books" //无法修改属性值
```



#### 类型别名（type)

> 接口类型的一个作用是将内联类型抽离出来，从而实现类型可复用。其实，我们也可以使用类型别名接收抽离出来的内联类型实现复用。

> 格式：**type 别名名称= 类型定义**。

```ts
// 自定义一个类型
type StrOrNum = string | number
let str:StrOrNum ="1"; 
str=10;
 
type ObjType ={a:number&2, b:string}// type ObjType={c:string}
let obj:ObjType = { 
    a:2,
    b:"bbb"
}
// interface和type区别:
// 都可以用来自定义类型
//类型别名支持联合和交叉类型定义
// 类型别名不支持重复定义, 接口可以
interface AItf{ 
    a:string
}
// 用类型别名保存接口上的某个属性类型 
type Atype = AItf['a']; 
let str2:Atype = "10";
type color = 'red' | 'blue' |'green'| string & {}
let c:color ='red'
```



#### 类（Classes）

```ts
// 定义一个类
class Animal {
    name: string;
 
    constructor(name: string) {
        this.name = name;
    }
 
    speak(): void {
        console.log(`${this.name} makes a noise.`);
    }
}
 
// 使用类
let dog = new Animal("Dog");
dog.speak(); // 输出 "Dog makes a noise."
```

#### 数组（Arrays）

> 数组的元素数据类型一般都一致，便于处理；
>
> 默认情况下，TS 中要求数组内的元素类型必须一致。

> 写法为"**数组中的数据类型[]**",例如 let arr:number[] = [1,2,3]

```ts
// 定义一个数组
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

----------------分割线------------------
// 另一个例子
//1.数组内元素相同
//第一种写法：数组内元素数据类型+[]
let arr1:number[] = [1,2,3];
arr1[0] = 10;
// arr1[1] = "10"; //报错
 
//第二种写法：泛型 类型参数化
let arr2:Array<number> = [10,20,30]
arr2[0] = 15
// arr2[1] = "10"; //报错
 
//2.数组内元素不同 别名(元组)
//第一种写法:元组
let arr3:[number,number,boolean] = [10,20,true]
 
//第二种写法:联合类型
let arr4:(number|boolean)[] = [10,20,true]
```

#### 元组（Tuples）

> 元组，允许 `[]` 可保存不同类型的元素，但是需要按照对应的下标位置，对 `[]` 每一个值的类型进行约束。

```ts
// 定义一个元组
let tuple: [string, number] = ["Alice", 30];
let students: [string, number] = ['张三', 20];
```

#### 枚举（Enums）

```ts
// 定义一个枚举
enum Color {
    Red,
    Green,
    Blue,
}
 
// 使用枚举
let c: Color = Color.Green;

//-------------分割线-----------------
// 另一个例子
enum Gender {
    woman = 0,
    man = 1,
    unknown = 2
}
let student: { id: number, name: string, age?: number, gender: Gender } = {
    id: 1,
    name: '张三',
    gender: Gender.woman
}
```

#### 函数（Functions）

```ts
// 定义一个函数
function add(x: number, y: number): number {
    return x + y;
}

// 使用函数
let result = add(3, 5); // result 将为 8
```

#### 尝试类型推断和复杂类型(重点注意最后一个字符串数组)

```ts
// 复杂类型的推断
let complexObject = {
    name: "John",
    age: 25,
    address: {
        street: "123 Main St",
        city: "Anytown"
    },
    hobbies: ["reading", "sports"]
};

// 推断 complexObject 的类型为：
// { name: string, age: number, address: { street: string, city: string }, hobbies: string[] }
```

### 高级类型

#### 交叉类型

> --- **&** --- 交叉类型 相当于与,表示用 & 隔开的类型都需要有

```ts
// --- & --- 交叉类型 相当于与
// let a:number&string; //不会有任何满足这个类型 一般不会这么写
 
let obj:{name:string,age:number} & {height:number,skin:string};//这些属性都得有
obj ={name:"zhangsan", age:19, height:188,skin:"black"}
```

---

#### 联合、交叉组合

> & 和 | 可以一起使用,& 优先于 |，可以通过使用小括弧() 来调整操作符的优先级。

```ts
// | &
// & 优先于 |
let obj:{name:string} & {age:number} | {name:string}
obj ={
    name:"张三"
}
obj ={
    name:"张三",
    age:18
}
```

---

### 特殊类型

#### any 和 unknown

> any 和 unknown 都是用来表示任意数据类型。

```ts
let a: any = 10;
a = 'hello';

let b: unknown = 10;
b = true;
```

区别在于：

```ts
let a: any = 10;
let b: unknown = 10;
let c: number = 0;
c = a;  	// 正确
// c = b;  // 报错
```

1. 数据一旦设置为 any 类型后，会关闭 TS 的类型检查（等同于 JS），数据设置为 unknown 类型后，还是会进行 TS 类型检查。
2. any 类型的数据，可以赋值给其他任意数据类型；unknown 类型的数据，只能赋值给其他的 unknown 和 any；

### void

void 表示没有任何类型。通常会用 void 来表示函数没有返回值时，返回值的类型。

```ts
function foo(): void {
    
}
```

### never

never 表示永远都不会有值的类型，例如程序出错、代码死循环、抛出异常等。