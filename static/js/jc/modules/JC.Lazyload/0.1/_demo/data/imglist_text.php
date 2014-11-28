<?php 
$r = array( 'errorno' => 1, 'data' => array() );
$r['errorno'] = 0;
$r['errmsg'] = '';
$url = "http://www.test.com/ignore/requirejs_windy_dev/modules/JC.Lazyload/0.1/_demo/ajax_content.html"; 
$ch = curl_init(); 
curl_setopt ($ch, CURLOPT_URL, $url); 
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT,10); 
$dxycontent = curl_exec($ch); 
//echo $dxycontent; 
$r['data'] = $dxycontent;
echo json_encode( $r );
?> 
