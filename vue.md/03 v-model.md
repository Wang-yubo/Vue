### 3 Vue的基本指令2

##### 3.1 v-model

> v-model指令用来在input、select、text、checkbox、radio等表单控件元素上创建双向数据绑定。根据控件类型v-mode1自动选取正确的方法更新元素。

```js
<div id="app">
        <input type="text" v-model="msg1">
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                msg1: "落霞与孤鹜齐飞",
            }
        })
    </script>
```

![image-20200115152020583](..\images\image-20200115152020583.png)

> - 我们现在可以看出，input里面没有value值，本来应该显示为空，但是我们设置了v-model把msg1绑定给input之后，input的value就变成了msg1
> - 并且，此时再设置value="关山难越"，仍然不会改变input框里的值

![image-20200115152249058](..\images\image-20200115152249058.png)

> 虽然再设置的value值不会显示在input框之中，但是value值仍在input元素里

> 在input后面再加上一个插值符号绑定的msg1

```js
<input type="text" v-model="msg1" value="关山难越">{{msg1}}
```

![image-20200115153208106](..\images\image-20200115153208106.png)

> 以上就是数据双向绑定中，vmodel的改变对view的改变

> 现在我们试着在input框中改变数据：

![](..\images\vm.gif)

> 此时input框中的元素改变就能同步改变插值符号中msg1所携带的数据了

> 需要注意的是v-model只绑定表单元素有效，对div，p等标签会报错

![image-20200115155132680](..\images\image-20200115155132680.png)

> 其他需要注意的点：
>
> vm到view会如实解析字符串中的空格换行符等等，但是view到vm则不会，多个空格只会被解析为一个空格，换行符也解析为一个空格
>
> 一个vm绑定两个view时，两个view都会改变vm从而改变另一个view

> v-model在checkbox中：

```js
<div id="app">
        <input type="checkbox" id="checkb" v-model="toggle">
        <label for="checkb">{{toggle}}</label>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                msg1: "落霞与孤鹜齐飞",
                toggle: true,
            }
        })
    </script>
```

> 此时，CheckBox为true，勾上

![image-20200115161002769](..\images\image-20200115161002769.png)

> 点击一下true，取消勾上，结果变成了false

![image-20200115161050769](..\images\image-20200115161050769.png)

> 其中逻辑是，在checkbox中只有true or false两种状态，点击会改变状态，而绑定了v-model之后，view将改变了的状态传给vmodel，覆盖了原本的true or false，所以实现了点击改变状态。

> 假如我们将初始toggle的值改成一个字符串“王雨波”

```js
toggle: "王雨波",
```

![image-20200115161622577](..\images\image-20200115161622577.png)

> 点击CheckBox一次：

![image-20200115161644655](..\images\image-20200115161644655.png)

> 点击CheckBox二次：

![image-20200115161705294](..\images\image-20200115161705294.png)

> 点击CheckBox三次：

![image-20200115161749982](..\images\image-20200115161749982.png)

> 点击CheckBox四次：

![image-20200115161802287](..\images\image-20200115161802287.png)

> 除了初始值是字符串“王雨波”之外，后面显示的只有true or false 了。其中的逻辑仍然和上面的一样

> - 如果是多个CheckBox呢？按照上面的逻辑，改变一个岂不是其他的全都跟着一起变了？
> - 没错，如果都绑上v-model，而toggle只是一个true or false的话确实是牵一发而动全身
> - 那怎么解决这个问题呢？

> 第一种方案，将toggle的值写成一个空数组，然后绑定v-model的时候指定下标

```js
<div id="app">
        <p>你最喜欢《写给黄淮》中的那句歌词？</p>
        <input type="checkbox" id="checkb1" v-model="toggle[0]">
        <label for="checkb1">{{msg1}}</label>
        <br />
        <input type="checkbox" id="checkb2" v-model="toggle[1]">
        <label for="checkb2">{{msg2}}</label>
        <br />
        <input type="checkbox" id="checkb3" v-model="toggle[2]">
        <label for="checkb3">{{msg3}}</label>
        <br />
        <input type="checkbox" id="checkb4" v-model="toggle[3]">
        <label for="checkb4">{{msg4}}</label>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                msg1: "你是我患得患失的梦，我是你可有可无的人",
                msg2: "你是我辗转反侧的梦，我是你如梦山河的故人",
                msg3: "你是我情深似海的依赖，我是你早已过时的旧爱",
                msg4: "你要我坚持我的执着，你让我明白为谁而活",
                toggle: [],
            }
        })
    </script>
```

> 现在的多选框是这样的：

<img src="..\images\image-20200115164212212.png" alt="image-20200115164212212" style="zoom:50%;" />

> 勾上前两个，并且在控制台查看`vm.toggle`

<img src="..\images\image-20200115164317641.png" alt="image-20200115164317641" style="zoom:50%;" />

![image-20200115164332570](..\images\image-20200115164332570.png)

> 这样就可以分别勾选了
>
> 再来看第二种方案：仍然是将toggle的值设为空数组，现在在CheckBox里面加上value的值，但是取消麻烦的下标。

```js
 <div id="app">
        <p>你最喜欢那个歌手的歌？</p>
        <input type="checkbox" id="checkb1" v-model="toggle" value="赵雷">
        <label for="checkb1">赵雷</label>
        <br />
        <input type="checkbox" id="checkb2" v-model="toggle" value="解忧邵帅">
        <label for="checkb2">解忧邵帅</label>
        <br />
        <input type="checkbox" id="checkb3" v-model="toggle" value="李荣浩">
        <label for="checkb3">李荣浩</label>
        <br />
        <input type="checkbox" id="checkb4" v-model="toggle" value="李宗盛">
        <label for="checkb4">李宗盛</label>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                toggle: [],
            }
        })
    </script>
```

> 现在勾选第一个和第四个：



<img src="..\images\image-20200115165712143.png" alt="image-20200115165712143" style="zoom: 80%;" />

> 查看此时`vm.toggle`

![image-20200115165737173](..\images\image-20200115165737173.png)

> 他居然把value值给传进数组了，而不是传入布尔值
>
> 现在的逻辑呢？此时CheckBox的逻辑为是否传入value值？true传入，false不传入
>
> 这种情况下，如果要设置一个默认勾选上的值，那就把这个值放进toggle的数组里面。

```js
 toggle: ["赵雷"],
```

<img src="..\images\image-20200115170713419.png" alt="image-20200115170713419" style="zoom: 80%;" />

> 现在再试试把复选框改成单选框：默认没有选中状态

<img src="..\images\image-20200115171253460.png" alt="image-20200115171253460" style="zoom: 80%;" />

> 点击李荣浩，查看`vm.toggle`：

![image-20200115171335039](..\images\image-20200115171335039.png)

> 现在变成了，点击那个选项，就把那个值传入`vm.toggle`

> 那如何设置一个默认选中呢？像上面一样设置一个`toggle=["赵雷"]`吗？看看效果：

```js
toggle: ["赵雷"]
```

<img src="..\images\image-20200115172153621.png" alt="image-20200115172153621" style="zoom: 80%;" />

> 没有选中赵雷这个选项，没有效果，为什么呢？
>
> 因为现在是单选框了，不需要用到数组了啊

```js
toggle: "赵雷"
```

<img src="..\images\image-20200115172650745.png" alt="image-20200115172650745" style="zoom: 80%;" />

> 为什么这样可以呢？我们可以监测一下，toggle值的变化：

```js
 watch: {
                toggle: function(newValue) {
                    console.log(typeof newValue, newValue);
                }
            }
```

![image-20200115173129473](..\images\image-20200115173129473.png)

> 从结果来看，toggle是一个字符串类型的值，每次选中一个都会把相应的值传给toggle，所以现在预存一个字符串类型的value就相当于给了他一个结果，自然可以选中了。

> 总结：选中的状态和value值相对应

> 现在手动绑定value值：

```js
  <div id="app">
        <p>她喜欢我吗？</p>
        <input type="checkbox" true-value="喜欢" false-value="不喜欢" v-model="toggle">{{toggle}}
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                toggle: '',
            },
        })
    </script>
```

> 如果我们不绑定value，那么点击复选框得到的是true of false，现在我们给value强行绑定字符串

> 没点击的时候：

![image-20200115175005490](..\images\image-20200115175005490.png)

> 点击一次：

<img src="..\images\image-20200115175046357.png" alt="image-20200115175046357"  />

> 点击二次：

![image-20200115175108237](..\images\image-20200115175108237.png)

> 手动定义value的话是string，不然是布尔值

> 小结 : 
>
> - v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源
> - v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
>
>
> 1. text 和 textarea 元素使用 value 属性和 input 事件；
> 2. checkbox 和 radio 使用 checked 属性和 change 事件；
> 3. select 字段将 value 作为 prop 并将 change 作为事件。

###### 3.1.1`v-model.lazy`

> 在iuput框中实现了v-model的数据双向绑定，此时在input框中输入可以实时改变数据，这是oninput事件，而在v-model后面加上修饰符.lazy后，oninput事件就变成了onchange事件，这样可以减少刷新次数，但是没有好坏之分

###### 3.1.2`v-model.number`

> 原本input框中输入的数字是字符串类型的

```js
<div id="app">
        <input type="text" v-model="msg">{{msg}}
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                msg: "",
                toggle: '',
            },
            watch: {
                msg: function(newMsg) {
                    console.log(typeof newMsg, newMsg);
                }
            }
        })
    </script>
```

![image-20200115191401646](..\images\image-20200115191401646.png)

> 现在使用`v-model.number`

```js
  <input type="text" v-model.number="msg">{{msg}}
```

![image-20200115191510347](..\images\image-20200115191510347.png)

> 当然输入其他的还是字符串类型

![image-20200115191614804](..\images\image-20200115191614804.png)

> 在`v-model.number`的前提下，先输入数字，后面再输入字符串无效

![image-20200115191736024](..\images\image-20200115191736024.png)

###### 3.1.3 v-model.trim

> 该指令是为了剔除掉输入框中首尾的空格，将字符串缩进到输入框的最前面

> 在文本框里面先输入几个空格，再跟上字符串

![image-20200115192218136](..\images\image-20200115192218136.png)

> 鼠标点击文本框外，字符串自动剔除前面空格回到最前面

![image-20200115192345544](..\images\image-20200115192345544.png)