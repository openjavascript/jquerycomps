<!DOCTYPE html><html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="Keywords" content="CRM账户管理系统" />
        <meta name="Description" content="CRM账户管理系统" />
        <title>CRM账户管理系统</title>
        <link rel="icon" type="image/vnd.microsoft.icon" href=" http://www.360.cn/favicon.ico"/>
<link rel='stylesheet' type='text/css' href='/static/acc/css/??public.css,user.css,xremind.css?v=20130810' />    </head>
    <body>
        <div class="headbg">
            <div class="header">
                <h1 class="logo"><a href="http://crm.360.cn" title="CRM账户管理系统"></a></h1>
            </div><!--end header-->
        </div><!--end headbg-->
        <div class="login">
            <div class="login-t"></div>
            <div class="login-c" >
                                    <form action="/login/" id="login_form" method="post" autocomplete="off">
                        <dl>
                            <dt>欢迎登录账户管理中心</dt>
                            <dd>
                            <span><label for="login_name">账户名称：</label></span>
                            <input type="text" id="login_name"  class="ipt-login" reqmsg="用户名" hintEl="login_name" datatype="reg" reg-pattern="/^[a-zA-Z0-9\-\_]{2,30}$/" errMsg="长度范围2-30" minLength="2" maxLength="30" />
                            <input type="hidden" name="login_name" value="" />
                            <em class="error-tips" id="error-name-tops"></em>
                            </dd>
                            <dd>
                            <span><label for="password">密　　码：</label></span>
                            <input type="password" id="password" class="ipt-login" reqmsg="密码" datatype="text" minLength="6" maxLength="30" errMsg="长度范围6-30" hintEl="password" />
                            <input type="hidden" name="password" value="" />
                            <em class="error-tips" id="error-psd-tops"></em>
                            </dd>
                            <dd>
                            <span><label for="check_code">验&nbsp;&nbsp;证&nbsp;码：</label></span>
                            <input type="text" id="check_code" name="check_code" class="ipt-login1" reqmsg="验证码" datatype="text" minLength="5" maxLength="5" errMsg="长度范围5" intEl="check_code" />
                            <img src="http://crm.360.cn/login/checkImage" class="js-ckcode" style="margin-left: 5px;" >
                            <em style="float:none!important;"><a href="#" class="replaceCode">看不清楚换一张</a></em>
                            <em class="error-tips" id="error-check-tops" style="float:none!important;"></em>
                            </dd>
                            <dd>
                            <p>
                            <button class="btn btn-login" id="btnsend" type="submit">登录</button>
                            <em><a href="http://crm.360.cn/login/recoveryPassword">找回密码</a></em>
                            </p>
                            </dd>
                            <dd class="login-error" id="login-error"></dd>
                        </dl>
                    </form>
                            </div><!--end login-c-->
            <div class="login-b">
                账户管理系统有任何意见和问题，请联系我们：crm-help@360.cn<br>&copy; 2013 奇虎360 免责声明
            </div>
        </div><!--end login-->
        <div class="footer">
            Copyright &copy; 360安全网址. All Rights Reserved. 京ICP证080047号
        </div><!--end footer-->

        <script src="http://s0.qhimg.com/lib/qwrap/1141.js"></script>
<script src='/static/??acc/js/common.js,js/components/valid/valid.js,acc/js/low_ie_tips.js,js/crypt/md5.js,js/crypt/base64.js,acc/js/page/login.js?v=20130810'></script>        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        
          ga('create', 'UA-42636723-1', {'sampleRate':100, 'siteSpeedSampleRate':100});
          ga('send', 'pageview');
        
        </script>
    </body>
</html>

