{{extends file="public/baseDetail.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<link href='{{$URL_ROOT}}/modules/JC.AjaxTree/0.1/res/default/style.css' rel='stylesheet' />
<!-- end JC style -->

{{/block}}

{{block name="body_main"}}
<div class="wrap">
    <div id="compTitle">
        <h1 class="detail-title">{{$compData.name}}</h1>
        <h2 class="detail-subtitle">
            {{$compData.subtitle}}
            <a href="{{$compData.download}}" target="_blank" class="detail-titlebtn">DOWN LOAD</a>
            <a href="{{$compData.api}}" target="_blank" class="detail-titlebtn">查看API</a>
        </h2>
    </div>
    <div class="detail-attr">
        <h3 id="navmark-desc" class="detail-blockname ">组件简介</h3>
        <div class="detail-ct">
            <div class="detail-desc">
                {{foreach from=$compData.desc item=d}}
                <p class="desc">{{$d}}</p>
                {{/foreach}}
            </div>
            <p class="desc">some <em>other words</em> ...</p>
        </div>
        <h3 id="navmark-use" class="detail-blockname" >使用说明</h3>
        <div class="detail-ct detail-use">
            <h4 id="navmark-version" class="detail-groupname ">历史版本 : </h4>
            <div class="detail-version">
                {{foreach from=$allVersionComps item=comp}}
                    {{if !$comp.hide|default:'' }}
                    <a href="#" class="detail-versionlink {{if $comp.nowVersion }}detail-nowVersion{{/if}}" data-name="{{$comp.name}}">
                    {{$comp.version}}
                    </a>
                    {{/if}}
                {{/foreach}}
            </div>
            <h4 id="navmark-require" class="detail-groupname ">组件依赖 : </h4>
            <div class="detail-require">
                <p>
                    {{if sizeof( $requireComps ) > 0 }}
                        {{foreach from=$requireComps item=comp}}
                        {{if $comp.outlink|default:'' }}
                            <a href="{{$comp.outlink|default:''}}" target="_blank">
                                {{$comp.name}} - v{{$comp.version}}
                            </a>
                        {{else}}
                            {{if !$comp.hide|default:''}}
                            <a href="#" class="detail-requirelink">
                                {{$comp.name}} - v{{$comp.version}}
                            </a>
                            {{/if}}
                        {{/if}}
                        {{/foreach}}
                    {{else}}
                        <em>无依赖</em>
                    {{/if}}
                </p>
            </div>
            <h4 id="navmark-link" class="detail-groupname">外链形式 : </h4>
            <textArea class="detail-code">
            </textArea>
            <h4 id="navmark-load" class="detail-groupname">模块加载形式 : </h4>
            <textArea class="detail-code"></textArea>
        </div>
        <h3 id="navmark-attr" class="detail-blockname">HTML 属性</h3>
        <div class="detail-ct detail-htmlattr">
            <textArea class="detail-code"></textArea>
        </div>
        <h3 id="navmark-data" class="detail-blockname">数据格式</h3>
        <div class="detail-ct detail-data">
            <textArea class="detail-code"></textArea>
        </div>
    </div>
    <div class="detail-demo">
        <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
        <div class="detail-ct">
            <h4 id="navmark-demo1" class="detail-groupname k">DEMO1 : Defualt</h4>
            <p class="desc">
                下面是AJAX 树的一个DEMO，菜单组件是一个很NB的组件,AJAX 树菜单组件是一个很NB的组件,AJAX 树菜单组件是一个很NB的组件,AJAX 树菜单组件是一个很NB的组件。
            </p>
            <div class="detail-demoview">

                <div class="js_compAjaxTree" data-cajScriptData="|script">
                    <script type="text/template">
                        {
                            data:  {
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
                            , root: ["folder","0",'root']
                            , url: "{{$COMP_ROOT}}/_demo/data/treedata.php"
                        }
                    </script>
                </div>

            </div>

            <h4 id="navmark-demo2" class="detail-groupname">DEMO2 : 使用方法对树进行展开收缩</h4>
            <p class="desc">
                AjaxTree也对外部暴露了对树节点的操作方法，你可以通过<em>JC.BaseMVC</em>的<em>getInstance( Dom, CompType )</em>方法获取AjaxTree的实例，然后通过<em>open()</em>、<em>close()</em>、<em>open( data_id )</em>或者<em>close( data_id )</em>对树节点进行操作。
            </p>
            <div class="detail-demoview">

                <div>
                    <button type="button" class="js_open_all">open all</button>
                    <button type="button" class="js_close_all">close all</button>
                    <button type="button" class="js_open_for" data_target="#open_to_val">open for</button>
                    <input type="text" value="0101" id="open_to_val" style="width: 60px;" />
                    <button type="button" class="js_close_for" data_target="#open_to_val">close for</button>
                </div>
                <div class="js_compAjaxTree" data-cajScriptData="|script">
                    <script type="text/template">
                        {
                            data: {
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
                            , root: ["folder","0",'root']
                            , url: "{{$COMP_ROOT}}/_demo/data/treedata.php"
                        }
                    </script>
                </div>

            </div>
        </div>
    </div>
</div>

<!-- 外链形式 start -->
<textArea class="detail-codetpl" type="text/template">
    <link href='/module/JC.AjaxTree/0.1/res/default/style.css' rel='stylesheet' />

    <script src="/module/JC.plugins/JSON/2/JSON.js" />
    <script src="/module/JC.common/0.2/common.js" />
    <script src="/module/JC.BaseMVC/0.1/BaseMVC.js" />
    <script src="/module/JC.AjaxTree/0.1/AjaxTree.js" />
</textArea>
<!-- 外链形式 end -->

<!-- 模块加载 start -->
<textArea class="detail-codetpl" type="text/template">
    <link href='/module/JC.AjaxTree/0.1/res/default/style.css' rel='stylesheet' />

    <script>
        requirejs( [ 'module/JC.AjaxTree/0.1/AjaxTree' ], function( AjaxTree ){
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

<script type="text/javascript">
    JC.debug = 1;

    requirejs( [ 
        'JC.AjaxTree'
        , 'detail'
    ], function(){
         $(document).delegate('button.js_open_all', 'click', function( e ){
            var btn = $( e.target );

            btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function( _k ){
                JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance(this, JC.AjaxTree ).open();
            });
        });

        $(document).delegate('button.js_close_all', 'click', function( e ){
            var btn = $( e.target );
            
            btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function(){
                JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance(this, JC.AjaxTree ).close();
            });
        });

        $(document).delegate('button.js_open_for', 'click', function( e ){
        
            var _tgr = $(this).attr('data_target');
            if( !_tgr ) return;
            _tgr = $.trim( $( _tgr ).val() );

            var btn = $( e.target );
            
            btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function(){
                JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance( this, JC.AjaxTree ).open( _tgr );
            });
        });

        $(document).delegate('button.js_close_for', 'click', function( e ){
        
            var _tgr = $(this).attr('data_target');
            if( !_tgr ) return;
            _tgr = $.trim( $( _tgr ).val() );

            var btn = $( e.target );
            
            btn.closest( '.detail-demoview' ).find( 'div.js_compAjaxTree' ).each( function(){
                JC.BaseMVC.getInstance( this, JC.AjaxTree ) && JC.BaseMVC.getInstance( this, JC.AjaxTree ).close( _tgr );
            });
        });
    });
</script>

{{/block}}

