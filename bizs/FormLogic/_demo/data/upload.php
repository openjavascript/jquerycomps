<?php

header("Content-type: text/html; charset=utf-8");
//header("Content-type: text/plain; charset=utf-8");
//
//var_dump( $_FILES );

$fileKeyName = 'file';

$path = '';
$r = array( 'errorno' => 1, 'errmsg' => '', 'data' => array () );

//var_dump( $_FILES );

$host = strtolower($_SERVER['HTTP_HOST']);
if( $host != 'git.me.btbtd.org' ){
    $r['errmsg'] = '出于安全原因, 上传功能已被禁止!';    
    print_data_f();
}
$allowExt = array( 'jpg', 'jpeg', "png", "gif" );

if( !count( $_FILES ) ){
    $r['errmsg'] = '上传文件不能为空!';    
    print_data_f();
}else{

    foreach( $_FILES as $file ){

        if( is_array( $file['name'] ) ){
            for( $k = 0, $l = count( $file['name'] ); $k < $l; $k++ ){

                $path = "uploads/" . $file["name"][ $k ];
                if( $file["error"][ $k ] > 0 ){
                    $file['errmsg'][ $k ] = $file["error"][ $k ];    
                    print_data_f();
                }

                $ar = explode('.', $file["name"][ $k ]);

                if( count($ar) < 2 ){
                    $r['errmsg'] = '文件格式错误!';    
                    print_data_f();
                }
                
                $ext = strtolower( $ar[ count($ar) - 1 ] );
                
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

                move_uploaded_file( $file["tmp_name"][ $k ], $path);
                
                array_push( $r['data'], array( 'name' => $file['name'], 'url' => "./data/{$path}" ) );
            }
        }else{
            $path = "uploads/" . $file["name"];
            if( $file["error"] > 0 ){
                $file['errmsg'] = $file["error"];    
                print_data_f();
            }

            $ar = explode('.', $file["name"]);
        
            if( count($ar) < 2 ){
                $r['errmsg'] = '文件格式错误!';    
                print_data_f();
            }
            
            $ext = strtolower( $ar[ count($ar) - 1 ] );
            
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

            move_uploaded_file( $file["tmp_name"], $path);
            
            array_push( $r['data'], array( 'name' => $file['name'], 'url' => "./data/{$path}" ) );
        }
    }
    
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
