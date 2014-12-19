{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<!-- end JC style -->
<style>
</style>

{{/block}}


{{block name="body_header" append}}
{{assign var="url" value=$smarty.server.REQUEST_URI|regex_replace:"/\&type\=[^&]+/":"" scope="global"}}
<div>
    {{$url}}
</div>
{{/block}}


{{block name="body_main"}}

<style class="show-css">
.defdl dt { font-weight: bold; margin: 10px auto; }
.defdl dd { line-height: 24px; }
.defdl div {
    padding: 5px;
    margin: 5px;
}
</style>
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
<dl class="defdl">
    <dt>balType = hit_value for button</dt>
    <dd>
        <div>
            <button 
                type="button"
                class="js_bizsActionLogic"
                balType="hit_value"
                balTarget="/input[type=text]"
                balValue="1"
                >
                value 1
            </button>

            <button 
                type="button"
                class="js_bizsActionLogic"
                balType="hit_value"
                balTarget="/input[type=text]"
                balValue="2"
                >
                value 2
            </button>

            <input type="text" value="" />
        </div>
    </dd>

    <dt>balType = hit_value for link</dt>
    <dd>
        <div>
            <a  href="javascript:;"
                class="js_bizsActionLogic"
                balType="hit_value"
                balTarget="/input[type=text]"
                balValue="1"
                >
                value 1
            </a>
            &nbsp;&nbsp;&nbsp;
            <a  href="javascript:;"
                class="js_bizsActionLogic"
                balType="hit_value"
                balTarget="/input[type=text]"
                balValue="2"
                >
                value 2
            </a>
            &nbsp;&nbsp;&nbsp;
            <input type="text" value="" />
        </div>
    </dd>

    <dt>balType = hit_value for form</dt>
    <dd>
        <div>
            <form method="GET" action="{{$url}}">
            <input type="hidden" name="module" value="{{$COMP_NAME}}" />
            <input type="hidden" name="version" value="{{$COMP_VERSION}}" />
            <input type="hidden" name="file" value="{{$COMP_FILE}}" />
            <button 
                type="submit"
                class="js_bizsActionLogic"
                balType="hit_value"
                balTarget="/input[name=v]"
                balValue="1"
                >
                submit value 1
            </button>

            <button 
                type="submit"
                class="js_bizsActionLogic"
                balType="hit_value"
                balTarget="/input[name=v]"
                balValue="2"
                >
                submit value 2
            </button>

            <div>
                <input type="hidden" name="v" value="" />
            </div>
        </div>
    </dd>
    
    </dl>
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

