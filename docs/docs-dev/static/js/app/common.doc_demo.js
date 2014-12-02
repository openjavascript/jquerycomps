    ;requirejs( [ 
        '../../lib/codemirror'
        , 'codeMirror.htmlmixed'
        , 'JC.FrameUtil'
    ], function( CodeMirror ){

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
            ele.html( codetpl.eq( i ).html().trim() );
            CodeMirror.fromTextArea( ele[0], {
                readOnly: 'nocursor',
                lineWrapping: true,
                mode: { name: _mode }
            } );
        } );

        $( '.detail-requirelink' ).on( 'click', function( e ){
            JC.FrameUtil.noticeData( { 'type': 'GO_MAIN_TOP' } );
            e.preventDefault();

            var _tarTextList = $( e.target ).text().split( '- v' )
                , _name = $( this ).attr( 'data-name' )
                , _version = $( this ).attr( 'data-version' )
                ;


            JC.FrameUtil.noticeData( { 'type': 'NEXT_COMP', 'url': 
                JC.f.printf( '{0}/viewer.php?module={1}&version={2}&file=doc.tpl'
                    , window.PROJECT_ROOT, _name, _version )
            } );
        } );

        $( '.detail-versionlink' ).on( 'click', function( e ){

            JC.FrameUtil.noticeData( { 'type': 'GO_MAIN_TOP' } );
            e.preventDefault();

            var _tar = $( e.target )
                , _version = $( this ).attr( 'data-version' )
                ;

            if( _tar.hasClass( 'detail-nowVersion' ) ){
                return;
            }


            JC.FrameUtil.noticeData( { 'type': 'NEXT_COMP', 'url': 
                JC.f.printf( '{0}/viewer.php?module={1}&version={2}&file=doc.tpl'
                    , window.PROJECT_ROOT, window.COMP_NAME, _version )
            } );
        });

    });
