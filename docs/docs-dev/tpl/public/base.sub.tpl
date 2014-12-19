<!doctype html>
<html>{{strip}}
    {{include file="config.tpl" }}
    {{include file="public/func.tpl" }}
{{/strip}}<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <meta name="Keywords" content="JQueryComps,openjavascript,JC,JC2,jquery" />
        <meta name="Description" content="JQueryComps" />
	    <title>{{block name="title"}}{{/block}}Jquey Comps</title>

        <link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/button.css" />
	    <link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/common.css" />

        <script>
            window.TPATH = window.PROJECT_ROOT = "{{$PROJECT_ROOT}}";
            window.URL_ROOT = "{{$URL_ROOT}}";

{{if $SHOW_COMP_INFO|default:''}}
            window.COMP_URL = "{{$COMP_URL|default:''}}";
            window.VIEWER_URL = "{{$VIEWER_URL|default:''}}{0}";

            window.COMP_ROOT = "{{$COMP_ROOT|default:''}}";

            window.NAME = "{{$NAME|default:''}}";
            window.OUTPUT = "{{$OUTPUT|default:''}}";

            window.COMP_NAME = "{{$COMP_NAME|default:''}}";
            window.COMP_VERSION = "{{$COMP_VERSION|default:''}}";
            {{/if}}

        </script>
		<script src="{{$URL_ROOT}}/lib.js"></script>
		<script src="{{$PROJECT_ROOT}}/static/js/config.js"></script>

        <script>
            JC.PATH = URL_ROOT;
            JC.debug = {{$TDEBUG|default:0}};

            requirejs.config( {
                baseUrl: JC.PATH
                , urlArgs: 'v={{$TVERSION}}'
                , paths: {
                    'common': TPATH + '/static/js/app/common'
                }
            });

        </script>
        {{block name="inherit_header"}}{{/block}}
        {{block name="html_header_css"}}{{/block}}
        {{block name="html_header_js"}}{{/block}}
        {{block name="html_header"}}{{/block}}
    </head>
    <body>
        {{include file="public/body_header.tpl"}}
        {{include file="public/index/body_header.tpl"}}
        {{block name="body_header"}}{{/block}}

        {{block name="inherit_body_header"}}{{/block}}

        <div class="wrap">

            <div id="bodynav" class="body-nav js_compAutoFixed" 
                data-fixedTopPx="{{$TSIDETOP}}"
                data-fixedClass="body-nav-fixed"
            ></div>

            {{block name="body_main"}}{{/block}}
        </div>

        {{block name="inherit_body_footer"}}{{/block}}
        {{block name="body_custom_footer"}}{{/block}}      

        {{block name="body_footer"}}{{/block}}

        {{include file="public/index/body_footer.tpl"}}
        {{include file="public/body_footer.tpl"}}

        {{block name="body_footer_js"}}{{/block}} 
        {{if isset($smarty.get.debug) && $smarty.get.debug eq '1' }}{{debug}}{{/if}}
    </body>
</html>
