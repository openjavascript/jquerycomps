 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){

//Todo: IE下resize，缩小窗口时tr的高度每一行隔了一像素。
//Todo: 鼠标hover效果性能优化

/**
 * TableFreeze 表格固定指定列功能
 *
 *<p><b>require</b>:
 *   <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.TableFreeze.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.TableFreeze/0.2/_demo' target='_blank'>demo link</a></p>
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
 *    <dt>alternateClass = string</dt>
 *    <dd>
 *        声明表格索引值为奇数行的背景色的className: （表格行隔行换色）
 *        <p>如果为空则不指定隔行背景色</p>
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
    JC.f.addAutoInit && JC.f.addAutoInit( TableFreeze );
 
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
            var _p = this,
                _table = _p._model.selector().find('>table');
            /**
             *为了解决ie6下表格的宽度超出父容器的宽度，父容器的宽度会跟随表格的宽度
            */
            _p._model.alternateClass() && (_table.find('>tbody>tr:odd').addClass(_p._model.alternateClass()));
            _p._model.sourceTable = _table.clone();
            _p._model.initcolnumWidth = _p._model.colnumWidth(_table);
            _p._model.needProcess() && _table.detach();
            _p._model.initWidth = _p._model.selector().width();
            _p._model.tempWidth = _p._model.initWidth;
        },

        _initHanlderEvent: function () {
            var _p = this,
                _hoverClass;

            _p._model.beforeCreateTableCallback()
                    && _p._model.beforeCreateTableCallback().call( _p, _p.selector() );
                    
            _p._view.update();

            _p._model.afterCreateTableCallback()
                    && _p._model.afterCreateTableCallback().call( _p, _p.selector() );

            if ( _p._model.needHoverClass() ) {
                _p._model.selector().addClass('needHoverClass');
                
                if ( _p._model.needProcess() ) {
                    //_hoverClass = _p._model.hoverClass();
                    _hoverClass = "compTFHover";
                    //.js-fixed-table>table>tbody>tr,.js-roll-table>table>tbody>tr
                    $(document)
                        .delegate('tbody .CTF', 'mouseenter', function () {
                            var _sp = $(this),
                                _item = 'tbody .' + _sp.attr('data-ctf'),
                                _trs = _sp.parents('.js_compTableFreeze').find(_item);
                                
                            _trs.addClass(_hoverClass).attr('status', '1'); 

                        } )
                        .delegate('tbody .CTF', 'mouseleave', function () {
                            var _sp = $(this),
                                _item = 'tbody .' + _sp.attr('data-ctf'),
                                _trs = _sp.parents('.js_compTableFreeze').find(_item);

                            _trs.removeClass(_hoverClass); 
                            
                        });

                }

            }
        }, 

        _inited: function () {
            JC.log('TableFreeze inited', new Date().getTime());
        },

        update: function () {
            var _p = this,
                _selector = _p._model.selector(),
                _currentWidth = _selector.width(),
                _trs = _selector.find('.js-fixed-table>table>thead>tr,.js-fixed-table>table>tbody>tr,.js-roll-table>table>thead>tr,.js-roll-table>table>tbody>tr');

            ( _currentWidth > _p._model.tempWidth ) && _trs.height('auto');
            _p._view.fixHeight();
        }
        
    });
 
    TableFreeze.Model._instanceName = "TableFreeze";
   
    JC.f.extendObject( TableFreeze.Model.prototype, {
        init: function () {
        },

        sourceTable: '',

        initcolnumWidth: [],

        initWidth: 0,

        tempWidth: 0,
        
        /**
         * 冻结类型:prev, both, last; 默认为prev
         */
        freezeType: function () {
            var _r = this.stringProp('freezeType') || 'prev' 

            !( _r === 'prev' || _r === 'both' || _r === 'last' ) && ( _r = 'prev' );

            return _r;
        },

        /**
         * 冻结列数:num,num 默认为1
         */
        freezeCols: function () {
            var _p = this,
                _r = _p.attrProp('freezeCols'),
                _type = _p.freezeType(),
                _t = [];

            if ( !_r ) {
                ( _type !== 'both' ) && ( _r = 1 );
                ( _type === 'both' ) && ( _r =  [1, 1] );
               return _r;
            }
            
            _t = _r.split(',');
            _t[0] = + _t[0];
            _t[1] = + _t[1];

            if ( _type === 'both' ) {
                if ( _t[0] === 0 && _t[1] === 0 ) {
                    _r = 0;
                } else {
                    _r = _t.slice();
                }
            } else {
                _r = _t[0];
            }

            return _r
        },

        /**
         * 滚动区域的宽度默认120%
         */
        scrollWidth: function () {
            var _r = this.attrProp('scrollWidth');

            !_r && ( _r = '120%' );

            return _r;
        },

        /**
         * tr 是否需要hover效果,默认为true
         */
        needHoverClass: function () {
            var _r = this.boolProp('needHoverClass');

            ( typeof _r === 'undefined' ) && ( _r = true );

            return _r;
        },
        
        // hoverClass: function () {
        //     var _r = this.attrProp('hoverClass');

        //     ( !_r ) && ( _r = 'compTFHover');

        //     return _r;
        // },

        /**
         * tr的隔行换色
         */
        alternateClass: function () {
            var _r = this.attrProp('alternateClass');

            return _r;
        },

        colnum: function () {
            var _table = this.sourceTable,
                _tr = _table.find('tr:eq(0)'),
                _col = _tr.find('>th, >td'),
                _r = _col.length;

            _col.each( function () {
                var _sp = $(this),
                    _colspan = _sp.prop('colspan');

                ( _sp.prop('colspan') ) && ( _r += ( _colspan - 1 ) );
                
            } );

            return _r;
        },

        colnumWidth: function ( _table ) {
            var _tr = _table.find('tr:eq(0)'),
                _col = _tr.find('>th, >td'),
                _r = [];

            _col.each( function () {
                _r.push( $(this).prop('offsetWidth') );
            } );

            return _r;
        },

        trElement: function ( _table ) {
            var _thead = _table.find('>thead'),
                _tbody = _table.find('>tbody'),
                _theadTr,
                _tbodyTr;

            if ( _thead.length ) {
                _theadTr = _thead.find('>tr');
            } else {
                _theadTr = _table.find('>tr:eq(0)');
            }

            if ( _tbody.length ) {
                _tbodyTr = _tbody.find('>tr');
            } else {
                _tbodyTr = _table.find('>tr:gt(0)');
            }

            return {
                theadTr: _theadTr,
                tbodyTr: _tbodyTr
            }

        },

        needProcess: function () {
            
            //Todo: 正则判断freezeCols的值是否合法

            var _p = this,
                _freezeCols = _p.freezeCols(),
                _freezeType = _p.freezeType(),
                _selector = _p.selector(),
                //_table = _p.selector().find('>table'),
                _table = _p.sourceTable,
                _r = true;

            if ( _table.find('tr').length === 0 ) {
                return false;
            }

            //全部滚动，在这里处理滚动有耦合
            if ( _freezeCols === 0 ) {
                _selector.css('overflow-x', 'scroll')
                    .find('>table').css('width', _p.scrollWidth());
                return false;
            }

            //全部冻结
            if ( _freezeType === 'both' && ( _freezeCols[0] + _freezeCols[1] >= _p.colnum() ) ) {
                return false;
            }

            return _r;
        },

        layout: function ( _freezeType ) {
            var _sourceTable = this.sourceTable,
                _tableObj = $(_sourceTable[0].cloneNode(false)),
                _theadObj = $(_sourceTable.find('thead')[0].cloneNode(false)),
                _tbodyObj = $(_sourceTable.find('tbody')[0].cloneNode(false)),
                _leftClass = '',
                _rightClass = '',
                _midClass = '',
                _secondTempTpl,
                _thirdTempTpl,
                _tpl;

            switch ( _freezeType ) {
                case 'last':
                    _leftClass = "js-roll-table compTFLastRoll";
                    _rightClass = "js-fixed-table compTFLastFixed";
                    break;

                case 'both':
                    _leftClass = "js-fixed-table compTFBothFixed";
                    _rightClass = "js-fixed-table compTFBothFixed";
                    _midClass = "js-roll-table compTFBothRoll";
                    break;

                case 'prev':
                default:
                    _leftClass = "js-fixed-table compTFPrevFixed";
                    _rightClass = "js-roll-table compTFPrevRoll";
            }
            
            _theadObj.html('{0}').appendTo(_tableObj);
            _tbodyObj.html('{1}').appendTo(_tableObj);
            _secondTempTpl = _tableObj.clone().find('thead').html("{2}").end().find('tbody').html("{3}").end();
            if ( !_midClass ) {
                _tpl = '<div class="' + _leftClass + '">' + _tableObj[0].outerHTML +'</div>'
                     + '<div class="' + _rightClass + '">' + _secondTempTpl[0].outerHTML + '</div>';
            } else {
                _thirdTempTpl = _tableObj.clone().find('thead').html("{4}").end().find('tbody').html("{5}").end();
                _tpl = '<div class="' + _leftClass + '">' + _tableObj[0].outerHTML + '</div>'
                     + '<div class="' + _midClass + '">' + _secondTempTpl[0].outerHTML + '</div>'
                     + '<div class="' + _rightClass + '">' + _thirdTempTpl[0].outerHTML +  '</div>';
            }
            
            return _tpl;
        },

        creatTpl: function () {
            var _p = this,
                _table = _p.sourceTable,
                _freezeType = _p.freezeType(),
                _freezeCols = _p.freezeCols(),
                _colNum = _p.colnum(),
                _trElement = _p.trElement(_table),
                _theadTr = _trElement.theadTr,
                _tbodyTr = _trElement.tbodyTr,
                _headerTr = _p.getTpl(_freezeType, _freezeCols, _theadTr, _colNum),
                _bodyTr = _p.getTpl(_freezeType, _freezeCols, _tbodyTr, _colNum),
                _layout = _p.layout(_freezeType),
                _tpl;

            switch ( _freezeType ) {
                case 'both': 
                    {   
                        _tpl = JC.f.printf(_layout, _headerTr.leftTr, _bodyTr.leftTr, _headerTr.midTr, 
                            _bodyTr.midTr, _headerTr.rightTr, _bodyTr.rightTr);
                        break;
                    }
                case 'last':
                case 'prev':
                    {   
                        _tpl = JC.f.printf(_layout, _headerTr.leftTr, _bodyTr.leftTr, 
                            _headerTr.rightTr, _bodyTr.rightTr);
                        break;
                    }
            }

            _p.selector().append(_tpl);
            
        },
    
        getTpl: function ( _freezeType, _freezeCols, _trs, _colNum ) {
           
            var _tpl,
                _sLeftTpl = [],
                _sMidTpl = [],
                _sRightTpl = [],
                _col = _freezeCols,
                _rcol = 0,
                _mcol = 0,
                _p = this;

            switch (_freezeType) {
                case 'prev':
                    _sLeftTpl = _p.getTr( _trs,  _col );
                    _sRightTpl = _p.getTr( _trs, _colNum - _col );
                    break;
                case 'last':
                    _sLeftTpl = _p.getTr( _trs,  _colNum - _col );
                    _sRightTpl = _p.getTr( _trs, _col );
                    break;
                case 'both':
                    _col = _freezeCols[0];
                    _rcol = _freezeCols[1];
                    _mcol = _colNum - _col - _rcol;
                    _sLeftTpl = _p.getTr( _trs,  _col );
                    _sMidTpl =  _p.getTr( _trs,  _mcol );
                    _sRightTpl = _p.getTr( _trs, _rcol );
                    break;
            }

            _tpl = {
                leftTr: _sLeftTpl.join(''),
                midTr: _sMidTpl.join(''),
                rightTr: _sRightTpl.join('')
            };

            return _tpl;
        },

        getTr: function ( _trs, _col ) {
           
            var _row = {},
                _temp = [],
                _p = this;
            _trs.each( function (_ix) {
                var _sp = $(this),
                    _clasname = 'CTF CTF' + _ix,
                    _leftTr = _sp[0].cloneNode(false),
                    _rightTr = _sp[0].cloneNode(false),
                    _midTr = _sp[0].cloneNode(false),
                    _tds = _sp.find('>th,>td'),
                    _leftTd = [],
                    _rightTd = [],
                    _midTd = [],
                    _cix = 0,
                    _mcix = 0,
                    _tr = _sp[0].cloneNode(false);
                
                _tds.each( function ( _six, _sitem ) {
                    
                    var _sp = $(this), 
                        _colspan = _sp.attr('colspan'),
                        _rowspan = _sp.attr('rowspan'),
                        _obj = {},
                        _key;
                    
                    if ( _cix >= _col ) {
                      return false;
                    }

                    if ( typeof _rowspan != 'undefined' ) {
                        _rowspan = parseInt(_rowspan, 10);

                        _obj = {
                            six: _six,
                            rowspan: _rowspan,
                            colspan: _colspan
                        };

                        for ( var i = 1; i < _rowspan; i++ ) {
                            
                            if (_colspan) {
                                _colspan = parseInt(_colspan, 10);
                                for (var j = 0; j < _colspan; j++) {        
                                    _six === 0 ? _row[(_ix + i) + ( _six + 1 + j ).toString()] = _obj: _row[(_ix + i) + ( _six + j ).toString()] = _obj;
                                }
                            } else {
                                _six === 0 ? _row[(_ix + i) + ( _six + 1 ).toString()] = _obj: _row[(_ix + i) + ( _six ).toString()] = _obj;
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
                        if (_row[_key].colspan) {
                            return;
                        }
                    }

                    _sp.appendTo( _tr );

                });

                $(_tr).attr('data-ctf', 'CTF' + _ix).addClass(_clasname);
                _temp.push($(_tr)[0].outerHTML);
            } );

            return _temp;
        },

        getSum: function ( _array ) {
            var _sum = 1,
                _len = _array.length;

            while ( _len-- ) {
                _sum += _array.pop();
            }

            return _sum;
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
        }
        
    });
 
    JC.f.extendObject( TableFreeze.View.prototype, {
        init: function () {
           
        },

        update: function () {
            var _p = this,
                _selector = _p._model.selector(),
                _needProcess = _p._model.needProcess();

            if ( _needProcess ) {
                _p._model.creatTpl();
                _p.fixWidth();
                //fix empty cell
                _p.selector().find('td:empty').html('&nbsp;');
                _p.fixHeight();
            }

        },

        fixWidth: function () {
            var _p = this,
                _selector = _p.selector(),
                _freezeType = _p._model.freezeType(),
                _freezeCols = _p._model.freezeCols(),
                _totalWidth = _p._model.initWidth,
                _scrollWidth = _p._model.scrollWidth(),
                _colWidth = _p._model.initcolnumWidth,
                _colNum = _colWidth.length,
                _leftWidth,
                _rightWidth,
                _midWidth;

            switch ( _freezeType ) {
                case 'prev' : 
                    {
                        _leftWidth = _p._model.getSum(_colWidth.slice(0, _freezeCols));
                        _rightWidth = _totalWidth - _leftWidth;

                        _selector.find('>.js-fixed-table').width(_leftWidth / _totalWidth * 100 + '%')
                            .end()
                            .find('>.js-roll-table').width(_rightWidth / _totalWidth * 100 + '%')
                            .find('>table').width(_scrollWidth);

                        break;
                    }

                case 'last':
                    {
                        _rightWidth = _p._model.getSum(_colWidth.slice(_colNum - _freezeCols, _colNum));
                        _leftWidth = _totalWidth - _rightWidth - 1;

                        _selector.find('>.js-fixed-table').width(_rightWidth / _totalWidth * 100 + '%')
                            .end()
                            .find('>.js-roll-table').width(_leftWidth / _totalWidth * 100 + '%')
                            .find('>table').width(_scrollWidth);

                        break;
                    }

                case 'both':
                    {
                        _leftWidth = _p._model.getSum(_colWidth.slice(0, _freezeCols[0]));
                        _rightWidth = _p._model.getSum(_colWidth.slice(_colNum - _freezeCols[1], _colNum));
                        _midWidth = _totalWidth - _leftWidth - _rightWidth;
                        //_midWidth = 1 - _leftWidth - _rightWidth;

                        _selector.find('>.js-fixed-table:eq(0)').width(_leftWidth / _totalWidth * 100 + '%')
                            .end()
                            .find('>.js-roll-table').width(_midWidth / _totalWidth * 100 + '%')
                            .find('>table').width(_scrollWidth)
                            .end()
                            .end()
                            .find('>.js-fixed-table:eq(1)').width(_rightWidth / _totalWidth * 100 + '%');

                        break;
                    }
            } 

        },

        fixHeight: function () {
            var _p = this,
                _selector = _p._model.selector(),
                _leftTrs = _selector.find('>.js-fixed-table:eq(0)>table>thead>tr, >.js-fixed-table:eq(0)>table>tbody>tr'),
                _rightTrs = _selector.find('>.js-roll-table>table>thead>tr,>.js-roll-table>table>tbody>tr'),
                _midTrs = _selector.find('>.js-fixed-table:eq(1)>table>thead>tr, >.js-fixed-table:eq(1)>table>tbody>tr'),
                _freezeType = _p._model.freezeType();

            _leftTrs.each( function ( _ix, _item ) {
                var _sp = $(this),
                    _rightTr = _rightTrs.eq(_ix),
                    _midTr = _midTrs.eq(_ix),
                    _height = Math.max(_sp.prop('offsetHeight'), _rightTr.prop('offsetHeight'));

                if ( _freezeType === 'both' ) {
                    _height = Math.max(_height, _midTr.prop('offsetHeight'));
                    _midTr.height(_height);
                }

                _sp.height(_height);
                _rightTr.height(_height);

            } );    

            return;
        },

        highlight: function () {
            console.log("highlight");
        }

    });

    $(document).ready( function () {
        var _insAr = 0,
            _win= $( window );

        TableFreeze.autoInit && ( _insAr = TableFreeze.init() );
        _win.on( 'resize', CTFResize );

        function CTFResize() {
            _win.off( 'resize', CTFResize );

            $( 'div.js_compTableFreeze' ).each( function () {
                var _ins = TableFreeze.getInstance( $( this ) );
                _ins && _ins.update() ;
                _ins._model.tempWidth = _ins._model.selector().prop('offsetWidth');
            });

            _win.data('CTFResizeTimeout') && clearTimeout(_win.data('CTFResizeTimeout'));
            _win.data('CTFResizeTimeout', setTimeout(function () {
                _win.off( 'resize', CTFResize );
                _win.on( 'resize', CTFResize );
            }, 80 ));

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
