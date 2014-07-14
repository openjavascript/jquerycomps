;(function(define, _win) { 'use strict'; define( [ 'JC.common' ], function(){
    JC.PureMVC = PureMVC;
    /**
     * MVC 抽象类 ( <b>仅供扩展用, 这个类不能实例化</b>)
     * <p><b>require</b>: 
     *      <a href='JC.common.html'>JC.common</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.PureMVC.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.PureMVC/0.1/_demo' target='_blank'>demo link</a></p>
     * @namespace   JC
     * @class       PureMVC
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1 2014-06-05
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     */
    function PureMVC(){
        throw new Error( "JC.PureMVC is an abstract class, can't initialize!" );

        this._model = new PureMVC.Model();
        this._view = new PureMVC.View( this._model );

        this._init( );
    }
    
    PureMVC.prototype = {
        /**
         * 内部初始化方法
         * @method  _init
         * @param   {selector}  _selector
         * @private
         */
        _init:
            function(){
                var _p = this;

                $( [ _p._view, _p._model ] ).on('BindEvent', function( _evt, _evtName, _cb ){
                    _p.on( _evtName, _cb );
                });

                $([ _p._view, _p._model ] ).on('TriggerEvent', function( _evt, _evtName ){
                    var _data = JC.f.sliceArgs( arguments ).slice( 2 );
                    _p.trigger( _evtName, _data );
                });

                _p._beforeInit();
                _p._initHanlderEvent();

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
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  PureMVCInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 触发绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  PureMVCInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}
    }
    /**
     * 复制 PureMVC 的所有方法到 _outClass
     * @method  build
     * @param   {Class} _outClass
     * @static
     */
    PureMVC.build =
        function( _outClass, _srcClass ){
            _srcClass = _srcClass || PureMVC;
            typeof _srcClass == 'string' && ( _srcClass = PureMVC );

            PureMVC.buildModel( _outClass );
            PureMVC.buildView( _outClass );

            PureMVC.buildClass( _srcClass, _outClass );
            _srcClass.Model && PureMVC.buildClass( _srcClass.Model, _outClass.Model );
            _srcClass.View && PureMVC.buildClass( _srcClass.View, _outClass.View );
        };
    /**
     * 复制 _inClass 的所有方法到 _outClass
     * @method  buildClass
     * @param   {Class}     _inClass
     * @param   {Class}     _outClass
     * @static
     */
    PureMVC.buildClass = 
        function( _inClass, _outClass ){
            if( !( _inClass && _outClass ) ) return;
            var _k
                , _fStr, _tmp
                ;

            if( _outClass ){
                for( _k in _inClass ){ 
                    if( !_outClass[_k] ){
                        //ignore static function
                        if( _inClass[_k].constructor == Function ){
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
    PureMVC.buildModel =
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
    PureMVC.buildView =
        function( _outClass ){
            !_outClass.View && ( _outClass.View = function( _model ){ this._model = _model; } );
        }
    /**
     * 初始化 PureMVC Model 类 和 View 类
     */
    PureMVC.buildModel( PureMVC );
    PureMVC.buildView( PureMVC );
    /**
     * MVC Model 类( <b>仅供扩展用</b> )
     * <br />这个类默认已经包含在lib.js里面, 不需要显式引用
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.PureMVC.Model.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.PureMVC/0.1/_demo' target='_blank'>demo link</a></p>
     * <p><b>see also</b>: <a href='JC.PureMVC.html'>JC.PureMVC</a></p>
     * @param   {selector|string}   _selector   
     * @version dev 0.1 2013-09-11
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     */
    //PureMVC.buildModel( PureMVC );
    /**
     * 设置 selector 实例引用的 data 属性名
     * @type        string
     * @default     PureMVCIns
     * @private
     * @static
     */
    PureMVC.Model._instanceName = 'PureMVCIns';
    JC.f.extendObject( PureMVC.Model.prototype, {
        init:
            function(){
                return this;
            }
        /**
         * 使用 jquery on 为 controler 绑定事件
         * @param   {string}    _evtName
         * @param   {function}  _cb
         */
        , on:
            function(){
                $( this ).trigger( 'BindEvent', JC.f.sliceArgs( arguments ) );
                return this;
            }
        /**
         * 使用 jquery trigger 触发 controler 绑定事件
         * @param   {string}    _evtName
         */
        , trigger:
            function( _evtName, _args ){
                _args = _args || [];
                _args.unshift( _evtName );
                $( this ).trigger( 'TriggerEvent', _args );
                return this;
            }
    });
    
    JC.f.extendObject( PureMVC.View.prototype, {
        init:
            function() {
                return this;
            }
         /**
         * 使用 jquery on 为 controler 绑定事件
         */
        , on:
            function(){
                $( this ).trigger( 'BindEvent', JC.f.sliceArgs( arguments ) );
                return this;
            }
        /**
         * 使用 jquery trigger 触发 controler 绑定事件
         */
        , trigger:
            function( _evtName, _args ){
                _args = _args || [];
                _args.unshift( _evtName );
                $( this ).trigger( 'TriggerEvent', _args );
                return this;
            }
    });

    return JC.PureMVC;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
