;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
;(function($){
    window.Bizs = window.Bizs || {};
    Bizs.MoneyTips = MoneyTips;

    function MoneyTips( _selector ){

        if( MoneyTips.getInstance( _selector ) ) return MoneyTips.getInstance( _selector );
        MoneyTips.getInstance( _selector, this );

        this._model = new MoneyTips.Model( _selector );
        this._view = new MoneyTips.View( this._model );

        this._init();
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
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( '.js_bizMoneyTips' )  ){
                    _r.push( new MoneyTips( _selector ) );
                }else{
                    _selector.find( 'div.js_bizMoneyTips' ).each( function(){
                        _r.push( new MoneyTips( this ) );
                    });
                }
            }
            return _r;
        };


    MoneyTips.prototype = {
        _beforeInit:
            function(){
                JC.log( 'MoneyTips _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this; 

                _p._model.selector().on( 'keyup', function( _evt ){
                    var _sp = $(this)
                        , _v = _sp.val().trim()
                        , _number = JC.f.parseFinance( _v )
                        , _formated
                        ;

                    if( isNaN( _number ) || !_number ) {
                        _p._view.update();
                        return;
                    }

                    _formated = JC.f.moneyFormat( _v );
                    _p._view.update( _formated );

                    JC.log( 'xxxxxxxx', _formated );
                });
            }
        , _inited:
            function(){
                JC.log( 'MoneyTips _inited', new Date().getTime() );
            }
    };

    BaseMVC.buildModel( MoneyTips );
    MoneyTips.Model._instanceName = 'MoneyTips';
    MoneyTips.Model.prototype = {
        init:
            function(){
                JC.log( 'MoneyTips.Model.init:', new Date().getTime() );
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
    };

    BaseMVC.buildView( MoneyTips );
    MoneyTips.View.prototype = {
        init:
            function(){
                JC.log( 'MoneyTips.View.init:', new Date().getTime() );
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
                    _p._model.bmtDisplayLabel().html( _val );
                    _p.show();
                }
            }
    };

    BaseMVC.build( MoneyTips, 'Bizs' );

    $(document).ready( function(){
        var _insAr = 0;
        MoneyTips.autoInit
            && ( _insAr = MoneyTips.init() )
            ;
    });

    $(document).delegate( 'input.js_bizMoneyTips', 'focus click', function( _evt ){
        !MoneyTips.getInstance( $(this) )
            && new MoneyTips( $(this) )
            ;
    });

}(jQuery));
    return Bizs.MoneyTips;
});}(typeof define === 'function' && define.amd ? define : function (_require, _cb) { _cb && _cb(); }, this));

