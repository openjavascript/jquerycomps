{{extends file="public/doc/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
<!-- end JC style -->

{{/block}}

{{block name="body_main"}}
    {{include file="public/doc/body_main.tpl" htmlAttr=1 dataFormat=1}}

    <!-- 外链形式 start -->
    <textArea class="detail-codetpl" type="text/template">
        <link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />

        <script src="{{$URL_ROOT}}/modules/JC.plugins/JSON/2/JSON.js" />
        <script src="{{$URL_ROOT}}/modules/JC.common/0.3/common.js" />
        <script src="{{$URL_ROOT}}/modules/JC.BaseMVC/0.1/BaseMVC.js" />
        <script src="{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}" />
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
        covercnt = string, default = ""
            遮罩显示的文本内容

        coverselectorcnt = string, default = ""
            遮罩显示的内容，显示由select指向的html

        coverlink = string, default = ""
            点击cover时，跳转的地址URL

        coverpointer = boolean default = false
            遮罩是否显示手型

        coverdir = int default = 2
            遮罩遮盖方向，0-上、1-右、2-下、3-左

    </textArea>
    <!-- HTML属性 end -->

    <!-- 数据结构 start -->
    <textArea class="detail-codetpl" type="text/template">
        无数据结构
    </textArea>
    <!-- 数据结构 end -->

{{/block}}

