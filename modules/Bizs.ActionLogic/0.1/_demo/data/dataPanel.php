<?php
    $r = array( 'errorno' => 0, 'errmsg' => '', 'data' => array () );
    $uripath = dirname( $_SERVER['SCRIPT_NAME'] );

    $r['data'] = <<<EOF
<div class="UPanel UPanelString" style="display:none; width: 600px;" >    
    <form action="$uripath/handler.php" method="POST"
        class="js_bizsFormLogic"
        formType="ajax"
        formConfirmPopupType="popup"
        formBeforeProcess="formBeforeProcess"
        formAfterProcess="formAfterProcess"
        formAjaxDone="formAjaxDone"  
        >    
        <div class="UPContent">        
            <div class="hd">dom panel</div>        
            <div class="bd">            
                <dl>                
                    <dt><h2>form test</h2></dt>                
                    <dd>
                       <table>
                           <tr>
                               <td>文本框:</td> 
                               <td>
                                    <input type="text" name="txt1" value="test" reqmsg="内容" />                
                               </td>
                           </tr>
                            <tr>
                                <td>
                                    <label class="gray">甲方主体：</label>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>日期</td>
                                <td>
                                    <input type="text" datatype="date" reqmsg="日期" value="2013-05-20" />
                                    <em class="error"></em>
                                </td>
                            </tr>
                        </table>
                    </dd>
                </dl>            
                <div style="text-align:center" class="UButton">                
                    <button type="submit" eventtype="confirm">确定</button>                
                    <button type="button" eventtype="cancel">取消</button>            
                </div>        
            </div>        
            <div class="ft">test footer</div>        
            <span class="close" eventtype="close"></span>    
        </div>
        <!--end UPContent-->    
    </form>
</div>
EOF;


    echo json_encode( $r );
?>

