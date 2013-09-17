<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );

    $rnd = rand( 0, 1 );

    $r['errorno'] = $rnd;

    $r['data'] = $_REQUEST;

    echo json_encode( $r );
?>
