<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );

    isset( $_REQUEST['errorno'] ) && ( $r['errorno'] = (int)$_REQUEST['errorno'] );
    isset( $_REQUEST['errmsg'] ) && ( $r['errmsg'] = $_REQUEST['errmsg'] );
    isset( $_REQUEST['url'] ) && ( $r['url'] = $_REQUEST['url'] );

    $r['data'] = $_REQUEST;

    isset( $_REQUEST['formReturnUrl'] ) && ( $r['url'] = $_REQUEST['formReturnUrl'] );

    $callback = "callback";
    $callbackInfo = "";

    isset( $_REQUEST['callback'] ) && ( $callback = $_REQUEST['callback'] );
    isset( $_REQUEST['callbackInfo'] ) && ( $callbackInfo = $_REQUEST['callbackInfo'] );

    $jsonstr = json_encode( $r );
    echo <<<EOF
<script>
window.parent 
    && window.parent != this
    && window.parent[ '$callback' ]
    && window.parent[ '$callback' ]( $jsonstr, '$callbackInfo' )
    ;
</script>
EOF;
?>
