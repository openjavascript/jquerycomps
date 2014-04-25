<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );

    isset( $_REQUEST['errorno'] ) && ( $r['errorno'] = (int)$_REQUEST['errorno'] );
    isset( $_REQUEST['errmsg'] ) && ( $r['errmsg'] = $_REQUEST['errmsg'] );
    isset( $_REQUEST['url'] ) && ( $r['url'] = $_REQUEST['url'] );

    isset( $_REQUEST['formReturnUrl'] ) && ( $r['url'] = $_REQUEST['formReturnUrl'] );

    isset( $_REQUEST['id'] ) && ( $r['data']['id'] = $_REQUEST['id'] );
    isset( $_REQUEST['action'] ) && ( $r['data']['action'] = $_REQUEST['action'] );

    echo json_encode( $r );
?>
