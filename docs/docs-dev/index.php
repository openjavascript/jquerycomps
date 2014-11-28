<?php
    include_once( "config.php" );

    $compsList = $datas['compsList'];

    $extraMenu = $datas['extraMenu'];

    $websiteLink = $datas['websiteLink'];


    $smarty->assign( 'compsList', $compsList );

    $smarty->assign( 'extraMenu', $extraMenu );

    $smarty->assign( 'websiteLink', $websiteLink );

    $smarty->display('index/index.tpl');

?>
