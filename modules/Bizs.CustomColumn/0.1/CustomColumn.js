;(function(define, _win) { 'use strict'; define( 'Bizs.CustomColumn', [ 'JC.Panel', 'JC.Valid', 'Bizs.FormLogic' ], function(){
 if( JC.use ){
     !JC.Panel && JC.use( 'JC.Panel' );
     !JC.Valid && JC.use( 'JC.Valid' );
     !Bizs.FormLogic && JC.use( 'Bizs.FormLogic' );
 }

/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href='JC.Panel.html'>JC.Panel</a>
 *      , <a href='JC.Valid.html'>JC.Valid</a>
 *      , <a href='Bizs.FormLogic.html'>Bizs.FormLogic</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.CustomColumn.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/Bizs.CustomColumn/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizCustomColumn" </h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt>[ data-url | data-query ] = url</dt>
 *      <dd>提交数据的URL<dd>
 *
 *      <dt>data-data = json var name</dt>
 *      <dd>自定义列的数据 变量名, <b>window 变量域</b></dd>
 *
 *      <dt>data-scriptData = script selector</dt>
 *      <dd>脚本数据</dd>
 *
 *      <dt>data-id = string</dt>
 *      <dd>{id}占位符的数值</dd>
 *
 *      <dt>data-minCol = int</dt>
 *      <dd>最小需要选择多少列</dd>
 *
 *      <dt>data-maxCol = int</dt>
 *      <dd>最多只能选择多少列</dd>
 *
 *      <dt>data-name = string</dt>
 *      <dd>数据复选框的 name</dd>
 *
 *      <dt>data-saveSelector = selector</dt>
 *      <dd>保存所要复选框值的选择器</dd>
 *
 *      <dt>data-tpl = script tpl</dt>
 *      <dd>显示弹框的脚本模板</dd>
 *
 *      <dt>data-formDoneCallback = window function name</dt>
 *      <dd>自定义提交数据后的响应函数</dd>
 *
 *      <dt>data-formAfterProcessCallback = window function name</dt>
 *      <dd>自定义表单提交前的校验函数</dd>
 *  </dl> 
 *
 * @namespace   window.Bizs
 * @class       CustomColumn
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>Bizs.CustomColumn 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    Bizs.CustomColumn = CustomColumn;

    function CustomColumn( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, CustomColumn ) ) 
            return JC.BaseMVC.getInstance( _selector, CustomColumn );

        JC.BaseMVC.getInstance( _selector, CustomColumn, this );

        this._model = new CustomColumn.Model( _selector );
        this._view = new CustomColumn.View( this._model );

        this._init();

        JC.log( CustomColumn.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 CustomColumn 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of CustomColumnInstance}
     */
    CustomColumn.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_bizCustomColumn' )  ){
                    _r.push( new CustomColumn( _selector ) );
                }else{
                    _selector.find( 'a.js_bizCustomColumn, button.js_bizCustomColumn' ).each( function(){
                        _r.push( new CustomColumn( this ) );
                    });
                }
            }
            return _r;
        };

    CustomColumn.ID_COUNT = 1;

    window.BizsCustomColumnFormDoneCallback =
        function( _json, _submitButton, _ins ){
               var _form = $(this), _panel;
               if( _json.errorno ){
                   _panel = JC.alert( _json.errmsg || '操作失败, 请重新尝试!', _submitButton, 1 );
               }else{
                   _panel = JC.msgbox( _json.errmsg || '操作成功', _submitButton, 0, function(){
                       JC.f.reloadPage( _ins._model.formAjaxDoneAction() || JC.f.urlDetect( 'URL' ) );
                   });
               }
        };

    window.BizsCustomColumnFormAfterProcessCallback =
        function formAfterProcess( _evt, _ins ){
           var _form = $(this)
               , _panel = JC.f.parentSelector( _form, 'div.UPanel' )
               , _cc
               ;
           if( !_panel ) return;
           _panel = JC.Panel.getInstance( _panel );
           if( !_panel ) return;
           _cc = _panel.CustomColumnIns;
           if( !_cc ) return;

           var _saveSelector = _cc._model.saveSelector(), _tmp, _selected;
           if( _saveSelector && _saveSelector.length ){
               _tmp = [];
               _selected = _panel.selector().find( 'input.js_typeItem:checked' );

               _cc.trigger( 'update_selected_status' );

               if( _selected.length < _cc._model.minCol() ){
                   return false;
               }

               if( _selected.length > _cc._model.maxCol() ){
                   return false;
               }
               
               _selected.each( function(){
                   _tmp.push( $( this ).val().trim() );
               });
               _saveSelector.val( _tmp.join(',') );
           }
        };

    JC.BaseMVC.build( CustomColumn );

    JC.f.extendObject( CustomColumn.prototype, {
        _beforeInit:
            function(){
                JC.log( 'CustomColumn _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                });

                _p.on( 'showPopup', function(){
                    _p._view.showPopup();
                });

                _p.on( 'hidePopup', function(){
                    _p.view.hidePopup();
                });

                _p.on( 'panel_inited', function( _evt, _panel ){
                    _p._model.currentPanel( _panel );
                    _panel.CustomColumnIns = _p;
                });

                _p.on( 'update_default', function( _evt, _panel ){
                    _panel.selector().find( 'input.js_typeItem' ).each( function(){
                        var _sp = $( this )
                            , _dataItem = _p._model.data()[ _sp.attr( 'data-topIndex' ) ].content[ _sp.attr( 'data-subIndex' ) ]
                            ;
                        if( _dataItem.isdefault ){
                            _sp.prop( 'checked', true );
                        }else{
                            _sp.prop( 'checked', false );
                        }
                    });
                });

                _p.on( 'update_custom', function( _evt, _panel ){
                    _panel.selector().find( 'input.js_typeItem' ).each( function(){
                        var _sp = $( this )
                            , _dataItem = _p._model.data()[ _sp.attr( 'data-topIndex' ) ].content[ _sp.attr( 'data-subIndex' ) ]
                            ;
                        if( _dataItem.ison ){
                            _sp.prop( 'checked', true );
                        }else{
                            _sp.prop( 'checked', false );
                        }
                    });
                });

                _p.on( 'update_selected_status', function(){
                        var _panel = _p._model.currentPanel(), _selected, _em = _panel.find( 'em.js_bccErrEm' );
                       _selected = _panel.selector().find( 'input.js_typeItem:checked' );

                       if( _selected.length < _p._model.minCol() ){
                           _em.html( '请选择数据列, 最少需要选择' + _p._model.minCol() + '个数据列！' ).show();
                           return;
                       }

                       if( _selected.length > _p._model.maxCol() ){
                           _em.html( '最多只能选择' + _p._model.maxCol() + '个数据列！' ).show();
                           return;
                       }
                       _em.hide();
                });
            }

        , _inited:
            function(){
                JC.log( 'CustomColumn _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }

        , show: function(){ this.trigger( 'showPopup' ); }
        , hide: function(){ this.trigger( 'hidePopup' ); }
        , close: function(){ this.trigger( 'hidePopup' ); }
    });

    CustomColumn.Model._instanceName = 'JCCustomColumn';
    JC.f.extendObject( CustomColumn.Model.prototype, {
        init:
            function(){
                JC.log( 'CustomColumn.Model.init:', new Date().getTime() );
                this._gid = 'CustomColumnIns_' + CustomColumn.ID_COUNT;
                CustomColumn.ID_COUNT++;
            }

        , currentPanel:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._currentPanel = _setter );
                return this._currentPanel;
            }

        , gid: function(){ return this._gid; }

        , url:
            function(){
                var _r = this.attrProp( 'data-query') || this.attrProp( 'data-url' ) || '?';
                return _r;
            }

        , id:
            function(){
                var _r = this.attrProp( 'pagename') || this.attrProp( 'data-id' ) || '';
                return _r;
            }

        , name:
            function(){
                var _r = this.attrProp( 'data-name' ) || 'selectedItem';
                return _r;
            }

        , data:
            function(){
                if( !this._data ){
                    this.is( '[data-data]' ) && ( this._data = this.windowProp( 'data-data' ) );
                    this.is( '[data-scriptData]' ) && ( this._data = this.scriptDataProp( 'data-scriptData' ) );
                }
                return this._data;
            }

        , typeSelector:
            function(){
                return this.attrProp( 'data-typeSelector' ) || 'js_selectType';
            }

        , saveSelector:
            function(){
                if( this.is( '[data-saveSelector]' ) ){
                    return this.selectorProp( 'data-saveSelector' ) ;
                }else{
                    return this.selector().find( 'input.js_saveSelector' );
                }
            }

        , maxCol: 
            function(){
                return this.intProp( 'data-maxCol' ) || 20;
            }

        , minCol: 
            function(){
                return this.intProp( 'data-minCol' ) || 1;
            }

        , tpl:
            function(){
                if( !this._tpl ){
                    this.is( '[data-tpl]' ) && ( this._tpl = this.scriptTplProp( 'data-tpl' ) );
                }
                return this._tpl;
            }

        , formDoneCallback:
            function(){
                var _r = 'BizsCustomColumnFormDoneCallback';
                this.attrProp( 'data-formDoneCallback' ) 
                    && this.windowProp( 'data-formDoneCallback' ) 
                    && ( _r = this.attrProp( 'data-formDoneCallback' ) );
                return _r;
            }

        , formAfterProcessCallback:
            function(){
                var _r = 'BizsCustomColumnFormAfterProcessCallback';
                this.attrProp( 'data-formAfterProcessCallback' ) 
                    && this.windowProp( 'data-formAfterProcessCallback' ) 
                    && ( _r = this.attrProp( 'data-formAfterProcessCallback' ) );
                return _r;
            }

        , isDefault:
            function(){
                var _r = true, _p = this;
                $.each( _p.data(), function( _k, _item ){
                    $.each( _item.content, function( _sk, _sitem ){
                        if( ( _sitem.ison && !_sitem.isdefault ) || ( !( _sitem.ison || _sitem.dftchk ) && _sitem.isdefault ) ){
                            return _r = false;
                        }
                    });
                    if( !_r ) return false;
                });
                return _r;
            }
    });

    JC.f.extendObject( CustomColumn.View.prototype, {
        init:
            function(){
                JC.log( 'CustomColumn.View.init:', new Date().getTime() );
            }

        , showPopup:
            function(){
                var _p = this
                    , _tpl = _p._model.tpl()
                    , _panel
                    , _columns = []
                    , _isDefault = _p._model.isDefault()
                    ;

                $.each( _p._model.data(), function( _k, _item ){
                    _columns.push( '<dl>' );
                    _columns.push( '<dt>' );
                    _item.name && ( _columns.push( _item.groupName  ) );
                    _columns.push( '</dt>' );
                    _columns.push( '<dd>' );

                    if( _item.content ){
                        _columns.push( '<ul>' );
                        $.each( _item.content, function( _sk, _sitem ){

                            if( !_sitem ){
                                return;
                            }

                            var _isChecked = '', _dftchk = '', _class = '';

                            _sitem.isdefault && ( _class = 'js_isDefaultItem' );

                            if( _isDefault ){
                                _sitem.isdefault && ( _isChecked = ' checked="checked" ' );
                            }else{
                                _sitem.ison && ( _isChecked = ' checked="checked" ' );
                            }

                            if( _sitem.isdefault && _sitem.dftchk ) {
                                ( _isChecked += ' disabled="disabled" ' );
                                _dftchk = '<input name="{3}" value="{1}" type="hidden" class="">';
                            }

                            _columns.push( JC.f.printf( '<li><label><input name="{3}" value="{1}" '
                                + ' '
                                + ' type="checkbox" data-topIndex="{6}" data-subIndex="{7}" class="js_typeItem {5}" {4}>&nbsp;{2}{0}</label></li>'
                                , _dftchk
                                , _sitem.name, _sitem.title
                                , _p._model.name()
                                , _isChecked
                                , _class
                                , _k, _sk
                            ));
                        });
                        _columns.push( '</ul>' );
                    }

                    _columns.push( '</dd>' );
                    _columns.push( '</dl>' );
                });

                _tpl = JC.f.printKey( _tpl, { 
                    id: _p._model.id()
                    , url: _p._model.url()
                    , content: _columns.join( '' )
                    , formDoneCallback: _p._model.formDoneCallback()
                    , formAfterProcessCallback: _p._model.formAfterProcessCallback()
                } );

                _panel = JC.Dialog( _tpl );
                _p.trigger( 'panel_inited', [ _panel ] );

                if( _isDefault ){
                    _panel.find( 'input.js_defaultType' ).prop( 'checked', true );
                }else{
                    _panel.find( 'input.js_customType' ).prop( 'checked', true );
                }

                _panel.find( 'input.js_customType' ).on( 'click', function( _sevt ){
                    if( _p._model.isDefault() ){
                        return false;
                    }
                    _p.trigger( 'update_custom', [ _panel ] );
                    _p.trigger( 'update_selected_status' );
                });

                _panel.selector().delegate( 'input.js_selectType', 'change', function(){
                    var _sp = $( this );
                    if( _sp.val() != 'default' ) return;
                    _p.trigger( 'update_default', [ _panel ] );
                    _p.trigger( 'update_selected_status' );
                });

                _panel.selector().delegate( 'input.js_typeItem', 'change', function(){
                    var _sp = $( this )
                        , _dataItem = _p._model.data()[ _sp.attr( 'data-topIndex' ) ].content[ _sp.attr( 'data-subIndex' ) ]
                        ;
                    if( _sp.prop( 'checked' ) ){
                        _dataItem.ison = true;
                    }else{
                        _dataItem.ison = false;
                    }

                    if( _p._model.isDefault() ){
                        _panel.find( 'input.js_defaultType' ).prop( 'checked', true );
                    }else{
                        _panel.find( 'input.js_customType' ).prop( 'checked', true );
                    }

                    _p.trigger( 'update_selected_status' );
                });

                
            }
    });

    _jdoc.ready( function(){
        /*
        JC.f.safeTimeout( function(){
            CustomColumn.autoInit && CustomColumn.init();
        }, null, 'CustomColumnasdfae', 1 );
        */

        $( document ).delegate( 'button.js_bizCustomColumn, a.js_bizCustomColumn', 'click', function(){
            var _p = $( this ), _ins = JC.BaseMVC.getInstance( _p, CustomColumn );
            if( !_ins ){
                _ins = new CustomColumn( _p );
            }
            _ins && _ins.show();
        });
    });

    return Bizs.CustomColumn;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
