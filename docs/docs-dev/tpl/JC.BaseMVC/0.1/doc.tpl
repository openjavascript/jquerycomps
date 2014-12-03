{{extends file="public/doc/base.tpl"}}

{{block name="html_header_css" append}}
{{/block}}

{{block name="body_main"}}
<div class="wrap">
    {{include file="public/doc/body_main.tpl" propertyAttr=1 methodAttr=1 }}

    <!-- 外链形式 start -->
    <textarea class="detail-codetpl" type="text/template">
        <script src="{{$URL_ROOT}}/JC.common/0.2/common.js" />
        <script src="{{$URL_ROOT}}/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}" />
    </textarea>
    <!-- 外链形式 end -->

    <!-- 模块加载 start -->
    <textarea class="detail-codetpl" type="text/template">
        <script>
            requirejs( [ '{{$COMP_NAME}}' ], function( {{$NAME}} ){
            });
        </script>
    </textarea>
    <!-- 模块加载 end -->

    <textarea class="detail-codetpl" type="text/template">
        autoInit Bool static
            是否自动初始化
            Default: true
    </textarea>

    <textarea class="detail-codetpl" type="text/template">
        build ( _outClass ) static
            复制 BaseMVC 的所有方法到 _outClass
            Parameters:
                _outClass Class

        buildClass ( _inClass  _outClass ) static
            复制 _inClass 的所有方法到 _outClass
            Parameters:
                _inClass Class
                _outClass Class

        buildModel ( _outClass ) static
            为 _outClass 生成一个通用 Model 类
            Parameters:
                _outClass Class

        buildView ( _outClass ) static
            为 _outClass 生成一个通用 View 类
            Parameters:
                _outClass Class

        getInstance ( _selector  _staticClass  _classInstance ) static
            获取或设置组件实例
            Parameters:
                _selector Selector
                _staticClass Class
                _classInstance ClassInstance
            Returns:
                ClassInstance | null:

        on ( _evtName  _cb ) 
            使用 jquery on 绑定事件
            Parameters:
                _evtName String
                _cb Function
            Returns:
                BaseMVCInstance

        selector () 
            获取 显示 BaseMVC 的触发源选择器, 比如 a 标签
            Returns:
                selector

        trigger ( _evtName ) 
            使用 jquery trigger 触发绑定事件
            Parameters:
                _evtName String
            Returns:
                BaseMVCInstance  
    </textarea>
</div>

{{/block}}

