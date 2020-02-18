### 31 Vue-cli的基本服务

##### 31.1 运行指令serve

> ![image-20200213212914363](..\images\image-20200213212914363.png)
>
> - vue-cli-service serve 命令会启动一个开发服务器 (基于 webpack-dev-server) 并附带开箱即用的模块热重载 (Hot-Module-Replacement)。
>
> - 除了通过命令行参数，你也可以使用 vue.config.js 里的 devServer 字段配置开发服务器。
>
> - 命令行参数 [entry] 将被指定为唯一入口，而非额外的追加入口。尝试使用 [entry] 覆盖 config.pages 中的 entry 将可能引发错误。
>
>   ![image-20200213213301224](..\images\image-20200213213301224.png)
>
>   serve后面可指定的选项
>
>   | 选项    | 功能                               |
>   | ------- | ---------------------------------- |
>   | --open  | 在服务器启动时打开浏览器           |
>   | --copy  | 在服务器启动时将URL复制到剪切板    |
>   | --mode  | 指定环境模式(默认值 : development) |
>   | --host  | 指定host (默认值 : 0.0.0.0)        |
>   | --port  | 指定端口 (默认值 : 8080)           |
>   | --https | 使用https(默认值 : false)          |
>
>   --port写端口号这里我不知道怎么写 , 换种替代方式
>
>   ![image-20200213215839707](..\images\image-20200213215839707.png)
>
>   ![image-20200213215849986](..\images\image-20200213215849986.png)

##### 31.2 运行指令build

> - vue-cli-service build 会在 dist/ 目录产生一个可用于生产环境的包，带有 JS/CSS/HTML 的压缩，和为更好的缓存而做的自动的 vendor chunk splitting。
> - 它的 chunk manifest 会内联在 HTML 里
>
> build后面可指定的选项
>
> | 选项          | 功能                                                         |
> | ------------- | ------------------------------------------------------------ |
> | --mode        | 指定环境模式(default :production)                            |
> | --dest        | 指定输出目录                                                 |
> | --modern      | 面向现代浏览器带自动回退地构建应用                           |
> | --target      | app \| lib \| wc \| wc-async (default :app)                  |
> | --name        | 库或Web Component模式下的名字(default : package.json中的"name"字段或入口文件名) |
> | --no-clean    | 在构建项目之前不清除目标目录                                 |
> | --report      | 生成report.html 以帮助分析包内容                             |
> | --report-json | 生成report.json 以帮助分析包内容                             |
> | --watch       | 监听文件变化                                                 |
>
> ![image-20200213221224769](..\images\image-20200213221224769.png)
>
> ![image-20200213221250160](..\images\image-20200213221250160.png)

##### 31.3 webpack相关

> 调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象：
>
> ![image-20200213211652980](..\images\image-20200213211652980.png)
>
> 该对象将会被webpack-merge合并入最终的webpack配置
>
> 注意!!! : 有些webpack选项是基于vue.config.js中的值设置的 , 所以不能直接修改 , 例如你应该修改vue.config.js 中的 outputDir 选项而不是修改 output.path；你应该修改 vue.config.js 中的 publicPath 选项而不是修改 output.publicPath。这样做是因为 vue.config.js 中的值会被用在配置里的多个地方，以确保所有的部分都能正常工作在一起。
>
> 
>
> 如果需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，可以直接修改配置，或者返回一个将会被合并的对象：
>
> ![image-20200214145849074](..\images\image-20200214145849074.png)
>

