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

* require("workbox-webpack-plugin")
module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new GenerateSW()
  ]
};
这将为您的所有Webpack资产生成具有预缓存设置的服务工作者。

* 浏览器兼容方面
  <!-- 强制Chromium内核 作用于360浏览器 QQ浏览器等国产双核浏览器 -->
  <meta name="renderer" content="webkit" />
  <!-- 强制Chromium内核 作用于其他双核浏览器 -->
  <meta name="force-rendering" content="webkit" />
  <!-- 如果有安装Google Chrome Frame插件则强制IE为Chromium内核 否则强制本机支持的最高IE内核作用于IE浏览器 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">

* 自动将http的不安全请求升级为https
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

* <meta name=”viewport” content=”width=device-width, initial-scale=1, maximum-scale=1″>
  width：控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 device-width 为设备的宽度（单位为缩放为 100% 时的 CSS 的像素）。
  height：和 width 相对应，指定高度。
  initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
  maximum-scale：允许用户缩放到的最大比例。
  minimum-scale：允许用户缩放到的最小比例。
  user-scalable：用户是否可以手动缩放

* JPG 有损压缩、体积小、加载快、不支持透明
  用于轮播图

* PNG-8 与 PNG-24 无损压缩、质量高、体积大、支持透明
  用于 Logo

* SVG 文本文件、体积小、不失真、兼容性好(渲染成本高)
  阿里矢量图标库

* Base64 文本文件、依赖编码、小图标解决方案
  图片的实际尺寸很小（大家可以观察一下掘金页面的 Base64 图，几乎没有超过 2kb 的）
  图片无法以雪碧图的形式与其它小图结合（合成雪碧图仍是主要的减少 HTTP 请求的途径，Base64 是雪碧图的补充）
  图片的更新频率非常低（不需我们重复编码和修改文件内容，维护成本较低）

* 内核分为渲染引擎和js引擎，但随着js引擎越来越独立，内核成了渲染引擎的代称

渲染引擎又包括了 HTML 解释器、CSS 解释器、布局、网络、存储、图形、音视频、图片解码器等等零部件。
Trident（IE）、Gecko（火狐）、Blink（Chrome、Opera）、Webkit（Safari）
HTML 解释器：将 HTML 文档经过词法分析输出 DOM 树。

CSS 解释器：解析 CSS 文档, 生成样式规则。

图层布局计算模块：布局计算每个对象的精确位置和大小。

视图绘制模块：进行具体节点的图像绘制，将像素渲染到屏幕上。

JavaScript 引擎：编译执行 Javascript 代码。

CSS 选择符是从右到左进行匹配的
  避免使用通配符，只对需要用到的元素进行选择。
  关注可以通过继承实现的属性，避免重复匹配重复定义。
  少用标签选择器。如果可以，用类选择器替代
减少嵌套。后代选择器的开销是最高的，因此我们应该尽量将选择器的深度降到最低（最高不要超过三层），尽可能使用类来关联每一个标签元素。

JS的三种加载方式
正常模式：
<script src="index.js"></script>
这种情况下 JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情。

async 模式：
<script async src="index.js"></script>
async 模式下，JS 不会阻塞浏览器做任何其它的事情。它的加载是异步的，当它加载结束，JS 脚本会立即执行。

defer 模式：
<script defer src="index.js"></script>
defer 模式下，JS 的加载是异步的，执行是被推迟的。等整个文档解析完成、DOMContentLoaded 事件即将被触发时，被标记了 defer 的 JS 文件才会开始依次执行。


* 如何规避回流与重绘
将“导火索”缓存起来，避免频繁改动
避免逐条改变样式，使用类名去合并样式
将 DOM “离线” display:none => *操作*  => display: block

当你要用到像这样的属性：offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight 时，你就要注意了！
“像这样”的属性，到底是像什么样？——这些值有一个共性，就是需要通过即时计算得到。因此浏览器为了获取这些值，也会进行回流。

* 动态添加多个样式
:class="[songCls(song.id), { border: index === playlist.length-1}]"

* window.open有什么弊端
window.open打开的网页可以通过window.opener属性获取到来源网站的window对象，或者通过document.referrer获取到来源网站的地址。所以在使用window.open时，可以把第三个参数设置为noopener=yes,noreferrer=yes。
