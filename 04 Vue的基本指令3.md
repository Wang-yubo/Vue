### 04. Vue的基本指令3

##### 4.1 v-bind

> v-bind用于相应HTML的数据更新，将一个或多个属性与组件里面的值进行动态绑定，值变了属性就发生变化。这里面最好是单向的数据流，通过vm来控制view。好处就是从此以后网页内容的显示就不容再操作dom了。直接操作数据就行了。

> 这是v-bind绑定属性：

```HTML
<div id="app">
        <img v-bind:src="imgs[0].src" v-bind:width="width">
        <img v-bind:src="imgs[1].src" v-bind:width="width">
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let imgs = [{
            src: 'images/动漫 - 7.jpg'
        }, {
            src: 'images/动漫 - 18.jpg'
        }]
        let vm = new Vue({
            el: "#app",
            data: {
                imgs: [{
                    src: 'images/01.jpg'
                }, {
                    src: 'images/02.jpg'
                }],
                width: "400",
            },
        })
    </script>
```

![image-20200115203953658](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200115203953658.png)

> 在控制台改改数据：

![image-20200115204042409](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200115204042409.png)

> 图片直接变了

> 这是v-bind又绑定类名，又绑定属性：

```js
 <img v-bind:class="{active:isShow}" v-bind:src="imgs[0].src">
```

![image-20200115205256422](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200115205256422.png)

> 将isShow的值改为fasle

![image-20200115205530465](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200115205530465.png)

此时，img标签里面的类名便没有了

![image-20200115205548725](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200115205548725.png)

> `v-bind：class="classObject"`,这里面的`classObject`如果是个对象，他会按照对象的模式来解析，如果`classObject`是个数组的话，他会把单个数组的返回值当做类名，如果返回值是个string，那string直接设置为类名，如果返回值还是一个对象的话，那么它会按照最开始解析对象那样再对对象进行一次深度解析，从而得到里面的string返回值，然后才把string设置为类名。

> `v-bind：class`的后面手动增加一个class=“”，采取合并类名的方式，而不是覆盖

```HTML
 <img v-bind:class="{active:isShow}" class="wangyubo" v-bind:src="imgs[0].src">
```

![image-20200115212443064](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200115212443064.png)

> 这样设置的好处在于可以通过手动添加类型增加一个标准模板，然后通过动态类名来变化

> 现在是`v-bind：style`

```html
<div id="app">
        <p v-bind:style="cssData">王雨波</p>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                cssData: {
                    fontSize: 48 + "px",
                    color: 'red',
                },
            },
        })
    </script>
```

![image-20200115214721819](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200115214721819.png)

![image-20200115214743456](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200115214743456.png)

> 如果有多个`cssData`这样的对象：

```js
data: {
                cssData: {
                    fontSize: 48 + "px",
                },
                cssData2: {
                    color: 'red',
                }
            },
```

> 那么添加的时候用数组：

```html
<p v-bind:style="[cssData,cssData2]">王雨波</p>
```

![image-20200115215537018](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200115215537018.png)

