(function($){
    JC.LunarCalendar.getFestivals = getFestivals;
    /**
     * 返回农历和国历的所在日期的所有节日
     * <br /> 假日条目数据样例: { 'name': '春节', 'fullname': '春节', 'priority': 8 }
     * <br /> 返回数据格式: { 'dayName': 农历日期/节日名, 'festivals': 节日数组, 'isHoliday': 是否为假日 }
     * @method getFestivals
     * @static
     * @for JC.LunarCalendar
     * @param   {Object}    _lunarDate      农历日期对象, 由JC.LunarCalendar.gregorianToLunar 获取
     * @param   {Date}      _greDate        日期对象
     * @return  Object    
     */
    function getFestivals( _lunarDate, _greDate ){
        var _r = { 'dayName': '', 'festivals': [], 'isHoliday': false }
            , _lunarDay = [ intPad(_lunarDate.month), intPad(_lunarDate.day) ].join('')
            , _greDay = [ intPad(_greDate.getMonth()+1), intPad(_greDate.getDate()) ].join('')
            , _greToday = _greDate.getFullYear() + _greDay
            ;

        _r.dayName = _lunarDate.ri;
        if( _r.dayName == '初一' ) _r.dayName = _lunarDate.yue;

        if( _greDay in gregorianFes ) _r.festivals.push( gregorianFes[ _greDay ] );
        if( _lunarDay in lunarFes ) {
            _r.festivals.push( lunarFes[ _lunarDay ] );
        }
 
        if( _lunarDate.month == 12 && _lunarDate.day >= 29 ){
            var _tmp = new Date(); _tmp.setTime( _greDate.getTime() ); _tmp.setDate( _tmp.getDate() + 1 );
            var _tmpLunar = JC.LunarCalendar.gregorianToLunar( _tmp );
            if( _tmpLunar.month === 1 && _tmpLunar.day === 1 ){
                var fes = lunarFes['0100'];
                _r.festivals.unshift( fes );
                _r.dayName = fes.name;
            }
        }

        if( JC.LunarCalendar.nationalHolidays ){
            if( _greToday in JC.LunarCalendar.nationalHolidays ){
                _r.festivals.push( JC.LunarCalendar.nationalHolidays[ _greToday ] );
            }
        }
       
        if( _r.festivals.length ){
            for( var i = 0, j = _r.festivals.length - 1; i < j; i++ ){
                for( var k = i + 1; k <= j; k++ ){
                    if(  _r.festivals[k].priority > _r.festivals[i].priority ){
                        var _tmp = _r.festivals[i];
                        _r.festivals[i] = _r.festivals[k];
                        _r.festivals[k] = _tmp;
                    }
                }
            }
            _r.festivals[0].name && (_r.dayName = _r.festivals[0].name);
            for( var i = 0, j = _r.festivals.length; i < j; i++ ){
                if( _r.festivals[i].isHoliday ){ _r.isHoliday = true; break; }
            }
            for( var i = 0, j = _r.festivals.length; i < j; i++ ){
                if( _r.festivals[i].isWorkday ){ _r.isWorkday = true; break; }
            }
       }

        /*JC.log( _lunarDay, _greDay, _r.festivals.length );*/

        return _r;
    }

    var lunarFes = {
        '0101': { 'name': '春节', 'fullname': '春节', 'priority': 8 },  
        '0115': { 'name': '元宵节', 'fullname': '元宵节', 'priority': 8 },  
        '0505': { 'name': '端午节', 'fullname': '端午节', 'priority': 8 },  
        '0707': { 'name': '七夕', 'fullname': '七夕情人节', 'priority': 5 },  
        '0715': { 'name': '中元节', 'fullname': '中元节', 'priority': 5 },  
        '0815': { 'name': '中秋节', 'fullname': '中秋节', 'priority': 8 },  
        '0909': { 'name': '重阳节', 'fullname': '重阳节', 'priority': 5 },  
        '1208': { 'name': '腊八节', 'fullname': '腊八节', 'priority': 5 },  
        '1223': { 'name': '小年', 'fullname': '小年', 'priority': 5 },  
        '0100': { 'name': '除夕', 'fullname': '除夕', 'priority': 8 }
    };

    var gregorianFes = {
        '0101': { 'name': '元旦节', 'fullname': '元旦节', 'priority': 6 },  
        '0202': { 'name': '湿地日', 'fullname': '世界湿地日', 'priority': 1 },  
        '0210': { 'name': '气象节', 'fullname': '国际气象节', 'priority': 1 },  
        '0214': { 'name': '情人节', 'fullname': '情人节', 'priority': 3 },  
        '0301': { 'name': '', 'fullname': '国际海豹日', 'priority': 1 },  
        '0303': { 'name': '', 'fullname': '全国爱耳日', 'priority': 1 },  
        '0305': { 'name': '学雷锋', 'fullname': '学雷锋纪念日', 'priority': 1 },  
        '0308': { 'name': '妇女节', 'fullname': '妇女节', 'priority': 3 },  
        '0312': { 'name': '植树节', 'fullname': '植树节 孙中山逝世纪念日', 'priority': 2 },  
        '0314': { 'name': '', 'fullname': '国际警察日', 'priority': 1 },  
        '0315': { 'name': '消权日', 'fullname': '消费者权益日', 'priority': 1 },  
        '0317': { 'name': '', 'fullname': '中国国医节 国际航海日', 'priority': 1 },  
        '0321': { 'name': '', 'fullname': '世界森林日 消除种族歧视国际日 世界儿歌日', 'priority': 1 },  
        '0322': { 'name': '', 'fullname': '世界水日', 'priority': 1 },  
        '0323': { 'name': '气象日', 'fullname': '世界气象日', 'priority': 1 },  
        '0324': { 'name': '', 'fullname': '世界防治结核病日', 'priority': 1 },  
        '0325': { 'name': '', 'fullname': '全国中小学生安全教育日', 'priority': 1 },  
        '0401': { 'name': '愚人节', 'fullname': '愚人节 全国爱国卫生运动月(四月) 税收宣传月(四月)', 'priority': 2 },  
        '0407': { 'name': '卫生日', 'fullname': '世界卫生日', 'priority': 1 },  
        '0422': { 'name': '地球日', 'fullname': '世界地球日', 'priority': 1 },  
        '0423': { 'name': '', 'fullname': '世界图书和版权日', 'priority': 1 },  
        '0424': { 'name': '', 'fullname': '亚非新闻工作者日', 'priority': 1 },  
        '0501': { 'name': '劳动节', 'fullname': '劳动节', 'priority': 6 },  
        '0504': { 'name': '青年节', 'fullname': '青年节', 'priority': 1 },  
        '0505': { 'name': '', 'fullname': '碘缺乏病防治日', 'priority': 1 },  
        '0508': { 'name': '', 'fullname': '世界红十字日', 'priority': 1 },  
        '0512': { 'name': '护士节', 'fullname': '国际护士节', 'priority': 1 },  
        '0515': { 'name': '家庭日', 'fullname': '国际家庭日', 'priority': 1 },  
        '0517': { 'name': '电信日', 'fullname': '国际电信日', 'priority': 1 },  
        '0518': { 'name': '', 'fullname': '国际博物馆日', 'priority': 1 },  
        '0520': { 'name': '', 'fullname': '全国学生营养日', 'priority': 1 },  
        '0523': { 'name': '', 'fullname': '国际牛奶日', 'priority': 1 },  
        '0531': { 'name': '无烟日', 'fullname': '世界无烟日', 'priority': 1 },   
        '0601': { 'name': '儿童节', 'fullname': '国际儿童节', 'priority': 6 },  
        '0605': { 'name': '', 'fullname': '世界环境保护日', 'priority': 1 },  
        '0606': { 'name': '', 'fullname': '全国爱眼日', 'priority': 1 },  
        '0617': { 'name': '', 'fullname': '防治荒漠化和干旱日', 'priority': 1 },  
        '0623': { 'name': '', 'fullname': '国际奥林匹克日', 'priority': 1 },  
        '0625': { 'name': '土地日', 'fullname': '全国土地日', 'priority': 1 },  
        '0626': { 'name': '禁毒日', 'fullname': '国际禁毒日', 'priority': 1 },  
        '0701': { 'name': '', 'fullname': '香港回归纪念日 中共诞辰 世界建筑日', 'priority': 1 },  
        '0702': { 'name': '', 'fullname': '国际体育记者日', 'priority': 1 },  
        '0707': { 'name': '', 'fullname': '抗日战争纪念日', 'priority': 1 },  
        '0711': { 'name': '人口日', 'fullname': '世界人口日', 'priority': 1 },  
        '0801': { 'name': '建军节', 'fullname': '建军节', 'priority': 1 },  
        '0808': { 'name': '', 'fullname': '中国男子节(爸爸节)', 'priority': 1 },  
        '0815': { 'name': '', 'fullname': '抗日战争胜利纪念', 'priority': 1 },  
        '0908': { 'name': '', 'fullname': '国际扫盲日 国际新闻工作者日', 'priority': 1 },  
        '0909': { 'name': '', 'fullname': '毛逝世纪念', 'priority': 1 },  
        '0910': { 'name': '教师节', 'fullname': '中国教师节', 'priority': 6 },   
        '0914': { 'name': '地球日', 'fullname': '世界清洁地球日', 'priority': 1 },  
        '0916': { 'name': '', 'fullname': '国际臭氧层保护日', 'priority': 1 },  
        '0918': { 'name': '九一八', 'fullname': '九·一八事变纪念日', 'priority': 1 },  
        '0920': { 'name': '爱牙日', 'fullname': '国际爱牙日', 'priority': 1 },  
        '0927': { 'name': '旅游日', 'fullname': '世界旅游日', 'priority': 1 },  
        '0928': { 'name': '', 'fullname': '孔子诞辰', 'priority': 1 },  
        '1001': { 'name': '国庆节', 'fullname': '国庆节 世界音乐日 国际老人节', 'priority': 6 },  
        '1002': { 'name': '', 'fullname': '国际和平与民主自由斗争日', 'priority': 1 },  
        '1004': { 'name': '', 'fullname': '世界动物日', 'priority': 1 },  
        '1006': { 'name': '', 'fullname': '老人节', 'priority': 1 },  
        '1008': { 'name': '', 'fullname': '全国高血压日 世界视觉日', 'priority': 1 },  
        '1009': { 'name': '邮政日', 'fullname': '世界邮政日 万国邮联日', 'priority': 1 },  
        '1010': { 'name': '', 'fullname': '辛亥革命纪念日 世界精神卫生日', 'priority': 1 },  
        '1013': { 'name': '', 'fullname': '世界保健日 国际教师节', 'priority': 1 },  
        '1014': { 'name': '', 'fullname': '世界标准日', 'priority': 1 },  
        '1015': { 'name': '', 'fullname': '国际盲人节(白手杖节)', 'priority': 1 },  
        '1016': { 'name': '粮食日', 'fullname': '世界粮食日', 'priority': 1 },  
        '1017': { 'name': '', 'fullname': '世界消除贫困日', 'priority': 1 },  
        '1022': { 'name': '', 'fullname': '世界传统医药日', 'priority': 1 },  
        '1024': { 'name': '', 'fullname': '联合国日', 'priority': 1 },  
        '1031': { 'name': '勤俭日', 'fullname': '世界勤俭日', 'priority': 1 },  
        '1107': { 'name': '', 'fullname': '十月社会主义革命纪念日', 'priority': 1 },  
        '1108': { 'name': '记者日', 'fullname': '中国记者日', 'priority': 1 },  
        '1109': { 'name': '', 'fullname': '全国消防安全宣传教育日', 'priority': 1 },  
        '1110': { 'name': '青年节', 'fullname': '世界青年节', 'priority': 3 },  
        '1111': { 'name': '', 'fullname': '国际科学与和平周(本日所属的一周)', 'priority': 1 },  
        '1112': { 'name': '', 'fullname': '孙中山诞辰纪念日', 'priority': 1 },  
        '1114': { 'name': '', 'fullname': '世界糖尿病日', 'priority': 1 },  
        '1117': { 'name': '', 'fullname': '国际大学生节 世界学生节', 'priority': 1 },  
        '1120': { 'name': '', 'fullname': '彝族年', 'priority': 1 },  
        '1121': { 'name': '', 'fullname': '彝族年 世界问候日 世界电视日', 'priority': 1 },  
        '1122': { 'name': '', 'fullname': '彝族年', 'priority': 1 },  
        '1129': { 'name': '', 'fullname': '国际声援巴勒斯坦人民国际日', 'priority': 1 },  
        '1201': { 'name': '', 'fullname': '世界艾滋病日', 'priority': 1 },  
        '1203': { 'name': '', 'fullname': '世界残疾人日', 'priority': 1 },  
        '1205': { 'name': '', 'fullname': '国际经济和社会发展志愿人员日', 'priority': 1 },  
        '1208': { 'name': '', 'fullname': '国际儿童电视日', 'priority': 1 },  
        '1209': { 'name': '足球日', 'fullname': '世界足球日', 'priority': 1 },  
        '1210': { 'name': '人权日', 'fullname': '世界人权日', 'priority': 1 },  
        '1212': { 'name': '', 'fullname': '西安事变纪念日', 'priority': 1 },  
        '1213': { 'name': '大屠杀', 'fullname': '南京大屠杀(1937年)纪念日！紧记血泪史！', 'priority': 1 },  
        '1220': { 'name': '', 'fullname': '澳门回归纪念', 'priority': 1 },  
        '1221': { 'name': '篮球日', 'fullname': '国际篮球日', 'priority': 1 },  
        '1224': { 'name': '平安夜', 'fullname': '平安夜', 'priority': 1 },  
        '1225': { 'name': '圣诞节', 'fullname': '圣诞节', 'priority': 1 },  
        '1226': { 'name': '', 'fullname': '毛诞辰纪念', 'priority': 1 }
    };

    var byDayOrWeekFes = {
        '0150': { 'name': '麻风日', 'fullname': '世界麻风日', 'priority': 1 }, //一月的最后一个星期日（月倒数第一个星期日）  
        '0520': { 'name': '母亲节', 'fullname': '国际母亲节', 'priority': 1 },  
        '0530': { 'name': '助残日', 'fullname': '全国助残日', 'priority': 1 },  
        '0630': { 'name': '父亲节', 'fullname': '父亲节', 'priority': 1 },  
        '0730': { 'name': '', 'fullname': '被奴役国家周', 'priority': 1 },  
        '0932': { 'name': '和平日', 'fullname': '国际和平日', 'priority': 1 },  
        '0940': { 'name': '聋人节 世界儿童日', 'fullname': '国际聋人节 世界儿童日', 'priority': 1 },  
        '0950': { 'name': '海事日', 'fullname': '世界海事日', 'priority': 1 },  
        '1011': { 'name': '住房日', 'fullname': '国际住房日', 'priority': 1 },  
        '1013': { 'name': '减灾日', 'fullname': '国际减轻自然灾害日(减灾日)', 'priority': 1 },  
        '1144': { 'name': '感恩节', 'fullname': '感恩节', 'priority': 1 }
    };

    /**
     * 为数字添加前置0
     * @method  JC.LunarCalendar.getFestival.intPad
     * @param   {int}   _n      需要添加前置0的数字
     * @param   {int}   _len    需要添加_len个0, 默认为2
     * @return  {string}
     * @static
     * @private
     */
    function intPad( _n, _len ){
        if( typeof _len == 'undefined' ) _len = 2;
        _n = new Array( _len + 1 ).join('0') + _n;
        return _n.slice( _n.length - _len );
    }

}(jQuery));
