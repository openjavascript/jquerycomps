 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * TableFreeze 表格固定指定列功能
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.TableFreeze.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.TableFreeze/0.1/_demo' target='_blank'>demo link</a></p>
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
 *
 *    <dt>scrollWidth = num</dt>
 *    <dd>
 *        声明表格滚动部分的宽度，默认120%
 *    </dd>
 *
 *    <dt>needHoverClass = true|false</dt>
 *    <dd>
 *        声明表格行是否需要鼠标hover高亮效果:
 *        <p>默认值为true</p>
 *    </dd>
 *
 *    <dt>hoverClass = string</dt>
 *    <dd>
 *        声明表格行高亮的className:
 *        <p>默认值为compTFHover</p>
 *    </dd>
 *
 *    <dt>beforeCreateTableCallback = function</dt>
 *    <dd>
 *        表格创建前, 触发的回调, <b>window 变量域</b>
<pre>function beforeCreateTableCallback( _selector ){
    var _ins = this;
    JC.log( 'beforeCreateTableCallback', new Date().getTime() );
}</pre>
 *    </dd>
 *
 *    <dt>afterCreateTableCallback = function</dt>
 *    <dd>
 *        表格创建后, 触发的回调, <b>window 变量域</b>
<pre>function afterCreateTableCallback( _selector ){
    var _ins = this;
    JC.log( 'afterCreateTableCallback', new Date().getTime() );
}</pre>
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
                        <div class="js_compTableFreeze" freezeType="prev" freezeCols="2" />
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
    JC.TableFreeze = TableFreeze;
    JC.f.addAutoInit( TableFreeze );
 
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

        if ( _selector.length ) {
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

    BaseMVC.build( TableFreeze );

    JC.f.extendObject( TableFreeze.prototype, {
        _beforeInit: function () {
            //JC.log( 'TableFreeze _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
            var _p = this;

            _p.on( 'CTableFreezeUpdate', function( _evt ){
                _p._model.beforeCreateTableCallback()
                    && _p._model.beforeCreateTableCallback().call( _p, _p.selector() );
                
                _p._view.update();

                _p._model.afterCreateTableCallback()
                    && _p._model.afterCreateTableCallback().call( _p, _p.selector() );
                
                if ( _p._model.needHoverClass() ) {
                    var _hover = _p._model.hoverClass();

                    if ( !_p._model.supportFreeze() || !_p._model.supportScroll() ) {
                        _p._model.selector().find('table>tbody>tr')
                            .on('mouseenter', function () {
                                $(this).addClass( _hover );
                            })
                            .on('mouseleave', function () {
                                $(this).removeClass( _hover );
                            });
                    } else {

                        var _trs = 'td.compTFEextraTd>div>table>tbody>tr',
                            _brother = 'td.compTFEextraTd>div>table>tbody>tr.',
                            _el;

                        $(document).undelegate(_trs, 'mouseenter')
                            .delegate(_trs, 'mouseenter', function () {
                                var _sp = $(this),
                                    _pnt = JC.f.getJqParent(_sp, 'table.compTFEextraTable');
                                
                                _el = _pnt.find( _brother + _sp.data('linktr') ).addClass(_hover);
                              
                            }).undelegate(_trs, 'mouseleave')
                            .delegate(_trs, 'mouseleave', function () {
                                if ( _el && _el.length > 0 ) {
                                    _el.removeClass(_hover);
                                }
                            });
                    }

                }

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
                _wArr = TableFreeze.Model.saveWidth,
                _selector = _p._model.selector(),
                _newWArr = _selector.prop('offsetWidth'),
                _els = _selector.find('div.js-roll-table,div.js-fixed-table'),
                _scrollTable = _selector.find('div.js-roll-table'),
                _fixedTable = _selector.find('div.js-fixed-table'),
                _fixedWidth = 0;

            TableFreeze.Model.windowWidth = $(window).width();

            _p._model.setHeight();
            
            if ( _wArr <= _newWArr ) {
                
                _els.each( function () {
                    $(this).find('tr').height('auto');
                } );

                _p._model.setHeight();
                
            }   


            _fixedTable.each( function () {
                _fixedWidth += $(this).parent('td').prop('offsetWidth');
            } );

            _scrollTable.css('width', _newWArr - _fixedWidth);
            _p._model.fixWidth();

            //$('#t21').append('<p>' +  _newWArr + '   ' + (_newWArr - _fixedWidth)  + '</p>');
            return this;       

        }

    });
 
    TableFreeze.Model._instanceName = "TableFreeze";
    TableFreeze.Model.saveWidth = 0;
    TableFreeze.Model.windowWidth = 0;
   
    JC.f.extendObject( TableFreeze.Model.prototype, {
        init: function () {
            var _p = this;

            this.sourceTable = this.selector().find('table').eq(0);
        },

        detachTable: function () {
            //this.sourceTable.detach();
            this.sourceTable.remove();
        },

        linkTpl: function () {
            var _p = this,
                _trs;

            if ( _p.selector().find('table>tbody').length > 0 ) {
                _trs = _p.selector().find('table>tbody>tr');
            } else {
                _trs = _p.selector().find('table>tr');
            }

            _trs.each( function ( _ix ) {
                $(this).attr('data-linktr', 'CTF' + _ix);
            });
            
        },

        createTplBox: function () {
            var _p = this,
                _ftype = _p.freezeType(),
                _baseTpl = _p.tTpl(),
                _selector = _p.selector(),
                _colNum = _p.colNum(),
                _tpl ,
                _fcols,
                _thead,
                _tbody,
                _thead2,
                _tbody2;

            var _pnt1,
                _pnt2,
                _pnt3,
                _forePnt;

            switch( _ftype ) {
                case 'prev':
                    {
                        _fcols = parseInt( _p.freezeCols(), 10 ); 

                        _tpl = JC.f.printf(_baseTpl, 
                            'js-fixed-table compTFPrevFixed', 
                            'js-roll-table compTFPrevRoll' );
                        _selector.append( _tpl );

                        _pnt1 = JC.f.getJqParent(_selector.find('.js-fixed-table'), '.compTFEextraTd');
                        _pnt2 = JC.f.getJqParent(_selector.find('.js-roll-table'), '.compTFEextraTd');
                        
                        //if ( !_p.hasFixedPXWidth() ) {
                            _p.setWidth(0, _pnt1, _fcols, _pnt2);
                            //_p.setWidth(_fcols, _pnt2, _colNum); 
                        //}

                        _thead = _selector.find('.js-fixed-table>table>thead');
                        _tbody = _selector.find('.js-fixed-table>table>tbody');
                        _thead2 = _selector.find('.js-roll-table>table>thead');
                        _tbody2 = _selector.find('.js-roll-table>table>tbody');

                        _p.createHdTpl( _thead, _fcols );
                        _p.createBdTpl( _tbody, _fcols );

                        _p.createHdTpl( _thead2, _colNum - _fcols );
                        _p.createBdTpl( _tbody2, _colNum - _fcols );

                        break;
                    }
                   
                case 'last':
                    {
                        _fcols = parseInt( _p.freezeCols(), 10 );

                        _tpl = JC.f.printf(_baseTpl, 
                            'js-roll-table compTFLastRoll', 
                            'js-fixed-table compTFLastFixed')
                        _selector.append( _tpl );

                        _pnt1 = JC.f.getJqParent(_selector.find('div.js-roll-table'), 'td.compTFEextraTd');
                        _pnt2 = JC.f.getJqParent(_selector.find('div.js-fixed-table'), 'td.compTFEextraTd');

                        //if ( !_p.hasFixedPXWidth() ) {
                            //_p.setWidth(0, _pnt1, _colNum - _fcols  );
                            _p.setWidth(_colNum - _fcols, _pnt2, _colNum, _pnt1 );
                        //}

                        _thead = _selector.find('div.js-roll-table>table>thead');
                        _tbody = _selector.find('div.js-roll-table>table>tbody');
                        _thead2 = _selector.find('div.js-fixed-table>table>thead');
                        _tbody2 = _selector.find('div.js-fixed-table>table>tbody');

                        _p.createHdTpl( _thead, _colNum - _fcols );
                        _p.createBdTpl( _tbody, _colNum - _fcols );
                        
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

                        _tpl = JC.f.printf(_baseTpl, 
                                'js-fixed-table compTFBothFixed',
                                'js-roll-table compTFBothRoll',
                                'js-fixed-table compTFBothFixed');
                        _selector.append( _tpl );

                        _pnt1 = JC.f.getJqParent(_selector.find('div.js-fixed-table:eq(0)'), 'td.compTFEextraTd');
                        _pnt2 = JC.f.getJqParent(_selector.find('div.js-roll-table'), 'td.compTFEextraTd');
                        _pnt3 = JC.f.getJqParent(_selector.find('div.js-fixed-table:eq(1)'), 'td.compTFEextraTd');

                        //if ( !_p.hasFixedPXWidth() ) {
                            _p.setWidth(0, _pnt1, _fcols  );
                            _p.setWidth(_fcols, _pnt2,  _fcols + _colNum - _fcols - _fcols2 );
                            _p.setWidth(_fcols + _colNum - _fcols - _fcols2, _pnt3, _colNum );
                        //}

                        _thead = _selector.find('div.js-fixed-table:eq(0)>table>thead');
                        _tbody = _selector.find('div.js-fixed-table:eq(0)>table>tbody');
                        _thead2 = _selector.find('div.js-roll-table>table>thead');
                        _tbody2 = _selector.find('div.js-roll-table>table>tbody');
                        _thead3 = _selector.find('div.js-fixed-table:eq(1)>table>thead');
                        _tbody3 = _selector.find('div.js-fixed-table:eq(1)>table>tbody');

                        _p.createHdTpl( _thead, _fcols );
                        _p.createBdTpl( _tbody, _fcols );
                        _p.createHdTpl( _thead2, _colNum - _fcols - _fcols2 );
                        _p.createBdTpl( _tbody2, _colNum - _fcols - _fcols2 );
                        _p.createHdTpl( _thead3, _fcols2 );
                        _p.createBdTpl( _tbody3, _fcols2 );

                        break;
                    }
                   
            }

           // _forePnt = JC.f.getJqParent(_pnt1, 'table');
            // if ( _p.hasFixedPXWidth() ) {
            //     _forePnt.css('width', _selector.find('table').prop('offsetWidth') );
            // }
            _selector.find('div.js-roll-table>table').width(_p.scrollwidth());
            _p.setHeight();
           
        },

        createHdTpl: function ( _thead, _fc ) {
            var _p = this,
                _stpl = _p.sourceTable,
                _fragment = document.createDocumentFragment(),
                _$fragment = $(_fragment);

            _stpl.find('thead:eq(0)>tr').each( function ( _ix, _item ) {

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
                _strs = _stpl.find('tbody:eq(0)>tr'),
                _row = {},
                _fragment = document.createDocumentFragment(),
                _$fragment = $(_fragment);

            _strs.each( function ( _ix, _item ) {
                var _sp = $(this),
                    _cloneTr = _sp.get(0).cloneNode(false),
                    _stds =  _sp.children('td,th'),
                    _cix = 0,
                    _tr;

                $(_cloneTr).addClass('CTF CTF' + _ix).removeAttr('id');    
                _$fragment.append( _cloneTr );
                _tr = _$fragment.children('tr:last');

                _stds.each( function ( _six, _sitem ) {
                    
                    var _sp = $(this), 
                        _colspan = _sp.attr('colspan'),
                        _rowspan = _sp.attr('rowspan'),
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
                            if ( _six == 0 ) {
                                _row[(_ix + i) + ( _six + 1 ).toString()] = _obj;
                            } else {
                                _row[(_ix + i) + _six.toString()] = _obj;
                            }
                        }

                    }
                    
                    if ( typeof _colspan === 'undefined' ) {
                        _cix = _cix + 1;
                    } else {
                        _cix += parseInt(_colspan, 10);
                    }

                    _key = _ix + (_six + 1).toString();
                    
                    if ( _key in _row  ) {
                        _cix = _cix + 1;
                    }

                    _sp.appendTo( _tr );

                });
             
            }); 

            _$fragment.appendTo( _tbody );  
            
        },

        setWidth: function (_i, _box, _cols, _scrollBox ) {
            var _wArr = this.colWidth(),
                _w = 0,
                i,
                _totalWidth = this.tableWidth(),
                _percentW = 0,
                _scrollBox = $(_scrollBox);

            for (i = _i; i < _cols; i++ ) {
                _w = _w + _wArr[i];

            }
            _w = _w + 1;
            _percentW  = _w / _totalWidth;
            _percentW  = _percentW  * 100;

           $(_box).css('width', _percentW  + '%');
            
            if ( _scrollBox.length ) {
                _scrollBox.css('width', (100 - _percentW ) + '%' )
                .find('>div').css('width', _totalWidth - _w - 1);
            }
    
        },

        fixWidth: function () {
            var _initWidth = TableFreeze.Model.windowWidth,
                _winWidth = $(window).width(),
                _scrollBox = this.selector().find('.js-roll-table'),
                _w = _scrollBox.width();

            if ( _initWidth < _winWidth ) {
                _w += _winWidth - _initWidth;
                _scrollBox.width( _w ); 
                
            } else {
                _scrollBox.width( _w ); 
            }

            //$('#t21').append('update' + 'TableFreeze.Model.windowWidth' + _initWidth + ',   windowWidth' + _winWidth  );

        },

        setHeight: function () {
            var _p = this,
                _ftype = _p.freezeType(),
                _leftTr = _p.selector().find('div.js-fixed-table:eq(0)>table>thead>tr,div.js-fixed-table:eq(0)>table>tbody>tr'),
                _rightTr = _p.selector().find('div.js-roll-table>table>thead>tr,div.js-roll-table>table>tbody>tr'),
                _midTr = _p.selector().find('div.js-fixed-table:eq(1)>table>thead>tr,div.js-fixed-table:eq(1)>table>tbody>tr');

            _leftTr.each( function ( _ix, _item ) {
                var _rightTrx = _rightTr.eq( _ix ),
                    _midTrx = _midTr.eq( _ix ),
                    _sp = $(_item),
                    _maxH;

                _maxH = Math.max( _sp.prop('offsetHeight'), _rightTrx.prop('offsetHeight') );

                if ( _ftype == 'both' ) {
                    _maxH = Math.max( _maxH, _midTrx.prop('offsetHeight') );
                }   

                _sp.height(_maxH);
                _rightTrx.height(_maxH);
                
                if ( _ftype == 'both' ) {
                    _midTrx.height(_maxH);
                }
                
            } );

        },

        freezeType: function () {
            var _p = this,
                _r;
                
            _r = _p.attrProp( _p.selector(), 'freezeType') || 'prev';

            return _r;
        },
        
        freezeCols: function () {
            var _p = this,
                _r;

            _r = _p.attrProp( _p.selector(), 'freezeCols') || 1;
            _r = _r.split(',');

            return _r;
        },

        scrollwidth: function () {
            var _r = this.attrProp('scrollwidth');

            !_r && ( _r = '120%' );

            return _r;
        },

        needHoverClass: function () {
            var _r = this.boolProp( this.selector().find('table').eq(0), 'needHoverClass' );

            !_r && ( _r = true );

            return _r;
        },

        hoverClass: function () {
            var _r = this.attrProp( this.selector().find('table').eq(0), 'hoverClass' );

            !_r && ( _r = 'compTFHover' );

            return _r;

        },

        tableWidth: function () {
            var _p = this,
                _w = _p.selector().width(),
                _pnt = _p.selector().parent();

            /**
             * IE6下，当表格的宽度超出了实际可用宽度时，其父节点的宽度会跟随内容的宽度
            */
            while (1) {

                if ( _pnt && _pnt.prop('nodeName').toUpperCase() === 'BODY' ) break;

                if ( _pnt.width() < _w ) {
                    _w = _pnt.width();
                    break;
                }

                _pnt = _pnt.parent();

            }

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
                _w = [],
                _totalWidth = _p.tableWidth();

            _ths.each( function () {
                //_w.push( $(this).prop('offsetWidth') / _totalWidth );
                _w.push( $(this).prop('offsetWidth') );
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

            if ( _p.freezeCols().length == 0 
                || ( _p.freezeCols().length == 1 
                    && ( parseInt(_p.freezeCols(),10) == 0 ) 
                    || parseInt(_p.freezeCols(),10) > _p.colNum() 
                    )
                || ( _p.freezeCols().length == 2
                    && ( parseInt(_p.freezeCols()[0], 10) + parseInt(_p.freezeCols()[1], 10) >= _p.colNum() ) 
                    ) 
                ) {
                _r = false;
            }

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
                    return false;
                }
            }

            if ( !_selfW || ( _selfW && /%/.test(_selfW) )  ) {
                return false;
            }   

            if ( !_childrenW ) {
                return false;
            }

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
            var _p = this,
                _table,
                _thead,
                _tbody,
                _tpl;

            _table = _p.selector().find('table').get(0).cloneNode(false);
            _thead = _p.selector().find('thead').get(0).cloneNode(false);
            _tbody = _p.selector().find('tbody').get(0).cloneNode(false);

            $(_thead).appendTo($(_table));
            $(_tbody).appendTo($(_table));

            $(_table).width('100%');

            switch ( _p.freezeType() ) {
                case 'prev':
                case 'last':
                    _tpl = '<table class="compTFEextraTable"><tr><td class="compTFEextraTd"><div class="{0}" style="width:100%;">'
                        + _table.outerHTML
                        + '</div></td><td class="compTFEextraTd"><div class="{1}" style="width:100%;">'
                        + _table.outerHTML
                        + '</div></td>'
                        + '</tr></table>';
                    // _tpl = '<div class="compTFEextraTable">'
                    //     + '<div class="compTFEextraTd"><div class="{0}" style="width:100%;">' + _table.outerHTML + '</div></div>'
                    //     + '<div class="compTFEextraTd"><div class="{1}" style="width:100%;">' + _table.outerHTML + ' </div></div>'
                    //     + '</div>'
                    break;
                case 'both':
                    _tpl = '<table class="compTFEextraTable"><tr><td class="compTFEextraTd"><div class="{0}" style="width:100%;">'
                        + _table.outerHTML
                        + '</div></td><td class="compTFEextraTd"><div class="{1}" style="width:100%;">'
                        + _table.outerHTML
                        + '</div></td><td class="compTFEextraTd"><div class="{2}" style="width:100%;">'
                        + _table.outerHTML
                        + '</div></td></tr></table>'
                    break;
            }

            return _tpl;
        },


        /**
         * TableFreeze调用前的回调
         */
        beforeCreateTableCallback: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = 'beforeCreateTableCallback';

            return _p.callbackProp(_selector, _key);
        },

        /**
         * TableFreeze调用后的回调
         */
        afterCreateTableCallback: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = 'afterCreateTableCallback';

            return _p.callbackProp(_selector, _key);
        },

        baseTpl: '<div class="{0}" style="width:100%;">'
                +       '<table style="padding:0;margin:0;">'
                +           '<thead>'
                +           '</thead>'
                +            '<tbody>'
                +            '</tbody>'
                +         '</table>'
                +   '</div>'
    });
 
    JC.f.extendObject( TableFreeze.View.prototype, {
        init: function () {
            var _p = this;

            _p._model.linkTpl();
        },

        update: function () {
            var _p = this;
            
            if ( !_p._model.supportScroll() ) {
                return;
            } 

            if ( !_p._model.supportFreeze() ) {
                _p._model.selector().css({'overflow-x': 'scroll'})
                    .addClass('compTFAllRoll')
                        .children('table').css('width', _p._model.scrollwidth() );
                
                return;
            }

            _p._model.createTplBox();
            _p._model.detachTable();
            _p._model.fixWidth();

        }

    });

    $(document).ready( function () {
        //$('#t21').append( 'document.width' + $(document).width() + ',  window.width' + $(window).width() );
        
        var _insAr = 0,
            _win= $( window );

        TableFreeze.Model.windowWidth = _win.width();
        TableFreeze.autoInit
            && ( _insAr = TableFreeze.init() )
            ;

        _win.on( 'resize', CTFResize );

        function CTFResize(){

            _win.off( 'resize', CTFResize );

            $( 'div.js_compTableFreeze' ).each( function () {
                var _ins = TableFreeze.getInstance( $( this ) );
                _ins && _ins.fixHeight() ;
                TableFreeze.Model.saveWidth = _ins._model.tableWidth();


            });

            _win.data( 'CTFResizeTimeout' ) && clearTimeout( _win.data( 'CTFResizeTimeout' ) );
            _win.data( 'CTFResizeTimeout', setTimeout( function(){
                _win.off( 'resize', CTFResize );
                _win.on( 'resize', CTFResize );
            }, 200 ) );

        }

    });
 
    return JC.TableFreeze;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
