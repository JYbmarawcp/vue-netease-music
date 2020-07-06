### Bug Fixes

* vue 为编写插件提供了一个 install(Vue, Option) 方法，该方法为 vue 添加全局功能；
该方法有两个参数，第一个是 Vue构造器，第二个是可选的参数

* require.context是Webpack中用来管理依赖的一个函数,此方法会生成一个上下文模块,包含目录下所有模块的引用,通过正则表达式匹配,然后require进来
require.context('.', false, /\.vue$/)
参数一:要查询的目录,上述代码指的是当前目录
参数二:是否要查询子孙目录,方法默认的值为false
参数三:要匹配的文件的后缀,是一个正则表达式,上述我要查询的是.vue文件)
正则表达匹配中是有区分大小写的，i 就是说明不区分大小写

* 在flex容器中，当空间不够的时候，flex-shrink不为0的元素会被压缩，所以解决的方法就是给图片设置：flex-shrink:0。

* 为了防止组件多个实例之间共享属性，所以需要通过工厂函数来获取值
数组
data: {
    default: () => []
} 
 
对象
data: {
    default: () => ({})
}

* vm.$slots
用来访问被插槽分发的内容。每个具名插槽有其相应的 property (例如：v-slot:foo 中的内容将会在 vm.$slots.foo 中被找到)。default property 包括了所有没有被包含在具名插槽中的节点，或 v-slot:default 的内容。

* substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。

* number | 0可以向下取整(先将数值转换成32位二进制整数值（如果有小数则忽略)