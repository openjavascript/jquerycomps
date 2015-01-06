{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<style class="show-css">
@import url( '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css'  );
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
            <!-- simple demo -->
            <dl style="padding: 20px;">
                <dt>Default:</dt>
                <dd>
                    <span class="js_compRate" score="3" ></span>
                </dd>
            </dl>

            <dl style="padding: 20px;">
                <dt>Half Star:</dt>
                <dd>
                    <span class="js_compRate css_test" totalnum="10" score="4" half="true"></span>
                </dd>
            </dl>

            <dl style="padding: 20px;">
                <dt>Cancel Button:</dt>
                <dd>
                    <span class="js_compRate css_test" totalnum="10" score="6" half="true" cancel="true"></span>
                </dd>
            </dl>
        </div>
    </div>
</div>

<script type="text/template" class="show-html">
<div class="" data-cajScriptData="|script">
    <script type="text/template">
        <dl class="cover-demo1" style="padding: 20px;">
            <dt>Default:</dt>
            <dd>
                <span class="js_compRate" score="3" ></span>
            </dd>
        </dl>
        
        <dl class="cover-demo1" style="padding: 20px;">
            <dt>Half Star:</dt>
            <dd>
                <span class="js_compRate css_test" totalnum="10" score="13" maxscore="21" minScore="0" half="true"></span>
            </dd>
        </dl>

        <dl class="cover-demo1" style="padding: 20px;">
            <dt>Cancel Button:</dt>
            <dd>
                <span class="js_compRate css_test" totalnum="10" score="13" maxscore="21" minScore="0" half="true" cancel="true"></span>
            </dd>
        </dl>
    &lt;/script>
</div>
</script>

<script type="text/javascript" class="show-js">
    requirejs( [ '{{$COMP_NAME}}' ] );
</script>
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}

