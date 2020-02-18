### 29 多页面文件打包 和EsLint

##### 29.1 多页面文件打包

> 增加一个新的content.html文件 >>>
>
> <img src="..\images\image-20200211201907616.png" alt="image-20200211201907616" style="zoom:50%;" />
>
> 准备两个js文件 >>>
>
> ![image-20200211201950973](..\images\image-20200211201950973.png)
>
> 修改webpack.common.js的配置 >>> 先修改入口
>
> <img src="..\images\image-20200211202111283.png" alt="image-20200211202111283" style="zoom:80%;" />
>
> 再修改html 打包插件的配置 >>> 增加一个
>
> <img src="..\images\image-20200211202434147.png" alt="image-20200211202434147" style="zoom:67%;" />
>
> 打包 >>> 分开引用了
>
> <img src="..\images\image-20200211202527415.png" alt="image-20200211202527415" style="zoom: 67%;" />
>
> <img src="..\images\image-20200211202611340.png" alt="image-20200211202611340" style="zoom:67%;" />
>
> 但是上面这种方法纯属手动 , 不智能 , 我们可以改进一下 , 实现自动化效果
>
> <img src="..\images\image-20200212141135798.png" alt="image-20200212141135798" style="zoom:80%;" />
>
> 把原来的插件删除 , 改成新的配置 >>>
>
> ![image-20200212141217274](..\images\image-20200212141217274.png)
>
> 重新打包 >>>
>
> ![image-20200212141311989](..\images\image-20200212141311989.png)
>
> ![image-20200212141327029](..\images\image-20200212141327029.png)

##### 29.2 EsLint的基本配置

> 在一个大型项目开发的过程中, 有一个问题需要每个人注意, 那就是不同人员的代码规范:比如用tab还是用空格, 每行结尾放不放分号,主用双引号还是单引号等等,这些规则若是不统一,则会造成后期代码维护的大问题
>
> 安装`eslint`工具 >>>
>
> ```nginx
> λ cnpm install eslint --save-dev
> ```
>
> 执行检查 >>>
>
> ```nginx
> λ npx eslint --init
> ```
>
> ![image-20200212144459403](..\images\image-20200212144459403.png)
>
> eslint 里的配置 >>> 这是对整个js项目所在的环境和运行的语法版本等等进行的一系列描述
>
> <img src="..\images\image-20200212144548400.png" alt="image-20200212144548400" style="zoom:80%;" />
>
> 简易的使用方式 , 可以在命令行内部直接通过npx eslint "路径"的方式 ,指定需要检查的文件夹
>
> ![image-20200212145017065](..\images\image-20200212145017065.png)
>
> ![image-20200212145037365](..\images\image-20200212145037365.png)

