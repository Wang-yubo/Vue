### 14 Vue的全局/实例方法

##### 14.1 Vue.extend( options )

> - 使用基础Vue构造器 , 创建一个"子类" . 参数是一个包含组件选项的对象
> - data选项时特例 ,. 需要注意 - 在Vue.extend () 中它必须是函数

```js
 //创建构造器
        var child = Vue.extend({
            template: `
            <p> {{name}}----{{age}}----{{sex}}</p>
            `,
            data() {
                return {
                    name: "wangyubo",
                    age: "18",
                    sex: "男"
                }
            }
        })
        //new一个实例并且挂载到app上
        new child().$mount("#app")
```

![image-20200131205919944](..\images\image-20200131205919944.png)

##### 14.2 Vue的实例方法之mount

> `vm.$mount ([elementOrSelector])`

> 如果Vue实例在实例化时没有收到el选项 , 则它处于"未挂载"状态 , 没有关联的DOM元素 , 可以使用vm.$mount()手动地挂载一个未挂载的实例
>
> 如果没有提供`elementOrSelector`参数 , 模板将被渲染为文档之外的元素 , 并且你必须使用原生DOM API把它插入文档中 , 这个方法返回实例自身 , 因而可以链式调用其他实例方法



##### 14.3 Vue.nextTick( [callback]  , context)

> 在下次DOM更新循环结束之后执行延迟回调 . 在修改数据之后立即使用这个方法 , 获取更新后的DOM
>
> 也可以作为一个promise使用

> ```js
> Vue.nextTick().then(function(){
> //DOM更新了
> })
> ```

<img src="..\images\image-20200201151047197.png" alt="image-20200201151047197"  />

##### 14.4 vue的实例方法之nextTick

> vm.$nextTick( [ callback ] )
>
> - 将回调延迟到下次DOM更新循环之后执行 
>
> - 在修改数据之后立即使用它 , 然后等待DOM更新
>
> - 它跟全局方法`Vue.nextTick`一样 , 不同的是回调的this自动绑定到调用它的实例上
>
>   ```js
>   new Vue({
>   //...
>   methods:{
>   //...
>   example:function(){
>   //修改数据
>   this.message="changed"
>   //DOM 还没更新
>   this.$nextTick(function(){
>       //DOM现在更新了
>       //"this"绑定到当前实例
>   this.doSomethingElse()
>   })
>   }
>   }
>   })
>   ```

##### 14.5 vue的实例方法之destroy

> vm.$destroy()>>>完全销毁一个实例 
>
> 清理它与其他实例的链接 , 解绑它的全部指令及事件监听器 , 但是网页上的内容还在
>
> 触发beforeDestroy和destroyed的钩子

##### 14.6 vue的全局方法之set

> `Vue.set ( target , propertyName/index ,value )`
>
> 参数：
> `{Object | Array} target`
> `{string | number} propertyName/index`
> `{any} value`
>
> 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 this.myObject.newProperty = 'hi')
>
> 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象
>
> 全局 Vue.set 的别名: `vm.$set( target, propertyName/index, value )`

##### 14.7 vue的全局方法之delete

> `Vue.delete( target , propertyName/index )`>>>删除对象的属性
>
> 如果对象是响应式的 , 确保删除能触发更新视图
>
> 这个方法主要用于避开Vue不能检测到属性被删除的限制 , 一般很少使用到它
>
> 这是全局 Vue.delete 的别名。`vm.$delete( target, propertyName/index )`

