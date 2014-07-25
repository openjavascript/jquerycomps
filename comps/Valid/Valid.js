//TODO: 错误提示 不占用页面宽高, 使用 position = absolute,  date = 2013-08-03
//TODO: checkbox, radio 错误时, input 添加高亮显示
//TODO: daterange 支持一对多关系
//TODO: datavalid 添加自定义 ajax 数据 和 方法 
;(function(define, _win) { 'use strict'; define( [ 'JC.common' ], function(){
    /**
     * <b>表单验证</b> (单例模式)
     * <br />全局访问请使用 JC.Valid 或 Valid
     * <p><b>require</b>: 
     *      <a href='.jQuery.html'>jQuery</a>
     *      , <a href='JC.common.html'>JC.common</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Valid.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Valid/_demo/' target='_blank'>demo link</a></p>
     * <h2>Form 的可用 html attribute</h2>
     * <dl>
     *      <dt>errorabort = bool, default = true</dt>
     *      <dd>
     *          查检Form Control时, 如果发生错误是否继续检查下一个
     *          <br />true: 继续检查, false, 停止检查下一个
     *      </dd>
     *
     *      <dt>validmsg = bool | string</dt>
     *      <dd>
     *          内容填写正确时显示的 提示信息, class=validmsg
     *          <br />如果 = 0, false, 将不显示提示信息
     *          <br />如果 = 1, true, 将不显示提示文本
     *      </dd>
     *
     *      <dt>validemdisplaytype = string, default = inline</dt>
     *      <dd>
     *          设置 表单所有控件的 em  CSS display 显示类型
     *      </dd>
     *
     *      <dt>ignoreAutoCheckEvent = bool, default = false</dt>
     *      <dd>是否禁用 自动 check 事件( focus, blur, change )</dd>
     * </dl>
     * <h2>Form Control的可用 html attribute</h2>
     * <dl>
     *      <dt>reqmsg = 错误提示</dt>
     *      <dd>值不能为空, class=error errormsg</dd>
     *
     *      <dt>errmsg = 错误提示</dt>
     *      <dd>格式错误, 但不验证为空的值, class=error errormsg</dd>
     *
     *      <dt>focusmsg = 控件获得焦点的提示信息</dt>
     *      <dd>
     *          这个只作提示用, class=focusmsg
     *      </dd>
     *
     *      <dt>validmsg = bool | string</dt>
     *      <dd>
     *          内容填写正确时显示的 提示信息, class=validmsg
     *          <br />如果 = 0, false, 将不显示提示信息
     *          <br />如果 = 1, true, 将不显示提示文本
     *      </dd>
     *
     *      <dt>emel = selector</dt>
     *      <dd>显示错误信息的selector</dd>
     *
     *      <dt>validel = selector</dt>
     *      <dd>显示正确信息的selector</dd>
     *
     *      <dt>focusel = selector</dt>
     *      <dd>显示提示信息的selector</dd>
     *
     *      <dt>validemdisplaytype = string, default = inline</dt>
     *      <dd>
     *          设置 em 的 CSS display 显示类型
     *      </dd>
     *
     *      <dt>ignoreprocess = bool, default = false</dt>
     *      <dd>验证表单控件时, 是否忽略</dd>
     *
     *      <dt>minlength = int(最小长度)</dt>
     *      <dd>验证内容的最小长度, 但不验证为空的值</dd>
     *
     *      <dt>maxlength = int(最大长度)</dt>
     *      <dd>验证内容的最大长度, 但不验证为空的值</dd>
     *
     *      <dt>minvalue = number|ISO date(最小值)</dt>
     *      <dd>验证内容的最小值, 但不验证为空的值</dd>
     *
     *      <dt>maxvalue = number|ISO date(最大值)</dt>
     *      <dd>验证内容的最大值, 但不验证为空的值</dd>
     *
     *      <dt>validitemcallback = function</dt>
     *      <dd>
     *          对一个 control 作检查后的回调, 无论正确与否都会触发, <b>window 变量域</b>
<pre>function validItemCallback( &#95;selector, &#95;isValid ){
}</pre>
     *      </dd>
     *
     *      <dt>validHidden = bool, default = false</dt>
     *      <dd>是否验证隐藏的控件</dd>
     *
     *      <dt>rangeCanEqual = bool, default = true</dt>
     *      <dd>nrange 和 daterange 的开始值和结束值是否可以相等</dd>
     *
     *      <dt>datatype: 常用数据类型</dt>
     *      <dd><b>n:</b> 检查是否为正确的数字</dd>
     *      <dd><b>n-i.f:</b> 检查数字格式是否附件要求, i[整数位数], f[浮点数位数], n-7.2 = 0.00 ~ 9999999.99</dd>
     *      <dd>
     *          <b>nrange:</b> 检查两个control的数值范围
     *          <dl>
     *              <dd>html attr <b>fromNEl:</b> 指定开始的 control</dd>
     *              <dd>html attr <b>toNEl:</b> 指定结束的 control</dd>
     *              <dd>如果不指定 fromNEl, toNEl, 默认是从父节点下面找到 nrange, 按顺序定为 fromNEl, toNEl</dd>
     *          </dl>
     *      </dd>
     *      <dd><b>d:</b> 检查是否为正确的日期, YYYYMMDD, YYYY/MM/DD, YYYY-MM-DD, YYYY.MM.DD</dd>
     *      <dd>
     *          <b>daterange:</b> 检查两个control的日期范围
     *          <dl>
     *              <dd>html attr <b>fromDateEl:</b> 指定开始的 control</dd>
     *              <dd>html attr <b>toDateEl:</b> 指定结束的 control</dd>
     *              <dd>如果不指定 fromDateEl, toDateEl, 默认是从父节点下面找到 daterange, 按顺序定为 fromDateEl, toDateEl</dd>
     *          </dl>
     *      </dd>
     *      <dd><b>time:</b> 是否为正确的时间, hh:mm:ss</dd>
     *      <dd><b>minute:</b> 是否为正确的时间, hh:mm</dd>
     *      <dd>
     *          <b>bankcard:</b> 是否为正确的银行卡
     *          <br />格式为: 12 ~ 25 位数字
     *      </dd>
     *      <dd>
     *          <b>cnname:</b> 中文姓名
     *          <br>格式: 汉字和大小写字母
     *          <br>规则: 长度 2-32个字节, 非 ASCII 算2个字节
     *      </dd>
     *      <dd>
     *          <b>enname:</b> 英文姓名
     *          <br>格式: 大小写字母 + 空格
     *          <br>规则: 长度 2-32个字节, 非 ASCII 算2个字节
     *      </dd>
     *      <dd>
     *          <b>allname:</b> cnname | enname
     *          <br />中文姓名和英文姓名的复合验证
     *      </dd>
     *      <dd>
     *          <b>username:</b> 注册用户名
     *          <br>格式: a-zA-Z0-9_-
     *          <br>规则: 首字母必须为 [a-zA-Z0-9], 长度 2 - 30
     *      </dd>
     *      <dd><b>idnumber:</b> 身份证号码, 15~18 位</dd>
     *      <dd><b>mobilecode:</b> 手机号码, 11位, (13|14|15|16|18|19)[\d]{9}</dd>
     *      <dd><b>mobile:</b> mobilecode 的别名</dd>
     *      <dd><b>mobilezonecode:</b> 带 国家代码的手机号码, [+国家代码] [零]11位数字</dd>
     *      <dd><b>phonecode:</b> 电话号码, 7~8 位数字, [1-9][0-9]{6,7}</dd>
     *      <dd><b>phone:</b> 带区号的电话号码, [区号][空格|空白|-]7~8位电话号码</dd>
     *      <dd><b>phoneall:</b> 带国家代码, 区号, 分机号的电话号码, [+国家代码][区号][空格|空白|-]7~8位电话号码#1~6位</dd>
     *      <dd><b>phonezone:</b> 电话区号, 3~4位数字. phonezone-n,m 可指定位数长度</dd>
     *      <dd><b>phoneext:</b> 电话分机号, 1~6位数字</dd>
     *      <dd><b>countrycode:</b> 地区代码, [+]1~6位数字</dd>
     *      <dd><b>mobilephone:</b> mobilecode | phone</dd>
     *      <dd><b>mobilephoneall:</b> mobilezonecode | phoneall</dd>
     *      <dd><b>reg:</b> 自定义正则校验, /正则规则/[igm]</dd>
     *      <dd>
     *          <b>vcode:</b> 验证码, 0-9a-zA-Z, 长度 默认为4
     *          <br />可通过 vcode-[\d], 指定验证码长度
     *      </dd>
     *      <dd>
     *          <b>text:</b> 显示声明检查的内容为文本类型
     *          <br />默认就是 text, 没有特殊原因其实不用显示声明
     *      </dd>
     *      <dd>
     *          <b>bytetext:</b> 声明按字节检查文本长度
     *          <br /> ASCII 算一个字符, 非 ASCII 算两个字符
     *      </dd>
     *      <dd><b>url:</b> URL 格式, ftp, http, https</dd>
     *      <dd><b>domain:</b> 匹配域名, 宽松模式, 允许匹配 http(s), 且结尾允许匹配反斜扛(/)</dd>
     *      <dd><b>stricdomain:</b> 匹配域名, 严格模式, 不允许匹配 http(s), 且结尾不允许匹配反斜扛(/)</dd>
     *      <dd><b>email:</b> 电子邮件</dd>
     *      <dd><b>zipcode:</b> 邮政编码, 0~6位数字</dd>
     *      <dd><b>taxcode:</b> 纳税人识别号, 长度: 15, 18, 20 </dd>
     *
     *      <dd>
     *          <dl>
     *              <dt>checkbox: 默认需要至少选中N 个 checkbox</dt>
     *              <dd>
     *                  默认必须选中一个 checkbox
     *                  <br > 如果需要选中N个, 用这种格式 checkbox-n, checkbox-3 = 必须选中三个
     *                  <br > datatarget: 声明所有 checkbox 的选择器
     *              </dd>
     *          </dl>
     *      </dd>
     *
     *      <dd>
     *          <dl>
     *              <dt>file: 判断文件扩展名</dt>
     *              <dd>属性名(文件扩展名列表): fileext</dd>
     *              <dd>格式: .ext[, .ext]</dd>
     *              <dd>
<xmp>   <input type="file" 
    reqmsg="文件" 
    errmsg="允许上传的文件类型: .gif, .jpg, .jpeg, .png"
    datatype="file" 
    fileext=".gif, .jpg, .jpeg, .png" 
    />
    <label>.gif, .jpg, .jpeg, .png</label>
    <em class="error"></em>
    <em class="validmsg"></em>
</xmp>
                    </dd>
     *          </dl>
     *      </dd>
     *
     *      <dt>subdatatype: 特殊数据类型, 以逗号分隔多个属性</dt>
     *      <dd>
     *          <dl>
     *              <dt>alternative: N 个 Control 必须至少有一个非空的值</dt>
     *              <dd><b>datatarget:</b> 显式指定同一组 control, 默认在父级下查找[subdatatype=alternative]</dd>
     *              <dd><b>alternativedatatarget:</b> 与 datatarget相同, 区别是优先级高于 datatarget</dd>
     *              <dd><b>alternativemsg:</b> N 选一的错误提示</dd>
     *
     *              <dd>
     *                  <b>alternativeReqTarget:</b> 为 alternative node 指定一个不能为空的 node
     *                  <br /><b>请使用 subdatatype = reqtarget</b>, 这个附加属性将弃除
     *              </dd>
     *              <dd><b>alternativeReqmsg:</b> alternativeReqTarget 目标 node 的html属性, 错误时显示的提示信息</dd>
     *          </dl>
     *      </dd>
     *      <dd>
     *          <dl>
     *              <dt>reqtarget: 如果 selector 的值非空, 那么 datatarget 的值也不能为空</dt>
     *              <dd><b>datatarget:</b> 显式指定 目标 target</dd>
     *              <dd><b>reqTargetDatatarget:</b> 与 datatarget相同, 区别是优先级高于 datatarget</dd>
     *              <dd><b>reqtargetmsg:</b> target node 用于显示错误提示的 html 属性</dd>
     *          </dl>
     *      </dd>
     *      <dd>
     *          <dl>
     *              <dt>reconfirm: N 个 Control 的值必须保持一致</dt>
     *              <dd><b>datatarget:</b> 显式指定同一组 control, 默认在父级下查找[subdatatype=reconfirm]</dd>
     *              <dd><b>reconfirmdatatarget:</b> 与 datatarget相同, 区别是优先级高于 datatarget</dd>
     *              <dd><b>reconfirmmsg:</b> 值不一致时的错误提示</dd>
     *          </dl>
     *      </dd>
     *      <dd>
     *          <dl>
     *              <dt>unique: N 个 Control 的值必须保持唯一性, 不能有重复</dt>
     *              <dd><b>datatarget:</b> 显式指定同一组 control, 默认在父级下查找[subdatatype=unique]</dd>
     *              <dd><b>uniquedatatarget:</b> 与 datatarget相同, 区别是优先级高于 datatarget</dd>
     *              <dd><b>uniquemsg:</b> 值有重复的提示信息</dd>
     *              <dd><b>uniqueIgnoreCase:</b> 是否忽略大小写</dd>
     *              <dd><b>uniqueIgnoreEmpty:</b> 是否忽略空的值, 如果组中有空值也会被忽略</dd>
     *              <dd><b>processDisabled:</b> 是否处理 disabled 但 visible 的node</dd>
     *              <dd>unique-n 可以指定 N 个为一组的匹配, unique-2 = 2个一组, unique-3: 三个一组</dd>
     *          </dl>
     *      </dd>
     *      <dd>
     *          <dl>
     *              <dt>datavalid: 判断 control 的值是否合法( 通过HTTP请求验证 )</dt>
     *              <dd><b>datavalidMsg:</b> 值不合法时的提示信息</dd>
     *              <dd>
     *                  <b>datavalidUrl:</b> 验证内容正确与否的 url api
     *                  <p>{"errorno":0,"errmsg":""}</p>
     *                  errorno: 0( 正确 ), 非0( 错误 )
     *                  <p>datavalidurl="./data/handler.php?key={0}"</p>
     *                  {0} 代表 value
     *              </dd>
     *              <dd>
     *                  <b>datavalidCheckCallback:</b> 验证内容正确与否的回调(优先级比 datavalidUrl 高)
<pre>window.datavalidCheckCallback =
function (){
    var _r = { 'errorno': 1, errmsg:'验证码错误' }, _sp = $( this ), _v = _sp.val().trim().toLowerCase();

    if( _v && _v === window.CHECK_CODE ){
        _r.errorno = 0;
    }

    return _r;
};<pre>
     *              </dd>
     *              <dd><b>datavalidNoCache:</b> 是否禁止缓存, default = false</dd>
     *              <dd><b>datavalidAjaxType:</b> ajax 请求类型, default = get</dd>
     *              <dd><b>datavalidRequestData:</b> ajax 请求数据, json data</dd>
     *              <dd>
     *                  <b>datavalidCallback:</b> 请求 datavalidUrl 后调用的回调
<pre>function datavalidCallback( _json ){
    var _selector = $(this);
});</pre>
     *              </dd>
     *                  <b>datavalidKeyupCallback:</b> 每次 keyup 的回调
<pre>function datavalidKeyupCallback( _evt ){
    var _selector = $(this);
});</pre>
     *              </dd>
     *              <dd>
     *                  <b>datavalidUrlFilter:</b> 请求数据前对 url 进行操作的回调
<pre>function datavalidUrlFilter( _url ){
    var _selector = $(this);
    _url = JC.f.addUrlParams( _url, { 'xtest': 'customData' } );
    return _url;
});</pre>
     *              </dd>
     *          </dl>
     *      </dd>
     *      <dd>
     *          <dl>
     *              <dt>hidden: 验证隐藏域的值</dt>
     *              <dd>
     *                  有些特殊情况需要验证隐藏域的值, 请使用 subdatatype="hidden"
     *              </dd>
     *          </dl>
     *      </dd>
     * </dl>
     * @namespace JC
     * @class Valid
     * @static
     * @version     0.2,  2013-08-15(函数模式改单例模式)
     * @version     0.1,  2013-05-22
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     */
    window.JC = window.JC || {log:function(){}};
    JC.Valid = window.Valid = Valid;
    
    function Valid(){
        /**
         * 兼容函数式使用
         */
        var _args = JC.f.sliceArgs( arguments );
        if( _args.length ){
            return Valid.check.apply( null, _args );
        }

        if( Valid._instance ) return Valid._instance;
        Valid._instance = this;

        this._model = new Model();
        this._view = new View( this._model );

        this._init();
    }
    
    Valid.prototype = {
        _init:
            function(){
                var _p = this;
                $( [ this._view, this._model ] ).on(Model.BIND, function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ this._view, this._model ] ).on(Model.TRIGGER, function( _evt, _evtName ){
                    var _data = JC.f.sliceArgs( arguments ).slice(2);
                    _p.trigger( _evtName, _data );
                });

                _p.on( Model.CORRECT, function( _evt ){
                    var _data = JC.f.sliceArgs( arguments ).slice(1);
                    _p._view.valid.apply( _p._view, _data );
                });

                _p.on( Model.ERROR, function( _evt ){
                    var _data = JC.f.sliceArgs( arguments ).slice(1);
                    _p._view.error.apply( _p._view, _data );
                });

                _p.on( Model.FOCUS_MSG, function( _evt ){
                    var _data = JC.f.sliceArgs( arguments ).slice(1);
                    _p._view.focusmsg.apply( _p._view, _data );
                });

                this._view.init();

                return this;
            }    
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  ValidInstance
         * @private
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  ValidInstance
         * @private
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
        /**
         * 分析_item是否附合规则要求
         * @method  parse
         * @param   {selector}  _item 
         * @private
         */
        , parse: 
            function( _item ){
                var _p = this, _r = true, _item = $( _item );

                if( !_p._model.isAvalible( _item ) ) return _r;
                if( !_p._model.isValid( _item ) ) return _r;
                if( Valid.ignore( _item ) ) return _r;

                var _dt = _p._model.parseDatatype( _item )
                    , _nm = _item.prop('nodeName').toLowerCase();

                switch( _nm ){
                    case 'input':
                    case 'textarea':
                        {
                            ( _item.attr('type') || '' ).toLowerCase() != 'file' 
                                && _p._model.isAutoTrim( _item ) 
                                && _item.val( $.trim( _item.val() ) );
                            break;
                        }
                }

                if( !_p._model.reqmsg( _item ) ){ 
                    _item.attr( 'datatypestatus', 'false' );
                    return _r = false; 
                }

                if( !_p._model.lengthValid( _item ) ){ 
                    _item.attr( 'datatypestatus', 'false' );
                    return _r = false; 
                }

                //验证 datatype
                if( _dt && _p._model[ _dt ] && _item.val() ){
                    if( !_p._model[ _dt ]( _item ) ){ 
                        _item.attr( 'datatypestatus', 'false' );
                        return _r = false; 
                    }
                }

                _item.attr( 'datatypestatus', 'true' );

                //验证子类型
                var _subDtLs = _item.attr('subdatatype');
                if( _subDtLs ){
                    _subDtLs = _subDtLs.replace(/[\s]+/g, '').split( /[,\|]/);
                    $.each( _subDtLs, function( _ix, _sdt ){
                        _sdt = _p._model.parseSubdatatype( _sdt );
                        if( _sdt && _p._model[ _sdt ] && ( _item.val() || _sdt == 'alternative' ) ){
                            if( !_p._model[ _sdt ]( _item ) ){ 
                                _r = false; 
                                return false;
                            }
                        }
                    });
                }

                _r && _p.trigger( Model.CORRECT, _item ); 

                return _r;
            }

        , check:
            function(){
                var _p = this, _r = true, _items = JC.f.sliceArgs( arguments ), i, j;
                $.each( _items, function( _ix, _item ){
                    _item = $(_item);
                    Valid.isFormValid = false;
                    if( _p._model.isForm( _item ) ){
                        Valid.isFormValid = true;
                        var _errorabort = _p._model.isErrorAbort( _item )
                            , _isIgnoreForm = Valid.ignore( _item )
                            , tmp
                            ;
                        for( i = 0, j = _item[0].length; i < j; i++ ){
                            var _sitem = $(_item[0][i]);
                            if( !_p._model.isValid( _sitem ) ) continue;
                            if( _isIgnoreForm && ! ( _sitem.val() || '' ).trim() ) continue;
                            !_p.parse( _sitem ) && ( _r = false );
                            if( _errorabort && !_r ) break;
                        }
                    }
                    else if( Valid.isFormControl( _item ) ) {
                        if( !_p._model.isValid( _item ) ) return;
                        !_p.parse( _item ) && ( _r = false );
                    }
                    else{
                        !_p.check( _item.find( Valid._formControls ) ) && ( _r = false );
                    }
                });
                return _r;
            }
        , clearError:
            function(){
                var _items = JC.f.sliceArgs( arguments ), _p = this;
                $.each( _items, function( _ix, _item ){
                    $( _item ).each( function(){
                        var _item = $(this);
                        switch( _item.prop('nodeName').toLowerCase() ){
                            case 'form': 
                                {
                                    for( var i = 0, j = _item[0].length; i < j; i++ ){
                                        Valid.setValid( $(_item[0][i]), 1, true );
                                    }
                                    break;
                                }
                            default: Valid.setValid( _item, 1, true ); break;
                        }
                    });

                });
                return this;
            }
        , isValid: function( _selector ){ return this._model.isValid( _selector ); }
    }

    /**
     * 验证一个表单项, 如 文本框, 下拉框, 复选框, 单选框, 文本域, 隐藏域
     * @method check
     * @static
     * @param      {selector}    _item 需要验证规则正确与否的表单/表单项( <b>可同时传递多个_item</b> )
     * @example 
     *          JC.Valid.check( $( selector ) );
     *          JC.Valid.check( $( selector ), $( anotherSelector );
     *          JC.Valid.check( document.getElementById( item ) );
     *
     *          if( !JC.Valid.check( $('form') ) ){
     *              _evt.preventDefault();
     *              return false;
     *          }
     * @return    {boolean}
     */
    Valid.checkAll = Valid.check = 
        function(){ return Valid.getInstance().check.apply( Valid.getInstance(), JC.f.sliceArgs( arguments ) ); }
    /**
     * 这个方法是 <a href='JC.Valid.html#method_check'>Valid.check</a> 的别名
     * @method checkAll
     * @static
     * @param      {selector}    _item -   需要验证规则正确与否的表单/表单项
     * @see Valid.check
     */
    /**
     * 获取 Valid 的实例 ( <b>Valid 是单例模式</b> )
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {Valid instance}
     */
    Valid.getInstance = function(){ !Valid._instance && new Valid(); return Valid._instance; };
    /**
     * 检查是否需要延时 check
     * <br />以 html 属性 validCheckTimeout 定义, int 类型, type = ms
     * @method checkTimeout
     * @param   {selector}      _selector
     * @param   {int}           _tm
     * @static
     * @return  {Valid instance}
     */
    Valid.checkTimeout =
        function( _selector, _tm ){
            _selector && ( _selector = $( _selector ) );
            if( !( _selector && _selector.length ) ) return;
            _tm = parseInt( _selector.attr( 'validCheckTimeout') ) || _tm;
            var _dname = 'VALID_CHECK_TIMEOUT';
            if( _tm ){
                _selector.data( _dname ) && clearTimeout( _selector.data( _dname ) );
                _selector.data( _dname , setTimeout( function(){
                    Valid.check( _selector );
                }, _tm ));
            }else{
                Valid.check( _selector );
            }
        };
    /**
     * 判断/设置 selector 的数据是否合法
     * <br /> 通过 datavalid 属性判断
     * @method dataValid
     * @param   {selector}  _selector
     * @param   {bool}      _settter
     * @param   {bool}      _noStatus
     * @param   {string}    _customMsg
     * @static
     * @return  bool
     */
    Valid.dataValid =
        function( _selector, _settter, _noStatus, _customMsg ){
            var _r = false, _msg = 'datavalidmsg';
            _selector && ( _selector = $( _selector ) );

            if( typeof _settter != 'undefined' ){
                _r = _settter;
                _selector.attr( 'datavalid', _settter );
                if( !_noStatus ){
                    if( _settter ){
                        //Valid.setValid( _selector );
                        _selector.trigger('blur', [true]);
                    }else{
                        _customMsg && ( _msg = ' ' + _customMsg );
                        Valid.setError( _selector, _msg, true );
                    }
                }
            }else{
                if( _selector && _selector.length ){
                    _r = JC.f.parseBool( _selector.attr('datavalid') );
                }
            }

            return _r;
        };
    /**
     * 判断 selector 是否 Valid 的处理对象
     * @method  isValid
     * @param   {selector}      _selector
     * @return  bool
     * @static
     */
    Valid.isValid = function( _selector ){ return Valid.getInstance().isValid( _selector ); };
    /**
     * 提供对各种显示状态 setTimeout 执行的正确性 控制逻辑
     */
    Valid.statusTimeout = {
        valid:
            function( _selector, _tm ){
                _selector && ( _selector = $( _selector ) );
                if( !( _selector && _selector.length ) ) return;
                _selector.data( Model.TIMEOUT_VALID ) && clearTimeout( _selector.data( Model.TIMEOUT_VALID ) );
                _tm && Valid.statusTimeout.clear();
                _tm && _selector.data( Model.TIMEOUT_VALID, _tm );
            }

        , error:
            function( _selector, _tm ){
                _selector && ( _selector = $( _selector ) );
                if( !( _selector && _selector.length ) ) return;
                _selector.data( Model.TIMEOUT_ERROR ) && clearTimeout( _selector.data( Model.TIMEOUT_ERROR ) );
                _tm && Valid.statusTimeout.clear();
                _tm && _selector.data( Model.TIMEOUT_ERROR, _tm );
            }

        , focus:
            function( _selector, _tm ){
                _selector && ( _selector = $( _selector ) );
                if( !( _selector && _selector.length ) ) return;
                _selector.data( Model.TIMEOUT_FOCUS ) && clearTimeout( _selector.data( Model.TIMEOUT_FOCUS ) );
                _tm && Valid.statusTimeout.clear();
                _tm && _selector.data( Model.TIMEOUT_FOCUS, _tm );
            }

        , success:
            function( _selector, _tm ){
                _selector && ( _selector = $( _selector ) );
                if( !( _selector && _selector.length ) ) return;
                _selector.data( Model.TIMEOUT_SUCCESS ) && clearTimeout( _selector.data( Model.TIMEOUT_SUCCESS ) );
                _tm && Valid.statusTimeout.clear();
                _tm && _selector.data( Model.TIMEOUT_SUCCESS, _tm );
            }
        , clear:
            function( _selector ){
                for( var k in Valid.statusTimeout ){
                    if( k == 'clear' ) continue;
                    Valid.statusTimeout[ k ]( _selector );
                }
            }
    };
    /**
     * 把一个表单项的状态设为正确状态
     * @method  setValid
     * @param   {selector}  _items
     * @param   {int}       _tm     延时 _tm 毫秒显示处理结果, 默认=150
     * @static
     */
    Valid.setValid = function(_items, _tm, _noStyle, _isUserSet){ 
        _items = $( _items );
        _items.each( function( _ix, _item ){
            _item = $(this);
            Valid.statusTimeout.clear( _item );
            $( Valid.getInstance()._view ).trigger( 'setValid', [_item, _tm, _noStyle, _isUserSet] ); 
        });

        return Valid.getInstance();
    };
    /**
     * 把一个表单项的状态设为错误状态
     * @method  setError
     * @param   {selector}  _items
     * @param   {string}    _msgAttr    - 显示指定需要读取的错误信息属性名, 默认为 reqmsg, errmsg, 通过该属性可以指定别的属性名
     *                                    <br /> 如果 _msgAttr 的第一个字符为空格, 将视为提示信息, 并自动生成属性 autoGenerateErrorMsg
     * @param   {bool}      _fullMsg    - 显示指定错误信息为属性的值, 而不是自动添加的 请上传/选择/填写
     * @static
     */
    Valid.setError = 
        function(_items, _msgAttr, _fullMsg){ 
            _items = $(_items);

            _items.each( function( _ix, _item ){
                _item = $(this);
                Valid.statusTimeout.clear( _item );
                if( _msgAttr && _msgAttr.trim() && /^[\s]/.test( _msgAttr ) ){
                    var _autoKey = 'autoGenerateErrorMsg';
                    _item.attr( _autoKey, _msgAttr );
                    _msgAttr = _autoKey;
                }
                $( Valid.getInstance()._view ).trigger( 'setError', [ _item, _msgAttr, _fullMsg ] );
            });
            return Valid.getInstance();
        };
    /**
     * 显示 focusmsg 属性的提示信息( 如果有的话 )
     * @method  setFocusMsg
     * @param   {selector}  _items
     * @param   {bool}      _setHide
     * @param   {string}    _msgAttr    - 显示指定需要读取的focusmsg信息属性名, 默认为 focusmsg, 通过该属性可以指定别的属性名
     *                                    <br /> 如果 _msgAttr 的第一个字符为空格, 将视为提示信息, 并自动生成属性 autoGenerateFocusMsg
     * @static
     */
    Valid.focusmsg = Valid.setFocusMsg =
        function( _items, _setHide, _msgAttr ){ 
            _items = $( _items );
            _items.each( function( _ix, _item ){
                _item = $( this );
                Valid.statusTimeout.clear( _item );
                if( typeof _setHide == 'string' ){
                    _msgAttr = _setHide;
                    _setHide = false;
                }
                if( _msgAttr && _msgAttr.trim() && /^[\s]/.test( _msgAttr ) ){
                    var _autoKey = 'autoGenerateFocusMsg';
                    _item.attr( _autoKey, _msgAttr );
                    _msgAttr = _autoKey;
                }
                Valid.getInstance().trigger( Model.FOCUS_MSG, [ _item, _setHide, _msgAttr ] ); 
            });
            return Valid.getInstance();
        };
    /**
     * focus 时,是否总是显示 focusmsg 提示信息
     * @property    focusmsgEverytime
     * @type        bool
     * @default     true
     * @static
     */
    Valid.focusmsgEverytime = true;
    /**
     * 设置 em 的 css display 属性
     * @property    emDisplayType
     * @type        string
     * @default     inline
     * @static
     */
    Valid.emDisplayType = 'inline';

    /**
     * 验证正确时, 是否显示正确的样式
     * @property    showValidStatus
     * @type        bool
     * @default     false
     * @static
     */
    Valid.showValidStatus = false;
     /**
     * 清除Valid生成的错误样式
     * @method clearError
     * @static
     * @param   {form|input|textarea|select|file|password}  _selector -     需要清除错误的选择器
     * @example
     *          JC.Valid.clearError( 'form' );
     *          JC.Valid.clearError( 'input.some' );
     */
    Valid.clearError = 
        function(){ return Valid.getInstance().clearError.apply( Valid.getInstance(), JC.f.sliceArgs( arguments ) ); };
    /**
     * 验证发生错误时, 是否终止继续验证
     * <br /> 为真终止继续验证, 为假将验证表单的所有项, 默认为 false
     * @property    errorAbort
     * @type        bool
     * @default     false
     * @static
     * @example
            $(document).ready( function($evt){
                JC.Valid.errorAbort = true;
            });
     */
    Valid.errorAbort = false;
    /**
     * 是否自动清除两边的空格
     * @property    autoTrim
     * @type        bool
     * @default     true
     * @static
     * @example
            $(document).ready( function($evt){
                JC.Valid.autoTrim = false;
            });
     */
    Valid.autoTrim = true;
    /**
     * 对一个 control 作检查后的回调, 无论正确与否都会触发
     * @property    itemCallback
     * @type        function
     * @default     undefined
     * @static
     * @example
            $(document).ready( function($evt){
                JC.Valid.itemCallback =
                    function( _item, _isValid ){
                        JC.log( 'JC.Valid.itemCallback _isValid:', _isValid );
                    };
            });
     */
    Valid.itemCallback;
    /**
     * 判断 表单控件是否为忽略检查 或者 设置 表单控件是否为忽略检查
     * @method  ignore
     * @param   {selector}  _item
     * @param   {bool}      _delIgnore    是否删除忽略属性, 如果为 undefined 将不执行 添加删除操作
     * @return  bool
     * @static
     */
    Valid.ignore =
        function( _item, _delIgnore ){
            _item = $( _item );
            if( !( _item && _item.length ) ) return true;
            var _r = false;

            if( typeof _delIgnore != 'undefined' ){
                _delIgnore 
                    ? _item.removeAttr('ignoreprocess')
                    : _item.attr('ignoreprocess', true)
                    ;
                _r = !_delIgnore;
            }else{
                
                _item.is( '[ignoreprocess]' ) 
                    && (
                            ( _item.attr('ignoreprocess') || '' ).trim()
                            ? ( _r = JC.f.parseBool( _item.attr('ignoreprocess') ) )
                            : ( _r = true )
                       )
                    ;
            }
            return _r;
        };
    /**
     * 定义 form control
     * @property    _formControls
     * @param       {selector}  _selector
     * @return  bool
     * @private
     * @static
     */
    Valid._formControls = 'input, select, textarea';
    /**
     * 判断 _selector 是否为 form control
     * @method  isFormControl
     * @param   {selector}  _selector
     * @return  bool
     * @static
     */
    Valid.isFormControl =
        function( _selector ){
            var _r = false;
            _selector 
                && ( _selector = $( _selector ) ).length
                && ( _r = _selector.is( Valid._formControls ) )
                ;
            return _r;
        };
    /**
     * 是否禁用 自动 check 事件( focus, blur, change )
     * @property    ignoreAutoCheckEvent
     * @type        bool
     * @default     false
     * @static
     */
    Valid.ignoreAutoCheckEvent = false;
    
    function Model(){
        this._init();
    }

    Model.TRIGGER = 'TriggerEvent';
    Model.BIND = 'BindEvent';
    Model.ERROR = 'ValidError';
    Model.CORRECT = 'ValidCorrect';
    Model.FOCUS_MSG = 'ValidFocusMsg';

    Model.TIMEOUT_VALID = 'Valid_ValidTimeout';
    Model.TIMEOUT_ERROR = 'Valid_ErrorTimeout';
    Model.TIMEOUT_FOCUS = 'Valid_FocusTimeout';
    Model.TIMEOUT_SUCCESS = 'Valid_SuccessTimeout';

    Model.SELECTOR_ERROR = '~ em.error, ~ em.errormsg';

    Model.CSS_ERROR = 'error errormsg';

    Model.FILTER_ERROR = 'em.error em.errormsg';
    
    Model.prototype = {
        _init:
            function(){
                return this;
            }
        /**
         * 获取 _item 的检查类型
         * @method  parseDatatype
         * @private
         * @static
         * @param   {selector|string}  _item
         */
        , parseDatatype: 
            function( _item ){
                var _r = ''
                if( typeof _item == 'string' ){
                    _r = _item;
                }else{
                    _r = _item.attr('datatype') || 'text';
                }
                return _r.toLowerCase().replace(/\-.*/, '');
            }
       /**
         * 获取 _item 的检查子类型, 所有可用的检查子类型位于 _logic.subdatatype 对象
         * @method  parseSubdatatype
         * @private
         * @static
         * @param   {selector|string}  _item
         */
        , parseSubdatatype: 
            function( _item ){
                var _r = ''
                if( typeof _item == 'string' ){
                    _r = _item;
                }else{
                    _r = _item.attr('subdatatype') || '';
                }
                return _r.toLowerCase().replace(/\-.*/, '');
            }
        , isForm:
            function( _item ){
                var _r;
                _item.prop('nodeName') 
                    && _item.prop('nodeName').toLowerCase() == 'form'
                    && ( _r = true )
                    ;
                return _r;
            }
        , isErrorAbort:
            function( _item ){
                var _r = Valid.errorAbort;
                _item.is('[errorabort]') && ( _r = JC.f.parseBool( _item.attr('errorabort') ) );
                return _r;
            }
        , isValid:
            function( _item ){
                _item = $(_item);
                var _r, _tmp;
                _item.each( function(){
                    _tmp = $(this);
                    if( _tmp.is( '[datatype]' ) || _tmp.is( '[subdatatype]' ) 
                        || _tmp.is( '[minlength]' ) || _tmp.is( '[maxlength]' )  
                        || _tmp.is( '[reqmsg]' ) 
                        || _tmp.is( 'form' ) 
                    ) 
                        _r = true;
                });
                return _r;
            }
        , isAutoTrim:
            function( _item ){
                _item = $( _item );
                var _r = Valid.autoTrim, _form = JC.f.getJqParent( _item, 'form' );
                _form && _form.length && _form.is( '[validautotrim]' ) && ( _r = JC.f.parseBool( _form.attr('validautotrim') ) );
                _item.is( '[validautotrim]' ) && ( _r = JC.f.parseBool( _item.attr('validautotrim') ) );
                return _r;
            }
        , isReqmsg: function( _item ){ return _item.is('[reqmsg]'); }
        , isValidMsg: 
            function( _item ){ 
                _item = $( _item );
                var _r = Valid.showValidStatus, _form = JC.f.getJqParent( _item, 'form' );
                _form && _form.length && _form.is( '[validmsg]' ) && ( _r = JC.f.parseBool( _form.attr('validmsg') ) );
                _item.is( '[validmsg]' ) && ( _r = JC.f.parseBool( _item.attr('validmsg') ) );
                return _r;
            }
        , isAvalible: 
            function( _item ){
                return ( _item.is(':visible') || this.isValidHidden( _item ) ) && !_item.is('[disabled]');
            }

        , isValidHidden:
            function( _item ){
                var _r = false;
                _item.is( '[subdatatype]' )
                    && /hidden/i.test( _item.attr( 'subdatatype' ) ) 
                    && _item.parent().is( ':visible' )
                    && ( _r = true )
                    ;

                _item.is( '[validHidden]' ) 
                    && ( _r = JC.f.parseBool( _item.attr( 'validHidden' ) || 'false' ) )
                    ;

                return _r;
            }
        , validitemcallback: 
            function( _item ){ 
                _item = $( _item );
                var _r = Valid.itemCallback, _form = JC.f.getJqParent( _item, 'form' ), _tmp;
                _form &&_form.length 
                    && _form.is( '[validitemcallback]' ) 
                    && ( _tmp = _form.attr('validitemcallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;
                _item.is( '[validitemcallback]' ) 
                    && ( _tmp = _item.attr('validitemcallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;
                return _r;
            }
        , isMinlength: function( _item ){ return _item.is('[minlength]'); }
        , isMaxlength: function( _item ){ return _item.is('[maxlength]'); }
        , minlength: function( _item ){ return parseInt( _item.attr('minlength'), 10 ) || 0; }
        , maxlength: function( _item ){ return parseInt( _item.attr('maxlength'), 10 ) || 0; }

        , isMinvalue: function( _item ){ return _item.is('[minvalue]'); }
        , isMaxvalue: function( _item ){ return _item.is('[maxvalue]'); }

        , isDatatarget: 
            function( _item, _key ){ 
                var _r = false, _defKey = 'datatarget';
                _key 
                    && ( _key += _defKey )
                    && ( _r = _item.is( '[' + _key + ']' ) )
                    ;
                !_r && ( _r = _item.is( '[' + _defKey + ']' ) );
                return _r;
            }
        , datatarget: 
            function( _item, _key ){ 
                var _r, _defKey = 'datatarget';
                _key 
                    && ( _key += _defKey )
                    && ( _key = _item.attr( _key ) )
                    && ( _r = JC.f.parentSelector( _item, _key ) )
                    ;

                !( _r && _r.length ) && ( _r = JC.f.parentSelector( _item, _item.attr( _defKey ) ) );

                return _r;
            }

        , minvalue: 
            function( _item, _isFloat ){ 
                if( typeof _isFloat == 'string' ){
                    var _datatype = _isFloat.toLowerCase().trim();
                    switch( _datatype ){
                        default:
                            {
                                return JC.f.parseDate( _item.attr('minvalue'), _item, true );
                            }
                    }
                }else{
                    if( _isFloat ){
                        return parseFloat( _item.attr('minvalue') ) || 0; 
                    }else{
                        return parseInt( _item.attr('minvalue'), 10 ) || 0; 
                    }
                }
            }
        , maxvalue: 
            function( _item, _isFloat ){ 
                if( typeof _isFloat == 'string' ){
                    var _datatype = _isFloat.toLowerCase().trim(), _r;
                    switch( _datatype ){
                        default:
                            {
                                return JC.f.parseDate( _item.attr('maxvalue'), _item, true );
                            }
                    }
                }else{
                    if( _isFloat ){
                        return parseFloat( _item.attr('maxvalue') ) || 0; 
                    }else{
                        return parseInt( _item.attr('maxvalue'), 10 ) || 0; 
                    }

                }
            }
        /**
         * 检查内容的长度
         * @method  lengthValid
         * @private
         * @static
         * @param   {selector}  _item
         * @attr    {string}    datatype        数字类型 text|bytetext|richtext
         *
         * @attr    {integer}   minlength       内容最小长度
         * @attr    {integer}   maxlength       内容最大长度
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_name" minlength="2" maxlength="120" reqmsg="公司名称" errmsg="请检查格式,长度2-120" /> <em>公司名称描述</em>
                </div>
         */
        , lengthValid: 
            function( _item ){
                var _p = this, _r = true
                    , _item = $( _item )
                    , _dt = _p.parseDatatype( _item )
                    , _min, _max
                    , _val = $.trim( _item.val() ), _len
                    ;
                if( !_val ) return _r;

                _p.isMinlength( _item ) && ( _min = _p.minlength( _item ) );
                _p.isMaxlength( _item ) && ( _max = _p.maxlength( _item ) );
                /**
                 * 根据特殊的 datatype 实现不同的计算方法
                 */
                switch( _dt ){
                    case 'bytetext':
                        {
                            _len = _p.bytelen( _val );
                            break;
                        }
                    case 'richtext':
                    default:
                        {
                            _len = _val.length;
                            break;
                        }
                }

                _min && ( _len < _min ) && ( _r = false );
                _max && ( _len > _max ) && ( _r = false );

                //JC.log( 'lengthValid: ', _min, _max, _r, _val.length );

                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );

                return _r;
            }
        /**
         * 检查是否为正确的数字<br />
         * <br>默认范围 0 - Math.pow(10, 10)
         * @method  n
         * @private
         * @static
         * @param   {selector}  _item
         * @attr    {require}               datatype    - n | n-整数位数.小数位数
         * @attr    {integer|optional}      minvalue    - 数值的下限
         * @attr    {integer|optional}      maxvalue    - 数值的上限
         *
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_n" errmsg="请填写正确的正整数" datatype="n" >
                </div>
                <div class="f-l">
                    <input type="TEXT" name="company_n1" errmsg="请填写正确的数字, 范围1-100" datatype="n" minvalue="1", maxvalue="100" >
                </div>
                <div class="f-l">
                    <input type="TEXT" name="company_n2" errmsg="请填写正确的数字" datatype="n-7.2" >
                </div>
         *
         */
        , n: 
            function( _item, _noError ){
                var _p = this, _r = true
                    , _valStr = _item.val().trim()
                    , _val = +_valStr
                    ,_min = 0
                    , _pow = 10
                    , _max = Math.pow( 10, _pow )
                    , _n, _f, _tmp;

                _p.isMinvalue( _item ) && ( _min = _p.minvalue( _item, /\./.test( _item.attr('minvalue') ) ) || _min );

                if( /^[0]+$/.test( _valStr ) && _valStr.length > 1 ){
                    _r = false;
                }

                if( _r && !isNaN( _val ) && _val >= _min ){
                    _item.attr('datatype').replace( /^n[^\-]*\-(.*)$/, function( $0, $1 ){
                        _tmp = $1.split('.');
                        _n = parseInt( _tmp[0] );
                        _f = parseInt( _tmp[1] );
                        _n > _pow && ( _max = Math.pow( 10, _n ) );
                    });


                    //_p.isMaxvalue( _item ) && ( _max = _p.maxvalue( _item, /\./.test( _item.attr('maxvalue') ) ) || _max );
                    _p.isMaxvalue( _item ) && ( _max = _p.maxvalue( _item, /\./.test( _item.attr('maxvalue') ) ) );

                    if( _val >= _min && _val <= _max ){
                        typeof _n != 'undefined' 
                            && typeof _f != 'undefined' 
                            && ( _r = new RegExp( '^(?:\-|)(?:[\\d]{0,'+_n+'}|)(?:\\.[\\d]{1,'+_f+'}|)$' ).test( _valStr ) );

                        typeof _n != 'undefined' 
                            && typeof _f == 'undefined' 
                            && ( _r = new RegExp( '^(?:\-|)[\\d]{1,'+_n+'}$' ).test( _valStr ) );

                        typeof _n == 'undefined' 
                            && typeof _f != 'undefined' 
                            && ( _r = new RegExp( '^(?:\-|)\\.[\\d]{1,'+_f+'}$' ).test( _valStr ) );

                        typeof _f == 'undefined' && /\./.test( _valStr ) && ( _r = false );
                    } else _r = false;

                    //JC.log( 'n', _val, typeof _n, typeof _f, typeof _min, typeof _max, _min, _max );
                }else _r = false;

                !_r && !_noError && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );

                return _r;
            }
        /**
         * 检查两个输入框的数值
         * <br /> 数字格式为 0-pow(10,10)
         * <br /> 带小数点使用 nrange-int.float, 例: nrange-1.2  nrange-2.2
         * <br /> <b>注意:</b> 如果不显示指定 fromNEl, toNEl, 
         *              将会从父级查找 datatype=nrange属性的input, 如果数量等于2, 则会进行验证, 不等2将忽略
         * @method  nrange
         * @private
         * @static
         * @param   {selector}  _item
         * @attr    {require}               datatype    - nrange
         * @attr    {selector|optional}     fromNEl     - 起始数值选择器
         * @attr    {selector|optional}     toNEl       - 结束数值选择器
         * @attr    {date string|optional}  minvalue    - 数值的下限
         * @attr    {date string|optional}  maxvalue    - 数值的上限
         * @example
            <div class="f-l label">
                <label>(datatype nrange)正数:<br/><b style="color:red">注意: 这个是大小颠倒位置的nrange</b></label>
                大<input type="text" name="company_n10" id="company_n10" fromNEl="company_n11"
                    errmsg="请填写正确的数值范围" datatype="nrange" emEl="nrange_n1011" >
                - 小<input type="text" name="company_n11" id="company_n11" toNEl="company_n10"
                    errmsg="请填写正确的数值范围" datatype="nrange" emEl="nrange_n1011" >
                <em id="nrange_n1011"></em>
            </div>
         */
        , nrange:
            function( _item ){
                var _p = this, _r = _p.n( _item ), _min, _max, _fromNEl, _toNEl, _items, _tmp;

                if( _r ){
                    if( _item.is( '[fromNEl]' ) ) {
                        _fromNEl = _p.getElement( _item.attr('fromNEl'), _item );
                        _toNEl = _item;
                    }
                    if( _item.is( '[toNEl]' ) ){
                        _fromNEl = _item;
                        _toNEl = _p.getElement( _item.attr('toNEl'), _item );
                    }

                    if( !(_fromNEl && _fromNEl.length || _toNEl && _toNEl.length) ){
                        _items = _p.sametypeitems( _item );
                        if( _items.length >= 2 ){
                            _fromNEl = $(_items[0]);
                            _toNEl = $(_items[1]);
                        }
                    }
                    if( _fromNEl && _fromNEl.length || _toNEl && _toNEl.length ){

                        //JC.log( 'nrange', _fromNEl.length, _toNEl.length );

                        _toNEl.val( $.trim( _toNEl.val() ) );
                        _fromNEl.val( $.trim( _fromNEl.val() ) );
                        
                        if( _toNEl[0] != _fromNEl[0] && _toNEl.val().length && _fromNEl.val().length ){

                            _r && ( _r = _p.n( _toNEl, true ) );
                            _r && ( _r = _p.n( _fromNEl, true ) );

                            _r && ( +_fromNEl.val() ) > ( +_toNEl.val() ) && ( _r = false );

                            _r && ( _tmp = _fromNEl.attr( 'rangeCanEqual' ) || _toNEl.attr( 'rangeCanEqual' ) )
                                && !JC.f.parseBool( _tmp )
                                && ( JC.f.parseFinance( _fromNEl.val(), 10 ) === JC.f.parseFinance( _toNEl.val(), 10 ) )
                                && ( _r = false );
                                ;
                            //JC.log( 'nrange:', +_fromNEl.val(), +_toNEl.val(), _r );

                            _r && $(_p).trigger( Model.TRIGGER, [ Model.CORRECT, _fromNEl ] );
                            _r && $(_p).trigger( Model.TRIGGER, [ Model.CORRECT, _toNEl ] );

                            !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _fromNEl ] );
                            !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _toNEl ] );
                            return _r;
                        }
                    }
                }

                return _r;
            }

        /**
         * 检查是否为合法的日期,
         * <br />日期格式为 YYYYMMDD, YYYY/MM/DD, YYYY-MM-DD, YYYY.MM.DD
         * @method  d
         * @private
         * @static
         * @param   {selector}  _item
         * @attr    {require}               datatype    - d
         * @attr    {date string|optional}  minvalue    - 日期的下限
         * @attr    {date string|optional}  maxvalue    - 日期的上限
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_d" errmsg="请填写正确的日期范围2013-05-01 - 2013-05-31" datatype="daterange" minvalue="2013-05-01" maxvalue="2013-05-31" >
                </div>
         */
        , 'd': 
            function( _item, _noError ){
                var _p = this, _val = $.trim( _item.val() ), _r = true
                    , _date = JC.f.parseDate( _val, _item ), _tmpDate;
                    
                if( _val && _date ){


                    if( _p.isMinvalue( _item ) && ( _tmpDate = _p.minvalue( _item, 'd' ) ) ){
                        _date.getTime() < _tmpDate.getTime() && ( _r = false );
                    }

                    if( _r && _p.isMaxvalue( _item ) && ( _tmpDate = _p.maxvalue( _item, 'd' ) ) ){
                        _date.getTime() > _tmpDate.getTime() && ( _r = false );
                    }
                }else if( _val ){
                    _r = false;
                }

                !_r && !_noError && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );

                return _r;
            }
        , 'date': function(){ return this.d.apply( this, JC.f.sliceArgs( arguments ) ); }
        , 'ddate': function(){ return this.d.apply( this, JC.f.sliceArgs( arguments ) ); }

        /**
         * 检查两个输入框的日期
         * <br />日期格式为 YYYYMMDD, YYYY/MM/DD, YYYY-MM-DD, YYYY.MM.DD
         * <br /> <b>注意:</b> 如果不显示指定 fromDateEl, toDateEl, 
         *              将会从父级查找 datatype=daterange属性的input, 如果数量等于2, 则会进行验证, 不等2将忽略
         * @method  daterange
         * @private
         * @static
         * @param   {selector}  _item
         * @attr    {require}               datatype    - daterange
         * @attr    {selector|optional}     fromDateEl  - 起始日期选择器
         * @attr    {selector|optional}     toDateEl    - 结束日期选择器
         * @attr    {date string|optional}  minvalue    - 日期的下限
         * @attr    {date string|optional}  maxvalue    - 日期的上限
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_daterange" errmsg="请填写正确的日期范围,并且起始日期不能大于结束日期" id="start_date" 
                        datatype="daterange" toDateEl="end_date" emEl="date-err-em" >
                    - <input type="TEXT" name="company_daterange" errmsg="请填写正确的日期范围,并且起始日期不能大于结束日期" id="end_date" 
                        datatype="daterange" fromDateEl="start_date" emEl="date-err-em" >
                    <br /><em id="date-err-em"></em>
                </div>
         */
        , daterange:
            function( _item ){
                var _p = this, _r = _p.d( _item ), _min, _max, _fromDateEl, _toDateEl, _items, _tmp;

                if( _r ){
                    if( _item.is( '[fromDateEl]' ) ) {
                        _fromDateEl = _p.getElement( _item.attr('fromDateEl'), _item );
                        _toDateEl = _item;
                    }
                    if( _item.is( '[toDateEl]' ) ){
                        _fromDateEl = _item;
                        _toDateEl = _p.getElement( _item.attr('toDateEl'), _item );
                    }

                    if( !(_fromDateEl && _fromDateEl.length && _toDateEl && _toDateEl.length) ){
                        _items = _p.sametypeitems( _item );
                        if( _items.length >= 2 ){
                            _fromDateEl = $(_items[0]);
                            _toDateEl = $(_items[1]);
                        }
                    }
                    if( _fromDateEl && _fromDateEl.length || _toDateEl && _toDateEl.length ){

                        //JC.log( 'daterange', _fromDateEl.length, _toDateEl.length );

                        _toDateEl.val( $.trim( _toDateEl.val() ) );
                        _fromDateEl.val( $.trim( _fromDateEl.val() ) );

                        if( _toDateEl[0] != _fromDateEl[0] && _toDateEl.val().length && _fromDateEl.val().length ){

                            _r && ( _r = _p.d( _toDateEl, true ) ) && ( _min = JC.f.parseDate( _fromDateEl.val(), _fromDateEl ) );
                            _r && ( _r = _p.d( _fromDateEl, true ) ) && ( _max = JC.f.parseDate( _toDateEl.val(), _toDateEl ) );

                            _r && _min && _max 
                               && _min.getTime() > _max.getTime() 
                               && ( _r = false );

                            _r && ( _tmp = _fromDateEl.attr( 'rangeCanEqual' ) || _toDateEl.attr( 'rangeCanEqual' ) )
                                && !JC.f.parseBool( _tmp )
                                && _min && _max
                                && _min.getTime() == _max.getTime()
                                && ( _r = false );
                                ;

                            _r && $(_p).trigger( Model.TRIGGER, [ Model.CORRECT, _fromDateEl ] );
                            _r && $(_p).trigger( Model.TRIGGER, [ Model.CORRECT, _toDateEl ] );

                            !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _fromDateEl ] );
                            !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _toDateEl ] );
                        }
                    }
                }

                return _r;
            }
        , 'drange': function(){ return this.daterange.apply( this, JC.f.sliceArgs( arguments ) ); }
        /**
         * 检查时间格式, 格式为 hh:mm:ss
         * @method  time
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_time" errmsg="正确的时间, 格式为 hh:mm:ss" datatype="time" >
                </div>
         */
        , time: 
            function( _item ){
                var _p = this, _r = /^(([0-1]\d)|(2[0-3])):[0-5]\d:[0-5]\d$/.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查时间格式, 格式为 hh:mm
         * @method  minute
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_time" errmsg="正确的时间, 格式为 hh:mm" datatype="minute" >
                </div>
         */
        , minute: 
            function( _item ){
                var _p = this, _r = /^(([0-1]\d)|(2[0-3])):[0-5]\d$/.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查银行卡号码
         * <br />格式为: d{15}, d{16}, d{17}, d{19}
         * @method  bankcard
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_idnumber" 
                        datatype="idnumber" errmsg="请填写正确的身份证号码">
                </div>
         */
        , bankcard:
            function( _item ){
                var _p = this
                    , _v = _item.val().trim().replace(/[\s]+/g, ' ')
                    ;
                     _item.val( _v );
                var _dig = _v.replace( /[^\d]/g, '' )
                    , _r = /^[0-9](?:[\d]{24}|[\d]{23}|[\d]{22}|[\d]{21}|[\d]{20}|[\d]{19}|[\d]{18}|[\d]{17}|[\d]{16}|[\d]{15}|[\d]{14}|[\d]{13}|[\d]{12}|[\d]{11}|)$/.test( _dig )
                    ;
                    /^[0]+$/.test( _dig ) && ( _r = false );
                    !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查中文姓名
         * <br>格式: 汉字和大小写字母
         * <br>规则: 长度 2-32个字节, 非 ASCII 算2个字节
         * @method  cnname
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_cnname" 
                        datatype="cnname" reqmsg="姓名" errmsg="请填写正确的姓名">
                </div>
         */
        , cnname:
            function( _item, _noStatus ){
                var _p = this
                    , _r = _p.bytelen( _item.val() ) <= 32 && /^[\u4e00-\u9fa5a-zA-Z.\u3002\u2022]{2,32}$/.test( _item.val() );
                !_noStatus && !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查英文
         * <br>格式: 大小写字母 + 空格
         * <br>规则: 长度 2-32个字节, 非 ASCII 算2个字节
         * @method  enname
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_enname" 
                        datatype="enname" reqmsg="姓名" errmsg="请填写正确的姓名">
                </div>
         */
        , enname:
            function( _item, _noStatus ){
                var _p = this
                    , _r = _p.bytelen( _item.val() ) <= 32 && /^[a-zA-Z ]{2,32}$/.test( _item.val() );
                !_noStatus && !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查 英文名称/中文名称
         * <br>allname = cnname + enname
         * <br>规则: 长度 2-32个字节, 非 ASCII 算2个字节
         * @method  allname
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_allname" 
                        datatype="allname" reqmsg="姓名" errmsg="请填写正确的姓名">
                </div>
         */
        , allname:
            function( _item ){
                var _p = this
                    , _r = _p.bytelen( _item.val() ) <= 32 
                        && ( _p.cnname( _item, true ) || _p.enname( _item, true ) )
                    ;
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查注册用户名
         * <br>格式: a-zA-Z0-9_-
         * <br>规则: 首字母必须为 [a-zA-Z0-9], 长度 2 - 30
         * @method  username
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_username" 
                        datatype="username" reqmsg="用户名" errmsg="请填写正确的用户名">
                </div>
         */
        , username:
            function( _item ){
                var _p = this, _r = /^[a-zA-Z0-9][\w-]{2,30}$/.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查身份证号码<br />
         * 目前只使用最简单的位数判断~ 有待完善
         * @method  idnumber
         * @private
         * @static
         * @param   {selector}  _item
         * @example
            <div class="f-l">
                <input type="TEXT" name="company_idnumber" 
                    datatype="idnumber" errmsg="请填写正确的身份证号码">
            </div>
         */
        , idnumber:
            function( _item ){
                var _p = this, _r = /^[0-9]{15}(?:[0-9]{2}(?:[0-9xX])|)$/.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查手机号码<br />
         * @method  mobilecode
         * @private
         * @static
         * @param   {selector}  _item
         * @param   {bool}      _noError
         * @example
            <div class="f-l">
                <input type="TEXT" name="company_mobile" 
                    datatype="mobilecode" subdatatype="alternative" datatarget="input[name=company_phonecode]" alternativemsg=" "
                    errmsg="请填写正确的手机号码">
            </div>
         */
        , mobilecode: 
            function( _item, _noError ){
                var _p = this, _r =  /^(?:13|14|15|16|18|19)[\d]{9}$/.test( _item.val() );
                !_noError && !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查手机号码
         * <br />这个方法是 mobilecode 的别名
         * @method  mobile
         * @private
         * @static
         * @param   {selector}  _item
         * @param   {bool}      _noError
         */
        , mobile:
            function( _item, _noError ){
                return this.mobilecode( _item, _noError );
            }
        /**
         * 检查手机号码加强方法
         * <br>格式: [+国家代码] [零]11位数字
         * @method  mobilezonecode
         * @private
         * @static
         * @param   {selector}  _item
         * @param   {bool}      _noError
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_mobilezone" 
                        datatype="mobilezonecode" 
                        errmsg="请填写正确的手机号码">
                </div>
         */
        , mobilezonecode: 
            function( _item, _noError ){
                var _p = this, _r = /^(?:\+[0-9]{1,6} |)(?:0|)(?:13|14|15|16|18|19)\d{9}$/.test( _item.val() );
                !_noError && !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查电话号码
         * <br>格式: 7/8位数字
         * @method  phonecode
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div>
                    <input type='TEXT' name='company_phonecode' style="width:80px;" value='' size="8" 
                        datatype="phonecode" errmsg="请检查电话号码格式" emEl="#phone-err-em" />
                </div>
         */
        , phonecode: 
            function( _item ){
                var _p = this, _r =  /^[1-9][0-9]{6,7}$/.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查电话号码
         * <br>格式: [区号]7/8位电话号码
         * @method  phone
         * @private
         * @static
         * @param   {selector}  _item
         * @param   {bool}      _noError
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_phone" 
                        datatype="phone" 
                        errmsg="请填写正确的电话号码">
                </div>
         */
        , phone:
            function( _item, _noError ){
                var _p = this, _r = /^(?:0(?:10|2\d|[3-9]\d\d)(?: |\-|)|)[1-9][\d]{6,7}$/.test( _item.val() );
                !_noError && !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查电话号码
         * <br>格式: [+国家代码][ ][电话区号][ ]7/8位电话号码[#分机号]
         * @method  phoneall
         * @private
         * @static
         * @param   {selector}  _item
         * @param   {bool}      _noError
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_mobilezone" 
                        datatype="phoneall" 
                        errmsg="请填写正确的电话号码">
                </div>
         */
        , phoneall:
            function( _item, _noError ){
                var _p = this
                    , _r = /^(?:\+[\d]{1,6}(?: |\-)|)(?:0[\d]{2,3}(?:\-| |)|)[1-9][\d]{6,7}(?:(?: |)(?:\#|\-)[\d]{1,6}|)$/.test( _item.val() );
                !_noError && !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查电话区号
         * @method  phonezone
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div>
                    <input type='TEXT' name='company_phonezone' style="width:40px;" value='' size="4" 
                        datatype="phonezone" emEl="#phone-err-em" errmsg="请填写正确的电话区号" />
                </div>
         */
        , phonezone: 
            function( _item ){
                var _p = this, _v = _item.val().trim(), _r, _re = /^[0-9]{3,4}$/, _pattern;

                _pattern = _item.attr('datatype').split('-');
                _pattern.length > 1 && ( _re = new RegExp( '^[0-9]{' + _pattern[1] + '}$' ) );

                _r = _re.test( _v );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查电话分机号码
         * @method  phoneext
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div>
                    <input type='TEXT' name='company_phoneext' style="width:40px;" value='' size="4" 
                        datatype="phoneext" emEl="#phone-err-em" errmsg="请填写正确的分机号" />
                </div>
         */
        , phoneext: 
            function( _item ){
                var _p = this, _r =  /^[0-9]{1,6}$/.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查手机号码/电话号码
         * <br />这个方法是原有方法的混合验证 mobilecode + phone
         * @method  mobilephone
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l label">
                    <label>(datatype mobilephone, phone + mobilecode)手机号码或电话号码:</label>
                </div>
                <div class="f-l">
                    <input type="text" name="company_mobilephone" 
                        datatype="mobilephone"
                        errmsg="请填写正确的手机/电话号码">
                </div>
         */
        , mobilephone:
            function( _item ){
                var _p = this, _r = this.mobilecode( _item, true ) || this.phone( _item, true );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }

        /**
         * 检查手机号码/电话号码, 泛匹配
         * <br />这个方法是原有方法的混合验证 mobilezonecode + phoneall
         * @method  mobilephoneall
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l label">
                    <label>(datatype mobilephoneall, phoneall + mobilezonecode)手机号码或电话号码:</label>
                </div>
                <div class="f-l">
                    <input type="text" name="company_mobilephoneall" 
                        datatype="mobilephoneall"
                        errmsg="请填写正确的手机/电话号码">
                </div>
         */
        , mobilephoneall:
            function( _item ){
                var _p = this, _r = this.mobilezonecode( _item, true ) || this.phoneall( _item, true );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 自定义正则校验
         * @method  reg
         * @private
         * @static
         * @param   {selector}  _item
         * @attr    {string}    reg-pattern     正则规则 /规则/选项
         * @example
                    <div><input type="TEXT" name="company_addr" datatype="reg" reg-pattern="/^[\s\S]{2,120}$/i" errmsg="请填写正确的地址"></div>
                    <div><input type="TEXT" name="company_addr" datatype="reg-/^[\s\S]{2,120}$/i" errmsg="请填写正确的地址"></div>
         */
        , reg: 
            function( _item ){
                var _p = this, _r = true, _pattern;
                if( _item.is( '[reg-pattern]' ) ) _pattern = _item.attr( 'reg-pattern' );
                if( !_pattern ) _pattern = $.trim(_item.attr('datatype')).replace(/^reg(?:\-|)/i, '');

                _pattern.replace( /^\/([\s\S]*)\/([\w]{0,3})$/, function( $0, $1, $2 ){
                    //JC.log( $1, $2 );
                    _r = new RegExp( $1, $2 || '' ).test( _item.val() );
                });

                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );

                return _r;
            }
        /**
         * 检查验证码<br />
         * 格式: 为 0-9a-zA-Z, 长度 默认为4
         * @method  vcode
         * @private
         * @static
         * @param   {selector}  _item
         * @attr    {string}    datatype    vcode|vcode-[\d]+
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_vcode" style="width: 40px;"
                        datatype="vcode" reqmsg="验证码" errmsg="请填写正确的验证码">
                </div>
                <div class="f-l">
                    <input type="TEXT" name="company_vcode" style="width: 40px;"
                        datatype="vcode-5" errmsg="请填写正确的验证码">
                </div>
         */
        , vcode:
            function( _item ){
                var _p = this, _r, _len = parseInt( $.trim(_item.attr('datatype')).replace( /^vcode(?:\-|)/i, '' ), 10 ) || 4; 
                //JC.log( 'vcodeValid: ' + _len );
                _r = new RegExp( '^[0-9a-zA-Z]{'+_len+'}$' ).test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查文本长度
         * @method  text
         * @private
         * @static
         * @see length
         * @attr    {string}    datatype    text
         */
        , text: function(_item){ return true; }
        /**
         * 检查文本的字节长度
         * @method  bytetext
         * @private
         * @static
         * @see length
         * @attr    {string}    datatype    bytetext
         */
        , bytetext: function(_item){ return true; }
        /**
         * 检查富文本的字节
         * <br />TODO: 完成富文本长度检查
         * @method  richtext
         * @private
         * @static
         * @see length
         * @attr    {string}    datatype    richtext
         */
        , richtext: function(_item){ return true; }
        /**
         * 计算字符串的字节长度, 非 ASCII 0-255的字符视为两个字节
         * @method  bytelen
         * @private
         * @static
         * @param   {string}    _s
         */
        , bytelen: 
            function( _s ){
                return _s.replace(/[^\x00-\xff]/g,"11").length;
            }
        /**
         * 检查URL
         * @method  url
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_url" datatype="url" errmsg="请填写正确的网址">
                </div>
         */
        , url: 
            function( _item ){
                var _p = this
                    //, _r = /^((http|ftp|https):\/\/|)[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])$/.test( _item.val() )
                    //, _r = /^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})(?:\/[\w\/\.\#\+\-\~\%\?\_\=\&]*|)$/i.test( _item.val() )
                    , _r = /^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})(?:\/[^\s<>]*|)$/i.test( _item.val() )
                    ;
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查域名
         * @method  domain
         * @private
         * @static
         * @param   {selector}  _item
                <div class="f-l">
                    <input type="TEXT" name="company_domain" datatype="domain" reqmsg="域名" errmsg="请填写正确的域名">
                </div>
         */
        , domain:
            function( _item ){
                //var _r = /^(?:(?:f|ht)tp\:\/\/|)((?:(?:(?:\w[\.\-\+]?)*)\w)*)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})(?:\/|)$/.test( _item.val() );
                var _p = this
                    , _r = /^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})(?:\/|)$/i.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查域名
         * @method  stricdomain
         * @private
         * @static
         * @param   {selector}  _item
                <div class="f-l">
                    <input type="TEXT" name="company_domain" datatype="stricdomain" reqmsg="域名" errmsg="请填写正确的域名">
                </div>
         */
        , stricdomain:
            function( _item ){
                var _p = this
                    , _r = /^((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})$/i.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查电子邮件
         * @method  email
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_email" datatype="email" reqmsg="邮箱" errmsg="请填写正确的邮箱">
                </div>
         */
        , email: 
            function( _item ){
                var _p = this, _r = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查地区代码
         * @method  countrycode
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_countrycode" datatype="countrycode" errmsg="请填写正确的地区代码">
                </div>
         */
        , countrycode: 
            function( _item ){
                var _p = this, _v = _item.val().trim(), _r = /^(?:\+|)[\d]{1,6}$/.test( _v );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 检查邮政编码
         * @method  zipcode
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_zipcode" datatype="zipcode" errmsg="请填写正确的邮编">
                </div>
         */
        , zipcode: 
            function( _item ){
                var _p = this, _r = /^[0-9]{6}$/.test( _item.val() );
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 纳税人识别号, 15, 18, 20位字符
         * @method  taxcode
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="" datatype="taxcode" errmsg="请填空正确的纳税人识别号">
                </div>
         */
        , taxcode: 
            function( _item ){
                var _p = this, _r = false, _v = _item.val().trim();
                _r = /^[\w]{15}$/.test( _v ) 
                    || /^[\w]{18}$/.test( _v ) 
                    || /^[\w]{20}$/.test( _v ) 
                    ;
                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        /**
         * 此类型检查 2|N 个对象填写的值必须一致
         * 常用于注意时密码验证/重置密码
         * @method  reconfirm
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <dd>
                <div class="f-l label">
                    <label>(datatype text, subdatatype reconfirm)用户密码:</label>
                </div>
                <div class="f-l">
                    <input type="PASSWORD" name="company_pwd" 
                    datatype="text" subdatatype="reconfirm" datatarget="input[name=company_repwd]" reconfirmmsg="用户密码和确认密码不一致"
                    minlength="6" maxlength="15" reqmsg="用户密码" errmsg="请填写正确的用户密码">
                </div>
                </dd>

                <dd>
                <div class="f-l label">
                    <label>(datatype text, subdatatype reconfirm)确认密码:</label>
                </div>
                <div class="f-l">
                    <input type="PASSWORD" name="company_repwd" 
                    datatype="text" subdatatype="reconfirm" datatarget="input[name=company_pwd]" reconfirmmsg="确认密码和用户密码不一致"
                    minlength="6" maxlength="15" reqmsg="确认密码" errmsg="请填写正确的确认密码">
                </div>
                </dd>
         */
        , reconfirm:
            function( _item ){
                var _p = this
                    , _r = true
                    , _target
                    , _KEY = "ReconfirmValidTime"
                    , _typeKey = 'reconfirm'
                    ;
                //JC.log( _typeKey, new Date().getTime() );

                _p.isDatatarget( _item, _typeKey ) && (_target = _p.datatarget( _item, _typeKey ) );
                !( _target && _target.length ) && ( _target = _p.samesubtypeitems( _item, _typeKey ) );

                var _isReturn = false;

                if( _target && _target.length ){
                    _target.each( function(){ 
                        var _sp = $(this);
                        if( _p.checkRepeatProcess( _sp, _KEY, true ) ) {
                            _isReturn = true;
                        }

                        if( _item.val() != $(this).val() )  _r = false; 
                    } );
                }

                !_r && _target.length && _target.each( function(){ 
                    if( _item[0] == this ) return;
                    $(_p).trigger( Model.TRIGGER, [ Model.ERROR, $(this), 'reconfirmmsg', true ] );
                } );

                if( _r && _target && _target.length ){
                    _target.each( function(){
                        if( _item[0] == this ) return;
                        if( _isReturn ) return false;
                        $(_p).trigger( Model.TRIGGER, [ Model.CORRECT, $(this) ] );
                    });
                }
                _r 
                    ?  $(_p).trigger( Model.TRIGGER, [ Model.CORRECT, _item ] )
                    :  $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item, 'reconfirmmsg', true ] )
                    ;
                return _r;
            }
        , checkRepeatProcess:
            function( _item, _key, _setTime, _tm  ){
                var _time = new Date().getTime(), _r = false;
                _tm = _tm || 200;

                if( _item.data( _key ) ){
                    if( (_time - _item.data( _key ) ) < _tm ){
                        _r = true;
                        _item.data( _key, _time );
                    }
                }
                _setTime && _item.data( _key, _time );
                return _r;
            }
        /**
         * 此类型检查 2|N个对象必须至少有一个是有输入内容的, 
         * <br> 常用于 手机/电话 二填一
         * @method  alternative
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <dd>
                <div class="f-l label">
                    <label>(datatype phonezone, phonecode, phoneext)电话号码:</label>
                </div>
                <div class="f-l">
                    <input type='TEXT' name='company_phonezone' style="width:40px;" value='' size="4" 
                        datatype="phonezone" emEl="#phone-err-em" errmsg="请填写正确的电话区号" />
                    - <input type='TEXT' name='company_phonecode' style="width:80px;" value='' size="8" 
                        datatype="phonecode" subdatatype="alternative" datatarget="input[name=company_mobile]" alternativemsg="电话号码和手机号码至少填写一个"
                        errmsg="请检查电话号码格式" emEl="#phone-err-em" />
                    - <input type='TEXT' name='company_phoneext' style="width:40px;" value='' size="4" 
                        datatype="phoneext" emEl="#phone-err-em" errmsg="请填写正确的分机号" />
                    <em id="phone-err-em"></em>
                </div>
                </dd>

                <dd>
                <div class="f-l label">
                    <label>(datatype mobilecode)手机号码:</label>
                </div>
                <div class="f-l">
                    <input type="TEXT" name="company_mobile" 
                        datatype="mobilecode" subdatatype="alternative" datatarget="input[name=company_phonecode]" alternativemsg=" "
                        errmsg="请填写正确的手机号码">
                </div>
                </dd>
         */
        , alternative:
            function( _item ){
                var _p = this
                    , _r = true
                    , _target
                    , _KEY = "AlternativeValidTime"
                    , _dt = _p.parseDatatype( _item )
                    , _typeKey = 'alternative'
                    ;
                //JC.log( _typeKey, new Date().getTime() );

                _p.isDatatarget( _item, _typeKey ) && (_target = _p.datatarget( _item, _typeKey ) );
                !( _target && _target.length ) && ( _target = _p.samesubtypeitems( _item, _typeKey ) );

                var _isReturn = false;
                var _reqTarget;

                if( _target.length && !$.trim( _item.val() ) ){
                    var _hasVal = false;
                    _target.each( function(){ 
                        var _sp = $(this);
                        if( _item[0] == this ) return;
                        if( _p.checkRepeatProcess( _sp, _KEY, true ) ) {
                            _isReturn = true;
                        }

                        if( $(this).val() ){ 
                            _hasVal = true; return false; 
                        } 
                    } );
                    _r = _hasVal;
                }

                !_r && _target && _target.length 
                    && _target.each( function(){ 
                        if( _item[0] == this ) return;
                        if( _isReturn ) return false;
                        $(_p).trigger( Model.TRIGGER, [ Model.ERROR, $(this), 'alternativemsg', true ] );
                    });

                if( _r && _target && _target.length ){
                    _target.each( function(){
                        if( _item[0] == this ) return;
                        var _sp = $(this), _sdt = _p.parseDatatype( _sp );

                        if( _sdt && _p[ _sdt ] && $(this).val() ){
                            _p[ _sdt ]( $(this) );
                        }else if( !$(this).val() ){
                            $(_p).trigger( Model.TRIGGER, [ Model.CORRECT, $(this) ] );
                            var _reqTarget = JC.f.parentSelector( $(this), $(this).attr( 'reqtargetdatatarget' ) );
                            _reqTarget 
                                && _reqTarget.length
                                && $(_p).trigger( Model.TRIGGER, [ Model.CORRECT, _reqTarget ] )
                                ;
                        }
                    });
                }

                if( _r && _target && _target.length ){
                    var _hasReqTarget = false, _reqErrList = [];
                    _target.each( function(){
                        if( _item[0] == this ) return;
                        var _sp = $(this), _reqTarget;
                        if( _sp.is( '[alternativeReqTarget]' ) ){
                            _reqTarget = JC.f.parentSelector( _sp, _sp.attr('alternativeReqTarget') );
                            if( _reqTarget && _reqTarget.length ){
                                _reqTarget.each( function(){
                                    var _ssp = $(this), _v = _ssp.val().trim();
                                    if( !_v ){
                                        _reqErrList.push( _ssp );
                                        _hasReqTarget = true;
                                    }
                                });
                            }
                        }
                    });

                    if( _item.is( '[alternativeReqTarget]' ) ){
                        _reqTarget = JC.f.parentSelector( _item, _item.attr('alternativeReqTarget') );
                        if( _reqTarget && _reqTarget.length ){
                            _reqTarget.each( function(){
                                var _ssp = $(this), _v = _ssp.val().trim();
                                if( !_v ){
                                    _reqErrList.push( _ssp );
                                    _hasReqTarget = true;
                                }
                            });
                        }
                    }

                    //alert( _hasReqTarget + ', ' + _reqErrList.length );

                    if( _hasReqTarget && _reqErrList.length ){
                        _r = false;
                        $.each( _reqErrList, function( _ix, _sitem ){
                            _sitem = $( _sitem );
                            $( _p ).trigger( Model.TRIGGER, [ Model.ERROR, _sitem, 'alternativeReqmsg', true ] );
                        });
                        return _r;
                    }
                }

                if( _r ){
                    if( _dt && _p[ _dt ] && _item.val() ){
                        _p[ _dt ]( _item );
                    }else if( !_item.val() ){
                        $(_p).trigger( Model.TRIGGER, [ Model.CORRECT, _item ] );
                    }
                }else{
                    $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item, 'alternativemsg', true ] );
                }

                return _r;
            }
        /**
         * 如果 _item 的值非空, 那么 reqtarget 的值也不能为空
         * @method  reqtarget
         * @param   {selector}  _item
         * @private
         * @static
         */
        , 'reqtarget':
            function( _item ){
                var _p = this, _r = true
                    , _v = _item.val().trim(), _tv
                    , _target = JC.f.parentSelector( _item, _item.attr('reqtargetdatatarget') || _item.attr('datatarget') )
                    ;
                if( _v && _target && _target.length ){
                    _tv = _target.val().trim();
                    !_tv && ( _r = false );
                    !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _target, 'reqtargetmsg', true ] );
                    _r && _target.trigger('blur');
                }else if( _target && _target.length ){
                    _target.trigger('blur');
                }

                return _r;
            }
        /**
         * N 个值必须保持唯一性, 不能有重复
         * @method  unique
         * @param   {selector}  _item
         * @private
         * @static
         */
        , 'unique':
            function( _item ){
                var _p = this, _r = true
                    , _target, _tmp, _group = []
                    , _len = _p.typeLen( _item.attr('subdatatype') )[0]
                    , _KEY = "UniqueValidTime"
                    , _typeKey = 'unique'
                    , _ignoreCase = JC.f.parseBool( _item.attr('uniqueIgnoreCase') )
                    , _errLs, _corLs
                    ;

                //JC.log( _typeKey, new Date().getTime() );

                _p.isDatatarget( _item, _typeKey ) && (_target = _p.datatarget( _item, _typeKey ) );
                !( _target && _target.length ) && ( _target = _p.samesubtypeitems( _item, _typeKey ) );

                //JC.log( _target && _target.length ? _target.length : 'null' );

                _errLs = [];
                _corLs = [];

                var _isReturn = false;
                if( _target && _target.length ){
                    _tmp = {};
                    _target.each( function( _ix ){
                        var _sp = $(this);
                        if( _sp.is('[processDisabled]') 
                            && ( !_sp.attr('processDisabled') 
                                || JC.f.parseBool( _sp.attr('processDisabled' ) ) 
                                )
                        ){
                            if( !( _sp.is(':visible') || _p.isValidHidden( _sp ) ) ) return;
                        }else{
                            if( ! _p.isAvalible( _sp ) ) return;
                        }

                        if( _p.checkRepeatProcess( _sp, _KEY, true ) ) {
                            _isReturn = true;
                            //return false;
                        }
                        //JC.log( _ix, _sp.val() );

                        if( _ix % _len === 0 ){
                            _group.push( [] );
                        }
                        _group[ _group.length - 1 ] 
                        && _group[ _group.length - 1 ].push( _sp )
                        ; 
                    });
                    //if( _isReturn ) return _r;

                    $.each( _group, function( _ix, _items ){
                        var _tmpAr = [], _ignoreEmpty = false;
                        $.each( _items, function( _six, _sitem ){
                            var _tmpV, _ignore = JC.f.parseBool( _sitem.attr('uniqueIgnoreEmpty') );
                            _tmpV = $(_sitem).val().trim();
                            _ignore && !_tmpV && ( _sitem.is(':visible') || _p.isValidHidden( _sitem ) ) && ( _ignoreEmpty = true );
                            _tmpAr.push( _tmpV );
                        });
                        var _pureVal = _tmpAr.join(''), _compareVal = _tmpAr.join('####');
                        if( _ignoreEmpty ) return;
                        if( !_pureVal ) return;
                        _ignoreCase && ( _compareVal = _compareVal.toLowerCase() );
                        //JC.log( _compareVal );

                        if( _compareVal in _tmp ){
                            _tmp[ _compareVal ].push( _items );
                            _r = false;
                        }else{
                            _tmp[ _compareVal ] = [ _items ];
                        }
                    });

                    for( var _k in _tmp ){
                        if( _tmp[ _k ].length > 1 ){
                            _r = false;
                            $.each( _tmp[ _k ], function( _ix, _items ){
                                _errLs = _errLs.concat( _items ) ;
                            });
                        }else{
                            $.each( _tmp[ _k ], function( _ix, _items ){
                                _corLs = _corLs.concat( _items ) ;
                            });
                        }
                    }
                }

                //if( _isReturn ) return _r;

                $.each( _corLs, function( _ix, _sitem ){
                    var _dt = _p.parseDatatype( _sitem )
                    if( _dt && _p[ _dt ] && _sitem.val() ){
                        if( _p[ _dt ]( _sitem ) ){ 
                            Valid.setValid( _sitem );
                        }
                    }else{
                        Valid.setValid( _sitem );
                    }
                });

                !_r && _errLs.length && $.each( _errLs, function( _ix, _sitem ){ 
                    _sitem = $( _sitem );
                    var _sv = ( _sitem.val() || '' ).trim();
                    if( _isReturn ) return false;
                    if( ! _sv ) return;
                    //JC.log('yyyyyyyyyyyyy', _sitem.data('JCValidStatus'), new Date().getTime() );
                    _sv 
                        && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _sitem, 'uniquemsg', true ] );
                } );

                return _r;
            }

        , datavalid:
            function( _item ){
                var _r = true, _p = this;
                if( !Valid.isFormValid ) return _r;
                if( !_item.is( '[datavalid]') ) return _r;

                //JC.log( 'datavalid', new Date().getTime() ); 

                _r = JC.f.parseBool( _item.attr('datavalid') );

                if( !_r ){
                    Valid.statusTimeout.error( _item, 
                        setTimeout( function(){
                            $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item, 'datavalidmsg', true ] );
                        }, 1 )
                    );
                }

                return _r;
            }

        , typeLen:
            function( _type ){
                var _lenAr = [1];
                _type 
                    && ( _type = _type.replace( /[^\d\.]/g, '' ) )
                    && ( _lenAr = _type.split('.') )
                    && ( 
                            _lenAr[0] = parseInt( _lenAr[0], 10 ) || 1
                            , _lenAr[1] = parseInt( _lenAr[1], 10 ) || 0
                       )
                    ;
                return _lenAr;
            }

        , findValidEle:
            function( _item ){
                var _p = this, _selector = '~ em.validmsg', _r = _item.find( _selector ), _tmp;
                if( _item.attr('validel') 
                        && ( _tmp = _p.getElement( _item.attr('validel'), _item, _selector ) ).length ) _r = _tmp;
                return _r;
            }
        , findFocusEle:
            function( _item ){
                var _p = this, _selector = '~ em.focusmsg', _r = _item.find( _selector ), _tmp;
                if( _item.attr('focusel') 
                        && ( _tmp = _p.getElement( _item.attr('focusel'), _item, _selector ) ).length ) _r = _tmp;
                return _r;
            }
        , findErrorEle:
            function( _item ){
                var _p = this, _selector = Model.SELECTOR_ERROR, _r = _item.find( _selector ), _tmp;
                if( _item.attr('emel') 
                        && ( _tmp = _p.getElement( _item.attr('emel'), _item, _selector ) ).length ) _r = _tmp;
                return _r;
            }
        /**
         * 获取 _selector 对象
         * <br />这个方法的存在是为了向后兼容qwrap, qwrap DOM参数都为ID
         * @method  getElement
         * @private
         * @static
         * @param   {selector}  _selector
         */
        , getElement: 
            function( _selector, _item, _subselector ){
                if( /^\^$/.test( _selector ) ){
                    _subselector = _subselector || Model.SELECTOR_ERROR;
                    _selector = $( _item.parent().find( _subselector ) );
                }else if( /^[\/\|\<\(]/.test( _selector ) ) {
                    _selector = JC.f.parentSelector( _item, _selector );
                }else if( /\./.test( _selector ) ) {
                    return $( _selector );
                }else if( /^[\w-]+$/.test( _selector ) ) {
                    _selector = '#' + _selector;
                    _selector = $( _selector.replace( /[\#]+/g, '#' ) );
                }
                return $(_selector);
            }
        /**
         * 获取对应的错误信息, 默认的错误信息有 reqmsg, errmsg, <br />
         * 注意: 错误信息第一个字符如果为空格的话, 将完全使用用户定义的错误信息, 将不会动态添加 请上传/选择/填写
         * @method  errorMsg
         * @private
         * @static
         * @param   {selector}  _item
         * @param   {string}    _msgAttr    - 显示指定需要读取的错误信息属性名, 默认为 reqmsg, errmsg, 通过该属性可以指定别的属性名
         * @param   {bool}      _fullMsg    - 显示指定错误信息为属性的值, 而不是自动添加的 请上传/选择/填写
         */
        , errorMsg: 
            function( _item, _msgAttr, _fullMsg ){
                var _msg = _item.is('[errmsg]') ? ' ' + _item.attr('errmsg') : _item.is('[reqmsg]') ? _item.attr('reqmsg') : '';
                _msgAttr && (_msg = _item.attr( _msgAttr ) || _msg );
                _fullMsg && _msg && ( _msg = ' ' + _msg );

                _msg = (_msg||'').trim().toLowerCase() == 'undefined' || typeof _msg == undefined ? '' : _msg;

                if( _msg && !/^[\s]/.test( _msg ) ){
                    switch( _item.prop('type').toLowerCase() ){
                        case 'file': _msg = '请上传' + _msg; break;

                        case 'select-multiple':
                        case 'select-one':
                        case 'checkbox':
                        case 'radio':
                        case 'select': _msg = '请选择' + _msg; break;

                        case 'textarea':
                        case 'password':
                        case 'text': _msg = '请填写' + _msg; break;
                    }
                }
                return $.trim(_msg);
            }
        /**
         * 检查内容是否为空,
         * <br>如果声明了该属性, 那么 value 须不为空
         * @method  reqmsg
         * @private
         * @static
         * @param   {selector}  _item
         * @example
                <div class="f-l">
                    <input type="TEXT" name="company_name" reqmsg="公司名称" /> <em>公司名称描述</em>
                </div>
         */
        , reqmsg: 
            function( _item ){
                var _r = true, _p = this;
                if( !_p.isReqmsg( _item ) ) return _r;

                if( _item.val() && _item.val().constructor == Array ){
                    _r = !!( $.trim( _item.val().join('') + '' ) );
                }else{
                    _r = !!$.trim( _item.val() ||'') ;
                }

                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item, 'reqmsg' ] );
                //JC.log( 'regmsgValid: ' + _r );
                return _r;
            }
        , sametypeitems:
            function( _item ){
                var _p = this, _r = []
                    , _pnt = _item.parent()
                    , _type = _item.attr('datatype')
                    , _re = new RegExp( _type, 'i' )
                    ;
                if( /select/i.test( _item.prop('nodeName') ) ){
                    _pnt.find('[datatype]').each( function(){
                        _re.test( $(this).attr('datatype') ) && _r.push( $(this) );
                    });
                }else{
                    _pnt.find('input[datatype]').each( function(){
                        _re.test( $(this).attr('datatype') ) && _r.push( $(this) );
                    });
                }
                return _r.length ? $( _r ) : _r;
            }
        , samesubtypeitems:
            function( _item, _type ){
                var _p = this, _r = []
                    , _pnt = _item.parent()
                    , _type = _type || _item.attr('subdatatype')
                    , _re = new RegExp( _type, 'i' )
                    , _nodeName = _item.prop('nodeName').toLowerCase()
                    , _tagName = 'input'
                    ;
                if( /select/.test( _nodeName ) ){
                    _tagName = 'select';
                }else if( /textarea/.test( _nodeName ) ){
                    _tagName = 'textarea';
                }
                _pnt.find( _tagName + '[subdatatype]').each( function(){
                    _re.test( $(this).attr('subdatatype') ) && _r.push( $(this) );
                });

                return _r.length ? $( _r ) : _r;
            }
        , focusmsgeverytime:
            function( _item ){
                var _r = Valid.focusmsgEverytime;
                _item.is( '[focusmsgeverytime]' ) && ( _r = JC.f.parseBool( _item.attr('focusmsgeverytime') ) );
                return _r;
            }
        , validemdisplaytype:
            function( _item ){
                _item && ( _item = $( _item ) );
                var _r = Valid.emDisplayType, _form = JC.f.getJqParent( _item, 'form' ), _tmp;
                _form &&_form.length 
                    && _form.is( '[validemdisplaytype]' ) 
                    && ( _tmp = _form.attr('validemdisplaytype') )
                    && ( _r = _tmp )
                    ;
                _item.is( '[validemdisplaytype]' ) 
                    && ( _tmp = _item.attr('validemdisplaytype') )
                    && ( _r = _tmp )
                    ;
                //JC.log( 'validemdisplaytype:', _r, Valid.emDisplayType );
                return _r;
            }
        /**
         * 这里需要优化检查, 目前会重复检查
         */
        , checkedType:
            function( _item, _type ){
                _item && ( _item = $( _item ) );
                _type = _type || 'checkbox';
                var _p = this
                    , _r = true
                    , _items
                    , _tmp
                    , _ckLen = 1
                    , _count = 0
                    , _finder = _item
                    , _pntIsLabel = _item.parent().prop('nodeName').toLowerCase() == 'label' 
                    , _finderKey = _type + 'finder';
                    ;

                //JC.log( _item.attr('name') + ', ' + _item.val() );

                if( _item.is( '[datatarget]' ) ){
                    _items = JC.f.parentSelector( _item, _item.attr('datatarget') );                    
                    _tmp = [];
                    _items.each( function(){
                        var _sp = $(this);
                            ( _sp.is(':visible') || _p.isValidHidden( _sp ) )
                            && !_sp.prop('disabled')
                            && _tmp.push( _sp );
                    });
                    _items = $( _tmp );
                }else{
                    if( _pntIsLabel ){
                        if( !_finder.is('[' + _finderKey + ']') ) _finder = _item.parent().parent();
                        else _finder = JC.f.parentSelector( _item, _item.attr( _finderKey ) );
                        _tmp = JC.f.parentSelector( _finder, '|input[datatype]' );
                    }
                    else{
                        _tmp = JC.f.parentSelector( _finder, '/input[datatype]' );
                    }
                    _items = [];
                    _tmp.each( function(){
                        var _sp = $(this);
                        var _re = new RegExp( _type, 'i' );
                        _re.test( _sp.attr('datatype') ) 
                            && ( _sp.is(':visible') || _p.isValidHidden( _sp ) )
                            && !_sp.prop('disabled')
                            && _items.push( _sp );
                    });
                    _items = $( _items );
               }
               if( _pntIsLabel ){
                   _items.each( function(){
                        var _sp = $(this);
                        if( !_sp.is('[emel]') ) _sp.attr('emel', '//em.error');
                        if( !_sp.is('[validel]') ) _sp.attr('validel', '//em.validmsg');
                        if( !_sp.is('[focusel]') ) _sp.attr('focusel', '//em.focusmsg');
                   });
               }

               _items.length && $( _item = _items[ _items.length - 1 ] ).data('Last' + _type, true);

               if( _items.length ){
                    _item.is( '[datatype]' )
                        && _item.attr('datatype')
                        .replace( /[^\-]+?\-([\d]+)/, function( $0, $1 ){ _ckLen = parseInt( $1, 10 ) || _ckLen; } );

                    if( _items.length >= _ckLen ){
                        _items.each( function(){
                            $( this ).prop( 'checked' ) && _count++;
                        });

                        if( _count < _ckLen ){
                            _r = false;
                        }
                    }

                    !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
               }

                return _r;
            }
        , 'checkbox':
            function( _item ){
                return this.checkedType( _item, 'checkbox' );
            }
        , 'radio':
            function( _item ){
                return this.checkedType( _item, 'radio' );
            }

        /**
         * 验证文件扩展名
         */
        , 'file':
            function( _item ){
                var _p = this
                    , _r = true
                    , _v = _item.val().trim().toLowerCase()
                    , _extLs = _p.dataFileExt( _item )
                    , _re
                    , _tmp
                    ;

                if( _extLs.length ){
                    _r = false;
                    $.each( _extLs, function( _ix, _item ){
                        _item += '$';
                        _re = new RegExp( _item, 'i' );
                        if( _re.test( _v ) ) {
                            _r = true;
                            return false;
                        }
                    });
                }

                !_r && $(_p).trigger( Model.TRIGGER, [ Model.ERROR, _item ] );
                return _r;
            }
        , dataFileExt:
            function( _item ){
                var _r = [], _tmp;
                _item.is('[fileext]')
                    && ( _tmp = _item.attr('fileext').replace(/[\s]+/g, '' ) )
                    && ( _tmp = _tmp.replace( /\./g, '\\.' ) )
                    && ( _r = _tmp.toLowerCase().split(',') )
                    ;
                return _r;
            }

        , ignoreAutoCheckEvent:
            function( _item ){
                var _r = Valid.ignoreAutoCheckEvent, _form;
                _item && ( _item = $( _item ) );
                if( _item && _item.length ){
                    _form = JC.f.getJqParent( _item, 'form' );
                    _form 
                        && _form.length 
                        && _form.is( '[ignoreAutoCheckEvent]' )
                        && ( _r = JC.f.parseBool( _form.attr( 'ignoreAutoCheckEvent' ) ) );
                            
                    _item.is( '[ignoreAutoCheckEvent]' )
                        && ( _r = JC.f.parseBool( _item.attr( 'ignoreAutoCheckEvent' ) ) );
                }
                return _r;
            }
    };
    
    function View( _model ){
        this._model = _model;
    }
    
    View.prototype = {
        init:
            function() {
                var _p = this;
                
                $(_p).on( 'setValid', function( _evt, _item, _tm, _noStyle, _hideFocusMsg ){
                    var _tmp;
                    _item.removeClass( Model.CSS_ERROR );
                    _item.find( 
                        JC.f.printf( '~ em:not("em.focusmsg, em.validmsg, {0}")', Model.FILTER_ERROR ) )
                        .css('display', _p._model.validemdisplaytype( _item ) 
                    );
                    _item.find( Model.SELECTOR_ERROR ).hide();
                    _item.attr('emel') 
                        && ( _tmp = _p._model.getElement( _item.attr('emel'), _item ) )
                        && _tmp.hide();

                    typeof _noStyle == 'undefined' 
                        && typeof _item.val() != 'object'
                        && !_item.val().trim() 
                        && ( _noStyle = 1 );

                    _p.validMsg( _item, _noStyle, _hideFocusMsg );
                });

                $( _p ).on( 'setError', function( _evt, _item, _msgAttr, _fullMsg ){
                    var _msg = _p._model.errorMsg.apply( _p._model, [ _item, _msgAttr, _fullMsg ] )
                        , _errEm
                        , _validEm
                        , _focusEm
                        , _tmp
                        ;

                    _item.addClass( Model.CSS_ERROR );
                    _item.find( JC.f.printf( '~ em:not({0})', Model.FILTER_ERROR ) ).hide();

                    if( _item.is( '[validel]' ) ){
                        ( _validEm = _p._model.getElement( _item.attr( 'validel' ) , _item) ) 
                            && _validEm.hide();
                    }
                    if( _item.is( '[focusel]' ) ){
                        ( _focusEm = _p._model.getElement( _item.attr( 'focusel' ) , _item) ) 
                            && _focusEm.hide();
                    }
                    if( _item.is( '[emEl]' ) ){
                        ( _errEm = _p._model.getElement( _item.attr( 'emEl' ) , _item) ) 
                            && _errEm.addClass( Model.CSS_ERROR );
                    }
                    !( _errEm && _errEm.length ) && ( _errEm = _item.find( Model.SELECTOR_ERROR ) );
                    if( !_errEm.length ){
                        ( _errEm = $( JC.f.printf( '<em class="{0}"></em>', Model.CSS_ERROR ) ) ).insertAfter( _item );
                    }
                    !_msg.trim() && ( _msg = "&nbsp;" );
                    _errEm.html( _msg ).css('display', _p._model.validemdisplaytype( _item ) );
                    //JC.log( 'error:', _msg );
                });

                return this;
            }
        /**
         * 显示正确的视觉效果
         * @method  valid
         * @private
         * @static
         * @param   {selector}  _item
         * @param   {int}       _tm
         * @param   {bool}      _noStyle
         */
        , valid:
            function( _item, _tm, _noStyle ){
                _item && ( _item = $(_item) );
                var _p = this, _tmp;
                _item.data( 'JCValidStatus', true );
                //if( !_p._model.isValid( _item ) ) return false;
                var _hideFocusMsg = !JC.f.parseBool( _item.attr('validnoerror' ) );

                Valid.statusTimeout.valid( _item,
                    setTimeout(function(){
                        $(_p).trigger( 'setValid', [ _item, _tm, _noStyle, _hideFocusMsg ] );
                        ( _tmp = _p._model.validitemcallback( _item ) ) && _tmp( _item, true );
                    }, _tm || 150)
                );
            }
        , validMsg:
            function( _item, _noStyle, _hideFocusMsg ){
                var _p = this, _msg = ( _item.attr('validmsg') || '' ).trim().toLowerCase(), _focusEm;

                if( _p._model.isValidMsg( _item ) ){
                    if( _msg == 'true' || _msg == '1' ) _msg = '';
                    !_msg.trim() && ( _msg = '&nbsp;' ); //chrome bug, 内容为空会换行
                    var _focusmsgem = _p._model.findFocusEle( _item )
                        , _validmsgem = _p._model.findValidEle( _item )
                        , _errorEm = _p._model.findErrorEle( _item )
                        ;

                    !_validmsgem.length 
                        && ( _validmsgem = $( '<em class="validmsg"></em>' )
                             , _item.after( _validmsgem )
                           );

                    //_focusmsgem && _focusmsgem.length && _focusmsgem.hide();

                    _validmsgem.html( _msg );
                    _noStyle 
                        ? _validmsgem.hide() 
                        : ( _validmsgem.css('display', _p._model.validemdisplaytype( _item ) )
                                , _focusmsgem && _focusmsgem.hide()
                                , _errorEm && _errorEm.hide()
                          )
                        ;
                }else{
                    if( _hideFocusMsg ){
                        ( _focusEm = _p._model.findFocusEle( _item ) ) 
                            && _focusEm.hide();
                    }
                }
            }
        /**
         * 显示错误的视觉效果
         * @method  error
         * @private
         * @static
         * @param   {selector}  _item
         * @param   {string}    _msgAttr    - 显示指定需要读取的错误信息属性名, 默认为 reqmsg, errmsg, 通过该属性可以指定别的属性名
         * @param   {bool}      _fullMsg    - 显示指定错误信息为属性的值, 而不是自动添加的 请上传/选择/填写
         */
        , error: 
            function( _item, _msgAttr, _fullMsg ){
                _item && ( _item = $(_item) );
                var _p = this, arg = arguments, _tmp; 
                //if( !_p._model.isValid( _item ) ) return true;
                if( _item.is( '[validnoerror]' ) ) return true;
                _item.data( 'JCValidStatus', false );

                Valid.statusTimeout.error( _item, 
                    setTimeout(function(){
                        $(_p).trigger( 'setError', [ _item, _msgAttr, _fullMsg ] );
                        ( _tmp = _p._model.validitemcallback( _item ) ) && _tmp( _item, false);

                    }, 150)
                );

                return false;
            }
        , focusmsg:
            function( _item, _setHide, _msgAttr ){
                //alert( _msgAttr );
                if( _item && ( _item = $( _item ) ).length 
                        && ( _item.is('[focusmsg]') || ( _msgAttr && _item.is( '[' + _msgAttr + ']') ) )
                    ){
                    //JC.log( 'focusmsg', new Date().getTime() );

                    var _r, _p = this
                        , _focusmsgem = _p._model.findFocusEle( _item )
                        , _validmsgem = _p._model.findValidEle( _item )
                        , _errorEm = _p._model.findErrorEle( _item )
                        , _msg = _item.attr('focusmsg')
                        ;
                    _msgAttr && ( _msg = _item.attr( _msgAttr || _msg ) );

                    if( _setHide && _focusmsgem && _focusmsgem.length ){
                        _focusmsgem.hide();
                        return;
                    }

                    _errorEm.length && _errorEm.is(':visible') && _errorEm.hide();
                    if( _validmsgem.length && _validmsgem.is(':visible') ) return;

                    !_focusmsgem.length 
                        && ( _focusmsgem = $('<em class="focusmsg"></em>')
                             , _item.after( _focusmsgem )
                           );
                    if( _item.is( '[validnoerror]' ) ){
                        _r = Valid.check( _item );
                    }else{
                        _item.attr('validnoerror', true);
                        _r = Valid.check( _item );
                        _item.removeAttr('validnoerror');
                    }
                    !_msg.trim() && ( _msg = "&nbsp;" );

                    if( _p._model.focusmsgeverytime( _item ) ){
                        _focusmsgem.html( _msg ).css('display', _p._model.validemdisplaytype( _item ) );
                    }else{
                        _r && _focusmsgem.html( _msg ).css('display', _p._model.validemdisplaytype( _item ) );
                    }

                }
            }
    };
    /**
     * 解析错误时触发的时件
     * @event ValidError
     */
    /**
     * 解析正确时触发的时件
     * @event ValidCorrect
     */
    /**
     * 响应表单子对象的 blur事件, 触发事件时, 检查并显示错误或正确的视觉效果
     * @private
     */
    $(document).delegate( 'input[type=text], input[type=password], textarea', 'blur', function($evt){
        var _p = $(this), _ins = Valid.getInstance();
        if( _ins._model.ignoreAutoCheckEvent( _p ) ) return;
        _ins.trigger( Model.FOCUS_MSG,  [ _p, true ] );
        Valid.checkTimeout( _p );
    });
    /**
     * 响应没有 type 的 文本框
     */
    $(document).delegate( 'input', 'blur', function( _evt ){
        var _p = $(this), _ins = Valid.getInstance();
        if( _p.attr( 'type' ) ) return;
        if( _ins._model.ignoreAutoCheckEvent( _p ) ) return;
        _ins.trigger( Model.FOCUS_MSG,  [ _p, true ] );
        Valid.checkTimeout( _p );
    });
    /**
     * 响应表单子对象的 change 事件, 触发事件时, 检查并显示错误或正确的视觉效果
     * @private
     */
    $(document).delegate( 'select, input[type=file], input[type=checkbox], input[type=radio]', 'change', function($evt, _ignore){
        if( _ignore ) return;
        var _p = $(this), _ins = Valid.getInstance();
        if( _ins._model.ignoreAutoCheckEvent( _p ) ) return;
        Valid.checkTimeout( _p );
    });
    /**
     * 响应表单子对象的 focus 事件, 触发事件时, 如果有 focusmsg 属性, 则显示对应的提示信息
     * @private
     */
    $(document).delegate( 'input[type=text], input[type=password], textarea'
                            +', select, input[type=file], input[type=checkbox], input[type=radio]', 'focus', function($evt){
        var _p = $(this), _ins = Valid.getInstance(), _v = _p.val().trim();
        if( _ins._model.ignoreAutoCheckEvent( _p ) ) return;
        _ins.trigger( Model.FOCUS_MSG,  [ _p ] );
        !_v && Valid.setValid( _p );
    });
    /**
     * 响应表单子对象的 blur事件, 触发事件时, 如果有 focusmsg 属性, 则显示对应的提示信息
     * @private
     */
    $(document).delegate( 'select, input[type=file], input[type=checkbox], input[type=radio]', 'blur', function($evt){
        var _p = $(this), _ins = Valid.getInstance();
        if( _ins._model.ignoreAutoCheckEvent( _p ) ) return;
        _ins.trigger( Model.FOCUS_MSG,  [ _p, true ] );
    });

    $(document).delegate( 'input[type=hidden][subdatatype]', 'change', function( _evt ){
        var _p = $(this), _ins = Valid.getInstance(), _isHidden = false, _tmp;
        if( _ins._model.ignoreAutoCheckEvent( _p ) ) return;
        _p.is( '[subdatatype]' ) && ( _isHidden = /hidden/i.test( _p.attr('subdatatype') ) );
        if( _p.data('HID_CHANGE_CHECK') ){
            _tmp = new Date().getTime() - _p.data('HID_CHANGE_CHECK') ;
            if( _tmp < 50 ){
                return;
            }
        }
        if( !_p.val() ){
            //Valid.setValid( _p );
            return;
        }
        _p.data('HID_CHANGE_CHECK', new Date().getTime() );
        //JC.log( 'hidden val', new Date().getTime(), _p.val() );
        Valid.checkTimeout( $(this) );
    });
    /**
     * 初始化 subdatatype = datavalid 相关事件
     */
    $(document).delegate( 'input[type=text][subdatatype]', 'keyup', function( _evt ){
        var _sp = $(this);

        var _isDatavalid = /datavalid/i.test( _sp.attr('subdatatype') );
        if( !_isDatavalid ) return;
        if( _sp.prop('disabled') || _sp.prop('readonly') ) return;

        Valid.dataValid( _sp, false, true );
        var _keyUpCb;
        _sp.attr('datavalidKeyupCallback')
            && ( _keyUpCb = window[ _sp.attr('datavalidKeyupCallback') ] )
            && _keyUpCb.call( _sp, _evt )
            ;

        if( _sp.data( 'DataValidInited' ) ) return;
        _sp.data( 'DataValidInited', true );
        _sp.data( 'DataValidCache', {} );

        _sp.on( 'DataValidUpdate', function( _evt, _v, _data ){
            var _tmp, _json;
            if( JC.f.parseBool( _sp.attr( 'datavalidNoCache' ) ) ){
                _json = _data;
            }else{
                if( !_sp.data( 'DataValidCache') ) return;
                _json = _sp.data( 'DataValidCache' )[ _v ];
            }
            if( !_json ) return;

            _v === 'suchestest' && (  _json.data.errorno = 0 );
            Valid.dataValid( _sp, !_json.data.errorno, false, _json.data.errmsg );
            _sp.attr('datavalidCallback')
                && ( _tmp = window[ _sp.attr('datavalidCallback') ] )
                && _tmp.call( _sp, _json.data, _json.text )
                ;
        });

        _sp.on( 'DataValidVerify', function( _evt, _ignoreStatus, _cb ){
            var _v = _sp.val().trim(), _tmp, _strData
                , _url = _sp.attr('datavalidurl')
                , _datavalidCheckCallback;
            if( !_v ) return;

            _sp.attr('datavalidCheckCallback')
                && ( _datavalidCheckCallback = window[ _sp.attr('datavalidCheckCallback') ] )
                ;
            if( _datavalidCheckCallback ){
                innerDone( _datavalidCheckCallback.call( _sp ) );
                return;
            }

            if( !_url ) return;

            _sp.data( 'DataValidTm' ) && clearTimeout( _sp.data( 'DataValidTm') );
            _sp.data( 'DataValidTm'
                , setTimeout( function(){
                    _v = _sp.val().trim();
                    if( !_v ) return;
                    _v = JC.f.encoder( _sp )( _v );

                    if( !_ignoreStatus ){
                        if( !_sp.data('JCValidStatus') ) return;
                    }

                    _url = JC.f.printf( _url, _v );
                    _sp.attr('datavalidUrlFilter')
                        && ( _tmp = window[ _sp.attr('datavalidUrlFilter') ] )
                        && ( _url = _tmp.call( _sp, _url ) )
                        ;
                    if( _v in _sp.data( 'DataValidCache' ) ){
                        _sp.trigger( 'DataValidUpdate', _v );
                        return;
                    }
                    var _ajaxType = 'get', _requestData;
                    _sp.attr( 'datavalidAjaxType' ) && ( _ajaxType = _sp.attr( 'datavalidAjaxType' ) || _ajaxType );
                    if( _sp.attr( 'datavalidRequestData' ) ){
                        try{ _requestData = eval( '(' + _sp.attr('datavalidRequestData') + ')' ); }catch( ex ){}
                    }
                    _requestData = _requestData || {};

                    if( _ajaxType.toLowerCase() == 'post' ){
                        $.post( _url, _requestData ).done( innerDone );
                    }else{
                        $.get( _url, _requestData ).done( innerDone );
                    }
                }, 151)
            );

            function innerDone( _d ){
                _strData = _d;
                if( typeof _d == 'string' ){
                    try{ _d = $.parseJSON( _d ); } catch( ex ){ _d = { errorno: 1 }; }
                }

                var _data = { 'key': _v, data: _d, 'text': _strData };

                ! JC.f.parseBool( _sp.attr( 'datavalidNoCache' ) )
                     && ( _sp.data( 'DataValidCache' )[ _v ] = _data );

                _sp.trigger( 'DataValidUpdate', [ _v, _data ] );

                _cb && _cb.call( _sp, _data );
            }

        });

        _sp.on( 'blur', function( _evt, _ignoreProcess ){
            //JC.log( 'datavalid', new Date().getTime() );
            if( _ignoreProcess ) return;
            _sp.trigger( 'DataValidVerify' );
        });
    });

    return JC.Valid;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
