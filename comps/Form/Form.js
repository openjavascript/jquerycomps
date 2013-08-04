;(function($){
    !window.JC && (window.JC = { log:function(){} });
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
     * @author  qiushaowei   <suches@btbtd.org> | 360 75 team Team
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
     * @author  qiushaowei   <suches@btbtd.org> | 360 75 team Team
     * @date    2013-06-11
     * @param   {selector}  _selector   要初始化的全选反选的父级节点
     * @example
            <h2>AJAX data:</h2>
            <dl class="def example24">
                <dt>checkall example 24</dt>
                <dd>
                <input type="checkbox" id="checkall24" checktype="all" checkfor="dl.example24 input[type=checkbox]"><label for="checkall24">全选</label>
                <input type="checkbox" id="checkall24_inverse" checktype="inverse" checkfor="dl.example24 input[type=checkbox]" checkall="dl.example24 input[checktype=all]"><label for="checkall24_inverse">反选</label>
                </dd>
                <dd>
                <input type="checkbox" id="checkall24_1" value="" name="" checked />
                <label for="checkall24_1">checkall24_1</label>
                <input type="checkbox" id="checkall24_2" value="" name="" checked />
                <label for="checkall24_2">checkall24_2</label>
                <input type="checkbox" id="checkall24_3" value="" name="" checked />
                <label for="checkall24_3">checkall24_3</label>
                <input type="checkbox" id="checkall24_4" value="" name="" checked />
                <label for="checkall24_4">checkall24_4</label>
                <input type="checkbox" id="checkall24_5" value="" name="" checked />
                <label for="checkall24_5">checkall24_5</label>
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
    JC.Form.initCheckAll = 
        function( _selector ){
            _selector = $( _selector );
            var _ls = _selector.find( 'input[type=checkbox][checktype][checkfor]' );
            _ls.each( function(){
                var _p = $(this)
                    , _type = _p.attr('checktype').toLowerCase()
                    , _for = _p.attr('checkfor');
                if( _type != 'all' || !_for ) return;
                fixCheckAllStatus( _p, _for );

                if( !_p.data('initedCheckall') ){
                    _p.data('initedCheckall', true);
                    $(document).delegate( _for, 'click', function( _evt ){
                        var _sp = $(this);
                        if( isControler( _sp ) ) return;
                        fixCheckAllStatus( _p, _for );
                    });
                }
            });
        };

    $(document).ready( function( _evt ){
        JC.Form.initCheckAll( $(document) );
    });
    /**
     * 监听 全选/反选 按钮的点击事件
     */
    $(document).delegate( 'input[type=checkbox][checktype][checkfor]', 'click', function( _evt ){
        var _p = $(this)
            , _type = _p.attr('checktype').toLowerCase()
            , _for = _p.attr('checkfor');
            JC.log( _type, _for );

        switch( _type ){
            case 'all':
                {
                    $(_for).each( function(){
                        var _sp = $(this);
                        if( isControler( _sp ) ) return;
                        if( _sp.is( '[disabled]' ) ) return;
                        _p.prop('checked') && _sp.prop('checked', true);
                        !_p.prop('checked') && _sp.prop('checked', false);
                        
                    });
                    break;
                }

            case 'inverse':
                {
                    $(_for).each( function(){
                        var _sp = $(this);
                        if( isControler( _sp ) ) return;
                        if( _sp.is( '[disabled]' ) ) return;
                        if( _sp.prop('checked') ) _sp.prop('checked', false);
                        else _sp.prop('checked', true);
                    });

                    if( _p.is('[checkall]') ) fixCheckAllStatus( _p.attr('checkall'), _for );
                    break;
                }
        }
    });
    /**
     * 判断 input 是否为 全选反选 按钮
     */
    function isControler( _selector ){
        _selector = $( _selector );
        return _selector.is( '[checktype]' ) && _selector.is( '[checkfor]');
    }
    /**
     * input 改变状态时, 全选按钮也改为正确的状态
     */
    function fixCheckAllStatus( _all, _for ){
        var _isAll = true, _all = $(_all), _for = $(_for);
        _for.each( function(){
            var _sp = $(this);
            if( isControler( _sp ) ) return;
            if( _sp.is( '[checktype]' ) || _sp.is( '[checkfor]') ) return;
            if( !_sp.prop('checked') ) return _isAll = false;
        });
        JC.log( '_isAll: ', _isAll );
        _all && _all.length && _all.prop( 'checked', _isAll );
    }
}(jQuery));

 ;(function($){
    /**
     * 初始化 级联下拉框
     * <br />只要引用本脚本, 页面加载完毕时就会自动初始化级联下拉框功能
     * <br /><br />动态添加的 DOM 需要显式调用 AutoSelect( domSelector ) 进行初始化
     * <br /><br />要使页面上的级联下拉框功能能够自动初始化, 需要在select标签上加入一些HTML 属性
     * <br /><b>defaultselect</b>: none, 该属性声明这是级联下拉框的第一个下拉框, <b>这是必填项,初始化时以这个为入口</b>
     * <br /><b>selectvalue</b>: string, 下拉框的默认选中值
     * <br /><b>selecturl</b>: string, 下拉框的数据请求接口, 符号 {0} 代表下拉框值的占位符
     * <br /><b>selecttarget</b>: selector, 下一级下拉框的选择器语法
     * <br /><b>defaultoption</b>: none, 声明默认 option 选项, 更新option时, 有该属性的项不会被清除
     * <p>
     *      数据格式: [ [id, name], [id, name] ... ]
     *      <br /> 如果获取到的数据格式不是默认格式,
     *      可以通过 <a href='JC.Form.html#property_initAutoSelect.dataFilter'>AutoSelect.dataFilter</a> 属性自定义函数, 进行数据过滤
     * </p>
     * @method  initAutoSelect
     * @static
     * @for JC.Form
     * @version dev 0.2
     * @author  qiushaowei   <suches@btbtd.org> | 360 75 Team
     * @date    2013-07-28(.2), 2013-06-11(.1)
     * @param   {selector}  _selector   要初始化的级联下拉框父级节点
     * @example
        <h2>AJAX 返回内容</h2>
        <code>
            <dd>    
                <select name='select102_1' defaultselect selecturl="data/shengshi_with_error_code.php?id=0" selecttarget="select[name=select102_2]">
                    <option value="-1" defaultoption>请选择</option>
                </select>
                <select name='select102_2' selecturl="data/shengshi_with_error_code.php?id={0}" selecttarget="select[name=select102_3]">
                    <option value="-1" defaultoption>请选择</option>
                </select>
                <select name='select102_3' selecturl="data/shengshi_with_error_code.php?id={0}">
                    <option value="-1" defaultoption>请选择</option>
                </select>
            </dd>
        </code>
        <script>
            $.get( './data/shengshi_html.php?rnd='+new Date().getTime(), function( _r ){
                var _selector = $(_r);
                $( 'dl.def > dt' ).after( _selector );
                JC.Form.initAutoSelect( _selector );
            });

            JC.Form.initAutoSelect.dataFilter = 
                function( _data, _select ){
                    var _r = _data;
                    if( _data && !_data.length && _data.data ){
                        _r = _data.data;
                    }
                    return _r;
                };
        </script>
     */
    JC.Form.initAutoSelect = AutoSelect;

    function AutoSelect( _selector ){
        var _ins = [];
        _selector && ( _selector = $(_selector) );

        if( AutoSelect.isSelect( _selector ) ){
            _ins.push( new Control( _selector ) );
        }else if( _selector && _selector.length ){
            _selector.find( 'select[defaultselect]' ).each( function(){
                _ins.push( new Control( $(this ) ));
            });
        }
        return _ins;
    }
    var AutoSelectProp = {
        /**
         * 判断 selector 是否为符合自动初始化联动框的要求
         * @method  initAutoSelect.isSelect
         * @param   {selector}  _selector
         * @return  bool
         * @static
         */
        isSelect: 
            function( _selector ){
                var _r;
                _selector 
                    && ( _selector = $(_selector) ) 
                    && _selector.is( 'select' ) 
                    && _selector.is( '[defaultselect]' )
                    && ( _r = true );
                return _r;
            }
        /**
         * 是否自动隐藏空值的级联下拉框, 起始下拉框不会被隐藏
         * <br />这个是全局设置, 如果需要对具体某个select进行处理, 对应的 HTML 属性 selecthideempty
         * @property    initAutoSelect.hideEmpty
         * @type    bool
         * @default false
         * @static
         * @example
                AutoSelect.hideEmpty = true;
         */
        , hideEmpty: false
        /**
         * 级联下拉框的数据过滤函数
         * <br />默认数据格式: [ [id, name], [id, name] ... ]
         * <br />如果获取到的数据格式非默认格式, 可通过本函数进行数据过滤
         * <p>
         *  <b>注意, 这个是全局过滤, 如果要使用该函数进行数据过滤, 判断逻辑需要比较具体</b>
         *  <br />如果要对具体 select 进行数据过滤, 可以使用HTML属性 selectdatafilter 指定过滤函数
         * </p>
         * @property    initAutoSelect.dataFilter
         * @type    function
         * @default null
         * @static
         * @example
                 AutoSelect.dataFilter = 
                    function( _data, _select ){
                        var _r = _data;
                        if( _data && !_data.length && _data.data ){
                            _r = _data.data;
                        }
                        return _r;
                    };
         */
        , dataFilter: null
        /**
         * 下拉框初始化功能都是未初始化 数据之前的回调
         * <br />这个是全局回调, 如果需要对具体某一组进行处理, 对应的 HTML 属性 selectbeforeInited
         * @property    initAutoSelect.beforeInited
         * @type    function
         * @default null
         * @static
         */
        , beforeInited: null
        /**
         * 下拉框第一次初始完所有数据的回调
         * <br />这个是全局回调, 如果需要对具体某一组进行处理, 对应的 HTML 属性 selectinited
         * @property    initAutoSelect.inited
         * @type    function
         * @default null
         * @static
         */
        , inited: null
        /**
         * 下拉框每个项数据变更后的回调
         * <br />这个是全局回调, 如果需要对具体某一组进行处理, 对应的 HTML 属性 selectchange
         * @property    initAutoSelect.change
         * @type    function
         * @default null
         * @static
         */
        , change: null
        /**
         * 下拉框所有项数据变更后的回调
         * <br />这个是全局回调, 如果需要对具体某一组进行处理, 对应的 HTML 属性 selectallchanged
         * @property    initAutoSelect.allChanged
         * @type    function
         * @default null
         * @static
         */
        , allChanged: null
        /**
         * 第一次初始化所有联动框时, 是否触发 change 事件
         * <br />这个是全局回调, 如果需要对具体某一组进行处理, 对应的 HTML 属性 selecttriggerinitchange
         * @property    initAutoSelect.triggerInitChange
         * @type    bool
         * @default false
         * @static
         */
        , triggerInitChange: true
        /**
         * ajax 请求数据时, 是否添加随机参数防止缓存
         * <br />这个是全局回调, 如果需要对具体某一组进行处理, 对应的 HTML 属性 selectrandomurl
         * @property    initAutoSelect.randomurl
         * @type    bool
         * @default true
         * @static
         */
        , randomurl: false
        /**
         * 处理 ajax url 的回调处理函数
         * <br />这个是全局回调, 如果需要对具体某一组进行处理, 对应的 HTML 属性 selectprocessurl
         * @property    initAutoSelect.processUrl
         * @type    function
         * @default null
         * @static
         */
        , processUrl: null
        /**
         * 获取或设置 selector 的实例引用
         * @method  initAutoSelect.getInstance
         * @param   {selector}  _selector
         * @param   {AutoSelectControlerInstance}   _ins
         * @return AutoSelectControlerInstance
         * @static
         */
        , getInstance:
            function( _selector, _ins ){
                var _r;
                _selector 
                    && ( _selector = $( _selector ) ) 
                    && ( typeof _ins != 'undefined' && _selector.data('SelectIns', _ins )
                            , _r = _selector.data('SelectIns') );
                return _r;
            }
    };
    for( var k in AutoSelectProp ) AutoSelect[k] = AutoSelectProp[k];

    function Control( _selector ){
        this._model = new Model( _selector );
        this._view = new View( this._model, this );

        this._init();
    }

    Control.prototype = {
        _init:
            function(){
                var _p = this;

                $.each( _p._model.items(), function( _ix, _item ){
                    AutoSelect.getInstance( $(_item), _p );
                });

                _p._model.beforeInited() && _p.on( 'SelectBeforeInited', _p._model.beforeInited() );
                _p.on('SelectInited', function(){
                    var _tmp = _p._model.first();
                    while( _p._model.next( _tmp ) ){
                        _tmp.on( 'change', _p._responeChange );
                        _tmp = _p._model.next( _tmp );
                    }
                    _p._model.isInited( true );

                    //alert( _p._model.inited() );

                    _p._model.inited() && _p._model.inited().call( _p );
                });
                _p.on('SelectChange', function( _evt, _selector ){
                    _p._model.change( _selector ) && _p._model.change( _selector ).call( _selector, _evt, _p );
                });
                _p._model.allChanged() && _p.on( 'SelectAllChanged', _p._model.allChanged() );

                _p.trigger('SelectBeforeInited');
                
                _p._update( _p._model.first(), _p._firstInitCb );
                
                return _p;
            }    

        , on: function( _evt, _cb ){ $(this).on( _evt, _cb ); return this; }
        , trigger: function( _evt, _args ){ $(this).trigger( _evt, _args ); return this; }

        , first: function(){ return this._model.first(); }
        , last: function(){ return this._model.last(); }
        , items: function(){ return this._model.items(); }

        , isFirst: function( _selector ){ return this._model.isFirst( _selector ); }
        , isLast: function( _selector ){ return this._model.isLast( _selector ); }
        , isInited: function(){ return this._model.isInited(); }

        , data: function( _selector ){ return this._model.data( _selector ); }

        , _responeChange:
            function( _evt ){
                var _sp = $(this)
                    , _p = AutoSelect.getInstance( _sp )
                    , _next = _p._model.next( _sp );
                    ;
                JC.log( '_responeChange:', _sp.attr('name'), _sp.val() );

                if( !( _next&& _next.length ) ){
                    _p.trigger( 'SelectChange' );
                }else{
                    _p._update( _next, _p._changeCb, _sp.val() );
                }
            }

        , _changeCb:
            function( _selector, _data ){
                var _p = this
                    , _next = _p._model.next( _selector );
                ;

                _p.trigger( 'SelectChange', [ _selector ] );

                if( _p._model.isLast( _selector ) ){
                    _p.trigger( 'SelectAllChanged' );
                }

                if( _next && _next.length ){
                    JC.log( '_changeCb:', _selector.val(), _next.attr('name'), _selector.attr('name') );
                    _p._update( _next, _p._firstInitCb, _selector.val() );
                }
                return this;
            }

        , _firstInitCb:
            function( _selector, _data ){
                var _p = this
                    , _next = _p._model.next( _selector );
                ;

                _p._model.triggerInitChange() 
                    && ( JC.log('triggerInitChange', _selector.attr('name')), _selector.trigger('change') );

                _p.trigger( 'SelectChange', [ _selector ] );

                if( _p._model.isLast( _selector ) ){
                    _p.trigger( 'SelectAllChanged' );
                    _p.trigger( 'SelectInited' );
                }

                if( _next && _next.length ){
                    JC.log( '_firstInitCb:', _selector.val(), _next.attr('name'), _selector.attr('name') );
                    _p._update( _next, _p._firstInitCb, _selector.val() );
                }

                return this;
            }


        , _update:
            function( _selector, _cb, _pid ){
                if( this._model.isStatic( _selector ) ){
                    this._updateStatic( _selector, _cb, _pid );
                }else if( this._model.isAjax( _selector ) ){
                    this._updateAjax( _selector, _cb, _pid );
                }else{
                    this._updateNormal( _selector, _cb, _pid );
                }
                return this;
            }

        , _updateStatic:
            function( _selector, _cb, _pid ){
                var _p = this, _data;
                JC.log( 'static select' );
                if( _p._model.isFirst( _selector ) ){
                    typeof _pid == 'undefined' && ( _pid = _p._model.selectparentid( _selector ) || '' );
                    if( typeof _pid != 'undefined' ){
                        _data = _p._model.datacb( _selector )( _pid );
                    }
                }else{
                    _data = _p._model.datacb( _selector )( _pid );
                }
                _p._view.update( _selector, _data );
                _cb && _cb.call( _p, _selector, _data );
                return this;
            }

        , _updateAjax:
            function( _selector, _cb, _pid ){
                var _p = this, _data, _next = _p._model.next( _selector ), _url;
                JC.log( 'ajax select' );

                if( _p._model.isFirst( _selector ) ){
                    typeof _pid == 'undefined' && ( _pid = _p._model.selectparentid( _selector ) || '' );
                    if( typeof _pid != 'undefined' ){
                        _url = _p._model.selecturl( _selector, _pid );
                        $.get( _url, function( _data ){
                            _data = $.parseJSON( _data );
                            _p._view.update( _selector, _data );
                            _cb && _cb.call( _p, _selector, _data );
                        });
                    }
                }else{
                   _url = _p._model.selecturl( _selector, _pid );
                    $.get( _url, function( _data ){
                        JC.log( '_url:', _url, _pid );
                        _data = $.parseJSON( _data );
                        _p._view.update( _selector, _data );
                        _cb && _cb.call( _p, _selector, _data );
                    });
                }
                return this;
            }

        , _updateNormal:
            function( _selector, _cb, _pid ){
               var _p = this, _data;
                JC.log( 'normal select' );
                if( _p._model.isFirst( _selector ) ){
                    var _next = _p._model.next( _selector );
                    if( _next && _next.length ){
                        _p._update( _next, _cb, _selector.val() );
                        return this;
                    }
                }else{
                    _data = _p._model.datacb( _selector )( _pid );
                }
                _p._view.update( _selector, _data );
                _cb && _cb.call( _p, _selector, _data );
                return this;
            }
    }
    
    function Model( _selector ){
        this._selector = _selector;
        this._items = [];
        this._isInited = false;

        this._init();
    }
    
    Model.prototype = {
        _init:
            function(){
                this._findAllItems( this._selector );
                JC.log( 'select items.length:', this._items.length );
                this._initRelationship();
                return this;
            }

        , _findAllItems:
            function( _selector ){
                this._items.push( _selector );
                if( _selector.is( '[selecttarget]' ) ) 
                    this._findAllItems( $( _selector.attr('selecttarget') ) );
            }

        , _initRelationship:
            function(){
                this._selector.data( 'FirstSelect', true );
                if( this._items.length > 1 ){
                    this._items[ this._items.length - 1 ].data('LastSelect', true);
                    for( var i = 0; i < this._items.length; i ++ ){
                        var item = this._items[i]
                            , preItem = this._items[i-1];
                            ;
                        if( preItem ){
                            item.data('PrevSelect', preItem);
                            preItem.data('NextSelect', item );

                            item.data('parentSelect', preItem); //向后兼容0.1
                        }
                    }
                }
            }

        , items: function(){ return this._items; }
        , first: function(){ return this._items[0]; }
        , last: function(){ return this._items[ this._items -1 ]; }
        , next: function( _selector ){ return _selector.data('NextSelect'); }
        , prev: function( _selector ){ return _selector.data('PrevSelect'); }
        , isFirst: function( _selector ){ return !!_selector.data('FirstSelect'); }
        , isLast: function( _selector ){ return !!_selector.data('LastSelect'); }
        , isStatic: function( _selector ){ return _selector.is('[selectdatacb]'); }
        , isAjax: function( _selector ){ return _selector.is('[selecturl]'); }

        , isInited: 
            function( _setter ){ 
                typeof _setter != 'undefined' && ( this._isInited = _setter )
                return this._isInited;
            }

        , datacb:
            function( _selector ){
                var _r;
                _selector.attr('selectdatacb') 
                    && ( _r = window[ _selector.attr('selectdatacb') ] )
                    ;
                return _r;
            }

        , selectparentid:
            function( _selector ){
                var _r;
                _selector.attr('selectparentid') 
                    && ( _r = _selector.attr('selectparentid') )
                    ;
                _selector.removeAttr( 'selectparentid' );
                return _r || '';
            }

        , selectvalue:
            function( _selector ){
                var _r = _selector.attr('selectvalue');
                _selector.removeAttr( 'selectvalue' );
                return _r || '';
            }

        , randomurl:
            function( _selector ){
                var _r = AutoSelect.randomurl;
                _selector.is('[selectrandomurl]')
                    && ( _r = parseBool( _selector.attr('selectrandomurl') ) )
                    ;
                return _r;
            }
        
        , triggerInitChange:
            function(){
                var _r = AutoSelect.triggerInitChange, _selector = this.first();
                _selector.attr('selecttriggerinitchange')
                    && ( _r = parseBool( _selector.attr('selecttriggerinitchange') ) )
                    ;
                return _r;
            }

        , hideempty:
            function( _selector ){
                var _r = AutoSelect.hideEmpty;
                _selector 
                    && _selector.length
                    && _selector.is('[selecthideempty]')
                    && ( _r = parseBool( _selector.attr('selecthideempty') ) )
                    ;
                return _r;
            }

        , selecturl:
            function( _selector, _pid ){
                var _cb = AutoSelect.processUrl, _r = _selector.attr('selecturl') || '';
                    _selector.attr('selectprocessurl') 
                        && window[ _selector.attr('selectprocessurl' ) ]
                        && ( _cb = window[ _selector.attr('selectprocessurl' ) ] )
                        ;
                    _r = printf( _r, _pid );
                    this.randomurl( _selector ) && ( _r = add_url_params( _r, {'rnd': new Date().getTime() } ) );
                    _cb && ( _r = _cb.call( _selector, _r, _pid ) );
                return _r;
            }

        , _userdatafilter:
            function( _selector ){
                var _r;
                _selector.attr('selectdatafilter') 
                    && ( _r = window[ _selector.attr('selectdatafilter') ] )
                    ;
                return _r;
            }

        , dataFilter:
            function( _selector, _data ){
                var _cb = this._userdatafilter( _selector ) || AutoSelect.dataFilter;
                _cb && ( _data = _cb( _data, _selector ) );
                return _data;
            }

        , beforeInited:
            function(){
                var _cb = AutoSelect.beforeInited, _selector = this.first();
                    _selector.attr('selectbeforeInited') 
                        && window[ _selector.attr('selectbeforeInited' ) ]
                        && ( _cb = window[ _selector.attr('selectbeforeinited' ) ] )
                        ;
                return _cb;
            }

        , inited:
            function(){
               var _cb = AutoSelect.inited, _selector = this.first();
                    _selector.attr('selectinited') 
                        && window[ _selector.attr('selectinited' ) ]
                        && ( _cb = window[ _selector.attr('selectinited' ) ] )
                        ;
                return _cb;
            }

        , change:
            function( _selector ){
               var _cb = AutoSelect.change;
                    _selector.attr('selectchange') 
                        && window[ _selector.attr('selectchange' ) ]
                        && ( _cb = window[ _selector.attr('selectchange' ) ] )
                        ;
                return _cb;
            }

        , allChanged:
            function(){
               var _cb = AutoSelect.allChanged, _selector = this.first();
                    _selector.attr('selectallchanged') 
                        && window[ _selector.attr('selectallchanged' ) ]
                        && ( _cb = window[ _selector.attr('selectallchanged' ) ] )
                        ;
                return _cb;
            }

        , data:
            function( _selector, _setter ){
                typeof _setter != 'undefined' && ( _selector.data('SelectData', _setter ) );
                return _selector.data( 'SelectData' );
            }

        /**
         * 判断下拉框的option里是否有给定的值
         * @param   {selector}  _select
         * @param   {string}    _val    要查找的值
         */
        , hasVal: 
            function ( _selector, _val ){
                var _r = false, _val = _val.toString();
                _selector.find('option').each( function(){
                    var _tmp = $(this);
                    if( _tmp.val() == _val ){
                        _r = true;
                        return false;
                    }
                });
                return _r;
            }
    };
    
    function View( _model, _control ){
        this._model = _model;
        this._control = _control;

        this._init();
    }
    
    View.prototype = {
        _init:
            function() {
                return this;
            }

        , update:
            function( _selector, _data ){
                var _default = this._model.selectvalue( _selector );
                _data = this._model.dataFilter( _selector, _data );
                this._model.data( _selector, _data );
                
                this._control.trigger( 'SelectItemBeforeUpdate', [ _selector, _data ] );
                this._removeExists( _selector );

                if( !_data.length ){
                    if( this._model.hideempty( _selector ) ){
                        _selector.hide();
                        this._control.trigger( 'SelectItemUpdated', [ _selector, _data ] );
                        return;
                    }
                }else{
                    !_selector.is(':visible') && _selector.show();
                }

                var _html = [], _tmp, _selected;
                for( var i = 0, j = _data.length; i < j; i++ ){
                    _tmp = _data[i];
                    _html.push( printf( '<option value="{0}" {2}>{1}</option>', _tmp[0], _tmp[1], _selected ) );
                }
                $( _html.join('') ).appendTo( _selector );

                if( this._model.hasVal( _selector, _default ) ){
                    _selector.val( _default );
                }
                this._control.trigger( 'SelectItemUpdated', [ _selector, _data ] );
            }

        , _removeExists:
            function( _selector ){
                _selector.find('> option:not([defaultoption])').remove();
            }
        
    };
    /**
     * 页面加载完毕时, 延时进行自动化, 延时可以避免来自其他逻辑的干扰
     */
    $(document).ready( function( _evt ){
        setTimeout( function(){ AutoSelect( document.body ); }, 100 );
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
     * @author  qiushaowei   <suches@btbtd.org> | 360 75 team Team
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
