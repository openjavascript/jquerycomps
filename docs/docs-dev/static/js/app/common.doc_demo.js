    ;requirejs( [ 
        '../../lib/codemirror'
        , 'codeMirror.htmlmixed'
        , 'JC.FrameUtil'
    ], function( CodeMirror ){

        JC.FrameUtil.autoNoticeSize();

        var codetpl = $( '.detail-codetpl' );
        $( '.detail-code' ).each( function( i, ele ){
            $( ele ).html( codetpl.eq( i ).html() );
            CodeMirror.fromTextArea( ele, {
                readOnly: 'nocursor',
                lineWrapping: true,
                mode: { name: 'htmlmixed' }
            } );
        } );

        $( '.detail-requirelink' ).on( 'click', function( e ){
            e.preventDefault();

            var _tarTextList = $( e.target ).text().split( '- v' )
                , _name = $( this ).attr( 'data-name' )
                , _version = $( this ).attr( 'data-version' )
                ;
            window.parent.showNextComp( JC.f.printf( '{0}/viewer.php?module={1}&version={2}&file=doc.tpl'
                    , window.PROJECT_ROOT, _name, _version ) );
        } );

        $( '.detail-versionlink' ).on( 'click', function( e ){
            e.preventDefault();

            var _tar = $( e.target )
                , _version = $( this ).attr( 'data-version' )
                ;

            if( _tar.hasClass( 'detail-nowVersion' ) ){
                return;
            }

            window.parent.showNextComp( JC.f.printf( '{0}/viewer.php?module={1}&version={2}&file=doc.tpl'
                    , window.PROJECT_ROOT, window.COMP_NAME, _version ) );

        });

    });
