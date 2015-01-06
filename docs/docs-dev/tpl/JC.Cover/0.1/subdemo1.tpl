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
            <div class="">
                <!-- simple demo -->
                <dl class="cover-demo1" style="padding: 20px;">
                    <h2>Inner Content From Script Tag</h2>
                    <div class="js_compCover" style="height: 200px; width: 202px; background: yellow;"
                        coverdir="3" covercnt="" coverselectorcnt="|script" coverpointer="true" coverlink="http://www.so.com"
                     >
                        cover from script content
                        <script type="text/template">
                            <img src="http://a2.att.hudong.com/01/43/01300534088771134345433553476.png">
                        </script>
                     </div>
                </dl>
            </div>
        </div>
    </div>
</div>

<script type="text/template" class="show-html">
<div class="" data-cajScriptData="|script">
    <script type="text/template">
        <h2>Inner Content From Script Tag</h2>
        <div class="js_compCover" style="height: 200px; width: 202px; background: yellow;"
            coverdir="3" covercnt="" coverselectorcnt="|script" coverpointer="true" coverlink="http://www.so.com"
         >
            cover from script content
            <script type="text/template">
                <img src="http://a2.att.hudong.com/01/43/01300534088771134345433553476.png">
            &lt;/script>
         </div>
    &lt;/script>
</div>
</script>

<script type="text/javascript" class="show-js">
    requirejs( [ '{{$COMP_NAME}}' ] );
</script>
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}

