{{extends file="public/simple_demo/base.tpl"}}

{{block name="html_header_css" append}}
<style class="show-css">
@import url( '{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/res/default/style.css'  );
</style>
{{/block}}

{{block name="body_main"}}
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
            <!-- simple demo -->
            <dl style="padding: 20px;">
                <dt>多个显示图形:</dt>
                <dd>
                    <span class="js_compRate" score="3" totalnum="8" cancel="true"></span>
                </dd>
            </dl>

            <dl style="padding: 20px;">
                <dt>分数计算:</dt>
                <dd>
                    <span class="js_compRate js_rateClickedEvent" totalnum="10" score="13" maxscore="21" minscore="0" half="true" cancel="true"></span>
                    <p>
                        <span>最小分数：</span><input class="rate_minscore" style="width:50px;" value="0" />
                        <span>最大分数：</span><input class="rate_maxscore" style="width:50px;margin-right: 10px;" value="21" />
                        <span>当前分数：</span><input class="rate_nowscore" style="width:50px;" value="13" />
                    </p>
                </dd>
            </dl>
        </div>
    </div>
{{/block}}

{{block name="body_footer_js" append}}
<script type="text/template" class="show-html">
<div class="" data-cajScriptData="|script">
    <script type="text/template">
        <dl style="padding: 20px;">
            <dt>多个显示图形:</dt>
            <dd>
                <span class="js_compRate" score="3" totalnum="8" cancel="true"></span>
            </dd>
        </dl>

        <dl style="padding: 20px;">
            <dt>分数计算:</dt>
            <dd>
                <span class="js_compRate js_rateClickedEvent" totalnum="10" score="13" maxscore="21" minscore="0" half="true" cancel="true"></span>
                <p>
                    <span>最小分数：</span><input class="rate_minscore" style="width:50px;" value="0" />
                    <span>最大分数：</span><input class="rate_maxscore" style="width:50px;margin-right: 10px;" value="21" />
                    <span>当前分数：</span><input class="rate_nowscore" style="width:50px;" value="13" />
                </p>
            </dd>
        </dl>
    &lt;/script>
</div>
</script>

<script type="text/javascript" class="show-js">
    requirejs( [ '{{$COMP_NAME}}' ] );

    $( '.rate_minscore' ).on( 'change', function( e ){
        var _minScr = $( e.target );
        var _rateDom = _minScr.closest( 'dd' ).find( '.js_compRate' );
        _rateDom.attr( 'minscore', _minScr.val() );
    } );

    $( '.rate_maxscore' ).on( 'change', function( e ){
        var _maxScr = $( e.target );
        var _rateDom = _maxScr.closest( 'dd' ).find( '.js_compRate' );
        _rateDom.attr( 'maxscore', _maxScr.val() );
    } );

    /* rate的click回调 */
    $( document ).delegate( 'span.js_rateClickedEvent', 'rateClicked', function( _evt, _target, _rateIns ) {
        var _star = _target;
        var _score = _star.closest( 'dd' ).find( '.js_rateHidden' ).val();
        $( '.rate_nowscore' ).val( _score );
    } );
</script>
{{/block}}
