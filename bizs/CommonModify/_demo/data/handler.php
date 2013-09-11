<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );

    //$r['errorno'] = 1;

    $r['data'] = $_REQUEST;

    echo json_encode( $r );
?>
