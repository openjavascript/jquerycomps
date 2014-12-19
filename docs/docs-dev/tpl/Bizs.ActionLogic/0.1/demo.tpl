{{extends file="public/demo/base.tpl"}}

{{block name="html_header_css" append}}
<link href='{{$URL_ROOT}}/modules/JC.Panel/0.2/res/default/style.css' rel='stylesheet' />
{{/block}}

{{block name="body_main"}}

    <div class="detail-demo">
        <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
        <div class="detail-ct">
            <h4 class="detail-groupname">balType = panel, 弹框</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = link, 点击跳转</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo1.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = ajaxaction, AJAX 执行操作( 删除, 起用/禁用 )</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo2.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = remove_element, 删除DOM标签</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo3.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = ec, expand and contract</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo4.tpl" frameborder="0" width="100%"></iframe>
            </div>

            <h4 class="detail-groupname">balType = hit_value, hit_value for button</h4>
            <p class="desc">
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo5.tpl" frameborder="0" width="100%"></iframe>
            </div>

        </div>
    </div>
{{/block}}

{{block name="body_footer_js" append}}
{{*
<script type="text/javascript">
    JC.debug = 1;

    requirejs( [ 
        '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}' 
    ], function(){
    });
</script>
*}}
{{/block}}
