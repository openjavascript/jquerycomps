{{extends file="public/base.sub.tpl"}}

{{block name="inherit_header" append}}
<link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/index.css" />
<link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/detail.css" />
<link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/codemirror.css" />
<script>
    {{if !$compData['nodemo']|default:'' }}
        window.DEMO_PATH = "{{$PROJECT_ROOT}}/viewer.php?module={{$COMP_NAME}}&version={{$COMP_VERSION}}&file=demo.tpl";
    {{/if}}
</script>

{{/block}}

{{block name="body_header" append}}
    {{include file="public/doc/body_header.tpl"}}
{{/block}}

{{block name="body_footer" append}}
    {{include file="public/doc/body_footer.tpl"}}
{{/block}}
