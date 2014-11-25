    ;requirejs( [ 
        'data'
        , 'template'
        , '../../lib/codemirror'
        , 'codeMirror.htmlmixed'
        , 'JC.FrameUtil'
    ], function( dataTool, template, CodeMirror ){

        JC.FrameUtil.autoNoticeSize();

        var _urlData = dataTool.parseUrl( window.location.href );
        var _compData = dataTool.getCompByNameAndVersion( 
            _urlData.compName, _urlData.version
        );
        
        var _requireComps = dataTool.getCompListByNames( _compData.require );

        var _allVersion = dataTool.getAllCompsByName( _compData.name, _compData.version );
        
        $( '#compTitle' ).html( template( 'tpl-compTitle', _compData ) );

        $( '.detail-desc' ).html( template( 'tpl-compDesc', _compData ) );

        $( '.detail-version' ).html( template( 'tpl-version', {
            'compList':  _allVersion
        } ) );
        
        $( '.detail-require' ).html( template( 'tpl-require', {
            'compList':  _requireComps
        } ) );

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

            var _data = _requireComps[ $( e.target ).attr( 'data-index' ) ];
            window.parent.showNextComp( 
                dataTool.getDetailPathByNameAndVersion( _data.name, _data.version ) 
            );
        } );

        $( '.detail-versionlink' ).on( 'click', function( e ){
            e.preventDefault();

            var _tar = $( e.target );
            if( _tar.hasClass( 'detail-nowVersion' ) ){
                return;
            }

            var _data = _allVersion[ _tar.attr( 'data-index' ) ];
            window.parent.showNextComp( 
                dataTool.getDetailPathByNameAndVersion( _data.name, _data.version ) 
            );
        });

    });