<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:25:03
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/JC.common/0.3/doc.tpl" */ ?>
<?php /*%%SmartyHeaderCode:637228795486c19cab0577-64285719%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e5670e2154c60f447988aade6ce3db116429b304' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/JC.common/0.3/doc.tpl',
      1 => 1418285661,
      2 => 'file',
    ),
    'c057e425a5495281e6b77508e07a842fd4d851da' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/base.tpl',
      1 => 1418371302,
      2 => 'file',
    ),
    'bd4e82ecb8f87973244496c7a4a85723f1f13630' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/base.tpl',
      1 => 1418282250,
      2 => 'file',
    ),
    '289a711da12b41818a9ed7aeaaf058ad0665160b' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_header.tpl',
      1 => 1418635460,
      2 => 'file',
    ),
    '0e1cce0a883adb5863158110b4b0457db775980e' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_header.tpl',
      1 => 1417500055,
      2 => 'file',
    ),
    '8a7b19e52bed8c537e8778026276ca6031ce66d2' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_main.tpl',
      1 => 1418635154,
      2 => 'file',
    ),
    'e04963f39d712974ffac9d9a9e43deec467808ff' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_footer.tpl',
      1 => 1417399569,
      2 => 'file',
    ),
    '5c1978c51a0a433b26e32e05ea27a55bc2685883' => 
    array (
      0 => '/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_footer.tpl',
      1 => 1417399569,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '637228795486c19cab0577-64285719',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.18',
  'unifunc' => 'content_5486c19cb9d941_41633700',
  'variables' => 
  array (
    'PROJECT_ROOT' => 0,
    'URL_ROOT' => 0,
    'SHOW_COMP_INFO' => 0,
    'COMP_URL' => 0,
    'VIEWER_URL' => 0,
    'COMP_ROOT' => 0,
    'NAME' => 0,
    'OUTPUT' => 0,
    'COMP_NAME' => 0,
    'COMP_VERSION' => 0,
    'TDEBUG' => 0,
    'TVERSION' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5486c19cb9d941_41633700')) {function content_5486c19cb9d941_41633700($_smarty_tpl) {?><!doctype html>
<html><?php echo $_smarty_tpl->getSubTemplate ("config.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
<?php echo $_smarty_tpl->getSubTemplate ("public/func.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>
<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <meta name="Keywords" content="JQueryComps,openjavascript,JC,JC2,jquery" />
        <meta name="Description" content="JQueryComps" />
	    <title>Jquey Comps</title>

        <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/button.css" />
	    <link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/common.css" />

        <script>
            window.TPATH = window.PROJECT_ROOT = "<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
";
            window.URL_ROOT = "<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
";

<?php if ((($tmp = @$_smarty_tpl->tpl_vars['SHOW_COMP_INFO']->value)===null||$tmp==='' ? '' : $tmp)) {?>
            window.COMP_URL = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['COMP_URL']->value)===null||$tmp==='' ? '' : $tmp);?>
";
            window.VIEWER_URL = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['VIEWER_URL']->value)===null||$tmp==='' ? '' : $tmp);?>
{0}";

            window.COMP_ROOT = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['COMP_ROOT']->value)===null||$tmp==='' ? '' : $tmp);?>
";

            window.NAME = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['NAME']->value)===null||$tmp==='' ? '' : $tmp);?>
";
            window.OUTPUT = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['OUTPUT']->value)===null||$tmp==='' ? '' : $tmp);?>
";

            window.COMP_NAME = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['COMP_NAME']->value)===null||$tmp==='' ? '' : $tmp);?>
";
            window.COMP_VERSION = "<?php echo (($tmp = @$_smarty_tpl->tpl_vars['COMP_VERSION']->value)===null||$tmp==='' ? '' : $tmp);?>
";
            <?php }?>

        </script>
		<script src="<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/lib.js"></script>
		<script src="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/js/config.js"></script>

        <script>
            JC.PATH = URL_ROOT;
            JC.debug = <?php echo (($tmp = @$_smarty_tpl->tpl_vars['TDEBUG']->value)===null||$tmp==='' ? 0 : $tmp);?>
;

            requirejs.config( {
                baseUrl: JC.PATH
                , urlArgs: 'v=<?php echo $_smarty_tpl->tpl_vars['TVERSION']->value;?>
'
                , paths: {
                    'common': TPATH + '/static/js/app/common'
                }
            });

        </script>
        
<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/index.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/detail.css" />
<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/css/codemirror.css" />
<style>
.cm-variable {
}
</style>
<script>
    <?php if (!(($tmp = @$_smarty_tpl->tpl_vars['compData']->value['nodemo'])===null||$tmp==='' ? '' : $tmp)) {?>
        window.DEMO_PATH = "<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/viewer.php?module=<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
&version=<?php echo $_smarty_tpl->tpl_vars['COMP_VERSION']->value;?>
&file=demo.tpl";
    <?php }?>
</script>


        

        
        
    </head>
    <body>
        <?php echo $_smarty_tpl->getSubTemplate ("public/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>

        
    <?php /*  Call merged included template "public/index/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/index/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '637228795486c19cab0577-64285719');
content_548ea8ef6347a7_79007939($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/index/body_header.tpl" */?>

        
    <?php /*  Call merged included template "public/doc/body_header.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/doc/body_header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '637228795486c19cab0577-64285719');
content_548ea8ef676cd2_32422558($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/doc/body_header.tpl" */?>


        
<div class="wrap">
    <?php /*  Call merged included template "public/doc/body_main.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/doc/body_main.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array('propertyAttr'=>1,'methodAttr'=>1), 0, '637228795486c19cab0577-64285719');
content_548ea8ef68a8f1_06833239($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/doc/body_main.tpl" */?>

    <!-- 外链形式 start -->
    <textarea class="detail-codetpl" type="text/template">
        <script src="<?php echo $_smarty_tpl->tpl_vars['URL_ROOT']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['COMP_VERSION']->value;?>
/<?php echo $_smarty_tpl->tpl_vars['OUTPUT']->value;?>
" />
    </textarea>
    <!-- 外链形式 end -->

    <!-- 模块加载 start -->
    <textarea class="detail-codetpl" type="text/template">
        <script>
            requirejs( [ '<?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
' ], function( <?php echo $_smarty_tpl->tpl_vars['NAME']->value;?>
 ){
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

</div>



        
              

        
    <?php /*  Call merged included template "public/doc/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/doc/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '637228795486c19cab0577-64285719');
content_548ea8ef6d9d55_07993805($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/doc/body_footer.tpl" */?>
    <?php /*  Call merged included template "public/index/body_footer.tpl" */
$_tpl_stack[] = $_smarty_tpl;
 $_smarty_tpl = $_smarty_tpl->setupInlineSubTemplate("public/index/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0, '637228795486c19cab0577-64285719');
content_548ea8ef6de746_27308317($_smarty_tpl);
$_smarty_tpl = array_pop($_tpl_stack); 
/*  End of included template "public/index/body_footer.tpl" */?>

        <?php echo $_smarty_tpl->getSubTemplate ("public/body_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, null, array(), 0);?>


         
        <?php if (isset($_GET['debug'])&&$_GET['debug']=='1') {?><?php $_smarty_tpl->smarty->loadPlugin('Smarty_Internal_Debug'); Smarty_Internal_Debug::display_debug($_smarty_tpl); ?><?php }?>
    </body>
</html>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:25:03
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_header.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548ea8ef6347a7_79007939')) {function content_548ea8ef6347a7_79007939($_smarty_tpl) {?><div class="header js_compAutoFixed" style="z-index: 1000;" data-normalClass="cafHeaderNav" data-fixedClass="cafHeaderNav">
    <div class="wrapper">
        <div class="header-nav clearfix">
            <h1 class="header-logo">
                <a href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
"><span>Jquery</span><lable class="cwhite">Comps</label></a>
                <i>|</i>
                <a class="header-github" hover="logohover" href="http://github.com/openjavascript/jquerycomps" target="_blank">
                    <img class="github-unhover" src="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/img/githubLogo.png" />
                    <img class="github-hover" src="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/img/githubLogo2.png" />
                </a>
            </h1>
            <ul id="menulist" class="header-menu">
                <?php  $_smarty_tpl->tpl_vars['value'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['value']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['compsList']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['value']->key => $_smarty_tpl->tpl_vars['value']->value) {
$_smarty_tpl->tpl_vars['value']->_loop = true;
?>
                <li hover="header-menuhover">
                    <?php echo $_smarty_tpl->tpl_vars['value']->value['name'];?>

                    <div class="header-submenu clearfix">
                        <?php if (isset($_smarty_tpl->tpl_vars['value']->value['data'])) {?>
                            <?php  $_smarty_tpl->tpl_vars['sitem'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['sitem']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['value']->value['data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['sitem']->key => $_smarty_tpl->tpl_vars['sitem']->value) {
$_smarty_tpl->tpl_vars['sitem']->_loop = true;
?>
                                <?php if (isset($_smarty_tpl->tpl_vars['sitem']->value['data'])) {?>
                                    <?php  $_smarty_tpl->tpl_vars['i'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['i']->value = count($_smarty_tpl->tpl_vars['sitem']->value['data'])-1;
  if ($_smarty_tpl->tpl_vars['i']->value>=0) { for ($_foo=true;$_smarty_tpl->tpl_vars['i']->value>=0; $_smarty_tpl->tpl_vars['i']->value--) {
?>
                                        
                                        <?php if (!(($tmp = @$_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['hide'])===null||$tmp==='' ? '' : $tmp)) {?>
                                            <?php if ($_smarty_tpl->tpl_vars['value']->value['name']!='Plugin') {?>
                                                <a class="header-complink" 
                                                data-version="<?php echo $_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['version'];?>
" 
                                                data-name="<?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
" 
                                                data-id="<?php echo md5(((string)$_smarty_tpl->tpl_vars['sitem']->value['name'])." ".((string)$_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['version']));?>
"
                                                target="_detail"
                                                href="<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/detail.php?module=<?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
&version=<?php echo $_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['version'];?>
&file=doc.tpl#btop"><?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
</a>
                                            <?php } else { ?>
                                                <a href="<?php echo $_smarty_tpl->tpl_vars['sitem']->value['data'][$_smarty_tpl->tpl_vars['i']->value]['outlink'];?>
" target="_blank"><?php echo $_smarty_tpl->tpl_vars['sitem']->value['name'];?>
</a>
                                            <?php }?>
                                            <?php break 1?>
                                        <?php }?>
                                    <?php }} ?>
                                <?php }?>
                            <?php } ?>
                        <?php }?>
                    </div>
                </li>
                <?php } ?>
                <?php if (isset($_smarty_tpl->tpl_vars['extraMenu']->value)) {?>
                    <?php  $_smarty_tpl->tpl_vars['value'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['value']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['extraMenu']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['value']->key => $_smarty_tpl->tpl_vars['value']->value) {
$_smarty_tpl->tpl_vars['value']->_loop = true;
?>
                    <li class="header-extramenu" hover="header-menuhover">
                        <a href="<?php echo $_smarty_tpl->tpl_vars['value']->value['url'];?>
" target="_blank" hover="header-menuhover">
                        <?php echo $_smarty_tpl->tpl_vars['value']->value['name'];?>

                        </a>
                    </li>
                    <?php } ?>
                <?php }?>
            </ul>
        </div>
    </div>
</div>
<?php if (!(($tmp = @$_COOKIE['hideheader'])===null||$tmp==='' ? '' : $tmp)) {?>
<div class="js_headarBar">
    <div class="flor-img" style=""></div>
    <button type="button" class="button black medium js_hideHeader">hide this</button>
</div>
<?php }?>

<a name="btop"></a>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:25:03
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_header.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548ea8ef676cd2_32422558')) {function content_548ea8ef676cd2_32422558($_smarty_tpl) {?><div id="compTitle">
    <h1 class="detail-title"><?php echo $_smarty_tpl->tpl_vars['COMP_NAME']->value;?>
</h1>
    <h2 class="detail-subtitle">
        <?php echo (($tmp = @$_smarty_tpl->tpl_vars['allVersionComps']->value['subtitle'])===null||$tmp==='' ? '' : $tmp);?>

<?php if ((($tmp = @$_smarty_tpl->tpl_vars['compData']->value['download'])===null||$tmp==='' ? '' : $tmp)) {?><a href="<?php echo $_smarty_tpl->tpl_vars['compData']->value['download'];?>
" target="_blank" class="detail-titlebtn">DOWN LOAD</a><?php }?>
<?php if ((($tmp = @$_smarty_tpl->tpl_vars['allVersionComps']->value['api'])===null||$tmp==='' ? '' : $tmp)) {?><a href="<?php echo $_smarty_tpl->tpl_vars['allVersionComps']->value['api'];?>
" target="_blank" class="detail-titlebtn">查看API</a><?php }?>
    </h2>
</div>

<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:25:03
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_main.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548ea8ef68a8f1_06833239')) {function content_548ea8ef68a8f1_06833239($_smarty_tpl) {?>
<div id="bodynav" class="body-nav js_compAutoFixed" data-fixedTopPx="<?php echo $_smarty_tpl->tpl_vars['TSIDETOP']->value;?>
"></div>

<div class="detail-attr">
    <h3 id="navmark-desc" class="detail-blockname ">组件简介</h3>
    <div class="detail-ct">
        <div class="detail-desc">
            <?php  $_smarty_tpl->tpl_vars['d'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['d']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['allVersionComps']->value['desc']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['d']->key => $_smarty_tpl->tpl_vars['d']->value) {
$_smarty_tpl->tpl_vars['d']->_loop = true;
?>
            <p class="desc"><?php echo $_smarty_tpl->tpl_vars['d']->value;?>
</p>
            <?php } ?>
        </div>
        <p class="desc"><?php echo (($tmp = @$_smarty_tpl->tpl_vars['compCustomDesc']->value)===null||$tmp==='' ? '' : $tmp);?>
</p>
    </div>
    <h3 id="navmark-use" class="detail-blockname" >使用说明</h3>
    <div class="detail-ct detail-use">
        <h4 id="navmark-version" class="detail-groupname ">历史版本 : </h4>
        <div class="detail-version">
            <?php  $_smarty_tpl->tpl_vars['comp'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['comp']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['allVersionComps']->value['data']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['comp']->key => $_smarty_tpl->tpl_vars['comp']->value) {
$_smarty_tpl->tpl_vars['comp']->_loop = true;
?>
                <?php if (!(($tmp = @$_smarty_tpl->tpl_vars['comp']->value['hide'])===null||$tmp==='' ? '' : $tmp)) {?>
                <a href="#" class="detail-versionlink <?php if ((($tmp = @$_smarty_tpl->tpl_vars['comp']->value['nowVersion'])===null||$tmp==='' ? '' : $tmp)) {?>detail-nowVersion<?php }?>" data-name="<?php echo $_smarty_tpl->tpl_vars['allVersionComps']->value['name'];?>
" data-version="<?php echo $_smarty_tpl->tpl_vars['comp']->value['version'];?>
">
                <?php echo $_smarty_tpl->tpl_vars['comp']->value['version'];?>

                </a>
                <?php }?>
            <?php } ?>
        </div>
        <h4 id="navmark-require" class="detail-groupname ">组件依赖 : </h4>
        <div class="detail-require">
            <p>
                <?php if (sizeof($_smarty_tpl->tpl_vars['requireComps']->value)>0) {?>
                    <?php  $_smarty_tpl->tpl_vars['comp'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['comp']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['requireComps']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['comp']->key => $_smarty_tpl->tpl_vars['comp']->value) {
$_smarty_tpl->tpl_vars['comp']->_loop = true;
?>
                    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['comp']->value['outlink'])===null||$tmp==='' ? '' : $tmp)) {?>
                        <a href="<?php echo (($tmp = @$_smarty_tpl->tpl_vars['comp']->value['outlink'])===null||$tmp==='' ? '' : $tmp);?>
" target="_blank" 
                            data-name="<?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>
"
                            >
                            <?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>

                        </a>
                    <?php } else { ?>
                        <?php if (!(($tmp = @$_smarty_tpl->tpl_vars['comp']->value['hide'])===null||$tmp==='' ? '' : $tmp)) {?>
                        <a href="#" class="detail-requirelink"
                            data-name="<?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>
"
                            >
                            <?php echo $_smarty_tpl->tpl_vars['comp']->value['name'];?>

                        </a>
                        <?php }?>
                    <?php }?>
                    <?php } ?>
                <?php } else { ?>
                    <em>无依赖</em>
                <?php }?>
            </p>
        </div>
        <h4 id="navmark-link" class="detail-groupname">外链形式 : </h4>
        <textArea class="detail-code">
        </textArea>
        <h4 id="navmark-load" class="detail-groupname">模块加载形式 : </h4>
        <textArea class="detail-code"></textArea>
    </div>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['constructorAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-constructor" class="detail-blockname">Constructor</h3>
    <div class="detail-ct detail-htmlattr">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['initAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-init" class="detail-blockname">Init</h3>
    <div class="detail-ct detail-htmlattr">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['htmlAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-htmlattr" class="detail-blockname">HTML Attributes</h3>
    <div class="detail-ct detail-htmlattr">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['propertyAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-properties" class="detail-blockname">Properties</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['methodAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <a name="methodAttr"></a>
    <h3 id="navmark-methods" class="detail-blockname">Methods</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['eventAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-events" class="detail-blockname">Events</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>

    <?php if ((($tmp = @$_smarty_tpl->tpl_vars['dataFormat']->value)===null||$tmp==='' ? '' : $tmp)||(($tmp = @$_smarty_tpl->tpl_vars['dataFormatAttr']->value)===null||$tmp==='' ? '' : $tmp)) {?>
    <h3 id="navmark-dataformat" class="detail-blockname">Data Format</h3>
    <div class="detail-ct detail-data">
        <textArea class="detail-code"></textArea>
    </div>
    <?php }?>
</div>
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:25:03
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/doc/body_footer.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548ea8ef6d9d55_07993805')) {function content_548ea8ef6d9d55_07993805($_smarty_tpl) {?>

    <script>
        requirejs( [ '<?php echo $_smarty_tpl->tpl_vars['PROJECT_ROOT']->value;?>
/static/js/app/doc.js' ] );
    </script>
 
<?php }} ?>
<?php /* Smarty version Smarty-3.1.18, created on 2014-12-15 17:25:03
         compiled from "/home/suches/udocs/website/git.me.btbtd.org/webroot/jc2_requirejs_dev/docs/docs-dev/tpl/public/index/body_footer.tpl" */ ?>
<?php if ($_valid && !is_callable('content_548ea8ef6de746_27308317')) {function content_548ea8ef6de746_27308317($_smarty_tpl) {?><div class="footer">
    <h2>友情链接：</h2>
    <p id="outlink" class="clearfix">
        <?php  $_smarty_tpl->tpl_vars['link'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['link']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['websiteLink']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['link']->key => $_smarty_tpl->tpl_vars['link']->value) {
$_smarty_tpl->tpl_vars['link']->_loop = true;
?>
        <a href="<?php echo $_smarty_tpl->tpl_vars['link']->value['url'];?>
" target="_blank"><?php echo $_smarty_tpl->tpl_vars['link']->value['name'];?>
</a>
        <?php } ?>
    </p>
</div>
<?php }} ?>
