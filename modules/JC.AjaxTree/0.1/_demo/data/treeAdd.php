<?php
    date_default_timezone_set("PRC");

    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array() );

    $r['data'] = array( 0 => "folder", 1 => date( "His" ) . '-' . rand( 100, 999 ), 2 => "addedNode" );

    echo json_encode( $r );
?>
