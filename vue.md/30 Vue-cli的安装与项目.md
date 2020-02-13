### 30 vue-cli的安装与项目

> Vue的脚手架是专门提供给开发者用来创造和配置Vue项目的一个工具, 这个工具使用的次数非常频繁而且体积巨大, 建议直接全局安装
>
> 安装命令 >>>
>
> ```nginx
> λ cnpm install @vue/cli -g
> ```
>
> 创建项目 >>>
>
> ```nginx
> λ vue creat 项目名称
> ```
>
> 现在可以按照下面两条提示指令进入和开启本地服务器 >>>
>
> ![image-20200213170120656](F:\learn Vue\images\image-20200213170120656.png)
>
> ![image-20200213170425089](F:\learn Vue\images\image-20200213170425089.png)
>
> 基本的目录结构 >>>
>
> ![image-20200213170040462](F:\learn Vue\images\image-20200213170040462.png)
>
> 基本的依赖 >>>
>
> ![image-20200213164118828](F:\learn Vue\images\image-20200213164118828.png)
>
> 基本的映射指令 >>>
>
> ![image-20200213170152968](F:\learn Vue\images\image-20200213170152968.png)
>
> Vue-cli的核心理念就是, 对于那些不懂webpack的人来说,Vue-cli就直接把所有的webpack的配置都给隐藏起来, 就暴露一些比较简单的接口, 以减少用户的使用难度

##### 30.1 Vue-cli 的配置文件

> Vue的脚手架在把webpack给隐藏之后, 我们要想进行一些精细化配置,可以自己新建一个vue.config.js文件,然后自行配置
>
> 但是,但是!!!这个配置文件里面使用的是vue给咱们提供的一些接口,不能把webpack的原生配置直接拿过来用
>
> 基本的配置信息 >>>
>
> ![image-20200213165225759](F:\learn Vue\images\image-20200213165225759.png)

##### 30.2 publicPath

> - Type: string
> - Default: '/'
>
> 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
>
> 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中。
>
> 配置前的端口 >>>
>
> ![image-20200213171000797](F:\learn Vue\images\image-20200213171000797.png)
>
> 配置后的端口 >>>
>
> ![image-20200213171113264](F:\learn Vue\images\image-20200213171113264.png)

##### 30.3 outputDir

> - Type: string
> - Default: 'dist'
>
> 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
>
> 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
>
> ![image-20200213172344360](F:\learn Vue\images\image-20200213172344360.png)
>
> ![image-20200213172400428](F:\learn Vue\images\image-20200213172400428.png)

##### 30.4 assetsDir/indexPath/filenameHashing

> - key: assetsDir
> - Type: string
> - Default : ''
>
> assetsDir:放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
>
> ![image-20200213200139659](F:\learn Vue\images\image-20200213200139659.png)
>
> - key: indexPath
> - Type: string
> - Default: 'index.html'
>
> indexPath:指定生成的 index.html 的输出路径 (相对于 outputDir)
>
> ![image-20200213200352588](F:\learn Vue\images\image-20200213200352588.png)
>
> - key: filenameHashing
> - Type: boolean
> - Default: ''
>
> filenameHashing:生成的静态资源后面是否生成加上哈希值 , 默认为true
>
> ![image-20200213200424524](F:\learn Vue\images\image-20200213200424524.png)

##### 30.5 pages(多页面打包)

> - Type: Object
> - Default: undefined
>
> 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：
>
> 1. 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
> 2. 或一个指定其 entry 的字符串
>
> 配置 >>>
>
> ![image-20200213205008092](F:\learn Vue\images\image-20200213205008092.png)
>
> ![image-20200213203530660](F:\learn Vue\images\image-20200213203530660.png)
>
> 在page里面的filename和page外面的indexPath同时存在的情况下 , filename生效
>
> ![image-20200213204917005](F:\learn Vue\images\image-20200213204917005.png)

##### 30.6 css

> Vue-cli里面对css的操作基本独立了出来,将各种各样的基本配置给进行了简化,这给我们的日常开发极大的减轻了负担
>
> <img src="F:\learn Vue\images\image-20200213205820066.png" alt="image-20200213205820066" style="zoom:80%;" />

##### 30.7 devServer

> - Type: Object
> - Default: /
>
> 所有 webpack-dev-server 的选项都支持。注意：
>
> 1. 有些值像 host、port 和 https 可能会被命令行参数覆写
> 2. 有些值,像: publicPath 和 historyApiFallback 不应该被修改，因为它们需要和开发服务器的 publicPath 同步以保障正常的工作
>
> 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置
>
> ![image-20200213210849298](F:\learn Vue\images\image-20200213210849298.png)

##### 30.8 补充配置

> 当vue-cli给你提供的接口不能满足你的需要时 , 他还给了你一个比较柔性的接口 , 让你可以像配置webpack那样写原生配置
>
> ![image-20200213211652980](F:\learn Vue\images\image-20200213211652980.png)
>
> 这里面你可以写一切原生的配置