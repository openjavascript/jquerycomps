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

    ImageCutter.sidelength = 50;

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
                }
                JC.log( 'minDistance', ImageCutter._dragInfo.minDistance );
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
        };
    /*
        {
            "minX": 0, 
            "dragger": {
                "srcSize": 94, 
                "size": 84, 
                "left": 103, 
                "top": 103, 
                "halfSize": 42
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
            "zoom": {
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

                , _maxX = _di.size.maxX - _di.size.dragger.srcSize
                , _maxY = _di.size.maxY - _di.size.dragger.srcSize
                ;

            _newX < _di.size.minX && ( _newX = _di.size.minX );
            _newX > _maxX && ( _newX = _maxX );

            _newY < _di.size.minY && ( _newY = _di.size.minY );
            _newY > _maxY && ( _newY = _maxY );

            _di.tmpSize.dragger.left = _newX;
            _di.tmpSize.dragger.top = _newY;

            _p.updatePosition( _di.tmpSize );

            //JC.log( 'ImageCutter.dragMainMouseMove', _newX, _newY );
        };

    ImageCutter.dragMainMouseUp =
        function( _evt ){
            if( !ImageCutter.dragInfo() ) return;
            var _di = ImageCutter.dragInfo(), _p = _di.ins;

            _p._size( _di.tmpSize );

            _p.cleanStatus();
        };

    ImageCutter.dragBtnMouseMove =
        function( _evt ){
            if( !( ImageCutter.dragInfo() && _evt ) ) return;
            var _di = ImageCutter.dragInfo()
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
        };

    ImageCutter.dragBtnMouseUp =
        function( _evt ){
            if( !ImageCutter.dragInfo() ) return;
            var _di = ImageCutter.dragInfo(), _p = _di.ins;
            JC.log( 'ImageCutter.dragBtnMouseUp', new Date().getTime() );

            _p._size( _di.tmpSize );

            _p.cleanStatus();
        };

    ImageCutter.resizeTopLeft =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _maxX = _di.size.dragger.left + _di.size.dragger.srcSize 
                , _maxY = _di.size.dragger.top + _di.size.dragger.srcSize

                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }, { x: 0, y: 0 } ) )
                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }, { x: 0, y: 0 } ) )

                , _distance = _srcDist - _curDist

                , _maxOffsetDistance = Math.ceil( pointDistance( { x:0, y: 0 }
                                            , { x: _di.offset.left + _maxX, y: _di.offset.top + _maxY } ) )
                ;

            var _btnSize = _p._model.btnTl().width()
                , _left = _di.size.dragger.left - _distance
                , _top = _di.size.dragger.top - _distance
                , _curDistance = pointDistance( { x: _left, y: _top }, { x: _maxX, y: _maxY } )
                ;

            //JC.log( _di.minDistance, _curDistance, _curDist, _maxOffsetDistance );
            if( _curDistance < _di.minDistance || _curDist > _maxOffsetDistance ){
                var _newPoint = distanceAngleToPoint( _di.minDistance, 225 );
                _left = _maxX + _newPoint.x;
                _top = _maxY + _newPoint.y;
            }

            if( _left < _di.size.left ){
                _left = _di.size.left;
                _top = _maxY - ( _maxX - _left );
            }

            if( _top < _di.size.top ){
                _top = _di.size.top;
                _left = _maxX - ( _maxY - _top );
            }

            var _srcDraggerSize = _maxX - _left
                , _draggerSize = _srcDraggerSize - _btnSize
                , _halfSize = _draggerSize / 2
                ;

            //JC.log( _left, _top, _maxX, _maxY, _distance );

            _di.tmpSize.dragger = {
                srcSize: _srcDraggerSize
                , size: _draggerSize
                , halfSize: _halfSize
                , left: _left
                , top: _top
            };

           _p.updatePosition( _di.tmpSize );

        };

    ImageCutter.resizeTopCenter =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
            var _p = _di.ins
                , _maxX = _di.size.left + _di.size.zoom.width
                , _maxY = _di.size.dragger.top + _di.size.dragger.srcSize
                , _midX = _di.size.dragger.left + ( _di.size.dragger.srcSize ) / 2

                , _srcDist = Math.ceil( pointDistance( { x: _di.pageX, y: _di.pageY }, { x: _di.pageX, y: 0 } ) )

                , _curDist = Math.ceil( pointDistance( { x: _evt.pageX, y: _evt.pageY }, { x: _di.pageX, y: 0 } ) )

                , _distance = ( _srcDist - _curDist )
                , _sidelength = _di.size.dragger.srcSize + _distance

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

            _sidelength = _sidelength < _p._model.cicSidelength() ? _p._model.cicSidelength() : _sidelength;

            var _left = _midX - _sidelength / 2
                , _top = _maxY - _sidelength
                ;

            var _btnSize = _p._model.btnTl().width()
                , _srcDraggerSize = _sidelength
                , _draggerSize = _srcDraggerSize - _btnSize
                , _halfSize = _draggerSize / 2
                ;

            JC.log( JC.f.printf( 
                'distance: {0}, left: {1}, top: {2}, maxX: {3}, maxY: {4}, midX: {5}, srcDraggerSize: {6}'
                , _distance, _left, _top, _maxX, _maxY, _midX 
                , _srcDraggerSize
            ) );

            _di.tmpSize.dragger = {
                srcSize: _srcDraggerSize
                , size: _draggerSize
                , halfSize: _halfSize
                , left: _left
                , top: _top
            };

           _p.updatePosition( _di.tmpSize );

        };

    ImageCutter.resizeTopRight =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
        };

    ImageCutter.resizeMidLeft =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
        };

    ImageCutter.resizeMidRight =
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
        };

    ImageCutter.resizeBottomLeft=
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
        };

    ImageCutter.resizeBottomCenter=
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
        };

    ImageCutter.resizeBottomRight=
        function( _di, _posX, _posY, _evt ){
            if( !_di ) return;
        };

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

                    if( _width < _p._model.cicSidelength() || _height < _p._model.cicSidelength() ){
                        _p.trigger( 'CICSizeError', [ _width, _height, _img ] );
                        return;
                    }

                    var _newSize = _p._model.size( _width, _height );

                    if( _newSize.zoom.width < _p._model.cicSidelength() || _newSize.zoom.height < _p._model.cicSidelength() ){
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

                _p.selector().delegate( 'div.cic_dragMain', 'mousedown', function( _evt ){
                    _evt.preventDefault();
                    JC.log( 'div.cic_dragMain mousedown', new Date().getTime() );
                    _p._model.dragMain().addClass( 'cic_move' );

                    ImageCutter.cleanInfo();
                    ImageCutter.dragInfo( _p, _evt, JC.f.cloneObject( _p._model.size() ), $( this ) );

                    _jdoc.on( 'mousemove', ImageCutter.dragMainMouseMove );
                    _jdoc.on( 'mouseup', ImageCutter.dragMainMouseUp );

                    return false;
                });

                _p.selector().delegate( 'button.cic_btn', 'mousedown', function( _evt ){
                    _evt.preventDefault();
                    JC.log( 'div.cic_btn mousedown', new Date().getTime() );

                    ImageCutter.cleanInfo();
                    ImageCutter.dragInfo( _p, _evt, JC.f.cloneObject( _p._model.size() ), $( this ) );

                    _jdoc.on( 'mousemove', ImageCutter.dragBtnMouseMove );
                    _jdoc.on( 'mouseup', ImageCutter.dragBtnMouseUp );

                    return false;
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

        , updatePosition: function(){ this._view.updatePosition.apply( this._view, JC.f.sliceArgs( arguments ) ); }

        , cleanStatus:
            function(){
                var _p = this;

                ImageCutter.cleanInfo();
                _p._model.dragMain().removeClass( 'cic_move' );
            }

        , _size: function(){ this._model.size.apply( this._model, JC.f.sliceArgs( arguments ) ); }
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

        , cicSidelength: function(){ return this.intProp( 'cicSidelength' ) || ImageCutter.sidelength; }

        , minDistance:
            function(){
                return pointDistance( { x: 0, y: 0 }, { x: this.cicSidelength(), y: this.cicSidelength() } );
            }

        , size: 
            function( _width, _height ){ 

                if( _width && _height ){
                    this._size.img = { width: _width, height: _height };
                    this._size.zoom = sizeZoom( _width, _height, this._size.selector.width, this._size.selector.height );

                    this._size.zoom.width = Math.round( this._size.zoom.width );
                    this._size.zoom.height = Math.round( this._size.zoom.height );

                    this._size.left = Math.round( ( this._size.selector.width - this._size.zoom.width ) / 2 );
                    this._size.top = Math.round( ( this._size.selector.height - this._size.zoom.height ) / 2 );

                    this._size.width = _width;
                    this._size.height = _height;

                    this._size.minX = this._size.left;
                    this._size.maxX = ( this._size.minX + this._size.zoom.width );

                    this._size.minY = this._size.top;
                    this._size.maxY = ( this._size.minY + this._size.zoom.height );

                    this._size.dragger = {
                        srcSize: 0
                        , size: 0
                        , halfSize: 0
                        , left: 0
                        , top: 0
                    };

                    JC.log( this._size.left, this._size.top );
                }

                if( _width && !_height ){
                    this._size = _width;
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
                this._model.dragMain();
                this._model.maskList()

                var _p = this
                    , _dragger = _p._model.draggerList()
                    , _draggerSize = _size.zoom.width > _size.zoom.height ? _size.zoom.height : _size.zoom.width
                    , _draggerSize = _draggerSize / 2 > _p._model.cicSidelength() ? _draggerSize / 2 : _p._model.cicSidelength()
                    , _draggerSize = Math.ceil( _draggerSize )
                    , _draggerSize = _draggerSize > _p._model.cicSidelength() ? _draggerSize : _p._model.cicSidelength()
                    , _btnSize = _p._model.btnTl().width()
                    , _srcDraggerSize = _draggerSize
                    , _draggerSize = _draggerSize - _btnSize
                    , _halfSize = _draggerSize / 2
                    , _left = _size.left + ( _size.zoom.width - _draggerSize ) / 2 - _btnSize / 2
                    , _top = _size.top + ( _size.zoom.height - _draggerSize ) / 2 - _btnSize / 2

                    ;
                JC.log( 'initDragger', _draggerSize, new Date().getTime() );

                _size.dragger = {
                    srcSize: _srcDraggerSize
                    , size: _draggerSize
                    , halfSize: _halfSize
                    , left: _left
                    , top: _top
                };

                _p.updatePosition( _size );
            }

        , updatePosition:
            function( _size ){
                var _p = this;

                _p.updateDragger( _size );
                _p.updateMask( _size );
                _p.updateDragMain( _size );
            }

        , updateDragger:
            function( _size ){
                var _p = this;

                _p._model.btnTl().css( { 'left': _size.dragger.left , 'top': _size.dragger.top } );
                _p._model.btnTc().css( { 'left': ( _size.dragger.left + _size.dragger.halfSize ), 'top': _size.dragger.top } );
                _p._model.btnTr().css( { 'left': ( _size.dragger.left + _size.dragger.size ), 'top': _size.dragger.top } );

                _p._model.btnMl().css( { 'left': _size.dragger.left
                                        , 'top': ( _size.dragger.top + _size.dragger.halfSize ) } );

                _p._model.btnMr().css( { 'left': _size.dragger.left + _size.dragger.size
                                        , 'top': ( _size.dragger.top + _size.dragger.halfSize ) } );

                _p._model.btnBl().css( { 'left': _size.dragger.left, 'top': _size.dragger.top + _size.dragger.size } );

                _p._model.btnBc().css( { 'left': _size.dragger.left + _size.dragger.halfSize
                                        , 'top': _size.dragger.top + _size.dragger.size } );

                _p._model.btnBr().css( { 'left': _size.dragger.left + _size.dragger.size 
                                        , 'top': _size.dragger.top + _size.dragger.size } );

                _p._model.draggerList().show();
            }

        , updateMask:
            function( _size ){
                var _p = this
                    , _maskList = _p._model.maskList()
                    ;

                _p._model.maskLeft().css( { 
                    'height': _size.dragger.srcSize
                    , 'width': _size.dragger.left
                    , 'top': _size.dragger.top
                });

                _p._model.maskTop().css( { 
                    'height': _size.dragger.top
                    , 'width': _size.width 
                });

                _p._model.maskRight().css( {
                    'left': _size.dragger.left + _size.dragger.srcSize
                    , 'top': _size.dragger.top
                    , 'width': _size.width - _size.dragger.left - _size.dragger.srcSize
                    , 'height': _size.dragger.srcSize
                });

                _p._model.maskBottom().css( { 
                    'height': _size.height - (_size.dragger.top + _size.dragger.srcSize )
                    , 'width': _size.width
                    , 'top': _size.dragger.top + _size.dragger.srcSize 
                });

                _maskList.show();
            }

        , updateDragMain:
            function( _size ){
                var _p = this, _dragMain = _p._model.dragMain();

                _dragMain.css({
                    'width': _size.dragger.srcSize 
                    , 'height': _size.dragger.srcSize
                    , 'left': _size.dragger.left
                    , 'top': _size.dragger.top
                });

                _dragMain.show();
            }

        , sizeError:
            function( _width, _height, _img ){
                this._model.cicErrorBox().show().html(
                    JC.f.printf( 
                        '{5}<p>图片实际宽高为: {2}, {3}</p><p>可接受的最小宽高为: {0}, {1}</p>{4}'
                        , this._model.cicSidelength(), this._model.cicSidelength()
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
                        , this._model.cicSidelength(), this._model.cicSidelength()
                        , _width, _height
                        , '<a href="' + _img.attr( 'src' ) + '" target="_blank">查看图片</a>'
                        , '<h3>图片缩放比例尺寸错误 </h3>'
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
