{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
<!-- end JC style -->
<style>
    .cover-demo1 {
        margin-left: 50px;
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
            <div class="">
                <!-- simple demo -->
                <dl class="cover-demo1">
                    <dt>鼠标hover出发效果</dt>
                    <dd>
                        <div class="" data-cajScriptData="|script">
                            <h2>Default:</h2>
                            <div class="js_compCover" style="height: 200px; width: 200px; background: red;"
                                 covercnt="test" coverpointer="true" coverlink="http://www.so.com"
                            ></div>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
{{/block}}

{{block name="body_footer_js" append}}
<script type="text/template" class="show-html">
<dl class="cover-demo1">
    <dt>鼠标hover出发效果</dt>
    <dd>
        <div class="" data-cajScriptData="|script">
            <h2>Default:</h2>
            <div class="js_compCover" style="height: 200px; width: 200px; background: red;"
                 covercnt="test" coverpointer="true" coverlink="http://www.so.com"
            ></div>
        </div>
    </dd>
</dl>
</script>

<script type="text/javascript" class="show-js">
    requirejs( [ '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}' ] );

</script>
{{/block}}
