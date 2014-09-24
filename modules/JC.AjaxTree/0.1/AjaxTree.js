;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
    JC.AjaxTree = AjaxTree;
    /**
     * 树菜单类 JC.AjaxTree
     * <p><b>require</b>: 
     *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     * </p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.AjaxTree.html' target='_blank'>API docs</a>
     * | <a href='../../modules/JC.AjaxTree/0.1/_demo' target='_blank'>demo link</a></p>
     * @namespace       JC
     * @class           AjaxTree
     * @extends         JC.BaseMVC
     * @constructor
     * @param   {selector}          _selector   树要显示的选择器
     * @param   {object}            _data       树菜单的数据
     * @version dev 0.2 2014-09-23
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     * @date    
     * @example
            <link href='../../../modules/JC.AjaxTree/res/default/style.css' rel='stylesheet' />
            <script src="../../../lib.js"></script>
            <script src="../../../config.js"></script>
            <script>
                requirejs( [ 'JC.AjaxTree' ], function(){
                     var treeData = {
                            data: {"24":[["25","\u4e8c\u7ec4\u4e00\u961f"],["26","\u4e8c\u7ec4\u4e8c\u961f"],["27","\u4e8c\u7ec4\u4e09\u961f"]],"23":[["28","\u9500\u552e\u4e8c\u7ec4"],["24","\u552e\u524d\u5ba1\u6838\u7ec4"]]},
                            root: ["23",'客户发展部']
                        };
                        var _tree = new JC.AjaxTree( $('#tree_box2'), treeData );
                            _tree.on('RenderLabel', function( _data ){
                                var _node = $(this);
                                _node.html( JC.f.printf( '<a href="javascript:" dataid="{0}">{1}</a>', _data[0], _data[1] ) );
                            });
                            _tree.on('click', function( _evt ){
                                var _p = $(this);
                                JC.log( 'tree click:', _p.html(), _p.attr('dataid'), _p.attr('dataname') );
                            });
                            _tree.init();
                            //_queryNode && _tree.open( _queryNode );

                });
            </script>
            <div id="tree_box2" class="tree_selector"></div>
     */

    function AjaxTree( _selector ){

        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, AjaxTree ) ) 
            return JC.BaseMVC.getInstance( _selector, AjaxTree );

        JC.BaseMVC.getInstance( _selector, AjaxTree, this );

        this._model = new AjaxTree.Model( _selector );
        this._view = new AjaxTree.View( this._model );

        this._init();
    }
    /**
     * 初始化可识别的 AjaxTree 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of AjaxTreeInstance}
     */
    AjaxTree.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compAjaxTree' )  ){
                    _r.push( new AjaxTree( _selector ) );
                }else{
                    _selector.find( 'div.js_compAjaxTree' ).each( function(){
                        _r.push( new AjaxTree( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( AjaxTree );
    /**
     * 树的数据过滤函数
     * <br /> 如果树的初始数据格式不符合要求, 可通过该属性定义函数进行数据修正
     * @property    dataFilter
     * @type        function
     * @default     undefined
     * @static
     * @example
            JC.AjaxTree.dataFilter =
            function( _data ){
                var _r = {};

                if( _data ){
                    if( _data.root.length > 2 ){
                        _data.root.shift();
                        _r.root = _data.root;
                     }
                    _r.data = {};
                    for( var k in _data.data ){
                        _r.data[ k ] = [];
                        for( var i = 0, j = _data.data[k].length; i < j; i++ ){
                            if( _data.data[k][i].length < 3 ) continue;
                            _data.data[k][i].shift();
                            _r.data[k].push( _data.data[k][i] );
                        }
                    }
                }
                return _r;
            };
     */
    AjaxTree.dataFilter;
    
    JC.f.extendObject( AjaxTree.prototype, {
        _beforeInit:
            function(){
                JC.log( 'JC.AjaxTree _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this, _data;

                _p.on( 'inited', function(){
                    _data = _p._model.parseInitData();

                    _data && _p.trigger( 'update_init_data', [ _data ] );
                });


                _p.on( 'update_init_data', function( _evt, _data ){
                    if( !_data ) return;

                    _p._model.data( _data );
                    if( !( _p._model.data() && _p._model.root() ) ) return;
                    _p._view._process( _p._model.child( _p._model.root()[0] ), _p._view._initRoot() );
                });
            }

        , _inited:
            function(){
                JC.log( 'JC.AjaxTree _inited', new Date().getTime() );
                this.trigger( 'inited' );
            }
        /**
         * 展开树到某个具体节点, 或者展开树的所有节点
         * @method  open
         * @param   {string|int}    _nodeId     如果_nodeId='undefined', 将会展开树的所有节点
         *                                      <br />_nodeId 不为空, 将展开树到 _nodeId 所在的节点
         */
        , open:
            function( _nodeId ){
                if( typeof _nodeId == 'undefined' ){
                    this._view.openAll();
                    return this;
                }
                this._view.open( _nodeId );
                return this;
            }
        /**
         * 关闭某个节点, 或者关闭整个树
         * @method  close
         * @param   {string|int}    _nodeId     如果_nodeId='undefined', 将会关闭树的所有节点
         *                                      <br />_nodeId 不为空, 将关闭树 _nodeId 所在的节点
         */
        , close:
            function( _nodeId ){
                if( typeof _nodeId == 'undefined' ){
                    this._view.closeAll();
                    return this;
                }
                this._view.close( _nodeId );
                return this;
            }
        /**
         * 获取树的 ID 前缀
         * <br />每个树都会有自己的随机ID前缀
         * @method  idPrefix
         * @return  {string}    树的ID前缀
         */
        , idPrefix: function(){ return this._model.idPrefix(); }
        /**
         * 获取树的节点 label
         * @method  getItem
         * @param   {string|int}    _nodeId     
         */
        , getItem:
            function( _nodeId ){
                var _r;
                _nodeId && ( _r = $('#' + this._model.id( _nodeId ) ) );
                return _r;
            }
        /**
         * 获取或设置树的高亮节点
         * @method  selectedItem
         * @param   {selector}  _selector
         * @return  selector
         */
        , selectedItem:
            function( _selector ){
                return this._view.selectedItem( _selector );
            }
        , highlight:
            function(){
                return this.selectedItem.apply( this, JC.f.sliceArgs( arguments ) );
            }
    });

    AjaxTree.Model._instanceName = 'AjaxTreeIns';

    AjaxTree.Model._insCount = 1;
    
    JC.f.extendObject( AjaxTree.Model.prototype, {
        init:
            function(){
                /**
                 * 展现树需要的数据
                 * @type    object
                 */
                this._data
                /**
                 * 树的随机ID前缀
                 * @type    string
                 */
                this._id = JC.f.printf( 'tree_{0}_{1}_', new Date().getTime(), AjaxTree.Model._insCount++ );
                /**
                 * 树当前的高亮节点
                 * @type    selector
                 */
                this._highlight;
                /**
                 * 保存树的所有绑定事件
                 * @type    object
                 */
                this._events = {};

            }
        , parseInitData:
            function(){
                var _p = this, _data;
                if( _p.is( '[data-cajScriptData]' ) ){
                    _data = _p.scriptDataProp( 'data-cajScriptData' );
                    JC.dir( _data );
                }
                return _data;
            }
        /**
         * 获取树所要展示的容器
         * @return  selector
         */
        , selector: function(){ return this._selector; }
        /**
         * 获取节点将要显示的ID
         * @param   {string}    _id 节点的原始ID
         * @return  string  节点的最终ID
         */
        , id: function( _id ){ return this._id + _id; }
        /**
         *  获取树的随机ID前缀
         *  @return string
         */
        , idPrefix: function(){ return this._id; }
        /**
         * 获取树的原始数据
         * @return  object
         */
        , data: 
            function( _setter ){ 
                if( typeof _setter != 'undefined' ){
                    this._data = _setter;
                    AjaxTree.dataFilter && ( this._data = AjaxTree.dataFilter( this._data ) );
                }
                return this._data; 
            }
        /**
         * 获取树生成后的根节点
         * @return  selector
         */
        , root: function(){ return this._data.root; }
        /**
         * 获取ID的具体节点
         * @param   {string}    _id
         * @return  selector
         */
        , child: function( _id ){ return this._data.data[ _id ]; }
        /**
         * 判断原始数据的某个ID是否有子级节点
         * @param   {string}    _id
         * @return  bool
         */
        , hasChild: function( _id ){ return _id in this._data.data; }
        /**
         * 获取树的某类绑定事件的所有回调
         * @param   {string}    _evtName
         * @return  {array|undefined}
         */
        , event:
            function( _evtName ){
                _evtName = _evtName.toLowerCase();
                return this._events[ _evtName ];
            }
        /**
         * 添加树内部事件
         * @param   {string}    _evtName
         * @param   {function}  _cb
         */
        , addEvent:
            function( _evtName, _cb ){
                /*
                _evtName = _evtName.toLowerCase();
                if( !( _evtName in this._events ) ) this._events[ _evtName ] = [];
                this._events[ _evtName ].unshift( _cb );
                */
            }
        /**
         * 获取或设置树的高亮节点
         * <br /><b>注意:</b> 这个只是数据层面的设置, 不会影响视觉效果
         * @param   {selector}  _item
         * @return  selector
         */
        , highlight:
            function( _highlight ){
                _highlight && ( this._highlight = $( _highlight ) );
                return this._highlight;
            }
    });

    JC.f.extendObject( AjaxTree.View.prototype, {
        /**
         * 初始化树的可视状态
         */
        init:
            function() {

                /*
                */
                return this;
            }
        /**
         * 处理树的展现效果
         * @param   {array}     _data   节点数据
         * @param   {selector}  _parentNode
         */
        , _process:
            function( _data, _parentNode ){

                for( var i = 0, j = _data.length, _item, _isLast; i < j; i++ ){
                    _item = _data[i];
                    _isLast = i === j - 1;

                    if( this._model.hasChild( _item[0] ) ){
                        this._initFolder( _parentNode, _item, _isLast );
                    }else{
                        this._initFile( _parentNode, _item, _isLast );
                    }
                }
            }
        /**
         * 初始化树根节点
         */
        , _initRoot:
            function(){
                var _p = this;

                if( !_p._model.data().root ) return;
                
                var _data = _p._model.data().root;
                var _parentNode = $( '<ul class="tree_wrap"></ul>' );

                var _label = this._initLabel( _data );

                var _node = $( '<li class="folder_open"></li>' );
                    _node.html( '<span class="folder_img_root folderRoot folder_img_open">&nbsp;</span>' );
                    _label.appendTo( _node );

                    _node.appendTo( _parentNode );
                    _parentNode.appendTo( _p._model.selector() );

                    this.selector( _parentNode );

                var _r =  $( '<ul style="" class="tree_wrap_inner"></ul>' )
                    _r.appendTo( _node );

                return _r;
            }
        /**
         * 初始化树的文件夹节点
         * @param   {selector}  _parentNode
         * @param   {object}    _data
         * @param   {bool}      _isLast
         */
        , _initFolder:
            function( _parentNode, _data, _isLast ){
                var _last = '', _last1 = '';
                    _isLast && ( _last = 'folder_span_lst ', _last1 = 'folder_last' );

                var _label = this._initLabel( _data );

                var _node = $( JC.f.printf( '<li><span class="folder_img_closed folder {1}">&nbsp;</span></li>', _data[1], _last ) );
                    _node.addClass( JC.f.printf( 'folder_closed {0} folder', _last1 ));
                    _label.appendTo( _node );

                var _r =  $( '<ul style="display:none;" class="folder_ul_lst" ></ul>' )
                    _r.appendTo( _node );

                    _node.appendTo( _parentNode );
                    this._process( this._model.child( _data[0] ), _r );
            }
        /**
         * 初始化树的文件节点
         * @param   {selector}  _parentNode
         * @param   {object}    _data
         * @param   {bool}      _isLast
         */
        , _initFile:
            function( _parentNode, _data, _isLast ){
                var _last = 'folder_img_bottom ', _last1 = '';
                    _isLast && ( _last = 'folder_img_last ', _last1 = '' );

                var _label = this._initLabel( _data );

                var _node = $( JC.f.printf( '<li><span class="{1}file">&nbsp;</span></li>', _data[1], _last ) );
                    _node.addClass( 'folder_closed file');
                    _label.appendTo( _node );

                    _node.appendTo( _parentNode );
            }
        /**
         * 初始化树的节点标签
         * @param   {object}    _data
         * @return  selector
         */
        , _initLabel:
            function( _data ){
                var _label = $('<div class="node_ctn"></div>');
                    _label.attr( 'id', this._model.id( _data[0] ) )
                        .attr( 'data-id', _data[0] )
                        .attr( 'data-name', _data[1] )
                        .data( 'nodeData', _data );

                if( this._model.event( 'RenderLabel' ) ){
                    $.each( this._model.event('RenderLabel'), function( _ix, _cb ){
                        if( _cb.call( _label, _data, _label ) === false ) return false;
                    });
                }else{
                    _label.html( _data[1] || '没有标签' );
                }
                return _label;
            }
        /**
         * 展开树的所有节点
         */
        , openAll:
            function(){
                if( !this.selector() ) return;
                this.selector().find('span.folder_img_closed').each( function(){
                    $(this).trigger('click');
                });
            }
        /**
         * 关闭树的所有节点
         */
        , closeAll:
            function(){
                if( !this.selector() ) return;
                this.selector().find('span.folder_img_open, span.folder_img_root').each( function(){
                    if( $(this).hasClass( 'folder_img_closed' ) ) return;
                    $(this).trigger('click');
                });
            }
        /**
         * 展开树到具体节点
         * @param   {string}    _nodeId
         */
        , open: 
            function( _nodeId ){
                if( !_nodeId ) return;
                var _tgr = $( '#' + this._model.id( _nodeId ) );
                if( !_tgr.length ) return;

                var lis = _tgr.parents('li');

                this.selectedItem( _tgr );

                lis.each( function(){
                    var _sp = $(this), _child = _sp.find( '> span.folderRoot, > span.folder' );
                    if( _child.length ){
                        if( _child.hasClass( 'folder_img_open' ) ) return;
                        _child.trigger( 'click' );
                    }
                });
            }
        , selectedItem:
            function( _selector ){
                _selector && ( _selector = $( _selector ) );
                if( !( _selector && _selector.length ) ) return this._model.highlight();

                if( this._model.highlight() ) {
                    this._model.highlight().removeClass('highlight').removeClass( 'selectedAjaxTreeNode' );
                }
                _selector.addClass( 'highlight' ).addClass( 'selectedAjaxTreeNode' );

                this._model.highlight( _selector );
                return _selector;
            }
        /**
         * 关闭树的具体节点
         * @param   {string}    _nodeId
         */
        , close:
            function( _nodeId ){
                if( !_nodeId ) return;
                var _tgr = $( '#' + this._model.id( _nodeId ) );
                if( !_tgr.length ) return;
                var _child = _tgr.parent('li').find( '> span.folderRoot, > span.folder' );
                if( _child.length ){
                    if( _child.hasClass( 'folder_img_closed' ) ) return;
                    _child.trigger( 'click' );
                }
                
            }

    });
    /**
     * 树的最后的 hover 节点
     * <br />树的 hover 是全局属性, 页面上的所有树只会有一个当前 hover
     * @property    lastHover
     * @type    selector
     * @default null
     */
    AjaxTree.lastHover = null;

    $(document).delegate( 'ul.tree_wrap div.node_ctn', 'mouseenter', function(){
        if( AjaxTree.lastHover ) AjaxTree.lastHover.removeClass('ms_over');
        $(this).addClass('ms_over');
        AjaxTree.lastHover = $(this);
    });
    $(document).delegate( 'ul.tree_wrap div.node_ctn', 'mouseleave', function(){
        if( AjaxTree.lastHover ) AjaxTree.lastHover.removeClass('ms_over');
    });
    /**
     * 树节点的点击事件
     * @event   click
     * @param   {event}     _evt
     * @example
            $( document ).delegate( 'div.js_compAjaxTree', 'click', function( _evt, _item, _data, _box ){
                JC.dir( _item[0], _data, _box[0] );
            });
     */
    /**
     * 树节点的change事件
     * @event   change
     * @param   {event}     _evt
     * @example
            $( document ).delegate( 'div.js_compAjaxTree', 'change', function( _evt, _item, _data, _box ){
                JC.dir( _item[0], _data, _box[0] );
            });
     */

    $(document).delegate( 'ul.tree_wrap div.node_ctn', 'click', function( _evt ){
        var _p = $(this)
            , _treeselector = JC.f.getJqParent( _p, 'div.js_compAjaxTree' )
            , _treeIns = _treeselector.data( AjaxTree.Model._instanceName )
            , _nodeData, _tmpData
            , _isChange = true
            ;

        if( !_treeIns ) return;

        _nodeData = _p.data( 'nodeData' );

        _treeselector.trigger( 'click', [ _p, _p.data( 'nodeData' ), _treeselector ] );

        _treeIns.selectedItem( _p );

        if( ( _tmpData = _treeselector.data( 'preSelectedData' ) ) && _tmpData[0] === _nodeData[0] ){
            _isChange = false;
        }
        _treeselector.data( 'preSelectedData', _nodeData );

        _isChange && _treeselector.trigger( 'change', [ _p, _p.data( 'nodeData' ), _treeselector ] );
    });

    /**
     * 树节点的展现事件
     * @event   RenderLabel
     * @param   {array}     _data
     * @param   {selector}  _item
     * @example
            _tree.on('RenderLabel', function( _data ){
                var _node = $(this);
                _node.html( JC.f.printf( '<a href="javascript:" dataid="{0}">{1}</a>', _data[0], _data[1] ) );
            });
     */

    /**
     * 树文件夹的点击事件
     * @event   FolderClick
     * @param   {event}     _evt
     * @example
            _tree.on('FolderClick', function( _evt ){
                var _p = $(this);
                alert( 'folder click' );
            });
     */

    /**
     * 捕获树文件夹图标的点击事件
     */
    $(document).delegate( 'ul.tree_wrap span.folder, ul.tree_wrap span.folderRoot', 'click', function( _evt ){
        var _p = $(this), _pntLi = _p.parent('li'), _childUl = _pntLi.find( '> ul');
        var _treeselector = JC.f.getJqParent( _p, 'div.js_compAjaxTree' )
            , _treeIns = _treeselector.data( AjaxTree.Model._instanceName )
            ;
        if( !_treeIns ) return;

        /*
        var _events = _treeIns.event( 'FolderClick' );
        if( _events && _events.length ){
            $.each( _events, function( _ix, _cb ){
                if( _cb.call( _p, _evt ) === false ) return false; 
            });
        }
        */

        if( _p.hasClass( 'folder_img_open' ) ){
            _p.removeClass( 'folder_img_open' ).addClass( 'folder_img_closed' );
            _childUl.hide();
        }else if( _p.hasClass( 'folder_img_closed' ) ){
            _p.addClass( 'folder_img_open' ).removeClass( 'folder_img_closed' );
            _childUl.show();
        }

        if( _pntLi.hasClass('folder_closed') ){
            _pntLi.addClass('folder_open').removeClass('folder_closed');
        }else if( _pntLi.hasClass('folder_open') ){
            _pntLi.removeClass('folder_open').addClass('folder_closed');
        }
    });

    $( document ).ready( function(){
        JC.f.safeTimeout( function(){
            AjaxTree.autoInit && AjaxTree.init();
        }, null, 'JCAjaxTreeInit', 1 );
    });

    return JC.AjaxTree;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
