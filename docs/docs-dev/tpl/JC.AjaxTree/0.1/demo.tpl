{{extends file="public/demo/base.tpl"}}

{{block name="html_header_css" append}}
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
{{/block}}

{{block name="body_main"}}
<div class="wrap">
    {{include file="public/demo/body_main.tpl"}}

    <div class="detail-demo">
        <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
        <div class="detail-ct detail-subdemo">
            <h4 id="navmark-demo1" class="detail-groupname">Defualt</h4>
            <p class="desc">
                默认示例
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo1.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>

            <h4 id="navmark-demo2" class="detail-groupname">使用方法对树进行展开收缩</h4>
            <p class="desc">
                AjaxTree也对外部暴露了对树节点的操作方法，你可以通过<em>JC.BaseMVC</em>的<em>getInstance( Dom, CompType )</em>方法获取AjaxTree的实例，然后通过<em>open()</em>、<em>close()</em>、<em>open( data_id )</em>或者<em>close( data_id )</em>对树节点进行操作。
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo2.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
</script>
{{/block}}

