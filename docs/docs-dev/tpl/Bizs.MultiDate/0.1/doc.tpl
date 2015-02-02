{{extends file="public/doc/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<link href='{{$URL_ROOT}}/modules/JC.Calendar/0.3/res/default/style.css' rel='stylesheet' />
<!-- end JC style -->

{{/block}}

{{block name="body_main"}}
    {{include file="public/doc/body_main.tpl" htmlAttr=1 dataFormat=1}}

    <!-- 外链形式 start -->
    <textArea class="detail-codetpl" type="text/template">
       <link href='{{$URL_ROOT}}/modules/JC.Calendar/0.3/res/default/style.css' rel='stylesheet' />

        <script src="{{$URL_ROOT}}/modules/JC.plugins/JSON/2/JSON.js" />
        <script src="{{$URL_ROOT}}/modules/JC.common/0.3/common.js" />
        <script src="{{$URL_ROOT}}/modules/JC.BaseMVC/0.1/BaseMVC.js" />
        <script src="{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}" />
    </textArea>
    <!-- 外链形式 end -->

    <!-- 模块加载 start -->
    <textArea class="detail-codetpl" type="text/template">
        <link href='{{$URL_ROOT}}/modules/JC.Calendar/0.3/res/default/style.css' rel='stylesheet' />

        <script>
            requirejs( [ "{{$COMP_NAME}}" ], function( {{$NAME}} ){
            });
        </script>
    </textArea>
    <!-- 模块加载 end -->

    <!-- HTML属性 start -->
    <textArea class="detail-codetpl" type="text/template">
       
    </textArea>
    <!-- HTML属性 end -->

{{/block}}

