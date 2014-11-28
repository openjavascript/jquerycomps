<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );


    if( isset( $_REQUEST['errorno'] ) ){
        $r['errorno'] = (int)$_REQUEST['errorno'];
    }else{
        $rnd = rand( 0, 1 );
        $r['errorno'] = $rnd;
    }

    $r[ 'data' ][ 'balAction' ] = array(
        'type' => 'ajaxaction'
        , 'url' =>  './data/handler.php?errorno=0'
        , 'msg' =>  "该单笔合同对应的所有上线任务已撤销，是否一起撤销所有上线任务对应的所有预订任务？
"
        , 'returnurl' => '?actiondone=2'
        , 'btnText' => array( 'confirm' => '是, 撤销', 'cancel' => '否, 取消' )
    );

    echo json_encode( $r );
?>
