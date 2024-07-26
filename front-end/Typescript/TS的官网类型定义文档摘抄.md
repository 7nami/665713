## Typescript的类型定义十分混乱，从ChatGPT、CSDN、W3C、菜鸟教程每个网站都有自己的版本，在这里贴一下官方文档以作参考（谷歌翻译机翻中文）

在本章中，我们将介绍一些在 JavaScript 代码中最常见的值的类型，并说明在 TypeScript 中描述这些类型相应的方法。 这不是一个详尽的列表，后续章节将描述命名和使用其他类型的更多方法。

类型还可以出现在许多 *地方* ，而不仅仅是类型注释。 在我们了解类型本身的同时，我们还将了解在哪些地方可以引用这些类型来形成新的结构。

我们将首先回顾一下你在编写 JavaScript 或 TypeScript 代码时可能遇到的最基本和最常见的类型。 这些将在稍后形成更复杂类型的核心构建块。

## 基本类型：`string`，`number`，和 `boolean`

JavaScript 有三个非常常用的[原语](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)：`string`、`number`和`boolean`。每个原语在 TypeScript 中都有对应的类型。正如您所料，如果您`typeof`在这些类型的值上使用 JavaScript 运算符，您将看到以下相同的名称：

- `string`表示字符串值，例如`"Hello, world"`
- `number`表示数字，例如`42`。JavaScript 没有整数的特殊运行时值，因此没有等同于`int`或 的运算符`float`- 一切都只是`number`
- `boolean`是两个值`true`，并且`false`

> 类型名称`String`、`Number`和`Boolean`（以大写字母开头）是合法的，但它们指的是一些很少出现在您的代码中的特殊内置类型。*始终*使用`string`、`number`或`boolean`来表示类型。

## 数组

要指定数组的类型（例如）`[1, 2, 3]`，可以使用语法`number[]`；此语法适用于任何类型（例如，`string[]`是字符串数组等）。您可能还会看到它写成`Array<number>`，意思相同。我们将`T<U>`在介绍*泛型*时详细了解语法。

> 请注意，这是不同的事情；请参阅有关*元组类型*`[number]`的部分。

## `any`

TypeScript 还有一种特殊类型，`any`当您不希望某个特定值导致类型检查错误时，可以使用它。

当值的类型为 时`any`，您可以访问它的任何属性（反过来又是 类型`any`），像函数一样调用它，将它分配给（或从）任何类型的值，或者几乎任何其他语法上合法的东西：

```ts
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

`any`当您不想写出一个长类型只是为了让 TypeScript 相信某一行代码没问题时，这种类型很有用。

### `noImplicitAny`

当您未指定类型且 TypeScript 无法从上下文中推断类型时，编译器通常会默认为`any`。

不过，您通常希望避免这种情况，因为`any`没有进行类型检查。使用编译器标志[`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny)将任何隐式标记`any`为错误。

## 变量的类型注解

`const`当您使用、`var`或声明变量时`let`，您可以选择添加类型注释来明确指定变量的类型：

```
let myName: string = "Alice";
```

> TypeScript 不使用“左侧类型”样式的声明，例如`int x = 0;` 类型注释将始终位于被输入的内容*之后。*

但在大多数情况下，这并不是必需的。只要有可能，TypeScript 就会尝试自动*推断*代码中的类型。例如，变量的类型是根据其初始化器的类型推断出来的：

```ts
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```

在大多数情况下，您不需要明确学习推理规则。如果您是初学者，请尝试使用比您想象的更少的类型注释 - 您可能会惊讶于 TypeScript 完全理解正在发生的事情所需的注释数量之少。

## 功能

函数是 JavaScript 中传递数据的主要方式。TypeScript 允许您指定函数的输入值和输出值的类型。

### 参数类型注解

声明函数时，可以在每个参数后添加类型注释，以声明该函数接受的参数类型。参数类型注释位于参数名称之后：

```ts
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

当参数具有类型注释时，将检查该函数的参数：

```ts
// Would be a runtime error if executed!
greet(42);Argument of type 'number' is not assignable to parameter of type 'string'.Argument of type 'number' is not assignable to parameter of type 'string'.
```

> 即使你的参数上没有类型注释，TypeScript 仍会检查你是否传递了正确数量的参数。

### 返回类型注解

您还可以添加返回类型注释。返回类型注释出现在参数列表之后：

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

与变量类型注释非常相似，您通常不需要返回类型注释，因为 TypeScript 会根据函数的`return`语句推断函数的返回类型。上例中的类型注释不会改变任何内容。某些代码库会出于文档目的、防止意外更改或个人偏好而明确指定返回类型。

### 匿名函数

匿名函数与函数声明略有不同。当函数出现在 TypeScript 可以确定如何调用它的位置时，该函数的参数将自动被赋予类型。

以下是一个例子：

```ts
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

即使参数`s`没有类型注释，TypeScript 也会使用`forEach`函数的类型以及数组的推断类型来确定`s`将具有的类型。

此过程称为*上下文类型化*，因为函数出现的*上下文决定了它应该具有什么类型。与推理规则类似，您不需要明确了解这种情况是如何发生的，但了解这种情况**确实会*发生可以帮助您注意到何时不需要类型注释。稍后，我们将看到更多示例，说明值出现的上下文如何影响其类型。

## 对象类型

除了基本类型之外，您遇到的最常见的类型是*对象类型*。这指的是任何具有属性的 JavaScript 值，几乎所有 JavaScript 值都是如此！要定义对象类型，我们只需列出其属性及其类型。

例如，这里有一个接受点状对象的函数：

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

在这里，我们用一个类型来注释参数，该类型有两个属性 -`x`和`y`-，它们都是 类型`number`。您可以使用`,`或`;`来分隔属性，最后一个分隔符是可选的。

每个属性的类型部分也是可选的。如果你不指定类型，则将假定为`any`。

### 可选属性

对象类型还可以指定其部分或全部属性是*可选的*。为此，请`?`在属性名称后添加：

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

在 JavaScript 中，如果您访问不存在的属性，您将获得该值`undefined`而不是运行时错误。因此，当您从可选属性*读取*时，您必须`undefined`在使用它之前进行检查。

```ts
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());'obj.last' is possibly 'undefined'.'obj.last' is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }
 
  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```

## 联合类型

TypeScript 的类型系统允许您使用各种运算符从现有类型构建新类型。现在我们知道如何编写一些类型，是时候开始以有趣的方式*组合它们了。*

### 定义联合类型

您可能见过的第一种组合类型的方法是*联合*类型。联合类型是由两种或多种其他类型组成的类型，表示的值可以是*其中任何一种*类型。我们将这些类型中的每一个称为联合的*成员*。

让我们编写一个可以对字符串或数字进行操作的函数：

```ts
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

### 使用联合类型

*提供*与联合类型匹配的值很容易- 只需提供与联合的任意成员匹配的类型即可。如果您*有*一个联合类型的值，您如何处理它？

TypeScript 仅允许您使用 union 执行操作，前提是该操作对union 的*每个*成员都有效。例如，如果您有 union `string | number`，则不能使用仅在 上可用的方法`string`：

```ts
function printId(id: number | string) {  console.log(id.toUpperCase());Property 'toUpperCase' does not exist on type 'string | number'.
  Property 'toUpperCase' does not exist on type 'number'.Property 'toUpperCase' does not exist on type 'string | number'.
  Property 'toUpperCase' does not exist on type 'number'.}
```

解决方案是使用代码*缩小*联合，就像在没有类型注释的 JavaScript 中一样。 当 TypeScript 可以根据代码结构推断出值的更具体类型时，就会发生*缩小。*

例如，TypeScript 知道只有一个`string`值才会有`typeof`值`"string"`：

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

另一个示例是使用如下函数`Array.isArray`：

```ts
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```

请注意，在`else`分支中，我们不需要做任何特殊的事情 - 如果`x`不是`string[]`，那么它一定是`string`。

有时，你会有一个联合，其中所有成员都有一些共同点。例如，数组和字符串都有一个`slice`方法。如果联合中的每个成员都有一个共同的属性，那么你可以使用该属性而无需缩小范围：

```ts
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

> *类型联合*似乎具有这些类型属性的*交集*，这可能会令人困惑。这并非偶然——*联合*这个名字来自类型理论。*联合由每种类型* *的值*`number | string`联合而成。请注意，给定两个集合，每个集合都有相应的事实，只有这些事实的*交集*才适用于*集合本身的联合。例如，如果我们有一个房间里的高个子戴帽子，另一个房间里的西班牙语使用者戴帽子，那么在合并这两个房间后，我们对**每个*人唯一知道的就是他们一定戴着帽子。

## 类型别名

我们通过直接在类型注解中编写对象类型和联合类型来使用它们。 这很方便，但是常常会想要多次使用同一个类型，并且通过一个名称引用它。

*类型别名* 正是如此 - 任意 *类型* 的一个 *名称* 。 类型别名的语法是：

```ts
type Point = {
  x: number;
  y: number;
};
 
// 与前面的示例完全相同
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

实际上，不只是对象类型，你可以使用类型别名为任何类型命名。 例如，类型别名可以命名联合类型：

```ts
type ID = number | string;
```

请注意，别名 *只是* 别名 - 你不能使用类型别名创建同一类型的不同“版本”。 当你使用别名时，它与您编写的别名类型完全一样。 换句话说，这段代码 *看起来* 可能是非法的，但是对于 TypeScript 来说是正确的，因为这两种类型都是同一类型的别名：

```ts
declare function getInput(): string;
declare function sanitize(str: string): string;
// ---分割---
type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
 
// 创建一个经过清理的输入框
let userInput = sanitizeInput(getInput());
 
// 仍然可以使用字符串重新赋值
userInput = "new input";
```

## 接口

*接口声明* 是命名对象类型的另一种方式：

```ts
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

就像我们上面使用类型别名时一样，这个示例的工作方式就像我们使用了匿名对象类型一样。 TypeScript 只关心我们传递给 `printCoord` 的值的结构 - 它只关心它是否具有预期的属性。 只关心类型的结构和功能，这就是为什么我们说 TypeScript 是一个 *结构化类型* 的类型系统。

### 类型别名和接口之间的区别

类型别名和接口非常相似，在大多数情况下你可以在它们之间自由选择。 几乎所有的 `interface` 功能都可以在 `type` 中使用，关键区别在于不能重新开放类型以添加新的属性，而接口始终是可扩展的。

| `Interface`                                                  | `Type`                                                       |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| 扩展接口`interface Animal {  name: string } interface Bear extends Animal {  honey: boolean } const bear = getBear()  bear.name bear.honey        ` | 通过 "&" 扩展类型`type Animal = {  name: string } type Bear = Animal & {   honey: Boolean  } const bear = getBear(); bear.name; bear.honey;        ` |
| 向现有接口添加新字段`interface Window {  title: string } interface Window {  ts: TypeScriptAPI } const src = 'const a = "Hello World"'; window.ts.transpileModule(src, {});        ` | 类型创建后不能更改`type Window = {  title: string } type Window = {  ts: TypeScriptAPI } // Error: Duplicate identifier 'Window'.        ` |

在后面的章节中你会学到更多关于这些概念的知识，所以如果你没有立即理解这些知识，请不要担心。

- 在 TypeScript 4.2 之前，类型别名命名 [*可能* 会出现在错误消息中](https://www.typescriptlang.org/play?#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6c5C1EtWgAsqOi1QAb06groEbjWg8vVHOKcAvpokshy3vEgyyMr8kEbQJogAFND2YREAlOaW1soBeJAoAHSIkMTRmbbI8e6aPMiZxJmgACqCGKhY6ABGyDnkFFQ0dIzMbBwCwqIccabcYLyQoKjIEmh8kwN8DLAc5PzwwbLMyAAeK77IACYaQSEjUWZWhfYAjABMAMwALA+gbsVjoADqgjKESytQPxCHghAByXigYgBfr8LAsYj8aQMUASbDQcRSExCeCwFiIQh+AKfAYyBiQFgOPyIaikSGLQo0Zj-aazaY+dSaXjLDgAGXgAC9CKhDqAALxJaw2Ib2RzOISuDycLw+ImBYKQflCkWRRD2LXCw6JCxS1JCdJZHJ5RAFIbFJU8ADKC3WzEcnVZaGYE1ABpFnFOmsFhsil2uoHuzwArO9SmAAEIsSFrZB-GgAjjA5gtVN8VCEc1o1C4Q4AGlR2AwO1EsBQoAAbvB-gJ4HhPgB5aDwem-Ph1TCV3AEEirTp4ELtRbTPD4vwKjOfAuioSQHuDXBcnmgACC+eCONFEs73YAPGGZVT5cRyyhiHh7AAON7lsG3vBggB8XGV3l8-nVISOgghxoLq9i7io-AHsayRWGaFrlFauq2rg9qaIGQHwCBqChtKdgRo8TxRjeyB3o+7xAA)，有时代替等效的匿名类型（可能需要也可能不需要）。接口在错误消息中将始终被命名。
- 类型别名不能参与 [声明合并，但接口可以](https://www.typescriptlang.org/play?#code/PTAEEEDtQS0gXApgJwGYEMDGjSfdAIx2UQFoB7AB0UkQBMAoEUfO0Wgd1ADd0AbAK6IAzizp16ALgYM4SNFhwBZdAFtV-UAG8GoPaADmNAcMmhh8ZHAMMAvjLkoM2UCvWad+0ARL0A-GYWVpA29gyY5JAWLJAwGnxmbvGgALzauvpGkCZmAEQAjABMAMwALLkANBl6zABi6DB8okR4Jjg+iPSgABboovDk3jjo5pbW1d6+dGb5djLwAJ7UoABKiJTwjThpnpnGpqPBoTLMAJrkArj4kOTwYmycPOhW6AR8IrDQ8N04wmo4HHQCwYi2Waw2W1S6S8HX8gTGITsQA)。
- 接口只能用于 [声明对象的形状，不能重命名基本类型](https://www.typescriptlang.org/play?#code/PTAEAkFMCdIcgM6gC4HcD2pIA8CGBbABwBtIl0AzUAKBFAFcEBLAOwHMUBPQs0XFgCahWyGBVwBjMrTDJMAshOhMARpD4tQ6FQCtIE5DWoixk9QEEWAeV37kARlABvaqDegAbrmL1IALlAEZGV2agBfampkbgtrWwMAJlAAXmdXdy8ff0Dg1jZwyLoAVWZ2Lh5QVHUJflAlSFxROsY5fFAWAmk6CnRoLGwmILzQQmV8JmQmDzI-SOiKgGV+CaYAL0gBBdyy1KCQ-Pn1AFFplgA5enw1PtSWS+vCsAAVAAtB4QQWOEMKBuYVUiVCYvYQsUTQcRSBDGMGmKSgAAa-VEgiQe2GLgKQA).
- 接口名称将 [*始终* 以其原始形式出现](https://www.typescriptlang.org/play?#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6c5C1EtWgAsqOi1QAb06groEbjWg8vVHOKcAvpokshy3vEgyyMr8kEbQJogAFND2YREAlOaW1soBeJAoAHSIkMTRmbbI8e6aPMiZxJmgACqCGKhY6ABGyDnkFFQ0dIzMbBwCwqIccabcYLyQoKjIEmh8kwN8DLAc5PzwwbLMyAAeK77IACYaQSEjUWY2Q-YAjABMAMwALA+gbsVjNXW8yxySoAADaAA0CCaZbPh1XYqXgOIY0ZgmcK0AA0nyaLFhhGY8F4AHJmEJILCWsgZId4NNfIgGFdcIcUTVfgBlZTOWC8T7kAJ42G4eT+GS42QyRaYbCgXAEEguTzeXyCjDBSAAQSE8Ai0Xsl0K9kcziExDeiQs1lAqSE6SyOTy0AKQ2KHk4p1V6s1OuuoHuzwArMagA) 在错误消息中，但 *只有* 在按名称使用时才会出现。

在大多数情况下，你可以根据个人喜好进行选择，TypeScript 会告诉你它是否需要其他类型的声明。如果您想要启发式方法，可以使用 `interface` 直到你需要使用 `type` 中的功能。

## 类型断言

有时您会获得 TypeScript 无法了解的值类型的信息。

例如，如果您使用`document.getElementById`，TypeScript 只知道这将返回某种*，*`HTMLElement`但您可能知道您的页面将始终具有`HTMLCanvasElement`给定 ID。

在这种情况下，您可以使用*类型断言*来指定更具体的类型：

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

与类型注释一样，类型断言会被编译器删除，并且不会影响代码的运行时行为。

您还可以使用尖括号语法（除非代码在文件中`.tsx`），其等效性如下：

```ts
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

> `null`提醒：由于类型断言在编译时被删除，因此不存在与类型断言相关的运行时检查。如果类型断言错误，则不会产生异常或生成异常。

TypeScript 仅允许将类型断言转换为*更具体*或*更不具体的*类型版本。此规则可防止“不可能”的强制转换，例如：

```ts
const x = "hello" as number;Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

有时此规则可能过于保守，并且将不允许可能有效的更复杂的强制转换。如果发生这种情况，您可以使用两个断言，首先是 to `any`（或`unknown`，我们将在后面介绍），然后是 to 所需类型：

```ts
const a = expr as any as T;
```

## 文字类型

除了一般类型`string`和之外`number`，我们还可以在类型位置引用*特定的*字符串和数字。

思考这个问题的一种方法是考虑 JavaScript 中声明变量的不同方式。 和 都`var`允许`let`更改变量中的内容，而 和`const`则不允许。 这反映在 TypeScript 如何为文字创建类型上。

```ts
let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;
      
let changingString: string
 
const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;
      
const constantString: "Hello World"
```

就其本身而言，文字类型并不是很有价值：

```ts
let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";Type '"howdy"' is not assignable to type '"hello"'.Type '"howdy"' is not assignable to type '"hello"'.
```

一个只能有一个值的变量没什么用！

但是通过将文字*组合*成联合体，您可以表达更有用的概念 - 例如，仅接受一组已知值的函数：

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```

数字文字类型的工作方式相同：

```ts
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

当然，你可以将它们与非文字类型结合起来：

```ts
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

还有一种文字类型：布尔文字。布尔文字类型只有两种，正如您可能猜到的那样，它们是类型`true`和`false`。类型`boolean`本身实际上只是 union 的别名`true | false`。

### 字面推理

当你用对象初始化变量时，TypeScript 会假定该对象的属性稍后可能会更改值。例如，如果你编写了如下代码：

```ts
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

TypeScript 并不认为将 分配`1`给之前已 的字段`0`是错误的。换句话说，`obj.counter`必须具有 类型`number`，而不是`0`，因为类型用于确定*读取*和*写入*行为。

这同样适用于字符串：

```ts
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

在上面的例子中，`req.method`被推断为`string`，而不是`"GET"`。因为可以在 的创建`req`和 的调用之间评估代码`handleRequest`， 可以像 一样分配一个新的字符串`"GUESS"`，`req.method`所以 TypeScript 认为此代码有错误。

有两种方法可以解决这个问题。

1. 您可以通过在任一位置添加类型断言来更改推断：

   ```ts
   // Change 1:
   const req = { url: "https://example.com", method: "GET" as "GET" };
   // Change 2
   handleRequest(req.url, req.method as "GET");
   ```

   变化 1 表示“我打算`req.method`始终使用*文字类型* `"GET"`”，以防止之后可能将 分配`"GUESS"`给该字段。变化 2 表示“我出于其他原因知道`req.method`具有值`"GET"`”。

2. 您可以使用`as const`将整个对象转换为类型文字：

   ```ts
   const req = { url: "https://example.com", method: "GET" } as const;
   handleRequest(req.url, req.method);
   ```

后缀`as const`的作用类似于`const`，但是对于类型系统而言，它确保所有属性都被分配文字类型，而不是像`string`或 这样的更通用的版本`number`。

## `null`和`undefined`

JavaScript 有两个原始值用于表示缺失或未初始化的值：`null`和`undefined`。

TypeScript 有两种同名的对应*类型*`strictNullChecks`。这些类型的行为取决于您是否启用了该选项。

### `strictNullChecks`离开

使用`strictNullChecks` *off 时*，值可能`null`或`undefined`仍然可以正常访问，并且值`null`和`undefined`可以分配给任何类型的属性。这与没有空检查的语言（例如 C#、Java）的行为方式类似。缺乏对这些值的检查往往是错误的主要来源；我们始终建议人们`strictNullChecks`在代码库中启用它（如果可行）。

### `strictNullChecks`在

使用`strictNullChecks` *on 时*，当值为`null`或 时`undefined`，您需要在对该值使用方法或属性之前测试这些值。就像`undefined`在使用可选属性之前检查 一样，我们可以使用*缩小范围*来检查可能为 的值`null`：

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

### 非空断言运算符（后缀`!`）

TypeScript 还具有一种特殊语法，用于从类型中删除`null`和 ，而无需进行任何显式检查。在任何表达式后写入实际上是类型断言，即值不是或：`undefined``!``null``undefined`

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

就像其他类型断言一样，这不会改变代码的运行时行为，因此仅`!`当您知道值*不能*`null`或时才使用这一点很重要`undefined`。

## 枚举

枚举是 TypeScript 添加到 JavaScript 中的一项功能，它允许描述可能是一组可能的命名常量之一的值。与大多数 TypeScript 功能不同，这不是*JavaScript的类型级添加，而是添加到语言和运行时的功能。因此，您应该知道这是一个功能，但除非您确定，否则最好不要使用。您可以在*[枚举参考页面](https://www.typescriptlang.org/docs/handbook/enums.html)中阅读有关枚举的更多信息。

## 不太常见的原语

值得一提的是 JavaScript 中类型系统中表示的其余原语。虽然我们不会在这里深入讨论。

##### `bigint`

从 ES2020 开始，JavaScript 中有一个用于非常大的整数的原语`BigInt`：

```ts
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);
 
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;
```

[您可以在TypeScript 3.2 发行说明](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html#bigint)中了解有关 BigInt 的更多信息。

##### `symbol`

JavaScript 中有一个原语，用于通过函数创建全局唯一引用`Symbol()`：

```ts
const firstName = Symbol("name");
const secondName = Symbol("name");
 
if (firstName === secondName) {This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap.This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap.
  // Can't ever happen
}
```

您可以在[符号参考页面](https://www.typescriptlang.org/docs/handbook/symbols.html)中了解有关它们的更多信息。