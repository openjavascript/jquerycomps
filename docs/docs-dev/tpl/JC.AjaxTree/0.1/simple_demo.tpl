{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<!-- start JC style -->
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
<!-- end JC style -->
<style>
    .ajaxtree-demo1 {
        margin-left: 50px;
    }
</style>

{{/block}}

{{block name="body_main"}}
{{include file="public/simple_demo/body_header.tpl"}}
<div class="codeview-wrap">
    <div class="codeview-tabbar">
        <a href="#" class="codeview-css">CSS</a>
        <a href="#" class="codeview-js">JS</a>
        <a href="#" class="codeview-html">HTML</a>
        <a href="#" class="codeview-page selected">PAGE</a>
    </div>
    <div class="codeview-view">
        <div class="codeview-cssview">
<textArea style="display:none;">
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
</textArea>
        </div>
        <div class="codeview-jsview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-htmlview">
            <textArea style="display:none;"></textArea>
        </div>
        <div class="codeview-pageview nowview">
            <div style="position:fixed; right: 30px; top: 40px;">
                <dl>
                    <dd>
                    <a style="margin-right: 10px; color: #ccc;" href="?">init Tree</a>
                    <button type="button" class="js_open_all">open all</button>
                    <button type="button" class="js_close_all">close all</button>
                    <button type="button" class="js_open_for" data_target="#open_to_val">open for</button>
                    <input type="text" value="0101" id="open_to_val" style="width: 60px;" />
                    <button type="button" class="js_close_for" data_target="#open_to_val">close for</button>
                    </dd>
                </dl>
            </div>
            <div class="show-html">
                <!-- simple demo -->
                <dl class="ajaxtree-demo1">
                    <dt>默认树 - Tree 示例</dt>
                    <dd>
                        <!-- class="js_compAjaxTree" is necessary -->
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
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" class="show-js">
    requirejs( [ '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}' ] );

    /* include JC.AjaxTree.js */

    var ajaxTree;

    /* open all */
    $( document ).delegate('button.js_open_all', 'click', function(){
        $('div.js_compAjaxTree').each( function( _k ){
            ajaxTree = JC.BaseMVC.getInstance( this, JC.AjaxTree ); 
            ajaxTree && ajaxTree.open();
        });
    });

    /* close all */
    $( document ).delegate('button.js_close_all', 'click', function(){
        $('div.js_compAjaxTree').each( function(){
            ajaxTree = JC.BaseMVC.getInstance( this, JC.AjaxTree );
            ajaxTree && ajaxTree.close();
        });
    });

    /* open node */
    $( document ).delegate('button.js_open_for', 'click', function(){
    
        var _tgr = $(this).attr('data_target');
        if( !_tgr ) return;
        _tgr = $.trim( $( _tgr ).val() );

        $('div.js_compAjaxTree').each( function(){
            ajaxTree = JC.BaseMVC.getInstance( this, JC.AjaxTree );
            ajaxTree && ajaxTree.open( _tgr );
        });
    });

    /* close node */
    $( document ).delegate('button.js_close_for', 'click', function(){
    
        var _tgr = $(this).attr('data_target');
        if( !_tgr ) return;
        _tgr = $.trim( $( _tgr ).val() );

        $('div.js_compAjaxTree').each( function(){
            ajaxTree = JC.BaseMVC.getInstance( this, JC.AjaxTree );
            ajaxTree && ajaxTree.close( _tgr );
        });
    });

</script>
{{include file="public/simple_demo/body_footer.tpl"}}
{{/block}}

