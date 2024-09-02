## Input type=range 概述

1、[HTML5](https://so.csdn.net/so/search?q=HTML5&spm=1001.2101.3001.7020) 拥有多个新的表单输入类型，这些新特性提供了更好的输入控制和验证，range 就是其中一个。

2、range 类型用于应该包含一定范围内数字值的输入域，可以设定对所接受的数字进行限定：

| 属性  | 值       | 描述                                                         |
| :---- | :------- | :----------------------------------------------------------- |
| max   | *number* | 规定允许的最大值                                             |
| min   | *number* | 规定允许的最小值                                             |
| step  | *number* | 规定合法的数字间隔（如果 step="3"，则合法的数是 -3,0,3,6 等） |
| value | *number* | 规定默认值                                                   |

3、range 类型显示为滑动条。

## 单个滑动条编码示例

1、为了操作 dom 元素方便，使用了点 JQuery ，但是滑动条完全是 type=range 的 input 域的功能，实现代码如下：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <!-- 适配移动端-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <title>input type="range"实现音量控制</title>
        <script src="https://libs.baidu.com/jquery/2.1.4/jquery.min.js"></script>
        <style type="text/css">
            input[name='volumeInput'] {
                width: 500px;
                font-size: 30px;
            }
            fieldset {
                width: 90%;
            }
        </style>
        <script type="text/javascript">
            $(function () {
                /**音量控制：当滑动条的值变化时，就会触发此方法
             * oninput 事件在 <input> 或 <textarea> 元素的值发生改变时触发
             * oninput 是纯 js 事件，JQuery 没有提供对应的事件，所以使用 get(0) 将 JQuery 对象转为 DOM 对象
             * */
                $("input[name='volumeInput']").get(0).oninput = function () {
                    var volumeInputJQ = $("input[name='volumeInput']");
                    var volumeValue = volumeInputJQ.val();
                    $("#volumeShow").text(volumeValue + "%");//修改显示的值
                    var srcOld = volumeInputJQ.prev().attr("src");//获取 src 属性值
                    var matched = srcOld.match(/volume_1/g);//g表示全局匹配是否含有 srcOld 中含有"volume_1"字符串
                    /**当滑动条数值等于0 时，如果图标为非静音，则将它设置为静音图标
                 * 反之亦然，当滑动条数值大于0 时，如果图标为静音图标，则应该将其设置为非静音图标
                 */
                    if (volumeValue == 0 && matched != null) {
                        volumeInputJQ.prev().attr("src", srcOld.replace("_1", "_0"));//切换为静音图标
                    }

                    if (volumeValue != 0 && matched == null) {
                        volumeInputJQ.prev().attr("src", srcOld.replace("_0", "_1"));//切换为非静音图标
                    }
                };
                /**
             * 为 type=range的 input绑定 changle 事件
             */
                $("input[name='volumeInput']").change(function () {
                    var volumeValue = $(this).val();
                    console.log("向服务器提交:" + volumeValue);
                });

                /**
             * 为静音、非静音图标绑定单击事件
             */
                $("#mute").click(function () {
                    var srcOld = $(this).attr("src");//获取 src 属性值
                    var matched = srcOld.match(/volume_1/g);//g表示全局匹配是否含有 srcOld 中含有"volume_1"字符串
                    if (matched != null) {//match没有匹配时返回 null，否则返回匹配的数组
                        $(this).attr("src", srcOld.replace("_1", "_0"));//切换为静音图标
                        console.log("往服务器发送数据：静音");
                    } else {//当前为静音
                        $(this).attr("src", srcOld.replace("_0", "_1"));//切换为非静音图标
                        console.log("往服务器发送数据：非静音");
                    }
                });
            });
        </script>
    </head>
    <body>
        <form>
            <fieldset>
                <legend>音量控制</legend>
                <img src="images/volume_1.png" id="mute">
                <input type="range" name="volumeInput" min="0" max="100" step="2" value="10"/>
                <span id="volumeShow">10%</span>
            </fieldset>
        </form>
    </body>
</html>
```

2、实现的效果和 Windows 系统音量的操作类似，如下所示：

![1](Html5Inputtype=range滑动条.assets/1.gif)

> 1）如果滑动数据变化后需要立即向服务器发送的，可以在 oninput 事件中操作，但这样可能会导致请求过于频繁
>
> 2）建议在用户改变滑动条数据而且元素失去焦点后再向服务器发送数据，这样减轻服务器被频繁访问的压力，此时在 change 事件中进行数据发送即可。

3、上面的 change 事件亲测在本人手机上使用与 PC 端一致，但在苹果的 Ipad 上的某个 Safari 版本上使用时，发现 onchange 事件的效果与 oninput 的效果是一样的，即元素还未失去焦点，就已经触发了，此时可以使用 touchend 事件替代 change 事件，如下所示：

```javascript
/**
             * 为 type=range的 input绑定 触摸结束事件(touchend),手指离开触摸屏时触发
             */
var volumeValuePre = -1;
$("input[name='volumeInput']").on('touchend', function () {
    var volumeValue = $("input[name='volumeInput']").val();
    if (volumeValuePre != volumeValue) {
        console.log("用户滑动结束，发送数据：" + volumeValue);
        volumeValuePre = volumeValue;
    } else {
        console.log("用户滑动结束，但值并未变化...");
    }
});
```

> W3c HTML5 新的 Input 类型：[http://www.w3school.com.cn/html5/html*5*form*input*types.asp](http://www.w3school.com.cn/html5/html_5_form_input_types.asp)
>
> HTML <fieldset> 标签：http://www.w3school.com.cn/tags/tag_fieldset.asp
>
> oninput 事件（菜鸟教程）:http://www.runoob.com/jsref/event-oninput.html
>
> oninput 事件（W3c）：https://www.w3cschool.cn/jsref/event-oninput.html
>
> JQery 文档：http://jquery.cuishifeng.cn/

示例中使用的图标资源：

![img](https://i-blog.csdnimg.cn/blog_migrate/05e1b8223af5ed9d5b7def9071195dee.png)   ![img](https://i-blog.csdnimg.cn/blog_migrate/0099e3d2008c822e65798f954a0c9d5a.png)

## 多个滑动条编码示例

![2](Html5Inputtype=range滑动条.assets/2.gif)

实现代码如下：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">

        <!-- 适配移动端-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <title>input type="range"实现音量控制</title>
        <script src="https://libs.baidu.com/jquery/2.1.4/jquery.min.js"></script>
        <style type="text/css">
            body {
                /*background-color: #344861;*/
                /*color: #ffffff;*/
            }
            input[type='range'] {
                width: 500px;
                font-size: 30px;
            }

            fieldset {
                width: 90%;
                margin-top: 20px;
            }
        </style>
        <script type="text/javascript">
            /**
         * 滑动条变化事件，当滑动条数值变化时自动触发
         * 注意：传入的参数 inputDom 的值如果和 type="range" 标签的 id 一致，则此时 inputDom 就表示 input 标签的 DOM 对象
         */

            function inputHandler(inputDom) {
                var inputJQ = $(inputDom);//DOM 对象转 JQuery 对象
                var currentVolume = inputJQ.val();
                inputJQ.next().text(currentVolume + "%");//input 后面 span 的值
                var srcOld = inputJQ.prev().attr("src");//获取 src 属性值
                var matched = srcOld.match(/volume_1/g);//g表示全局匹配是否含有 srcOld 中含有"volume_1"字符串
                if (currentVolume == 0 && matched != null) {
                    inputJQ.prev().attr("src", srcOld.replace("_1", "_0"));//切换为静音图标
                }
                if (currentVolume != 0 && matched == null) {
                    inputJQ.prev().attr("src", srcOld.replace("_0", "_1"));//切换为非静音图标
                }
            }

            $(function () {
                /**
             * 为 type=range 的 input绑定 触摸结束事件(touchend),手指离开触摸屏时触发
             */
                var volumeValuePre = -1;
                $("input[type='range']").on('touchend', function () {
                    var volumeValue = $(this).val();
                    if (volumeValuePre != volumeValue) {
                        console.log("用户滑动结束，发送数据：" + volumeValue);
                        volumeValuePre = volumeValue;
                    } else {
                        console.log("用户滑动结束，但值并未变化...");
                    }
                });

                /**
             * 为所有的 静音、非静音图标绑定单击事件
             */

                $("img[name='muteIco']").click(function () {
                    var srcOld = $(this).attr("src");//获取 src 属性值
                    var matched = srcOld.match(/volume_1/g);//g表示全局匹配是否含有 srcOld 中含有"volume_1"字符串
                    if (matched != null) {//match没有匹配时返回 null，否则返回匹配的数组
                        $(this).attr("src", srcOld.replace("_1", "_0"));//切换为静音图标
                        console.log("往服务器发送数据：静音");
                    } else {//当前为静音
                        $(this).attr("src", srcOld.replace("_0", "_1"));//切换为非静音图标
                        console.log("往服务器发送数据：非静音");
                    }
                });
            });
        </script>
    </head>
    <body>
        <fieldset>
            <legend>前厅播放音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_1)" id="range_1"/>
            <span>10%</span>
        </fieldset>
        <fieldset>
            <legend>讲解话筒音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_2)" id="range_2"/>
            <span>10%</span>
        </fieldset>
        <fieldset>
            <legend>办公区域音箱音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_3)" id="range_3"/>
            <span>10%</span>
        </fieldset>
        <fieldset>
            <legend>综合展览区域音箱音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_4)" id="range_4"/>
            <span>10%</span>
        </fieldset>
        <fieldset>
            <legend>功能厅领夹麦1音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_5)" id="range_5"/>
            <span>10%</span>
        </fieldset>
        <fieldset>
            <legend>功能厅领夹麦2音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_6)" id="range_6"/>
            <span>10%</span>
        </fieldset>
        <fieldset>
            <legend>功能厅领夹麦3音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_7)" id="range_7"/>
            <span>10%</span>
        </fieldset>
        <fieldset>
            <legend>无线会议话筒音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_8)" id="range_8"/>
            <span>10%</span>
        </fieldset>
        <fieldset>
            <legend>有线话筒音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_9)" id="range_9"/>
            <span>10%</span>
        </fieldset>
        <fieldset>
            <legend>视频会议终端音量</legend>
            <img src="images/volume_1.png" name="muteIco">
            <input type="range" min="0" max="100" step="2" value="10" oninput="inputHandler(range_10)" id="range_10"/>
            <span>10%</span>
        </fieldset>
    </body>
</html>
```

> 注意这里使用 touchend 触摸结束事件代替了 change 变化事件，移动端时 touchend 才有效，如果用于 PC 端，可以替换成 change 事件

## 修改滑动条默认样式

1、从上面可以看出来 type=range 的默认样式在有些时候并不能满足需要，不说别的，就说上面的滑块按钮在移动端时默认太小，导致滑动的时候很吃力

2、这里以上面的“多个滑动条编码示例”为基础，修改默认的样式如下：

```html
<style type="text/css">
    body {
        background-color: #344861;
        color: #ffffff;
    }
    /*给滑动条添加样式*/
    input[type="range"] {
        -webkit-appearance: none; /*禁用滑动条的默认样式*/
        border-radius: 15px; /*设置滑动条的圆角大小*/
        width: 60%; /*设置滑动条的宽*/
        height: 10px; /*设置滑动条的高*/
        background-color: #313335; /*设置滑动条的背景色*/
    }
    /*给滑块(thumb)添加样式*/
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /*禁用滑动条上的按钮的默认样式*/
        border-radius: 15px; /*设置滑动条上的按钮的圆角大小*/
        height: 30px; /*设置滑块的高，应该比滑动条要大一些*/
        width: 20px; /*设置滑块的宽*/
        top: -5px; /*让滑块向上偏移 (滑块高-滑动条高)/2*/
        background-color: #ffffff; /*设置滑块的背景色*/
    }
    /*滑动条控件获取到焦点时，会显示包裹整个控件的边框，可以将把边框取消*/
    input[type=range]:focus {
        outline: none;
    }
    fieldset {
        width: 90%;
        margin-top: 20px;
    }
</style>
```

3、此时效果如下：

![3](./Html5Inputtype=range滑动条.assets/3.gif)



> 温馨提示：亲测在苹果的 iPad 的 Safari 浏览器上时，如果滑动条外围使用了 "-webkit-overflow-scrolling: touch;"样式，则滑动条偶尔会出现滑动失灵的情况，建议此时不要设置 "-webkit-overflow-scrolling: touch;"样式，或者设置为 "-webkit-overflow-scrolling: auto;"
>
> ```bash
> -webkit-overflow-scrolling 属性控制元素在移动设备上是否使用滚动回弹效果.
> 
> auto: 使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。
> 
> touch: 使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比,就像ios原生的滚动条一样流畅。
> ```

 