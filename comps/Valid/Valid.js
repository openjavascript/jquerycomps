//TODO: 错误提示 不占用页面宽高, 使用 position = absolute,  date = 2013-08-03
;(function($){
    !window.JC && (window.JC = { log:function(){} });
    /**
     * 表单验证
     * <br />全局访问请使用 JC.Valid 或 Valid
     * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Valid.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Valid/_demo/' target='_blank'>demo link</a></p>
     * <h2>Form 的可用 html attribute</h2>
     * <dl>
     *  <dt>errorabort = bool</dt>
     *  <dd>查检Form Control时, 如果发生错误是否继续检查下一个</dd>
     *  <dd>default = true</dd>
     * </dl>
     * <h2>Form Control的可用 html attribute</h2>
     * <dl>
     *      <dt>reqmsg = 错误提示</dt>
     *      <dd>值不能为空</dd>
     *
     *      <dt>errmsg = 错误提示</dt>
     *      <dd>格式错误, 但不验证为空的值</dd>
     *
     *      <dt>emel = selector</dt>
     *      <dd>显示错误的selector</dd>
     *
     *      <dt>minlength = int(最小长度)</dt>
     *      <dd>验证内容的最小长度, 但不验证为空的值</dd>
     *
     *      <dt>maxlength = int(最大长度)</dt>
     *      <dd>验证内容的最大长度, 但不验证为空的值</dd>
     *
     *      <dt>minvalue = [number|ISO date](最小值)</dt>
     *      <dd>验证内容的最小值, 但不验证为空的值</dd>
     *
     *      <dt>maxvalue = [number|ISO date](最大值)</dt>
     *      <dd>验证内容的最大值, 但不验证为空的值</dd>
     *
     *      <dt>ignoreprocess = bool</dt>
     *      <dd>验证表单时, 是否忽略</dd>
     *      <dd>default = false</dd>
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
     *              <dd>html attr <b>fromNEl:</b> 指定开始的 control</dd>
     *              <dd>html attr <b>toNEl:</b> 指定结束的 control</dd>
     *              <dd>如果不指定 fromNEl, toNEl, 默认是从父节点下面找到 nrange, 按顺序定为 fromNEl, toNEl</dd>
     *          </dl>
     *      </dd>
     *      <dd><b>time:</b> 是否为正确的时间, hh:mm:ss</dd>
     *      <dd><b>minute:</b> 是否为正确的时间, hh:mm</dd>
     *      <dd>
     *          <b>bankcard:</b> 是否为正确的银行卡
     *          <br />  格式为 d{19} | d{16} | 1111 1111 1111 1111 111 | 1111 1111 1111 1111111
     *      </dd>
     *      <dd>
     *          <b>cnname:</b> 中文姓名
     *          <br>格式: 汉字和大小写字母
     *          <br>规则: 长度 2-32个字节, 非 ASCII 算2个字节
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
     *      <dd><b>phonezone:</b> 电话区号, 3~4位数字</dd>
     *      <dd><b>phoneext:</b> 电话分机号, 1~6位数字</dd>
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
     *
     *      <dt>subdatatype: 特殊数据类型</dt>
     *      <dd>
     *          <dl>
     *              <dt>alternative: N 个 Control 必须至少有一个非空的值</dt>
     *              <dd><b>datatarget:</b> 显式指定同一组 control, 默认在父级下查找[subdatatype=alternative]</dd>
     *              <dd><b>alternativemsg:</b> N 选一的错误提示</dd>
     *          </dl>
     *      </dd>
     *      <dd>
     *          <dl>
     *              <dt>reconfirm: N 个 Control 的值必须保持一致</dt>
     *              <dd><b>datatarget:</b> 显式指定同一组 control, 默认在父级下查找[subdatatype=reconfirm]</dd>
     *              <dd><b>reconfirmmsg:</b> 值不一致时的错误提示</dd>
     *          </dl>
     *      </dd>
     * </dl>
     * @namespace JC
     * @class Valid
     * @static
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-05-22
     */
    var Valid = JC.Valid = window.Valid = {
        /**
         * 验证一个表单项, 如 文本框, 下拉框, 复选框, 单选框, 文本域, 隐藏域
         * @method check
         * @static
         * @param      {selector}    _item -   需要验证规则正确与否的表单/表单项
         * @example 
         *          JC.Valid.check( $('input.needValid') );
         *          JC.Valid.check( document.getElementById('inputNeedValid') );
         *
         *          if( !JC.Valid.check( $('form') ) ){
         *              _evt.preventDefault();
         *              return false;
         *          }
         * @return    {boolean}
         */
        check:  
            function( _item ){ 
                _item && ( _item = $( _item ) );
                var _r = true, _item = $(_item), _type = _item.length ? _item.prop('nodeName').toLowerCase() : '';
                if( _item.length ){
                    if( _type == 'form' ){
                        var _errorabort = Valid.errorAbort, tmp;
                        _item.is('[errorabort]') && ( _errorabort = ( _tmp = _item.attr('errorabort').toLowerCase() ) == 'false' || _tmp == "0" || (!_tmp) ? false : true );
                        for( var i = 0, j = _item[0].length; i < j; i++ ){
                            if( $(_item[0][i]).is('[ignoreprocess]') ) continue;
                            !_logic.parse( $(_item[0][i]) ) && ( _r = false );
                            if( _errorabort && !_r ) break;
                        }
                    } else _r = _logic.parse( _item );
                }
                return _r;
            }
         /**
         * 清除Valid生成的错误样式
         * @method clearError
         * @static
         * @param   {form|input|textarea|select|file|password}  _selector -     需要清除错误的选择器
         * @example
         *          JC.Valid.clearError( 'form' );
         *          JC.Valid.clearError( 'input.some' );
         */
        , clearError:
            function( _selector ){
                $( _selector ).each( function(){
                    var _item = $(this);
                    JC.log( 'clearError: ' + _item.prop('nodeName') );
                    switch( _item.prop('nodeName').toLowerCase() ){
                        case 'form': 
                            {
                                for( var i = 0, j = _item[0].length; i < j; i++ ){
                                    var tmp = $(_item[0][i]);
                                    if( tmp.is('[disabled]') ) return;
                                    _logic.valid( tmp, 1 );
                                }
                                break;
                            }
                        default: _logic.valid( $(this), 1 ); break;
                    }
                });
            }
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
        , errorAbort: false
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
        , autoTrim: true
        /**
         * 检查一个表单是否有内容
         * @method  formHasValue
         * @param   {selector}      _fm
         * @param   {selector}      _ignoreSelector
         * @return  bool
         * @static
         * @example
                 $('form.js-valid').on('submit', function( $evt ){
                    var _p = $(this);

                    if( !JC.Valid.formHasValue( _p ) ){
                        $evt.preventDefault();
                        JC.alert( '表单内容为空, 不能提交!', _p.find('button[type=submit]'), 1 );
                        return false;
                    }

                    if( !JC.Valid.check( _p ) ){
                        $evt.preventDefault();
                        return false;
                    }
                });
         */
        , formHasValue:
            function( _fm, _ignoreSelector ){
                var _r = false, _item, _nt;
                _fm && ( _fm = $( _fm ) );

                if( _fm && _fm.length ){
                    for( var i = 0, j = _fm[0].length; i < j; i++ ){
                        _item = $(_fm[0][i]);
                        if( _item.is('[disabled]') ) return;
                        _nt = _item.prop('nodeName').toLowerCase();

                        if( _ignoreSelector ){
                            if( _item.is( _ignoreSelector ) ) continue;
                        }
                                        
                        switch( _item.prop('type').toLowerCase() ){

                            case 'select-multiple':
                            case 'select-one':
                            case 'select':
                            case 'file': 
                            case 'textarea':
                            case 'password':
                            case 'hidden':
                            case 'text': 
                                {
                                    if( $.trim( _item.val() ).length ) return true;
                                    break;
                                }

                           case 'checkbox':
                            case 'radio':
                                {
                                    if( _item.prop('checked') ) return true;
                                    break;
                                }
                        }
                    }
                }
                return _r;
            }
        /**
         * 把一个表单项的状态设为正确状态
         * @method  setValid
         * @param   {selector}  _item
         * @param   {int}       _tm     延时 _tm 毫秒显示处理结果, 默认=150
         * @static
         */
        , setValid: function(_item, _tm){ _logic.valid.apply( this, [].slice.apply( arguments) ); }
        /**
         * 把一个表单项的状态设为错误状态
         * @method  setError
         * @param   {selector}  _item
         * @param   {string}    _msgAttr    - 显示指定需要读取的错误信息属性名, 默认为 reqmsg, errmsg, 通过该属性可以指定别的属性名
         * @param   {bool}      _fullMsg    - 显示指定错误信息为属性的值, 而不是自动添加的 请上传/选择/填写
         * @static
         */
        , setError: function(_item, _msgAttr, _fullMsg){ _logic.error.apply( this, [].slice.apply( arguments) );}
    };
    /**
     * 这个方法是 <a href='JC.Valid.html#method_check'>Valid.check</a> 的别名
     * @method checkAll
     * @static
     * @param      {selector}    _item -   需要验证规则正确与否的表单/表单项
     * @see Valid.check
     */
    Valid.checkAll = Valid.check;

    /**
     * 响应表单子对象的 blur事件, 触发事件时, 检查并显示错误或正确的视觉效果
     * @private
     */
    $(document).delegate( 'input[type=text], input[type=password], textarea', 'blur', function($evt){
        JC.Valid.check( this )
    });
    /**
     * 响应表单子对象的 change 事件, 触发事件时, 检查并显示错误或正确的视觉效果
     * @private
     */
    $(document).delegate( 'select, input[type=file]', 'change', function($evt){
        JC.Valid.check( this )
    });
    /**
     * 私有逻辑处理对象, 验证所需的所有规则和方法都存放于此对象
     * @property _logic
     * @type {Object}
     * @static
     * @private
     */
    var _logic =
        {
            /**
             * 分析_item是否附合规则要求
             * @method  _logic.parse
             * @private
             * @static
             * @param   {selector}  _item 
             */
            parse: 
                function( _item ){

                    var _r = true, _item = $(_item);

                    _item.each( function(){

                        if( !_logic.isValidItem(this) ) return;
                        var _sitem = $(this), _dt = _logic.getDatatype( _sitem ), _subdt = _logic.getSubdatatype( _sitem )
                            , _nm = _sitem.prop('nodeName').toLowerCase();

                        if( !_sitem.is(':visible') ) return;
                        if( _sitem.is('[disabled]') ) return;

                        JC.log( _dt, _subdt );

                        switch( _nm ){
                            case 'input':
                            case 'textarea':
                                {
                                    Valid.autoTrim && ( _sitem.val( $.trim( _sitem.val() ) ) );
                                    _sitem.val( $.trim( _sitem.val()||'' ) );
                                    break;
                                }
                        }

                        if( _sitem.is('[reqmsg]') ){
                            if( ! _logic.datatype['reqmsg']( _sitem ) ) {
                                _r = false;
                                return;
                             }
                        }

                        if( !_logic.datatype['length']( _sitem ) ){
                            _r = false;
                            return;
                        }

                        if( _dt in _logic.datatype && _sitem.val() ){
                            if( !_logic.datatype[ _dt ]( _sitem ) ){
                                _r = false;
                                return;
                            }
                        }
                        
                        if( _subdt && _subdt in _logic.subdatatype && ( _sitem.val() || _subdt == 'alternative' ) ){
                            if( !_logic.subdatatype[ _subdt ]( _sitem ) ){
                                _r = false;
                                return;
                            }
                        }

                        _logic.valid( _sitem );
                    });

                    return _r;
                }
            /**
             * 检查 _item 是否为 Valid 的检查对象
             * @method  _logic.isValidItem
             * @private
             * @static
             * @param   {selector}  _item
             */
            , isValidItem: 
                function( _item ){
                    _item = $(_item);
                    var _r, _tmp;

                    _item.each( function(){
                        _tmp = $(this);
                        if( _tmp.is( '[datatype]' ) || _tmp.is( '[subdatatype]' ) 
                            || _tmp.is( '[minlength]' ) || _tmp.is( '[maxlength]' )  
                            || _tmp.is( '[reqmsg]' ) ) 
                            _r = true;
                    });

                    return _r;
                }
            /**
             * 显示正确的视觉效果
             * @method  _logic.valid
             * @private
             * @static
             * @param   {selector}  _item
             * @param   {int}       _tm
             */
            , valid:
                function( _item, _tm ){
                    if( !_logic.isValidItem( _item ) ) return false;
                    setTimeout(function(){
                        _item.removeClass('error');
                        _item.find('~ em').show();
                        _item.find('~ em.error').hide();
                        _item.attr('emel') && _logic.getElement( _item.attr('emel'), _item ).hide();
                    }, _tm || 150);
                }
            /**
             * 显示错误的视觉效果
             * @method  _logic.error
             * @private
             * @static
             * @param   {selector}  _item
             * @param   {string}    _msgAttr    - 显示指定需要读取的错误信息属性名, 默认为 reqmsg, errmsg, 通过该属性可以指定别的属性名
             * @param   {bool}      _fullMsg    - 显示指定错误信息为属性的值, 而不是自动添加的 请上传/选择/填写
             */
            , error: 
                function( _item, _msgAttr, _fullMsg ){
                    if( !_logic.isValidItem( _item ) ) return false;

                    var arg = arguments;

                    setTimeout(function(){
                        var _msg = _logic.getMsg.apply( null, [].slice.call( arg ) ), _errEm;

                        _item.addClass( 'error' );
                        _item.find('~ em:not(.error)').hide();

                        if( _item.is( '[emEl]' ) ){
                            ( _errEm = _logic.getElement( _item.attr( 'emEl' ) , _item) ) && _errEm.length && _errEm.addClass('error');
                        }
                        !( _errEm && _errEm.length ) && ( _errEm = _item.find('~ em.error') );
                        if( !_errEm.length ){
                            ( _errEm = $('<em class="error"></em>') ).insertAfter( _item );
                        }
                        JC.log( 'error: ' + _msg );
                        _errEm.html( _msg ).show() 
                    }, 150);

                    return false;
                }
            /**
             * 获取 _selector 对象
             * <br />这个方法的存在是为了向后兼容qwrap, qwrap DOM参数都为ID
             * @method  _logic.getElement
             * @private
             * @static
             * @param   {selector}  _selector
             */
            , getElement: 
                function( _selector, _item ){
                    if( /^\^$/.test( _selector ) ){
                        _selector = $( _item.parent().find('~ em.error') );
                    }else if( /^[\w-]+$/.test( _selector ) ) {
                        _selector = '#' + _selector;
                    }
                    return $(_selector );
                }
            /**
             * 获取 _item 的检查类型, 所有可用的检查类型位于 _logic.datatype 对象
             * @method  _logic.getDatatype
             * @private
             * @static
             * @param   {selector}  _item
             */
            , getDatatype: 
                function( _item ){
                    return ( _item.attr('datatype') || 'text').toLowerCase().replace(/\-.*/, '');
                }
           /**
             * 获取 _item 的检查子类型, 所有可用的检查子类型位于 _logic.subdatatype 对象
             * @method  _logic.getSubdatatype
             * @private
             * @static
             * @param   {selector}  _item
             */
            , getSubdatatype: 
                function( _item ){
                    return ( _item.attr('subdatatype') || 'text').toLowerCase().replace(/\-.*/, '');
                }
            /**
             * 获取对应的错误信息, 默认的错误信息有 reqmsg, errmsg, <br />
             * 注意: 错误信息第一个字符如果为空格的话, 将完全使用用户定义的错误信息, 将不会动态添加 请上传/选择/填写
             * @method  _logic.getMsg
             * @private
             * @static
             * @param   {selector}  _item
             * @param   {string}    _msgAttr    - 显示指定需要读取的错误信息属性名, 默认为 reqmsg, errmsg, 通过该属性可以指定别的属性名
             * @param   {bool}      _fullMsg    - 显示指定错误信息为属性的值, 而不是自动添加的 请上传/选择/填写
             */
            , getMsg: 
                function( _item, _msgAttr, _fullMsg ){
                    var _msg = _item.is('[errmsg]') ? ' ' + _item.attr('errmsg') : _item.is('[reqmsg]') ? _item.attr('reqmsg') : '';
                    _msgAttr && (_msg = _item.attr( _msgAttr ) || _msg );
                    _fullMsg && _msg && ( _msg = ' ' + _msg );

                    if( _msg && !/^[\s]/.test( _msg ) ){
                        switch( _item.prop('type').toLowerCase() ){
                            case 'file': _msg = '请上传' + _msg; break;

                            case 'select-multiple':
                            case 'select-one':
                            case 'select': _msg = '请选择' + _msg; break;

                            case 'textarea':
                            case 'password':
                            case 'text': _msg = '请填写' + _msg; break;
                        }
                    }

                    JC.log( '_msg: ' + _msg, _item.prop('type').toLowerCase() );

                    return $.trim(_msg);
                }
            /**
             * 计算字符串的字节长度, 非 ASCII 0-255的字符视为两个字节
             * @method  _logic.bytelen
             * @private
             * @static
             * @param   {string}    _s
             */
            , bytelen: 
                function( _s ){
                    return _s.replace(/[^\x00-\xff]/g,"11").length;
                }
            /**
             * 获取日期字符串的 timestamp, 字符串格式为 YYYY[^\d]*?MM[^\d]*?DD
             * @method  _logic.getTimestamp
             * @private
             * @static
             * @param   {string}    _date_str
             */
            , getTimestamp:
                function( _date_str ){
                    _date_str = _date_str.replace( /[^\d]/g, '' );
                    return new Date( _date_str.slice(0,4), parseInt( _date_str.slice( 4, 6 ), 10 ) - 1, _date_str.slice( 6, 8) ).getTime();
                }
            /**
             * 此对象存储可供检查的类型
             * @property    _logic.datatype
             * @type        Object
             * @private
             * @static
             */
            , datatype:{
                /**
                 * 检查是否为正确的数字<br />
                 * <br>默认范围 0 - Math.pow(10, 10)
                 * @method  _logic.datatype.n
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
                n: 
                    function( _item ){
                        var _r = true, _valStr = _item.val(), _val = +_valStr,_min = 0, _max = Math.pow( 10, 10 ), _n, _f, _tmp;

                        if( _item.is('[minvalue]') ){
                            if( /\./.test( _item.attr('minvalue') ) ){
                                _tmp = parseFloat( _item.attr('minvalue') );
                            }else{
                                _tmp = parseInt( _item.attr('minvalue') );
                            }
                            if( !isNaN( _tmp ) ){
                                _min += _tmp;
                            }
                        }

                        if( !isNaN( _val ) && _val >= _min ){
                            _item.attr('datatype').replace( /^n[^\-]*\-(.*)$/, function( $0, $1 ){
                                _tmp = $1.split('.');
                                _n = _tmp[0];
                                _f = _tmp[1];
                            });
                            if( _item.is('[maxvalue]') ) _max = +_item.attr('maxvalue') || _max;

                            if( _val >= _min && _val <= _max ){
                                typeof _n != 'undefined' && typeof _f != 'undefined' && ( _r = new RegExp( '^(?:\-|)(?:[\\d]{0,'+_n+'}|)(?:\\.[\\d]{1,'+_f+'}|)$' ).test( _valStr ) );
                                typeof _n != 'undefined' && typeof _f == 'undefined' && ( _r = new RegExp( '^(?:\-|)[\\d]{1,'+_n+'}$' ).test( _valStr ) );
                                typeof _n == 'undefined' && typeof _f != 'undefined' && ( _r = new RegExp( '^(?:\-|)\\.[\\d]{1,'+_f+'}$' ).test( _valStr ) );
                                typeof _f == 'undefined' && /\./.test( _valStr ) && ( _r = false );
                            } else _r = false;

                            JC.log( 'nValid', _val, typeof _n, typeof _f, typeof _min, typeof _max, _min, _max );
                        }else _r = false;

                        !_r && _logic.error( _item );

                        return _r;
                    }
                /**
                 * 检查两个输入框的数值
                 * <br /> 数字格式为 0-pow(10,10)
                 * <br /> 带小数点使用 nrange-int.float, 例: nrange-1.2  nrange-2.2
                 * <br /> <b>注意:</b> 如果不显示指定 fromNEl, toNEl, 
                 *              将会从父级查找 datatype=nrange属性的input, 如果数量等于2, 则会进行验证, 不等2将忽略
                 * @method  _logic.datatype.nrange
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
                        var _r = _logic.datatype.n( _item ), _min, _max;

                        JC.log( 'zzzz', _r );

                        if( _r ){
                            var _fromNEl, _toNEl;
                            if( _item.is( '[fromNEl]' ) ) _fromNEl = _logic.getElement( _item.attr('fromNEl') );
                            if( _item.is( '[toNEl]' ) ) _toNEl = _logic.getElement( _item.attr('toNEl') );

                            if( !(_fromNEl && _fromNEl.length || _toNEl && _toNEl.length) ){
                                var _pnt = _item.parent(), _items = [];
                                    _pnt.find('input[datatype]').each( function(){
                                        var _sp = $(this);
                                        /nrange/i.test( _sp.attr('datatype') ) && _items.push( this );
                                    });
                                    JC.log( 'ccc', _items.length );
                                    if( _items.length === 2 ){
                                        _fromNEl = $(_items[0]);
                                        _toNEl = $(_items[1]);
                                    }
                            }
                            JC.log( 'aaaa', _r );
                            if( _fromNEl && _fromNEl.length || _toNEl && _toNEl.length ){

                                _fromNEl && _fromNEl.length && !( _toNEl && _toNEl.length ) && ( _toNEl = _item );
                                !(_fromNEl && _fromNEl.length) && _toNEl && _toNEl.length && ( _fromNEl = _item );

                                JC.log( 'nrange', _fromNEl.length, _toNEl.length );

                                _toNEl.val( $.trim( _toNEl.val() ) );
                                _fromNEl.val( $.trim( _fromNEl.val() ) );
                                
                                if( _toNEl[0] != _fromNEl[0] && _toNEl.val().length && _fromNEl.val().length ){

                                    _r && ( _r = _logic.datatype.n( _toNEl ) );
                                    _r && ( _r = _logic.datatype.n( _fromNEl ) );

                                    _r && ( +_fromNEl.val() ) > ( +_toNEl.val() ) && ( _r = false );
                                    
                                    JC.log( +_fromNEl.val(), +_toNEl.val(), _r );

                                    _r && _logic.valid( _fromNEl );
                                    _r && _logic.valid( _toNEl );

                                    if( _r ){ _fromNEl.removeClass('error'); _toNEl.removeClass('error'); }
                                    else{ _fromNEl.addClass('error'); _toNEl.addClass('error'); }
                                }
                            }
                        }

                        !_r && _logic.error( _item );

                        return _r;
                    }
                /**
                 * 检查是否为合法的日期,
                 * <br />日期格式为 YYYYMMDD, YYYY/MM/DD, YYYY-MM-DD, YYYY.MM.DD
                 * @method  _logic.datatype.d
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
                , d: 
                    function( _item ){
                        var _val = $.trim( _item.val() ), _r, _re = /^[\d]{4}([\/.-]|)[01][\d]\1[0-3][\d]$/;
                        if( !_val ) return true;
                            
                        if( _r = _re.test( _val ) ){
                            var _utime = _logic.getTimestamp( _item.val() ), _minTime, _maxTime;

                            if( _item.is('[minvalue]') && ( _r = _re.test( _item.attr('minvalue') ) ) ){
                                _minTime = _logic.getTimestamp( _item.attr('minvalue') );
                                _utime < _minTime && ( _r = false );
                            }

                            if( _r && _item.is('[maxvalue]') && ( _r = _re.test( _item.attr('maxvalue') ) ) ){
                                _maxTime = _logic.getTimestamp( _item.attr('maxvalue') );
                                _utime > _maxTime && ( _r = false );
                            }
                        }

                        !_r && _logic.error( _item );

                        return _r;
                    }
                /**
                 * 检查两个输入框的日期
                 * <br />日期格式为 YYYYMMDD, YYYY/MM/DD, YYYY-MM-DD, YYYY.MM.DD
                 * <br /> <b>注意:</b> 如果不显示指定 fromDateEl, toDateEl, 
                 *              将会从父级查找 datatype=datarange属性的input, 如果数量等于2, 则会进行验证, 不等2将忽略
                 * @method  _logic.datatype.daterange
                 * @private
                 * @static
                 * @param   {selector}  _item
                 * @attr    {require}               datatype    - datarange
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
                        var _r = _logic.datatype.d( _item ), _min, _max;

                        if( _r ){
                            var _fromDateEl, _toDateEl;
                            if( _item.is( '[fromDateEl]' ) ) _fromDateEl = _logic.getElement( _item.attr('fromDateEl') );
                            if( _item.is( '[toDateEl]' ) ) _toDateEl = _logic.getElement( _item.attr('toDateEl') );

                            if( !(_fromDateEl && _fromDateEl.length || _toDateEl && _toDateEl.length) ){
                                var _pnt = _item.parent(), _items = _pnt.find('input[datatype=daterange]');
                                    if( _items.length === 2 ){
                                        _fromDateEl = $(_items[0]);
                                        _toDateEl = $(_items[1]);
                                    }
                            }
                            if( _fromDateEl && _fromDateEl.length || _toDateEl && _toDateEl.length ){

                                _fromDateEl && _fromDateEl.length && !( _toDateEl && _toDateEl.length ) && ( _toDateEl = _item );
                                !(_fromDateEl && _fromDateEl.length) && _toDateEl && _toDateEl.length && ( _fromDateEl = _item );

                                JC.log( 'daterange', _fromDateEl.length, _toDateEl.length );

                                _toDateEl.val( $.trim( _toDateEl.val() ) );
                                _fromDateEl.val( $.trim( _fromDateEl.val() ) );
                                if( _toDateEl[0] != _fromDateEl[0] && _toDateEl.val().length && _fromDateEl.val().length ){

                                    _r && ( _r = _logic.datatype.d( _toDateEl ) );
                                    _r && ( _r = _logic.datatype.d( _fromDateEl ) );

                                    _r && _logic.getTimestamp( _fromDateEl.val() ) > _logic.getTimestamp( _toDateEl.val() ) && ( _r = false );

                                    _r && _logic.valid( _fromDateEl );
                                    _r && _logic.valid( _toDateEl );

                                    if( _r ){ _fromDateEl.removeClass('error'); _toDateEl.removeClass('error'); }
                                    else{ _fromDateEl.addClass('error'); _toDateEl.addClass('error'); }
                                }
                            }
                        }

                        !_r && _logic.error( _item );

                        return _r;
                    }
                /**
                 * 检查时间格式, 格式为 hh:mm:ss
                 * @method  _logic.datatype.time
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
                        var _r = /^(([0-1]\d)|(2[0-3])):[0-5]\d:[0-5]\d$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查时间格式, 格式为 hh:mm
                 * @method  _logic.datatype.minute
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
                        var _r = /^(([0-1]\d)|(2[0-3])):[0-5]\d$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查银行卡号码
                 * <br />格式为 d{19} | d{16} | 1111 1111 1111 1111 111 | 1111 1111 1111 1111111
                 * @method  _logic.datatype.bankcard
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
                        var _r = /^[1-9][\d]{3}(?: |)(?:[\d]{4}(?: |))(?:[\d]{4}(?: |))(?:[\d]{4})(?:(?: |)[\d]{3}|)$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查中文姓名
                 * <br>格式: 汉字和大小写字母
                 * <br>规则: 长度 2-32个字节, 非 ASCII 算2个字节
                 * @method  _logic.datatype.cnname
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
                    function( _item ){
                        var _r = _logic.bytelen( _item.val() ) < 32 && /^[\u4e00-\u9fa5a-zA-Z.\u3002\u2022]{2,32}$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查注册用户名
                 * <br>格式: a-zA-Z0-9_-
                 * <br>规则: 首字母必须为 [a-zA-Z0-9], 长度 2 - 30
                 * @method  _logic.datatype.username
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
                        var _r = /^[a-zA-Z0-9][\w-]{2,30}$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查身份证号码<br />
                 * 目前只使用最简单的位数判断~ 有待完善
                 * @method  _logic.datatype.idnumber
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
                        var _r = /^[0-9]{15}(?:[0-9]{2}(?:[0-9xX])|)$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查手机号码<br />
                 * @method  _logic.datatype.mobilecode
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
                        var _r =  /^(?:13|14|15|16|18|19)[\d]{9}$/.test( _item.val() );
                        !_noError && !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查手机号码
                 * <br />这个方法是 _logic.datatype.mobilecode 的别名
                 * @method  _logic.datatype.mobile
                 * @private
                 * @static
                 * @param   {selector}  _item
                 * @param   {bool}      _noError
                 */
                , mobile:
                    function( _item, _noError ){
                        return _logic.datatype.mobilecode( _item, _noError );
                    }
                /**
                 * 检查手机号码加强方法
                 * <br>格式: [+国家代码] [零]11位数字
                 * @method  _logic.datatype.mobilezonecode
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
                        var _r = /^(?:\+[0-9]{1,6} |)(?:0|)(?:13|14|15|16|18|19)\d{9}$/.test( _item.val() );
                        !_noError && !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查电话号码
                 * <br>格式: 7/8位数字
                 * @method  _logic.datatype.phonecode
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
                        var _r =  /^[1-9][0-9]{6,7}$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查电话号码
                 * <br>格式: [区号]7/8位电话号码
                 * @method  _logic.datatype.phone
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
                        var _r = /^(?:0(?:10|2\d|[3-9]\d\d)(?: |\-|)|)[1-9][\d]{6,7}$/.test( _item.val() );
                        !_noError && !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查电话号码
                 * <br>格式: [+国家代码][ ][电话区号][ ]7/8位电话号码[#分机号]
                 * @method  _logic.datatype.phoneall
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
                        var _r = /^(?:\+[\d]{1,6}(?: |\-)|)(?:0[\d]{2,3}(?:\-| |)|)[1-9][\d]{6,7}(?:(?: |)\#[\d]{1,6}|)$/.test( _item.val() );
                        !_noError && !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查电话区号
                 * @method  _logic.datatype.phonezone
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
                        var _r = /^[0-9]{3,4}$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查电话分机号码
                 * @method  _logic.datatype.phoneext
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
                        var _r =  /^[0-9]{1,6}$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查手机号码/电话号码
                 * <br />这个方法是原有方法的混合验证 _logic.datatype.mobilecode + _logic.datatype.phone
                 * @method  _logic.datatype.mobilephone
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
                        var _r = _logic.datatype.mobilecode( _item, true ) || _logic.datatype.phone( _item, true );
                        !_r && _logic.error( _item );
                        return _r;
                    }

                /**
                 * 检查手机号码/电话号码, 泛匹配
                 * <br />这个方法是原有方法的混合验证 _logic.datatype.mobilezonecode + _logic.datatype.phoneall
                 * @method  _logic.datatype.mobilephoneall
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
                        var _r = _logic.datatype.mobilezonecode( _item, true ) || _logic.datatype.phoneall( _item, true );
                        !_r && _logic.error( _item );
                        return _r;
                    }

                /**
                 * 检查内容的长度
                 * @method  _logic.datatype.length
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
                , 'length': 
                    function( _item ){
                        var _r = true, _dt = _logic.getDatatype( _item ), _min, _max, _val = $.trim( _item.val() ), _len;
                        if( !_val ) return _r;

                        if( _item.is( '[minlength]' ) ){
                            JC.log( 'minlength' );
                            _min = parseInt( _item.attr( 'minlength' ), 10 ) || 0;
                        }
                        
                        if( _item.is( '[maxlength]' ) ){
                            JC.log( 'maxlength' );
                            _max = parseInt( _item.attr( 'maxlength' ), 10 ) || 0;
                        }
                        /**
                         * 根据特殊的 datatype 实现不同的计算方法
                         */
                        switch( _dt ){
                            case 'bytetext':
                                {
                                    _len = _logic.bytelen( _val );
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

                        JC.log( 'lengthValid: ', _min, _max, _r );

                        !_r && _logic.error( _item );

                        return _r;
                    }
                /**
                 * 检查内容是否为空,
                 * <br>如果声明了该属性, 那么 value 须不为空
                 * @method  _logic.datatype.reqmsg
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

                        var _r;
                        if( _item.val() && _item.val().constructor == Array ){
                            _r = !!( $.trim( _item.val().join('') + '' ) );
                        }else{
                            _r = !!$.trim( _item.val() ||'') ;
                        }

                        !_r && _logic.error( _item, 'reqmsg' );
                        JC.log( 'regmsgValid: ' + _r );
                        return _r;
                    }
                /**
                 * 自定义正则校验
                 * @method  _logic.datatype.reg
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
                        var _r = true, _pattern;
                        if( _item.is( '[reg-pattern]' ) ) _pattern = _item.attr( 'reg-pattern' );
                        if( !_pattern ) _pattern = $.trim(_item.attr('datatype')).replace(/^reg(?:\-|)/i, '');

                        _pattern.replace( /^\/([\s\S]*)\/([\w]{0,3})$/, function( $0, $1, $2 ){
                            JC.log( $1, $2 );
                            _r = new RegExp( $1, $2 || '' ).test( _item.val() );
                        });

                        !_r && _logic.error( _item );

                        return _r;
                    }
                /**
                 * 检查验证码<br />
                 * 格式: 为 0-9a-zA-Z, 长度 默认为4
                 * @method  _logic.datatype.vcode
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
                        var _r, _len = parseInt( $.trim(_item.attr('datatype')).replace( /^vcode(?:\-|)/i, '' ), 10 ) || 4; 
                        JC.log( 'vcodeValid: ' + _len );
                        _r = new RegExp( '^[0-9a-zA-Z]{'+_len+'}$' ).test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查文本长度
                 * @method  _logic.datatype.text
                 * @private
                 * @static
                 * @see _logic.datatype.length
                 * @attr    {string}    datatype    text
                 */
                , text: function(_item){ return true; }
                /**
                 * 检查文本的字节长度
                 * @method  _logic.datatype.bytetext
                 * @private
                 * @static
                 * @see _logic.datatype.length
                 * @attr    {string}    datatype    bytetext
                 */
                , bytetext: function(_item){ return true; }
                /**
                 * 检查富文本的字节
                 * <br />TODO: 完成富文本长度检查
                 * @method  _logic.datatype.richtext
                 * @private
                 * @static
                 * @see _logic.datatype.length
                 * @attr    {string}    datatype    richtext
                 */
                , richtext: function(_item){ return true; }
                /**
                 * 检查URL
                 * @method  _logic.datatype.url
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
                        var _r = /^((http|ftp|https):\/\/|)[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查域名
                 * @method  _logic.datatype.domain
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
                        var _r = /^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.(\w{2,6})(?:\/|)$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查域名
                 * @method  _logic.datatype.stricdomain
                 * @private
                 * @static
                 * @param   {selector}  _item
                        <div class="f-l">
                            <input type="TEXT" name="company_domain" datatype="stricdomain" reqmsg="域名" errmsg="请填写正确的域名">
                        </div>
                 */
                , stricdomain:
                    function( _item ){
                        var _r = /^((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.(\w{2,6})$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查电子邮件
                 * @method  _logic.datatype.email
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
                        var _r = /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
                /**
                 * 检查邮政编码
                 * @method  _logic.datatype.zipcode
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
                        var _r = /^[0-9]{6}$/.test( _item.val() );
                        !_r && _logic.error( _item );
                        return _r;
                    }
            }//datatype
            /**
             * 此对象存储可供检查的子类型
             * @property    _logic.subdatatype
             * @type        Object
             * @private
             * @static
             */
            , subdatatype: {
                /**
                 * 此类型检查 2|N个对象必须至少有一个是有输入内容的, 
                 * <br> 常用于 手机/电话 二填一
                 * @method  _logic.subdatatype.alternative
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
                alternative:
                    function( _item ){
                        var _r = true, _target;
                        JC.log( 'alternative' );

                        _item.is( '[datatarget]' ) && (_target = $(_item.attr('datatarget')) );
                        !( _target && _target.length ) && ( _target = _item.parent().find('[subdatatype=alternative]') );

                        if( _target.length && !$.trim( _item.val() ) ){
                            var _hasVal = false;
                            _target.each( function(){ if( $(this).val() ){ _hasVal = true; return false; } } );
                            _r = _hasVal;
                        }

                        !_r && _logic.error( _item, 'alternativemsg', true );
                        !_r && _target && _target.length 
                            && _target.each( function(){ _logic.error( $(this), 'alternativemsg', true ); } );
                        _r && _target && _target.length 
                            && _target.each( function(){ _logic.valid( $(this) ); } );

                        return _r;
                    }
                /**
                 * 此类型检查 2|N 个对象填写的值必须一致
                 * 常用于注意时密码验证/重置密码
                 * @method  _logic.subdatatype.reconfirm
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
                        var _r = true, _target;

                        JC.log( 'reconfirm' );

                        _item.is( '[datatarget]' ) && (_target = $(_item.attr('datatarget')) );
                        !( _target && _target.length ) && ( _target = _item.parent().find('[subdatatype=reconfirm]') );

                        if( _target && _target.length ){
                            _target.each( function(){ if( _item.val() != $(this).val() ) return _r = false; } );
                        }

                        !_r && _logic.error( _item, 'reconfirmmsg', true );
                        !_r && _target.length && _target.each( function(){ _logic.error( $(this), 'reconfirmmsg', true ); } );
                        _r && _target.length && _target.each( function(){ _logic.valid( $(this) ); } );

                        return _r;
                    }
            }//subdatatype
        };//_logic

}(jQuery));
