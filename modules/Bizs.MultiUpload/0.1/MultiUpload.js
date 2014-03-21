 ;(function(define, _win) { 'use strict'; define( [ 'JC.AjaxUpload' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow..jQuery.html">jQuery</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.MultiUpload.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.MultiUpload/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizMultiUpload" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
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
        <h2>Bizs.MultiUpload 示例</h2>
 */
    Bizs.MultiUpload = MultiUpload;

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

                    _p._view.newItem( _json, _tpl, _boxSelector );
                });

                _p.on( 'ItemAdded', function( _evt, _newItem ){
                    _p.trigger( 'CheckItemLimit' );
                });

                _p.on( 'CheckItemLimit', function(){
                    _p._view.checkItemLimit();
                });
            }

        , _inited:
            function(){
                //JC.log( 'MultiUpload _inited', new Date().getTime() );
                this.trigger( 'inited' );
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
                var _r = this.selectorProp( 'bmuBoxSelector' );
                !( _r && _r.length ) && ( _r = this.selector().find( '.bmuBoxSelector' ) );
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
                        '<dd class="js_multiUploadItem">\n'
                        ,'<input type="hidden" name="file[]" value="{0}" class="js_multiUploadHidden" />\n'
                        ,'<label class="js_multiUploadLabel">{1}</label>\n'
                        ,'<button type="button" class="AURemove js_multiUploadRemove"></button>\n'
                        ,'</dd>\n'
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

        , bmuItemDelegate: function(){ return this.attrProp( 'bmuItemDelegate' ) || '> dd'; }

        , bmuItems: function(){ return this.bmuBoxSelector().find( this.bmuItemDelegate() ); }

        , bmuRemoveDelegate: function(){ return this.attrProp( 'bmuRemoveDelegate' ) || '.js_removeUploadItem'; }

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
                    ;

                this.setAjaxUplaodHandler( _doneHandlerName, 'cauUploadDoneCallback', 
                    function( _json, _selector ){
                        var _ajaxUpload = this;

                        _p.ajaxUploadDoneHandler() 
                            && _p.ajaxUploadDoneHandler().call( _ajaxUpload, _json, _selector );

                        _p.trigger( 'AjaxDone', [ _json, _selector, _ajaxUpload ] );

                        //JC.log( 'cauUploadDoneCallback', new Date().getTime() );
                    });
            }

        , setAjaxUplaodHandler:
            function( _name, _attrName, _handler ){
                window[ _name ] = _handler;
                this.bmuAjaxUploadSelector().attr( _attrName, _name );
            }
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
            }

        , checkItemLimit:
            function(){
                var _p = this
                    , _limit = this._model.bmuItemLimit()
                    , _items
                    ;
                JC.log( '_limit', _limit );
                if( !_limit ) return;

                _items = _p._model.bmuItems();
                if( !( _items && _items.length ) ) return;

                if( _items.length >= _limit ){
                    JC.log( 'out limit', new Date().getTime() );
                }else{
                    JC.log( 'in limit', new Date().getTime() );
                }
            }

    });

    $(document).ready( function(){
        var _insAr = 0;
        MultiUpload.autoInit
            && ( _insAr = MultiUpload.init() )
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
