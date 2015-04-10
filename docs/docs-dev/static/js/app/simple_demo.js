requirejs( [ 'JC.common', '../../lib/codemirror', 'codeMirror.htmlmixed', 'JC.FrameUtil' ], function( Tree, CodeMirror ){
    JC.FrameUtil.autoNoticeSize();

    $( '.codeview-cssview textArea' ).html( $( '.show-css' ).html() );
    var cssEditor = CodeMirror.fromTextArea( $( '.codeview-cssview textArea' )[0], {
        readOnly: 'nocursor',
        lineNumbers: true,
        lineWrapping: true,
        mode: { name: 'css' }
    } );
    cssEditor.refresh();

    $( '.codeview-jsview textArea' ).html( $( '.show-js' ).html() );
    var jsEditor = CodeMirror.fromTextArea( $( '.codeview-jsview textArea' )[0], {
        readOnly: 'nocursor',
        lineNumbers: true,
        lineWrapping: true,
        mode: { name: 'javascript' }
    } );
    jsEditor.refresh();

    $( '.codeview-htmlview textArea' ).html( ( $( '.show-html' ).html() || '' ).replace( /</ig,'&lt;' ).replace( />/ig,'&gt;' ) );

    var htmlEditor = CodeMirror.fromTextArea( 
        $( '.codeview-htmlview textArea' )[0], {
        
        readOnly: 'nocursor',
        lineNumbers: true,
        lineWrapping: true,
        mode: { 
            name: 'htmlmixed'
            , scriptTypes: [
                { matches: 'text/template', mode: null } 
            ]
        }
    } );

    htmlEditor.refresh();

    $( '.codeview-tabbar a' ).on( 'click', function( e ){
        e.preventDefault();

        var _tar = $( e.target );
        if( _tar.hasClass( 'selected' ) ){
            return;
        }

        var _tarClass = _tar.attr( 'class' );
        _tar.parent().find( '.selected' ).removeClass( 'selected' );
        _tar.addClass( 'selected' );

        $( '.codeview-view .nowview' ).removeClass( 'nowview' );
        $( '.' + _tarClass + 'view' ).addClass( 'nowview' );

        if( _tarClass.indexOf('css') >= 0 ){
            cssEditor.refresh();
        } else if( _tarClass.indexOf('js') >= 0 ) {
            jsEditor.refresh();
        } else {
            htmlEditor.refresh();
        }
    });
});
