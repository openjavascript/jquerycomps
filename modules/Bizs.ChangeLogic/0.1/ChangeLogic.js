//TODO: 完善 select 的相关判断逻辑
;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * <h2>input[type=radio|type=checkbox], select change 事件的响应逻辑</h2>
 * <br/>应用场景</br>
 * <br/>表单操作时, 选择某个 radio 时, 对应的 内容有效,
 * <br/>但选择其他 radio 时, 其他的内容无效
 * <br/>checkbox / select 也可使用( 带change事件的标签 )
 * <p><b>require</b>: 
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 * </p>
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc2.openjavascript.org/docs_api/classes/window.Bizs.ChangeLogic.html' target='_blank'>API docs</a>
 * | <a href='../../modules/Bizs.ChangeLogic/0.1/_demo' target='_blank'>demo link</a></p>
 *
 * div 需要 添加 class="js_bizChangeLogic"
 *
 * <h2>box 的 HTML 属性</h2>
 * <dl>
 *      <dt>bclTrigger</dt>
 *      <dd>触发禁用/起用的control</dd>
 *
 *      <dt>bclDisableTarget</dt>
 *      <dd>需要禁用/起用的control</dd>
 *
 *      <dt>bclHideTarget</dt>
 *      <dd>需要根据禁用起用隐藏/可见的标签</dd>
 *
 *      <dt>bclDoneCallback = function</dt>
 *      <dd>
 *      启用/禁用后会触发的回调, <b>window 变量域</b>
<pre>function bclDoneCallback( _triggerItem, _boxItem ){
    var _ins = this;
    JC.log( 'bclDoneCallback', new Date().getTime() );
}</pre>
 *      </dd>
 *
 *      <dt>bclEnableCallback = function</dt>
 *      <dd>
 *      启用后的回调, <b>window 变量域</b>
<pre>function bclEnableCallback( _triggerItem, _boxItem ){
    var _ins = this;
    JC.log( 'bclEnableCallback', new Date().getTime() );
}</pre>
 *      </dd>
 *
 *      <dt>bclDisableCallback = function</dt>
 *      <dd>
 *      禁用后的回调, <b>window 变量域</b>
<pre>function bclDisableCallback( _triggerItem, _boxItem ){
    var _ins = this;
    JC.log( 'bclDisableCallback', new Date().getTime() );
}</pre>
 *      </dd>
 *
 *      <dt>bclChangeCleanTarget = selector</dt>
 *      <dd>radio change 的时候, 清除目标选择器的 html 内容</dd>
 *
 *      <dt>bclTriggerChangeOnInit = bool, default = true</dt>
 *      <dd>初始化实例时, 是否触发 change 事件</dd>
 * </dl>
 *
 * <h2>trigger 的 HTML 属性</h2>
 * <dl>
 *      <dt>bclDisable = bool, default = false</dt>
 *      <dd>
 *          指定 bclDisableTarget 是否置为无效
 *          <br />还可以根据这个属性 指定 bclHideTarget 是否显示
 *      </dd>
 *
 *      <dt>bclDisplay = bool</dt>
 *      <dd>指定 bclHideTarget 是否显示</dd>
 *
 *      <dt>bclDelimiter = string, default = "||"</dt>
 *      <dd>bclDisplay 和 bclDisable 多值分隔符</dd>
 *
 *      <dt>bclHideTargetSub = selector</dt>
 *      <dd>根据 trigger 的 checked 状态 显示或者隐藏 bclHideTargetSub node</dd>
 * </dl>
 *
 * <h2>hide target 的 HTML 属性</h2>
 * <dl>
 *      <dt>bclHideToggle = bool, default = false</dt>
 *      <dd>显示或显示的时候, 是否与他项相反</dd>
 *
 *      <dt>bclDisableTarget = bool, default = false</dt>
 *      <dd>disabled 的时候, 是否与他项相反</dd>
 * </dl>
 *
 * @namespace   window.Bizs
 * @class       ChangeLogic
 * @constructor
 * @version dev 0.1 2013-09-04
 * @author  qiushaowei   <suches@btbtd.org> | 75 Team
 *
 * @example
        <div class="js_bizChangeLogic"
            bclTrigger="/input[type=radio]"
            bclDisableTarget="/input.js_disableItem"
            >
            <label>
                <input type="radio" name="discount" checked  
                bclDisable="true"
                />自本协议签订之日起10日内生效
            </label> <br>
            <label>
                <input type="radio" name="discount" 
                bclDisable="false"
                />生效时间点
            </label>
            <input type="text" class="ipt js_disableItem" datatype="date" value=""
            /><input type="button" class="UXCCalendar_btn">
        </div>
 */
    window.Bizs.ChangeLogic = ChangeLogic;
    JC.f.addAutoInit && JC.f.addAutoInit( ChangeLogic );

    function ChangeLogic( _selector ){
        if( ChangeLogic.getInstance( _selector ) ) return ChangeLogic.getInstance( _selector );
        ChangeLogic.getInstance( _selector, this );

        //JC.log( 'Bizs.ChangeLogic:', new Date().getTime() );

        this._model = new Model( _selector );
        this._view = new View( this._model );

        this._init();
    }
    
    ChangeLogic.prototype = {
        _init:
            function(){
                var _p = this, _tmp;

                _p._initHandlerEvent();

                $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = JC.f.sliceArgs( arguments ).slice( 2 );
                    _p.trigger( _evtName, _data );
                });

                _p._model.init();
                _p._view.init();

                _p._model.bclTrigger().on('change', function(_evt){
                    //JC.log( 'bclTrigger change', new Date().getTime() );
                    _p.trigger( 'item_change', [ $(this), _evt ] );
                });

                _p.on( 'item_change', function( _evt, _item, _srcEvt ){
                    _item = $( _item );
                    _p._view.change( _item );

                    if( _p._model.ready() ){
                        _p._model.bclChangeCleanTarget() 
                            && _p._model.bclChangeCleanTarget().each( function(){
                                $( this ).html( '' );
                            });
                    }
                });

                if( _p._model.bclTriggerChangeOnInit() ){
                    ( _tmp = _p._model.bclTrigger( true ) ) 
                        && !_tmp.prop( 'disabled' )
                        && _tmp.trigger( 'change');
                }

                _p._model.ready( true );

                return _p;
            }    
        , _initHandlerEvent:
            function(){
                var _p = this;

                _p.on( 'DisableItem', function( _evt, _triggerItem ){
                    _p._model.bclDisableCallback()
                        && _p._model.bclDisableCallback().call( _p, _triggerItem, _p._model.selector() );
                });

                _p.on( 'EnableItem', function( _evt, _triggerItem ){
                    _p._model.bclEnableCallback()
                        && _p._model.bclEnableCallback().call( _p, _triggerItem, _p._model.selector() );
                });

                _p.on( 'ChangeDone', function( _evt, _triggerItem ){
                    _p._model.bclDoneCallback()
                        && _p._model.bclDoneCallback().call( _p, _triggerItem, _p._model.selector() );
                });
            }
        /**
         * 获取 显示 ChangeLogic 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  ChangeLogicInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  ChangeLogicInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    }
    /**
     * 获取或设置 ChangeLogic 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {ChangeLogic instance}
     */
    ChangeLogic.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'ChangeLogicIns', _setter );

            return _selector.data('ChangeLogicIns');
        };

    ChangeLogic.doneCallback = null;
    ChangeLogic.enableCallback = null;
    ChangeLogic.disableCallback = null;
    /**
     * 初始化 _selector | document 可识别的 ChangeLogic HTML属性
     * @method  init
     * @param   {selector}  _selector, default = document
     * @static
     */
    ChangeLogic.init =
        function( _selector ){
            _selector = $( _selector || document );
            if( !( _selector && _selector.length ) ) return;

            if( _selector.hasClass( 'js_bizChangeLogic' ) ){
                new ChangeLogic( _selector );
            }else{
                _selector.find(
                        [ 
                            'div.js_bizChangeLogic'
                            , 'dl.js_bizChangeLogic'
                            , 'table.js_bizChangeLogic'
                        ].join() 
                ).each( function(){
                    new ChangeLogic( $(this) );
                });
            }
        };
    
    function Model( _selector ){
        this._selector = _selector;
    }
    
    Model.prototype = {
        init:
            function(){
                return this;
            }

        , ready:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._ready = _setter );
                return this._ready;
            }

        , selector: function(){ return this._selector; }

        , bclTrigger:
            function( _curItem ){
                var _p = this, _r = JC.f.parentSelector( this.selector(), this.selector().attr('bclTrigger') ), _tmp;
                if( _curItem ){
                    _r.each( function(){
                        _tmp = $(this);
                        if( _tmp.prop('checked') || _tmp.prop('selected') ){
                            _r = _tmp;
                            return false;
                        }
                    });
                }
                return _r;
            }

        , bclTriggerChangeOnInit:
            function(){
                var _r = true, _p = this;

                _p.selector().is( '[bclTriggerChangeOnInit] ' ) 
                    && ( _r = JC.f.parseBool( _p.selector().attr( 'bclTriggerChangeOnInit' ) ) );

                return _r;
            }

        , bclChangeCleanTarget: 
            function(){ 
                var _p = this, _r, _tmp;

                _p.selector().attr('bclChangeCleanTarget') 
                    && ( _r = JC.f.parentSelector( _p.selector(), _p.selector().attr('bclChangeCleanTarget') ) )
                    ;
                return _r;
            }

        , bclDisableTarget:
            function( _triggerItem ){
                var _p = this, _r, _tmp;

                _p.selector().attr('bclDisableTarget') 
                    && ( _r = JC.f.parentSelector( _p.selector(), _p.selector().attr('bclDisableTarget') ) )
                    ;

                _triggerItem 
                    && ( _triggerItem = $(_triggerItem) ).length 
                    && _triggerItem.attr('bclTrigger') 
                    && ( _r = JC.f.parentSelector( _triggerItem, _triggerItem.attr('bclDisableTarget') ) )
                    ;
                return _r;
            }

        , bclDisable:
            function( _triggerItem ){
                var _r = false, _selectedItem;
                _triggerItem && ( _triggerItem = $( _triggerItem ) );
                if( !( _triggerItem && _triggerItem.length ) ) return _r;

                if( _triggerItem.prop('nodeName').toLowerCase() == 'select' ){
                    _selectedItem = _triggerItem.find( ':selected' );
                    if( !_selectedItem.length ) return _r;

                    if( _triggerItem.is('[bclDisable]') || _selectedItem.is( '[bclDisable]' ) ){
                        if( _triggerItem.is( '[bclDisable]' ) ){
                            _r = _triggerItem.attr('bclDisable') == _triggerItem.val();
                        }
                        if( _selectedItem.is( '[bclDisable]' ) ){
                            _r = JC.f.parseBool( _selectedItem.attr( 'bclDisable' ) );
                        }
                    }
                }else{
                    _triggerItem.is( '[bclDisable]' )
                    && ( _r = JC.f.parseBool( _triggerItem.attr('bclDisable') ) )
                    ;
                }

                if( _triggerItem.prop('nodeName').toLowerCase() == 'input' 
                        && _triggerItem.attr('type').toLowerCase() == 'checkbox' ){
                    _r = !_triggerItem.prop('checked');
                }
                return _r;
            }

        , bclDelimiter: 
            function( _trigger ){ 
                var _r = '||';
                this.selector().is( '[bclDelimiter]' ) && ( _r = this.selector().attr( 'bclDelimiter' ) );
                _trigger && _trigger.is( '[bclDelimiter]' ) && ( _r = _trigger.attr( 'bclDelimiter' ) );
                return _r;
            }

        , delimiterItems: 
            function( _item, _trigger ){ 
                return _item.split( this.bclDelimiter( _trigger ) );  
            }

        , bclDisplay:
            function( _triggerItem ){
                var _r = false, _selectedItem, _p = this;
                _triggerItem && ( _triggerItem = $( _triggerItem ) );
                if( !( _triggerItem && _triggerItem.length ) ) return _r;

                if( _triggerItem.prop('nodeName').toLowerCase() == 'select' ){
                    _selectedItem = _triggerItem.find( ':selected' );
                    if( !_selectedItem.length ) return _r;
                    if( !( _triggerItem.is('[bclDisplay]') || _selectedItem.is( '[bclDisplay]' ) ) ){
                        if( _triggerItem.is( '[bclDisable]' ) ){
                            _r = _p.delimiterItems( _triggerItem.attr('bclDisable'), _triggerItem ).indexOf( _triggerItem.val() ) > -1;
                        }
                        if( _selectedItem.is( '[bclDisable]' ) ){
                            _r = JC.f.parseBool( _selectedItem.attr( 'bclDisable' ) );
                        }

                    }else{
                        if( _triggerItem.is( '[bclDisplay]' ) ){
                            _r = _p.delimiterItems( _triggerItem.attr('bclDisplay'), _triggerItem ).indexOf( _triggerItem.val() ) > -1;
                        }
                        if( _selectedItem.is( '[bclDisplay]' ) ){
                            _r = JC.f.parseBool( _selectedItem.attr( 'bclDisplay' ) );
                        }
                    }
                }else{
                    if( !_triggerItem.is('[bclDisplay]') ){
                        _triggerItem.is( '[bclDisable]' )
                        && ( _r = !JC.f.parseBool( _triggerItem.attr('bclDisable') ) )
                        ;
                    }else{
                        _triggerItem.is( '[bclDisplay]' )
                        && ( _r = JC.f.parseBool( _triggerItem.attr('bclDisplay') ) )
                        ;
                    }
                }

                if( _triggerItem.prop('nodeName').toLowerCase() == 'input' 
                      && _triggerItem.attr('type').toLowerCase() == 'checkbox' ){
                    _r = _triggerItem.prop('checked');
                }

                return _r;
            }

        , bclHideTarget:
            function( _triggerItem ){
                var _p = this, _r, _tmp;

                _p.selector().attr('bclHideTarget') 
                    && ( _r = JC.f.parentSelector( _p.selector(), _p.selector().attr('bclHideTarget') ) )
                    ;

                _triggerItem 
                    && ( _triggerItem = $(_triggerItem) ).length 
                    && _triggerItem.attr('bclHideTarget') 
                    && ( _r = JC.f.parentSelector( _triggerItem, _triggerItem.attr('bclHideTarget') ) )
                    ;
                return _r;
            }

        , bclHideToggle:
            function( _hideTarget ){
                var _r;
                _hideTarget && _hideTarget.is( '[bclHideToggle]' ) 
                    && ( _r = JC.f.parseBool( _hideTarget.attr('bclHideToggle') ) );
                return _r;
            }

        , bclDisableToggle:
            function( _target ){
                var _r;
                _target && _target.is( '[bclDisableToggle]' ) 
                    && ( _r = JC.f.parseBool( _target.attr('bclDisableToggle') ) );
                return _r;
            }

        , bclDoneCallback:
            function(){
                var _r = ChangeLogic.doneCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('bclDoneCallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , bclEnableCallback:
            function(){
                var _r = ChangeLogic.enableCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('bclEnableCallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , bclDisableCallback:
            function(){
                var _r = ChangeLogic.disableCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('bclDisableCallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
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
                return this;
            }

        , change:
            function( _triggerItem ){
                _triggerItem && ( _triggerItem = $( _triggerItem ) );
                if( !( _triggerItem && _triggerItem.length && _triggerItem.is(':visible') ) ) return;
                var _p = this
                    , _isDisable = _p._model.bclDisable( _triggerItem )
                    , _bclDisableTarget = _p._model.bclDisableTarget( _triggerItem )
                    , _bclDisplay = _p._model.bclDisplay( _triggerItem )
                    , _bclHideTarget = _p._model.bclHideTarget( _triggerItem )
                    ;

                if( _triggerItem.is( '[bclHideTargetSub]' ) ){
                    var _starget = JC.f.parentSelector( _triggerItem, _triggerItem.attr( 'bclHideTargetSub' ) );
                    if( _starget && _starget.length ){
                        if( _triggerItem.prop('checked') ){
                            _starget.show();
                        }else{
                            _starget.hide();
                        }
                    }
                }

                if( _bclDisableTarget && _bclDisableTarget.length ){
                    _bclDisableTarget.each( function(){ 
                        var _sp = $( this );

                        if( _p._model.bclDisableToggle( _sp ) ){
                            _sp.attr('disabled', !_isDisable);
                        }else{
                            _sp.attr('disabled', _isDisable);
                        }
                        JC.Valid && JC.Valid.setValid( _sp );

                        if( _sp.is( '[bclHideTargetSub]' ) ){
                            var _starget = JC.f.parentSelector( _sp, _sp.attr( 'bclHideTargetSub' ) );
                            if( !( _starget && _starget.length ) ) return;
                            if( _isDisable ){
                                _starget.hide();
                            }else{
                                if( _sp.prop('checked') ){
                                    _starget.show();
                                }else{
                                    _starget.hide();
                                }
                            }
                        }
                    });
                }

                if( _bclHideTarget &&  _bclHideTarget.length  ){
                    _bclHideTarget.each( function(){
                        var _display = _p._model.bclHideToggle( $(this) ) ? !_bclDisplay : _bclDisplay;
                        _display ? $(this).show() : $(this).hide();
                        //JC.log( _display, new Date().getTime() );
                    });
                }

                _isDisable 
                    ? $( _p ).trigger( 'TriggerEvent', [ 'DisableItem', _triggerItem ] )
                    : $( _p ).trigger( 'TriggerEvent', [ 'EnableItem', _triggerItem ] )
                    ;

                $( _p ).trigger( 'TriggerEvent', [ 'ChangeDone', _triggerItem ] );

                //JC.log( 'ChangeLogic view change', new Date().getTime(), _isDisable );
            }
    };

    $(document).ready( function(){
        setTimeout( function(){
            ChangeLogic.init();
        }, 10);
    });
    
    return Bizs.ChangeLogic;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
