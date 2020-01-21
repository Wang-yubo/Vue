### 08. Vue组件的知识

> 组件是可复用的 Vue 实例，且带有一个名字,会把HTML相关的代码直接整合到实例对象中,可以实现,一个实例多处

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

![image-20200117160122166](F:\learn Vue\images\image-20200117160122166.png)

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

<img src="F:\learn Vue\images\image-20200117161603702.png" alt="image-20200117161603702" style="zoom:67%;" />

> 复用同一子组件时，某一个子组件中data数据的修改不会改变其他子组件

> 修改第一个子组件的name

<img src="F:\learn Vue\images\image-20200117163210925.png" alt="image-20200117163210925" style="zoom: 67%;" />

> 第二个子组件的name没有改变

<img src="F:\learn Vue\images\image-20200117163143185.png" alt="image-20200117163143185" style="zoom:67%;" />

##### 8.3 父子组件传值--父传子

> - 属性传值法
> - props是子组件用来接收父组件传值的接口
> - props 是你可以在组件上注册的一些自定义特性。当一个值传递给一个 prop 特性的时候，它就变成了那个组件实例的一个属性。一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。

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

<img src="F:\learn Vue\images\image-20200117164630141.png" alt="image-20200117164630141" style="zoom: 67%;" />

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

<img src="F:\learn Vue\images\image-20200117170326495.png" alt="image-20200117170326495" style="zoom:67%;" />

![image-20200117170336183](F:\learn Vue\images\image-20200117170336183.png)

> 数据虽然还有, 但是报错了, 第一条数据不符合格式

> 子组件中能做出的验证 : 
>
> - default>>>当没有传递数据时生效, 可以当成默认传递的数据
>
> ![image-20200117170905481](F:\learn Vue\images\image-20200117170905481.png)
>
> -  required: true>>>表示必须要传, 不传报错
>
> ![image-20200117171901148](F:\learn Vue\images\image-20200117171901148.png)
>
> `type>>>type可以规定传入的值是哪一种类型或者是那些类型, 两种及其以上就要用数组规定: type:[String,Number]`
>
> - `validator(value){return}`>>>验证条件
>
> ```js
>  message2: {
>                     validator(value) {
>                         return value > 10
>                     }
> ```
>
> ![image-20200117174122698](F:\learn Vue\images\image-20200117174122698.png)
>
> 程序报错,但是数据仍然传过来了
>
> ![image-20200117174205600](F:\learn Vue\images\image-20200117174205600.png)
>
> emmm......只能解释为父爱真伟大了,就算是错的也要给

##### 8.4 父子组件传值--子传父

> 方法:`this.$emit`

> 步骤:定义子组件中要发送的内容>>>给子组件绑定点击发送的事件并且在子组件的方法中写上事件处理函数>>>在父组件中绑定子组件要发射过来事件,等待子组件的发射>>>在父组件的方法中写上子组件发射的事件的处理函数

```html
 <div id="app">
     <!--第三步:父组件中绑定子组件发射的事件 -->
        <son @xxx="handleClick"></son>    
</div>
    <template id="test">
    <div>
      我是子组件
         <!--第二步:子组件中定义发射事件  -->
      <button @click="handleClick">点击传值</button>
    </div>
</template>
```

```js
 <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let son = {
            template: '#test',
            data() {
                return {
                    name: '我是子组件中的数据'//第一步:定义要传递的数据
                }
            },
            methods: {//这里也算第二步:发射事件的处理函数
                handleClick() { //点击按钮把子组件data选项中的数据传递给父组件
                    this.$emit('xxx', this.name) //向父组件发射xxx(表示自定义)事件
                }
            }
        }
        let vm = new Vue({
            el: "#app",
            data: {

            },
            components: {
                son,
            },
            methods: {//第四步:写上父组件绑定的子组件发射事件的处理函数
                handleClick(value) {//该事件第一个值就是发射的数据,用value接收
                    console.log('事件触发了', value);

                }
            }
        })
    </script>

```

> 点击一次按钮

![image-20200117194530659](F:\learn Vue\images\image-20200117194530659.png)

##### 8.5 全局组件和局部组件

> - 局部组件就是必须挂载到父组件中才可以使用的组件, 上面所有的例子中用的都是局部组件
> - 全局组件是不用挂载到父组件中就可以使用的组件

> 下面是全局组件的写法: 

```js
 Vue.component('son', {
            template: '#test',
        })
```

> 第一个参数是存放子组件的变量名, 第二个参数是一个对象, 里面放子组件需要的属性和方法

```js
 let vm = new Vue({
            el: "#app",
            data: {},
        })
```

> 父组件没有挂载子组件, 子组件也可以使用

![image-20200117200031813](F:\learn Vue\images\image-20200117200031813.png)

##### 8.6  组件注册之组件名称要求

> - 在注册组件的时候,我们始终需要给他一个名字
> - 应用特定样式和约定的基础组件(也就是展示类的 无逻辑的或无状态的组件)应该全部以一个特定的前缀开头,比如Base, App, 或v
>
> 他们的名字通常包含包裹元素的名字(比如BaseButton, BaseTable), 除非没有现成的对应功能的元素, 好处就是: 
>
> 1. 当不在编辑器中以字母顺序排序时,你的应用的基础组件会全部排列在一起, 这样更容易识别
> 2. 因为组件名应该始终是多个单词, 所以这样做可以避免你在包裹简单组件时随意选择前缀

> 大小写方法 : 
>
> 1. 使用`kebab-case`(烤肉串式)
> 2. 使用`PascalCase`(首字母大写)
>
> 当使用`PascalCase`定义一个组件时,你在引用这个自定义元素时两种命名法都可以使用 , 也就是说<my-component-name>和<MyCompentonName>都是可以接受的.
>
> 注意:尽管如此, 直接在DOM(即非字符串模板)中使用时只有`kabab-case`是有效的

##### 8.7 动态组件

> 有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个新闻网站实现多新闻内容选项卡,可以通过 Vue 的 <component> 元素加一个特殊的 is 特性来实现：

> 动态选项卡示例:

> 定义三个组件模板

<img src="F:\前端开发\learn canvas\images\image-20200121221154519.png" alt="image-20200121221154519" style="zoom:80%;" />

> 实例化并且挂载组件模板

<img src="F:\前端开发\learn canvas\images\image-20200121221253317.png" alt="image-20200121221253317" style="zoom:80%;" />

> 设置数据, 完成切换的事件处理函数, 之所以写在computed属性里面是因为每个组件名前要加 `tab-` 前缀

<img src="F:\前端开发\learn canvas\images\image-20200121221517960.png" alt="image-20200121221517960" style="zoom:80%;" />

> 完成动态组件的绑定

![image-20200121221707362](F:\前端开发\learn canvas\images\image-20200121221707362.png)

> 效果: 

![](F:\learn Vue\images\选项卡.gif)

