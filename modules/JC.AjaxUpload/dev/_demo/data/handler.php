<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );
    $callback = "callback";

    if( isset( $_REQUEST['errorno'] ) ){
        $r['errorno'] = (int)$_REQUEST['errorno'];
    }

    if( isset( $_REQUEST['errmsg'] ) ){
        $r['errmsg'] = $_REQUEST['errmsg'];
    }

    $r['data']['name'] = 'test.jpg';
    $r['data']['url'] = './data/images/test.jpg';

    $data = json_encode( $r );

    echo $data;
?>
