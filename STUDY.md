### Bug Fixes

- 完美解决 Cannot download "https://github.com/sass/node-sass/releases/download/binding.nod的问题
  【新版解决方案】：一句命令解决 npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

- vue 为编写插件提供了一个 install(Vue, Option) 方法，该方法为 vue 添加全局功能；
  该方法有两个参数，第一个是 Vue 构造器，第二个是可选的参数

- require.context 是 Webpack 中用来管理依赖的一个函数,此方法会生成一个上下文模块,包含目录下所有模块的引用,通过正则表达式匹配,然后 require 进来
  require.context('.', false, /\.vue\$/)
  参数一:要查询的目录,上述代码指的是当前目录
  参数二:是否要查询子孙目录,方法默认的值为 false
  参数三:要匹配的文件的后缀,是一个正则表达式,上述我要查询的是.vue 文件)
  正则表达匹配中是有区分大小写的，i 就是说明不区分大小写

- 在 flex 容器中，当空间不够的时候，flex-shrink 不为 0 的元素会被压缩，所以解决的方法就是给图片设置：flex-shrink:0。

- 为了防止组件多个实例之间共享属性，所以需要通过工厂函数来获取值
  数组
  data: {
  default: () => []
  }

对象
data: {
default: () => ({})
}

- vm.$slots
用来访问被插槽分发的内容。每个具名插槽有其相应的 property (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。

- substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。

- number | 0 可以向下取整(先将数值转换成 32 位二进制整数值（如果有小数则忽略)

- vue-lazyLoad
  preLoad （预加载高度比例）
  error （图片路径错误时加载图片)
  loading （预加载图片）
  attempt （尝试加载图片数量）

- watch
  {
  deep: true (代表深度监听)
  immediate:true (代表立即先去执行 handler 方法)
  handler(){}
  }

- 让当前的元素滚动到浏览器窗口的可视区域内。定义动画过渡效果， 定义垂直方向，定义水平方向
  element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

- model
  类型：{ prop?: string, event?: string }
  允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。
  // 定义 model 属性
  model: {
  // prop 即 父组件使用 v-model 绑定的属性,这个名称是自定义的
  prop: "value",
  // event 即 子组件会向父组件触发的事件,父组件的 v-model 可以监听到这个事件,并将 vlaue 赋值给 v-model 绑定的属性
  event: "input"
  },
  props: {
  // 这里的 prop 定义必须与 model 中定义的 prop 同名
  value: String
  },
- align-self 属性定义 flex 子项单独在侧轴（纵轴）方向上的对齐方式。
- :not(selector) 选择器匹配非指定元素/选择器的每个元素。
- filter(滤镜) 属性
  blur(px)给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊
- v-slot:header 可以被重写为 #header
