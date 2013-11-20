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
                        _p.selector().addClass('AC_fakebox');
                    } );

                    _p._model.selector().on('blur', function() {
                        _p.selector().removeClass('AC_fakebox');
                    });


                    _p._model.selector().on('keyup', function( _evt ) {

                        var _keyCode = _evt.keyCode,
                        _sp = $(this),
                        _val = _sp.val().trim(),
                        _ignoretime = _sp.data('ignoretime');

                        if ( _ignoretime && ( _ignoretime - new Date().getTime() < 50 ) ) {
                            return;
                        }

                        JC.log('keyup', new Date().getTime() );

                        if ( _keyCode ) {
                            switch( _evt.keyCode ) {
                                //上下方向键
                                case 40:
                                case 38:
                                    _evt.preventDefault();
                                    break;
                                //左右方向键
                                case 37:
                                case 39:
                                    return;

                                case 9: 
                                case 27:                       
                                    _p._view.hide();
                                    return;
                            }
                        }

                        if ( !_val ) {
                            _p._view.build( _p._model.orginal );
                            return;
                        }

                        if ( !_p._model.cachData( _val ) ) {
                            //_p._model.cachData( _val, );
                            console.log('cachData');
                            var _data = _p._model.update( _val );
                            _p._view.update( _data );

                            _p._model.cachData( _val, _data );

                            return;
                        }
                    });

                    _p._model.selector().on('keydown', function( _evt ) {

                        var _isdown = true,
                        _keyCode = _evt.keyCode,
                        _sp = $(this);

                    JC.log('keydown', new Date().getTime() );

                    if ( _keyCode ) {
                        switch( _keyCode ) {
                            case 40:
                                //向下
                            case 38:
                                //向上
                                _evt.preventDefault();

                                if ( _evt.keyCode == 38 ) {
                                    _isdown = false;
                                }
                                _p._model.getKeyIndex( _isdown );

                            case 37:
                            case 39:
                                return;
                            case 13:
                                //enter
                                _p._model.cacPreventEnter() && _evt.preventDefault();
                                _sp.data('ignoretime', new Date().getTime() );

                            case 9:
                                //tab
                            case 27:
                                //esc
                                _p._view.hide();
                                return; 
                        }

                    }
                    });

                    _p._model.wordPanel().on('click', function( _evt ){
                        _evt.stopPropagation();
                    });

                    _p._model.wordPanel().delegate( 'li', 'click', function( _evt ){

                        _p.trigger('ACChange', [ $(this) ] );
                        _p.trigger('ACHidden');
                    } );

                    _p.on( 'ACChange', function( _evt, _srcSelector ){
                        _p._model.setKey( _srcSelector.data('value') );
                    });

                    _p.on( 'ACHidden', function () {
                        _p._view.hide();
                    } );

                    _p._model.wordPanel().delegate( '> li', 'mouseenter', function( _evt ) {
                        $(this).addClass('active');
                    });

                    _p._model.wordPanel().delegate( '> li', 'mouseleave', function( _evt ) {
                        $(this).removeClass('active');
                    });

                }, 

            _inited: 
                function(){
                    var _p = this;
                    //JC.log( 'AutoComplete _inited', new Date().getTime() );
                    _p._model.orginal =  _p._model.wordList();
                }
        };

        BaseMVC.buildModel( AutoComplete );
        AutoComplete.Model._instanceName = 'AutoComplete';
        AutoComplete.Model.prototype = {
            init: 
                function() {
                    // JC.log( 'AutoComplete.Model.init:', new Date().getTime() );
                },

            key: 
                function() {
                    return this.selector().val().trim();
                },

            keyIndex: -1,

            layoutTpl: function() {
                var _tpl = '<li data-id="{0}" data-value="{1}" data-type="{2}" data-py="{3}">{1}</li>';
                return _tpl;
            },

            wordPanel: 
                function() {
                    var _r = this.selector().data('AC_panel');
                        !_r && ( _r = this.selectorProp('cacPanel') );
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

            cachData: 
                function ( _key, _items ) {

                    var _cach = _cach || {};

                    if (  typeof _items != 'undefined' ) {
                        _cach[ _key ] = _items;
                    }

                    console.log("_cachs", _cach );
                    return _cach[_key];
                },

            // bestFilteredData: [],

            // betterFilteredData: [],

            filteredData: [],

            update: 
                function ( _val ) {
                    var _p = this,
                    _key = _val,
                    _wordList = this.orginal,
                    _i = 0,
                    bestFilteredData = [],
                    betterFilteredData = [];

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

            setSelect: 
                function( keyIndex ) {
                    var _el = this.list().eq(keyIndex),
                    _h = _el.position().top + _el.height(),
                    _ph = this.wordPanel().innerHeight(),
                    _top = this.wordPanel().scrollTop();

                    _h = _h + _top;

                    if ( keyIndex == -1 ) {

                        this.selector().focus();
                        this.list().removeClass('active');
                        this.setKey( '' );

                    } else {

                        //if ( _el.is(':visible') ) {
                        _el.addClass('active').siblings().removeClass('active');
                        this.setKey( _el.data('value') );
                        //}

                        if ( _h > _ph ) {
                            this.wordPanel().scrollTop( _h - _ph );
                        }

                        if ( _el.position().top < 0 ) {
                            this.wordPanel().scrollTop( 0 );
                        }

                    }

                },

            cacPreventEnter: 
                function(){
                      var _r;
                      _r = this.selector().is( '[cacPreventEnter]' ) 
                          && JC.f.parseBool( this.selector().attr('cacPreventEnter') );
                      return _r;
                }
        };

        BaseMVC.buildView( AutoComplete );
        AutoComplete.View.prototype = {
            init: 
                function(){
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

                    !_p._model.key() && _p._model.list().show().removeClass('active');

                },

            update: 
                function ( _val ) {
                    var _p  = this,
                    _wordList,
                    _view = [];

                    if ( _p._model.key() ) {
                        _p._model.update();
                        _wordList = _p._model.filteredData;

                        //this.build( _wordList );
                        this.build( _val )

                            // this.trigger('AUUpdate', [ $( this ) ] );
                    }  

                },

            build: 
                function( _data ) {

                    //console.log('build', _data );

                    var _p = this,
                    _i = 0,
                    _view = [];

                    if ( _data.length == 0 ) {
                        _p.hide();

                    } else {

                        for ( ; _i < _data.length; _i++ ) {
                            _view.push( JC.f.printf( _p._model.layoutTpl(), _data[_i].id,
                                        _data[_i].word, _data[_i].tag,
                                        _data[_i].py) );
                        }

                        _p._model.wordPanel().html( _view.join('') );
                        _p.show();

                    }

                    _p._model.list().removeClass('active');
                    _p._model.keyIndex = -1;

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
