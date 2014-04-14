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

            $tmp_date = new DateTime( $date . '-01' );

            $position_data = array();

            for( $k = 0; $k < 28; $k ++ ){
                $position_data[ $tmp_date->format( 'Y-m-d' ) ] = array(
                    'status' => $k % 6
                    , 'company' => $k % 6 != 0 ? 'company ' . $k : ''
               );
                date_add( $tmp_date, date_interval_create_from_date_string('1 days'));
            }


            array_push( $r['data']['list_data'], array(
                'name' => 'pos' . $item 
                , 'id' => $item
                , 'parent' => array( 
                        '0' => array( 'name' => 'parent' . $item, 'id' => '' . $item . $item ) 
                        , '1' => array( 'name' => 'parent2' . $item, 'id' => '' . $item . ( $item+1) ) 
                    )
                , 'position_data' => $position_data
            ) );
        }
    }

    echo json_encode( $r );
?>
