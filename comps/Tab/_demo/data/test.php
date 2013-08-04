<?php
    $count = isset( $_COOKIE['TabTestCk'] ) ? (int) $_COOKIE['TabTestCk'] : 20;
    $count++;
    setcookie( 'TabTestCk', $count, time() + 60 * 60 * 24 );

    $r = array( "errorno" => 0, "errmsg" => "" );
    $r["data"] = $count . "asdfjaslefasdfjlsdflsakdfjksadfklsdfaskdlflkasdfasdkflasdfjaslefasdfjlsdflsakdfjksadfklsdfaskdlflkasdfasdkflasdf
                            jaslefasdfjlsdflsakdfjksadfklsdfaskdlflkasdfasdkflasdfjaslefasdfjlsdflsakdfjksadfklsdfaskdlflkasdfasdkfl";

    echo json_encode( $r );
?>
