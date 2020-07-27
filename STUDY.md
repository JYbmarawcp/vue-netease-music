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
  watch: {
  a: function (val, oldVal) {
  console.log('new: %s, old: %s', val, oldVal)
  },
  // 方法名
  b: 'someMethod',
  // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
  c: {
  handler: function (val, oldVal) { /_ ... _/ },
  deep: true
  },
  // 该回调将会在侦听开始之后被立即调用
  d: {
  handler: 'someMethod',
  immediate: true
  },
  // 你可以传入回调数组，它们会被逐一调用
  e: [
  'handle1',
  function handle2 (val, oldVal) { /* ... */ },
  {
  handler: function handle3 (val, oldVal) { /* ... */ },
  /* ... */
  }
  ],
  // watch vm.e.f's value: {g: 5}
  'e.f': function (val, oldVal) { /_ ... _/ }
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

* v-loading 优雅的使用 loading
  element-loading-text="拼命加载中"  设置 loading 文字

element-loading-background="rgba(0, 0, 0, 0.8)" 设置 loading 背景

element-loading-spinner="el-icon-loading" 设置 loading 图标

- inject 和 provide
  provide 可以在祖先组件中指定我们想要提供给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide 提供的数据或方法。

- 换肤
  document.documentElement.style.setProperty(key, value) 来设置变量

- :show.sync
  props 的绑定默认是单向的，我们要在组件内部更新 show 值，需要在父组件上添加 .sync 修饰符，以创建『双向绑定』：
  <Message :show.sync="msgShow"/>
  上面的代码会被 Vue 扩展为：
  <Message :show="msgShow" @update:show="val => msgShow = val" />
  因为父组件有 update:show 事件监听，所以我们能在组件内部使用 $emit 来关闭消息提示： this.$emit('update:show', false)

- undefined 若函数没有返回值则默认返回一个 undefined，布尔值为 fales

- Element.requestFullscreen() 方法用于发出异步请求使元素进入全屏模式。
  toFullScreen：全屏
  function toFullScreen(){  
  　　 let elem = document.body;  
  　　 elem.webkitRequestFullScreen  
  　　? elem.webkitRequestFullScreen()  
  　　: elem.mozRequestFullScreen  
  　　? elem.mozRequestFullScreen()  
  　　: elem.msRequestFullscreen  
  　　? elem.msRequestFullscreen()  
  　　: elem.requestFullScreen  
  　　? elem.requestFullScreen()  
  　　: alert("浏览器不支持全屏");
  }

exitFullscreen：退出全屏
function exitFullscreen(){  
　　 let elem = parent.document;  
　　 elem.webkitCancelFullScreen  
　　? elem.webkitCancelFullScreen()  
　　: elem.mozCancelFullScreen  
　　? elem.mozCancelFullScreen()  
　　: elem.cancelFullScreen  
　　? elem.cancelFullScreen()  
　　: elem.msExitFullscreen  
　　? elem.msExitFullscreen()  
　　: elem.exitFullscreen  
　　? elem.exitFullscreen()  
　　: alert("切换失败,可尝试 Esc 退出");
}
是否全屏
export function isFullscreen() {
return document.fullScreen ||
document.mozFullScreen ||
document.webkitIsFullScreen
}

- 1turn 一圈
- animation-play-state: paused; 暂停动画
- border-color 这个属性的初始值（Initial value）就是 currentcolor

- decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
  http%3A%2F%2Fwww.w3school.com.cn%2FMy%20first%2F
  http://www.w3school.com.cn/My first/
