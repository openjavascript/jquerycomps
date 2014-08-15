;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href="widnow.jQuery.html">jQuery</a>
 *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.ServerSort.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.ServerSort/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 div class="js_compServerSort"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt></dt>
 *      <dd><dd>
 *  </dl> 
 *
 * @namespace   JC
 * @class       ServerSort
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version 2014-08-15
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.ServerSort 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.ServerSort = ServerSort;

    function ServerSort( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, ServerSort ) ) 
            return JC.BaseMVC.getInstance( _selector, ServerSort );

        JC.BaseMVC.getInstance( _selector, ServerSort, this );

        this._model = new ServerSort.Model( _selector );
        this._view = new ServerSort.View( this._model );

        this._init();

        //JC.log( ServerSort.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 ServerSort 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of ServerSortInstance}
     */
    ServerSort.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compServerSort' )  ){
                    _r.push( new ServerSort( _selector ) );
                }else{
                    _selector.find( 'div.js_compServerSort, tr.js_compServerSort' ).each( function(){
                        _r.push( new ServerSort( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( ServerSort );

    JC.f.extendObject( ServerSort.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'ServerSort _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                if( !( _p._model.items() && _p._model.items().length ) ) return;

                _p.on( 'inited', function(){
                    _p.trigger( 'UPDATE_LAYOUT' );
                });

                _p._model.items().on( 'click', function( _evt ){
                    _evt.preventDefault();
                    var _sp = $( this )
                        , _preSortName = JC.f.getUrlParam( _p._model.sortName() )
                        , _preType = JC.f.getUrlParam( _p._model.typeName() )
                        , _sortName = _sp.attr( 'sortName' )
                        , _sortType = _sp.attr( 'sortType' )
                        , _nextType
                        ;

                    _nextType = _preType;
                    if( _sortName == _p._model.defaultSortName() ){
                        if( _nextType ){
                            _sortType = _p._model.otherSortType( _nextType );
                        }else{
                            _sortType = _p._model.otherSortType( _p._model.defaultType() );
                        }
                    }else{
                        _sortType = _p._model.defaultType();
                    }
                    //JC.log( _p._model.defaultSortName(), '-', _preSortName, '-', _sortName, '-', _sortType, '-', JC.f.ts() );
                    _p.trigger( 'UPDATE', [ _sortName, _sortType, _preSortName, _preType ] );
                });

                _p.on( 'UPDATE', function( _evt, _sortName, _sortType, _preSortName, _preType  ){
                    var _url = _p._model.url()
                        , _params = {}
                        , _resetUrlParams = _p._model.resetUrlParams()
                        , _tmpD
                        ;

                        _params[ _p._model.sortName() ] = _sortName;
                        _params[ _p._model.typeName() ] = _sortType;
                        _url = JC.f.addUrlParams( _url, _params );

                        if( _resetUrlParams && _resetUrlParams.length ){
                            $.each( _resetUrlParams, function( _k, _item ){
                                if( !_item ) return;
                                if( JC.f.hasUrlParam( _url, _item ) ){
                                    _tmpD = {};
                                    _tmpD[ _item ] = 1;
                                    _url = JC.f.addUrlParams( _url, _tmpD );
                                }
                            });
                        }
                        
                        location.href = _url;
                });

                _p.on( 'UPDATE_LAYOUT', function( _evt ){
                    var _defalutSortName = _p._model.defaultSortName()
                        , _defaultType = _p._model.defaultType()
                        , _curType = JC.f.getUrlParam( _p._model.typeName() ) || _defaultType
                        , _items = _p._model.items();
                        ;
                    JC.log( _defalutSortName, _defaultType, _curType );
                    if( !( _items &&  _items.length ) ) return;

                    $.each( _items, function( _k, _item ){
                        _item = $( _item );
                        var _sortName = _item.attr( 'sortName' ), _class;

                        if( _sortName == _defalutSortName ){
                            _class = [ 
                                        _p._model.classEnum()[ _p._model.typeIndexAt( _p._model.otherSortType( _curType ) ) ]
                                        , _p._model.curClassEnum()[ _p._model.typeIndexAt( _p._model.otherSortType( _curType ) ) ] 
                                     ].join( ' ' );
                        }else{
                            _class = _p._model.classEnum()[ _p._model.typeIndexAt( _defaultType ) ];
                        }
                        JC.log( _k, _item, _class );

                        if( _class ){
                            _item.removeClass( _p._model.classEnum().concat( _p._model.curClassEnum() ).join( ' ' ) );
                            _item.addClass( _class );
                        }
                    });
                });
            }

        , _inited:
            function(){
                //JC.log( 'ServerSort _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    ServerSort.Model._instanceName = 'JCServerSort';
    JC.f.extendObject( ServerSort.Model.prototype, {
        init:
            function(){
                //JC.log( 'ServerSort.Model.init:', new Date().getTime() );
            }
        
        , typeIndexAt:
            function( _type ){
                var _r = 0;
                $.each( this.typeEnum(), function( _k, _item ){
                    if( _item === _type ){
                        _r = _k;
                        return false;
                    }
                });
                return _r;
            }

        , resetUrlParams:
            function(){
                if( !this._resetUrlParams ){
                    this._resetUrlParams = ( this.attrProp( 'cssResetUrlParams' ) ).replace( /[\s]+/g, '' );
                    this._resetUrlParams && ( this._resetUrlParams = this._resetUrlParams.split(',') )
                }
                return this._resetUrlParams;
            }

        , defaultType:
            function(){
                return this.attrProp( 'cssDefaultType' ) || this.typeEnum()[0];
            }

        , otherSortType:
            function( _type ){
                var _r;
                if( _type ){
                    $.each( this.typeEnum(), function( _k, _item ){
                        if( _type != _item ){
                            _r = _item;
                            return false;
                        }
                    });
                }
                _r = _r || this.typeEnum()[0];
                return _r;
            }

        , defaultSortName:
            function(){
                if( typeof this._defalutSortName == 'undefined' ){
                    this._defalutSortName = this.items().first().attr( 'sortName' );
                    this.is( '[cssDefaultSortName]' ) 
                        && ( this._defalutSortName = this.attrProp( 'cssDefaultSortName' ) || this._defalutSortName );
        
                    this._defalutSortName = JC.f.getUrlParam( this.sortName() ) || this._defalutSortName;
                }
                return this._defalutSortName;
            }

        , items: 
            function(){ 
                if( typeof this._items == 'undefined' ){
                    this._items = this.selectorProp( 'cssItems' ) || null;
                }
                return this._items;
            }

        , url: function(){ return JC.f.urlDetect( this.attrProp( 'cssUrl' ) || 'URL' ); }

        , sortName: function(){ return this.attrProp( 'cssSortName' ) || 'sortName'; }
        , typeName: function(){ return this.attrProp( 'cssTypeName' ) || 'sortType'; }

        , typeEnum: 
            function(){ 
                if( !this._typeEnum ){
                    this._typeEnum = ( this.attrProp( 'cssTypeEnum' ) || 'desc,asc' ).replace( /[\s]+/g, '' ).split( ',' );
                }
                return this._typeEnum;
            }

        , classEnum: 
            function(){ 
                if( !this._classEnum ){
                    this._classEnum = ( this.attrProp( 'cssClassEnum' ) || 'js_cssDesc,js_cssAsc' ).replace( /[\s]+/g, '' ).split( ',' );
                }
                return this._classEnum;
            }

        , curClassEnum: 
            function(){ 
                if( !this._curClassEnum ){
                    this._curClassEnum = ( this.attrProp( 'cssCurClassEnum' ) || 'js_cssDesc_cur,js_cssAsc_cur' ).replace( /[\s]+/g, '' ).split( ',' );
                }
                return this._curClassEnum;
            }

    });

    JC.f.extendObject( ServerSort.View.prototype, {
        init:
            function(){
                //JC.log( 'ServerSort.View.init:', new Date().getTime() );
            }
    });

    _jdoc.ready( function(){
        ServerSort.autoInit && ServerSort.init();
    });

    return JC.ServerSort;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
