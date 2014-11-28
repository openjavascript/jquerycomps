<?php
    $tmstart = isset( $_GET['tmstart'] ) ? $_GET['tmstart'] : '';
    $tmover = isset( $_GET['tmover'] ) ? $_GET['tmover'] : '';

    $tm = isset( $_POST['tm'] ) ? $_POST['tm'] : '';

    $filename = dirname( __FILE__ ) . '/json.js';
    $json = json_decode( trim( file_get_contents( $filename ) ), true );
    $result = array( 'errorno' => 1, "errmsg" => '' );

    /*
     tm: item timestamp, timestamp is id
       
     dayaction: 
        0: delete workday/holiday
        1: workday
        2: holiday

     commentaction:
        0: delete comment
        1: add/edit comment

     cm: comment data, with commentaction = 1
     */
    if( $tmstart && $tmover ){
        $ls = array();

        foreach( $json as $k => $v ){
            if( $k >= $tmstart && $k <= $tmover ){
                //echo "$k\n";
                $ls[$k] = $v;
            }
        }

        $result['data'] = $ls;

        $result['errorno'] = 0;
    }
    /**
     * post handler
     */
    if( $tm ){

        if( !array_key_exists( $tm, $json ) ){
            $json[ $tm ] = array();
        }
        /**
         * 设置工作日/休息日
         */
        if(  isset( $_POST['dayaction'] ) ){
            $action = isset( $_POST['dayaction'] ) ? $_POST['dayaction'] : '';
            
            switch( $action ){
                /**
                 * 取消工作日和休息日
                 */
                case '0':{
                    $json[ $tm ]['dayaction'] = 0;
                    file_put_contents( $filename, json_encode( $json ) );
                    $result['errorno'] = 0;
                    break;
                }
                /**
                 * 设为工作日
                 */
                case "1":{
                    $json[ $tm ]['dayaction'] = 1;
                    file_put_contents( $filename, json_encode( $json ) );
                    $result['errorno'] = 0;
                    break;
                }
                /**
                 * 设为休息日
                 */
                case "2":{
                    $json[ $tm ]['dayaction'] = 2;
                    file_put_contents( $filename, json_encode( $json ) );
                    $result['errorno'] = 0;
                    break;
                }
            }
        }//设置工作日/休息日 

        if(  isset( $_POST['commentaction'] ) ){
            $action = isset( $_POST['commentaction'] ) ? $_POST['commentaction'] : '';
            $comment = isset( $_POST['comment'] ) ? $_POST['comment'] : '';

            switch( $action ){

                case 0:{
                    if( array_key_exists( 'comment', $json[$tm] ) ){
                        unset( $json[ $tm ]['comment'] );
                    }
                    file_put_contents( $filename, json_encode( $json ) );
                    $result['errorno'] = 0;
                    break;
                }

                case 1:{
                    if( strlen( $comment ) > 1 ){
                        $json[ $tm ]['comment'] = $comment;
                        file_put_contents( $filename, json_encode( $json ) );
                        $result['errorno'] = 0;
                    }else{
                        $result['errmsg'] = "注释长度少于两个字符";
                    }
                    break;
                }
            }
        }
    }


    echo json_encode( $result );

?>
