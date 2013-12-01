<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );

    if( isset( $_REQUEST['errorno'] ) ){
        $r['errorno'] = (int)$_REQUEST['errorno'];
    }

    $r['data']['name'] = 'test.jpg';
    $r['data']['url'] = './data/images/test.jpg';

    echo json_encode( $r );
?>
