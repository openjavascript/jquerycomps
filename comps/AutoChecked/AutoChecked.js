 ;(function($){
    /**
     * 全选/反选
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.AutoChecked.html' target='_blank'>API docs</a>
     * | <a href='../../comps/AutoChecked/_demo' target='_blank'>demo link</a></p>
     * <p><b>require</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <h2>input[type=checkbox] 可用的 HTML 属性</h2>
     * <dl>
     *      <dt>checktype = string</dt>
     *      <dd>
     *          类型: all(全选), inverse(反选)
     *      </dd>
     *
     *      <dt>checkfor = selector</dt>
     *      <dd>需要全选/反选的 checkbox</dd>
     *
     *      <dt>checkall = selector</dt>
     *      <dd>声明 checkall input, 仅在 checktype = inverse 时才需要</dd>
     *
     *      <dt>checktrigger = string of event name</dt>
     *      <dd>点击全选反选后触发的事件, 可选</dd>
     * </dl>
     * @class       AutoChecked
     * @namespace   JC
     * @constructor
     * @version dev 0.1 2013-06-11
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @param   {selector}  _selector   要初始化的全选反选的父级节点 或 input[checktype][checkfor]
     * @example
            <h2>AJAX data:</h2>
            <dl class="def example24">
                <dt>checkall example 24</dt>
                <dd>
                    <label>
                        <input type="checkbox" checktype="all" checkfor="dl.example24 input[type=checkbox]">
                        全选
                    </label>
                    <label>
                        <input type="checkbox" checktype="inverse" checkfor="dl.example24 input[type=checkbox]" checkall="dl.example24 input[checktype=all]">
                        反选
                    </label>
                </dd>
                <dd>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_1
                    </label>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_2
                    </label>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_3
                    </label>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_4
                    </label>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_5
                    </label>
                </dd>
            </dl>

            <script>
            $(document).delegate( 'button.js_ajaxTest', 'click', function(){
                var _p = $(this);
                _p.prop('disabled', true);
                setTimeout( function(){ _p.prop('disabled', false); }, 1000 );

                $.get( './data/initCheckAll.php?rnd='+new Date().getTime(), function( _r ){
                    var _selector = $(_r);
                    $( $( 'body' ).children().first() ).before( _selector );
                    JC.AutoChecked( _selector );
                });
            });
            </script>
     */
    JC.Form && ( JC.Form.initCheckAll = AutoChecked );
    JC.AutoChecked = AutoChecked;

    function AutoChecked( _selector ){
        _selector = $( _selector );
        if( !( _selector && _selector.length ) ) return;
        if( _selector.prop('nodeName').toLowerCase() != 'input' ){
            return AutoChecked.init( _selector );
        }
        if( AutoChecked.getInstance( _selector ) ) return AutoChecked.getInstance( _selector );
        AutoChecked.getInstance( _selector, this );

        JC.log( 'AutoChecked init', new Date().getTime() );

        this._model = new Model( _selector );
        this._view = new View( this._model );

        this._init();
    }
    /**
     * 初始化 _selector 的所有 input[checktype][checkfor]
     * @method  init
     * @param   {selector}  _selector
     * @static
     */
    AutoChecked.init = 
        function( _selector ){
            _selector = $( _selector );
            if( !( _selector && _selector.length ) ) return;
            var _ls = _selector.find( 'input[type=checkbox][checktype][checkfor]' ), _p;
            _ls.each( function(){
                _p = $(this);
                if( !AutoChecked.isAutoChecked( _p ) ) return;
                if( AutoChecked.getInstance( _p ) ) {
                    AutoChecked.getInstance( _p ).update();
                    return;
                }
                new AutoChecked( _p );
            });
        };
    
    AutoChecked.prototype = {
        _init:
            function(){
                var _p = this;

                _p._initHandlerEvent();

                $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = sliceArgs( arguments ); _data.shift(); _data.shift();
                    _p.trigger( _evtName, _data );
                });

                _p._model.init();
                _p._view.init();

                _p._view.itemChange();

                return _p;
            }    

        , _initHandlerEvent:
            function(){
                var _p = this;
                _p.selector().on('change', function(){
                    _p.trigger( _p._model.checktype() );
                });

                _p.on('all', function(){
                    JC.log( 'AutoChecked all', new Date().getTime() );
                    _p._view.allChange();
                });

                _p.on('inverse', function(){
                    JC.log( 'AutoChecked inverse', new Date().getTime() );
                    _p._view.inverseChange();
                });

                if( !( _p._model.checktype() == 'inverse' && _p._model.hasCheckAll() ) ){
                    $( _p._model.delegateElement() ).delegate( _p._model.delegateSelector(), 'click', function( _evt ){
                        if( AutoChecked.isAutoChecked( $(this) ) ) return;
                        JC.log( 'AutoChecked change', new Date().getTime() );
                        _p._view.itemChange();
                    });
                }
            }
        /**
         * 更新 全选状态
         * @method  update
         */ 
        , update:
            function(){
                this._view.itemChange();
                return this;
            }
        /**
         * 获取 显示 AutoChecked 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  AutoCheckedInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  AutoCheckedInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    }
    /**
     * 获取或设置 AutoChecked 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {AutoChecked instance}
     */
    AutoChecked.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'AutoCheckedIns', _setter );

            return _selector.data('AutoCheckedIns');
        };
    /**
     * 判断 selector 是否可以初始化 AutoChecked
     * @method  isAutoChecked
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    AutoChecked.isAutoChecked =
        function( _selector ){
            var _r;
            _selector 
                && ( _selector = $(_selector) ).length 
                && ( _r = _selector.is( '[checkfor]' ) && _selector.is( '[checktype]' ) );
            return _r;
        };
    
    function Model( _selector ){
        this._selector = _selector;
    }

    Model.isParentSelectorRe = /^[\/\|<]/;
    Model.parentSelectorRe = /[^\/\|<]/g;
    Model.childSelectorRe = /[\/\|<]/g;

    Model.prototype = {
        init:
            function(){
                return this;
            }
        , checktype:
            function(){
                return ( this.selector().attr('checktype') || '' ).toLowerCase();
            }

        , checkfor:
            function(){
                return ( this.selector().attr('checkfor') || '' );
            }

        , checkall:
            function(){
                return ( this.selector().attr('checkall') || '' );
            }

        , checktrigger:
            function(){
                return ( this.selector().attr('checktrigger') || '' );
            }

        , hasCheckAll: function(){ return this.selector().is('[checkall]') && this.selector().attr('checkall'); }

        , selector: function(){ return this._selector; }

        , isParentSelector: function(){ return Model.isParentSelectorRe.test( this.selector().attr( 'checkfor' ) ); }

        , delegateSelector:
            function(){
                var _r = this.selector().attr('checkfor'), _tmp;
                if( this.isParentSelector() ){
                    if( /^</.test( this.checkfor() ) ){
                        this.checkfor().replace( /[\s]([\s\S]+)/, function( $0, $1 ){
                            _r = $1;
                        });
                    }else{
                        _r = this.checkfor().replace( Model.childSelectorRe, '' );
                    }
                }
                return _r;
            }

        , delegateElement:
            function(){
                var _p = this, _r = $(document), _tmp;
                if( this.isParentSelector() ){
                    if( /^</.test( this.checkfor() ) ){
                        this.checkfor().replace( /^([^\s]+)/, function( $0, $1 ){
                            _r = parentSelector( _p.selector(), $1 );
                        });
                    }else{
                        _tmp = this.checkfor().replace( Model.parentSelectorRe, '' );
                        _r = parentSelector( _p.selector(), _tmp );
                    }
                }
                return _r;
            }

        , items:
            function(){
                return this.delegateElement().find( this.delegateSelector() );
            }

        , checkedAll: function(){ return this.selector().prop('checked'); }
        , checkedInverse: function(){ return this.selector().prop('checked'); }

        , allSelector:
            function(){
                var _r;
                if( this.checktype() == 'inverse' ){
                    this.checkall() 
                        && ( _r = parentSelector( this.selector(), this.checkall() ) )
                        ;
                }else{
                    _r = this.selector();
                }
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
        , itemChange:
            function(){
                switch( this._model.checktype() ){
                    case 'all': this._fixAll(); break;
                }
            }
        , allChange:
            function(){
                var _p = this, _checked = _p._model.checkedAll();
                _p._model.items().each( function(){
                    var _sp = $(this);
                    if( AutoChecked.isAutoChecked( _sp ) ) return;
                    if( _sp.is('[disabled]') ) return;
                    _sp.prop( 'checked', _checked );
                    _p.triggerEvent( _sp );
                });
            }
        , inverseChange:
            function(){
                var _p = this;
                _p._model.items().each( function(){
                    var _sp = $(this);
                    if( AutoChecked.isAutoChecked( _sp ) ) return;
                    if( _sp.is('[disabled]') ) return;
                    _sp.prop( 'checked', !_sp.prop('checked') );
                    _p.triggerEvent( _sp );
                });
                this._fixAll();
            }
        , _fixAll:
            function(){
                var _p = this, _checkAll = true, _count = 0;
                if( _p._model.allSelector().prop( 'disabled' ) ) return;

                _p._model.items().each( function(){
                    if( AutoChecked.isAutoChecked( $(this) ) ) return;
                    if( $(this).is('[disabled]') ) return;
                    _count++;
                    if( !$(this).prop('checked') ) return _checkAll = false;
                });

                JC.log( '_fixAll:', _checkAll );

                if( !_count ) _checkAll = false;

                _p._model.allSelector().prop('checked', _checkAll);
            }
        , triggerEvent:
            function( _item ){
                var _p = this, _triggerEvent = _p._model.checktrigger();
                _triggerEvent 
                    && $(_item).trigger( _triggerEvent )
                    ;
            }
    };
 
    $(document).ready( function( _evt ){
        AutoChecked.init( $(document) );
    });

}(jQuery));

