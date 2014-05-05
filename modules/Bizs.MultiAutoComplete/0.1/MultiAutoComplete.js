;(function(define, _win) { 'use strict'; define( [ 'JC.AutoComplete', 'JC.AutoChecked', 'JC.Placeholder', 'JC.Panel' ], function(){
/**
 * 级联 Suggest
 *
 *<p><b>require</b>:
 *   <a href='JC.AutoComplete.html'>JC.AutoComplete</a>
 *   , <a href='JC.Placeholder.html'>JC.Placeholder</a>
 *   , <a href='JC.Panel.html'>JC.Panel</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.MultiAutoComplete.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.MultiAutoComplete/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 input[defaultMultiAutomComplete] </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt>defaultMultiAutomComplete = empty</dt>
 *    <dd>声明第一级联动框</dd>
 *
 *    <dt>macUrl = url</dt>
 *    <dd>获取数据的URL接口<dd>
 *
 *    <dt>macAddtionUrl = url</dt>
 *    <dd>用于最后一级的附加数据接口, 如果所有父级没有选中内容, 将启用该接口</dd>
 *
 *    <dt>macAddtionBox = selector</dt>
 *    <dd>指定用于保存选择内容的选择器</dd>
 *
 *    <dt>macAddtionBoxItemTpl = selector</dt>
 *    <dd>保存内容项的模板</dd>
 *
 *    <dt>macAddtionBoxItemSelector = selector</dt>
 *    <dd>保存内容项的选择器</dd>
 *
 *    <dt>macAddtionItemAddCallback = callback</dt>
 *    <dd>添加保存内容项时的回调
 <xmp>function macAddtionItemAddCallback( _item, _id, _label, _parent, _parentBox ){
    var _macIns = this;
    JC.log( 'macAddtionItemAddCallback', _id, _label );
}</xmp>
 *    </dd>
 *
 *    <dt>macAddtionItemRemoveCallback = callback</dt>
 *    <dd>删除保存内容项时的回调
<xmp>function macAddtionItemRemoveCallback( _item, _id, _label, _parent, _parentBox ){
    var _macIns = this;
    JC.log( 'macAddtionItemRemoveCallback', _id, _label );
}</xmp>
 *    </dd>
 *
 *</dl>
 *
 * @namespace   window.Bizs
 * @class       MultiAutoComplete
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
<xmp><div class="ui-sug-mod">
    <input type="text" class="ui-sug-ipt js_compAutoComplete js_k1" name="k1" value="" 
        autocomplete="off" 

        cacPopup="/ul.js_compAutoCompleteBox"
        cacLabelKey="data-label"
        cacIdKey="data-id"
        cacIdSelector="/input.js_k1_id"
        cacStrictData="true"
        cacDataFilter="cacDataFilter"
        cacNoDataText="暂无数据!"

        cacPreventEnter="true" 

        defaultMultiAutomComplete=""
        macUrl="./data/shengshi_with_error_code.php?id=0"
        macTarget="/input.js_k2"

        Placeholder="一级位置"
        />
    <input type="hidden" value="14" class="js_k1_id" name="k1_id" />

    <input type="text" class="ui-sug-ipt js_compAutoComplete js_k2" name="k2" value="" 
        autocomplete="off" 

        cacPopup="/ul.js_compAutoCompleteBox"
        cacLabelKey="data-label"
        cacIdKey="data-id"
        cacIdSelector="/input.js_k2_id"
        cacStrictData="true"
        cacDataFilter="cacDataFilter"
        cacNoDataText="暂无数据!"

        cacPreventEnter="true" 

        macUrl="./data/shengshi_with_error_code.php?id={0}"
        macTarget="/input.js_k3"
        Placeholder="二级位置"
        />
    <input type="hidden" value="2341" class="js_k2_id" name="k2_id" />

    <input type="text" class="ui-sug-ipt js_compAutoComplete js_k3" name="k3" value="区" 
        autocomplete="off" 
        Placeholder="三级位置"

        cacPopup="/ul.js_compAutoCompleteBox"
        cacLabelKey="data-label"
        cacIdKey="data-id"
        cacStrictData="false"
        cacDataFilter="cacDataFilter"
        cacNoDataText="暂无数据!"
        cacAddtionItem="true"
        cacListItemTpl="/script.cacItemTpl"

        cacPreventEnter="true" 

        macUrl="./data/shengshi_with_error_code.php?id={0}"
        macAddtionUrl="./data/shengshi_with_error_code.php?id=0"
        macAddtionBox="/.js_macAddtionBox"
        macAddtionBoxItemTpl="/script.macAddtionBoxItemTpl"
        macAddtionBoxItemSelector="> a"
        macAddtionItemAddCallback="macAddtionItemAddCallback"
        macAddtionItemRemoveCallback="macAddtionItemRemoveCallback"
        />
    <span class="js_macAddtionBox" style="display:none;">
        <span class="js_macAddtionBoxList">
            <a href="javascript:" class="js_macAddtionBoxItem" data-id="2345" id="macAddtionBoxItemId_1_2345" data-label="枫溪区">
                <label>枫溪区</label>
                <button type="button" class="AURemove"></button>
                <input type="hidden" name="condition[]" value="2345">
            </a>
        </span>
        <a href="javascript:" class="js_macClearAddtionList">
            清空<button type="button" class="AUClose"></button>
        </a>
    </span>
    <script type="text/template" class="cacItemTpl">
        <li data-id="{0}" data-label="{1}" data-index="{2}" class="AC_listItem {3} js_macAddtionBoxItemClick">
        <a href="javascript:;" data-id="{0}" data-label="{1}" data-index="{2}" class="AC_control AC_customAdd">添加</a>
        <label>{1} </label>
        </li> 
    </script>
    <script type="text/template" class="macAddtionBoxItemTpl">
        <a href="javascript:" class="js_macAddtionBoxItem" data-id="{0}" id="{2}" data-label="{1}">
            <label>{1}</label>
            <button type="button" class="AURemove"></button>
            <input type="hidden" name="condition[]" value="{0}" />
        </a>
    </script>
</div></xmp>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.use && (
        !JC.AutoComplete && JC.use( 'JC.AutoComplete' )
        , !JC.Placeholder && JC.use( 'JC.Placeholder' )
        , !JC.Panel && JC.use( 'JC.Panel' )
    );

    Bizs.MultiAutoComplete = MultiAutoComplete;

    function MultiAutoComplete( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, MultiAutoComplete ) ) 
            return JC.BaseMVC.getInstance( _selector, MultiAutoComplete );

        JC.BaseMVC.getInstance( _selector, MultiAutoComplete, this );

        this._model = new MultiAutoComplete.Model( _selector );
        this._view = new MultiAutoComplete.View( this._model );

        this._init();

        JC.log( MultiAutoComplete.Model._instanceName, 'all inited', new Date().getTime() );
    }
    Bizs.MultiAutoComplete.insCount = 1;
    Bizs.MultiAutoComplete.AJAX_CACHE = {};
    /**
     * 初始化可识别的 MultiAutoComplete 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of MultiAutoCompleteInstance}
     */
    MultiAutoComplete.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.is( '[defaultMultiAutomComplete]' )  ){
                    _r.push( new MultiAutoComplete( _selector ) );
                }else{
                    _selector.find( 'input[defaultMultiAutomComplete]' ).each( function(){
                        _r.push( new MultiAutoComplete( this ) );
                    });
                }
            }
            return _r;
        };

    MultiAutoComplete.ajaxRandom = true;

    JC.BaseMVC.build( MultiAutoComplete );

    JC.f.extendObject( MultiAutoComplete.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'MultiAutoComplete _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited' , function(){
                    _p.trigger( 'init_relationship' );
                    _p.trigger( 'fix_id_callback' );
                    _p.trigger( 'init_autoComplete' );
                    _p.trigger( 'update_selector', [ _p.selector() ] );
                    _p.trigger( 'init_user_input' );
                    _p._model.ready( true );
                    _p.trigger( 'inited_done' );
                });

                _p.on( 'init_relationship', function( _evt ){
                    _p._model.init_relationship();
                });

                _p.on( 'fix_id_callback', function( _evt ){
                    _p._model.fixIdCallback();
                });

                _p.on( 'init_autoComplete', function( _evt ){
                    _p._model.each( function( _selector ){
                        var _acIns;
                        _selector.hasClass( 'js_compAutoComplete' )
                            && !( _acIns = JC.BaseMVC.getInstance( _selector, JC.AutoComplete ) )
                            && ( _acIns = new JC.AutoComplete( _selector ) )
                            ;

                        _acIns.on( 'after_inited', function( _evt ){
                            _p.trigger( 'init_checked_status', [ _acIns ] );
                        });
                    });
                });

                _p.on( 'update_selector', function( _evt, _selector, _ignoreClear ){
                    if( !( _selector && _selector.length ) ) return;

                    !_ignoreClear && _p.trigger( 'clear_selector', [ _selector ] );
                    _p.trigger( 'ajax_data', [ _selector ] );
                });

                _p.on( 'clear_selector', function( _evt, _selector ){
                    if( !_p._model.ready() ) return;
                    _p._model.clearData( _selector );
                });

                _p.on( 'ajax_data', function( _evt, _selector, _noTriggerAllUpdated ){
                    if( !_selector ) return;

                    _p._model.ajax_data( _selector, _noTriggerAllUpdated );
                });

                _p.on( 'ajax_done', function( _evt, _data, _selector, _text, _noTriggerAllUpdated ){
                    if( _data && _data.errorno == 0 ){
                        _p.trigger( 'update', [ _data, _selector, _text, _noTriggerAllUpdated ] );
                    }else{
                        _p.trigger( 'ajax_error', [ _data, _selector, _text ] );
                    }
                });

                _p.on( 'update', function( _evt, _data, _selector, _text, _noTriggerAllUpdated ){
                    var _acIns = JC.BaseMVC.getInstance( _selector, JC.AutoComplete )
                        , _nextSelector
                        , _macDefaultValue
                        ;
                    //JC.log( '_acIns:',  _acIns );

                    if( !_acIns ) return;
                    _macDefaultValue = _p._model.macDefaultValue( _selector ) || undefined;
                    _acIns.update( _data.data, _macDefaultValue );

                    _nextSelector = _p._model.nextSelector( _selector );
                    if( _nextSelector && _nextSelector.length && _data.data.length ){
                        _p.trigger( 'update_selector', [ _nextSelector, true ] );
                    }else{
                        !_noTriggerAllUpdated && _p.trigger( 'all_updated' );
                        if( _noTriggerAllUpdated ){
                            _acIns._model.layoutPopup().find( 'span.cacMultiSelectBarTplLabel' ).hide();
                        }else{
                            _acIns._model.layoutPopup().find( 'span.cacMultiSelectBarTplLabel' ).show();
                        }
                    }
                });

                _p.on( 'all_updated', function(){
                    _p._model.checkLast();
                });

                _p.on( 'init_user_input', function( _evt ){
                    _p._model.each( function( _selector ){
                        _selector.on( 'focus', function( _evt ){
                            _selector.data( 'old_value', _selector.val() );
                        });

                        _selector.on( 'blur', function( _evt ){

                            JC.f.safeTimeout( function(){
                                var _oldValue = _selector.data( 'old_value' )
                                    , _newValue = _selector.val()
                                    , _nextSelector
                                    ;

                                //JC.log( JC.f.printf( 'oldValue: {0}, newValue: {1}', _oldValue, _newValue ) );

                                if( _oldValue != _newValue ){
                                    _nextSelector = _p._model.nextSelector( _selector );


                                    _nextSelector 
                                        && _nextSelector.length
                                        && _p.trigger( 'update_selector', [ _nextSelector ] );
                                }
                            }, _selector, 'forMultiAutoCompleteSelectorBlur', 200 );
                        });
                    });
                });

                _p.on( 'inited_done', function(){
                    _p._model.each( function( _selector ){
                        _p.trigger( 'init_addtionBox', [ _selector ] );
                    });
                });

                _p.on( 'init_addtionBox', function( _evt, _selector ){
                    var _box = _p._model.macAddtionBox( _selector ), _boxList, _acIns;
                    if( !( _box && _box.length ) ) return;
                    _boxList = _box.find( '.js_macAddtionBoxList' );
                    if( !( _boxList && _boxList.length ) ) return;
                    _acIns = JC.BaseMVC.getInstance( _selector, JC.AutoComplete );

                    _box.delegate( '.js_macClearAddtionList', 'click', function( _evt ){
                        JC.confirm( '是否清空内容', this, 2, function( _evt ){
                            _boxList.html( '' );
                            _box.hide();
                        });
                    });

                    _box.delegate( '.js_macAddtionBoxItem', 'click', function( _evt ){
                        var _sp = $( this ), _id = _sp.attr( 'data-id' ), _label = _sp.attr( 'data-label' );

                        _p._model.macAddtionItemRemoveCallback( _selector )
                            && _p._model.macAddtionItemRemoveCallback( _selector ).call( _p, _sp, _id, _label, _boxList, _box );

                        _sp.remove();
                        _p.trigger( 'update_list_box_status', [ _acIns, true ] );
                    });

                    _p.trigger( 'update_list_box_status', [ _acIns, true ] );
                });

                _p.on( 'update_list_box_status', function( _evt, _acIns, _ignoreCheckStatus ){
                    var _selector = _acIns.selector(), _box = _p._model.macAddtionBox( _selector ), _boxList;
                    if( !( _box && _box.length ) ) return;
                    _boxList = _box.find( '.js_macAddtionBoxList' );
                    if( !( _boxList && _boxList.length ) ) return;

                    var _items = _boxList.find( _p._model.macAddtionBoxItemSelector( _selector ) )
                    _items.length ? _box.show() : _box.hide();

                    !_ignoreCheckStatus && _p.trigger( 'update_checked_status', [ _acIns, true ] );
                });

                _p.on( 'init_checked_status', function( _evt, _acIns ){

                    var _selector = _acIns.selector();

                    if( _selector.is( 'macAddtionBox' ) ) return;

                    _acIns.on( 'after_popup_show', function( _evt ){
                        //JC.log( 'after_popup_show', new Date().getTime() );
                    });

                    _acIns.on( 'build_data', function(){
                        _p.trigger( 'update_checked_show_status', [ _acIns ] );
                        _p.trigger( 'fixed_checkAll_status', [ _acIns ] );
                    });

                    _acIns._model.layoutPopup().delegate( 'input[schecktype=all]', 'change', function( _evt ){
                        var _sp = $( this );
                            _acIns._model.layoutPopup().find( 'input[schecktype=item]' ).prop( 'checked', _sp.prop( 'checked' ) );

                        _p.trigger( 'update_checked_status', [ _acIns ] );
                        _p.trigger( 'fixed_checkAll_status', [ _acIns ] );
                    });

                    _selector.on( 'cacItemClickHanlder', function( _evt, _sp, _acIns){
                        JC.f.safeTimeout( function(){
                            //_p.trigger( 'update_checked_status', [ _acIns ] );
                            var _ckItem = _sp.find( 'input[schecktype=item]' ), _d;
                            if( !_ckItem.length ) return;
                            _d = { item: _ckItem };
                            _p.trigger( 'update_list_item', [ _ckItem, _acIns ] );
                            _p.trigger( 'item_checked', [ _d, _d.item.prop( 'checked' ) ] );
                            _p.trigger( 'fixed_checkAll_status', [ _acIns ] );

                        }, _acIns, 'adfasdfasdf', 50 );
                    });
                });

                _p.on( 'fixed_checkAll_status', function( _evt, _acIns ){
                    var _checked = true;
                    _acIns._model.layoutPopup().find( 'input[schecktype=item]' ).each( function( _evt ){
                        var _sp = $( this );
                        if( !_sp.prop( 'checked' ) ){
                            _checked = false;
                            return false;
                        }
                    });

                    _acIns._model.layoutPopup().find( 'input[schecktype=all]' ).prop( 'checked', _checked );
                });

                _p.on( 'update_list_item', function( _evt, _sp, _acIns ){
                    var _d = { item: _sp };
                    if( !_d.item.length ) return;

                    var _selector = _acIns.selector(), _box = _p._model.macAddtionBox( _selector ), _boxList, _sitem, _isAdd;
                    if( !( _box && _box.length ) ) return;
                    _boxList = _box.find( '.js_macAddtionBoxList' );
                    if( !( _boxList && _boxList.length ) ) return;

                    if( _p._model.macAddtionBoxWithId( _selector ) ){
                        _sitem = $( JC.f.printf( '#macAddtionBoxItemId_{0}_{1}', _p._model.insCount(), _d.item.val() ) );
                    }else{
                        _sitem = _boxList.find( _p._model.macAddtionBoxItemSelector( _acIns.selector() ) + '[data-id='+ _d.item.val() +']' );
                    }

                    if( _d.item.prop( 'checked' ) ){
                        if( !_sitem.length ){
                            _p.trigger( 'add_list_item', [ _d.item, _acIns, _box, _boxList ] );
                            _isAdd = true;
                        }
                    }else{
                        _sitem.length && _sitem.remove();
                    }

                    JC.f.safeTimeout( function(){
                        //if( !_acIns._model.layoutPopup().is( ':visible' ) ) return;
                        _isAdd && _p.trigger( 'sort_list_item', [ _boxList, _acIns ] );
                    }, _p, 'SORT_LIST_ITEM', 1000 );
                });

                _p.on( 'update_checked_status', function( _evt, _acIns, _preventRecursive ){
                    if( !_acIns ) return;
                    var _selector = _acIns.selector(), _box = _p._model.macAddtionBox( _selector ), _boxList, _acIns;
                    if( !( _box && _box.length ) ) return;
                    _boxList = _box.find( '.js_macAddtionBoxList' );
                    if( !( _boxList && _boxList.length ) ) return;

                    var _popupItems = _acIns._model.layoutPopup().find( 'input[schecktype=item]' )
                        , _popupItemAll = _acIns._model.layoutPopup().find( 'input[schecktype=all]' )
                        , _listItems = _boxList.find( _p._model.macAddtionBoxItemSelector( _acIns.selector() ) )
                        ;


                    //JC.log( _popupItems.length, _popupItemAll.length, _listItems.length );
                    if( !_popupItems.length ) return;

                    var _listItemsObj = {}, _popupItemsObj= {};

                    _listItems.each( function(){
                        var _listSp = $( this );
                        _listItemsObj[ _listSp.attr( 'data-id' ) ] = {
                            item: _listSp
                        };

                    });

                    _popupItems.each( function( _ix ){
                        var _sp = $( this ), _sitem;
                        _p.trigger( 'update_list_item', [ _sp, _acIns ] );
                    });

                    !_preventRecursive && _p.trigger( 'update_list_box_status', [ _acIns ] );
                });


                _p.on( 'update_checked_show_status', function( _evt, _acIns ){
                    if( !_acIns ) return;
                    var _selector = _acIns.selector(), _box = _p._model.macAddtionBox( _selector ), _boxList, _acIns;
                    if( !( _box && _box.length ) ) return;
                    _boxList = _box.find( '.js_macAddtionBoxList' );
                    if( !( _boxList && _boxList.length ) ) return;

                    var _popupItems = _acIns._model.layoutPopup().find( 'input[schecktype=item]' )
                        , _popupItemAll = _acIns._model.layoutPopup().find( 'input[schecktype=all]' )
                        , _listItems = _boxList.find( _p._model.macAddtionBoxItemSelector( _acIns.selector() ) )
                        ;

                    if( !_popupItems.length ) return;

                    var _allChecked = true, _popupItemsObj= {};

                    _popupItems.each( function(){
                        var _sp = $( this );
                        _popupItemsObj[ _sp.val() ] = { item: _sp };
                    });

                    _listItems.each( function(){
                        var _listSp = $( this ), _sitem;
                        if( _listSp.attr( 'data-id' ) in _popupItemsObj ){
                            _p.trigger( 'item_checked', [ _popupItemsObj[ _listSp.attr( 'data-id' ) ], true ] );
                        }
                    });
                });

                _p.on( 'sort_list_item', function( _evt, _boxList, _acIns ){
                    var _items = _boxList.find( _p._model.macAddtionBoxItemSelector( _acIns.selector() ) );

                   _items.each( function(){
                       var _item = $( this ), _id = _item.attr( 'data-id' ), _label = _item.attr( 'data-label' );
                       _items.each( function(){
                           var _sitem = $( this ), _sid = _sitem.attr( 'data-id' ), _slabel = _sitem.attr( 'data-label' );
                           if( _id == _sid ) return;

                           if( _label.localeCompare( _slabel ) > 0 ){
                               _sitem.after( _item );
                           }
                       });
                   });
                });

                _p.on( 'add_list_item', function( _evt, _sp, _acIns, _box, _boxList ){
                    var _pnt = JC.f.getJqParent( _sp, 'li' )
                        , _selector = _acIns.selector()
                        , _item
                        , _tpl = _p._model.macAddtionBoxItemTpl( _selector )
                        , _id = _pnt.attr( 'data-id' )
                        , _label = _pnt.attr( 'data-label' )
                        ;

                        _item = $( JC.f.printf( _tpl, _id, _label, _p._model.insCount() ) );
                        _item.appendTo( _boxList );
                        _item.attr( 'data-id', _id );
                        _item.attr( 'data-label', _label );
                        _box.show();
                });

                _p.on( 'item_checked', function( _evt, _data, _checked ){
                    _checked 
                        ? JC.f.getJqParent( _data.item, 'li' ).addClass( 'macDisable' )
                        : JC.f.getJqParent( _data.item, 'li' ).removeClass( 'macDisable' );
                    _data.item.prop( 'checked', _checked );
                });

            }

        , _inited:
            function(){
                //JC.log( 'MultiAutoComplete _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
    });

    MultiAutoComplete.Model._instanceName = 'JCMultiAutoComplete';
    JC.f.extendObject( MultiAutoComplete.Model.prototype, {
        init:
            function(){
                //JC.log( 'MultiAutoComplete.Model.init:', new Date().getTime() );
                this.insCount( MultiAutoComplete.insCount++ );
            }

        , insCount:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._insCount = _setter );
                return this._insCount;
            }

        , macAddtionBoxWithId:
            function( _selector ){
                return JC.f.parseBool( _selector.attr( 'macAddtionBoxWithId' ) );
            }

        , macAddtionItemAddCallback: function( _selector ){ return this.callbackProp( _selector, 'macAddtionItemAddCallback' ); }
        , macAddtionItemRemoveCallback: function( _selector ){ return this.callbackProp( _selector, 'macAddtionItemRemoveCallback' ); }

        , macAddtionBoxItemSelector: function( _selector ){ return this.attrProp( _selector, 'macAddtionBoxItemSelector' ); }
        , macAddtionBoxItemTpl: 
            function( _selector ){ 
                return JC.f.scriptContent( this.selectorProp( _selector, 'macAddtionBoxItemTpl' ) ); 
            }

        , macAddtionBox:
            function( _selector ){
                return this.selectorProp( _selector, 'macAddtionBox' );
            }

        , ready:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._ready = _setter );
                return this._ready;
            }

        , clearData:
            function( _selector ){
                var _p = this
                    , _nextSelector = _p.nextSelector( _selector )
                    , _acIns = JC.BaseMVC.getInstance( _selector, JC.AutoComplete )
                    ;

                _acIns && _acIns.clearAll();
            
                _nextSelector && _p.clearData( _nextSelector );
            }

        , init_relationship:
            function( _selector, _prevSelector ){
                var _p = this
                    , _selector = _selector || _p.selector()
                    , _nextSelector
                    ;

                _prevSelector && ( _selector.data( 'prevSelector', _prevSelector ) );

                if( _selector.is( '[macTarget]' ) ){
                    _nextSelector = JC.f.parentSelector( _selector, _selector.attr( 'macTarget' ) );
                    if( ( _nextSelector && _nextSelector.length ) ){
                        _selector.data( 'nextSelector', _nextSelector );
                        _p.init_relationship( _nextSelector, _selector );
                        //JC.log( _selector.attr( 'macTarget' ) );
                    }
                }else{
                    _p.lastSelecotr( _selector );
                }
            }

        , fixIdCallback:
            function(){
                var _p = this;
                _p.each( function( _selector ){
                    //JC.log( _selector.attr( 'name' ) );
                    !_selector.is( '[macIdCallback]' )
                        && _selector.attr( 'macIdCallback', 'MultiAutoCompleteIdCallback' )
                        ;

                    !_selector.is( '[cacDataFilter]' )
                        && _selector.attr( 'cacDataFilter', 'MultiAutoCompleteDataFilter' );
                });
            }

        , firstSelector: function(){ return this.selector(); }

        , lastSelecotr: 
            function( _selector ){
                _selector && ( this._lastSelecotr = _selector );
                return this._lastSelecotr;
            }

        , nextSelector:
            function( _selector ){
                if( _selector ){
                    return $( _selector ).data( 'nextSelector' );
                }
            }

        , prevSelector:
            function( _selector ){
                if( _selector ){
                    return $( _selector ).data( 'prevSelector' );
                }
            }

        , macAddtionUrl: function( _selector ){ return _selector.attr( 'macAddtionUrl' ); }

        , checkLast:
            function(){
                var _p = this
                    , _last = _p.lastSelecotr()
                    , _tmpSelector = _p.prevSelector( _last )
                    , _hasValue
                    ;

                while( _tmpSelector && _tmpSelector.length ){
                    _tmpSelector.val() && ( _hasValue = true );
                    if( _hasValue ) break;
                    _tmpSelector = _p.prevSelector( _tmpSelector );
                }

                !_hasValue 
                    && _p.macAddtionUrl( _last )
                    && _p.ajax_data( _last, true, _p.macAddtionUrl( _last ) )
                    ;
            }

        , ajax_data:
            function( _selector, _noTriggerAllUpdated, _addUrl ){
                var _p = this
                    , _url = _addUrl || _selector.attr( 'macUrl' )
                    , _prevSelector
                    , _parentId
                    ;
                if( !_url ) return;

                _p.ajax_random( _selector ) && ( _url = JC.f.addUrlParams( _url, { rnd: 0 } ) );

                _prevSelector = _p.prevSelector( _selector );

                if( _prevSelector && _prevSelector.length ){
                    _parentId = _p.macDefaultValue( _prevSelector );

                    if( !_parentId ){
                        !_noTriggerAllUpdated && _p.trigger( 'all_updated' );
                        if( !_noTriggerAllUpdated ) return;
                    }
                    _url = JC.f.printf( _url, _parentId );
                }

                if( _url in MultiAutoComplete.AJAX_CACHE ){
                    _p.trigger( 'ajax_done', [ MultiAutoComplete.AJAX_CACHE[ _url ], _selector, '', _noTriggerAllUpdated ] );
                }else{
                    $.get( _url ).done( function( _text ){
                        //JC.log( _text );
                        var _data = $.parseJSON( _text );
                        MultiAutoComplete.AJAX_CACHE[ _url ] = _data;
                        _p.trigger( 'ajax_done', [ _data, _selector, _text, _noTriggerAllUpdated ] );
                    });
                }

            }

        , ajax_random:
            function( _selector ){
                var _r = MultiAutoComplete.ajaxRandom;
                _selector.is( '[macAjaxRandom]' ) 
                    && ( _r = JC.f.parseBool( _selector.attr( 'macAjaxRandom' ) ) );
                return _r;
            }

        , each:
            function( _cb, _selector ){
                var _p = this, _nextSelector;
                _selector = _selector || _p.selector();

                if( _selector && _selector.length ){
                    _cb.call( _p, _selector );
                    _nextSelector = _p.nextSelector( _selector );

                    _nextSelector 
                        && _nextSelector.length 
                        && _p.each( _cb, _nextSelector )
                        ;
                }
            }

        , macDefaultValue:
            function( _selector ){
                var _r = _selector.attr( 'macDefaultValue' ), _idSelector;

                if( _selector.is( '[cacIdSelector]' ) ){
                    _idSelector = JC.f.parentSelector( _selector, _selector.attr( 'cacIdSelector' ) );

                    _idSelector
                        && _idSelector.length
                        && ( _r = _idSelector.val() );
                }

                return _r;
            }
    });

    JC.f.extendObject( MultiAutoComplete.View.prototype, {
        init:
            function(){
                //JC.log( 'MultiAutoComplete.View.init:', new Date().getTime() );
            }
    });

    window.MultiAutoCompleteIdCallback =
        function(){
        };

    window.MultiAutoCompleteDataFilter = 
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

    _jdoc.ready( function(){
        JC.f.safeTimeout( function(){
            MultiAutoComplete.autoInit && MultiAutoComplete.init();
        }, null, 'MultiAutoCompleteInit', 5 );
    });

    return Bizs.MultiAutoComplete;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
