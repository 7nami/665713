# React表单操作

1. 受控组件：表单元素完全受 React 的控制，不受用户控制。
2. 非受控组件：表单元素不受 React 的控制，受用户控制。

## 非受控组件

1、设置默认值

输入框如果要作为非受控组件，我们需要用 `defaultValue` 来设置输入框的默认值。

单复选框如果要作为非受控组件，我们需要用 `defaultChekced` 来设置单复选框的默认选中。

```react
const FormComponent = () => {
    return (
        <input type="text" defaultValue="hello" />
    )
}
export default FormComponent
```

2、获取表单元素的值

如果要获取非受控组件的值，需要通过 ref 属性来绑定元素节点，通过获取元素节点，来得到节点中值：

```react
import React, { useRef } from 'react'
const FormComponent = () => {
    const inputRef = useRef(null);
    console.log(inputRef);   // { current: null }
    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={() => {
                console.log('获取输入框节点', inputRef.current);
            }}>搜索</button>
        </div>
    )
}
export default FormComponent
```

## 受控组件

1、输入框

```react
import React, { useState } from 'react'
const FormComponent = () => {
    const [msg, setMsg] = useState('');
    return ( 
        <input type="text" value={msg} onChange={(e) => {
            setMsg(e.target.value)
        }} />     
    )
}
```

2、下拉列表

```react
import React, { useState } from 'react'
const FormComponent = () => {
    const [city, setCity] = useState('');
    return (
        <select value={city} onChange={(e) => {
            setCity(e.target.value);
        }}>
            <option value="四川">四川</option>
            <option value="贵州">贵州</option>
            <option value="云南">云南</option>
        </select>
    )
}
export default FormComponent
```

3、单选按钮

```react
import React, { useState } from 'react'
const FormComponent = () => {
    const [gender, setGender] = useState('');
    return (
        <div>
            <input type="radio" checked={gender == '男'} onChange={() => {
                setGender('男');
            }} />
            <label>男</label>
            <input type="radio" checked={gender == '女'} onChange={() => {
                setGender('女');
            }} />
            <label>女</label>
        </div>  
    )
}
export default FormComponent
```

4、单个复选框

```react
import React, { useState } from 'react'
const FormComponent = () => {  
    const [isAgree, setIsAgree] = useState(false);
    return (
        <div>
            <input type="checkbox" checked={isAgree} onChange={() => {
                setIsAgree(!isAgree);
            }} />
            <label>我已阅读并同意以上协议</label>
        </div>
    )
}
export default FormComponent
```

5、多个复选框

```react
import React, { useState } from 'react'
const FormComponent = () => {
    const [likes, setLikes] = useState(['睡觉']);
    return (
        <div>
            <input type="checkbox" checked={likes.includes('吃饭')} onChange={(e) => {
                if (e.target.checked) {
                    setLikes([
                        ...likes,
                        '吃饭'
                    ])
                } else {
                    setLikes(likes.filter(item => item != '吃饭'))
                }
            }} />
            <label>吃饭</label>
            <input type="checkbox" checked={likes.includes('睡觉')} onChange={(e) => {
                if (e.target.checked) {
                    setLikes([
                        ...likes,
                        '睡觉'
                    ])
                } else {
                    setLikes(likes.filter(item => item != '睡觉'))
                }
            }} />
           <label>睡觉</label>
            <input type="checkbox" checked={likes.includes('打豆豆')} onChange={(e) => {
                if (e.target.checked) {
                    setLikes([
                        ...likes,
                        '打豆豆'
                    ])
                } else {
                    setLikes(likes.filter(item => item != '打豆豆'))
                }
            }} />
            <label>打豆豆</label>
        </div>
    )
}
export default FormComponent
```

