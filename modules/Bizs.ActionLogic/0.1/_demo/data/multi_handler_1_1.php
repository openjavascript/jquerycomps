<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );

    $uripath = dirname( $_SERVER['SCRIPT_NAME'] );

    if( isset( $_REQUEST['errorno'] ) ){
        $r['errorno'] = (int)$_REQUEST['errorno'];
    }else{
        $rnd = rand( 0, 1 );
        $r['errorno'] = $rnd;
    }

    $r[ 'data' ][ 'balAction' ] = array(
        'type' => 'ajaxaction'
        , 'url' =>  "$uripath/multi_handler_1_2.php?errorno=0"
        , 'msg' =>  "单笔合同已撤销，是否一起撤销该单笔合同对应的所有上线任务？"
        , 'returnurl' => '?actiondone=1'
        , 'btnText' => array( 'confirm' => '是, 撤销', 'cancel' => '否, 取消' )
    );

    echo json_encode( $r );
?>
