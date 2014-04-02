//TODO: 添加 IE6 支持
//TODO: 移动 左右 方向键时, 显示 首字符到光标的过滤条件
;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
    /**
     * AutoComplete 文本框内容输入提示
     * <br />响应式初始化, 当光标焦点 foucs 到 文本框时, 会检查是否需要自动初始化 AutoComplete 实例
     * <p><b>require</b>: 
     *      <a href='window.jQuery.html'>jQuery</a>
     *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     * </p>
     *
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.AutoComplete.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.AutoComplete/0.1/_demo' target='_blank'>demo link</a></p>
     *
     * <h2>可用的 HTML attribute</h2>
     * <dl>
     *      <dt>cacPopup = selector, optional</dt>
     *      <dd>显式指定用于显示数据列表的弹框, 如不指定, 载入数据时会自己生成 popup node</dd>
     *
     *      <dt>cacPreventEnter = bool, default = false</dt>
     *      <dd>文本框按回车键时, 是否阻止默认行为, 防止提交表单</dd>
     *
     *      <dt>cacLabelKey = string, default = data-label</dt>
     *      <dd>用于显示 label 的HTML属性</dd>
     *
     *      <dt>cacIdKey = string, default= data-id</dt>
     *      <dd>用于显示 ID 的HTML属性</dd>
     *
     *      <dt>cacIdSelector = selector</dt>
     *      <dd>用于保存 ID 值的 node</dd>
     *
     *      <dt>cacIdVal = string, optional</dt>
     *      <dd>用于初始化的默认ID, 如果 cacIdVal 为空将尝试读取 cacIdSelector 的值</dd>
     *
     *      <dt>cacStrictData = bool, default = false</dt>
     *      <dd>是否验证已填内容的合法性<br />仅在 cacIdSelector 和 cacIdKey 显式声明时有效</dd>
     *
     *      <dt>cacAjaxDataUrl = url</dt>
     *      <dd>
     *          获取 数据的 AJAX 接口
     *          <dl>
     *              <dt>数据格式</dt>
     *              <dd>
     *                  [ { "id": "id value", "label": "label value" }, ... ]
     *              </dd>
     *          </dl>
     *      </dd>
     *
     *      <dt>cacDataFilter = callback</dt>
     *      <dd>
     *          <dl>
     *              <dt>如果 数据接口获取的数据不是默认格式, 
     *                  可以使用这个属性定义一个数据过滤函数, 把数据转换为合适的格式
     *              </dt>
     *              <dd>
<pre>function cacDataFilter( _json ){
if( _json.data && _json.data.length ){
    _json = _json.data;
}

$.each( _json, function( _ix, _item ){
    _item.length &&
        ( _json[ _ix ] = { 'id': _item[0], 'label': _item[1] } )
        ;
});
return _json;
}</pre>
     *              </dd>
     *          </dl>
     *      </dd>
     *
     *      <dt>cacBoxWidth = int</dt>
     *      <dd>定义 popup 的宽度, 如果没有显式定义, 将使用 selector 的宽度</dd>
     *
     *      <dt>cacCasesensitive = bool, default = false</dt>
     *      <dd>是否区分英文大小写</dd>
     *
     *      <dt>cacSubItemsSelector = selector string, default = "&gt; li"
     *      <dd>popup 查找数据项的选择器语法</dd>
     *
     *      <dt>cacNoDataText = string, default = "数据加载中, 请稍候..."</dt>
     *      <dd>加载数据时的默认提示文字</dd>
     *
     *      <dt>cacValidCheckTimeout = int, default = 1</dt>
     *      <dd>定义 JC.Valid blur 时执行 check 的时间间隔, 主要为防止点击列表时已经 Valid.check 的问题</dd>
     *
     *      <dt>cacFixHtmlEntity = bool</dt>
     *      <dd>是否将 HTML实体 转为 html</dd>
     * </dl>
     * @namespace JC
     * @class AutoComplete
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1 2013-11-01
     * @author  zuojing<zuojing1013@gmail.com>, qiushaowei<suches@btbtd.org> | 75 Team
     * @example
        <div class="ui-sug-mod">
            <input name="ac" type="text" class="ui-sug-ipt js_compAutoComplete" value="" 
                autocomplete="off" 

                cacPopup="/ul.js_compAutoCompleteBox"

                cacLabelKey="data-label"
                cacIdKey="data-id"

                cacPreventEnter="true" 
                />
            <div style="height:200px"></div>
            <ul class="AC_box js_compAutoCompleteBox" style="display:none;">
                <li data-id="9" data-label="yy语音">yy语音</li>
                <li data-id="10" data-label="yy直播">yy直播</li>
                <li data-id="11" data-label="yy频道设计">yy频道设计</li>
                <li data-id="12" data-label="yy网页版">yy网页版</li>
                <li data-id="13" data-label="youku">youku</li>
                <li data-id="14" data-label="yeah">yeah</li>
                <li data-id="15" data-label="yahoo">yahoo</li>
                <li data-id="09" data-label="YY语音">YY语音</li>
                <li data-id="010" data-label="YY直播">YY直播</li>
                <li data-id="011" data-label="YY频道设计">YY频道设计</li>
                <li data-id="012" data-label="YY网页版">YY网页版</li>
                <li data-id="013" data-label="YOUKU">YOUKU</Li>
                <li data-id="014" data-label="YEAH">YEAH</LI>
            </ul>
        </div>
     */
    JC.AutoComplete = AutoComplete;

    function AutoComplete( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( AutoComplete.getInstance( _selector ) ) return AutoComplete.getInstance( _selector );

        AutoComplete.getInstance( _selector, this );

        this._model = new AutoComplete.Model( _selector );
        this._view = new AutoComplete.View( this._model );
        this._init();

        JC.log( 'AutoComplete inited', new Date().getTime() );
    }
    /**
     * 获取或设置 AutoComplete 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {AutoCompleteInstance}
     */
    AutoComplete.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( AutoComplete.Model._instanceName, _setter );

            return _selector.data( AutoComplete.Model._instanceName );
        };
    /**
     * 初始化可识别的 AutoComplete 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of AutoCompleteInstance}
     */
    AutoComplete.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_compAutoComplete' )  ){
                    _r.push( new AutoComplete( _selector ) );
                }else{
                    _selector.find( 'input.js_compAutoComplete' ).each( function(){
                        _r.push( new AutoComplete( this ) );
                    });
                }
            }
            return _r;
        };
    /**
     * 更新原始数据
     * @method  update
     * @param   {selector}      _selector
     * @param   {json}          _data
     * @static
     * @return  {AutoCompleteInstance}
     */
    AutoComplete.update =
        function( _selector, _data, _selectedId ){
            var _ins = AutoComplete.getInstance( _selector );
                !_ins && ( _ins = new AutoComplete( _selector ) );
                _ins && _ins.update( _data, _selectedId );
            return _ins;
        };
    /**
     * 使用 ajax 接口更新原始数据
     * @method  ajaxUpdate
     * @param   {selector}      _selector
     * @param   {url string}    _url
     * @param   {callback}      _cb
     * @static
     * @return  {AutoCompleteInstance}
     */
    AutoComplete.ajaxUpdate =
        function( _selector, _url, _cb ){
            var _ins = AutoComplete.getInstance( _selector );
                !_ins && ( _ins = new AutoComplete( _selector ) );
                _ins && _ins.ajaxUpdate( _url, _cb );
            return _ins;
        };
    /**
     * 定义全局数据过滤函数
     * @method  dataFilter
     * @param   {json}      _json
     * @static
     * @return  {json}
     */
    AutoComplete.dataFilter;
    /**
     * 是否将 HTML实体 转为 html
     * @property    fixHtmlEntity
     * @type        bool
     * @default     true
     * @static
     */
    AutoComplete.fixHtmlEntity = true;

    BaseMVC.build( AutoComplete );

    JC.f.extendObject( AutoComplete.prototype, {
        _beforeInit: 
            function(){
                 // JC.log( 'AutoComplete _beforeInit', new Date().getTime() );
             } 

        , _initHanlderEvent: 
            function(){
                //JC.log( 'AutoComplete _initHanlderEvent', new Date().getTime() );
                var _p = this;

                _p._model.selector().on('click', function( _evt ) {
                    _evt.stopPropagation();
                    //JC.log( 'click' );

                    JC.f.safeTimeout( function(){
                    }, _p._model.selector(), 'SHOW_AC_POPUP', 50 );
                    if( !_p._model.popup().is( ':visible' ) ){
                        _p.trigger( 'show_popup' );
                    }
                } );

                _p._model.selector().on('focus', function() {
                    //JC.log( 'focus' );
                    _p.trigger( 'show_popup' );
                } );

                _p.on( 'show_popup', function(){
                    _p.trigger( 'hide_all_popup' );
                    /*
                    if( !_p._model.selector().val().trim() && _p._model.selector().val().trim() == _p._model.preVal ){
                    }else{
                        _p._view.updateList();
                    }
                    */
                    _p._view.updateList();

                    _p.trigger( AutoComplete.Model.SHOW );
                    _p.selector().addClass( AutoComplete.Model.CLASS_FAKE );
                });

                _p._model.selector().on('blur', function() {
                    _p._model.preVal = _p._model.selector().val().trim();
                    _p.selector().removeClass( AutoComplete.Model.CLASS_FAKE );
                    _p._model.verifyKey();
                });

                _p._model.selector().on('keyup', function( _evt ) {

                    var _keyCode = _evt.keyCode
                        , _sp = $(this)
                        , _val = _sp.val().trim()
                        ;

                    if( _keyCode == 38 || _keyCode == 40 ){
                        AutoComplete.Model.isScroll = true;
                    }
                    //JC.log('keyup', _keyCode, new Date().getTime() );

                    if ( _keyCode ) {
                        switch( _keyCode ){
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
                            case 27://esc
                                {
                                    _p.trigger( AutoComplete.Model.HIDDEN );
                                    return;
                                }
                        }
                    }
                });

                _p._model.selector().on('keydown', function( _evt ) {
                    var _keyCode = _evt.keyCode
                        , _val = _p._model.selector().val().trim()
                        ;

                    if( _keyCode == 38 || _keyCode == 40 ){
                        AutoComplete.Model.isScroll = true;
                    }

                    //JC.log('keydown', new Date().getTime() );

                    if ( _keyCode ) {
                        switch( _keyCode ){
                            case 40:
                            case 38:
                            case 13:
                                if( !_p._model.popup().is(':visible') ) return;
                                break;
                        }

                        if( !_p._model.popup().is(':visible') ){
                            _p.trigger( AutoComplete.Model.SHOW );
                        }

                        switch( _keyCode ) {
                            case 40:
                            case 38:
                                _p.trigger( AutoComplete.Model.UPDATE_LIST_INDEX, [ _keyCode, _evt ] );
                                return;

                            case 37:
                            case 39:
                                return;
                            case 13: //enter
                                _p.trigger( AutoComplete.Model.ENTER, [ _evt ] );
                                return;
                            case 9: //tab
                            case 27: //esc
                                _p.trigger( AutoComplete.Model.HIDDEN );
                                return; 
                        }
                    }

                    _p._model.keydownTimeout( setTimeout( function(){
                        _p.trigger( AutoComplete.Model.UPDATE_LIST );
                    }, 200 ));

                });
                /**
                 * 点击列表时, 阻止冒泡
                 */
                _p._model.popup().on('click', function( _evt ){
                    _evt.stopPropagation();
                });

                _p._model.popup().delegate( 'li', 'click', function( _evt, _ignoreBlur ){
                    if( !$(this).is( '[' + _p._model.cacLabelKey() + ']' ) ) return;
                    _p.trigger( AutoComplete.Model.CHANGE, [ $(this) ] );
                    _p.trigger( AutoComplete.Model.HIDDEN );

                    !_ignoreBlur &&
                        _p._model.blurTimeout( setTimeout( function(){
                            _p._model.selector().trigger( 'blur' );
                        }, 50 ) );
                });

                _p._model.popup().delegate( '.AC_closePopup', 'click', function( _evt ){
                    _p.trigger( 'hide_all_popup' );
                });

                _p._model.popup().delegate( '.AC_clear', 'click', function( _evt ){
                    _p.selector().val( '' );
                });

                _p.on( 'hide_all_popup', function(){
                    $( 'ul.js_compAutoCompleteBox' ).hide();
                });

                _p.on( AutoComplete.Model.HIDDEN, function () {
                    _p._view.hide();
                });

                _p.on( AutoComplete.Model.SHOW, function () {
                    _p._view.show();
                });

                _p._model.popup().delegate( '> li', 'mouseenter'
                    , function mouseHandler( _evt ) {
                        if( AutoComplete.Model.isScroll ) return;
                        _p._view.updateIndex( $(this).attr('data-index'), true );
                    }
                );

                _p.on( AutoComplete.Model.ENTER, function( _evt, _srcEvt ){
                    _p._model.cacPreventEnter() && _srcEvt.preventDefault();
                    var _selectedItem = _p._model.selectedItem();
                    _selectedItem 
                        && _selectedItem.length
                        && _p.trigger( AutoComplete.Model.CHANGE, [ _selectedItem ] )
                        ;
                    _p.trigger( AutoComplete.Model.HIDDEN );
                });

                _p.on( AutoComplete.Model.UPDATE_LIST_INDEX, function( _evt, _keyCode, _srcEvt ){
                    _srcEvt.preventDefault();
                    //JC.log( AutoComplete.Model.UPDATE_LIST_INDEX, _keyCode, new Date().getTime() );
                    _p._view.updateListIndex( _keyCode == 40 ? true : false );

                    var _selectedItem = _p._model.selectedItem();
                    _selectedItem 
                        && _selectedItem.length
                        && _p.trigger( AutoComplete.Model.CHANGE, [ _selectedItem ] )
                        ;
                });

                _p.on( AutoComplete.Model.UPDATE_LIST, function( _evt ){
                    this._view.updateList( this._model.selector() );
                });

                /**
                 * 响应 li 点击时, 更新对应的内容
                 */
                _p.on( AutoComplete.Model.CHANGE, function( _evt, _srcSelector ){
                    _p._model.setSelectorData( _srcSelector );
                });

                _p.on( AutoComplete.Model.UPDATE, function( _evt, _json, _cb ){
                    _p._model.initPopupData( _json );
                    _p._view.build( _json );
                    _cb && _cb.call( _p, _json );
                });

                _p.on( AutoComplete.Model.CLEAR, function( _evt ){
                    _p._model.selector().val( '' );
                    _p._model.setIdSelectorData();
                });

                _p._model.selector().on( AutoComplete.Model.REMOVE, function(){
                    try{ _p._model.popup().remove(); } catch( _ex ){}
                });

                _p.on( 'select_item', function( _evt, _id ){
                    //JC.log( 'select_item: ', _id );
                    if( typeof _id == 'undefined' ) return;

                    var _popup = _p._model.popup(), _selectedItem;
                    if( !( _popup && _popup.length ) ) return;
                    _selectedItem = _popup.find( JC.f.printf( '> li[data-id={0}]', _id ) );

                    _selectedItem 
                        && _selectedItem.length
                        && _selectedItem.trigger( 'click', [ true ] )
                        ;
                });

                _p.on( AutoComplete.Model.CLEAR_DATA, function(){
                    _p.trigger( AutoComplete.Model.UPDATE, [ [] ] );
                });
            } 

        , _inited: 
            function(){
                var _p = this;
                //JC.log( 'AutoComplete _inited', new Date().getTime() );
                _p._model.initData =  _p._model.dataItems();
                _p.ajaxUpdate();

                if( !_p._model.selector().is( '[validCheckTimeout]' ) ){
                    _p._model.selector().attr( 'validCheckTimeout', _p._model.cacValidCheckTimeout() );
                }
                //alert( _p._model.initData.length );
                //window.JSON && JC.log( JSON.stringify( _p._model.initData ) );
            }
        /**
         * 获取 绑定的 id node
         * @method  idSelector
         * @return  {selector}
         */
        , idSelector: function(){ return this._model.cacIdSelector(); }
        /**
         * 获取/设置 id 值 
         * @method  idVal
         * @param   {string}    _id
         * @return  {id string}
         */
        , idVal: 
            function( _id ){ 
                typeof _id != 'undefined' && this.trigger( 'select_item' );
                return this._model.cacIdVal(); 
            }
        /**
         * 使用 ajax 接口更新原始数据
         * @method  ajaxUpdate
         * @param   {string}    _url
         * @param   {callback}   _cb
         */
        , ajaxUpdate:
            function( _url, _cb ){
                this._model.ajaxData( _url, _cb );
                return this;
            }
        /**
         * 显示数据列表
         * @method  show
         */
        , show:
            function(){
                var _p = this;
                setTimeout( function(){
                    _p.trigger( AutoComplete.Model.SHOW );
                }, 1);
                return _p;
            }
        /**
         * 隐藏数据列表
         * @method  hide
         */
        , hide:
            function(){
                this.trigger( AutoComplete.Model.HIDDEN );
                return this;
            }
        /**
         * 获取数据列表 node
         * @method  popup
         * @return  {selector}
         */
        , popup:
            function(){
                return this._model.popup();
            }
        /**
         * 更新原始数据
         * @method  update
         * @param   {json}  _json
         */
        , update:
            function( _json, _selectedId ){
                var _p = this;
                !_p._model.firstUpdate && _p.clear();
                _p._model.firstUpdate = false;
                _json = _p._model.cacDataFilter( _json );
                _p.trigger( AutoComplete.Model.UPDATE, [ _json ] );
                _p.trigger( AutoComplete.Model.UPDATE_LIST );
                typeof _selectedId != 'undefined' && _p.trigger( 'select_item', [ _selectedId ] );

                return _p;
            }
        /**
         * 清除 selector 和 idSelector 的默认值
         * @method  clear
         */
        , clear:
            function(){
                this.trigger( AutoComplete.Model.CLEAR );
                return this;
            }
        /**
         * 清除所有数据
         * @method  clearAll
         */
        , clearAll:
            function(){
                this.trigger( AutoComplete.Model.CLEAR );
                this.trigger( AutoComplete.Model.CLEAR_DATA );
                return this;
            }

        /**
         * 校正数据列表的显示位置
         * @method  fixPosition
         */
        , fixPosition:
            function(){
                var _popup = this._model.popup();
                _popup 
                    && _popup.length 
                    && _popup.is( ':visible' )
                    && this._view.show()
                    ;
                return this;
            }
    });

    AutoComplete.Model._instanceName = 'AutoComplete';

    AutoComplete.Model.UPDATE = 'AC_UPDATE';
    AutoComplete.Model.CLEAR = 'AC_CLEAR';
    AutoComplete.Model.CLEAR_DATA = 'AC_CLEAR_DATA';
    AutoComplete.Model.ENTER = 'AC_ENTER';
    AutoComplete.Model.CHANGE = 'AC_CHANGE';
    AutoComplete.Model.HIDDEN = 'AC_HIDDEN';
    AutoComplete.Model.SHOW = 'AC_SHOW';
    AutoComplete.Model.UPDATE_LIST= 'AC_UPDATE_LIST';
    AutoComplete.Model.UPDATE_LIST_INDEX = 'AC_UPDATE_LIST_INDEX';
    AutoComplete.Model.REMOVE = 'AC_AUTOCOMPLETE_REMOVE';

    AutoComplete.Model.CLASS_ACTIVE = 'AC_active';
    AutoComplete.Model.CLASS_FAKE = 'AC_fakebox';

    AutoComplete.Model.AJAX_CACHE = {};

    JC.f.extendObject( AutoComplete.Model.prototype, {
        init: 
            function() {
                // JC.log( 'AutoComplete.Model.init:', new Date().getTime() );
                this.initData;      //保存初始化的数据
                this._cache = {};
                this.firstUpdate = true;
            }

        , listItemTpl: function() {
            var _tpl = JC.f.printf( '<li ' 
                                    + this.cacIdKey()+ '="{0}" ' 
                                    + this.cacLabelKey() + '="{1}"'
                                    + ' data-index="{2}" class="AC_listItem {3}">{1}</li>' 
                            );
            this.is( '[cacListItemTpl]' ) 
                && ( _tpl = JC.f.scriptContent( this.selectorProp( 'cacListItemTpl' ) ) )
                ;
            //JC.log( _tpl );

            return _tpl;
        }

        , popup: 
            function() {
                var _p = this, _r = _p.selector().data('AC_panel');
                    !_r && ( _r = this.selectorProp('cacPopup') );

                    if( !( _r && _r.length ) ){
                        _r = $( JC.f.printf( '<ul class="AC_box js_compAutoCompleteBox"{0}>{1}</ul>'
                                            , ' style="display:none;position:absolute;"'
                                            , '<li class="AC_noData">' + _p.cacNoDataText() + '</li>'
                                            ));
                        //_p.selector().after( _r );
                        _p.selector().data( 'AC_panel', _r );
                        _r.appendTo( document.body );
                    }

                    if( !this._inited ){
                        this._inited = true;
                        _r.css( { 'width': _p.cacBoxWidth() + 'px' } );
                    }

                return _r;
            }

        , initPopupData:
            function( _json ){
                this.initData = _json;
            }
        /**
         * 验证 key && id 是否正确
         * 仅在 cacStrictData 为真的时候进行验证
         */
        , verifyKey:
            function(){
                if( !this.cacStrictData() ) return;
                var _p = this
                    , _label = this.selector().val().trim()
                    , _findLs = []
                    , _definedIdKey = _p.selector().is( '[cacIdKey]' )
                    , _isCor
                    ;

                if( !_label ){
                    _p.selector().val( '' );
                    _p.setIdSelectorData();
                    return;
                }

                if( _label ){
                    var _id = _p.cacIdVal(), _findId, _findLabel;

                    $.each( _p.initData, function( _ix, _item ){
                        //JC.log( _item.label, _item.id );
                        if( _definedIdKey ){
                            var _slabel = _item.label.trim();
                            //var _slabel = $( '<p>' + _item.label.trim() + '</p>' ).text();

                            if( _slabel === _label ){
                                _isCor = true;
                                !_findLabel && _p.setIdSelectorData( _item.id );
                                _findLabel = true;
                            }

                            if( _slabel === _label && !_id ){
                                _p.setIdSelectorData( _id = _item.id );
                            }

                            if( _slabel === _label && _item.id === _id ){
                                _findLs.push( _item );
                                !_findId && ( _p.setIdSelectorData( _item.id ) );
                                _findId = true;
                                _isCor = true;
                                return false;
                            }
                        }else{
                            if( _item.label.trim() == _label ){
                                _findLs.push( _item );
                                _isCor = true;
                            }
                        }
                    });
                }

                if( !_isCor ){
                    _p.selector().val( '' );
                    _p.setIdSelectorData();
                }
            }

        , cache: 
            function ( _key ) {

                //JC.log( '................cache', _key );

                if( !( _key in this._cache ) ){
                    this._cache[ _key ] = this.keyData( _key ) || this.initData; 
                }

                return this._cache[ _key ];
            }

        , dataItems: 
            function() {
                var _p = this
                    , _el = _p.listItems()
                    , _result = []
                    ;

                _el.each(function( _ix, _item ) {
                    var _sp = $(this);

                    _result.push({
                        //'el': _item                   
                        'id': _sp.attr( _p.cacIdKey() ) || ''
                        , 'label': _sp.attr( _p.cacLabelKey() )
                    });

                });
                return _result;
            }

        , ajaxData:
            function( _url, _cb ){
                var _p = this, _url = _url || _p.attrProp( 'cacAjaxDataUrl' );
                if( !_url ) return;

                if( _url in AutoComplete.Model.AJAX_CACHE ){
                    $( _p ).trigger( 'TriggerEvent'
                            , [ AutoComplete.Model.UPDATE, AutoComplete.Model.AJAX_CACHE[ _url ], _cb ] 
                            ); 
                    return;
                }

                $.get( _url ).done( function( _d ){
                    _d = $.parseJSON( _d );
                    _d = _p.cacDataFilter( _d );
                    AutoComplete.Model.AJAX_CACHE[ _url ] = _d;
                    $( _p ).trigger( 'TriggerEvent', [ AutoComplete.Model.UPDATE
                                                        , AutoComplete.Model.AJAX_CACHE[ _url ]
                                                        , _cb
                                                    ] ); 
                });
            }

        , keyData: 
            function ( _key ) {
                var _p = this
                    , _dataItems = _p.initData
                    , _i = 0
                    , _caseSensitive = _p.cacCasesensitive()
                    , _lv = _key.toLowerCase()
                    , _sortData = [[], [], [], []]
                    , _finalData = [];
                    ;

                for (_i = 0; _i < _dataItems.length; _i++) {
                    var _slv = _dataItems[_i].label.toLowerCase();

                    if ( _dataItems[_i].label.indexOf( _key ) == 0 ) {
                        _sortData[ _dataItems[_i].tag = 0 ].push( _dataItems[_i] );
                    } else if( !_caseSensitive && _slv.indexOf( _lv ) == 0 ) {
                        _sortData[ _dataItems[_i].tag = 1 ].push( _dataItems[_i] );
                    } else if ( _dataItems[_i].label.indexOf( _key ) > 0 ) {
                        _sortData[ _dataItems[_i].tag = 2 ].push( _dataItems[_i] );
                    } else if( !_caseSensitive && _slv.indexOf( _lv ) > 0 ) {
                        _sortData[ _dataItems[_i].tag = 3 ].push( _dataItems[_i] );
                    } 
                }

                $.each( _sortData, function( _ix, _item ){
                    _finalData = _finalData.concat( _item );
                });

                return _finalData;
            }

        , setSelectorData:
            function( _selector ){
                _selector && ( _selector = $( _selector ) );
                if( !( _selector && _selector.length ) ) return;
                var _p = this
                    , _label = _selector.attr( _p.cacLabelKey() ).trim()
                    , _id = _selector.attr( _p.cacIdKey() ).trim()
                    ;

                _p.selector().val( _label );

                _p.selector().attr( 'cacIdVal', _id );
                _p.setIdSelectorData( _id );
            }

        , setIdSelectorData:
            function( _val ){
                var _p = this;
                if( !( _p.cacIdSelector() && _p.cacIdSelector().length ) ) return;
                if( typeof _val != 'undefined' ){
                    _p.cacIdSelector().val( _val );
                    _p.selector().attr( 'cacIdVal', _val );
                }else{
                    _p.cacIdSelector().val( '' );
                    _p.selector().attr( 'cacIdVal', '' );
                }
            }

        , listItems:
            function(){
                var _r;

                this.popup() 
                    && this.popup().length
                    && ( _r = this.popup().find( this.cacSubItemsSelector() ) )
                    ;
                return _r;
            }

        , selectedItem:
            function(){
                var _r;
                this.listItems().each( function(){
                    var _sp = $(this);
                    if( _sp.hasClass( AutoComplete.Model.CLASS_ACTIVE ) ){
                        _r = _sp;
                        return false;
                    }
                });
                return _r;
            }

        , keyupTimeout:
            function( _tm ){
                this._keyupTimeout && clearTimeout( this._keyupTimeout );
                this._keyupTimeout = _tm;
            }

        , keydownTimeout:
            function( _tm ){
                this._keydownTimeout && clearTimeout( this._keydownTimeout );
                this._keydownTimeout = _tm;
            }

        , blurTimeout:
            function( _tm ){
                this._blurTimeout && clearTimeout( this._blurTimeout );
                this._blurTimeout = _tm;
            }

        , cacDataFilter:
            function( _d ){
                var _p = this, _filter = _p.callbackProp( 'cacDataFilter' ) || AutoComplete.dataFilter;
                _filter && ( _d = _filter( _d ) );

                if( _p.cacFixHtmlEntity() ){
                    $.each( _d, function( _ix, _item ){
                        _item.label && ( _item.label = $( '<p>' + _item.label + '</p>' ).text() );
                    });
                }
                return _d;
            }

        , cacNoDataText:
            function(){
                var _r = this.attrProp( 'cacNoDataText' ) || '数据加载中, 请稍候...';
                return _r;
            }

        , cacValidCheckTimeout:
            function(){
                var _r = this.intProp( 'cacValidCheckTimeout' ) || AutoComplete.validCheckTimeout || 1;
                return _r;
            }

        , cacStrictData:
            function(){
                var _r = this.boolProp( 'cacStrictData' );
                return _r;
            }

        , cacFixHtmlEntity:
            function(){
                var _r = AutoComplete.fixHtmlEntity;
                this.selector().is( '[cacFixHtmlEntity]' )
                    && ( _r = this.boolProp( 'cacFixHtmlEntity' ) );
                return _r;
            }

        , cacLabelKey:
            function(){
                var _r = this.attrProp( 'cacLabelKey' ) || 'data-label';
                return _r;
            }

        , cacIdKey:
            function( _setter ){
                typeof _setter != 'undefined' && ( this.selector().attr( 'cacIdKey', _setter ) );
                var _r = this.attrProp( 'cacIdKey' ) || this.cacLabelKey();
                return _r;
            }

        , cacIdVal:
            function(){
                var _p = this, _r = _p.attrProp( 'cacIdVal' );

                _p.cacIdSelector()
                    && _p.cacIdSelector().length
                    && ( _r = _p.cacIdSelector().val() )
                    ;
                _r = ( _r || '' ).trim();
                return _r;
            }

        , cacIdSelector:
            function(){
                var _r = this.selectorProp( 'cacIdSelector' );
                return _r;
            }

        , cacPreventEnter: 
            function(){
                  var _r;
                  _r = this.selector().is( '[cacPreventEnter]' ) 
                      && JC.f.parseBool( this.selector().attr('cacPreventEnter') );
                  return _r;
            }

        , cacBoxWidth:
            function(){
                var _r = 0 || this.intProp( 'cacBoxWidth' );

                !_r && ( _r = this.selector().width() );

                return _r;
            }

        , cacCasesensitive:
            function(){
                return this.boolProp( 'cacCasesensitive' );
            }

        , cacSubItemsSelector:
            function(){
                var _r = this.attrProp( 'cacSubItemsSelector' ) || '> li';
                    _r += '[' + this.cacLabelKey() + ']';
                return _r;
            }

        , cacAddtionItem: function(){ return this.boolProp( 'cacAddtionItem' ); }
    });

    JC.f.extendObject( AutoComplete.View.prototype, {
        init: 
            function(){
                var _p = this;

                _p._model.listItems().each( function( _ix ){
                    $(this).attr( 'data-index', _ix );
                })
                .removeClass( AutoComplete.Model.CLASS_ACTIVE )
                .first().addClass( AutoComplete.Model.CLASS_ACTIVE )
                ;

                // JC.log( 'AutoComplete.View.init:', new Date().getTime() );
            },

        hide: 
            function() {
                var _p = this;

                _p._model.popup().hide();
            },

        show: 
            function() {
                var _p = this
                    , _offset = _p._model.selector().offset()
                    , _h = _p._model.selector().prop( 'offsetHeight' )
                    , _w = _p._model.selector().prop( 'offsetWidth' )
                    ;
                _p._model.popup().css( {
                    'top': _offset.top + _h + 'px'
                    , 'left': _offset.left + 'px'
                });

                var _selectedItem
                    , _label = _p._model.selector().val().trim()
                    , _id = _p._model.cacIdVal()
                    , _idCompare = _p._model.cacLabelKey() != _p._model.cacIdKey() 
                    ;

                _p._model.listItems().each( function(){
                    var _sp = $(this)
                        , _slabel = _sp.attr( _p._model.cacLabelKey() )
                        , _sid = _sp.attr( _p._model.cacIdKey() )
                        ;

                    //JC.log( _slabel, _sid, _label, _id );

                    _sp.removeClass( AutoComplete.Model.CLASS_ACTIVE );
                    if( _label == _slabel ){
                        if( _idCompare && _id ){
                            _id == _sid && _sp.addClass( AutoComplete.Model.CLASS_ACTIVE );
                            _selectedItem = _sp;
                        }else{
                            _sp.addClass( AutoComplete.Model.CLASS_ACTIVE );
                            _selectedItem = _sp;
                        }
                    }
                });

                if( !_selectedItem ){
                    _p._model.listItems().first().addClass( AutoComplete.Model.CLASS_ACTIVE );
                }

                _p._model.popup().show();
                //!_p._model.key() && _p._model.list().show();
            },

        updateList: 
            function () {
                var _p  = this
                    , _dataItems
                    , _view = []
                    , _label = _p._model.selector().val().trim()
                    , _id = _p._model.cacIdVal()
                    , _data
                    ;

                if ( !_label ) {
                    _data = _p._model.initData;
                }else{
                    _data = _p._model.cache( _label, _id );
                }
                _data && _p.build( _data );
            },

        build: 
            function( _data ) {
                var _p = this
                    , _i = 0
                    , _view = []
                    ;

                if ( _data.length == 0 ) {
                    _p.hide();
                    _p._model.popup().html( JC.f.printf( '<li class="AC_noData">{0}</li>', _p._model.cacNoDataText() ) );
                } else {
                    for ( ; _i < _data.length; _i++ ) {
                        _view.push( JC.f.printf( _p._model.listItemTpl()
                                    , _data[_i].id
                                    , _data[_i].label
                                    , _i
                                    , _i === 0 ? AutoComplete.Model.CLASS_ACTIVE : ''
                                    ) );
                    }

                    _p._model.popup().html( _view.join('') );

                }

                _p._model.cacAddtionItem() 
                    && $( JC.f.printf( '<li class="AC_addtionItem" style="text-align: right; padding-right: 5px;">{0}{1}</li>'
                                , '<a href="javascript:;" class="AC_control AC_clear">清除</a>&nbsp;'
                                , '<a href="javascript:;" class="AC_control AC_closePopup">关闭</a>'
                        )).appendTo( _p._model.popup() )
                    ;

            }
        , currentIndex:
            function( _isDown ){
                var _p = this
                    , _box = _p._model.popup()
                    , _listItems = _p._model.listItems()
                    , _ix = -1
                    ;
                if( !_listItems.length ) return;

                _listItems.each( function( _six ){
                    var _sp = $(this);
                    if( _sp.hasClass( AutoComplete.Model.CLASS_ACTIVE ) ){
                        _ix = _six;
                        return false;
                    }
                });
                if( _ix < 0 ){
                    _ix = _isDown ? 0 : _listItems.length - 1;
                }else{
                    _ix = _isDown ? _ix + 1 : _ix - 1;
                    if( _ix < 0 ){
                        _ix = _listItems.length - 1;
                    }else if( _ix >= _listItems.length ){
                        _ix = 0;
                    }
                }
                return _ix;
            }
        , updateListIndex: 
            function( _isDown ){
                var _p = this, _ix = _p.currentIndex( _isDown );
                _p.updateIndex( _ix );
                //JC.log( 'updateListIndex', _ix, new Date().getTime() );
            }

        , updateIndex:
            function( _ix, _ignoreScroll ){
                var _p = this, _listItems = _p._model.listItems();
                _p.removeActiveClass();

                $( _listItems[ _ix ] ).addClass( AutoComplete.Model.CLASS_ACTIVE );
                !_ignoreScroll && _p.setScroll( _ix );
            }

        , setScroll: 
            function( _keyIndex ) {
                var _p = this
                    , _el = _p._model.listItems().eq(_keyIndex)
                    , _h = _el.position().top + _el.height()
                    , _ph = _p._model.popup().innerHeight()
                    , _top = _p._model.popup().scrollTop()
                    ;

                _h = _h + _top;

                if ( _keyIndex == -1 ) {
                    _p._model.selector().focus();
                    _p._model.listItems().removeClass( AutoComplete.Model.CLASS_ACTIVE );
                } else {
                    _p._model.listItems().removeClass( AutoComplete.Model.CLASS_ACTIVE );
                    _el.addClass( AutoComplete.Model.CLASS_ACTIVE );
                    if ( _h > _ph ) {
                        _p._model.popup().scrollTop( _h - _ph );
                    }
                    if ( _el.position().top < 0 ) {
                        _p._model.popup().scrollTop( 0 );
                    }
                }

                AutoComplete.Model.SCROLL_TIMEOUT && clearTimeout( AutoComplete.Model.SCROLL_TIMEOUT );

                AutoComplete.Model.SCROLL_TIMEOUT =
                    setTimeout( function(){
                        AutoComplete.Model.isScroll = false;
                    }, 500 );

            }

        , removeActiveClass:
            function(){
                this._model.listItems().removeClass( AutoComplete.Model.CLASS_ACTIVE );
            }
    });

    $.event.special[ AutoComplete.Model.REMOVE ] = {
        remove: 
            function(o) {
                if (o.handler) {
                    o.handler()
                }
            }
    };

    $( window ).on( 'resize', function( _evt ){
        $( 'input.js_compAutoComplete' ).each( function(){
            var _ins = AutoComplete.getInstance( $( this ) );
                _ins && _ins.fixPosition();
        });
    });

    $(document).on( 'click', function(){
        $('ul.js_compAutoCompleteBox, div.js_compAutoCompleteBox').hide();
    });

    $(document).delegate( 'input.js_compAutoComplete', 'focus', function( _evt ){
        !AutoComplete.getInstance( this ) 
            && new AutoComplete( this )
            ;
    });

    /*
    $(document).ready( function(){
        var _insAr = 0;
        AutoComplete.autoInit && ( _insAr = AutoComplete.init() );
    });
    */

    return JC.AutoComplete;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
