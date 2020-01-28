### 12 Vue实例的数据与方法

> Vue实例的实例属性与方法 , 他们都有前缀$ , 以便与用户定义的属性区分开来

##### 12.1 Vue实例属性之data

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

![image-20200128214529588](F:\learn Vue\images\image-20200128214529588.png)

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

![image-20200128215509938](F:\learn Vue\images\image-20200128215509938.png)

##### 12.2 Vue的实例属性之props

> 1. 属性 : vm.$props
> 2. 数据类型 : data

> props可以是数组或对象 , 用于接收来自父组件的数据 . props可以是简单的数组 , 或者使用对象作为代替 , 对象允许配置高级选项 , 如类型检测 , 自定义验证和设置默认值

> props对象的语法可以使用以下选项 :
>
> 1. type : 可以是下列原生构造函数中的一种 : String , Number , Boolean , Array , Object , Data , Function , Symbol , 任何自定义构造函数 , 或上述内容组成的数组 . 会检查一个props是否是给定类型 , 否则抛出警告
> 2. default : any ; 为该prop指定一个默认值 . 如果该prop没有被传入 , 则换做用这个值 . 对象或数组的默认值必须从一个工厂函数返回 . 
> 3. required : Boolean ; 定义该prop是否是必填项. 在非生产环境中 , 如果这个值为true且该prop没有被传入的数据 , 则一个控制台警告会被抛出
> 4. validator : Function ; 自定义验证函数会将该prop的值作为唯一的参数带入 . 在非生产环境下 , 如果该函数返回一个false的值(也就是验证失败) , 一个控制台警告将会被抛出

