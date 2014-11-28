;(function(define, _win) { 'use strict'; define( [ 'JC.AjaxTree' ], function(){
;( function( $ ){
    window.ZINDEX_COUNT = window.ZINDEX_COUNT || 50001;

    JC.AjaxTree.dataFilter = JC.Tree.dataFilter ||
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

    $(document).delegate('div.tree_container', 'click', function( _evt ){
        _evt.stopPropagation();
    });

    $(document).on('click', function(){
        $('div.dpt-select-active').trigger('click');
    });

    $(document).delegate( 'div.dpt-select', 'click', function( _evt ){
        _evt.stopPropagation();
        var _p = $(this), _treeNode = $( _p.attr('treenode') );
        var _treeIns = _treeNode.data('TreeIns');
        if( !_p.hasClass( 'dpt-select-active') ){
            $('div.dpt-select-active').trigger('click');
        }
        if( !_treeIns ){
            var _data = window[ _p.attr( 'treedata' ) ];

            var _tree = new JC.AjaxTree( _treeNode, _data );
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
        if( _treeNode.css('display') != 'none' ){
            _p.removeClass( 'dpt-select-active' );
            _treeNode.hide();
        }else{
            _treeNode.show();
            _p.addClass( 'dpt-select-active' );
            _treeNode.css( { 'top': _p.prop( 'offsetHeight' ) -2 + 'px', 'left': '-1px' } );
        }
    });
}(jQuery));
});}(typeof define === 'function' && define.amd ? define : function (_require, _cb) { _cb && _cb(); }, this));
