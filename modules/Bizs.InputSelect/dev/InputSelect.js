;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 模拟多选下拉框
 * 框的click将列表拉出来。
 * close和document的click将面板关闭，返回数据，并把数据铺到指定的面板里
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.InputSelect.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.InputSelect/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizInputSelect" </h2>
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
 * @class InputSelect
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-02-20
 * @author  zuojing <suches@btbtd.org> | 75 Team
 * @example
     <div class="test">
        <div class="SELECTBOX js_bizInputSelect" databindbox="(.test .js_box">
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
    Bizs.InputSelect = InputSelect;

    function InputSelect( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, InputSelect ) ) 
            return JC.BaseMVC.getInstance( _selector, InputSelect );

        JC.BaseMVC.getInstance( _selector, InputSelect, this );

        this._model = new InputSelect.Model( _selector );
        this._view = new InputSelect.View( this._model );

        this._init();

        //JC.log( InputSelect.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 InputSelect 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of InputSelectInstance}
     */
    InputSelect.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_bizInputSelect' )  ){
                    _r.push( new InputSelect( _selector ) );
                }else{
                    _selector.find( 'div.js_bizInputSelect' ).each( function(){
                        _r.push( new InputSelect( this ) );
                    });
                }
            }
            return _r;
        };

    /**
     * 定义全局数据过滤函数
     * @method  dataFilter
     * @param   {json}      _json
     * @static
     * @return  {json}
     */
    InputSelect.dataFilter;

    BaseMVC.build( InputSelect );

    JC.f.extendObject( InputSelect.prototype, {
        _beforeInit: function () {
           var p = this;

           p._model.selector().addClass('IPTSEL-BOX').html('<input type="text" class="IPTSEL-INPUT"><span class="IPTSEL-ARROW"></span>');
            //JC.log( 'InputSelect _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
            var p = this,
                $doc = $(document);

            $doc.delegate(p._model.selector().find('.IPTSEL-ARROW')[0], 'click', function () {
                p._model.getajaxdata();
            }); 

        },

        _inited: function () {

        }
           
    });

    InputSelect.Model._instanceName = 'InputSelectIns';

    JC.f.extendObject( InputSelect.Model.prototype, {
        init: function () {

        },

        iptseldataurl: function () {
            return this.attrProp('iptseldataurl');
        },

        iptseldatabox: function () {
            var p = this,
                r = p.attrProp('iptseldatabox');

            return JC.f.parentSelector(p.selector(), r).addClass('IPTSEL-DROPDOWN');
        },

        getajaxdata: function () {
            var p = this,
                url = p.iptseldataurl();

            if ( !url  ) return;

            $.get(url).done(function ( res ) {
                var tpl = '',
                    i = 0,
                    l = 0,
                    data;
                try { 
                    res = $.parseJSON( res ); 
                } catch (ex) {

                }
                data = res.data;
                if (res.errorno) {
                    JC.Dialog.alert(res.errormsg || '操作失败', 2);
                } else {
                   tpl += '<ul>';

                   for (l = data.length; i < l; i++) {
                        tpl += '<li class="IPTSEL-ITEM">' + data[i].label  + '</li>'
                   }

                   tpl += '</ul>';

                   p.iptseldatabox().html(tpl).show();
                }

            });
        }

    });

    JC.f.extendObject( InputSelect.View.prototype, {
        init: function () {

        }  
        
    });
    
    var doc = $(document);

    doc.ready( function(){
        var _insAr = 0;
        InputSelect.autoInit
            && ( _insAr = InputSelect.init() );
    });

    // doc.delegate('.js_bizInputSelect', 'click', function () {
    //     var _p = $(this), 
    //         _ins;
 
    //     JC.f.safeTimeout( function(){
    //         _ins = JC.BaseMVC.getInstance( _p, InputSelect );
    //         !_ins && ( _ins = new InputSelect( _p ) );
    //         _ins.show();
    //     }, _p, 'bizInputSelectClick', 50 );

    // });

    // doc.on('mousedown', function () {
    //     JC.f.safeTimeout( function(){
    //         $('.js_bizInputSelect').each( function(){
    //             var _ins = JC.BaseMVC.getInstance( $(this), InputSelect );
    //                 _ins && _ins.hide();
    //         });
    //     }, null, 'CLOSE_MULTI_SELECT')

    // } );

    // doc.delegate('.SELECTCloseBtn', 'mousedown', function () {
    //     var _ins = JC.BaseMVC.getInstance( JC.f.getJqParent($(this), '.js_bizInputSelect'), InputSelect );
    //     _ins && _ins.hide();
    // });

    // doc.delegate('.js_bizInputSelect>.SELECTListBox', 'mousedown', function( _evt ){
    //     _evt.stopPropagation();
    // });

    return Bizs.InputSelect;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
