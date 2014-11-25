<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );

    isset( $_REQUEST['errorno'] ) && ( $r['errorno'] = (int)$_REQUEST['errorno'] );
    isset( $_REQUEST['errmsg'] ) && ( $r['errmsg'] = (int)$_REQUEST['errmsg'] );

    $r['data'] = $_REQUEST;

    isset( $_REQUEST['formReturnUrl'] ) && ( $r['url'] = $_REQUEST['formReturnUrl'] );

    echo json_encode( $r );
?>
