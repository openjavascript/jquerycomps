 ;(function(define, _win) { 'use strict'; define( 'JC.FrameUtil', [ 'JC.common' ], function(){
/**
 *  <h2>iframe 自适应 与 数据交互 工具类</h2>
 *
 *  <p><b>require</b>:
 *      <a href='JC.common.html'>JC.common</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.FrameUtil.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.FrameUtil/0.1/_demo' target='_blank'>demo link</a></p>
 *
 * @namespace   JC
 * @class       FrameUtil
 * @static
 * @version dev 0.1 2014-04-26
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 */
    var _jdoc = $( document ), _jwin = $( window ), FU;

    JC.FrameUtil = FU = {
        /**
         * 事件保存与触发对象
         * @property eventHost
         * @type    object
         */
        eventHost: {}
        /**
         * frame 高度偏移值 
         * @property heightOffset
         * @type int
         * @default 0
         */
        , heightOffset: 0
        /**
         * 自动大小的间隔
         * <br />单位毫秒
         * @property autoUpdateSizeMs
         * @type int
         * @default 1000
         */
        , autoUpdateSizeMs: 1000 
        /**
         * 设置自适应大小应用的属性
         * <br />1: height
         * <br />2: width
         * <br />3: height + width
         * @property childSizePattern
         * @type int
         * @default 1
         */
        , childSizePattern: 1 
        /**
         * 是否自动响应关闭事件
         * @property isChildAutoClose
         * @type boolean
         * @default true
         */
        , isChildAutoClose: true
        /**
         * 是否自动响应大小改变事件
         * @property isChildAutoSize
         * @type boolean
         * @default true
         */
        , isChildAutoSize: true
        /**
         * 获取 JC.FrameUtil 唯一id
         * <br />id = location.url_timestamp
         * @method id
         * @return string
         */
        , id: function(){ return FU._id; }
        /**
         * 通知父窗口更新frame大小
         * @method noticeSize
         * @param   {string}    _type
         */
        , noticeSize:
            function( _type ){
                try{
                
                _type = FU.type( _type );
            
                if( ! FU.parent() ) return FU;
                    var _ext = { 'type': _type };
                    FU.parent().jEventHost.trigger( 'size', [ FU.info( _ext ) ] );
                }catch(ex){
                    JC.error( 'JC.FrameUtil noticeSize', ex.message );
                }
                return FU;
            }
        /**
         * 自动通知父窗口更新frame大小
         * @method  autoNoticeSize
         * @param   {int}       _ms
         * @param   {string}    _type
         */
        , autoNoticeSize:
            function( _ms, _type ){

                typeof _ms == 'undefined' && ( _ms = FU.autoUpdateSizeMs );

                $( FU ).data( 'FUI_noticeSize' ) && clearInterval( $( FU ).data( 'FUI_noticeSize' ) );
                FU.noticeSize( _type );
                _ms
                    && $(FU).data( 'FUI_noticeSize', setInterval( function(){
                        FU.noticeSize( _type );
                    }, _ms ) );

                return FU;
            }
        /**
         * 订阅 frame 的事件
         * <br />目前有以下事件:
         * <br />close: 关闭
         * <br />size: 更新大小
         * <br />data: json 数据
         * @method  subscribeEvent
         * @param   {string}    _name
         * @param   {function}  _cb
         */
        , subscribeEvent:
            function( _name, _cb ){
                if( !_name ) return FU;
                $( FU.eventHost ).on( _name, _cb );
                return FU;
            }

        /**
         * 订阅 父级frame 的事件
         * <br />目前有以下事件:
         * <br />close: 关闭
         * <br />size: 更新大小
         * <br />data: json 数据
         * @method  subscribeParentEvent
         * @param   {string}    _name
         * @param   {function}  _cb
         */
        , subscribeParentEvent:
            function( _name, _cb ){
                if( !_name ) return FU;

                FU.parent() && 
                    FU.parent().jEventHost.on( _name, _cb );
                return FU;
            }

        /**
         * 通知父级有数据交互
         * @method  noticeData
         * @param   {json}      _data
         * @param   {string}    _type
         */
        , noticeData:
            function( _data, _type ){
                try{
                    if( !(_data) ) return FU;
                    if( !FU.parent() ) return FU;
                    _type = FU.type( _type );

                    FU.parent().jEventHost.trigger( 'data', FU.info( { 'data': _data, 'type': _type } ) );
                }catch( ex ){
                    JC.error( 'JC.FrameUtil noticeData', ex.message );
                }
                return FU;
            }
        /**
         * 通知父级刷新页面
         * @method  noticeReload
         * @param   {string}    _url
         * @param   {string}    _type
         */
        , noticeReload:
            function( _url, _type ){
                if( !FU.parent() ) return FU;
                _type = FU.type( _type );

                FU.parent().jEventHost.trigger( 'reload', FU.info( { 'url': _url, 'type': _type } ) );
                return FU;
            }

        /**
         * 通知父级已经初始化完毕
         * @method  noticeReady
         * @param   {string}    _type
         */
        , noticeReady:
            function( _type ){
                if( !FU.parent() ) return FU;
                try{
                    _type = FU.type( _type );

                    FU.parent() 
                        && FU.parent().jEventHost.trigger( 'ready', FU.info( { 'type': _type } ) );
                }catch( ex ){
                    JC.error ( 'JC.FrameUtil noticeReady', ex.message );
                }
                return FU;
            }
        /**
         * 通知子级有数据交互
         * @method  noticeChildData
         * @param   {json}      _params
         * @param   {string}    _type
         */
        , noticeChildData:
            function( _params, _type ){
                if( !(_params) ) return FU;
                // _params.type = FU.type( _type ) || _params.type;

                FU.info().jEventHost.trigger( _type ? _type : 'childData', FU.info( _params ) );
                return FU;
            }
        /**
         * 通知父级关闭窗口
         * @method  noticeClose
         * @param   {string}    _type
         */
        , noticeClose:
            function( _type ){
                try{
                    _type = FU.type( _type );
                    FU.parent().jEventHost.trigger( 'close', FU.info( { 'type': _type } ) );
                }catch(ex){
                    JC.error( 'JC.FrameUtil noticeClose', ex.message );
                }
                return FU;
            }
        /**
         * 获取窗口信息
         * @method  info
         * @return  {object}  $, width, height, bodyWidth, bodyHeight, id
         */
        , info:
            function( _ext ){
                var _body = $( document.body )
                    , _vs = JC.f.docSize()
                    , _r = { 
                        '$': $
                        , 'width': _vs.width
                        , 'height': _vs.height
                        , 'bodyWidth': _vs.bodyWidth
                        , 'bodyHeight': _vs.bodyHeight
                        , 'id': FU.id()
                        , 'eventHost': FU.eventHost
                        , 'jEventHost': $( FU.eventHost )
                        , 'FrameUtil': FU
                    };

                _ext && ( _r = JC.f.extendObject( _r, _ext ) );
                return _r;
            }
        /**
         * 获取父级窗口信息
         * @method  parent
         * @return  {object}  $, win, jwin, JC, FrameUtil, eventHost, jEventHost, id
         */
        , parent:
            function(){
                var _r;
                if( window.parent 
                        && window.parent != window 
                        && window.parent.$ 
                        && window.parent.JC 
                        && window.parent.JC.FrameUtil
                ){
                    _r = {
                        '$': window.parent.$
                        , 'win': window.parent
                        , 'jwin': window.parent.$( window.parent )
                        , 'JC': window.parent.JC
                        , 'eventHost': window.parent.JC.FrameUtil.eventHost
                        , 'jEventHost': window.parent.$( window.parent.JC.FrameUtil.eventHost )
                        , 'id': window.parent.JC.FrameUtil.id()
                        , 'FrameUtil': window.parent.JC.FrameUtil
                    };

                }
                return _r;
            }
       /**
         * 获取子级窗口信息
         * @method  parent
         * @return  {object}  $, width, height, bodyWidth, bodyHeight, win, doc, type, id
         */
        , frameInfo:
            function( _frame, _ext ){
                _frame && ( _frame = $( _frame ) );
                var _r = null;

                if( _frame && _frame.length ){
                    try{
                        var _cwin = _frame.prop( 'contentWindow' )
                            , _cdoc = _frame.prop( 'contentDocument' )
                            , _type = JC.f.getUrlParam( _frame.attr('src') || '', 'jsAction' ) || _cwin.name || ''
                            , _vs = JC.f.docSize( _cdoc )
                            ;
                    }catch(ex){
                        JC.error( 'JC.FrameUtil frameInfo', ex.message );
                        return _r;
                    }

                    _r = { 
                        '$': _cwin.$
                        , 'width': _vs.width
                        , 'height': _vs.height
                        , 'bodyWidth': _vs.bodyWidth
                        , 'bodyHeight': _vs.bodyHeight
                        , 'docWidth': _vs.docWidth
                        , 'docHeight': _vs.docHeight
                        , 'win': _cwin
                        , 'doc': _cdoc
                        , 'type': _type
                        , 'id': ''
                    };

                    _cdoc && _cdoc.body 
                        && (
                            _r.bodyWidth = _cdoc.body.offsetWidth
                            , _r.bodyHeight = _cdoc.body.offsetHeight
                        );

                    if( _cwin.JC && _cwin.JC.FrameUtil ){
                        _r.id = _cwin.JC.FrameUtil.id();
                    }

                    _ext && ( _r = JC.f.extendObject( _r, _ext ) );
                }

                return _r;
            }
        /**
         * 获取窗口类型
         * <br />这个方法的作用可用 id() + childIdMap() 替代
         * @method type
         * @default window.name
         * @return string
         */
        , type:
            function( _type, _plus, _frame ){
                if( !_type ){

                    _frame && ( _frame = $( _frame ) );
                    if( _frame && _frame.length ){
                        _type = JC.f.getUrlParam( _frame.attr( 'jsAction' ) || '',  'jsAction' );
                        _type = _type || _frame.prop( 'contentWindow' ).name || '';
                    }else{
                        _type = JC.f.getUrlParam( 'jsAction' );
                        _type = _type || window.name || '';
                    }
                }
                _type && _plus && ( _type += _plus );

                return _type;
            }
        /**
         * 批量更新 frame 大小
         * @method updateChildrenSize
         * @param   {selector}  _frames
         */
        , updateChildrenSize:
            function( _frames ){
                _frames && ( _frames = $( _frames ) );
                if( !( _frames && _frames.length ) ) return FU;
                _frames.each( function(){
                    FU.updateChildSize( $( this ) );
                });
                return FU;
            }
        /**
         * 更新 frame 大小
         * @method  updateChildSize
         * @param   {selector}  _frame
         */
        , updateChildSize:
            function( _frame ){
                _frame && ( _frame = $( _frame ) );
                if( !( _frame && _frame.length ) ) return FU;
                if( !_frame.is( ':visible' ) ) return FU;
                var _finfo, _h;
                _finfo = FU.frameInfo( _frame );
                if( !_finfo ) return;
                if( !_finfo.height ) return FU;
                _frame.css( FU.cssFromSizePattern( FU.childSizePattern, _finfo ) );
                _frame.css( 'height', _finfo.height + 'px' );
                //JC.log( _frame.attr( 'name' ), _finfo.height, _finfo.bodyHeight );
                return FU;
            }
        /**
         * 自动批量更新 frame 大小
         * @method  childrenAutoSize
         * @param   {selector}  _frames
         * @param   {int}       _ms
         */
        , childrenAutoSize:
            function( _frames, _ms ){
                _frames && ( _frames = $( _frames ) );
                if( !( _frames && _frames.length ) ) return FU;
                typeof _ms == 'undefined' && ( _ms = FU.autoUpdateSizeMs );
                var _d = { 'frames': _frames };

                FU.updateChildrenSize( _frames );

                _frames.data( 'FUI_autoSize' ) 
                    && clearInterval( _frames.data( 'FUI_autoSize' ) )
                    ;

                _ms
                    && _frames.data( 'FUI_autoSize', setInterval( function(){
                        FU.updateChildrenSize( _frames );
                    }, _ms ) );

                return FU;
            }
        /**
         * 通过 id 比对 frame 的 FrameUtil.id() 获取 frame
         * @method  childIdMap
         * @param   {string}  _id
         * @return  selector | null
         */
        , childIdMap: 
            function( _id ){
                var _r;

                if( _id ){
                    if( _id in FU._childIdMap ){
                        _r = FU._childIdMap[ _id ];
                    }else{
                        $( 'iframe' ).each( function( _ix ){
                            var _iframe = $( this ), _win = _iframe.prop( 'contentWindow' ); 

                            if( 
                                _win && _win.JC && _win.JC.FrameUtil
                                && _win.JC.FrameUtil.id() 
                            ){
                                if( _win.JC.FrameUtil.id() === _id ){
                                    FU._childIdMap[ _id ] = _r = _iframe;
                                    return false;
                                }
                            }
                        });
                    }
                }
                return _r;
            }
        , _childIdMap: {}

        /**
         * 通过 FrameUtil.childSizePattern 获取对应的 css 样式
         * @method  cssFromSizePattern
         * @param   {int}   _pattern
         * @param   {json}  _params
         * @return  json
         */
        , cssFromSizePattern:
            function( _pattern, _params ){
                var _css = {};
                switch( _pattern ){
                    case 1: _css.height = _params.height + FU.heightOffset; break;
                    case 2: _css.width = _params.width; break;
                    default: 
                       _css.height = _params.height + FU.heightOffset;
                       _css.width = _params.width;
                       break;
                }
                return _css;
            }

    };

    FU._id = location.href + '_' + new Date().getTime();


    if( FU.parent() ){
        FU.parent().FrameUtil.subscribeEvent( 'childData', function( _evt, _params ){
            if( !( _params.id === FU._id ) ) return;
            FU.noticeChildData( _params );
        });

        setTimeout( function(){ FU.noticeReady(); }, 1 );
    }

    JC.f.safeTimeout( function(){

        if( FU.isChildAutoSize ){
            JC.FrameUtil.subscribeEvent( 'size', function( _evt, _params ){
                if( !_params.height ) return;
                var _childFrame = FU.childIdMap( _params.id ), _css;
                if( _childFrame && _childFrame.length ){
                    _childFrame.css( FU.cssFromSizePattern( FU.childSizePattern, _params ) );
                }
            });
        }

        if( FU.isChildAutoClose ){
            JC.FrameUtil.subscribeEvent( 'close', function( _evt, _params ){
                var _childFrame = FU.childIdMap( _params.id ), _css, _panel;
                if( _childFrame && _childFrame.length ){
                    _panel = JC.f.parentSelector( _childFrame, 'div.UPanel' );
                    _panel 
                        && _panel.length 
                        && JC.Panel.getInstance( _panel )
                        && JC.Panel.getInstance( _panel ).close()
                        ;
                }
            });
        }

        JC.FrameUtil.subscribeEvent( 'reload', function( _evt, _params ){
            var _url = _params.url || location.href;
            JC.f.reloadPage( _url );
        });

    }, null, 'JCFrameUtilInit', 200 );

    return JC.FrameUtil;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
