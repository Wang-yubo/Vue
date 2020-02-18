### 22 webpack插件

##### 22.1 插件plugins

> - wenbpack有丰富的插件接口
> - webpack自身的多数功能都使用这些插件接口
> - 这个插件可以使得webpack变得极其灵活
> - plugin可以帮助我们在使用webpack来打包的动作运行到某个时刻 , 来帮助我们做一些事情

<img src="..\images\image-20200208144733859.png" alt="image-20200208144733859" style="zoom:80%;" />

##### 22.2 html-webpack-plugin

> 我们之前学习了打包js , css , img文件 等等 , 但是html文件还没有学习怎么打包 , 这是因为html文件需要使用plugin来打包 , 而不能用loader了

> 安装插件>>>
>
> ```nginx
> λ cnpm install html-webpack-plugin --save-dev
> ```
>
> <img src="..\images\image-20200208150352902.png" alt="image-20200208150352902" style="zoom:67%;" />
>
> 导入插件>>>
>
> ![image-20200208150659895](..\images\image-20200208150659895.png)
>
> 使用插件>>>注意是和mode , entry ,output , module同级的 , 使用方法是用一个构造函数来引入插件 , 然后把构造函数实例化
>
> ![image-20200208150849815](..\images\image-20200208150849815.png)
>
> 打包后的文件>>>
>
> ![image-20200208151558114](..\images\image-20200208151558114.png)
>
> ![image-20200208151621102](..\images\image-20200208151621102.png)
>
> `HtmlWebpackPlugin`插件会在打包结束后, 自动生成一个`html`文件,并把打包生成的`js`文件插入到`html`文件中
>
> 但是这个又有一些问题, 那就是之前我们预设的一个h1标签没有了, 还有title标签里的内容也变了,而且这个打包生成的`html`文件里面啥信息我们都不能自定义, 这肯定不符合我们的开发需求. 因此, `htmlwebpackplugin`给我们提供了一个配置选项, 让我们可以自定义生成的`html`文件的基本模板
>
> 准备模板>>>
> <img src="..\images\image-20200208152613115.png" alt="image-20200208152613115" style="zoom:67%;" />
>
> 设置template参数 , 定义模板文件的位置>>>
>
> <img src="..\images\image-20200208153029624.png" alt="image-20200208153029624" style="zoom:80%;" />
>
> 打包后的文件>>>打包后的文件就是在模板的基础上加了一个js的引用
>
> <img src="..\images\image-20200208153239614.png" alt="image-20200208153239614" style="zoom:67%;" />

##### 22.3 clean-webpack-plugin

> `clean-webpack-plugin`是一个用于清除的第三方插件
>
> 每次我们打包的时候, 目标目录下的文件采取的是覆盖的模式, 但如果两次打包时,我们把某个输出文件的名称换掉了, 那么就不会进行覆盖, 最终的项目目录里面就会保留多个相同的文件
>
> 安装这个插件>>>
>
> ```nginx
> λ cnpm install clean-webpack-plugin --save-dev
> ```
>
> <img src="..\images\image-20200208160527173.png" alt="image-20200208160527173" style="zoom:67%;" />
>
> 导入插件>>>注意这个第三方插件的导入方式不一样 , 他是一个有名函数 , 需要解构 , 而且名字还得大写
>
> ![image-20200208161328584](..\images\image-20200208161328584.png)
>
> 使用插件>>>
>
> ![image-20200208161504906](..\images\image-20200208161504906.png)
>
> 打包中>>>注意使用这个插件的时候第一次打包大概率报错 , 不用管它再打包一次就好>>>这是js线程问题
>
> <img src="..\images\image-20200208161605578.png" alt="image-20200208161605578" style="zoom:50%;" />
>
> <img src="..\images\image-20200208161732441.png" alt="image-20200208161732441" style="zoom:50%;" />
>
> 修改名字后继续打包
>
> ![image-20200208161847229](..\images\image-20200208161847229.png)
>
> 效果>>>名字变了并且没有之前的文件了
>
> ![image-20200208161915020](..\images\image-20200208161915020.png)
>
> 该插件的详细使用方法,参考
>
> https://github.com/johnagan/clean-webpack-plugin
>
> 这是大佬的GitHub  嗯 , 是我羡慕的发量
>
> ![image-20200208162632729](..\images\image-20200208162632729.png)

