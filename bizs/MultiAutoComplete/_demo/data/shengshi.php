<?php
    $jsonstr = file_get_contents( 'SHENGSHI.js' );
    $jsonstr = preg_replace( '/^.*?\=/', '', $jsonstr );
    $jsonstr = preg_replace( '/\;[\s]*$/', '', $jsonstr );

    $id = isset( $_REQUEST['id'] ) ? $_REQUEST['id'] : '';
    $max = isset( $_REQUEST['max'] ) ? (int)$_REQUEST['max'] : '';
    $json = json_decode( $jsonstr );
    $r = array();

    for( $i = 0, $j = count( $json ); $i < $j; $i++ ){
        if( $max && $i >= $max ){
            break;
        }
        if( !$id ){
            array_push( $r, $json[$i] );
        }else if( $json[$i][2] == $id ){
            array_push( $r, $json[$i] );
        }
    }

    echo json_encode( $r );
?>
