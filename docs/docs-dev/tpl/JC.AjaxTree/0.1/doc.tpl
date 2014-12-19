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

        <script src="{{$URL_ROOT}}/modules/JC.common/{{$JCCommonLastVersion}}/common.js"></script>
{{foreach from=$requireComps item=comp}}
        {{if !$comp.hide|default:'' }}
<script src="{{$URL_ROOT}}/modules/{{$comp.name}}/{{$comp.version|default:'0.1'}}/{{$comp.output|default:''}}"></script>
{{/if}}
{{/foreach}}
        <script src="{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}"></script>

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
        data-defaultOpenRoot = bool, default = true
            如果没有默认选中节点， 是否展开根节点

        data-cajScriptData = script selector
            从脚本模板解释数据

        data-cajData = object name of window
            从window变量获取数据

        data-cajUrl = url
            从 url 加载数据

        data-rootId = node id, default = ''
            指定根节点ID

        data-urlArgName = string, default = 'tree_node'
            书节点的URL参数名

        data-typeIndex = int, default = 0
            数据节点中 节点类型 所在的索引位置

        data-idIndex = int, default = 1
            数据节点中 节点id 所在的索引位置

        data-nameIndex = int, default = 2
            数据节点中 节点name 所在的索引位置
    </textArea>
    <!-- HTML属性 end -->

    <!-- 数据结构 start -->
    <textArea class="detail-codetpl" type="text/template">
        {
            //根节点
            root: [
                      "folder"  //节点类型
                      , "0"     //根节点ID
                      , "root"  // 根节点名
                ]

            //数据接口
            , url: "{{$COMP_ROOT}}/_demo/data/treedata.php?id={0}"

            //子节点数据
            , data: 
            {
                "0": [
                        ["folder","01","非异步节点01"],
                        ["folder","02","非异步节点02"],
                        ["folder","03","异步节点"],
                        ["file","04","叶末节点"]
                    ],
                "01": [
                        ["folder","0101","folder0101"],
                        ["file","0102","file0102"],
                        ["file","0103","file0103"]
                    ],
                "02": [
                        ["file","0201","file0201"],
                        ["file","0202","file0202"]
                    ],
                "0101": [
                        ["file","010101","file010101"],
                        ["file","010102","file010102"]
                    ]
            }
        }
    </textArea>
    <!-- 数据结构 end -->
{{/block}}

{{block name="body_footer_js" append}}
{{/block}}
