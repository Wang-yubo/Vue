### 18 webpack

> - 在模块化编程盛行的今天 , 每个js , css都可以独立存在 , 而每个独立存在的文件又有可能采取不同的工程化语言方法 , 比如用TypeScript写js , 用sass写css等等 , 这时候我们局需要用一个简单的工具 , 完成这种同一编译解析输出的功能了
> - webpack处理应用程序时 , 它会递归地构建一个依赖关系图(dependency graph) , 其中包含应用程序需要的每个模块 , 然后将所有这些模块打包成一个bundle(包) 

![image-20200204194655116](..\images\image-20200204194655116.png)

##### 18.1 webpack的安装

> 安装`webpack`命令>>>前提是先装好node
>
> ```nginx
> λ cnpm install webpack --save-dev
> ```
>
> 安装webpack-cli的命令 :
>
> ```nginx
> λ cnpm install webpack-cli --save-dev
> ```
>
> - webpack 或是 webpack-cli 后面的 --save-dev 是指开发的时候依赖的工具 , 正式发布的时候不包含
> - 如果直接写 --save ,那么就是发布之后还要依赖的工具
> - 推荐本地安装 , 因为全局安装在实际开发一般都会遇到某些项目的webpack版本不同 , 导致运行错误
>
> 初始化文件夹 :
>
> ```nginx
> λ cnpm init
> ```
>
> ![image-20200204200342994](..\images\image-20200204200342994.png)
>
> 把那些个项目名称 , 版本号 , 作者 , 测试命令行什么的配置好(刚开始直接回车就行 , 不用配置)输入y或者yes直接确定 , 回到文件夹查看
>
> ![image-20200204200755700](..\images\image-20200204200755700.png)
>
> 有了这个package.json文件 , 那么就初始化好了
>
> 打开该文件 , 查看配置
>
> ![image-20200204201436985](..\images\image-20200204201436985.png)
>
> npm run test 的效果 就等同于后面的 " echo \ ...... " 这串长命令 , 使用短指令实现执行长指令的效果 (当前长指令的意思是关闭命令行窗口)
>
> license : "ISC" 是一种许可证

##### 18.2 webpack的查看

> 命令查看:
>
> ```nginx
> λ npx webpack -v
> ```
>
> ```nginx
> λ npx webpack-cli -v
> ```
>
> ![image-20200204202955076](..\images\image-20200204202955076.png)
>
> 文件查看 :
>
> ![image-20200204203328583](..\images\image-20200204203328583.png)
>
> 开发依赖项 :
>
> ![image-20200204203852389](..\images\image-20200204203852389.png)
>
> 注意 : 如过你给别人发一个文件千万不要发node_models文件 , 别人拿到以后再自己下个node_models就好(`npm install`) , 因为原来的出现在webpack.json文件里的依赖项都下载node_models的时候都会自动装好

##### 18.3 npm安装特定版本的库

> 如果我们不清楚一个库到底有多少个版本 ,我们可以输入一下指令

```nginx
λ npm info webpack
```

> <img src="..\images\image-20200204205436900.png" alt="image-20200204205436900" style="zoom:80%;" />
>
> 通过查看版本号来安装特定的版本>>>安装特定版本的命令
>
> 安装特定版本号的目的就是为了兼容老项目
>
> ```nginx
> λ cnpm install webpack@4.41.1
> ```

##### 18.4 卸载命令

> ```nginx
> λ cnpm uninstall webpack -g
> ```

