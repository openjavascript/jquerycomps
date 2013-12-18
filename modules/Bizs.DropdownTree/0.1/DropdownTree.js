;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC', 'JC.Tree' ], function(){
;(function($){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.DropdownTree.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/Bizs.DropdownTree/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会自动处理 div class="js_bizDropdownTree" </h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace window.Bizs
 * @class DropdownTree
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>DropdownTree example</h2>
 */
    Bizs.DropdownTree = DropdownTree;
    window.ZINDEX_COUNT = window.ZINDEX_COUNT || 50001;

    function DropdownTree( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, DropdownTree ) ) 
            return JC.BaseMVC.getInstance( _selector, DropdownTree );

        JC.BaseMVC.getInstance( _selector, DropdownTree, this );

        this._model = new DropdownTree.Model( _selector );
        this._view = new DropdownTree.View( this._model );

        this._init();

        JC.log( DropdownTree.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 DropdownTree 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of DropdownTreeInstance}
     */
    DropdownTree.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_bizDropdownTree' )  ){
                    _r.push( new DropdownTree( _selector ) );
                }else{
                    _selector.find( 'div.js_bizDropdownTree' ).each( function(){
                        _r.push( new DropdownTree( this ) );
                    });
                }
            }
            return _r;
        };

    BaseMVC.build( DropdownTree );

    JC.f.extendObject( DropdownTree.prototype, {
        _beforeInit:
            function(){
                JC.log( 'DropdownTree _beforeInit', new Date().getTime() );
            }
    
        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( 'DropdownTreeSelected', function( _evt, _id, _name, _triggerSelector ){
                    //alert( [ _id, _name ] );
                    _p.hide();
                });
            }

        , _inited:
            function(){
                JC.log( 'DropdownTree _inited', new Date().getTime() );
                this.update();
            }

        , show: function(){ this._view.show(); }

        , hide: function(){ this._view.hide(); }

        , toggle: function(){ this._view.toggle(); }

        , update:
            function( _data ){
                this._view.update( _data );
            }
    });

    DropdownTree.Model._instanceName = 'DropdownTree';
    JC.f.extendObject( DropdownTree.Model.prototype, {
        init:
            function(){
                JC.log( 'DropdownTree.Model.init:', new Date().getTime() );
            }

        , bdtData: function(){ return this.windowProp( 'bdtData' ) || {}; }

        , bdtTreeBox:
            function(){
                var _r = this.selector().find( '> .bdtTreeBox' );
                return _r;
            }

        , bdtLabel:
            function(){
                var _r = this.selector().find( '> .bdtLabel' );
                return _r;
            }

        , bdtInput:
            function(){
                var _r = this.selector().find( '> .bdtInput' );
                return _r;
            }
    });

    JC.f.extendObject( DropdownTree.View.prototype, {
        init:
            function(){
                JC.log( 'DropdownTree.View.init:', new Date().getTime() );
            }

        , update:
            function( _data ){
                var _p = this, _tins = _p._model.treeIns;
                _data = _data || _p._model.bdtData();

                if( !_p._model.treeIns ){

                    //console.dir && console.dir( _data );

                    _tins = _p._model.treeIns = new JC.Tree( _p._model.bdtTreeBox(), _data );

                    _tins.on( 'click', function(){
                        var _sp = $(this)
                            , _dataid = _sp.attr('dataid')
                            , _dataname = _sp.attr('dataname');
                        
                        _p._model.bdtLabel().html( _dataname );
                        _p._model.bdtInput().val( _dataid );

                        $( _p ).trigger( 'TriggerEvent', [ 'DropdownTreeSelected', _dataid, _dataname, _sp ] );
                     });

                    _tins.on( 'RenderLabel', function( _data ){
                        var _node = $(this);
                        _node.html( JC.f.printf( '<a href="javascript:" dataid="{0}">{1}</a>', _data[0], _data[1] ) );
                    });

                    _tins.init();
                    _tins.open();
                }

                /*
                if( !_treeIns ){
                    var _data = window[ _p.attr( 'treedata' ) ];

                    var _tree = new JC.Tree( _treeNode, _data );
                        _tree.on( 'click', function(){
                            var _sp = $(this)
                                , _dataid = _sp.attr('dataid')
                                , _dataname = _sp.attr('dataname');
                            
                            _p.find( '> span.label' ).html( _dataname );
                            _p.find( '> input[type=hidden]' ).val( _dataid );
                            _p.trigger( 'click' );
                         });
                        _tree.on( 'RenderLabel', function( _data ){
                            var _node = $(this);
                            _node.html( JC.f.printf( '<a href="javascript:" dataid="{0}">{1}</a>', _data[0], _data[1] ) );
                        });
                        _tree.init();
                        _tree.open();

                        var _defSelected = _p.find( '> input[type=hidden]' ).val();
                        _defSelected && _tree.open( _defSelected );
                }
                _treeNode.css( { 'z-index': ZINDEX_COUNT++ } );
                */
            }

        , show:
            function(){
                var _p = this;
                JC.f.safeTimeout( setTimeout( function(){}, 50), _p._model.selector(), 'DropdownTreeUi' );
                _p.updateZIndex();
                _p._model.selector().addClass( 'bdtBox-active' );
                _p._model.bdtTreeBox().show();
            }

        , hide:
            function(){
                var _p = this;
                _p._model.bdtTreeBox().hide();
                JC.f.safeTimeout( setTimeout( function(){
                    _p._model.selector().removeClass( 'bdtBox-active' );
                }, 50), _p._model.selector(), 'DropdownTreeUi' );
            }

        , toggle:
            function(){
                this.updateZIndex();

                if( this._model.bdtTreeBox().is( ':visible' ) ){
                    this.hide();
                }else{
                    this.show();
                }
            }

        , updateZIndex:
            function(){
                this._model.bdtTreeBox().css( { 'z-index': ZINDEX_COUNT++ } );
            }
    });

    JC.Tree.dataFilter = JC.Tree.dataFilter ||
        function( _data ){
            var _r = {};

            if( _data && _data.root && _data.root.length > 2 ){
                _data.root.shift();
                _r.root = _data.root;
                _r.data = {};
                for( var k in _data.data ){
                    _r.data[ k ] = [];
                    for( var i = 0, j = _data.data[k].length; i < j; i++ ){
                        if( _data.data[k][i].length < 3 ) {
                            _r.data[k].push( _data.data[k][i] );
                            continue;
                        }
                        _data.data[k][i].shift();
                        _r.data[k].push( _data.data[k][i] );
                    }
                }
            }else{
                _r = _data;
            }
            return _r;
        };

    /*
    $(document).ready( function(){
        var _insAr = 0;
        DropdownTree.autoInit
            && ( _insAr = DropdownTree.init() )
            ;
    });
    */
    var _PRE_CLICK;
    $(document).delegate( 'div.js_bizDropdownTree', 'click', function( _evt ){
        _evt.stopPropagation();

        if( _PRE_CLICK ){
            if( ( new Date().getTime() - _PRE_CLICK ) < 200 ){
                return;
            }
        }
        _PRE_CLICK = new Date().getTime();

        var _p = $(this), _ins;

        JC.f.safeTimeout( function(){
            _ins = JC.BaseMVC.getInstance( _p, DropdownTree );
            !_ins && ( _ins = new DropdownTree( _p ) );
            _ins.toggle();
            JC.log( 'div.js_bizDropdownTree click', new Date().getTime() );
        }, _p, 'DropdownTreeClick', 50 );
    });

    $(document).click( function(){
        $( 'div.js_bizDropdownTree' ).each( function(){
            var _ins = JC.BaseMVC.getInstance( $(this), DropdownTree );
                _ins && _ins.hide();
        });
    });

    $(document).delegate( 'div.js_bizDropdownTree > .bdtTreeBox', 'click', function( _evt ){
        _evt.stopPropagation();
    });

}(jQuery));
    return Bizs.DropdownTree;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
