 ;(function(define, _win) { 'use strict'; define( [ 'JC.common' ], function(){
/**
 *<p><b>require</b>:
 *   <a href='JC.common.html'>JC.common</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.FrameUtil.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.FrameUtil/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会处理 div class="js_compFrameUtil"</h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace   JC
 * @class       FrameUtil
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-04-26
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.FrameUtil 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window ), FU;

    JC.FrameUtil = FU = {
        noticeSize:
            function( _ms, _type ){
                typeof _ms == 'undefined' && ( _ms = 1000 );
                _type = FU.type( _type );
                if( !_type ) return FU;
                if( ! FU.parent() ) return FU;
                var _ext = { 'type': _type };

                FU.parent().jEventHost.trigger( 'size', [ FU.getInfo( _ext ) ] );
                _ms
                    && setInterval( function(){
                        FU.parent().jEventHost.trigger( 'size', [ FU.getInfo( _ext ) ] );
                    }, _ms );

                return FU;
            }

        , subscribeEvent:
            function( _name, _cb ){
                if( !_name ) return FU;
                $( FU.eventHost ).on( _name, _cb );
                return FU;
            }

        , noticeData:
            function( _data, _type ){
                _type = FU.type( _type );
                if( !(_data && _type ) ) return FU;
                if( !FU.parent() ) return FU;

                FU.parent().jEventHost.trigger( 'data', FU.getInfo( { 'data': _data, 'type': _type } ) );
                return FU;
            }

        , noticeClose:
            function( _type ){
                _type = FU.type( _type );
                FU.parent().jEventHost.trigger( 'close', FU.getInfo( { 'type': _type } ) );
                return FU;
            }

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
                        'win': window.parent
                        , 'jwin': window.parent.$( window.parent )
                        , '$': window.parent.$
                        , 'JC': window.parent.JC
                        , 'FrameUtil': window.parent.JC.FrameUtil
                        , 'eventHost': window.parent.JC.FrameUtil.eventHost
                        , 'jEventHost': window.parent.$( window.parent.JC.FrameUtil.eventHost )
                    };
                }

                return _r;
            }
       
        , getInfo:
            function( _ext ){
                var _body = $( document.body )
                    , _r = { 
                        '$': $
                        , 'width': document.documentElement.offsetWidth
                        , 'height': document.documentElement.offsetHeight
                        , 'bodyWidth': _body.width()
                        , 'bodyHeight': _body.height()
                    };

                _ext && ( _r = JC.f.extendObject( _r, _ext ) );

                return _r;
            }

        , type:
            function( _type, _plus ){
                if( !_type ){
                    _type = JC.f.getUrlParam( 'jsAction' );
                    _type && _plus && ( _type += _plus );
                }
                return _type;
            }

        , eventHost: {}
    };

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
