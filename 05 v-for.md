### 05. v-for

> v-for用来遍历，可以遍历数组，对象，字符串，数字

> 首先遍历一个数组：

```html
<div id="app">
        <ul>
            <li v-for="(item,index,a) of arr">
                {{item}}--{{index}}--{{a}}
            </li>
        </ul>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                arr: [1, 2, 3, 4, 5],
                person: {
                    name: "王雨波",
                    sex: "男",
                    age: 18,
                },
                str: "wangyubo",
                num: 5,
            },
        })
    </script>
```

<img src="C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200116150720876.png" alt="image-20200116150720876" style="zoom:50%;" />

> 可以看出遍历数组只返回了两个变量`item`和`index`

> 现在遍历一个对象：

```html
 <li v-for="(value,name,index) of person">
                {{value}}--{{name}}--{{index}}
            </li>
```

![image-20200116150933918](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200116150933918.png)

> 遍历对象返回三个变量：属性值，属性名和索引

> 遍历一个字符串：

```html
<li v-for="(value,name,index) of str">
                {{value}}--{{name}}--{{index}}
            </li>
```

![image-20200116151249109](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200116151249109.png)

> 遍历字符串也是返回两个变量`item`和`index`

> 遍历一个数字：5

```html
 <li v-for="(value,name,index) of num">
                {{value}}--{{name}}--{{index}}
            </li>
```

![image-20200116151541135](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200116151541135.png)

> 首先能看出它只返回两个变量，而且第二个变量应该是index。
>
> 把数字改成10再遍历一次：

![image-20200116151719923](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200116151719923.png)

> 遍历5返回1~5的整数，遍历10返回1~10的整数，试试负数-10

![image-20200116151904104](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200116151904104.png)

![image-20200116151928050](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200116151928050.png)

> 从这个报错信息可以看出来，第一个返回值应该是代表长度

> `for in` 是es5用来遍历的方法，`for of` 是es6新增的遍历数组的方法，就以v-for中遍历的效果来看，无论是搭配`in`还是搭配`of`效果一模一样，没有任何区别，但是规范一点来说，遍历数组搭配`of`,遍历其他的搭配`for`。

> v-for和v-if搭配使用：遍历一下有假值的数组，

```html
<li v-for="(value,name,index) of arr" v-if="value">
                {{value}}--{{name}}--{{index}}
            </li>
```

```js
 arr: [1, 2, 3, 4, 5, 0, NaN, '', false, 7],
```

<img src="C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200116154019659.png" alt="image-20200116154019659" style="zoom:50%;" />

> 此时所有value为假的项全部不渲染

##### 5.1 v-for 中key的使用

> 没有使用key时

```html
 <ul>
            <li v-for="(item,index) of arr">
                {{item}}----<input />
            </li>
        </ul>
        <button @click="handleClick">随机顺序</button>
```

```js
 data: {
                arr: [1, 2, 3, 4, 5]
            },
            methods: {
                handleClick() {
                    this.arr.sort(() => {
                        return Math.random() - 0.5
                    })
                }
            }
```

> 没有点击按钮之前：

![image-20200117151553714](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117151553714.png)

> 点击按钮以后：

![image-20200117151634502](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117151634502.png)

> - 从结构中可以看出，每个item和后面的input都是在分别在同一个`li`节点里面的。
> - 现在把arr随机以后，只有遍历出来的item值的位置发生了改变，input的位置没有改变，可是他们原本又同属于一个`li`节点里面。
> - 那如何让input的位置随着item的值一起变化呢？或者说如何让每条`li`里面的所有节点随着item位置的变化而随着改变呢？

> 这时候就需要使用key值动态绑定了

```html
 <li v-for="(item,index) of arr" :key="item">
```

![image-20200117152313444](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200117152313444.png)

