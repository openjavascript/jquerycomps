;(function($){
    window.JC && ( window.BaseMVC = JC.BaseMVC = BaseMVC );
    /**
     * MVC 抽象类 ( <b>仅供扩展用</b> )
     * <p>这个类默认已经包含在lib.js里面, 不需要显式引用</p>   
     * <p><b>require</b>: <a href='window.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.BaseMVC.html' target='_blank'>API docs</a>
     * | <a href='../../comps/BaseMVC/_demo' target='_blank'>demo link</a></p>
     * @namespace JC
     * @class BaseMVC
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1 2013-09-07
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     * @example
     */
    function BaseMVC( _selector ){
        throw new Error( "JC.BaseMVC is an abstract class, can't initialize!" );

        if( BaseMVC.getInstance( _selector ) ) return BaseMVC.getInstance( _selector );
        BaseMVC.getInstance( _selector, this );

        this._model = new BaseMVC.Model( _selector );
        this._view = new BaseMVC.View( this._model );

        this._init( );
    }
    
    BaseMVC.prototype = {
        /**
         * 内部初始化方法
         * @method  _init
         * @param   {selector}  _selector
         * @private
         */
        _init:
            function(){
                var _p = this;

                _p._beforeInit();
                _p._initHanlderEvent();

                $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = sliceArgs( arguments ).slice( 2 );
                    _p.trigger( _evtName, _data );
                });

                _p._model.init();
                _p._view && _p._view.init();

                _p._inited();

                return _p;
            }    
        /**
         * 初始化之前调用的方法
         * @method  _beforeInit
         * @private
         */
        , _beforeInit:
            function(){
            }
        /**
         * 内部事件初始化方法
         * @method  _initHanlderEvent
         * @private
         */
        , _initHanlderEvent:
            function(){
            }
        /**
         * 内部初始化完毕时, 调用的方法
         * @method  _inited
         * @private
         */
        , _inited:
            function(){
            }
        /**
         * 获取 显示 BaseMVC 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  BaseMVCInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  BaseMVCInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    }
    /**
     * 获取或设置 BaseMVC 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {BaseMVCInstance}
     */
    BaseMVC.getInstance =
        function( _selector, _setter ){
            if( typeof _selector == 'string' && !/</.test( _selector ) ) 
                    _selector = $(_selector);
            if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
            typeof _setter != 'undefined' && _selector.data( BaseMVC.Model._instanceName, _setter );

            return _selector.data( BaseMVC.Model._instanceName );
        };
    /**
     * 是否自动初始化
     * @property    autoInit
     * @type        bool
     * @default     true
     * @static
     */
    BaseMVC.autoInit = true;
    /**
     * 复制 BaseMVC 的所有方法到 _outClass
     * @method  build
     * @param   {Class} _outClass
     * @static
     */
    BaseMVC.build =
        function( _outClass, _namespace ){
            BaseMVC.buildModel( _outClass );
            BaseMVC.buildView( _outClass );

            BaseMVC.buildClass( BaseMVC, _outClass, _namespace );
            BaseMVC.buildClass( BaseMVC.Model, _outClass.Model );
            BaseMVC.buildClass( BaseMVC.View, _outClass.View );
        };
    /**
     * 复制 _inClass 的所有方法到 _outClass
     * @method  buildClass
     * @param   {Class}     _inClass
     * @param   {Class}     _outClass
     * @param   {string}    _namespace  default='JC', 如果是业务组件, 请显式指明为 'Bizs'
     * @static
     */
    BaseMVC.buildClass = 
        function( _inClass, _outClass, _namespace ){
            if( !( _inClass && _outClass ) ) return;
            var _k
                , _fStr, _tmp
                , _inName = funcName( _inClass )
                , _outName = funcName( _outClass )
                , _inRe = _inName && _outName ? new RegExp( _inName, 'g' ) : null
                , _namespace = _namespace ? _namespace + '.' : 'JC.'
                ;

            _inName && _outName && JC.log( 'BaseMVC.buildClass:', _inName, 'to', _outName );
            if( _outClass ){
                for( _k in _inClass ){ 
                    if( !_outClass[_k] ){//clone static function
                        if( _inName && _outName && _inClass[_k].constructor == Function ){
                            _fStr = _inClass[ _k ].toString();
                            _fStr = _fStr.replace( _inRe, _namespace + _outName );
                            _tmp = printf( '( {0}{1}.{2} = {3})', _namespace, _outName, _k, _fStr );
                            eval( _tmp  );
                        }else{//clone static property
                            _outClass[_k] = _inClass[_k];
                        }
                    }
                }

                for( _k in _inClass.prototype ) 
                    !_outClass.prototype[_k] && ( _outClass.prototype[_k] = _inClass.prototype[_k] );
            }
        };
    /**
     * 为 _outClass 生成一个通用 Model 类
     * @method  buildModel
     * @param   {Class} _outClass
     * @static
     */
    BaseMVC.buildModel =
        function( _outClass ){
            !_outClass.Model && ( 
                        _outClass.Model = function( _selector ){ this._selector = _selector; }
                        , _outClass.Model._instanceName = 'CommonIns'
                    );
        }
    /**
     * 为 _outClass 生成一个通用 View 类
     * @method  buildView
     * @param   {Class} _outClass
     * @static
     */
    BaseMVC.buildView =
        function( _outClass ){
            !_outClass.View && ( _outClass.View = function( _model ){ this._model = _model; } );
        }
    
    BaseMVC.buildModel( BaseMVC );
    BaseMVC.Model._instanceName = 'BaseMVCIns';
    BaseMVC.Model.prototype = {
        init:
            function(){
                return this;
            }

        , selector: 
            function( _setter ){ 
                typeof _setter != 'undefined' && ( this._selector = _setter );
                return this._selector; 
            }

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

        , stringProp:
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
                    && ( _r = _selector.attr( _key ).trim().toLowerCase() );
                return _r;
            }

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
    };
    
    BaseMVC.buildView( BaseMVC );
    BaseMVC.View.prototype = {
        init:
            function() {
                return this;
            }
    };
    /*
    $(document).ready( function(){
        setTimeout( function(){
        }, 1 );
    });
    */
}(jQuery));
