$( '.detail-groupname' ).each( function( _k, _item ){
    _item = $( _item );
    _item.attr( 'id', 'navmark-demo' + ( _k + 1 ) );
});

;requirejs( [ 
    'common'
    , '../../lib/codemirror'
    , 'codeMirror.htmlmixed'
    , 'JC.FrameUtil'
], function( appCommon, CodeMirror ){

    JC.FrameUtil.autoNoticeSize();

    if( window.parent === window ){
        $( 'body' ).css( { 'overflow-y': 'auto' } );
    }

    var codetpl = $( '.detail-codetpl' );
    $( '.detail-code' ).each( function( i, ele ){
        ele = $( ele );
        var _mode = 'htmlmixed';
        if( ele.hasClass( 'is_js' )){
            _mode = 'javascript';
        }
        ele.html( codetpl.eq( i ).html() );
        CodeMirror.fromTextArea( ele[0], {
            readOnly: 'nocursor',
            lineWrapping: true,
            mode: { name: _mode }
        } );
    } );

    initDetailNav();

	function initDetailNav( _iframe ){
		
		var _idocuemt = JDOC;
		var _window = JWIN;
		var _nav = $( '#bodynav' );
		var _li, _data = [], _html = [];
		_nav.html( '' );

		_idocuemt.find( '[id^=navmark-]' ).each( function( _i, _ele ){
            _ele = $( _ele );
            if( _ele.prop( 'tagName').toUpperCase() == 'H3' ){
                _data.push( { ele: _ele, id: _ele.attr( 'id' ), data: [], name: _ele.html().trim() } );
            }else{
                var _lastData = _data[ _data.length - 1];
                if( !_lastData ) return;
                _lastData.data.push( { ele: _ele, id: _ele.attr( 'id' ), name:_ele.html().trim() } );
            }
        });
        if( !_data.length ) return;

        if( window.DOC_PATH || window.DEMO_PATH ){
            _html.push( '<dl><dt></dt><dd><ul>' );
            if( window.DOC_PATH ){
                _html.push( JC.f.printf( '<li class="nav_ext_link"><a href="{0}" class="is_link is_doc" target="_detail">查看文档</a></li>'
                , window.DOC_PATH ) );
            }

            if( window.DEMO_PATH ){
                _html.push( JC.f.printf( '<li class="nav_ext_link"><a href="{0}" class="is_link is_demo" target="_detail" >查看演示</a></li>'
                , window.DEMO_PATH ) );
            }

            _html.push( '</ul></dd></dl>' );
        }

        $.each( _data, function( _k, _item ){
            _html.push( '<dl><dt>' );
            _html.push( JC.f.printf( '<a href="#{1}" title="{0}">{0}</a>', _item.name.replace( /[:：].*/, '' ), _item.id ) );
            _html.push( '</dt><dd>' );
            if( _item.data.length ){
                _html.push( '<ul>' );
                $.each( _item.data, function( _sk, _sitem ){
                    _html.push( JC.f.printf( '<li><a href="#{1}" title="{0}">{0}</a></li>', _sitem.name.replace( /[:：].*/, '' ), _sitem.id ) );
                });
                _html.push( '</ul>' );
            }
            _html.push( '</dd></dl>' );
        });

        _nav.html( _html.join('') );
	}
});
