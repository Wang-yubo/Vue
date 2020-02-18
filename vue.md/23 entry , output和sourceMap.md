### 23 entry , output和sourceMap

##### 23.1 entry , output

> 这是我们之前的写法>>>入口是一个地址的字符串 , 出口写了打包后的文件名
>
> ![image-20200208174308416](..\images\image-20200208174308416.png)
>
> 现在换一种写法>>>把入口写成一个对象 , 键为打包后的文件名 , 值为入口文件的地址 , 出口不写`filename`了
>
> <img src="..\images\image-20200208175131753.png" alt="image-20200208175131753" style="zoom:80%;" />
>
> 这两种写法是等价的 , 但是下面的这种写法还有一个优势 , 那就是入口文件不止一个的时候用下面这种写法
>
> ![image-20200208175616760](..\images\image-20200208175616760.png)
>
> 假设这两个入口文件不一样(手动滑稽)>>>输出了两个文件
>
> ![image-20200208175717116](..\images\image-20200208175717116.png)
>
> 并且这两个文件都被引入到了html文件中
>
> <img src="..\images\image-20200208175800642.png" alt="image-20200208175800642" style="zoom:67%;" />

##### 23.2 entry , output之公共路径

> `publicPath`
>
> ![image-20200208180459015](..\images\image-20200208180459015.png)
>
> 打包后>>>增加了一个公共的路径前缀 , 一般会采用某个网址
>
> ![image-20200208180556381](..\images\image-20200208180556381.png)

##### 23.3 sourceMap

> 我们先添加一行错误代码>>>
>
> ![image-20200208181924148](..\images\image-20200208181924148.png)
>
> 打包后查看错误信息>>>
>
> ![image-20200208182033052](..\images\image-20200208182033052.png)
>
> 我们能看到错误代码是在源文件的那个js文件里面的哪一行
>
> 这是因为webpack默认开启sourceMap
>
> 我们现在把它关掉 >>>
>
> <img src="..\images\image-20200208182607600.png" alt="image-20200208182607600" style="zoom:80%;" />
>
> 重新打包后 , 查看错误信息 >>>现在看不到是哪个源文件出错了
>
> ![image-20200208182654040](..\images\image-20200208182654040.png)
>
> <img src="..\images\image-20200208182708169.png" alt="image-20200208182708169" style="zoom:67%;" />
>
> 现在开启sourceMap模式 >>> sourceMap就是一种映射关系 , 它能将最终打包后出错的代码在原始文件信息展示出来
>
> <img src="..\images\image-20200208185410722.png" alt="image-20200208185410722" style="zoom:80%;" />
>
> 现在错误信息又能看到了 , 同时 , 他还生成了一个`.map`文件
>
> ![image-20200208185501678](..\images\image-20200208185501678.png)
>
> <img src="..\images\image-20200208185736859.png" alt="image-20200208185736859" style="zoom:50%;" />
>
> <img src="..\images\image-20200208190505194.png" alt="image-20200208190505194" style="zoom: 67%;" />
>
> 不同的关键词所代表的的基本含义
>
> 1. cheap:只处理业务代码的错误信息, 其他的引用模块或是loader的错误予以忽略
> 2. inline:把生成的.map文件编码成base64格式, 内嵌到最后生成的js文件中
> 3. module:也处理module或是loader里面的错误信息
> 4. source-map:生成一个.map文件
> 5. eval:以eval的方式来处理业务代码, 以方便把代码和原始文件地址进行管理
>
> - 建议在development的模式下, 采用cheap-module-eval-source-ma
> - 建议在production的模式下,采用cheap-module-source-map

