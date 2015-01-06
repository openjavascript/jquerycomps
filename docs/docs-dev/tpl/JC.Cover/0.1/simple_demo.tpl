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
{{include file="public/simple_demo/body_header.tpl"}}
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
</div>

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
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}

