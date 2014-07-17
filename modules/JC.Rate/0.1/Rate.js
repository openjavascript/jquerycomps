;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 *  JC.Rate 星形评分组件
 *
 *  <p><b>require</b>:
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Rate.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.Rate/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 span class="js_compRate"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt>totalnum = int, default = 5</dt>
 *      <dd>文字说明<dd>
 *
 *      <dt>maxscore = int, default = 5</dt>
 *      <dd>文字说明<dd>
 *
 *      <dt>clickCallback = function</dt>
 *      <dd>文字说明
<pre>function clickCallback() {
    var star = arguments[0];
    if( star.hasClass( 'rate-score' ) ){
        $( '#score-input' ).val( star.attr( 'title' ) );
    }
}</pre>
 *      </dd>
 *
 *      <dt>补充其他属性的说明...</dt>
 *  </dl> 
 *
 * @namespace   JC
 * @class       Rate
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-07-16
 * @author  pengjunkai <pengjunkai@360.cn> | 75 Team
 * @example
        <span class="js_compRate" score="3" clickcallback="clickCallback">
            <input id="score-input" ReadOnly type="text" />
        </span>
        <h2>Inited Callback:</h2>
        <span class="js_compRate" score="3" readonly="true" hints="1分,2分,3分,4分,5分" initedcallback="initedCallback">
            <input id="score-input2" ReadOnly type="text" />
        </span>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.Rate = Rate;

    function Rate( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, Rate ) ) 
            return JC.BaseMVC.getInstance( _selector, Rate );

        JC.BaseMVC.getInstance( _selector, Rate, this );

        this._model = new Rate.Model( _selector );
        this._view = new Rate.View( this._model );

        this._init();

        //JC.log( Rate.Model._instanceName, 'all inited', new Date().getTime() );
    }

    /**
     * 初始化可识别的 Rate 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of RateInstance}
     */
    Rate.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compRate' )  ){
                    _r.push( new Rate( _selector ) );
                }else{
                    /**
                     * div 改为 span | label
                     * 避免换行问题
                     */
                    _selector.find( 'span.js_compRate, label.js_compRate' ).each( function(){
                        _r.push( new Rate( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( Rate );

    JC.f.extendObject( Rate.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'Rate _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this,
                    _model = _p._model,
                    _view = _p._view,
                    _children = _model.selector();

                _p.on( Rate.Model.INITED, function( _evt ) {
                    if( _model.isInited() ){ return; }
                    _view.update(_p);

                    //_p.trigger( 'initedCallback' );
                    _p.notification( Rate.Model.INITED, [ _p ] );
                } );

                /*
                _p.on( 'initedCallback', function( e ) {
                    _model.getInitedCallback() &&
                        _model.getInitedCallback().call( _p, _p.selector() );
                } );
                */
                
                if( _model.getReadOnly() ){ return; }

                var halfFlag = _model.getHalfFlag();
                if( halfFlag ){
                    _children.on( 'mousemove', function( e ) {
                        var target = $( e.target );
                        if( target.hasClass( 'rate-score' ) ) {
                            var halfNum = _p._model.countHalfStar( e );
                            _p.trigger( Rate.Model.LIGHT_STAR, halfNum );
                        } else if( target.hasClass( 'rate-cancel' ) ) {
                            _p.trigger( Rate.Model.LIGHT_CANCEL, true );
                        }
                    } );
                } else {
                    _children.on( 'mouseover', function( e ) {
                        var target = $( e.target );
                        if( target.hasClass( 'rate-score' ) ) {
                            _p.trigger( Rate.Model.LIGHT_STAR, target.prevAll( '.rate-score' ).length + 1 );
                        } else if( target.hasClass( 'rate-cancel' ) ) {
                            _p.trigger( Rate.Model.LIGHT_CANCEL, true );
                        }
                    } );
                }

                _p.on( Rate.Model.LIGHT_STAR, function( _evt, _num ){
                    _view.lightStar( _num );
                });

                _p.on( Rate.Model.LIGHT_CANCEL, function( _evt, _isCancel ){
                    _view.lightCancel( _isCancel );
                });

                _children.on( 'mouseleave', function( e ) {
                    var markScore = _model.getMarkScore(),
                        markStarNum = _model.scoreToStarNum( markScore );
                        _p.trigger( Rate.Model.LIGHT_STAR, markStarNum );
                } );

                _children.on( 'click', function( e ) {
                    var target = $( e.target );
                    if( target.hasClass( 'rate-score' ) ) {
                        _view.rememberScore( _model.getCurScore( target ) );
                    } else if( target.hasClass( 'rate-cancel' ) ) {
                        _p.trigger( Rate.Model.LIGHT_STAR, -1 );
                        _view.initScore();
                    }
                    target.trigger( 'clickCallback' );
                } );

                _children.on( 'clickCallback', function( e ) {
                    _model.getClickCallback() &&
                        _model.getClickCallback().call( _p, $( e.target ) );
                } );
            }

        , _inited:
            function() {
                //JC.log( 'Rate _inited', new Date().getTime() );
                this.trigger( Rate.Model.INITED );
            }
    });

    Rate.Model._instanceName = 'JCRate';

    Rate.Model.INITED = 'rateinited';
    Rate.Model.LIGHT_STAR = 'light_start';
    Rate.Model.LIGHT_CANCEL = 'LIGHT_CANCEL';

    JC.f.extendObject( Rate.Model.prototype, {
        init:
            function() {
                //JC.log( 'Rate.Model.init:', new Date().getTime() );
            }
        , isInited: 
            function( _setter ) { 
                typeof _setter != 'undefined' && ( this._isInited = _setter )
                return this._isInited;
            }
        , getTotalNum:
            function() {
                //var totalNum = this.attrProp( 'totalnum' );
                //return totalNum == '' ? 5 : parseInt( totalNum );
                return this.intProp( 'totalnum' ) || 5;
            }
        , getHalfFlag:
            function() {
                //var halfFlag = this.boolProp( 'half' );
                //return ( typeof halfFlag == 'undefined' ) ? false : halfFlag;
                return this.boolProp( 'half' );
            }
        , getCancelFlag:
            function() {
                //var cancelFlag = this.boolProp( 'cancel' );
                //return ( typeof cancelFlag == 'undefined' ) ? false : cancelFlag;
                return this.boolProp( 'cancel' );
            }
        , getReadOnly:
            function() {
                //var readOnly = this.boolProp( 'readonly' );
                //return ( typeof readOnly == 'undefined' ) ? false : readOnly;
                return this.boolProp( 'readonly' );
            }
        , getHints:
            function() {
                var hints = this.attrProp( 'hints' ),
                    totalNum = this.getTotalNum(),
                    defualHints = ['较差', '一般', '不错', '很好', '非常棒'],
                    defualLen = defualHints.length,
                    customHints = [];
                if( typeof hints != 'undefined' && hints != '' ) {
                    return hints.trim().split( ',' );
                } else {
                    return defualHints;
                }
            }
        , getInitedCallback:
            function() {
                var _p = this,
                _selector = _p.selector(),
                _key = 'initedCallback';
                return _p.callbackProp( _selector, _key );
            }
        , getClickCallback:
            function() {
                var _p = this,
                _selector = _p.selector(),
                _key = 'clickCallback';
                return _p.callbackProp( _selector, _key );
            }
        , getInitScore: 
            function() {
                var score = this.floatProp( 'score' );
                return score;
            }
        , getMaxScore:
            function() {
                //var maxScore = this.attrProp( 'maxscore' );
                //return maxScore == '' ? 5 : parseInt( maxScore );
                return this.intProp( 'maxScore' ) || 5 ;
            }
        , getMinScore:
            function() {
                //var minScore = this.attrProp( 'minscore' );
                //return minScore == '' ? 0 : parseInt( minScore );
                return this.intProp( 'minScore' ) || 0;
            }
        , hiddenName: function(){ return this.attrProp( 'hiddenName' ) || 'score'; }
       /**
        * 根据选中的星星个数，计算出当前分数( 结果会保留两位小数 )
        * @method  getCurScore
        * @param   {selector}   target
        * @static
        * @return  {number of score}
        */
        , getCurScore:
            function( target ) {
                var _p = this,
                    starNum = target.prevAll( '.rate-score' ).length,
                    maxScore = _p.getMaxScore(),
                    minScore = _p.getMinScore(),
                    totalNum = _p.getTotalNum(),
                    average = ( maxScore - minScore ) / totalNum,
                    halfFlag = _p.getHalfFlag();
                starNum += ( halfFlag && target.hasClass( 'star-half' ) ) ? 0.5 : 1;
                var score = minScore + average * starNum;
                if( parseInt( average ) != average ) {
                    score = score.toFixed( 2 );
                }
                return score;
            }
        /**
        * 获取记录的分数
        * @method  getMarkScore
        * @param   
        * @static
        * @return  {number of score}
        */
        , getMarkScore:
            function() {
                //var score = $( this._selector ).children( 'input[ type = \'hidden\' ]' ).attr('value');
                var score = $( this._selector ).children( 'input[ type = \'hidden\' ]' ).val();
                return parseInt( typeof score == 'undefined' ? 0 : score );
            }
        /**
        * 根据分数计算对应星星的个数
        * @method  scoreToStarNum
        * @param   {number}     score
        * @static
        * @return  {number of starNum}
        */
        , scoreToStarNum:
            function( score ) {
                var _p = this,
                    maxScore = _p.getMaxScore(),
                    minScore = _p.getMinScore(),
                    totalNum = _p.getTotalNum(),
                    average = ( maxScore - minScore ) / totalNum,
                    starNum =  ( score - minScore ) / average;
                if( _p.getHalfFlag() ) {
                    var tp = parseInt( starNum );
                    starNum = ( starNum - tp > 0.5 ) ? tp + 1 : starNum;
                } else {
                    starNum = this.round( starNum, 0 );
                }
                return starNum;
            }
        /**
        * 在支持半颗星的时候 计算星星数
        * @method  countHalfStar
        * @param   {event}     e
        * @static
        * @return  {number of starNum}
        */
        , countHalfStar:
            function( e ) {
                var target = $( e.target ),
                    offsetX = e.offsetX,
                    starWidth = target[0].offsetWidth;
                return target.prevAll( '.rate-score' ).length + ( offsetX < starWidth / 2 ? 0.5 : 1 );
            }
        /**
        * 浮点数 四舍五入
        * @method  round
        * @param   {number} number  
        *          {number} fractionDigits
        * @static
        * @return  {number}
        */
        , round:
            function( number,fractionDigits ) {   
                if( Math ){   
                    return Math.round( number * Math.pow( 10, fractionDigits ) ) / 
                        Math.pow( 10, fractionDigits );   
                } else {
                    return number;
                }
            }   
    });

    JC.f.extendObject( Rate.View.prototype, {
        init:
            function() {
                //JC.log( 'Rate.View.init:', new Date().getTime() );
                var _p = this,
                    _model = _p._model,
                    _array = [],
                    _selector = _model.selector(),
                    cancelFlag = _model.getCancelFlag(),
                    totalNum = _model.getTotalNum(),
                    initScore = _model.getInitScore(),
                    hints = _model.getHints(),
                    hintsLen = hints.length,
                    //wrapStyle = 'cursor: pointer; font-size: 12px; width: ',
                    wrapWidth = ( totalNum > 0 ? totalNum * 22 : 0 ) + ( cancelFlag ? 20 : 0 ),
                    imgHtml = '<img src="http://p0.qhimg.com/d/inn/0f5ac496/pixel.gif" class="{0}" title="{1}"  />';

                _selector && ( _selector = $( _selector ) );

                /**
                 * 直接操作 style 属性可能会 覆盖用户原来的样式
                 */
                //_selector.attr( 'style', wrapStyle + wrapWidth + 'px;' );
                _selector.css( {
                    'cursor': 'pointer'
                    , 'font-size': '12px'
                    , 'width': wrapWidth + 'px'
                });
                cancelFlag && _selector.prepend( $( imgHtml ).attr( 'class', 'rate-cancel cancel-off' ) );

                /*
                for( var i = 0; i<totalNum; i++ ) {
                    var img = $( imgHtml ).attr( 'class', 'rate-score star-off' );
                    if( i < hintsLen && hints[ i ] != '' ){
                        img.attr( 'title', hints[ i ] );
                    }
                    _selector.append( img );
                    img.after( '&nbsp;' );
                }
                */
                /**
                 * 避免频繁操作 DOM
                 */
                var _tmp = [], _tmpStr, _tmpTitle;
                for( var i = 0; i<totalNum; i++ ) {
                    _tmpTitle = ''
                    if( i < hintsLen && hints[ i ] != '' ){
                        _tmpTitle = hints[ i ];
                    }
                    _tmpStr = JC.f.printf( 
                        imgHtml, 'rate-score star-off', _tmpTitle
                     );
                    _tmp.push( _tmpStr, '&nbsp;' );
                }

                _tmp.push( 
                    JC.f.printf( '<input type="hidden" name="{0}" class="js_rateHidden" />'
                    , _p._model.hiddenName() ) 
                );
                _selector.append( _tmp.join('' ) );

                if(initScore > 0) {
                    //_selector.children( 'input[ type = "hidden" ]' ).attr( 'value', initScore );
                    _selector.children( 'input[ type = "hidden" ]' ).val( initScore );
                    _p.lightStar( _model.scoreToStarNum( initScore ) );
                }
            }
    
        , update:
            function() {
                //JC.log( 'Rate.View.update:', new Date().getTime() );
            }
        /**
        * 星星动态变化方法
        * @method  lightStar
        * @param   {number}    target
        * @static
        * @return  
        */
        , lightStar:
            function( target ) {
                var _p = this,
                    _model = _p._model,
                    cancelFlag = _model.getCancelFlag();
                cancelFlag && _p.lightCancel(false);
                if( !target || typeof target != 'number' || target < 0 ) {
                    _model.selector().children( '.rate-score' )
                        .removeClass( 'star-on' ).addClass( 'star-off' );
                    return;
                }
                var star, lightStarNum = parseInt( target ),
                    halfFlag = _model.getHalfFlag(),
                    starList = _model.selector().children( '.rate-score' );
                lightStarNum += (lightStarNum != target) ? 1 : 0;
                for( var i = 0; i<starList.length; i++) {
                    star = $( starList[i] );
                    if( i < lightStarNum - 1 ) {
                        _p.changeStarClass( star, 'star-on' );
                    } else if ( i == lightStarNum - 1 ) {
                        if( halfFlag && ( parseInt( target ) != target ) ) {
                            _p.changeStarClass( star, 'star-half' );
                        } else {
                            _p.changeStarClass( star, 'star-on' );
                        }
                    } else {
                        _p.changeStarClass( star, 'star-off' );
                    }
                }
            }
        /**
        * 清除按钮动态变化方法
        * @method  lightCancel
        * @param   {boolean}    flag
        * @static
        * @return  
        */
        , lightCancel:
            function( flag ) {
                var _p = this,
                    _model = _p._model,
                    selector = _model.selector(),
                    target = selector.children( '.rate-cancel' )
                    , className = ' rate-cancel cancel-' + ( flag ? 'on' : 'off' ) + ' '
                    ;
                //target.attr( 'class', className );
                target.removeClass(  'cancel-on cancel-off' ).addClass( className );
            }
        /**
        * 清除标记的分数为默认最小分数
        * @method  initScore
        * @param   
        * @static
        * @return  
        */
        , initScore:
            function() {
                var _p = this,
                    _model = _p._model;
                _model.selector().children( 'input[ type = \'hidden\' ]' )
                    .val( _model.getMinScore() );
            }
        /**
        * 处理星星class更改的方法
        * @method  changeStarClass
        * @param   {object}    obj      
        *          {string}    className
        * @static
        * @return  
        */
        , changeStarClass: 
            function( obj, className ) {
                if( obj.hasClass( className ) ) { return; }
                var classStr = 'rate-score ' + className + ' ';
                //obj.attr('class', classStr);
                obj.removeClass( 'star-on star-off star-half' ).addClass( classStr );
            }
        /**
        * 记录当前选中的分数
        * @method  rememberScore
        * @param   {munber}    score
        * @static
        * @return  
        */
        , rememberScore:
            function(score) {
                var _p = this;
                _p._model.selector().children( 'input[ type=\'hidden\' ]' ).val( score );
            }
    });

    _jdoc.ready( function(){
        var _insAr = 0;
        Rate.autoInit
            && ( _insAr = Rate.init() )
            //&& $( '<h2>Rate total ins: ' 
            //    + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

    return JC.Rate;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
/*
 
   review qiushaowei 
       2014-07-16
            html 内容可以这样写
                   'input[ type=\'hidden\' ]' 
                   该为
                        'input[ type="hidden" ]'  or "input[ type='hidden' ]"

            把 <img src="http://p0.qhimg.com/d/inn/0f5ac496/pixel.gif" class="{0}" title="{1}"  />
                改为 button 标签, 避免浪费一个 http 请求

        2014-07-17
            所有自定义事件名改为常量
                Rate.Model.INITED = 'rateinited';
            
            回调函数改为事件响应
                _p.notification

            style 和 class 俩个属性不要用 .attr 函数操作, 改为 .css() 和 .removeClass(), .addClass()
                用 .attr 操作这俩个属性有可能覆盖 动态添加的 内容
 
 */
