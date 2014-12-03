<?php
    $r = array( 'errorno' => 1, 'data' => array() );

    $r['errorno'] = 0;
    $r['errmsg'] = '';

    $r['data'] = array(
            array('label' => 'test0', '1' => '448', '2' => 0 ),
            array('label' => 'test1', '1' => '453', '2' => 0 ),
            array('label' => 'test2', '1' => '418', '2' => 1 ),
            array('label' => 'test3', '1' => '413', '2' => 1 ),
            array('label' => 'test4', '1' => '4458', '2' => 0 ),
            array('label' => 'test5', '1' => '4553', '2' => 0 ),
        );

    echo json_encode( $r );
?>
