;(function (define, _win) { 'use strict'; define(['JC.BaseMVC'], function () {
/**
 * TableSort 表格列排序功能
 *
 * @namespace JC
 * @class TableSort
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-11-25
 * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
 *
 */
    JC.TableSort = TableSort;

    function TableSort(_selector) {
        _selector && (_selector = $(_selector));
        if( TableSort.getInstance(_selector) ) return TableSort.getInstance(_selector);
        TableSort.getInstance(_selector, this);
        this._model = new TableSort.Model(_selector);
        this._view = new TableSort.View(this._model);
        this._init();
        //JC.log( 'TableSort:', new Date().getTime() );
    }

    /**
     * 获取或设置 TableSort 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {TableSortInstance}
     */
    TableSort.getInstance = function ( _selector, _setter ) {
        if ( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if ( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;

        if ( typeof _setter != 'undefined' ) {
            TableSort.ins['sort'] = _setter;
        }
        
        return TableSort.ins['sort'];
    };

    TableSort.ins = {};

    /**
     * 初始化可识别的 TableSort 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of TableSortInstance}
     */
    TableSort.init = function (_selector) {
        var _r = [];
        
        _selector = $(_selector || document);

        if ( _selector.length ) {
            if ( _selector.hasClass('js_compTableSort') ) {
                _r.push(new TableSort(_selector));
            } else {
                _selector.find('.js_compTableSort').each(function() {
                    _r.push(new TableSort( this ));
                });
            }
        }
        
        return _r;
    };

    BaseMVC.build(TableSort);

    JC.f.extendObject(TableSort.prototype, {
        _beforeInit: function () {
            //JC.log( 'TableSort _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
            var _p = this;

            $(document).delegate('.js_compTableSort>thead>tr>th', 'click', function () {
                _p.trigger(TableSort.Model.SORT, [$(this)] );
            });

            _p.on(TableSort.Model.SORT, function (_evt, _srcSelector) {
                _p._model.makeSortable( _srcSelector );
            } );

        }, 

        _inited: function () {

        },

        update: function () {

        }

    });
 
    TableSort.Model._instanceName = "TableSort";
    TableSort.Model.SORT = "CT_SORT";
   
    JC.f.extendObject(TableSort.Model.prototype, {
        init: function () {

        },

        makeSortable: function ( _selector ) {
            var _p = this,
                _cell = $(_selector)[0],
                _cellIndex = _cell.cellIndex;

            _p.getSortType( _p.getSortKey(_cellIndex) );
        },

        getSortKey: function ( _index ) {
            var _p = this,
                _r = [],
                _rows = [],
                i,
                j,
                l,
                t;

            _p.selector().find('tbody>tr').each( function () {
                
                var _sp = $(this),
                    _text = _sp.find('td').eq(_index).text().trim();

                _r.push({
                    'text': _text,
                    'node': _sp
                });

            } );

            // l = _r.length;

            // for ( i = 0; i < l; i++ ) {
            //     for ( j = i + 1; j < l; j++) {
            //         if ( _r[i].text.localeCompare( _r[j].text ) < 0 ) {
            //             t = _r[i];
            //             _r[i] = _r[j];
            //             _r[j] = t;
            //         } 
            //     }
            // }
           
            // $.each( _r, function ( _ix ) {
            //     _rows.push( _r[_ix].node[0].outerHTML );
            // });

            //$('#t2').html( _rows.join('') );

            return _r;
        },

        getSortType: function (_sortKey) {
            //数字 -$￥.,%+  /^-?[£$¤]?[\d,.]+%?$/
            //日期 yyyy-mm-dd h:m:s 

            var _p = this,
                _r,
                i,
                l = _sortKey.length;

            for ( i = 0; i < l; i++ ) {
                if ( _sortKey[i].text.match(/^-?[$￥]?[\d.,]+%?/) ) {
                    console.log('numeric');  
                } else {
                    console.log(_sortKey[i].text,'not numeric');
                }
                    
            }



        },

        sortByDate: function () {
            
        },

        sortByNum: function () {

        },

        sortByAlphabet: function () {

        },

        reverse: function () {

        }





       
    });
 
    JC.f.extendObject(TableSort.View.prototype, {

    });

    
    $(document).ready( function () {
        var _insAr = 0;
        TableSort.autoInit
            && ( _insAr = TableSort.init() );
    });
 
    return JC.TableSort;

});}( typeof define === 'function' && define.amd ? define : 
        function (_name, _require, _cb) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
