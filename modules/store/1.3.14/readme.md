## 使用说明

store.js 提供了一套跨浏览器的本地存储解决方案。


store.js 优先选择 localStorage 来进行存储，在 IE6 和 IE7 下降级使用userData来达到目的，整个过程中没有使用cookie和flash。


store.js 使用 JSON 来序列化存储数据。

### 外链形式

```html
<script src="{{src}}"></script>

<script>
	store.set('test', 1);
	console.log(store.get('test'));
</script>
```

### 模块加载形式

```html
<script>
    require(['{{module}}'], function(store) {
    	store.set('test', 1);
		console.log(store.get('test'));
    });
</script>
```

### node.js 中的使用

node.js中可以像下面这样使用：

```js
global.localStorage = require('localStorage')
var store = require('./store');
store.set('foo', 1);
console.log(store.get('foo'));
```

## 文档参考

### `store.enabled` flag

使用 store.js 前最好先检查下 `store.enabled` 标识：

```html
<script>
	init();
	function init() {
		if (!store.enabled) {
			alert('Local storage is not supported by your browser. Please disabled "Private Mode", or upgrade to a modern browser');
			return;
		}
		var user = store.get('user');
		// ... and so on ...
	}
</script>
```

这是因为在使用localStorage时，虽然可用但是程序会抛出一个错误。例如在使用 Safari的private browsing 模式（无痕浏览模式）的时候就会发生这样的情况。 
而其他浏览器允许用户临时禁止localStorage的使用。 
Store.js 会检测这些设置并相应的更改 `store.enabled` 标识，所以使用前最好先检查下这个标示。

### 基本用法

```js
// 将 'marcus' 存为 'username'
store.set('username', 'marcus')

// 获取 'username'
store.get('username')

// 删除 'username'
store.remove('username')

// 清空所有索引
store.clear()

// 存储对象字面量 - store.js 内部使用了 JSON.stringify方法
store.set('user', { name: 'marcus', likes: 'javascript' })

// 获取存储的对象 - store.js 内部使用了 JSON.parse 方法
var user = store.get('user')
alert(user.name + ' likes ' + user.likes)

// 获取所有存储的值
store.getAll().user.name == 'marcus'

// 遍历所有存储的值
store.forEach(function(val, key) {
	console.log(key, '==', val)
})
```

---

## 其他一些相关提示内容

### 常见问题

1.使用userData的时候请注意，store.js是通过favicon.ico来达到共享数据的目的（store.js代码69行注释说明），原文中强调即使返回404状态码也可以正常使用程序功能，但是返回其他状态码时会导致程序报错。本站一开始favicon.ico返回的时302状态码，导致页面在ie6下程序报错而无法执行，添加favicon.ico后，程序正常执行。

### 序列化时需注意

如果不使用store.js，那么使用localStorage的时候，被存储的每个值上都调用了一次toString方法。这就是说，你不能方便的对numbers、 objects 或者 arrays进行存取：

```js
localStorage.myage = 24
localStorage.myage !== 24
localStorage.myage === '24'

localStorage.user = { name: 'marcus', likes: 'javascript' }
localStorage.user === "[object Object]"

localStorage.tags = ['javascript', 'localStorage', 'store.js']
localStorage.tags.length === 32
localStorage.tags === "javascript,localStorage,store.js"
```

我们想要的效果 (通过 store.js可以实现) 是

```js
store.set('myage', 24)
store.get('myage') === 24

store.set('user', { name: 'marcus', likes: 'javascript' })
alert("Hi my name is " + store.get('user').name + "!")

store.set('tags', ['javascript', 'localStorage', 'store.js'])
alert("We've got " + store.get('tags').length + " tags here")
```

JSON是JavaScript的原生序列化引擎。但是在使用store.js的时候，你不需要自己去对值进行序列化或反序列化，在每次调用 store.set() 和 store.get()的时候，store.js已经分别通过JSON.stringify() 和 JSON.parse() 实现了相同的效果。

一些浏览器并不支持原生的 JSON。所以，你需要同时引入 [JSON.js]。

### 存储大小限制

 - IE6 和 IE7中: 总大小最多1MB ， 但是每个 "path" 或 "document" 最多128kb(参考 http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx)。
 - 去这里 http://dev-test.nemikor.com/web-storage/support-test/ 可以查看不同浏览器的限制情况。
 
### 支持的浏览器

 - Tested in iOS 4
 - Tested in iOS 5
 - Tested in iOS 6
 - Tested in Firefox 3.5
 - Tested in Firefox 3.6
 - Tested in Firefox 4.0+
 - Support dropped for Firefox < 3.5 (注意下文提示)
 - Tested in Chrome 5
 - Tested in Chrome 6
 - Tested in Chrome 7
 - Tested in Chrome 8
 - Tested in Chrome 10
 - Tested in Chrome 11+
 - Tested in Safari 4
 - Tested in Safari 5
 - Tested in IE6
 - Tested in IE7
 - Tested in IE8
 - Tested in IE9
 - Tested in IE10
 - Tested in Opera 10
 - Tested in Opera 11
 - Tested in Opera 12
 - Tested in Node.js v0.10.4 (with https://github.com/coolaj86/node-localStorage 1.0.2)

*个人模式* Store.js 在浏览器开启了private mode模式（无痕浏览）的情况下可能会失效。 这就需要在使用  store.js前一定要检查 `store.enabled` 标识。

*Firefox 3.0 & 2.0:* 高于v1.3.6版本的不再支持 FF 2 & 3 。 所以，如果你想要支持FF的古老版本，那你需要使用 v1.3.5 版本的 store.js。

*重要提示：* 在IE6和IE7中，如果你要存储键值对，那么很多特殊字符是不允许出现在关键字名称中的。  在[@mferretti](https://github.com/mferretti)，提供了一种合适的变通方法，就是把这些特殊字符替换为t "___"。



### 不支持的浏览器

 - Firefox 1.0: 不支持 (除非是 cookies 和 flash)
 - Safari 2: 不支持 (除非是 cookies 和 flash)
 - Safari 3: 没有同步的 api (有异步的 sqlite api，但是 store.js 是同步的)
 - Opera 9: 不清楚是否有同步的api来进行本地存储 
 - Firefox 1.5: 不清楚是否有同步的api来进行本地存储 







  [JSON.js]: http://www.json.org/json2.js
  [store.min.js]: https://raw.github.com/marcuswestin/store.js/master/store.min.js
  [store+json2.min.js]: https://raw.github.com/marcuswestin/store.js/master/store+json2.min.js
