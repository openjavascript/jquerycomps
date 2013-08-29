 ;(function($){
    /**
     * 初始化 checkbox 全选反选功能
     * <br />只要引用本脚本, 页面加载完毕时就会自动初始化全选反选功能
     * <br /><br />动态添加的 DOM 需要显式调用 JC.Form.initCheckAll( domSelector ) 进行初始化
     * <br /><br />要使页面上的全选反选功能能够自动初始化, 需要在全选反选按钮上加入一些HTML 属性
     * <br /><b>checktype</b>: all | inverse, all=全选/全不选, inverse=反选
     * <br /><b>checkfor</b>: selector, 要全选/反选的 checkbox 选择器语法
     * <br /><b>checkall</b>: selector, 全选按钮的选择器, 这个只有反选按钮需要, 反选时变更全选按钮的状态
     * @method  initCheckAll
     * @static
     * @for JC.Form
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-06-11
     * @param   {selector}  _selector   要初始化的全选反选的父级节点
     * @example
            <h2>AJAX data:</h2>
            <dl class="def example24">
                <dt>checkall example 24</dt>
                <dd>
                <input type="checkbox" id="checkall24" checktype="all" checkfor="dl.example24 input[type=checkbox]"><label for="checkall24">全选</label>
                <input type="checkbox" id="checkall24_inverse" checktype="inverse" checkfor="dl.example24 input[type=checkbox]" checkall="dl.example24 input[checktype=all]"><label for="checkall24_inverse">反选</label>
                </dd>
                <dd>
                <input type="checkbox" id="checkall24_1" value="" name="" checked />
                <label for="checkall24_1">checkall24_1</label>
                <input type="checkbox" id="checkall24_2" value="" name="" checked />
                <label for="checkall24_2">checkall24_2</label>
                <input type="checkbox" id="checkall24_3" value="" name="" checked />
                <label for="checkall24_3">checkall24_3</label>
                <input type="checkbox" id="checkall24_4" value="" name="" checked />
                <label for="checkall24_4">checkall24_4</label>
                <input type="checkbox" id="checkall24_5" value="" name="" checked />
                <label for="checkall24_5">checkall24_5</label>
                </dd>
            </dl>

            <script>
            $(document).delegate( 'button.js_ajaxTest', 'click', function(){
                var _p = $(this);
                _p.prop('disabled', true);
                setTimeout( function(){ _p.prop('disabled', false); }, 1000 );

                $.get( './data/initCheckAll.php?rnd='+new Date().getTime(), function( _r ){
                    var _selector = $(_r);
                    $( $( 'body' ).children().first() ).before( _selector );
                    JC.Form.initCheckAll( _selector );
                });
            });
            </script>
     */
    JC.Form.initCheckAll = 
        function( _selector ){
            _selector = $( _selector );
            var _ls = _selector.find( 'input[type=checkbox][checktype][checkfor]' );
            _ls.each( function(){
                var _p = $(this)
                    , _type = _p.attr('checktype').toLowerCase()
                    , _for = _p.attr('checkfor');
                if( _type != 'all' || !_for ) return;
                fixCheckAllStatus( _p, _for );

                if( !_p.data('initedCheckall') ){
                    _p.data('initedCheckall', true);
                    $(document).delegate( _for, 'click', function( _evt ){
                        var _sp = $(this);
                        if( isControler( _sp ) ) return;
                        fixCheckAllStatus( _p, _for );
                    });
                }
            });
        };

    $(document).ready( function( _evt ){
        JC.Form.initCheckAll( $(document) );
    });
    /**
     * 监听 全选/反选 按钮的点击事件
     */
    $(document).delegate( 'input[type=checkbox][checktype][checkfor]', 'click', function( _evt ){
        var _p = $(this)
            , _type = _p.attr('checktype').toLowerCase()
            , _for = _p.attr('checkfor');
            JC.log( _type, _for );

        switch( _type ){
            case 'all':
                {
                    $(_for).each( function(){
                        var _sp = $(this);
                        if( isControler( _sp ) ) return;
                        if( _sp.is( '[disabled]' ) ) return;
                        _p.prop('checked') && _sp.prop('checked', true);
                        !_p.prop('checked') && _sp.prop('checked', false);
                        
                    });
                    break;
                }

            case 'inverse':
                {
                    $(_for).each( function(){
                        var _sp = $(this);
                        if( isControler( _sp ) ) return;
                        if( _sp.is( '[disabled]' ) ) return;
                        if( _sp.prop('checked') ) _sp.prop('checked', false);
                        else _sp.prop('checked', true);
                    });

                    if( _p.is('[checkall]') ) fixCheckAllStatus( _p.attr('checkall'), _for );
                    break;
                }
        }
    });
    /**
     * 判断 input 是否为 全选反选 按钮
     */
    function isControler( _selector ){
        _selector = $( _selector );
        return _selector.is( '[checktype]' ) && _selector.is( '[checkfor]');
    }
    /**
     * input 改变状态时, 全选按钮也改为正确的状态
     */
    function fixCheckAllStatus( _all, _for ){
        var _isAll = true, _all = $(_all), _for = $(_for);
        _for.each( function(){
            var _sp = $(this);
            if( isControler( _sp ) ) return;
            if( _sp.is( '[checktype]' ) || _sp.is( '[checkfor]') ) return;
            if( !_sp.prop('checked') ) return _isAll = false;
        });
        JC.log( '_isAll: ', _isAll );
        _all && _all.length && _all.prop( 'checked', _isAll );
    }
}(jQuery));
