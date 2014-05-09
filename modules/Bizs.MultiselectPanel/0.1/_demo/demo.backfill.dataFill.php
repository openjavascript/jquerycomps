<?php
    $trade = null;
    $area= null;

    if( isset( $_REQUEST[ 'tradeTop' ] ) ){
        $trade = array( 'parents' => explode( ',', $_REQUEST['tradeTop'] ) );

        if( isset( $_REQUEST[ 'tradeSub' ] ) ){
            $trade[ 'children' ] = $_REQUEST[ 'tradeSub' ];
        }
    }

    if( isset( $_REQUEST[ 'areaTop' ] ) ){
        $area = array( 'parents' => explode( ',', $_REQUEST['areaTop'] ) );

        if( isset( $_REQUEST[ 'areaSub' ] ) ){
            $area[ 'children' ] = $_REQUEST[ 'areaSub' ];
        }
    }


?><!doctype html>
<html>
<head>
<meta charset=utf-8 />
<title>Bizs.MultiselectPanel - Open JQuery Components Library - suches</title>
    <style>
        body{
            margin: 20px 40px;
        }

        .ipt,.txt,.txt-1{ border:1px solid #e2e3ea; border-top:1px solid #abadb3; border-radius:2px; height:22px; *line-height:22px;}
        .ipt{ width:126px;}
        .ipt-w58{ width:58px;}
        .ipt-w48{ width:48px; text-align:center;}
        .ipt-w80{ width:80px;}
        .ipt-w180{ width:180px;}
        .ipt-w230{ width: 230px;}
        .ipt-w320{ width:320px;}
        .ipt-w380{ width:380px;}
        .ipt-w480{ width:480px;}
        .ipt-w545{ width:545px;}
        .txt,.txt-1{ resize:none; height:50px; width:99.8%;}
        .txt-w280{ width:280px;}
        .txt-w480{ width:480px;}
        .txt-w545{ width:545px;}
        .txt-w400{ width:410px;}
        .txt-w380{ width:380px;}
        .txt-w650{ width:650px;}

        .defDl > dd{
            border-bottom:1px solid #e2e3ea; 
        }

    </style>
    <link href='../../../../modules/JC.Panel/0.2/res/default/style.css' rel='stylesheet' />
    <link href='../../../../modules/Bizs.MultiselectPanel/0.1/res/default/style.css' rel='stylesheet' />

    <script src="../../../../lib.js"></script>
    <script src="../../../../config.js"></script>
    <script>
        JC.debug = true;

        requirejs( [ 'Bizs.MultiselectPanel', 'Bizs.FormLogic' ], function(){
        });

        function bmsp_formAfterProcess( _evt, _ins ){
            var _form = $(this), _r = true;

            if( !$( 'input.js_tradeSub:checked' ).length ){
                JC.Dialog.msgbox( '请选择行业!', 2 );
                _r = false;
            }else if( !$( 'input.js_areaSub:checked' ).length ){
                JC.Dialog.msgbox( '请选择地区!', 2 );
                _r = false;
            }

            return _r;
        }

<?php
    if( $trade ){
        $tradeData = json_encode( $trade );
        echo "      window.defaultTradeData = $tradeData;";
    }

    if( $area ){
        $areaData = json_encode( $area );
        echo "\n      window.defaultAreaData = $areaData;";
    }

?>

    </script>
</head>    
<body>
    <h2>Bizs.MultiselectPanel - 示例</h2>

   <form action="?" method="POST"
       class="js_bizsFormLogic"
       formAfterProcess="bmsp_formAfterProcess"
       >
        <dl class="defDl">
            <dt></dt>
            <dd style="margin-left:80px;">
                行业: 
                    <input type="text" 
                    readonly 
                    value="请选择" 
                    class="js_bizMultiselectPanel"
                    bmspUrl="./data/shengshi_with_error_code.php?id=0"
                    bmspChildUrl="./data/shengshi_with_error_code.php?id={0}"
                    bmspPopupHideButton="true"
                    bmspPanel="/div.UPanel"
                    bmspPanelBoxSelector="div.js_bmspPanelBox"
                    bmspTopTpl="/script.js_bmspTopTpl"
                    bmspChildTpl="/script.js_bmspChildTpl"
                    bmspOpenClass="js_bmspIconOpen"
                    bmspCloseClass="js_bmspIconClose"
                    bmspNoItemText="请选择"
                    bmspHasItemText="已选择 ({0})"

                    bmspSaveTopIdSelector="/input.js_tradeTop"
                    bmspDefaultFillData="defaultTradeData"
                    />
                    <input type="hidden" name="tradeTop" value="" class="js_tradeTop" />

                <div class="UPanel unselectable" style="display:none; width: 600px;" >
                    <div class="UPContent">
                        <div class="hd">选择行业</div>
                        <div class="bd">
                            <div class="js_bmspPanelBox"></div>
                        </div>
                        <span class="close" eventtype="close"></span>
                    </div>
                </div>

                <script type="text/template" class="js_bmspTopTpl">
                    <dl data-id="{0}" class="js_bmspTopBox">
                        <dt>
                            <label><input type="checkbox" value="{0}" class="js_bmspCkItem js_bmspTopCk"> {1}</label>  
                            <span class="js_bmspIcon js_bmspIconOpen" data-id="{0}"></span>
                        </dt>
                        <dd style="">
                        <ul class="js_bmspChildBox" data-id="{0}"></ul>
                        </dd>
                    </dl>
                </script>

                <script type="text/template" class="js_bmspChildTpl">
                    <li><label>
                        <input type="checkbox" value="{0}" name="tradeSub[]" data-parentid="{2}" class="js_bmspCkItem js_bmspChildCk js_tradeSub"> {1}
                    </label></li>
                </script>

            </dd>

            <dd>
                地区: 
                    <input type="text" 
                    readonly 
                    value="请选择" 
                    class="js_bizMultiselectPanel"
                    bmspUrl="./data/shengshi_with_error_code.php?id=0"
                    bmspChildUrl="./data/shengshi_with_error_code.php?id={0}"
                    bmspPopupHideButton="true"
                    bmspPanel="/div.UPanel"
                    bmspPanelBoxSelector="div.js_bmspPanelBox"
                    bmspTopTpl="/script.js_bmspTopTpl"
                    bmspChildTpl="/script.js_bmspChildTpl"
                    bmspOpenClass="js_bmspIconOpen"
                    bmspCloseClass="js_bmspIconClose"
                    bmspNoItemText="请选择"
                    bmspHasItemText="已选择 ({0})"

                    bmspSaveTopIdSelector="/input.js_areaTop"
                    bmspDefaultFillData="defaultAreaData"
                    />
                    <input type="hidden" name="areaTop" value="" class="js_areaTop" />

                <div class="UPanel unselectable" style="display:none; width: 600px;" >
                    <div class="UPContent">
                        <div class="hd">选择地区</div>
                        <div class="bd">
                            <div class="js_bmspPanelBox"></div>
                        </div>
                        <span class="close" eventtype="close"></span>
                    </div>
                </div>

                <script type="text/template" class="js_bmspTopTpl">
                    <dl data-id="{0}" class="js_bmspTopBox">
                        <dt>
                            <label><input type="checkbox" value="{0}" class="js_bmspCkItem js_bmspTopCk"> {1}</label>  
                            <span class="js_bmspIcon js_bmspIconOpen" data-id="{0}"></span>
                        </dt>
                        <dd style="">
                        <ul class="js_bmspChildBox" data-id="{0}"></ul>
                        </dd>
                    </dl>
                </script>

                <script type="text/template" class="js_bmspChildTpl">
                    <li><label>
                        <input type="checkbox" value="{0}" name="areaSub[]" data-parentid="{2}" class="js_bmspCkItem js_bmspChildCk js_areaSub"> {1}
                    </label></li>
                </script>
            </dd>

        </dl>

        <div>
            <button type="submit">submit</button> <a href="?">back</a>
        </div>
    </form>

</body>
</html>


