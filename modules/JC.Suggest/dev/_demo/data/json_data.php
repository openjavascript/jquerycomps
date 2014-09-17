<?php

    $cb = "callback";
    $query = "";

    isset( $_REQUEST[ 'callback' ] ) && ( $cb = $_REQUEST[ 'callback' ] );
    isset( $_REQUEST[ 'q' ] ) && ( $query  = $_REQUEST[ 'q' ] );
    isset( $_REQUEST[ 'word' ] ) && ( $query  = $_REQUEST[ 'word' ] );

    $data = array( 
        array( "id" => "1", "value" => "a1" )
        , array( "id" => 2, "value" => "ab1" )
        , array( "id" => 3, "value" => "bb1" )
        , array( "id" => 4, "value" => "c1" )
        , array( "id" => 5, "value" => "d1" )
        , array( "id" => 6, "value" => "e1" )
        , array( "id" => 7, "value" => "f1" )
        , array( "id" => 8, "value" => "g1" )
        , array( "id" => 9, "value" => "h1" )
        , array( "id" => 10, "value" => "a2" )
        , array( "id" => 11, "value" => "a3" )
        , array( "id" => 12, "value" => "b3" )
    );
    $qdata = $data;

    if( $query ){
        $qdata = array();
        foreach( $data as $k => $v ){
            if( strpos( $v[ 'value' ], $query ) !== FALSE ){
                array_push( $qdata, $v );
                //array_push( $qdata, $v[ 'value' ] );
            }
        }
    }else{
    }
    $qdata = json_encode( $qdata );

    echo <<<EOF
    $cb( { "q": "$query", "p": true, "s": $qdata } );
EOF;

?>
