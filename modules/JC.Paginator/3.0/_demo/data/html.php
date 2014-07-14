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
	    		$r['data']['html'] = '<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId43" data-orderid="43" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QS-CRM-201401-000009">
                            </td>
                            <td>43</td>
                            <td>QS-CRM-201401-000009</td>
                            <td>zyh001222</td>
                            <td>local</td>
                            <td>总部渠道销售3</td>
                            <td>2014-01-09 14:31:24</td>
                            <td>待审批</td>
                        </tr>
                        <tr class="even">
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId44" data-orderid="44" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QS-CRM-201401-000010">
                            </td>
                            <td>44</td>
                            <td>QS-CRM-201401-000010</td>
                            <td>zyh001222</td>
                            <td>local</td>
                            <td>总部渠道销售3</td>
                            <td>2014-01-09 14:31:24</td>
                            <td>待审批</td>
                        </tr>';
	    		break;

	    	case 2:
	    		$r['data']['html'] = 
	    			'<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId45" data-orderid="45" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QS-CRM-201401-000011">
                            </td>
                            <td>45</td>
                            <td>QS-CRM-201401-000011</td>
                            <td>zyh001222</td>
                            <td>local</td>
                            <td>总部渠道销售3</td>
                            <td>2014-01-09 14:31:24</td>
                            <td>待审批</td>
                        </tr>
                        <tr class="even">
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId38" data-orderid="38" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000025">
                            </td>
                            <td>38</td>
                            <td>QH-CRM-201401-000025</td>
                            <td>zyh001222</td>
                            <td>2,500,000.00</td>
                            <td>-</td>                             
                            <td>总部渠道销售3</td> 
                            <td>待审批</td>
                        </tr>'
	    		;
	    		break;
	    	case 3:
	    		$r['data']['html'] = '<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId35" data-orderid="35" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000024">
                            </td>
                            <td>35</td>
                            <td>QH-CRM-201401-000024</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId36" data-orderid="36" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000025">
                            </td>
                            <td>36</td>
                            <td>QH-CRM-201401-000025</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>';
	    		break;
	    	case 4:
	    		$r['data']['html'] = '<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId37" data-orderid="37" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000027">
                            </td>
                            <td>37</td>
                            <td>QH-CRM-201401-000027</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId38" data-orderid="38" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000025">
                            </td>
                            <td>38</td>
                            <td>QH-CRM-201401-000028</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>';
	    		break;
	    	case 5:
	    		$r['data']['html'] = '<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId39" data-orderid="39" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>39</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId40" data-orderid="40" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>40</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>';
	    		break;
	    	case 6:
	    		$r['data']['html'] = '<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId41" data-orderid="41" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000032">
                            </td>
                            <td>41</td>
                            <td>QH-CRM-201401-000032</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId42" data-orderid="42" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>42</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>';
	    		break;
	    	default:
	    		# code...
	    		break;
	    }
	} else if ($pz == 3 ) {
		switch ($page) {
	    	case 1:
	    		$r['data']['html'] = '<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId43" data-orderid="43" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QS-CRM-201401-000009">
                            </td>
                            <td>43</td>
                            <td>QS-CRM-201401-000009</td>
                            <td>zyh001222</td>
                            <td>local</td>
                            <td>总部渠道销售3</td>
                            <td>2014-01-09 14:31:24</td>
                            <td>待审批</td>
                        </tr>
                        <tr class="even">
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId44" data-orderid="44" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QS-CRM-201401-000010">
                            </td>
                            <td>44</td>
                            <td>QS-CRM-201401-000010</td>
                            <td>zyh001222</td>
                            <td>local</td>
                            <td>总部渠道销售3</td>
                            <td>2014-01-09 14:31:24</td>
                            <td>待审批</td>
                        </tr><tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId45" data-orderid="45" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QS-CRM-201401-000011">
                            </td>
                            <td>45</td>
                            <td>QS-CRM-201401-000011</td>
                            <td>zyh001222</td>
                            <td>local</td>
                            <td>总部渠道销售3</td>
                            <td>2014-01-09 14:31:24</td>
                            <td>待审批</td>
                        </tr>';
	    		break;

	    	case 2:
	    		$r['data']['html'] = '<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId38" data-orderid="38" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000025">
                            </td>
                            <td>38</td>
                            <td>QH-CRM-201401-000028</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr><tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId39" data-orderid="39" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>39</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId40" data-orderid="40" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>40</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>';
	    		break;
	    	case 3:
	    		$r['data']['html'] = '<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId37" data-orderid="37" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000027">
                            </td>
                            <td>37</td>
                            <td>QH-CRM-201401-000027</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId38" data-orderid="38" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000025">
                            </td>
                            <td>38</td>
                            <td>QH-CRM-201401-000028</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr><tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId39" data-orderid="39" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>39</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>';
	    		break;
	    	case 4:
	    		$r['data']['html'] = '<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId41" data-orderid="41" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000032">
                            </td>
                            <td>41</td>
                            <td>QH-CRM-201401-000032</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr><tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId42" data-orderid="42" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>42</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>';
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
		$r['data']['html'] = 
		'<tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId43" data-orderid="43" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QS-CRM-201401-000009">
                            </td>
                            <td>43</td>
                            <td>QS-CRM-201401-000009</td>
                            <td>zyh001222</td>
                            <td>local</td>
                            <td>总部渠道销售3</td>
                            <td>2014-01-09 14:31:24</td>
                            <td>待审批</td>
                        </tr>
                        <tr class="even">
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId44" data-orderid="44" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QS-CRM-201401-000010">
                            </td>
                            <td>44</td>
                            <td>QS-CRM-201401-000010</td>
                            <td>zyh001222</td>
                            <td>local</td>
                            <td>总部渠道销售3</td>
                            <td>2014-01-09 14:31:24</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId45" data-orderid="45" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QS-CRM-201401-000011">
                            </td>
                            <td>45</td>
                            <td>QS-CRM-201401-000011</td>
                            <td>zyh001222</td>
                            <td>local</td>
                            <td>总部渠道销售3</td>
                            <td>2014-01-09 14:31:24</td>
                            <td>待审批</td>
                        </tr>
                        <tr class="even">
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId38" data-orderid="38" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000025">
                            </td>
                            <td>38</td>
                            <td>QH-CRM-201401-000025</td>
                            <td>zyh001222</td>
                            <td>2,500,000.00</td>
                            <td>-</td>                             
                            <td>总部渠道销售3</td> 
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId35" data-orderid="35" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000024">
                            </td>
                            <td>35</td>
                            <td>QH-CRM-201401-000024</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId36" data-orderid="36" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000025">
                            </td>
                            <td>36</td>
                            <td>QH-CRM-201401-000025</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId37" data-orderid="37" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000027">
                            </td>
                            <td>37</td>
                            <td>QH-CRM-201401-000027</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId38" data-orderid="38" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000025">
                            </td>
                            <td>38</td>
                            <td>QH-CRM-201401-000028</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr><tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId39" data-orderid="39" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>39</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId40" data-orderid="40" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>40</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr><tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId41" data-orderid="41" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000032">
                            </td>
                            <td>41</td>
                            <td>QH-CRM-201401-000032</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" checked="checked" name="" class="js_orderId js_orderId42" data-orderid="42" datatype="checkbox" datatarget="(.js_orderList input[type=checkbox]" reqmsg="订单" emel="#errmsg" >
                                <input type="hidden" class="js_ordernumber" value="QH-CRM-201401-000029">
                            </td>
                            <td>42</td>
                            <td>QH-CRM-201401-000029</td> 
                            <td>测试转移代理公司</td>
                            <td>4A</td>
                            <td>渠道销售1</td>
                            <td>2013-12-24 11:22:38</td>
                            <td>待审批</td>
                        </tr>';
	}
    //$r['data']['code'] = 'code123456_' . rand( 1, 1000000 );

    echo json_encode( $r );
?>