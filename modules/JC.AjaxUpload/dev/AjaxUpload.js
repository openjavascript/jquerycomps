//TODO: 添加文件大小判断
//TODO: 0.2 添加 flash 上传支持
(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Panel' ], function(){
    /**
     * Ajax 文件上传
     * <p><b>require</b>: 
     *      <a href='window.jQuery.html'>jQuery</a>
     *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     *      , <a href='JC.Panel.html'>JC.Panel</a>
     * </p>
     * <p>
     *      <a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.AjaxUpload.html' target='_blank'>API docs</a>
     *      | <a href='../../modules/JC.AjaxUpload/dev/_demo' target='_blank'>demo link</a>
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
     *      <dt>cauHideButton = bool, default = false( no label ), true( has label )</dt>
     *      <dd>
     *          上传完成后是否隐藏上传按钮
     *      </dd>
     *
     *      <dt>cauUrl = url, require</dt>
     *      <dd>上传文件的接口地址
     *          <br />如果 url 带有参数 callback, 返回数据将以 jsonp 方式处理
     *      </dd>
     *
     *      <dt>cauJSONPName = function name</dt>
     *      <dd>显式声明上传后返回数据的 jsonp 回调名
     *          <h3>jsonp 返回数据示例:</h3>
url: ?callback=callback
<br /> data: 
&lt;script>
    window.parent && window.parent.callback && window.parent.callback( {"errorno":0,"errmsg":"","data":{"name":"test.jpg","url":".\/data\/images\/test.jpg"}} );
&lt;/script>
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
<pre>function cauUploadDoneCallback( _json, _selector, _frame ){
    var _ins = this;
    //alert( _json ); //object object
}</pre>
     *      </dd>
     *
     *      <dt>cauUploadErrorCallback = function, optional</dt>
     *      <dd>
     *          文件上传完毕时, 发生错误触发的回调
<pre>function cauUploadErrorCallback( _json, _selector, _frame ){
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
     * </dl>
     * @namespace DEV.JC
     * @class AjaxUpload
     * @extends JC.BaseMVC
     * @constructor
     * @param   {selector}   _selector   
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-09-26
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

    BaseMVC.build( AjaxUpload );

    JC.f.extendObject( AjaxUpload.prototype, {
        _beforeInit:
            function(){
                var _p = this;
                JC.log( 'AjaxUpload _beforeInit', new Date().getTime() );
                
            }
        , _initHanlderEvent:
            function(){
                var _p = this;
                /**
                 * iframe 加载完毕后触发的事件, 执行初始化操作
                 */
                _p.on( 'FrameLoad', function(_evt){
                    var _w = _p._model.frame().prop( 'contentWindow' );
                    if( !( _w && _w.initPage ) ) return;
                    _w.initPage( _p, _p._model );

                    if( _p._model.INITED ) return;
                    _p._model.INITED = true;
                    if( _p._model.cauDefaultHide() ){
                        setTimeout( function(){
                            _p._model.frame().hide();
                            _p._model.selector().hide();
                        }, 1);
                    }

                    _p._model.selector().on( 'show', function( _evt ){
                        JC.log( 'show');
                    });

                     _p._model.selector().on( 'hide', function( _evt ){
                         JC.log('hide');
                    });

                    _p._model.frame().on( 'show', function( _evt ){
                        JC.log( 'show');
                    });

                     _p._model.frame().on( 'hide', function( _evt ){
                         JC.log('hide');
                    });

                });
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
                    JC.log( _d );
                    var _err = false, _od = _d;
                    try{ 
                        typeof _d == 'string' && ( _d = $.parseJSON( _d ) );
                    } catch( ex ){ _d = {}; _err = true; }

                    //_err = true;
                    //_d.errorno = 1;
                    //_d.errmsg = "test error"
                    if( _err ){
                        _p._view.errFatalError( _od );

                        $( _p._view ).trigger('UpdateDefaultStatus')

                        _p._model.cauUploadErrorCallback()
                            && _p._model.cauUploadErrorCallback().call(    
                                _p
                                , _d
                                , _p._model.selector()
                                , _p._model.frame() 
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
                                //, _p._model.frame() 
                            );
                    }
                });
                /**
                 * frame 的按钮样式改变后触发的事件
                 * 需要更新 frame 的宽高
                 */
                _p.on( 'AUUpdateLayout', function( _evt, _width, _height, _btn ){
                    _p._view.updateLayout( _width, _height, _btn );
                });

                _p.on( 'UpdateDefaultStatus', function( _evt, _file, _errCode, _msg ){
                    JC.f.safeTimeout( function(){
                        $( _p._view ).trigger( 'UpdateDefaultStatus', [ _file, _errCode, _msg ] );
                    }, _p, 'RESET_STATUS', 100 );
                });

               _p.on( 'UploadError', function( _evt, _file, _errCode, _msg ){
                    $( _p._view ).trigger( 'UploadError', [ _file, _errCode, _msg ] );
                });


                _p.on( 'init', function(){
                    _p._model.loadSWF( _p._model.getParams() );
                });
            }
        , _inited:
            function(){
                var _p = this;
                JC.log( 'AjaxUpload _inited', new Date().getTime() );
                //_p._view.loadFrame();
                //AjaxUpload.getInstance( _p._model.frame(), _p );
                _p.trigger( 'init' );
            }
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
                $( _p._view ).trigger('UpdateDefaultStatus')
                _d && _p.trigger('UploadDone', [ _d ] );
                return this;
            }
    });

    AjaxUpload.Model._instanceName = 'AjaxUpload';
    AjaxUpload.Model._insCount = 1;

    AjaxUpload.Model.FLASH_URL = '/modules/SWFUpload/2.5.0/SWFUpload.swf';

    AjaxUpload.Model.PATH = '/modules/JC.AjaxUpload/dev/';

    JC.f.extendObject( AjaxUpload.Model.prototype, {
        init:
            function(){
                JC.log( 'AjaxUpload.Model.init:', new Date().getTime() );
                this._id = AjaxUpload.Model._insCount++;
            }

        , id: function(){ return this._id; }

        , cauStyle: function(){ return this.attrProp('cauStyle') || 'g1'; }
        , cauButtonText: function(){ return this.attrProp('cauButtonText') || '上传文件'; }

        , cauUrl: function(){ return this.attrProp( 'cauUrl' ); }

        , cauFileExt: 
            function(){ 
                var _r = this.stringProp( 'cauFileExt' ) || this.stringProp( 'file_types' ); 
                if( _r && !/[\*]/.test( _r ) ){
                    _r = _r.replace( /[\s]+/g, '' ).split(',');
                    $.each( _r, function( _ix, _item ){
                        _r[_ix] = '*' + _item;
                    });
                    _r = _r.join( ';' );
                }
                return _r;
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

        , cauHideButton: 
            function(){
                var _r = false;
                this.is( '[cauHideButton]' ) 
                    && ( _r = this.boolProp( this.attrProp('cauHideButton') ) );
                return _r;
            }

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

        , cauJSONPName:
            function(){
                var _r = AjaxUpload.JSONPName;

                _r = JC.f.getUrlParam( this.cauUrl(), 'callback' ) || _r;
                _r = this.attrProp( 'cauJSONPName' ) || _r;

                return _r;
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

        , initButtonStyle:
            function( _r ){
                if( !_r ) return;
                var _p = this
                    , _style = _p.cauStyle() || ''
                    ;

                _r.button_width = _p.cauButtonWidth();
                _r.button_height = _p.cauButtonHeight();
                _r.button_text_top_padding = "2";
                _r.button_text_style = _p.button_text_style();

                switch( _p.cauStyle() ){
                    case 'g1':
                        {
                            _r.button_image_url = JC.f.printf( '{0}res/default/g_61x27.png', _p.cauRoot() );
                            _r.button_text_style = _p.button_text_style( '.uFont{ color:#ffffff; text-align: center; }' );
                            break;
                        }
                    case 'g2':
                        {
                            _r.button_text_top_padding = "4";
                            _r.button_height = _p.cauButtonHeight( 26 );
                            _r.button_image_url = JC.f.printf( '{0}res/default/g_61x27.png', _p.cauRoot() );
                            _r.button_text_style = _p.button_text_style( '.uFont{ color:#ffffff; text-align: center; }' );
                            break;
                        }
                    case 'g3':
                        {
                            _r.button_text_top_padding = "6";
                            _r.button_height = _p.cauButtonHeight( 28 );
                            _r.button_image_url = JC.f.printf( '{0}res/default/g_61x27.png', _p.cauRoot() );
                            _r.button_text_style = _p.button_text_style( '.uFont{ color:#ffffff; text-align: center; }' );
                            break;
                        }
                    case 'w1':
                        {
                            _r.button_text_top_padding = "3";
                            _r.button_image_url = JC.f.printf( '{0}res/default/w_61x27.png', _p.cauRoot() );
                            _r.button_text_style = _p.button_text_style( '.uFont{ color:##000000; text-align: center; }' );
                            break;
                        }
                    case 'w2':
                        {
                            _r.button_text_top_padding = "4";
                            _r.button_height = _p.cauButtonHeight( 26 );
                            _r.button_image_url = JC.f.printf( '{0}res/default/w_61x27.png', _p.cauRoot() );
                            _r.button_text_style = _p.button_text_style( '.uFont{ color:#000000; text-align: center; }' );
                            break;
                        }
                    case 'w3':
                        {
                            _r.button_text_top_padding = "6";
                            _r.button_height = _p.cauButtonHeight( 28 );
                            _r.button_image_url = JC.f.printf( '{0}res/default/w_61x27.png', _p.cauRoot() );
                            _r.button_text_style = _p.button_text_style( '.uFont{ color:#000000; text-align: center; }' );
                            break;
                        }
                }
            }

        , layoutButton:
            function(){
                var _p = this
                    , _holderId = 'AjaxUpload_hl_' + _p.id()
                    ;
                if( !this._buttonLayout ){
                    _p._buttonLayout = 
                            $( JC.f.printf( 
                                '<button type="text" class="btn AUBtn AUBtn-{1} js_btn"><span id="{0}"></span></button>'
                                , _holderId 
                                , _p.cauStyle()
                            ));

                    _p.selector().after( this._buttonLayout );
                }
                return this._buttonLayout;
            }

        , cauRoot:
            function(){
                var _r = this.attrProp( 'cauRoot' );

                !_r && ( _r = JC.f.fixPath( JC.PATH + AjaxUpload.Model.PATH ) );

                return _r;
            }

        , file_upload_limit: function(){ return this.intProp( 'file_upload_limit' ) || 0; }
        , file_queue_limit: function(){ return this.intProp( 'file_queue_limit' ) || 0; }
        , cauFileSize: function(){ return this.attrProp( 'file_size_limit' ) || this.attrProp( 'cauFileSize' ) || '1024 MB'; }
        , prevent_swf_caching: 
            function(){ 
                var _r = true;
                this.attrProp( 'prevent_swf_caching' ) && ( _r = this.boolProp( 'prevent_swf_caching' ) );
                return _r;
            }
        , http_success: 
            function(){ 
                var _r = [ 200, 201, 204 ];
                if( this.attrProp( 'http_success' ) ){
                    _r = this.attrProp( 'http_success' ).replace( /[\s]+/g, '' ).split( ',' );
                }
                return _r;
            }

        , button_text_style:
            function( _setter){
                return this.attrProp( 'button_text_style' ) 
                    || _setter
                    || '.uFont{ color:#000000; text-align: center; }';
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

                //_r.file_upload_limit = 1;
                _r.file_upload_limit = _p.file_upload_limit();
                _r.file_queue_limit = 1;
                //_r.file_queue_limit = _p.file_queue_limit();
                _r.file_size_limit = _p.cauFileSize();
                _r.prevent_swf_caching = _p.prevent_swf_caching();
                _r.http_success = _p.http_success();

                _fileExt && ( _r.file_types = _fileExt );

                _r.file_dialog_start_handler =
                    function(){
                        JC.hideAllPopup( 1);
                    };

                _r.file_dialog_complete_handler =
                    function( _selectedFiles ){
                        if( !_selectedFiles ) return;
                        _p.trigger( 'BeforeUpload' );
                        this.startUpload();
                        //this.setButtonDisabled( true );
                    };
                //
                /// 上传文件时显示进度的事件
                //
                _r.upload_progress_handler =
                    function( _file, _curBytes, _totalBytes ){
                        JC.log( [ _file.name, _curBytes, _totalBytes ] );
                    };
                //
                /// 上传失败后触发的事件
                //
                _r.upload_error_handler =
                    function( _file, _errCode, _msg ){
                        _p.trigger( 'UpdateDefaultStatus' );
                        _p.trigger( 'UploadError', [ _file, _errCode, _msg ] );
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
                        this.setButtonDisabled( false );
                    }

                _r.file_queue_error_handler = 
                    function( _file, _errCode, _msg ){
                        _p.trigger( 'UpdateDefaultStatus' );
                        _p.trigger( 'UploadError', [ _file, _errCode, _msg ] );
                        this.setButtonDisabled( false );
                    }

                return _r;
            }
        , loadSWF:
            function( _params ){
                JC.dir( _params );
                this._swfu && this._swfu.destory();
                this._swfu = new SWFUpload( _params );
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
                JC.log( 'AjaxUpload.View.init:', new Date().getTime() );
                var _p = this;
                /**
                 * 恢复默认状态
                 */
                $( _p ).on( 'UpdateDefaultStatus', function( _evt ){
                    var _statusLabel = _p._model.cauStatusLabel()
                        , _displayLabel = _p._model.cauDisplayLabel()
                    ;
                    
                    _p.updateChange();
                    _p._model.layoutButton().show();

                    _statusLabel && _statusLabel.length && _statusLabel.hide();
                    _displayLabel && _displayLabel.length && _displayLabel.hide();

                    ( _p._model.selector().attr('type') || '' ).toLowerCase() != 'hidden'
                        && _p._model.selector().show()
                        ;

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

                        case -200:
                            {
                                _tmp = JC.f.printf( '<h2>文件大小超出服务器限制</h2>'
                                    +'{1}: <b style="color:red">{2}</b>' 
                                    , _p._model.cauFileSize()
                                    , _file.name
                                    , humanFileSize( _file.size ).replace( 'i', '' )
                                );

                                JC.msgbox( _tmp, _p._model.layoutButton(), 2, null, 1000 * 8 );
                                break;
                            }


                        default:
                            {
                                alert( ['上传出错!', '错误代码:', _errCode, '出错原因:', _msg ].join( ' ' ) );
                                break;
                            }
                    }
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
                var _p = this, _statusLabel = _p._model.cauStatusLabel();
                JC.log( 'AjaxUpload view#beforeUpload', new Date().getTime() );

                this.updateChange( null, true );

                if( _statusLabel && _statusLabel.length ){
                    _p._model.selector().hide();
                    _p.hideLayoutButton();
                    _statusLabel.show();
                }
            }

        , updateChange:
            function( _d, _noLabelAction ){
                var _p = this
                    , _statusLabel = _p._model.cauStatusLabel()
                    , _displayLabel = _p._model.cauDisplayLabel()
                    ;
                //JC.log( 'AjaxUpload view#updateChange', new Date().getTime() );

                if( _statusLabel && _statusLabel.length && !_noLabelAction ){
                    _p._model.selector().show();
                    _p._model.layoutButton().show();
                    _statusLabel.hide();
                }
                if( _displayLabel && _displayLabel.length ){
                    _displayLabel.html( '' );
                }

                if( _d && _displayLabel && _displayLabel.length ){
                    _p._model.layoutButton().hide();
                }

                _p._model.selector().val( '' );

                _p._model.cauSaveLabelSelector()
                    && _p._model.cauSaveLabelSelector().val( '' );

                if( _d && ( 'errorno' in _d ) && !_d.errorno ){
                    $(_p).trigger( 'CAUUpdate', [ _d ] );

                    _p._model.selector().val() 
                        && _p._model.selector().is(':visible')
                        && _p._model.selector().prop('type').toLowerCase() == 'text'
                        && _p._model.selector().trigger('blur')
                        ;

                    if( _displayLabel && _displayLabel.length ){
                        _p._model.selector().hide();
                        if( _p._model.is('[cauHideButton]') ){
                            _p._model.cauHideButton() && _p._model.frame().hide();
                        }else{
                            _p.hideLayoutButton();
                        }
                        _displayLabel.show();
                        return;
                    }
                }
            }

        , hideLayoutButton:
            function(){
                var _p = this;
                //_p._model.layoutButton().hide();
                return;
                _p._model.layoutButton().css( {
                    'position': 'absolute'
                    , 'left': '-9999px'
                });
            }


        , updateLayout:
            function( _width, _height, _btn ){
                if( !( _width && _height ) ) return;
                var _p = this;
                JC.log( 'AjaxUpload @event UpdateLayout', new Date().getTime(), _width, _height );
                _p._model.frame().css({
                    'width': _width + 'px'
                    , 'height': _height + 'px'
                });
            }

        , errUpload:
            function( _d ){
                var _p = this, _cb = _p._model.callbackProp( 'cauUploadErrCallback' );
                if( _cb ){
                    _cb.call( _p._model.selector(), _d, _p._model.frame() );
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
                    _cb.call( _p._model.selector(), _p._model.cauFileExt(), _flPath, _p._model.frame() );
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
                    _cb.call( _p._model.selector(), _d, _p._model.frame() );
                }else{
                    var _msg = JC.f.printf( '服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>'
                                        , _d );
                    JC.Dialog 
                        ? JC.Dialog.alert( _msg, 1 )
                        : alert( _msg )
                        ;
                }
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
        AjaxUpload.autoInit && AjaxUpload.init();
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
