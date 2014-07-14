;(function(define, _win) { 'use strict'; define( [ 'JC.PureMVC' ], function(){
    JC.SelectorMVC = SelectorMVC;
    /**
     * MVC 抽象类 for Selector ( <b>仅供扩展用, 这个类不能实例化</b>)
     * <p><b>require</b>: 
     *      <a href='JC.PureMVC.html'>JC.PureMVC</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.SelectorMVC.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.SelectorMVC/3.0/_demo' target='_blank'>demo link</a></p>
     * @namespace   JC
     * @class       SelectorMVC
     * @extends     PureMVC
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1 2014-07-14
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     */
    function SelectorMVC( _selector ){
        throw new Error( "JC.SelectorMVC is an abstract class, can't initialize!" );

        if( SelectorMVC.getInstance( _selector ) ) return SelectorMVC.getInstance( _selector );
        SelectorMVC.getInstance( _selector, this );

        this._model = new SelectorMVC.Model( _selector );
        this._view = new SelectorMVC.View( this._model );

        this._init( );
    }

    JC.PureMVC.build( SelectorMVC, JC.PureMVC );

    JC.f.extendObject( SelectorMVC.prototype, {
         /**
         * 获取 显示 BaseMVC 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        selector: function(){ return this._model.selector(); }
    });
    /**
     * 获取或设置组件实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @param   {Class}         _staticClass
     * @param   {ClassInstance} _classInstance
     * @static
     * @return  {ClassInstance | null}
     */
    SelectorMVC.getInstance =
        function( _selector, _staticClass, _classInstance ){
            typeof _selector == 'string' 
                && !/</.test( _selector ) 
                && ( _selector = $(_selector) )
                ;
 
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return null;
 
            _staticClass.Model._instanceName = _staticClass.Model._instanceName || 'CommonIns';
 
            typeof _classInstance != 'undefined' 
                && _selector.data( _staticClass.Model._instanceName, _classInstance );
 
            return _selector.data( _staticClass.Model._instanceName);
        };

    /**
     * 是否自动初始化
     * @property    autoInit
     * @type        bool
     * @default     true
     * @static
     */
    SelectorMVC.autoInit = true;
    /**
     * 设置 selector 实例引用的 data 属性名
     * @type        string
     * @default     SelectorMVCIns
     * @private
     * @static
     */
    SelectorMVC.Model._instanceName = 'SelectorMVCIns';
    JC.f.extendObject( SelectorMVC.Model.prototype, {
        init:
            function(){
                return this;
            }
        /**
         * 初始化的 jq 选择器
         * @param   {selector}  _setter
         * @return  selector
         */
        , selector: 
            function( _setter ){ 
                typeof _setter != 'undefined' && ( this._selector = _setter );
                return this._selector; 
            }
        /**
         * 读取 int 属性的值
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  int
         */
        , intProp:
            function( _selector, _key ){
                if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }
                var _r = 0;
                _selector 
                    && _selector.is( '[' + _key + ']' ) 
                    && ( _r = parseInt( _selector.attr( _key ).trim(), 10 ) || _r );
                return _r;
            }
        /**
         * 读取 float 属性的值
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  float
         */
        , floatProp:
            function( _selector, _key ){
                if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }
                var _r = 0;
                _selector 
                    && _selector.is( '[' + _key + ']' ) 
                    && ( _r = parseFloat( _selector.attr( _key ).trim() ) || _r );
                return _r;
            }
        /**
         * 读取 string 属性的值
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  string
         */
        , stringProp:
            function( _selector, _key ){
                if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }
                var _r = ( this.attrProp( _selector, _key ) || '' ).toLowerCase();
                return _r;
            }
        /**
         * 读取 html 属性值
         * <br />这个跟 stringProp 的区别是不会强制转换为小写
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  string
         */
        , attrProp:
            function( _selector, _key ){
                if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }
                var _r = '';
                _selector
                    && _selector.is( '[' + _key + ']' ) 
                    && ( _r = _selector.attr( _key ).trim() );
                return _r;
            }

        /**
         * 读取 boolean 属性的值
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string|bool}       _key
         * @param   {bool}              _defalut
         * @return  {bool|undefined}
         */
        , boolProp:
            function( _selector, _key, _defalut ){
                if( typeof _key == 'boolean' ){
                    _defalut = _key;
                    _key = _selector;
                    _selector = this.selector();
                }else if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }
                var _r = undefined;
                _selector
                    && _selector.is( '[' + _key + ']' ) 
                    && ( _r = JC.f.parseBool( _selector.attr( _key ).trim() ) );
                return _r;
            }
        /**
         * 读取 callback 属性的值
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  {function|undefined}
         */
        , callbackProp:
            function( _selector, _key ){
                if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }
                var _r, _tmp;
                _selector 
                    && _selector.is( '[' + _key + ']' )
                    && ( _tmp = window[ _selector.attr( _key ) ] )
                    && ( _r = _tmp )
                    ;
                return _r;
            }
        /**
         * 获取与属性名匹配的 window 变量 
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  {window variable}
         */
        , windowProp:
            function(){
                return this.callbackProp.apply( this, JC.f.sliceArgs( arguments ) );
            }
        /**
         * 获取 selector 属性的 jquery 选择器
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  bool
         */
        , selectorProp:
            function( _selector, _key ){
                var _r;
                if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }

                _selector
                    && _selector.is( '[' + _key + ']' ) 
                    && ( _r = JC.f.parentSelector( _selector, _selector.attr( _key ) ) );

                return _r;
            }
        /**
         * 获取 脚本模板 jquery 选择器
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  bool
         */
        , scriptTplProp:
            function( _selector, _key ){
                var _r = '', _tmp;
                if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }

                _selector
                    && _selector.is( '[' + _key + ']' ) 
                    && ( _tmp = JC.f.parentSelector( _selector, _selector.attr( _key ) ) )
                    && _tmp.length 
                    && ( _r = JC.f.scriptContent( _tmp ) );

                return _r;
            }
        /**
         * 获取 selector 属性的 json 数据
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  {json | null}
         */
        , jsonProp:
            function( _selector, _key ){
                var _r;
                if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }

                _selector
                    && _selector.is( '[' + _key + ']' ) 
                    && ( _r = eval( '(' + _selector.attr( _key ) + ')' ) );

                return _r;
            }

        /**
         * 判断 _selector 是否具体某种特征
         * @param   {selector|string}  _selector    如果 _key 为空将视 _selector 为 _key, _selector 为 this.selector()
         * @param   {string}           _key
         * @return  bool
         */
        , is:
            function( _selector, _key ){
                if( typeof _key == 'undefined' ){
                    _key = _selector;
                    _selector = this.selector();
                }else{
                    _selector && ( _selector = $( _selector ) );
                }

                return _selector && _selector.is( _key );
            }
    });
    
    JC.f.extendObject( SelectorMVC.View.prototype, {
        init:
            function() {
                return this;
            }
        , selector:
            function(){
                return this._model.selector();
            }
    });

    return JC.SelectorMVC;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
