<?php
    date_default_timezone_set('Asia/Shanghai'); 

    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array ( "list_data" => array() ) );

    isset( $_REQUEST['errorno'] ) && ( $r['errorno'] = (int)$_REQUEST['errorno'] );
    isset( $_REQUEST['errmsg'] ) && ( $r['errmsg'] = $_REQUEST['errmsg'] );
    isset( $_REQUEST['url'] ) && ( $r['url'] = $_REQUEST['url'] );

    isset( $_REQUEST['formReturnUrl'] ) && ( $r['url'] = $_REQUEST['formReturnUrl'] );

    $id = isset( $_REQUEST['id'] ) ? $_REQUEST['id'] : '';
    $date = isset( $_REQUEST['date'] ) ? $_REQUEST['date'] : '';

    if( $id && $date ){
        $ls = explode( ',', $id );



        for( $i = 0, $j = count( $ls ); $i < $j; $i++ ){
            $item = $ls[ $i ];

            $tmp_date = strtotime( $date . '-01' );

            $position_date = array();

            for( $k = 0; $k < 28; $k ++ ){
                $position_date[ date( 'Y-m-d', $tmp_date ) ] = array(
                    'status' => $k % 7
                    , 'company' => $k % 7 != 0 ? '中文company ' . $k : ''
               );
                //date_add( $tmp_date, date_interval_create_from_date_string('1 days'));
                //$tmp_date->add( new DateInterval( 'P1D') );
		$tmp_date = strtotime( '+1 day', $tmp_date );
            }

            array_push( $r['data']['list_data'], array(
                'name' => 'pos' . $item 
                , 'id' => $item
                , 'parent' => array( 
                        '0' => array( 'name' => 'parent' . $item, 'id' => '' . $item . $item ) 
                        , '1' => array( 'name' => 'parent2' . $item, 'id' => '' . $item . ( $item+1) ) 
                    )
                , 'position_date' => $position_date
            ) );
        }
    }

    echo json_encode( $r );
?>
