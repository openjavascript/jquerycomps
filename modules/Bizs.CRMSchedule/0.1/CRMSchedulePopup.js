;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.CRMSchedulePopup.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.CRMSchedulePopup/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizCRMSchedulePopup" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace   window.Bizs
 * @class       CRMSchedulePopup
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>Bizs.CRMSchedulePopup 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    Bizs.CRMSchedulePopup = CRMSchedulePopup;

    function CRMSchedulePopup( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, CRMSchedulePopup ) ) 
            return JC.BaseMVC.getInstance( _selector, CRMSchedulePopup );

        JC.BaseMVC.getInstance( _selector, CRMSchedulePopup, this );

        this._model = new CRMSchedulePopup.Model( _selector );
        this._view = new CRMSchedulePopup.View( this._model );

        this._init();

        JC.log( CRMSchedulePopup.Model._instanceName, 'all inited', new Date().getTime() );
    }

    JC.BaseMVC.build( CRMSchedulePopup );

    JC.f.extendObject( CRMSchedulePopup.prototype, {
        _beforeInit:
            function(){
                JC.log( 'CRMSchedulePopup _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                });
            }

        , _inited:
            function(){
                JC.log( 'CRMSchedulePopup _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    CRMSchedulePopup.Model._instanceName = 'JCCRMSchedulePopup';
    JC.f.extendObject( CRMSchedulePopup.Model.prototype, {
        init:
            function(){
                JC.log( 'CRMSchedulePopup.Model.init:', new Date().getTime() );
            }
    });

    JC.f.extendObject( CRMSchedulePopup.View.prototype, {
        init:
            function(){
                JC.log( 'CRMSchedulePopup.View.init:', new Date().getTime() );
            }

    });
    return Bizs.CRMSchedulePopup;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
