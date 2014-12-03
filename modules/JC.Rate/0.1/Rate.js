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
 *  <h2>页面只要引用本脚本, 默认会处理 [ span | label ] class="js_compRate"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt>totalnum = int, default = 5</dt>
 *      <dd>显示分数所用的总星星数量<dd>
 *
 *      <dt>maxscore = int, default = 5</dt>
 *      <dd>最大分数上限，支持浮点数<dd>
 *
 *      <dt>minscore = int, default = 5</dt>
 *      <dd>最小分数下限，支持浮点数<dd>
 *      
 *      <dt>score = int, default = 0</dt>
 *      <dd>默认分数<dd>
 *      
 *      <dt>half = boolean, default = false</dt>
 *      <dd>星星是否支持显示半颗星</dd>
 *      
 *      <dt>cancel = boolean, default = false</dt>
 *      <dd>是否需要清零按钮</dd>
 *
 *      <dt>hints = string, default = '较差,一般,不错,很好,非常棒'</dt>
 *      <dd>鼠标hover时，显示的title，以分号隔开</dd>
 *
 *      <dt>hiddenName = string, default = 'score'</dt>
 *      <dd>隐藏域控件的 name</dd>
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
        <h2>Title:</h2>
        <span class="js_compRate" score="3" hints="1分,2分,3分,4分,5分"></span>
        <h2>Click Callback:</h2>
        <span class="js_compRate js_rateClickedEvent" score="3">
            <input id="score-input" ReadOnly type="text" />
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
                    _selector.find( 'span.js_compRate, label.js_compRate' ).each( function(){
                        _r.push( new Rate( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( Rate );

    JC.f.extendObject( Rate.prototype, {
        _initHanlderEvent:
            function(){
                var _p = this,
                    _model = _p._model,
                    _view = _p._view,
                    _children = _model.selector();

                _p.on( _Model.INITED, function( _evt ) {
                    if( _model.isInited() ){ return; }
                    _p.notification( _Model.INITED, [ _p ] );
                } );
                
                if( _model.getReadOnly() ){ return; }

                var halfFlag = _model.getHalfFlag();
                if( halfFlag ){
                    _children.on( 'mousemove', function( e ) {
                        var target = $( e.target );
                        if( target.hasClass( 'rate-score' ) ) {
                            var halfNum = _p._model.countHalfStar( e );
                            _p.trigger( _Model.LIGHT_STAR, halfNum );
                        } else if( target.hasClass( 'rate-cancel' ) ) {
                            _p.trigger( _Model.LIGHT_CANCEL, true );
                        }
                    } );
                } else {
                    _children.on( 'mouseover', function( e ) {
                        var target = $( e.target );
                        if( target.hasClass( 'rate-score' ) ) {
                            _p.trigger( _Model.LIGHT_STAR, target.prevAll( '.rate-score' ).length + 1 );
                        } else if( target.hasClass( 'rate-cancel' ) ) {
                            _p.trigger( _Model.LIGHT_CANCEL, true );
                        }
                    } );
                }

                _p.on( _Model.LIGHT_STAR, function( _evt, _num ){
                    _view.lightStar( _num );
                });

                _p.on( _Model.LIGHT_CANCEL, function( _evt, _isCancel ){
                    _view.lightCancel( _isCancel );
                });

                _children.on( 'mouseleave', function( e ) {
                    var markScore = _model.getMarkScore(),
                        markStarNum = _model.scoreToStarNum( markScore );
                        _p.trigger( _Model.LIGHT_STAR, markStarNum );
                } );

                _children.on( 'click', function( e ) {
                    var target = $( e.target );
                    if( target.hasClass( 'rate-score' ) ) {
                        _view.rememberScore( _model.getCurScore( target ) );
                    } else if( target.hasClass( 'rate-cancel' ) ) {
                        _p.trigger( _Model.LIGHT_STAR, -1 );
                        _view.initScore();
                    }
                    _p.notification( _Model.CLICKED, [ $( e.target ), _p ] );
                } );
            }

        , _inited:
            function() {
                this.trigger( _Model.INITED );
            }
    });

    var _Model = Rate.Model;
    _Model._instanceName = 'JCRate';
    _Model.LIGHT_STAR = 'light_start';
    _Model.LIGHT_CANCEL = 'LIGHT_CANCEL';
    _Model.RATE_HIDDEN = 'js_rateHidden';
    _Model.DEFULT_HINTS = ['较差', '一般', '不错', '很好', '非常棒'];

    /* Event */
    
    /**
     * JC.Rate 初始化后 selector 触发的事件
     * @event  rateInited 
     * @param   {Event}         _evt
     * @param   {RateInstance}  _rateIns
     * @example
    <pre>
    $( document ).delegate( 'span.js_rateInitedEvent', 'rateInited', function( _evt, _rateIns ){
        var _selector = $( this );
        JC.log( 'rateInited event' );
    });
    </pre>
     */
    _Model.INITED = 'rateInited';
    
    /**
     * JC.Rate 点击后 selector 触发的事件
     * 返回触发点击事件的元素
     * @event   rateClicked
     * @param   {Event}         _evt
     * @param   {RateInstance}  _rateIns
     * @example
    <pre>
    $( document ).delegate( 'span.js_rateClickedEvent', 'rateClicked', function( _evt, _target, _rateIns ) {
     	var star = _target;
        JC.log( 'rate clicked' );
    } );
    </pre>
     */
    _Model.CLICKED = 'rateClicked';

    JC.f.extendObject( _Model.prototype, {
        init:
            function() {
            }
        , isInited: 
            function( _setter ) { 
                typeof _setter != 'undefined' && ( this._isInited = _setter )
                return this._isInited;
            }
        , getTotalNum:
            function() {
                return this.intProp( 'totalnum' ) || 5;
            }
        , getHalfFlag:
            function() {
                return this.boolProp( 'half' );
            }
        , getCancelFlag:
            function() {
                return this.boolProp( 'cancel' );
            }
        , getReadOnly:
            function() {
                return this.boolProp( 'readonly' );
            }
        , getHints:
            function() {
                var hints = this.attrProp( 'hints' ),
                    totalNum = this.getTotalNum(),
                    defualHints = _Model.DEFULT_HINTS,
                    defualLen = defualHints.length,
                    customHints = [];
                if( typeof hints != 'undefined' && hints != '' ) {
                    return hints.trim().split( ',' );
                } else {
                    return defualHints;
                }
            }
        , getInitScore: 
            function() {
                var score = this.floatProp( 'score' );
                return score;
            }
        , getMaxScore:
            function() {
                return this.intProp( 'maxScore' ) || 5 ;
            }
        , getMinScore:
            function() {
                return this.intProp( 'minScore' ) || 0;
            }
        , hiddenName: function(){ return this.attrProp( 'hiddenName' ) || 'score'; }
       /**
        * 根据选中的星星个数，计算出当前分数( 结果会保留两位小数 )
        * @param   {selector}   target
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
        * @return  {number of score}
        */
        , getMarkScore:
            function() {
                var score = $( this._selector ).children( '.' + _Model.RATE_HIDDEN ).val();
                return parseInt( typeof score == 'undefined' ? 0 : score );
            }
        /**
        * 根据分数计算对应星星的个数
        * @param   {number}     score
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
        * @param   {event}     e
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
        * @param   {number} number  
        *          {number} fractionDigits
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
                var _p = this,
                    _model = _p._model,
                    _array = [],
                    _selector = _model.selector(),
                    cancelFlag = _model.getCancelFlag(),
                    totalNum = _model.getTotalNum(),
                    initScore = _model.getInitScore(),
                    hints = _model.getHints(),
                    hintsLen = hints.length,
                    imgHtml = '<button class="{0}" title="{1}"  />';

                _selector && ( _selector = $( _selector ) );
                _selector.css( { 'cursor': 'pointer' , 'font-size': '12px' });
                cancelFlag && _selector.prepend( $( imgHtml ).attr( 'class', 'rate-cancel cancel-off' ) );
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
                    JC.f.printf( '<input type="hidden" name="{0}" class="' + _Model.RATE_HIDDEN + '" />'
                    , _p._model.hiddenName() ) 
                );
                _selector.append( _tmp.join( '' ) );

                if(initScore > 0) {
                    _selector.children( '.' + _Model.RATE_HIDDEN ).val( initScore );
                    _p.lightStar( _model.scoreToStarNum( initScore ) );
                }
            }
        /**
        * 星星动态变化方法
        * @param   {number}    target
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
        * @param   {boolean}    flag
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
        */
        , initScore:
            function() {
                var _p = this,
                    _model = _p._model;
                _model.selector().children( '.' + _Model.RATE_HIDDEN )
                    .val( _model.getMinScore() );
            }
        /**
        * 处理星星class更改的方法
        * @param   {object}    obj      
        *          {string}    className
        */
        , changeStarClass: 
            function( obj, className ) {
                if( obj.hasClass( className ) ) { return; }
                var classStr = 'rate-score ' + className + ' ';
                obj.removeClass( 'star-on star-off star-half' ).addClass( classStr );
            }
        /**
        * 记录当前选中的分数
        * @param   {munber}    score
        */
        , rememberScore:
            function(score) {
                var _p = this;
                _p._model.selector().children( '.' + _Model.RATE_HIDDEN ).val( score );
            }
    });

    _jdoc.ready( function(){
        Rate.autoInit && Rate.init();
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

