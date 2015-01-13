(function(e,t){e("JC.Rate",["JC.BaseMVC"],function(){function n(e){e&&(e=$(e));if(JC.BaseMVC.getInstance(e,n))return JC.BaseMVC.getInstance(e,n);JC.BaseMVC.getInstance(e,n,this),this._model=new n.Model(e),this._view=new n.View(this._model),this._init()}var e=$(document),t=$(window);JC.Rate=n,n.init=function(e){var t=[];return e=$(e||document),e.length&&(e.hasClass("js_compRate")?t.push(new n(e)):e.find("span.js_compRate, label.js_compRate").each(function(){t.push(new n(this))})),t},JC.BaseMVC.build(n),JC.f.extendObject(n.prototype,{_initHanlderEvent:function(){var e=this,t=e._model,n=e._view,i=t.selector();e.on(r.INITED,function(n){if(t.isInited())return;e.notification(r.INITED,[e])});if(t.getReadOnly())return;var s=t.getHalfFlag();s?i.on("mousemove",function(t){var n=$(t.target);if(n.hasClass("rate-score")){var i=e._model.countHalfStar(t);e.trigger(r.LIGHT_STAR,i)}else n.hasClass("rate-cancel")&&e.trigger(r.LIGHT_CANCEL,!0)}):i.on("mouseover",function(t){var n=$(t.target);n.hasClass("rate-score")?e.trigger(r.LIGHT_STAR,n.prevAll(".rate-score").length+1):n.hasClass("rate-cancel")&&e.trigger(r.LIGHT_CANCEL,!0)}),e.on(r.LIGHT_STAR,function(e,t){n.lightStar(t)}),e.on(r.LIGHT_CANCEL,function(e,t){n.lightCancel(t)}),i.on("mouseleave",function(n){var i=t.getMarkScore(),s=t.scoreToStarNum(i);e.trigger(r.LIGHT_STAR,s)}),i.on("click",function(i){var s=$(i.target);s.hasClass("rate-score")?n.rememberScore(t.getCurScore(s)):s.hasClass("rate-cancel")&&(e.trigger(r.LIGHT_STAR,-1),n.initScore()),e.notification(r.CLICKED,[$(i.target),e])})},_inited:function(){this.trigger(r.INITED)}});var r=n.Model;return r._instanceName="JCRate",r.LIGHT_STAR="light_start",r.LIGHT_CANCEL="LIGHT_CANCEL",r.RATE_HIDDEN="js_rateHidden",r.DEFULT_HINTS=["较差","一般","不错","很好","非常棒"],r.INITED="rateInited",r.CLICKED="rateClicked",JC.f.extendObject(r.prototype,{init:function(){},isInited:function(e){return typeof e!="undefined"&&(this._isInited=e),this._isInited},getTotalNum:function(){return this.intProp("totalnum")||5},getHalfFlag:function(){return this.boolProp("half")},getCancelFlag:function(){return this.boolProp("cancel")},getReadOnly:function(){return this.boolProp("readonly")},getHints:function(){var e=this.attrProp("hints"),t=this.getTotalNum(),n=r.DEFULT_HINTS,i=n.length,s=[];return typeof e!="undefined"&&e!=""?e.trim().split(","):n},getInitScore:function(){var e=this.floatProp("score");return e},getMaxScore:function(){return this.intProp("maxScore")||this.getTotalNum()},getMinScore:function(){return this.intProp("minScore")||0},hiddenName:function(){return this.attrProp("hiddenName")||"score"},getCurScore:function(e){var t=this,n=e.prevAll(".rate-score").length,r=t.getMaxScore(),i=t.getMinScore(),s=t.getTotalNum(),o=(r-i)/s,u=t.getHalfFlag();n+=u&&e.hasClass("star-half")?.5:1;var a=i+o*n;return parseInt(o)!=o&&(a=a.toFixed(2)),a},getMarkScore:function(){var e=$(this._selector).children("."+r.RATE_HIDDEN).val();return parseInt(typeof e=="undefined"?0:e)},scoreToStarNum:function(e){var t=this,n=t.getMaxScore(),r=t.getMinScore(),i=t.getTotalNum(),s=(n-r)/i,o=(e-r)/s;if(t.getHalfFlag()){var u=parseInt(o);o=o-u>.5?u+1:o}else o=this.round(o,0);return o},countHalfStar:function(e){var t=$(e.target),n=e.offsetX,r=t[0].offsetWidth;return t.prevAll(".rate-score").length+(n<r/2?.5:1)},round:function(e,t){return Math?Math.round(e*Math.pow(10,t))/Math.pow(10,t):e}}),JC.f.extendObject(n.View.prototype,{init:function(){var e=this,t=e._model,n=[],i=t.selector(),s=t.getCancelFlag(),o=t.getTotalNum(),u=t.getInitScore(),a=t.getHints(),f=a.length,l='<button class="{0}" title="{1}"  />';i&&(i=$(i)),i.css({cursor:"pointer","font-size":"12px"}),s&&i.prepend($(l).attr({"class":"rate-cancel cancel-off",title:"清除分数"}));var c=[],h,p;for(var d=0;d<o;d++)p="",d<f&&a[d]!=""&&(p=a[d]),h=JC.f.printf(l,"rate-score star-off",p),c.push(h,"&nbsp;");c.push(JC.f.printf('<input type="hidden" name="{0}" class="'+r.RATE_HIDDEN+'" />',e._model.hiddenName())),i.append(c.join("")),u>0&&(i.children("."+r.RATE_HIDDEN).val(u),e.lightStar(t.scoreToStarNum(u)))},lightStar:function(e){var t=this,n=t._model,r=n.getCancelFlag();r&&t.lightCancel(!1);if(!e||typeof e!="number"||e<0){n.selector().children(".rate-score").removeClass("star-on star-half").addClass("star-off");return}var i,s=parseInt(e),o=n.getHalfFlag(),u=n.selector().children(".rate-score");s+=s!=e?1:0;for(var a=0;a<u.length;a++)i=$(u[a]),a<s-1?t.changeStarClass(i,"star-on"):a==s-1?o&&parseInt(e)!=e?t.changeStarClass(i,"star-half"):t.changeStarClass(i,"star-on"):t.changeStarClass(i,"star-off")},lightCancel:function(e){var t=this,n=t._model,r=n.selector(),i=r.children(".rate-cancel"),s=" rate-cancel cancel-"+(e?"on":"off")+" ";i.removeClass("cancel-on cancel-off").addClass(s)},initScore:function(){var e=this,t=e._model;t.selector().children("."+r.RATE_HIDDEN).val(t.getMinScore())},changeStarClass:function(e,t){if(e.hasClass(t))return;var n="rate-score "+t+" ";e.removeClass("star-on star-off star-half").addClass(n)},rememberScore:function(e){var t=this;t._model.selector().children("."+r.RATE_HIDDEN).val(e)}}),e.ready(function(){n.autoInit&&n.init()}),JC.Rate})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);