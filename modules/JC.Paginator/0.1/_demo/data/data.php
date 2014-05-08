<?php

	$page = isset( $_REQUEST['page'] ) ? $_REQUEST['page'] : '1';
	$pz = isset( $_REQUEST['pz'] ) ? $_REQUEST['pz'] : '2';
    $r = array( 'errorno' => 1, 'data' => array() );

    $r['errorno'] = 0;
    $r['errmsg'] = '';

    //$r['data']['id'] = $id;
    if ($pz == 2) {
	    switch ($page) {
	    	case 1:
	    		$r['data']['data'] = array(
	    			array('id' => '001', 'bh' => 'BH001', 'company_name' => '好乐买1'),
	    			array('id' => '002', 'bh' => 'BH002', 'company_name' => '好乐买2'));
	    		break;

	    	case 2:
	    		$r['data']['data'] = array(
	    			array('id' => '003', 'bh' => 'BH003', 'company_name' => '好乐买3'),
	    			array('id' => '004', 'bh' => 'BH004', 'company_name' => '好乐买4'));
	    		break;
	    	case 3:
	    		$r['data']['data'] = array(
	    			array('id' => '005', 'bh' => 'BH005', 'company_name' => '好乐买5'),
	    			array('id' => '006', 'bh' => 'BH006', 'company_name' => '好乐买6'));
	    		break;
	    	case 4:
	    		$r['data']['data'] = array(
	    			array('id' => '007', 'bh' => 'BH007', 'company_name' => '好乐买7'),
	    			array('id' => '008', 'bh' => 'BH008', 'company_name' => '好乐买8'));
	    		break;
	    	case 5:
	    		$r['data']['data'] = array(
	    			array('id' => '009', 'bh' => 'BH009', 'company_name' => '好乐买9'),
	    			array('id' => '0010', 'bh' => 'BH0010', 'company_name' => '好乐买10'));
	    		break;
	    	case 6:
	    		$r['data']['data'] = array(
	    			array('id' => '0011', 'bh' => 'BH0011', 'company_name' => '好乐买11'),
	    			array('id' => '0012', 'bh' => 'BH0012', 'company_name' => '好乐买12'));
	    		break;
	    	default:
	    		# code...
	    		break;
	    }
	} else if ($pz == 3 ) {
		switch ($page) {
	    	case 1:
	    		$r['data']['data'] = array(
	    			array('id' => '001', 'bh' => 'BH001', 'company_name' => '好乐买1'),
	    			array('id' => '002', 'bh' => 'BH002', 'company_name' => '好乐买2'),
	    			array('id' => '003', 'bh' => 'BH003', 'company_name' => '好乐买3'));
	    		break;

	    	case 2:
	    		$r['data']['data'] = array(
	    			array('id' => '004', 'bh' => 'BH004', 'company_name' => '好乐买4'),
	    			array('id' => '005', 'bh' => 'BH005', 'company_name' => '好乐买5'),
	    			array('id' => '006', 'bh' => 'BH006', 'company_name' => '好乐买6')
	    			);
	    		break;
	    	case 3:
	    		$r['data']['data'] = array(
	    			array('id' => '007', 'bh' => 'BH007', 'company_name' => '好乐买7'),
	    			array('id' => '008', 'bh' => 'BH008', 'company_name' => '好乐买8'),
	    			array('id' => '009', 'bh' => 'BH009', 'company_name' => '好乐买9')
	    			);
	    		break;
	    	case 4:
	    		$r['data']['data'] = array(
	    			array('id' => '0010', 'bh' => 'BH0010', 'company_name' => '好乐买10'),
	    			array('id' => '0011', 'bh' => 'BH0011', 'company_name' => '好乐买11'),
	    			array('id' => '0012', 'bh' => 'BH0012', 'company_name' => '好乐买12')
	    			);
	    		break;
	    	// case 5:
	    	// 	$r['data']['data'] = array(
	    			
	    	// 		);
	    	// 	break;
	    	default:
	    		# code...
	    		break;
	    }
	} else if ($pz == 1) {
		switch ($page) {
	    	case 1:
	    		$r['data']['data'] = array(
	    			array('id' => '001', 'bh' => 'BH001', 'company_name' => '好乐买1'));
	    		break;

	    	case 2:
	    		$r['data']['data'] = array(
	    			array('id' => '002', 'bh' => 'BH002', 'company_name' => '好乐买2')
	    			);
	    		break;
	    	case 3:
	    		$r['data']['data'] = array(
	    			array('id' => '003', 'bh' => 'BH003', 'company_name' => '好乐买3'));
	    		break;
	    	case 4:
	    		$r['data']['data'] = array(
	    			array('id' => '004', 'bh' => 'BH004', 'company_name' => '好乐买4')
	    			);
	    		break;
	    	case 5:
	    		$r['data']['data'] = array(
	    			array('id' => '005', 'bh' => 'BH005', 'company_name' => '好乐买5')
	    			);
	    		break;
	    	case 6:
	    		$r['data']['data'] = array(
	    			array('id' => '006', 'bh' => 'BH006', 'company_name' => '好乐买6')
	    			);
	    		break;
	    	case 7:
	    		$r['data']['data'] = array(
	    			array('id' => '007', 'bh' => 'BH007', 'company_name' => '好乐买7')
	    		);
	    		break;
	    	case 8:
	    		$r['data']['data'] = array(
	    			array('id' => '008', 'bh' => 'BH008', 'company_name' => '好乐买8')
	    		);
	    		break;
	    	case 9:
	    		$r['data']['data'] = array(
	    			array('id' => '009', 'bh' => 'BH009', 'company_name' => '好乐买9')
	    		);
	    		break;
	    	case 10:
	    		$r['data']['data'] = array(
	    			array('id' => '0010', 'bh' => 'BH0010', 'company_name' => '好乐买10')
	    			
	    		);
	    		break;
	    	case 11:
	    		$r['data']['data'] = array(
	    			array('id' => '0011', 'bh' => 'BH0011', 'company_name' => '好乐买11')
	    		);
	    		break;
	    	case 12:
	    		$r['data']['data'] = array(
	    			array('id' => '0012', 'bh' => 'BH0012', 'company_name' => '好乐买12')
	    		);
	    		break;
	    	default:
	    		# code...
	    		break;
	    }
	} else {
		$r['data']['data'] = array(
			array('id' => '001', 'bh' => 'BH001', 'company_name' => '好乐买1'),
			array('id' => '002', 'bh' => 'BH002', 'company_name' => '好乐买2'),
			array('id' => '003', 'bh' => 'BH003', 'company_name' => '好乐买3'),
			array('id' => '004', 'bh' => 'BH004', 'company_name' => '好乐买4'),
			array('id' => '005', 'bh' => 'BH005', 'company_name' => '好乐买5'),
			array('id' => '006', 'bh' => 'BH006', 'company_name' => '好乐买6'),
			array('id' => '007', 'bh' => 'BH007', 'company_name' => '好乐买7'),
			array('id' => '008', 'bh' => 'BH008', 'company_name' => '好乐买8'),
			array('id' => '009', 'bh' => 'BH009', 'company_name' => '好乐买9'),
			array('id' => '0010', 'bh' => 'BH0010', 'company_name' => '好乐买10'),
			array('id' => '0011', 'bh' => 'BH0011', 'company_name' => '好乐买11'),
	    	array('id' => '0012', 'bh' => 'BH0012', 'company_name' => '好乐买12')
		);
	}
    //$r['data']['code'] = 'code123456_' . rand( 1, 1000000 );

    echo json_encode( $r );
?>