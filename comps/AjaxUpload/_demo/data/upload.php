<?php

header("Content-type: text/html; charset=utf-8");
//header("Content-type: text/plain; charset=utf-8");
//
//var_dump( $_FILES );

$fileKeyName = 'file';

$path = '';
$r = array( 'errorno' => 1, 'errmsg' => '', 'data' => array () );

$host = strtolower($_SERVER['HTTP_HOST']);
if( $host != 'git.me.btbtd.org' ){
    $r['errmsg'] = '出于安全原因, 上传功能已被禁止!';    
    print_data_f();
}

if( !isset($_FILES[$fileKeyName]) ){
    $r['errmsg'] = '上传文件不能为空!';    
    print_data_f();
}else if ($_FILES[$fileKeyName]["error"] > 0){
    $r['errmsg'] = $_FILES[$fileKeyName]["error"];    
    print_data_f();
}else{
    
    $path = "uploads/" . $_FILES[$fileKeyName]["name"];
    
    $ar = explode('.', $_FILES[$fileKeyName]["name"]);
    
    if( count($ar) < 2 ){
        $r['errmsg'] = '文件格式错误!';    
        print_data_f();
    }
    
    $ext = strtolower( $ar[ count($ar) - 1 ] );
    
    $allowExt = array( 'jpg', 'jpeg', "png", "gif" );
    $find = false;
    
    for( $i = 0, $j = count( $allowExt ); $i < $j; $i++ ){
        if( $ext == strtolower( $allowExt[$i] ) ){
            $find = true;
            break;
        }
    }
    
    if( !$find ){
        $r['errmsg'] = "不支持的图片类型($ext), 支持类型: " . implode(', ', $allowExt);    
        print_data_f();
    }
    
    move_uploaded_file($_FILES[$fileKeyName]["tmp_name"], $path);
    
    $r['data']['name'] = $_FILES[$fileKeyName]["name"];
    $r['data']['url'] = "./data/{$path}";
    $r['errorno'] = 0;
    
    print_data_f();
}


if( isset( $_REQUEST['errorno'] ) ){
    $r['errorno'] = (int)$_REQUEST['errorno'];
}

echo json_encode( $r );

function print_data_f(){
    global $r, $callback;
    $text = json_encode( $r );
    echo $text;
    exit();
}


?>
