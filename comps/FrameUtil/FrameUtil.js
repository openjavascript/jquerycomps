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
                if( ! FU.parent() ) return FU;
                var _ext = { 'type': _type };

                $( FU ).data( 'FUI_noticeSize' ) && clearInterval( $( FU ).data( 'FUI_noticeSize' ) );

                FU.parent().jEventHost.trigger( 'size', [ FU.info( _ext ) ] );
                _ms
                    && $(FU).data( 'FUI_noticeSize', setInterval( function(){
                        FU.parent().jEventHost.trigger( 'size', [ FU.info( _ext ) ] );
                    }, _ms ) );

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
                if( !(_data) ) return FU;
                if( !FU.parent() ) return FU;
                _type = FU.type( _type );

                FU.parent().jEventHost.trigger( 'data', FU.info( { 'data': _data, 'type': _type } ) );
                return FU;
            }

        , noticeClose:
            function( _type ){
                _type = FU.type( _type );
                FU.parent().jEventHost.trigger( 'close', FU.info( { 'type': _type } ) );
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
                        , 'id': window.parent.JC.FrameUtil.id()
                    };
                }

                return _r;
            }
       
        , info:
            function( _ext ){
                var _body = $( document.body )
                    , _r = { 
                        '$': $
                        , 'width': document.documentElement.offsetWidth
                        , 'height': document.documentElement.offsetHeight
                        , 'bodyWidth': _body.width()
                        , 'bodyHeight': _body.height()
                        , 'id': FU.id()
                    };

                _ext && ( _r = JC.f.extendObject( _r, _ext ) );

                return _r;
            }
       
        , frameInfo:
            function( _frame, _ext ){
                _frame && ( _frame = $( _frame ) );
                var _r = null;

                if( _frame && _frame.length ){
                    var _cwin = _frame.prop( 'contentWindow' )
                        , _cdoc = _frame.prop( 'contentDocument' )
                        , _type = JC.f.getUrlParam( _frame.attr('src') || '', 'jsAction' ) || _cwin.name || ''
                        ;

                    _r = { 
                        '$': _cwin.$
                        , 'width': _cdoc.documentElement.offsetWidth
                        , 'height': _cdoc.documentElement.offsetHeight
                        , 'bodyWidth': _cdoc.body.offsetWidth
                        , 'bodyHeight': _cdoc.body.offsetHeight
                        , 'win': _cwin
                        , 'doc': _cdoc
                        , 'type': _type
                        , 'id': ''
                    };

                    if( _cwin.JC && _cwin.JC.FrameUtil ){
                        _r.id = _cwin.JC.FrameUtil.id();
                    }

                    _ext && ( _r = JC.f.extendObject( _r, _ext ) );
                }

                return _r;
            }

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

        , eventHost: {}

        , updateChildrenSize:
            function( _frames ){
                _frames && ( _frames = $( _frames ) );
                if( !( _frames && _frames.length ) ) return;
                _frames.each( function(){
                    FU.updateChildSize( $( this ) );
                });
                return FU;
            }

        , updateChildSize:
            function( _frame ){
                _frame && ( _frame = $( _frame ) );
                if( !( _frame && _frame.length ) ) return;
                if( !_frame.is( ':visible' ) ) return;
                var _finfo, _h;
                _finfo = FU.frameInfo( _frame );
                _frame.css( FU.cssFromSizePattern( FU.childSizePattern, _finfo ) );
            }

        , childrenAutoSize:
            function( _frames, _ms ){
                _frames && ( _frames = $( _frames ) );
                if( !( _frames && _frames.length ) ) return;
                typeof _ms == 'undefined' && ( _ms = 1000 );
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

        , childHeightOffset: 100
        , childSizePattern: 1 //1: height, 2: width, 3: height + width

        , id: function(){ return FU._id; }

        , detectChildAutoSize: true

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

        //1: height, 2: width, 3: height + width
        , cssFromSizePattern:
            function( _pattern, _params ){
                var _css = {};
                switch( _pattern ){
                    case 1: _css.height = _params.height; break;
                    case 2: _css.width = _params.width; break;
                    default: 
                       _css.height = _params.height;
                       _css.width = _params.width;
                       break;
                }
                return _css;
            }

    };

    FU._id = location.href + '_' + new Date().getTime();

    JC.f.safeTimeout( function(){

        if( FU.detectChildAutoSize ){
            JC.FrameUtil.subscribeEvent( 'size', function( _evt, _params ){
                var _childFrame = FU.childIdMap( _params.id ), _css;
                if( _childFrame && _childFrame.length ){
                    _childFrame.css( FU.cssFromSizePattern( FU.childSizePattern, _params ) );
                }
            });
        }

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
