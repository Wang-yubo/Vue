### 20 webpack的loader

> - loader让webpack能够去处理那些非JavaScript文件(webpack自身只理解JavaScript)
> - loader可以将所有的类型文件转换为webpack能够处理的有效模块 , 然后你就可以利用webpack的打包能力 , 对他们进行处理

> 本质上 , webpack loader将所有类型的文件 , 转换为应用程序的依赖图(和最终的bundle)可以直接引用的模块
>
> 在更高层面 , 在webpack的配置中loader有两个目标 :
>
> 1. `test`属性 , 用于标识出应该被对应的loader进行转换的某个或某些文件
> 2. `use`属性 , 表示进行转换时 , 应用使用哪个loader
>
> ![image-20200205223349882](..\images\image-20200205223349882.png)
>
> 仅官方定义的loader就有几十个 , 每个loader的配置又有几十个 , 加上非官方的民间自定义或是企业提供的 , 成千上万个loader不是空话 , 所以不要想去把每个loader都记住

##### 20.1 webpack的loader配置方案

> - module属性里面是一个对象 , 对象的rules属性值是一个数据 , 内部的每个数组项目都是对某一类文件进行的loader的配置对象
> - 配置对象的参数比较固定 :
>
> 1. test >>> 就是筛选特定的文件 , 一般就是以后缀为识别码
> 2. use >>> 就是采用哪个具体的loader
>
> 配置 :
>
> ![image-20200206150142982](..\images\image-20200206150142982.png)

> 安装`file-loader`
>
> ![image-20200206134514321](..\images\image-20200206134514321.png)
>
> 更改的目录结构 :
>
> ![image-20200206150450891](..\images\image-20200206150450891.png)
>
> 更改index.js的代码 :
>
> ![image-20200206150832133](..\images\image-20200206150832133.png)
>
> 开始打包 :
>
> ![image-20200206141611827](..\images\image-20200206141611827.png)
>
> 打包后的文件 :
>
> ![image-20200206141649376](..\images\image-20200206141649376.png)
>
> ![image-20200206152416429](..\images\image-20200206152416429.png)
>
> 打包成功 , 图片文件成功的被打包了 , 默认情况下 ,生成的文件的文件名就是文件内容的MD5哈希值并会保留所引用资源的原始扩展名
>
> 在这个过程中 , `file-loader`帮我们做的事 :
>
> 1. 当`file-loader`检测到.jpg图片时 , 会把该图片资源移动到output的指定文件夹下 , 并且给图片设置名字(该名字可以是自定义或是设置为默认的MD5值)
> 2. 当把图片挪到output的指定文件夹之后 , file-loader会把该图片相对于output指定的文件夹的相对位置参数作为返回值 , 返回给引入文件时定义的变量
> 3. 上述动作不限于图片 , 可以用于一切文件

##### 20.2 file-loader的详细选项

<img src="..\images\image-20200206155049776.png" alt="image-20200206155049776" style="zoom:67%;" />

| 名称            | 类型               | 默认值                  | 描述                                                         |
| --------------- | ------------------ | ----------------------- | ------------------------------------------------------------ |
| name            | {string\|function} | [hash].[ext]            | 为你的文件配置自定义文件名模板                               |
| context         | {string}           | this.options.context    | 配置自定义文件 context，默认为 webpack.config.js context     |
| publicPath      | {String\|Function} | __webpack_public_path__ | 为你的文件配置自定义 public 发布目录                         |
| outputPath      | {String\|Function} | 'undefined'             | 为你的文件配置自定义 output 输出目录                         |
| useRelativePath | {Boolean}          | false                   | 如果你希望为每个文件生成一个相对 url 的 context 时，应该将其设置为 true |
| emitFile        | {Boolean}          | true                    | 默认情况下会生成文件，可以通过将此项设置为 false 来禁止（例如，使用了服务端的 packages） |

> 常用的选项是`name` 和 `outputPath`
>
> <img src="..\images\image-20200206160322149.png" alt="image-20200206160322149" style="zoom: 67%;" />
>
> ![image-20200206160352022](..\images\image-20200206160352022.png)
>
> 返回的路径也变了 :
>
> ![image-20200206160502596](..\images\image-20200206160502596.png)

##### 20.3 多个图片打包

> 在多个多图片打包的时候 , 要给每个图片都输出一个不一样的名字 , 就不能像上面一样直接写个固定的名字 , 否则多个文图片会重复显示为第一张图片
>
> 解决办法>>>使用placeholder参数
>
> ![image-20200206162830882](..\images\image-20200206162830882.png)
>
> 准备多张图片>>>
>
> <img src="..\images\image-20200206163220163.png" alt="image-20200206163220163" style="zoom:50%;" />
>
> 配置>>>
>
> <img src="..\images\image-20200206162912541.png" alt="image-20200206162912541" style="zoom:80%;" />
>
> ![image-20200206163030795](..\images\image-20200206163030795.png)

##### 20.4 多格式文件的引入

> 多格式文件的引入只需要修改一下正则就好了

<img src="..\images\image-20200206163612091.png" alt="image-20200206163612091" style="zoom:80%;" />