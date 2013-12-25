;(function(define, _win) { 'use strict'; define( [ 'JC.Form.default' ], function(){
    /**
     * 表单自动填充 URL GET 参数
     * <br />只要引用本脚本, DOM 加载完毕后, 页面上所有带 class js_autoFillUrlForm 的 form 都会自动初始化默认值
     * <p><b>requires</b>: <a href='.jQuery.html'>jQuery</a></p>
     * <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     * | <a href='http://jc2.openjavascript.org/docs/docs_api/classes/JC.Form.html' target='_blank'>API docs</a>
     * @method  initAutoFill
     * @static
     * @for JC.Form
     * @version dev 0.1
     * @author  qiushaowei   <suches@btbtd.org> | 75 team
     * @date    2013-06-13
     * @param   {selector|url string}   _selector   显示指定要初始化的区域, 默认为 document
     * @param   {string}                _url        显示指定, 取初始化值的 URL, 默认为 location.href
     * @example
     *      JC.Form.initAutoFill( myCustomSelector, myUrl );
     */
     JC.Form.initAutoFill =
        function( _selector, _url ){
            _selector = $( _selector || document );
            if( !(_selector && _selector.length ) ) _selector = $(document);
            _url = _url || location.href;

            JC.log( 'JC.Form.initAutoFill' );

            if( _selector.prop( 'nodeName' ).toLowerCase() == 'form' ){
                fillForm( _selector, _url );
            }else{
                var _fms = _selector.find('form.js_autoFillUrlForm');
                _fms.each( function(){
                    fillForm( this, _url );
                });

                if( !_fms.length ){
                    fillItems( _selector, _url );
                }
            }

        };

    function fillItems( _selector, _url ){
        _selector = $(_selector);
        _url = decode( _url );
        
        _selector.find( 'input[type=text][name],input[type=password][name],textarea[name]' ).each( function(){
            var _sp = $(this);
            if( JC.f.hasUrlParam( _url, _sp.attr('name') ) ){
                _sp.val( decode( JC.f.getUrlParam( _url, _sp.attr('name') ).replace(/[\+]/g, ' ' ) ) );
            }
        });

        _selector.find( 'select[name]' ).each( function(){
            var _sp = $(this), _uval = decode( JC.f.getUrlParam( _url, _sp.attr('name') ).replace(/[\+]/g, ' ' ) ) ;
            if( JC.f.hasUrlParam( _url, _sp.attr('name') ) ){
                if( selectHasVal( _sp, _uval ) ){
                    _sp.removeAttr('selectignoreinitrequest');
                    _sp.val( JC.f.getUrlParam( _url, _sp.attr('name') ) );
                }else{
                    _sp.attr( 'selectvalue', _uval );
                }
            }
        });

        var _keyObj = {};
        _selector.find( 'input[type=checkbox][name], input[type=radio][name]' ).each( function(){
            var _sp = $(this), _key = _sp.attr('name').trim(), _keys, _v = _sp.val();
            //alert( _sp.attr('name') );
            if( !( _key in _keyObj ) ){
                _keys = JC.f.getUrlParams( _url, _key );
                _keyObj[ _key ] = _keys;
            }else{
                _keys = _keyObj[ _key ];
            }

            if( _keys && _keys.length ){
                $.each( _keys, function( _ix, _item ){
                    if( _item == _v ){
                        _sp.prop('checked', true);
                        _sp.trigger('change');
                    }
                });
            }
        });

        window.JC.f.jcAutoInitComps && JC.f.jcAutoInitComps( _selector );
    }

    function fillForm( _selector, _url ){
        fillItems( _selector, _url );
        /*
            ?s_startTime=2013-08-28
                &s_endTime=2013-09-28
                &kword_type=
                &kword=
                &department[]=2
                &department[]=3
                &operator[]=328
                &operator[]=330
                &operator[]=331
                &isp=1379841840601_232_161
        */
    }
    /**
     * 自定义 URI decode 函数
     * @property    initAutoFill.decodeFunc
     * @static
     * @for JC.Form
     * @type    function
     * @default null
     */
    JC.Form.initAutoFill.decodeFunc;

    function decode( _val ){
        try{
            _val = (JC.Form.initAutoFill.decodeFunc || decodeURIComponent)( _val );
        }catch(ex){}
        return _val;
    }
    /**
     * 判断下拉框的option里是否有给定的值
     * @method  initAutoFill.selectHasVal
     * @private
     * @static
     * @param   {selector}  _select
     * @param   {string}    _val    要查找的值
     */
    function selectHasVal( _select, _val ){
        var _r = false, _val = _val.toString();
        _select.find('option').each( function(){
            var _tmp = $(this);
            if( _tmp.val() == _val ){
                _r = true;
                return false;
            }
        });
        return _r;
    }

    $(document).ready( function( _evt ){ 
        setTimeout( function(){ JC.Form.initAutoFill(); }, 50 );
    });

    return JC.Form;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
