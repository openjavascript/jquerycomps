 ;(function(define, _win) { 'use strict'; define( [ 'JC.SelectorMVC' ], function(){
/**
 * 数值加减
 * <br />响应式初始化
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.SelectorMVC.html'>JC.SelectorMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.NumericStepper.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.NumericStepper/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会处理 (div|span) class="js_compNumericStepper"</h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *<dl>
 *    <dt>cnsMinusButton = selector</dt>
 *    <dd>减少数值的 selector<dd>
 *
 *    <dt>cnsPlusButton = selector</dt>
 *    <dd>增加数值的 selector<dd>
 *
 *    <dt>cnsTarget = selector</dt>
 *    <dd>目标文本框的 selector</dd>
 *
 *    <dt>cnsChangeCb = function</dt>
 *    <dd>内容改变后的回调
<pre>function cnsChangeCb( _newVal, _oldVal, _ins ){
    var _ipt = $(this);
    JC.log( 'cnsChangeCb: ', _newVal, _oldVal );
}</pre>
 *    </dd>
 *
 *    <dt>cnsBeforeChangeCb = function</dt>
 *    <dd>内容改变前的回调, 如果显式返回 false 将终止内容变更
<pre>function cnsBeforeChangeCb( _newVal, _oldVal, _ins ){
    var _ipt = $(this);
    JC.log( 'cnsBeforeChangeCb: ', _newVal, _oldVal );
    if( _newVal > 5 ) return false;
}</pre>
 *    </dd>
 *</dl> 
 *<h2>textbox 可用的 HTML attribute</h2>
 *<dl>
 *    <dt>minvalue = number</dt>
 *    <dd>最小值</dd>
 *
 *    <dt>maxvalue = number</dt>
 *    <dd>最大值</dd>
 *
 *    <dt>step = number, default = 1</dt>
 *    <dd>每次变更的步长</dd>
 *
 *    <dt>fixed = int, default = 0</dt>
 *    <dd>显示多少位小数点</dd>
 *</dl>
 *
 * @namespace   JC
 * @class       NumericStepper
 * @extends     JC.SelectorMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-01-18
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.NumericStepper 示例</h2>
        <span class="js_compNumericStepper"
            cnsMinusButton="|button:first"
            cnsPlusButton="|button:last"
            cnsTarget="|input[type=text]"
            cnsChangeCb="cnsChangeCb"
            >
            <button type="button" class="cnsIcon cnsMinus"></button>
            <input type="text" value="0" class="ipt" minvalue="0" maxvalue="10" />
            <button type="button" class="cnsIcon cnsPlus"></button>
        </span>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.NumericStepper = NumericStepper;

    function NumericStepper( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.SelectorMVC.getInstance( _selector, NumericStepper ) ) 
            return JC.SelectorMVC.getInstance( _selector, NumericStepper );

        JC.SelectorMVC.getInstance( _selector, NumericStepper, this );

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
    /**
     * 按下鼠标时 重复执行的频率
     * @property    redoMs
     * @type        ms
     * @default     100
     * @static
     */
    NumericStepper.redoMs = 100;
    /**
     * 按下鼠标时 延迟 多少毫秒执行重复执行
     * @property    timeoutMs
     * @type        ms
     * @default     100
     * @static
     */
    NumericStepper.timeoutMs = 500;

    NumericStepper.defaultMouseUp =
        function( _evt ){
            if( !NumericStepper._currentIns ) return;
            JC.f.safeTimeout( null, NumericStepper._currentIns._model.cnsTarget(), NumericStepper.Model.REDO_TM_NAME );
            NumericStepper.Model.interval && clearInterval( NumericStepper.Model.interval );
        };
    NumericStepper._currentIns;

    JC.SelectorMVC.build( NumericStepper );

    JC.f.extendObject( NumericStepper.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'NumericStepper _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p._model.cnsMinusButton() 
                    && ( _p._model.cnsMinusButton().on( 'mousedown', function( _evt ){

                        NumericStepper._currentIns = _p;
                        _p.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_MINUS ] );

                        JC.f.safeTimeout( function(){
                            NumericStepper.Model.interval && clearInterval( NumericStepper.Model.interval );
                            NumericStepper.Model.interval =
                                setInterval( function(){
                                    _p.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_MINUS ] );
                                }, _p._model.cnsRedoMs() );
                        }, _p._model.cnsTarget(), NumericStepper.Model.REDO_TM_NAME, _p._model.cnsTimeoutMs() );

                        _jwin.on( 'mouseup', NumericStepper.defaultMouseUp );
                    }), _p._model.cnsMinusButton().each( function(){ 
                        SelectorMVC.getInstance( $( this ), NumericStepper, _p );
                    } ) );

                _p._model.cnsPlusButton() 
                    && ( _p._model.cnsPlusButton().on( 'mousedown', function( _evt ){

                        NumericStepper._currentIns = _p;
                        _p.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_PLUS ] );

                        JC.f.safeTimeout( function(){
                            NumericStepper.Model.interval && clearInterval( NumericStepper.Model.interval );
                            NumericStepper.Model.interval =
                                setInterval( function(){
                                    _p.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_PLUS ] );
                                }, _p._model.cnsRedoMs() );
                        }, _p._model.cnsTarget(), NumericStepper.Model.REDO_TM_NAME, _p._model.cnsTimeoutMs() );

                        _jwin.on( 'mouseup', NumericStepper.defaultMouseUp );
                    }), _p._model.cnsPlusButton().each( function(){ 
                        SelectorMVC.getInstance( $( this ), NumericStepper, _p );
                    } ) );

                _p.on( NumericStepper.Model.CALC, function( _evt, _type ){
                    if( !( _p._model.cnsTarget() && _p._model.cnsTarget().length ) ) return;
                    //JC.log( 'NumericStepper.Model.CALC', _type );
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

                    //JC.log( _p._model.isMaxvalue(), _newVal, _val, _step, _fixed, _minvalue, _minvalue, new Date().getTime() );
                    if( _newVal === _val ) return;

                    if( _p._model.cnsBeforeChangeCb() 
                            && _p._model.cnsBeforeChangeCb().call( _p._model.cnsTarget(), _newVal, _val, _p ) === false ) return;

                    _p._model.cnsTarget().val( JC.f.parseFinance( _newVal, _fixed ).toFixed( _fixed ) );

                    _p._model.cnsChangeCb() 
                        && _p._model.cnsChangeCb().call( _p._model.cnsTarget(), _newVal, _val, _p )
                        ;
                });
            }

        , _inited:
            function(){
                //JC.log( 'NumericStepper _inited', new Date().getTime() );
                this._view.initStyle();
            }
        /**
         * 增加一个 step
         * @method  plus
         */
        , plus: 
            function(){
                this.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_PLUS ] );
                return this;
            }
        /**
         * 减少一个 step
         * @method  minus
         */
        , minus:
            function(){
                this.trigger( NumericStepper.Model.CALC, [ NumericStepper.Model.CALC_MINUS ] );
                return this;
            }
    });

    NumericStepper.Model._instanceName = 'JCNumericStepper';

    NumericStepper.Model.CALC = 'calc';
    NumericStepper.Model.CALC_MINUS = 'minus';
    NumericStepper.Model.CALC_PLUS = 'plus';

    NumericStepper.Model.CLASS_ICON = 'cnsIcon';
    NumericStepper.Model.CLASS_MINUS = 'cnsMinus';
    NumericStepper.Model.CLASS_PLUS = 'cnsPlus';

    NumericStepper.Model.REDO_TM_NAME = "cnsTm";

    JC.f.extendObject( NumericStepper.Model.prototype, {
        init:
            function(){
                //JC.log( 'NumericStepper.Model.init:', new Date().getTime() );
            }

        , cnsTarget: function(){ return this.selectorProp( 'cnsTarget' ); }

        , cnsMinusButton: function(){ return this.selectorProp( 'cnsMinusButton' ); }
        , cnsPlusButton: function(){ return this.selectorProp( 'cnsPlusButton' ); }

        , cnsBeforeChangeCb: function(){ return this.callbackProp( 'cnsBeforeChangeCb' ) || NumericStepper.beforeChangeCb; }
        , cnsChangeCb: function(){ return this.callbackProp( 'cnsChangeCb' ) || NumericStepper.changeCb; }

        , cnsRedoMs: function(){ return this.intProp( 'cnsRedoMs' ) || NumericStepper.redoMs; }
        , cnsTimeoutMs: function(){ return this.intProp( 'cnsTimeoutMs' ) || NumericStepper.timeoutMs; }

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
        var _p = $( this ), _ins = JC.SelectorMVC.getInstance( _p, NumericStepper );
        !_ins && ( new NumericStepper( _p ) );
    });

    $( document ).delegate( 'div.js_compNumericStepper .cnsIcon, span.js_compNumericStepper .cnsIcon', 'click', function( _evt ){
        var _p = $( this ), _ins = JC.SelectorMVC.getInstance( _p, NumericStepper );

        if( !_ins ){
            var _pnt = JC.f.getJqParent( _p, '.js_compNumericStepper' );
            if( !( _pnt && _pnt.length ) ) return;
            _ins = new NumericStepper( _pnt );
            _p.hasClass( 'cnsPlus' ) ? _ins.plus() : _ins.minus();
        }
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
