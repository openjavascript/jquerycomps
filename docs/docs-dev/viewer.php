<?php
    include_once( "config.php" );

    $MODULE = isset( $_REQUEST[ 'module' ] ) ? $_REQUEST[ 'module' ] : '';
    $VERSION = isset( $_REQUEST[ 'version' ] ) ? $_REQUEST[ 'version' ] : '';
    $FILE = isset( $_REQUEST[ 'file' ] ) ? $_REQUEST[ 'file' ] : '';
    $FILE = preg_replace( "/[\/\\\\~]/", '', $FILE );

    if( $MODULE && !$VERSION && $datas ){
        foreach( $datas['compsList'] as $k => $v ){
            if( $v['data'] && count( $v['data'] ) ){
                foreach( $v['data'] as $k1 => $v1 ){
                    if( $v1['name'] == $MODULE ){

                        if( $v1['data'] && count( $v1['data'] ) ){
                            foreach( array_reverse( $v1['data'] ) as $k2 => $v2 ){
                                $VERSION = $v2['version'];
                                if( !( isset( $v2['hide'] ) ) ){
                                    break;
                                }
                            }
                        }

                        break 2;
                    }
                }
            }
        }
    }
    

    $FILE_PATH = FILE_ROOT . "/tpl/$MODULE/$VERSION/$FILE";
    $TPL_PATH = FILE_ROOT . "/tpl/$MODULE/$VERSION/$FILE";
    $COMP_ROOT = '';
    $COMP_URL = '';
    $API_URL = '';

    $compsList = $datas['compsList'];
    $compName = $MODULE;
    
    $compData;

    $allVersionComps = array();

    for( $i = 0; $i< count( $compsList ) ;$i++ ) {
        if( isset( $compsList[ $i ][ 'data' ] ) ){
            $groupList = $compsList[ $i ][ 'data' ];
            for( $j = 0; $j< count( $groupList ) ;$j++ ) {
                $comp = $groupList[ $j ];

                if( $comp[ 'name' ] == $compName ) {

                    for( $k = 0; $k < count( $comp['data'] ); $k++ ){
                        if( $comp['data'][$k]['version'] == $VERSION ){

                            $allVersionComps = $comp;
                            $compData = $comp['data'][$k];
                            $allVersionComps['data'][$k]['nowVersion'] = true;
                            break 3;
                        }
                    }
                }
            }
        }
    }

    if( file_exists( $FILE_PATH ) ){
        $COMP_ROOT = URL_ROOT . "/modules/$MODULE/$VERSION";
        $COMP_URL = PROJECT_ROOT . "/tpl/$MODULE/$VERSION";

        $requireComps = $compData[ 'require' ];

        foreach( $requireComps as $k => &$v ){
            foreach( $datas['compsList'] as $k1 => $v1 ){
                if( !isset( $v1['data'] ) ) break;
                foreach( $v1['data'] as $k2 => $v2 ){
                    if( !isset( $v2['data'] ) ) break 2;
                    if( $v2['name'] == $v['name'] ){
                        foreach( array_reverse( $v2['data'] ) as $k3 => $v3 ){
                            if( isset( $v3['version'] ) ){
                                $v['version'] = $v3['version'];
                            }
                            if( isset( $v3['outlink'] ) ){
                                $v['outlink'] = $v3['outlink'];
                            }
                            if( !isset( $v3['hide'] ) || ( isset( $v3['hide'] ) && !$v3['hide'] ) ){
                                break;
                            }
                        }
                        break 2;
                    }
                }
            }
        }
        //print_r( $requireComps );
        //
        if( preg_match( "/^JC/", $MODULE ) ){
            $API_URL = URL_ROOT . "/docs_api/classes/$MODULE.html";
        }else if( preg_match( "/^Bizs/", $MODULE ) ){
            $API_URL = URL_ROOT . "/docs_api/classes/window.$MODULE.html";
        }else {
            isset( $allVersionComps['api'] ) && ( $API_URL = $allVersionComps['api'] );
        }

        $smarty->assign( 'SHOW_COMP_INFO', 1 );
        $smarty->assign( 'COMP_ROOT', $COMP_ROOT );
        $smarty->assign( 'COMP_URL', $COMP_URL );
        $smarty->assign( 'VIEWER_URL', PROJECT_ROOT . "/viewer.php?module=$MODULE&version=$VERSION&file=" );

        $smarty->assign( 'NAME', preg_replace( '/^.*?\./', '', $MODULE ) );
        $smarty->assign( 'OUTPUT', isset( $allVersionComps['output'] ) ? $allVersionComps['output'] : '' );

        $smarty->assign( 'COMP_NAME', $MODULE);
        $smarty->assign( 'COMP_VERSION', $VERSION);
        $smarty->assign( 'COMP_FILE', $FILE);

        $smarty->assign( 'compData', $compData );
        $smarty->assign( 'requireComps', $requireComps );
        $smarty->assign( 'allVersionComps', $allVersionComps );

        $smarty->assign( 'API_URL', $API_URL );

        $smarty->display( $FILE_PATH );
    }else if( $compData && isset( $compData['outlink'] ) ){
        if( isset( $compData[ 'outlink' ] ) ){
            header( "Location: " . $compData[ 'outlink' ] );
            exit;
        }
    }else{ 

        $error = array();

        $error[ 'path error' ] = $TPL_PATH;
    
        $smarty->assign( 'TERROR', $error );

        $smarty->display('public/http_404.tpl');
    }

?>
