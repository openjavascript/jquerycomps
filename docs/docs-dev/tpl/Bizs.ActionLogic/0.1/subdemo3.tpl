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
        <button type="button" 
            class="js_bizsActionLogic"
            balType="remove_element"
            balConfirmMsg="确认要删除吗?"
            >
            remove self
        </button>

        <div>
            parent text
            <a href="javascript:" 
                class="js_bizsActionLogic"
                balType="remove_element"
                balConfirmMsg="确认要删除吗?"
                balDoneRemoveSelector="/"
                >
                remove parent
            </a>
        </div>

    </dd></dl>
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

