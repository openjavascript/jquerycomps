<?php
    include_once( "config.php" );

    $modules = isset( $_REQUEST[ 'module' ] ) ? $_REQUEST[ 'module' ] : '';
    $version = isset( $_REQUEST[ 'version' ] ) ? $_REQUEST[ 'version' ] : '';
    $file = isset( $_REQUEST[ 'file' ] ) ? $_REQUEST[ 'file' ] : '';

    $filepath = FILE_ROOT . "/tpl/$modules/$version/$file";
    $tplpath = FILE_ROOT . "/tpl/$modules/$version/$file";
    $COMP_ROOT = '';
    $COMP_URL = '';

    if( file_exists( $filepath ) ){
        $COMP_ROOT = URL_ROOT . "/modules/$modules/$version";
        $COMP_URL = PROJECT_ROOT . "/tpl/$modules/$version";

        $compsList = $datas['compsList'];
        $compName = $modules;
        
        $compData;

        $allVersionComps = array();

        for( $i = 0; $i< count( $compsList ) ;$i++ ) {
            $groupList = $compsList[ $i ][ 'data' ];
            for( $j = 0; $j< count( $groupList ) ;$j++ ) {
                $comp = $groupList[ $j ];

                if( $comp[ 'name' ] == $compName ) {

                    for( $k = 0; $k < count( $comp['data'] ); $k++ ){
                        if( $comp['data'][$k]['version'] == $version ){

                            $allVersionComps = $comp;
                            $compData = $comp['data'][$k];
                            $allVersionComps['data'][$k]['nowVersion'] = true;
                            break 1;
                        }
                    }
                }
            }
        }

        $requireComps = $compData[ 'require' ];

        $smarty->assign( 'SHOW_COMP_INFO', 1 );
        $smarty->assign( 'COMP_ROOT', $COMP_ROOT );
        $smarty->assign( 'COMP_URL', $COMP_URL );

        $smarty->assign( 'NAME', preg_replace( '/^.*?\./', '', $modules ) );
        $smarty->assign( 'OUTPUT', isset( $allVersionComps['output'] ) ? $allVersionComps['output'] : '' );

        $smarty->assign( 'COMP_NAME', $modules);
        $smarty->assign( 'COMP_VERSION', $version);

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
