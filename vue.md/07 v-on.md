### 07. Vue的基本指令5

##### 7.1 v-on

> v-on指令的出现就是为了简化原生js操作事件的复杂性

```HTML
 <div id="app">
        <button v-on:click="handleClick" v-on:mouseenter="handleMouseenter">点击/移入</button>
    </div>
```

```js
  methods: {
                handleClick() {
                    console.log("点击事件");
                },
                handleMouseenter() {
                    console.log("鼠标移入");
                }
            },
```

> 移入并且点击一次

![image-20200116202203766](F:\learn Vue\images\image-20200116202203766.png)

> 由于在Vue中经常使用v-on，所以Vue提供了v-on的缩写@
>
> v-on：事件名="函数名">>> @事件名="函数名"

> 有一点需要注意的是"函数名"中函数是否要加括号的问题
>
> 不加括号：

```HTML
 <button v-on:click="handleClick" v-on:mouseenter="handleMouseenter">点击/移入</button>
```

![image-20200116202203766](F:\learn Vue\images\image-20200116202203766.png)

> 加括号：

```html
 <button v-on:click="handleClick()" v-on:mouseenter="handleMouseenter()">点击/移入</button>
```

![image-20200116202203766](F:\learn Vue\images\image-20200116202203766.png)

> 看起来加不加括号都一样，没什么区别
>
> 但是在Vue里面加括号表示要传递参数，而且是一定要你传一个参数进去

```js
handleClick(e) {
                    console.log("点击事件", e);
                },
```

> 我们给点击事件传入一个参数，

![image-20200116202924140](F:\learn Vue\images\image-20200116202924140.png)

> 返回了一个事件对象

> 如果我们加了括号又不传递参数：

![image-20200117135632468](F:\learn Vue\images\image-20200117135632468.png)

> 那么返回一个undefined，意味着此时e不再是事件对象了，而是一个新的变量，不过由于我们没有传参，所以没有赋值，返回undefined

> 那我非要加括号，又要返回事件对象呢？
>
> 那就只能传入参数，并且是一个特殊的参数`&event`

```html
 <button v-on:click="handleClick($event)" v-on:mouseenter="handleMouseenter">点击/移入</button>
```

```js
  handleClick(e) {
                    console.log("点击事件", e);
                },
```

![image-20200117140425463](F:\learn Vue\images\image-20200117140425463.png)

> 此时就接收到了该事件对象

##### 7.2 事件修饰符  "."

> -  .once 一次性事件
> - .stop 阻止冒泡
> - .capture 让元素的事件处理函数在元素的捕获阶段触发（冒泡阶段不会再触发了）
> - .self 触发事件的元素必须是自身才能触发事件处理函数
> - .prevent 阻止事件的默认行为

##### 7.3 按键修饰符

> 常见的一些按键修饰符：
>
> - .enter
> - .tab
> - .delete
> - .esc
> - .space
> - .up
> - .down
> - .left
> - .right

