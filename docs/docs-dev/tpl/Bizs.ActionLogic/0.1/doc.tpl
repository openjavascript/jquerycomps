{{extends file="public/doc/base.tpl"}}

{{block name="html_header_css" append}}
{{/block}}

{{block name="body_main"}}
<div class="wrap">
    {{include file="public/doc/body_main.tpl" initAttr=1 htmlAttr=1}}

    <!-- 外链形式 start -->
    <textArea class="detail-codetpl" type="text/template">
        <link href='{{$URL_ROOT}}/modules/JC.Panel/0.2/res/default/style.css' rel='stylesheet' />

        <script src="{{$URL_ROOT}}/modules/JC.common/0.2/common.js" />
        <script src="{{$URL_ROOT}}/modules/JC.BaseMVC/0.1/BaseMVC.js" />
        <script src="{{$URL_ROOT}}/modules//JC.Panel/0.2/Panel.js" />
        <script src="{{$URL_ROOT}}/modules/{{$COMP_NAME}}/{{$COMP_VERSION}}/{{$OUTPUT}}" />
    </textArea>
    <!-- 外链形式 end -->

    <textArea class="detail-codetpl" type="text/template">
        <link href='{{$URL_ROOT}}/modules/JC.Panel/0.2/res/default/style.css' rel='stylesheet' />
        <script>
            requirejs( [ "{{$COMP_NAME}}" ], function( {{$NAME}} ){
            });
        </script>
    </textArea>

    <textArea class="detail-codetpl" type="text/template">
        自动初始化 
            [ a|button ]class="js_bizsActionLogic"
    </textArea>

    <!-- HTML属性 start -->
    <textArea class="detail-codetpl" type="text/template">
可用的 HTML 属性
    balType = string, 操作类型
    类型:
        panel: 弹框
        link: 链接跳转
        ajaxaction: ajax操作, 删除, 启用, 禁用
        ec: 展开或收起(expand and contract)
        hit_value: 点击赋值

    balUnHtmlEntity = bool, default = false
        是否将 Panel 转义的 html 反转回来

balType = panel 可用的 HTML 属性
    balPanelTpl = script selector
        脚本模板选择器

    balAjaxHtml = url
        返回 HTML 的 AJAX 模板

    balAjaxData = url
        返回 json 的 AJAX 模板, { errorno: int, data: html }

    balCallback = function
        显示模板后的回调
            function balPanelInitCb( _panelIns ){
               var _trigger = $(this);
               //return true; //如果返回真的话, 表单提交后会关闭弹框
            }

balType = link 可用的 HTML 属性
    balUrl = url
        要跳转的目标 URL

    balConfirmMsg = string
        跳转前的二次确认提示信息

    balConfirmPopupType = string, default = confirm
        二次确认的弹框类型: confirm, dialog.confirm

balType = ajaxaction 可用的 HTML 属性
    balUrl = url
        AJAX 操作的接口

    balDoneUrl = url
        AJAX 操作完成后跳转的URL

    balConfirmMsg = string
        操作前的二次确认提示信息

    balErrorPopupType = string, default = dialog.alert
        错误提示的弹框类型: alert, msgbox, dialog.alert, dialog.msgbox

    balSuccessPopupType = string, default = msgbox
        错误提示的弹框类型: alert, msgbox, dialog.alert, dialog.msgbox

    balCallback = function, window 变量域
        操作完成后的回调

            function ajaxDelCallback( _d, _ins ){
               var _trigger = $(this);
               if( _d && !_d.errorno ){
                   JC.msgbox( _d.errmsg || '操作成功', _trigger, 0, function(){
                       JC.f.reloadPage( '?usercallback=ajaxaction' );
                   });
               }else{
                   JC.Dialog.alert( _d && _d.errmsg ? _d.errmsg : '操作失败, 请重试!' , 1 );
               }
            }

    balRequestData = json
        ajax 请求发送的数据

    balAjaxType = string, default = get
        ajax 请求的类型

    balDoneRemoveSelector = selector
        ajax 操作完成后要删除的 node

balType = ec( expand and contract) 可用的 HTML 属性
    balTarget = selector
        显示/隐藏的选择器

    balExpandWord = string, default = "展开"

    balExpandClass= string, default = "js_ecExpand"

    balContractWord = string, default = "收起"

    balContractClass = string, default = "js_ecContract"

balType = hit_value 可用的 HTML 属性
    balTarget = selector
        显示/隐藏的选择器

    balValue = string, default = ""
        赋给 balTarget 的值

balType = remove_element 可用的 HTML 属性
    balDoneRemoveSelector = selector
        点击操作完成后要删除的 node

    balDoneBeforeRemoveCallback= function, window 变量域
        删除前的回调
    </textArea>
    <!-- HTML属性 end -->

</div>

{{/block}}

