;(function($){
    /**
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
     * <h2>页面只要引用本文件, 默认会自动初始化 from class="js_autoFormLogic" 的表单</h2>
     * <h2>Form 可用的 HTML 属性</h2>
     * <dl>
     *      <dt>formType = string, default = get</dt>
     *      <dd>
     *          form 的提交类型, 如果没有显式声明, 将视为 form 的 method 属性
     *          <br/> 类型有: get, post, ajax 
     *      </dd>
     *
     *      <dt>formBeforeProcess = function</dt>
     *      <dd>表单开始提交时且没开始验证时, 触发的回调</dd>
     *
     *      <dt>formAfterProcess = function</dt>
     *      <dd>表单开始提交时且验证通过后, 触发的回调</dd>
     *
     *      <dt>formConfirmPopupType = string, default = dialog</dt>
     *      <dd>定义提示框的类型: dialog, popup</dd>
     *
     *      <dt>formResetUrl = url</dt>
     *      <dd>表单重置时, 返回的URL</dd>
     *
     *      <dt>formSubmitConfirm = string</dt>
     *      <dd>提交表单时进行二次确认的提示信息</dt>
     *
     *      <dt>formResetConfirm = string</dt>
     *      <dd>重置表单时进行二次确认的提示信息</dt>
     *
     *      <dt>formPopupCloseMs = int, default = 2000</dt>
     *      <dd>msgbox 弹框的显示时间</dd>
     *
     *      <dt>ajaxSubmitType = string, default = plugins</dt>
     *      <dd>
     *          类型: plugins, form
     *          <br/>plugins 支持 AJAX 文件上传, 但是在 弹框里 捕获不到提交事件
     *          <br/>form 不支持 ajax 文件上传, 但可以在 popup 里捕获到提交事件
     *      </dd>
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
     *          AJAX 提交完成后的回调
     *          <br />如果没有显式声明, FormLogic将自行处理
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
     *          <br/> formResetConfirm 属性除外
     *      </dd>
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
     * <h2>普通 button 可用的 html 属性</h2>
     * <dl>
     *      <dt>buttonReturnUrl</dt>
     *      <dd>点击button时, 返回的URL</dd>
     * </dl>
     * @namespace       window.Bizs
     * @class           FormLogic
     * @extends         JC.BaseMVC
     * @constructor 
     * @author  qiushaowei  .1  2013-09-08
     * @example
     */
    Bizs.FormLogic = FormLogic;
    function FormLogic( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( FormLogic.getInstance( _selector ) ) return FormLogic.getInstance( _selector );
        FormLogic.getInstance( _selector, this );

        this._model = new FormLogic.Model( _selector );
        this._view = new FormLogic.View( this._model );

        this._init( );
    }
    
    !JC.Valid && JC.use( 'Valid' );
    !JC.Form && JC.use( 'Form' );
    !JC.Panel && JC.use( 'Panel' );
    !$(document).ajaxForm && JC.use( 'plugins.jquery.form' );

    /**
     * 处理 form 或者 _selector 的所有form.js_autoFormLogic
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
                _selector.find('form.js_autoFormLogic').each( function(){
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
    FormLogic.ajaxSubmitType = '' ;

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

                _p.on( FormLogic.Model.EVT_AJAX_SUBMIT, function(){
                    var _method = _p._model.formAjaxMethod();
                    JC.log( FormLogic.Model.EVT_AJAX_SUBMIT, _method );

                    var _data = _p._model.selector().serialize();
                    $[ _method ] &&
                        $[ _method ]( _p._model.formAjaxAction(), _data )
                        .done( function( _d ){
                            JC.log( 'common ajax done' );
                            //alert( 'form' );
                            var _json;
                            try{ _json = $.parseJSON( _d ); }catch(ex){}
                            _json = _json || _d || {};
                            _p._model.formAjaxDone()
                                && _p._model.formAjaxDone().call( 
                                    _p._model.selector() 
                                    , _json
                                    , _p._model.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON )
                                    , _p
                                );
                        });
                    ;
                });

                if( _p._model.formType() == 'ajax' && _p._model.ajaxSubmitType() == 'plugins' ){
                    _p.selector().ajaxForm({
                        beforeSubmit:
                            function(){
                                if( _p._model.formBeforeProcess() ){
                                    if( _p._model.formBeforeProcess().call( _p.selector(), null, _p ) === false ){
                                        return _p._model.prevent();
                                    }
                                }

                                if( !JC.Valid.check( _p.selector() ) ){
                                    return _p._model.prevent();
                                }

                                if( _p._model.formAfterProcess() ){
                                    if( _p._model.formAfterProcess().call( _p.selector(), null, _p ) === false ){
                                        return _p._model.prevent();
                                    }
                                }

                                if( _p.selector().data( FormLogic.Model.SUBMIT_CONFIRM_BUTTON ) ){
                                    _p.trigger( FormLogic.Model.EVT_CONFIRM );
                                    return _p._model.prevent();
                                }
                            }
                        , success:
                            function( _d ){
                                JC.log( 'plugins ajax done' );
                                //alert( 'plugins' );
                                try{ _json = $.parseJSON( _d ); }catch(ex){}
                                var _json;
                                _json = _json || _d || {};
                                _p._model.formAjaxDone()
                                    && _p._model.formAjaxDone().call( 
                                        _p._model.selector() 
                                        , _json
                                        , _p._model.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON )
                                        , _p
                                    );
                            }
                    });
                }else{
                    _p.selector().on('submit', function( _evt ){
                        //_evt.preventDefault();

                        if( _p._model.formBeforeProcess() ){
                            if( _p._model.formBeforeProcess().call( _p.selector(), _evt, _p ) === false ){
                                return _p._model.prevent( _evt );
                            }
                        }

                        if( !JC.Valid.check( _p.selector() ) ){
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

                        if( _type == FormLogic.Model.AJAX ){
                            _p.trigger( FormLogic.Model.EVT_AJAX_SUBMIT );
                            return _p._model.prevent( _evt );
                        }
                    });
                }

                _p.on( FormLogic.Model.EVT_CONFIRM, function( _evt ){
                    var _btn = _p.selector().data( FormLogic.Model.SUBMIT_CONFIRM_BUTTON )
                        ;
                    _btn && ( _btn = $( _btn ) );
                    if( !( _btn && _btn.length ) ) return;

                    var _popup;

                    if( _p._model.formConfirmPopupType( _btn ) == 'dialog' ){
                        _popup = JC.Dialog.confirm( _p._model.formSubmitConfirm(), 2 );
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
                    }
                });

                _p.on( FormLogic.Model.EVT_RESET, function( _evt ){
                    var _btn = _p.selector().data( FormLogic.Model.RESET_CONFIRM_BUTTON )
                        ;
                    _btn && ( _btn = $( _btn ) );
                    if( !( _btn && _btn.length ) ) return;

                    var _popup;

                    if( _p._model.formConfirmPopupType( _btn ) == 'dialog' ){
                        _popup = JC.Dialog.confirm( _p._model.formResetConfirm(), 2 );
                    }else{
                        _popup = JC.confirm( _p._model.formResetConfirm( _btn ), _btn, 2 );
                    }

                    _popup.on('confirm', function(){
                        _p.selector().data( FormLogic.Model.RESET_CONFIRM_BUTTON, null );
                        _p.selector().trigger( 'reset' );
                        _p._view.reset();
                    });

                    _popup.on('close', function(){
                        _p.selector().data( FormLogic.Model.RESET_CONFIRM_BUTTON, null );
                    });
                });
                
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

    FormLogic.Model.prototype = {
        init:
            function(){
            }
        , formType: 
            function(){ 
                var _r = this.stringProp( 'method' );
                !_r && ( _r = FormLogic.Model.GET );
                _r = this.stringProp( 'formType' ) || _r;
                return _r.toLowerCase();
           }
        , ajaxSubmitType: 
            function(){ 
                var _r = this.stringProp( 'ajaxSubmitType' ) || FormLogic.ajaxSubmitType || 'plugins';
                return _r.toLowerCase();
           }
        , formAjaxMethod:
            function(){
                var _r = this.stringProp( 'formAjaxMethod' ) || this.stringProp( 'method' );
                !_r && ( _r = FormLogic.Model.GET );
                return _r.toLowerCase();
            }
        , formAjaxAction:
            function(){
                var _r = this.stringProp( 'formAjaxAction' ) || this.stringProp( 'action' ) || '?';
                return _r;
            }
        , formAjaxDone:
            function(){
                var _p = this, _r = _p._innerAjaxDone
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
                var _form = $(this), _panel;
                if( _json.errorno ){
                    _panel = JC.Dialog.alert( _json.errmsg || '操作失败, 请重新尝试!', 1 );
                }else{
                    _panel = JC.Dialog.msgbox( _json.errmsg || '操作成功', 0, function(){
                        _p._model.formAjaxDoneAction()
                            && reloadPage( _p._model.formAjaxDoneAction() );
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
                    && ( _r = this.stringProp( 'formAjaxDoneAction' ) || _r );

                _btn && ( _btn = $( _btn ) ).length
                    && ( _r = _p.stringProp( _btn, 'formAjaxDoneAction' ) || _r )
                    ;

                return _r;
            }


        , formBeforeProcess: function(){ return this.callbackProp( 'formBeforeProcess' ); }
        , formAfterProcess: function(){ return this.callbackProp( 'formAfterProcess' ); }

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
                    && ( _r = _p.stringProp( _btn, 'formResetUrl' ) || _r )
                    ;

                return _r;
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
                        });

                        JC.Valid && JC.Valid.clearError( _form );
                    }, 50);

                JC.hideAllPopup( 1 );
            }
    };

    JC.BaseMVC.build( FormLogic, 'Bizs' );

    $(document).delegate( 'input[formSubmitConfirm], button[formSubmitConfirm]', 'click', function( _evt ){
        var _p = $(this), _fm = getJqParent( _p, 'form' );
        _fm && _fm.length 
            && _fm.data( FormLogic.Model.SUBMIT_CONFIRM_BUTTON, _p )
            ;
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

    $(document).delegate( 'input[buttonReturnUrl], button[buttonReturnUrl]', 'click', function( _evt ){
        var _p = $(this), _url = _p.attr('buttonReturnUrl').trim();
        _url && reloadPage( _url );
    });

    $(document).ready( function(){
        setTimeout( function(){
            FormLogic.autoInit && FormLogic.init( $(document) );
        }, 1 );
    });

}(jQuery));
