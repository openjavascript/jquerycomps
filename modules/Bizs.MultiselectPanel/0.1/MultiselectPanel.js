 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Panel' ], function(){
/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href="widnow.jQuery.html">jQuery</a>
 *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.MultiselectPanel.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/Bizs.MultiselectPanel/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizMultiselectPanel" </h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt></dt>
 *      <dd><dd>
 *  </dl> 
 *
 * @namespace   window.Bizs
 * @class       MultiselectPanel
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>Bizs.MultiselectPanel 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    Bizs.MultiselectPanel = MultiselectPanel;

    function MultiselectPanel( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, MultiselectPanel ) ) 
            return JC.BaseMVC.getInstance( _selector, MultiselectPanel );

        JC.BaseMVC.getInstance( _selector, MultiselectPanel, this );

        this._model = new MultiselectPanel.Model( _selector );
        this._view = new MultiselectPanel.View( this._model );

        this._init();

        JC.log( MultiselectPanel.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 MultiselectPanel 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of MultiselectPanelInstance}
     */
    MultiselectPanel.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_bizMultiselectPanel' )  ){
                    _r.push( new MultiselectPanel( _selector ) );
                }else{
                    _selector.find( 'input.js_bizMultiselectPanel, span.js_bizMultiselectPanel' ).each( function(){
                        _r.push( new MultiselectPanel( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( MultiselectPanel );

    JC.f.extendObject( MultiselectPanel.prototype, {
        _beforeInit:
            function(){
                JC.log( 'MultiselectPanel _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                    _p.trigger( 'init_top' );
                });

                var _panel = new JC.Panel( _p._model.panel() );
                    _panel.on( 'close', function( _evt, _panel ){ _panel.hide(); return false; });

                if( _p._model.popupHideButton() ){
                    _panel.offsetTop( -_p.selector().prop( 'offsetHeight' ) - 1 );
                }

                _p.selector().on( 'click', function( _evt ){
                    _panel.show( _p.selector() );
                });

                _p.on( 'init_top', function( _evt ){
                });
            }

        , _inited:
            function(){
                JC.log( 'MultiselectPanel _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    MultiselectPanel.Model._instanceName = 'JCMultiselectPanel';
    JC.f.extendObject( MultiselectPanel.Model.prototype, {
        init:
            function(){
                JC.log( 'MultiselectPanel.Model.init:', new Date().getTime() );
            }

        , url: function(){ return this.attrProp( 'bmspUrl' ); }
        , childUrl: function(){ return this.attrProp( 'bmspChildUrl' ); }
        , panel: function(){ return this.selectorProp( 'bmspPanel'); }
        , popupHideButton: function(){ return this.boolProp( 'bmspPopupHideButton'); }
    });

    JC.f.extendObject( MultiselectPanel.View.prototype, {
        init:
            function(){
                JC.log( 'MultiselectPanel.View.init:', new Date().getTime() );
            }
    });

    _jdoc.ready( function(){
        MultiselectPanel.autoInit && MultiselectPanel.init();
    });

    return Bizs.MultiselectPanel;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
