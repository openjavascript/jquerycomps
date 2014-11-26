    ;requirejs( [ 
        '../../lib/codemirror'
        , 'codeMirror.htmlmixed'
        , 'JC.FrameUtil'
    ], function( CodeMirror ){

        var dataTool = window.top.dataTool;

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

            var _tarTextList = $( e.target ).text().split( '- v' );
            window.parent.showNextComp( 
                dataTool.getDetailPathByNameAndVersion( 
                    $.trim( _tarTextList[ 0 ] )
                    , $.trim( _tarTextList[ 1 ] )
                ) 
            );
        } );

        $( '.detail-versionlink' ).on( 'click', function( e ){
            e.preventDefault();

            var _tar = $( e.target );
            if( _tar.hasClass( 'detail-nowVersion' ) ){
                return;
            }

            window.parent.showNextComp( 
                dataTool.getDetailPathByNameAndVersion( 
                    $.trim( _tar.attr( 'data-name' ) )
                    , $.trim( _tar.text() )
                )
            );
        });

    });