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
    JC.AutoSelect && ( JC.Form.initAutoSelect = JC.AutoSelect );
    /**
     * select 级联下拉框无限联动
     * <br />这个方法已经摘取出来, 单独成为一个类.
     * <br />详情请见: <a href="../../docs_api/classes/JC.AutoSelect.html">JC.AutoSelect.html</a>
     * <br />目前摘出去的类与之前的逻辑保持向后兼容, 但在不久的将来将会清除这个方法
     * @method  JC.Form.initAutoSelect
     * @static
     */
}(jQuery));

 ;(function($){
    /**
     * 初始化 checkbox 全选反选功能
     * <br />只要引用本脚本, 页面加载完毕时就会自动初始化全选反选功能
     * <br /><br />动态添加的 DOM 需要显式调用 JC.Form.initCheckAll( domSelector ) 进行初始化
     * <br /><br />要使页面上的全选反选功能能够自动初始化, 需要在全选反选按钮上加入一些HTML 属性
     * <br /><b>checktype</b>: all | inverse, all=全选/全不选, inverse=反选
     * <br /><b>checkfor</b>: selector, 要全选/反选的 checkbox 选择器语法
     * <br /><b>checkall</b>: selector, 全选按钮的选择器, 这个只有反选按钮需要, 反选时变更全选按钮的状态
     * @method  initCheckAll
     * @static
     * @for JC.Form
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-06-11
     * @param   {selector}  _selector   要初始化的全选反选的父级节点
     * @example
            <h2>AJAX data:</h2>
            <dl class="def example24">
                <dt>checkall example 24</dt>
                <dd>
                    <label>
                        <input type="checkbox" checktype="all" checkfor="dl.example24 input[type=checkbox]">
                        全选
                    </label>
                    <label>
                        <input type="checkbox" checktype="inverse" checkfor="dl.example24 input[type=checkbox]" checkall="dl.example24 input[checktype=all]">
                        反选
                    </label>
                </dd>
                <dd>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_1
                    </label>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_2
                    </label>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_3
                    </label>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_4
                    </label>
                    <label>
                        <input type='checkbox' value='' name='' checked />
                        checkall24_5
                    </label>
                </dd>
            </dl>

            <script>
            $(document).delegate( 'button.js_ajaxTest', 'click', function(){
                var _p = $(this);
                _p.prop('disabled', true);
                setTimeout( function(){ _p.prop('disabled', false); }, 1000 );

                $.get( './data/initCheckAll.php?rnd='+new Date().getTime(), function( _r ){
                    var _selector = $(_r);
                    $( $( 'body' ).children().first() ).before( _selector );
                    JC.Form.initCheckAll( _selector );
                });
            });
            </script>
     */
    AutoChecked.initCheckAll = 
        function( _selector ){
            _selector = $( _selector );
            var _ls = _selector.find( 'input[type=checkbox][checktype][checkfor]' ), _p;
            _ls.each( function(){
                _p = $(this);
                if( !AutoChecked.isAutoChecked( _p ) ) return;
                if( AutoChecked.getInstance( _p ) ) return;
                new AutoChecked( _p );
            });
        };
    JC.Form.initCheckAll = AutoChecked.initCheckAll;

    function AutoChecked( _selector ){
        if( AutoChecked.getInstance( _selector ) ) return AutoChecked.getInstance( _selector );
        AutoChecked.getInstance( _selector, this );

        JC.log( 'AutoChecked init', new Date().getTime() );

        this._model = new Model( _selector );
        this._view = new View( this._model );

        this._init();
    }
    
    AutoChecked.prototype = {
        _init:
            function(){
                var _p = this;

                _p._initHandlerEvent();

                $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = sliceArgs( arguments ); _data.shift(); _data.shift();
                    _p.trigger( _evtName, _data );
                });

                _p._model.init();
                _p._view.init();

                _p._view.itemChange();

                return _p;
            }    

        , _initHandlerEvent:
            function(){
                var _p = this;
                _p.selector().on('change', function(){
                    _p.trigger( _p._model.checktype() );
                });

                _p.on('all', function(){
                    JC.log( 'AutoChecked all', new Date().getTime() );
                    _p._view.allChange();
                });

                _p.on('inverse', function(){
                    JC.log( 'AutoChecked inverse', new Date().getTime() );
                    _p._view.inverseChange();
                });

                if( !( _p._model.checktype() == 'inverse' && _p._model.hasCheckAll() ) ){
                    $( _p._model.delegateElement() ).delegate( _p._model.delegateSelector(), 'click', function( _evt ){
                        if( AutoChecked.isAutoChecked( $(this) ) ) return;
                        JC.log( 'AutoChecked change', new Date().getTime() );
                        _p._view.itemChange();
                    });
                }

            }
        /**
         * 获取 显示 AutoChecked 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  AutoCheckedInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  AutoCheckedInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    }
    /**
     * 获取或设置 AutoChecked 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {AutoChecked instance}
     */
    AutoChecked.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'AutoCheckedIns', _setter );

            return _selector.data('AutoCheckedIns');
        };
    /**
     * 判断 selector 是否可以初始化 AutoChecked
     * @method  isAutoChecked
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    AutoChecked.isAutoChecked =
        function( _selector ){
            var _r;
            _selector 
                && ( _selector = $(_selector) ).length 
                && ( _r = _selector.is( '[checkfor]' ) && _selector.is( '[checktype]' ) );
            return _r;
        };
    
    function Model( _selector ){
        this._selector = _selector;
    }

    Model.isParentSelectorRe = /^[\/\|<]/;
    Model.parentSelectorRe = /[^\/\|<]/g;
    Model.childSelectorRe = /[\/\|<]/g;

    Model.prototype = {
        init:
            function(){
                return this;
            }
        , checktype:
            function(){
                return ( this.selector().attr('checktype') || '' ).toLowerCase();
            }

        , checkfor:
            function(){
                return ( this.selector().attr('checkfor') || '' );
            }

        , checkall:
            function(){
                return ( this.selector().attr('checkall') || '' );
            }

        , hasCheckAll: function(){ return this.selector().is('[checkall]') && this.selector().attr('checkall'); }

        , selector: function(){ return this._selector; }

        , isParentSelector: function(){ return Model.isParentSelectorRe.test( this.selector().attr( 'checkfor' ) ); }

        , delegateSelector:
            function(){
                var _r = this.selector().attr('checkfor'), _tmp;
                if( this.isParentSelector() ){
                    if( /^</.test( this.checkfor() ) ){
                        this.checkfor().replace( /[\s]([\s\S]+)/, function( $0, $1 ){
                            _r = $1;
                        });
                    }else{
                        _r = this.checkfor().replace( Model.childSelectorRe, '' );
                    }
                }
                return _r;
            }

        , delegateElement:
            function(){
                var _p = this, _r = $(document), _tmp;
                if( this.isParentSelector() ){
                    if( /^</.test( this.checkfor() ) ){
                        this.checkfor().replace( /^([^\s]+)/, function( $0, $1 ){
                            _r = parentSelector( _p.selector(), $1 );
                        });
                    }else{
                        _tmp = this.checkfor().replace( Model.parentSelectorRe, '' );
                        _r = parentSelector( _p.selector(), _tmp );
                    }
                }
                return _r;
            }

        , items:
            function(){
                return this.delegateElement().find( this.delegateSelector() );
            }

        , checkedAll: function(){ return this.selector().prop('checked'); }
        , checkedInverse: function(){ return this.selector().prop('checked'); }

        , allSelector:
            function(){
                var _r;
                if( this.checktype() == 'inverse' ){
                    this.checkall() 
                        && ( _r = parentSelector( this.selector(), this.checkall() ) )
                        ;
                }else{
                    _r = this.selector();
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
                return this;
            }
        , itemChange:
            function(){
                switch( this._model.checktype() ){
                    case 'all': this._fixAll(); break;
                }
            }
        , allChange:
            function(){
                var _p = this, _checked = _p._model.checkedAll();
                _p._model.items().each( function(){
                    if( AutoChecked.isAutoChecked( $(this) ) ) return;
                    if( $(this).is('[disabled]') ) return;
                    $(this).prop( 'checked', _checked );
                });
            }
        , inverseChange:
            function(){
                var _p = this;
                _p._model.items().each( function(){
                    var _sp = $(this);
                    if( AutoChecked.isAutoChecked( _sp ) ) return;
                    if( $(this).is('[disabled]') ) return;
                    _sp.prop( 'checked', !_sp.prop('checked') );
                });
                this._fixAll();
            }
        , _fixAll:
            function(){
                var _p = this, _checkAll = true;
                if( _p._model.allSelector().prop( 'disabled' ) ) return;

                _p._model.items().each( function(){
                    if( AutoChecked.isAutoChecked( $(this) ) ) return;
                    if( $(this).is('[disabled]') ) return;
                    if( !$(this).prop('checked') ) return _checkAll = false;
                });

                JC.log( '_fixAll:', _checkAll );

                _p._model.allSelector().prop('checked', _checkAll);
            }
    };
 
    $(document).ready( function( _evt ){
        JC.Form.initCheckAll( $(document) );
    });
}(jQuery));

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
            if( !(_selector && _selector.length ) ) _selector = $(document);
            _url = _url || location.href;

            JC.log( 'JC.Form.initAutoFill' );

            _selector.find('form.js_autoFillUrlForm').each( function(){
                var _p = $(this);
                
                _p.find( 'input[type=text][name],input[type=password][name],textarea[name]' ).each( function(){
                    var _sp = $(this);
                    if( has_url_param( _url, _sp.attr('name') ) ){
                        _sp.val( decode( get_url_param( _url, _sp.attr('name') ).replace(/[\+]/g, ' ' ) ) );
                    }
                });

                _p.find( 'select[name]' ).each( function(){
                    var _sp = $(this), _uval = decode( get_url_param( _url, _sp.attr('name') ).replace(/[\+]/g, ' ' ) ) ;
                    if( has_url_param( _url, _sp.attr('name') ) ){
                        if( selectHasVal( _sp, _uval ) ){
                            _sp.val( get_url_param( _url, _sp.attr('name') ) );
                        }else{
                            _sp.attr( 'selectvalue', _uval );
                        }
                    }
                });

            });
        };

    $(document).ready( function( _evt ){ JC.Form.initAutoFill(); });

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
}(jQuery));


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
