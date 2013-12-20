;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * <h2>Dom 通用 添加删除 逻辑</h2>
 * <br/>应用场景
 * <br/>需要动态添加删除内容的地方可以使用这个类
 * <p><b>require</b>: 
 *      <a href='window.jQuery.html'>jQuery</a>
 *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 * </p>
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc2.openjavascript.org/docs_api/classes/window.Bizs.CommonModify.html' target='_blank'>API docs</a>
 * | <a href='../../modules/Bizs.CommonModify/0.1/_demo' target='_blank'>demo link</a></p>
 *
 * a|button 需要 添加 class="js_autoCommonModify"
 *
 * <h2>可用的 HTML 属性</h2>
 * <dl>
 *      <dt>[cmtpl | cmtemplate] = script selector</dt>
 *      <dd>指定保存模板的 script 标签</dd>
 *
 *      <dt>cmitem = selector</dt>
 *      <dd>添加时, 目标位置的 父节点/兄弟节点</dd>
 *
 *      <dt>cmaction = string, [add, del], default = add</dt>
 *      <dd>操作类型</dd>
 *
 *      <dt>cmappendtype = string, default = after</dt>
 *      <dd>指定 node 添加 dom 的方法, 可选类型: before, after, appendTo</dd>
 *
 *      <dt>cmdonecallback = function</dt>
 *      <dd>
 *      添加或删除完后会触发的回调, <b>window 变量域</b>
<pre>function cmdonecallback( _ins, _boxParent ){
    var _trigger = $(this);
    JC.log( 'cmdonecallback', new Date().getTime() );
}</pre>
 *      </dd>
 *
 *      <dt>cmtplfiltercallback = function</dt>
 *      <dd>
 *      模板内容过滤回调, <b>window 变量域</b>
<pre>window.COUNT = 1;
function cmtplfiltercallback( _tpl, _cmitem, _boxParent ){
    var _trigger = $(this);
    JC.log( 'cmtplfiltercallback', new Date().getTime() );
    _tpl = JC.f.printf( _tpl, COUNT++ );

    return _tpl;
}</pre>
 *      </dd>
 *
 *      <dt>cmbeforeaddcallabck = function</dt>
 *      <dd>
 *      添加之前的回调, 如果返回 false, 将不执行添加操作, <b>window 变量域</b>
<pre>function cmbeforeaddcallabck( _cmitem, _boxParent ){
    var _trigger = $(this);
    JC.log( 'cmbeforeaddcallabck', new Date().getTime() );
    //return false;
}</pre>
 *      </dd>
 *
 *      <dt>cmaddcallback = function</dt>
 *      <dd>
 *      添加完成的回调, <b>window 变量域</b>
<pre>function cmaddcallback( _ins, _newItem, _cmitem, _boxParent ){
    var _trigger = $(this);
    JC.log( 'cmaddcallback', new Date().getTime() );
}</pre>
 *      </dd>
 *
 *      <dt>cmbeforedelcallback = function</dt>
 *      <dd>
 *      删除之前的回调, 如果返回 false, 将不执行删除操作, <b>window 变量域</b>
<pre>function cmbeforedelcallback( _cmitem, _boxParent ){
    var _trigger = $(this);
    JC.log( 'cmbeforedelcallback', new Date().getTime() );
    //return false;
}</pre>
 *      </dd>
 *
 *      <dt>cmdelcallback = function</dt>
 *      <dd>
 *      删除完成的回调, <b>window 变量域</b>
<pre>function cmdelcallback( _ins, _boxParent ){
    JC.log( 'cmdelcallback', new Date().getTime() );
}</pre>
 *      </dd>
 *
 *      <dt>cmMaxItems = int</dt>
 *      <dd>
 *          指定最多可添加数量
 *          <br /><b>要使 cmMaxItems 生效, 必须声明 cmAddedItemsSelector</b>
 *      </dd>
 *
 *      <dt>cmAddedItemsSelector = selector</dt>
 *      <dd>
 *          指定查找所有上传项的选择器语法
 *      </dd>
 *
 *      <dt>cmOutRangeMsg = string, default = "最多只能上传 {0}个文件!"</dt>
 *      <dd>
 *          添加数量超出 cmMaxItems 时的提示信息
 *      </dd>
 * </dl>
 *
 * @namespace   window.Bizs
 * @class       CommonModify
 * @extends     JC.BaseMVC
 * @constructor
 * @version dev 0.1 2013-09-04
 * @author  qiushaowei   <suches@btbtd.org> | 75 Team
 *
 * @example
 *       <table>
             <tr>
                <td>
                    <label class="gray">甲方主体：</label>
                </td>
                <td>
                    <input type="text" name="" class="ipt ipt-w320" />&nbsp;
                        <a href="javascript:" 
                        class="green js_autoCommonModify" 
                        cmtemplate="#addMainFirstPartyTpl"
                        cmitem="(tr"
                        cmaction="add"
                    >+ 添加</a>
                    <em class="error"></em>
                </td>
            </tr>
        </table>

        <script type="text/template" id="addMainFirstPartyTpl" >
         <tr>
            <td>
                <label class="gray">甲方主体：</label>
            </td>
            <td>
                <input type="text" name="" class="ipt ipt-w320" />
                <a href="javascript:" 
                    class="green js_autoCommonModify" 
                    cmtemplate="#addMainFirstPartyTpl"
                    cmitem="(tr"
                    cmaction="add"
                >+ 添加</a>
                <a href="javascript:" class="red js_autoCommonModify"
                    cmtemplate="#addMainFirstPartyTpl"
                    cmitem="(tr"
                    cmaction="del"
                >+ 删除</a>
                <em class="error"></em>
            </td>
        </tr>
        </script>
 */
    window.Bizs.CommonModify = CommonModify;

    function CommonModify( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( CommonModify._instance ){
            //_selector && _selector.length && CommonModify._instance.process( _selector );
            return CommonModify._instance;
        }

        if( !CommonModify._instance ){
            CommonModify._instance = this;
        }

        this._model = new CommonModify.Model( _selector );
        this._view = new CommonModify.View( this._model );

        this._init();

        _selector && _selector.length && this.process( _selector );
    }
    
    CommonModify.prototype = {
        _beforeInit:
            function(){
                JC.log( 'CommonModify _beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on('add', function( _evt, _newItem, _boxParent ){
                    _p._model.cmaddcallback()
                        && _p._model.cmaddcallback().call( _p.selector(), _p, _newItem, _p._model.cmitem(), _boxParent );
                });

                _p.on('del', function( _evt, _newItem, _boxParent ){
                    _p._model.cmdelcallback()
                        && _p._model.cmdelcallback().call( _p.selector(), _p, _boxParent );
                });

                _p.on('done', function( _evt, _newItem, _boxParent ){
                    _p._model.cmdonecallback()
                        && _p._model.cmdonecallback().call( _p.selector(), _p, _boxParent );
                });

                return _p;

            }
        , _inited:
            function(){
                JC.log( 'CommonModify _inited', new Date().getTime() );
            }
        /**
         * 获取 显示 CommonModify 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  CommonModifyInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  CommonModifyInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}

        , process:
            function( _selector ){
                if( !( _selector && ( _selector = $(_selector) ).length ) ) return this;
                /**
                 * update current selector
                 */
                this._model.selector( _selector );

                switch( this._model.action() ){
                    case 'del': this._view.del(); break;
                    default: this._view.add(); break;
                }
            }
        , cmitem: function(){ return this._model.cmitem(); }
    }
    /**
     * 获取或设置 CommonModify 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {CommonModify instance}
     */
    CommonModify.getInstance =
        function(){
            !CommonModify._instance 
                && ( CommonModify._instance = new CommonModify() );
            return CommonModify._instance;
        };
    CommonModify._instance = null;
    /**
     * 判断 selector 是否可以初始化 CommonModify
     * @method  isCommonModify
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    CommonModify.isCommonModify =
        function( _selector ){
            var _r;
            _selector 
                && ( _selector = $(_selector) ).length 
                && ( _r = _selector.is( '[CommonModifylayout]' ) );
            return _r;
        };

    CommonModify.doneCallback = null;
    CommonModify.tplFilterCallback = null;
    CommonModify.beforeAddCallback = null;
    CommonModify.addCallback = null;
    CommonModify.beforeDelCallabck = null;
    CommonModify.delCallback = null;
    
    BaseMVC.buildModel( CommonModify );

    CommonModify.Model.prototype = {
        init:
            function(){
                return this;
            }

        , selector: 
            function( _setter ){ 
                _setter && ( _setter = $( _setter ) ) && ( this._selector = _setter );
                return this._selector; 
            }
        , layout: function(){}

        , action:
            function(){
                var _r = 'add', _tmp;
                ( _tmp = this.selector().attr( 'cmaction' ) ) && ( _r = _tmp.toLowerCase() );
                return _r;
            }

        , cmtemplate:
            function(){
                var _r = '', _tmp;
                _tmp = JC.f.parentSelector( this.selector(), this.selector().attr('cmtemplate') );
                !( _tmp && _tmp.length ) && ( _tmp = JC.f.parentSelector( this.selector(), this.selector().attr('cmtpl') ) );

                this.selector() 
                    && ( _tmp && _tmp.length )
                    && ( _r = JC.f.scriptContent( _tmp ) )
                    ;
                return _r;
            }

        , cmdonecallback:
            function(){
                var _r = CommonModify.doneCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmdonecallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , cmtplfiltercallback:
            function(){
                var _r = CommonModify.tplFilterCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmtplfiltercallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;


                return _r;
            }

        , cmAddedItemsSelector:
            function(){
                var _r = this.selectorProp('cmAddedItemsSelector');
                return _r;
            }

        , cmMaxItems:
            function(){
                var _r = this.intProp( 'cmMaxItems' );
                return _r;
            }

        , cmOutRangeMsg:
            function(){
                var _r = JC.f.printf( this.attrProp( 'cmOutRangeMsg' ) ||'最多只能上传 {0}个文件!', this.cmMaxItems() );
                return _r;
            }

        , cmaddcallback:
            function(){
                var _r = CommonModify.addCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmaddcallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , cmdelcallback:
            function(){
                var _r = CommonModify.delCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmdelcallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , cmbeforeaddcallabck:
            function(){
                var _r = CommonModify.beforeAddCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmbeforeaddcallabck') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , cmbeforedelcallback:
            function(){
                var _r = CommonModify.beforeDelCallabck, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmbeforedelcallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , cmitem:
            function(){
                var _r, _tmp;
                this.selector()
                    && ( _tmp = this.selector().attr('cmitem') )
                    && ( _r = JC.f.parentSelector( this.selector(), _tmp ) )
                    ;
                return _r;
            }

        , cmappendtype:
            function(){
                var _r = this.selector().attr('cmappendtype') || 'after';
                return _r;
            }
    };
    
    BaseMVC.buildView( CommonModify );
    
    CommonModify.View.prototype = {
        init:
            function() {
                return this;
            }

        , add:
            function(){
                JC.log( 'Bizs.CommonModify view add', new Date().getTime() );
                var _p = this
                    , _tpl = _p._model.cmtemplate()
                    , _item = _p._model.cmitem()
                    , _boxParent = _item.parent()
                    , _newItem
                    , _maxItems = _p._model.cmMaxItems()
                    , _addedItems = _p._model.cmAddedItemsSelector()
                    ;

                if( _maxItems && _addedItems && _addedItems.length ){
                    if( _addedItems.length >= _maxItems ){
                        var _msg = _p._model.cmOutRangeMsg();
                        if( JC.msgbox ){
                            JC.msgbox( _msg, _p._model.selector(), 2 );
                        }else{
                            alert( _msg );
                        }
                        return;
                    }
                }

                if( _p._model.cmbeforeaddcallabck() 
                        && _p._model.cmbeforeaddcallabck().call( _p._model.selector(), _item, _boxParent ) === false 
                ) return;

                _p._model.cmtplfiltercallback() 
                    && ( _tpl = _p._model.cmtplfiltercallback().call( _p._model.selector(), _tpl, _item, _boxParent ) );

                _tpl = _tpl.replace( /<([\d]+)>/g, "{$1}" );

                JC.log( '_item:', _item, _item.length );

                if( !( _tpl && _item && _item.length ) ) return;
                _newItem = $( _tpl );

                switch( _p._model.cmappendtype() ){
                    case 'appendTo': _newItem.appendTo( _item ); break;
                    case 'before': _item.before( _newItem ); break;
                    default: _item.after( _newItem ); break;
                }
                
                window.JC.f.jcAutoInitComps && JC.f.jcAutoInitComps( _newItem );

                $( _p ).trigger( 'TriggerEvent', [ 'add', _newItem, _boxParent ] );
                $( _p ).trigger( 'TriggerEvent', [ 'done', _newItem, _boxParent ] );
            }

        , del:
            function(){
                JC.log( 'Bizs.CommonModify view del', new Date().getTime() );
                var _p = this
                    , _item = _p._model.cmitem()
                    , _boxParent = _item.parent()
                    ;

                if( _p._model.cmbeforedelcallback() 
                        && _p._model.cmbeforedelcallback().call( _p._model.selector(), _item, _boxParent ) === false 
                ) return;

                _item && _item.length && _item.remove();

                $( _p ).trigger( 'TriggerEvent', [ 'del', _item, _boxParent ] );
                $( _p ).trigger( 'TriggerEvent', [ 'done', _item, _boxParent ] );
            }
    };

    BaseMVC.build( CommonModify );

    $(document).delegate( 'a.js_autoCommonModify, button.js_autoCommonModify'
                          + ', a.js_bizsCommonModify, button.js_bizsCommonModify', 'click', function( _evt ){
        CommonModify.getInstance().process(  $(this) );
    });

    return Bizs.CommonModify;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
