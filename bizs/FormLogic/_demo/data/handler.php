<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );

    if( isset( $_REQUEST['errorno'] ) ){
        $r['errorno'] = (int)$_REQUEST['errorno'];
    }

    $r['data'] = $_REQUEST;

    echo json_encode( $r );
?>
