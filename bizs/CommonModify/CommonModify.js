/**
 * <h2>Dom 通用 添加删除 逻辑</h2>
 * <br/>应用场景
 * <br/>需要动态添加删除内容的地方可以使用这个类
 *
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc.openjavascript.org/docs_api/classes/window.Bizs.CommonModify.html' target='_blank'>API docs</a>
 * | <a href='../../bizs/CommonModify/_demo' target='_blank'>demo link</a></p>
 *
 * a|button 需要 添加 class="js_autoCommonModify"
 *
 * <h2>可用的 HTML 属性</h2>
 * <dl>
 *      <dt>cmtemplate = script selector</dt>
 *      <dd>指定保存模板的 script 标签</dd>
 *
 *      <dt>cmitem = selector</dt>
 *      <dd>添加时, 当前的具体父节点</dd>
 *
 *      <dt>cmaction = string, [add, del], default = add</dt>
 *      <dd>操作类型</dd>
 *
 *      <dt>cmdonecallback = function</dt>
 *      <dd>添加或删除完后会触发的回调</dd>
 *
 *      <dt>cmtplfiltercallback = function</dt>
 *      <dd>模板内容过滤回调</dd>
 *
 *      <dt>cmaddcallback = function</dt>
 *      <dd>添加完成的回调</dd>
 *
 *      <dt>cmdelcallback = function</dt>
 *      <dd>删除完成的回调</dd>
 * </dl>
 *
 * @namespace   window.Bizs
 * @class       CommonModify
 * @constructor
 * @author  qiushaowei  .1  2013-09-04
 *
 * @example
 *       <table>
             <tr>
                <td>
                    <label class="gray">甲方主体：</label>
                </td>
                <td>
                    <input type="text" name="" class="ipt ipt-w320" />&nbsp;
                        <a href="javascript:" 
                        class="green js_autoCommonModify" 
                        cmtemplate="#addMainFirstPartyTpl"
                        cmitem="<tr"
                        cmaction="add"
                    >+ 添加</a>
                    <em class="error"></em>
                </td>
            </tr>
        </table>

        <script type="text/template" id="addMainFirstPartyTpl" >
         <tr>
            <td>
                <label class="gray">甲方主体：</label>
            </td>
            <td>
                <input type="text" name="" class="ipt ipt-w320" />
                <a href="javascript:" 
                    class="green js_autoCommonModify" 
                    cmtemplate="#addMainFirstPartyTpl"
                    cmitem="<tr"
                    cmaction="add"
                >+ 添加</a>
                <a href="javascript:" class="red js_autoCommonModify"
                    cmtemplate="#addMainFirstPartyTpl"
                    cmitem="<tr"
                    cmaction="del"
                >+ 删除</a>
                <em class="error"></em>
            </td>
        </tr>
        </script>

 * @qiushaowei 2013-08-29
 */
;(function($){
    window.Bizs.CommonModify = CommonModify;

    function CommonModify( _selector ){
        _selector && ( _selector = $( _selector ) );
        if( CommonModify._instance ){
            //_selector && _selector.length && CommonModify._instance.process( _selector );
            return CommonModify._instance;
        }

        if( !CommonModify._instance ){
            CommonModify._instance = this;
        }

        this._model = new Model( _selector );
        this._view = new View( this._model );

        this._init();

        _selector && _selector.length && this.process( _selector );
    }
    
    CommonModify.prototype = {
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

                return _p;
            }    
        , _initHandlerEvent:
            function(){
                var _p = this;

                _p.on('add', function( _evt, _newItem ){
                    _p._model.cmaddcallback()
                        && _p._model.cmaddcallback().call( _p.selector(), _p, _newItem );
                });

                _p.on('del', function( _evt ){
                    _p._model.cmdelcallback()
                        && _p._model.cmdelcallback().call( _p.selector(), _p );
                });

                _p.on('done', function( _evt ){
                    _p._model.cmdonecallback()
                        && _p._model.cmdonecallback().call( _p.selector(), _p );
                });
            }
        /**
         * 获取 显示 CommonModify 的触发源选择器, 比如 a 标签
         * @method  selector
         * @return  selector
         */ 
        , selector: function(){ return this._model.selector(); }
        /**
         * 使用 jquery on 绑定事件
         * @method  {string}    on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         * @return  CommonModifyInstance
         */
        , on: function( _evtName, _cb ){ $(this).on(_evtName, _cb ); return this;}
        /**
         * 使用 jquery trigger 绑定事件
         * @method  {string}    trigger
         * @param   {string}    _evtName
         * @return  CommonModifyInstance
         */
        , trigger: function( _evtName, _data ){ $(this).trigger( _evtName, _data ); return this;}

        , process:
            function( _selector ){
                if( !( _selector && ( _selector = $(_selector) ).length ) ) return this;
                /**
                 * update current selector
                 */
                this._model.selector( _selector );

                switch( this._model.action() ){
                    case 'del': this._view.del(); break;
                    default: this._view.add(); break;
                }
            }
        , cmitem: function(){ return this._model.cmitem(); }
    }
    /**
     * 获取或设置 CommonModify 的实例
     * @method getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {CommonModify instance}
     */
    CommonModify.getInstance =
        function(){
            !CommonModify._instance 
                && ( CommonModify._instance = new CommonModify() );
            return CommonModify._instance;
        };
    CommonModify._instance = null;
    /**
     * 判断 selector 是否可以初始化 CommonModify
     * @method  isCommonModify
     * @param   {selector}      _selector
     * @static
     * @return  bool
     */
    CommonModify.isCommonModify =
        function( _selector ){
            var _r;
            _selector 
                && ( _selector = $(_selector) ).length 
                && ( _r = _selector.is( '[CommonModifylayout]' ) );
            return _r;
        };

    CommonModify.doneCallback = null;
    CommonModify.tplFilterCallback = null;
    CommonModify.addCallback = null;
    CommonModify.delCallback = null;
    
    function Model( _selector ){
        this._selector = _selector;
    }
    
    Model.prototype = {
        init:
            function(){
                return this;
            }

        , selector: 
            function( _setter ){ 
                _setter && ( _setter = $( _setter ) ) && ( this._selector = _setter );
                return this._selector; 
            }
        , layout: function(){}

        , action:
            function(){
                var _r = 'add', _tmp;
                ( _tmp = this.selector().attr( 'cmaction' ) ) && ( _r = _tmp.toLowerCase() );
                return _r;
            }

        , cmtemplate:
            function(){
                var _r = '', _tmp;
                this.selector() 
                    && ( _tmp = this.selector().attr('cmtemplate') )
                    && ( _r = scriptContent( _tmp ) )
                    ;
                return _r;
            }

        , cmdonecallback:
            function(){
                var _r = CommonModify.doneCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmdonecallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , cmtplfiltercallback:
            function(){
                var _r = CommonModify.tplFilterCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmtplfiltercallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , cmaddcallback:
            function(){
                var _r = CommonModify.addCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmaddcallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , cmdelcallback:
            function(){
                var _r = CommonModify.delCallback, _tmp;

                this.selector() 
                    && ( _tmp = this.selector().attr('cmdelcallback') )
                    && ( _tmp = window[ _tmp ] )
                    && ( _r = _tmp )
                    ;

                return _r;
            }

        , cmitem:
            function(){
                var _r, _tmp;
                this.selector()
                    && ( _tmp = this.selector().attr('cmitem') )
                    && ( _r = parentSelector( this.selector(), _tmp ) )
                    ;
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

        , add:
            function(){
                JC.log( 'Bizs.CommonModify view add', new Date().getTime() );
                var _p = this
                    , _tpl = _p._model.cmtemplate()
                    , _item = _p._model.cmitem()
                    , _newItem
                    ;

                _p._model.cmtplfiltercallback() 
                    && ( _tpl = _p._model.cmtplfiltercallback().call( _p._model.selector(), _tpl, _item ) );

                JC.log( '_item:', _item, _item.length );

                if( !( _tpl && _item && _item.length ) ) return;
                _newItem = $( _tpl );
                _item.after( _newItem );

                $( _p ).trigger( 'TriggerEvent', [ 'add', _newItem ] );
                $( _p ).trigger( 'TriggerEvent', [ 'done', _newItem ] );
            }

        , del:
            function(){
                JC.log( 'Bizs.CommonModify view del', new Date().getTime() );
                var _p = this
                    , _item = _p._model.cmitem()
                    ;

                _item && _item.length && _item.remove();

                $( _p ).trigger( 'TriggerEvent', [ 'del', _item ] );
                $( _p ).trigger( 'TriggerEvent', [ 'done', _item ] );
            }
    };

    $(document).delegate( 'a.js_autoCommonModify, button.js_autoCommonModify'
                          + ', a.js_bizsCommonModify, button.js_bizsCommonModify', 'click', function( _evt ){
        CommonModify.getInstance().process(  $(this) );
    });

}(jQuery));
