//TODO: 添加 IE6 支持
//TODO: 移动 左右 方向键时, 显示 首字符到光标的过滤条件
//TODO: 添加 唯一 key 判断逻辑
;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
    ;(function($){
        /**
         * AutoComplete 文本框输入内容提示
         * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></p>
         * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
         * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.AutoComplete.html' target='_blank'>API docs</a>
         * | <a href='../../modules/JC.AutoComplete/0.1/_demo' target='_blank'>demo link</a></p>
         * <h2>可用的 HTML attribute</h2>
         * <dl>
         * </dl>
         * @namespace JC
         * @class AutoComplete
         * @constructor
         * @param   {selector|string}   _selector   
         * @version dev 0.1 2013-11-01
         * @author  zuojing<zuojing1013@gmail.com>, qiushaowei<suches@btbtd.org> | 75 Team
         * @example
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

        AutoComplete.update =
            function( _selector, _data ){
                var _ins = AutoComplete.getInstance( _selector );
                    !_ins && ( _ins = new AutoComplete( _selector ) );
                    _ins && _ins.update( _data );
                return _ins;
            };

        AutoComplete.dataFilter;

        AutoComplete.prototype = {
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
                    } );

                    _p._model.selector().on('focus', function() {
                        /*
                        if( !_p._model.selector().val().trim() && _p._model.selector().val().trim() == _p._model.preVal ){
                        }else{
                            _p._view.updateList();
                        }
                        */
                        _p._view.updateList();

                        _p.trigger( AutoComplete.Model.SHOW );
                        _p.selector().addClass( AutoComplete.Model.CLASS_FAKE );
                    } );

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
                        JC.log('keyup', _keyCode, new Date().getTime() );

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

                        JC.log('keydown', new Date().getTime() );

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

                    _p._model.popup().delegate( 'li', 'click', function( _evt ){
                        if( !$(this).is( '[' + _p._model.cacLabelKey() + ']' ) ) return;
                        _p.trigger( AutoComplete.Model.CHANGE, [ $(this) ] );
                        _p.trigger( AutoComplete.Model.HIDDEN );
                        _p._model.selector().trigger( 'blur' );
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
                        JC.log( AutoComplete.Model.UPDATE_LIST_INDEX, _keyCode, new Date().getTime() );
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

                    _p.on( AutoComplete.Model.UPDATE, function( _evt, _json ){
                        _p._model.initPopupData( _json );
                        _p._view.build( _json );
                    });

                    _p.on( AutoComplete.Model.CLEAR, function( _evt ){
                        _p._model.selector().val( '' );
                        _p._model.setIdSelectorData();
                    });
                } 

            , _inited: 
                function(){
                    var _p = this;
                    //JC.log( 'AutoComplete _inited', new Date().getTime() );
                    _p._model.initData =  _p._model.dataItems();
                    //alert( _p._model.initData.length );
                    //window.JSON && JC.log( JSON.stringify( _p._model.initData ) );
                    _p._model.ajaxData();
                }

            , show:
                function(){
                    var _p = this;
                    setTimeout( function(){
                        _p.trigger( AutoComplete.Model.SHOW );
                    }, 1);
                    return _p;
                }

            , hide:
                function(){
                    this.trigger( AutoComplete.Model.HIDDEN );
                    return this;
                }

            , popup:
                function(){
                    return this._model.popup();
                }
            
            , update:
                function( _json ){
                    var _p = this;
                    !_p._model.firstUpdate && _p.clear();
                    _p._model.firstUpdate = false;
                    _json = _p._model.cacDataFilter( _json );
                    _p.trigger( AutoComplete.Model.UPDATE, [ _json ] );
                    _p.trigger( AutoComplete.Model.UPDATE_LIST );

                    return _p;
                }

            , clear:
                function(){
                    this.trigger( AutoComplete.Model.CLEAR );
                    return this;
                }

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
        };

        BaseMVC.buildModel( AutoComplete );

        AutoComplete.Model._instanceName = 'AutoComplete';

        AutoComplete.Model.UPDATE = 'AC_UPDATE';
        AutoComplete.Model.CLEAR = 'AC_CLEAR';
        AutoComplete.Model.ENTER = 'AC_ENTER';
        AutoComplete.Model.CHANGE = 'AC_CHANGE';
        AutoComplete.Model.HIDDEN = 'AC_HIDDEN';
        AutoComplete.Model.SHOW = 'AC_SHOW';
        AutoComplete.Model.UPDATE_LIST= 'AC_UPDATE_LIST';
        AutoComplete.Model.UPDATE_LIST_INDEX = 'AC_UPDATE_LIST_INDEX';

        AutoComplete.Model.CLASS_ACTIVE = 'AC_active';
        AutoComplete.Model.CLASS_FAKE = 'AC_fakebox';

        AutoComplete.Model.AJAX_CACHE = {};

        AutoComplete.Model.prototype = {
            init: 
                function() {
                    // JC.log( 'AutoComplete.Model.init:', new Date().getTime() );
                    this.initData;      //保存初始化的数据
                    this._cache = {};
                    this.firstUpdate = true;
                }

            , keyIndex: -1

            , listItemTpl: function() {
                var _tpl = JC.f.printf( '<li ' 
                                        + this.cacIdKey()+ '="{0}" ' 
                                        + this.cacLabelKey() + '="{1}"'
                                        + ' data-index="{2}" class="AC_listItem {3}">{1}</li>' 
                                );
                return _tpl;
            }

            , popup: 
                function() {
                    var _p = this, _r = _p.selector().data('AC_panel');
                        !_r && ( _r = this.selectorProp('cacPopup') );

                        if( !( _r && _r.length ) ){
                            _r = $( JC.f.printf( '<ul class="AC_box js_compAutoCompleteBox"{0}>{1}</ul>'
                                                , ' style="display:none;position:absolute;"'
                                                , '<li style="text-align:center;">' + _p.cacNoDataText() + '</li>'
                                                ));
                            _p.selector().after( _r );
                        }

                        if( !this._inited ){
                            this._inited = true;
                            _r.css( { 'width': _p.cacBoxWidth() + 'px' } );
                        }

                    return _r;
                }

            , cacNoDataText:
                function(){
                    var _r = this.attrProp( 'cacNoDataText' ) || '数据加载中, 请稍候...';
                    return _r;
                }

            , initPopupData:
                function( _json ){
                    this.initData = _json;
                }

            , ajaxData:
                function(){
                    var _p = this, _url = _p.attrProp( 'cacAjaxDataUrl' );
                    if( !_url ) return;

                    if( _url in AutoComplete.Model.AJAX_CACHE ){
                        $( _p ).trigger( 'TriggerEvent', [ AutoComplete.Model.UPDATE, AutoComplete.Model.AJAX_CACHE[ _url ] ] ); 
                        return;
                    }

                    $.get( _url ).done( function( _d ){
                        _d = $.parseJSON( _d );
                        _d = _p.cacDataFilter( _d );
                        AutoComplete.Model.AJAX_CACHE[ _url ] = _d;
                        $( _p ).trigger( 'TriggerEvent', [ AutoComplete.Model.UPDATE, AutoComplete.Model.AJAX_CACHE[ _url ] ] ); 
                    });
                }
            , cacDataFilter:
                function( _d ){
                    var _filter = this.callbackProp( 'cacDataFilter' ) || AutoComplete.dataFilter;
                    _filter && ( _d = _filter( _d ) );
                    return _d;
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

            , cacStrictData:
                function(){
                    var _r = this.boolProp( 'cacStrictData' );
                    return _r;
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

            , cacLabelKey:
                function(){
                    var _r = this.attrProp( 'cacLabelKey' ) || 'data-label';
                    return _r;
                }

            , cacIdKey:
                function(){
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

            , cache: 
                function ( _key ) {

                    JC.log( '................cache', _key );

                    if( !( _key in this._cache ) ){
                        this._cache[ _key ] = this.keyData( _key ) || this.initData; 
                    }

                    return this._cache[ _key ];
                }

            , filteredData: []

            , keyData: 
                function ( _key ) {
                    var _p = this
                        , _dataItems = _p.initData
                        , _i = 0
                        , bestFilteredData = []
                        , betterFilteredData = []
                        ;

                    for (_i = 0; _i < _dataItems.length; _i++) {

                        if ( _dataItems[_i].label.indexOf( _key ) == 0 ) {
                            _dataItems[_i].tag = 1;
                            bestFilteredData.push( _dataItems[_i] );
                        } else if ( _dataItems[_i].label.indexOf( _key ) > 0 ) {
                            _dataItems[_i].tag = 0;
                            betterFilteredData.push( _dataItems[_i] );
                        } 

                    }

                    this.filteredData = bestFilteredData.concat( betterFilteredData );

                    return this.filteredData;
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
                    var _r = 0 || this.intProp( 'cacWidth' );

                    !_r && ( _r = this.selector().width() );

                    return _r;
                }

            , cacSubItemsSelector:
                function(){
                    var _r = this.attrProp( 'cacSubItemsSelector' ) || '> li';
                        _r += '[' + this.cacLabelKey() + ']';
                    return _r;
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
        };

        BaseMVC.buildView( AutoComplete );
        AutoComplete.View.prototype = {
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
                function( keyIndex ) {
                    var _p = this
                        , _el = _p._model.listItems().eq(keyIndex)
                        , _h = _el.position().top + _el.height()
                        , _ph = _p._model.popup().innerHeight()
                        , _top = _p._model.popup().scrollTop()
                        ;

                    _h = _h + _top;

                    if ( keyIndex == -1 ) {

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
        };

        BaseMVC.build( AutoComplete );

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

    }(jQuery));

    return JC.AutoComplete;

});}(typeof define === 'function' && define.amd ? define : function (_require, _cb) { _cb && _cb(); }, this));
