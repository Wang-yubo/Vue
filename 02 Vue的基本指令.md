### 02. Vue的基本指令

##### 2.1 v-once

> 上面有介绍过，如何将一个Vue实例中的data对象中的数据渲染到dom元素中，但是如果我们只想在网页加载时，只渲染一次数据，后期即便 是data中的数据变化了，我们也不要再次进行渲染，那么我们可以用v-once指令。

```HTML
<div id="app" v-once>
        {{msg+"hello world"}}
    </div>
<script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                msg: "王雨波",
            }
        })
    </script>
```

![image-20200114193846325](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200114193846325.png)

> 在控制台中将msg改成王某某，div中的数据也不会变

##### 2.2 v-html

> - `v-html`标签代码渲染。
> - 双大括号会将数据解析为普通文本，而非HTML代码。为了输出真正的HTML，我们可以使用`v-html`指令。

> 没有加`v-html`的时候

```HTML
<div id="app" >
        {{msg+"hello world"}}
    </div>
```

![image-20200114194734596](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200114194734596.png)

> 加上`v-html`之后

```HTML
 <div id="app" v-html="msg">
        {{msg+"hello world"}}
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                msg: "<p style = 'color:red;'>王雨波</p>",
            }
        })
    </script>
```

![image-20200114195107430](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200114195107430.png)

##### 2.3 v-if

> if指令可以完全可以根据表达式的值在dom中生成或移除一个元素。如果v-if表达式赋值为false，那么对应的元素就会从dom中移除；否则，对应元素的一个克隆将被重新插入dom。记住，这个是直接决定是否在网页进行渲染，而不是元素是否显示。

> 用v-if绑定的布尔值来控制显示那一句诗：

```HTML
<div id="app">
        <p v-if="toggle">{{msg1}}</p>
        <p v-if="!toggle">{{msg2}}</p>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                msg1: "落霞与孤鹜齐飞，秋水共长天一色",
                msg2: "渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。",
                toggle: true,
            }
        })
    </script>
```

> 如果toggle为true，则渲染msg1

![image-20200114201631095](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200114201631095.png)

> 将toggle修改为false，则渲染msg2

![image-20200114201721218](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200114201721218.png)

