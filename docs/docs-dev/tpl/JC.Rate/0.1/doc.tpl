{{extends file="public/doc/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
<!-- end JC style -->

{{/block}}

{{block name="body_main"}}
<div class="wrap">
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
        totalnum = int, default = 5
            显示分数所用的总星星数量
        maxscore = int, default = 5
            最大分数上限，支持浮点数
        minscore = int, default = 5
            最小分数下限，支持浮点数
        score = int, default = 0
            默认分数
        half = boolean, default = false
            星星是否支持显示半颗星
        cancel = boolean, default = false
            是否需要清零按钮
        hints = string, default = '较差,一般,不错,很好,非常棒'
            鼠标hover时，显示的title，以分号隔开
        hiddenName = string, default = 'score'
            隐藏域控件的 name
    </textArea>
    <!-- HTML属性 end -->

    <!-- 数据结构 start -->
    <textArea class="detail-codetpl" type="text/template">
        无数据结构
    </textArea>
    <!-- 数据结构 end -->
</div>

{{/block}}