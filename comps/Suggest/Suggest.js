;(function($){
    //TODO: 自动生成 layout, layout 自动定位 
    window.Suggest = JC.Suggest = Suggest;
    /**
     * Suggest 关键词补全提示类
     * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Suggest.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Suggest/_demo' target='_blank'>demo link</a></p>
     * <h2>可用的 HTML attribute</h2>
     * <dl>
     *      <dt>sugwidth: int</dt>
     *      <dd>显示列表的宽度</dd>
     *
     *      <dt>suglayout: selector</dt>
     *      <dd>显示列表的容器</dd>
     *
     *      <dt>sugdatacallback: string</dt>
     *      <dd>
     *          请求 JSONP 数据的回调名
     *          <br /><b>注意:</b> 是字符串, 不是函数, 并且确保 window 下没有同名函数
     *      </dd>
     *
     *      <dt>sugurl: string</dt>
     *      <dd>
     *          数据请求 URL API
     *          <br />例: http://sug.so.360.cn/suggest/word?callback={1}&encodein=utf-8&encodeout=utf-8&word={0} 
     *          <br />{0}=关键词, {1}=回调名称
     *      </dd>
     *
     *      <dt>sugneedscripttag: bool, default=true</dt>
     *      <dd>
     *          是否需要 自动添加 script 标签
     *          <br />Sugggest 设计为支持三种数据格式: JSONP, AJAX, static data
     *          <br />目前只支持 JSONP 数据
     *      </dd>
     *
     *      <dt>sugselectedcallback: function</dt>
     *      <dd>用户鼠标点击选择关键词后的回调</dd>
     *
     *      <dt>sugdatafilter: function</dt>
     *      <dd>数据过滤回调</dd>
     * </dl>
     * @namespace JC
     * @class Suggest
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     * @date    2013-08-11
     * @example
     */
    function Suggest( _selector ){
        _selector && ( _selector = $(_selector) );
        if( !_selector || Suggest.getInstance( _selector ) ) return;
        Suggest.getInstance( _selector, this );

        this._model = new Model( _selector );
        this._view = new View( this._model );

        this._init();
    }
    
    Suggest.prototype = {
        _init:
            function(){
                var _p = this;

                this._initHanlderEvent();

                _p._view.init();
                _p._model.init();

                this._initActionEvent();

                _p.trigger( 'SuggestInited' );
                 
                return _p;
            }    
        /**
         *
         *  suggest_so({ "p" : true,
              "q" : "shinee",
              "s" : [ "shinee 综艺",
                  "shinee美好的一天",
                  "shinee hello baby",
                  "shinee吧",
                  "shinee泰民",
                  "shinee fx",
                  "shinee快乐大本营",
                  "shinee钟铉车祸",
                  "shinee年下男的约会",
                  "shinee dream girl"
                ]
            });
         */
        , update: 
            function( _evt, _data ){
                var _p = this;
                typeof _data == 'undefined' && ( _data = _evt );

                if( _p._model.sugdatafilter() ){
                    _data = _p._model.sugdatafilter().call( this, _data );
                }

                if( _data && _data.q ){
                    _p._model.cache( _data.q, _data );
                }

                this._view.update( _data );
            }
        /**
         * 显示 Suggest 
         * @method  show
         * @return  SuggestInstance
         */
        , show: function(){ this._view.show(); return this; }
        /**
         * 隐藏 Suggest
         * @method  hide
         * @return  SuggestInstance
         */
        , hide: function(){ this._view.hide(); return this; }
        /**
         * 获取 显示 Suggest 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 获取 Suggest 外观的 选择器
         * @method  layout
         * @return  selector
         */
        , layout: function(){ return this._model.layout(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  SuggestInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  SuggestInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
        , _initHanlderEvent:
            function(){
                var _p = this;

                $(_p._view).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $(_p._view).on('TriggerEvent', function( _evt, _evtName, _data ){
                    _p.trigger( _evtName, [ _data ] );
                });

                $(_p._model).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $(_p._model).on('TriggerEvent', function( _evt, _evtName, _data ){
                    //JC.log( JSON.stringify( _data ) );
                    _p.trigger( _evtName, _data );
                });
            }
        , _initActionEvent:
            function(){
                var _p = this;

                _p.on( 'SuggestUpdate', _p.update );
                _p.on( 'SuggestInited', function( _evt ){
                    if( _p._model.suginitedcallback() ){
                        _p._model.suginitedcallback().call( _p );
                    }
                });

                _p._model.selector().on('keyup', function( _evt ){
                    var _sp = $(this), _val = _sp.val().trim(), _keycode = _evt.keyCode;

                    JC.log( 'keyup', _val, new Date().getTime(), _keycode );

                    if( _keycode ){
                        switch( _keycode ){
                            case 38://up
                            case 40://down
                                {
                                    _evt.preventDefault();
                                }
                            case 37:
                            case 39:
                                {
                                    return;
                                }
                            case 27:
                                {
                                    _p.hide();
                                    return;
                                }
                        }
                    }

                    if( !_val ){
                        _p.update();
                        return;
                    }

                    if( !_p._model.layout().is(':visible') ){
                        if( _p._model.cache( _val ) ){
                            _p.update( _p._model.cache( _val ) );
                            return;
                        }
                    }

                    if( _p._model.preValue === _val ){
                        return;
                    }
                    _p._model.preValue = _val;

                    if( _p._model.cache( _val ) ){
                        _p.update( _p._model.cache( _val ) );
                        return;
                    }

                    JC.log( _val );

                    if( _p._model.queryinterval() ){
                        if( _p._model.timeout ){
                            clearTimeout( _p._model.timeout );
                        }
                        _p._model.timeout =
                            setTimeout( function(){
                                _p._model.getData( _val );
                            }, _p._model.queryinterval() );
                    }else{
                        _p._model.getData( _val );
                    }
                });

                _p._model.selector().on('keydown', function( _evt ){
                   var _keycode = _evt.keyCode, _keyindex, _isBackward
                        , _items = _p._model.items(), _item;
                    _keycode == 38 && ( _isBackward = true );

                    switch( _keycode ){
                        case 38://up
                        case 40://down
                            {
                                _keyindex = _p._model.nextIndex( _isBackward );

                                if( _keyindex >= 0 && _keyindex < _items.length ){
                                    _evt.preventDefault();
                                    _item = $(_items[_keyindex]);
                                    _p._model.selectedIdentifier( _item );
                                    _p.selector().val( _p._model.getKeyword( _item ) );
                                    return;
                                }
                                break;
                            }
                    }
                });

                $( _p._model.layout() ).delegate( '.js_sugItem', 'mouseenter', function(_evt){
                    _p._model.selectedIdentifier( $(this), true );
                });

                $( _p._model.layout() ).delegate( '.js_sugItem', 'mouseleave', function(_evt){
                    $(this).removeClass('active');
                });

                _p.selector().on( 'click', function(_evt){
                    _evt.stopPropagation();
                    _p.selector().trigger( 'keyup' );
                });

                $( _p._model.layout() ).delegate( '.js_sugItem', 'click', function(_evt){
                    var _sp = $(this), _keyword = _p._model.getKeyword( _sp );
                    _p.selector().val( _keyword );
                    _p.hide();
                    
                    _p.trigger('SuggestSelected', [_sp]);
                    _p._model.sugselectedcallback() && _p._model.sugselectedcallback().call( _p, _keyword );
                });
            }
    }
    /**
     * 获取或设置 Suggest 的实例
     * @method getInstance
     * @param   {selector}              _selector
     * @param   {SuggestInstace|null}   _setter
     * @static
     * @return  {Suggest instance}
     */
    Suggest.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'SuggestInstace', _setter );

            return _selector.data('SuggestInstace');
        };
    /**
     * 判断 selector 是否可以初始化 Suggest
     * @method  isSuggest
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    Suggest.isSuggest =
        function( _selector ){
            var _r;
            _selector 
                && ( _selector = $(_selector) ).length 
                && ( _r = _selector.is( '[suglayout]' ) );
            return _r;
        };
    /**
     * 设置 Suggest 是否需要自动初始化
     * @property    autoInit
     * @type        bool
     * @default     true
     * @static
     */
    Suggest.autoInit = true;
    /**
     * 自定义列表显示模板
     * @property    layoutTpl
     * @type        string
     * @default     empty
     * @static
     */
    Suggest.layoutTpl = '';
    /**
     * 数据过滤回调
     * @property    dataFilter
     * @type        function
     * @default     undefined
     * @static
     */
    Suggest.dataFilter;
    
    function Model( _selector ){
        this._selector = _selector;
        this._id = 'Suggest_' + new Date().getTime();
    }
    
    Model.prototype = {
        init:
            function(){
                return this;
            }

        , selector: function(){ return this._selector; }
        , layoutTpl: '<dl class="sug_layout js_sugLayout" style="display:none;"></dl>'
        , layout: 
            function(){

                !this._layout && this.selector().is('[suglayout]') 
                    && ( this._layout = $( this.selector().attr('suglayout') ) );

                !this._layout && ( this._layout = $( Suggest.layoutTpl() || this.layoutTpl ) );
                !this._layout.hasClass('js_sugLayout') && this._layout.addClass( 'js_sugLayout' );

                if( this.sugwidth() ){
                    this._layout.css( { 'width': this.sugwidth() + 'px' } );
                }

                return this._layout;
            }
        , sugwidth:
            function(){
                this.selector().is('[sugwidth]') 
                    && ( this._sugwidth = parseInt( this.selector().attr('sugwidth') ) );
                return this._sugwidth;
            }
        , sugoffsetleft:
            function(){
                this.selector().is('[sugoffsetleft]') 
                    && ( this._sugoffsetleft = parseInt( this.selector().attr('sugoffsetleft') ) );
                !this._sugoffsetleft && ( this._sugoffsetleft = 0 );
                return this._sugoffsetleft;
            }
        , sugoffsettop:
            function(){
                this.selector().is('[sugoffsettop]') 
                    && ( this._sugoffsettop = parseInt( this.selector().attr('sugoffsettop') ) );
                !this._sugoffsettop && ( this._sugoffsettop = 0 );
                return this._sugoffsettop;
            }
        , sugsidepadding:
            function(){
                this.selector().is('[sugsidepadding]') 
                    && ( this._sugsidepadding = parseInt( this.selector().attr('sugsidepadding') ) );
                !this._sugsidepadding && ( this._sugsidepadding = 0 );
                return this._sugsidepadding;
            }
        , _dataCallback:
            function( _data ){
                $(this).trigger( 'TriggerEvent', ['SuggestUpdate', _data] );
            }
        , sugdatacallback:
            function(){
                var _p = this;
                this.selector().is('[sugdatacallback]') 
                    && ( this._sugdatacallback = this.selector().attr('sugdatacallback') );
                !this._sugdatacallback && ( this._sugdatacallback = 'SuggestDataCallback' );
                !window[ this._sugdatacallback ] 
                    && ( window[ this._sugdatacallback ] = function( _data ){ _p._dataCallback( _data ); } );

                return this._sugdatacallback;
            }
        , sugurl:
            function( _word ){
                this.selector().is('[sugurl]') 
                    && ( this._sugurl = this.selector().attr('sugurl') );
                !this.selector().is('[sugurl]') && ( this._sugurl = '?word={0}&callback={1}' );
                this._sugurl = printf( this._sugurl, _word, this.sugdatacallback() );
                return this._sugurl;
            }
        , sugneedscripttag:
            function(){
                this._sugneedscripttag = true;
                this.selector().is('[sugneedscripttag]') 
                    && ( this._sugneedscripttag = parseBool( this.selector().attr('sugneedscripttag') ) );
                return this._sugneedscripttag;
            }
        , getData:
            function( _word ){
                var _p = this, _url = this.sugurl( _word ), _script, _scriptId = 'script_' + _p._id;
                JC.log( _url, new Date().getTime() );
                if( this.sugneedscripttag() ){
                    $( '#' + _scriptId ).remove();
                    _script = printf( '<script id="{1}" src="{0}"><\/script>', _url, _scriptId );
                    $( _script ).appendTo( document.body );
                }else{
                    $.get( _url, function( _d ){
                        _d = $.parseJSON( _d );
                        _p._dataCallback( _d );
                    });
                }
            }
        , cache: 
            function( _key, _val ){
                this._cache = this._cache || {};
                typeof _val != 'undefined' && ( this._cache[ _key ] = _val );
                return this._cache[ _key ];
            }
        , sugselectedcallback:
            function(){
                var _p = this;
                this.selector().is('[sugselectedcallback]') 
                    && ( this._sugselectedcallback = this.selector().attr('sugselectedcallback') );
                return this._sugselectedcallback ? window[ this._sugselectedcallback] : null;
            }
        , suginitedcallback:
            function(){
                var _p = this;
                this.selector().is('[suginitedcallback]') 
                    && ( this._suginitedcallback = this.selector().attr('suginitedcallback') );
                return this._suginitedcallback ? window[ this._suginitedcallback ] : null;
            }
        , sugdatafilter:
            function(){
                var _p = this;
                this.selector().is('[sugdatafilter]') 
                    && ( this._sugdatafilter = this.selector().attr('sugdatafilter') );
                this._sugdatafilter = this._sugdatafilter || Suggest.dataFilter;
                return this._sugdatafilter ? window[ this._dataCallback ] : null;
            }
        , queryinterval: 
            function(){
                this.selector().is('[queryinterval]') 
                    && ( this._queryinterval = parseInt( this.selector().attr('queryinterval') ) );
                this._queryinterval = this._queryinterval || 200;
                return this._queryinterval;
            }
        , timeout: null
        , preValue: null
        , keyindex: -1
        , nextIndex:
            function( _isBackward ){
                var _items = this.items(), _len = _items.length;

                if( _isBackward ){
                    if( this.keyindex <= 0 ){
                        this.keyindex = _len - 1;
                    }else{
                        this.keyindex--;
                    }
                }else{
                    if( this.keyindex >= _len - 1 ){
                        this.keyindex = 0;
                    }else{
                        this.keyindex++;
                    }
                }

                return this.keyindex;
            }
        , items: function(){ return this.layout().find('.js_sugItem') }
        , selectedIdentifier:
            function( _selector, _updateKeyIndex ){
                this._preSelected && this._preSelected.removeClass( 'active' );
                _selector.addClass( 'active' );
                _updateKeyIndex && ( this.keyindex = parseInt( _selector.attr('keyindex') ) );
                this._preSelected = _selector;
            }
        , getKeyword:
            function( _selector ){
                var _keyword = _selector.attr('keyword');
                try{ _keyword = decodeURIComponent( _keyword ); }catch(ex){}
                return _keyword;
            }
        , currentData:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._currentData = _setter );
                return this._currentData;
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

        , show: 
            function(){ 
                $(this).trigger( 'TriggerEvent', ['SuggestBeforeShow'] );
                this._model.layout().show(); 
                $(this).trigger( 'TriggerEvent', ['SuggestShow'] );
            }
        , hide: 
            function(){ 
                this._model.layout().hide();
                this.reset();
                $(this).trigger( 'TriggerEvent', ['SuggestHide'] );
            }
        , update:
            function( _data ){
                var _p = this, _ls = [], _query, _tmp, _text;

                if( !( _data && _data.s && _data.s.length ) ){
                    _p.hide();
                    return;
                }

                for( var i = 0, j = _data.s.length; i < j; i++ ){
                    _tmp = _data.s[i], _text = _tmp, _query = _data.q || '';
                    if( _tmp.indexOf( _query ) > -1 ){
                        _text = _text.slice( _query.length );
                        _text = '<b>' + _text + '</b>';
                    }
                    else _query = '';
                    _ls.push( printf('<dd keyword="{2}" keyindex="{3}" class="js_sugItem">{0}{1}</dd>'
                                , _query, _text, encodeURIComponent( _tmp ), i
                            ));
                }

                _p._model.layout().html( _ls.join('') );
                JC.log( 'suggest update' );
                this.reset();
                _p._model.currentData( _data );
                $(this).trigger( 'TriggerEvent', ['SuggestUpdated'] );

                _p.show();
            }
        , reset:
            function(){
                JC.log( 'suggest reset' );
                this._model.keyindex = -1;
                this._model.layout().find( '.js_sugItem' ).removeClass('active'); 
                $(this).trigger( 'TriggerEvent', ['SuggestReset'] );
            }
    };

    /**
     * 初始化完后的事件
     * @event   SuggestInited
     */
    /**
     * 获得新数据的事件
     * @event   SuggestUpdate
     */
    /**
     * 数据更新完毕后的事件
     * @event   SuggestUpdated
     */
    /**
     * 显示前的事件
     * @event   SuggestBeforeShow
     */
    /**
     * 显示后的事件
     * @event   SuggestShow
     */

    $(document).delegate( 'input[type=text]', 'focus', function( _evt ){
        var _p = $(this), _ins = Suggest.getInstance( _p );
        if( _ins || !Suggest.isSuggest( _p ) || !Suggest.autoInit ) return;
        JC.log( 'Suggest input fined:', _p.attr('name'), new Date().getTime() );
        _ins = new Suggest( _p );
    });

    $(document).on('click', function( _evt ){
        $('dl.js_sugLayout, div.js_sugLayout').hide();
    });

}(jQuery));
