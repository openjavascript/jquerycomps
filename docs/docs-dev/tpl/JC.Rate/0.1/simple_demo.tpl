{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
<!-- end JC style -->
<style>
    .cover-demo1 {
        margin-left: 50px;
        margin-top: 20px;
    }
</style>

{{/block}}

{{block name="body_main"}}
    <div class="codeview-view">
        <div class="codeview-cssview">
<textArea style="display:none;">
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
</textArea>
        </div>
        <div class="codeview-jsview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-htmlview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-pageview nowview">
            <div class="cover-demo1">
                <!-- simple demo -->
                <dt>鼠标hover触发效果, 点击选择分数</dt>
                <dd>
                    <div class="" data-cajScriptData="|script">
                        <h2>Default:</h2>
                        <span class="js_compRate" score="3" ></span>
                    </div>
                </dd>
            </div>
        </div>
    </div>
{{/block}}

{{block name="body_footer_js" append}}
<script type="text/template" class="show-html">
<dl class="cover-demo1">
    <dt>鼠标hover触发效果, 点击选择分数</dt>
    <dd>
        <div class="" data-cajScriptData="|script">
            <h2>Default:</h2>
            <span class="js_compRate" score="3" ></span>
        </div>
    </dd>
</dl>
</script>

<script type="text/javascript" class="show-js">
    requirejs( [ '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}' ] );

</script>
{{/block}}
