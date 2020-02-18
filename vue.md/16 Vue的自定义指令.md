### 16 vue的自定义指令

##### 16.1 vue的全局自定义指令

> - 除了核心功能默认内置的指令(v-model , v-show等等),Vue也允许注册自定义指令
> - `Vue.directive( " eventName " , options )` **全局**自定义指令

> 一个指令定义对象可以提供如下几个**钩子函数**(均为可选) :
>
> - [x] bind : 只调用一次 , 指令第一次**绑定**到元素时调用(beforeMount阶段) , 在这里可以进行一次性的初始化设置
> - [x] inserted :被绑定元素插入父节点时调用 (仅保证父节点存在 , 但不一定已被插入文档中)
> - [x] updata :所有组件的VNode ( 抽象DOM ) 更新时调用 , 但是可能发生在其子VNode更新之前 , 指令的值可能发生了改变 , 也可能没有 , 但是你可以通过比较更新前后的值来忽略不必要的模板更新
> - [x] componentUpdataed : 指令所在组件的VNode 及其子VNode 全部更新后调用
> - [x] unbind : 只调用一次 , 指令与元素解绑时调用

![image-20200202141837923](..\images\image-20200202141837923.png)

![image-20200202142019533](..\images\image-20200202142019533.png)

> 挂载并查看他在生命周期中的出现时机

![image-20200202142045166](..\images\image-20200202142045166.png)

![image-20200202142249277](..\images\image-20200202142249277.png)

> 从结果可以看出`bind`和`inserted`是在`beforeMount`阶段被解析的

![image-20200202143522484](..\images\image-20200202143522484.png)

![image-20200202143427756](..\images\image-20200202143427756.png)

> `update`和`componentUpdated`发生在`beforeUpdata`阶段

##### 16.2 vue的局部自定义指令

> 如果想注册局部指令，组件中也接受一个 `directives` 的选项

![image-20200202144408059](..\images\image-20200202144408059.png)

##### 16.3 vue的自定义指令的钩子函数参数

> 指令钩子函数会被传入以下参数 : 
>
> - `el`>>>指令所绑定的元素 , 可以用来直接操作DOM
> - `binding`>>>一个对象 , 包含以下属性 :
>
> 1. `name` : 指令名 , 不包括 v- 前缀
> 2. `value` : 指令的绑定值 , `v-my-directive="1 + 1"` 中，绑定值为 2
> 3. `oldValue` : 指令绑定的前一个值 , 仅在`updata`和`componentUpdated`钩子中可以使用 , 无论值是否改变都可以使用
> 4. expression : 字符串形式的指令表达式 , 例如 : v-my-directive="1 + 1" 中，表达式为" 1+1 "。
> 5. `arg` : 传给指令的参数 ,可选 . 例如 `v-my-directive : foo`中 , 参数为"foo"
> 6. `modifiers` : 一个包含修饰符的对象 . 例如 `v-my-directive.foo.bar`中 , 修饰符对象为{ foo:true , bar:true }
>
> - `vnode`>>>vue编译生成的虚拟节点
> - `oldVnode`>>>上一个虚拟节点 , 仅在`updata`和`componentUpdated`钩子中可用

![image-20200202151949641](..\images\image-20200202151949641.png)

![image-20200202152439405](..\images\image-20200202152439405.png)

> 重点看下binding里面的值 : 先看看指令里的表达式

```vue
template: `<p v-yuanliangta="1+1"> {{message}}</p>`
```

![image-20200202153453509](..\images\image-20200202153453509.png)

> 带参数的指令

```vue
template: `<p v-yuanliangta:girlfriends="1+1"> {{message}}</p>`,
```

![image-20200202155415169](..\images\image-20200202155415169.png)

> 带参数且带修饰符的指令 , 修饰符还可以加多个

```vue
template: `<p v-yuanliangta:girlfriends.mostyoung="1+1"> {{message}}</p>`,
```

![image-20200202155804092](..\images\image-20200202155804092.png)

> 注意 :
>
> - 除了el之外 , 其他参数都应该是只读的 , 切勿进行修改
> - 如果需要在钩子之间共享数据 , 建议通过元素dataset来进行

##### 16.4 vue的动态指令参数

> 指令的参数可以是动态的
>
> 例如 v-mydirective : [argument] = "value"中, argument参数可以根据组件实例数据进行更新! 这使得自定义指令在应用中被灵活应用

##### 16.5 vue的自定义指令的函数简写

> 在很多时候 , 你可能想在bind和updata时触发相同行为 , 而不关心其他钩子
>
> 比如这样写:

```js
Vue.directive("color-swatch",function(el,binding){
	el.style.backgroundColor = binding.value
})
```

##### 16.6 vue的自定义指令的对象字面量参数

> 如果指令需要多个值 , 可以传入一个js对象字面量
>
> 记住 , 指令函数能够接受所有合法的js表达式

```html
<div v-demo="{color:'white',text:'hello!'}"></div>
```

```js
Vue.directive('demo',function(el,binding){
	console.log(binding.value.color)//=>"white"
	console.log(binding.value.text)//=>"hello!"
})
```

