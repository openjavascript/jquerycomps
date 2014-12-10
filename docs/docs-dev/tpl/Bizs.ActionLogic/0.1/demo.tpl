{{extends file="public/demo/base.tpl"}}

{{block name="html_header_css" append}}
<link href='{{$URL_ROOT}}/modules/JC.Panel/0.2/res/default/style.css' rel='stylesheet' />

{{/block}}

{{block name="body_main"}}
<div class="wrap">
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
        </div>
    </div>
</div>

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

