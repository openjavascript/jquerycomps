 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.NumericStepper.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.NumericStepper/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会处理 (div|span) class="js_compNumericStepper"</h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace   JC
 * @class       NumericStepper
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-01-18
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.NumericStepper 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.NumericStepper = NumericStepper;

    function NumericStepper( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, NumericStepper ) ) 
            return JC.BaseMVC.getInstance( _selector, NumericStepper );

        JC.BaseMVC.getInstance( _selector, NumericStepper, this );

        this._model = new NumericStepper.Model( _selector );
        this._view = new NumericStepper.View( this._model );

        this._init();

        JC.log( NumericStepper.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 NumericStepper 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of NumericStepperInstance}
     */
    NumericStepper.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compNumericStepper' )  ){
                    _r.push( new NumericStepper( _selector ) );
                }else{
                    _selector.find( 'div.js_compNumericStepper, span.js_compNumericStepper' ).each( function(){
                        _r.push( new NumericStepper( this ) );
                    });
                }
            }
            return _r;
        };

    NumericStepper.redoMs = 100;

    JC.BaseMVC.build( NumericStepper );

    JC.f.extendObject( NumericStepper.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'NumericStepper _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p._model.cnsMinusButton() 
                    && _p._model.cnsMinusButton().on( 'mousedown', function( _evt ){
                        _p.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_MINUS ] );

                        JC.f.safeTimeout( function(){
                            NumericStepper.Model.interval && clearInterval( NumericStepper.Model.interval );
                            NumericStepper.Model.interval =
                                setInterval( function(){
                                    _p.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_MINUS ] );
                                }, 100 );
                        }, _p._model.cnsTarget(), 'CNS_TM', 500 );
                    })
                    && _p._model.cnsMinusButton().on( 'mouseup', function( _evt ){
                        JC.f.safeTimeout( null, _p._model.cnsTarget(), 'CNS_TM' );
                        NumericStepper.Model.interval && clearInterval( NumericStepper.Model.interval );
                    })
                    ;

                _p._model.cnsPlusButton() 
                    && _p._model.cnsPlusButton().on( 'mousedown', function( _evt ){
                        _p.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_PLUS ] );

                        JC.f.safeTimeout( function(){
                            NumericStepper.Model.interval && clearInterval( NumericStepper.Model.interval );
                            NumericStepper.Model.interval =
                                setInterval( function(){
                                    _p.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_PLUS ] );
                                }, 100 );
                        }, _p._model.cnsTarget(), 'CNS_TM', 500 );

                    })
                    && _p._model.cnsPlusButton().on( 'mouseup', function( _evt ){
                        JC.f.safeTimeout( null, _p._model.cnsTarget(), 'CNS_TM' );
                        NumericStepper.Model.interval && clearInterval( NumericStepper.Model.interval );
                    })
                    ;

                _p.on( NumericStepper.Model.CALC, function( _evt, _type ){
                    if( !( _p._model.cnsTarget() && _p._model.cnsTarget().length ) ) return;
                    JC.log( 'NumericStepper.Model.CALC', _type );
                    var _val = _p._model.val()
                        , _newVal = _val
                        , _step = _p._model.step()
                        , _fixed = _p._model.fixed()
                        , _minvalue = _p._model.minvalue()
                        , _maxvalue = _p._model.maxvalue()
                        ;

                    switch( _type ){
                        case NumericStepper.Model.CALC_MINUS:
                            _newVal -= _step;

                            _p._model.isMinvalue() 
                                && _newVal < _minvalue
                                && ( _newVal = _minvalue )
                                ;
                            break;

                        case NumericStepper.Model.CALC_PLUS:
                            _newVal += _step;

                            _p._model.isMaxvalue() 
                                && _newVal > _maxvalue 
                                && ( _newVal = _maxvalue )
                                ;
                            break;
                    }

                    JC.log( _p._model.isMaxvalue(), _newVal, _val, _step, _fixed, _minvalue, _minvalue, new Date().getTime() );

                    _p._model.cnsTarget().val( JC.f.parseFinance( _newVal, _fixed ).toFixed( _fixed ) );
                });
            }

        , _inited:
            function(){
                //JC.log( 'NumericStepper _inited', new Date().getTime() );
                this._view.initStyle();
            }
    });

    NumericStepper.Model._instanceName = 'JCNumericStepper';

    NumericStepper.Model.CALC = 'calc';
    NumericStepper.Model.CALC_MINUS = 'minus';
    NumericStepper.Model.CALC_PLUS = 'plus';

    NumericStepper.Model.CLASS_ICON = 'cnsIcon';
    NumericStepper.Model.CLASS_MINUS = 'cnsMinus';
    NumericStepper.Model.CLASS_PLUS = 'cnsPlus';

    JC.f.extendObject( NumericStepper.Model.prototype, {
        init:
            function(){
                //JC.log( 'NumericStepper.Model.init:', new Date().getTime() );
            }

        , cnsTarget: function(){ return this.selectorProp( 'cnsTarget' ); }

        , cnsMinusButton: function(){ return this.selectorProp( 'cnsMinusButton' ); }
        , cnsPlusButton: function(){ return this.selectorProp( 'cnsPlusButton' ); }

        , cnsBeforeChangeCb: function(){ return this.selectorProp( 'cnsBeforeChangeCb' ); }
        , cnsChangeCb: function(){ return this.selectorProp( 'cnsChangeCb' ); }

        , isMinvalue: function(){ return this.cnsTarget().is( '[minvalue]' ); }
        , isMaxvalue: function(){ return this.cnsTarget().is( '[maxvalue]' ); }

        , val: function(){ return this.getVal( this.cnsTarget().val() ); }

        , minvalue: function(){ return this.getVal( this.cnsTarget().attr( 'minvalue' ) ); }
        , maxvalue: function(){ return this.getVal( this.cnsTarget().attr( 'maxvalue' ) ); }

        , step: function(){ return this.getVal( this.cnsTarget().attr( 'step' ) ) || 1; }
        , fixed: function(){ return this.getVal( this.cnsTarget().attr( 'fixed' ) ) || 0; }

        , getVal: 
            function( _v ){
                var _r = 0;
                _v && ( _v = _v.toString().trim() );

                if( _v ){

                    if( /\./.test( _v ) ){
                        _r = JC.f.parseFinance( _v, _v.split('.')[1].length || this.fixed() );
                    }else{
                        _r = parseInt( _v, 10 ) || 0;
                    }
                }

                return _r;
            }
    });

    JC.f.extendObject( NumericStepper.View.prototype, {
        init:
            function(){
                //JC.log( 'NumericStepper.View.init:', new Date().getTime() );
            }

        , initStyle:
            function(){
                var _p = this;

                _p._model.cnsMinusButton() 
                    && _p._model.cnsMinusButton()
                        .addClass( NumericStepper.Model.CLASS_ICON )
                        .addClass( NumericStepper.Model.CLASS_MINUS )
                    ;

                _p._model.cnsPlusButton() 
                    && _p._model.cnsPlusButton()
                        .addClass( NumericStepper.Model.CLASS_ICON )
                        .addClass( NumericStepper.Model.CLASS_PLUS )
                    ;
            }
    });

    _jdoc.ready( function(){
        //NumericStepper.autoInit && NumericStepper.init();
    });

    $( document ).delegate( 'div.js_compNumericStepper, span.js_compNumericStepper', 'mouseenter', function( _evt ){
        var _p = $( this ), _ins = BaseMVC.getInstance( _p, NumericStepper );
        !_ins && ( new NumericStepper( _p ) );
    });

    return JC.NumericStepper;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
