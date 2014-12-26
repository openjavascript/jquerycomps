<?php
    $jsonstr = file_get_contents( 'SHENGSHI.js' );
    $jsonstr = preg_replace( '/^.*?\=/', '', $jsonstr );
    $jsonstr = preg_replace( '/\;[\s]*$/', '', $jsonstr );

    $id = isset( $_REQUEST['id'] ) ? $_REQUEST['id'] : '0';
    $sleep = isset( $_REQUEST['sleep'] ) ? intval( $_REQUEST['sleep'] ) : 0;
    $json = json_decode( $jsonstr );
    $r = array();

    if( $sleep ){
        sleep( $sleep );
    }

    for( $i = 0, $j = count( $json ); $i < $j; $i++ ){
        if( $json[$i][2] == $id ){
            array_push( $r, $json[$i] );
        }
    }

    echo json_encode( $r );
?>
