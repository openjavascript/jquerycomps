;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
    var _jdoc = $( document ), _jwin = $( window );

    Bizs.BizExample = BizExample;

    function BizExample( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, BizExample ) ) 
            return JC.BaseMVC.getInstance( _selector, BizExample );

        JC.BaseMVC.getInstance( _selector, BizExample, this );

        this._model = new BizExample.Model( _selector );
        this._view = new BizExample.View( this._model );

        this._init();

        JC.log( BizExample.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 BizExample 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of BizExampleInstance}
     */
    BizExample.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_bizBizExample' )  ){
                    _r.push( new BizExample( _selector ) );
                }else{
                    _selector.find( 'div.js_bizBizExample' ).each( function(){
                        _r.push( new BizExample( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( BizExample );

    BizExample.Model._instanceName = 'JCBizExample';

    _jdoc.ready( function(){
        var _insAr = 0;
        BizExample.autoInit
            && ( _insAr = BizExample.init() )
            && $( '<h2>BizExample total ins: ' 
                + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

    return Bizs.BizExample;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
