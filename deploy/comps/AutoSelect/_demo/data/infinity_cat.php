<?php
    $isId = isset( $_REQUEST['id'] ) ? $_REQUEST['id'] : '' ;

    $id = isset( $_REQUEST['id'] ) ? $_REQUEST['id'] : '0';
    $hasData = isset( $_REQUEST['hasData'] ) ? $_REQUEST['hasData'] : 0;
    $items = isset( $_REQUEST['items'] ) ? (int)$_REQUEST['items'] : rand( 1, 20 );

    $r = array();

    if( ($isId || $isId == '0') && $hasData ){
        for( $i = 0; $i < $items; $i++ ){
            array_push( $r, array( "{$id}_{$i}", "label_{$id}_{$i}" ) );
            //echo "$i";
        }
    }

    $result = array( 'errorno' => 0, 'data' => $r, 'errmsg' => '' );

    if( isset( $_REQUEST['errorno'] ) ){
        $r['errorno'] = (int)$_REQUEST['errorno'];
    }

    if( isset( $_REQUEST['errmsg'] ) ){
        $r['errorno'] = $_REQUEST['errmsg'];
    }

    echo json_encode( $result );
?>
