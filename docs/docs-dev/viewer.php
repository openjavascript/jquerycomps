<?php
    include_once( "config.php" );

    $content = file_get_contents( 'static/js/data.js' );

    $datas = json_decode( $content, true );

    $compsList = $datas['compsList'];

    $extraMenu = $datas['extraMenu'];

    $websiteLink = $datas['websiteLink'];

    $smarty->assign( 'datas', $datas );

    $smarty->assign( 'compsList', $compsList );

    $smarty->assign( 'extraMenu', $extraMenu );

    $smarty->assign( 'websiteLink', $websiteLink );

    $smarty->display('index/index.tpl');

?>
