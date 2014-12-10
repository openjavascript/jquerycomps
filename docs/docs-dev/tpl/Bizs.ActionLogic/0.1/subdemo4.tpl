{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<!-- end JC style -->
<style>
</style>

{{/block}}

{{block name="body_main"}}
{{include file="public/simple_demo/body_header.tpl"}}
{{assign var="url" value=$smarty.server.REQUEST_URI|regex_replace:"/\&(usercallback|baldone)\=[^&]+/":""}}

<div>
    {{$url}}
</div>

<style class="show-css">
.defdl dt { font-weight: bold; margin: 10px auto; }
.defdl dd { line-height: 24px; }
.defdl div {
    padding: 5px;
    margin: 5px;
}
</style>
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
    <dd>
        <div>
            <a href="javascript:" 
                class="js_bizsActionLogic"
                balType="ec"
                balTarget="/div.js_expandBox"
                >
                收起
            </a>

            <div class="js_expandBox" style="border:1px solid #ccc;">
                box content
            </div>
        </div>
    </dd>

    <dd>
        <div>
            <a href="javascript:" 
                class="js_bizsActionLogic"
                balType="ec"
                balTarget="/div.js_expandBox"

                balExpandWord="expand"
                balExpandClass="expand"

                balContractClass="contract"
                balContractWord="contract"
                >
                contract
            </a>

            <div class="js_expandBox" style="border:1px solid #ccc;">
                box content
            </div>
        </div>
    </dd>

    <dd>
        <div>
            <a href="javascript:" 
                class="js_bizsActionLogic"
                balType="ec"
                balTarget="/div.js_expandBox"

                balExpandWord="expand"
                balExpandClass="expand"

                balContractClass="contract"
                balContractWord="contract"
                >
                expand
            </a>

            <div class="js_expandBox" style="border:1px solid #ccc; display:none;">
                box content
            </div>
        </div>
    </dd>    </dl>
            </div>
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

