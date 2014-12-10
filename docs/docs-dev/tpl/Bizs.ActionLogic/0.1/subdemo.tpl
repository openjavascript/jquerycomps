{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<!-- end JC style -->
<style>
</style>

{{/block}}

{{block name="body_main"}}
{{include file="public/simple_demo/body_header.tpl"}}


<style class="show-css">
@import url( '{{$URL_ROOT}}/modules/JC.Panel/0.2/res/default/style.css' );
</style>
<div class="codeview-wrap">
    <div class="codeview-tabbar">
        <a href="#" class="codeview-css">CSS</a>
        <a href="#" class="codeview-js">JS</a>
        <a href="#" class="codeview-html">HTML</a>
        <a href="#" class="codeview-page selected">PAGE</a>
    </div>
    <div class="codeview-view">
        <div class="codeview-cssview">
<textArea style="display:none;">
</textArea>
        </div>
        <div class="codeview-jsview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-htmlview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-pageview nowview">
            <div class="show-html">
<dl class="defdl">
{{*<dt>ActionLogic 示例1, 弹框</dt>*}}
    <dt>balType = panel</dt>
    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="panel" 
            balPanelTpl="#scriptPanel" 
            balCallback="balPanelInitCb"
        >script tpl</button>
        <a href="#"
            class="js_bizsActionLogic"
            balType="panel" 
            balPanelTpl="#scriptPanel" 
            balCallback="balPanelInitCb"
        >script tpl</a>
    </dd>
    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxHtml="{{$COMP_ROOT}}/_demo/data/htmlPanel.php" 
            balCallback="balPanelInitCb"
        >ajax html</button>
        <a href="#"
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxHtml="{{$COMP_ROOT}}/_demo/data/htmlPanel.php" 
            balCallback="balPanelInitCb"
        >ajax html</a>
    </dd>
    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxData="{{$COMP_ROOT}}/_demo/data/dataPanel.php" 
            balCallback="balPanelInitCb"
        >ajax data html</button>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxData="{{$COMP_ROOT}}/_demo/data/dataPanel.php" 
            balCallback="balPanelInitCb"
        >ajax data html</button>
        <a  href="#"
            class="js_bizsActionLogic"
            balType="panel" 
            balAjaxData="{{$COMP_ROOT}}/_demo/data/dataPanel.php" 
            balCallback="balPanelInitCb"
        >ajax data html</a>

        <a href="javascript:;" title="设置" class="js_bizsActionLogic ico-setting" 
            baltype="panel" 
            balajaxdata="{{$COMP_ROOT}}/_demo/data/dataPanel.unhtml.php" 
            balunhtmlentity="true"
            >ajax data html - unHtmlEntity</a>

    </dd>
</dl>

<script type="text/template" id="scriptPanel">
<div class="UPanel UPanelString" style="display:none; width: 600px;" >    
    <form action="{{$COMP_ROOT}}/_demo/data/handler.php" method="POST"
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
</script>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" class="show-js">
    JC.debug = true;

    requirejs( [ '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}', 'Bizs.FormLogic' ], function( {{$NAME}} ){
    });

    function balPanelInitCb( _panelIns ){
        var _trigger = $(this);
        //return true; //如果返回真的话, 表单提交后会关闭弹框
    }

    function formAjaxDone( _d, _selector, _formLogicIns ){
        JC.hideAllPopup( 1 );
        if( _d && _d.errorno ){
            JC.alert( _d.errmsg || '操作失败, 请重试!', _selector, 1 );
        }else{
            JC.Dialog.msgbox( '操作成功' );
        }
    }

    function ajaxDelCallback( _d, _ins ){
        var _trigger = $(this);

        if( _d && !_d.errorno ){
            JC.msgbox( _d.errmsg || '操作成功', _trigger, 0, function(){
                JC.f.reloadPage( '?usercallback=ajaxaction' );
            });
        }else{
            JC.Dialog.alert( _d && _d.errmsg ? _d.errmsg : '操作失败, 请重试!' , 1 );
        }
    }
</script>
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}

