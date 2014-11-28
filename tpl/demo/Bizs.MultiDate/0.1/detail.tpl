<!doctype html>
<html>
    <head>
    <meta charset="utf-8" />
        <title>JC.AjaxTree detail</title>

        <!-- start pageCommon style -->
        <link rel="stylesheet" type="text/css" href="../../../../static/css/common.css" />
        <link rel="stylesheet" type="text/css" href="../../../../static/css/app/detail.css" />
        <!-- end pageCommon style -->

        <!-- start codeview style -->
        <link rel="stylesheet" type="text/css" href="../../../../static/js/codeMirror/lib/codemirror.css" />
        <!-- end codeview style -->

        <!-- start JC style -->
        <link href='../../../../static/js/jc/modules/JC.Calendar/0.3/res/default/style.css' rel='stylesheet' />
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
                            {{$comp.version}}
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
                <h3 id="navmark-data" class="detail-blockname">数据格式</h3>
                <div class="detail-ct detail-data">
                    <textArea class="detail-code"></textArea>
                </div>
            </div>
            <div class="detail-demo">
                <h3 id="navmark-demo" class="detail-blockname">DEMO</h3>
                <div class="detail-ct">
                    <h4 id="navmark-demo1" class="detail-groupname k">DEMO1 : Defualt</h4>
                    <p class="desc">
                        
                    </p>
                    <div class="detail-demoview">
                        
                        <select name="dataspan" class="dataspan js_autoMultidate"
                            mddate="/input.js_multidate"
                            mdstartdate="/input.js_startdate"
                            mdenddate="/input.js_enddate"
                            mdlastdate="true"
                            >
                            <option value="date">日数据</option>
                            <option value="week">周数据</option>
                            <option value="month">月数据</option>
                            <option value="season">季数据</option>
                        </select>
                        <input type="text" class="js_multidate" name="ssdate"
                        multidate="date" currentcanselect="true" size="40" readonly
                        ignoreInitCalendarDate="true"
                        />
                        <input type="hidden" name="startdate" class="js_startdate" value="" />
                        <input type="hidden" name="enddate" class="js_enddate" value="" />

                    </div>

                    <h4 id="navmark-demo2" class="detail-groupname">DEMO2 : JC.Calendar  CRM 示例</h4>
                    <p class="desc">
                        mdlastdate="true" <br>    
                        setdefaulthiddendate="true"
                    </p>
                    <div class="detail-demoview">
                        <select name="dataspan" class="dataspan js_autoMultidate"
                            mddate="/input.js_multidate"
                            mdstartdate="/input.js_startdate"
                            mdenddate="/input.js_enddate"
                            mdlastdate="true"
                            setdefaulthiddendate="true"
                            >
                            <option value="date">日数据</option>
                            <option value="week">周数据</option>
                            <option value="month">月数据</option>
                            <option value="season">季数据</option>
                        </select>
                        <input type="text" class="js_multidate" name="ssdate"
                        multidate="date" currentcanselect="true" size="40" readonly />
                        <input type="hidden" name="startdate" class="js_startdate" value="" />
                        <input type="hidden" name="enddate" class="js_enddate" value="" />
                    </div>
                    
                    <h4 id="navmark-demo2" class="detail-groupname">DEMO3 : JC.Calendar  CRM 示例</h4>
                    <p class="desc">
                        type=custom
                    </p>
                    <div class="detail-demoview">
                        <select name="dataspan" class="dataspan js_autoMultidate"
                            mddate="/input.js_multidate"

                            mdstartdate="/input.js_startdate"
                            mdenddate="/input.js_enddate"

                            mdDefaultBox="/span.js_mdDefault"
                            mdCustomBox="/span.js_mdCustom"
                            mdCustomStartDate="/input.js_mdStartDate"
                            mdCustomEndDate="/input.js_mdEndDate"
                            >
                            <option value="date">日数据</option>
                            <option value="week">周数据</option>
                            <option value="month">月数据</option>
                            <option value="season">季数据</option>
                            <option selected value="custom">自定义</option>
                        </select>
                        <span class="js_mdDefault">
                            <input type="text" class="js_multidate" 
                            multidate="date" currentcanselect="true" size="40" readonly />
                            <input type="hidden" name="startdate" class="js_startdate" value="" />
                            <input type="hidden" name="enddate" class="js_enddate" value="" />
                        </span>
                        <span class="js_mdCustom" style="display:none;">
                            <input type="text" datatype="daterange" name="startdate" class="js_mdStartDate" value="" />
                            <input type="text" datatype="daterange" name="enddate" class="js_mdEndDate" value="" />
                            <em class="error"></em>
                        </span>
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
            <script src="/module/JC.Calendar/0.3/Calendar.js" />
        </textArea>
        <!-- 外链形式 end -->

        <!-- 模块加载 start -->
        <textArea class="detail-codetpl" type="text/template">
            <link href='/module/JC.Calendar/0.3/res/default/style.css' rel='stylesheet' />

            <script>
                requirejs( [ 'module/JC.Calendar/0.3/Calendar', 'module/Bizs.MultiDate/0.1/MultiDate' ], function( Calendar, MultiDate ){
                });
            </script>
        </textArea>
        <!-- 模块加载 end -->

        <!-- HTML属性 start -->
        <textArea class="detail-codetpl" type="text/template">
            mdlastdate和setdefaulthiddendate这两个属性，仅仅针对于type !== custom 
            mdlastdate = bool
            default = false;
            是否默认选中前一天,前一周，上个月，上个季度

            setdefaulthiddendate
            default = false
            是否默认设置startdate和enddate
        </textArea>
        <!-- HTML属性 end -->

        <!-- 数据结构 start -->
        <textArea class="detail-codetpl" type="text/template">
           
        </textArea>
        <!-- 数据结构 end -->

        <script type="text/javascript">
            JC.debug = 1;

            requirejs( [ 
                'JC.Calendar'
                ,'Bizs.MultiDate'
                , 'detail'
            ], function(){
                 
            });
        </script>
    </body>
</html>

