<!doctype html>
<html>
    <head>
    <meta charset="utf-8" />
        <title>Bizs.DMultidate detail</title>

        <!-- start pageCommon style -->
        <link rel="stylesheet" type="text/css" href="../../../../static/css/common.css" />
        <link rel="stylesheet" type="text/css" href="../../../../static/css/app/detail.css" />
        <!-- end pageCommon style -->

        <!-- start codeview style -->
        <link rel="stylesheet" type="text/css" href="../../../../static/js/codeMirror/lib/codemirror.css" />
        <!-- end codeview style -->

        <!-- start JC style -->
        <link href='../../../../static/js/jc/modules/JC.Valid/0.2/res/default/style.css' rel='stylesheet' />
        <link href='../../../../static/js/jc/modules/JC.Tips/0.1/res/default/style.css' rel='stylesheet' />
        <link href='../../../../static/js/jc/modules/JC.Calendar/0.2/res/default/style.css' rel='stylesheet' />
        <!-- end JC style -->

        <!-- start page style -->
        <style type="text/css">

        </style>
        <!-- end page style -->
        
        <script src="../../../../static/js/jc/lib.js"></script>
        <script src="../../../../static/js/config.js"></script>

    </head>
    <body>
        <div class="wrap">
            <div id="compTitle">
                <h1 class="detail-title">{{$compData.name}}</h1>
                <h2 class="detail-subtitle">
                    {{$compData.subtitle}}
                    <a href="{{$compData.download}}" target="_blank" class="detail-titlebtn">DOWN LOAD</a>
                    <a href="{{$compData.api}}" target="_blank" class="detail-titlebtn">查看API</a>
                </h2>
            </div>
            <div class="detail-attr">
                <h3 id="navmark-desc" class="detail-blockname ">组件简介</h3>
                <div class="detail-ct">
                    <div class="detail-desc">
                        {{foreach from=$compData.desc item=d}}
                        <p class="desc">{{$d}}</p>
                        {{/foreach}}
                    </div>
                    <p class="desc">some <em>other words</em> ...</p>
                </div>
                <h3 id="navmark-use" class="detail-blockname" >使用说明</h3>
                <div class="detail-ct detail-use">
                    <h4 id="navmark-version" class="detail-groupname ">历史版本 : </h4>
                    <div class="detail-version">
                        {{foreach from=$allVersionComps item=comp}}
                            {{if !$comp.hide|default:''}}
                            <a href="#" class="detail-versionlink {{if $comp.nowVersion }}detail-nowVersion{{/if}}" data-name="{{$comp.name}}">
                            {{$comp.version|default:''}}
                            </a>
                            {{/if}}
                        {{/foreach}}
                    </div>
                    <h4 id="navmark-require" class="detail-groupname ">组件依赖 : </h4>
                    <div class="detail-require">
                        <p>
                            {{if sizeof( $requireComps ) > 0 }}
                                {{foreach from=$requireComps item=comp}}
                                {{if $comp.outlink|default:'' }}
                                    <a href="{{$comp.outlink}}" target="_blank">
                                        {{$comp.name}} - v{{$comp.version}}
                                    </a>
                                {{else}}
                                    {{if !$comp.hide|default:''}}
                                    <a href="#" class="detail-requirelink">
                                        {{$comp.name}} - v{{$comp.version}}
                                    </a>
                                    {{/if}}
                                {{/if}}
                                {{/foreach}}
                            {{else}}
                                <em>无依赖</em>
                            {{/if}}
                        </p>
                    </div>
                    <h4 id="navmark-link" class="detail-groupname">外链形式 : </h4>
                    <textArea class="detail-code">
                    </textArea>
                    <h4 id="navmark-load" class="detail-groupname">模块加载形式 : </h4>
                    <textArea class="detail-code"></textArea>
                </div>
                <h3 id="navmark-attr" class="detail-blockname">HTML 属性</h3>
                <div class="detail-ct detail-htmlattr">
                    <textArea class="detail-code"></textArea>
                </div>
                
            </div>
            <div class="detail-demo">
                <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
                <div class="detail-ct">
                    <h4 id="navmark-demo1" class="detail-groupname k">DEMO1 : Defualt</h4>
                    <p class="desc">
                        没有hiddendateiso属性， 开始结束时间格式化了；
                        自定义显示2个日期框
                    </p>
                    <div class="detail-demoview">
                        <div class="js_autoDMultiDate" 
                            lastIptBox="|.js_lastIpt"
                            >
                            <select name="dataspan" class="dataspan" 
                                >
                                <option value="day">日数据</option>
                                <option value="week">周数据</option>
                                <option value="month">月数据</option>
                                <option value="season">季数据</option>
                                <option value="custom">自定义</option>
                            </select>

                            <input type="text" class="js_multidate"
                                multidate="date"
                                datatype="daterange" 
                                currentcanselect="true" 
                                size="20" readonly=""
                                errmsg="请正确的时间范围"
                                emel="/em"
                                >

                            <span class="js_lastIpt" style="display:none;">
                                <input type="text" class="js_multidate"
                                    multidate="date" 
                                    datatype="daterange"
                                    currentcanselect="true" 
                                    size="20" readonly="" 
                                    errmsg="请正确的时间范围"
                                    emel="/em"
                                    >
                                <em></em>
                            </span>
                            <br>
                            <input type="text" placeholder="开始时间" name="startdate" class="js_startdate" value="" />
                            <input type="text" placeholder="结束时间" name="enddate" class="js_enddate" value="" />
                        </div>

                    </div>

                    <h4 id="navmark-demo2" class="detail-groupname">DEMO2 : JC.Calendar 中小销售 示例 </h4>
                    <p class="desc">
                        两个multidate控件;
                        隐藏域的startdate和enddate为YYYY-MM-DD格式；
                        声明了时间粒度周期，最多可以选多少天/周/月/季；
                    </p>
                    <div class="detail-demoview">
                        <div class="js_autoDMultiDate" 
                            mddayrange="31"
                            mdweekrange="12"
                            mdmonthrange="12"
                            mdseasonrange="8"
                            hiddendateiso="true" 
                            >
                            <select name="dataspan" class="dataspan">
                                <option value="day">日数据</option>
                                <option value="week">周数据</option>
                                <option value="month">月数据</option>
                                <option value="season">季数据</option>
                            </select>
                            <input type="text" class="js_multidate" name="date1"
                                multidate="date"
                                datatype="daterange" 
                                currentcanselect="true" 
                                size="20" readonly=""
                                reqmsg="时间范围"
                                errmsg="请正确的时间范围"

                                emel="/em">
                            <input type="text" class="js_multidate" name="date2"
                                multidate="date" 
                                datatype="daterange"
                                currentcanselect="true" 
                                size="20" readonly="" 
                                reqmsg="时间范围"
                                errmsg="请正确的时间范围"
                                emel="/em">
                            <em></em>
                            <br>
                            <input type="text" placeholder="开始时间" name="startdate" class="js_startdate" value="" />
                            <input type="text" placeholder="结束时间" name="enddate" class="js_enddate" value="" />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <!-- 外链形式 start -->
        <textArea class="detail-codetpl" type="text/template">
            <link href='/module/JC.Calendar/0.3/res/default/style.css' rel='stylesheet' />

            <script src="/module/JC.common/0.2/common.js" />
            <script src="/module/JC.BaseMVC/0.1/BaseMVC.js" />
            <script src="/module/JC.Calendar/0.3/Calendar.js"></script>
            <script src="/module/Bizs.DMultiDate/0.1/DMultiDate.js" />
        </textArea>
        <!-- 外链形式 end -->

        <!-- 模块加载 start -->
        <textArea class="detail-codetpl" type="text/template">
            <link href='/module/Bizs.DMultiDate/0.1/res/default/style.css' rel='stylesheet' />

            <script>
                requirejs( [ 'module/Bizs.DMultiDate/0.1/DMultiDate' ], function( DMultiDate ){
                });
            </script>
        </textArea>
        <!-- 模块加载 end -->

        <!-- HTML属性 start -->
        <textArea class="detail-codetpl" type="text/template">
            mddate = css selector
            声明日期input[type=text][datatype=daterange]的标签
            如果缺省则自动查找子元素.js_multidate

            mdstartdate = css selector
            声明开始日期的隐藏域标签, 默认查找子元素.js_startdate

            mdenddate = css selector
            声明结束日期的隐藏域标签, 默认查找子元素.js_enddate

            mddayrange = num
            声明时间粒度为日时，最长可选取多少天，如果不需要则不声明此属性

            mdweekrange = num
            声明时间粒度为周时，最长可选取多少周，如果不需要则不声明此属性

            mdmonthrange = num
            声明时间粒度为月时，最长可选取多少月，如果不需要则不声明此属性

            mdseasonrange = num
            声明时间粒度为季时，最长可选取多少季，如果不需要则不声明此属性

            mdyearrange = num
            声明时间粒度为年时，最长可选取多少年，如果不需要则不声明此属性

            hiddendateiso = bool
            声明隐藏域开始结束时间的日期格式
            为true时返回yyyy-mm-dd的格式
            默认为false. 返回格式化后的形式如：2014W20

            mdIgnoreUrlFill = bool, default = false
            是否忽略 URL 自动填充
        </textArea>
        <!-- HTML属性 end -->

        <!-- 数据结构 start -->
        <textArea class="detail-codetpl" type="text/template">
            
        </textArea>
        <!-- 数据结构 end -->

        <script type="text/javascript">
            JC.debug = 1;

            requirejs( [ 
                'JC.Tips'
                , 'JC.Calendar'
                , 'JC.Form'
                , 'Bizs.DMultiDate'
                , 'Bizs.FormLogic'
                , 'JC.Valid'
                , 'detail'
            ], function(){
                 
            });
        </script>
    </body>
</html>

