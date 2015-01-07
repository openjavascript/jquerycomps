;(function(define, _win) { 'use strict'; define( [ 
    'JC.BaseMVC'
    , 'Raphael' 
], function() {
    /**
     * 组件用途简述
     *
     *  <p><b>require</b>:
     *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
     *  </p>
     *
     *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
     *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.ImageFrame.html' target='_blank'>API docs</a>
     *      | <a href='../../modules/JC.ImageFrame/0.1/_demo' target='_blank'>demo link</a></p>
     *  
     *  <h2>页面只要引用本脚本, 默认会处理 div class="js_compImageFrame"</h2>
     *
     *  <h2>可用的 HTML attribute</h2>
     *
     *  <dl>
     *      <dt></dt>
     *      <dd><dd>
     *  </dl> 
     *
     * @namespace   JC
     * @class       ImageFrame
     * @extends     JC.BaseMVC
     * @constructor
     * @param   {selector|string}   _selector   
     * @version dev 0.1 2013-12-13
     * @author  qiushaowei <suches@btbtd.org> | 75 Team
     * @example
            <h2>JC.ImageFrame 示例</h2>
     */
    var _jdoc = $( document ), _jwin = $( window );

    JC.ImageFrame = ImageFrame;

    function ImageFrame( _selector ) {
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, ImageFrame ) ) 
            return JC.BaseMVC.getInstance( _selector, ImageFrame );

        JC.BaseMVC.getInstance( _selector, ImageFrame, this );

        this._model = new ImageFrame.Model( _selector );
        this._view = new ImageFrame.View( this._model );

        this._init();

        JC.log( ImageFrame.Model._instanceName, 'all inited', new Date().getTime() );
    }

    /**
     * 初始化可识别的 ImageFrame 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of ImageFrameInstance}
     */
    ImageFrame.init = function( _selector ) {
        var _r = [];
        _selector = $( _selector || document );

        if( _selector.length ) {
            if( _selector.hasClass( 'js_compImageFrame' )  ) {
                _r.push( new ImageFrame( _selector ) );
            } else {
                _selector.find( 'div.js_compImageFrame' ).each( function() {
                    _r.push( new ImageFrame( this ) );
                } );
            }
        }
        return _r;
    };

    JC.BaseMVC.build( ImageFrame );

    JC.f.extendObject( ImageFrame.prototype, {
        _beforeInit: function() {
            JC.log( 'ImageFrame _beforeInit', new Date().getTime() );
        }

        , _initHanlderEvent: function() {
            var _p = this;

            _p.on( 'inited', function() {
            } );
        }

        , _inited: function(){
            JC.log( 'ImageFrame _inited', new Date().getTime() );
            this.trigger( 'inited' );
        }
    } );

    ImageFrame.Model._instanceName = 'JCImageFrame';
    JC.f.extendObject( ImageFrame.Model.prototype, {
        init: function(){
            JC.log( 'ImageFrame.Model.init:', new Date().getTime() );

            initImage();
        }

        , imageUrl: function( _setter ) {
            _setter && this.selector().attr( 'imageUrl', _setter );
            return this.attrProp( 'imageUrl' );
        }

        /**
         * 构造画布
         */
        , stage: function() {
            if( !this._stage ) {
                this._stage = Raphael( this.selector()[0], this.width(), this.height() );
                this._stage.selector = this._stage.canvas;
            }
            return this._stage;
        }

        , initImage: function() {
            var _stage = this.stage();

            return c = paper.image( 
                this.imageUrl()
                , _stage.x
                , _stage.y
                , _stage.width
                , _stage.height 
            );
        }

    } );

    JC.f.extendObject( ImageFrame.View.prototype, {
        init: function(){
            JC.log( 'ImageFrame.View.init:', new Date().getTime() );
        }
    } );

    _jdoc.ready( function() {
        var _insAr = 0;
        ImageFrame.autoInit
            && ( _insAr = ImageFrame.init() )
            && $( '<h2>ImageFrame total ins: ' 
                + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    } );

    return JC.ImageFrame;
} ); }( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) {
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
