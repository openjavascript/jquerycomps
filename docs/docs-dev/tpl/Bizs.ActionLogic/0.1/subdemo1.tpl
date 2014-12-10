{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<!-- end JC style -->
<style>
</style>

{{/block}}

{{block name="body_main"}}
{{include file="public/simple_demo/body_header.tpl"}}
{{assign var="url" value=$smarty.server.REQUEST_URI|regex_replace:"/\&type\=[^&]+/":""}}

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
{{*<dt>ActionLogic 示例2, 点击跳转</dt>
    <dt>balType = link</dt>
*}}
    <dd>
        <button type="button" 
            class="js_bizsActionLogic"
            balType="link" 
            balUrl="{{$url}}&type=direct1"
        >直接跳转, balUrl</button>
        , <a href="#"
            class="js_bizsActionLogic"
            balType="link" 
            balUrl="{{$url}}&type=direct2"
        >属性跳转 balUrl</a>
        , <a href="{{$url}}&type=direct3"
            class="js_bizsActionLogic"
            balType="link" 
        >href 跳转</a>
    </dd>
    <dd>
        二次确认
        <button type="button" 
            class="js_bizsActionLogic"
            balType="link" 
            balUrl="{{$url}}&type=direct2_1"
            balConfirmMsg="确认要跳转吗?"
        >balUrl</button>
        , <a href="#"
            class="js_bizsActionLogic"
            balType="link" 
            balUrl="{{$url}}&type=direct2_2"
            balConfirmMsg="确认要跳转吗?"
            balConfirmPopupType="dialog.confirm"
        >balUrl</a>
        , <a href="{{$url}}&type=direct2_3"
            class="js_bizsActionLogic"
            balConfirmMsg="确认要跳转吗?"
            balType="link" 
        >default</a>
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
</script>
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}

