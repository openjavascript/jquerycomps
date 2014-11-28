<?php

    define( 'FILE_ROOT', dirname( __FILE__ ) );
    define( 'PROJECT_ROOT', dirname( $_SERVER[ 'PHP_SELF' ] ) );
    define( 'URL_ROOT', dirname( dirname( PROJECT_ROOT ) ) );

    $content = file_get_contents( FILE_ROOT . '/data.json' );
    $datas = json_decode( $content, true );

    /* 模板配置 */
    date_default_timezone_set('Asia/Shanghai'); 
    include_once("smarty_lib/Smarty.class.php"); //导入模板文件

    $smarty = new Smarty();//创建smarty对象

    $smarty->config_dir = "smarty_lib/Config_File.class.php";  //目录变量

    $smarty->caching = false; //是否使用缓存

    $smarty->template_dir =  FILE_ROOT . "/tpl"; //设置模板目录

    $smarty->compile_dir = FILE_ROOT . "/smarty/templates_c";//设置编译目录

    $smarty->cache_dir = FILE_ROOT . "/smarty/smarty_cache";//缓存文件

    $smarty->left_delimiter = "{{";

    $smarty->right_delimiter="}}";

    $smarty->assign( 'PROJECT_ROOT', PROJECT_ROOT );
    $smarty->assign( 'URL_ROOT', URL_ROOT);

    $smarty->assign( 'datas', $datas );


?>
