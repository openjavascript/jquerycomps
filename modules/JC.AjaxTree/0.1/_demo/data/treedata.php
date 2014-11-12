<?php 
    $id = isset( $_REQUEST[ 'id' ] ) ? $_REQUEST[ 'id' ] : '';
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array() );

    if( $id ){
        $treeData = json_decode( file_get_contents( './crm.json.data.js' ) );

        foreach ( $treeData->data as $key => $value) {
        	if( $key == $id ){
        		$r['data'] = $value;
        	}
        }
    }

    echo json_encode( $r );
?>
