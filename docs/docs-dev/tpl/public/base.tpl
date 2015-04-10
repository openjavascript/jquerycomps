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
        {{include file="public/body_header.tpl"}}
        {{block name="body_header"}}{{/block}}
        {{block name="inherit_body_header"}}{{/block}}

        {{block name="body_main"}}
        {{/block}}

        {{block name="inherit_body_footer"}}{{/block}}
        {{block name="body_custom_footer"}}{{/block}}      

        {{block name="body_footer"}}{{/block}}
        {{include file="public/body_footer.tpl"}}

        {{block name="body_footer_js"}}{{/block}} 
        {{if isset($smarty.get.debug) && $smarty.get.debug eq '1' }}{{debug}}{{/if}}
    </body>
</html>
