//TODO: 文本框 自动添加 autocomplete="off", 防止表单的默认提示
//列表项 添加 title 属性
;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.AutoComplete', 'JC.AutoSelect' ], function(){
    /**
     * <h2>结合 JC.AutoSelect 与 JC.AutoComplete 综合使用的一个业务逻辑</h2>
     * <br />应用场景: CRM 多级广告位最后一级因为内容较多, 用户使用传统的下拉框选择比较不便
     * <br />这个业务组件结合 JC.AutoSelect 和 JC.AutoComplete 提供一种简便的可输入解决方案
     * <p><b>require</b>: 
     *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     *      , <a href='JC.AutoComplete.html'>JC.AutoComplete</a>
     *      , <a href='JC.AutoSelect.html'>JC.AutoSelect</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.AutoSelectComplete.html' target='_blank'>API docs</a>
     * | <a href='../../modules/Bizs.AutoSelectComplete/0.1/_demo' target='_blank'>demo link</a></p>
     * <h2>可用的 HTML attribute</h2>
     * <dl>
     *      <dt>bascAjaxUrl = url</dt>
     *      <dd>
     *          获取 JC.AutoComplete 数据的 AJAX 接口
     *          <dl>
     *              <dt>数据格式</dt>
     *              <dd>
     *                  [ { "id": "id value", "label": "label value" }, ... ]
     *              </dd>
     *          </dl>
     *      </dd>
     *
     *      <dt>bascDefaultSelect = selector</dt>
     *      <dd>声明 JC.AutoSelect 的围住 select</dd>
     * </dl>
     * @namespace window.Bizs
     * @class AutoSelectComplete
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1 2013-11-25
     * @author  qiushaowei<suches@btbtd.org> | 75 Team
     * @example
     */
    Bizs.AutoSelectComplete = AutoSelectComplete;
    JC.f.addAutoInit( AutoSelectComplete );

    function AutoSelectComplete( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( AutoSelectComplete.getInstance( _selector ) ) return AutoSelectComplete.getInstance( _selector );
        AutoSelectComplete.getInstance( _selector, this );

        this._model = new AutoSelectComplete.Model( _selector );
        this._view = new AutoSelectComplete.View( this._model );

        this._init();

        JC.log( 'AutoSelectComplete inited', new Date().getTime() );
    }
    /**
     * 获取或设置 AutoSelectComplete 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {AutoSelectCompleteInstance}
     */
    AutoSelectComplete.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( AutoSelectComplete.Model._instanceName, _setter );

            return _selector.data( AutoSelectComplete.Model._instanceName );
        };
    /**
     * 初始化可识别的 AutoSelectComplete 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of AutoSelectCompleteInstance}
     */
    AutoSelectComplete.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( '.js_bizAutoSelectComplete' )  ){
                    _r.push( new AutoSelectComplete( _selector ) );
                }else{
                    _selector.find( 'input.js_bizAutoSelectComplete' ).each( function(){
                        _r.push( new AutoSelectComplete( this ) );
                    });
                }
            }
            return _r;
        };


    AutoSelectComplete.prototype = {
        _beforeInit:
            function(){
                JC.log( 'AutoSelectComplete _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'BASC_SELECT_CHANGED', function( _evt, _select ){

                    JC.log( 'Bizs.AutoSelectComplete all changed', new Date().getTime() );
                    _p.trigger( 'BASC_ALL_CHANGE', [ _select ] );

                    var _id = _select.val(), _select, _id, _json;

                    if( !_id ){
                        _p.trigger( 'BASC_CLEAR' );
                        _p.trigger( 'BASC_CHANGE', [ _select ] );
                    }else{

                        JC.AutoComplete.ajaxUpdate( 
                            _p._model.selector()
                            , JC.f.printf( _p._model.bascAjaxUrl(), _id ) 
                            , function( _json ){
                                _p.trigger( 'BASC_CHANGE', [ _select, _id, _json ] );

                                var _autoCompleteIns = this;
                                if( _p._model.firstUpdate() ){
                                    _p._model.firstUpdate( false );
                                    _p.trigger( 'BASC_FIRST_UPDATE', [ _json, _autoCompleteIns ] );
                                    return;
                                }
                                _p.trigger( 'BASC_CLEAR' );
                            }
                        );
                    }
                });

                _p.on( 'BASC_CLEAR', function(){
                    var _acIns = JC.AutoComplete.getInstance( _p._model.selector() );
                    if( !_acIns ) return;
                    _acIns.clear();
                });

                _p.on( 'BASC_ALL_CHANGE', function( _evt, _select ){
                    var _acIns = JC.AutoComplete.getInstance( _p._model.selector() );
                    if( _select.is( ':visible' ) && _select.val() ){
                        if( _acIns ){
                            _p._model.selector().show();
                        }else{
                            _p._model.selector().hide();
                        }
                    }else{
                        _p._model.selector().hide();
                    }
                });

                _p.on( 'BASC_CHANGE', function( _evt, _select, _id, _json ){
                    JC.log( 'BASC_CHANGE', new Date().getTime(), _id, _json );
                    var _acIns = JC.AutoComplete.getInstance( _p._model.selector() );
                    if( !( _id && _json && _json.length ) ){
                        _p._model.selector().hide();
                        JC.log( 'hide' );
                    }else{
                        _p._model.selector().show();
                    }
                });

                _p.on( 'BASC_FIRST_UPDATE', function( _evt, _json, _autoCompleteIns ){
                    var _id = _autoCompleteIns.idVal();
                    if( !_id ) return;
                    $.each( _json, function( _ix, _item ){
                        if( _item.id == _id ){
                            _autoCompleteIns.selector().val( _item.label );
                            return false;
                        }
                    });
                });
            }
        , _inited:
            function(){
                JC.log( 'AutoSelectComplete _inited', new Date().getTime() );
                this._model.selector().attr( 'cacDataFilter', AutoSelectComplete.Model.DATA_FILTER_NAME );
                this._model.injectDefaultSelectCallback();
            }
    };

    BaseMVC.buildModel( AutoSelectComplete );

    AutoSelectComplete.Model._instanceName = 'AutoSelectComplete';
    AutoSelectComplete.Model.INS_COUNT = 1;

    AutoSelectComplete.Model.DATA_FILTER_NAME = 'BizsAutoSelectCompleteDataFilter';

    AutoSelectComplete.Model.prototype = {
        init:
            function(){
                JC.log( 'AutoSelectComplete.Model.init:', new Date().getTime() );

                this._insCount = AutoSelectComplete.Model.INS_COUNT++;
                this._firstUpdate = true;
            }

        , firstUpdate:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._firstUpdate = _setter );
                return this._firstUpdate;
            }

        , insCount: function(){ return this._insCount; }

        , bascDefaultSelect:
            function(){
                var _r = this.selectorProp( 'bascDefaultSelect' );
                return _r;
            }

        /**
         * selectallchanged
         */
        , injectDefaultSelectCallback:
            function(){
                var _p = this
                    , _cb = _p.callbackProp( _p.bascDefaultSelect(), 'selectallchanged' )
                    , _newCbName = 'AutoSelectComplete_inject_' + _p.insCount()
                    ;
                if( _p.bascDefaultSelect().attr( 'selectallchanged' ) == _newCbName ){
                    return;
                }

                window[ _newCbName ] = 
                    function( _selectItems ){
                        if( _cb ){
                            _cb.apply( this, JC.f.sliceArgs( arguments ) );
                        }

                        $( _p ).trigger( 'TriggerEvent', [ 'BASC_SELECT_CHANGED', _selectItems[ _selectItems.length - 1 ] ] );
                    };
                _p.bascDefaultSelect().attr( 'selectallchanged', _newCbName );
            }

        , bascAjaxUrl:
            function(){
                var _r = this.attrProp( 'bascAjaxUrl' );
                return _r;
            }

        , bascDefaultLabel:
            function(){
                var _r = this.attrProp( 'bascDefaultLabel' );
                return _r;
            }

        , bascDefaultId:
            function(){
                var _r = this.attrProp( 'bascDefaultId' );
                return _r;
            }
    };

    BaseMVC.buildView( AutoSelectComplete );
    AutoSelectComplete.View.prototype = {
        init:
            function(){
                JC.log( 'AutoSelectComplete.View.init:', new Date().getTime() );
            }
    };

    BaseMVC.build( AutoSelectComplete, 'Bizs' );

    window[ AutoSelectComplete.Model.DATA_FILTER_NAME ] =
        function ( _json ){
            if( _json.data && _json.data.length ){
                _json = _json.data;
            }

            $.each( _json, function( _ix, _item ){
                _item.length &&
                    ( _json[ _ix ] = { 'id': _item[0], 'label': _item[1] } )
                    ;
            });

            return _json;
        };

    $(document).ready( function(){
        var _insAr = 0;
        AutoSelectComplete.autoInit
            && ( _insAr = AutoSelectComplete.init() )
            //&& $( '<h2>AutoSelectComplete total ins: ' + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

    return Bizs.AutoSelectComplete;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
