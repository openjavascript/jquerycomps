 ;(function(define, _win) { 'use strict'; define( 'JC.FlowChartEditor', [ 'JC.BaseMVC', 'jsPlumb&Toolkit' ], function(){

    var _jdoc = $( document ), _jwin = $( window );

    JC.FlowChartEditor = FlowChartEditor;

    if( JC.use ){
        !window.Raphael && ( JC.use( 'plugins.raphael' ) );
        !JC.PopTips && ( JC.use( 'JC.PopTips' ) );
    }

    function FlowChartEditor( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, FlowChartEditor ) ) 
            return JC.BaseMVC.getInstance( _selector, FlowChartEditor );

        JC.BaseMVC.getInstance( _selector, FlowChartEditor, this );

        this._model = new FlowChartEditor.Model( _selector );
        this._view = new FlowChartEditor.View( this._model );

        this._init();

    }

    FlowChartEditor.getInstance = function ( _selector, _setter ) {
        if( typeof _selector == 'string' && !/</.test( _selector ) ) 
            _selector = $(_selector);
        if( !(_selector && _selector.length ) || ( typeof _selector == 'string' ) ) return;
        typeof _setter != 'undefined' && _selector.data( FlowChartEditor.Model._instanceName, _setter );

        return _selector.data( FlowChartEditor.Model._instanceName );
    };

    /**
     * 初始化可识别的 FlowChartEditor 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of FlowChartEditorInstance}
     */
    FlowChartEditor.init = function( _selector ){
        var _r = [];
        _selector = $( _selector || document );

        if( _selector.length ){
            if( _selector.hasClass( 'js_flowChartEditor' )  ){
                _r.push( new FlowChartEditor( _selector ) );
            }else{
                _selector.find( 'div.js_flowChartEditor' ).each( function(){
                    _r.push( new FlowChartEditor( this ) );
                });
            }
        }
        return _r;
    };

    FlowChartEditor.exportData = function( _selector ) {
        var _ins = FlowChartEditor.getInstance( _selector );
            !_ins && ( _ins = new FlowChartEditor( _selector ) );
        return _ins.exportData();
    }

    JC.BaseMVC.build( FlowChartEditor );

    JC.f.extendObject( FlowChartEditor.prototype, {
        _beforeInit: function(){
            JC.log( 'FlowChartEditor _beforeInit', new Date().getTime() );
        }

        , _initHanlderEvent: function(){

        }

        , _inited: function(){
            this.trigger( 'inited' );
        }

        , exportData: function () {
            var _p = this;

            return _p._view.exportData();
        }
    });

    JC.f.extendObject( FlowChartEditor.Model.prototype, {
        init: function(){
            JC.log( 'FlowChartEditor.Model.init:', new Date().getTime() );
        },

        attrEdit: function() {
            var _p = this,
                _selector = _p.selector();

            if( _selector.is( '[fc-edit]' ) ) {
                return _p.boolProp( 'fc-edit' );
            } else {
                return true;
            }
        },

        attrControl: function() {
            var _p = this,
                _selector = _p.selector();

            if( _selector.is( '[fc-control]' ) ) {
                return _p.boolProp( 'fc-control' );
            } else {
                return true;
            }
        },

        attrMiniView: function() {
            var _p = this,
                _selector = _p.selector();

            if( _selector.is( '[fc-miniview]' ) ) {
                return _p.boolProp( 'fc-miniview' );
            } else {
                return true;
            }
        },

        attrActionForm: function() {
            var _p = this;

            return _p.stringProp( 'fc-action-form' );
        },

        attrQuestionForm: function() {
            var _p = this;

            return _p.stringProp( 'fc-question-form' );
        },

        attrOutputForm: function() {
            var _p = this;

            return _p.stringProp( 'fc-output-form' );
        },

        attrEdgeForm: function() {
            var _p = this;

            return _p.stringProp( 'fc-edge-form' );
        },

        attrChartData: function() {
            var _p = this,
                _data = _p.windowProp( 'fc-cajData' );
                _data && ( _data = $.parseJSON( JSON.stringify( _data ) ) );

            return _data;
        },

        getChartData: function() {
            if( !this.chartData ) {
                var _p = this,
                    _selector = this.selector(),
                    _data = {};

                if( _selector.is( '[fc-data]' ) ) {
                    _data = _p.selectorProp( 'fc-data' ).html()
                } else if( _selector.is( '[fc-cajData]' ) ) {
                    _data = _p.attrChartData();
                }

                if( !_data || !_data.nodes ){
                    _data = '{"nodes": [{"id": "start", "type": "start", "text": "开始", "left": 61, "top": 121, "w": 100, "h": 70}]}'   
                }

                _data = _data.replace( /^[\s]*?\/\/[\s\S]*?[\r\n]/gm, '' );
                _data = _data.replace( /[\r\n]/g, '' );
                _data = _data.replace( /\}[\s]*?,[\s]*?\}$/g, '}}');
                _data = eval( '(' + _data + ')' );

                this.chartData = _data;
            }

            return this.chartData;
        },

        nodeFunction: function() {
            if( !this.nNewFunction ) {
                var _p = this,
                    _selector = this.selector(),
                    _function = function (type, data, callback) {
                        jsPlumbToolkit.Dialogs.show({
                            id: "dlgText",
                            title: "Enter " + type + " name:",
                            onOK: function (d) {
                                data.text = d.text;
                                if (data.text) {
                                    if (data.text.length >= 2) {
                                        data.id = jsPlumbToolkitUtil.uuid();
                                        callback(data);
                                    }
                                    else
                                        alert(type + " names must be at least 2 characters!");
                                }
                            }
                        });
                    };

                if( _selector.is( '[fc-node-function]' ) ) {
                    _function = window[ _p.attrProp( 'fc-node-function' ) ];
                }

                this.nNewFunction = _function;
            }

            return this.nNewFunction;
        },

        edgeFunction: function() {
            if( !this.eNewFunction ) {
                var _p = this,
                    _selector = this.selector(),
                    _function = function (type, data, callback) {
                        jsPlumbToolkit.Dialogs.show({
                            id: "dlgText",
                            data: {
                                text: data.label || ""
                            },
                            onOK: function (d) {
                                callback(d);
                            }
                        });
                    };

                if( _selector.is( '[fc-edge-function]' ) ) {
                    _function = window[ _p.attrProp( 'fc-edge-function' ) ];
                }

                this.eNewFunction = _function;
            }

            return this.eNewFunction;
        }
    });

    JC.f.extendObject( FlowChartEditor.View.prototype, {
        init: function(){
            JC.log( 'FlowChartEditor.View.init:', new Date().getTime() );

            this.initChart();
        },

        exportData: function() {
            return JSON.stringify( this.toolkit.exportData(), null, 4 );
        },

        initChart: function() {
            var _p = this,
                _model = _p._model,
                _selector = _model.selector();

            _p.initTemplate();
            _model.attrEdit() && _p.initMenu();
            _p.initMainView();

            jsPlumbToolkit.ready(function () {

                var mainElement = _selector[0],
                    canvasElement = mainElement.querySelector(".jtk-demo-canvas"),
                    miniviewElement = mainElement.querySelector(".miniview"),
                    nodePalette = mainElement.querySelector(".node-palette"),
                    controls = mainElement.querySelector(".controls");

                var toolkit = _p.toolkit = jsPlumbToolkit.newInstance({
                    idFunction: function (n) {
                        return n.id;
                    },
                    typeFunction: function (n) {
                        return n.type;
                    },
                    nodeFactory: _model.nodeFunction(),
                    beforeStartConnect:function(node, edgeType) {
                        return { label:"无条件" };
                    }
                });

        // ------------------------ / toolkit setup ------------------------------------

        // ------------------------- dialogs -------------------------------------

                jsPlumbToolkit.Dialogs.initialize({
                    selector: ".dlg"
                });

        // ------------------------- / dialogs ----------------------------------

        // ------------------------ rendering ------------------------------------

                var _editLabel = function(params) {

                    var edge = params.edge;

                    function callback( data ) {
                        toolkit.updateEdge(edge, data);
                    }

                    _model.edgeFunction()( params.type, edge.data, callback, edge );
                };

                var renderer = window.renderer = toolkit.render({
                    container: canvasElement,
                    view: {
                        nodes: {
                            "start": {
                                template: "tmplStart",
                                parameters: {
                                    w: 50,
                                    h: 50
                                }
                            },
                            "selectable": {
                                events: {
                                    tap: function (params) {
                                        toolkit.toggleSelection(params.node);
                                    }
                                }
                            },
                            "question": {
                                parent: "selectable",
                                template: "tmplQuestion",
                                parameters: {
                                    w: 120,
                                    h: 120
                                }
                            },
                            "action": {
                                parent: "selectable",
                                template: "tmplAction",
                                parameters: {
                                    w: 120,
                                    h: 70
                                }
                            },
                            "output": {
                                parent:"selectable",
                                template:"tmplOutput",
                                parameters:{
                                    w:120,
                                    h:70
                                }
                            }
                        },
                        edges: {
                            "default": {
                                connector: ["Flowchart", { cornerRadius: 5 } ],
                                paintStyle: { lineWidth: 2, strokeStyle: "#f76258", outlineWidth: 3, outlineColor: "transparent" }, //  paint style for this edge type.
                                hoverPaintStyle: { lineWidth: 2, strokeStyle: "rgb(67,67,67)" }, // hover paint style for this edge type.
                                events: {
                                    "dblclick": function (params) {
                                        jsPlumbToolkit.Dialogs.show({
                                            id: "dlgConfirm",
                                            data: {
                                                msg: "删除条件"
                                            },
                                            onOK: function () {
                                                toolkit.removeEdge(params.edge);
                                            }
                                        });
                                    }
                                },
                                overlays: [
                                    [ "Arrow", { location: 1, width: 10, length: 10 }],
                                    [ "Arrow", { location: 0.3, width: 10, length: 10 }]
                                ]
                            },
                            "connection":{
                                parent:"default",
                                overlays:[
                                    [
                                        "Label", {
                                            label: "${label}",
                                            events:{
                                                click:function(params) {
                                                    _editLabel(params);
                                                }
                                            }
                                        }
                                    ]
                                ]
                            }
                        },

                        ports: {
                            "start": {
                                endpoint: "Blank",
                                anchor: "Continuous",
                                uniqueEndpoint: true,
                                edgeType: "default"
                            },
                            "source": {
                                endpoint: "Blank",
                                paintStyle: {fillStyle: "#84acb3"},
                                anchor: "AutoDefault",
                                maxConnections: -1,
                                edgeType: "connection"
                            },
                            "target": {
                                maxConnections: -1,
                                endpoint: "Blank",
                                anchor: "AutoDefault",
                                paintStyle: {fillStyle: "#84acb3"},
                                isTarget: true
                            }
                        }
                    },
                    layout: {
                        type: "Absolute"
                    },
                    events: {
                        canvasClick: function (e) {
                            toolkit.clearSelection();
                        },
                        edgeAdded:function(params) {
                            if (params.addedByMouse && params.edge.data.type != 'default') {
                                _editLabel(params);
                            }
                        }
                    },
                    miniview: {
                        container: miniviewElement
                    },
                    consumeRightClick: false,
                    dragOptions: {
                        filter: ".jtk-draw-handle, .node-action, .node-action i"
                    }
                });

                // Load the data.
                toolkit.load({
                    data: _model.getChartData(),
                    onload: function () {
                    }
                });

                // listener for mode change on renderer.
                renderer.bind("modeChanged", function (mode) {
                    jsPlumb.removeClass(controls.querySelectorAll("[mode]"), "selected-mode");
                    jsPlumb.addClass(controls.querySelectorAll("[mode='" + mode + "']"), "selected-mode");
                });

                // pan mode/select mode
                jsPlumb.on(controls, "tap", "[mode]", function () {
                    renderer.setMode(this.getAttribute("mode"));
                });

                // on home button click, zoom content to fit.
                jsPlumb.on(controls, "tap", "[reset]", function () {
                    toolkit.clearSelection();
                    renderer.zoomToFit();
                });

                // configure Drawing tools. This is an optional include.
                new jsPlumbToolkit.DrawingTools({
                    renderer: renderer
                });

                jsPlumb.on(canvasElement, "tap", ".node-delete, .node-delete i", function () {
                    var info = renderer.getObjectInfo(this);
                    jsPlumbToolkit.Dialogs.show({
                        id: "dlgConfirm",
                        data: {
                            msg: "确定删除 '" + info.obj.data.text + "'"
                        },
                        onOK: function () {
                            toolkit.removeNode(info.obj);
                        }
                    });
                });

                jsPlumb.on(canvasElement, "tap", ".node-edit, .node-edit i", function () {
                    var info = renderer.getObjectInfo(this),
                        viewObj = info.obj.data;

                    _model.nodeFunction()( viewObj.type, viewObj.data, callback, info.obj );

                    function callback( data ) {
                        toolkit.updateNode(info.obj, data);
                    }
                });

        // ------------------------ / rendering ------------------------------------

                var _syntaxHighlight = function (json) {
                    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    return "<pre>" + json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                        var cls = 'number';
                        if (/^"/.test(match)) {
                            if (/:$/.test(match)) {
                                cls = 'key';
                            } else {
                                cls = 'string';
                            }
                        } else if (/true|false/.test(match)) {
                            cls = 'boolean';
                        } else if (/null/.test(match)) {
                            cls = 'null';
                        }
                        return '<span class="' + cls + '">' + match + '</span>';
                    }) + "</pre>";
                };

                renderer.registerDroppableNodes({
                    droppables: nodePalette.querySelectorAll("li"),
                    dragOptions: {
                        zIndex: 50000,
                        cursor: "move",
                        clone: true
                    },
                    typeExtractor: function (el) {
                        return el.getAttribute("jtk-node-type");
                    },
                    dataGenerator: function (type) {
                        return {
                            w:120,
                            h:80
                        };
                    }
                });

        // ------------------------ / drag and drop new tables/views -----------------

            });
        },

        initMenu: function() {
            var _p = this,
                _model = this._model,
                _selector = _model.selector();

            _selector.append( '<div class="sidebar node-palette"><ul>'+
                '<li jtk-node-type="action" title="拖动新建">活动节点</li>'+
                '<li jtk-node-type="question" title="拖动新建">聚合节点</li>'+
                '<li jtk-node-type="output" title="拖动新建">输出节点</li>'+
            '</ul></div>' );
        },

        initMainView: function() {
            var _p = this,
                _model = this._model,
                _selector = _model.selector(),
                _mainView = '<div class="jtk-demo-canvas">{0}{1}</div>',
                _controlTpl = '',
                _miniViewTpl = '';

            if( _model.attrControl() ) {
                _controlTpl = '<div class="controls"><i class="flowchart-icon flowchart-home" reset title="Zoom To Fit"></i></div>';
            }

            if( _model.attrMiniView() ) {
                _miniViewTpl = '<div class="miniview"></div>';
            }

            _selector.append( JC.f.printf( _mainView, _controlTpl, _miniViewTpl ) );
        },

        initTemplate: function() {
            var template = $( '#jsPlumbToolkitTemplates' );

            if( template.length != 0 ) {
                if( template.html() == '' ) {
                    template.remove();
                } else {
                    return;
                }
            }

            var _p = this,
                _model = this._model,
                _selector = _model.selector(),
                _tplWrap = '<div id="jsPlumbToolkitTemplates" style="display: none;">{0}</div>',
                _templates = [];

            _templates.push( '<script type="jtk" id="tmplStart"></script>' );
            _templates.push( '<script type="jtk" id="tmplAction"></script>' );
            _templates.push( '<script type="jtk" id="tmplQuestion"></script>' );
            _templates.push( '<script type="jtk" id="tmplOutput"></script>' );
            _templates.push( 
                '<script type="jtk" class="dlg" id="dlgText" >'+
                    '<input type="text" size="50" jtk-focus jtk-att="text" value="${text}" jtk-commit="true"/>'+
                '</script>'+
                '<script type="jtk" class="dlg" id="dlgConfirm" title="Please Confirm">'+
                    '${msg}?'+
                '</script>'+
                '<script type="jtk" class="dlg" id="dlgMessage" title="Message" cancel="false">'+
                    '${msg}'+
                '</script>' 
            );

            $( 'body' ).append( JC.f.printf( _tplWrap, _templates.join( '' ) ) );

            $( '#tmplStart' )[0].innerHTML = '<div style="left:${left}px;top:${top}px;width:${w}px;height:${h}px;" class="flowchart-object flowchart-start">'+
                '<div style="position:relative">'+
                    '<svg:svg width="${w}" height="${h}">'+
                        '<svg:ellipse cx="${w/2}" cy="${h/2}" rx="${w/2}" ry="${h/2}" class="outer"/>'+
                        '<svg:ellipse cx="${w/2}" cy="${h/2}" rx="${(w/2) - 10}" ry="${(h/2) - 10}" class="inner"/>'+
                        '<svg:text text-anchor="middle" x="${ w / 2 }" y="${ h / 2 }" dominant-baseline="central">${text}</svg:text>'+
                    '</svg:svg>'+
                '</div>'+
                '<jtk-source port-type="start" filter=".outer" filter-negate="true"/>'+
            '</div>';

            $( '#tmplAction' )[0].innerHTML = '<div style="left:${left}px;top:${top}px;width:${w}px;height:${h}px;" class="flowchart-object flowchart-action">'+
                '<div style="position:relative">'+
                    '<div class="node-edit node-action">'+
                        '<i class="flowchart-icon flowchart-edit"></i>'+
                    '</div>'+
                    '<div class="node-delete node-action">'+
                        '<i class="flowchart-icon flowchart-delete"></i>'+
                    '</div>'+
                    '<svg:svg width="${w}" height="${h}">'+
                        '<svg:rect x="0" y="0" width="${w}" height="${h}" class="outer"/>'+
                        '<svg:rect x="10" y="10" width="${w-20}" height="${h-20}" class="inner"/>'+
                        '<svg:text text-anchor="middle" x="${w/2}" y="${h/2}" dominant-baseline="central">${text}</svg:text>'+
                    '</svg:svg>'+
                '</div>'+
                '<jtk-target port-type="target"/>'+
                '<jtk-source port-type="source" filter=".outer"/>'+
            '</div>';

            $( '#tmplQuestion' )[0].innerHTML = '<div style="left:${left}px;top:${top}px;width:${w}px;height:${h}px;" class="flowchart-object flowchart-question">'+
                '<div style="position:relative">'+
                    '<div class="node-edit node-action">'+
                        '<i class="flowchart-icon flowchart-edit"></i>'+
                    '</div>'+
                    '<div class="node-delete node-action">'+
                        '<i class="flowchart-icon flowchart-delete"></i>'+
                    '</div>'+
                    '<svg:svg width="${w}" height="${h}">'+
                        '<svg:path d="M ${w/2} 0 L ${w} ${h/2} L ${w/2} ${h} L 0 ${h/2} Z" class="outer"/>'+
                        '<svg:path d="M ${w/2} 10 L ${w-10} ${h/2} L ${w/2} ${h-10} L 10 ${h/2} Z" class="inner"/>'+
                        '<svg:text text-anchor="middle" x="${w/2}" y="${h/2}" dominant-baseline="central">${text}</svg:text>'+
                    '</svg:svg>'+
                '</div>'+
                '<jtk-source port-type="source" filter=".outer"/>'+
                '<jtk-target port-type="target"/>'+
            '</div>';

            $( '#tmplOutput' )[0].innerHTML = '<div style="left:${left}px;top:${top}px;width:${w}px;height:${h}px;" class="flowchart-object flowchart-output">'+
                '<div style="position:relative">'+
                    '<div class="node-edit node-action">'+
                        '<i class="flowchart-icon flowchart-edit"></i>'+
                    '</div>'+
                    '<div class="node-delete node-action">'+
                        '<i class="flowchart-icon flowchart-delete"></i>'+
                    '</div>'+
                    '<svg:svg width="${w}" height="${h}">'+
                        '<svg:rect x="0" y="0" width="${w}" height="${h}"/>'+
                        '<svg:text text-anchor="middle" x="${w/2}" y="${h/2}" dominant-baseline="central">${text}</svg:text>'+
                    '</svg:svg>'+
                '</div>'+
                '<jtk-target port-type="target"/>'+
            '</div>';
        },

        render: function() {

        }
    });

    _jdoc.ready( function(){
        JC.f.safeTimeout( function(){
            FlowChartEditor.autoInit && FlowChartEditor.init();
        }, null, 'FlowChartEditor3asdfa', 1 );
    });

    return JC.FlowChartEditor;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
