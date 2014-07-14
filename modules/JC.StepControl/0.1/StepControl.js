 ;(function(define, _win) { 'use strict'; define( [ 'JC.SelectorMVC', 'JC.Valid' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href='JC.Valid.html'>JC.Valid</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.StepControl.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.StepControl/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会处理 div class="js_compStepControl"</h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace   JC
 * @class       StepControl
 * @extends     JC.SelectorMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.StepControl 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.StepControl = StepControl;

    function StepControl( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.SelectorMVC.getInstance( _selector, StepControl ) ) 
            return JC.SelectorMVC.getInstance( _selector, StepControl );

        JC.SelectorMVC.getInstance( _selector, StepControl, this );

        this._model = new StepControl.Model( _selector );
        this._view = new StepControl.View( this._model );

        this._init();

        JC.log( StepControl.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 StepControl 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of StepControlInstance}
     */
    StepControl.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compStepControl' )  ){
                    _r.push( new StepControl( _selector ) );
                }else{
                    _selector.find( 'div.js_compStepControl' ).each( function(){
                        _r.push( new StepControl( this ) );
                    });
                }
            }
            return _r;
        };

    JC.SelectorMVC.build( StepControl );

    JC.f.extendObject( StepControl.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'StepControl _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                    _p.trigger( 'show_index' );
                    _p._model.cscInitedCallback() 
                        && _p._model.cscInitedCallback().call( _p, _p.selector() );
                });

                _p._model.cscItems().each( function( _ix, _item ){
                    _item = $( _item );

                    _item.delegate( '.js_cscNext', 'click', function(){
                        var _trigger = $( this );
                        _p.trigger( 'next_index', [ _item, _trigger ] );
                    });

                    _item.delegate( '.js_cscPrev', 'click', function(){
                        var _trigger = $( this );
                        _p.trigger( 'prev_index', [ _item, _trigger ] );
                    });
                });

                _p.on( 'prev_index', function( _evt, _item, _sp ){
                    JC.log( 'prev_index', JC.f.ts() );
                    var _validCb = _p._model.cscValidCallback( _sp ) || _p._model.cscValidCallback( _item )
                        , _canNext
                        , _newIndex
                        ;

                    _newIndex = _p._model.cscIndex() - 1;
                    if( _newIndex >= 0 ){
                        _p.trigger( 'show_index', [ _p._model.cscIndex( _newIndex ) ] );
                    }
                });

                _p.on( 'next_index', function( _evt, _item, _sp ){
                    if( !( _item ) ) return;
                    JC.log( 'next_index', JC.f.ts() );
                    var _validCb = _p._model.cscValidCallback( _sp ) || _p._model.cscValidCallback( _item )
                        , _canNext
                        , _newIndex
                        , _form
                        ;

                    if( _sp && ( _sp.attr( 'type' ).toLowerCase() == 'button' || _sp.attr( 'type' ).toLowerCase() == 'input' ) ){
                        if( _validCb ){
                            _canNext = _validCb().call( _p, _sp, _item );
                        }else{
                            _canNext = JC.Valid( _item );
                        }
                    }else{
                        _canNext = true;
                    }

                    JC.log( '_canNext', _canNext, JC.f.ts() );

                    if( !_canNext ) return;
                    _newIndex = _p._model.cscIndex() + 1;
                    JC.log( _newIndex, _p._model.maxIndex(), _p._model.cscIndex() );

                    if( _newIndex <= _p._model.maxIndex() ){
                        _p.trigger( 'show_index', [ _p._model.cscIndex( _newIndex ) ] );
                    }
                });

                _p.on( 'show_index', function( _evt, _cix ){
                    var _ix = _p._model.cscIndex()
                        , _items = _p._model.cscItems()
                        , _labels = _p._model.cscLabels()
                        ;
                    typeof _cix != 'undefined' && ( _ix = _cix );

                    _items 
                        && _items.length 
                        && _items.hide().eq( _ix ).show();

                    _labels 
                        && _labels.length 
                        && _labels.removeClass( _p._model.cscActiveClass() ).eq( _ix ).addClass( _p._model.cscActiveClass() );
                });
            }

        , _inited:
            function(){
                //JC.log( 'StepControl _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }

        , prev:
            function(){
                var _p = this, _data = _p._model.current( '.js_cscPrev' );

                if( _data.item ){
                    _p.trigger( 'prev_index', [ _data.item, _data.button ] );
                }

                return this;
            }

        , next:
            function(){
                var _p = this, _data = _p._model.current( '.js_cscNext' );

                if( _data.item ){
                    _p.trigger( 'next_index', [ _data.item, _data.button ] );
                }

                return this;
            }

        , first:
            function(){
                this.trigger( 'show_index', [ this._model.cscIndex( 0 ) ] );
                return this;
            }

        , last:
            function(){
                var _ix;
                this._model.cscItems() && this._model.cscItems().length 
                    && ( _ix = this._model.cscItems().length - 1 );
                typeof _ix != 'undefined' && this.trigger( 'show_index', [ this._model.cscIndex( _ix ) ] );
                return this;
            }
    });

    StepControl.Model._instanceName = 'JCStepControl';
    JC.f.extendObject( StepControl.Model.prototype, {
        init:
            function(){
                //JC.log( 'StepControl.Model.init:', new Date().getTime() );
                var _p = this;

                _p.cscIndex( _p.cscDefaultIndex() || 0 );
            }

        , next:
            function(){
                var _p = this
                    , _ix = this.cscIndex() + 1
                    , _r = { item: null, label: null, button: null, selector: _p.selector() }
                    , _items = _p.cscItems()
                    , _labels = _p.cscLabels()
                    , _tmp
                    ;

                if( _items[ _ix ] ){
                    _r.item = $( _items[ _ix ] );
                    _tmp = _r.item.find( '.js_cscNext' );
                    _tmp.length && ( _r.button = _tmp );
                }

                _labels && _labels.length && _labels[ _ix ] 
                    && ( _r.label = $( _labels[ _ix ] ) );

                return _r;
            }

        , prev:
            function(){
                var _p = this
                    , _ix = this.cscIndex() - 1
                    , _r = { item: null, label: null, selector: _p.selector() }
                    , _items = _p.cscItems()
                    , _labels = _p.cscLabels()
                    ;

                _items[ _ix ] && ( _r.item = $( _items[ _ix ] ) );
                _labels && _labels.length && _labels[ _ix ] 
                    && ( _r.label = $( _labels[ _ix ] ) );

                return _r;
            }

        , current:
            function( _btnSelector ){
                _btnSelector = _btnSelector || '.js_cscNext';
                var _p = this
                    , _ix = this.cscIndex()
                    , _r = { item: null, label: null, button: null, selector: _p.selector() }
                    , _items = _p.cscItems()
                    , _labels = _p.cscLabels()
                    , _tmp
                    ;

                if( _items[ _ix ] ){
                    _r.item = $( _items[ _ix ] );
                    _tmp = _r.item.find( _btnSelector );
                    _tmp.length && ( _r.button = _tmp );
                }

                _labels && _labels.length && _labels[ _ix ] 
                    && ( _r.label = $( _labels[ _ix ] ) );

                return _r;
            }


        , maxIndex: 
            function(){ 
                var _r = this.cscItems().length - 1; 
                _r < 0 && ( _r = 0 );
                return _r;
            }

        , cscIndex:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._cscIndex = _setter );
                return this._cscIndex;
            }
        
        , cscValidCallback: 
            function( _selector ){
                if( !_selector ) return null;
                return this.callbackProp( _selector, 'cscValidCallback' );
            }

        , cscInitedCallback: 
            function(){
                return this.callbackProp( 'cscInitedCallback' );
            }

        , cscItems: function(){ return this.selectorProp( 'cscItems' ); }
        , cscLabels: function(){ return this.selectorProp( 'cscLabels' ); }

        , cscActiveClass: function(){ return this.attrProp( 'cscActiveClass' ); }

        , cscDefaultIndex: function(){ return this.intProp( 'cscDefaultIndex' ) || 0; }
    });

    JC.f.extendObject( StepControl.View.prototype, {
        init:
            function(){
                //JC.log( 'StepControl.View.init:', new Date().getTime() );
            }
    });

    _jdoc.ready( function(){
        setTimeout( function(){ StepControl.autoInit && StepControl.init(); }, 1 );
    });

    return JC.StepControl;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
)
