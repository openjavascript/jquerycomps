;(function(define, _win) { 'use strict'; define( [ 'JC.Drag' ], function(){
/**
 * 组件用途简述
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.ImageCutter.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.ImageCutter/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>页面只要引用本脚本, 默认会处理 div class="js_compImageCutter"</h2>
 *
 *<h2>可用的 HTML attribute</h2>
 *
 *<dl>
 *    <dt></dt>
 *    <dd><dd>
 *</dl> 
 *
 * @namespace   JC
 * @class       ImageCutter
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-13
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.ImageCutter 示例</h2>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.ImageCutter = ImageCutter;

    function ImageCutter( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, ImageCutter ) ) 
            return JC.BaseMVC.getInstance( _selector, ImageCutter );

        JC.BaseMVC.getInstance( _selector, ImageCutter, this );

        this._model = new ImageCutter.Model( _selector );
        this._view = new ImageCutter.View( this._model );

        this._init();

        JC.log( ImageCutter.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 ImageCutter 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of ImageCutterInstance}
     */
    ImageCutter.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compImageCutter' )  ){
                    _r.push( new ImageCutter( _selector ) );
                }else{
                    _selector.find( 'div.js_compImageCutter' ).each( function(){
                        _r.push( new ImageCutter( this ) );
                    });
                }
            }
            return _r;
        };

    ImageCutter.minwidth = 50;
    ImageCutter.minheight = 50;

    JC.BaseMVC.build( ImageCutter );

    JC.f.extendObject( ImageCutter.prototype, {
        _beforeInit:
            function(){
                JC.log( 'ImageCutter _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( ImageCutter.Model.INITED, function( _evt ){
                    _p._model.cicImageUrl()
                        && _p.update( _p._model.cicImageUrl() );
                });

                _p.on( 'CICImageLoad', function( _evt, _img, _width, _height ){

                    if( _width < _p._model.cicMinWidth() || _height < _p._model.cicMinHeight() ){
                        _p.trigger( 'CICSizeError', [ _width, _height, _img ] );
                        return;
                    }

                    var _newSize = _p._model.size( _width, _height );

                    if( _newSize.zoom.width < _p._model.cicMinWidth() || _newSize.zoom.height < _p._model.cicMinHeight() ){
                        _p.trigger( 'CICZoomError', [ _width, _height, _img, _newSize ] );
                        return;
                    }

                    _img.css( { 
                        'width': _newSize.zoom.width + 'px'
                        , 'height': _newSize.zoom.height + 'px' 
                        , 'left': _newSize.left + 'px'
                        , 'top': _newSize.top + 'px'
                    });
                    _img.prependTo( _p.selector() );

                    _p._view.initDragger( _newSize );
                });

                _p.on( 'CICSizeError', function( _evt, _width, _height, _img ){
                    _p._view.sizeError( _width, _height, _img );
                });

                _p.on( 'CICZoomError', function( _evt, _width, _height, _img, _newSize ){
                    _p._view.zoomError( _width, _height, _img, _newSize );
                });

            }

        , _inited:
            function(){
                JC.log( 'ImageCutter _inited', new Date().getTime() );
                this.trigger( ImageCutter.Model.INITED );
            }

        , update:
            function( _imgUrl ){
                if( !_imgUrl ) return;
                this._view.update( _imgUrl );
            }
    });

    ImageCutter.Model.INITED = "JCImageCutterInited";

    ImageCutter.Model._instanceName = 'JCImageCutter';
    JC.f.extendObject( ImageCutter.Model.prototype, {
        init:
            function(){
                JC.log( 'ImageCutter.Model.init:', new Date().getTime() );
                var _p = this;

                this._size ={
                    selector: { width: _p.selector().prop( 'offsetWidth' ), height: _p.selector().prop( 'offsetHeight' ) }
                    , img: { width: 0, height: 0 }
                    , zoom: { width: 0, height: 0 }
                    , left: 0
                    , top: 0
                }
            }

        , cicImageUrl:
            function(){
                return this.attrProp( 'cicImageUrl' );
            }

        , cicMinWidth: function(){ return this.intProp( 'cicMinWidth' ) || ImageCutter.minwidth; }
        , cicMinHeight: function(){ return this.intProp( 'cicMinHeight' ) || ImageCutter.minheight; }
        
        , size: 
            function( _width, _height ){ 
                if( _width && _height ){
                    this._size.img = { width: _width, height: _height };
                    this._size.zoom = sizeZoom( _width, _height, this._size.selector.width, this._size.selector.height );

                    this._size.zoom.width = Math.round( this._size.zoom.width );
                    this._size.zoom.height = Math.round( this._size.zoom.height );

                    this._size.left = Math.round( ( this._size.selector.width - this._size.zoom.width ) / 2 );
                    this._size.top = Math.round( ( this._size.selector.height - this._size.zoom.height ) / 2 );

                    JC.log( this._size.left, this._size.top );
                }
                return this._size; 
            }

        , clean: 
            function(){
            }

        , draggerList:
            function(){
                if( !this._draggerList ){
                    this._draggerList = 
                        $( 
                            JC.f.printf( 
                                '{0}{1}{2}{3}{4}{5}{6}{7}{8}'
                                , '<button type="button" class="cic_btn cic_btnTl"></button>'
                                , '<button type="button" class="cic_btn cic_btnTc"></button>'
                                , '<button type="button" class="cic_btn cic_btnTr"></button>'
                                , '<button type="button" class="cic_btn cic_btnMl"></button>'
                                , '<button type="button" class="cic_btn cic_btnMr"></button>'
                                , '<button type="button" class="cic_btn cic_btnBl"></button>'
                                , '<button type="button" class="cic_btn cic_btnBc"></button>'
                                , '<button type="button" class="cic_btn cic_btnBr"></button>'
                            )
                         );
                    this._draggerList.hide().appendTo( this.selector() );
                }
                return this._draggerList;
            }

        , btnTl:
            function(){
                !this._btnTl && ( this.draggerList(), this._btnTl =  this.selector().find( 'button.cic_btnTl' ) );
                return this._btnTl;
            }

        , btnTc:
            function(){
                !this._btnTc && ( this.draggerList(), this._btnTc =  this.selector().find( 'button.cic_btnTc' ) );
                return this._btnTc;
            }

        , btnTr:
            function(){
                !this._btnTr && ( this.draggerList(), this._btnTr =  this.selector().find( 'button.cic_btnTr' ) );
                return this._btnTr;
            }

        , btnMl:
            function(){
                !this._btnMl && ( this.draggerList(), this._btnMl =  this.selector().find( 'button.cic_btnMl' ) );
                return this._btnMl;
            }

        , btnMr:
            function(){
                !this._btnMr && ( this.draggerList(), this._btnMr =  this.selector().find( 'button.cic_btnMr' ) );
                return this._btnMr;
            }

        , btnBl:
            function(){
                !this._btnBl && ( this.draggerList(), this._btnBl =  this.selector().find( 'button.cic_btnBl' ) );
                return this._btnBl;
            }

        , btnBc:
            function(){
                !this._btnBc && ( this.draggerList(), this._btnBc =  this.selector().find( 'button.cic_btnBc' ) );
                return this._btnBc;
            }

        , btnBr:
            function(){
                !this._btnBr && ( this.draggerList(), this._btnBr =  this.selector().find( 'button.cic_btnBr' ) );
                return this._btnBr;
            }

        , maskList:
            function(){
                if( !this._maskList ){
                    this._maskList = 
                        $( 
                            JC.f.printf( 
                                '{0}{1}{2}{3}'
                                , '<div class="cic_mask cic_maskLeft"></div>'
                                , '<div class="cic_mask cic_maskTop"></div>'
                                , '<div class="cic_mask cic_maskRight"></div>'
                                , '<div class="cic_mask cic_maskBottom"></div>'
                            )
                         );
                    this._maskList.hide().appendTo( this.selector() );
                }
                return this._maskList;
            }

        , maskLeft:
            function(){
                !this._maskLeft && ( this.maskList(), this._maskLeft =  this.selector().find( 'button.cic_maskLeft' ) );
                return this._maskLeft;
            }

        , maskTop:
            function(){
                !this._maskTop && ( this.maskList(), this._maskTop =  this.selector().find( 'button.cic_maskTop' ) );
                return this._maskTop;
            }

        , maskRight:
            function(){
                !this._maskRight && ( this.maskList(), this._maskRight =  this.selector().find( 'button.cic_maskRight' ) );
                return this._maskRight;
            }

        , maskBottom:
            function(){
                !this._maskBottom && ( this.maskList(), this._maskBottom =  this.selector().find( 'button.cic_maskBottom' ) );
                return this._maskBottom;
            }

        , cicErrorBox:
            function(){
                if( !this._cicErrorBox ){
                    this._cicErrorBox = $( '<div class="CIC_ERROR"></div>' );
                    this._cicErrorBox.appendTo( this.selector() );
                }
                return this._cicErrorBox;
            }
    });

    JC.f.extendObject( ImageCutter.View.prototype, {
        init:
            function(){
                JC.log( 'ImageCutter.View.init:', new Date().getTime() );
                var _p = this;
            }

        , clean:
            function(){
                this.selector().find( 'img' ).remove();
                this.selector().find( 'button' ).hide();

                this._model.cicErrorBox().hide();
            }

        , update:
            function( _imgUrl ){
                if( !_imgUrl ) return;
                var _p = this, _img = $( JC.f.printf( '<img src="about:blank" />' ) );

                    _p.clean();

                    _img.on( 'load', function(){
                        //JC.log( this.width, this.height );
                        _p.trigger( 'CICImageLoad', [ _img, this.width, this.height ] );
                    });
                    _img.on( 'mousedown', function( _evt ){ _evt.preventDefault(); return false; } );
                    _img.attr( 'src', _imgUrl );
            }

        , initDragger:
            function( _size ){
                this._model.maskList()

                var _p = this
                    , _dragger = _p._model.draggerList()
                    , _draggerSize = Math.ceil( ( _size.zoom.width > _size.zoom.height ? _size.zoom.height : _size.zoom.width ) / 2 )
                    , _btnSize = _p._model.btnTl().width()
                    , _srcDraggerSize = _draggerSize
                    , _draggerSize = _draggerSize - _btnSize
                    , _halfSize = _draggerSize / 2
                    , _x = _size.left + ( _size.zoom.width - _draggerSize ) / 2 - _btnSize / 2
                    , _y = _size.top + ( _size.zoom.height - _draggerSize ) / 2 - _btnSize / 2

                    ;
                JC.log( 'initDragger', _draggerSize, new Date().getTime() );

                _p._model.btnTl().css( { 'left': _x , 'top': _y } );
                _p._model.btnTc().css( { 'left': ( _x + _halfSize ), 'top': _y } );
                _p._model.btnTr().css( { 'left': ( _x + _draggerSize ), 'top': _y } );

                _p._model.btnMl().css( { 'left': _x, 'top': ( _y + _halfSize ) } );
                _p._model.btnMr().css( { 'left': _x + _draggerSize, 'top': ( _y + _halfSize ) } );


                _p._model.btnBl().css( { 'left': _x, 'top': _y + _draggerSize } );
                _p._model.btnBc().css( { 'left': _x + _halfSize, 'top': _y + _draggerSize } );
                _p._model.btnBr().css( { 'left': _x + _draggerSize , 'top': _y + _draggerSize } );

                _p._model.draggerList().show();

                _p.initMask( _x, _y, _size );
            }

        , initMask:
            function( _x, _y, _size ){
                var _p = this
                    , _maskList = _p._model.maskList()
                    ;
            }

        , sizeError:
            function( _width, _height, _img ){
                this._model.cicErrorBox().show().html(
                    JC.f.printf( 
                        '{5}<p>图片实际宽高为: {2}, {3}</p><p>可接受的最小宽高为: {0}, {1}</p>{4}'
                        , this._model.cicMinWidth(), this._model.cicMinHeight()
                        , _width, _height
                        , '<a href="' + _img.attr( 'src' ) + '" target="_blank">查看图片</a>'
                        , '<h3>图片尺寸错误 </h3>'
                    )
                );
            }

        , zoomError:
            function( _width, _height, _img, _newSize ){
                this._model.cicErrorBox().show().html(
                    JC.f.printf( 
                        '{5}<p>图片实际宽高为: {2}, {3}</p><p>图片缩放后宽高为: {6}, {7}</p><p>可接受的最小宽高为: {0}, {1}</p>{4}'
                        , this._model.cicMinWidth(), this._model.cicMinHeight()
                        , _width, _height
                        , '<a href="' + _img.attr( 'src' ) + '" target="_blank">查看图片</a>'
                        , '<h3>图片缩放尺寸错误 </h3>'
                        , _newSize.zoom.width, _newSize.zoom.height
                    )
                );
            }

    });

    /**
     * 按比例缩放图片
     * <br />返回: { width: int, height: int }
     * @param   {int}   _w
     * @param   {int}   _h
     * @param   {int}   _newW
     * @param   {int}   _newH
     * @return  {object}    width, height
     */
    function sizeZoom( _w, _h, _newW, _newH ){
        var w, h;
        
        if( _w > _newW && ( _h < _w )){
            w = _newW;
            h = _h - ( _h / ( _w / ( _w - _newW ) ) );
        }else if( _h > _newH && ( _h > _w ) ){
            w = _w - ( _w / ( _h / ( _h - _newH ) ) );
            h = _newH;
        }else{
            w = _newW; 
            h = _newH;
        }
        return { 'width': w, 'height': h };
    }

    _jdoc.ready( function(){
        var _insAr = 0;
        ImageCutter.autoInit
            && ( _insAr = ImageCutter.init() )
            /*
            && $( '<h2>ImageCutter total ins: ' 
                + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            */
            ;
    });

    return JC.ImageCutter;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
