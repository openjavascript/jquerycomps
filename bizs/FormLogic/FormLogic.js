//TODO: 添加 disabled bind hidden 操作
;(function($){
    /**
     * <h2>提交表单控制逻辑</h2>
     * 应用场景
     * <br />get 查询表单
     * <br />post 提交表单
     * <br />ajax 提交表单
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/window.Bizs.FormLogic.html' target='_blank'>API docs</a>
     * | <a href='../../bizs/FormLogic/_demo' target='_blank'>demo link</a></p>
     * require: <a href='../classes/window.jQuery.html'>jQuery</a>
     * <br/>require: <a href='../classes/JC.Valid.html'>JC.Valid</a>
     * <br/>require: <a href='../classes/JC.Form.html'>JC.Form</a>
     * <br/>require: <a href='../classes/JC.Panel.html'>JC.Panel</a>
     *
     * <h2>页面只要引用本文件, 默认会自动初始化 from class="js_bizsFormLogic" 的表单</h2>
     * <h2>Form 可用的 HTML 属性</h2>
     * <dl>
     *      <dt>formType = string, default = get</dt>
     *      <dd>
     *          form 的提交类型, 如果没有显式声明, 将视为 form 的 method 属性
     *          <br/> 类型有: get, post, ajax 
     *      </dd>
     *
     *      <dt>formSubmitDisable = bool, default = true</dt>
     *      <dd>表单提交后, 是否禁用提交按钮</dd>
     *
     *      <dt>formResetAfterSubmit = bool, default = true</dt>
     *      <dd>表单提交后, 是否重置内容</dd>
     *
     *      <dt>formBeforeProcess = function</dt>
     *      <dd>
     *          表单开始提交时且没开始验证时, 触发的回调, <b>window 变量域</b>
<xmp>function formBeforeProcess( _evt, _ins ){
    var _form = $(this);
    JC.log( 'formBeforeProcess', new Date().getTime() );
    //return false;
}</xmp>
     *      </dd>
     *
     *      <dt>formProcessError = function</dt>
     *      <dd>
     *          提交时, 验证未通过时, 触发的回调, <b>window 变量域</b>
<xmp>function formProcessError( _evt, _ins ){
    var _form = $(this);
    JC.log( 'formProcessError', new Date().getTime() );
    //return false;
}</xmp>
     *      </dd>
     *
     *      <dt>formAfterProcess = function</dt>
     *      <dd>
     *          表单开始提交时且验证通过后, 触发的回调, <b>window 变量域</b>
<xmp>function formAfterProcess( _evt, _ins ){
    var _form = $(this);
    JC.log( 'formAfterProcess', new Date().getTime() );
    //return false;
}</xmp>
     *      </dd>
     *
     *      <dt>formConfirmPopupType = string, default = dialog</dt>
     *      <dd>定义提示框的类型: dialog, popup</dd>
     *
     *      <dt>formResetUrl = url</dt>
     *      <dd>表单重置时, 返回的URL</dd>
     *
     *      <dt>formPopupCloseMs = int, default = 2000</dt>
     *      <dd>msgbox 弹框的显示时间</dd>
   *
     *      <dt>formAjaxResultType = string, default = json</dt>
     *      <dd>AJAX 返回的数据类型: json, html</dd>
     *
     *      <dt>formAjaxMethod = string, default = get</dt>
     *      <dd>
     *          类型有: get, post
     *          <br/>ajax 的提交类型, 如果没有显式声明, 将视为 form 的 method 属性
     *      </dd>
     *
     *      <dt>formAjaxAction = url</dt>
     *      <dd>ajax 的提交URL, 如果没有显式声明, 将视为 form 的 action 属性</dd>
     *
     *      <dt>formAjaxDone = function, default = system defined</dt>
     *      <dd>
     *          AJAX 提交完成后的回调, <b>window 变量域</b>
     *          <br />如果没有显式声明, FormLogic将自行处理
<xmp>function formAjaxDone( _json, _submitButton, _ins ){
    var _form = $(this);
    JC.log( 'custom formAjaxDone', new Date().getTime() );

    if( _json.errorno ){
        _panel = JC.Dialog.alert( _json.errmsg || '操作失败, 请重新尝试!', 1 );
    }else{
        _panel = JC.msgbox( _json.errmsg || '操作成功', _submitButton, 0, function(){
            reloadPage( "?donetype=custom" );
        });
    }
};</xmp>
     *      </dd>
     *
     *      <dt>formAjaxDoneAction = url</dt>
     *      <dd>声明 ajax 提交完成后的返回路径, 如果没有, 提交完成后将不继续跳转操作</dd>
     * </dl>
     *
     * <h2>submit button 可用的 html 属性</h2>
     * <dl>
     *      <dd>
     *          基本上 form 可用的 html 属性, submit 就可用, 区别在于 submit 优化级更高
     *      </dd>
     *
     *      <dt>formSubmitConfirm = string</dt>
     *      <dd>提交表单时进行二次确认的提示信息</dt>
     *
     *      <dt>formConfirmCheckSelector = selector</dt>
     *      <dd>提交表单时, 进行二次确认的条件判断</dt>
     *
     *      <dt>formConfirmCheckCallback = function</dt>
     *      <dd>
     *          提交表单时, 进行二次确认的条件判断, <b>window 变量域</b>
<xmp>function formConfirmCheckCallback( _trigger, _evt, _ins ){
    var _form = $(this);
    JC.log( 'formConfirmCheckCallback', new Date().getTime() );
    return _form.find('td.js_confirmCheck input[value=0]:checked').length;
}</xmp>
     *      </dt>
     * </dl>
     *
     * <h2>reset button 可用的 html 属性</h2>
     * <dl>
     *      <dd>
     *          如果 form 和 reset 定义了相同属性, reset 优先级更高
     *      </dd>
     *      <dt>formConfirmPopupType = string, default = dialog</dt>
     *      <dd>定义提示框的类型: dialog, popup</dd>
     *
     *      <dt>formResetUrl = url</dt>
     *      <dd>表单重置时, 返回的URL</dd>
     *
     *      <dt>formResetConfirm = string</dt>
     *      <dd>重置表单时进行二次确认的提示信息</dt>
     *
     *      <dt>formPopupCloseMs = int, default = 2000</dt>
     *      <dd>msgbox 弹框的显示时间</dd>
     * </dl>
     *
     * <h2>普通 [a | button] 可用的 html 属性</h2>
     * <dl>
     *      <dt>buttonReturnUrl</dt>
     *      <dd>点击button时, 返回的URL</dd>
     *
     *      <dt>returnConfirm = string</dt>
     *      <dd>二次确认提示信息</dd>
     *
     *      <dt>popupType = string, default = confirm</dt>
     *      <dd>弹框类型: confirm, dialog.confirm</dd>
     *
     *      <dt>popupstatus = int, default = 2</dt>
     *      <dd>提示状态: 0: 成功, 1: 失败, 2: 警告</dd>
     * </dl>
     * @namespace       window.Bizs
     * @class           FormLogic
     * @extends         JC.BaseMVC
     * @constructor 
     * @version dev 0.1 2013-09-08
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     * @example
            <script>
                JC.debug = true;
                JC.use( 'Bizs.FormLogic, Calendar, plugins.json2' );

                function formBeforeProcess( _evt, _ins ){
                    var _form = $(this);
                    JC.log( 'formBeforeProcess', new Date().getTime() );
                }

                function formAfterProcess( _evt, _ins ){
                    var _form = $(this);
                    JC.log( 'formAfterProcess', new Date().getTime() );
                    //return false;
                }

                function formAjaxDone( _json, _submitButton, _ins ){
                    var _form = $(this);
                    JC.log( 'custom formAjaxDone', new Date().getTime() );

                    if( _json.errorno ){
                        _panel = JC.Dialog.alert( _json.errmsg || '操作失败, 请重新尝试!', 1 );
                    }else{
                        _panel = JC.msgbox( _json.errmsg || '操作成功', _submitButton, 0, function(){
                            reloadPage( "?donetype=custom" );
                        });
                    }
                };
            </script>

            <dl class="defdl">
                <dt>Bizs.FormLogic, get form example 3, nothing at done</dt>
                <dd>
                    <dl>
                        <form action="./data/handler.php" method="POST"
                            class="js_bizsFormLogic"
                            formType="ajax"
                            formAjaxMethod="POST"
                            formBeforeProcess="formBeforeProcess"
                            formAfterProcess="formAfterProcess"
                            formAjaxDone="formAjaxDone"                            
                            formAjaxDoneAction="?donetype=system"
                            >
                            <dl>
                                <dd>
                                    文件框: <input type="text" name="text" reqmsg="文本框" value="test3" />
                                </dd>
                                <dd>
                                    日期: <input type="text" name="date" datatype="date" reqmsg="日期" value="2015-02-20" />
                                    <em class="error"></em>
                                </dd>
                                <dd>
                                    下拉框:
                                        <select name="dropdown" reqmsg="下拉框" >
                                            <option value="">请选择</option>
                                            <option value="1">条件1</option>
                                            <option value="2">条件2</option>
                                            <option value="3" selected>条件3</option>
                                        </select>
                                </dd>
                                <dd>
                                    <input type="hidden" name="getform" value="1" />
                                    <button type="submit" formSubmitConfirm="确定要提交吗?" >submit - dialog</button>
                                    <button type="submit" formConfirmPopupType="dialog" 
                                                            formSubmitConfirm="确定要提交吗?" >submit - popup</button>

                                    <button type="reset" formResetConfirm="确定要重置吗?"  >reset</button>
                                    <button type="reset" formResetConfirm="确定要重置吗?" formResetUrl="?"  >reset - url</button>
                                    <a href="?">back</a>
                                </dd>
                            </dl>
                        </form>
                    </dl>
                </dd>
            </dl>     
    */
    Bizs.FormLogic = FormLogic;
    function FormLogic( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( FormLogic.getInstance( _selector ) ) return FormLogic.getInstance( _selector );
        FormLogic.getInstance( _selector, this );

        this._model = new FormLogic.Model( _selector );
        this._view = new FormLogic.View( this._model );

        this._init();
    }
    /**
     * 获取或设置 FormLogic 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {FormLogic instance}
     */
    FormLogic.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'FormLogicIns', _setter );

            return _selector.data('FormLogicIns');
        };

    !JC.Valid && JC.use( 'Valid' );
    !JC.Form && JC.use( 'Form' );
    !JC.Panel && JC.use( 'Panel' );
    !$(document).ajaxForm && JC.use( 'plugins.jquery.form' );

    /**
     * 处理 form 或者 _selector 的所有form.js_bizsFormLogic
     * @method  init
     * @param   {selector}  _selector
     * @return  {Array}     Array of FormLogicInstance
     * @static
     */
    FormLogic.init =
        function( _selector ){
            var _r = [];
            _selector && ( _selector = $( _selector ) );
            if( !( _selector && _selector.length ) ) return;
            if( _selector.prop('nodeName').toLowerCase() == 'form' ){
                _r.push( new FormLogic( _selector ) );
            }else{
                _selector.find('form.js_bizsFormLogic, form.js_autoFormLogic').each( function(){
                    _r.push( new FormLogic( this  ) );
                });
            }
            return _r;
        };
    /**
     * msgbox 提示框的自动关闭时间
     * @property    popupCloseMs
     * @type        int
     * @default     2000
     * @static
     */
    FormLogic.popupCloseMs = 2000;
    /**
     * AJAX 表单的提交类型
     * <br />plugins, form
     * <br />plugins 可以支持文件上传
     * @property    popupCloseMs
     * @type        string
     * @default     empty
     * @static
     */
    FormLogic.formSubmitType = '';
    /**
     * 表单提交后, 是否禁用提交按钮
     * @property    submitDisable
     * @type        bool
     * @default     true
     * @static
     */
    FormLogic.submitDisable = true;
    /**
     * 表单提交后, 是否重置表单内容
     * @property    resetAfterSubmit
     * @type        bool
     * @default     true
     * @static
     */
    FormLogic.resetAfterSubmit = true;

    FormLogic.prototype = {
        _beforeInit:
            function(){
                //JC.log( 'FormLogic._beforeInit', new Date().getTime() );
            }
        , _initHanlderEvent:
            function(){
                var _p = this
                    , _type = _p._model.formType()
                    ;

                _p._view.initQueryVal();

                /**
                 * 默认 form 提交处理事件
                 * 这个如果是 AJAX 的话, 无法上传 文件 
                 */
                _p.selector().on('submit', function( _evt ){
                    //_evt.preventDefault();
                    _p._model.isSubmited( true );

                    if( _p._model.formBeforeProcess() ){
                        if( _p._model.formBeforeProcess().call( _p.selector(), _evt, _p ) === false ){
                            return _p._model.prevent( _evt );
                        }
                    }

                    if( !JC.Valid.check( _p.selector() ) ){
                        if( _p._model.formProcessError() ){
                            _p._model.formProcessError().call( _p.selector(), _evt, _p );
                        }
                        return _p._model.prevent( _evt );
                    }

                    if( _p._model.formAfterProcess() ){
                        if( _p._model.formAfterProcess().call( _p.selector(), _evt, _p ) === false ){
                            return _p._model.prevent( _evt );
                        }
                    }

                    if( _p.selector().data( FormLogic.Model.SUBMIT_CONFIRM_BUTTON ) ){
                        _p.trigger( FormLogic.Model.EVT_CONFIRM );
                        return _p._model.prevent( _evt );
                    }

                    _p.trigger( 'ProcessDone' );

                    /*
                    if( _type == FormLogic.Model.AJAX ){
                        _p.trigger( FormLogic.Model.EVT_AJAX_SUBMIT );
                        return _p._model.prevent( _evt );
                    }
                    */
                });

                _p.on( 'BindFrame', function( _evt ){
                    var _frame
                        , _type = _p._model.formType()
                        , _frameName
                        ;
                    if( _type != FormLogic.Model.AJAX ) return;

                    _frame = _p._model.frame();
                    _frame.on( 'load', function( _evt ){
                        var _w = _frame.prop('contentWindow')
                            , _wb = _w.document.body
                            , _d = $.trim( _wb.innerHTML )
                            ;
                        if( !_p._model.isSubmited() ) return;

                        JC.log( 'common ajax done' );
                        _p.trigger( 'AjaxDone', [ _d ] );
                    });
                });
                /**
                 * 全局 AJAX 提交完成后的处理事件
                 */
                _p.on('AjaxDone', function( _evt, _data ){
                    /**
                     * 这是个神奇的BUG
                     * chrome 如果没有 reset button, 触发 reset 会导致页面刷新
                     */
                    var _resetBtn = _p._model.selector().find('button[type=reset], input[type=reset]');

                    _p._model.formSubmitDisable() && _p.trigger( 'EnableSubmit' );

                    var _json, _fatalError, _resultType = _p._model.formAjaxResultType();
                    if( _resultType == 'json' ){
                        try{ _json = $.parseJSON( _data ); }catch(ex){ _fatalError = true; _json = _data; }
                    }

                    if( _fatalError ){
                        var _msg = printf( '服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>'
                                            , _data );
                        JC.Dialog.alert( _msg, 1 )
                        return;
                    }

                    _json 
                        && _resultType == 'json'
                        && 'errorno' in _json 
                        && !parseInt( _json.errorno, 10 )
                        && _p._model.formResetAfterSubmit() 
                        && _resetBtn.length
                        && _p.selector().trigger('reset')
                        ;

                    _json = _json || _data || {};
                    _p._model.formAjaxDone()
                        && _p._model.formAjaxDone().call( 
                            _p._model.selector() 
                            , _json
                            , _p._model.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON )
                            , _p
                        );

                   _p._model.formResetAfterSubmit() 
                        && !_p._model.userFormAjaxDone()
                        && _resetBtn.length
                        && _p.selector().trigger('reset');

                });
                /**
                 * 表单内容验证通过后, 开始提交前的处理事件
                 */
                _p.on('ProcessDone', function(){
                    _p._model.formSubmitDisable() 
                        && _p.selector().find('input[type=submit], button[type=submit]').each( function(){
                            $( this ).prop('disabled', true);
                        });
                });

                _p.on( FormLogic.Model.EVT_CONFIRM, function( _evt ){
                    var _btn = _p.selector().data( FormLogic.Model.SUBMIT_CONFIRM_BUTTON )
                        ;
                    _btn && ( _btn = $( _btn ) );
                    if( !( _btn && _btn.length ) ) return;

                    var _popup;

                    if( _p._model.formConfirmPopupType( _btn ) == 'dialog' ){
                        _popup = JC.Dialog.confirm( _p._model.formSubmitConfirm( _btn ), 2 );
                    }else{
                        _popup = JC.confirm( _p._model.formSubmitConfirm( _btn ), _btn, 2 );
                    }

                    _popup.on('confirm', function(){
                        _p.selector().data( FormLogic.Model.SUBMIT_CONFIRM_BUTTON, null );
                        _p.selector().trigger( 'submit' );
                    });

                    _popup.on('close', function(){
                        _p.selector().data( FormLogic.Model.SUBMIT_CONFIRM_BUTTON, null );
                    });
                });

                _p.selector().on('reset', function( _evt ){
                    if( _p.selector().data( FormLogic.Model.RESET_CONFIRM_BUTTON ) ){
                        _p.trigger( FormLogic.Model.EVT_RESET );
                        return _p._model.prevent( _evt );
                    }else{
                        _p._view.reset();
                        _p.trigger( 'EnableSubmit' );
                    }
                });

                _p.on( 'EnableSubmit', function(){
                    _p.selector().find('input[type=submit], button[type=submit]').each( function(){
                        $( this ).prop('disabled', false );
                    });
                });

                _p.on( FormLogic.Model.EVT_RESET, function( _evt ){
                    var _btn = _p.selector().data( FormLogic.Model.RESET_CONFIRM_BUTTON )
                        ;
                    _btn && ( _btn = $( _btn ) );
                    if( !( _btn && _btn.length ) ) return;

                    var _popup;

                    if( _p._model.formConfirmPopupType( _btn ) == 'dialog' ){
                        _popup = JC.Dialog.confirm( _p._model.formResetConfirm( _btn ), 2 );
                    }else{
                        _popup = JC.confirm( _p._model.formResetConfirm( _btn ), _btn, 2 );
                    }

                    _popup.on('confirm', function(){
                        _p.selector().data( FormLogic.Model.RESET_CONFIRM_BUTTON, null );
                        _p.selector().trigger( 'reset' );
                        _p._view.reset();
                        _p.trigger( 'EnableSubmit' );
                    });

                    _popup.on('close', function(){
                        _p.selector().data( FormLogic.Model.RESET_CONFIRM_BUTTON, null );
                    });
                });
                
            }
        , _inited:
            function(){
                JC.log( 'FormLogic#_inited', new Date().getTime() );
                var _p = this
                    , _files = _p.selector().find('input[type=file][name]')
                    ;

                _files.length
                    && _p.selector().attr( 'enctype', 'multipart/form-data' )
                    && _p.selector().attr( 'encoding', 'multipart/form-data' )
                    ;

                _p.trigger( 'BindFrame' );
            }
    };

    JC.BaseMVC.buildModel( FormLogic );

    FormLogic.Model._instanceName = 'FormLogicIns';
    FormLogic.Model.GET = 'get';
    FormLogic.Model.POST = 'post';
    FormLogic.Model.AJAX = 'ajax';
    FormLogic.Model.IFRAME = 'iframe';

    FormLogic.Model.SUBMIT_CONFIRM_BUTTON = 'SubmitButton';
    FormLogic.Model.RESET_CONFIRM_BUTTON = 'ResetButton';

    FormLogic.Model.GENERIC_SUBMIT_BUTTON = 'GenericSubmitButton';
    FormLogic.Model.GENERIC_RESET_BUTTON= 'GenericResetButton';

    FormLogic.Model.EVT_CONFIRM = "ConfirmEvent"
    FormLogic.Model.EVT_RESET = "ResetEvent"
    FormLogic.Model.EVT_AJAX_SUBMIT = "AjaxSubmit"
    FormLogic.Model.INS_COUNT = 1;

    FormLogic.Model.prototype = {
        init:
            function(){
                this.id();
            }
        , id:
            function(){
                if( ! this._id ){
                    this._id = 'FormLogicIns_' + ( FormLogic.Model.INS_COUNT++ );
                }
                return this._id;
            }
        , isSubmited:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._submited = _setter );
                return this._submited;
            }
        , formType: 
            function(){ 
                var _r = this.stringProp( 'method' );
                !_r && ( _r = FormLogic.Model.GET );
                _r = this.stringProp( 'formType' ) || _r;
                return _r;
           }

        , frame:
            function(){
                var _p = this;

                if( !( _p._frame && _p._frame.length && _p._frame.parent() ) ){

                    if( _p.selector().is('[target]') ){
                        _p._frame = $( printf( 'iframe[name={0}]', _p.selector().attr('target') ) );
                    }
                    
                    if( !( _p._frame && _p._frame.length ) ) {
                        _p.selector().prop( 'target', _p.frameId() );
                        _p._frame = $( printf( FormLogic.frameTpl, _p.frameId() ) );
                        _p.selector().after( _p._frame );
                    }

                }

                return _p._frame;
            }
        , frameId: function(){ return this.id() + '_iframe'; }

        , formSubmitType: 
            function(){ 
                var _r = this.stringProp( 'ajaxSubmitType' ) 
                        || this.stringProp( 'formSubmitType' ) 
                        || FormLogic.formSubmitType 
                        || 'plugins'
                        ;
                return _r.toLowerCase();
           }
        , formAjaxResultType:
            function(){
                var _r = this.stringProp( 'formAjaxResultType' ) || 'json';
                return _r;
            }
        , formAjaxMethod:
            function(){
                var _r = this.stringProp( 'formAjaxMethod' ) || this.stringProp( 'method' );
                !_r && ( _r = FormLogic.Model.GET );
                return _r.toLowerCase();
            }
        , formAjaxAction:
            function(){
                var _r = this.attrProp( 'formAjaxAction' ) || this.attrProp( 'action' ) || '?';
                return urlDetect( _r );
            }
        , formSubmitDisable:
            function(){
                var _p = this, _r = FormLogic.submitDisable
                    , _btn = _p.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON )
                    ;

                _p.selector().is('[formSubmitDisable]')
                    && ( _r = parseBool( _p.selector().attr('formSubmitDisable') ) );

                _btn 
                    && _btn.is('[formSubmitDisable]')
                    && ( _r = parseBool( _btn.attr('formSubmitDisable') ) );

                return _r;
            }
        , formResetAfterSubmit:
            function(){
                var _p = this, _r = FormLogic.resetAfterSubmit;

                _p.selector().is('[formResetAfterSubmit]')
                    && ( _r = parseBool( _p.selector().attr('formResetAfterSubmit') ) );
                return _r;
            }
        , formAjaxDone:
            function(){
                var _p = this, _r = _p._innerAjaxDone
                    , _btn = _p.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON )
                    ;
                _r = _p.userFormAjaxDone() || _r;
                return _r;
            }
        , userFormAjaxDone:
            function(){
                var _p = this, _r
                    , _btn = _p.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON )
                    ;

                _p.selector().is('[formAjaxDone]')
                    && ( _r = this.callbackProp( 'formAjaxDone' ) || _r );

                _btn && ( _btn = $( _btn ) ).length
                    && ( _r = _p.callbackProp( _btn, 'formAjaxDone' ) || _r )
                    ;
                return _r;
            }

        , _innerAjaxDone:
            function( _json, _btn, _p ){
                var _form = $(this)
                    , _panel
                    , _url = ''
                    ;

                _json.data 
                    && _json.data.returnurl
                    && ( _url = _json.data.returnurl )
                    ;
                _json.url 
                    && ( _url = _json.url )
                    ;

                if( _json.errorno ){
                    _panel = JC.Dialog.alert( _json.errmsg || '操作失败, 请重新尝试!', 1 );
                }else{
                    _panel = JC.Dialog.msgbox( _json.errmsg || '操作成功', 0, function(){
                        _p._model.formAjaxDoneAction()
                            && reloadPage( _url || _p._model.formAjaxDoneAction() );
                    }, _p._model.formPopupCloseMs() );
                }
            }
        , formPopupCloseMs:
            function( _btn ){
                var _p = this
                    , _r = FormLogic.popupCloseMs
                    , _btn = _btn || _p.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON )
                    ;

                _p.selector().is('[formPopupCloseMs]')
                    && ( _r = this.intProp( 'formPopupCloseMs' ) || _r );

                _btn && ( _btn = $( _btn ) ).length
                    && ( _r = _p.intProp( _btn, 'formPopupCloseMs') || _r )
                    ;

                return _r;
            }
        , formAjaxDoneAction:
            function(){
                var _p = this, _r = ''
                    , _btn = _p.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON )
                    ;

                _p.selector().is('[formAjaxDoneAction]')
                    && ( _r = this.attrProp( 'formAjaxDoneAction' ) || _r );

                _btn && ( _btn = $( _btn ) ).length
                    && ( _r = _p.attrProp( _btn, 'formAjaxDoneAction' ) || _r )
                    ;

                return urlDetect( _r );
            }


        , formBeforeProcess: function(){ return this.callbackProp( 'formBeforeProcess' ); }
        , formAfterProcess: function(){ return this.callbackProp( 'formAfterProcess' ); }
        , formProcessError: function(){ return this.callbackProp( 'formProcessError' ); }

        , prevent: function( _evt ){ _evt && _evt.preventDefault(); return false; }

        , formConfirmPopupType: 
            function( _btn ){ 
                var _r = this.stringProp( 'formConfirmPopupType' ) || 'dialog'; 
                _btn && ( _btn = $( _btn ) ).length 
                    && _btn.is('[formConfirmPopupType]')
                    && ( _r = _btn.attr('formConfirmPopupType') )
                    ;
                return _r.toLowerCase();
            }
        , formResetUrl: 
            function(){
                var _p = this
                    , _r = _p.stringProp( 'formResetUrl' )
                    , _btn = _p.selector().data( FormLogic.Model.GENERIC_RESET_BUTTON )
                    ;

                _btn && ( _btn = $( _btn ) ).length
                    && ( _r = _p.attrProp( _btn, 'formResetUrl' ) || _r )
                    ;

                return urlDetect( _r );
            }
        , formSubmitConfirm:
            function( _btn ){
                var _r = this.stringProp( 'formSubmitConfirm' );
                _btn && ( _btn = $( _btn ) ).length
                    && _btn.is('[formSubmitConfirm]')
                    && ( _r = this.stringProp( _btn, 'formSubmitConfirm' ) )
                    ;
                !_r && ( _r = '确定要提交吗?' );
                return _r.trim();
            }
        , formResetConfirm:
            function( _btn ){
                var _r = this.stringProp( 'formResetConfirm' );
                _btn && ( _btn = $( _btn ) ).length
                    && _btn.is('[formResetConfirm]')
                    && ( _r = this.stringProp( _btn, 'formResetConfirm' ) )
                    ;
                !_r && ( _r = '确定要重置吗?' );
                return _r.trim();
            }

    };

    JC.BaseMVC.buildView( FormLogic );
    FormLogic.View.prototype = {
        initQueryVal:
            function(){
                var _p = this;
                if( _p._model.formType() != FormLogic.Model.GET ) return;

                JC.Form && JC.Form.initAutoFill( _p._model.selector() );
            }
        , reset:
            function( _btn ){
                var _p = this, _resetUrl = _p._model.formResetUrl();

                _resetUrl && reloadPage( _resetUrl );

                _p._model.resetTimeout && clearTimeout( _p._model.resetTimeout );
                _p._model.resetTimeout =
                    setTimeout(function(){
                        var _form = _p._model.selector();

                        _form.find('input[type=text], input[type=password], input[type=file], textarea').val('');
                        _form.find('select').each( function() {
                            var sp = $(this);
                            var cs = sp.find('option');
                            if( cs.length > 1 ){
                                sp.val( $(cs[0]).val() );
                            }
                            //for JC.Valid
                            var _hasIgnore = sp.is('[ignoreprocess]');
                            sp.attr('ignoreprocess', true);
                            sp.trigger( 'change' );
                            setTimeout( function(){
                                !_hasIgnore && sp.removeAttr('ignoreprocess');
                            }, 500 );
                        });

                        JC.Valid && JC.Valid.clearError( _form );
                    }, 50);

                JC.hideAllPopup( 1 );
            }
    };

    JC.BaseMVC.build( FormLogic, 'Bizs' );

    $(document).delegate( 'input[formSubmitConfirm], button[formSubmitConfirm]', 'click', function( _evt ){
        var _p = $(this)
            , _fm = getJqParent( _p, 'form' )
            , _ins = FormLogic.getInstance( _fm )
            , _tmp 
            ;
        if( _fm && _fm.length ){
            if( _ins ){
                if( _p.is('[formConfirmCheckSelector]') ){
                    _tmp = parentSelector( _p, _p.attr('formConfirmCheckSelector') );
                    if( !( _tmp && _tmp.length ) ) return;
                }
                else if( _p.is( '[formConfirmCheckCallback]') ){
                    _tmp = window[ _p.attr('formConfirmCheckCallback') ];
                    if( _tmp ){
                        if( ! _tmp.call( _fm, _p, _evt, _ins ) ) return;
                    }
                }
            }
            _fm.data( FormLogic.Model.SUBMIT_CONFIRM_BUTTON, _p )
        }
    });

    $(document).delegate( 'input[formResetConfirm], button[formResetConfirm]', 'click', function( _evt ){
        var _p = $(this), _fm = getJqParent( _p, 'form' );
        _fm && _fm.length 
            && _fm.data( FormLogic.Model.RESET_CONFIRM_BUTTON, _p )
            ;
    });

    $(document).delegate( 'input[type=reset], button[type=reset]', 'click', function( _evt ){
        var _p = $(this), _fm = getJqParent( _p, 'form' );
        _fm && _fm.length 
            && _fm.data( FormLogic.Model.GENERIC_RESET_BUTTON , _p )
            ;
    });

    $(document).delegate( 'input[type=submit], button[type=submit]', 'click', function( _evt ){
        var _p = $(this), _fm = getJqParent( _p, 'form' );
        _fm && _fm.length 
            && _fm.data( FormLogic.Model.GENERIC_SUBMIT_BUTTON , _p )
            ;
    });

    $(document).delegate( 'a[buttonReturnUrl], input[buttonReturnUrl], button[buttonReturnUrl]', 'click', function( _evt ){
        var _p = $(this)
            , _url = _p.attr('buttonReturnUrl').trim()
            , _msg = _p.is('[returnConfirm]') ? _p.attr('returnConfirm') : ''
            , _popupType = _p.is('[popuptype]') ? _p.attr('popuptype') : 'confirm'
            , _popupstatus = parseInt( _p.is('[popupstatus]') ? _p.attr('popupstatus') : "2", 10 )
            , _panel
            ;

        if( !_url ) return;
        _url = urlDetect( _url );

        _p.prop('nodeName').toLowerCase() == 'a' && _evt.preventDefault();

        if( _msg ){
            switch( _popupType ){
                case 'dialog.confirm':
                    {
                        _panel = JC.Dialog.confirm( _msg, _popupstatus );
                        break;
                    }
                default:
                    {
                        _panel = JC.confirm( _msg, _p, _popupstatus );
                        break;
                    }
            }
            _panel.on('confirm', function(){
                reloadPage( _url );
            });
        }else{
            reloadPage( _url );
        }
    });

    FormLogic.frameTpl = '<iframe src="about:blank" id="{0}" name="{0}" frameborder="0" class="BFLIframe" style="display:none;"></iframe>';

    $(document).ready( function(){
        setTimeout( function(){
            FormLogic.autoInit && FormLogic.init( $(document) );
        }, 1 );
    });

}(jQuery));
