{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<style class="show-css">
@import url( '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css'  );
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
{{/block}}

{{block name="body_footer_js" append}}
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
{{/block}}
