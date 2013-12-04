//TODO: 提供静态格式化方法
//TODO: 提供 页面载入时, 指定 class 进行格式化支持
;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * <h2>金额格式化 业务逻辑</h2>
 * <br/>应用场景
 * <br/>用户在文本框输入金额时, 在指定的 node 显示以逗号分隔的金额
 * <p><b>require</b>: 
 *      <a href='window.jQuery.html'>jQuery</a>
 *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 * </p>
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc2.openjavascript.org/docs_api/classes/window.Bizs.MoneyTips.html' target='_blank'>API docs</a>
 * | <a href='../../modules/Bizs.MoneyTips/0.1/_demo' target='_blank'>demo link</a></p>
 *
 * input[type=text] 需要 添加 class="js_bizMoneyTips"
 * <br />只要带有 class = js_bizMoneyTips 的文本框, 默认会自动初始化 MoneyTips 实例
 *
 * <p>
 *      页面载入时, Bizs.MoneyTips 会对 span.js_bmtLabel, label.js_bmtLabel 进行自动格式化
 * </p>
 *
 * <h2>可用的 HTML 属性</h2>
 * <dl>
 *      <dt>bmtDisplayLabel = selector, default = span</dt>
 *      <dd>
 *          指定显示 格式化金额的 node, 如果没有显式指定 node, 那么将会动态生成一个用于显示的 span
 *      </dd>
 *
 *      <dt>bmtPattern = string, default = {0}</dt>
 *      <dd>
 *          用于显示格式化金额的显示内容, {0} = 金额占位符
 *          <br />example: &lt;input type="text" class="js_bizMoneyTips" bmtPattern="格式化金额: {0}" />
 *      </dd>
 * </dl>
 *
 * @namespace   window.Bizs
 * @class       MoneyTips
 * @extends     JC.BaseMVC
 * @constructor
 * @version dev 0.1 2013-11-21
 * @author  qiushaowei   <suches@btbtd.org> | 75 Team
 *
 * @example
        <div>
            金额: <input type="text" value="6543.21" 
            datatype="n-12.2" class="js_bizMoneyTips" bmtDisplayLabel="/span.js_bmtSpan" />
            <em class="error"></em>
            <span class="js_bmtSpan"></span>
        </div>
 */
;(function($){
    window.Bizs = window.Bizs || {};
    Bizs.MoneyTips = MoneyTips;

    function MoneyTips( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( MoneyTips.getInstance( _selector ) ) return MoneyTips.getInstance( _selector );
        MoneyTips.getInstance( _selector, this );

        this._model = new MoneyTips.Model( _selector );
        this._view = new MoneyTips.View( this._model );

        this._init();

        JC.log( 'MoneyTips inited', new Date().getTime() );
    }
    /**
     * 获取或设置 MoneyTips 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {MoneyTipsInstance}
     */
    MoneyTips.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( MoneyTips.Model._instanceName, _setter );

            return _selector.data( MoneyTips.Model._instanceName );
        };
    /**
     * 初始化可识别的 MoneyTips 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of MoneyTipsInstance}
     */
    MoneyTips.init =
        function( _selector, _outget ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( '.js_bizMoneyTips' )  ){
                    _r.push( new MoneyTips( _selector ) );
                }else{
                    _selector.find( 'input.js_bizMoneyTips' ).each( function(){
                        _r.push( new MoneyTips( $(this) ) );
                    });
                }
            }
            return _r;
        };
    /**
     * 格式化 node 的 value/html
     * @method  format
     * @param   {selector}      _selector
     * @param   {selector}      _outputSelector     指定显示格式化内容的 node, 默认为 selector 本身
     *                                              <br />, 还可以通过 html 属性 bmtFormatOutput 指定单独的 _outputSelector
     * @static
     * @return  _selector
     */
    MoneyTips.format = 
        function( _selector, _outputSelector ){
            _selector && ( _selector = $( _selector ) );
            _outputSelector && ( _outputSelector = $( _outputSelector ) );
            if( !( _selector && _selector.length ) ) return;
            _selector.each( function(){
                var _item = $(this)
                    , _v
                    , _subOutputSelector = JC.f.parentSelector( _item, _item.attr( 'bmtFormatOutput' ) )
                    ;
                !( _subOutputSelector && _subOutputSelector.length ) && ( _subOutputSelector = _item );
                _outputSelector && _outputSelector.length && ( _subOutputSelector = _outputSelector );
                !( _subOutputSelector && _subOutputSelector.length ) && ( _subOutputSelector = _item );

                if( 'value' in this ){
                    _v = _item.val().trim();
                }else{
                    _v = _item.html().trim();
                }

                if( 'value' in _subOutputSelector[0] ){
                    _subOutputSelector.val( JC.f.moneyFormat( _v ) );
                }else{
                    _subOutputSelector.html( JC.f.moneyFormat( _v ) );
                }
            });

            return _selector;
        };

    MoneyTips.prototype = {
        _beforeInit:
            function(){
                //JC.log( 'MoneyTips _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this; 

                _p._model.selector().on( 'focus blur ', function( _evt ){
                    JC.log( 'focus or blur', new Date().getTime() );
                    _p.trigger( 'BMTUpdate', [ _p._model.selector().val().trim() ] );
                });

                _p._model.selector().bind( 'input propertychange', function( _evt ){
                    JC.log( 'input or propertychange', new Date().getTime() );
                    _p.trigger( 'BMTUpdate', [ _p._model.selector().val().trim() ] );
                });

                _p.on( 'BMTUpdate', function( _evt, _number ){
                    var _v = _number
                        , _number = JC.f.parseFinance( _v )
                        , _formated
                        ;

                    if( isNaN( _number ) || !_number ) {
                        _p._view.update();
                        return;
                    }

                    _formated = JC.f.moneyFormat( _v );
                    _p._view.update( _formated );
                });
            }
        , _inited:
            function(){
                //JC.log( 'MoneyTips _inited', new Date().getTime() );
                var _p = this;
                _p.trigger( 'BMTUpdate', [ _p._model.selector().val().trim() ] );
            }
        /**
         * 更新 tips 的值
         * @method update
         * @param   {int|string}    _val
         */
        , update:
            function( _val ){
                this.trigger( 'BMTUpdate', [ _val || '' ] );
                return this;
            }
    };

    BaseMVC.buildModel( MoneyTips );
    MoneyTips.Model._instanceName = 'MoneyTips';
    MoneyTips.Model.prototype = {
        init:
            function(){
                //JC.log( 'MoneyTips.Model.init:', new Date().getTime() );
            }
        
        , bmtDisplayLabel:
            function(){
                this._bmtDisplayLabel = this._bmtDisplayLabel || this.selectorProp( 'bmtDisplayLabel' );

                if( !( this._bmtDisplayLabel && this._bmtDisplayLabel.length ) ){
                    this._bmtDisplayLabel = $( '<span class="js_bmtSpan"></span>' );
                    this.selector().after( this._bmtDisplayLabel );
                }

                return this._bmtDisplayLabel; 
            }

        , bmtPattern:
            function(){
                var _r = this.attrProp( 'bmtPattern' ) || '{0}';
                return _r;
            }
    };

    BaseMVC.buildView( MoneyTips );
    MoneyTips.View.prototype = {
        init:
            function(){
                //JC.log( 'MoneyTips.View.init:', new Date().getTime() );
            }

        , show:
            function(){
                this._model.bmtDisplayLabel().show();
            }

        , hide:
            function(){
                this._model.bmtDisplayLabel().hide();
            }

        , update:
            function( _val ){
                var _p = this;
                if( !_val ){
                    _p.hide();
                }else{
                    _p._model.bmtDisplayLabel().html( JC.f.printf( _p._model.bmtPattern(), _val ) );
                    _p.show();
                }
            }
    };

    BaseMVC.build( MoneyTips, 'Bizs' );

    $(document).ready( function(){
        var _insAr = 0;
        MoneyTips.autoInit
            && ( _insAr = MoneyTips.init() )
            && MoneyTips.format( $( 'span.js_bmtLabel, label.js_bmtLabel' ) )
            ;
    });

    $(document).delegate( 'input.js_bizMoneyTips', 'focus click', function( _evt ){
        !MoneyTips.getInstance( $(this) )
            && new MoneyTips( $(this) )
            ;
    });

}(jQuery));
    return Bizs.MoneyTips;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
