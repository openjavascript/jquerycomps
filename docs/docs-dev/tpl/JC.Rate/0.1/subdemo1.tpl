{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<style class="show-css">
    @import url( '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css'  );

    .css_test button{
        margin: auto 3px;
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
            <!-- simple demo -->
            <dl style="padding: 20px;">
                <dt>Default:</dt>
                <dd>
                    <span class="js_compRate" score="3" ></span>
                </dd>
            </dl>

            <dl style="padding: 20px;">
                <dt>Cancel Button & Half Star:</dt>
                <dd>
                    <span class="js_compRate" totalnum="10" score="4.5" half="true" cancel="true"></span>
                </dd>
            </dl>

            <dl style="padding: 20px;">
                <dt>Custom Style:</dt>
                <dd class="css_test">
                    <p><span>色：</span><span class="js_compRate" totalnum="5" score="7" maxscore="21" half="true" ></span></p>
                    <p><span>香：</span><span class="js_compRate" totalnum="5" score="13" maxscore="21" half="true" ></span></p>
                    <p><span>味：</span><span class="js_compRate" totalnum="5" score="9" maxscore="21" half="true" ></span></p>
                    <p><span>总：</span><span class="js_compRate" totalnum="5" score="11" maxscore="21" half="true" ></span></p>
                </dd>
            </dl>
        </div>
    </div>
</div>
{{/block}}

{{block name="body_footer_js" append}}
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
{{/block}}

