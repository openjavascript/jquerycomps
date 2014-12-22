<!doctype html>
<html>{{strip}}
    {{include file="config.tpl" }}
    {{include file="public/func.tpl" }}
{{/strip}}<head>
    {{include file="public/include/base.head.tpl"}}
    <title>{{block name="title"}}{{/block}}Jquey Comps</title>
    {{block name="inherit_header"}}{{/block}}
    {{block name="html_header_css"}}{{/block}}
    {{block name="html_header_js"}}{{/block}}
    {{block name="html_header"}}{{/block}}
    </head>
    <body>
        {{block name="body_header"}}{{/block}}

        {{block name="inherit_body_header"}}{{/block}}

        <div class="codeview-wrap">
            <div class="codeview-tabbar">
                <a href="javascript:;" class="codeview-css">CSS</a>
                <a href="javascript:;" class="codeview-js">JS</a>
                <a href="javascript:;" class="codeview-html">HTML</a>
                <a href="javascript:;" class="codeview-page selected">PAGE</a>
            </div>
            {{block name="body_main"}}{{/block}}
        </div>

        {{block name="inherit_body_footer"}}{{/block}}
        {{block name="body_custom_footer"}}{{/block}}      

        {{block name="body_footer"}}{{/block}}

        {{block name="body_footer_js"}}{{/block}} 
        {{if isset($smarty.get.debug) && $smarty.get.debug eq '1' }}{{debug}}{{/if}}
    </body>
</html>
