/**
 * 应用场景
 * 表单操作时, 选择某个 radio 时, 对应的 内容有效,
 * 但选择其他 radio 时, 其他的内容无效
 * checkbox / select 也可使用( 带change事件的标签 )
 *
 * div 需要 添加 class="js_bizsDisableLogic"
 *
 * <h2>box 的 HTML 属性</h2>
 * <dl>
 *      <dt>dltrigger</dt>
 *      <dd>触发禁用/起用的control</dd>
 *
 *      <dt>dltarget</dt>
 *      <dd>需要禁用/起用的control</dd>
 *
 *      <dt>dlhidetarget</dt>
 *      <dd>需要根据禁用起用隐藏/可见的标签</dd>
 *
 *      <dt>dldonecallback = function</dt>
 *      <dd>启用/禁用后会触发的回调</dd>
 *
 *      <dt>dlenablecallback = function</dt>
 *      <dd>启用后的回调</dd>
 *
 *      <dt>dldisablecallback = function</dt>
 *      <dd>禁用后的回调</dd>
 * </dl>
 *
 * <h2>trigger 的 HTML 属性</h2>
 * <dl>
 *      <dt>dldisable = bool, default = false</dt>
 *      <dd>
 *          指定 dltarget 是否置为无效
 *          <br />还可以根据这个属性 指定 dlhidetarget 是否显示
 *      </dd>
 *
 *      <dt>dldisplay = bool</dt>
 *      <dd>指定 dlhidetarget 是否显示</dd>
 * </dl>
 *
 * <h2>hide target 的 HTML 属性</h2>
 * <dl>
 *      <dt>dlhidetoggle = bool</dt>
 *      <dd>显示或显示的时候, 是否与他项相反</dd>
 * </dl>
 *
 * @namespace   window.Bizs
 * @class       DisableLogic
 * @constructor
 * @author  qiushaowei  .1  2013-09-04
 *
 * @example
        <div class="js_bizsDisableLogic"
            dltrigger="/input[type=radio]"
            dltarget="/input.js_disableItem"
            >
            <label>
                <input type="radio" name="discount" checked  
                dldisable="true"
                />自本协议签订之日起10日内生效
            </label> <br>
            <label>
                <input type="radio" name="discount" 
                dldisable="false"
                />生效时间点
            </label>
            <input type="text" class="ipt js_disableItem" datatype="date" value=""
            /><input type="button" class="UXCCalendar_btn">
        </div>
 */
;(function($){

    window.Bizs.DisableLogic = DisableLogic;

    function DisableLogic( _selector ){
        if( DisableLogic.getInstance( _selector ) ) return DisableLogic.getInstance( _selector );
        DisableLogic.getInstance( _selector, this );

        JC.log( 'Bizs.DisableLogic:', new Date().getTime() );

        this._model = new Model( _selector );
        this._view = new View( this._model );

        this._init();
    }
    
    DisableLogic.prototype = {
        _init:
            function(){
                var _p = this, _tmp;

                _p._initHandlerEvent();

                $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = sliceArgs( arguments ).slice( 2 );
                    _p.trigger( _evtName, _data );
                });

                _p._model.init();
                _p._view.init();

                _p._model.dltrigger().on('change', function(_evt){
                    JC.log( 'dltrigger change', new Date().getTime() );
                    _p._view.change( this );
                });

                ( _tmp = _p._model.dltrigger( true ) ) && _tmp.trigger( 'change');

                return _p;
            }    
        , _initHandlerEvent:
            function(){
                var _p = this;

                _p.on( 'DisableItem', function( _evt, _triggerItem ){
                    _p._model.dldisablecallback()
                        && _p._model.dldisablecallback().call( _p, _triggerItem, _p._model.selector() );
                });

                _p.on( 'EnableItem', function( _evt, _triggerItem ){
                    _p._model.dlenablecallback()
                        && _p._model.dlenablecallback().call( _p, _triggerItem, _p._model.selector() );
                });

                _p.on( 'ChangeDone', function( _evt, _triggerItem ){
                    _p._model.dldonecallback()
                        && _p._model.dldonecallback().call( _p, _triggerItem, _p._model.selector() );
                });
            }
        /**
         * 获取 显示 DisableLogic 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  DisableLogicInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  DisableLogicInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    }
    /**
     * 获取或设置 DisableLogic 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {DisableLogic instance}
     */
    DisableLogic.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'DisableLogicIns', _setter );

            return _selector.data('DisableLogicIns');
        };

    DisableLogic.doneCallback = null;
    DisableLogic.enableCallback = null;
    DisableLogic.disableCallback = null;
    
    function Model( _selector ){
        this._selector = _selector;
    }
    
    Model.prototype = {
        init:
            function(){
                return this;
            }

        , selector: function(){ return this._selector; }

        , dltrigger:
            function( _curItem ){
                var _p = this, _r = parentSelector( this.selector(), this.selector().attr('dltrigger') ), _tmp;
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

        , dltarget:
            function( _triggerItem ){
                var _p = this, _r, _tmp;

                _p.selector().attr('dltarget') 
                    && ( _r = parentSelector( _p.selector(), _p.selector().attr('dltarget') ) )
                    ;

                _triggerItem 
                    && ( _triggerItem = $(_triggerItem) ).length 
                    && _triggerItem.attr('dltrigger') 
                    && ( _r = $( _triggerItem.attr('dltarget') ) )
                    ;
                return _r;
            }

        , dldisable:
            function( _triggerItem ){
                var _r = false;
                _triggerItem 
                    && ( _triggerItem = $( _triggerItem ) ).length
                    && _triggerItem.is( '[dldisable]' )
                    && ( _r = parseBool( _triggerItem.attr('dldisable') ) )
                    ;
                return _r;
            }

        , dldisplay:
            function( _triggerItem ){
                var _r = false;
                if( !_triggerItem.is('[dldisplay]') ){
                    ( _triggerItem = $( _triggerItem ) ).length
                    && _triggerItem.is( '[dldisable]' )
                    && ( _r = parseBool( _triggerItem.attr('dldisable') ) )
                    ;
                }else{
                    ( _triggerItem = $( _triggerItem ) ).length
                    && _triggerItem.is( '[dldisplay]' )
                    && ( _r = parseBool( _triggerItem.attr('dldisplay') ) )
                    ;
                }
                return _r;
            }

        , dlhidetarget:
            function( _triggerItem ){
                var _p = this, _r, _tmp;

                _p.selector().attr('dlhidetarget') 
                    && ( _r = parentSelector( _p.selector(), _p.selector().attr('dlhidetarget') ) )
                    ;

                _triggerItem 
                    && ( _triggerItem = $(_triggerItem) ).length 
                    && _triggerItem.attr('dlhidetarget') 
                    && ( _r = $( _triggerItem.attr('dlhidetarget') ) )
                    ;
                return _r;
            }

        , dlhidetoggle:
            function( _hideTarget ){
                var _r;
                _hideTarget && _hideTarget.is( '[dlhidetoggle]' ) 
                    && ( _r = parseBool( _hideTarget.attr('dlhidetoggle') ) );
                return _r;
            }

        , dldonecallback:
            function(){
                var _r = DisableLogic.doneCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('dldonecallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , dlenablecallback:
            function(){
                var _r = DisableLogic.enableCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('dlenablecallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , dldisablecallback:
            function(){
                var _r = DisableLogic.disableCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('dldisablecallback') )
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
                if( !( _triggerItem && _triggerItem.length ) ) return;

                var _p = this
                    , _isDisable = _p._model.dldisable( _triggerItem )
                    , _dlTarget = _p._model.dltarget( _triggerItem )
                    , _dlDisplay = _p._model.dldisplay( _triggerItem )
                    , _dlHideTarget = _p._model.dlhidetarget( _triggerItem )
                    ;

                _dlTarget && _dlTarget.length && _dlTarget.attr('disabled', _isDisable);
                if( _dlHideTarget &&  _dlHideTarget.length  ){
                    _dlHideTarget.each( function(){
                        var _display = _p._model.dlhidetoggle( $(this) ) ? !_dlDisplay : _dlDisplay;
                        _display ? $(this).show() : $(this).hide();
                        //JC.log( _display, new Date().getTime() );
                    });
                }

                _isDisable 
                    ? 
                        $( _p ).trigger( 'TriggerEvent', [ 'DisableItem', _triggerItem ] )
                    :
                        $( _p ).trigger( 'TriggerEvent', [ 'EnableItem', _triggerItem ] )
                    ;

                $( _p ).trigger( 'TriggerEvent', [ 'ChangeDone', _triggerItem ] );

                JC.log( 'DisableLogic view change', new Date().getTime(), _isDisable );
            }
    };

    $(document).ready( function(){
        setTimeout( function(){
            $('div.js_bizsDisableLogic').each( function(){
                new DisableLogic( $(this) );
            });
        }, 10);
    });
    
}(jQuery));
