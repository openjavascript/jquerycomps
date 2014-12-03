{{extends file="public/base.tpl"}}

{{block name="inherit_header" append}}
<link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/detail.css" />

<!-- start codeview style -->
<link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/codemirror.css" />
<!-- end codeview style -->
    <script>
        window.DOC_PATH = "{{$PROJECT_ROOT}}/viewer.php?module={{$COMP_NAME}}&version={{$COMP_VERSION}}&file=doc.tpl";
    </script>

{{/block}}

{{block name="body_header" append}}
    {{include file="public/demo/body_header.tpl"}}
{{/block}}

{{block name="body_footer" append}}
    {{include file="public/demo/body_footer.tpl"}}
{{/block}}
