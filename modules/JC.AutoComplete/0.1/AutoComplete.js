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

        AutoComplete.prototype = {
            _beforeInit: 
                function(){
                     // JC.log( 'AutoComplete _beforeInit', new Date().getTime() );
                 }, 

            _initHanlderEvent: 
                function(){
                    //JC.log( 'AutoComplete _initHanlderEvent', new Date().getTime() );
                    var _p = this;

                    _p._model.selector().on('click', function( _evt ) {
                        _evt.stopPropagation();
                    } );

                    _p._model.selector().on('focus', function() {
                        _p._view.show();
                        _p.selector().addClass( AutoComplete.Model.CLASS_FAKE );
                    } );

                    _p._model.selector().on('blur', function() {
                        _p.selector().removeClass( AutoComplete.Model.CLASS_FAKE );
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
                                        _p._model.hide();
                                        return;
                                    }
                            }
                        }
                    });

                    _p._model.selector().on('keydown', function( _evt ) {
                        var _keyCode = _evt.keyCode
                            , _sp = $(this)
                            , _val = _sp.val().trim()
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
                                    if( !_p._model.wordPanel().is(':visible') ) return;
                                    break;
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
                                    _p._view.hide();
                                    return; 
                            }
                        }

                        _p._model.keydownTimeout( setTimeout( function(){
                            _p._view.updateList( _sp );
                        }, 200 ));

                    });

                    _p._model.wordPanel().on('click', function( _evt ){
                        _evt.stopPropagation();
                    });

                    _p._model.wordPanel().delegate( 'li', 'click', function( _evt ){
                        _p.trigger( AutoComplete.Model.CHANGE, [ $(this) ] );
                        _p.trigger( AutoComplete.Model.HIDDEN );
                    } );

                    _p.on( AutoComplete.Model.HIDDEN, function () {
                        _p._view.hide();
                    } );

                    _p._model.wordPanel().delegate( '> li', 'mouseenter'
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

                    /**
                     * li 点击时, 更新对应的内容
                     */
                    _p.on( AutoComplete.Model.CHANGE, function( _evt, _srcSelector ){
                        _p._model.setKey( _srcSelector.data('value') );
                    });
                }, 

            _inited: 
                function(){
                    var _p = this;
                    //JC.log( 'AutoComplete _inited', new Date().getTime() );
                    _p._model.initData =  _p._model.wordList();
                }
        };

        BaseMVC.buildModel( AutoComplete );

        AutoComplete.Model._instanceName = 'AutoComplete';

        AutoComplete.Model.ENTER = 'AC_ENTER';
        AutoComplete.Model.CHANGE = 'AC_CHANGE';
        AutoComplete.Model.HIDDEN = 'AC_HIDDEN';
        AutoComplete.Model.UPDATE_LIST_INDEX = 'AC_UPDATE_LIST_INDEX';

        AutoComplete.Model.CLASS_ACTIVE = 'AC_active';
        AutoComplete.Model.CLASS_FAKE = 'AC_fakebox';

        AutoComplete.Model.prototype = {
            init: 
                function() {
                    // JC.log( 'AutoComplete.Model.init:', new Date().getTime() );
                    this._cache = {};
                },

            keyIndex: -1,

            layoutTpl: function() {
                var _tpl = '<li data-id="{0}" data-value="{1}" data-index="{2}" class="AC_listItem {3}">{1}</li>';
                return _tpl;
            },

            wordPanel: 
                function() {
                    var _p = this, _r = _p.selector().data('AC_panel');
                        !_r && ( _r = this.selectorProp('cacPanel') );

                        if( !this._inited ){
                            this._inited = true;
                            _r.css( { 'width': _p.cacBoxWidth() + 'px' } );
                        }

                    return _r;
                },

            list: 
                function () {
                    return this.wordPanel().find('li');
                },

            wordList: 
                function() {
                    var _el = this.list(),
                    _result = [];

                    _el.each(function( _ix, _item ) {
                        var _sp = $(this);

                        _result.push({
                            el: _item,                   
                            id: _sp.data('id'),
                            word: _sp.data('value'),
                            py: _sp.data('py'),
                            tag: -1

                        });

                    });

                    return _result;

                },

            cache: 
                function ( _key ) {

                    if( !( _key in this._cache ) ){
                        this._cache[ _key ] = this.keyData( _key ) || this.initData; 
                    }

                    return this._cache[ _key ];
                },

            filteredData: [],

            keyData: 
                function ( _key ) {
                    var _p = this
                        , _wordList = this.initData
                        , _i = 0
                        , bestFilteredData = []
                        , betterFilteredData = []
                        ;

                    for (_i = 0; _i < _wordList.length; _i++) {

                        if ( _wordList[_i].word.indexOf( _key ) == 0 ) {
                            _wordList[_i].tag = 1;
                            bestFilteredData.push( _wordList[_i] );
                        } else if ( _wordList[_i].word.indexOf( _key ) > 0 ) {
                            _wordList[_i].tag = 0;
                            betterFilteredData.push( _wordList[_i] );
                        } 

                    }

                    this.filteredData = bestFilteredData.concat( betterFilteredData );

                    return this.filteredData;
                },


            setKey: 
                function ( key ) {
                    this.selector().val( key );
                },

            getKeyIndex: 
                function ( isdown ) {
                    var len  =  this.list().length - 1;

                    if ( isdown ) {
                        if ( this.keyIndex < len ) {
                            this.keyIndex++;
                        } else {
                            //this.selector().focus();
                            this.keyIndex = -1;

                        }

                    } else {
                        if ( this.keyIndex > 0 ) {
                            this.keyIndex--;
                        } else {
                            //this.selector().focus();
                            this.keyIndex = -1;

                        }
                    }
                    this.setSelect( this.keyIndex );
                },

            cacPreventEnter: 
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
                    return _r;
                }

            , listItems:
                function(){
                    var _r = $([]);

                    this.wordPanel() 
                        && this.wordPanel().length
                        && ( _r = this.wordPanel().find( this.cacSubItemsSelector() ) )
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

                    _p._model.wordPanel().hide();
                },

            show: 
                function() {
                    var _p = this;
                    _p._model.wordPanel().show();
                    //!_p._model.key() && _p._model.list().show();
                },

            updateList: 
                function () {
                    var _p  = this
                        , _wordList
                        , _view = []
                        , _val = _p._model.selector().val().trim()
                        ;

                    if ( !_val ) {
                        _p.build( _p._model.initData );
                        return;
                    }

                    _p.build( _p._model.cache( _val ) )
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
                            _view.push( JC.f.printf( _p._model.layoutTpl()
                                        , _data[_i].id
                                        , _data[_i].word
                                        , _i
                                        , _i == 0 ? AutoComplete.Model.CLASS_ACTIVE : ''
                                        ) );
                        }

                        _p._model.wordPanel().html( _view.join('') );
                        _p.show();
                    }
                }
            , currentIndex:
                function( _isDown ){
                    var _p = this
                        , _box = _p._model.wordPanel()
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
                        , _ph = _p._model.wordPanel().innerHeight()
                        , _top = _p._model.wordPanel().scrollTop()
                        ;

                    _h = _h + _top;

                    if ( keyIndex == -1 ) {

                        _p._model.selector().focus();
                        _p._model.listItems().removeClass( AutoComplete.Model.CLASS_ACTIVE );

                    } else {
                        _p._model.listItems().removeClass( AutoComplete.Model.CLASS_ACTIVE );
                        _el.addClass( AutoComplete.Model.CLASS_ACTIVE );
                        if ( _h > _ph ) {
                            _p._model.wordPanel().scrollTop( _h - _ph );
                        }
                        if ( _el.position().top < 0 ) {
                            _p._model.wordPanel().scrollTop( 0 );
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
