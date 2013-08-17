;(function( $ ){
    if( window.JC && window.JC.PATH != 'undefined' ) return;
    /**
     * JC jquery 组件库 资源调用控制类
     * <br />这是一个单例模式, 全局访问使用 JC 或 window.JC
     * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/window.JC.html' target='_blank'>API docs</a>
     * | <a href='../../_demo' target='_blank'>demo link</a></p>
     * @class JC
     * @namespace   window
     * @static
     * @example 
     *      JC.use( 组件名[,组件名] );
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-08-04
     */
    window.JC = {
        /**
         * JC组件库所在路径
         * @property    PATH
         * @static
         * @type {string}
         */
        PATH: '/js'
        , compsDir: '/comps/'
        /**
         * 是否显示调试信息
         * @property    debug
         * @static
         * @type {bool}
         */
        , debug: false
       /**
        * 导入JC组件
        * @method   use
        * @static
        * @param    {string}    _names -            模块名
        *                                           或者模块下面的某个js文件(test/test1.js, 路径前面不带"/"将视为test模块下的test1.js)
        *                                           或者一个绝对路径的js文件, 路径前面带 "/"
        *
        * @param    {string}    _basePath -         指定要导入资源所在的主目录, 这个主要应用于 nginx 路径输出
        * @param    {bool}      _enableNginxStyle -       指定是否需要使用 nginx 路径输出脚本资源
        *
        * @example
                JC.use( 'SomeClass' );                              //导入类 SomeClass
                JC.use( 'SomeClass, AnotherClass' );                //导入类 SomeClass, AnotherClass
                //
                ///  导入类 SomeClass, SomeClass目录下的file1.js, 
                ///  AnotherClass, AnotherClass 下的file2.js
                //
                JC.use( 'SomeClass, comps/SomeClass/file1.js, comps/AnotherClass/file2.js' );   
                JC.use( 'SomeClass, plugins/swfobject.js., plugins/json2.js' );   
                JC.use( '/js/Test/Test1.js' );     //导入文件  /js/Test/Test1.js, 如果起始处为 "/", 将视为文件的绝对路径
                //
                /// 导入 URL 资源 // JC.use( 'http://test.com/file1.js', 'https://another.com/file2.js' ); 
        */ 
        , use: function( _items ){
                if( ! _items ) return;
                var _p = this, _paths = [], _parts = $.trim( _items ).split(/[\s]*?,[\s]*/)
                   , _pathRe = /[\/\\]/, _urlRe = /\:\/\//, _pathRplRe = /(\\)\1|(\/)\2/g;

                $.each( _parts, function( _ix, _part ){
                    var _isComps = !_pathRe.test( _part ), _path, _isFullpath = /^\//.test( _part );
                    if( _isComps && window.JC[ _part ] ) return;

                    if( JC.FILE_MAP && JC.FILE_MAP[ _part ] ){
                        _paths.push( JC.FILE_MAP[ _part ] );
                        return;
                    }

                    _path = _part;
                    _isComps && ( _path = printf( '{0}{1}{2}/{2}.js', JC.PATH, JC.compsDir, _part ) );
                    !_isComps && !_isFullpath && ( _path = printf( '{0}/{1}', JC.PATH, _part ) );

                    if( /\:\/\//.test( _path ) ){
                        _path = _path.split('://');
                        _path[1] = $.trim( _path[1].replace( _pathRplRe, '$1$2' ) );
                        _path = _path.join('://');
                    }else{
                        _path = $.trim( _path.replace( _pathRplRe, '$1$2' ) );
                    }

                    if( JC._USE_CACHE[ _path ] ) return;
                        JC._USE_CACHE[ _path ] = 1;
                    _paths.push( _path );
                });

                JC.log( _paths );

                !JC.enableNginxStyle && JC._writeNormalScript( _paths );
                JC.enableNginxStyle && JC._writeNginxScript( _paths );
            }
       /**
        * 输出调试信息, 可通过 JC.debug 指定是否显示调试信息
        * @param    {[string[,string]]}  任意参数任意长度的字符串内容
        * @method log
        * @static
        */
       , log: 
           function(){
                if( !this.debug ) return;
                console.log( [].slice.apply( arguments ).join(' ') );
            }
       /**
        * 定义输出路径的 v 参数, 以便控制缓存
        * @property     pathPostfix
        * @type     string
        * @default  empty
        * @static
        */
       , pathPostfix: ''
       /**
        * 是否启用nginx concat 模块的路径格式  
        * @property     enableNginxStyle
        * @type bool
        * @default  false
        * @static
        */
       , enableNginxStyle: false
       /**
        * 定义 nginx style 的基础路径
        * <br /><b>注意:</b> 如果这个属性为空, 即使 enableNginxStyle = true, 也是直接输出默认路径 
        * @property     nginxBasePath
        * @type string
        * @default  empty
        * @static
        */
       , nginxBasePath: ''
       /**
        * 资源路径映射对象
        * <br />设置 JC.use 逗号(',') 分隔项的 对应URL路径
        * @property FILE_MAP
        * @type object
        * @default null
        * @static
        * @example
                以下例子假定 libpath = http://git.me.btbtd.org/ignore/JQueryComps_dev/
                <script>
                    JC.FILE_MAP = {
                        'Calendar': 'http://jc.openjavascript.org/comps/Calendar/Calendar.js'
                        , 'Form': 'http://jc.openjavascript.org/comps/Form/Form.js'
                        , 'LunarCalendar': 'http://jc.openjavascript.org/comps/LunarCalendar/LunarCalendar.js'
                        , 'Panel': 'http://jc.openjavascript.org/comps/Panel/Panel.js' 
                        , 'Tab': 'http://jc.openjavascript.org/comps/Tab/Tab.js'
                        , 'Tips': 'http://jc.openjavascript.org/comps/Tips/Tips.js' 
                        , 'Tree': 'http://jc.openjavascript.org/comps/Tree/Tree.js'
                        , 'Valid': 'http://jc.openjavascript.org/comps/Valid/Valid.js'
                        , 'plugins/jquery.form.js': 'http://jc.openjavascript.org/plugins/jquery.form.js'
                        , 'plugins/json2.js': 'http://jc.openjavascript.org/plugins/json2.js'
                    };

                    JC.use( 'Panel, Tips, Valid, plugins/jquery.form.js' );

                    $(document).ready(function(){
                        //JC.Dialog( 'JC.use example', 'test issue' );
                    });
                </script>

                output should be:
                    http://git.me.btbtd.org/ignore/JQueryComps_dev/lib.js
                    http://jc.openjavascript.org/comps/Panel/Panel.js
                    http://jc.openjavascript.org/comps/Tips/Tips.js
                    http://jc.openjavascript.org/comps/Valid/Valid.js
                    http://jc.openjavascript.org/plugins/jquery.form.js
        */
       , FILE_MAP: null
       /**
        * 输出 nginx concat 模块的脚本路径格式
        * @method   _writeNginxScript
        * @param    {array} _paths
        * @private
        * @static
        */
       , _writeNginxScript:
            function( _paths ){
                if( !JC.enableNginxStyle ) return;
                for( var i = 0, j = _paths.length, _ngpath = [], _npath = []; i < j; i++ ){
                    JC.log( _paths[i].slice( 0, JC.nginxBasePath.length ).toLowerCase(), JC.nginxBasePath.toLowerCase() );
                    if(  
                         _paths[i].slice( 0, JC.nginxBasePath.length ).toLowerCase() 
                        == JC.nginxBasePath.toLowerCase() )
                    {
                        _ngpath.push( _paths[i].slice( JC.nginxBasePath.length ) );
                    }else{
                        _npath.push( _paths[i] );
                    }
                }

                var _postfix = JC.pathPostfix ? '?v=' + JC.pathPostfix : '';

                _ngpath.length && document.write( printf( '<script src="{0}??{1}{2}"><\/script>'
                                                    , JC.nginxBasePath, _ngpath.join(','), _postfix ) );
                _npath.length && JC._writeNormalScript( _npath );
            }
       /**
        * 输出的脚本路径格式
        * @method   _writeNormalScript
        * @param    {array} _paths
        * @private
        * @static
        */
       , _writeNormalScript:
            function( _paths ){
                var _postfix = JC.pathPostfix ? '?v=' + JC.pathPostfix : '';
                for( var i = 0, j = _paths.length, _path; i < j; i++ ){
                    _path = _paths[i];
                    JC.pathPostfix && ( _path = add_url_params( _path, { 'v': JC.pathPostfix } ) );
                    _paths[i] = printf( '<script src="{0}"><\/script>', _path );
                }
                _paths.length && document.write( _paths.join('') );
            }
       /**
        * 保存 use 过的资源路径, 以便进行唯一性判断, 避免重复加载
        * @property     _USE_CACHE
        * @type     object
        * @default  {}
        * @private
        * @static
        */
       , _USE_CACHE: {}
    };
    /**
     * UXC 是 JC 的别名
     * <br />存在这个变量是为了向后兼容
     * <br />20130804 之前的命名空间是 UXC, 这个命名空间在一段时间后将会清除, 请使用 JC 命名空间
     * <p><b>see</b>: <a href='window.JC.html'>JC</a></p>
     * @class UXC
     * @namespace   window
     * @static
     * @date    2013-05-22
     */
    window.UXC = window.JC;
    /**
     * 如果 console 不可用, 则生成一个模拟的 console 对象
     */
    if( !window.console ) window.console = { log:function(){
        window.status = [].slice.apply( arguments ).join(' ');
    }};
    /**
     * 自动识别组件库所在路径
     */
    JC.PATH = script_path_f();
}(jQuery));

