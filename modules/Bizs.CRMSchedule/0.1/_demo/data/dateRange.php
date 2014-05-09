<?php
    date_default_timezone_set('Asia/Shanghai'); 

    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array ( "list_data" => array() ) );

    isset( $_REQUEST['errorno'] ) && ( $r['errorno'] = (int)$_REQUEST['errorno'] );
    isset( $_REQUEST['errmsg'] ) && ( $r['errmsg'] = $_REQUEST['errmsg'] );
    isset( $_REQUEST['url'] ) && ( $r['url'] = $_REQUEST['url'] );

    isset( $_REQUEST['formReturnUrl'] ) && ( $r['url'] = $_REQUEST['formReturnUrl'] );

    $id = isset( $_REQUEST['id'] ) ? $_REQUEST['id'] : '';
    $start_date = isset( $_REQUEST['start_date'] ) ? $_REQUEST['start_date'] : '';
    $end_date = isset( $_REQUEST['end_date'] ) ? $_REQUEST['end_date'] : '';

    if( $id && $start_date && $end_date ){
        $start_date = strtotime( $start_date );
        $end_date = strtotime( $end_date );

        $position_date = array();
        $count = 0;

        while( $start_date  < $end_date ){
            $position_date[ date( 'Y-m-d', $start_date ) ] = array(
                'status' => $count % 7
                , 'company' => $count % 7 != 0 ? '中文company ' . $count : ''
            );

	    $start_date = strtotime( '+1 day', $start_date );
            $count++;
        }

        array_push( $r['data']['list_data'], array(
            'name' => 'pos' . $id
            , 'id' => $id
            , 'parent' => array( 
                    '0' => array( 'name' => 'parent' . $id, 'id' => '' . $id . $id ) 
                    , '1' => array( 'name' => 'parent2' . $id, 'id' => '' . $id . ( $id+1) ) 
                )
            , 'position_date' => $position_date
        ) );

    }

    echo json_encode( $r );
?>
