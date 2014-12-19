{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}

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
        </div>
    </div>

    <script type="text/javascript" class="show-js">
        requirejs( [ '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}' ] );

    </script>
{{/block}}

