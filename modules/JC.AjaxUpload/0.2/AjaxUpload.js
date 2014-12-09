(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Panel', 'SWFUpload' ], function(){
    /**
     * Ajax 文件上传
     * <p><b>require</b>: 
     *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     *      , <a href='JC.Panel.html'>JC.Panel</a>
     *      , <a href='javascript:;'>SWFUpload</a>
     * </p>
     * <p>
     *      <a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.AjaxUpload.html' target='_blank'>API docs</a>
     *      | <a href='../../modules/JC.AjaxUpload/0.2/_demo' target='_blank'>demo link</a>
     * </p>
     * <h2>可用的 html attribute</h2>
     * <dl>
     *      <dt>cauStyle = string, default = g1</dt>
     *      <dd>
     *          按钮显示的样式, <a href='../../modules/JC.AjaxUpload/dev/res/default/style.html' target='_blank'>可选样式</a>:
     *          <dl>
     *              <dt>绿色按钮</dt>
     *              <dd>g1, g2, g3</dd>
     *
     *              <dt>白色/银色按钮</dt>
     *              <dd>w1, w2, w3</dd>
     *          </dl>
     *      </dd>
     *
     *      <dt>cauButtonText = string, default = 上传文件</dt>
     *      <dd>定义上传按钮的显示文本</dd>
     *
     *      <dt>cauButtonAfter= bool</dt>
     *      <dd>是否把上传按钮放在后面</dd>
     *
     *      <dt>cauUrl = url, require</dt>
     *      <dd>上传文件的接口地址
     *          <br />如果 url 带有参数 callback, 返回数据将以 jsonp 方式处理
     *      </dd>
     *
     *      <dt>cauFileExt = file ext, optional</dt>
     *      <dd>允许上传的文件扩展名, 例: ".jpg, .jpeg, .png, .gif"</dd>
     *
     *      <dt>cauFileName = string, default = file</dt>
     *      <dd>上传文件的 name 属性</dd>
     *
     *      <dt>cauValueKey = string, default = url</dt>
     *      <dd>返回数据用于赋值给 hidden/textbox 的字段</dd>
     *
     *      <dt>cauLabelKey = string, default = name</dt>
     *      <dd>返回数据用于显示的字段</dd>
     *
     *      <dt>cauSaveLabelSelector = selector</dt>
     *      <dd>指定保存 cauLabelKey 值的 selector</dd>
     *
     *      <dt>cauStatusLabel = selector, optional</dt>
     *      <dd>开始上传时, 用于显示状态的 selector</dd>
     *
     *      <dt>cauDisplayLabel = selector, optional</dt>
     *      <dd>上传完毕后, 用于显示文件名的 selector</dd>
     *
     *      <dt>cauUploadDoneCallback = function, optional</dt>
     *      <dd>
     *          文件上传完毕时, 触发的回调
<pre>function cauUploadDoneCallback( _json, _selector ){
    var _ins = this;
    //alert( _json ); //object object
}</pre>
     *      </dd>
     *
     *      <dt>cauUploadErrorCallback = function, optional</dt>
     *      <dd>
     *          文件上传完毕时, 发生错误触发的回调
<pre>function cauUploadErrorCallback( _json, _selector ){
    var _ins = this;
    //alert( _json ); //object object
}</pre>
     *      </dd>
     *
     *      <dt>cauDisplayLabelCallback = function, optional, return = string</dt>
     *      <dd>
     *          自定义上传完毕后显示的内容 模板
<pre>function cauDisplayLabelCallback( _json, _label, _value ){
    var _selector = this
        , _label = JC.f.printf( '&lt;a href="{0}" class="green js_auLink" target="_blank">{1}&lt;/a>{2}'
                        , _value, _label
                        ,  '&nbsp;&lt;a href="javascript:" class="btn btn-cls2 js_cleanCauData">&lt;/a>&nbsp;&nbsp;'
                    )
        ;
    return _label;
}</pre>
     *      </dd>
     *
     *      <dt>cauDebug = bool, default = false</dt>
     *      <dd>是否显示 flash 调试信息</dd>
     *
     *      <dt>cauFlashUrl = string</dt>
     *      <dd>显式声明 flash 路径</dd>
     *
     *      <dt>cauButtonWidth = int, default = 自动计算</dt>
     *      <dd>显式声明按钮的宽度</dd>
     *
     *      <dt>cauButtonHeight= int, default = 自动计算</dt>
     *      <dd>显式声明按钮的高度</dd>
     *
     *      <dt>cauRoot = string</dt>
     *      <dd>显式声明组件根路径</dd>
     *
     *      <dt>cauUploadLimit = int, default = 0(不限制)</dt>
     *      <dd>上传文件的总数量</dd>
     *
     *      <dt>cauQueueLimit = int, default = 0(不限制)</dt>
     *      <dd>队列中文件的总数量(<b>未实现</b>)</dd>
     *
     *      <dt>cauFileSize = [ KB | MB | GB ], default = 1024 MB</dt>
     *      <dd>上传文件大小限制</dd>
     *
     *      <dt>cauCacheSwf = bool, default = true</dt>
     *      <dd>是否缓存 flash swf</dd>
     *
     *      <dt>cauHttpSuccess = string, default = 200, 201, 204</dt>
     *      <dd>http 通信成功的状态码</dd>
     *
     *      <dt>cauButtonStyle = string, default = .uFont{ color:#000000; text-align: center; }</dt>
     *      <dd>定义 flash 按钮的样式</dd>
     *
     *      <dt>cauParamsCallback = function</dt>
     *      <dd>设置 flash 参数的回调
<pre>function cauParamsCallback( _params ){
    var _model = this;
    return _params;
}</pre>
     *      </dd>
     *
     *      <dt>cauPostParams = json var name, (<b>window 变量域</b>)</dt>
     *      <dd>显式声明 post params, 全局指定请用 JC.AjaxUpload.POST_PARAMS </dd>
     *
     *      <dt>cauAllCookies = bool, default = true</dt>
     *      <dd>是否把所有 cookie 添加到 post_params, 发送到服务器</dd>
     *      
     *      <dt>cauBatchUpload = bool, default = false</dt>
     *      <dd>是否为批量上传(<b>未实现</b>)</dd>
     *
     *      <dt>cauShowProgress = bool, default = false</dt>
     *      <dd>是否显示进度条
     *          <br >如果为真, 且没有声明 cauProgressBox, 那么会自动生成 cauProgressBox
     *      </dd>
     *
     *      <dt>cauProgressBox = selector</dt>
     *      <dd>显式声明 进度条标签</dd>
     *
     *      <dt>cauViewFileBox = selector</dt>
     *      <dd>用于显示文件链接的容器</dd>
     *
     *      <dt>cauViewFileBoxItemTpl = selector</dt>
     *      <dd>cauViewFileBox 的脚本模板</dd>
     * </dl>
     * @namespace JC
     * @class AjaxUpload
     * @extends JC.BaseMVC
     * @constructor
     * @param   {selector}   _selector   
     * @version dev 0.2, 2014-03-20
     * @version dev 0.1, 2013-09-26
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @example
            <div>
                <input type="hidden" class="js_compAjaxUpload" value=""
                    cauStyle="w1"
                    cauButtonText="上传资质文件"
                    cauUrl="/ignore/JQueryComps_dev/comps/AjaxUpload/_demo/data/handler.php"
                    cauFileExt=".jpg, .jpeg, .png, .gif"
                    cauFileName="file"
                    cauLabelKey="name"
                    cauValueKey="url"
                    cauStatusLabel="/label.js_statusLabel"
                    cauDisplayLabel="/label.js_fileLabel"
                    />
                <label class="js_fileLabel" style="display:none"></label>
                <label class="js_statusLabel" style="display:none">文件上传中, 请稍候...</label>
            </div>

            POST 数据:
                ------WebKitFormBoundaryb1Xd1FMBhVgBoEKD
                Content-Disposition: form-data; name="file"; filename="disk.jpg"
                Content-Type: image/jpeg

            返回数据:
                {
                    "errorno": 0, 
                    "data":
                    {
                        "url": "/ignore/JQueryComps_dev/comps/AjaxUpload/_demo/data/images/test.jpg", 
                        "name": "test.jpg"
                    }, 
                    "errmsg": ""
                }
     */
    JC.AjaxUpload = AjaxUpload;
    JC.f.addAutoInit && JC.f.addAutoInit( AjaxUpload );

    function AjaxUpload( _selector ){
        if( AjaxUpload.getInstance( _selector ) ) return AjaxUpload.getInstance( _selector );
        if( !_selector.hasClass('js_compAjaxUpload' ) ) return AjaxUpload.init( _selector );
        AjaxUpload.getInstance( _selector, this );
        //JC.log( AjaxUpload.Model._instanceName );

        this._model = new AjaxUpload.Model( _selector );
        this._view = new AjaxUpload.View( this._model );

        JC.log( 'AjaxUpload init', new Date().getTime() );

        this._init();
    }
    /**
     * 获取或设置 AjaxUpload 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @return  {AjaxUploadInstance}
     * @static
     */
    AjaxUpload.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( AjaxUpload.Model._instanceName, _setter );

            return _selector.data( AjaxUpload.Model._instanceName );
        };
    /**
     * 初始化可识别的组件
     * @method  init
     * @param   {selector}      _selector
     * @return  {array}         instance array
     * @static
     */
    AjaxUpload.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );
            if( _selector.hasClass( 'js_compAjaxUpload' ) ){
                    _r.push( new AjaxUpload( _selector ) );
            }else{
                _selector.find('input.js_compAjaxUpload, button.js_compAjaxUpload').each( function(){
                    _r.push( new AjaxUpload( $(this) ) );
                });
            }
            return _r;
        };

    /**
     * 全局的 post params 回调
     * @property    PARAMS_CALLBACK
     * @return      json
     * @static
     * @example
<pre>function PARAMS_CALLBACK( _params ){
    var _model = this;
    return _params;
}</pre>
     */
    AjaxUpload.PARAMS_CALLBACK;
    /**
     * 全局的 post params 属性
     * @property   POST_PARAMS 
     * @return      json
     * @static
     */
    AjaxUpload.POST_PARAMS;

    BaseMVC.build( AjaxUpload );

    JC.f.extendObject( AjaxUpload.prototype, {
        _beforeInit:
            function(){
                var _p = this;
                //JC.log( 'AjaxUpload _beforeInit', new Date().getTime() );
                
            }
        , _initHanlderEvent:
            function(){
                var _p = this, _fileBox = _p._model.cauViewFileBox();
                if( _fileBox && _fileBox.length ){
                    _fileBox.delegate( '.js_clearAjaxUpload', 'click', function(){
                        _p.clear();
                    });
                }
                /**
                 * 文件扩展名错误
                 */
                _p.on( 'ERR_FILE_EXT', function( _evt, _flPath ){
                    _p._view.errFileExt( _flPath );
                    _p._view.updateChange();
                });
                /**
                 * 上传前触发的事件
                 */
                _p.on( 'BeforeUpload', function( _d ){
                    _p._view.beforeUpload();
                });
                /**
                 * 上传完毕触发的事件
                 */
                _p.on( 'UploadDone', function( _evt, _d, _ignore, _flName ){
                    if( _ignore ) return;
                    var _err = false, _od = _d;
                    try{ 
                        typeof _d == 'string' && ( _d = $.parseJSON( _d ) );
                    } catch( ex ){ _d = {}; _err = true; }

                    _p.trigger( 'UploadComplete' );

                    //_err = true;
                    //_d.errorno = 1;
                    //_d.errmsg = "test error"
                    if( _err ){
                        _p._view.errFatalError( _od );

                        _p.trigger('UpdateDefaultStatus')
                        _p._model.cauUploadErrorCallback()
                            && _p._model.cauUploadErrorCallback().call(    
                                _p
                                , _d
                                , _p._model.selector()
                            );
                    }else{
                        if( _d.errorno ){
                            _p._view.errUpload( _d );
                            _p._view.updateChange();
                        }else{
                            _p._view.updateChange( _d );
                        }
                        _p._model.cauUploadDoneCallback()
                            && _p._model.cauUploadDoneCallback().call(
                                _p
                                , _d
                                , _p._model.selector()
                            );
                    }

                });

                _p.on( 'UpdateDefaultStatus', function( _evt, _file, _errCode, _msg ){
                    JC.f.safeTimeout( function(){
                        $( _p._view ).trigger( 'UpdateDefaultStatus', [ _file, _errCode, _msg ] );
                    }, _p, 'RESET_STATUS', 100 );
                });

               _p.on( 'UploadError', function( _evt, _file, _errCode, _msg ){
                    $( _p._view ).trigger( 'UploadError', [ _file, _errCode, _msg ] );
                });

               _p.on( 'CancelUpload', function( _evt ){
                   _p._model.cancelUpload();
                    _p.trigger( 'UploadComplete' );
                    _p._model.cauCancelCallback() && _p._model.cauCancelCallback().call( _p );
               });

               _p.on( 'UploadComplete', function( _evt, _data ){
                   _p._view.uploadComplete( _data );
               });

               _p.on( 'UploadProgress', function( _evt, _file, _curBytes, _totalBytes ){
                   _p._view.uploadProgress( _file.name, _curBytes, _totalBytes );
               });

                _p.on( 'inited', function(){
                    _p._model.loadSWF( _p._model.getParams() );
                });

                _p.on( 'disable', function(){
                    if( !_p._model.uploadReady() ){
                        _p._model.beforeReadyQueue( function(){ _p._view.disable(); } );
                    }
                    _p._view.disable();
                });

                _p.on( 'enable', function(){
                    if( !_p._model.uploadReady() ){
                        _p._model.beforeReadyQueue( function(){ _p._view.enable(); } );
                    }
                    _p._view.enable();
                });

                _p.on( 'UploadReady', function(){
                    var _queue = _p._model.beforeReadyQueue();
                    setTimeout( function(){
                        $.each( _queue, function( _ix, _item ){
                            _item();
                        });
                    }, 300 );
                });

                _p.on( 'SHOW_LAYOUT_BUTTON', function(){
                    _p._model.layoutButton().css( { 'position': 'static' } );
                });

                _p.on( 'HIDE_LAYOUT_BUTTON', function(){
                    _p._model.layoutButton().css( { 'position': 'absolute', 'left': '-10000px' } );
                });
            }
        , _inited:
            function(){
                var _p = this;
                //JC.log( 'AjaxUpload _inited', new Date().getTime() );

                $( document ).delegate( 
                    JC.f.printf( '.AjaxUploadProgressBox_{0} .AUCancelProgress', _p._model.id() ), 'click', 
                    function( _evt ){
                        _p.trigger( 'CancelUpload' );
                });

                _p.trigger( 'inited' );
            }
        /**
         * 禁用上传按钮
         * @method disable
         */
        , disable: function(){ this.trigger( 'disable' ); return this; }
        /**
         * 启用上传按钮
         * @method enable
         */
        , enable: function(){ this.trigger( 'enable' ); return this; }
        /**
         * 手动更新数据
         * @method  update
         * @param   {object}    _d
         * @return  AjaxUploadInstance
         * @example
                JC.AjaxUpload.getInstance( _selector ).update( {
                    "errorno": 0, 
                    "data":
                    {
                        "url": "/ignore/JQueryComps_dev/comps/AjaxUpload/_demo/data/images/test.jpg", 
                        "name": "test.jpg"
                    }, 
                    "errmsg": ""
                });
         */
        , update:
            function( _d ){
                var _p = this;
                _p.trigger('UpdateDefaultStatus')
                _d && _p.trigger('UploadDone', [ _d ] );
                return this;
            }

        , clear: 
            function(){
                var _p = this;
                _p.trigger('UpdateDefaultStatus')
                return this;
            }
    });

    AjaxUpload.Model._instanceName = 'AjaxUpload';
    AjaxUpload.Model._insCount = 1;

    if( JC.use ){
        AjaxUpload.Model.FLASH_URL = '/plugins/SWFUpload.swf';
        AjaxUpload.Model.PATH = '/comps/AjaxUpload/';
    }else{
        AjaxUpload.Model.FLASH_URL = '/modules/SWFUpload/2.5.0/SWFUpload.swf';
        AjaxUpload.Model.PATH = '/modules/JC.AjaxUpload/0.2/';
    }

    AjaxUpload.Model.PROGRESS_TPL =
        [
        '<span class="AUProgressBox" style="display:none;">'
        ,'<button type="button" class="AUProgress"><div class="AUPercent"></div></button>'
        ,'<button type="button" class="AUCancelProgress"></button>'
        ,'</span>'
        ].join('');

    AjaxUpload.Model.THEME = 'default';

    JC.f.extendObject( AjaxUpload.Model.prototype, {
        init:
            function(){
                //JC.log( 'AjaxUpload.Model.init:', new Date().getTime() );
                this._id = AjaxUpload.Model._insCount++;
            }

        , id: function(){ return this._id; }

        , cauStyle: function(){ return this.attrProp('cauStyle') || 'g1'; }
        , cauButtonText: function(){ return this.attrProp('cauButtonText') || '上传文件'; }

        , cauUrl: function(){ return this.attrProp( 'cauUrl' ); }

        , cauCancelCallback: function(){ return this.callbackProp( 'cauCancelCallback' ); }

        , cauFileExt: 
            function(){ 
                var _r = this.stringProp( 'cauFileExt' ) || this.stringProp( 'fileext' ) || this.stringProp( 'file_types' ); 
                _r && ( _r = _r.replace( /[\s]+/g, '' ) );
                if( _r && !/[\*]/.test( _r ) ){
                    _r = _r.split(',');
                    $.each( _r, function( _ix, _item ){
                        _r[_ix] = '*' + _item;
                    });
                    _r = _r.join( ';' );
                }
                return _r;
            }

        , beforeReadyQueue:
            function( _setter ){
                !this._beforeReadyQueue && ( this._beforeReadyQueue = [] );
                typeof _setter != 'undefined' && ( this._beforeReadyQueue.push( _setter ) );
                return this._beforeReadyQueue;
            }

        , uploadReady:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._uploadReady = _setter );
                return this._uploadReady;
            }

        , cauFileName: 
            function(){ 
                return this.attrProp('cauFileName') || this.attrProp('name') || 'file'; 
            }

        , cauLabelKey: function(){ return this.attrProp( 'cauLabelKey' ) || 'name'; }
        , cauValueKey: function(){ return this.attrProp( 'cauValueKey' ) || 'url'; }
        , cauSaveLabelSelector:
            function(){
                var _r = this.selectorProp( 'cauSaveLabelSelector' );
                return _r;
            }

        , cauStatusLabel: function(){ return this.selectorProp( 'cauStatusLabel' ); }
        , cauDisplayLabel: function(){ return this.selectorProp( 'cauDisplayLabel' ); }
        , cauDisplayLabelCallback: function(){ return this.callbackProp( 'cauDisplayLabelCallback' ); }

        , cauDefaultHide:
            function(){
                return this.boolProp( 'cauDefaultHide' );
            }

        , cauUploadDoneCallback:
            function(){
                return this.callbackProp( 'cauUploadDoneCallback' );
            }

        , cauUploadErrorCallback:
            function(){
                return this.callbackProp( 'cauUploadErrorCallback' );
            }

        , cauDebug: function(){ return this.boolProp( 'cauDebug' ); }

        , cauFlashUrl:
            function(){
                var _r = this.attrProp( 'cauFlashUrl' );
                !_r && ( _r = JC.PATH + AjaxUpload.Model.FLASH_URL );
                return _r;
            }

        , cauButtonWidth:
            function(){
                var _btnText = this.cauButtonText();
                return this.intProp( 'cauButtonWidth' ) || ( bytelen( _btnText ) * 7 + 20 );
            }

        , cauButtonHeight:
            function( _setter ){
                return this.intProp( 'cauButtonHeight' ) || _setter || 22;
            }

        , cauButtonStyle:
            function( _setter){
                return this.attrProp( 'cauButtonStyle' ) 
                    || this.attrProp( 'button_text_style' ) 
                    || _setter
                    || '.uFont{ color:#000000; text-align: center; }';
            }

        , layoutButton:
            function(){
                var _p = this
                    , _holderId = 'AjaxUpload_hl_' + _p.id()
                    ;
                if( !this._buttonLayout ){
                    _p._buttonLayout = 
                            $( JC.f.printf( 
                                '<button type="submit" class="AUBtn AUBtn-{1} js_btn"><span id="{0}"></span></button>'
                                , _holderId 
                                , _p.cauStyle()
                            ));

                    _p.cauButtonAfter() 
                        ? _p.selector().after( this._buttonLayout )
                        : _p.selector().before( this._buttonLayout )
                        ;
                    _p._buttonLayout.on( 'click', function( _evt ){
                        _evt.preventDefault();
                        _evt.stopPropagation();
                    });
                }
                return this._buttonLayout;
            }

        , cauButtonAfter: function(){ return this.boolProp( 'cauButtonAfter' ); }

        , cauRoot:
            function(){
                var _r = this.attrProp( 'cauRoot' );

                !_r && ( _r = JC.f.fixPath( JC.PATH + AjaxUpload.Model.PATH ) );

                return _r;
            }

        , cauUploadLimit: 
            function(){ 
                return this.intProp( 'cauUploadLimit' ) || this.intProp( 'file_upload_limit' ) || 0; 
            }
        , cauQueueLimit: 
            function(){ 
                return this.intProp( 'cauQueueLimit' ) || this.intProp( 'file_queue_limit' ) || 0; 
            }
        , cauFileSize: function(){ return this.attrProp( 'file_size_limit' ) || this.attrProp( 'cauFileSize' ) || '1024 MB'; }
        , cauCacheSwf: 
            function(){ 
                var _r = true;
                this.attrProp( 'prevent_swf_caching' ) && ( _r = !this.boolProp( 'prevent_swf_caching' ) );
                this.attrProp( 'cauCacheSwf' ) && ( _r = this.boolProp( 'cauCacheSwf' ) );
                _r = !_r;
                return _r;
            }
        , cauHttpSuccess: 
            function(){ 
                var _r = [ 200, 201, 204 ], _tmp = this.attrProp( 'cauHttpSuccess' ) || this.attrProp( 'http_success' );
                _tmp && ( _r = _tmp.replace( /[\s]+/g, '' ).split( ',' ) );
                return _r;
            }

        , cauBatchUpload: function(){ return this.boolProp( 'cauBatchUpload' ); }
        
        , getParams:
            function(){
                var _p = this
                    , _r = {}
                    , _fileExt = _p.cauFileExt();
                    ;

                _p.layoutButton();

                _r.debug = _p.cauDebug();
                _r.flash_url = JC.f.fixPath( _p.cauFlashUrl() );

                _r.upload_url = _p.cauUrl();
                _r.file_post_name = _p.cauFileName();

                _p.initButtonStyle( _r );

                _r.button_placeholder_id = _p.layoutButton().find('> span[id]').attr( 'id' );

                _r.button_text = JC.f.printf( '<span class="uFont">{0}</span>', _p.cauButtonText() );

                _r.button_window_mode = SWFUpload.WINDOW_MODE.TRANSPAREN;
                _r.button_cursor = SWFUpload.CURSOR.HAND;

                _r.button_action = _p.cauBatchUpload() 
                                    ? SWFUpload.BUTTON_ACTION.SELECT_FILES
                                    : SWFUpload.BUTTON_ACTION.SELECT_FILE
                                    ;

                _r.file_upload_limit = _p.cauUploadLimit();
                _r.file_queue_limit = _p.cauQueueLimit();
                _r.file_size_limit = _p.cauFileSize();
                _r.prevent_swf_caching = _p.cauCacheSwf();
                _r.http_success = _p.cauHttpSuccess();

                _fileExt && ( _r.file_types = _fileExt );

                _r.swfupload_loaded_handler =
                    function(){
                        _p.swfu( this );
                        _p.uploadReady( true );
                        _p.trigger( 'UploadReady' );
                    };

                _r.file_dialog_start_handler =
                    function(){
                        JC.hideAllPopup( 1);
                    };

                _r.file_dialog_complete_handler =
                    function( _selectedFiles ){
                        if( _p.beforeUploadError() ) {
                            _p.beforeUploadError( false );
                            return;
                        }
                        if( !_selectedFiles ) return;
                        _p.trigger( 'BeforeUpload' );
                        this.startUpload();
                        this.setButtonDisabled( true );
                    };

                _r.post_params = {};
                //
                /// 上传文件时显示进度的事件
                //
                _r.upload_progress_handler =
                    function( _file, _curBytes, _totalBytes ){
                        _p.trigger( 'UploadProgress', [ _file, _curBytes, _totalBytes ] );
                    };
                //
                /// 上传失败后触发的事件
                //
                _r.upload_error_handler =
                    function( _file, _errCode, _msg ){
                        _p.trigger( 'UpdateDefaultStatus' );
                        _p.trigger( 'UploadError', [ _file, _errCode, _msg ] );

                        _p.cauButtonAutoStatus() && this.setButtonDisabled( false );
                    };
                //
                /// 上传成功后触发的事件
                //
                _r.upload_success_handler = 
                    function(fileObject, serverData, receivedResponse){
                        _p.trigger( 'UploadDone', [ serverData, false, fileObject.name ] );
                    };
                //
                /// 上传后无论正确与错误都会触发的事件
                //
                _r.upload_complete_handler =
                    function( _file ){
                        _p.cauButtonAutoStatus() && this.setButtonDisabled( false );
                    };

                _r.file_queue_error_handler = 
                    function( _file, _errCode, _msg ){
                        _p.trigger( 'UpdateDefaultStatus' );
                        _p.trigger( 'UploadError', [ _file, _errCode, _msg ] );
                        this.setButtonDisabled( false );
                        _p.beforeUploadError( true );
                    };

                _p.cauAllCookies() && ( _r.post_params = JC.f.extendObject( _r.post_params, _p.allCookies() ) );

                _p.cauPostParams() && ( _r.post_params = JC.f.extendObject( _r.post_params, _p.cauPostParams() ) );

                this.cauParamsCallback() 
                    && ( _r = this.cauParamsCallback().call( this, _r ) );

                JC.dir( _r );

                return _r;
            }

        , cauAllCookies: 
            function(){ 
                var _r = true;
                this.is( '[cauAllCookies]' ) && ( _r = this.boolProp( 'cauAllCookies' ) );
                return _r;
            }

        , allCookies:
            function(){
                var _r = {};
                var i, cookieArray = document.cookie.split(';'), caLength = cookieArray.length, c, eqIndex, name, value;
                for (i = 0; i < caLength; i++) {
                    c = cookieArray[i];
                    
                    // Left Trim spaces
                    while (c.charAt(0) === " ") {
                        c = c.substring(1, c.length);
                    }
                    eqIndex = c.indexOf("=");
                    if (eqIndex > 0) {
                        name = c.substring(0, eqIndex);
                        value = c.substring(eqIndex + 1);
                        _r[name] = value;
                    }
                }

                return _r;
            }

        , cauPostParams:
            function(){
                var _p = this, _r = AjaxUpload.POST_PARAMS;
                _p.is( '[cauPostParams]' ) && ( _r = _p.callbackProp( 'cauPostParams' ) || _r );
                return _r;
            }

        , cauButtonAutoStatus:
            function(){
                var _r = true;
                this.is( '[cauButtonAutoStatus]' ) && ( _r = this.boolProp( 'cauButtonAutoStatus' ) );
                return _r;
            }

        , beforeUploadError:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._beforeUploadError = _setter );
                return this._beforeUploadError;
            }

        , loadSWF:
            function( _params ){
                //JC.dir( _params );
                this._swfu && this._swfu.destory();
                new SWFUpload( _params );
            }

        , swfu: 
            function( _setter ){ 
                typeof _setter != 'undefined' && ( this._swfu = _setter );
                return this._swfu; 
            }

        , cauParamsCallback: 
            function(){ 
                return this.callbackProp( 'cauParamsCallback' ) 
                    || AjaxUpload.PARAMS_CALLBACK
                    || JC.AjaxUploadParamsCallback
                    ; 
            }

        , cancelUpload: 
            function(){
                if( this._swfu ){
                    this._swfu.cancelUpload();
                }
            }

        , cauShowProgress: 
            function(){ 
                var _r = this.boolProp( 'cauShowProgress' ); 
                !_r && this.cauProgressBox() && ( _r = this.cauProgressBox().length );
                return _r;
            }

        , cauProgressBox:
            function(){
                var _r = this._cauProgressBox || this.selectorProp( 'cauProgressBox' );
                if( !( _r && _r.length ) ){
                    if( this.boolProp( 'cauShowProgress' ) ){
                        _r = this._cauProgressBox = $( AjaxUpload.Model.PROGRESS_TPL );
                        this.selector().after( _r );
                    }
                }
                if( _r && _r.length && !this._initedProgressBox ){
                    _r.addClass( 'AjaxUploadProgressBox_' + this.id() );
                    this._initedProgressBox = true;
                }
                return _r;
            }

        , cauTheme:
            function(){
                var _r = this.attrProp( 'cauTheme' ) || AjaxUpload.Model.THEME;
                return _r;
            }

        , initButtonStyle:
            function( _r ){
                if( !_r ) return;
                var _p = this
                    , _style = _p.cauStyle() || ''
                    ;

                _r.button_width = _p.cauButtonWidth();
                _r.button_height = _p.cauButtonHeight();
                _r.button_text_top_padding = "2";

                switch( _p.cauStyle() ){
                    case 'g1':
                        {
                            _r.button_image_url = JC.f.printf( '{0}res/{1}/g_61x27.png', _p.cauRoot(), _p.cauTheme() );
                            _r.button_text_style = _p.cauButtonStyle( '.uFont{ color:#ffffff; text-align: center; }' );
                            break;
                        }
                    case 'g2':
                        {
                            _r.button_text_top_padding = "4";
                            _r.button_height = _p.cauButtonHeight( 26 );
                            _r.button_image_url = JC.f.printf( '{0}res/{1}/g_61x27.png', _p.cauRoot(), _p.cauTheme() );
                            _r.button_text_style = _p.cauButtonStyle( '.uFont{ color:#ffffff; text-align: center; }' );
                            break;
                        }
                    case 'g3':
                        {
                            _r.button_text_top_padding = "6";
                            _r.button_height = _p.cauButtonHeight( 28 );
                            _r.button_image_url = JC.f.printf( '{0}res/{1}/g_61x27.png', _p.cauRoot(), _p.cauTheme() );
                            _r.button_text_style = _p.cauButtonStyle( '.uFont{ color:#ffffff; text-align: center; }' );
                            break;
                        }
                    case 'w1':
                        {
                            _r.button_text_top_padding = "3";
                            _r.button_image_url = JC.f.printf( '{0}res/default/w_61x27.png', _p.cauRoot() );
                            _r.button_text_style = _p.cauButtonStyle( '.uFont{ color:##000000; text-align: center; }' );
                            break;
                        }
                    case 'w2':
                        {
                            _r.button_text_top_padding = "4";
                            _r.button_height = _p.cauButtonHeight( 26 );
                            _r.button_image_url = JC.f.printf( '{0}res/{1}/w_61x27.png', _p.cauRoot(), _p.cauTheme() );
                            _r.button_text_style = _p.cauButtonStyle( '.uFont{ color:#000000; text-align: center; }' );
                            break;
                        }
                    case 'w3':
                        {
                            _r.button_text_top_padding = "6";
                            _r.button_height = _p.cauButtonHeight( 28 );
                            _r.button_image_url = JC.f.printf( '{0}res/{1}/w_61x27.png', _p.cauRoot(), _p.cauTheme() );
                            _r.button_text_style = _p.cauButtonStyle( '.uFont{ color:#000000; text-align: center; }' );
                            break;
                        }

                    default:
                        {
                            _r.button_text_style = _p.cauButtonStyle();
                            break;
                        }
                }
            }

            , cauViewFileBox: function(){ return this.selectorProp( 'cauViewFileBox' ); }

            , cauViewFileBoxItemTpl: 
                function(){
                    var _r = [ '<a href="javascript:;" data-name="{0}" data-url="{1}" class="js_clearAjaxUpload">清除</a>'
                         , '&nbsp;<a href="{1}" target="_blank" data-name="{0}" data-url="{1}" class="js_viewAjaxUpload">查看</a>' ].join('')
                         , _tmp
                         ;

                    this.is( '[cauViewFileBoxItemTpl]' )
                        && ( _tmp = this.selectorProp( 'cauViewFileBoxItemTpl' ) ) 
                        && _tmp.length 
                        && ( _r = JC.f.scriptContent( _tmp ) )
                        ;

                    return _r;
                }

    });

    /*
    window.initSWFUpload =
        function(){
        };
    */

    JC.f.extendObject( AjaxUpload.View.prototype, {
        init:
            function(){
                //JC.log( 'AjaxUpload.View.init:', new Date().getTime() );
                var _p = this;

                $( _p ).on( 'update_viewFileBox', function( _evt, _name, _url ){
                    var _box = _p._model.cauViewFileBox(), _itemTpl;
                    if( !( _box && _box.length ) ) return;
                    _itemTpl = _p._model.cauViewFileBoxItemTpl();
                    _itemTpl = JC.f.printf( _itemTpl, _name, _url );
                    _box.html( _itemTpl );
                });

                $( _p ).on( 'clear_viewFileBox', function(){
                    var _box = _p._model.cauViewFileBox();
                    if( !( _box && _box.length ) ) return;
                    _box.html( '' );
                });

                /**
                 * 恢复默认状态
                 */
                $( _p ).on( 'UpdateDefaultStatus', function( _evt ){
                    var _statusLabel = _p._model.cauStatusLabel()
                        , _displayLabel = _p._model.cauDisplayLabel()
                    ;
                    
                    _p.updateChange();
                    //_p._model.layoutButton().show();
                    _p.trigger( 'SHOW_LAYOUT_BUTTON' );

                    _statusLabel && _statusLabel.length && _statusLabel.hide();
                    _displayLabel && _displayLabel.length && _displayLabel.hide();

                    ( _p._model.selector().attr('type') || '' ).toLowerCase() != 'hidden'
                        && _p._model.selector().show()
                        ;

                    $( _p ).trigger( 'clear_viewFileBox' );
                });

                $( _p ).on( 'UploadError', function( _evt, _file, _errCode, _msg ){
                    var _tmp;
                    switch( _errCode ){
                        case -110:
                            {
                                _tmp = JC.f.printf( '<h2>文件大小超出限制</h2>'
                                    +'可接受的文件大小: <b style="color:green"><= {0}</b>' 
                                    +'<br />{1}: <b style="color:red">{2}</b>' 
                                    , _p._model.cauFileSize()
                                    , _file.name
                                    , humanFileSize( _file.size ).replace( 'i', '' )
                                );

                                JC.msgbox( _tmp, _p._model.layoutButton(), 2, null, 1000 * 8 );
                                break;
                            }

                        case -130:
                            {
                                _p._model.beforeUploadError( true );
                                _tmp = JC.f.printf( '<h2>文件类型错误</h2>'
                                    +'可接受的类型: <b style="color:green">{0}</b>' 
                                    +'<br />本次上传的文件: <b style="color:red">{1}</b>' 
                                    , _p._model.cauFileExt()
                                    , _file.name
                                );

                                JC.msgbox( _tmp, _p._model.layoutButton(), 2, null, 1000 * 8 );

                                break;
                            }


                        default:
                            {
                                _tmp = JC.f.printf( '<h2>上传失败</h2>'
                                    +'错误代码：{0}' 
                                    +'<br />错误信息：{1}' 
                                    , _errCode
                                    , _msg
                                );

                                JC.msgbox( _tmp, _p._model.layoutButton(), 2, null, 1000 * 8 );
                                break;
                            }
                    }

                    _p.trigger( 'UploadComplete' );
                });

                $( _p ).on( 'CAUUpdate', function( _evt, _d ){
                    var _displayLabel = _p._model.cauDisplayLabel()
                        , _label = '', _value = ''
                        ;

                    if( typeof _d != 'undefined' ){
                        _value = _d.data[ _p._model.cauValueKey() ];
                        _label = _d.data[ _p._model.cauLabelKey() ];

                        _p._model.selector().val( _value )
                        _p._model.cauSaveLabelSelector()
                            && _p._model.cauSaveLabelSelector().val( _label );
                    }

                    if( _p._model.cauDisplayLabelCallback() ){
                        _label = _p._model.cauDisplayLabelCallback().call( _p._model.selector(), _d, _label, _value );
                    }else{
                        _label = JC.f.printf( '<a href="{0}" class="green js_auLink" target="_blank">{1}</a>', _value, _label);
                    }
                    _displayLabel 
                        && _displayLabel.length
                        && _displayLabel.html( _label ) 
                        ;
                });


            }

        , beforeUpload:
            function(){
                var _p = this
                    , _statusLabel = _p._model.cauStatusLabel()
                    , _progressBox = _p._model.cauProgressBox()
                    ;
                //JC.log( 'AjaxUpload view#beforeUpload', new Date().getTime() );

                this.updateChange( null, true );

                if( _statusLabel && _statusLabel.length ){
                    _p._model.selector().hide();
                    _statusLabel.show();
                }

                _progressBox 
                    && (
                        _progressBox.find( '.AUPercent' ).length 
                            && _progressBox.find( '.AUPercent' ).attr( 'width', '0' )
                        , _progressBox.show()
                   );
            }

        , uploadComplete: 
            function( _d ){
                var _p = this
                    , _progressBox = _p._model.cauProgressBox()
                    ;
                _progressBox && _progressBox.length && _progressBox.hide();
            }

        , uploadProgress:
            function( _file, _curBytes, _totalBytes ){
                var _p = this
                    , _progressBox = _p._model.cauProgressBox()
                    , _percentEle, _percent = 0
                    ;
                if( !( _progressBox && _progressBox.length ) ) return;
                _percentEle = _progressBox.find( '.AUPercent' );
                if( !_percentEle.length ) return;
                _curBytes && ( _percent = _curBytes / _totalBytes * 100 );
                _percentEle.css( 'width', _percent + '%' );
            }

        , updateChange:
            function( _d, _noLabelAction ){
                var _p = this
                    , _statusLabel = _p._model.cauStatusLabel()
                    , _displayLabel = _p._model.cauDisplayLabel()
                    , _name, _url
                    ;
                //JC.log( 'AjaxUpload view#updateChange', new Date().getTime() );

                if( _statusLabel && _statusLabel.length && !_noLabelAction ){
                    _p._model.selector().show();
                    //_p._model.layoutButton().show();
                    _p.trigger( 'SHOW_LAYOUT_BUTTON' );
                    _statusLabel.hide();
                }
                if( _displayLabel && _displayLabel.length ){
                    _displayLabel.html( '' );
                }

                if( _d && _displayLabel && _displayLabel.length ){
                    //_p._model.layoutButton().hide();
                    _p.trigger( 'HIDE_LAYOUT_BUTTON' );
                }

                _p._model.selector().val( '' );

                _p._model.cauSaveLabelSelector()
                    && _p._model.cauSaveLabelSelector().val( '' );

                if( _d && ( 'errorno' in _d ) && !_d.errorno ){
                    $(_p).trigger( 'CAUUpdate', [ _d ] );

                    _name = _d.data[ _p._model.cauLabelKey() ];
                    _url = _d.data[ _p._model.cauValueKey() ];

                    _p._model.selector().val() 
                        && _p._model.selector().is(':visible')
                        && _p._model.selector().prop('type').toLowerCase() == 'text'
                        && _p._model.selector().trigger('blur')
                        ;
                    
                    $( _p ).trigger( 'update_viewFileBox', [ _name, _url ] );

                    if( _displayLabel && _displayLabel.length ){
                        _p._model.selector().hide();
                        _displayLabel.show();
                        return;
                    }

                }
            }

        , errUpload:
            function( _d ){
                var _p = this
                    , _beforeErrorCb = _p._model.callbackProp( 'cauBeforeUploadErrCallback' )
                    , _cb = _p._model.callbackProp( 'cauUploadErrCallback' )
                    ;

                _beforeErrorCb && _beforeErrorCb.call( _p._model.selector(), _d );

                if( _cb ){
                    _cb.call( _p._model.selector(), _d );
                }else{
                    var _msg = _d && _d.errmsg ? _d.errmsg : '上传失败, 请重试!';
                    JC.Dialog 
                        ? JC.Dialog.alert( _msg, 1 )
                        : alert( _msg )
                        ;
                }
            }

        , errFileExt: 
            function( _flPath ){
                var _p = this, _cb = _p._model.callbackProp( 'cauFileExtErrCallback' );
                if( _cb ){
                    _cb.call( _p._model.selector(), _p._model.cauFileExt(), _flPath );
                }else{
                    var _msg = JC.f.printf( '类型错误, 允许上传的文件类型: {0} <p class="auExtErr" style="color:red">{1}</p>'
                                        , _p._model.cauFileExt(), _flPath );
                    JC.Dialog 
                        ? JC.Dialog.alert( _msg, 1 )
                        : alert( _msg )
                        ;
                }
            }

        , errFatalError: 
            function( _d ){
                var _p = this, _cb = _p._model.callbackProp( 'cauFatalErrorCallback' );
                if( _cb ){
                    _cb.call( _p._model.selector(), _d );
                }else{
                    var _msg = JC.f.printf( '服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>'
                                        , _d );
                    JC.Dialog 
                        ? JC.Dialog.alert( _msg, 1 )
                        : alert( _msg )
                        ;
                }
            }

        , disable:
            function(){
                var _p = this, _swfu = _p._model.swfu();
                _swfu && ( _swfu.setButtonDisabled( true ), JC.log( 'disable', new Date().getTime() ) );
            }

        , enable:
            function(){
                var _p = this, _swfu = _p._model.swfu();
                _swfu && ( _swfu.setButtonDisabled( false ), JC.log( 'enable', new Date().getTime() ) );
            }

    });

    $.event.special.AjaxUploadShowEvent = {
        show: 
            function(o) {
                if (o.handler) {
                    o.handler()
                }
            }
    };

    function humanFileSize(bytes, si) {
        var thresh = si ? 1000 : 1024;
        if(bytes < thresh) return bytes + ' B';
        var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while(bytes >= thresh);
        return bytes.toFixed(1)+' '+units[u];
    };

    function bytelen( _s ){
        return _s.replace(/[^\x00-\xff]/g,"11").length;
    }

    $(document).ready( function(){
        AjaxUpload.autoInit && setTimeout( function(){ AjaxUpload.init(); }, 1 );
    });

    return JC.AjaxUpload;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
