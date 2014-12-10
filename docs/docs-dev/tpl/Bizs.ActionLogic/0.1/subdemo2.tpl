{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<!-- end JC style -->
<style>
</style>

{{/block}}

{{block name="body_main"}}
{{include file="public/simple_demo/body_header.tpl"}}
{{assign var="url" value=$smarty.server.REQUEST_URI|regex_replace:"/\&(usercallback|baldone)\=[^&]+/":""}}

<div>
    {{$url}}
</div>

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

<dl>
    <dd>
        直接删除:
        <button type="button" 
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/handler.php"
        >delete</button>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/handler.php"
            balDoneUrl="{{$url}}&baldone=test"
            balErrorPopupType="alert"
        >delete</button>
        <a href="#"
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/handler.php"
            balCallback="ajaxDelCallback"
        >delete with callback</a>

        <button type="button" 
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/handler.php"
            balIgnoreSuccess="true"
            balDoneUrl="{{$url}}&baldone=balIgnoreSuccess"
        >delete</button>
    </dd>
    <dd>
        二次确认
        <button type="button" 
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/handler.php"
            balConfirmMsg="确认要删除吗?"
        >default</button>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/handler.php"
            balDoneUrl="{{$url}}&baldone=test"
            balConfirmMsg="确认要删除吗?"
            balErrorPopupType="alert"
            balSuccessPopupType="alert"
        >balDoneUrl, balErrorPopupType, balSuccessPopupType</button>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/handler.php"
            balDoneUrl="{{$url}}&baldone=test"
            balConfirmMsg="确认要删除吗?"
            balErrorPopupType="msgbox"
            balSuccessPopupType="dialog.alert"
        >balDoneUrl, balErrorPopupType, balSuccessPopupType</button>

        <br />

        <a href="#"
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/handler.php"
            balCallback="ajaxDelCallback"
            balConfirmMsg="确认要删除吗?"
        >balCallback</a>

        <a href="#"
            class="js_bizsActionLogic js_removeItem1"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/handler.php"
            balRequestData="{ 'id': 2 }"
            balConfirmMsg="确认要删除吗?"
            balDoneRemoveSelector="a.js_removeItem1"
        >with data</a>

        <a href="#"
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$url}}"
            balConfirmMsg="确认要删除吗?"
            balDoneRemoveSelector="a.js_removeItem1"
        >data error</a>

    </dd>

    <dt>撤销 - 单笔合同, multi confirm</dt>
    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/multi_handler_1_1.php?errorno=0"
            balDoneUrl="URL"
            balAjaxType="post"
            balRequestData="{id:1}"
            balConfirmMsg="确认要撤销吗?"
        >撤销</button>

        <a href="#"
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/multi_handler_1_1.php?errorno=0"
            balDoneUrl="URL"
            balConfirmMsg="确认要撤销吗?"
            balAjaxType="post"
            balRequestData="{id:2}"
        >撤销</a>

    </dd>

    <dt>撤销 - 上线任务, multi confirm</dt>
    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/multi_handler_2_1.php?errorno=0"
            balDoneUrl="URL"
            balConfirmMsg="确认要撤销吗?"
        >撤销</button>

        <a href="#"
            class="js_bizsActionLogic"
            balType="ajaxaction" 
            balUrl="{{$COMP_ROOT}}/_demo/data/multi_handler_2_1.php?errorno=0"
            balDoneUrl="URL"
            balConfirmMsg="确认要撤销吗?"
        >撤销</a>

    </dd>
</dl>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" class="show-js">
    JC.debug = true;

    requirejs( [ '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}', 'Bizs.FormLogic' ], function( {{$NAME}} ){
    });

    function ajaxDelCallback( _d, _ins ){
        var _trigger = $(this);

        if( _d && !_d.errorno ){
            JC.msgbox( _d.errmsg || '操作成功', _trigger, 0, function(){
                JC.f.reloadPage( '{{$url}}&usercallback=ajaxaction' );
            });
        }else{
            JC.Dialog.alert( _d && _d.errmsg ? _d.errmsg : '操作失败, 请重试!' , 1 );
        }
    }
</script>
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}

