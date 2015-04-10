;(function(define, _win) { 'use strict'; define( 'Bizs.TaskViewer', [ 'JC.BaseMVC' ], function(){
    /**
     * TaskViewer 日历任务展示面板
     *
     *<p><b>require</b>:
     *   <a href="widnow.jQuery.html">jQuery</a>
     *   , <a href="JC.common.html">JC.common</a>
     *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     *</p>
     *
     *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     *   | <a href='http://jc2.openjavascript.org/docs_api/classes/Bizs.TaskViewer.html' target='_blank'>API docs</a>
     *   | <a href='../../modules/Bizs.TaskViewer/0.1/_demo' target='_blank'>demo link</a></p>
     *  
     *<h2>页面只要引用本文件, 默认会自动初始化class="js_COMPTaskViewer"下的日期</h2>
     *
     *
     *<h2>可用的 HTML attribute</h2>
     *<dl>
     *<dt>taskselecteddates = selector</dt>
     *<dd>指定选定的日期标签</dd>
     *<dt>taskdeleteddates = selector</dt>
     *<dd>指定删除的日期标签</dd>
     *<dt>tasknewaddeddates = selector</dt>
     *<dd>指定新增的日期标签</dd>
     *</dl>
     *
     * @namespace window.Bizs
     * @class TaskViewer
     * @extends JC.BaseMVC
     * @constructor
     * @param   {selector|string}   _selector   
     * @version 0.1 2014-04-17
     * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
    */
    window.Bizs.TaskViewer = TaskViewer;
    JC.f.addAutoInit && JC.f.addAutoInit( TaskViewer );
    
    function TaskViewer( _selector ){
        _selector && (_selector = $(_selector) );
        
        if (TaskViewer.getInstance(_selector))
            return TaskViewer.getInstance(_selector);

        TaskViewer.getInstance(_selector, this);  

        this._model = new TaskViewer.Model(_selector);
        this._view = new TaskViewer.View(this._model);
        this._init();
    }

    /**
     * 获取或设置 TaskViewer 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {TaskViewerInstance}
     */
    TaskViewer.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( TaskViewer.Model._instanceName, _setter );
 
        return _selector.data( TaskViewer.Model._instanceName );
    };

    /**
     * 初始化可识别的 TaskViewer 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of TaskViewerInstance}
     */
    TaskViewer.init = function ( _selector ) {
        var _r = [];
        
        _selector = $( _selector || document );
 
        if ( _selector.length ) {
            if ( _selector.hasClass('js_COMPTaskViewer') ) {
                _r.push( new TaskViewer(_selector) );
            } else {
                _selector.find('.js_COMPTaskViewer').each( function() {
                    _r.push( new TaskViewer( this ) );
                });
            }
        }
        
        return _r;
    };

    BaseMVC.build( TaskViewer, 'Bizs' );
    
    JC.f.extendObject( TaskViewer.prototype, {
        _beforeInit: function () {
            this._model.allMonths = {};
            this._model.allDays = {};
        },

        _initHanlderEvent: function () {
            JC.log( 'TaskViewer _initHanlderEvent', new Date().getTime() );
            var p = this;
    
            p._model.getAllDates();

            p._view.layout();

        },

        _inited:function () {

            
        }
    });

    TaskViewer.Model._instanceName = 'TaskViewer';
    
    JC.f.extendObject( TaskViewer.Model.prototype, {

        init: function () {

        },

        selectedDates: function () {
            var p = this,
                selector = p.attrProp('taskselecteddates'),
                $el;

            $el = p.selector().find(selector);
            $el.length && p.dates($el, 'selected');
        },

        delDates: function () {
            var p = this,
                selector = p.attrProp('taskdeleteddates'),
                $el;

            $el = p.selector().find(selector);
            $el.length && p.dates($el, 'deleted');
        },

        newAddDates: function () {
            var p = this,
                selector = p.attrProp('tasknewaddeddates'),
                $el;

            $el = p.selector().find(selector);
            $el.length && p.dates($el, 'added');
           
        },

        dates: function ($date, type) {
            var p = this,
                temp = [];

            $date.each( function () {
                temp.push($(this).text().replace( /[^\d\-,]/g, '' ));
            });

            $.each(temp, function (ix, item) {
                var key,
                    obj = {}, 
                    tempList = [];

                item = item.replace( /[^\d]/g, '' );
                key = item.slice(0, 6);

                if (item.length === 8) {
                    obj = {
                        'start': item,
                        'end': item,
                        'type': type
                    }
                }

                if (item.length === 16) {
                    obj = {
                        'start': item.slice(0, 8),
                        'end': item.slice(8),
                        'type': type
                    };
                }

                if ( !(key in p.allMonths) ) {
                    p.allMonths[key] = obj.start;
                    p.allDays[key] = [];
                } 

                tempList.push(obj);
                p.allDays[key] = p.allDays[key].concat(tempList);
                
            });

        },

        getAllDates: function () {
            var p = this;

            p.selectedDates();
            p.delDates();
            p.newAddDates();
        },

        buildHeaderTpl: function (l) {
            var cnWeek = '日一二三四五六',
                i = 0,
                tpl = '<tr><th class="COMP_task_view_counter">已选天数</th><th style="width:80px; height:30px; padding:0!important;">'
                            + '<div class="COMP_task_view_slash">'
                                + '<b>星期</b>'
                                + '<em>日期</em>'
                            + '</div>'
                        + '</th>',
                style = '';

            for ( i = 0; i < l; i++ ) {
                
                if ( i % 7 === 0 || i % 7 === 6 ) {
                    style = 'weekend';
                }  else {
                    style = '';
                }

                tpl += '<th class="' + style + '">' + cnWeek.charAt(i % 7) + '</th>';
            }
            
            tpl += '</tr>'
            return tpl;
        },

        buildMonthTpl: function () {
            var p = this,
                key,
                d,
                i,
                month,
                year,
                tempD,
                maxDay,
                day,
                placeholder = '',
                tpl = '';

            for ( key in p.allMonths ) {
                d = JC.f.dateDetect(p.allMonths[key]);
                year = d.getFullYear();
                month = d.getMonth();
                maxDay = JC.f.maxDayOfMonth(d);
                placeholder = '';
                day = new Date(year, month, 1).getDay();      
                while(day--) {
                    placeholder += '<td>&nbsp;</td>'
                    if( day <= 0 ) break;
                }
                tpl += '<tr class="' + key + '"><td class="COMP_task_view_counter">&nbsp;</td><td class="COMP_task_view_date">' + year + '年' + (month + 1) + '月' +'</td>' + placeholder;
                for ( i = 1; i <= maxDay; i++) {
                    tempD = new Date(year, month, i);
                    tpl += '<td class="date" data-date="' + JC.f.formatISODate(tempD) + '" title="' + JC.f.formatISODate(tempD) + '">' + i +'</td>'
                }
                tpl += '</tr>';
            }

            return '<tbody>' + tpl + '</tbody>'
        },

        allDays: {},

        allMonths: {}
    
    });

    JC.f.extendObject( TaskViewer.View.prototype, {
        init: function () {
            return this;
        },

        layout: function () {
            var p = this,
                tpl = '<table class="COMP_task_view"><thead></thead>',
                l ;

            tpl = tpl + p._model.buildMonthTpl();
            p._model.selector().append(tpl);
            l = p.fixLayout();
            p._model.selector().find('.COMP_task_view>thead').append(p._model.buildHeaderTpl(l));

            p.setSelected();
        },

        fixLayout: function () {
            var p = this,
                trs = p.selector().find('.COMP_task_view>tbody>tr'),
                max = 0,
                len = [];

            trs.each(function () {
                len.push($(this).find('td').length);
            });

            
            max = Math.max.apply(Math, len);

            trs.each( function (ix) {
                var sp = $(this),
                    l = sp.find('td').length,
                    i = 0,
                    placeholder = '';
                
                if ( max > l ) {
                    i = max - l;
                    while (i--) {
                        placeholder += '<td>&nbsp;</td>';
                    }
                    sp.append(placeholder);
                }

            });
            
            return max - 2;
        },

        setSelected: function () {
            var p = this,
                allDays = p._model.allDays,
                selector = p._model.selector(),
                pnt = selector.find('.COMP_task_view>tbody'),
                tds = pnt.find('.date'),
                trs = pnt.find('tr'),
                key;
            
            $.each(allDays, function (ix, item) {
                var selected = 0,
                    added = 0,
                    deleted = 0,
                    update = 0,
                    defaut = 0,
                    text = '',
                    $tr = pnt.find('tr.' + ix);

                $.each(item, function (subix, subitem) {
                    var start = JC.f.dateDetect(subitem['start']).getTime(),
                        end = JC.f.dateDetect(subitem['end']).getTime(),
                        style = subitem['type'];
                    
                    $tr.find('.date').each ( function () {
                        var sp = $(this),
                            
                            d = JC.f.dateDetect(sp.data('date')).getTime();

                        if (d >= start && d <= end) {
                            sp.addClass(style);
                        }

                    });

                    selected = $tr.find('.selected').length;
                    added = $tr.find('.added').length;
                    deleted = $tr.find('.deleted').length;
                    defaut = selected + deleted;
                    update = defaut + added - deleted;

                    if (added || deleted) {
                        text = '<span class="updatedDays">' + update + '天</span>' 
                            + '<span class="defaultDays">' + defaut + '天</span>';
                    } else {
                        text = '<span>' + selected + '天</span>';
                    }

                    $tr.find('td').eq(0).html(text); 

                });

            });
    
        }
    } );
    
    $(document).ready( function () {
        var _insAr = 0;
 
        TaskViewer.autoInit && ( _insAr = TaskViewer.init() );
            
    });
 
  
    return Bizs.TaskViewer;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
