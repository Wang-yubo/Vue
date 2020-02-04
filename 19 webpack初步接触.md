### 19 webpack初步接触

> 最原始的HTML与js文件分离
>
> <img src="F:\learn Vue\images\image-20200204215941364.png" alt="image-20200204215941364" style="zoom:50%;" />
>
> <img src="F:\learn Vue\images\image-20200204220005138.png" alt="image-20200204220005138" style="zoom:50%;" />
>
> 稍微懂点的HTML与JS分离 : 
>
> <img src="F:\learn Vue\images\image-20200204220608005.png" alt="image-20200204220608005" style="zoom: 50%;" />
>
> <img src="F:\learn Vue\images\image-20200204220648564.png" alt="image-20200204220648564" style="zoom:50%;" />
>
> <img src="F:\learn Vue\images\image-20200204220706831.png" alt="image-20200204220706831" style="zoom:50%;" />
>
> <img src="F:\learn Vue\images\image-20200204220721375.png" alt="image-20200204220721375" style="zoom:50%;" />
>
> <img src="F:\learn Vue\images\image-20200204220735633.png" alt="image-20200204220735633" style="zoom:50%;" />
>
> 稍微封装一下 :
>
> <img src="F:\learn Vue\images\image-20200204222049885.png" alt="image-20200204222049885" style="zoom:50%;" />
>
> <img src="F:\learn Vue\images\image-20200204222116157.png" alt="image-20200204222116157" style="zoom:50%;" />
>
> <img src="F:\learn Vue\images\image-20200204222130830.png" alt="image-20200204222130830" style="zoom:50%;" />
>
> 上述代码有几个问题 :
>
> 1. 代码文件的引入必须严格按照顺序来 , 否则出错
> 2. 网页需要引入的文件过多 , 网页在加载时 , 需要大量的HTTP请求,这样会造成网页加载慢
> 3. 在主index.js文件中 ,无法看到每个方向具体来自哪个文件 , 只能去html文件中看
>
> 优化一下直接使用es6的模块?新浏览其还好说 , 老浏览器还不支持直接使用es6的模块系统
>
> <img src="F:\learn Vue\images\image-20200204223005034.png" alt="image-20200204223005034" style="zoom:50%;" />
>
> <img src="F:\learn Vue\images\image-20200204223032587.png" alt="image-20200204223032587" style="zoom:50%;" />
>
> <img src="F:\learn Vue\images\image-20200204223101203.png" alt="image-20200204223101203" style="zoom:50%;" />
>
> <img src="F:\learn Vue\images\image-20200204223526819.png" alt="image-20200204223526819" style="zoom:50%;" />

> 现在使用webpack打包 , 执行命令
>
> ```nginx
> λ npx webpack js/index.js
> ```
>
> 返回结果 :
>
> ![image-20200204223742665](F:\learn Vue\images\image-20200204223742665.png)
>
> 打包后的文件 : 
>
> ![image-20200204223924765](F:\learn Vue\images\image-20200204223924765.png)
>
> <img src="F:\learn Vue\images\image-20200204223946386.png" alt="image-20200204223946386" style="zoom:50%;" />
>
> 现在只引用打包后的文件 , 并且不加`type = "module"`
>
> <img src="F:\learn Vue\images\image-20200204224157616.png" alt="image-20200204224157616" style="zoom:50%;" />
>
> 仍然有效果 :
>
> <img src="F:\learn Vue\images\image-20200204224223634.png" alt="image-20200204224223634" style="zoom:50%;" />

