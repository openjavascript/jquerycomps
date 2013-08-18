//TODO: 添加回调处理
//TODO: 添加 IE6 支持
//TODO: 添加值运动 
//TODO: 完善注释
;(function($){
    window.Fixed = JC.Fixed = Fixed;
    /**
     * 内容固定于屏幕某个位置显示
     * <dl>
     *      <dd><b>require</b>: <a href='window.jQuery.html'>jQuery</a></dd>
     *      <dd><b>require</b>: <a href='.window.html#property_$.support.isFixed'>$.support.isFixed</a></dd>
     * </dl>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Fixed.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Fixed/_demo' target='_blank'>demo link</a></p>
     * @namespace JC
     * @class Fixed
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     * @date    2013-08-18
     * @example
     */
    function Fixed( _selector ){
        if( Fixed.getInstance( _selector ) ) return Fixed.getInstance( _selector );
        Fixed.getInstance( _selector, this );

        this._model = new Model( _selector );
        this._view = new View( this._model );

        this._init();
    }
    
    Fixed.prototype = {
        _init:
            function(){
                $( [ this._view, this._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ this._view, this._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = sliceArgs( arguments ); _data.shift(); _data.shift();
                    _p.trigger( _evtName, _data );
                });

                this._model.init();
                this._view.init();

                JC.log('Fixed init:', new Date().getTime() );

                return this;
            }    
        /**
         * 显示 Fixed
         * @method  show
         * @return  FixedIns
         */
        , show: function(){ this._view.show(); return this; }
        /**
         * 隐藏 Fixed
         * @method  hide
         * @return  FixedIns
         */
        , hide: function(){ this._view.hide(); return this; }
        /**
         * 获取 Fixed 外观的 选择器
         * @method  layout
         * @return  selector
         */
        , layout: function(){ return this._model.layout(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  FixedIns
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  FixedIns
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    }
    /**
     * 获取或设置 Fixed 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {Fixed instance}
     */
    Fixed.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'FixedIns', _setter );

            return _selector.data('FixedIns');
        };
    /**
     * 页面加载完毕时, 是否自动初始化
     * <br /> 识别 class=js_autoFixed
     * @property    autoInit
     * @type        bool
     * @default     true
     * @static
     */
    Fixed.autoInit = true;
    /**
     * 滚动的持续时间( 时间运动 )
     * @property    durationms
     * @type        int
     * @default     300
     * @static
     */
    Fixed.durationms = 300;
    /**
     * 每次滚动的时间间隔( 时间运动 )
     * @property    stepms
     * @type        int
     * @default     3
     * @static
     */
    Fixed.stepms = 3;
    /**
     * 设置或者清除 interval
     * <br />避免多个 interval 造成的干扰
     * @method  interval
     * @param   {interval}      _interval
     * @static
     */
    Fixed.interval =
        function( _interval ){
            Fixed._interval && clearInterval( Fixed._interval );
            _interval && ( Fixed._interval = _interval );
        };
    
    function Model( _layout ){
        this._layout = _layout;
    }
    
    Model.prototype = {
        init:
            function(){
                return this;
            }

        , isFixedTop: function(){ return this._layout.is('[fixedtop]'); }
        , isFixedRight: function(){ return this._layout.is('[fixedright]'); }
        , isFixedBottom: function(){ return this._layout.is('[fixedbottom]'); }
        , isFixedLeft: function(){ return this._layout.is('[fixedleft]'); }

        , fixedtop: function(){ return parseInt( this._layout.attr('fixedtop'), 10 ); }
        , fixedright: function(){ return parseInt( this._layout.attr('fixedright'), 10 ); }
        , fixedbottom: function(){ return parseInt( this._layout.attr('fixedbottom'), 10 ); }
        , fixedleft: function(){ return parseInt( this._layout.attr('fixedleft'), 10 ); }
        , fixeddurationms: 
            function( _fixedSelector ){ 
                var _r;

                this.layout().is('[fixeddurationms]')
                    && ( _r = parseInt( this.layout().attr('fixeddurationms') ) )

                _fixedSelector.is('[fixeddurationms]')
                    && ( _r = parseInt( _fixedSelector.attr('fixeddurationms') ) )

                typeof _r == 'undefined' && ( _r = Fixed.durationms );
                isNaN( _r ) && ( _r = Fixed.durationms );
                
                return _r;
            }

        , fixedstepms: 
            function( _fixedSelector ){ 
                var _r;

                this.layout().is('[fixedstepms]')
                    && ( _r = parseInt( this.layout().attr('fixedstepms') ) )

                _fixedSelector.is('[fixedstepms]')
                    && ( _r = parseInt( _fixedSelector.attr('fixedstepms') ) )

                typeof _r == 'undefined' && ( _r = Fixed.stepms );
                isNaN( _r ) && ( _r = Fixed.stepms );

                return _r;
            }

        , fixedmoveto: 
            function( _item ){ 
                var _r = '';
                _item 
                    && ( _item = $( _item ) ) 
                    && _item.length 
                    && ( _r = _item.attr('fixedmoveto') || '' );
                return _r.trim();
            }
        , moveToItem: 
            function(){ 
                var _r = this.layout().is('[fixedmoveto]') ? this.layout() : null, _tmp;
                if( !_r ){
                    ( _tmp = this._layout.find('[fixedmoveto]') ).length && ( _r = _tmp );
                }
                return _r; 
            }

        , layout: function(){ return this._layout; }

        , fixedmoveeffect:
            function(){
                var _r = true, _moveItem = this.moveToItem();

                _moveItem && _moveItem.length 
                    && _moveItem.is( '[fixedmoveeffect]' )
                    && ( _r = parseBool( _moveItem.attr('fixedmoveeffect') ) )
                    ;

                return _r;
            }
    };
    
    function View( _model ){
        this._model = _model;
    }
    
    View.prototype = {
        init:
            function() {

                $.support.isFixed ? this._initFixedSupport() : this._initFixedUnsupport();

                this._initMoveTo();
                this._model.layout().show();

                return this;
            }

        , _initMoveTo:
            function(){
                var _p = this, _moveItem = _p._model.moveToItem();
                if( !( _moveItem && _moveItem.length ) ) return;

                _moveItem.on( 'click', function( _evt ){
                    var _sp = $(this), _moveVal = _p._model.fixedmoveto( _sp ).toLowerCase();
                    //JC.log( '_moveItem click:', _moveVal, new Date().getTime() );
                    _p._processMoveto( _moveVal, _sp );
                });

                $(window).on('resize', function(){
                    Fixed.interval();
                });

                mousewheelEvent( function mousewheel( _evt ){ Fixed.interval(); });
            }

        , _processMoveto:
            function( _moveVal, _moveItem ){
                if( !_moveVal ) return;

                var _p = this
                    , _end = parseInt( _moveVal, 10 )
                    , _docHeight = $(document).height()
                    , _max = _docHeight - $(window).height()
                    , _begin = $(document).scrollTop()
                    , _count = _begin, _tmpCount = 0
                    , _isUp, _endVal, _beginVal, _tmp
                    ;
                if( isNaN( _end ) ){
                    //JC.log( 'isNaN:', _end );
                    switch( _moveVal ){
                        case 'top':
                            {
                                _end = 0;
                                break;
                            }
                        case 'bottom':
                            {
                                _end = _max;
                                //JC.log( 'bottom' );
                                break;
                            }
                        default:
                            {
                                _tmp = $( _moveVal );
                                if( _tmp.length ){
                                    _end = _tmp.offset().top;
                                }
                                break;
                            }
                    }
                }
                ( isNaN( _end ) || _end < 0 ) && ( _end = 0 );
                _end > _max && ( _end = _max );

                //JC.log( _moveVal, _begin, _end );

                if( _begin == _end ) return;

                _isUp = _end < _begin ? true : false;
                _endVal = _begin > _end ? _begin : _end;
                _beginVal = _begin > _end ? _end : _begin;

                /*
                JC.log( '_processMoveto:', _begin, _end, _isUp, _beginVal, _endVal, _max, _docHeight );
                JC.log( 
                        'durationms:', _p._model.fixeddurationms( _moveItem )
                        , 'stepms:', _p._model.fixedstepms( _moveItem )
                      );
                */

                Fixed.interval(
                    easyEffect( 
                        function( _cur, _done ){
                            _isUp && ( _cur = _endVal - _cur );
                            //console.log( 'Fixed scrollTo:', _cur, _tmpCount++ );
                            $(document).scrollTop( _cur );
                        }
                        , _endVal
                        , _beginVal 
                        , _p._model.fixeddurationms( _moveItem )
                        , _p._model.fixedstepms( _moveItem )
                    )
                );
            }

        , _initFixedSupport:
            function(){
                var _p = this;

                _p._model.isFixedTop() && _p._model.layout().css( 'top', _p._model.fixedtop() + 'px' );
                _p._model.isFixedRight() && _p._model.layout().css( 'right', _p._model.fixedright() + 'px' );
                _p._model.isFixedBottom() && _p._model.layout().css( 'bottom', _p._model.fixedbottom() + 'px' );
                _p._model.isFixedLeft() && _p._model.layout().css( 'left', _p._model.fixedleft() + 'px' );

                _p._model.layout().css( 'position', 'fixed' );
            }

        , _initFixedUnsupport:
            function(){
            }

        , hide:
            function(){
            }

        , show:
            function(){
            }
    };

    $(document).ready( function(){
        if( !Fixed.autoInit ) return;
        $([
            'div.js_autoFixed'
            , 'dl.js_autoFixed'
            , 'ul.js_autoFixed'
            , 'ol.js_autoFixed'
            , 'button.js_autoFixed'
           ].join() ).each( function(){ new Fixed( $(this) ); });
    });

}(jQuery));
