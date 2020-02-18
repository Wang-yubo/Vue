### 11. Vue动画

##### 11.1 单元素/组件的过渡

> Vue提供了`transition`的封装组件, 在下列情形中, 可以给任何元素的组件添加进入/离开过渡
>
> 1. 条件渲染(使用 v-if)
> 2. 条件展示(使用 v-show)
> 3. 动态组件
> 4. 组件根节点

> Vue动画处理过程>>>当插入或者删除包含在transition组件中的元素时, Vue将做以下处理:
>
> 1. 自动嗅探目标元素是否应用了CSS过渡或者动画, 如果是, 在恰当的时机下添加/删除CSS类名
> 2. 如果过渡组件提供了js钩子函数, 这些钩子函数将在恰当的时机被调用
> 3. 如果没有找到js钩子函数也没有检测到css过渡/动画属性, DOM操作(插入/删除)在下一帧中立即执行(这里指的是浏览器逐帧动画机制, 和Vue的nextTick概念不同)

> 在进入/离开的过渡中，会有 6 个 class 切换。
>
> 1. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
> 2. v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
> 3. v-enter-to: 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
> 4. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
> 5. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
> 6. v-leave-to: 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

> 一个Vue动画中通常包括三个部分
>
> Vue部分: 就一个控制开关
> ![image-20200122163224568](..\images\image-20200122163224568.png)
>
> HTML部分: transition模板和name不能少
>
> ![image-20200122163309891](..\images\image-20200122163309891.png)
>
> css部分: 定义动画过程和开始/结束状态
>
> ![image-20200122163608060](..\images\image-20200122163608060.png)

> 另外, 主动式动画可以不写enter-to 和 leave-to 的动画, 因为这在主动式动画里已经定义了第一帧和最后一帧
>
> 动画一般也不用自己写,引用animate.css动画库基本能满足需求

##### 11.2 多元素的过渡

> transition标签里面是不可以直接放两个同名元素的, 但是也只是两个标签都使用v-if的情况下才报错, 使用v-if加v-else的组合就不报错, 但是也没有动画效果

```vue
<transition name="fade" enter-active-class="animated hinge">
            <p v-if="show">{{msg}}</p>
            <p v-if="show">{{msg2}}</p>
        </transition>
```

![image-20200127143714069](..\images\image-20200127143714069.png)

> 想要有动画效果有两种办法:
>
> 第一种是将多个元素改成不一样的标签

```Vue
 <transition name="fade" enter-active-class="animated hinge">
            <p v-if="show">{{msg}}</p>
            <div v-else="show">{{msg2}}</div>
        </transition>
```

<img src="..\images\不同标签.gif" style="zoom:80%;" />

> 这样虽然有效果, 但是不满足同名标签也要有效果的需求

> 第二个办法: 想要同名标签都有效果就需要给标签加上不同的key

```Vue
 <transition name="fade" enter-active-class="heartBeat">
            <p v-if="show" key="one">{{msg}}</p>
            <p v-else="show" key="two">{{msg2}}</p>
        </transition>
```

> <img src="..\images\同时存在.gif" style="zoom:80%;" />
>
> 但是, 这样的多个元素的显示效果之间的过渡, 是存在一个重叠的时间的: 上一个元素的消失和下一个元素的显示, 这两个动画是同步进行的, 所以看上去像是有两个元素都显示出来了

> 同时生效的进入和离开的过渡不嫩满足所有要求, 所以Vue给transition标签提供了过渡模式`mode`
>
> 1. in-out：新元素先进行过渡，完成之后当前元素过渡离开
> 2. out-in：当前元素先进行过渡，完成之后新元素过渡进入
>
> 一般来说都是选择第二种过渡模式

```vue
<transition name="fade" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" mode="out-in">
```

<img src="..\images\过渡模式.gif" style="zoom:80%;" />

##### 11.3 多个组件的过渡

> 多个组件的过渡简单很多 - 我们不需要使用 key 特性。相反，我们只需要使用动态组件：

```HTML
<div id="app">
        <button @click="toggleView">切换组件</button>
        <transition name="fade" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" mode="out-in">
            <component :is="view"></component>
        </transition>
    </div>
```

```js
 let vm = new Vue({
            el: '#app',
            data: {
                view: "comp1",
            },
            components: {
                comp1: {
                    template: `
                        <div>组件1</div> 
                    `
                },
                comp2: {
                    template: `
                        <div>组件2</div> 
                    `
                }
            },
            methods: {
                toggleView() {
                    this.view !== "comp1" ? this.view = "comp1" : this.view = "comp2"
                }
            },
        })
```

##### 11.4 列表的过渡

> 如何同时渲染整个列表?比如使用v-for的时候, 在这种场景中, 使用<transition-group>组件
>
> 在深入例子之前, 先了解关于这个组件的几个特点:
>
> 1. 不同于<transition>, 它会以一个真实元素呈现: 默认为<span>, 你也可以通过`tag`特性更换为其他元素
> 2. 过渡模式不可用(out-in), 因为我们不再相互切换特有的元素
> 3. 内部元素 总是需要提供唯一的key属性值
> 4. css过渡的类将会应用在内部的元素中, 而不是这个组/容器本身

> 没使用key时直接报错, 所以这里必须提供key属性

```vue
 <transition-group tag="ul">
            <li v-for="item of items">{{item}}</li>
        </transition-group>
```

![image-20200128154035070](..\images\image-20200128154035070.png)

> 使用key, 但没有动态绑定时, 也会报错, 所以这里的key还要动态绑定

```html
 <li v-for="item of items" key="item">{{item}}</li>
```

![image-20200128154319846](..\images\image-20200128154319846.png)

> 乱序排列过渡的例子 :

![image-20200128160641424](..\images\image-20200128160641424.png)

<img src="..\images\image-20200128160726186.png" alt="image-20200128160726186"  />

> 实现的效果 : 

<img src="..\images\乱序排列.gif" style="zoom:80%;" />

##### 11.5 数据的过渡

> Vue 的过渡系统提供了非常多简单的方法设置进入、离开和列表的动效。那么对于数据元素本身的动效呢，比如：
>
> 1. 数字和运算
> 2. 颜色的显示
> 3. SVG 节点的位置
> 4. 元素的大小和其他的属性
>
> 这些数据要么本身就以数值形式存储，要么可以转换为数值。有了这些数值后，我们就可以结合 Vue 的响应式和组件系统，使用第三方库来实现切换元素的过渡状态。
>
> 这里有个叫TweenMax的动画库比较好用
>
> https://www.tweenmax.com.cn/

![image-20200128162646884](..\images\image-20200128162646884.png)

