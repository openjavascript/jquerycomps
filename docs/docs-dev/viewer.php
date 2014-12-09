<?php
    include_once( "config.php" );

    $MODULE = isset( $_REQUEST[ 'module' ] ) ? $_REQUEST[ 'module' ] : '';
    $VERSION = isset( $_REQUEST[ 'version' ] ) ? $_REQUEST[ 'version' ] : '';
    $FILE = isset( $_REQUEST[ 'file' ] ) ? $_REQUEST[ 'file' ] : '';

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

        $smarty->assign( 'SHOW_COMP_INFO', 1 );
        $smarty->assign( 'COMP_ROOT', $COMP_ROOT );
        $smarty->assign( 'COMP_URL', $COMP_URL );
        $smarty->assign( 'VIEWER_URL', PROJECT_ROOT . "/viewer.php?module=$MODULE&version=$VERSION&file=" );

        $smarty->assign( 'NAME', preg_replace( '/^.*?\./', '', $MODULE ) );
        $smarty->assign( 'OUTPUT', isset( $allVersionComps['output'] ) ? $allVersionComps['output'] : '' );

        $smarty->assign( 'COMP_NAME', $MODULE);
        $smarty->assign( 'COMP_VERSION', $VERSION);

        $smarty->assign( 'compData', $compData );
        $smarty->assign( 'requireComps', $requireComps );
        $smarty->assign( 'allVersionComps', $allVersionComps );

        $smarty->display( $FILE_PATH );
    }else if( $compData ){
        print_r( $compData );
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
