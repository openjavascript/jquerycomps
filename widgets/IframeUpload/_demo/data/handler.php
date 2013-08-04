<?php
    $cb = isset( $_REQUEST['cb'] ) ? $_REQUEST['cb'] : 'IFRAME_UPLOAD';
    $r = array( 'errorno' => 1, 'data' => array() );
    if( isset( $_REQUEST['info'] ) ){
        $r['data']['info'] = $_REQUEST['info'];
        $r['errorno'] = 0;
        $r['errmsg'] = '';
    }
?>
<script>
    if( window.parent ){ 
        window.parent['<?php echo $cb; ?>']( <?php echo json_encode( $r ); ?> );
    }
</script>
<?php 
/*
iframe 上传约定 

前端post发送的的文件名 name = file

前端会通过URL get 给 php 传二个参数
    cb 和 info

    假设 cb = cb1, info = testinfo
    php 返回的时候应该按照下面格式输出处理结果

<script>
    if( window.parent ){ 
        window.parent['cb1']( {"errorno":0,"errmsg","","data":{"info":"testinfo"}} );
    }
</script>
 */
?>
