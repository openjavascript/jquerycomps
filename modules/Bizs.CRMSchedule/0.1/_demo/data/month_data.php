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
                $tmpKey = date( 'Y-m-d', $tmp_date );
                $position_date[ $tmpKey ] = array(
                    'status' => $k % 8
                    , 'company' => $k % 8 != 0 ? '中文company ' . $k : ''
               );
                $position_date[ $tmpKey ][ 'departmentName' ] = '部门团队名称';
                $position_date[ $tmpKey ][ 'createUserName' ] = '提交人';

                if( $k % 2 ){
                    $position_date[ $tmpKey ][ 'agencyName' ] = '代理公司名称';
                }else{
                    $position_date[ $tmpKey ][ 'statusName' ] = '预订任务状态';
                }
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
