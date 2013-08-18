;(function($){
    window.ExampleClass = JC.ExampleClass = ExampleClass;
    /**
     * ExampleClass 模板类
     * <br />要新建一个组件时, 直接 copy ExampleClass 组件改一下命名就可以开始编码了
     * <dl>
     *      <dd><b>requires</b>: <a href='window.jQuery.html'>jQuery</a></dd>
     * </dl>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.ExampleClass.html' target='_blank'>API docs</a>
     * | <a href='../../comps/ExampleClass/_demo' target='_blank'>demo link</a></p>
     * @namespace JC
     * @class ExampleClass
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     * @date    2013-07-20
     * @example
     */
    function ExampleClass( _selector ){
        if( ExampleClass.getInstance( _selector ) ) return ExampleClass.getInstance( _selector );
        ExampleClass.getInstance( _selector, this );

        this._model = new Model( _selector );
        this._view = new View( this._model );

        this._init();
    }
    
    ExampleClass.prototype = {
        _init:
            function(){
                $( [ this._view, this._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ this._view, this._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = sliceArgs( arguments ); _data.shift(); _data.shift();
                    _p.trigger( _evtName, _data );
                });

                this._model.init();
                this._view.init();

                return this;
            }    
        /**
         * 显示 ExampleClass
         * @method  show
         * @return  ExampleClassInstance
         */
        , show: function(){ this._view.show(); return this; }
        /**
         * 隐藏 ExampleClass
         * @method  hide
         * @return  ExampleClassInstance
         */
        , hide: function(){ this._view.hide(); return this; }
        /**
         * 获取 显示 ExampleClass 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 获取 ExampleClass 外观的 选择器
         * @method  layout
         * @return  selector
         */
        , layout: function(){ return this._model.layout(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  ExampleClassInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  ExampleClassInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    }
    /**
     * 获取或设置 ExampleClass 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {ExampleClass instance}
     */
    ExampleClass.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( 'ExampleClassIns', _setter );

            return _selector.data('ExampleClassIns');
        };
    /**
     * 判断 selector 是否可以初始化 ExampleClass
     * @method  isExampleClass
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    ExampleClass.isExampleClass =
        function( _selector ){
            var _r;
            _selector 
                && ( _selector = $(_selector) ).length 
                && ( _r = _selector.is( '[ExampleClasslayout]' ) );
            return _r;
        };
    
    function Model( _selector ){
        this._selector = _selector;
    }
    
    Model.prototype = {
        init:
            function(){
                return this;
            }

        , selector: function(){ return this._selector; }
        , layout: function(){}
    };
    
    function View( _model ){
        this._model = _model;
    }
    
    View.prototype = {
        init:
            function() {
                return this;
            }

        , hide:
            function(){
            }

        , show:
            function(){
            }
    };


}(jQuery));
