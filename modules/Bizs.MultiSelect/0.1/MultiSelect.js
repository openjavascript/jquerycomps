;(function(define, _win) { 'use strict'; define( 'Bizs.MultiSelect', [ 'JC.BaseMVC' ], function(){
//Todo:对于已选中的数据，自动铺出数据列表，展示数据
/**
 * 模拟多选下拉框
 * 框的click将列表拉出来。
 * close和document的click将面板关闭，返回数据，并把数据铺到指定的面板里
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.MultiSelect.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.MultiSelect/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizMultiSelect" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt>defaultLabel = string</dt>
 *    <dd>
 *      声明下拉框默认显示的文字信息
 *    <dd>
 *    <dt>binddatabox = string(selector)</dt>
 *    <dd>声明选中数据，关闭下拉面板后，数据的回填区域<br/>
 *     如果此属性为空，则不会在其他区域展示选中的数据
 *    </dd>
 *    <dt>ajaxurl = string</dt>
 *    <dd>声明ajax加载数据的url
 *          <dl>
 *              <dt>数据格式</dt>
 *              <dd>
 *                  {errorno: 0,
 *                  data: [ { "id": "id value", "label": "label value", "isChecked": "is checked" }, ... ],
 *                  errormsg: ""}
 *              </dd>
 *          </dl></dd>
 *    <dt>dataFilter = callback</dt>
 *    <dd>
 *           <dl>
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
        ( _json[ _ix ] = { 'id': _item[0], 'label': _item[1], 'isChecked': _item[2] } )
        ;
});
return _json;
}</pre>
 *              </dd>
 *          </dl>
 *    </dd>
 *    <dt>dataname=string</dt>
 *    <dd>声明checkbox的name属性， 适用于ajax接口的数据</dd>
 *
 *</dl>
 *
 * @namespace window.Bizs
 * @class MultiSelect
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-02-20
 * @author  zuojing <suches@btbtd.org> | 75 Team
 * @example
     <div class="test">
        <div class="SELECTBOX js_bizMultiSelect" databindbox="(.test .js_box">
           <i class="SELECTIcon"></i>
           <span class="SELECTLabel">共选中<b class="red">2</b>条数据</span>                                         
           <div class="SELECTListBox" style="z-index: 50008; display: none;">
                <ul>
                    <li class="SELECTIgnore">
                       <label>
                           <input type="checkbox" value="" name="" checktype="all" checkfor="///input[type=checkbox]">
                           全选
                       </label>
                    </li>
                    <li>
                       <label>
                           <input type="checkbox" value="1" name="" data-text="北京天地在线广告有限公司">
                           北京天地在线广告有限公司
                       </label>
                    </li>
                    <li>
                       <label>
                           <input type="checkbox" value="2" name="" data-text="河南天地在线广告有限公司">
                           河南天地在线广告有限公司
                       </label>
                    </li>
                    <li>
                       <label>
                           <input type="checkbox" value="3" name="" data-text="河北天地在线广告有限公司">
                           河北天地在线广告有限公司
                       </label>
                    </li>
               </ul>
               <div class="SELECTClose"><a href="javascript:;" class="SELECTCloseBtn">关闭</a></div>
           </div>
        </div>
        <div class="js_box"><ul><li>北京天地在线广告有限公司</li> <li>河南天地在线广告有限公司</li></ul></div>
      </div>
 */

    var _jdoc = $( document ), _jwin = $( window );

    Bizs.MultiSelect = MultiSelect;

    function MultiSelect( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, MultiSelect ) ) 
            return JC.BaseMVC.getInstance( _selector, MultiSelect );

        JC.BaseMVC.getInstance( _selector, MultiSelect, this );

        this._model = new MultiSelect.Model( _selector );
        this._view = new MultiSelect.View( this._model );

        this._init();
    }

    MultiSelect.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( MultiSelect.Model._instanceName, _setter );

        return _selector.data( MultiSelect.Model._instanceName );
    };

    /**
     * 初始化可识别的 MultiSelect 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of MultiSelectInstance}
     */
    MultiSelect.init = function( _selector ){
        var _r = [];
        _selector = $( _selector || document );

        if( _selector && _selector.length ){
            if( _selector.hasClass( 'js_bizMultiSelect' )  ){
                _r.push( new MultiSelect( _selector ) );
            }else{
                _selector.find( 'div.js_bizMultiSelect' ).each( function(){
                    _r.push( new MultiSelect( this ) );
                });
            }
        }
        return _r;
    };

    MultiSelect.update = function( _selector, _data ) {
        var _ins = MultiSelect.getInstance( _selector );
            !_ins && ( _ins = new MultiSelect( _selector ) );
            _ins && _ins.update( _data );
        return _ins;
    };

    /**
     * 定义全局数据过滤函数
     * @method  dataFilter
     * @param   {json}      _json
     * @static
     * @return  {json}
     */
    MultiSelect.dataFilter;

    BaseMVC.build( MultiSelect );

    JC.f.extendObject( MultiSelect.prototype, {
        _beforeInit: function () {
            // JC.log( 'MultiSelect _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
  
        },

        _inited: function () {
            var _p = this,
                enterFlag,
                _selector = this.selector();

            _selector.on( 'click', function( e ) {
                enterFlag = true;
                _p.show();

                _jwin.on( 'click', function( e ) {
                    if( !enterFlag ) {
                        _p.hide();
                    }

                } );
            } );

            _selector.on( 'mouseenter', function( e ) {
                enterFlag = true;
            } );

            _selector.on( 'mouseleave', function( e ) {
                enterFlag = false;
            } );
        },

        show: function () {
            this._view.show();
            return this;
        },

        hide: function () {
            this._view.hide();
            return this;
        },

        update: function( data ) {
            this._model.update( data );
        }
           
    });

    MultiSelect.Model._instanceName = 'MultiSelectIns';
    MultiSelect.Model.SHOW = 'SHOW';
    JC.f.extendObject( MultiSelect.Model.prototype, {
        init: function () {
            this.bindData();
        },

        defaultLabel: function () {
            return this.attrProp('defaultLabel');
        },

        dataBindBox: function () {
            var _p = this,
                _r = _p.attrProp('dataBindBox');

            return JC.f.parentSelector(_p.selector(), _r);
        },

        listBox: function () {
            return this.selector().find('.SELECTListBox');
        },

        ajaxUrl: function () {
            return this.attrProp('ajaxUrl');
        },

        ajaxData: function () {
            var _p = this,
                _url = _p.ajaxUrl(),
                _name = _p.attrProp('dataname'),
                _tpl = '',
                _box = _p.listBox();

            if ( !_url ) return;

            $.get(_url, function (_res) {

                var data = _p.dataFilter( $.parseJSON(_res) );

                _tpl = _p.calcTpl( data );

                $( _tpl ).prependTo(_box);
                JC.f.autoInit && JC.f.autoInit(_box);

                var _l = data.length,
                    _label = '';

                _p.selector().find('.SELECTLabel').html( _l ? '已选择' + _l + '个' +  _label: '请选择' + _label );

            } );

        },

        calcTpl: function( data ) {

            var _tpl = [],
                _res = data,
                _p = this,
                _url = _p.ajaxUrl(),
                _name = _p.attrProp('dataname'),
                _tpl = [];

            _tpl.push('<ul><li class="SELECTIgnore"><label><input type="checkbox" value="" checktype="all" checkfor="///input[type=checkbox]">全选</label></li>');
        
            var i = 0,
                l = _res.length,
                _str = '',
                _checked;

            for (i = 0; i < l; i++) {
                _checked = _res[i].isChecked? 'checked': '';
                _str = '<li><label><input type="checkbox" value="'
                    + _res[i].id + '" name="' + _name + '" '
                    + _checked 
                    + ' data-text="' + _res[i].label + '" />'
                    + _res[i].label + '</label></li>';
                
                _tpl.push(_str);
            }
     
            _tpl.push('</ul>');

            return _tpl.join(' ');
        },

        dataFilter: function ( _data ) {
            var _p = this,
                _filter = _p.callbackProp('dataFilter') || MultiSelect.dataFilter;

            _filter && ( _data = _filter(_data) );

            return _data;
        },

        dataList: function () {
            var _p = this,
                _list = _p.listBox().find('>ul>li').not('.SELECTIgnore'),
                _r = [];

            ( _list.length === 0 ) &&  _p.ajaxUrl() && _p.ajaxData() ;

            _list.each(function () {
                var _sp = $(this),
                    _str = '',
                    _ipt = _sp.find('input');

                if ( _ipt.prop('checked') ) {
                    _str = '<li>' + _ipt.data('text') + '</li>' ;
                    _r.push(_str);
                }
            });

            return _r;
        },

        bindData: function () {
            var _p = this,
                _box = _p.dataBindBox(),
                _datalist = _p.dataList(),
                _l = _datalist.length,
                _label = _p.defaultLabel(),
                _t = '';
            
            _box.html('<ul>' + _datalist.join(' ') + '</ul>');
            _t = _l ? '已选择' + _l + '个' +  _label: '请选择' + _label;
            _p.selector().find('.SELECTLabel').html(_t);
        },

        update: function( data ) {
            var _p = this,
                _box = _p.listBox();

            var _tpl = _p.calcTpl( data );

            _box.html( '' );
            $( _tpl ).prependTo(_box);
            JC.f.autoInit && JC.f.autoInit(_box);

            var _l = data.length,
                _label = '';

            _p.selector().find('.SELECTLabel').html( _l ? '已选择' + _l + '个' +  _label: '请选择' + _label );
        }

    });

    JC.f.extendObject( MultiSelect.View.prototype, {
        init: function () {

        },

        show: function () {
            var _p = this,
                _selector = _p._model.selector();

            JC.f.safeTimeout( setTimeout( function(){}, 50), _selector, 'SELECTListBoxUi' );
            _selector.addClass('SELECTBOX-active');
            _p._model.listBox().show().css( { 'z-index': ZINDEX_COUNT++ } );
        }, 

        hide: function () {
            var _p = this,
                _selector = _p._model.selector();

            _p._model.listBox().hide();
            JC.f.safeTimeout( setTimeout( function(){
                _selector.removeClass( 'SELECTBOX-active' );
                _p._model.bindData();
            }, 50), _selector, 'SELECTListBoxUi' );
        }
           
    });

    _jdoc.ready( function(){
        JC.f.safeTimeout( function(){
            MultiSelect.autoInit && MultiSelect.init();
        }, null, 'MultiSelect23asdfa', 1 );
    });

    return Bizs.MultiSelect;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
