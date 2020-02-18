### 21 url-loader和css文件的打包

##### 21.1 url-loader的配置

> 安装url-loader
>
> ```nginx
> λ cnpm install url-loader --save-dev
> ```
>
> ![image-20200206165205332](..\images\image-20200206165205332.png)
>
> 准备
>
> <img src="..\images\image-20200206171654479.png" alt="image-20200206171654479" style="zoom: 80%;" />
>
> <img src="..\images\image-20200206171714896.png" alt="image-20200206171714896" style="zoom: 80%;" />
>
> 配置改成url-loader
>
> <img src="..\images\image-20200206171809912.png" alt="image-20200206171809912" style="zoom:50%;" />
>
> 打包后的目录>>>没有图片和images目录了
>
> <img src="..\images\image-20200206172510865.png" alt="image-20200206172510865" style="zoom:80%;" />
>
> 网页效果 :
> <img src="..\images\image-20200206172648633.png" alt="image-20200206172648633" style="zoom:67%;" />
>
> 此时的图片格式 : base64
>
> ![image-20200206172720482](..\images\image-20200206172720482.png)
>
> 我们可以看到 , 用`url-loader`解析的资源里面 , 图片文件不在了 , 其他的正常 , `url-loade`r整体上和`file-loader`差不多 , 但是有一个地方有很大的区别 , 那就是默认情况下 , 图片会解析为base64的编码而不是直接生成文件
>
> ![image-20200206173809590](..\images\image-20200206173809590.png)

##### 21.2 css-loader

> 安装打包css文件需要的两个loader
>
> ```nginx
> λ cnpm install style-loader css-loader --save-dev
> ```
>
> ![image-20200206175038704](..\images\image-20200206175038704.png)
>
> 配置>>>
>
> ![image-20200207144924805](..\images\image-20200207144924805.png)
>
> 当我们给一个文件使用多个loader时 , 他是有执行顺序的 , 顺序是从下往上执行(写在一行就是从右往左)
>
> css准备>>>
>
> <img src="..\images\image-20200207150656469.png" alt="image-20200207150656469" style="zoom: 67%;" />
>
> <img src="..\images\image-20200207152555635.png" alt="image-20200207152555635" style="zoom: 80%;" />
>
> <img src="..\images\image-20200207150835265.png" alt="image-20200207150835265" style="zoom: 80%;" />
>
> 打包后的网页效果 :
>
> <img src="..\images\image-20200207152626801.png" alt="image-20200207152626801" style="zoom: 67%;" />

##### 21.3 打包scss

> 打包scss文件需要安装两个包
>
> ```nginx
> λ cnpm install sass-loader node-sass --save-dev
> ```
>
> <img src="..\images\image-20200207153251233.png" alt="image-20200207153251233" style="zoom: 80%;" />
>
> 配置>>>
>
> ```nginx
> {
> test:/\.(css/scss)$/,
> use:[
> 'style-loader',
> 'css-loader',
> 'sass-loader'
> ]
> }
> ```

##### 21.4 postcss-loader

> 很多样式为了实现浏览器兼容,都需要加上一些浏览器内核前缀,如果由我们自己手写的话 , 这个工作量是非常大的 , 所以我们可以引入一个包 , 自动帮我们实现前缀的书写
>
> 安装命令>>>
>
> ```nginx
> λ cnpm install postcss-loader --save-dev
> ```
>
> <img src="..\images\image-20200207154940311.png" alt="image-20200207154940311" style="zoom: 80%;" />
>
> 只有`postcss-loader`还不够 , 还需要一个基本插件`autoprefixer`
>
> ```nginx
> λ cnpm install autoprefixer --save-dev
> ```
>
> <img src="..\images\image-20200207155751608.png" alt="image-20200207155751608" style="zoom: 80%;" />
>
> 需要新建一个`postcss.config.js`的配置文件
>
> ![image-20200207161050755](..\images\image-20200207161050755.png)
>
> 然后在webpack.config.js里面增加loader
>
> <img src="..\images\image-20200207161652782.png" alt="image-20200207161652782" style="zoom: 80%;" />
>
> 回到`postcss.config.js`引入插件`autoprefixer`
>
> <img src="..\images\image-20200207162000693.png" alt="image-20200207162000693" style="zoom: 80%;" />
>
> 现在有两个loader和css-loader有引用关系 , 需要修改css-loader
>
> ![image-20200207172712305](..\images\image-20200207172712305.png)
>
> 修改`package.json`, 增加一个浏览器列表选项,并设置相应内容>>>注意单词拼写 , `browserslist`,`l`是小写的
>
> ![image-20200207172354520](..\images\image-20200207172354520.png)
>
> 详细的浏览器列表
> https://github.com/browserslist/browserslist#readme
>
> ![image-20200207173113649](..\images\image-20200207173113649.png)
>
> 兼容后的网页代码
>
> ![image-20200207172320702](C:\Users\王雨波\AppData\Roaming\Typora\typora-user-images\image-20200207172320702.png)

##### 21.5 自定义字体文件的打包

> 阿里图库下载图标
>
> <img src="..\images\image-20200207180524304.png" alt="image-20200207180524304" style="zoom:67%;" />
>
> 保留这6个文件 , 其他的删掉
>
> ![image-20200207180602562](..\images\image-20200207180602562.png)
>
> `index.css`中引入`iconfont.css`
>
> <img src="..\images\image-20200207190800548.png" alt="image-20200207190800548" style="zoom:67%;" />
>
> 配置>>>
>
> <img src="..\images\image-20200207192337860.png" alt="image-20200207192337860" style="zoom:80%;" />
>
> 创建元素 , 存放图标
>
> ![image-20200207192025006](..\images\image-20200207192025006.png)
>
> 打包后的效果 >>>
>
> <img src="..\images\image-20200207191924537.png" alt="image-20200207191924537" style="zoom:67%;" />

