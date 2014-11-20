;(function(define, _win) { 'use strict'; define( [], function(){
    window.JWIN = window.JWIN || $( window );
    window.JDOC = window.JDOC || $( document );
    /**
     * 如果 console 不可用, 生成一个模拟的 console 对象
     */
    !window.console && ( window.console = { 
        log: function(){ window.status = sliceArgs( arguments ).join(' '); }
    });
    !console.dir && (
        console.dir = function(){}
    );
    !console.error && (
        console.error = function(){}
    );
    /**
     * 声明主要命名空间, 方便迁移
     */
    window.JC = window.JC || {};
    JC.log = function(){ JC.debug && console.log( sliceArgs( arguments ).join(' ') ); };
    JC.dir = function(){ 
        JC.debug && $.each( sliceArgs( arguments ), function( _ix, _item ){ console.dir( _item )} );
    };
    JC.error = function(){ 
        JC.debug && $.each( sliceArgs( arguments ), function( _ix, _item ){ console.error( _item )} );
    };
    JC.clear = function(){ 
        console.clear && console.clear();
    };

    JC.PATH = JC.PATH || scriptPath();

    window.Bizs = window.Bizs || {};
    /**
     * JC.f 是 JC.common 的别名
     * <br />具体使用请见 <a href='JC.common.html'>JC.common</a></p>
     * @class JC.f
     * @static
     */
    /**
     * JC 组件通用静态方法和属性 ( JC.common, <b>别名: JC.f</b> )
     * <br />所有 JC 组件都会依赖这个静态类
     * <p><b>require</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.common.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.common/0.2/_demo/' target='_blank'>demo link</a></p>
     * @class JC.common
     * @static
     * @version dev 0.2 2013-11-06 
     * @version dev 0.1 2013-07-04
     * @author  qiushaowei   <suches@btbtd.org> | 360 75 Team
     */
    JC.common = JC.f = {
        "addUrlParams": addUrlParams
        , "cloneDate": cloneDate
        , "dateDetect": dateDetect
        , "delUrlParam": delUrlParam
        , "delUrlParams": delUrlParams
        , "easyEffect": easyEffect
        , "filterXSS": filterXSS
        , "formatISODate": formatISODate
        , "funcName": funcName
        , "getJqParent": getJqParent

        , "getUrlParam": getUrlParam
        , "getUrlParams": getUrlParams
        , "hasUrlParam": hasUrlParam
        , 'urlHostName': urlHostName
        , "httpRequire": httpRequire
        , "isSameDay": isSameDay
        , "isSameWeek": isSameWeek
        , "isSameMonth": isSameMonth
        , "isSameSeason": isSameSeason
        , "isSameYear": isSameYear
        , "weekOfYear": weekOfYear
        , "seasonOfYear": seasonOfYear
        , "jcAutoInitComps": jcAutoInitComps

        , "maxDayOfMonth": maxDayOfMonth
        , "mousewheelEvent": mousewheelEvent
        , "padChar": padChar
        , "parentSelector": parentSelector
        , "parseBool": parseBool
        , "parseFinance": parseFinance
        , "parseISODate": parseISODate
        , "parseDate": parseDate
        , "printf": printf
        , "printKey": printKey
        , "cloneObject": cloneObject

        , "pureDate": pureDate
        , "reloadPage": reloadPage
        , "removeUrlSharp": removeUrlSharp
        , "relativePath": relativePath
        , "scriptContent": scriptContent
        , "scriptPath": scriptPath
        , "sliceArgs": sliceArgs
        , "urlDetect": urlDetect
        , "moneyFormat": moneyFormat
        , "dateFormat": dateFormat
        , "extendObject": extendObject
        , "safeTimeout": safeTimeout
        , "encoder": encoder
        , "fixPath": fixPath
        , "arrayId": arrayId
        , "docSize": docSize
        , "winSize": winSize
        , "gid": gid

        /**
         * 判断 JC.common 是否需要向后兼容, 如果需要的话, 向 window 添加全局静态函数
         */
        , "backward":
            function( _setter ){
                if( window.JC_BACKWARD || _setter ){
                    for( var k in JC.common ){
                        if( k == 'backward' ) continue;
                        window[ k ] = window[ k ] || JC.common[ k ];
                    }
                }
            }
        , "has_url_param": hasUrlParam
        , "add_url_params": addUrlParams
        , "get_url_param": getUrlParam
        , "del_url_param": delUrlParam
        , "reload_page": reloadPage
        , "parse_finance_num": parseFinance
        , "pad_char_f": padChar
        , "script_path_f": scriptPath
        , "ts": function(){ return new Date().getTime(); }
    };
    JC.f.backward();
    /**
     * jquery 1.9.1 默认 string 没有 trim 方法, 这里对 string 原型添加一个默认的 trim 方法
     */
    !String.prototype.trim && ( String.prototype.trim = function(){ return $.trim( this ); } );
    /**
     * 兼容 低版本 ie Array 的 indexOf 方法
     */
    !Array.prototype.indexOf 
        && ( Array.prototype.indexOf =
            function( _v ){
                var _r = -1;
                $.each( this, function( _ix, _item ){
                    if( _item == _v ){
                        _r = _ix;
                        return false;
                    }
                });
                return _r;
            });

    !Array.prototype.first 
        && ( Array.prototype.first = 
            function(){
                var _r;
                this.length && ( _r = this[0] );
                return _r;
        });

    !Array.prototype.last
        && ( Array.prototype.last = 
            function(){
                var _r;
                this.length && ( _r = this[ this.length - 1] );
                return _r;
        });

    /**
     * 全局 css z-index 控制属性
     * <br /> <b>注意</b>: 这个变量是 window.ZINDEX_COUNT
     * @property    ZINDEX_COUNT
     * @type        int
     * @default     50001
     * @static
     */
    window.ZINDEX_COUNT = window.ZINDEX_COUNT || 50001;

    function fixPath( _url ){
        if( /\\/.test( _url ) ){
            _url = _url.replace( /[\\]+/g, '\\' );
        }else{
            _url = _url.replace( /[\/]+/g, '/' );
        }
        return _url;
    }
    /**
     * 一维数组去重
     * @method  arrayId
     * @param   {Array}     _ar
     * @return Array
     * @static
     */
    function arrayId( _ar ){
        var _r = [], _k = {};
        
        for( var i = 0, j = _ar.length; i < j; i++ ){
            if( !(_ar[i] in _k) ){
                _r.push( _ar[i] );
                _k[ _ar[i] ] = _ar[i];
            }
        }
        
        return _r;
    }
    /**
     * 生成全局唯一ID
     * @method  gid
     * @return string
     * @static
     */
    function gid(){
        return 'jc_gid_' + JC.f.ts() + '_' + (JC.GID_COUNT++);
    }
    JC.GID_COUNT = 1;

    /**
     * 把函数的参数转为数组
     * @method  sliceArgs
     * @param   {arguments}     args
     * @return Array
     * @static
     */
    function sliceArgs( _arg ){
        var _r = [], _i, _len;
        for( _i = 0, _len = _arg.length; _i < _len; _i++){
            _r.push( _arg[_i] );
        }
        return _r;
    }
    /**
     * 取 URL 的 host name
     * @method  urlHostName
     * @param   {string}    _url
     * @return  string
     * @static
     */
    function urlHostName( _url ){
        var _r = '', _url = _url || location.href;
        if( /\:\/\//.test( _url ) ){
            _url.replace( /^.*?\:\/\/([^\/]+)/, function( $0, $1 ){
                _r = $1;
            });
        }
        return _r;
    }
    /**
     * 把 URL 相对路径 转换为 绝对路径
     * @method  relativePath
     * @param   {string}    _path
     * @param   {string}    _url
     * @return  string
     * @static
     */
    function relativePath( _path, _url ){
        _url = _url || document.URL;
        _url = _url.replace(/^.*?\:\/\/[^\/]+/, "").replace(/[^\/]+$/, "");
        if(!_path){return _url;}  
        if(!/\/$/.test(_url)){_url += "/";}

        if(/(^\.\.\/|^\.\/)/.test(_path)){
            var Re = new RegExp("^\\.\\.\\/"), iCount = 0;    
            while(Re.exec(_path)!=null){
                _path = _path.replace(Re, "");
                iCount++;
            }       
            for(var i=0; i<iCount; i++){_url = _url.replace(/[^\/]+\/$/, "");}    
            if(_url=="") return "/";  
            _path = _path.replace(/^\.\//, ""); 
            _path.replace( /\/\/$/, '/' );
            return _url+_path;
        }   
        return _path;
    }
     /**
     * 按格式输出字符串
     * @method printf
     * @static
     * @param   {string}    _str
     * @return  string
     * @example
     *      printf( 'asdfasdf{0}sdfasdf{1}', '000', 1111 );
     *      //return asdfasdf000sdfasdf1111
     */
    function printf( _str ){
        for(var i = 1, _len = arguments.length; i < _len; i++){
            _str = _str.replace( new RegExp('\\{'+( i - 1 )+'\\}', 'g'), arguments[i] );
        }
        return _str;
    }
     /**
     * 按格式输出字符串
     * @method printKey
     * @static
     * @param   {string}    _str
     * @param   {object}    _keys
     * @return  string
     * @example
     *      JC.f.printKey( 'asdfasdf{key1}sdfasdf{key2},{0}', { 'key1': '000', 'key2': 1111, '0': 222 );
     *      //return asdfasdf000sdfasdf1111,222
     */
    function printKey( _str, _keys ){
        for( var k in _keys ){
            _str = _str.replace( new RegExp('\\{'+( k )+'\\}', 'g'), _keys[k] );
        }
        return _str;
    }

    /**
     * 判断URL中是否有某个get参数
     * @method  hasUrlParam
     * @param   {string}    _url
     * @param   {string}    _key
     * @return  bool
     * @static
     * @example
     *      var bool = hasUrlParam( 'getkey' );
     */
    function hasUrlParam( _url, _key ){
        var _r = false;
        if( !_key ){ _key = _url; _url = location.href; }
        if( /\?/.test( _url ) ){
            _url = _url.split( '?' ); _url = _url[ _url.length - 1 ];
            _url = _url.split('&');
            for( var i = 0, j = _url.length; i < j; i++ ){
                if( _url[i].split('=')[0].toLowerCase() == _key.toLowerCase() ){ _r = true; break; };
            }
        }
        return _r;
    }
    /**
     * 添加URL参数
     * <br /><b>require:</b> delUrlParam, filterXSS
     * @method  addUrlParams
     * @param   {string}    _url
     * @param   {object}    _params
     * @return  string
     * @static
     * @example
            var url = addUrlParams( location.href, {'key1': 'key1value', 'key2': 'key2value' } );
     */ 
    function addUrlParams( _url, _params ){
        var sharp = '';
        !_params && ( _params = _url, _url = location.href );
        _url.indexOf('#') > -1 && ( sharp = _url.split('#')[1], _url = _url.split('#')[0] );
        for( var k in _params ){
            _url = delUrlParam(_url, k);
            _url.indexOf('?') > -1 
                ? _url += '&' + k +'=' + _params[k]
                : _url += '?' + k +'=' + _params[k];
        }
        sharp && ( _url += '#' + sharp );
        _url = filterXSS( _url.replace(/\?\&/g, '?' ) );
        return _url;   

    }
    /**
     * xss 过滤函数
     * @method filterXSS
     * @param   {string}    _s
     * @return string
     * @static
     */
    function filterXSS( _s ){
        _s && (
            _s = _s
                    .replace( /</g, '&lt;' )
                    .replace( />/g, '&gt;' )
        );
        return _s;
    }
    /**
     * 取URL参数的值
     * <br /><b>require:</b> filterXSS
     * @method  getUrlParam
     * @param   {string}    _url
     * @param   {string}    _key
     * @return  string
     * @static
     * @example
            var defaultTag = getUrlParam(location.href, 'tag');  
     */ 
    function getUrlParam( _url, _key ){
        var _r = '', _ar, i, _items;
        !_key && ( _key = _url, _url = location.href );
        _url.indexOf('#') > -1 && ( _url = _url.split('#')[0] );
        if( _url.indexOf('?') > -1 ){
            _ar = _url.split('?')[1].split('&');
            for( i = 0; i < _ar.length; i++ ){
                _items = _ar[i].split('=');
                _items[0] = decodeURIComponent( _items[0] || '' ).replace(/^\s+|\s+$/g, '');
                if( _items[0].toLowerCase() == _key.toLowerCase() ){
                    _r = filterXSS( _items[1] || '' );
                    break;
                } 
            }
        }
        return _r;
    }
    /**
     * 取URL参数的值, 这个方法返回数组
     * <br />与 getUrlParam 的区别是可以获取 checkbox 的所有值
     * <br /><b>require:</b> filterXSS
     * @method  getUrlParams
     * @param   {string}    _url
     * @param   {string}    _key
     * @return  Array
     * @static
     * @example
            var params = getUrlParams(location.href, 'tag');  
     */ 
    function getUrlParams( _url, _key ){
        var _r = [], _params, i, j, _items;
        !_key && ( _key = _url, _url = location.href );
        _url = _url.replace(/[\?]+/g, '?').split('?');
        if( _url.length > 1 ){
            _url = _url[1];
            _params = _url.split('&');
            if( _params.length ){
                for( i = 0, j = _params.length; i < j; i++ ){
                    _items = _params[i].split('=');
                    _items[0] = decodeURIComponent( _items[0] ) || '';
                    if( _items[0].trim() == _key ){
                        _r.push( filterXSS( _items[1] || '' ) );
                    }
                }
            }
        }
        return _r;
    }
    /**
     * 删除URL参数
     * <br /><b>require:</b> filterXSS
     * @method  delUrlParam
     * @param  {string}    _url
     * @param  {string}    _key
     * @return  string
     * @static
     * @example
            var url = delUrlParam( location.href, 'tag' );
     */ 
    function delUrlParam( _url, _key ){
        var sharp = '', params, tmpParams = [], i, item;
        !_key && ( _key = _url, _url = location.href );
        _url.indexOf('#') > -1 && ( sharp = _url.split('#')[1], _url = _url.split('#')[0] );
        if( _url.indexOf('?') > -1 ){
            params = _url.split('?')[1].split('&');
            _url = _url.split('?')[0];
            for( i = 0; i < params.length; i++ ){
                var items = params[i].split('=');
                items[0] = items[0].replace(/^\s+|\s+$/g, '');
                if( items[0].toLowerCase() == _key.toLowerCase() ) continue;
                tmpParams.push( items.join('=') )
            }
            _url += '?' + tmpParams.join('&');
        }
        sharp && ( _url += '#' + sharp );
       _url = filterXSS( _url );
        return _url;
    }
    /**
     * 批量删除URL参数
     * <br /><b>require:</b> delUrlParam
     * @method  delUrlParams
     * @param  {string}    _url
     * @param  {Array}    _keys
     * @return  string
     * @static
     * @example
            var url = delUrlParam( location.href, [ 'k1', 'k2' ] );
     */ 
    function delUrlParams( _url, _keys ){
        !_keys && ( _keys = _url, _url = location.href );
        for( var k in _keys ) _url = delUrlParam( _url, _keys[ k ] );
        return _url;
    }
    /**
     * 提示需要 HTTP 环境
     * @method  httpRequire
     * @static
     * @param  {string}  _msg   要提示的文字, 默认 "本示例需要HTTP环境'
     * @return  bool     如果是HTTP环境返回true, 否则返回false
     */
    function httpRequire( _msg ){
        _msg = _msg || '本示例需要HTTP环境';
        if( /file\:|\\/.test( location.href ) ){
            alert( _msg );
            return false;
        }
        return true;
    }
    /**
     * 删除 URL 的锚点
     * <br /><b>require:</b> addUrlParams, filterXSS
     * @method removeUrlSharp
     * @static
     * @param   {string}    _url
     * @param   {bool}      _nornd      是否不添加随机参数
     * @param   {string}    _rndName
     * @return  string
     */
    function removeUrlSharp( _url, _nornd, _rndName ){   
        !_url && ( _url = location.href );
        _url = _url.replace(/\#[\s\S]*/, '');
        _rndName = _rndName || 'rnd';
        var _rndO;
        !_nornd && ( _rndO = {}
                        , _rndO[ _rndName ] = new Date().getTime()
                        , _url = addUrlParams( _url, _rndO ) 
        );
        _url = filterXSS( _url );
        return _url;
    }
    /**
     * 重载页面
     * <br /><b>require:</b> removeUrlSharp, addUrlParams, filterXSS
     * @method reloadPage
     * @static
     * @param   {string}    _url
     * @param   {bool}      _nornd
     * @param   {int}       _delayms
     */ 
    function reloadPage( _url, _nornd, _delayMs  ){
        _delayMs = _delayMs || 0;

        _url = removeUrlSharp( _url || location.href, _nornd );
        !_nornd && ( _url = addUrlParams( _url, { 'rnd': new Date().getTime() } ) );
        _url = filterXSS( _url );

        setTimeout( function(){
            location.href = _url;
        }, _delayMs);
        return _url;
    }
    /**
     * 取小数点的N位
     * <br />JS 解析 浮点数的时候，经常出现各种不可预知情况，这个函数就是为了解决这个问题
     * @method  parseFinance
     * @static
     * @param   {number}    _i
     * @param   {int}       _dot, default = 2
     * @return  number
     */
    function parseFinance( _i, _dot ){
        _i = parseFloat( _i ) || 0;
        typeof _dot == 'undefined' && ( _dot = 2 );
        _i && ( _i = parseFloat( _i.toFixed( _dot ) ) );
        return _i;
    }
    /**
     * js 附加字串函数
     * @method  padChar
     * @static
     * @param   {string}    _str
     * @param   {intl}      _len
     * @param   {string}    _char
     * @return  string
     */
    function padChar( _str, _len, _char ){
        _len  = _len || 2; _char = _char || "0"; 
        _str += '';
        if( _str.length >_str ) return _str;
        _str = new Array( _len + 1 ).join( _char ) + _str
        return _str.slice( _str.length - _len );
    }
    /**
     * 格式化日期为 YYYY-mm-dd 格式
     * <br /><b>require</b>: pad\_char\_f
     * @method  formatISODate
     * @static
     * @param   {date}                  _date       要格式化日期的日期对象
     * @param   {string|undefined}      _split      定义年月日的分隔符, 默认为 '-'
     * @return  string
     *
     */
    function formatISODate( _date, _split ){
        _date = _date || new Date(); typeof _split == 'undefined' && ( _split = '-' );
        return [ _date.getFullYear(), padChar( _date.getMonth() + 1 ), padChar( _date.getDate() ) ].join(_split);
    }
    /**
     * 从 ISODate 字符串解析日期对象
     * @method  parseISODate
     * @static
     * @param   {string}    _datestr
     * @return  date
     */
    function parseISODate( _datestr ){
        if( !_datestr ) return;
        _datestr = _datestr.replace( /[^\d]+/g, '');
        var _r;
        if( _datestr.length === 8 ){
            _r = new Date( _datestr.slice( 0, 4 )
                            , parseInt( _datestr.slice( 4, 6 ), 10 ) - 1
                            , parseInt( _datestr.slice( 6 ), 10 ) );
        }else if( _datestr.length === 6 ){
            _r = new Date( _datestr.slice( 0, 4 )
                            , parseInt( _datestr.slice( 4, 6 ), 10 ) - 1
                            , 1 );
        }

        return _r;
    }
    /**
     * 从日期字符串解析日期对象
     * <br />兼容 JC.Calendar 日期格式
     * @method  parseDate
     * @param   {date}      _date
     * @param   {selector}  _selector   如果 _selector 为真, 则尝试从 _selector 的 html 属性 dateParse 对日期进行格式化
     * @param   {boolean}   _forceISO   是否强制转换为ISO日期
     * @return  {date|null}
     * @static
     */
    function parseDate( _date, _selector, _forceISO ){
        if( !_date ) return null;
        var _parse = parseISODate;
            
        _selector && !_forceISO
            && ( _selector = $( _selector ) ).length
            && _selector.attr( 'dateParse' )
            && ( _parse = window[ _selector.attr( 'dateParse' ) ] || _parse )
            ;
        _date = _parse( _date );
        _date && _date.start && ( _date = _date.start );
        return _date;
    }

    /**
     * 获取不带 时分秒的 日期对象
     * @method  pureDate
     * @param   {Date}  _d   可选参数, 如果为空 = new Date
     * @return  Date
     */
    function pureDate( _d ){
        var _r;
        _d = _d || new Date();
        _r = new Date( _d.getFullYear(), _d.getMonth(), _d.getDate() );
        return _r;
    }
    /**
    * 克隆日期对象
    * @method  cloneDate
    * @static
    * @param   {Date}  _date   需要克隆的日期
    * @return  {Date}  需要克隆的日期对象
    */
    function cloneDate( _date ){ var d = new Date(); d.setTime( _date.getTime() ); return d; }
    /**
     * 判断两个日期是否为同一天
     * @method  isSameDay
     * @static
     * @param   {Date}  _d1     需要判断的日期1
     * @param   {Date}  _d2     需要判断的日期2
     * @return {bool}
     */
    function isSameDay( _d1, _d2 ){
        return [_d1.getFullYear(), _d1.getMonth(), _d1.getDate()].join() === [
                _d2.getFullYear(), _d2.getMonth(), _d2.getDate()].join()
    }
    /**
     * 判断两个日期是否为同一月份
     * @method  isSameMonth
     * @static
     * @param   {Date}  _d1     需要判断的日期1
     * @param   {Date}  _d2     需要判断的日期2
     * @return {bool}
     */
    function isSameMonth( _d1, _d2 ){
        return [_d1.getFullYear(), _d1.getMonth()].join() === [
                _d2.getFullYear(), _d2.getMonth()].join()
    }

    /**
     * 判断两个日期是否为同一季度
     * @method  isSameWeek
     * @static
     * @param   {Date}  _d1     需要判断的日期1
     * @param   {Date}  _d2     需要判断的日期2
     * @return {bool}
     */
    function isSameWeek( _d1, _d2 ){
        var _weeks = [],
            _r = false,
            i = 0,
            l;

        _weeks = weekOfYear(_d1.getFullYear());
        
        _d1 = _d1.getTime();
        _d2 = _d2.getTime();

        for ( i = 0, l = _weeks.length; i < l; i++ ) {
            if ( (_d1 >= _weeks[i].start && _d1 <= _weeks[i].end) 
                && ( _d2 >= _weeks[i].start && _d2 <= _weeks[i].end ) 
                ) {
                console.log(i, _d1, _weeks[i]);
                return true;
            }  
        }

        return _r;
    }

    /**
     * 判断两个日期是否为同一季度
     * @method  isSameSeason
     * @static
     * @param   {Date}  _d1     需要判断的日期1
     * @param   {Date}  _d2     需要判断的日期2
     * @return {bool}
     */
    function isSameSeason( _d1, _d2 ){
        var _seasons = [],
            _r = false,
            i = 0,
            l ;

        if ( !isSameYear( _d1, _d2 ) ) {
            return false;
        }

        _seasons = seasonOfYear( _d1.getFullYear() );
        _d1 = _d1.getTime();
        _d2 = _d2.getTime();
        
        for (i = 0, l = _seasons.length ; i < l; i++ ) {
            if ( (_d1 >= _seasons[i].start && _d1 <= _seasons[i].end) 
                && ( _d2 >= _seasons[i].start && _d2 <= _seasons[i].end ) ) {
                return true;
            }     
        }

        return _r;
    }

    /**
     * 判断两个日期是否为同一年
     * @method  isSameYear
     * @static
     * @param   {Date}  _d1     需要判断的日期1
     * @param   {Date}  _d2     需要判断的日期2
     * @return {bool}
     */
    function isSameYear( _d1, _d2 ) {
        return _d1.getFullYear() === _d2.getFullYear();
    }

    /**
     * 取一年中所有的星期, 及其开始结束日期
     * @method  weekOfYear
     * @static
     * @param   {int}   _year
     * @param   {int}   _dayOffset  每周的默认开始为周几, 默认0(周一)
     * @return  Array
     */
    function weekOfYear( _year, _dayOffset ){
        var _r = [], _tmp, _count = 1, _dayOffset = _dayOffset || 0
            , _year = parseInt( _year, 10 )
            , _d = new Date( _year, 0, 1 );
        /**
         * 元旦开始的第一个星期一开始的一周为政治经济上的第一周
         */
         _d.getDay() > 1 && _d.setDate( _d.getDate() - _d.getDay() + 7 );

         _d.getDay() === 0 && _d.setDate( _d.getDate() + 1 );

         _dayOffset > 0 && ( _dayOffset = (new Date( 2000, 1, 2 ) - new Date( 2000, 1, 1 )) * _dayOffset );

        while( _d.getFullYear() <= _year ){
            _tmp = { 'week': _count++, 'start': null, 'end': null };
            _tmp.start = _d.getTime() + _dayOffset;
            //_tmp.start = formatISODate(_d);
            _d.setDate( _d.getDate() + 6 );
            _tmp.end = _d.getTime() + _dayOffset;
            //_tmp.end = formatISODate(_d);
            _d.setDate( _d.getDate() + 1 );
            if( _d.getFullYear() > _year ) {
                _d = new Date( _d.getFullYear(), 0, 1 );
                if( _d.getDay() < 2 ) break;
             }
            _r.push( _tmp );
        }
        return _r;
    }
    /**
     * 取一年中所有的季度, 及其开始结束日期
     * @method  seasonOfYear
     * @static
     * @param   {int}   _year
     * @return  Array
     */
    function seasonOfYear( _year ){
        var _r = []
            , _year = parseInt( _year, 10 )
            ;

        _r.push( 
                {
                    start: pureDate( new Date( _year, 0, 1 ) )
                    , end: pureDate( new Date( _year, 2, 31 ) )
                    , season: 1
                }, {
                    start: pureDate( new Date( _year, 3, 1 ) )
                    , end: pureDate( new Date( _year, 5, 30 ) )
                    , season: 2
                }, {
                    start: pureDate( new Date( _year, 6, 1 ) )
                    , end: pureDate( new Date( _year, 8, 30 ) )
                    , season: 3
                }, {
                    start: pureDate( new Date( _year, 9, 1 ) )
                    , end: pureDate( new Date( _year, 11, 31 ) )
                    , season: 4
                }
        );
                

        return _r;
    }


    /**
     * 取得一个月份中最大的一天
     * @method  maxDayOfMonth
     * @static
     * @param   {Date}  _date
     * @return {int} 月份中最大的一天
     */
    function maxDayOfMonth( _date ){
        var _r, _d = new Date( _date.getFullYear(), _date.getMonth() + 1 );
            _d.setDate( _d.getDate() - 1 );
            _r = _d.getDate();
        return _r;
    }
    /**
     * 取当前脚本标签的 src路径 
     * @method  scriptPath
     * @static
     * @return  {string} 脚本所在目录的完整路径
     */
    function scriptPath(){
        var _sc = document.getElementsByTagName('script'), _sc = _sc[ _sc.length - 1 ], _path = _sc.getAttribute('src');
        if( /\//.test( _path ) ){ _path = _path.split('/'); _path.pop(); _path = _path.join('/') + '/'; }
        else if( /\\/.test( _path ) ){ _path = _path.split('\\'); _path.pop(); _path = _path.join('\\') + '/'; }
        return _path;
    }
    /**
     * 缓动函数, 动画效果为按时间缓动 
     * <br />这个函数只考虑递增, 你如果需要递减的话, 在回调里用 _maxVal - _stepval 
     * @method  easyEffect
     * @static
     * @param   {function}  _cb         缓动运动时的回调
     * @param   {number}    _maxVal     缓动的最大值, default = 200
     * @param   {number}    _startVal   缓动的起始值, default = 0
     * @param   {number}    _duration   缓动的总时间, 单位毫秒, default = 200
     * @param   {number}    _stepMs     缓动的间隔, 单位毫秒, default = 2
     * @return  interval
     * @example
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
     */
    function easyEffect( _cb, _maxVal, _startVal, _duration, _stepMs ){
        var _beginDate = new Date(), _timepass
            , _maxVal = _maxVal || 200
            , _startVal = _startVal || 0
            , _maxVal = _maxVal - _startVal 
            , _tmp = 0
            , _done
            , _duration = _duration || 200
            , _stepMs = _stepMs || 2
            ;
        //JC.log( '_maxVal:', _maxVal, '_startVal:', _startVal, '_duration:', _duration, '_stepMs:', _stepMs );

        var _interval = setInterval(
            function(){
                _timepass = new Date() - _beginDate;
                _tmp = _timepass / _duration * _maxVal;
                _tmp;
                if( _tmp >= _maxVal ){
                    _tmp = _maxVal;
                    _done = true;
                    clearInterval( _interval );
                }
                _cb && _cb( _tmp + _startVal, _done );
            }, _stepMs );

        return _interval;
    }
    /**
     * 把输入值转换为布尔值
     * @method parseBool
     * @param   {*} _input
     * @return bool
     * @static
     */
    function parseBool( _input ){
        if( typeof _input == 'string' ){
            _input = _input.replace( /[\s]/g, '' ).toLowerCase();
            if( _input && ( _input == 'false' 
                            || _input == '0' 
                            || _input == 'null'
                            || _input == 'undefined'
           )) _input = false;
           else if( _input ) _input = true;
        }
        return !!_input;
    }
    /**
     * 绑定或清除 mousewheel 事件
     * @method  mousewheelEvent
     * @param   {function}  _cb
     * @param   {bool}      _detach
     * @param   {selector}  _selector, default = document
     * @static
     */
    function mousewheelEvent( _cb, _detach, _selector ){
        _selector = _selector || document;
        var _evt =  (/Firefox/i.test(navigator.userAgent))
            ? "DOMMouseScroll" 
            : "mousewheel"
            ;
        _selector.attachEvent && ( _evt = 'on' + _evt );

        if( _detach ){
            _selector.detachEvent && document.detachEvent( _evt, _cb )
            _selector.removeEventListener && document.removeEventListener( _evt, _cb );
        }else{
            _selector.attachEvent && document.attachEvent( _evt, _cb )
            _selector.addEventListener && document.addEventListener( _evt, _cb );
        }
    }
    /**
     * 获取 selector 的指定父级标签
     * @method  getJqParent
     * @param   {selector}  _selector
     * @param   {selector}  _filter
     * @return selector
     * @require jquery
     * @static
     */
    function getJqParent( _selector, _filter ){
        _selector = $(_selector);
        var _r;

        if( _filter ){
            while( (_selector = _selector.parent()).length ){
                if( _selector.is( _filter ) ){
                    _r = _selector;
                    break;
                }
            }
        }else{
            _r = _selector.parent();
        }

        return _r;
    }
    /**
     * 扩展 jquery 选择器
     * <br />扩展起始字符的 '/' 符号为 jquery 父节点选择器
     * <br />扩展起始字符的 '|' 符号为 jquery 子节点选择器
     * <br />扩展起始字符的 '(' 符号为 jquery 父节点查找识别符( getJqParent )
     * @method  parentSelector
     * @param   {selector}  _item
     * @param   {String}    _selector
     * @param   {selector}  _finder
     * @return  selector
     * @require jquery
     * @static
     */
    function parentSelector( _item, _selector, _finder ){
        _item && ( _item = $( _item ) );
        if( /\,/.test( _selector ) ){
            var _multiSelector = [], _tmp;
            _selector = _selector.split(',');
            $.each( _selector, function( _ix, _subSelector ){
                _subSelector = _subSelector.trim();
                _tmp = parentSelector( _item, _subSelector, _finder );
                _tmp && _tmp.length 
                    &&  ( 
                            ( _tmp.each( function(){ _multiSelector.push( $(this) ) } ) )
                        );
            });
            return $( _multiSelector );
        }
        var _pntChildRe = /^([\/]+)/, _childRe = /^([\|]+)/, _pntRe = /^([<\(]+)/;
        if( _pntChildRe.test( _selector ) ){
            _selector = _selector.replace( _pntChildRe, function( $0, $1 ){
                for( var i = 0, j = $1.length; i < j; i++ ){
                    _item = _item.parent();
                }
                _finder = _item;
                return '';
            });
            _selector = _selector.trim();
            return _selector ? _finder.find( _selector ) : _finder;
        }else if( _childRe.test( _selector ) ){
            _selector = _selector.replace( _childRe, function( $0, $1 ){
                for( var i = 1, j = $1.length; i < j; i++ ){
                    _item = _item.parent();
                }
                _finder = _item;
                return '';
            });
            _selector = _selector.trim();
            return _selector ? _finder.find( _selector ) : _finder;
        }else if( _pntRe.test( _selector ) ){
            _selector = _selector.replace( _pntRe, '' ).trim();
            if( _selector ){
                if( /[\s]/.test( _selector ) ){
                    var _r;
                    _selector.replace( /^([^\s]+)([\s\S]+)/, function( $0, $1, $2 ){
                        _r = getJqParent( _item, $1 ).find( $2.trim() );
                    });
                    return _r || _selector;
                }else{
                    return getJqParent( _item, _selector );
                }
            }else{
                return _item.parent();
            }
        }else{
            return _finder ? _finder.find( _selector ) : jQuery( _selector );
        }
    }
    /**
     * 获取脚本模板的内容
     * @method  scriptContent
     * @param   {selector}  _selector
     * @return  string
     * @static
     */
    function scriptContent( _selector ){
        var _r = '';
        _selector 
            && ( _selector = $( _selector ) ).length 
            && ( _r = _selector.html().trim().replace( /[\r\n]/g, '') )
            ;
        return _r;
    }
    /**
     * 取函数名 ( 匿名函数返回空 )
     * @method  funcName
     * @param   {function}  _func
     * @return  string
     * @static
     */
    function funcName(_func){
      var _re = /^function\s+([^()]+)[\s\S]*/
          , _r = ''
          , _fStr = _func.toString();    
      //JC.log( _fStr );
      _re.test( _fStr ) && ( _r = _fStr.replace( _re, '$1' ) );
      return _r.trim();
    }
    /**
     * 动态添加内容时, 初始化可识别的组件
     * <dl>
     *      <dt>目前会自动识别的组件</dt>
     *      <dd>
     *          Bizs.CommonModify, JC.Panel, JC.Dialog
     *          <br /><b>自动识别的组件不用显式调用  jcAutoInitComps 去识别可识别的组件</b>
     *      </dd>
     * </d>
     * <dl>
     *      <dt>可识别的组件</dt>
     *      <dd>
     *          JC.AutoSelect, JC.AutoChecked, JC.AjaxUpload, JC.Calendar
     *          , JC.Drag, JC.DCalendar, JC.Placeholder, JC.TableFreeze, JC.ImageCutter, JC.Tab
     *          <br />Bizs.DisableLogic, Bizs.FormLogic, Bizs.MoneyTips, Bizs.AutoSelectComplete
     *      </dd>
     * </d>
     * @method  jcAutoInitComps
     * @param   {selector}  _selector
     * @static
     */
    function jcAutoInitComps( _selector ){
        _selector = $( _selector || document );
        
        if( !( _selector && _selector.length && window.JC ) ) return;
        /**
         * 联动下拉框
         */
        JC.AutoSelect && JC.AutoSelect( _selector );
        /**
         * 日历组件
         */
        JC.Calendar && JC.Calendar.initTrigger( _selector );
        /**
         * 双日历组件
         */
        JC.DCalendar && JC.DCalendar.init && JC.DCalendar.init( _selector );
        /**
         * 全选反选
         */
        JC.AutoChecked && JC.AutoChecked( _selector );
        /**
         * Ajax 上传
         */
        JC.AjaxUpload && JC.AjaxUpload.init( _selector );
        /**
         * 占位符
         */
        JC.Placeholder && JC.Placeholder.init( _selector );
        /**
         * 表格冻结
         */
        JC.TableFreeze && JC.TableFreeze.init( _selector );
        /**
         * 拖曳
         */
        JC.Drag && JC.Drag.init( _selector );
        /**
         * 图片裁切
         */
        JC.ImageCutter && JC.ImageCutter.init( _selector );

        JC.Tab && JC.Tab.init && JC.Tab.init( _selector );

        if( !window.Bizs ) return;
        /**
         * disable / enable
         */
        Bizs.DisableLogic && Bizs.DisableLogic.init( _selector );
        /**
         * 表单提交逻辑
         */
        Bizs.FormLogic && Bizs.FormLogic.init( _selector );
        /**
         * 格式化金额
         */
        Bizs.MoneyTips && Bizs.MoneyTips.init( _selector );
        /**
         * 自动完成
         */
        Bizs.AutoSelectComplete && Bizs.AutoSelectComplete.init( _selector );

        /**
         *排期日期展示
        */
        Bizs.TaskViewer && Bizs.TaskViewer.init(_selector);
    }
    /**
     * URL 占位符识别功能
     * <br /><b>require:</b> addUrlParams, filterXSS
     * @method  urlDetect
     * @param   {String}    _url    如果 起始字符为 URL, 那么 URL 将祝为本页的URL
     * @return  string
     * @static
     * @example
     *      urlDetect( '?test' ); //output: ?test
     *
     *      urlDetect( 'URL,a=1&b=2' ); //output: your.com?a=1&b=2
     *      urlDetect( 'URL,a=1,b=2' ); //output: your.com?a=1&b=2
     *      urlDetect( 'URLa=1&b=2' ); //output: your.com?a=1&b=2
     */
    function urlDetect( _url ){
        _url = _url || '';
        var _r = _url, _tmp, i, j, _items;
        if( /^URL/.test( _url ) ){
            _tmp = _url.replace( /^URL/, '' ).replace( /[\s]*,[\s]*/g, ',' ).trim().split(',');
            _url = location.href;
            var _d = {}, _concat = [];
            if( _tmp.length ){
                for( i = 0, j = _tmp.length; i < j; i ++ ){
                     /\&/.test( _tmp[i] )
                         ? ( _concat = _concat.concat( _tmp[i].split('&') ) )
                         : ( _concat = _concat.concat( _tmp[i] ) )
                         ;
                }
                _tmp = _concat;
            }
            for( i = 0, j = _tmp.length; i < j; i++ ){
                _items = _tmp[i].replace(/[\s]+/g, '').split( '=' );
                if( !_items[0] ) continue;
                _d[ _items[0] ] = _items[1] || '';
            }
            _url = addUrlParams( _url, _d );
            _r = _url;
        }
        _r = filterXSS( _url );
        return _r;
    }
    /**
     * 日期占位符识别功能
     * @method  dateDetect
     * @param   {String}    _dateStr    如果起始字符为 NOW, 那么将视为当前日期
     *                                  , 如果起始字符为 NOWFirst, 那么将视为当前月的1号
     * @return  {date|null}
     * @static
     * @example
     *      dateDetect( 'now' ); //2014-10-02
     *      dateDetect( 'now,3d' ); //2013-10-05
     *      dateDetect( 'now,-3d' ); //2013-09-29
     *      dateDetect( 'now,2w' ); //2013-10-16
     *      dateDetect( 'now,-2m' ); //2013-08-02
     *      dateDetect( 'now,4y' ); //2017-10-02
     *
     *      dateDetect( 'now,1d,1w,1m,1y' ); //2014-11-10
     */
    function dateDetect( _dateStr ){
        var _r = null   
            , _re = /^now/i
            , _nowFirstRe = /^nowfirst/
            , _dateRe = /^([\d]{8}|[\d]{4}.[\d]{2}.[\d]{2})/
            , _d, _ar, _item
            ;
        if( _dateStr && typeof _dateStr == 'string' ){
            if( _re.test( _dateStr ) || _nowFirstRe.test( _dateStr ) || _dateRe.test( _dateStr ) ){
                _d = new Date();
                if( _nowFirstRe.test(_dateStr ) ){
                    _d.setDate( 1 );
                }
                if( _dateRe.test( _dateStr ) ){
                    _d = JC.f.parseISODate( _dateStr.replace( /[^\d]/g, '' ).slice( 0, 8 ) );
                    _dateStr = _dateStr.replace( _dateRe, '' );
                }
                _dateStr = _dateStr.replace( _re, '' ).replace(/[\s]+/g, '');
                _ar = _dateStr.split(',');

                var _red = /d$/i
                    , _rew = /w$/i
                    , _rem = /m$/i
                    , _rey = /y$/i
                    ;
                for( var i = 0, j = _ar.length; i < j; i++ ){
                    _item = _ar[i] || '';
                    if( !_item ) continue;
                    _item = _item.replace( /[^\-\ddwmy]+/gi, '' );

                    if( _red.test( _item ) ){
                        _item = parseInt( _item.replace( _red, '' ), 10 );
                        _item && _d.setDate( _d.getDate() + _item );
                    }else if( _rew.test( _item ) ){
                        _item = parseInt( _item.replace( _rew, '' ), 10 );
                        _item && _d.setDate( _d.getDate() + _item * 7 );
                    }else if( _rem.test( _item ) ){
                        _item = parseInt( _item.replace( _rem, '' ), 10 );
                        _item && _d.setMonth( _d.getMonth() + _item );
                    }else if( _rey.test( _item ) ){
                        _item = parseInt( _item.replace( _rey, '' ), 10 );
                        _item && _d.setFullYear( _d.getFullYear() + _item );
                    }
                }
                _r = _d;
            }else{
                _r = parseISODate( _dateStr );
            }
        }
        return _r;
    }
    ;(function(){
        /**
         * inject jquery val func, for hidden change event
         */
        if( !window.jQuery ) return;
        var _oldVal = $.fn.val;
        $.fn.val = 
            function(){
                var _r = _oldVal.apply( this, arguments ), _p = this;
                if( 
                    arguments.length
                    && ( this.prop('nodeName') || '').toLowerCase() == 'input' 
                    && ( this.attr('type') || '' ).toLowerCase() == 'hidden'
                ){
                    setTimeout( function(){ _p.trigger( 'change' ); }, 1 );
                }
                return _r;
            };
    }());
    /**
     * 逗号格式化金额
     * @method  moneyFormat
     * @param   {int|string}    _number
     * @param   {int}           _len
     * @param   {int}           _floatLen
     * @param   {int}           _splitSymbol
     * @return  string
     * @static
     */
    function moneyFormat(_number, _len, _floatLen, _splitSymbol){
        var _def = '0.00';
        !_len && ( _len = 3 );
        typeof _floatLen == 'undefined' && ( _floatLen = 2 );
        !_splitSymbol && ( _splitSymbol = ',' );
        var _isNegative = false, _r;

        typeof _number == 'number' && ( _number = parseFinance( _number, _floatLen ) );
        if( typeof _number == 'string' ){
            _number = _number.replace( /[,]/g, '' );
            if( !/^[\d\.]+$/.test( _number ) ) return _def;
            if( _number.split('.').length > 2 ) return _def;
        }

        _number = _number || 0;
        _number += ''; 

        /^\-/.test( _number ) && ( _isNegative = true );

        _number = _number.replace( /[^\d\.]/g, '' );

        var _parts = _number.split('.'), _sparts = [];

        while( _parts[0].length > _len ){
            var _tmp = _parts[0].slice( _parts[0].length - _len, _parts[0].length );
            //console.log( _tmp );
            _sparts.push( _tmp );
            _parts[0] = _parts[0].slice( 0, _parts[0].length - _len );
        }
        _sparts.push( _parts[0] );

        _parts[0] = _sparts.reverse().join( _splitSymbol );

        if( _floatLen ){
            !_parts[1] && ( _parts[1] = '' );
            _parts[1] += new Array( _floatLen + 1 ).join('0');
            _parts[1] = _parts[1].slice( 0, _floatLen );
        }else{
            _parts.length > 1 && _parts.pop();
        }
        _r = _parts.join('.');
        _isNegative && ( _r = '-' + _r );

        return _r;
    }
    /**
     * 日期格式化 (具体格式请查看 PHP Date Formats)
     * @method  dateFormat
     * @param   {date}    _date     default = now
     * @param   {string}  _format   default = "YY-MM-DD"
     * @return  string
     * @static
     */
    function dateFormat( _date, _format ){
        typeof _date == 'string' && ( _format = _date, _date = new Date() );
        !_date && ( _date = new Date() );
        !_format && ( _format = 'YY-MM-DD' );
        var _r = _format, _tmp
            , _monthName = [ 'january', 'february', 'march', 'april', 'may', 'june'
                            , 'july', 'august', 'september', 'october', 'november', 'december' ] 
            , _monthShortName = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ]
            ;

        _r = _r
            .replace( /YY/g, _date.getFullYear() )
            .replace( /WK/g, function(){
                var _r = 1, _offset = 0, _weeks;

                JC.Calendar && ( _offset = JC.Calendar.weekDayOffset );

                _weeks = weekOfYear( _date.getFullYear(), JC.Calendar.weekDayOffset );

                $( _weeks ).each( function( _ix, _item ){
                    if( _date.getTime() >= _item.start && _date.getTime() <= _item.end ){
                        _r = _item.week;
                        return false;
                    }
                });

                return _r;
            })
            .replace( /YQ/g, function(){
                var _r = 1, _offset = 0, _seasons;

                _seasons = seasonOfYear( _date.getFullYear() );

                $( _seasons ).each( function( _ix, _item ){
                    if( _date.getTime() >= _item.start && _date.getTime() <= _item.end ){
                        _r = _item.season;
                        return false;
                    }
                });

                return _r;
            })
            .replace( /MM/g, padChar( _date.getMonth() + 1 ) )
            .replace( /DD/g, padChar( _date.getDate() ) )

            .replace( /yy/g, function( $0 ){
                _tmp = padChar( _date.getYear() );
                //JC.log( _date.getYear(), _tmp.slice( _tmp.length - 2 ) );
                return _tmp.slice( _tmp.length - 2 );
            })
            .replace( /mm/g, _date.getMonth() + 1 )
            .replace( /dd/g, _date.getDate() )
            .replace( /d/g, _date.getDate() )

            .replace( /y/g, _date.getFullYear() )

            .replace( /m/g, function( $0 ){
                return _monthName[ _date.getMonth() ];          
            })

            .replace( /M/g, function( $0 ){
                return _monthShortName[ _date.getMonth() ];          
            })
            .replace( /HH/g, padChar( _date.getHours() ) )
            .replace( /h/g, _date.getHours() )
            .replace( /NN/g, padChar( _date.getMinutes() ) )
            .replace( /n/g, _date.getMinutes() )
            .replace( /SS/g, padChar( _date.getSeconds() ) )
            .replace( /s/g, _date.getSeconds() )
            ;

        return _r;
    }
    /**
     * 扩展对象属性
     * @method  extendObject
     * @param   {object}    _source
     * @param   {object}    _new
     * @param   {bool}      _overwrite      是否覆盖已有属性, default = true  
     * @return  object
     * @static
     */
    function extendObject( _source, _new, _overwrite ){
        typeof _overwrite == 'undefined' && ( _overwrite = true );
        if( _source && _new ){
            for( var k in _new ){
                if( _overwrite ){
                    _source[ k ] = _new[ k ];
                }else if( !( k in _source ) ){
                    _source[ k ] = _new[ k ];
                }
            }
        }
        return _source;
    }
    /**
     * timeout 控制逻辑, 避免相同功能的 setTimeout 重复执行
     * @method  safeTimeout
     * @param   {timeout|function}  _timeout
     * @param   {object}            _obj    default = window.TIMEOUT_HOST || {}
     * @param   {string}            _name   default = 'NORMAL'
     * @param   {int}               _ms     default = 50
     * @return  object
     * @static
     */
    function safeTimeout( _timeout, _obj, _name, _ms ){
        if( typeof _timeout == 'undefined' ) return;
        _obj = $( _obj || ( window.TIMEOUT_HOST = window.TIMEOUT_HOST || {} ) );
        _name = _name || 'NORMAL';

        typeof _timeout == 'function'
            && ( _timeout = setTimeout( _timeout, _ms || 50 ) );

        _obj.data( _name ) && clearTimeout( _obj.data( _name ) );
        _obj.data( _name, _timeout );
    }
    /**
     * URL 请求时, 获取对URL参数进行编码的函数
     * @method  encoder
     * @param   {selector}  _selector
     * @return  {encode function}   default encodeURIComponent
     * @static
     */
    function encoder( _selector ){
        _selector && ( _selector = $( _selector ) );
        var _r;
        if( _selector && _selector.length ){
            _r =_selector.attr( 'validEncoder' ) || 'encodeURIComponent';
            _r = window[ _r ] || encodeURIComponent;
        }else{
            _r = encodeURIComponent;
        }
        return _r;
    }
    /**
     * 深度克隆对象
     * @method  cloneObject
     * @param   {Object}    _inObj
     * @return  Object
     * @static
     */
    function cloneObject( _inObj, _outObj ){
        _outObj = _outObj || {};
        var k, i, j;

        for( k in _inObj ){
            _outObj[ k ] = _inObj[ k ];
            switch( Object.prototype.toString.call( _outObj[ k ] ) ){

                case '[object Object]': {
                      _outObj[ k ] = _outObj[ k ].constructor === Object
                        ?  cloneObject( _outObj[ k ] )
                        :  _outObj[ k ]
                        ;
                    break;
                }

                case '[object Array]': {
                    _outObj[ k ] = _inObj[ k ].slice();
                    for( i = 0, j = _outObj[ k ].length; i < j; i++ ){
                        if( Object.prototype.toString.call( _outObj[ k ][i] ) == '[object Object]' )
                            _outObj[ k ][ i ] = cloneObject( _outObj[ k ][ i ] );
                    }
                    break;
                }

                case '[object Date]': {
                    _outObj[ k ] = new Date(); _outObj[ k ].setTime( _inObj[ k ].getTime() );
                    break;
                }

                default: _outObj[ k ] = _inObj[ k ];
            }
        }

        return _outObj;
    }
    /**
     * 获取 document 的 相关大小
     * @method  docSize
     * @param   {document}    _doc
     * @return  Object
     * @static
     */
    function docSize( _doc ){
        _doc = _doc || document;
        var _r = {
            width: 0, height: 0, docWidth: 0, docHeight: 0, bodyWidth: 0, bodyHeight: 0, scrollWidth: 0, scrollHeight: 0
        };

        _r.docWidth = _doc.documentElement.offsetWidth;
        _r.docHeight = _doc.documentElement.offsetHeight;

        _doc.body && (
            _r.bodyWidth = _doc.body.offsetWidth
            , _r.bodyHeight = _doc.body.offsetHeight
        );

        _r.scrollWidth = _doc.documentElement.scrollWidth
        _r.scrollHeight = _doc.documentElement.scrollHeight

        _r.width = Math.max( _r.docWidth, _r.bodyWidth, _r.scrollHeight );
        _r.height = Math.max( _r.docHeight, _r.bodyHeight, _r.scrollHeight );

        return _r;
    }
    /**
     * 获取 window 的 相关大小
     * @method  winSize
     * @param   {window}    _win,  default = window
     * @return  Object
     * @static
     */
    function winSize( _win ){
        _win = $( _win || window );
        var _r = {
                width: _win.width()
                , height: _win.height()
                , scrollLeft: _win.scrollLeft()
                , scrollTop: _win.scrollTop()
            };
        _r.viewportX = _r.scrollLeft;
        _r.maxViewportX = _r.scrollLeft + _r.width;
        _r.viewportY = _r.scrollTop;
        _r.maxViewportY = _r.scrollTop + _r.height;
        return _r;
    }

    return JC.f;

});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
