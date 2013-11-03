;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.AutoSelect', 'JC.AutoChecked' ], function(){
;(function($){
    /**
     * 表单常用功能类 JC.Form
     * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Form.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Form/_demo' target='_blank'>demo link</a></p>
     * @namespace JC
     * @class Form
     * @static
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-06-11
     */
    window.JCForm = JC.Form = {
        /**
         * 禁用按钮一定时间, 默认为1秒
         * @method  disableButton
         * @static
         * @param   {selector}  _selector   要禁用button的选择器
         * @param   {int}       _durationMs 禁用多少时间, 单位毫秒, 默认1秒
         */
        'disableButton':
            function( _selector, _durationMs ){
                if( !_selector ) return;
                _selector = $(_selector);
                _durationMs = _durationMs || 1000;
                _selector.attr('disabled', true);
                setTimeout( function(){
                    _selector.attr('disabled', false);
                }, _durationMs);
            }
    };
    /**
     * select 级联下拉框无限联动
     * <br />这个方法已经摘取出来, 单独成为一个类.
     * <br />详情请见: <a href="../../docs_api/classes/JC.AutoSelect.html">JC.AutoSelect.html</a>
     * <br />目前摘出去的类与之前的逻辑保持向后兼容, 但在不久的将来将会清除这个方法
     * @method  initAutoSelect
     * @static
     */
    JC.AutoSelect && ( JC.Form.initAutoSelect = JC.AutoSelect );
    /**
     * 全选/反选
     * <br />这个方法已经摘取出来, 单独成为一个类.
     * <br />详情请见: <a href="../../docs_api/classes/JC.AutoChecked.html">JC.AutoChecked.html</a>
     * <br />目前摘出去的类与之前的逻辑保持向后兼容, 但在不久的将来将会清除这个方法
     * @method  initCheckAll
     * @static
     */
    JC.AutoChecked && ( JC.Form.initCheckAll = JC.AutoChecked );
}(jQuery));
;

 ;(function($){
    /**
     * 表单自动填充 URL GET 参数
     * <br />只要引用本脚本, DOM 加载完毕后, 页面上所有带 class js_autoFillUrlForm 的 form 都会自动初始化默认值
     * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs/docs_api/classes/JC.Form.html' target='_blank'>API docs</a>
     * @method  initAutoFill
     * @static
     * @for JC.Form
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-06-13
     * @param   {selector|url string}   _selector   显示指定要初始化的区域, 默认为 document
     * @param   {string}                _url        显示指定, 取初始化值的 URL, 默认为 location.href
     * @example
     *      JC.Form.initAutoFill( myCustomSelector, myUrl );
     */
     JC.Form.initAutoFill =
        function( _selector, _url ){
            _selector = $( _selector || document );
            if( !(_selector && _selector.length ) ) _selector = $(document);
            _url = _url || location.href;

            JC.log( 'JC.Form.initAutoFill' );

            if( _selector.prop( 'nodeName' ).toLowerCase() == 'form' ){
                fillForm( _selector, _url );
            }else{
                var _fms = _selector.find('form.js_autoFillUrlForm');
                _fms.each( function(){
                    fillForm( this, _url );
                });

                if( !_fms.length ){
                    fillItems( _selector, _url );
                }
            }

        };

    function fillItems( _selector, _url ){
        _selector = $(_selector);
        _url = decode( _url );
        
        _selector.find( 'input[type=text][name],input[type=password][name],textarea[name]' ).each( function(){
            var _sp = $(this);
            if( hasUrlParam( _url, _sp.attr('name') ) ){
                _sp.val( decode( getUrlParam( _url, _sp.attr('name') ).replace(/[\+]/g, ' ' ) ) );
            }
        });

        _selector.find( 'select[name]' ).each( function(){
            var _sp = $(this), _uval = decode( getUrlParam( _url, _sp.attr('name') ).replace(/[\+]/g, ' ' ) ) ;
            if( hasUrlParam( _url, _sp.attr('name') ) ){
                if( selectHasVal( _sp, _uval ) ){
                    _sp.removeAttr('selectignoreinitrequest');
                    _sp.val( getUrlParam( _url, _sp.attr('name') ) );
                }else{
                    _sp.attr( 'selectvalue', _uval );
                }
            }
        });

        var _keyObj = {};
        _selector.find( 'input[type=checkbox][name], input[type=radio][name]' ).each( function(){
            var _sp = $(this), _key = _sp.attr('name').trim(), _keys, _v = _sp.val();
            //alert( _sp.attr('name') );
            if( !( _key in _keyObj ) ){
                _keys = getUrlParams( _url, _key );
                _keyObj[ _key ] = _keys;
            }else{
                _keys = _keyObj[ _key ];
            }

            if( _keys && _keys.length ){
                $.each( _keys, function( _ix, _item ){
                    if( _item == _v ){
                        _sp.prop('checked', true);
                        _sp.trigger('change');
                    }
                });
            }
        });

        window.jcAutoInitComps && jcAutoInitComps( _selector );
    }

    function fillForm( _selector, _url ){
        fillItems( _selector, _url );
        /*
            ?s_startTime=2013-08-28
                &s_endTime=2013-09-28
                &kword_type=
                &kword=
                &department[]=2
                &department[]=3
                &operator[]=328
                &operator[]=330
                &operator[]=331
                &isp=1379841840601_232_161
        */
    }
    /**
     * 自定义 URI decode 函数
     * @property    initAutoFill.decodeFunc
     * @static
     * @for JC.Form
     * @type    function
     * @default null
     */
    JC.Form.initAutoFill.decodeFunc;

    function decode( _val ){
        try{
            _val = (JC.Form.initAutoFill.decodeFunc || decodeURIComponent)( _val );
        }catch(ex){}
        return _val;
    }
    /**
     * 判断下拉框的option里是否有给定的值
     * @method  initAutoFill.selectHasVal
     * @private
     * @static
     * @param   {selector}  _select
     * @param   {string}    _val    要查找的值
     */
    function selectHasVal( _select, _val ){
        var _r = false, _val = _val.toString();
        _select.find('option').each( function(){
            var _tmp = $(this);
            if( _tmp.val() == _val ){
                _r = true;
                return false;
            }
        });
        return _r;
    }

    $(document).ready( function( _evt ){ 
        setTimeout( function(){ JC.Form.initAutoFill(); }, 50 );
    });

}(jQuery));

;

 ;(function($){
    /**
     * 文本框 值增减 应用
     * <br />只要引用本脚本, 页面加载完毕时就会自动初始化 NumericStepper
     * <br />所有带 class js_NStepperPlus, js_NStepperMinus 视为值加减按钮
     * <br /><br />目标文本框可以添加一些HTML属性自己的规则, 
     * <br />nsminvalue=最小值(默认=0), nsmaxvalue=最大值(默认=100), nsstep=步长(默认=1), nsfixed=小数点位数(默认=0)
     * <br />nschangecallback=值变改后的回调
     * @method  initNumericStepper
     * @static
     * @for JC.Form
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 360 75 Team
     * @date    2013-07-05
     * @param   {selector}  _selector   要初始化的全选反选的父级节点
     * @example
             <dl class="def example1">
                <dt>JC.Form.initNumericStepper 默认值 0 - 100, step 1, fixed 0</dt>
                <dd>
                    <button class="NS_icon NS_minus js_NStepperMinus" nstarget="input.js_ipt1" ></button>
                    <input type="text" value="0" class="js_ipt1" />
                    <button class="NS_icon NS_plus js_NStepperPlus" nstarget="input.js_ipt1" ></button>
                </dd>
            </dl>

            <dl class="def example1">
                <dt>JC.Form.initNumericStepper -10 ~ 10, step 2, fixed 2</dt>
                <dd>
                    <button class="NS_icon NS_minus js_NStepperMinus" nstarget="input.js_ipt2" ></button>
                    <input type="text" value="4" class="js_ipt2" nsminvalue="-10" nsmaxvalue="10" nsstep="2" nsfixed="2" />
                    <button class="NS_icon NS_plus js_NStepperPlus" nstarget="input.js_ipt2" ></button>
                </dd>
            </dl>
     */
    JC.Form.initNumericStepper = 
        function( _selector ){
            _selector && ( _selector = $( _selector ) );

            _selector.delegate( '.js_NStepperPlus, .js_NStepperMinus', 'click', function( _evt ){
                var _p = $(this), _target = _logic.target( _p );
                if( !( _target && _target.length ) ) return;

                var _fixed = parseInt( _logic.fixed( _target ), 10 ) || 0;
                var _val = $.trim( _target.val() ), _step = _logic.step( _target );
                    _val = ( _fixed ? parseFloat( _val ) : parseInt( _val, 10 ) ) || 0;
                var _min = _logic.minvalue( _target ), _max = _logic.maxvalue( _target );

                _p.hasClass( 'js_NStepperPlus') && ( _val += _step );
                _p.hasClass( 'js_NStepperMinus') && ( _val -= _step );

                _val < _min && ( _val = _min );
                _val > _max && ( _val = _max );

                JC.log( _min, _max, _val, _fixed, _step );

                _target.val( _val.toFixed( _fixed ) );

                _logic.callback( _target ) && _logic.callback( _target ).call( _target, _p );
            });
        };
    /**
     * 文本框 值增减 值变改后的回调
     * <br />这个是定义全局的回调函数, 要定义局部回调请在目标文本框上添加 nschangecallback=回调 HTML属性
     * @property    initNumericStepper.onchange
     * @type    function
     * @static
     * @for JC.Form
     */
    JC.Form.initNumericStepper.onchange;

    var _logic = {
        target:
            function( _src ){
                var _r; 
                if( _src.attr( 'nstarget') ){
                    if( /^\~/.test( _src.attr('nstarget') ) ){
                        _r = _src.parent().find( _src.attr('nstarget').replace( /^\~[\s]*/g, '') );
                        !( _r && _r.length ) && ( _r = $( _src.attr('nstarget') ) );
                    }else{
                        _r = $( _src.attr('nstarget') );
                    }
                }

                return _r;
            }

        , fixed: function( _target ){ return _target.attr('nsfixed'); }
        , step: function( _target ){ return parseFloat( _target.attr( 'nsstep' ) ) || 1; }
        , minvalue: function( _target ){ return parseFloat( _target.attr( 'nsminvalue' ) || _target.attr( 'minvalue' ) ) || 0; }
        , maxvalue: function( _target ){ return parseFloat( _target.attr( 'nsmaxvalue' ) || _target.attr( 'maxvalue' ) ) || 100; }
        , callback: 
            function( _target ){ 
                var _r = JC.Form.initNumericStepper.onchange, _tmp;
                _target.attr('nschangecallback') && ( _tmp = window[ _target.attr('nschangecallback') ] ) && ( _r = _tmp );
                return _r;
            }
    };

    $(document).ready( function( _evt ){
        JC.Form.initNumericStepper( $(document) );
    });
}(jQuery));
});}(typeof define === 'function' && define.amd ? define : function (_require, _cb) { _cb && _cb(); }, this));
