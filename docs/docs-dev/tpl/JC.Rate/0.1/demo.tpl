{{extends file="public/demo/base.tpl"}}

{{block name="html_header_css" append}}
<link href='{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css' rel='stylesheet' />
{{/block}}

{{block name="body_main"}}
    {{include file="public/demo/body_main.tpl"}}

    <div class="detail-demo">
        <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
        <div class="detail-ct detail-subdemo">
            <h4 id="navmark-demo1" class="detail-groupname">Half Srat & Cancel Button</h4>
            <p class="desc">
                在DOM属性中可以设置：<em>half="true"</em>，允许展示半颗星的评分。
            </p>
            <p class="desc">
                在DOM属性中可以设置：<em>cancel="true"</em>，允许展示取消分数按钮，用于重置当前选择的分数。
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo1.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>

            <h4 id="navmark-demo2" class="detail-groupname">Score calculation</h4>
            <p class="desc">
                在DOM属性中可以设置<em>totalnum</em>，指定打分组件显示的图形数量，默认显示<em>5</em>个图形。
            </p>
            <p class="desc">
                在DOM属性中可以设置<em>minscore</em>，指定组件在没有图形被点亮的情况下的<em>最小分数</em>，默认<em>最小分数</em>为：<em>0</em>；<br/>同样，也可以在DOM属性中可以设置<em>maxscore</em>，指定组件在全部图形被点亮的情况下的<em>最大分数</em>，默认<em>最大分数</em>为：<em>图形显示的总个数</em>。
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo2.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>

            <h4 id="navmark-demo3" class="detail-groupname">ReadOnly & Callback</h4>
            <p class="desc">
                在DOM属性中可以设置<em>readonly="true"</em>，使组件仅只读，无法进行修改。
            </p>
            <p class="desc">
                在组件每次点击后，组件会自动抛出<em>"rateClicked"</em>事件,用户可以在<em>js</em>里面监听<em>"rateClicked"</em>事件，然后绑定自定义方法；<br/>同样，在组件初始化完毕的时候也会抛出<em>"rateInited"</em>事件。
            </p>
            <div class="detail-subdemoview">
                <iframe src="{{$VIEWER_URL}}subdemo3.tpl" frameborder="0" width="100%" style=""></iframe>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
</script>
{{/block}}
