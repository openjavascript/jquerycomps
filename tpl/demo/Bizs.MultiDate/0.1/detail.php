<?php
    require_once('../../../../config.php');

    $content = file_get_contents( '../../../../static/js/data.js' );

    $datas = json_decode( $content, true );

    $compsList = $datas['compsList'];

    $compName = urldecode($_GET['compName']);

    $version = urldecode($_GET['version']);
    
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

	$requireComps = $compData[ 'require' ];

    $smarty->assign( 'compData', $compData );

    $smarty->assign( 'requireComps', $requireComps );

    $smarty->assign( 'allVersionComps', $allVersionComps );

    $smarty->display('detail.tpl');
?>