<?php
    $r = array( 'errorno' => 1, 'data' => array() );

    $r['errorno'] = 0;
    $r['errmsg'] = '';

    $r['data'] = array(
            array('0' => 'test0', '1' => '448', '2' => 0 ),
            array('0' => 'test1', '1' => '453', '2' => 0 ),
            array('0' => 'test2', '1' => '418', '2' => 1 ),
            array('0' => 'test3', '1' => '413', '2' => 1 ),
            array('0' => 'test4', '1' => '4458', '2' => 0 ),
            array('0' => 'test5', '1' => '4553', '2' => 0 ),
        );

    echo json_encode( $r );
?>
