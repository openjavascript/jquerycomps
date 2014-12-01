{{extends file="public/demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
<!-- end JC style -->

{{/block}}

{{block name="body_main"}}
<div class="wrap">
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

<script type="text/javascript">
    JC.debug = 1;

    requirejs( [ 
        '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}' 
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

