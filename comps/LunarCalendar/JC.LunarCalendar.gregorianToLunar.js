(function($){
    /**
     * 从公历日期获得农历日期
     * <br /> 返回的数据格式
     * <pre>
        {
            shengxiao: ''   //生肖
            , ganzhi: ''    //干支
            , yue: ''       //月份
            , ri: ''        //日
            , shi: ''       //时
            , year: ''      //农历数字年
            , month: ''     //农历数字月
            , day: ''       //农历数字天
            , hour: ''      //农历数字时
        };
     * </pre>
     * @method  gregorianToLunar
     * @static
     * @for     JC.LunarCalendar
     * @param   {date}  _date      要获取农历日期的时间对象
     * @return  Object
     */
    JC.LunarCalendar.gregorianToLunar = gregorianToLunar;

    function gregorianToLunar( _date ){
        var _r = {
            shengxiao: ''   //生肖
            , ganzhi: ''    //干支
            , yue: ''       //月份
            , ri: ''        //日
            , shi: ''       //时
            , year: ''      //农历数字年
            , month: ''     //农历数字月
            , day: ''       //农历数字天
            , hour: ''      //农历数字时
        };

        var _lunar = toLunarDate( _date );
        _r.year = _lunar.y;
        _r.month = _lunar.m + 1;
        _r.day = _lunar.d;

        //JC.log( _r.year, _r.month, _r.day, ' ', _date.getFullYear(), _date.getMonth()+1, _date.getDate() );

        _r.shengxiao = shengxiao.charAt((_r.year - 4) % 12);
        _r.ganzhi = tiangan.charAt((_r.year - 4) % 10) + dizhi.charAt((_r.year - 4) % 12);

        if(_lunar.isleep) {
            _r.yue = "闰" + yuefan.charAt(_r.month - 1);
        }
        else{
            _r.yue = yuefan.charAt(_r.month - 1);
        }
        _r.yue += '月';

        _r.ri = (_r.day < 11) ? "初" : ((_r.day < 20) ? "十" : ((_r.day < 30) ? "廿" : "卅"));
        if (_r.day % 10 != 0 || _r.day == 10) {
            _r.ri += shuzi.charAt((_r.day - 1) % 10);
        }
        _r.ri == "廿" && ( _r.ri = "二十" );
        _r.ri == "卅" && ( _r.ri = "三十" );
        /*JC.log( 'month:', _r.month, 2 );*/

        _r.shi = dizhi.charAt((_r.hour - 1) % 12);
        return _r;
    };

    function getBit(m, n) { return (m >> n) & 1; }

    var tiangan =  "甲乙丙丁戊己庚辛壬癸";
    var dizhi =  "子丑寅卯辰巳午未申酉戌亥";
    var shengxiao =  "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var yuefan =  "正二三四五六七八九十冬腊";
    var xingqi =  "日一二三四五六";
    var shuzi =  "一二三四五六七八九十";
    var lunarDays = [0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B,0x60A57,0x52B,0xA93,0x40E95];
    var lunarMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

    ;void function(){
    var lunarDate=function(r){function l(a){for(var c=348,b=32768;b>8;b>>=1)c+=h[a-1900]&b?1:0;return c+(i(a)?(h[a-1899]&15)==15?30:29:0)}function i(a){a=h[a-1900]&15;return a==15?0:a}function o(a){if(!a||!a.getFullYear)return!1;var c=a.getFullYear(),b=a.getMonth(),a=a.getDate();return Date.UTC(c,b,a)>Date.UTC(2101,0,28)||Date.UTC(c,b,a)<Date.UTC(1900,0,31)?!0:!1}var h=[19416,19168,42352,21717,53856,55632,21844,22191,39632,21970,19168,42422,42192,53840,53845,46415,54944,44450,38320,18807,18815,42160,
    46261,27216,27968,43860,11119,38256,21234,18800,25958,54432,59984,27285,23263,11104,34531,37615,51415,51551,54432,55462,46431,22176,42420,9695,37584,53938,43344,46423,27808,46416,21333,19887,42416,17779,21183,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46752,38310,38335,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,23232,43872,38613,37600,51552,55636,54432,55888,30034,22176,
    43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,20854,21183,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19195,19152,42192,53430,53855,54560,56645,46496,22224,21938,18864,42359,42160,43600,45653,27951,44448,19299,37759,18936,18800,25776,26790,59999,27424,42692,43759,37600,53987,51552,54615,54432,55888,23893,22176,42704,21972,21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,45683,26928,29495,27296,44368,19285,19311,42352,21732,53856,
    59752,54560,55968,27302,22239,19168,43476,42192,53584,62034,54560],g="\u96f6,\u4e00,\u4e8c,\u4e09,\u56db,\u4e94,\u516d,\u4e03,\u516b,\u4e5d,\u5341".split(","),p=["\u521d","\u5341","\u5eff","\u5345","\u25a1"],s="\u7532,\u4e59,\u4e19,\u4e01,\u620a,\u5df1,\u5e9a,\u8f9b,\u58ec,\u7678".split(","),t="\u5b50,\u4e11,\u5bc5,\u536f,\u8fb0,\u5df3,\u5348,\u672a,\u7533,\u9149,\u620c,\u4ea5".split(","),u="\u9f20,\u725b,\u864e,\u5154,\u9f99,\u86c7,\u9a6c,\u7f8a,\u7334,\u9e21,\u72d7,\u732a".split(","),q="\u5c0f\u5bd2,\u5927\u5bd2,\u7acb\u6625,\u96e8\u6c34,\u60ca\u86f0,\u6625\u5206,\u6e05\u660e,\u8c37\u96e8,\u7acb\u590f,\u5c0f\u6ee1,\u8292\u79cd,\u590f\u81f3,\u5c0f\u6691,\u5927\u6691,\u7acb\u79cb,\u5904\u6691,\u767d\u9732,\u79cb\u5206,\u5bd2\u9732,\u971c\u964d,\u7acb\u51ac,\u5c0f\u96ea,\u5927\u96ea,\u51ac\u81f3".split(","),
    v=[0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758],m=r||new Date;this.date=m;this.toLunarDate=function(a){a=a||m;if(o(a)){return"the function[toLunarDate()]range[1900/0/31-2101/0/28]";throw"dateRangeError";}for(var c=a.getFullYear(),b=a.getMonth(),a=a.getDate(),c=(Date.UTC(c,b,a)-Date.UTC(1900,0,31))/864E5,d,b=1900;b<2100&&c>0;b++)d=l(b),c-=d;c<0&&(c+=d,b--);lunarYear=b;_isLeap=!1;leap=
    i(lunarYear);for(b=1;b<13&&c>0;b++)leap>0&&b==leap+1&&_isLeap==!1?(b--,_isLeap=!0,d=i(lunarYear)?(h[lunarYear-1899]&15)==15?30:29:0):d=h[lunarYear-1900]&65536>>b?30:29,_isLeap==!0&&b==leap+1&&(_isLeap=!1),c-=d;c==0&&leap>0&&b==leap+1&&(_isLeap?_isLeap=!1:(_isLeap=!0,b--));c<0&&(c+=d,b--);lunarMonth=b-1;lunarDay=c+1;return{y:lunarYear,m:lunarMonth,d:lunarDay,leap:leap,isleep:_isLeap,toString:function(){var a=_isLeap?"(\u95f0)":"",b=g[parseInt(lunarYear/1E3)]+g[parseInt(lunarYear%1E3/100)]+g[parseInt(lunarYear%
    100/10)]+g[parseInt(lunarYear%10)],c=parseInt((lunarMonth+1)/10)==0?"":p[1];c+=g[parseInt((lunarMonth+1)%10)];var d=p[parseInt(lunarDay/10)];d+=parseInt(lunarDay%10)==0?"":g[parseInt(lunarDay%10)];return""+b+"\u5e74"+c+"\u6708"+a+d+"\u65e5"}}};this.toSolar=function(){if(arguments.length==0)return m;else{var a,c,b;arguments[0]&&(a=arguments[0]);c=arguments[1]?arguments[1]:0;b=arguments[2]?arguments[2]:1;for(var d=0,e=1900;e<a;e++){var f=l(e);d+=f}for(e=0;e<c;e++)f=h[a-1900]&65536>>e?30:29,d+=f;d+=
    b-1;return new Date(Date.UTC(1900,0,31)+d*864E5)}};this.ganzhi=function(a){function c(a,b){return(new Date(3.15569259747E10*(a-1900)+v[b]*6E4+Date.UTC(1900,0,6,2,5))).getUTCDate()}function b(a){return s[a%10]+t[a%12]}var d=a||m;if(o(d)){return"the function[ganzhi()] date'range[1900/0/31-2101/0/28]";throw"dateRangeError";}var e=d.getFullYear(),f=d.getMonth(),a=d.getDate(),d=d.getHours(),h,g,k,j,n;g=f<2?e-1900+36-1:e-1900+36;k=(e-1900)*12+f+12;h=c(e,f*2);var i=c(e,f*2+1);h=a==h?q[f*2]:a==i?q[f*2+1]:
    "";var i=c(e,2),l=c(e,f*2);f==1&&a>=i&&(g=e-1900+36);a+1>=l&&(k=(e-1900)*12+f+13);j=Date.UTC(e,f,1,0,0,0,0)/864E5+25577+a-1;n=j%10%5*12+parseInt(d/2)%12;d==23&&j++;g%=60;k%=60;j%=60;n%=60;return{y:g,m:k,d:j,h:n,jie:h,animal:u[g%12],toString:function(a){var c=b(g)+b(k)+b(j)+b(n);return a?c.substring(0,a):c}}}};
        lunarDate();
    }.call( window );
}(jQuery));
