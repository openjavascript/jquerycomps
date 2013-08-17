;( function( $ ){
    window.Tree = JC.Tree = Tree;
    /**
     * 树菜单类 JC.Tree
     * <p><b>requires</b>: <a href='window.jQuery.html'>jQuery</a>, 
     * <a href='.window.html#method_printf'>window.printf</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc.openjavascript.org/docs_api/classes/JC.Tree.html' target='_blank'>API docs</a>
     * | <a href='../../comps/Tree/_demo' target='_blank'>demo link</a></p>
     * @namespace JC
     * @class Tree
     * @constructor
     * @param   {selector}          _selector   树要显示的选择器
     * @param   {object}            _data       树菜单的数据
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 Team
     * @date    2013-06-29
     * @example
            <link href='../../../comps/Tree/res/default/style.css' rel='stylesheet' />
            <script src="../../../lib.js"></script>
            <script>
                JC.use( 'Tree' );
                $(document).ready( function(){
                    var treeData = {
                        data: {"24":[["25","\u4e8c\u7ec4\u4e00\u961f"],["26","\u4e8c\u7ec4\u4e8c\u961f"],["27","\u4e8c\u7ec4\u4e09\u961f"]],"23":[["28","\u9500\u552e\u4e8c\u7ec4"],["24","\u552e\u524d\u5ba1\u6838\u7ec4"]]},
                        root: ["23",'客户发展部']
                    };
                    var _tree = new JC.Tree( $('#tree_box2'), treeData );
                        _tree.on('RenderLabel', function( _data ){
                            var _node = $(this);
                            _node.html( printf( '<a href="javascript:" dataid="{0}">{1}</a>', _data[0], _data[1] ) );
                        });
                        _tree.on('click', function( _evt ){
                            var _p = $(this);
                            JC.log( 'tree click:', _p.html(), _p.attr('dataid'), _p.attr('dataname') );
                        });
                        _tree.init();
                        //_queryNode && _tree.open( _queryNode );
                });
            </script>
            <div id="tree_box2" class="tree_container"></div>
     */

    function Tree( _container, _data ){
        if( _container && $(_container).length ){
            _container = $(_container);
            if( Tree.getInstance( _container ) ) return Tree.getInstance( _container );
            _container.data( 'TreeIns', this );
        }
        /**
         * 树的数据模型引用
         * @property    _model
         * @type    JC.Tree.Model
         * @private
         */
        this._model = new Model( _container, _data );
        /**
         * 树的视图模型引用
         * @property    _view
         * @type    JC.Tree.View
         * @private
         */
        this._view = new View( this._model );
    }
    /**
     * 从选择器获取 树的 实例, 如果实例有限, 加以判断可避免重复初始化
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {JC.Tree Instance|undefined}
     */
    Tree.getInstance = 
        function( _selector ){
            _selector = $(_selector);
            return _selector.data('TreeIns');
        };
    /**
     * 树的数据过滤函数
     * <br /> 如果树的初始数据格式不符合要求, 可通过该属性定义函数进行数据修正
     * @property    dataFilter
     * @type        function
     * @default     undefined
     * @static
     * @example
            JC.Tree.dataFilter =
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
    Tree.dataFilter;
    
    Tree.prototype = {
        /**
         * 初始化树
         * <br /> 实例化树后, 需要显式调用该方法初始化树的可视状态
         * @method  init
         * @example
                var _tree = new JC.Tree( $('#tree_box'), treeData );
                _tree.init();
         */
        init:
            function(){
                this._view.init();
                this._view.treeRoot().data( 'TreeIns', this );
                return this;
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
         * 绑定树内部事件
         * <br /><b>注意:</b> 所有事件名最终会被转换成小写
         * @method  on
         * @param   {string}    _evtName
         * @param   {function}  _cb
         */
        , on:
            function( _evtName, _cb ){
                if( !( _evtName && _cb ) ) return this;
                this._model.addEvent( _evtName, _cb );
                return this;
            }
        /**
         * 获取树的某类事件类型的所有回调
         * @method  event
         * @param   {string}    _evtName
         * @return  {array}
         */
        , event: function( _evtName ){ if( !_evtName ) return; return this._model.event( _evtName ); }
        /**
         * 获取或设置树的高亮节点
         * <br /><b>注意:</b> 这个只是数据层面的设置, 不会影响视觉效果
         * @method  highlight
         * @param   {selector}  _item
         * @return  selector
         */
        , highlight:
            function( _item ){
                return this._model.highlight( _item );
            }
    }
    /**
     * 树节点的点击事件
     * @event   click
     * @param   {event}     _evt
     * @example
            _tree.on('click', function( _evt ){
                var _p = $(this);
                JC.log( 'tree click:', _p.html(), _p.attr('dataid'), _p.attr('dataname') );
            });
     */

    /**
     * 树节点的展现事件
     * @event   RenderLabel
     * @param   {array}     _data
     * @param   {selector}  _item
     * @example
            _tree.on('RenderLabel', function( _data ){
                var _node = $(this);
                _node.html( printf( '<a href="javascript:" dataid="{0}">{1}</a>', _data[0], _data[1] ) );
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
     * 树的数据模型类
     * @namespace   JC.Tree
     * @class   Model
     * @constructor
     */
    function Model( _container, _data ){
        /**
         * 树要展示的容器
         * @property    _container
         * @type    selector
         * @private
         */
        this._container = _container;
        /**
         * 展现树需要的数据
         * @property    _data
         * @type    object
         * @private
         */
        this._data = _data;
        /**
         * 树的随机ID前缀
         * @property    _id
         * @type    string
         * @private
         */
        this._id = 'tree_' + new Date().getTime() + '_';
        /**
         * 树当前的高亮节点
         * @property    _highlight
         * @type    selector
         * @private
         */
        this._highlight;
        /**
         * 保存树的所有绑定事件
         * @property    _events
         * @type    object
         * @private
         */
        this._events = {};
        
        this._init();
    }
    
    Model.prototype = {
        /**
         * 树模型类内部初始化方法
         * @method  _init
         * @private
         */
        _init:
            function(){
                Tree.dataFilter && ( this._data = Tree.dataFilter( this._data ) );
                return this;
            }
        /**
         * 获取树所要展示的容器
         * @method  container
         * @return  selector
         */
        , container: function(){ return this._container; }
        /**
         * 获取节点将要显示的ID
         * @method  id
         * @param   {string}    _id 节点的原始ID
         * @return  string  节点的最终ID
         */
        , id: function( _id ){ return this._id + _id; }
        /**
         *  获取树的随机ID前缀
         *  @method idPrefix
         *  @return string
         */
        , idPrefix: function(){ return this._id; }
        /**
         * 获取树的原始数据
         * @method  data
         * @return  object
         */
        , data: function(){ return this._data; }
        /**
         * 获取树生成后的根节点
         * @method  root
         * @return  selector
         */
        , root: function(){ return this._data.root; }
        /**
         * 获取ID的具体节点
         * @method  child
         * @param   {string}    _id
         * @return  selector
         */
        , child: function( _id ){ return this._data.data[ _id ]; }
        /**
         * 判断原始数据的某个ID是否有子级节点
         * @method  hasChild
         * @param   {string}    _id
         * @return  bool
         */
        , hasChild: function( _id ){ return _id in this._data.data; }
        /**
         * 获取树的某类绑定事件的所有回调
         * @method event
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
         * @method  addEvent
         * @param   {string}    _evtName
         * @param   {function}  _cb
         */
        , addEvent:
            function( _evtName, _cb ){
                _evtName = _evtName.toLowerCase();
                if( !( _evtName in this._events ) ) this._events[ _evtName ] = [];
                this._events[ _evtName ].unshift( _cb );
            }
        /**
         * 获取或设置树的高亮节点
         * <br /><b>注意:</b> 这个只是数据层面的设置, 不会影响视觉效果
         * @method  highlight
         * @param   {selector}  _item
         * @return  selector
         */
        , highlight:
            function( _highlight ){
                _highlight && ( this._highlight = _highlight );
                return this._highlight;
            }
    };
    /**
     * 树的视图模型类
     */
    function View( _model ){
        /**
         * 树的数据模型引用
         * @property    _model
         * @type    JC.Tree.Model
         * @private
         */
        this._model = _model;
        /**
         * 树生成后的根节点
         * @property    _treeRoot
         * @type    selector
         * @private
         */
        this._treeRoot;
    }
    
    View.prototype = {
        /**
         * 初始化树的可视状态
         * @method  init 
         */
        init:
            function() {
                if( !( this._model.data() && this._model.root() ) ) return;
                this._process( this._model.child( this._model.root()[0] ), this._initRoot() );
                return this;
            }
        /**
         * 获取或设置树生成后的根节点
         * @method  treeRoot
         * @param   {string}    _setter
         * @return  selector
         */
        , treeRoot:
            function( _setter ){
                _setter && ( this._treeRoot = _setter );
                return this._treeRoot;
            }
        /**
         * 处理树的展现效果
         * @method  _process
         * @param   {array}     _data   节点数据
         * @param   {selector}  _parentNode
         * @private
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
         * @method  _initRoot
         * @private
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
                    _parentNode.appendTo( _p._model.container() );

                    this.treeRoot( _parentNode );

                var _r =  $( '<ul style="" class="tree_wrap_inner"></ul>' )
                    _r.appendTo( _node );

                return _r;
            }
        /**
         * 初始化树的文件夹节点
         * @method  _initFolder
         * @param   {selector}  _parentNode
         * @param   {object}    _data
         * @param   {bool}      _isLast
         * @private
         */
        , _initFolder:
            function( _parentNode, _data, _isLast ){
                var _last = '', _last1 = '';
                    _isLast && ( _last = 'folder_span_lst ', _last1 = 'folder_last' );

                var _label = this._initLabel( _data );

                var _node = $( printf( '<li><span class="folder_img_closed folder {1}">&nbsp;</span></li>', _data[1], _last ) );
                    _node.addClass( printf( 'folder_closed {0} folder', _last1 ));
                    _label.appendTo( _node );

                var _r =  $( '<ul style="display:none;" class="folder_ul_lst" ></ul>' )
                    _r.appendTo( _node );

                    _node.appendTo( _parentNode );
                    this._process( this._model.child( _data[0] ), _r );
            }
        /**
         * 初始化树的文件节点
         * @method  _initFile
         * @param   {selector}  _parentNode
         * @param   {object}    _data
         * @param   {bool}      _isLast
         * @private
         */
        , _initFile:
            function( _parentNode, _data, _isLast ){
                var _last = 'folder_img_bottom ', _last1 = '';
                    _isLast && ( _last = 'folder_img_last ', _last1 = '' );

                var _label = this._initLabel( _data );

                var _node = $( printf( '<li><span class="{1}file">&nbsp;</span></li>', _data[1], _last ) );
                    _node.addClass( 'folder_closed file');
                    _label.appendTo( _node );

                    _node.appendTo( _parentNode );
            }
        /**
         * 初始化树的节点标签
         * @method  _initLabel
         * @private
         * @param   {object}    _data
         * @return  selector
         */
        , _initLabel:
            function( _data ){
                var _label = $('<div class="node_ctn"></div>');
                    _label.attr( 'id', this._model.id( _data[0] ) )
                        .attr( 'dataid', _data[0] )
                        .attr( 'dataname', _data[1] )
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
         * @method  openAll
         */
        , openAll:
            function(){
                if( !this.treeRoot() ) return;
                this.treeRoot().find('span.folder_img_closed').each( function(){
                    $(this).trigger('click');
                });
            }
        /**
         * 关闭树的所有节点
         * @method  closeAll
         */
        , closeAll:
            function(){
                if( !this.treeRoot() ) return;
                this.treeRoot().find('span.folder_img_open, span.folder_img_root').each( function(){
                    if( $(this).hasClass( 'folder_img_closed' ) ) return;
                    $(this).trigger('click');
                });
            }
        /**
         * 展开树到具体节点
         * @method  open
         * @param   {string}    _nodeId
         */
        , open: 
            function( _nodeId ){
                if( !_nodeId ) return;
                var _tgr = $( '#' + this._model.id( _nodeId ) );
                if( !_tgr.length ) return;

                var lis = _tgr.parents('li');

                if( this._model.highlight() ) this._model.highlight().removeClass('highlight');
                _tgr.addClass( 'highlight' );
                this._model.highlight( _tgr );

                lis.each( function(){
                    var _sp = $(this), _child = _sp.find( '> span.folderRoot, > span.folder' );
                    if( _child.length ){
                        if( _child.hasClass( 'folder_img_open' ) ) return;
                        _child.trigger( 'click' );
                    }
                });
            }
        /**
         * 关闭树的具体节点
         * @method  close
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

    };
    /**
     * 树的最后的 hover 节点
     * <br />树的 hover 是全局属性, 页面上的所有树只会有一个当前 hover
     * @property    lastHover
     * @type    selector
     * @default null
     */
    Tree.lastHover = null;
    $(document).delegate( 'ul.tree_wrap div.node_ctn', 'mouseenter', function(){
        if( Tree.lastHover ) Tree.lastHover.removeClass('ms_over');
        $(this).addClass('ms_over');
        Tree.lastHover = $(this);
    });
    $(document).delegate( 'ul.tree_wrap div.node_ctn', 'mouseleave', function(){
        if( Tree.lastHover ) Tree.lastHover.removeClass('ms_over');
    });
    /**
     * 捕获树文件标签的点击事件
     */
    $(document).delegate( 'ul.tree_wrap div.node_ctn', 'click', function( _evt ){
        var _p = $(this)
            , _treeContainer = _p.parents( 'ul.tree_wrap' )
            , _treeIns = _treeContainer.data('TreeIns');

        if( !_treeIns ) return;

        var _events = _treeIns.event( 'click' );
        if( _events && _events.length ){
            $.each( _events, function( _ix, _cb ){
                if( _cb.call( _p, _evt ) === false ) return false; 
            });
        }

        if( _treeIns.highlight() ) _treeIns.highlight().removeClass('highlight');
        _p.addClass('highlight');
        _treeIns.highlight( _p );

        var _events = _treeIns.event( 'change' );
        if( _events && _events.length ){
            $.each( _events, function( _ix, _cb ){
                if( _cb.call( _p, _evt ) === false ) return false; 
            });
        }
    });
    /**
     * 捕获树文件夹图标的点击事件
     */
    $(document).delegate( 'ul.tree_wrap span.folder, ul.tree_wrap span.folderRoot', 'click', function( _evt ){
        var _p = $(this), _pntLi = _p.parent('li'), _childUl = _pntLi.find( '> ul');
        var _treeContainer = _p.parents( 'ul.tree_wrap' )
        , _treeIns = _treeContainer.data('TreeIns');

        var _events = _treeIns.event( 'FolderClick' );
        if( _events && _events.length ){
            $.each( _events, function( _ix, _cb ){
                if( _cb.call( _p, _evt ) === false ) return false; 
            });
        }

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

}(jQuery));
