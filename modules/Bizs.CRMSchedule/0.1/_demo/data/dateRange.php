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
        $start_date = new DateTime( $start_date );
        $end_date = new DateTime( $end_date );

        $position_date = array();
        $count = 0;

        while( $start_date->getTimestamp() < $end_date->getTimestamp() ){
            $position_date[ $start_date->format( 'Y-m-d' ) ] = array(
                'status' => $count % 6
                , 'company' => $count % 6 != 0 ? '中文company ' . $count : ''
            );

            $start_date->add( new DateInterval( 'P1D') );
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
