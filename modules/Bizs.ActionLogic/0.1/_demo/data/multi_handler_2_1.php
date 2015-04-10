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
        , 'url' =>  "$uripath/handler.php?errorno=0"
        , 'msg' =>  "上线任务已撤销，是否一起撤销该上线任务对应的所有预订任务？"
        , 'returnurl' => '?actiondone=2'
        , 'btnText' => array( 'confirm' => '是, 撤销', 'cancel' => '否, 取消' )
    );

    echo json_encode( $r );
?>
