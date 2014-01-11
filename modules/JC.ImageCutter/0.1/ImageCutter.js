//TODO: 捕获图片加载错误
;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
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
    var _jdoc = $( document ), _jwin = $( window ), _jbody;

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

    ImageCutter.minRectSidelength = 50;
    ImageCutter.minImageSidelength = 50;
    ImageCutter.maxImageSidelength;
    ImageCutter._positionPoint = 10000;
    ImageCutter._defaultCursor = 'auto';
    ImageCutter.moveStep = 1;

    ImageCutter.dragInfo =
        function( _p, _evt, _size, _srcSelector ){
            if( _p && _evt && _size ){
                ImageCutter._dragInfo = {
                    'ins': _p
                    , 'evt': _evt
                    , 'size': _p._model.size()
                    , 'tmpSize': _size
                    , 'pageX': _evt.pageX
                    , 'pageY': _evt.pageY
                    , 'srcSelector': _srcSelector
                    , 'offset': _p.selector().offset()
                    , 'minDistance': _p._model.minDistance()
                    , 'winWidth': _jwin.width()
                    , 'winHeight': _jwin.height()
                    , 'btnSidelength': _p._model.btnTl().width()
                }
                //JC.log( 'minDistance', ImageCutter._dragInfo.minDistance );
                //window.JSON && JC.log( JSON.stringify( _size ) );
            }
            return ImageCutter._dragInfo;
        };

    ImageCutter.cleanInfo = 
        function(){

            _jdoc.off( 'mouseup', ImageCutter.dragMainMouseUp );
            _jdoc.off( 'mousemove', ImageCutter.dragMainMouseMove );

            _jdoc.off( 'mouseup', ImageCutter.dragBtnMouseUp );
            _jdoc.off( 'mousemove', ImageCutter.dragBtnMouseMove );

            ImageCutter.dragInfo( null );
            _jbody.css( 'cursor', ImageCutter._defaultCursor );
        };
    /*
        {
            "minX": 0, 
            "dragger": {
                "srcSidelength": 94, 
                "sidelength": 84, 
                "left": 103, 
                "top": 103, 
                "halfSidelength": 42
            }, 
            "maxX": 300, 
            "top": 56, 
            "left": 0, 
            "width": 1680, 
            "height": 1050, 
            "selector": {
                "width": 300, 
                "height": 300
            }, 
            "preview": {
                "width": 300, 
                "height": 188
            }, 
            "minY": 56, 
            "img": {
                "width": 1680, 
                "height": 1050
            }, 
            "maxY": 244
        }
    */
    ImageCutter.dragMainMouseMove =
        function( _evt ){
            if( !( ImageCutter.dragInfo() && _evt ) ) return;
            var _di = ImageCutter.dragInfo(), _p;
            var _p = _di.ins
                , _posX = _di.pageX - _evt.pageX
                , _posY = _di.pageY - _evt.pageY

                , _newX = _di.size.dragger.left - _posX
                , _newY = _di.size.dragger.top - _posY

                , _maxX = _di.size.maxX - _di.size.dragger.srcSidelength
                , _maxY = _di.size.maxY - _di.size.dragger.srcSidelength
                ;

            _newX < _di.size.minX && ( _newX = _di.size.minX );
            _newX > _maxX && ( _newX = _maxX );

            _newY < _di.size.minY && ( _newY = _di.size.minY );
            _newY > _maxY && ( _newY = _maxY );

            _di.tmpSize.dragger.left = _newX;
            _di.tmpSize.dragger.top = _newY;

            _p.updatePosition( _di.tmpSize );
            _p.trigger( ImageCutter.Model.UPDATE_RECT, [ _di.tmpSize ] );

            //JC.log( 'ImageCutter.dragMainMouseMove', _newX, _newY );
        };

    ImageCutter.dragMainMouseUp =
        function( _evt ){
            if( !ImageCutter.dragInfo() ) return;
            var _di = ImageCutter.dragInfo(), _p = _di.ins;

            _jbody.css( 'cursor', ImageCutter._defaultCursor );

            _p._size( _di.tmpSize );
            _p.trigger( ImageCutter.Model.UPDATE_RECT, [ _di.tmpSize ] );
            _p.trigger( ImageCutter.Model.DRAG_DONE, [ _di.tmpSize ] );

            _p.cleanStatus();
        };

    ImageCutter.dragBtnMouseMove =
        function( _evt ){
            if( !( ImageCutter.dragInfo() && _evt ) ) return;
            var _di = ImageCutter.dragInfo()
                , _p = _di.ins
                , _posX = _di.pageX - _evt.pageX
                , _posY = _di.pageY - _evt.pageY
                , _direct = _di.srcSelector.attr( 'diretype' )
                ;
            //JC.log( 'old', _di.size.dragger.left, _di.size.dragger.top );
            //JC.log( 'ImageCutter.dragBtnMouseMove', _posX, _posY, _direct );

            switch( _direct ){
                case 'cic_btnTl': ImageCutter.resizeTopLeft( _di, _posX, _posY, _evt ); break;
                case 'cic_btnTc': ImageCutter.resizeTopCenter( _di, _posX, _posY, _evt ); break;
                case 'cic_btnTr': ImageCutter.resizeTopRight( _di, _posX, _posY, _evt ); break;
                case 'cic_btnMl': ImageCutter.resizeMidLeft( _di, _posX, _posY, _evt ); break;
                case 'cic_btnMr': ImageCutter.resizeMidRight( _di, _posX, _posY, _evt ); break;
                case 'cic_btnBl': ImageCutter.resizeBottomLeft( _di, _posX, _posY, _evt ); break;
                case 'cic_btnBc': ImageCutter.resizeBottomCenter( _di, _posX, _posY, _evt ); break;
                case 'cic_btnBr': ImageCutter.resizeBottomRight( _di, _posX, _posY, _evt ); break;
            }
            _p.trigger( ImageCutter.Model.UPDATE_RECT, [ _di.tmpSize ] );
        };

    ImageCutter.dragBtnMouseUp =
        function( _evt ){
            if( !ImageCutter.dragInfo() ) return;
            var _di = ImageCutter.dragInfo(), _p = _di.ins;
            //JC.log( 'ImageCutter.dragBtnMouseUp', new Date().getTime() );

            _jbody.css( 'cursor',  ImageCutter._defaultCursor );

            _p._size( _di.tmpSize );
            _p.trigger( ImageCutter.Model.UPDATE_RECT, [ _di.tmpSize ] );
            _p.trigger( ImageCutter.Model.DRAG_DONE, [ _di.tmpSize ] );

            _p.cleanStatus();
        };

    ImageCutter.defaultKeydown =
        function( _evt ){
            if( !( _evt && ImageCutter._currentIns ) ) return;
            _evt.preventDefault();
            var _keyCode = _evt.keyCode;
            //JC.log( 'ImageCutter.defaultKeydown', new Date().getTime(), _keyCode );
            switch( _keyCode ){
                case 37: ImageCutter._currentIns.moveMinus(); break;
                case 38: ImageCutter._currentIns.moveUp(); break;
                case 39: ImageCutter._currentIns.movePlus(); break;
                case 40: ImageCutter._currentIns.moveDown(); break;
            }
        };

    ImageCutter.defaultMouseenter =
        function( _evt ){
            var _sp = $( this ), _ins = BaseMVC.getInstance( _sp, ImageCutter );
            if( !_ins ) return;
            ImageCutter._currentIns = _ins;
            //JC.log( 'ImageCutter.defaultMouseenter', new Date().getTime() );
        };

    ImageCutter.defaultMouseleave =
        function( _evt ){
            ImageCutter._currentIns = null;
            //JC.log( 'ImageCutter.defaultMouseleave', new Date().getTime() );
        };

    JC.BaseMVC.build( ImageCutter );

    JC.f.extendObject( ImageCutter.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'ImageCutter _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.on( ImageCutter.Model.INITED, function( _evt ){
                    _p._model.imageUrl()
                        && _p.update( _p._model.imageUrl() );

                    _p._model.cicInitedCb()
                        && _p._model.cicInitedCb().call( _p, _p.selector() );
                });

                _p.on( ImageCutter.Model.IMAGE_LOAD, function( _evt, _img, _width, _height ){

                    _p.clean();

                    _p._model.imageUrl( _img.attr( 'src' ) );

                    if( _p._model.maxImageSidelength()
                        && ( _width > _p._model.maxImageSidelength() || _height > _p._model.maxImageSidelength() ) 
                    ){
                        _p.trigger( ImageCutter.Model.ERROR_SIZE, [ _width, _height, _img, true ] );
                        return;
                    }

                    if( _p._model.minImageSidelength()
                        && ( _width < _p._model.minImageSidelength() || _height < _p._model.minImageSidelength() ) 
                    ){
                        _p.trigger( ImageCutter.Model.ERROR_SIZE, [ _width, _height, _img ] );
                        return;
                    }

                    var _newSize = _p._model.size( _width, _height );

                    if( _newSize.preview.width < _p._model.minRectSidelength() 
                        || _newSize.preview.height < _p._model.minRectSidelength() ){
                        _p.trigger( ImageCutter.Model.ERROR_PREVIEW, [ _width, _height, _img, _newSize ] );
                        return;
                    }

                    _img.css( { 
                        'width': _newSize.preview.width + 'px'
                        , 'height': _newSize.preview.height + 'px' 
                        , 'left': _newSize.left + 'px'
                        , 'top': _newSize.top + 'px'
                    });
                    _img.prependTo( _p.selector() );
                    
                    _p._model.imageUrlSelector()
                        && _p._model.imageUrlSelector().length
                        && _p._model.imageUrlSelector().val( _img.attr( 'src' ) );

                    _p._view.initDragger( _newSize );
                    
                    _p.trigger( ImageCutter.Model.INIT_PREVIEW );
                    _p.trigger( ImageCutter.Model.UPDATE_COORDINATE, [ _newSize ] );

                    _p._model.ready( true );

                    _p._model.imageInitedCb()
                        && _p._model.imageInitedCb().call( _p, _p.selector(), _img );
                });

                _p.selector().on( 'mouseenter', ImageCutter.defaultMouseenter );
                _p.selector().on( 'mouseleave', ImageCutter.defaultMouseleave );

                _p.selector().delegate( 'div.cic_dragMain', 'mousedown', function( _evt ){
                    _evt.preventDefault();
                    _evt.stopPropagation();
                    //JC.log( 'div.cic_dragMain mousedown', new Date().getTime() );

                    ImageCutter.cleanInfo();
                    ImageCutter.dragInfo( _p, _evt, JC.f.cloneObject( _p._model.size() ), $( this ) );

                    _jbody.css( 'cursor', 'move' );
                    _p.trigger( ImageCutter.Model.INIT_PREVIEW );

                    _jdoc.on( 'mousemove', ImageCutter.dragMainMouseMove );
                    _jdoc.on( 'mouseup', ImageCutter.dragMainMouseUp );

                    return false;
                });

                _p.selector().delegate( 'button.cic_btn', 'mousedown', function( _evt ){
                    _evt.preventDefault();
                    //JC.log( 'div.cic_btn mousedown', new Date().getTime() );

                    ImageCutter.cleanInfo();
                    ImageCutter.dragInfo( _p, _evt, JC.f.cloneObject( _p._model.size() ), $( this ) );

                    var _btn = $( this )
                        , _direct = _btn.attr( 'diretype' )
                        ;

                    switch( _direct ){
                        case 'cic_btnTl': _jbody.css( 'cursor', 'nw-resize' ); break;
                        case 'cic_btnTc': _jbody.css( 'cursor', 'n-resize' ); break;
                        case 'cic_btnTr': _jbody.css( 'cursor', 'ne-resize' ); break;
                        case 'cic_btnMl': _jbody.css( 'cursor', 'w-resize' ); break;
                        case 'cic_btnMr': _jbody.css( 'cursor', 'e-resize' ); break;
                        case 'cic_btnBl': _jbody.css( 'cursor', 'sw-resize' ); break;
                        case 'cic_btnBc': _jbody.css( 'cursor', 's-resize' ); break;
                        case 'cic_btnBr': _jbody.css( 'cursor', 'se-resize' ); break;
                    }

                    _p.trigger( ImageCutter.Model.INIT_PREVIEW );

                    _jdoc.on( 'mousemove', ImageCutter.dragBtnMouseMove );
                    _jdoc.on( 'mouseup', ImageCutter.dragBtnMouseUp );

                    return false;
                });

                _p.on( ImageCutter.Model.INIT_PREVIEW, function( _evt ){
                    //JC.log( 'ImageCutter.Model.INIT_PREVIEW', new Date().getTime() );
                    _p._view.initPreviewItems();
                });

                _p.on( ImageCutter.Model.UPDATE_RECT, function( _evt, _size ){
                    _p.trigger( ImageCutter.Model.UPDATE_PREVIEW, [ _size ] );
                });

                _p.on( ImageCutter.Model.UPDATE_PREVIEW, function( _evt, _size ){
                    //JC.log( 'ImageCutter.Model.UPDATE_PREVIEW', new Date().getTime() );
                    if( !_size ) return;
                    _p._view.updatePreviewItems( _size );
                });

                _p.on( ImageCutter.Model.DRAG_DONE, function( _evt, _size ){
                    //JC.log( 'ImageCutter.DRAG_DONE', new Date().getTime() );
                    _p.trigger( ImageCutter.Model.UPDATE_COORDINATE, [ _size ] );
                });

                _p.on( ImageCutter.Model.UPDATE_COORDINATE, function( _evt, _size ){
                    var _size = _size || _p._model.size()
                        , _selector = _p._model.coordinateSelector()
                        ;
                    if( !_size ) return;
                    var _corAr = _p._model.realCoordinate( _size );

                    _p._model.coordinateUpdateCb() 
                        && _p._model.coordinateUpdateCb().call( _p, _corAr, _p._model.imageUrl() );

                    if( !( _selector && _selector.length ) ) return;
                    _selector.val( _corAr );
                });

                _p.on( ImageCutter.Model.ERROR, function( _evt ){
                    _p._model.clean();
                    _p._model.ready( false );
                });

                _p.on( ImageCutter.Model.LOAD_ERROR, function( _evt, _imgUrl ){
                    _p.clean();
                    _p._model.ready( false );
                    _p._view.imageLoadError( _imgUrl );
                    _p.trigger( ImageCutter.Model.ERROR );
                });

                _p.on( ImageCutter.Model.ERROR_SIZE, function( _evt, _width, _height, _img, _isMax ){
                    _p._view.sizeError( _width, _height, _img, _isMax );
                    _p.trigger( ImageCutter.Model.ERROR );
                });

                _p.on( ImageCutter.Model.ERROR_PREVIEW, function( _evt, _width, _height, _img, _newSize ){
                    _p._view.previewError( _width, _height, _img, _newSize );
                    _p.trigger( ImageCutter.Model.ERROR );
                });
            }

        , _inited:
            function(){
                //JC.log( 'ImageCutter _inited', new Date().getTime() );
                this.trigger( ImageCutter.Model.INITED );
            }

        , update:
            function( _imgUrl ){
                if( !_imgUrl ) return;
                this._view.update( _imgUrl );
            }

        , clean:
            function(){
                this.cleanStatus();
                this._view.clean();
                this._model.clean();
            }

        , updatePosition: function(){ this._view.updatePosition.apply( this._view, JC.f.sliceArgs( arguments ) ); }

        , cleanStatus:
            function(){
                var _p = this;

                ImageCutter.cleanInfo();
            }

        , _size: function(){ this._model.size.apply( this._model, JC.f.sliceArgs( arguments ) ); }

        , moveMinus: function(){ this._view.moveMinus.apply( this._view, JC.f.sliceArgs( arguments ) ); }
        , moveUp: function(){ this._view.moveUp.apply( this._view, JC.f.sliceArgs( arguments ) ); }
        , movePlus: function(){ this._view.movePlus.apply( this._view, JC.f.sliceArgs( arguments ) ); }
        , moveDown: function(){ this._view.moveDown.apply( this._view, JC.f.sliceArgs( arguments ) ); }
    });

    ImageCutter.Model._instanceName = 'JCImageCutter';

    ImageCutter.Model.INITED = "ImageCutterInited";
    ImageCutter.Model.INIT_PREVIEW = "CICInitPreview";
    ImageCutter.Model.DRAG_DONE = "CICDragDone";

    ImageCutter.Model.UPDATE_RECT = "CICUpdateDragger";
    ImageCutter.Model.UPDATE_PREVIEW = "CICUpdatePreview";
    ImageCutter.Model.UPDATE_COORDINATE = "CICUpdateCoordinate";

    ImageCutter.Model.IMAGE_LOAD = 'CICImageLoad';
    ImageCutter.Model.LOAD_ERROR = 'CICImageLoadError';

    ImageCutter.Model.ERROR = "CICError";
    ImageCutter.Model.ERROR_SIZE = "CICSizeError";
    ImageCutter.Model.ERROR_PREVIEW = "CICPreviewError";


    JC.f.extendObject( ImageCutter.Model.prototype, {
        init:
            function(){
                //JC.log( 'ImageCutter.Model.init:', new Date().getTime() );
                var _p = this;
            }

        , ready: 
            function( _setter ){
                typeof _setter != 'undefined' && ( this._ready = _setter );
                return this._ready;
            }

        , imageUrl:
            function( _setter ){
                _setter && this.selector().attr( 'imageUrl', _setter );
                return this.attrProp( 'imageUrl' );
            }

        , cicInitedCb: function(){ return this.callbackProp( 'cicInitedCb' ); }
        , imageInitedCb: function(){ return this.callbackProp( 'imageInitedCb' ); }

        , previewSelector:
            function( _cleanCache ){
                if( this.is( '[previewSelector]' ) && ( !this._previewSelector || _cleanCache ) ){
                    this._previewSelector = this.selectorProp( 'previewSelector' );
                }
                return this._previewSelector;
            }

        , minRectSidelength: function(){ return this.intProp( 'minRectSidelength' ) || ImageCutter.minRectSidelength; }

        , minImageSidelength: function(){ return this.intProp( 'minImageSidelength' ) || ImageCutter.minImageSidelength; }
        , maxImageSidelength: function(){ return this.intProp( 'maxImageSidelength' ) || ImageCutter.maxImageSidelength; }

        , minDistance:
            function(){
                return pointDistance( { x: 0, y: 0 }, { x: this.minRectSidelength(), y: this.minRectSidelength() } );
            }

        , size: 
            function( _width, _height ){ 

                if( _width && _height ){
                    this._size.img = { width: _width, height: _height };

                    this._size.preview = { 'width': _width, 'height': _height };
                    if( _width > this._size.selector.width || _height > this._size.selector.height ){
                        this._size.preview = sizeZoom( _width, _height, this._size.selector.width, this._size.selector.height );
                    }

                    this._size.preview.width = Math.round( this._size.preview.width );
                    this._size.preview.height = Math.round( this._size.preview.height );

                    this._size.left = Math.round( ( this._size.selector.width - this._size.preview.width ) / 2 );
                    this._size.top = Math.round( ( this._size.selector.height - this._size.preview.height ) / 2 );

                    this._size.width = _width;
                    this._size.height = _height;

                    this._size.minX = this._size.left;
                    this._size.maxX = ( this._size.minX + this._size.preview.width );

                    this._size.minY = this._size.top;
                    this._size.maxY = ( this._size.minY + this._size.preview.height );

                    this._size.dragger = {
                        srcSidelength: 0
                        , sidelength: 0
                        , halfSidelength: 0
                        , left: 0
                        , top: 0
                    };

                    //JC.log( this._size.left, this._size.top );
                }

                if( _width && !_height ){
                    this._size = _width;
                }

                return this._size; 
            }

        , realCoordinate:
            function( _size ){
                var _r = [];
                //JC.log( 'ImageCutter._model.realCoordinate', new Date().getTime() );
                if( _size ){
                    var _p = this
                        , _percent = _size.img.width / _size.preview.width
                        , _left = ( _size.dragger.left - _size.left ) * _percent
                        , _top = ( _size.dragger.top - _size.top ) * _percent
                        , _sidelength = _size.dragger.srcSidelength * _percent
                        ;

                    _left = Math.ceil( _left );
                    _top = Math.ceil( _top );
                    _sidelength = Math.ceil( _sidelength );

                    _left < 0 && ( _left = 0 );
                    _top < 0 && ( _top = 0 );

                    ( _left + _sidelength ) > _size.img.width && ( _left = _size.img.width - _sidelength );
                    ( _top + _sidelength ) > _size.img.height && ( _top = _size.img.height - _sidelength );

                    _r.push( _left, _top, _sidelength, _sidelength, _size.img.width, _size.img.height );
                }
                return _r;
            }

        , coordinateUpdateCb: function(){ return this.callbackProp( 'coordinateUpdateCb' ); }

        , clean: 
            function(){
                var _p = this;
                this._size ={
                    selector: { width: _p.selector().prop( 'offsetWidth' ), height: _p.selector().prop( 'offsetHeight' ) }
                    , img: { width: 0, height: 0 }
                    , preview: { width: 0, height: 0 }
                    , left: 0
                    , top: 0
                };

                this.previewSelector()
                    && this.previewSelector().each( function(){
                            $( this ).html( '' );
                       });

                this.coordinateSelector() && this.coordinateSelector().val( '' );
                this.imageUrlSelector() && this.imageUrlSelector().val( '' );
            }

        , draggerList:
            function(){
                if( !this._draggerList ){
                    this._draggerList = 
                        $( 
                            JC.f.printf( 
                                '{0}{1}{2}{3}{4}{5}{6}{7}{8}'
                                , '<button type="button" class="cic_btn cic_btnTl" diretype="cic_btnTl" ></button>'
                                , '<button type="button" class="cic_btn cic_btnTc" diretype="cic_btnTc" ></button>'
                                , '<button type="button" class="cic_btn cic_btnTr" diretype="cic_btnTr" ></button>'
                                , '<button type="button" class="cic_btn cic_btnMl" diretype="cic_btnMl" ></button>'
                                , '<button type="button" class="cic_btn cic_btnMr" diretype="cic_btnMr" ></button>'
                                , '<button type="button" class="cic_btn cic_btnBl" diretype="cic_btnBl" ></button>'
                                , '<button type="button" class="cic_btn cic_btnBc" diretype="cic_btnBc" ></button>'
                                , '<button type="button" class="cic_btn cic_btnBr" diretype="cic_btnBr" ></button>'
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
                !this._maskLeft && ( this.maskList(), this._maskLeft =  this.selector().find( 'div.cic_maskLeft' ) );
                return this._maskLeft;
            }

        , maskTop:
            function(){
                !this._maskTop && ( this.maskList(), this._maskTop =  this.selector().find( 'div.cic_maskTop' ) );
                return this._maskTop;
            }

        , maskRight:
            function(){
                !this._maskRight && ( this.maskList(), this._maskRight =  this.selector().find( 'div.cic_maskRight' ) );
                return this._maskRight;
            }

        , maskBottom:
            function(){
                !this._maskBottom && ( this.maskList(), this._maskBottom =  this.selector().find( 'div.cic_maskBottom' ) );
                return this._maskBottom;
            }

        , dragMain:
            function(){
                if( !this._dragMain ){
                    this._dragMain = $( '<div class="cic_dragMain"></div>' );
                    this._dragMain.hide().appendTo( this.selector() );
                }
                return this._dragMain;
            }

        , cicErrorBox:
            function(){
                if( !this._cicErrorBox ){
                    this._cicErrorBox = $( '<div class="CIC_ERROR"></div>' );
                    this._cicErrorBox.appendTo( this.selector() );
                }
                return this._cicErrorBox;
            }

        , coordinateSelector: function(){ return this.selectorProp( 'coordinateSelector' ); }

        , defaultCoordinate:
            function(){
                var _p = this, _r = '', _v = this.attrProp( 'defaultCoordinate' );
                if( _v ){
                    _r = _v.replace( /[^\d,\-]+/g, '' );
                    if( _r ){
                        _r = _r.split( ',' );
                        $.each( _r, function( _ix, _item ){
                            _r[ _ix ] = parseInt( _item, 10 );
                            //JC.log( 'aaa', _item, _r[ _ix ] );
                        });
                        //JC.log( _r );
                    }
                }
                return _r;
            }

        , imageUrlSelector: function(){ return this.selectorProp( 'imageUrlSelector' ); }
    });

    JC.f.extendObject( ImageCutter.View.prototype, {
        init:
            function(){
                //JC.log( 'ImageCutter.View.init:', new Date().getTime() );
                var _p = this;
            }

        , clean:
            function(){
                this.selector().find( 'img' ).remove();
                this.selector().find( 'button' ).hide();

                this._model.maskList().hide();
                this._model.cicErrorBox().hide();
            }

        , update:
            function( _imgUrl ){
                if( !_imgUrl ) return;
                var _p = this, _img = document.createElement( 'img' ), _jimg = $( _img );

                    _p.clean();

                    _jimg.on( 'load', function(){
                        //JC.log( this.width, this.height );
                        _p.trigger( ImageCutter.Model.IMAGE_LOAD, [ _jimg, this.width, this.height] );
                    });

                    _jimg.on( 'error', function(){
                        _p.trigger( ImageCutter.Model.LOAD_ERROR, [ _imgUrl ] );
                    });

                    _jimg.on( 'mousedown', function( _evt ){ _evt.preventDefault(); return false; } );
                    _img.src =  _imgUrl;
            }

        , initDragger:
            function( _size ){
                this._model.dragMain();
                this._model.maskList()

                var _p = this
                    , _dragger = _p._model.draggerList()
                    , _sidelength = _size.preview.width > _size.preview.height ? _size.preview.height : _size.preview.width
                    , _sidelength = _sidelength / 2 > _p._model.minRectSidelength() ? _sidelength / 2 : _p._model.minRectSidelength()
                    , _sidelength = Math.ceil( _sidelength )
                    , _sidelength = _sidelength > _p._model.minRectSidelength() ? _sidelength : _p._model.minRectSidelength()
                    , _btnSize = _p._model.btnTl().width()
                    , _srcSidelength = _sidelength
                    , _sidelength = _sidelength - _btnSize
                    , _halfSidelength = _sidelength / 2
                    , _left = _size.left + ( _size.preview.width - _sidelength ) / 2 - _btnSize / 2
                    , _top = _size.top + ( _size.preview.height - _sidelength ) / 2 - _btnSize / 2

                    ;
                //JC.log( 'initDragger', _sidelength, new Date().getTime() );

                _size.dragger = {
                    srcSidelength: _srcSidelength
                    , sidelength: _sidelength
                    , halfSidelength: _halfSidelength
                    , left: _left
                    , top: _top
                };

                _size = _p.processDefaultCoordinate( _size );

                _p.updatePosition( _size );
            }

        , processDefaultCoordinate:
            function( _size ){
                var _p = this
                    , _defaultCoordinate = _p._model.defaultCoordinate()
                    , _btnSize = _p._model.btnTl().width()
                    ;

                if( _defaultCoordinate.length ){
                    var _srcSidelength = _size.dragger.srcSidelength
                        , _sidelength = _size.dragger.sidelength
                        , _halfSidelength = _size.dragger.halfSidelength
                        , _left = _size.left
                        , _top = _size.top
                        ;

                    switch( _defaultCoordinate.length ){
                        case 1: {
                            _srcSidelength = _defaultCoordinate[0];
                            _left = _size.left + ( _size.preview.width - _srcSidelength ) / 2;
                            _top = _size.top + ( _size.preview.height - _srcSidelength ) / 2;

                            break;
                        }
                        case 2: {
                            _left = _defaultCoordinate[0];
                            _top = _defaultCoordinate[1];
                            break;
                        }
                        case 3: {
                            _left = _defaultCoordinate[0] + _size.left;
                            _top = _defaultCoordinate[1] + _size.top;
                            _srcSidelength = _defaultCoordinate[2];
                            break;
                        }
                    }
                    //JC.log( [ _left, _top, 'xxx', _p.selector().attr(  'defaultCoordinate' ) ] );

                    if( _srcSidelength > _size.preview.width || _srcSidelength > _size.preview.height ){
                        _srcSidelength = _size.preview.width > _size.preview.height 
                                            ? _size.preview.height
                                            : _size.preview.width;
                        _left = _size.left + ( _size.preview.width - _srcSidelength ) / 2;
                        _top = _size.top + ( _size.preview.height - _srcSidelength ) / 2;
                    }

                    if( _left < _size.left 
                        || ( _left + _srcSidelength ) > ( _size.left + _size.preview.width ) 
                        || _top < _size.top
                        || ( _top + _srcSidelength ) > ( _size.top + _size.preview.height )
                    ){
                        _left = _size.left + ( _size.preview.width - _srcSidelength ) / 2;
                        _top = _size.top + ( _size.preview.height - _srcSidelength ) / 2;
                    }

                    _sidelength = _srcSidelength - _btnSize;
                    _halfSidelength = _sidelength / 2;

                    if( _srcSidelength < _p._model.minRectSidelength() ){
                        _srcSidelength = _p._model.minRectSidelength();
                        _sidelength = _srcSidelength - _btnSize;
                        _halfSidelength = _sidelength/ 2;
                        _left = _size.left + ( _p.preview.width - _srcSidelength ) / 2;
                        _top = _size.top + ( _p.preview.height - _srcSidelength ) / 2;
                    }

                    _size.dragger = {
                        srcSidelength: _srcSidelength
                        , sidelength: _sidelength
                        , halfSidelength: _halfSidelength
                        , left: _left
                        , top: _top
                    };

                }

                return _size;
            }

        , updatePosition:
            function( _size ){
                var _p = this;
                //JC.log( 'updatePosition', new Date().getTime() );

                _p.updateDragger( _size );
                _p.updateMask( _size );
                _p.updateDragMain( _size );

            }

        , updateDragger:
            function( _size ){
                var _p = this;

                _p._model.btnTl().css( { 'left': _size.dragger.left , 'top': _size.dragger.top } );
                _p._model.btnTc().css( { 'left': ( _size.dragger.left + _size.dragger.halfSidelength ), 'top': _size.dragger.top } );
                _p._model.btnTr().css( { 'left': ( _size.dragger.left + _size.dragger.sidelength ), 'top': _size.dragger.top } );

                _p._model.btnMl().css( { 'left': _size.dragger.left
                                        , 'top': ( _size.dragger.top + _size.dragger.halfSidelength) } );

                _p._model.btnMr().css( { 'left': _size.dragger.left + _size.dragger.sidelength
                                        , 'top': ( _size.dragger.top + _size.dragger.halfSidelength ) } );

                _p._model.btnBl().css( { 'left': _size.dragger.left, 'top': _size.dragger.top + _size.dragger.sidelength } );

                _p._model.btnBc().css( { 'left': _size.dragger.left + _size.dragger.halfSidelength
                                        , 'top': _size.dragger.top + _size.dragger.sidelength} );

                _p._model.btnBr().css( { 'left': _size.dragger.left + _size.dragger.sidelength 
                                        , 'top': _size.dragger.top + _size.dragger.sidelength } );

                _p._model.draggerList().show();
            }

        , updateMask:
            function( _size ){
                var _p = this
                    , _maskList = _p._model.maskList()
                    ;

                //JC.log( _size.dragger.left, _size.dragger.top, _size.dragger.srcSidelength );

                _p._model.maskLeft().css( { 
                    'height': _size.dragger.srcSidelength
                    , 'width': _size.dragger.left
                    , 'top': _size.dragger.top
                });

                _p._model.maskTop().css( { 
                    'height': _size.dragger.top
                    , 'width': _size.selector.width 
                });

                _p._model.maskRight().css( {
                    'left': _size.dragger.left + _size.dragger.srcSidelength
                    , 'top': _size.dragger.top
                    , 'width': _size.selector.width - _size.dragger.left - _size.dragger.srcSidelength
                    , 'height': _size.dragger.srcSidelength
                });

                _p._model.maskBottom().css( { 
                    'height': _size.selector.height - (_size.dragger.top + _size.dragger.srcSidelength )
                    , 'width': _size.selector.width
                    , 'top': _size.dragger.top + _size.dragger.srcSidelength 
                });

                _maskList.show();
            }

        , updateDragMain:
            function( _size ){
                var _p = this, _dragMain = _p._model.dragMain();

                _dragMain.css({
                    'width': _size.dragger.srcSidelength 
                    , 'height': _size.dragger.srcSidelength
                    , 'left': _size.dragger.left
                    , 'top': _size.dragger.top
                });

                _dragMain.show();
            }

        , initPreviewItems:
            function(){
                var _p = this, _previewSelector = _p._model.previewSelector( true );
                if( !( _previewSelector && _previewSelector.length ) ) return;
                _previewSelector.each( function(){
                    var _sp = $( this );
                    var _img = _sp.find( 'img' );

                    if ( !_img.length ){
                        _img = $( JC.f.printf( '<img src="{0}" />', _p._model.imageUrl() ) );
                        _img.appendTo( _sp );
                    }else{
                        _img.attr( 'src', _p._model.imageUrl() );
                    }
                });

                _p.trigger( ImageCutter.Model.UPDATE_RECT, [ _p._model.size() ] );
            }

        , updatePreviewItems:
            function( _size ){
                var _p = this
                    , _previewSelector = _p._model.previewSelector()
                    ;

                if( !_size ) return;
                if( !( _previewSelector && _previewSelector.length ) ) return;

                _previewSelector.each( function(){
                    var _sp = $( this )
                        , _width = _sp.width()
                        , _img = _sp.find( 'img' )
                        ;

                    if( !( _width && _img.length ) ) return;

                    var _width = _sp.width()
                        , _percent = _width / _size.dragger.srcSidelength
                        , _newWidth = _size.preview.width * _percent
                        , _newHeight = _size.preview.height * _percent
                        , _newLeft = ( _size.dragger.left - _size.left ) * _percent
                        , _newTop = ( _size.dragger.top - _size.top ) * _percent
                        ;

                    _img.css( {
                        'width': _newWidth
                        , 'height': _newHeight
                        , 'left': -_newLeft
                        , 'top': -_newTop
                    });

                });
            }

        , moveMinus:
            function(){
                if( !this._model.ready() ) return;
                var _p = this, _size = _p._model.size(); 
                _size.dragger.left -= ImageCutter.moveStep;
                _size.dragger.left < _size.left && ( _size.dragger.left = _size.left );
                _p.updatePosition( _size );
                _p.trigger( ImageCutter.Model.UPDATE_RECT, [ _size ] );
                _p.trigger( ImageCutter.Model.DRAG_DONE, [ _size ] );
            }

        , moveUp:
            function(){
                if( !this._model.ready() ) return;
                var _p = this, _size = _p._model.size(); 
                _size.dragger.top -= ImageCutter.moveStep;
                _size.dragger.top < _size.top && ( _size.dragger.top = _size.top );
                _p.updatePosition( _size );
                _p.trigger( ImageCutter.Model.UPDATE_RECT, [ _size ] );
                _p.trigger( ImageCutter.Model.DRAG_DONE, [ _size ] );
            }

        , movePlus:
            function(){
                if( !this._model.ready() ) return;
                var _p = this, _size = _p._model.size(); 
                _size.dragger.left += ImageCutter.moveStep;
                ( _size.dragger.left + _size.dragger.srcSidelength ) > ( _size.left + _size.preview.width ) 
                    && ( _size.dragger.left = _size.left + _size.preview.width - _size.dragger.srcSidelength );
                _p.updatePosition( _size );
                _p.trigger( ImageCutter.Model.UPDATE_RECT, [ _size ] );
                _p.trigger( ImageCutter.Model.DRAG_DONE, [ _size ] );
            }

        , moveDown:
            function(){
                if( !this._model.ready() ) return;
                var _p = this, _size = _p._model.size(); 
                _size.dragger.top += ImageCutter.moveStep;
                ( _size.dragger.top + _size.dragger.srcSidelength ) > ( _size.top + _size.preview.height ) 
                    && ( _size.dragger.top = _size.top + _size.preview.height - _size.dragger.srcSidelength );
                _p.updatePosition( _size );
                _p.trigger( ImageCutter.Model.UPDATE_RECT, [ _size ] );
                _p.trigger( ImageCutter.Model.DRAG_DONE, [ _size ] );
            }

        , sizeError:
            function( _width, _height, _img, _isMax ){
                var _sidelength, _word;
                if( _isMax ){
                    _sidelength = this._model.maxImageSidelength();
                    _word = '大';
                }else{
                    _sidelength = this._model.minImageSidelength();
                    _word = '小';
                }
                this._model.cicErrorBox().show().html(
                    JC.f.printf( 
                        '{5}<p>图片实际宽高为: {2}, {3}</p><p>可接受的最'+ _word +'宽高为: {0}, {1}</p>{4}'
                        , _sidelength, _sidelength
                        , _width, _height
                        , '<a href="' + _img.attr( 'src' ) + '" target="_blank">查看图片</a>'
                        , '<h3>图片尺寸错误 </h3>'
                    )
                );
            }

        , previewError:
            function( _width, _height, _img, _newSize ){
                this._model.cicErrorBox().show().html(
                    JC.f.printf( 
                        '{5}<p>图片实际宽高为: {2}, {3}</p>'
                        + '<p>图片缩放后宽高为: {6}, {7}</p>'
                        + '<p>缩放后可接受的最小宽高为: {0}, {1}</p>{4}'
                        , this._model.minRectSidelength(), this._model.minRectSidelength()
                        , _width, _height
                        , '<a href="' + _img.attr( 'src' ) + '" target="_blank">查看图片</a>'
                        , '<h3>图片缩放比例错误 </h3>'
                        , _newSize.preview.width, _newSize.preview.height
                    )
                );
            }

        , imageLoadError:
            function( _imgUrl){
                this._model.cicErrorBox().show().html(
                    JC.f.printf( '<p>无法加载图片<br/>请检查图片路径和网络链接</p><p>{0}</p>'
                        , _imgUrl
                    )
                );
            }

    });

    ImageCutter.resizeTopLeft =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _maxX = _di.size.dragger.left + _di.size.dragger.srcSidelength 
                , _maxY = _di.size.dragger.top + _di.size.dragger.srcSidelength
                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }
                            , { x: 0, y: -ImageCutter._positionPoint } ) )
                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }
                            , { x: 0, y: -ImageCutter._positionPoint } ) )
                , _distance = _srcDist - _curDist
                , _sidelength = _di.size.dragger.srcSidelength + _distance
                ;

            if( ( _maxY - _sidelength ) < _di.size.top ){
                _sidelength = _maxY - _di.size.top;
            }

            if( ( _maxX - _sidelength ) < _di.size.left ){
                _sidelength = _maxX - _di.size.left;
            }

            _sidelength = _sidelength < _p._model.minRectSidelength() ? _p._model.minRectSidelength() : _sidelength;

            _di.tmpSize.dragger = {
                srcSidelength: _sidelength
                , sidelength: _sidelength - _di.btnSidelength
                , halfSidelength: ( _sidelength - _di.btnSidelength ) / 2
                , left: _maxX - _sidelength
                , top: _maxY - _sidelength
            };

           _p.updatePosition( _di.tmpSize );
        };

    ImageCutter.resizeTopCenter =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _maxX = _di.size.left + _di.size.preview.width
                , _maxY = _di.size.dragger.top + _di.size.dragger.srcSidelength
                , _midX = _di.size.dragger.left + ( _di.size.dragger.srcSidelength ) / 2
                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }
                            , { x: _di.pageX, y: -ImageCutter._positionPoint } ) )
                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }
                            , { x: _di.pageX, y: -ImageCutter._positionPoint } ) )
                , _distance = ( _srcDist - _curDist )
                , _sidelength = _di.size.dragger.srcSidelength + _distance
                ;

            if( ( _maxY - _sidelength ) < _di.size.top ){
                _sidelength = _maxY - _di.size.top;
            }

            if( ( _midX - _sidelength / 2 ) < _di.size.left ){
                _sidelength = ( _midX - _di.size.left ) * 2;
            }

            if( ( _midX + _sidelength / 2 ) > _maxX ){
                _sidelength = ( _maxX - _midX ) * 2;
            }

            _sidelength = _sidelength < _p._model.minRectSidelength() ? _p._model.minRectSidelength() : _sidelength;

            _di.tmpSize.dragger = {
                srcSidelength: _sidelength
                , sidelength: _sidelength - _di.btnSidelength
                , halfSidelength: ( _sidelength - _di.btnSidelength ) / 2
                , left: _midX - _sidelength / 2
                , top: _maxY - _sidelength
            };

           _p.updatePosition( _di.tmpSize );
        };

    ImageCutter.resizeTopRight =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _minX = _di.size.dragger.left
                , _maxY = _di.size.dragger.top + _di.size.dragger.srcSidelength
                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }
                            , { x: ImageCutter._positionPoint, y: 0 } ) )
                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }
                            , { x: ImageCutter._positionPoint, y: 0 } ) )
                , _distance = ( _srcDist - _curDist )
                , _sidelength = _di.size.dragger.srcSidelength + _distance
                ;

            if( ( _maxY - _sidelength ) < _di.size.top ){
                _sidelength = _maxY - _di.size.top;
            }

            if( ( _minX + _sidelength ) > ( _di.size.left + _di.size.preview.width ) ){
                _sidelength = ( _di.size.left + _di.size.preview.width ) - _minX;
            }

            _sidelength = _sidelength < _p._model.minRectSidelength() ? _p._model.minRectSidelength() : _sidelength;

            _di.tmpSize.dragger = {
                srcSidelength: _sidelength
                , sidelength: _sidelength - _di.btnSidelength
                , halfSidelength: ( _sidelength - _di.btnSidelength ) / 2
                , left: _minX
                , top: _maxY - _sidelength
            };

           _p.updatePosition( _di.tmpSize );
        };

    ImageCutter.resizeMidLeft =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _maxX = _di.size.dragger.left + _di.size.dragger.srcSidelength
                , _midY = _di.size.dragger.top + _di.size.dragger.srcSidelength / 2
                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }
                            , { x: -ImageCutter._positionPoint, y: _di.pageY } ) )
                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }
                            , { x: -ImageCutter._positionPoint, y: _di.pageY } ) )
                , _distance = ( _srcDist - _curDist )
                , _sidelength = _di.size.dragger.srcSidelength + _distance
                ;

            if( ( _midY - _sidelength / 2 ) < _di.size.top ){
                _sidelength = ( _midY - _di.size.top ) * 2;
            }

            if( ( _midY + _sidelength / 2 ) > ( _di.size.top + _di.size.preview.height ) ){
                _sidelength = ( _di.size.top + _di.size.preview.height - _midY ) * 2;
            }

            if( ( _maxX - _sidelength ) < _di.size.left ){
                _sidelength = _maxX - _di.size.left;
            }

            _sidelength = _sidelength < _p._model.minRectSidelength() ? _p._model.minRectSidelength() : _sidelength;

            _di.tmpSize.dragger = {
                srcSidelength: _sidelength
                , sidelength: _sidelength - _di.btnSidelength
                , halfSidelength: ( _sidelength - _di.btnSidelength ) / 2
                , left: _maxX - _sidelength
                , top: _midY - _sidelength / 2
            };

           _p.updatePosition( _di.tmpSize );
        };

    ImageCutter.resizeMidRight =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _minX = _di.size.dragger.left
                , _midY = _di.size.dragger.top + _di.size.dragger.srcSidelength / 2
                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }
                            , { x: ImageCutter._positionPoint, y: _di.pageY } ) )
                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }
                            , { x: ImageCutter._positionPoint, y: _di.pageY } ) )
                , _distance = ( _srcDist - _curDist )
                , _sidelength = _di.size.dragger.srcSidelength + _distance
                ;

            if( ( _midY - _sidelength / 2 ) < _di.size.top ){
                _sidelength = ( _midY - _di.size.top ) * 2;
            }

            if( ( _midY + _sidelength / 2 ) > ( _di.size.top + _di.size.preview.height ) ){
                _sidelength = ( _di.size.top + _di.size.preview.height - _midY ) * 2;
            }

            if( ( _minX + _sidelength ) > ( _di.size.left + _di.size.preview.width ) ){
                _sidelength = _di.size.left + _di.size.preview.width - _minX;
            }

            _sidelength = _sidelength < _p._model.minRectSidelength() ? _p._model.minRectSidelength() : _sidelength;

            _di.tmpSize.dragger = {
                srcSidelength: _sidelength
                , sidelength: _sidelength - _di.btnSidelength
                , halfSidelength: ( _sidelength - _di.btnSidelength ) / 2
                , left: _minX
                , top: _midY - _sidelength / 2
            };

           _p.updatePosition( _di.tmpSize );
        };

    ImageCutter.resizeBottomLeft=
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _maxX = _di.size.dragger.left + _di.size.dragger.srcSidelength
                , _maxY = _di.size.dragger.top
                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }
                            , { x: ImageCutter._positionPoint, y: 0 } ) )
                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }
                            , { x: ImageCutter._positionPoint, y: 0 } ) )
                , _distance = ( _srcDist - _curDist )
                , _sidelength = _di.size.dragger.srcSidelength - _distance
                ;

            if( ( _maxY + _sidelength ) > ( _di.size.top + _di.size.preview.height ) ){
                _sidelength = ( _di.size.top + _di.size.preview.height ) - _maxY;
            }

            if( ( _maxX - _sidelength ) < _di.size.left ){
                _sidelength = _maxX - _di.size.left;
            }

            _sidelength = _sidelength < _p._model.minRectSidelength() ? _p._model.minRectSidelength() : _sidelength;

            _di.tmpSize.dragger = {
                srcSidelength: _sidelength
                , sidelength: _sidelength - _di.btnSidelength
                , halfSidelength: ( _sidelength - _di.btnSidelength ) / 2
                , left: _maxX - _sidelength
                , top: _maxY
            };

           _p.updatePosition( _di.tmpSize );
        };

    ImageCutter.resizeBottomCenter=
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _minY = _di.size.dragger.top
                , _midX = _di.size.dragger.left + _di.size.dragger.srcSidelength / 2
                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }
                            , { x: _di.pageX, y: -ImageCutter._positionPoint } ) )
                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }
                            , { x: _di.pageX, y: -ImageCutter._positionPoint } ) )
                , _distance = ( _srcDist - _curDist )
                , _sidelength = _di.size.dragger.srcSidelength - _distance
                ;

            if( ( _minY + _sidelength ) > ( _di.size.top + _di.size.preview.height ) ){
                _sidelength = ( _di.size.top + _di.size.preview.height ) - _minY;
            }

            if( ( _midX - _sidelength / 2 ) < _di.size.left ){
                _sidelength = ( _midX - _di.size.left ) * 2;
            }

            if( ( _midX + _sidelength / 2 ) > ( _di.size.left + _di.size.preview.width ) ){
                _sidelength = ( _di.size.left + _di.size.preview.width - _midX ) * 2;
            }

            _sidelength = _sidelength < _p._model.minRectSidelength() ? _p._model.minRectSidelength() : _sidelength;

            _di.tmpSize.dragger = {
                srcSidelength: _sidelength
                , sidelength: _sidelength - _di.btnSidelength
                , halfSidelength: ( _sidelength - _di.btnSidelength ) / 2
                , left: _midX - _sidelength / 2
                , top: _minY
            };

           _p.updatePosition( _di.tmpSize );
        };

    ImageCutter.resizeBottomRight=
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _minX = _di.size.dragger.left
                , _minY = _di.size.dragger.top
                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }
                            , { x: 0, y: -ImageCutter._positionPoint } ) )
                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }
                            , { x: 0, y: -ImageCutter._positionPoint } ) )
                , _distance = ( _srcDist - _curDist )
                , _sidelength = _di.size.dragger.srcSidelength - _distance
                ;

            if( ( _minX + _sidelength ) > ( _di.size.left + _di.size.preview.width ) ){
                _sidelength = ( _di.size.left + _di.size.preview.width ) - _minX;
            }

            if( ( _minY + _sidelength ) > ( _di.size.top + _di.size.preview.height ) ){
                _sidelength = ( _di.size.top + _di.size.preview.height ) - _minY;
            }

            _sidelength = _sidelength < _p._model.minRectSidelength() ? _p._model.minRectSidelength() : _sidelength;

            _di.tmpSize.dragger = {
                srcSidelength: _sidelength
                , sidelength: _sidelength - _di.btnSidelength
                , halfSidelength: ( _sidelength - _di.btnSidelength ) / 2
                , left: _minX
                , top: _minY
            };

           _p.updatePosition( _di.tmpSize );
        };

    /**
     * 按比例缩放图片
     * <br />返回: { width: int, height: int }
     * @param   {int}   _w
     * @param   {int}   _h
     * @param   {int}   _newWidth
     * @param   {int}   _newHeight
     * @return  {object}    width, height
     */
    function sizeZoom( _w, _h, _newWidth, _newHeight ){
        var w, h;
        
        if( _w > _newWidth && ( _h < _w )){
            w = _newWidth;
            h = _h - ( _h / ( _w / ( _w - _newWidth ) ) );
        }else if( _h > _newHeight && ( _h > _w ) ){
            w = _w - ( _w / ( _h / ( _h - _newHeight ) ) );
            h = _newHeight;
        }else{
            w = _newWidth; 
            h = _newHeight;
        }
        return { 'width': w, 'height': h };
    }
    /**
     * 计算两个坐标点之间的距离
     */
    function pointDistance( _p1, _p2 ){
        var _dx = _p2.x - _p1.x
            , _dy = _p2.y - _p1.y
            , _dist = Math.sqrt( _dx * _dx + _dy * _dy );
            ;
        return _dist;
    }
    /**
     * 从长度和角度求坐标点
     */
    function distanceAngleToPoint( _distance, _angle){
        var _radian = _angle * Math.PI / 180;					
        return {
            x: parseInt( Math.cos( _radian  ) * _distance )
            , y: parseInt( Math.sin( _radian ) * _distance )
        }
    }

    _jdoc.ready( function(){
        _jbody = $( 'body' );
        ImageCutter._defaultCursor = _jbody.css( 'cursor' );
        ImageCutter.autoInit && ImageCutter.init();
        _jwin.on( 'keydown', ImageCutter.defaultKeydown );
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
