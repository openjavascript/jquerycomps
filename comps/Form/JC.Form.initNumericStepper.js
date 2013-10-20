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
