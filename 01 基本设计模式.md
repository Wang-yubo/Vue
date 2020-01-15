### 01. vue的基本逻辑

##### 1.1 基本的设计模式之MVC模式

> - MVC是目前应用最广泛的软件架构之一，一般MVC是指：Model（模型），Controller（控制器），View（视图），这主要是基于分层的目的。
> - view一般都是通过controller来和model进行联系的。controller是model和view的协调者，view和model不直接联系。
> - 基本联系都是单向的。

> MVC的通信方式（无用户交互）
>
> <img src="F:\learn Vue\images\timg.jpg" style="zoom:50%;" />

> MVC的通信方式（有用户交互）
>
> <img src="F:\learn Vue\images\timg (1).jpg" style="zoom:50%;" />
>
> 用户（user）通过controller来操作model以达到view的变化

> MVC模式的优点：
>
> 1. 耦合性低
> 2. 有利于开发中的分工
> 3. 有利于组件的重用
> 4. 可维护性高

> MVC模式的缺点：
>
> 1. 增加了系统结构和实现的复杂性。对于简单的界面，严格遵循MVC，使模型、视图与控制器分离，会增加结构的复杂性，并可能产生过多的更新操作，降低运行效率。
> 2. 视图与控制器间的过于紧密的连接。视图与控制器是相互分离，但确实联系紧密的部件，视图没有控制器的存在，其应用是很有限的，反之亦然，这样就妨碍了他们的独立重用。
> 3. 视图对模型数据的低效率访问。依据模型操作接口的不同，视图可能需要多次调用才能获得足够的显示数据。对未变化数据的不必要的频繁访问，也将损害操作性能。
> 4. 目前，一般高级的界面工具或构造器不支持MVC模式。改造这些工具以适应MVC需要和建立分离的部件的代价是很高的，从而造成使用MVC的困难。

##### 1.2 基本的设计模式之MVP模式

> - MVP是从经典的MVC模式演变而来的，他们的基本思想有想通的地方：controller/presenter(发布层)负责逻辑的处理，model提供数据，view负责显示
> - 在MVP中，presenter完全把view和model进行了分离，主要的程序逻辑在presenter里实现。而且，presenter与具体的view是没有直接关联的，而是通过定义好的接口进行交互，从而使得在变更view的时候可以保持presenter不变。

<img src="F:\learn Vue\images\a08b87d6277f9e2fa13441241730e924b899f39d.jpg" style="zoom:50%;" />

> MVP模式的优点：
>
> 1. **View与Model完全隔离。**这意味着，如果Model或View中的一方发生变化，只要交互接口不变，另一方就没必要对上述变化做出改变。这使得Model层的业务逻辑具有很好的灵活性和可重用性。
> 2. **Presenter与View的具体实现技术无关。**也就是说，采用诸如Windows表单，WPF，Web表单等用户界面构建技术中的任意一种来实现View层，都无需改变系统的其他部分。甚至为了使B/S，C/S部署架构能够被同时支持，应用程序可以用同一个Model层适配多种技术构建的View层。
> 3. **可以进行View的模拟测试。**过去，由于View和Model之间的紧耦合，在Model和View同时开发完成之前对其中一方进行测试是不可能的。出于同样的原因，对View或Model进行单元测试很困难。现在，MVP模式解决了所有的问题。在MVP模式中，View和Model之间没有直接依赖，开发者能够借助模拟对象注入测试两者中的任一方。

> MVC相比于MVP的优势：
>
> - MVP与MVC的主要区别是View与Model不直接交互，而是通过与Presenter来完成交互，这样可以修改视图而不影响模型，达到解耦的目的，实现了Model和View真正的完全分离。

> MVC相比于MVP的劣势：
>
> - MVP的明显缺点是增加了代码的复杂度，特别是针对小型Android应用的开发，会使程序冗余。Presenter中除了应用逻辑以外，还有大量的View->Model，Model->View的手动同步逻辑，会导致Presenter臃肿，维护困难。视图的渲染过程也会放在Presenter中，造成视图与Presenter交互过于频繁，如果某特定视图的渲染很多，就会造成Presenter与该视图联系过于紧密，一旦该视图需要变更，那么Presenter也需要变更了，不能如预期的那样降低耦合度和增加复用性。

##### 1.3 基本的设计模式之MVVM模式

> - 相比前面两种模式，MVVM只是把MVC的controller和MVP的presenter改成了viewmodel
> - view的变化会自动更新到viewModel，viewmodel的变化也会自动同步到view上显示。这种自动同步是因为viewModel中的属性实现了observer（观察者模式），当属性变更时都能触发对应额操作。

<img src="F:\learn Vue\images\562c11dfa9ec8a13ab6935fbfc03918fa0ecc0be.jpg" style="zoom:50%;" />

