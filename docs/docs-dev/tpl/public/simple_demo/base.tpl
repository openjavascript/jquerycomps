{{extends file="public/base.simple.tpl"}}

{{block name="inherit_header" append}}

<link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/codemirror.css" />
<link rel="stylesheet" type="text/css" href="{{$PROJECT_ROOT}}/static/css/simple.css" />

{{/block}}

{{block name="body_header" append}}
    {{include file="public/simple_demo/body_header.tpl"}}
{{/block}}

{{block name="body_footer" append}}
    <script>
        requirejs( [ "{{$PROJECT_ROOT}}/static/js/app/simple_demo.js" ] );
    </script>
    
    {{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}
