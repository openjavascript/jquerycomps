<?php 
    $id = isset( $_REQUEST[ 'id' ] ) ? $_REQUEST[ 'id' ] : '';
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array() );

    $treeData = json_decode( file_get_contents( './crm.json.data.js' ) );

    if( $id ){
        foreach ( $treeData->data as $key => $value) {
        	if( $key == $id ){
        		$r['data'] = $value;
        	}
        }
    }else{
        $r['data'] = array( $treeData->root );
    }

    echo json_encode( $r );
?>
