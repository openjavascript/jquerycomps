<?php
    $coordinate = isset( $_REQUEST[ 'coordinate' ] ) ? $_REQUEST[ 'coordinate' ] : '';
    $filename = isset( $_REQUEST[ 'filename' ] ) ? $_REQUEST[ 'filename' ] : '';

    if( !( $coordinate && $filename ) ){
        exit( '无法获取坐标数据和文件名!' );
    }

    $path = "uploads/$filename";

    if( !file_exists( $path ) ){
        exit( '找不到图片文件!' );
    }


    $corAr = explode( ',', $coordinate );

    /*
    echo $path;
    print_r( $corAr );
    */

    header('Content-type: image/jpeg');

    $left = (int)$corAr[0];
    $top = (int)$corAr[1];
    $width = (int)$corAr[2];
    $height = (int)$corAr[3];

    $swidth = (int)$corAr[4];
    $sheight = (int)$corAr[5];

    // Resample
    $image_p = imagecreatetruecolor( $width, $height );
    $image = imagecreatefromjpeg( $path );
    imagecopyresampled($image_p, $image, 0, 0, $left, $top, $width, $height, $width, $height );

    // Output
    imagejpeg($image_p, null, 100);

?>
