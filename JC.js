;(function( $ ){
    if( window.JC && typeof JC.PATH != 'undefined' ) return;
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
        , bizsDir: '/bizs/'
        , pluginsDir: '/plugins/'
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
                //
                /// in libpath/_demo/
                //
                JC.use(
                    [
                        'Panel'                     //  ../comps/Panel/Panel.js
                        , 'Tips'                    //  ../comps/Tips/Tips.js
                        , 'Valid'                   //  ../comps/Valid/Valid.js
                        , 'Bizs.KillISPCache'       //  ../bizs/KillISPCache/KillISPCache.js
                        , 'bizs.TestBizFile'        //  ../bizs/TestBizFile.js
                        , 'comps.TestCompFile'      //  ../comps/TestCompFile.js 
                        , 'Plugins.rate'            //  ../plugins/rate/rate.js
                        , 'plugins.json2'           //  ../plugins/json2.js
                        , '/js/fullpathtest.js'     //  /js/fullpathtest.js
                    ].join()
                );
        */ 
        , use: function( _items ){
                if( ! _items ) return;
                var _p = this
                    , _paths = []
                    , _parts = $.trim( _items ).split(/[\s]*?,[\s]*/)
                    , _urlRe = /\:\/\//
                    , _pathRplRe = /(\\)\1|(\/)\2/g
                    , _compRe = /[\/\\]/
                    , _compFileRe = /^comps\./
                    , _bizCompRe = /^Bizs\./
                    , _bizFileRe = /^bizs\./
                    , _pluginCompRe = /^Plugins\./
                    , _pluginFileRe = /^plugins\./
                    ;

                _parts = JC._usePatch( _parts, 'Form', 'AutoSelect' );

                $.each( _parts, function( _ix, _part ){
                    var _isComps = !_compRe.test( _part )
                        , _path
                        , _isFullpath = /^\//.test( _part )
                        ;

                    if( _isComps && window.JC[ _part ] ) return;

                    if( JC.FILE_MAP && JC.FILE_MAP[ _part ] ){
                        _paths.push( JC.FILE_MAP[ _part ] );
                        return;
                    }

                    _path = _part;
                    if( _isComps ){
                        if( _bizCompRe.test( _path ) ){//业务组件
                            _path = printf( '{0}{1}{2}/{2}.js', JC.PATH, JC.bizsDir, _part.replace( _bizCompRe, '' ) );
                        }else if( _bizFileRe.test( _path ) ){//业务文件
                            _path = printf( '{0}{1}{2}.js', JC.PATH, JC.bizsDir, _part.replace( _bizFileRe, '' ) );
                        }else if( _pluginCompRe.test( _path ) ){//插件组件
                            _path = printf( '{0}{1}{2}/{2}.js', JC.PATH, JC.pluginsDir, _part.replace( _pluginCompRe, '' ) );
                        }else if( _pluginFileRe.test( _path ) ){//插件文件
                            _path = printf( '{0}{1}{2}.js', JC.PATH, JC.pluginsDir, _part.replace( _pluginFileRe, '' ) );
                        }else if( _compFileRe.test( _path ) ){//组件文件
                            _path = printf( '{0}{1}{2}.js', JC.PATH, JC.compsDir, _part.replace( _compFileRe, '' ) );
                        }else{//组件
                            _path = printf( '{0}{1}{2}/{2}.js', JC.PATH, JC.compsDir, _part );
                        }
                    }
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
         * 调用依赖的类
         * <br />这个方法的存在是因为有一些类调整了结构, 但是原有的引用因为向后兼容的需要, 暂时不能去掉
         * @method  _usePatch
         * @param   {array}     _items
         * @param   {string}    _fromClass
         * @param   {string}    _patchClass
         * @private
         * @static
         */
        , _usePatch:
            function( _items, _fromClass, _patchClass ){
                var i, j, k, l, _find;
                for( i = 0, j = _items.length; i < j; i++ ){
                    if( ( $.trim( _items[i].toString() ) == _fromClass ) ){
                        _find = true;
                        break;
                    }
                }
                _find && !JC[ _patchClass ] && _items.unshift( _patchClass );
                return _items;
            }
       /**
        * 输出调试信息, 可通过 JC.debug 指定是否显示调试信息
        * @param    {[string[,string]]}  任意参数任意长度的字符串内容
        * @method log
        * @static
        */
       , log: function(){ JC.debug && window.console && console.log( sliceArgs( arguments ).join(' ') ); }
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
     * 自动识别组件库所在路径
     */
    JC.PATH = script_path_f();
    //dev开发时因为脚本没合并, IE找不到库的正确路径, 这个判断仅针对dev开发分支
    /\/JQueryComps_dev/i.test( location.href ) && ( JC.PATH = '/ignore/JQueryComps_dev/' );
    /**
     * <h2>业务逻辑命名空间</h2>
     * <br />这个命名空间的组件主要为满足业务需求, 不是通用组件~
     * <br />但在某个项目中应该是常用组件~
     * <dl>
     *      <dt>业务组件的存放位置:</dt>
     *      <dd>libpath/bizs/</dd>
     *
     *      <dt>使用业务组件</dt>
     *      <dd> JC.use( 'Bizs.BizComps' ); //  libpath/bizs/BizComps/BizComps.js </dd>
     *
     *      <dt>使用业务文件</dt>
     *      <dd> JC.use( 'bizs.BizFile' ); //   libpath/bizs/BizFile.js </dd>
     * </dl>
     * @namespace   window
     * @class       Bizs
     * @static
     */
    window.Bizs = window.Bizs || {};
}(jQuery));

