<?php
    $r = array( 'errorno' => 1, 'data' => array() );

    $r['errorno'] = 0;
    $r['errmsg'] = '';

    $r['data']= array(
        'http://p19.qhimg.com/t01820d6737a52f1ef4.jpg',
        'http://p17.qhimg.com/t01891a381068422d05.jpg',
        'http://p17.qhimg.com/t0106cd39e3aa278b92.jpg',
        'http://p17.qhimg.com/t01bd5c8e290bac7f8f.jpg',
        'http://p17.qhimg.com/t01daec29cb7484d355.jpg',
        'http://p18.qhimg.com/t01d71fd5ad7d470fcb.jpg',
        'http://p17.qhimg.com/t018bba7dbe49dbae5f.jpg',
        'http://p19.qhimg.com/t01bf673f51193232c0.jpg',
        'http://p15.qhimg.com/t016a54640867064541.jpg',
        'http://p16.qhimg.com/t01683cff3054eddf83.jpg',
        'http://p17.qhimg.com/t01a6a31665162bfc66.jpg',
        'http://p15.qhimg.com/t0188139985925bfb20.jpg',
        'http://p16.qhimg.com/t01f737690f95df9437.jpg'
        );

    echo json_encode( $r );
?>
