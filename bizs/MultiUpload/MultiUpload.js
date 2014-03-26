 ;(function(define, _win) { 'use strict'; define( [ 'JC.AjaxUpload' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow..jQuery.html">jQuery</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *   , <a href='JC.AjaxUpload.html'>JC.AjaxUpload</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc.openjavascript.org/docs_api/classes/Bizs.MultiUpload.html' target='_blank'>API docs</a>
 *   | <a href='../../bizs/MultiUpload/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizMultiUpload" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt>bmuItemLimit = int, default = 0</dt>
 *    <dd>限制上传的数量, 0 为不限制, 非 0 为限制的数量<dd>
 *
 *    <dt>bmuBoxSelector = selector, default = '|.bmuBoxSelector'</dt>
 *    <dd>上传内容的父容器</dd>
 *
 *    <dt>bmuTplSelector = selector, default = 组件生成</dt>
 *    <dd>上传内容的模板内容, {0} = file url, {1} = file name</dd>
 *
 *    <dt>bmuAjaxUploadSelector = selector, default = '|.js_compAjaxUpload'</dt>
 *    <dd>JC.AjaxUpload 的选择器</dd>
 *
 *    <dt>bmuItemDelegate = selector, default = '>'</dt>
 *    <dd>bmuBoxSelector 的子级标签</dd>
 *
 *    <dt>bmuRemoveDelegate = selector, default = '.js_removeUploadItem'</dt> 
 *    <dd>删除子级标签的选择器</dd>
 *
 *    <dt>bmuRemoveItemParentSelector = selector, default = '('</dt>
 *    <dd>相对于 bmuRemoveDelegate 的子级标签父选择器</dd>
 *
 *    <dt>bmuItemAddedCallback = function</dt>
 *    <dd>添加上传内容后的回调
<pre>function bmuItemAddedCallback( _newItem, _json, _boxSelector ){
    var _bmuIns = this;
}</pre>
 *    </dd>
 *
 *    <dt>bmuItemDeletedCallback = function</dt>
 *    <dd>删除上传内容后的回调
<pre>function bmuItemDeletedCallback( _deletedItem, _boxSelector ){
    var _bmuIns = this;
}</pre>
 *    </dd>
 *
 *</dl> 
 *
 * @namespace window.Bizs
 * @class MultiUpload
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
<xmp><div class="js_bizMultiUpload"
    bmuBoxSelector="|.uploadItemBox"
    bmuTplSelector="|script"
    bmuItemDelegate=">"
    bmuRemoveDelegate=".js_removeUploadItem"
    bmuRemoveItemParentSelector="("
    bmuAjaxUploadSelector="|.js_compAjaxUpload"
    bmuItemLimit="2"
    >
    <div>
        <input type="hidden" class="ipt ipt-w180 js_compAjaxUpload" value=""
            cauStyle="w1"
            cauButtonText="上传资质文件"
            cauUrl="../_demo/data/handler.php"
            cauFileExt=".jpg, .jpeg, .png, .gif"
            cauFileName="file"
            cauValueKey="url"
            cauLabelKey="name"
            cauProgressBox="/span.AUProgressBox"
            />
            <span class="AUProgressBox" style="display:none;">
                <button type="button" class="AUProgress"><div class="AUPercent"></div></button>
                <button type="button" class="AUCancelProgress"></button>
            </span>
            .jpg, .jpeg, .png, .gif
            (最多上传2个)
    </div>
    <dl class="uploadItemBox">
    </dl>
    <script type="text/template">
        <dd class="js_multiUploadItem">
            <input type="hidden" name="file[]" value="{0}" class="js_multiUploadHidden" />
            <a href="{0}" target="_blank"><label class="js_multiUploadLabel">{1}</label></a>
            <button type="button" class="AURemove js_removeUploadItem"></button>
        </dd>
    </script>
</div></xmp>
 */
    Bizs.MultiUpload = MultiUpload;

    JC.use && !JC.AjaxUpload && JC.use( 'JC.AjaxUpload' );

    function MultiUpload( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, MultiUpload ) ) 
            return JC.BaseMVC.getInstance( _selector, MultiUpload );

        JC.BaseMVC.getInstance( _selector, MultiUpload, this );

        this._model = new MultiUpload.Model( _selector );
        this._view = new MultiUpload.View( this._model );

        this._init();

        JC.log( MultiUpload.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 MultiUpload 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of MultiUploadInstance}
     */
    MultiUpload.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_bizMultiUpload' )  ){
                    _r.push( new MultiUpload( _selector ) );
                }else{
                    _selector.find( 'div.js_bizMultiUpload' ).each( function(){
                        _r.push( new MultiUpload( this ) );
                    });
                }
            }
            return _r;
        };

    BaseMVC.build( MultiUpload );

    JC.f.extendObject( MultiUpload.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'MultiUpload _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'inited', function(){
                    _p._model.saveAjaxUploadHandler();
                    _p._model.injectAjaxHandler();

                    _p.trigger( 'CheckItemLimit' );
                });

                //{"errorno":0,"errmsg":"","data":{"name":"test.jpg","url":"./data/images/test.jpg"}} 
                _p.on( 'AjaxDone', function( _evt, _json, _setter, _ajaxUpload ){
                    //JC.dir( _json );
                    //JC.log( JSON.stringify( _json ) );
                    
                    var _tpl = _p._model.bmuTpl()
                        , _boxSelector = _p._model.bmuBoxSelector()
                        ;

                    if( !( _boxSelector && _boxSelector.length ) ) return;

                    if( _json.errorno ) return;
                    _p._view.newItem( _json, _tpl, _boxSelector );
                });

                _p.on( 'ItemAdded', function( _evt, _newItem, _json, _boxSelector ){
                    JC.f.safeTimeout( function(){ _p.trigger( 'CheckItemLimit' ); }, _p, 'OnItemAdded', 10 );

                    _p._model.bmuItemAddedCallback()
                        && _p._model.bmuItemAddedCallback().call( _p, _newItem, _json, _boxSelector );
                });

                _p.on( 'ItemDeleted', function( _evt, _deletedItem ){
                    _p._model.bmuItemDeletedCallback()
                        && _p._model.bmuItemDeletedCallback().call( _p, _deletedItem, _p._model.bmuBoxSelector() );
                });

                _p.on( 'CheckItemLimit', function(){
                    _p._view.checkItemLimit();
                });


                _p._model.bmuBoxSelector().delegate( _p._model.bmuRemoveDelegate(), 'click', function(){
                    //JC.log( 'bmuRemoveDelegate click', new Date().getTime() );
                    var _pnt = JC.f.parentSelector( this, _p._model.bmuRemoveItemParentSelector() );

                    _pnt && _pnt.length && _pnt.remove();
                    _p.updateStatus();

                    _p.trigger( 'ItemDeleted', [ this ] );
                });
            }

        , _inited:
            function(){
                //JC.log( 'MultiUpload _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
        /**
         * 更新按钮的状态
         * @method updateStatus
         */
        , updateStatus:
            function(){
                this.trigger( 'CheckItemLimit' );
                return this;
            }
    });

    MultiUpload.Model._instanceName = 'MultiUpload';
    MultiUpload.Model._insCount = 1;
    MultiUpload.Model._handlerPrefix = 'bizMultiUploadHandler_';

    JC.f.extendObject( MultiUpload.Model.prototype, {
        init:
            function(){
                //JC.log( 'MultiUpload.Model.init:', new Date().getTime() );
               this._id = MultiUpload.Model._insCount++; 
            }

        , bmuItemLimit: function(){ return this.intProp( 'bmuItemLimit' ); }
        
        , id: 
            function( _setter ){ 
                typeof _setter != 'undefined' && ( this._id = _setter );
                return this._id; 
            }
        , bmuBoxSelector: 
            function(){ 
                var _r = this._bmuBoxSelector || this.selectorProp( 'bmuBoxSelector' );
                !( _r && _r.length ) && ( _r = this.selector().find( '.bmuBoxSelector' ) );
                if( !( _r && _r.length ) ){
                    _r = this._bmuBoxSelector = $( '<dl class="bmuBoxSelector"></dl>' );
                    this._bmuBoxSelector.appendTo( this.selector() );
                }
                return _r;
            }
        , bmuTplSelector: 
            function(){ 
                var _r = this.selectorProp( 'bmuTplSelector' ); 
                !( _r && _r.length ) && ( _r = this.selector().find( '.bmuTplSelector' ) );
                return _r;
            }
        , bmuTpl:
            function(){
                var _r = [
                        '<dd class="js_multiUploadItem">'
                        ,'<input type="hidden" name="file[]" value="{0}" class="js_multiUploadHidden" />'
                        ,'<a href="{0}" target="_blank"><label class="js_multiUploadLabel">{1}</label></a>'
                        ,'&nbsp;<button type="button" class="AURemove js_removeUploadItem"></button>'
                        ,'</dd>'
                    ].join('')
                    , _tplSelector = this.bmuTplSelector()
                    ;

                _tplSelector && _tplSelector.length && ( _r = JC.f.scriptContent( _tplSelector ) );

                return _r;
            }
        , bmuAjaxUploadSelector: 
            function(){ 
                var _r = this.selectorProp( 'bmuAjaxUploadSelector' ); 
                !( _r && _r.length ) && ( _r = this.selector().find( '.js_compAjaxUpload' ) );
                return _r;
            }

        , ajaxUploadIns:
            function(){
                var _r;

                this.bmuAjaxUploadSelector() 
                    && this.bmuAjaxUploadSelector().length
                    && ( _r = JC.BaseMVC.getInstance( this.bmuAjaxUploadSelector(), JC.AjaxUpload ) )
                    ;

                return _r;
            }

        , bmuItemDelegate: function(){ return this.attrProp( 'bmuItemDelegate' ) || '>'; }

        , bmuItems: function(){ return this.bmuBoxSelector().find( this.bmuItemDelegate() ); }

        , bmuRemoveDelegate: function(){ return this.attrProp( 'bmuRemoveDelegate' ) || '.js_removeUploadItem'; }
        , bmuRemoveItemParentSelector: function(){ return this.attrProp( 'bmuRemoveItemParentSelector' ) || '('; }

        , saveAjaxUploadHandler:
            function(){
                this._ajaxUploadDoneHandler = this.windowProp( this.bmuAjaxUploadSelector(), 'cauUploadDoneCallback' );
                this._ajaxUploadErrorHandler = this.windowProp( this.bmuAjaxUploadSelector(), 'cauUploadErrorCallback' );
            }
        , ajaxUploadDoneHandler: function(){ return this._ajaxUploadDoneHandler; }
        , ajaxUploadErrorHandler: function(){ return this._ajaxUploadErrorHandler; }

        , injectAjaxHandler:
            function(){
                var _p = this
                    , _prefix = MultiUpload.Model._handlerPrefix
                    , _doneHandlerName = _prefix + 'done' + this.id()
                    , _errorHandlerName = _prefix + 'error' + this.id()
                    , _cancelHandlerName = _prefix + 'cancel' + this.id()
                    ;

                this.setAjaxUplaodHandler( _doneHandlerName, 'cauUploadDoneCallback', 
                    function( _json, _selector ){
                        var _ajaxUpload = this;

                        _p.ajaxUploadDoneHandler() 
                            && _p.ajaxUploadDoneHandler().call( _ajaxUpload, _json, _selector );

                        _p.trigger( 'AjaxDone', [ _json, _selector, _ajaxUpload ] );

                        //JC.log( 'cauUploadDoneCallback', new Date().getTime() );
                    });

                this.setAjaxUplaodHandler( _errorHandlerName, 'cauBeforeUploadErrCallback', 
                    function( ){
                        JC.f.safeTimeout( function(){ _p.trigger( 'CheckItemLimit' ); }, _p, 'OnError', 10 );
                    });

                this.setAjaxUplaodHandler( _cancelHandlerName, 'cauCancelCallback', 
                    function( ){
                        JC.f.safeTimeout( function(){ _p.trigger( 'CheckItemLimit' ); }, _p, 'OnCancel', 10 );
                    });
            }

        , setAjaxUplaodHandler:
            function( _name, _attrName, _handler ){
                window[ _name ] = _handler;
                this.bmuAjaxUploadSelector().attr( _attrName, _name );
            }
        , bmuItemAddedCallback: function(){ return this.callbackProp('bmuItemAddedCallback'); }
        , bmuItemDeletedCallback: function(){ return this.callbackProp('bmuItemDeletedCallback'); }
    });

    JC.f.extendObject( MultiUpload.View.prototype, {
        init:
            function(){
                //JC.log( 'MultiUpload.View.init:', new Date().getTime() );
            }

        , newItem:
            function( _json, _tpl, _boxSelector ){
                JC.dir( _json );
                _tpl = JC.f.printf( _tpl, _json.data.url, _json.data.name );
                var _newItem = $( _tpl ); 

                _newItem.appendTo( _boxSelector );

                this.trigger( 'ItemAdded', [ _newItem, _json, _boxSelector ] );

                JC.f.jcAutoInitComps( _newItem );
            }

        , checkItemLimit:
            function(){
                var _p = this
                    , _limit = this._model.bmuItemLimit()
                    , _items
                    , _ins = _p._model.ajaxUploadIns()
                    ;
                //JC.log( '_limit', _limit );
                if( !_limit ) return;

                _items = _p._model.bmuItems();
                //if( !( _items && _items.length ) ) return;
                _items = _items || [];

                if( !_ins ) return;

                if( _items.length >= _limit ){
                    //JC.log( 'out limit', new Date().getTime() );
                    _ins.disable();
                }else{
                    //JC.log( 'in limit', new Date().getTime() );
                    _ins.enable();
                }
            }

    });
    /**
     * Bizs.MultiUpload 初始化后触发的事件
     * @event   inited
     */
    /**
     * ajax 上传完毕后触发的事件
     * @event   AjaxDone
     */
    /**
     * 添加上传内容后触发的事件
     * @event ItemAdded
     */
    /**
     * 删除上传内容后触发的事件
     * @event ItemDeleted
     */
    /**
     * 修正按钮状态的事件
     * @event CheckItemLimit
     */

    $(document).ready( function(){
        MultiUpload.autoInit
            && JC.f.safeTimeout( function(){ MultiUpload.init() }, null, 'MultiUploadInit', 2 )
            ;
    });

    return Bizs.MultiUpload;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
