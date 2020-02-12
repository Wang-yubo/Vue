### 26 tree shaking和模式对比

##### 26.1 tree shaking

> - 咱们日常会编写很多函数库, 但是这些函数库中的函数不是每一个都会在项目中遇到, 但是如果我们每个函数都放在最终的代码中间,这会影响网页的加载速度
> - 如果我们能够在最后发布到网页上去的js内容中那些用不到的给去除掉,这样就好
> - `tree shaking`的作用就是实现这个功能的
>
> 暴露出两个函数 >>>
>
> <img src="F:\learn Vue\images\image-20200210144724029.png" alt="image-20200210144724029" style="zoom:80%;" />
>
> 引用的时候只引用一个 >>>
>
> ![image-20200210144840865](F:\learn Vue\images\image-20200210144840865.png)
>
> webpack打包的时候回标注某个文件最终会导出的接口有哪些
>
> ![image-20200210144635171](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200210144635171.png)
>
> 现在配置tree shaking >>>
>
> <img src="F:\learn Vue\images\image-20200210145521936.png" alt="image-20200210145521936" style="zoom:80%;" />
>
> 打包后的文件现在不仅会标注某个文件最终会导出的接口都有哪些 , 并且还会标注出到底有哪些导出被使用了
>
> <img src="F:\learn Vue\images\image-20200210145440784.png" alt="image-20200210145440784" style="zoom:80%;" />
>
> 注意 : 开发环境下 , 为了保证能够正确给用户提示错误代码的行数信息等 , 即便是增加了该选项 , 实际导出的代码也不会进行削减

##### 26.2 tree shaking的补充

> - 如果我们引入了`polyfill` , 这个`polyfill`的方法或是函数什么的都是直接定义在全局的 , 没啥导出的东西
> - 如果被`tree shaking`解析的时候发现`polyfill`里面啥也没导出 , 可能就会被忽略
> - 所以我们要对这个文件加一个特殊的标记 , 表示它被排除在`tree shaking`的检测系统之外
>
> ![image-20200210151034597](F:\learn Vue\images\image-20200210151034597.png)
>
> `sideEffects` >>> 就是排除`tree shaking`系统之外的配置 , 意思就是保留你需要的项目 , 不要被`tree shaking`排除了
>
> false是默认值 , 默认不排除任何项

##### 26.3 开发和生成模式对比

> 区别 >>>
>
> development模式
>
> 1. 使用dev-server会开启一个本地服务器 , 可在本地进行服务器运行状态的模拟 , 还可以开启热更新 , 进行实时模拟
> 2. source-map , 会包含大量的错误提醒信息 , 体积巨大
> 3. 无需压缩 , 方便直接观看代码内容 , 保留空格和换行
>
> production模式
>
> 1. source-map , 非常简洁
> 2. 代码会被压缩 , 缩小体积

##### 26.4 Development与production的分开文件配置

> 首先要新建两个文件 >>> 一个开发模式配置 , 一个生产模式配置
>
> ![image-20200210160719467](F:\learn Vue\images\image-20200210160719467.png)
>
> 开发模式的配置可以直接使用我们以前的所有配置
>
> <img src="F:\learn Vue\images\image-20200210160833657.png" alt="image-20200210160833657" style="zoom:67%;" />
>
> 生产模式下我们可以删除本地服务器模块 , 热更新模还有获取`webpack`插件主函数 , 同时可以去掉`eval`
>
> <img src="F:\learn Vue\images\image-20200210161052101.png" alt="image-20200210161052101" style="zoom:67%;" />
>
> 然后还要去给这两个文件分别设置不同的运行指令 , 这个`start`指令可以删除了
>
> <img src="F:\learn Vue\images\image-20200210160630117.png" alt="image-20200210160630117" style="zoom:80%;" />
>
> 现在想要在开发模式下打包就运行
>
> ```nginx
> λ npm run dev
> ```
>
> 想要在生产模式下打包就运行
>
> ```nginx
> λ npm run prod
> ```

##### 26.5 优化

> - 在这种情况下 , 这两个文件还是有很多的代码是重复的 , 我们还可以进一步优化它
> - 只需要把重复的文件单独独立出来 , 然后原来的两个文件分别保存自己独有的内容 , 最后每个文件再去引用那份独立出来的文件就好了
>
> 下载一个合并工具 >>>
>
> ```nginx
> λ cnpm install webpack-merge --save-dev
> ```
>
> <img src="F:\learn Vue\images\image-20200210163112008.png" alt="image-20200210163112008" style="zoom:80%;" />
>
> 拆分文件 >>> 相同的独立出来
>
> <img src="F:\learn Vue\images\image-20200210163240457.png" alt="image-20200210163240457" style="zoom:50%;" />
>
> 不同的自己保留 >>>
>
> <img src="F:\learn Vue\images\image-20200210163320211.png" alt="image-20200210163320211" style="zoom:80%;" />
>
> <img src="F:\learn Vue\images\image-20200210163345968.png" alt="image-20200210163345968" style="zoom:80%;" />
>
> 先对开发配置进行修改 >>>
>
> <img src="F:\learn Vue\images\image-20200210170125170.png" alt="image-20200210170125170" style="zoom: 80%;" />
>
> 重新运行开发模式下的打包 >>> 没啥问题 正常开启了本地服务器
>
> ![image-20200210170213558](F:\learn Vue\images\image-20200210170213558.png)
>
> 对生产模式进行合并配置 >>> 同样是4步
>
> <img src="F:\learn Vue\images\image-20200210170755494.png" alt="image-20200210170755494" style="zoom:80%;" />
>
> 生产模式下重新打包 >>> 也没啥问题 正常打包了
>
> <img src="F:\learn Vue\images\image-20200210170854628.png" alt="image-20200210170854628" style="zoom:67%;" />
>
> ![image-20200210170919685](F:\learn Vue\images\image-20200210170919685.png)
>
> 现在还有一个问题 , webpack的打包配置文件就有三个 , 看起来太复杂了 , 我们再对他简化一下 , 把他们放到一个文件夹里面去
>
> ![image-20200210171057143](F:\learn Vue\images\image-20200210171057143.png)
>
> ![image-20200210171521828](F:\learn Vue\images\image-20200210171521828.png)
>
> 我们修改了他们三个的路径 , 当然要去修改一下他们新路径的配置了
>
> 新路径要修改两个地方 >>>
>
> <img src="F:\learn Vue\images\image-20200210171927497.png" alt="image-20200210171927497" style="zoom:80%;" />
>
> 第二个地方要加上../ 返回上级目录 , 因为当前文件夹是build ,在build下创建bundle文件不符合我们的需要 , 返回上级是learn webpack , 在这个文件夹下创建bundle才是我们需要的
>
> ![image-20200210172027242](F:\learn Vue\images\image-20200210172027242.png)

