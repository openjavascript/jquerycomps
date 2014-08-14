//TODO: 添加 disabled bind hidden 操作
//TODO: formSubmitIgnoreCheck 时, 如果在控件里回车提交的话, 控制逻辑可能会有问题, 需要仔细检查
;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Valid', 'JC.Panel', 'JC.FormFillUrl' ], function(){
    /**
     * <h2>提交表单控制逻辑</h2>
     * 应用场景
     * <br />get 查询表单
     * <br />post 提交表单
     * <br />ajax 提交表单
     * <p><b>require</b>: 
     *      <a href='window.jQuery.html'>jQuery</a>
     *      , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     *      , <a href='JC.Valid.html'>JC.Valid</a>
     *      , <a href='JC.Panel.html'>JC.Panel</a>
     * </p>
     * <p><b>optional</b>: 
     *      <a href='JC.FormFillUrl.html'>JC.FormFillUrl</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/window.Bizs.FormLogic.html' target='_blank'>API docs</a>
     * | <a href='../../modules/Bizs.FormLogic/0.2/_demo' target='_blank'>demo link</a></p>
     *
     * <h2>页面只要引用本文件, 默认会自动初始化 from class="js_bizsFormLogic" 的表单</h2>
     * <h2>Form 可用的 HTML 属性</h2>
     * <dl>
     *      <dt>formType = string, default = get</dt>
     *      <dd>
     *          form 的提交类型, 如果没有显式声明, 将视为 form 的 method 属性
     *          <br/> 类型有: get, post, ajax, jsonp 
     *      </dd>
     *
     *      <dt>formSubmitDisable = bool, default = true</dt>
     *      <dd>表单提交后, 是否禁用提交按钮</dd>
     *
     *      <dt>formResetAfterSubmit = bool, default = true</dt>
     *      <dd>表单提交后, 是否重置内容</dd>
     *
     *      <dt>formBeforeProcess = function, <b>window 变量域</b/></dt>
     *      <dd>
     *          表单开始提交时且没开始验证时, 触发的回调
<pre>function formBeforeProcess( _evt, _ins ){
    var _form = $(this);
    JC.log( 'formBeforeProcess', new Date().getTime() );
    //return false;
}</pre>
     *      </dd>
     *
     *      <dt>formProcessError = function, <b>window 变量域</b></dt>
     *      <dd>
     *          提交时, 验证未通过时, 触发的回调
<pre>function formProcessError( _evt, _ins ){
    var _form = $(this);
    JC.log( 'formProcessError', new Date().getTime() );
    //return false;
}</pre>
     *      </dd>
     *
     *      <dt>formAfterProcess = function, <b>window 变量域</b></dt>
     *      <dd>
     *          表单开始提交时且验证通过后, 触发的回调
<pre>function formAfterProcess( _evt, _ins ){
    var _form = $(this);
    JC.log( 'formAfterProcess', new Date().getTime() );
    //return false;
}</pre>
     *      </dd>
     *
     *      <dt>formBeforeSubmit = function, <b>window 变量域</b></dt>
     *      <dd>
     *          表单开始发送数据到服务器之前的回调
<pre>function formBeforeSubmit( _evt, _ins ){
    var _form = $(this);
    JC.log( 'formBeforeSubmit', new Date().getTime() );
    //return false;
}</pre>
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
<pre>function formAjaxDone( _json, _submitButton, _ins ){
    var _form = $(this);
    JC.log( 'custom formAjaxDone', new Date().getTime() );

    if( _json.errorno ){
        _panel = JC.Dialog.alert( _json.errmsg || '操作失败, 请重新尝试!', 1 );
    }else{
        _panel = JC.msgbox( _json.errmsg || '操作成功', _submitButton, 0, function(){
            JC.f.reloadPage( "?donetype=custom" );
        });
    }
};</pre>
     *      </dd>
     *
     *      <dt>formAjaxDoneAction = url</dt>
     *      <dd>声明 ajax 提交完成后的返回路径, 如果没有, 提交完成后将不继续跳转操作</dd>
     *
     *      <dt>formJsonpCb = function, default = FormLogic#_model._innerJsonpCb</dt>
     *      <dd>自定义 JSOPN 处理回调, <b>window 变量域</b>
<pre>function customFormJsonpCb( _data, _info ){
    if( !( _data && _info ) ) return;

    var _frm = $( 'form.' + _info ), _ins;
    if( !_frm.length ) return;
    _ins = JC.BaseMVC.getInstance( _frm, Bizs.FormLogic );
    if( !_ins ) return;

    _ins.trigger( Bizs.FormLogic.Model.AJAX_DONE, [ _data ] );
}</pre>

<pre>URL: <b>handler_jsonp.php?callbackInfo=FormLogic_1&callback=callback</b>
OUTPUT:
<b>&lt;script&gt;
window.parent 
    && window.parent != this
    && window.parent&#91; 'callback' &#93;
    && window.parent&#91; 'callback' &#93;( {"errorno":0,"errmsg":"","data":{"callbackInfo":"FormLogic_1","callback":"callback"}}, 'FormLogic_1' )
    ;
&lt;/script&gt;</b></pre>
     *      </dd>
     * </dl>
     *
     * <h2>Form Control 可用的 html 属性</h2>
     * <dl>
     *      <dt>ignoreResetClear = bool, default = false</dt>
     *      <dd>重置时, 是否忽略清空控件的值, 默认清空</dd>
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
<pre>function formConfirmCheckCallback( _trigger, _evt, _ins ){
    var _form = $(this);
    JC.log( 'formConfirmCheckCallback', new Date().getTime() );
    return _form.find('td.js_confirmCheck input[value=0]:checked').length;
}</pre>
     *      </dd>
     *
     *      <dt>formSubmitIgnoreCheck = bool, default = false</dt>
     *      <dd>
     *          表单提交时, 是否忽略 JC.Valid 的验证
     *          <br /><b>注意:</b> 仅忽略内容为空的项, 如果已经填写内容, 那么内容必须与验证规则匹配
     *          <br /><b>注: 有时 提交操作 仅为保存为草稿的时候, 是不需要验证所有内容的, 不过还是会对值非空的项进行验证</b>
     *      </dd>
     *
     *      <dt>formResetCallback = callback</dt>
     *      <dd>表单重置后的回调
<pre>function formResetCallback( _evt, _ins ){
    var _form = $(this);
    JC.log( 'formResetCallback', JC.f.ts() );
}</pre>
     *
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
     *      </dd>
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
     *
     *      <dt>buttonClickBindSelector = selector</dt>
     *      <dd>
     *          点击按钮时, 把按钮的值赋值给 绑定的 控件
     *          <br /><b>注意:</b> 这个属性仅支持 [input|button] 标签
     *      </dd>
     * </dl>
     * @namespace       window.Bizs
     * @class           FormLogic
     * @extends         JC.BaseMVC
     * @constructor 
     * @version dev 0.2 2014-01-22
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
                            JC.f.reloadPage( "?donetype=custom" );
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

        if( JC.BaseMVC.getInstance( _selector, FormLogic ) ) 
            return JC.BaseMVC.getInstance( _selector, FormLogic );

        JC.BaseMVC.getInstance( _selector, FormLogic, this );

        this._model = new FormLogic.Model( _selector );
        this._view = new FormLogic.View( this._model );

        this._init();

        JC.log( FormLogic.Model._instanceName, 'all inited', new Date().getTime() );
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
            return JC.BaseMVC.getInstance( _selector, FormLogic, _setter );
        };

    if( !define.amd && JC.use ){
        !JC.Valid && JC.use( 'JC.Valid' );
        !JC.Panel && JC.use( 'JC.Panel' );
        !JC.FormFillUrl && JC.use( 'JC.FormFillUrl' );
    }

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
    /**
     * 表单提交时, 内容填写不完整时触发的全局回调
     * @property    processErrorCb
     * @type        function
     * @default     null
     * @static
     */
    FormLogic.processErrorCb;
    /**
     * 全局返回数据处理回调
     * <br />所有提交结果都会调用
     * <br />arg: _data[string of result]
     * @property    GLOBAL_AJAX_CHECK
     * @type        function  
     * @default     null
     * @static
     */
    FormLogic.GLOBAL_AJAX_CHECK;

    FormLogic._currentIns;


    JC.BaseMVC.build( FormLogic );

    JC.f.extendObject( FormLogic.prototype, {
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
                    FormLogic._currentIns = _p;

                    var _ignoreCheck, _btn = _p.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON );
                        _btn && ( _btn = $( _btn ) );
                    if( _btn && _btn.length ){
                        _ignoreCheck = JC.f.parseBool( _btn.attr( FormLogic.Model.IGNORE_KEY ) );
                        JC.Valid.ignore( _p.selector(), !_ignoreCheck ); 
                    }else{
                        JC.Valid.ignore( _p.selector(), true );
                    }

                    if( _p._model.formBeforeProcess() ){
                        if( _p._model.formBeforeProcess().call( _p.selector(), _evt, _p ) === false ){
                            return _p._model.prevent( _evt );
                        }
                    }

                    if( !JC.Valid.check( _p.selector() ) ){
                        _p._model.prevent( _evt );

                        if( !_p._model.checkDataValid() ){
                            _p._view.dataValidError();
                            return false;
                        }

                        if( _p._model.formProcessError() ){
                            _p._model.formProcessError().call( _p.selector(), _evt, _p );
                        }
                        return false;
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



                    if( _p._model.formBeforeSubmit() ){
                        if( _p._model.formBeforeSubmit().call( _p.selector(), _evt, _p ) === false ){
                            return _p._model.prevent( _evt );
                        }
                    }

                    _p.trigger( FormLogic.Model.PROCESS_DONE );
                });

                _p.on( FormLogic.Model.INITED, function( _evt ){
                    _p.trigger( FormLogic.Model.INIT_JSONP );
                    _p.trigger( FormLogic.Model.BIND_FORM );
                });

                _p.on( FormLogic.Model.INIT_JSONP, function( _evt ){
                    if( !( _type == FormLogic.Model.JSONP ) ) return;

                    window[ _p._model.jsonpKey() ] = _p._model.jsonpCb();
                });

                _p.on( FormLogic.Model.BIND_FORM, function( _evt ){
                    var _frame
                        , _type = _p._model.formType()
                        , _frameName
                        ;
                    if( !( _type == FormLogic.Model.AJAX || _type == FormLogic.Model.JSONP ) ) return;

                    _frame = _p._model.frame();
                    _frame.on( 'load', function( _evt ){
                        if( _p._model.formType() == FormLogic.Model.JSONP ) return;
                        var _w = _frame.prop('contentWindow')
                            , _wb = _w.document.body
                            , _d = $( '<div>' + ( $.trim( _wb.innerHTML ) || '' ) + '</div>' ).text()
                            ;
                        if( !_p._model.isSubmited() ) return;

                        JC.log( 'common ajax done' );
                        _p.trigger( FormLogic.Model.AJAX_DONE, [ _d ] );
                    });
                });
                /**
                 * 全局 AJAX 提交完成后的处理事件
                 */
                _p.on( FormLogic.Model.AJAX_DONE, function( _evt, _data ){
                    FormLogic.GLOBAL_AJAX_CHECK
                        && FormLogic.GLOBAL_AJAX_CHECK( _data );
                    /**
                     * 这是个神奇的BUG
                     * chrome 如果没有 reset button, 触发 reset 会导致页面刷新
                     */
                    var _resetBtn = _p._model.selector().find('button[type=reset], input[type=reset]');

                    _p._model.formSubmitDisable() && _p.trigger( FormLogic.Model.ENABLE_SUBMIT );

                    var _json, _fatalError, _resultType = _p._model.formAjaxResultType();
                    if( Object.prototype.toString.call( _data ) == '[object Object]' ){
                        _json = _data;
                    }else if( _resultType == 'json' ){
                        try{ _json = $.parseJSON( _data ); }catch(ex){ _fatalError = true; _json = _data; }
                    }

                    if( _fatalError ){
                        var _msg = JC.f.printf( '服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>'
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
                _p.on( FormLogic.Model.PROCESS_DONE, function( _evt ){
                    _p._model.formSubmitDisable() 
                        && _p.selector().find('input[type=submit], button[type=submit]').each( function(){
                            !_p._model.formIgnoreStatus() && $( this ).prop('disabled', true);
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
                        _p.trigger( FormLogic.Model.EVT_RESET, [ _evt ] );
                        return _p._model.prevent( _evt );
                    }else{
                        _p._view.reset();
                        _p.trigger( FormLogic.Model.ENABLE_SUBMIT );
                        _p.trigger( 'FORM_RESET', [ _evt ] );
                    }
                });

                _p.on( FormLogic.Model.ENABLE_SUBMIT, function(){
                    _p.selector().find('input[type=submit], button[type=submit]').each( function(){
                    	 !_p._model.formIgnoreStatus() && $( this ).prop('disabled', false );
                    });
                });

                _p.on( FormLogic.Model.EVT_RESET, function( _evt, _srcEvt ){
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
                        _p.trigger( FormLogic.Model.ENABLE_SUBMIT );
                        _p.trigger( 'FORM_RESET', [ _srcEvt ] );
                    });

                    _popup.on('close', function(){
                        _p.selector().data( FormLogic.Model.RESET_CONFIRM_BUTTON, null );
                    });
                });

                _p.on( 'FORM_RESET', function( _evt, _srcEvt ){
                    JC.f.safeTimeout( function(){
                        _p._model.formResetCallback() && _p._model.formResetCallback().call( _p.selector(), _srcEvt, _p );
                    }, _p, 'asdfawerasdfase_reset', 100 );
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

                _p._model.trigger( FormLogic.Model.INITED );
            }

    }) ;

    FormLogic.Model._instanceName = 'FormLogic';

    FormLogic.Model.INITED = 'inited';
    FormLogic.Model.INIT_JSONP = 'init_jsonp';

    FormLogic.Model.GET = 'get';
    FormLogic.Model.POST = 'post';
    FormLogic.Model.AJAX = 'ajax';
    FormLogic.Model.JSONP = 'jsonp';
    FormLogic.Model.IFRAME = 'iframe';

    FormLogic.Model.SUBMIT_CONFIRM_BUTTON = 'SubmitButton';
    FormLogic.Model.RESET_CONFIRM_BUTTON = 'ResetButton';

    FormLogic.Model.GENERIC_SUBMIT_BUTTON = 'GenericSubmitButton';
    FormLogic.Model.GENERIC_RESET_BUTTON= 'GenericResetButton';

    FormLogic.Model.EVT_CONFIRM = "ConfirmEvent"
    FormLogic.Model.EVT_RESET = "ResetEvent"
    FormLogic.Model.INS_COUNT = 1;

    FormLogic.Model.PROCESS_DONE = "ProcessDone";

    FormLogic.Model.IGNORE_KEY = "formSubmitIgnoreCheck";
    FormLogic.Model.BIND_FORM = "BindFrame";
    FormLogic.Model.AJAX_DONE = "AjaxDone";
    FormLogic.Model.ENABLE_SUBMIT = "EnableSubmit";

    FormLogic.Model.SHOW_DATA_VALID_ERROR = true;

    JC.f.extendObject( FormLogic.Model.prototype, {
        init:
            function(){
                this.id();
                this.selector().addClass( FormLogic.Model._instanceName );
                this.selector().addClass( this.id() );

                if( this.formType() == FormLogic.Model.JSONP ){
                    var _r = this.attrProp( 'formAjaxAction' ) || this.attrProp( 'action' ) || '?';

                    this.attrProp( 'action' ) 
                        && (
                            this.selector().attr( 'action'
                                , JC.f.addUrlParams( this.attrProp( 'action' ), { 'callbackInfo': this.id() } ) )
                            , this.selector().attr( 'action'
                                , JC.f.addUrlParams( this.attrProp( 'action' ), { 'callback': this.jsonpKey() } ) )
                        );
                            
                    this.attrProp( 'formAjaxAction' )
                        && ( 
                            this.selector().attr( 'formAjaxAction', 
                                JC.f.addUrlParams( this.attr( 'formAjaxAction' ), { 'callbackInfo': this.id() } ) )
                            , this.selector().attr( 'formAjaxAction', 
                                JC.f.addUrlParams( this.attr( 'formAjaxAction' ), { 'callback': this.jsonpKey() } ) )
                        );
                }
            }

        , showDataValidError:
            function( _item ){
                var _p = this, _r = FormLogic.Model.SHOW_DATA_VALID_ERROR;

                _p.selector().is( '[formShowDataValidError]' ) && ( _r = JC.f.parseBool( _p.attrProp( 'formShowDataValidError' ) ) );
                _item && _item.is( '[formShowDataValidError]' ) && ( _r = JC.f.parseBool( _item.attr( 'formShowDataValidError' ) ) );

                return _r;
            }
    
    	, formIgnoreStatus:
    		function(){
    			return this.boolProp( 'formIgnoreStatus');
    		}

        , checkDataValid:
            function(){
                var _r = true;

                $.each( this.dataValidItems(), function( _ix, _item ){
                    var _v = _item.val().trim()
                        , _status = _item.attr('datavalid')
                        , _datatypestatus = JC.f.parseBool( _item.attr('datatypestatus') )
                        ;
                    if( !( _v && _status ) ) return;
                    if( !_datatypestatus ) return;

                    if( !JC.f.parseBool( _item.attr( _status ) ) ){
                        return _r = false;
                    }
                });
                return _r;
            }

        , dataValidItems:
            function(){
                var _r = [];
                this.selector().find( 'input[type=text][subdatatype]' ).each( function(){
                    var _item = $(this);
                    if( !/datavalid/i.test( _item.attr( 'subdatatype' ) ) ) return;
                    _r.push( _item );
                });

                return $( _r );
            }

        , id:
            function(){
                if( ! this._id ){
                    this._id = FormLogic.Model._instanceName + '_' + ( FormLogic.Model.INS_COUNT++ );
                }
                return this._id;
            }

        , jsonpCb:
            function(){
                var _r = this._innerJsonpCb
                    , _action = this.formAjaxAction()
                    ;

                _r = this.callbackProp( 'formJsonpCb' ) || _r;

                if( JC.f.hasUrlParam( _action, 'callback' ) ){
                    _r = this.windowProp( JC.f.getUrlParam( _action, 'callback' ) ) || _r;
                }

                return _r;
            }

        , jsonpKey:
            function(){
                var _r = this.id() + '_JsonpCb'
                    , _action = this.formAjaxAction()
                    ;

                _r = this.attrProp( 'formJsonpCb' ) || _r;

                if( JC.f.hasUrlParam( _action, 'callback' ) ){
                    _r = JC.f.getUrlParam( _action, 'callback' ) || _r;
                }

                return _r;
            }
        /**
         * 这个回调的 this 指针是 window
         */
        , _innerJsonpCb:
            function( _data, _info ){
                if( !( _data && _info ) ) return;

                var _frm = $( 'form.' + _info ), _ins;
                if( !_frm.length ) return;
                _ins = JC.BaseMVC.getInstance( _frm, Bizs.FormLogic );
                if( !_ins ) return;

                _ins.trigger( Bizs.FormLogic.Model.AJAX_DONE, [ _data ] );
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
                        _p._frame = $( JC.f.printf( 'iframe[name={0}]', _p.selector().attr('target') ) );
                    }
                    
                    if( !( _p._frame && _p._frame.length ) ) {
                        _p.selector().prop( 'target', _p.frameId() );
                        _p._frame = $( JC.f.printf( FormLogic.frameTpl, _p.frameId() ) );
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
                return JC.f.urlDetect( _r );
            }
        , formSubmitDisable:
            function(){
                var _p = this, _r = FormLogic.submitDisable
                    , _btn = _p.selector().data( FormLogic.Model.GENERIC_SUBMIT_BUTTON )
                    ;

                _p.selector().is('[formSubmitDisable]')
                    && ( _r = JC.f.parseBool( _p.selector().attr('formSubmitDisable') ) );

                _btn 
                    && _btn.is('[formSubmitDisable]')
                    && ( _r = JC.f.parseBool( _btn.attr('formSubmitDisable') ) );

                return _r;
            }
        , formResetAfterSubmit:
            function(){
                var _p = this, _r = FormLogic.resetAfterSubmit;

                _p.selector().is('[formResetAfterSubmit]')
                    && ( _r = JC.f.parseBool( _p.selector().attr('formResetAfterSubmit') ) );
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
                        _url = _url || _p._model.formAjaxDoneAction();
                        if( _url ){
                            try{_url = decodeURIComponent( _url ); } catch(ex){}
                            /^URL/.test( _url) && ( _url = JC.f.urlDetect( _url ) );
                            JC.f.reloadPage( _url );
                        }
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

                return JC.f.urlDetect( _r );
            }
        , formBeforeProcess: function(){ return this.callbackProp( 'formBeforeProcess' ); }
        , formAfterProcess: function(){ return this.callbackProp( 'formAfterProcess' ); }
        , formBeforeSubmit: function(){ return this.callbackProp( 'formBeforeSubmit' ); }
        , formProcessError: 
            function(){ 
                var _r = this.callbackProp( 'formProcessError' ) || FormLogic.processErrorCb;
                return _r;
            }

        , formResetCallback: function(){ return this.callbackProp( 'formResetCallback'); }

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

                return JC.f.urlDetect( _r );
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

        , datavalidFormLogicMsg:
            function( _item ){
                var _msg = "需要AJAX验证后才能提交, 请重试...";
                _msg = $( _item ).attr( 'datavalidFormLogicMsg' ) || _msg;
                return _msg;
            }

    });

    JC.f.extendObject( FormLogic.View.prototype, {
        initQueryVal:
            function(){
                var _p = this;
                if( _p._model.formType() != FormLogic.Model.GET ) return;

                JC.FormFillUrl && JC.FormFillUrl.init( _p._model.selector() );
            }
        , reset:
            function( _btn ){
                var _p = this, _resetUrl = _p._model.formResetUrl();

                _resetUrl && JC.f.reloadPage( _resetUrl );

                _p._model.resetTimeout && clearTimeout( _p._model.resetTimeout );
                _p._model.resetTimeout =
                    setTimeout(function(){
                        var _form = _p._model.selector();

                        _form.find('input[type=text], input[type=password], input[type=file], textarea').each( function(){
                            if( $( this ).attr( 'ignoreResetClear' ) ) return;
                            $( this ).val( '' );
                        });
                        _form.find('select').each( function() {
                            if( $( this ).attr( 'ignoreResetClear' ) ) return;
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
        , dataValidError:
            function(){
                var _p = this;
                $.each( this._model.dataValidItems(), function( _ix, _item ){
                    var _v = _item.val().trim(), _status = _item.attr('datavalid');
                    if( !( _v && _status ) ) return;

                    if( JC.f.parseBool( _status ) ) return;

                    if( _p._model.showDataValidError( _item ) ){
                        //JC.msgbox( _p._model.datavalidFormLogicMsg( _item ), _item, 2 );
                        JC.Dialog.msgbox( _p._model.datavalidFormLogicMsg( _item ), 2 );

                        JC.f.safeTimeout( function(){
                            _item.trigger( 'blur' );
                        }, _item, 'FORMLOGIC_DATAVALID', 10 );
                    }
                    return false;
                });
            }

    });

    $(document).delegate( 'input[formSubmitConfirm], button[formSubmitConfirm]', 'click', function( _evt ){
        var _p = $(this)
            , _fm = JC.f.getJqParent( _p, 'form' )
            , _ins = FormLogic.getInstance( _fm )
            , _tmp 
            ;
        if( _fm && _fm.length ){
            if( _ins ){
                _fm.data( FormLogic.Model.SUBMIT_CONFIRM_BUTTON, null )
                if( _p.is('[formConfirmCheckSelector]') ){
                    _tmp = JC.f.parentSelector( _p, _p.attr('formConfirmCheckSelector') );
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
        var _p = $(this), _fm = JC.f.getJqParent( _p, 'form' );
        _fm && _fm.length 
            && _fm.data( FormLogic.Model.RESET_CONFIRM_BUTTON, _p )
            ;
    });

    $(document).delegate( 'input[type=reset], button[type=reset]', 'click', function( _evt ){
        var _p = $(this), _fm = JC.f.getJqParent( _p, 'form' );
        _fm && _fm.length 
            && _fm.data( FormLogic.Model.GENERIC_RESET_BUTTON , _p )
            ;
    });

    $(document).delegate( 'input[type=submit], button[type=submit]', 'click', function( _evt ){
        var _p = $(this), _fm = JC.f.getJqParent( _p, 'form' );
        _fm && _fm.length 
            && _fm.data( FormLogic.Model.GENERIC_SUBMIT_BUTTON , _p )
            ;
    });

    $(document).delegate( 'input[buttonClickBindSelector], button[buttonClickBindSelector]', 'click', function( _evt ){
        var _p = $(this), _target = JC.f.parentSelector( _p, _p.attr('buttonClickBindSelector') );
        if( !( _target && _target.length ) ) return;
        _target.val( _p.val() || '' );
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
        _url = JC.f.urlDetect( _url );

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
                JC.f.reloadPage( _url );
            });
        }else{
            JC.f.reloadPage( _url );
        }
    });

    FormLogic.frameTpl = '<iframe src="about:blank" id="{0}" name="{0}" frameborder="0" class="BFLIframe" style="display:none;"></iframe>';

    $(document).ready( function(){
        setTimeout( function(){
            FormLogic.autoInit && FormLogic.init( $(document) );
        }, 1 );
    });

    return Bizs.FormLogic;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
