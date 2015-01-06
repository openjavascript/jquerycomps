{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<style class="show-css">
@import url( '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' );
</style>
<style>
    .ajaxtree-demo1 {
        margin-left: 50px;
    }
</style>

{{/block}}

{{block name="body_main"}}
    <div class="codeview-view">
        <div class="codeview-cssview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-jsview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-htmlview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-pageview nowview">
            html example go this 
        </div>
    </div>
{{/block}}

{{block name="body_footer_js" append}}
<script type="text/template" class="show-html">
    html source go this
</script>

<script type="text/javascript" class="show-js">
requirejs( [ '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}' ] );
</script>

{{/block}}
