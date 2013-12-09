 ;(function(define, _win) { 'use strict'; define( [ 'JC.common', 'JC.BaseMVC' ], function(){
/**
 * TableFreeze 表格固定指定列功能
 *
 *<p><b>require</b>:
 *   <a href="jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc.openjavascript.org/docs_api/classes/JC.TableFreeze.html' target='_blank'>API docs</a>
 *   | <a href='../../comps/TableFreeze/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本文件, 默认会自动初始化div为class="js_compTableFreeze"下的表格</h2>
 *<p>目前不支持带有tfooter的表格。如果表格带有tfooter，tfooter部分的内容会被清空</p>
 *<p></p>
 *
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt>freezeType = string</dt>
 *    <dd>
 *       声明表格列冻结的类型：
 *       <p><b>prev：</b>左边的列固定，其他滚动</p>
 *       <p><b>next：</b>右边的列固定，其他滚动</p>
 *       <p><b>both：</b>两边的列固定，其他滚动</p>
 *    </dd>
 *
 *    <dt>freezeCol = string</dt>
 *    <dd>
 *        声明表格要冻结的列数:
 *        <p>为<b>0：</b>全部滚动，不冻结</p>
 *        <p>为<b>列表数目：</b>全部冻结， 不滚动</p>
 *        <p>为<b>num,num：</b>freezeType为<b>both</b>时，第一个数字表示前面冻结的列数<br/>
 *          第二个数字表示后面冻结的列数。<br/>
 *           当两个数字加起来等于列数时，表示全部冻结，不会出现有滚动的列。
 *        </p>

 *    </dd>
 *</dl>   

 *
 * @namespace JC
 * @class TableFreeze
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-11-25
 * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
 * @example
        <script>
            JC.debug = true;
            JC.use('TableFreeze');
        </script>
        <dl class="defdl">
            <dt>TableFreeze example</dt>
            <dd>
                <dl>
                    <dd>
                        <div class="js_compTableFreeze" freezeType="prev" freezeCols="2"/>
                            <dl>
                                <dd>
                                    <table >
                                        <thead>
                                            <tr>
                                                <th > 
                                                    item0
                                                </th>
                                                <th >
                                                    item1
                                                </th>
                                                <th >
                                                    item2
                                                </th>
                                                <th >
                                                    item3
                                                </th>
                                                <th >
                                                    item4
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td rowspan="3">
                                                    col01
                                                </td>
                                                <td class="breaklw" >
                                                    我的我的我的我的我的我的我的我的我的
                                                </td>
                                                <td rowspan="2" colspan="2">
                                                    col02
                                                </td>
                                                
                                                <td>
                                                    col04
                                                </td>

                                            </tr>
                                            <tr>
                                                <td >
                                                    col11
                                                </td>
                                                
                                                <td >
                                                    col14
                                                </td>
                                            </tr>
                                              <tr>
                                               
                                                <td>
                                                    col21
                                                </td>
                                                 <td colspan="3">
                                                    col22
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    col30
                                                </td>
                                                <td rowspan="2">
                                                    col31
                                                </td>
                                                 <td>
                                                    col32
                                                </td>
                                                 <td>
                                                    col33
                                                </td>
                                                <td rowspan="2">
                                                    col34
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    col40
                                                </td>
                                                
                                                 <td>
                                                    col42
                                                </td>
                                                 <td>
                                                    col43
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </dd>
                            </dl>
                        </div>
                    <dd>
                </dl>
            </dd>
        </dl>
 */
;(function($){
    window.JC = window.JC || {log:function(){}};
    JC.TableFreeze = TableFreeze;
 
    function TableFreeze( _selector ){
        _selector && ( _selector = $( _selector ) );
        
        if( TableFreeze.getInstance( _selector ) ) return TableFreeze.getInstance( _selector );
        TableFreeze.getInstance( _selector, this );
        //JC.log( TableFreeze.Model._instanceName );
 
        this._model = new TableFreeze.Model( _selector );
        this._view = new TableFreeze.View( this._model );
 
        this._init();
 
        //JC.log( 'TableFreeze:', new Date().getTime() );
    }
    /**
     * 获取或设置 TableFreeze 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {TableFreezeInstance}
     */
    TableFreeze.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( TableFreeze.Model._instanceName, _setter );

        return _selector.data( TableFreeze.Model._instanceName );
    };
    /**
     * 初始化可识别的 TableFreeze 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of TableFreezeInstance}
     */
    TableFreeze.init = function ( _selector ) {
        var _r = [];
        
        _selector = $( _selector || document );

        if ( _selector && _selector.length ) {
            if ( _selector.hasClass('js_compTableFreeze') ) {
                _r.push( new TableFreeze(_selector) );
            } else {
                _selector.find('div.js_compTableFreeze').each( function() {
                    _r.push( new TableFreeze( this ) );
                });
            }
        }
        
        return _r;
    };

    TableFreeze.prototype = {
        _beforeInit: function () {
            //JC.log( 'TableFreeze _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
            var _p = this;

            _p.on( 'CTableFreezeUpdate', function( _evt ){
                _p._view.update();
            });
            
        }, 

        _inited: function () {
            //JC.log( 'TableFreeze _inited', new Date().getTime() );
           var _p = $(this);

           _p.trigger('CTableFreezeUpdate');

        },

        /**
         * 更新 TableFreeze 状态
         * @method update
         */
        update: function () {
            this._view.update();

            return this;

        },

        /**
         * resize时更新 TableFreeze 状态
         * @method fixHeight
        */
        fixHeight: function () {
            var _p = this,
                _wArr = _p._model.saveWidth,
                _newWArr = _p._model.selector().prop('offsetWidth'),
                _els = _p._model.selector().children('div.js-roll-table,div.js-fixed-table');

            _p._model.setHeight();

            if ( _wArr <= _newWArr ) {
                _els.find('tr').css('height', 'auto');
            }   

            _p._model.setHeight();   

            return this;       

        }

    };
 
    BaseMVC.buildModel( TableFreeze );
   
 
    TableFreeze.Model.prototype = {
        init: function () {
            var _p = this;

            this.sourceTable = this.selector().find('table').eq(0);
        },

        detachTable: function () {
            this.sourceTable.detach();
        },

        saveWidth: [],

        createTplBox: function () {
            var _p = this,
                _ftype = _p.freezeType(),
                _baseTpl = _p.baseTpl,
                _tpl,
                _fcols,
                _thead,
                _tbody,
                _thead2,
                _tbody2;

            switch( _ftype ) {
                case 'prev':
                    {
                        _fcols = parseInt( _p.freezeCols(), 10 ); 

                        _tpl = JC.f.printf(_baseTpl, 'js-fixed-table compTFPrevFixed') 
                             + JC.f.printf(_baseTpl, 'js-roll-table compTFPrevRoll');

                        _p.selector().append( _tpl );

                        //if ( !_p.hasFixedPXWidth() ) {
                            
                            _p.setWidth(0, _p.selector().find('div.js-fixed-table'), _fcols );
                            _p.setWidth(_fcols, _p.selector().find('div.js-roll-table'), _p.colNum()  );
                        
                        //}
                       
                        //_p.saveWidth = [_p.selector().find('div.js-fixed-table').prop('offsetWidth'),
                        //    _p.selector().find('div.js-roll-table').prop('offsetWidth')];


                        _thead = _p.selector().find('div.js-fixed-table thead').eq(0);
                        _tbody = _p.selector().find('div.js-fixed-table tbody').eq(0);
                        _thead2 = _p.selector().find('div.js-roll-table thead').eq(0);
                        _tbody2 = _p.selector().find('div.js-roll-table tbody').eq(0);

                        _p.createHdTpl( _thead, _fcols, 'prev', _thead2 );
                        _p.createBdTpl( _tbody, _fcols, 'prev', _tbody2 );

                        _p.createHdTpl( _thead2, _p.colNum() - _fcols );
                        _p.createBdTpl( _tbody2, _p.colNum() - _fcols );

                        break;
                    }
                   
                case 'last':
                    {
                        _fcols = parseInt( _p.freezeCols(), 10 );

                        _tpl = JC.f.printf(_baseTpl, 'js-roll-table compTFLastRoll') 
                             + JC.f.printf(_baseTpl, 'js-fixed-table compTFLastFixed');

                        _p.selector().append( _tpl );
                        
                        //if ( !_p.hasFixedPXWidth() ) {

                            _p.setWidth(0, _p.selector().find('div.js-roll-table'), _p.colNum() - _fcols  );
                            _p.setWidth(_p.colNum() - _fcols, _p.selector().find('div.js-fixed-table'), _p.colNum() );

                       // }
                        // _p.saveWidth = [_p.selector().find('div.js-roll-table').prop('offsetWidth'),
                        //     _p.selector().find('div.js-fixed-table').prop('offsetWidth')];

                        _thead = _p.selector().find('div.js-roll-table thead').eq(0);
                        _tbody = _p.selector().find('div.js-roll-table tbody').eq(0);
                        _thead2 = _p.selector().find('div.js-fixed-table thead').eq(0);
                        _tbody2 = _p.selector().find('div.js-fixed-table tbody').eq(0);

                        _p.createHdTpl( _thead, _p.colNum() - _fcols );
                        _p.createBdTpl( _tbody, _p.colNum() - _fcols );
                        
                        _p.createHdTpl( _thead2, _fcols );
                        _p.createBdTpl( _tbody2, _fcols );

                        break;
                    }  
                       
                case 'both':
                    {   
                        var _fcols2,
                            _thead3,
                            _tbody3;

                        _fcols = parseInt( _p.freezeCols()[0], 10 );
                        _fcols2 = parseInt( _p.freezeCols()[1], 10 );

                        _tpl = JC.f.printf(_baseTpl, 'js-fixed-table compTFBothFixed') 
                             + JC.f.printf(_baseTpl, 'js-roll-table compTFBothRoll')
                             + JC.f.printf(_baseTpl, 'js-fixed-table compTFBothFixed');

                        _p.selector().append( _tpl );

                        //if ( !_p.hasFixedPXWidth() ) {
                            
                            _p.setWidth(0, _p.selector().find('div.js-fixed-table').eq(0), _fcols  );
                            _p.setWidth(_fcols, _p.selector().find('div.js-roll-table'),  _fcols + _p.colNum() - _fcols - _fcols2 );
                            _p.setWidth(_fcols + _p.colNum() - _fcols - _fcols2, _p.selector().find('div.js-fixed-table').eq(1), _p.colNum() );

                        //}

                        _thead = _p.selector().find('div.js-fixed-table thead').eq(0);
                        _tbody = _p.selector().find('div.js-fixed-table tbody').eq(0);
                        _thead2 = _p.selector().find('div.js-roll-table thead').eq(0);
                        _tbody2 = _p.selector().find('div.js-roll-table tbody').eq(0);
                        _thead3 = _p.selector().find('div.js-fixed-table thead').eq(1);
                        _tbody3 = _p.selector().find('div.js-fixed-table tbody').eq(1);

                        _p.createHdTpl( _thead, _fcols );
                        _p.createBdTpl( _tbody, _fcols );
                        _p.createHdTpl( _thead2, _p.colNum() - _fcols - _fcols2 );
                        _p.createBdTpl( _tbody2, _fcols2 );
                        _p.createHdTpl( _thead3, _fcols2 );
                        _p.createBdTpl( _tbody3, _fcols2 );

                        break;
                    }
                   
            };

            _p.saveWidth = _p.selector().prop('offsetWidth');
            _p.setHeight();
           
        },

 

        createHdTpl: function ( _thead, _fc ) {
            var _p = this,
                _stpl = _p.sourceTable,
                _fragment = document.createDocumentFragment(),
                _$fragment = $(_fragment);

            _stpl.find('thead').eq(0).children('tr').each( function ( _ix, _item ) {

                var _cix = 0,
                    _tr,
                    _cloneTr = $(_item).get(0).cloneNode(false);

                _$fragment.append(_cloneTr);
                _tr = _$fragment.children('tr:last');

                $( _item ).children('td,th').each( function ( _six, _sitem ) {
                    
                    var _colspan = $(this).attr('colspan');

                    if ( _cix >= _fc ) {
                      return false;
                    }

                    $(this).appendTo( _tr );
                    
                    if ( typeof _colspan === 'undefined' ) {
                        _cix = _cix + 1;
                    } else {
                        _cix += parseInt(_colspan, 10);
                    }

                });
            
            });

            _$fragment.appendTo( _thead );   
        },

        createBdTpl: function ( _tbody, _fc ) {

            var _p = this,
                _stpl = _p.sourceTable,
                _row = {},
                _fragment = document.createDocumentFragment(),
                _$fragment = $(_fragment);

            _stpl.find('tbody').eq(0).children('tr').each( function ( _ix, _item ) {
                var _cloneTr = $(_item).get(0).cloneNode(false), 
                    _cix = 0,
                    _tr;

                _$fragment.append( _cloneTr );
                _tr = _$fragment.children('tr:last');

                $( _item ).children('td,th').each( function ( _six, _sitem ) {
                    
                    var _colspan = $(this).attr('colspan'),
                        _rowspan = $(this).attr('rowspan'),
                        _obj = {},
                        _key;
                    
                    if ( _cix >= _fc ) {
                      return false;
                    }

                    if ( typeof _rowspan != 'undefined' ) {
                        _rowspan = parseInt(_rowspan, 10);

                        _obj = {
                            six: _six,
                            rowspan: _rowspan
                        };

                        for ( var i = 1; i < _rowspan; i++ ) {
                            _row[(_ix + i) + '0'] = _obj;
                        }

                    }
                    
                    if ( typeof _colspan === 'undefined' ) {
                        _cix = _cix + 1;
                    } else {
                        _cix += parseInt(_colspan, 10);
                    }

                    _key = _ix + '0';

                    if ( _key in _row  ) {
                        _cix = _cix + 1;
                    }
                   
                    $(this).appendTo( _tr );

                });
               
            }); 

            _$fragment.appendTo( _tbody );  
            
        },

        setWidth: function (_i, _box, _cols ) {
            var _wArr = this.colWidth(),
                _w = 0,
                i;

            for (i = _i; i < _cols; i++ ) {
                _w = _w + _wArr[i];
            }

            _w = _w * 100 ;

            $(_box).css('width', _w + '%' );

        },

        setHeight: function (  ) {
            var _p = this,
                _ftype = _p.freezeType();

            var _leftTr = _p.selector().find('div.js-fixed-table').eq(0).find('table').eq(0).find('tr');

            _leftTr.each( function ( _ix, _item ) {
                var _rightTr = _p.selector().find('div.js-roll-table tr').eq( _ix ),
                    _midTr = _p.selector().find('div.js-fixed-table').eq(1).find('table').eq(0).find('tr').eq( _ix ),
                    _hArr = [],
                    _sp = $(_item),
                    _maxH;

                _hArr = [ _sp.prop('offsetHeight'), _rightTr.prop('offsetHeight') ];

                if ( _ftype == 'both' ) {
                    _hArr.push(_midTr.prop('offsetHeight'));
                }   

                _maxH = getMaxNum( _hArr );

                _sp.height(_maxH);
                _rightTr.height(_maxH);
                _midTr.height(_maxH);

            } );

        },

        freezeType: function () {
            var _p = this,
                _r;
                
            _r = _p.attrProp( _p.selector(), 'freezeType') || 'prev';

           // JC.log( _r );

            return _r;
        },
        
        freezeCols: function () {
            var _p = this,
                _r;

            _r = _p.attrProp( _p.selector(), 'freezeCols') || 1;

            _r = _r.split(',');

           // JC.log(_r);

            return _r;
        },

    
        tableWidth: function () {
            var _p = this,
                _w = _p.selector().prop('offsetWidth');

            return _w;
        },

        rowHeight: function () {
            var _p = this,
                _trs = _p.selector().find('table tr'),
                _h = [];

            _trs.each( function () {
                _h.push( $(this).prop('offsetHeight')  + 'px');
            } );

            return _h;
        },

        scrollWidth: function () {
            var _p = this;

            return _p.selector().attr('scrollWidth');
        },

        colWidth: function () {
            var _p = this,
                _ths = _p.selector().find('table>thead th'),
                _ths,
                _w = [];

            _ths.each( function () {
                _w.push( $(this).prop('offsetWidth') / _p.tableWidth() );
            } );

            return _w;
        },

        colNum: function () {
            var _p = this,
                _num = 0;

            _num = _p.selector().find('thead>tr>th').length ;

            return _num;
        },  

        rowNum: function () {
            var _p = this,
                _num = 0;

            _num = _p.selector().find('tbody>tr').length;

            return _num;
        },

        supportFreeze: function () {
            var _p = this,
                _r = true;

            if ( _p.freezeCols().length == 0 || ( _p.freezeCols().length == 1 && parseInt(_p.freezeCols(),10) == 0 ) ) {
                _r = false;
            }

            //JC.log("supportFreeze", _r);

            return _r;
        },

        supportScroll: function () {
            var _p = this,
                _c = 0,
                _r = true;

            $.each( _p.freezeCols(), function (_ix, _val) {
                _c = _c + parseInt(_val, 10);
            });

            if ( _c == _p.colNum() ) {
                _r = false;
            }

            //JC.log("supportScroll", _r, _c);

            return _r;
        },

        hasFixedPXWidth: function () {
            var _p = this,
                _pntW = _p.selector().get(0).style.width,
                _selfW = _p.selector().find('table').eq(0).attr('width') 
                    || _p.selector().find('table').eq(0).get(0).style.width,
                _childrenW = _p.tdThHasFixedPXWidth(),
                _tag = true;

            if ( _pntW && /%/.test( _pntW ) ) {
                
                if ( !_selfW || ( _selfW && /%/.test(_selfW) )  ) {
                    _tag = false;
                    return false;
                }
            }

            if ( !_selfW || ( _selfW && /%/.test(_selfW) )  ) {
                _tag = false;
                return false;
            }   

            if ( !_childrenW ) {

                _tag = false;
                return false;
            }

            //console.log("_tag", _tag);

            return true;
        },

        tdThHasFixedPXWidth: function () {
            var _p = this,
                _children = _p.selector().find('table').eq(0).find('tr').eq(0).find('th,td');

            _children.each( function () {
                var _sp = $(this),
                    _w = _sp.attr('width') || _sp.get(0).style.width;

                if ( !_w ) {
                    
                    return false;
                }

                if ( _w && /%/.test(_w) ) {
                    
                    return false;
                }

            } );

            return true;

        },

        tTpl: function () {
            var _table,
                _thead,
                _tbody,
                _p = this;

            _table = _p.selector().find('table').get(0).cloneNode(false);
            _thead = _p.selector().find('thead').get(0).cloneNode(false);
            _tbody = _p.selector().find('tbody').get(0).cloneNode(false);
            
            return;
        },

        baseTpl: '<div class="{0}">'
                +       '<table>'
                +           '<thead>'
                +           '</thead>'
                +            '<tbody>'
                +            '</tbody>'
                +         '</table>'
                +   '</div>'
    };
 
    BaseMVC.buildView( TableFreeze );
    TableFreeze.View.prototype = {
        init: function () {
            var _p = this;
        },

        update: function () {
            //JC.log("View update here");
            var _p = this;

            
            if ( !_p._model.supportScroll() ) {
                return;
            } 

            if ( !_p._model.supportFreeze() ) {
                _p._model.selector().css({'overflow-x': 'scroll'})
                    .addClass('compTFAllRoll');
                _p._model.selector().children('table').css('width','110%');
                return;
            }

            _p._model.createTplBox();
            _p._model.detachTable();
        }


 
    };
 
    BaseMVC.build( TableFreeze );
    

    $(document).ready( function () {
        var _insAr = 0;
        TableFreeze.autoInit
            && ( _insAr = TableFreeze.init() )
            ;
    });

    $(window).on( 'resize', function(){
        $( 'div.js_compTableFreeze' ).each( function () {
            var _ins = TableFreeze.getInstance( $( this ) );
            
            _ins && _ins.fixHeight();
           
        });
    });

    function getMaxNum( _r ) {
        var i,
            _l = _r.length,
            _t = _r[0];

        for ( i = 1; i < _l; i++ ) {
            if ( _r[i] > _t ) {
                _t = _r[i];
            }
        }

        return _t;

    }
 
}(jQuery));
    return JC.TableFreeze;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
