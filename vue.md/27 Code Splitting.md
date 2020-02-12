### 27 Code Splitting

> `Code Splitting` >>> 代码分割
>
> 在之前的项目中, 无论引用了多少插件, 最终输出的还是单个js文件, 这会造成几个问题:
>
> 1. 单文件过大
> 2. 业务代码和环境代码压缩到一起了
> 3. 单次修改业务代码,就得重新打包所有的文件
> 4. 每次修改业务代码,最终的打包出来的js就是一个新的文件(即便只是修改了一个字母),这样就会导致用户浏览器无法缓存文件
>
> 例如我们引进一个组件 >>> 以前用到过的lodash函数库
>
> ```nginx
> λ cnpm install lodash --save-dev
> ```
>
> <img src="F:\learn Vue\images\image-20200210175325079.png" alt="image-20200210175325079" style="zoom: 80%;" />

##### 27.1 Code Splitting 第一种方式

> 第一种方式 >>>手动分开引入
>
> <img src="F:\learn Vue\images\image-20200210193452415.png" alt="image-20200210193452415" style="zoom:80%;" />
>
> ![image-20200210193522534](F:\learn Vue\images\image-20200210193522534.png)
>
> 这里注意lodash一定要在index的前面
>
> <img src="F:\learn Vue\images\image-20200210193707131.png" alt="image-20200210193707131" style="zoom:80%;" />
>
> 假设业务代码也是1mb的大小 >>>
>
> <img src="F:\learn Vue\images\image-20200210193951844.png" alt="image-20200210193951844" style="zoom:67%;" />
>
> 最终打包的网页 >>>
>
> <img src="F:\learn Vue\images\image-20200210193853472.png" alt="image-20200210193853472" style="zoom:67%;" />
>
> 最终会内嵌仅两个js文件 , 其中的lodash是一个不会变化的文件 , 这样的话浏览器就可以把这个文件给缓存起来
>
> 这种代码分割是手动地 , 既不智能也不方便

##### 27.2 Code Splitting 第二种方式

> 第二种方式 >>> 自动分割 , 同步加载
>
> 恢复到最初的模式 , 采取同步请求的方式 , 来导入组件
>
> <img src="F:\learn Vue\images\image-20200210202105096.png" alt="image-20200210202105096" style="zoom:80%;" />
>
> 配置webpack.config.js >>> 分割块 >>> 分割所有的
>
> <img src="F:\learn Vue\images\image-20200210202212957.png" alt="image-20200210202212957" style="zoom: 80%;" />
>
> 打包后的结果 >>>
>
> ![image-20200210202357043](F:\learn Vue\images\image-20200210202357043.png)
>
> `lodash`被打包进`vendors-wangyubo.js`里面去了
>
> <img src="F:\learn Vue\images\image-20200210202509597.png" alt="image-20200210202509597" style="zoom:80%;" />

##### 27.3 Code Splitting 第三种方式

> 第三种方式 >>> 自动分割 , 异步加载
>
> 使用异步加载前 , 先把同步加载的配置给删除 >>>
>
> ![image-20200210203703427](F:\learn Vue\images\image-20200210203703427.png)
>
> ![image-20200210203722394](F:\learn Vue\images\image-20200210203722394.png)
>
> 异步加载程序 >>>
>
> <img src="F:\learn Vue\images\image-20200210204310483.png" alt="image-20200210204310483" style="zoom:80%;" />
>
> 打包后的文件 >>>
>
> ![image-20200210204358400](F:\learn Vue\images\image-20200210204358400.png)
>
> lodash文件放在1.js里面了
>
> <img src="F:\learn Vue\images\image-20200210204434365.png" alt="image-20200210204434365" style="zoom:80%;" />
>
> `Code Splitting` 的注意点 :
>
> 代码分割这个概念本身与`webpack`无关 , `webpack`实现代码的分割的两个方式 >>>
>
> 1. 同步代码 : 只需要在`webpack.common.js`中配置`optimization`的配置即可
> 2. 异步代码(import函数) : 无序任何配置 , webpack会自动进行配置 , 会自动放在新的文件夹中

##### 27.4 SplitChunksPligin

> `code splitting`的底层插件`SplitChunksPligin` 
>
> 前面有讲到我们使用webpack分割异步加载的组件 , 但是输出的文件啥的 , 都是默认的配置 , 现在我们要进行一些自定义的配置
>
> 安装动态引入插件 >>> @babel/plugin-syntax-dynamic-import
>
> ```nginx
> λ cnpm install @babel/plugin-syntax-dynamic-import --save-dev
> ```
>
> <img src="F:\learn Vue\images\image-20200210214327286.png" alt="image-20200210214327286" style="zoom:80%;" />
>
> 修改babel配置文件 >>>
>
> <img src="F:\learn Vue\images\image-20200210220922133.png" alt="image-20200210220922133" style="zoom:80%;" />
>
> 使用魔法注释 >>>
>
> ![image-20200210221017833](F:\learn Vue\images\image-20200210221017833.png)
>
> 打包后的文件名 >>> lodash的名字出来了 , 但是还是有vendors前缀
>
> ![image-20200210221051727](F:\learn Vue\images\image-20200210221051727.png)
>
> 当前用魔法注释自定义的文件名称前面还是有一个前缀 , 这个前缀是因为wenpack.common.js里面的`optimization`属性影响的
>
> 修改`optimization`的配置文件 >>>
>
> ![image-20200211161024933](F:\learn Vue\images\image-20200211161024933.png)
>
> 重新打包后 >>> 前缀取消了
>
> ![image-20200211161105189](F:\learn Vue\images\image-20200211161105189.png)

##### 27.5 SplitChunksPligin的参数详解

> 异步代码参考如下配置 >>>
>
> ![image-20200211162853639](F:\learn Vue\images\image-20200211162853639.png)
>
> 1. `chunks` >>> 针对不同的打包方式来实现代码分割 有 all , async , initial(同步代码)三种 , 异步的话直接分割即可 , 异步分割的`CacheGrops`的配置如上图 , 如果是同步的话 , 就会往下继续读取`CacheGrops`的配置
> 2. minSize >>> 小于这个尺寸的包就不分割
> 3. minChunks >>> 一个文件最少被引用多少次才分割 , 一般来说都是1
> 4. maxAsyncRequests >>> 一个文件最多能引用的模块 , 数量如果多余该参数 , 那么多余的不分割打包
> 5. maxInitialRequests  >>> 入口文件最多分割打包的个数 , 超过的也不分割
> 6. automaticNameDelimiter >>> 前缀和名字之间的连接符 , 一般来说 , _用的比较多
> 7. name  >>> 标明cacheGroups里的配置是否生效 , 默认都生效
>
> 同步代码参考如下配置 >>>
>
> <img src="F:\learn Vue\images\image-20200211163703160.png" alt="image-20200211163703160" style="zoom:80%;" />
>
> 1. vendors和default >>> 就是两个不同的打包分组,vendors可以指定匹配规则
> 2. test >>> 判断引入的库是否在node_modules的目录下 , 是的话就进行代码分割打包
> 3. priority >>> 优先级 , 可以理解为权重 , 一般来说vendors的权重要大于default
> 4. reuseExistingChunk >>> 如果之前某个模块被打包了 , 再次打包的时候就忽略不打包它
>
> chunk是啥 >>> 每一个打包出来的文件都是一个chunk, 这个文件数和minChunks的参数息息相关
> 意思就是,打包出来的chunk有几个用到了某个组件,用到了,才会使用代码分割

