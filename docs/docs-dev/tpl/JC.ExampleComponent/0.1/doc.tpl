{{extends file="public/doc/base.tpl"}}

{{block name="html_header_css" append}}
{{*
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
*}}
{{/block}}

{{block name="body_main"}}
    {{include file="public/doc/body_main.tpl" htmlAttr=1 dataFormat=1}}

    <!-- 外链形式 start -->
    <textArea class="detail-codetpl" type="text/template">
        <link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />

        <script src="{{$URL_ROOT}}/modules/JC.common/{{$JCCommonLastVersion}}/common.js" ></script>
{{foreach from=$requireComps item=comp}}
        {{if !$comp.hide|default:'' }}
<script src="{{$URL_ROOT}}/modules/{{$comp.name}}/{{$comp.version|default:'0.1'}}/{{$comp.name}}"></script>
{{/if}}
{{/foreach}}
        <script src="{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}" ></script>
    </textArea>
    <!-- 外链形式 end -->

    <!-- 模块加载 start -->
    <textArea class="detail-codetpl" type="text/template">
        <link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />

        <script>
            requirejs( [ "{{$COMP_NAME}}" ], function( {{$NAME}} ){
            });
        </script>
    </textArea>
    <!-- 模块加载 end -->

    <!-- HTML属性 start -->
    <textArea class="detail-codetpl" type="text/template">
        data-example = bool, default = true
                data example desc example
    </textArea>
    <!-- HTML属性 end -->

    <!-- 数据结构 start -->
    <textArea class="detail-codetpl" type="text/template">
        {
            example: '' //dataFormat
        }
    </textArea>
    <!-- 数据结构 end -->
{{/block}}

{{block name="body_footer_js" append}}
{{/block}}
