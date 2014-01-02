<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );
    $callback = "callback";

    if( isset( $_REQUEST['errorno'] ) ){
        $r['errorno'] = (int)$_REQUEST['errorno'];
    }

    if( isset( $_REQUEST['errmsg'] ) ){
        $r['errmsg'] = $_REQUEST['errmsg'];
    }

    if( isset( $_REQUEST['callback'] ) ){
        $callback = $_REQUEST['callback'];
    }

    if( isset( $_REQUEST['callback_first'] ) ){
        $callback = $_REQUEST['callback_first'];
    }

    $r['data']['name'] = 'test.jpg';
    $r['data']['url'] = './data/images/test.jpg';

    $data = json_encode( $r );

    echo <<<EOF
<script>
    window.parent && window.parent.$callback && window.parent.$callback( $data );
</script>
EOF;

?>
