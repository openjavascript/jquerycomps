;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * Placeholder 占位符提示功能
 * <p>
 *      <b>require</b>: 
 *          <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 * </p>
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Placeholder.html' target='_blank'>API docs</a>
 * | <a href='../../comps/Placeholder/_demo' target='_blank'>demo link</a></p>
 * @namespace JC
 * @class Placeholder
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1
 * @author  qiushaowei   <suches@btbtd.org> | 75 Team
 * @date    2013-10-19
 */
    JC.Placeholder = Placeholder;
    JC.f.addAutoInit && JC.f.addAutoInit( Placeholder );

    function Placeholder( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( Placeholder.isSupport ) {
            _selector 
                && _selector.is('[xplaceholder]')
                && _selector.attr('placeholder', _selector.attr('xplaceholder') );
            return;
        }
        if( Placeholder.getInstance( _selector ) ) return Placeholder.getInstance( _selector );
        Placeholder.getInstance( _selector, this );
        //JC.log( Placeholder.Model._instanceName );

        this._model = new Placeholder.Model( _selector );
        this._view = new Placeholder.View( this._model );

        this._init();

        JC.log( 'Placeholder:', new Date().getTime() );
    }
    /**
     * 获取或设置 Placeholder 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {PlaceholderInstance}
     */
    Placeholder.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( Placeholder.Model._instanceName, _setter );

            return _selector.data( Placeholder.Model._instanceName );
        };
    /**
     * 初始化可识别的 Placeholder 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of PlaceholderInstance}
     */
    Placeholder.init =
        function( _selector ){
            var _r = [], _nodeName;
            Placeholder.update();
            _selector = $( _selector || document );

            if( _selector 
                    && _selector.length 
                    && ( _nodeName = _selector.prop('nodeName').toLowerCase() ) 
            ){
                if( _nodeName == 'text' || _nodeName == 'textarea' ){
                    if( Placeholder.isSupport ){
                        _selector.is('[xplaceholder]')
                            && _selector.attr('placeholder', _selector.attr('xplaceholder') );
                    }else{
                        _selector.is('[placeholder]') 
                            && _r.push( new Placeholder( _selector ) )
                            ;
                    }
                }else{
                    _selector.find( [ 
                                        'input[type=text][placeholder]'
                                        , 'textarea[placeholder]'
                                        , 'input[type=text][xplaceholder]'
                                        , 'textarea[xplaceholder]'
                    ].join(',') ).each( function(){
                        var _sp = $(this);
                        if( Placeholder.isSupport ){
                            _sp.is('[xplaceholder]')
                                && _sp.attr('placeholder', _sp.attr('xplaceholder') );
                        }else{
                            _r.push( new Placeholder( _sp ) );
                        }
                    });
                }
            }
            return _r;
        };
    /**
     * 更新所有 placeholder 的状态
     * @method  update
     * @static
     */
    Placeholder.update =
        function(){
            var _items = $( JC.f.printf( '#{0} > div', Placeholder.Model._boxId ) );
            if( !_items.length ) return;
            _items.each( function(){
                var _p = $(this), _ins = _p.data( 'CPHIns' );
                if( !_ins ) return;
                _ins.update();
            });
        };
    /**
     * 设置 Placeholder 的默认 className
     * @property    className
     * @type        string
     * @default     xplaceholder
     * @static
     */
    Placeholder.className = 'xplaceholder';
    /**
     * 判断 input/textarea 默认是否支持 placeholder 功能
     * @property    isSupport
     * @type        bool
     * @static
     */
    //Placeholder.isSupport = false;
    Placeholder.isSupport = 'placeholder' in $('<input type="text" />')[0];

    Placeholder.prototype = {
        _beforeInit:
            function(){
                //JC.log( 'Placeholder _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this;

                _p._model.selector().on( 'focus', function( _evt ){
                    _p._view.hide();
                });

                _p._model.selector().on( 'blur', function( _evt ){
                    _p._view.show();
                });

                _p._model.selector().on( 'placeholder_remove', function( _evt ){
                    _p._model.placeholder().remove();
                    Placeholder.Model._removeTm && clearTimeout( Placeholder.Model._removeTm );

                    Placeholder.Model._removeTm = 
                        setTimeout( function(){
                            Placeholder.update();
                        }, 1 );
                });

                _p.on( 'CPHUpdate', function( _evt ){
                    _p._view.update();
                });

                _p.on( 'CPHInitedPlaceholder', function( _evt ){
                    var _ph = _p._model.placeholder();
                    _ph.on( 'click', function( _sevt ){
                        _p._model.selector().trigger( 'focus' );
                        set_cursor( _p._model.selector()[0], _p._model.selector().val().length );
                    });
                    _ph.data( 'CPHIns', _p );
                });
            }
        , _inited:
            function(){
                //JC.log( 'Placeholder _inited', new Date().getTime() );
                var _p = $(this);
                _p.trigger( 'CPHUpdate' );
            }
        /**
         * 更新 placeholder 状态
         * @method update
         */
        , update:
            function(){
                this._view.update();
            }
    };

    BaseMVC.buildModel( Placeholder );
    Placeholder.Model._instanceName = 'Placeholder';
    Placeholder.Model._boxId = 'XPlaceHolderBox';

    Placeholder.Model.prototype = {
        init:
            function(){
                //JC.log( 'Placeholder.Model.init:', new Date().getTime() );
            }

        , className:
            function(){
                var _r = this.attrProp( 'cphClassName' ) || Placeholder.className;
                return _r;
            }

        , text:
            function(){
                var _r = this.attrProp( 'xplaceholder' ) || this.attrProp( 'placeholder' ) || '';
                return _r;
            }

        , placeholder:
            function(){
                if( !this._placeholder ){
                    this._placeholder = $( JC.f.printf( '<div class="{0}" style="display:none;"></div>'
                                , this.className() 
                            ) )
                            .appendTo( this.placeholderBox() );

                    $( this ).trigger( 'TriggerEvent', [ 'CPHInitedPlaceholder' ] );
                }
                this._placeholder.html( this.text() );
                return this._placeholder;
            }

        , placeholderBox:
            function(){
                var _r = $( '#' + Placeholder.Model._boxId );
                if( !( _r && _r.length ) ){
                    _r = $( JC.f.printf( '<div id="{0}"></div>', Placeholder.Model._boxId ) ).appendTo( document.body );
                }
                return _r;
            }
    };

    BaseMVC.buildView( Placeholder );
    Placeholder.View.prototype = {
        init:
            function(){
                //JC.log( 'Placeholder.View.init:', new Date().getTime() );
            }

        , update:
            function(){
                var _p = this
                    , _v = _p._model.selector().val().trim()
                    , _holder = _p._model.placeholder()
                    ;
                if( _v || !_p.selector().is( ':visible' ) ){
                    _holder.hide();
                    return;
                }

                var _offset = _p._model.selector().offset()
                    , _h = _p._model.selector().prop('offsetHeight')
                    , _hh = _holder.prop( 'offsetHeight' )
                    ;

                //JC.log( _h + ', ' + _hh );

                _holder.css( { 'left': _offset.left + 'px'
                                , 'top': _offset.top + 1 + 'px' 
                            } );

                _holder.show();
            }

        , hide: 
            function(){
                var _p = this;
                _p._model.placeholder().hide();
            }

        , show:
            function(){
                var _p = this
                    , _v = _p._model.selector().val().trim()
                    ;
                if( _v ) return;
                this.update();
                _p._model.placeholder().show();
            }
    };

    BaseMVC.build( Placeholder );
    
    $.event.special.placeholder_remove = {
        remove: 
            function(o) {
                if (o.handler) {
                    o.handler()
                }
            }
    };

    $(window).on( 'resize', function(){
        Placeholder.update();
    });

    /**
     * 设置 控件 光标位置
     * x@btbtd.org  2012-3-1 
     */   
    function set_cursor(ctrl, pos)
    {
        if(ctrl.setSelectionRange)
        {
            ctrl.focus();
            ctrl.setSelectionRange(pos,pos);
        }
        else if (ctrl.createTextRange) 
        {
            var tro = ctrl.createTextRange();   
            var LStart = pos;   
            var LEnd = pos;   
            var start = 0;   
            var end = 0;   
            var value = ctrl.value;
               
            for(var i=0; i<value.length && i<LStart; i++)
            {   
              var c = value.charAt(i);   
              if(c!='\n') start++;  
            }
               
            for(var i=value.length-1; i>=LEnd && i>=0; i--)
            {   
              var c = value.charAt(i);   
              if(c!='\n') end++;  
            }   
            tro.moveStart('character', start);   
            tro.moveEnd('character', -end);   
            tro.select();   
            ctrl.focus();   
        }
    }
    /**
     * inject jquery show, hide func, for Placeholder change event
     */
    var _oldShow= $.fn.show, _oldHide = $.fn.hide, EVENT_BINDER = $( {} );
    $.fn.show = 
        function(){
            var _r = _oldShow.apply( this, arguments ), _p = this;
            setTimeout( function(){ 
                EVENT_BINDER.trigger( 'show' );
            }, 1 );
            return _r;
        };

    $.fn.hide = 
        function(){
            var _r = _oldHide.apply( this, arguments ), _p = this;
            setTimeout( function(){ 
                EVENT_BINDER.trigger( 'hide' );
            }, 1 );
            return _r;
        };

    EVENT_BINDER.on( 'show hide', function(){
        EVENT_BINDER.data('timer') && clearTimeout( EVENT_BINDER.data( 'timer' ) );
        EVENT_BINDER.data( 'timer', setTimeout( function(){
            Placeholder.update();
        }, 100 ) );
    });
 
    $(document).ready( function(){
        var _insAr = 0;
        Placeholder.autoInit
            && ( _insAr = Placeholder.init() )
            ;
    });

    return JC.Placeholder;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
