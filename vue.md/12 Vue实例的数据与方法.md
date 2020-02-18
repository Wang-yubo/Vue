### 12 Vue实例的数据与方法

> Vue实例的实例属性与方法 , 他们都有前缀$ , 以便与用户定义的属性区分开来

##### 12.01 Vue实例属性之data

> 1. 属性 : `vm.$data`
> 2. 数据类型 : `data`

> Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 的属性能够响应数据变化。
>
> 1. 对象必须是纯粹的对象 (含有零个或多个的 key/value 对)：浏览器 API 创建的原生对象，原型上的属性会被忽略。大概来说，data 应该只能是数据
> 2. 一旦观察过，不需要再次在数据对象上添加响应式属性。因此推荐在创建实例之前，就声明所有的根级响应式属性。
> 3. 实例创建之后，可以通过 vm.$data 访问原始数据对象。Vue 实例也代理了 data 对象上所有的属性，因此访问 vm.a 等价于访问 vm.$data.a。
> 4. 以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。你可以使用例如 vm.$data._property($property) 的方式访问这些属性。
> 5. 当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！

```js
let data = {
            name: "王雨波",
            sex: "男"
        };
        let vm = new Vue({
            el: "#app",
            data: {
                name: "wangyubo",
                sex: "男"
            }
        })
```

![image-20200128214529588](..\images\image-20200128214529588.png)

> `observer`观察者
>
> Vue实例里面的data在被vue代理之后使用`Object.defineProperty(obj, prop, descriptor)`将数据变成响应式的数据 , 能够具有set和get , 把一个单纯的数据属性变成了访问器属性

```html
<div id="app">
        {{name}}
    </div>
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
    <script>
        let data = {
            name: "王雨波",
            sex: "男"
        };
        let vm = new Vue({
            el: "#app",
            data: data
        })
    </script>
```

![image-20200128215509938](..\images\image-20200128215509938.png)

##### 12.02 Vue的实例属性之props

> 1. 属性 : vm.$props
> 2. 数据类型 : data

> props可以是数组或对象 , 用于接收来自父组件的数据 . props可以是简单的数组 , 或者使用对象作为代替 , 对象允许配置高级选项 , 如类型检测 , 自定义验证和设置默认值

> props对象的语法可以使用以下选项 :
>
> 1. type : 可以是下列原生构造函数中的一种 : String , Number , Boolean , Array , Object , Data , Function , Symbol , 任何自定义构造函数 , 或上述内容组成的数组 . 会检查一个props是否是给定类型 , 否则抛出警告
> 2. default : any ; 为该prop指定一个默认值 . 如果该prop没有被传入 , 则换做用这个值 . 对象或数组的默认值必须从一个工厂函数返回 . 
> 3. required : Boolean ; 定义该prop是否是必填项. 在非生产环境中 , 如果这个值为true且该prop没有被传入的数据 , 则一个控制台警告会被抛出
> 4. validator : Function ; 自定义验证函数会将该prop的值作为唯一的参数带入 . 在非生产环境下 , 如果该函数返回一个false的值(也就是验证失败) , 一个控制台警告将会被抛出

##### 12.03 Vue实例属性之el

> 属性: `vm.$el`
>
> 数据类型 : `Element`

> 提供一个在页面上已存在DOM元素作为Vue实例的挂载目标 . 可以是CSS选择器 , 也可以是一个HTMLElement实例
>
> 在实例挂载之后 , 元素可以用`vm.$el`访问
>
> 如果在实例化时存在这个选项 , 实例将立即进入编译过程 , 否则 , 需要显式调用`vm.$mount()`手动开启编译

##### 12.04 Vue的实例属性值options

> 属性: `vm.$options`
>
> 数据类型 : `object`

> - 用于当前Vue实例的初始化选项
> - 需要在选项中包含自定义属性时会有用处

```js
 let vm = new Vue({
            el: "#app",
            data: data,
            defindname: "wangyubo"
        })
```

<img src="..\images\image-20200129143111701.png" alt="image-20200129143111701" style="zoom:80%;" />

> 用的很少 , 不建议使用

##### 12.05 Vue的实例属性值组件逻辑关系

> - 属性: vm.$parent; 数据类型: Vue instance;
> - 父实例，如果当前实例有的话。
>
> - 属性: vm.$root; 数据类型: Vue instance;
> - 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。
>
> - 属性: vm.$children; 数据类型:Arry<Vue instance>
> - 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。

##### 12.06 Vue的实例方法之watch

> vm.$watch(expOrFn , callback , [options] )

> - 观察Vue实例变化的一个表达式或计算属性函数 . 回调函数得到的参数为新值和旧值 . 表达式只接受监督的键路径(即访问某个属性的方法) . 对于更复杂的表达式 , 用一个函数取代 .
> - 注意 : 在变异(不是替换)对象或数组时 , 旧值将与新值相同 , 因为它们的引用指向同一个对象/数组 . vue不会保留变异之前值的副本  
> - vm.$watch 返回一个取消观察函数 , 用来停止触发回调

> 简单版的 , 第一个参数为变量 : 

```js
 vm.$watch("name", function(newName, oldName) {
            console.log("oldName:" + oldName + "newName:" + newName);
        })
```

![image-20200129145258672](..\images\image-20200129145258672.png)

> 复杂版的, 第一个参数为函数 : 第一个函数里面监听两个值的变化 , 任意一个值发生改变都会触发第二个函数

```js
 vm.$watch(function() {
            return this.name + this.sex
        }, function(newName, oldName) {
            console.log("oldName:" + oldName + "newName:" + newName);
        })
```

![image-20200129150224498](..\images\image-20200129150224498.png)

> 在实例外面用vm.$watch()会返回一个函数 , 这个函数是取消观察的函数 , 运行一下它 , 这个观察就会被取消掉

```js
 let fn = vm.$watch(function() {
            return this.name.indexOf("波")
        }, function(newName, oldName) {
            console.log("oldName:" + oldName + "newName:" + newName);
        })
```

![image-20200129152727704](..\images\image-20200129152727704.png)

> watch的选项 : deep
>
> 为了能发现对象内部已经有的值的变化 , 可以在选项参数中指定deep : true . 后期加的值是监听不到的
>
> 监听数组的变动不需要这么做

> 不加`deep : true`时 : 没有被触发

```js
let vm = new Vue({
            el: "#app",
            data: {
                msg: {
                    msg1: "王",
                    msg2: "雨",
                    msg3: "波",
                }
            }
        })
        let fn = vm.$watch("msg", function(newName, oldName) {
            console.log("我监听到了");
        }, )
```

![image-20200129191553724](..\images\image-20200129191553724.png)

> 加上`deep : true`后 :

```js
 let fn = vm.$watch("msg", function(newName, oldName) {
            console.log("我监听到了");
        }, {
            deep: true
        })
```

![image-20200129191659697](..\images\image-20200129191659697.png)

>  当然 , 如果你不想监听整个对象 , 而是只监听对象里面某个值的改变也可以不加deep : true , 也能监听到

```js
let fn = vm.$watch("msg.msg1", function(newName, oldName) {
            console.log("我监听到了");
        }, )
```

![image-20200129191933460](..\images\image-20200129191933460.png)

> watch的选项`immediate`
>
> 在选项参数中指定immediate : true 将立即以表达式的当前值触发回调: 简单来说 , 在Vue实例加载的一瞬间就执行一次回调函数

```js
 let fn = vm.$watch("msg", function(newName, oldName) {
            console.log("我监听到了");
        }, {
            deep: true,
            immediate: true
        })
```

![image-20200129192937907](..\images\image-20200129192937907.png)

> Vue挂载的时候就执行了一次回调函数
>
> 注意 : 
>
> 1. 在带有`immediate`选项时 , 你不能在第一次回调时取消侦听给定的property
> 2. 如果你仍然希望在回调内部调用一个取消侦听的函数 , 你应该先检查其函数的可用性

> 在上面的内容中提到了vm.$watch()的返回值是一个取消函数 , 我们可以在它的回调函数中执行 , 这样这个侦听事件就只触发一次

```js
 let fn = vm.$watch("msg", function(newName, oldName) {
            console.log("我监听到了");
            fn()
        }, {
            deep: true,
        })
```

![image-20200129194022906](..\images\image-20200129194022906.png)

> 但是 , 在有`immediate : true` 这个选项时不能这样做

```js
let fn = vm.$watch("msg", function(newName, oldName) {
            console.log("我监听到了");
            fn()
        }, {
            deep: true,
            immediate: true
        })
```

![image-20200129193839187](..\images\image-20200129193839187.png)

> 原因很简单 : 初次刷新的时候就被解绑了 , 那监听还有什么意义

##### 12.07 Vue的实例方法值set/delete

> vm.$set ( target , propertyName/index , value )
>
> 向响应式对象中添加一个属性 , 并确保这个新属性同样是响应式的 , 且触发视图更新 . 它必须用于向响应式对象上添加新属性 , 以为Vue无法探测普通的新增属性



![image-20200129202002891](..\images\image-20200129202002891.png)

> 这里报错的原因在于这个方法不会默认直接找到vm实例里的msg
>
> 默认前缀用`vm.msg`或者`vm.$data.msg`都可以
>
> ![image-20200129202629200](..\images\image-20200129202629200.png)

> vm.$delete ( target , propertyName/index )
>
> 删除对象的属性 . 如果对象是响应式的 , 确定删除能触发更新视图 . 这个方法主要用于避开Vue不能检测到属性被删除的限制

##### 12.08 Vue的实例方法之on监听自定义事件

> vm.$on( eventName , callback)
>
> 监听当前实例上的自定义事件 . 事件可以由vm.$emit . 回调函数会接收所以传
>
> 入事件触发函数的额外参数

##### 12.09 Vue的实例方法之once监听自定义事件

> vm.$once ( eventName , callback )
>
> 监听一个自定义事件 , 但是只触发一次 , 在第一次触发之后移除监听器

##### 12.10 Vue的实例方法之off移除监听事件 

> vm.$off ( [ eventName , [ callback ] ] )
>
> 移除自定义事件监听器 :
>
> 1. 如果没有提供参数 , 则移除所有的事件监听器
> 2. 如果只提供了事件 , 则移除该事件所有的监听器
> 3. 如果同时提供了事件与回调 , 则只移除这个回调的监听器

