;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
;(function($){
    Bizs.BizExampleMoreAdvance = BizExampleMoreAdvance;

    function BizExampleMoreAdvance( _selector ){

        if( BizExampleMoreAdvance.getInstance( _selector ) ) return BizExampleMoreAdvance.getInstance( _selector );
        BizExampleMoreAdvance.getInstance( _selector, this );

        this._model = new BizExampleMoreAdvance.Model( _selector );
        this._view = new BizExampleMoreAdvance.View( this._model );

        this._init();
    }
    /**
     * 获取或设置 BizExampleMoreAdvance 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {BizExampleMoreAdvanceInstance}
     */
    BizExampleMoreAdvance.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( BizExampleMoreAdvance.Model._instanceName, _setter );

            return _selector.data( BizExampleMoreAdvance.Model._instanceName );
        };
    /**
     * 初始化可识别的 BizExampleMoreAdvance 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of BizExampleMoreAdvanceInstance}
     */
    BizExampleMoreAdvance.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( '.js_bizBizExampleMoreAdvance' )  ){
                    _r.push( new BizExampleMoreAdvance( _selector ) );
                }else{
                    _selector.find( 'div.js_bizBizExampleMoreAdvance' ).each( function(){
                        _r.push( new BizExampleMoreAdvance( this ) );
                    });
                }
            }
            return _r;
        };


    BizExampleMoreAdvance.prototype = {
        _beforeInit:
            function(){
                JC.log( 'BizExampleMoreAdvance _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
            }
        , _inited:
            function(){
                JC.log( 'BizExampleMoreAdvance _inited', new Date().getTime() );
            }
    };

    BaseMVC.buildModel( BizExampleMoreAdvance );
    BizExampleMoreAdvance.Model._instanceName = 'BizExampleMoreAdvance';
    BizExampleMoreAdvance.Model.prototype = {
        init:
            function(){
                JC.log( 'BizExampleMoreAdvance.Model.init:', new Date().getTime() );
            }
    };

    BaseMVC.buildView( BizExampleMoreAdvance );
    BizExampleMoreAdvance.View.prototype = {
        init:
            function(){
                JC.log( 'BizExampleMoreAdvance.View.init:', new Date().getTime() );
            }
    };

    BaseMVC.build( BizExampleMoreAdvance, 'Bizs' );

    $(document).ready( function(){
        var _insAr = 0;
        BizExampleMoreAdvance.autoInit
            && ( _insAr = BizExampleMoreAdvance.init() )
            && $( '<h2>BizExampleMoreAdvance total ins: ' + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

}(jQuery));
});}(typeof define === 'function' && define.amd ? define : function (_require, _cb) { _cb && _cb(); }, this));

