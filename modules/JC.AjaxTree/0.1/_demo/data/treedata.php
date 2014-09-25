<?php 
    $id = isset( $_REQUEST[ 'id' ] ) ? $_REQUEST[ 'id' ] : '';
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array() );

    if( $id ){
        $treeData = fopen( 'crm.json.data.js', 'r' );
        echo $treeData;
    }

    //echo json_encode( $r );
?>
