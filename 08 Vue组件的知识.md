### 08. Vue组件的知识

##### 8.1 组件使用步骤

> 1. 定义组件
> 2. 挂载组件
> 3. 使用组件

> - 定义组件最好是写在<script>之外，而且要加上独一无二的ID
> - 组件里面只能有一个根标签

```html
    <template id="test">
    <div>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </div>
</template>
```

> 组件要挂载在Vue实例上，最好还要提前定义一个对象存储起来

```js
 <script>
        let son = {
            template: '#test'
        }
        let vm = new Vue({
            el: "#app",
            components: {
                son,//这里是es6的写法，son:son可以简写为son
            }
        })
    </script>
```

> 使用对象

```html
<div id="app">
        <son></son>
        <son></son>
    </div>
```

> 最终的结果

![image-20200117160122166](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117160122166.png)

##### 8.2 子组件中的data

> 子组件中的data必须是一个函数，且必须要return一个对象
>
> 标准写法：

```js
let son = {
            template: '#test',
            data() {
                return {
                    arr: [1, 2, 3, 4, 5]
                }
            }
        }
```

> 在Vue开发工具中查看子组件data的返回值

<img src="C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117161603702.png" alt="image-20200117161603702" style="zoom:67%;" />

> 复用同一子组件时，某一个子组件中data数据的修改不会改变其他子组件

> 修改第一个子组件的name

<img src="C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117163210925.png" alt="image-20200117163210925" style="zoom: 67%;" />

> 第二个子组件的name没有改变

<img src="C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117163143185.png" alt="image-20200117163143185" style="zoom:67%;" />

##### 8.3 父子组件传值--父传子

> - 属性传值法
> - props是子组件用来接收父组件传值的接口

> 这是父组件中要传给子组件的信息

```js
  msg: "我是父组件中携带的数据",
```

> 子组件中动态绑定

```html
<son :message="msg"></son>
```

> 子组件接收绑定的变量

```js
 let son = {
            template: '#test',
            props: ['message']
        }
```

> 查看结果

<img src="C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117164630141.png" alt="image-20200117164630141" style="zoom: 67%;" />

> - 用数组接收表示对接收的数据不做任何修改
> - 如果要对传入的数据进行筛选,就需要用到对象格式

> 现在父组件中的数据

```js
 data: {
                msg1: "我是第一条数据",
                msg2: 2,
            },
```

> 子组件动态绑定两条数据

```HTML
<son :message1="msg1" :message2="msg2"></son>
```

> 子组件对每条数据的限制

```js
 props: {
                message1: {
                    type: Number,
                },
                message2: {
                    type: Number,
                }
            }
```

<img src="C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117170326495.png" alt="image-20200117170326495" style="zoom:67%;" />

![image-20200117170336183](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117170336183.png)

> 数据虽然还有, 但是报错了, 第一条数据不符合格式

> 子组件中能做出的限制和反映 : 
>
> default>>>当没有传递数据时生效, 可以当成默认传递的数据
>
> ![image-20200117170905481](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117170905481.png)

