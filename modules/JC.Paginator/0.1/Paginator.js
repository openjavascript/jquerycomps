 ;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * Paginator 分页
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
 * <p></p>
 *
 *
 * <h2>可用的 HTML attribute</h2>
 * <dl>
 * <dt>paginatorUiTpl</dt>
 * <dd>定义分页的模板</dd>
 * <dd>始终显示当前页的前后两页，达到max页的时候，隐藏其他页以...显示。第一页和最后一页始终显示</dd>
 * <dt>paginatorui</dt>
 * <dd>css selector, 指定分页的模板内容将放到哪个容器里面</dd>
 * <dt>paginatorcontent</dt>
 * <dd>css selector, 指定取回来的数据将放到哪个容器里面</dd>
 * <dt>totalrecords</dt>
 * <dd>num, 共多少条记录，必填项</dd>
 * <dt>perpage</dt>
 * <dd>num, 每页显示多少条记录，默认10条</dd>
 * <dt>paginatortype</dt>
 * <dd>'static|ajax'，分页类型，ajax分页还是静态分页(静态分页，后端一次性将数据铺好)。默认为ajax</dd>
 * <dt>paginatorurl</dt>
 * <dd>ajax请求数据的接口</dd>
 * <dt>needInit</dt>
 * <dd>true|false, 是否需要初始化，即第一页的数据是否由ajax请求，默认为false(后端直接铺好数据)</dd>
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

            p._model.requestUrl = p._model.url();
            p._view.paginatedView();
            if (p._model.needInit()) {
                p._model.fetch();
            }
            
            $selector
                .delegate('.js_page', 'click', function (e) {
                    e.preventDefault();
                    var $el = $(this);

                    p.trigger('GOTOPAGE', [$el.text(), $el]);
                    
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
                   //if (!$el.hasClass('added')) {
                       p.trigger('GOTOPAGE', [val, $el]);
                    //}
                    
                });

            p.on('RENDER', function (e, data) {
                p._view.contentView(data);
            });

            p.on('RENDERSTATIC', function (e) {
                p._view.staticContentView();
            });

            p.on('PREVPAGE', function () {
                p._model.prevPage();
            });

            p.on('NEXTPAGE', function () {
                p._model.nextPage();
            });

            p.on('GOTOPAGE', function (e, page, $el) {
                page = parseInt(page, 10);
                p._model.gotoPage(page);
               
                p._view.updatePaginatorView($el, page);
                
            });

            p.on('UPDATEVIEW', function (e, perPage) {
                p._view.paginatedView(perPage);
               
                p._model.selector().attr('perPage', perPage);
                p._model.fetch(perPage);
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
        needInit: function () {
            return this.boolProp('needInit');
        },

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
                selector = p.attrProp('paginatorcontent') || '.content';

            return p.selector().find(selector);
        },

        paginatorContentTpl: function () {
            return JC.f.scriptContent( this.attrProp('paginatorContentTpl') );
            // var tpl = '<tr><td>{0}</td><td>{1}</td><td>{2}</td></tr>';

            // return tpl;
        },

        paginatorUiTpl: function () {
            return JC.f.scriptContent( this.attrProp('paginatorUiTpl') );
        },

        // paginatorUiTpl: function () {
        //     var p = this,
        //         tpl = '共{0}页，' + p.totalRecords() + '条记录'   
        //             + '<a href="#" class="js_prevpage">上一页</a>'
        //             + '{1}'
        //             + '<a href="#" class="js_nextpage">下一页</a>'
        //             + '每页显示'
        //             + ' <select name="pz" class="sel sel-s js_perpage"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="10">10</option></select>';

        //     return tpl;
        // },

        url: function () {
            return this.attrProp('paginatorurl');
        },

        requestUrl: '',

        currentPage: 1,

        perPage: function () {
            return (this.intProp('perPage') || 10);
        },

        maxPage: function () {
            return (this.intProp('maxPage') || 10);
        },

        midRange: function () {
            return (this.intProp('midRange') || 5);
        },

        totalRecords: function () {
            return this.intProp('totalrecords');
        },

        gotoPage: function (page) {
            this.currentPage = parseInt(page, 10);
            this.fetch();
        },

        prevPage: function () {
            var p = this;

            if (p.currentPage === 1) {
                return;
            } else {
                p.currentPage--;
            }

            p.fetch();

        },

        nextPage: function () {
            var p = this,
                total = Math.ceil(p.totalRecords() / p.perPage());

            if (p.currentPage === total) {
                return;
            } else {
                p.currentPage++;
            }

            p.fetch();
        },

        fetch: function () {

            var p = this,
                page = p.currentPage,
                perPage = p.perPage(),
                url = JC.f.printf(p.requestUrl, perPage, page);

            if (p.paginatortype() === 'static') {
                setTimeout( function () {
                    p.trigger('RENDERSTATIC');
                }, 10);
                
            } else {
                $.ajax({
                    type: "POST",
                    url: url,
                    success: function (res) {
                        res = $.parseJSON(res);

                        if (!res.errorno) {
                            res.data.html && p.trigger('RENDER', [res.data.html]);
                        } 
                       
                    }
                });
            }
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
                max = p._model.maxPage(),
                str = '',
                i,
                currentPage = p._model.currentPage;

            
                for (i = 1; i < total; i++) {
                    str += (i > p._model.midRange()) ? ('<a href="javascript:;" class="js_page dn" >' + i + '</a>'): ('<a href="javascript:;" class="js_page" >' + i + '</a>');
                    if (total > p._model.midRange()) {
                        (i === 1) && (str += '<span class="dn js_firstBreak">...</span>' );
                        (i === total - 1) && (str += '<span class="js_lastBreak">...</span>') && (console.log(i));
                    }
                }

                str += '<a href="javascript:;" class="js_page">' + total + '</a>'
           
            tpl = JC.f.printf(tpl, total, p._model.totalRecords(), str);

            $box.html(tpl).find('.js_perpage').val(perPage);
            !p._model.needInit() && p.updateView();
        },

        contentView: function (data) {
            var p = this,
                $box = p._model.paginatorContent();
            
            $box.html(data);
            p.updateView();
            p.trigger('FLIPPED', [data]);
        },

        staticContentView: function () {
            var p = this,
                page = p._model.currentPage,
                perPage = p._model.perPage(),
                totalPage = Math.ceil(p._model.totalRecords() / perPage),
                i = 1;

            p._model.paginatorContent().find('tr').each( function (ix) {
                if (ix > 0 && ix % perPage === 0 ) {
                    i++;
                }
                
                $(this)[i === page? 'show': 'hide']();
                
            });

            p.updateView();
            p.trigger('FLIPPED');
        },

        updatePaginatorView: function ($el, curPage) {
            var p = this,
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
            end = (curPage - halfMidRange) > 0 ? Math.min(curPage + halfMidRange - 1, totalPage - 1): midRange;
            console.log("start", start, "end", end);
            $box.find('.js_page').not(':first').not(':last').addClass('dn');
            for (var i = start; i < end; i++) {
                $box.find('.js_page').eq(i).removeClass('dn');
            }
            
            $fstBrk[curPage - halfMidRange > 1? 'show': 'hide']();
            $lstBrk[curPage + halfMidRange >= totalPage ? 'hide': 'show']();
        },

        updateView: function () {
            var p = this,
                $paginatorui = p._model.paginatorUi(),
                $contentui = p._model.paginatorContent(),
                currentPage = p._model.currentPage,
                total = Math.ceil(p._model.totalRecords() / p._model.perPage());

            if (currentPage === 1) {
                $paginatorui.find('.js_prevpage').prop('disabled', true).addClass('disabled');
            } else {
                $paginatorui.find('.js_prevpage').prop('disabled', false).removeClass('disabled');
            }

            if (currentPage === total) {
                $paginatorui.find('.js_nextpage').prop('disabled', true).addClass('disabled');
            } else {
                $paginatorui.find('.js_nextpage').prop('disabled', false).removeClass('disabled');
            }

            $paginatorui.find('.js_page').each( function () {
                var $this = $(this);

                if (parseInt($this.text(), 10) === currentPage) {
                    $this.addClass('cur').siblings('.js_page').removeClass('cur');
                }
            });

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
