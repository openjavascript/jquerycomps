<?php

    $cb = "callback";
    $query = "";
    $word = "";

    isset( $_REQUEST[ 'callback' ] ) && ( $cb = $_REQUEST[ 'callback' ] );
    isset( $_REQUEST[ 'q' ] ) && ( $query  = $_REQUEST[ 'q' ] );
    isset( $_REQUEST[ 'word' ] ) && ( $query  = $_REQUEST[ 'word' ] );

    $cb = preg_replace( '/<[^>]*?>[\s\S]*?<\/[^<]*?>/', '', $cb );
    $query = preg_replace( '/<[^>]*?>[\s\S]*?<\/[^<]*?>/', '', $query );
    $word = preg_replace( '/<[^>]*?>[\s\S]*?<\/[^<]*?>/', '', $word );

    $data = array( 
        array( "id" => "0", "name" => "a" )
        , array( "id" => "1", "name" => "a1" )
        , array( "id" => 2, "name" => "ab1" )
        , array( "id" => 15, "name" => "ab" )
        , array( "id" => 3, "name" => "bb1" )
        , array( "id" => 4, "name" => "c1" )
        , array( "id" => 5, "name" => "d1" )
        , array( "id" => 6, "name" => "e1" )
        , array( "id" => 7, "name" => "f1" )
        , array( "id" => 8, "name" => "g1" )
        , array( "id" => 9, "name" => "h1" )
        , array( "id" => 10, "name" => "a2" )
        , array( "id" => 11, "name" => "a3" )
        , array( "id" => 12, "name" => "b3" )
        , array( "id" => 13, "name" => "aa" )
        , array( "id" => 14, "name" => "aa" )
    );
    $qdata = $data;

    if( $query ){
        $qdata = array();
        foreach( $data as $k => $v ){
            if( strpos( $v[ 'name' ], $query ) !== FALSE ){
                array_push( $qdata, $v );
                //array_push( $qdata, $v[ 'name' ] );
            }
        }
    }else{
    }
    $qdata = json_encode( $qdata );

    echo <<<EOF
    $cb( { "q": "$query", "p": true, "s": $qdata } );
EOF;

?>
