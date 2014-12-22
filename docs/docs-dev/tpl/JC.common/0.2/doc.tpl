{{extends file="public/doc/base.tpl"}}

{{block name="html_header_css" append}}
{{/block}}

{{block name="body_main"}}
    {{include file="public/doc/body_main.tpl" propertyAttr=1 methodAttr=1 }}

    <!-- 外链形式 start -->
    <textarea class="detail-codetpl" type="text/template">
        <script src="{{$URL_ROOT}}/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}" />
    </textarea>
    <!-- 外链形式 end -->

    <!-- 模块加载 start -->
    <textarea class="detail-codetpl" type="text/template">
        <script>
            requirejs( [ '{{$COMP_NAME}}' ], function( {{$NAME}} ){
            });
        </script>
    </textarea>
    <!-- 模块加载 end -->
    <textarea class="detail-codetpl" type="text/template">
ZINDEX_COUNT Int static
    全局 css z-index 控制属性 
    注意: 这个变量是 window.ZINDEX_COUNT
    Default: 50001
    </textarea>

    <textarea class="detail-codetpl" type="text/template">
addUrlParams ( _url  _params ) static
    添加URL参数 
    require: delUrlParam, filterXSS
    Parameters:
        _url String
        _params Object
    Returns: string
    Example:
            var url = addUrlParams( location.href, {'key1': 'key1value', 'key2': 'key2value' } );


arrayId ( _ar ) static
    一维数组去重
    Parameters:
        _ar Array
    Returns: 
        Array

cloneDate ( _date ) Date static
    克隆日期对象
    Parameters:
        _date Date 需要克隆的日期
    Returns: 
        Date 

cloneObject ( _inObj ) static
    深度克隆对象
    Parameters:
        _inObj Object
    Returns: 
        Object

dateDetect ( _dateStr ) Date | Null static
    日期占位符识别功能
    Parameters:
        _dateStr String  如果起始字符为 NOW, 那么将视为当前日期 , 如果起始字符为 NOWFirst, 那么将视为当前月的1号
    Returns: 
        Date | Null
    Example:
            dateDetect( 'now' ); //2014-10-02
            dateDetect( 'now,3d' ); //2013-10-05
            dateDetect( 'now,-3d' ); //2013-09-29
            dateDetect( 'now,2w' ); //2013-10-16
            dateDetect( 'now,-2m' ); //2013-08-02
            dateDetect( 'now,4y' ); //2017-10-02
            dateDetect( 'now,1d,1w,1m,1y' ); //2014-11-10

dateFormat ( _date  _format ) static
    日期格式化 (具体格式请查看 PHP Date Formats)
    Parameters:
        _date Date default = now
        _format String default = "YY-MM-DD"
    Returns: string

delUrlParam ( _url  _key ) static
    删除URL参数 
    require: filterXSS
    Parameters:
        _url String
        _key String
    Returns:
        string
    Example:
           var url = delUrlParam( location.href, 'tag' );

delUrlParams ( _url  _keys ) static
    批量删除URL参数 
    require: delUrlParam
    Parameters:
        _url String
        _keys Array
    Returns: 
        string
    Example:
           var url = delUrlParam( location.href, [ 'k1', 'k2' ] );

docSize ( _doc ) static
    获取 document 的 相关大小
    Parameters:
        _doc Document
    Returns:
        Object

easyEffect ( _cb  _maxVal  _startVal  _duration  _stepMs ) static
    缓动函数, 动画效果为按时间缓动 
        这个函数只考虑递增, 你如果需要递减的话, 在回调里用 _maxVal - _stepval
    Parameters:
        _cb Function
    缓动运动时的回调
    _maxVal Number
        缓动的最大值, default = 200
    _startVal Number
        缓动的起始值, default = 0
    _duration Number
        缓动的总时间, 单位毫秒, default = 200
    _stepMs Number
        缓动的间隔, 单位毫秒, default = 2
    Returns:
        interval
    Example:
           $(document).ready(function(){
               window.js_output = $('span.js_output');
               window.ls = [];
               window.EFF_INTERVAL = easyEffect( effectcallback, 100);
           });
           function effectcallback( _stepval, _done ){
               js_output.html( _stepval );
               ls.push( _stepval );
               !_done && js_output.html( _stepval );
               _done && js_output.html( _stepval + '<br />' + ls.join() );
           }

encoder ( _selector ) Encode function static
    URL 请求时, 获取对URL参数进行编码的函数
    Parameters:
        _selector Selector
    Returns:
        Encode function:
    default encodeURIComponent

extendObject ( _source  _new  _overwrite ) static
    扩展对象属性
    Parameters:
        _source Object
        _new Object
        _overwrite Bool
            是否覆盖已有属性, default = true

    Returns:
        object

filterXSS ( _s ) static
    xss 过滤函数
    Parameters:
        _s String
    Returns:
        string

formatISODate ( _date  _split ) static
    格式化日期为 YYYY-mm-dd 格式 
    require: pad_char_f
    Parameters:
        _date Date
            要格式化日期的日期对象
        _split String | Undefined
            定义年月日的分隔符, 默认为 '-'
    Returns:
        string

funcName ( _func ) static
    取函数名 ( 匿名函数返回空 )
    Parameters:
        _func Function
    Returns:
        string

getJqParent ( _selector  _filter ) static
    获取 selector 的指定父级标签
    Parameters:
        _selector Selector
        _filter Selector
    Returns:
        selector

getUrlParam ( _url  _key ) static
    取URL参数的值 
    require: filterXSS
    Parameters:
        _url String
        _key String
    Returns:
        string
    Example:
           var defaultTag = getUrlParam(location.href, 'tag');  

getUrlParams ( _url  _key ) static
    取URL参数的值, 这个方法返回数组 
        与 getUrlParam 的区别是可以获取 checkbox 的所有值 
    require: filterXSS
    Parameters:
        _url String
        _key String
    Returns:
        Array
    Example:
           var params = getUrlParams(location.href, 'tag');  

hasUrlParam ( _url  _key ) static
    判断URL中是否有某个get参数
    Parameters:
        _url String
        _key String
    Returns:
        bool
    Example:
            var bool = hasUrlParam( 'getkey' );

httpRequire ( _msg ) static
    提示需要 HTTP 环境
    Parameters:
        _msg String
            要提示的文字, 默认 "本示例需要HTTP环境'
    Returns:
        bool 如果是HTTP环境返回true, 否则返回false

isSameDay ( _d1  _d2 ) Bool static
    判断两个日期是否为同一天
    Parameters:
        _d1 Date
            需要判断的日期1
        _d2 Date
            需要判断的日期2
    Returns:
        Bool

isSameMonth ( _d1  _d2 ) Bool static
    判断两个日期是否为同一月份
    Parameters:
        _d1 Date
            需要判断的日期1
        _d2 Date
            需要判断的日期2
    Returns:
        Bool

isSameSeason ( _d1  _d2 ) Bool static
    判断两个日期是否为同一季度
    Parameters:
        _d1 Date
            需要判断的日期1
        _d2 Date
            需要判断的日期2
    Returns:
        Bool

isSameWeek ( _d1  _d2 ) Bool static
    判断两个日期是否为同一季度
    Parameters:
        _d1 Date
            需要判断的日期1
        _d2 Date
            需要判断的日期2
    Returns:
        Bool

isSameYear ( _d1  _d2 ) Bool static
    判断两个日期是否为同一年
    Parameters:
        _d1 Date
            需要判断的日期1
        _d2 Date
            需要判断的日期2
    Returns:
        Bool

jcAutoInitComps ( _selector ) static
    动态添加内容时, 初始化可识别的组件
    目前会自动识别的组件
        Bizs.CommonModify, JC.Panel, JC.Dialog 
    自动识别的组件不用显式调用 jcAutoInitComps 去识别可识别的组件
    可识别的组件
        JC.AutoSelect, JC.AutoChecked, JC.AjaxUpload, JC.Calendar , JC.Drag, JC.DCalendar, JC.Placeholder, JC.TableFreeze, JC.ImageCutter, JC.Tab 
        Bizs.DisableLogic, Bizs.FormLogic, Bizs.MoneyTips, Bizs.AutoSelectComplete
    Parameters:
        _selector Selector

maxDayOfMonth ( _date ) Int static
    取得一个月份中最大的一天
    Parameters:
        _date Date
    Returns:
        Int 月份中最大的一天

moneyFormat ( _number  _len  _floatLen  _splitSymbol ) static
    逗号格式化金额
    Parameters:
        _number Int | String
        _len Int
        _floatLen Int
        _splitSymbol Int
    Returns:
        string

mousewheelEvent ( _cb  _detach  _selector ) static
    绑定或清除 mousewheel 事件
    Parameters:
        _cb Function
        _detach Bool
        _selector Selector
            default = document

padChar ( _str  _len  _char ) static
    js 附加字串函数
    Parameters:
        _str String
        _len Intl
        _char String
    Returns:
        string

parentSelector ( _item  _selector  _finder ) static
    扩展 jquery 选择器 
    扩展起始字符的 '/' 符号为 jquery 父节点选择器 
    扩展起始字符的 '|' 符号为 jquery 子节点选择器 
    扩展起始字符的 '(' 符号为 jquery 父节点查找识别符( getJqParent )
    Parameters:
        _item Selector
        _selector String
        _finder Selector
    Returns:
        selector

parseBool ( _input ) static
    把输入值转换为布尔值
    Parameters:
        _input 
    Returns:
        bool

parseDate ( _date  _selector  _forceISO ) Date | Null static
    从日期字符串解析日期对象 
    兼容 JC.Calendar 日期格式
    Parameters:
        _date Date
        _selector Selector
            如果 _selector 为真, 则尝试从 _selector 的 html 属性 dateParse 对日期进行格式化
        _forceISO Boolean
            是否强制转换为ISO日期
    Returns:
        Date | Null

parseFinance ( _i  _dot ) static
    取小数点的N位 
    JS 解析 浮点数的时候，经常出现各种不可预知情况，这个函数就是为了解决这个问题
    Parameters:
        _i Number
        _dot Int
            default = 2
    Returns:
        number

parseISODate ( _datestr ) static
    从 ISODate 字符串解析日期对象
    Parameters:
        _datestr String
    Returns:
        date

printf ( _str ) static
    按格式输出字符串
    Parameters:
        _str String
    Returns:
        string
    Example:
            printf( 'asdfasdf{0}sdfasdf{1}', '000', 1111 );
            //return asdfasdf000sdfasdf1111

printKey ( _str  _keys ) static
    按格式输出字符串
    Parameters:
        _str String
        _keys Object
    Returns:
        string
    Example:
             JC.f.printKey( 'asdfasdf{key1}sdfasdf{key2},{0}', { 'key1': '000', 'key2': 1111, '0': 222 );
             //return asdfasdf000sdfasdf1111,222

pureDate ( _d ) 
    获取不带 时分秒的 日期对象
    Parameters:
        _d Date
            可选参数, 如果为空 = new Date
    Returns:
        Date

relativePath ( _path  _url ) static
    把 URL 相对路径 转换为 绝对路径
    Parameters:
        _path String
        _url String
    Returns:
        string

reloadPage ( _url  _nornd  _delayms ) static
    重载页面 
    require: removeUrlSharp, addUrlParams, filterXSS
    Parameters:
        _url String
        _nornd Bool
        _delayms Int

removeUrlSharp ( _url  _nornd  _rndName ) static
    删除 URL 的锚点 
    require: addUrlParams, filterXSS
    Parameters:
        _url String
        _nornd Bool
            是否不添加随机参数
        _rndName String
    Returns:
        string

safeTimeout ( _timeout  _obj  _name  _ms ) static
    timeout 控制逻辑, 避免相同功能的 setTimeout 重复执行
    Parameters:
        _timeout Timeout | Function
        _obj Object
            default = window.TIMEOUT_HOST || {}
        _name String
            default = 'NORMAL'
        _ms Int
            default = 50
    Returns:
        object

scriptContent ( _selector ) static
    获取脚本模板的内容
    Parameters:
        _selector Selector
    Returns:
        string

scriptPath () String static
    取当前脚本标签的 src路径
    Returns:
        String
            脚本所在目录的完整路径

seasonOfYear ( _year ) static
    取一年中所有的季度, 及其开始结束日期
    Parameters:
        _year Int
    Returns:
        Array

sliceArgs ( args ) static
    把函数的参数转为数组
    Parameters:
        args Arguments
    Returns:
        Array

urlDetect ( _url ) static
    URL 占位符识别功能 
    require: addUrlParams, filterXSS
    Parameters:
        _url String
        如果 起始字符为 URL, 那么 URL 将祝为本页的URL
    Returns:
        string
    Example:
        urlDetect( '?test' ); //output: ?test
        urlDetect( 'URL,a=1&b=2' ); //output: your.com?a=1&b=2
        urlDetect( 'URL,a=1,b=2' ); //output: your.com?a=1&b=2
        urlDetect( 'URLa=1&b=2' ); //output: your.com?a=1&b=2

urlHostName ( _url ) static
    取 URL 的 host name
    Parameters:
        _url String
    Returns:
        string

weekOfYear ( _year  _dayOffset ) static
    取一年中所有的星期, 及其开始结束日期
    Parameters:
        _year Int
        _dayOffset Int
            每周的默认开始为周几, 默认0(周一)
    Returns:
        Array

winSize ( _win, ) static
    获取 window 的 相关大小
    Parameters:
        _win Window
            default = window
    Returns:
        Object
    </textarea>

{{/block}}

{{block name="body_footer_js" append}}
{{/block}}
