<?php
    include_once( "config.php" );

    $modules = isset( $_REQUEST[ 'module' ] ) ? $_REQUEST[ 'module' ] : '';
    $version = isset( $_REQUEST[ 'version' ] ) ? $_REQUEST[ 'version' ] : '';
    $file = isset( $_REQUEST[ 'file' ] ) ? $_REQUEST[ 'file' ] : '';

    $filepath = FILE_ROOT . "/tpl/$modules/$version/$file";
    $tplpath = FILE_ROOT . "tpl/$modules/$version/$file";
    $COMP_ROOT = '';

    if( file_exists( $filepath ) ){
        $COMP_ROOT = URL_ROOT . "/modules/$modules/$version";

        $compsList = $datas['compsList'];
        $compName = $modules;
        
        $compData;

        $allVersionComps = array();

        for( $i = 0; $i< sizeof( $compsList ) ;$i++ ) {
            $groupList = $compsList[ $i ][ 'list' ];
            for( $j = 0; $j< sizeof( $groupList ) ;$j++ ) {
                $comp = $groupList[ $j ];
                if( $comp[ 'name' ] == $compName ) {
                    array_push( $allVersionComps, $comp );
                    if( $comp[ 'version' ] == $version ) {
                        $compData = $comp;
                        $allVersionComps[ sizeof( $allVersionComps ) - 1 ]
                            [ 'nowVersion' ] = true;
                    }
                }
            }
        }
        $smarty->assign( 'COMP_ROOT', $COMP_ROOT );
        $requireComps = $compData[ 'require' ];
        $smarty->assign( 'compData', $compData );
        $smarty->assign( 'requireComps', $requireComps );
        $smarty->assign( 'allVersionComps', $allVersionComps );

        $smarty->display( $filepath );
    }else{ 

        $error = array();

        $error[ 'path error' ] = $tplpath;
    
        $smarty->assign( 'TERROR', $error );

        $smarty->display('public/http_404.tpl');
    }

?>
