 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * Paginator 分页
 * <p>实现的功能上一页，下一页，数字页，...显示页码，跳转到n页，每页显示n条记录，</p>
 * <p>
 *      <b>require</b>: 
 *          <a href='window.jQuery.html'>jQuery</a>
 *          , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 * </p>
 * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 * | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Paginator.html' target='_blank'>API docs</a>
 * | <a href='../../modules/JC.Paginator/0.1/_demo/demo.html' target='_blank'>demo link</a></p>
 *
 * <h2></h2>
 * <p>自动初始化<b>.js_compPaginator</b>下的table</p>
 *
 * <h2>可用的 HTML attribute</h2>
 * <dl>
 * <dt>paginatorui</dt>
 * <dd>css selector, 指定分页的模板内容将放到哪个容器里面</dd>
 * <dt>paginatorcontent</dt>
 * <dd>css selector, 指定取回来的数据将放到哪个容器里面</dd>
 * <dt>totalrecords</dt>
 * <dd>num, 共多少条记录，必填项</dd>
 * <dt>perpage</dt>
 * <dd>num, 每页显示多少条记录，默认10条</dd>
 * <dt>perpageitems</dt>
 * <dd>定义下拉框的option值，默认为[10,20,50]</dd>
 * <dt>midrange</dt>
 * <dd>num, default = 5。显示多少个数字页，超出的页将以...显示，比如一共有10页，那么显示前5页和最后一页，中间的以...显示</dd>
 * </dl>
 *
 * @namespace JC
 * @class Paginator
 * @extends JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-05-05
 * @author  zuojing   <zuojing1013@gmail.com> | 75 Team
 * @example
        <div class="cafe-table js_compPaginator" paginatorcontent=".contents" paginatorui=".pages"  totalrecords="14" perpage="3" midrange="5">
            <table>
               在这里添加你要的数据
            </table>
            <div class="page pages">
                
            </div>
        </div>
*/
    JC.Paginator = Paginator;
 
    function Paginator( _selector ){
        _selector && ( _selector = $( _selector ) );
        
        if( Paginator.getInstance( _selector ) ) 
            return Paginator.getInstance( _selector );
        Paginator.getInstance( _selector, this );
        this._model = new Paginator.Model( _selector );
        this._view = new Paginator.View( this._model );
        this._init();
    }
    /**
     * 获取或设置 Paginator 的实例
     * @method  getInstance
     * @param   {selector}      _selector
     * @static
     * @return  {PaginatorInstance}
     */
    Paginator.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( Paginator.Model._instanceName, _setter );

        return _selector.data( Paginator.Model._instanceName );
    };
    /**
     * 初始化可识别的 Paginator 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of PaginatorInstance}
     */
    Paginator.init = function ( _selector ) {
        var _r = [];
        
        _selector = $( _selector || document );

        if ( _selector.length ) {
            if ( _selector.hasClass('js_compPaginator') ) {
                _r.push( new Paginator(_selector) );
            } else {
                _selector.find('.js_compPaginator').each( function() {
                    _r.push( new Paginator( this ) );
                });
            }
        }
        
        return _r;
    };

    BaseMVC.build( Paginator );

    JC.f.extendObject( Paginator.prototype, {
        _beforeInit: function () {
            //JC.log( 'Paginator _beforeInit', new Date().getTime() );
        },

        _initHanlderEvent: function () {
            var p = this,
                $selector = p._model.selector();

            if (!p._model.totalRecords()) return;
            
            //渲染分页
            p._view.paginatedView();
            p._view.updateContentView();
            
            $selector
                .delegate('.js_page', 'click', function (e) {
                    e.preventDefault();
                    var $el = $(this),
                        val = parseInt($el.text(), 10);

                    p.trigger('GOTOPAGE', [val, $el]);
                    
                })
                .delegate('.js_prevpage', 'click', function (e) {
                    e.preventDefault();
                    p.trigger('PREVPAGE');
                })
                .delegate('.js_nextpage', 'click', function (e) {
                    e.preventDefault();
                    p.trigger('NEXTPAGE');
                })
                .delegate('.js_perpage', 'change', function (e) {
                    p._model.currentPage = 1;
                    p.trigger('UPDATEVIEW', [$(this).val()]);
                })
                .delegate('.js_goto', 'change', function (e) {
                    var $el = $(this),
                        val = $el.val();

                    if (isNaN(val)) {
                        return false;
                    }

                    if (val > Math.ceil(p._model.totalRecords / p._model.perPage())) {
                        val = 1;
                    }
                    
                    p.trigger('GOTOPAGE', [val, $el]);
                    
                });

            p.on('RENDER', function (e) {
                p._view.updatePaginatorView();
                p._view.updateContentView();
            });

            p.on('PREVPAGE', function () {
                p._model.prevPage();
            });

            p.on('NEXTPAGE', function () {
                p._model.nextPage();
            });

            p.on('GOTOPAGE', function (e, page) {
                //更新分页按钮的状态
                p._model.currentPage = page;
                p._view.updateContentView();
                p._view.updatePaginatorView();
            });

            p.on('UPDATEVIEW', function (e, perPage) {
                setTimeout(function () {
                    p._view.paginatedView(perPage);
                    p._model.selector().attr('perPage', perPage);
                    p._view.updateContentView();
                }, 20);
            });

            p.on('FLIPPED', function (e, data) {
                p._model.flipped()
                    && p._model.flipped().call(p, p.selector(), data);
            });
            
        }, 

        _inited: function () {
           
        }

    });
 
    Paginator.Model._instanceName = "Paginator";

    JC.f.extendObject( Paginator.Model.prototype, {

        paginatortype: function () {
            return this.attrProp('paginatortype') || 'ajax';
        },

        paginatorUi: function () {
            var p = this,
                selector = p.attrProp('paginatorui') || '.page';

            return p.selector().find(selector);
        },

        paginatorContent: function () {
            var p = this,
                selector = p.attrProp('paginatorcontent') || 'tbody';

            return p.selector().find(selector);
        },

        paginatorUiTpl: function () {
            return '共{0}页，{1}条记录' 
                + '<a href="#" class="js_prevpage disabled">上一页</a>'
                + '{2}'
                + '<a href="#" class="js_nextpage">'
                    + '下一页'
                + '</a>'
                + '每页显示'
                + '<select name="pz" class="sel sel-s js_perpage">'
                + this.perPageOption()    
                + '</select>'
                + '到第<input type="text" class="js_goto" style="width:60px;" />页';
        },

        currentPage: 1,

        perPage: function () {
            return (this.intProp('perPage') || 10);
        },

        perPageOption: function () {
            var items = this.attrProp('perpageitems') || '10|20|50',
                i,
                l,
                str = '',
                selected = '';

            items = items.split('|');
            l = items.length;
            for (i = 0; i < l; i++) {
                selected = i === this.perPage() ? 'selected': '';
                str += '<option value="' + items[i] + '"' + selected + '>' + items[i] + '</option>';
            }
            
            return str;
        },

        midRange: function () {
            return (this.intProp('midRange') || 5);
        },

        totalRecords: function () {
            return this.intProp('totalrecords');
        },

        prevPage: function () {
            var p = this;

            if (p.currentPage === 1)
                return;

            p.currentPage--;
            p.trigger('RENDER');

        },

        nextPage: function () {
            var p = this,
                total = Math.ceil(p.totalRecords() / p.perPage());

            if (p.currentPage === total)
                return;

            p.currentPage++;
            p.trigger('RENDER');
            
        },

        flipped: function () {
            var _p = this,
                _selector = _p.selector(),
                _key = "flipped";
 
            return _p.callbackProp(_selector, _key);
        }
    });
 
    JC.f.extendObject( Paginator.View.prototype, {
        init: function () {

        },

        paginatedView: function (perPage) {
           
            var p = this,
                $box = p._model.paginatorUi(),
                tpl = p._model.paginatorUiTpl(),
                perPage = perPage || p._model.perPage(),
                total = Math.ceil(p._model.totalRecords() / perPage) ,
                str = '',
                i,
                currentPage = p._model.currentPage;

            for (i = 1; i < total; i++) {
                str += (i > p._model.midRange()) ? ('<a href="javascript:;" class="js_page dn" >' + i + '</a>'): ('<a href="javascript:;" class="js_page" >' + i + '</a>');
                if (total > p._model.midRange()) {
                    (i === 1) && (str += '<span class="dn js_firstBreak">...</span>' );
                    (i === total - 1) && (str += '<span class="js_lastBreak">...</span>');
                }
            }

            str += '<a href="javascript:;" class="js_page">' + total + '</a>';
            tpl = JC.f.printf(tpl, total, p._model.totalRecords(), str);
            $box.html(tpl).find('.js_perpage').val(perPage);
            $box.find('.js_page').eq(currentPage - 1).addClass('cur');

        },

        /**
        显示表格内容
        */
        updateContentView: function () {
            var p = this,
                //每页显示的记录条数
                currentPage = p._model.currentPage,
                perPage = p._model.perPage(),
                start = (currentPage - 1) * perPage,
                end = start + perPage;

            p._model.paginatorContent().find('tr').hide().slice(start, end).show();
            p.trigger('FLIPPED');
        },

        updatePaginatorView: function () {
            var p = this,
                curPage = p._model.currentPage,
                $box = p._model.paginatorUi(),
                $fstBrk = $box.find('.js_firstBreak'),
                $lstBrk = $box.find('.js_lastBreak'),
                totalPage = Math.ceil(p._model.totalRecords() / p._model.perPage()),
                midRange = p._model.midRange(),
                halfMidRange = Math.ceil(midRange / 2),
                limit = totalPage - midRange,
                start,
                end;

            start = (curPage - halfMidRange) > 0 ? Math.min((curPage - halfMidRange), limit): 0;
            start = Math.max(start - 1, 0); 
            end = start + midRange;
            $box.find('.js_page').not(':first').not(':last').addClass('dn').slice(start, end).removeClass("dn");
            $box.find('.js_page').eq(curPage - 1).addClass('cur').siblings().removeClass('cur');
            $fstBrk[curPage - halfMidRange > 1? 'show': 'hide']();
            $lstBrk[curPage + halfMidRange >= totalPage ? 'hide': 'show']();

            //设置上一页的状态
            if (curPage === 1) {
                $box.find('.js_prevpage').prop('disabled', true).addClass('disabled');
            } else {
                $box.find('.js_prevpage').prop('disabled', false).removeClass('disabled');
            }

            //设置下一页的状态
            if (curPage === totalPage) {
                $box.find('.js_nextpage').prop('disabled', true).addClass('disabled');
            } else {
                $box.find('.js_nextpage').prop('disabled', false).removeClass('disabled');
            }
          
        }

    });

    $(document).ready( function () {
        var _insAr = 0;
        Paginator.autoInit
            && ( _insAr = Paginator.init() );
    });
 
    return JC.Paginator;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
