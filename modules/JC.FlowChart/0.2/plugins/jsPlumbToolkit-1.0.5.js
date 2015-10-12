(function() {
	"use strict";
	var a, b = this;
	a = "undefined" != typeof exports ? exports : b.Farahey = {};
	var d = function(a, b, c) {
		for (var d = 0, e = a.length, f = -1, g = 0; e > d;) if (f = parseInt((d + e) / 2), g = c(a[f], b), 0 > g) d = f + 1;
		else {
			if (!(g > 0)) return f;
			e = f
		}
		return d
	}, e = "undefined" != typeof jsPlumbGeom ? jsPlumbGeom : Biltong,
		f = function(a, b, c) {
			var e = d(a, b, c);
			a.splice(e, 0, b)
		}, g = function(a, b) {
			var c = a,
				d = {}, f = function(a) {
					if (!d[a[1]]) {
						var c = b(a[2]);
						d[a[1]] = {
							l: a[0][0],
							t: a[0][1],
							w: c[0],
							h: c[1],
							center: [a[0][0] + c[0] / 2, a[0][1] + c[1] / 2]
						}
					}
					return d[a[1]]
				};
			this.setOrigin = function(a) {
				c = a, d = {}
			}, this.compare = function(a, b) {
				var d = e.lineLength(c, f(a).center),
					g = e.lineLength(c, f(b).center);
				return g > d ? -1 : d == g ? 0 : 1
			}
		}, h = function(a, b, c, d) {
			return a[b] <= d && d <= a[b] + a[c]
		}, i = [function(a, b) {
			return a.x + a.w - b.x
		}, function(a, b) {
			return a.x - (b.x + b.w)
		}],
		j = [function(a, b) {
			return a.y + a.h - b.y
		}, function(a, b) {
			return a.y - (b.y + b.h)
		}],
		k = [null, [i[0], j[1]],
			[i[0], j[0]],
			[i[1], j[0]],
			[i[1], j[1]]
		],
		l = function(a, b, c, d, e) {
			isNaN(c) && (c = 0);
			var f, g, i, j = b.y + b.h,
				l = c == 1 / 0 || c == -(1 / 0) ? b.x + b.w / 2 : (j - d) / c,
				m = Math.atan(c);
			return h(b, "x", "w", l) ? (f = k[e][1](a, b), g = f / Math.sin(m), i = g * Math.cos(m), {
				left: i,
				top: f
			}) : (i = k[e][0](a, b), g = i / Math.cos(m), f = g * Math.sin(m), {
				left: i,
				top: f
			})
		}, m = a.calculateSpacingAdjustment = function(a, b) {
			var c = a.center || [a.x + a.w / 2, a.y + a.h / 2],
				d = b.center || [b.x + b.w / 2, b.y + b.h / 2],
				f = e.gradient(c, d),
				g = e.quadrant(c, d),
				h = f == 1 / 0 || f == -(1 / 0) || isNaN(f) ? 0 : c[1] - f * c[0];
			return l(a, b, f, h, g)
		}, n = a.paddedRectangle = function(a, b, c) {
			return {
				x: a[0] - c[0],
				y: a[1] - c[1],
				w: b[0] + 2 * c[0],
				h: b[1] + 2 * c[1]
			}
		}, o = function(a, b, c, d, f, g, h, i, j, k) {
			g = g || [0, 0], k = k || function() {};
			var l, o, p = n(g, [1, 1], d),
				q = 100,
				r = 1,
				s = !0,
				t = {}, u = function(a, b, c, d) {
					t[a] = !0, b[0] += c, b[1] += d
				}, v = function() {
					for (var g = 0; g < a.length; g++) {
						var t = b[a[g][1]],
							w = a[g][1],
							x = (a[g][2], c[a[g][1]]),
							y = n(t, x, d);
						h(a[g][1]) && e.intersects(p, y) && (l = m(p, y), o = f(a[g][1], t, l), u(w, t, o.left, o.top)), y = n(t, x, d);
						for (var z = 0; z < a.length; z++) if (g != z && h(a[z][1])) {
							var A = b[a[z][1]],
								B = c[a[z][1]],
								C = n(A, B, d);
							e.intersects(y, C) && (s = !0, l = m(y, C), o = f(a[z][1], A, l), u(a[z][1], A, o.left, o.top))
						}
					}
					i && k(), s && q > r && (s = !1, r++, i ? window.setTimeout(v, j) : v())
				};
			return v(), t
		}, p = function(a) {
			if (null == a) return null;
			if ("[object Array]" === Object.prototype.toString.call(a)) {
				var b = [];
				return b.push.apply(b, a), b
			}
			var c = [];
			for (var d in a) c.push(a[d]);
			return c
		};
	b.Magnetizer = function(a) {
		var b, d, e, h, i, j = a.getPosition,
			k = a.getSize,
			l = a.getId,
			m = a.setPosition,
			n = a.padding || [20, 20],
			q = a.constrain || function(a, b, c) {
				return c
			}, r = [],
			s = {}, t = {}, u = p(a.elements || []),
			v = a.origin || [0, 0],
			w = a.executeNow,
			x = (this.getOrigin = function() {
				return v
			}, a.filter || function(a) {
				return !0
			}),
			y = a.orderByDistanceFromOrigin,
			z = new g(v, k),
			A = a.updateOnStep,
			B = a.stepInterval || 350,
			C = a.debug,
			D = function() {
				var a = document.createElement("div");
				a.style.position = "absolute", a.style.width = "10px", a.style.height = "10px", a.style.backgroundColor = "red", document.body.appendChild(a), i = a
			}, E = function(a) {
				y && 0 != r.length ? f(r, a, z.compare) : r.push(a)
			}, F = function() {
				z.setOrigin(v), r = [], s = {}, t = {}, b = d = 1 / 0, e = h = -(1 / 0);
				for (var a = 0; a < u.length; a++) {
					var c = j(u[a]),
						f = k(u[a]),
						g = l(u[a]);
					s[g] = [c.left, c.top], E([
						[c.left, c.top], g, u[a]
					]), t[g] = f, b = Math.min(b, c.left), d = Math.min(d, c.top), e = Math.max(e, c.left + f[0]), h = Math.max(h, c.top + f[1])
				}
			}, G = function() {
				if (u.length > 1) {
					var a = o(r, s, t, n, q, v, x, A, B, H);
					H(a)
				}
			}, H = function(a) {
				for (var b = 0; b < u.length; b++) {
					var c = l(u[b]);
					a[c] && m(u[b], {
						left: s[c][0],
						top: s[c][1]
					})
				}
			}, I = function(a) {
				null != a && (v = a, z.setOrigin(a))
			};
		this.execute = function(a) {
			I(a), F(), G()
		}, this.executeAtCenter = function() {
			F(), I([(b + e) / 2, (d + h) / 2]), G()
		}, this.executeAtEvent = function(b) {
			var c = a.container,
				d = a.getContainerPosition(c),
				e = b.pageX - d.left + c[0].scrollLeft,
				f = b.pageY - d.top + c[0].scrollTop;
			C && (i.style.left = b.pageX + "px", i.style.top = b.pageY + "px"), this.execute([e, f])
		}, this.setElements = function(a) {
			u = p(a)
		}, this.addElement = function(a) {
			u.push(a)
		}, this.removeElement = function(a) {
			for (var b = -1, c = 0; c < u.length; c++) if (u[c] == a) {
				b = c;
				break
			} - 1 != b && u.splice(b, 1)
		}, this.setPadding = function(a) {
			n = a
		}, this.setConstrain = function(a) {
			q = c
		}, this.setFilter = function(a) {
			x = a
		}, C && D(), w && this.execute()
	}
}).call(this), 
function() {
	var exports = this;
	Array.prototype.peek = function() {
		return this.length > 0 ? this[this.length - 1] : null
	};
	var ieVersion = "undefined" != typeof navigator && /MSIE\s([\d.]+)/.test(navigator.userAgent) ? new Number(RegExp.$1) : -1,
		oldIE = ieVersion > -1 && 9 > ieVersion,
		CustomTag = function(a, b, c) {
			var d = function(a, b) {
				for (var c = [], d = 0; d < a.length; d++) {
					var e = _extend({}, a[d]);
					_extend(e.atts, b.atts), c.push(e)
				}
				return c
			}.bind(this);
			this.template = c.template, this.getFunctionBody = function(b) {
				var e = a.compile(d(a.parse(c.template), b), !1, !0, !0);
				return e
			}.bind(this), this.getFunctionEnd = function() {
				return ";_els.pop();"
			}, this.rendered = c.rendered || function() {}
		}, _eachNotEmpty = function(a, b) {
			for (var c = 0; c < a.length; c++) {
				var d = a[c];
				null != d && 0 != d.length && b(c, d)
			}
		}, _extend = function(a, b) {
			for (var c in b) a[c] = b[c];
			return a
		}, _data = function(a, b, c) {
			if (null == a) return null;
			if ("$data" === b || null == b) return a;
			var d = a,
				e = d,
				f = null;
			return b.replace(/([^\.])+/g, function(a, b, d, g) {
				if (null == f) {
					var h = a.match(/([^\[0-9]+){1}(\[)([0-9+])/),
						i = d + a.length >= g.length,
						j = function() {
							return e[h[1]] || function() {
								return e[h[1]] = [], e[h[1]]
							}()
						};
					if (i) if (h) {
						var k = j(),
							l = h[3];
						null == c ? f = k[l] : k[l] = c
					} else null == c ? f = e[a] : e[a] = c;
					else if (h) {
						var m = j();
						e = m[h[3]] || function() {
							return m[h[3]] = {}, m[h[3]]
						}()
					} else e = e[a] || function() {
						return e[a] = {}, e[a]
					}()
				}
			}), f
		}, InBrowserTemplateResolver = function(a) {
			var b = document.getElementById(a);
			return null != b ? b.innerHTML : null
		}, _isArray = function(a) {
			return "[object Array]" === Object.prototype.toString.call(a)
		}, _isObject = function(a) {
			return "[object Object]" === Object.prototype.toString.call(a)
		}, _flatten = function(a) {
			for (var b = [], c = 0; c < a.length; c++) _isArray(a[c]) ? b.push.apply(b, _flatten(a[c])) : b[b.length] = a[c];
			return b
		}, _map = function(a, b) {
			for (var c = [], d = 0, e = a.length; e > d; d++) c.push(b(a[d]));
			return _flatten(c)
		}, _filter = function(a, b) {
			for (var c = [], d = 0, e = a.length; e > d; d++) b(a[d]) && c.push(a[d]);
			return c
		}, _trim = function(a) {
			if (null == a) return a;
			for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d)););
			return b.slice(0, d + 1)
		}, _addBinding = function(a, b, c, d, e) {
			var f = _uuid(),
				g = {
					w: b,
					e: [],
					u: f
				};
			e.bindings[f] = g;
			var h = function() {
				return null != d ? "try {  if(" + d + ") { out = out.replace(this.e[k][0], eval(this.e[k][1])); } else out=''; } catch(__) { out='';}" : "try { out = out.replace(this.e[k][0], eval(this.e[k][1])); } catch(__) { out=out.replace(this.e[k][0], '');}"
			}, i = function() {
				return null != d ? "var out='';try { with($data) { if (" + d + ") out = this.w; else return null; }}catch(_){return null;}" : "var out = this.w;"
			};
			g.reapply = new Function("$data", i() + "for (var k = 0; k < this.e.length; k++) { with($data) { " + h() + " }} return out;"), c.bindings[a] = g, b.replace(/\$\{([^\}]*)\}/g, function(a, b, c, d) {
				g.e.push([a, b])
			})
		}, _bindOneAtt = function(a, b, c, d, e) {
			c.atts[a] = b, _addBinding(a, b, c, d, e)
		}, _parseAtts = function(a, b) {
			function c(a, c) {
				var d = a.match(/([^=]+)=['"](.*)['"]/);
				return null == d && null == c ? e.atts[a] = "" : null == d ? _bindOneAtt(a, "", e, c, b) : _bindOneAtt(d[1], d[2], e, c, b), d
			}
			for (var d = b.parseAttributes(a), e = {
				el: _trim(d[0]),
				atts: {},
				bindings: {}
			}, f = 1; f < d.length; f++) {
				var g = _trim(d[f]);
				if (null != g && g.length > 0) {
					var h = g.match(b.inlineIfRe);
					if (h) for (var i = h[2].split(b.attributesRe), j = 0; j < i.length; j++) {
						var k = _trim(i[j]);
						null != k && k.length > 0 && c(k, h[1])
					} else c(g)
				}
			}
			return e
		}, _uuid = function(a) {
			var b = a ? "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx" : "xxxxxxxx-xxxx-4xxx";
			return b.replace(/[xy]/g, function(a) {
				var b = 16 * Math.random() | 0,
					c = "x" == a ? b : 3 & b | 8;
				return c.toString(16)
			})
		}, _bind = function(a, b) {
			var c = this.bindings[b];
			return null == c ? "" : c.reapply(a)
		}, AbstractEntry = function(a, b) {
			this.uuid = _uuid(), this.children = [], this.context = a.context, this.instance = b, b.entries[this.uuid] = this
		}, ElementEntry = function(a, b) {
			AbstractEntry.apply(this, arguments);
			var c = _parseAtts(a, b),
				d = c.el.split(":");
			this.tag = c.el, 2 == d.length && (this.namespace = d[0]), this.atts = c.atts, this.bindings = c.bindings, this.type = "element", this.compile = function(a, b) {
				if (a.customTags[this.tag]) {
					for (var c = a.customTags[this.tag].getFunctionBody(this), d = 0; d < this.children.length; d++) this.children[d].precompile && (c += this.children[d].precompile(a)), c += this.children[d].compile(a), this.children[d].postcompile && (c += this.children[d].postcompile(a));
					return c += "_le=_els.pop();_rotors.customTags['" + this.tag + "'].rendered(_le, _rotors);"
				}
				var e = "/* element entry " + this.uuid + " */;";
				if (this.remove !== !0) {
					e += a.getExecutionContent(this.tag, this.uuid, !1, this.namespace);
					for (var f in this.atts) if (this.atts.hasOwnProperty(f)) {
						var g;
						g = null != this.bindings[f] ? "_rotors.bind(data[0], '" + this.bindings[f].u + "');" : "'" + this.atts[f] + "'", e += "__a=" + g + ";if(__a!=null) e.setAttribute('" + f + "',__a || '');"
					}
				}
				for (var h = 0; h < this.children.length; h++) this.children[h].precompile && (e += this.children[h].precompile(a)), e += this.children[h].compile(a), this.children[h].postcompile && (e += this.children[h].postcompile(a));
				return this.remove === !0 || b || (e += "_le=_els.pop();"), e
			};
			var e = function(a, c) {
				b.each(c.split(";"), function(b) {
					var c = b.indexOf(":"),
						d = b.substring(0, c),
						e = b.substring(c + 1);
					a.style[d] = e
				})
			};
			this.update = function(a, b) {
				for (var c in this.atts) if (this.atts.hasOwnProperty(c) && "class" !== c) {
					var d;
					d = null != this.bindings[c] ? this.bindings[c].reapply(b) : "'" + this.atts[c] + "'", null != d && ("style" === c && null != a.style ? e(a, d) : a.setAttribute(c, d))
				}
			}
		}, CommentEntry = function(a) {
			this.uuid = _uuid(), this.comment = a, this.compile = function() {
				return ""
			}
		}, TextEntry = function(a, b) {
			AbstractEntry.apply(this, arguments), this.value = a.value, this.type = "text", this.bindings = {};
			var c = function() {
				return "_rotors.bind(data[0], '" + this.bindings.__element.u + "', typeof $key !== 'undefined' ? $key : null, typeof $value !== 'undefined' ? $value : null)"
			}.bind(this);
			this.compile = function(a) {
				return a.getExecutionContent(c(), this.uuid, !0)
			}, this.update = function(a, b) {
				a.nodeValue = this.bindings.__element.reapply(b)
			}
		}, Fakement = function() {
			this.childNodes = [], this.appendChild = function(a) {
				this.childNodes.push(a)
			}
		}, FakeElement = function(a) {
			Fakement.apply(this), this.tag = a;
			var b = {};
			this.setAttribute = function(a, c) {
				b[a] = c
			}, this.getAttribute = function(a) {
				return b[a]
			}
		}, FakeTextNode = function(a) {
			this.nodeValue = a
		}, _getDefaultTemplateResolver = function(a) {
			return a.isBrowser ? InBrowserTemplateResolver : null
		}, _wrapCache = function(a, b, c) {
			return function(d) {
				var e = c ? null : a.cache[d];
				return null == e && (e = b(d)), null == e && (e = a.defaultTemplate), null != e && (a.cache[d] = e), e
			}
		}, RotorsInstance = function(a) {
			a = a || {}, this.cache = {}, this.templateCache = {}, null != a.defaultTemplate && this.setDefaultTemplate(a.defaultTemplate)
		}, _e = function(a, b) {
			for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
		};
	_e(RotorsInstance.prototype, {
		bindings: {},
		entries: {},
		executions: {},
		bind: _bind,
		defaultTemplate: "<div></div>",
		defaultCompiledTemplate: null,
		setDefaultTemplate: function(a) {
			null != a ? (this.defaultTemplate = a, this.defaultCompiledTemplate = this.compile(this.parse(a))) : this.clearDefaultTemplate()
		},
		clearDefaultTemplate: function() {
			this.defaultTemplate = null, this.defaultCompiledTemplate = null
		},
		clearCache: function() {
			this.cache = {}, this.templateCache = {}
		},
		namespaceHandlers: {
			svg: function(a) {
				return "e = document.createElementNS('http://www.w3.org/2000/svg', '" + a.split(":")[1] + "');e.setAttribute('version', '1.1');e.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');"
			}
		},
		each: function(a, b, c, d) {
			var e;
			if (_isArray(a)) for (e = 0; e < a.length; e++) b(a[e], c, e, d);
			else for (e in a) a.hasOwnProperty(e) && b({
				$key: e,
				$value: a[e]
			}, c, e, d)
		},
		openRe: new RegExp("<([^/>]*?)>$|<([^/].*[^/])>$"),
		closeRe: new RegExp("^</([^>]+)>"),
		openCloseRe: new RegExp("<(.*)(/>$)"),
		tokenizerRe: /(<[^\^>]+\/>)|(<!--[\s\S]*?-->)|(<[\/a-zA-Z0-9\-:]+(?:\s*[a-zA-Z\-]+=\"[^\"]+\"|\s*[a-zA-Z\-]+='[^']+'|\s*[a-zA-Z\-]|\s*\{\{.*\}\})*>)/,
		commentRe: /<!--[\s\S]*?-->/,
		attributesRe: /([a-zA-Z0-9\-_]+="[^"]*")|(\{\{if [^(?:\}\})]+\}\}.*\{\{\/if\}\})/,
		inlineIfRe: /\{\{if ([^\}]+)\}\}(.*)\{\{\/if\}\}/,
		singleExpressionRe: /^[\s]*\$\{([^\}]*)\}[\s]*$/,
		parseAttributes: function(a) {
			return null == a ? a : this.filterEmpty(a.replace("/>", ">").split(/^<|>$/)[1].split(this.attributesRe))
		},
		map: _map,
		flatten: _flatten,
		filter: _filter,
		data: _data,
		camelize: function(a) {
			return a
		},
		dataExperiment: function(inObj, path, value) {
			if (null == inObj) return null;
			if ("$data" === path || null == path) return inObj;
			var h;
			with(inObj) if (null != value) {
				var v = "string" == typeof value ? '"' + value + '"' : value;
				eval(path + "=" + v)
			} else eval("h=" + path);
			return h
		},
		uuid: _uuid,
		filterEmpty: function(a) {
			return _filter(a, function(a) {
				return null != a && _trim(a).length > 0
			})
		},
		isBrowser: function() {
			return "undefined" != typeof document
		}(),
		isOldIE: function() {
			return oldIE
		},
		createFragment: function() {
			return this.isBrowser ? this.isOldIE() ? document.createElement("div") : document.createDocumentFragment() : new Fakement
		},
		createTextNode: function(a) {
			return this.isBrowser ? document.createTextNode(a) : new FakeTextNode(a)
		},
		createElement: function(a) {
			return this.isBrowser ? document.createElement(a) : new FakeElement(a)
		},
		customElements: {
			"r-each": {
				parse: function(a, b, c, d) {
					a.context = a.atts["in"], a.type = "each"
				},
				compile: function(a) {
					var b = function() {
						var b = "function(item, _rotorsLoopId, _rotorsLoopIndex, _rotorsLoopContext) { ";
						b += "data.unshift(item);$value=item;$key=_rotorsLoopIndex;";
						for (var c = 0; c < this.children.length; c++) b += this.children[c].compile(a), b += ";_rotors.popExecutionTrace(_eid, '" + this.uuid + "');";
						return b += "data.splice(0,1);", b += "}"
					}.bind(this),
						c = "_rotors.traceExecution(null, _eid, '" + this.uuid + "');",
						d = this.context ? ';data.unshift(_rotors.data(data[0], "' + this.context + '"));' : "",
						e = "_rotors.each(data[0], " + b() + ",'" + this.uuid + "', '" + this.context + "');",
						f = this.context ? ";data.splice(0, 1);" : "";
					return c + d + e + f
				}
			},
			"r-if": {
				parse: function(a, b, c, d) {
					a.test = a.atts.test
				},
				compile: function(a) {
					var b, c = "",
						d = "",
						e = this.happyFlowChildren || this.children;
					for (b = 0; b < e.length; b++) c += e[b].compile(a) + ";";
					if (null != this.happyFlowChildren) {
						for (d = "else {", b = 0; b < this.children.length; b++) d += this.children[b].compile(a) + ";";
						d += "}"
					}
					return ";with (data[0]) { if(" + this.test + ") { " + c + " }" + d + "}"
				}
			},
			"r-else": {
				remove: !0,
				parse: function(a, b, c, d, e) {
					var f = e.peek();
					null != f && "r-if" === f.tag && (f.happyFlowChildren = f.children, f.children = [])
				},
				compile: function(a) {}
			},
			"r-for": {
				parse: function(a, b, c, d, e) {
					a.loop = a.atts.loop
				},
				compile: function(a) {
					var b = "";
					b += "var __limit; with(data[0]){__limit=(" + this.loop + ");}", b += "for(var $index=0;$index<__limit;$index++){data[0].$index=$index;";
					for (var c = 0; c < this.children.length; c++) b += this.children[c].compile(a) + ";";
					return b += "}delete data[0].$index;"
				}
			},
			"r-tmpl": {
				remove: !0,
				parse: function(a, b, c, d) {
					a.type = "template", a.context = a.atts.context, a.templateId = a.atts.id;
					var e = c(a.templateId),
						f = d.parse(e, c);
					d.debug("nested ast", f), a.children = f
				},
				precompile: function(a) {
					return this.context ? ';data.unshift(_rotors.data(data[0], "' + this.context + '"));' : ""
				},
				postcompile: function(a) {
					return this.context ? ";data.splice(0, 1);" : ""
				}
			}
		},
		customTags: {},
		registerTag: function(a, b) {
			this.customTags[a] = new CustomTag(this, a, b)
		},
		debugEnabled: !1,
		debug: function() {
			this.debugEnabled && console.log.apply(console, arguments)
		},
		maybeDebug: function() {
			this.debugEnabled && arguments[0] && console.log.apply(console, arguments)
		},
		parse: function(a, b) {
			b = _wrapCache(this, b || _getDefaultTemplateResolver(this), null);
			var c = [],
				d = [],
				e = this,
				f = function(a, b) {
					var c = a.match(b);
					return null == c ? !1 : c
				}, g = function() {
					return c.length > 0 ? c[c.length - 1] : null
				}, h = function(a) {
					var b = g();
					return null != b && b.tag == a
				}, i = function(a, b) {
					c.length > 0 && g().children.push(a), b ? 0 == c.length && d.push(a) : c.push(a)
				}, j = function(a) {
					i(a, !0)
				}, k = function() {
					var a = c.pop();
					return 0 == c.length && d.push(a), a
				}, l = function(a, b, d, e) {
					var f = new ElementEntry(a, e),
						g = e.customElements[f.tag];
					return g && (g.parse(f, b, d, e, c), g.compile && (f.compile = g.compile), f.precompile = g.precompile, f.postcompile = g.postcompile, f.custom = !0, f.remove = g.remove, e.debug("  element is a custom element"), e.maybeDebug(f.remove, "  element's root should not appear in output")), f
				}, m = [{
					re: e.commentRe,
					handler: function(a, b, c, d) {
						d.debug("comment", a, b), i(new CommentEntry(a), !0)
					}
				}, {
					re: e.openRe,
					handler: function(a, b, c, d) {
						d.debug("open element", a, b);
						var e = l(a, b, c, d);
						i(e, e.remove)
					}
				}, {
					re: e.closeRe,
					handler: function(a, b, c, d) {
						d.debug("close element", a, b);
						var e = d.customElements[b[1]];
						if (null == e || !e.remove) {
							if (!h(b[1])) throw new TypeError("Unbalanced closing tag '" + b[1] + "'; opening tag was '" + k().tag + "'");
							k()
						}
					}
				}, {
					re: e.openCloseRe,
					handler: function(a, b, c, d) {
						d.debug("open and close element", a, b);
						var e = l(a, b, c, d);
						i(e, !0)
					}
				}, {
					re: /.*/,
					handler: function(a, b, c, d) {
						var e = _trim(a);
						if (null != e && e.length > 0) {
							d.debug("text node", a);
							var f = new TextEntry({
								value: e
							}, d);
							j(f), _addBinding("__element", e, f, null, d)
						}
					}
				}];
			return _eachNotEmpty(_trim(a).split(this.tokenizerRe), function(a, c) {
				for (var d = 0; d < m.length; d++) {
					c = _trim(c);
					var e = f(c, m[d].re);
					if (e) {
						m[d].handler(c, e, b, this);
						break
					}
				}
			}.bind(this)), d
		},
		compile: function(a, b, c, d) {
			for (var e = "data=[data||{}];var frag=_rotors.createFragment(),_els=[],e,_le,__a,$value,$key,_eid = _rotors.newExecutionContext();_els.push(frag);", f = "return frag;", g = [], h = 0; h < a.length; h++) {
				var i = "";
				a[h].precompile && (i += a[h].precompile(this)), i += a[h].compile(this, d), a[h].postcompile && (i += a[h].postcompile(this)), g.push(i)
			}
			var j = g.join("");
			if (this.debug("function body :", j), c) return j;
			var k = new Function("data,_rotors", e + g.join("") + f),
				l = this;
			return b ? k : function(a) {
				return k.apply(this, [a, l])
			}
		},
		newExecutionContext: function() {
			var a = this.uuid();
			return this.executions[a] = {
				current: {
					children: []
				}
			}, a
		},
		traceExecution: function(a, b, c, d) {
			var e = {
				el: a,
				children: [],
				id: c,
				index: d
			};
			this.executions[b].current.children.push(e);
			var f = c + (null != d ? "-" + d : "");
			this.executions[b][f] = e, this.executions[b].current = e
		},
		popExecutionTrace: function(a, b) {
			this.executions[a].current = this.executions[a][b]
		},
		getExecutionContent: function(a, b, c, d, e) {
			var f = null != d ? this.namespaceHandlers[d](a) : c ? "e=_rotors.createTextNode(" + a + ");" : "e=_rotors.createElement('" + a + "');";
			return f + "_els.peek().appendChild(e);" + (c ? "" : "_els.push(e);") + "e._rotors=_rotors.entries['" + b + "'];e._rotorsEid=_eid;if(typeof _rotorsLoopId !== 'undefined') {e._rotorsLoopId=_rotorsLoopId;e._rotorsLoopIndex=_rotorsLoopIndex;e._rotorsLoopContext=_rotorsLoopContext;}_rotors.traceExecution(e, _eid, '" + b + "', typeof _rotorsLoopIndex != 'undefined' ? _rotorsLoopIndex : null);"
		},
		updaters: {},
		onUpdate: function(a, b) {
			if (null != a._rotors) {
				var c = a._rotors.instance;
				a._RotorsUpdate = a._RotorsUpdate || _uuid(), c.updaters[a._RotorsUpdate] = c.updaters[a._RotorsUpdate] || [], c.updaters[a._RotorsUpdate].push(b)
			}
		},
		update: function(a, b) {
			var c, d, e, f = [],
				g = a._rotorsEid;
			if (null != g && null != a._rotors) {
				e = a._rotors.instance, c = e.executions[g];
				var h = a._rotorsLoopIndex,
					i = a._rotors.uuid + (null != h ? "-" + h : "");
				d = c[i];
				var j = function(a, b, c) {
					null != a && (a._rotors.update(a, b), a._RotorsUpdate && e.updaters[a._RotorsUpdate] && f.push([a, e.updaters[a._RotorsUpdate], b]));
					for (var d = 0; d < c.children.length; d++) {
						var g = e.entries[c.children[d].id],
							h = "each" === e.entries[c.id].type,
							i = h && null != c.children[d].el && null != c.children[d].el._rotorsLoopIndex ? b[c.children[d].el._rotorsLoopIndex] : e.data(b, g.context);
						j(c.children[d].el, i, c.children[d])
					}
				};
				j(a, b, d);
				for (var k = 0; k < f.length; k++) for (var l = f[k], m = 0; m < l[1].length; m++) try {
					l[1][m](l[0], l[2])
				} catch (n) {}
			}
		},
		template: function(a, b, c, d) {
			var e, f = d ? null : this.templateCache[a];
			if (null != f) return e = f(b), this.isOldIE() ? e.childNodes[0] : e;
			c = _wrapCache(this, c || _getDefaultTemplateResolver(this), d);
			var g = c(a);
			if (null != g) {
				var h = this.parse(g, c),
					i = this.compile(h);
				return this.templateCache[a] = i, e = i(b), this.isOldIE() ? e.childNodes[0] : e
			}
			return this.createFragment()
		},
		precompileTemplate: function(a, b) {
			var c = this.parse(a, b || _getDefaultTemplateResolver(this));
			return this.compile(c, !0)
		},
		precompileTemplates: function(a, b) {
			var c = function(c) {
				var d = a[c];
				return d || (b || _getDefaultTemplateResolver(this))(c)
			}, d = {};
			for (var e in a) d[e] = this.precompileTemplate(a[e], c);
			return d
		},
		importTemplate: function(a, b) {
			var c = this;
			b = "string" == typeof b ? Function("data", "_rotors", b) : b, this.templateCache[a] = function(a) {
				return b.apply(c, [a, c])
			}
		},
		importTemplates: function(a) {
			for (var b in a) this.importTemplate(b, a[b])
		},
		importBindings: function(a) {
			this.bindings = this.bindings || {};
			for (var b in a) {
				var c = a[b];
				this.bindings[b] = {
					e: c.e,
					u: c.u,
					w: c.w,
					reapply: Function("$data", c.reapply)
				}
			}
		}
	});
	var newInstance = function(a) {
		return new RotorsInstance(a)
	}, exportBindings = function(a) {
		var b = {};
		for (var c in a.bindings) {
			var d = a.bindings[c];
			b[c] = {
				e: d.e,
				u: d.u,
				w: d.w,
				reapply: String(d.reapply).replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, "")
			}
		}
		return b
	}, precompile = function(a, b) {
		b = b || "rotors";
		var c, d = (exports.Rotors || exports).newInstance(),
			e = {}, f = new RegExp("<script type=['\"]" + b + "['\"] id=['\"]([^'\"]+)['\"]>((.*\n)*?)</script>", "g");
		c = a.replace(f, function(a, b, c) {
			return e[b] = c, ""
		});
		var g = [{},
		null, c];
		for (var h in e) g[0][h] = String(d.precompileTemplate(e[h], function(a) {
			return e[a]
		})).replace(/^function\s*\S+\s*\([^)]*\)\s*\{|\}$/g, "");
		return g[1] = exportBindings(d), g
	};
	"undefined" != typeof document ? (exports.Rotors = {
		newInstance: newInstance,
		precompile: precompile
	}, exports.RotorsInstance = RotorsInstance) : (exports.newInstance = newInstance, exports.instanceClass = RotorsInstance, exports.precompile = precompile)
}.call(this), 
function() {
	var a = this;
	a.jsPlumbToolkitUtil = a.jsPlumbToolkitUtil || {};
	var b = a.jsPlumbToolkitUtil,
		c = function(a, b) {
			return function() {
				return a.apply(b, arguments)
			}
		};
	b.requestAnimationFrame = c(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(b, c) {
		a.setTimeout(b, 10)
	}, a);
	b.ajax = function(a) {
		var b = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
			c = a.type || "GET";
		if (b) {
			var d = "json" === a.dataType ? function(a) {
					return JSON.parse(a)
				} : function(a) {
					return a
				};
			b.open(c, a.url, !0), b.onreadystatechange = function() {
				4 == b.readyState && ("2" === ("" + b.status)[0] ? a.success(d(b.responseText)) : a.error && a.error(b.responseText, b.status))
			}, b.send(a.data ? JSON.stringify(a.data) : null)
		} else a.error && a.error("ajax not supported")
	}, b.debounce = function(a, b) {
		b = b || 150;
		var c = null;
		return function() {
			window.clearTimeout(c), c = window.setTimeout(a, b)
		}
	}, b.xml = {
		setNodeText: function(a, b) {
			a.text = b;
			try {
				a.textContent = b
			} catch (c) {}
		},
		getNodeText: function(a) {
			return null != a ? a.text || a.textContent : ""
		},
		getChild: function(a, b) {
			for (var c = null, d = 0; d < a.childNodes.length; d++) if (1 == a.childNodes[d].nodeType && a.childNodes[d].nodeName == b) {
				c = a.childNodes[d];
				break
			}
			return c
		},
		getChildren: function(a, b) {
			for (var c = [], d = 0; d < a.childNodes.length; d++) 1 == a.childNodes[d].nodeType && a.childNodes[d].nodeName == b && c.push(a.childNodes[d]);
			return c
		},
		xmlToString: function(a) {
			try {
				return (new XMLSerializer).serializeToString(a).replace(/\s*xmlns=\"http\:\/\/www.w3.org\/1999\/xhtml\"/g, "")
			} catch (b) {
				try {
					return a.xml
				} catch (c) {
					throw new Error("Cannot serialize XML " + c)
				}
			}
			return !1
		},
		createElement: function(a, b, c) {
			var d;
			try {
				d = new ActiveXObject("Microsoft.XMLDOM").createNode(1, a, "")
			} catch (e) {
				d = document.createElement(a)
			}
			if (c && jsPlumbToolkitUtil.xml.setNodeText(d, c), b) for (var f in b) d.setAttribute(f, b[f]);
			return d
		}
	}
}.call(this), 
function() {
	"use strict";
	var a = this;
	a.jsPlumbToolkitUtil = a.jsPlumbToolkitUtil || {};
	var b = a.jsPlumbToolkitUtil,
		c = a.jsPlumbUtil;
	b.fastTrim = function(a) {
		for (var b = a.replace(/^\s\s*/, ""), c = /\s/, d = b.length; c.test(b.charAt(--d)););
		return b.slice(0, d + 1)
	}, b.uuid = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
			var b = 16 * Math.random() | 0,
				c = "x" == a ? b : 3 & b | 8;
			return c.toString(16)
		})
	}, b.populate = function(a, b) {
		var d = function(a) {
			var c = a.match(/(\${.*?})/g);
			if (null != c) for (var d = 0; d < c.length; d++) {
				var e = b[c[d].substring(2, c[d].length - 1)];
				e && (a = a.replace(c[d], e))
			}
			return a
		}, e = function(a) {
			if (null != a) {
				if (c.isString(a)) return d(a);
				if (c.isArray(a)) {
					for (var b = [], f = 0; f < a.length; f++) b.push(e(a[f]));
					return b
				}
				if (c.isObject(a)) {
					var b = {};
					for (var f in a) b[f] = e(a[f]);
					return b
				}
				return a
			}
		};
		return e(a)
	}, b.mergeWithParents = function(a, b, c) {
		c = c || "parent";
		var d = function(a) {
			return a ? b[a] : null
		}, e = function(a) {
			return a ? d(a[c]) : null
		}, f = function(a, b) {
			if (null == a) return b;
			var c = jsPlumbUtil.merge(a, b);
			return f(e(a), c)
		}, g = function(a) {
			if (null == a) return {};
			if ("string" == typeof a) return d(a);
			if (a.length) {
				for (var b, c = !1, e = 0; !c && e < a.length;) b = g(a[e]), b ? c = !0 : e++;
				return b
			}
		}, h = g(a);
		return h ? f(e(h), h) : {}
	}
}.call(this), 
function() {
	var a = {
		nodeTraverseStart: "startNodeTraversal",
		nodeTraverseEnd: "endNodeTraversal",
		start: "startOverlayAnimation",
		end: "endOverlayAnimation"
	}, b = {
		nodeTraversing: "jtk-animate-node-traversing",
		edgeTraversing: "jtk-animate-edge-traversing",
		nodeTraversable: "jtk-animate-node-traversable",
		edgeTraversable: "jtk-animate-edge-traversable"
	};
	jsPlumb.Connection.prototype.animateOverlay = function(c, d) {
		var e = this,
			f = new jsPlumbUtil.EventGenerator,
			g = e.getConnector().getLength();
		d = d || {};
		var h, i, j, k = jsPlumbUtil.uuid(),
			l = d.forwards !== !1,
			m = d.rate || 30,
			n = d.dwell || 250,
			o = d.speed || 100,
			p = g / o * 1e3,
			q = p / m,
			r = 1 / q * (l ? 1 : -1),
			s = d.isFinal !== !1,
			t = l ? 0 : 1,
			u = function() {
				return l ? x >= 1 : 0 >= x
			}, v = l ? e.source : e.target,
			w = l ? e.target : e.source,
			x = t,
			y = function() {
				x += r, u() ? C() : (i.loc = x, e.repaint())
			};
		if ("string" == typeof c) j = [c, {
			location: t,
			id: k
		}];
		else {
			var z = jsPlumb.extend({}, c[1]);
			z.location = t, z.id = k, j = [c[0], z]
		}
		var A = function() {
			f.fire(a.start, e), i = e.addOverlay(j), h = window.setInterval(y, m)
		}, B = function() {
			f.fire(a.nodeTraverseStart, {
				connection: e,
				element: v
			}), jsPlumb.addClass(v, b.nodeTraversing), e.addClass(b.edgeTraversing), window.setTimeout(function() {
				jsPlumb.removeClass(v, b.nodeTraversing), f.fire(a.nodeTraverseEnd, {
					connection: e,
					element: v
				}), A()
			}, n)
		}, C = function() {
			e.removeOverlay(k), window.clearInterval(h), s ? (jsPlumb.addClass(w, b.nodeTraversing), window.setTimeout(function() {
				jsPlumb.removeClass(w, b.nodeTraversing), e.removeClass(b.edgeTraversing), f.fire(a.end, e)
			}, n)) : (e.removeClass(b.edgeTraversing), f.fire(a.end, e))
		};
		return d.previous ? d.previous.bind(a.end, B) : B(), f
	}
}(), 
function() {
	"use strict";
	var a = this,
		b = ["node", "port", "edge"],
		c = ["Refreshed", "Added", "Removed", "Updated", "Moved"];
	a.jsPlumbToolkitUtil.AutoSaver = function(a, d, e, f) {
		for (var g = function() {
			a.save({
				url: d,
				success: e,
				error: f
			})
		}, h = 0; h < b.length; h++) for (var i = 0; i < c.length; i++) a.bind(b[h] + c[i], g)
	}, a.jsPlumbToolkitUtil.CatchAllEventHandler = function(a) {
		for (var d = function() {
			a.fire("dataUpdated")
		}, e = 0; e < b.length; e++) for (var f = 0; f < c.length; f++) a.bind(b[e] + c[f], d)
	}
}.call(this), 
function() {
	var a = this,
		b = a.jsPlumbToolkitUtil,
		c = b,
		d = jsPlumbUtil;
	c.Selection = function(a) {
		jsPlumbUtil.EventGenerator.apply(this, arguments);
		var b, e = a.toolkit,
			f = [],
			g = [],
			h = Math.Infinity,
			i = Math.Infinity,
			j = a.generator,
			k = {}, l = this,
			m = a.onClear || function() {}, n = function(a) {
				return "Edge" === a.objectType ? g : f
			}, o = function(a) {
				var d = [],
					e = n(a),
					f = "Edge" === a.objectType ? i : h;
				if (e.length >= f) {
					if (b === c.Selection.DISCARD_NEW) return !1;
					d = e.splice(0, 1), p(d[0], "Removed"), delete k[d[0].getFullId()]
				}
				return e.push(a), p(a, "Added"), d
			}, p = function(a, b) {
				var c = a.objectType.toLowerCase() + b,
					d = {
						Node: {
							data: a.data,
							node: a
						},
						Port: {
							data: a.data,
							node: a.node,
							port: a
						},
						Edge: {
							data: a.data,
							edge: a
						}
					};
				l.fire(c, d[a.objectType])
			};
		this.getModel = e.getModel, this.setSuspendGraph = e.setSuspendGraph, this.getNodeId = e.getNodeId, this.getEdgeId = e.getEdgeId, this.getPortId = e.getPortId, this.getNodeType = e.getNodeType, this.getEdgeType = e.getEdgeType, this.getPortType = e.getPortType, this.getObjectInfo = e.getObjectInfo, this.isDebugEnabled = e.isDebugEnabled;
		var q = function(a, b) {
			if (!k[a.getFullId()]) {
				var c = o(a);
				return c === !1 ? [
					[],
					[]
				] : (k[a.getFullId()] = a, b && b(a, !0), [
					[a], c])
			}
			return [[], []]
		}, r = function(a, b) {
			var c = d.removeWithFunction(n(a), function(b) {
				return b.id == a.id
			});
			return c && p(a, "Removed"), delete k[a.getFullId()], b && b(a, !1), [
				[],
				[]
			]
		}, s = function(a, b) {
			return k[a.getFullId()] ? r(a, b) : q(a, b)
		}, t = function(a, b, c) {
			var d = [],
				f = [];
			if (null == a) return d;
			var g = function(a) {
				var h;
				if (jsPlumbUtil.isString(a)) {
					if (h = e.getNode(a) || e.getEdge(a), null != h) {
						var i = b(h, c);
						d.push.apply(d, i[0]), f.push.apply(f, i[1])
					}
				} else if (a.eachNode && a.eachEdge) a.eachNode(function(a, b) {
					g(b)
				}), a.eachEdge(function(a, b) {
					g(b)
				});
				else if (a.each) a.each(function(a, b) {
					g(b.vertex || b)
				});
				else if (null != a.length) for (var j = 0; j < a.length; j++) g(a[j], c);
				else {
					var i = b(a, c);
					d.push.apply(d, i[0]), f.push.apply(f, i[1])
				}
			};
			return g(a), [d, f]
		}.bind(this);
		e.bind("nodeRemoved", function(a) {
			r(a.node)
		}), e.bind("portRemoved", function(a) {
			r(a.port)
		}), e.bind("edgeRemoved", function(a) {
			r(a.edge)
		}), e.bind("edgeTarget", function(a) {
			k[a.edge.getFullId()] && l.fire("edgeTarget", a)
		}), e.bind("edgeSource", function(a) {
			k[a.edge.getFullId()] && l.fire("edgeSource", a)
		}), e.bind("nodeUpdated", function(a) {
			k[a.node.getFullId()] && l.fire("nodeUpdated", a)
		}), e.bind("edgeUpdated", function(a) {
			k[a.edge.getFullId()] && l.fire("edgeUpdated", a)
		}), e.bind("portUpdated", function(a) {
			k[a.port.getFullId()] && l.fire("portUpdated", a)
		}), this.remove = function(a, b) {
			return t(a, r, b)
		}, this.append = function(a, b) {
			return t(a, q, b)
		}, this.toggle = function(a, b) {
			return t(a, s, b)
		}, this.setMaxNodes = function(a) {
			h = a
		}, this.setMaxEdges = function(a) {
			i = a
		}, this.setCapacityPolicy = function(a) {
			b = a
		}, this.clear = function(a) {
			f.length = 0, g.length = 0, k = {}, a || m(this)
		}, this.reload = function() {
			if (null != j) {
				this.clear(), this.fire("dataLoadStart"), j(this, e);
				for (var a = 0; a < f.length; a++) l.fire("nodeAdded", f[a]);
				for (var a = 0; a < edges.length; a++) l.fire("edgeAdded", g[a]);
				this.fire("dataLoadEnd")
			}
		}, this.each = function(a, b) {
			for (var c = "Edge" != b ? f : g, d = 0; d < c.length; d++) try {
				a(d, c[d])
			} catch (e) {
				jsPlumbUtil.log("Selection iterator function failed", e)
			}
		}, this.eachNode = this.each, this.eachEdge = function(a) {
			this.each(a, "Edge")
		}, this.getNodeCount = function() {
			return f.length
		}, this.getNodeAt = function(a) {
			return f[a]
		}, this.getNodes = function() {
			return f
		}, this.getNode = e.getNode, this.getAllEdgesFor = function(a) {
			for (var b = a.getAllEdges(), c = [], d = 0; d < b.length; d++) null != k[b[d].getId()] && c.push(b[d]);
			return c
		}, this.getEdgeCount = function() {
			return g.length
		}, this.get = this.getNodeAt = function(a) {
			return f[a]
		}, this.getEdge = function(a) {
			return g[a]
		}, this.setCapacityPolicy(c.Selection.DISCARD_EXISTING)
	}, c.Selection.DISCARD_EXISTING = "discardExisting", c.Selection.DISCARD_NEW = "discardNew"
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbGraph = {};
	b.version = "0.1", b.name = "jsPlumbGraph";
	var c = function(a, b) {
		var c = {};
		this.setAttribute = function(a, b) {
			c[a] = b
		}, this.getAttribute = function(a) {
			return c[a]
		};
		var d = b.getType(a || {});
		this.getType = function() {
			return d
		}, this.setType = function(a) {
			d = a
		}, this.graph = b
	}, d = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
			var b = 16 * Math.random() | 0,
				c = "x" == a ? b : 3 & b | 8;
			return c.toString(16)
		})
	}, e = function(a, b, c) {
		if (null == a) return d();
		if ("string" == typeof a) return a;
		var e = b || c.getIdFunction();
		return e(a) || d()
	}, f = function(a) {
		return "string" == typeof a ? {
			id: a
		} : a
	}, g = b.Vertex = b.Node = function(a, d, g) {
		var i = this;
		c.apply(this, [a, g]), this.objectType = "Node", this.id = e(a, d, g), this.data = f(a), this.getFullId = function() {
			return this.id
		};
		var j = [],
			k = 0,
			l = 0,
			m = [],
			n = [],
			o = {};
		this.getEdges = function(a) {
			if (null == a || null == a.filter) return j;
			for (var b = [], c = 0; c < j.length; c++) a.filter(j[c]) && b.push(j[c]);
			return b
		}, this.getSourceEdges = function() {
			return this.getEdges({
				filter: function(a) {
					return a.source == this
				}.bind(this)
			})
		}, this.getTargetEdges = function() {
			return this.getEdges({
				filter: function(a) {
					return a.target == this
				}.bind(this)
			})
		}, this.addEdge = function(a) {
			j.push(a), a.source !== i && a.isDirected() || l++, a.target !== i && a.isDirected() || k++
		}, this.deleteEdge = function(a) {
			for (var b = -1, c = 0; c < j.length; c++) if (j[c].getId() === a.getId()) {
				b = c;
				break
			}
			return b > -1 ? (j.splice(b, 1), a.source !== i && a.isDirected() || l--, a.target !== i && a.isDirected() || k--, !0) : !1
		}, this.getAllEdges = function(a) {
			for (var b = this.getEdges(a).slice(0), c = 0; c < m.length; c++) b.push.apply(b, m[c].getEdges(a));
			return b
		}, this.addGraph = function(a) {
			return a = "string" == typeof a ? new b.Graph({
				id: a
			}) : a, n.push(a), a.id || (a.id = "" + n.length), a
		}, this.getGraph = function(a) {
			for (var b = 0; b < n.length; b++) if (n[b].id === a) return n[b]
		}, this.getIndegreeCentrality = function() {
			for (var a = 0, b = 0; b < m.length; b++) a += m[b].getIndegreeCentrality();
			return k + a
		}, this.getOutdegreeCentrality = function() {
			for (var a = 0, b = 0; b < m.length; b++) a += m[b].getOutdegreeCentrality();
			return l + a
		}, this.getPorts = function() {
			return m
		}, this.addPort = function(a, b) {
			var c = e(a, b, g),
				d = i.getPort(c);
			return null == d && (d = new h(a, b, i), m.push(d), o[d.id] = d), d
		}, this.setPort = function(a, b) {
			var c = i.getPort(a);
			return c || (c = i.addPort({
				id: a
			})), c.data = b, c.setType(this.graph.getType(b)), c
		}, this.getPort = function(a) {
			return o[a]
		};
		var p = function(a) {
			return a.constructor == jsPlumbGraph.Port ? a.id : a
		};
		this.removePort = function(a) {
			if (a) {
				for (var b = p(a), c = -1, d = !1, e = 0; e < m.length; e++) if (m[e].id === b) {
					c = e;
					break
				} - 1 != c && (m.splice(c, 1), d = !0), delete o[b]
			}
			return d
		};
		var q = 0,
			r = {};
		this.setDefaultInternalCost = function(a) {
			q = a
		}, this.getInternalEdge = function(a, b) {
			var c = p(a),
				d = p(b),
				e = {
					source: o[c],
					target: o[d],
					cost: 1 / 0
				};
			if (e.source && e.target) {
				var f = r[c + "-" + d] || {
					cost: q,
					directed: !1
				};
				for (var g in f) e[g] = f[g]
			}
			return e
		}, this.setInternalEdge = function(a, b, c, d) {
			var e = p(a),
				f = p(b);
			return r[e + "-" + f] = {
				cost: c || q,
				directed: d
			}, this.getInternalEdge(a, b)
		}, this.inspect = function() {
			for (var a = "{ id:" + this.id + ", edges:[\n", b = 0; b < j.length; b++) a += j[b].inspect() + "\n";
			return a += "]}"
		}
	}, h = b.Port = function(a, b, c) {
		g.apply(this, [a, b, c.graph]), this.objectType = "Port", this.getNode = function() {
			return c
		}, this.getFullId = function() {
			return c.id + this.graph.getPortSeparator() + this.id
		}, this.isChildOf = function(a) {
			return c == a
		}, this.getPorts = this.addPort = this.deletePort = this.getPort = null
	}, i = b.Edge = function(a) {
		c.call(this, a.data, a.graph), this.source = a.source, this.target = a.target, this.objectType = "Edge";
		var b = this,
			d = a.cost || 1,
			e = !(a.directed === !1),
			f = a.id,
			g = null;
		this.data = a.data || {}, this.getCost = function() {
			return d
		}, this.setCost = function(a) {
			d = a
		}, this.getId = this.getFullId = function() {
			return null === f ? b.source.id + "_" + b.target.id : f
		}, this.setId = function(a) {
			f = a
		}, this.isDirected = function() {
			return e
		}, this.setDirected = function(a) {
			e = a
		}, this.inspect = function() {
			return null != f ? "{ id:" + f + ", connectionId:" + g + ", cost:" + d + ", directed:" + e + ", source:" + b.source.id + ", target:" + b.target.id + "}" : void 0
		}
	}, j = (b.Graph = function(a) {
		a = a || {}, this.vertices = [], this.edges = [], this.id = a.id;
		var c = {}, d = 0,
			f = {}, h = 0,
			j = !(a.defaultDirected === !1),
			k = a.defaultCost || 1,
			n = this,
			o = a.idFunction || function(a) {
				return a.id
			}, p = a.typeFunction || function(a) {
				return a.type || "default"
			}, q = a.enableSubgraphs === !0,
			r = a.portSeparator || ".";
		this.setIdFunction = function(a) {
			o = a
		}, this.getIdFunction = function() {
			return o
		}, this.setTypeFunction = function(a) {
			p = a
		}, this.getType = function(a) {
			return p(a)
		}, this.setEnableSubgraphs = function(a) {
			q = a
		}, this.setPortSeparator = function(a) {
			r = a
		}, this.getPortSeparator = function() {
			return r
		};
		var s = function(a, d) {
			if (null == a) return null;
			if ("string" != typeof a) {
				if (a.constructor == b.Port || a.constructor == b.Node) return a;
				var e = a;
				if (a = o(a), "string" != typeof a) return e
			}
			var f = q ? a.split("/") : [a],
				g = function(a) {
					if (c[a]) return c[a];
					var b = a.split(r),
						e = b[0],
						f = c[e];
					if (2 === b.length && null != f) {
						var g = f.getPort(b[1]);
						return null == g && d && (g = f.addPort(b[1])), g
					}
					return f
				};
			if (1 == f.length) return g(f[0]);
			if (f.length > 1 && f % 2 == 0) throw "Subgraph path format error.";
			for (var h = null, i = null, j = 0; j < f.length - 1; j += 2) h = g(f[j]), i = h.getGraph(f[j + 1]);
			return i.getVertex(f[f.length - 1])
		};
		this.clear = function() {
			n.vertices.splice(0, n.vertices.length), d = 0, h = 0, c = {}, f = {}
		}, this.getVertices = this.getNodes = function() {
			return n.vertices
		}, this.getVertexCount = this.getNodeCount = function() {
			return n.vertices.length
		}, this.getVertexAt = this.getNodeAt = function(a) {
			return n.vertices[a]
		}, this.getEdgeCount = function() {
			return h
		}, this.addEdge = function(a, b) {
			var c = null == a.directed ? j === !0 : !(a.directed === !1),
				d = a.cost || k,
				g = e(a.data, b, this),
				l = s(a.source, !0),
				m = s(a.target, !0);
			if (null == l || null == l.objectType) throw new TypeError("Unknown source node [" + a.source + "]");
			if (null == m || null == m.objectType) throw new TypeError("Unknown target node [" + a.target + "]");
			var n = new i({
				source: l,
				target: m,
				cost: d,
				directed: c,
				data: a.data || {},
				id: g,
				graph: this
			});
			return n.source.addEdge(n), n.target.addEdge(n), f[g] = n, h++, n
		}, this.addVertex = this.addNode = function(a, b) {
			var e = new g(a, b || o, this);
			return c[e.id] ? null : (this.vertices.push(e), c[e.id] = e, e._id = d++, e)
		}, this.addVertices = this.addNodes = function(a, b) {
			for (var c = 0; c < a.length; c++) this.addVertex(a[c], b || o)
		}, this.deleteVertex = this.deleteNode = function(a) {
			var b = s(a);
			if (b) {
				for (var e = -1, f = 0; f < n.vertices.length; f++) if (n.vertices[f].id === b.id) {
					e = f;
					break
				}
				e > -1 && n.vertices.splice(e, 1);
				for (var g = b.getEdges(), i = 0; i < g.length; i++) n.deleteEdge(g[i]);
				if (h -= g.length, b.getPorts) for (var j = b.getPorts(), k = 0; k < j.length; k++) n.deleteVertex(j[k]);
				delete c[b.id], d--
			}
		}, this.deleteEdge = function(a) {
			if (a = this.getEdge(a), null != a) {
				var b = s(a.source);
				b && b.deleteEdge(a) && h--;
				var c = s(a.target);
				c && c.deleteEdge(a), delete f[a.getId()]
			}
		}, this.getEdge = function(a) {
			if (null != a) {
				if ("string" != typeof a) {
					if (a.constructor == b.Edge) return a;
					var c = a;
					if (a = o(a), "string" != typeof a) return c
				}
				return f[a]
			}
		}, this.getEdges = function(a) {
			a = a || {};
			var b, c = a.source,
				d = a.target,
				e = a.filter || function() {
					return !0
				}, g = function(a) {
					return !(null != c && a.source == j !== c || null != d && a.target == j !== d)
				}, h = [],
				i = function(a) {
					e(a) && g(a) && h.push(a)
				};
			if (a.node) {
				var j = s(a.node),
					k = j.getAllEdges();
				for (b = 0; b < k.length; b++) i(k[b])
			} else for (b in f) i(f[b]);
			return h
		}, this.findPath = function(a, b, c, d, e) {
			return a = s(a), b = s(b), m.compute({
				graph: n,
				source: a,
				target: b,
				strict: !(c === !1),
				nodeFilter: d,
				edgeFilter: e
			})
		}, this.getDistance = function(a, b, c) {
			var d = this.findPath(a, b, c);
			return d.pathDistance
		}, this.getVertex = this.getNode = s, this.setTarget = function(a, b) {
			if (b = s(b), null == b) return {
				success: !1
			};
			var c = a.target;
			return a.target.deleteEdge(a), a.target = b, b.addEdge(a), {
				old: c,
				edge: a,
				"new": b,
				success: !0
			}
		}, this.setSource = function(a, b) {
			if (b = s(b), null == b) return {
				success: !1
			};
			var c = a.source;
			return a.source.deleteEdge(a), a.source = b, b.addEdge(a), {
				old: c,
				edge: a,
				"new": b,
				success: !0
			}
		}, this.printPath = function(a, b) {
			a = s(a), b = s(b);
			for (var c = this.findPath(a, b).path, d = "[" + a.id + " - " + b.id + "] : ", e = 0; e < c.length; e++) d = d + "{ vertex:" + c[e].vertex.id + ", cost:" + c[e].cost + ", edge: " + (c[e].edge && c[e].edge.getId()) + " } ";
			return d
		}, this.getDiameter = function(a) {
			for (var b = 0, c = 0; c < n.vertices.length; c++) for (var d = 0; d < n.vertices.length; d++) if (d != c) {
				var e = m.compute({
					graph: n,
					source: n.vertices[c],
					target: n.vertices[d]
				});
				if (null == e.path || 0 == e.path.length) {
					if (!a) return 1 / 0
				} else b = Math.max(b, e.pathDistance)
			}
			return b
		}, this.diameter = this.getDiameter, this.getCentrality = function(a) {
			return a = s(a), (a.getIndegreeCentrality() + a.getOutdegreeCentrality()) / (n.getVertexCount() - 1)
		}, this.getDegreeCentrality = this.getCentrality, this.getIndegreeCentrality = function(a) {
			return a = s(a), a.getIndegreeCentrality() / (n.getVertexCount() - 1)
		}, this.getOutdegreeCentrality = function(a) {
			return a = s(a), a.getOutdegreeCentrality() / (n.getVertexCount() - 1)
		}, this.getCloseness = function(a) {
			return 1 / n.getFarness(a)
		}, this.getFarness = function(a) {
			a = s(a);
			var b = m.compute({
				graph: n,
				source: a,
				target: a,
				processAll: !0
			}),
				c = 0;
			for (var d in b.dist) c += b.dist[d];
			return c / (n.getVertexCount() - 1)
		}, this.getBetweenness = function(a) {
			var b = n.getVertexCount(),
				c = (b - 1) * (b - 2) / 2,
				d = 0,
				e = 0,
				f = function(a, b, c, d, e) {
					var g = c.parents[a][b];
					if (0 == g.length) {
						var h = d.slice();
						h.unshift(a), e.push(h)
					} else for (var i = 0; i < g.length; i++) if (-1 == d.indexOf(g[i][0].id)) {
						var h = d.slice();
						h.unshift(g[i][0].id), f(a, g[i][0].id, c, h, e)
					}
				};
			a = s(a);
			var g = l.compute({
				graph: n,
				focus: a
			});
			for (var h in g.paths) for (var i in g.paths[h]) if (h != i) {
				var j = [],
					k = 0;
				f(h, i, g, [i], j);
				for (var m = 0; m < j.length; m++) {
					var o = j[m].indexOf(a.id);
					o > 0 && o < j[m].length - 1 && k++
				}
				d += k / j.length, e += k
			}
			return d / c
		}, this.inspect = function() {
			for (var a = "", b = 0; b < n.vertices.length; b++) a += n.vertices[b].inspect() + "\n";
			return a
		}, this.serialize = function() {
			for (var a = {
				nodes: [],
				edges: [],
				ports: []
			}, b = 0; b < n.vertices.length; b++) {
				var c = n.vertices[b];
				a.nodes.push(c.data);
				for (var d = c.getAllEdges(), e = c.getPorts(), f = 0; f < d.length; f++) if (d[f].source == c || "Port" === d[f].source.objectType && d[f].source.getNode() == c) {
					var g = {
						source: d[f].source.getFullId(),
						target: d[f].target.getFullId()
					};
					d[f].data && (g.data = d[f].data), a.edges.push(g)
				}
				for (var h = 0; h < e.length; h++) {
					var i = {};
					for (var j in e[h].data) i[j] = e[h].data[j];
					i.id = e[h].getFullId(), a.ports.push(i)
				}
			}
			return a
		}
	}, function(a, b, c, d, e) {
		for (var f = -1, g = null, h = 1 / 0, i = 0; i < a.length; i++) if (!b[i]) {
			var j = e(a[i]);
			h > j && (h = j, f = i, g = a[i])
		}
		return {
			node: g,
			index: f
		}
	}),
		k = function(a, b, c, d, e, f) {
			for (var g = [], h = d, i = e(h); null != b[i];) g.splice(0, 0, {
				vertex: h,
				cost: a[i],
				edge: c[i]
			}), h = b[i], i = e(h);
			return g.splice(0, 0, {
				vertex: h,
				cost: 0,
				edge: null
			}), g
		}, l = {
			getPath: function(a, b, c, d) {
				if (a[c.id][d.id] == 1 / 0) return null;
				var e = b[c.id][d.id];
				return null == e ? " " : l.getPath(a, b, c, e) + " " + e.id + " " + l.getPath(a, b, e, d)
			},
			getPaths: function(a, b, c, d, e) {
				if (a[c.id][d.id] == 1 / 0) return null;
				var f = b[c.id][d.id];
				return 0 == f.length ? " " : l.getPaths(a, b, c, f[0]) + " " + f[0].id + " " + l.getPaths(a, b, f[0], d)
			},
			compute: function(a) {
				var b, c, d, e = a.graph,
					f = e.getVertexCount(),
					g = {}, h = {};
				for (b = 0; f > b; b++) {
					var i = e.getVertexAt(b);
					for (g[i.id] || (g[i.id] = {}), h[i.id] || (h[i.id] = {}), g[i.id][i.id] = 0, c = 0; f > c; c++) if (b != c) {
						var j = e.getVertexAt(c);
						g[i.id][j.id] || (g[i.id][j.id] = 1 / 0), h[i.id][j.id] || (h[i.id][j.id] = [])
					}
					var k = i.getEdges();
					for (d = 0; d < k.length; d++) k[d].source == i ? g[i.id][k[d].target.id] = k[d].getCost() : (g[k[d].source.id] || (g[k[d].source.id] = {}, h[k[d].source.id] = {}), g[i.id][k[d].source.id] = k[d].getCost())
				}
				for (d = 0; f > d; d++) for (b = 0; f > b; b++) for (c = 0; f > c; c++) if (b != c && c != d && b != d) {
					var l = e.getVertexAt(b).id,
						m = e.getVertexAt(c).id,
						n = e.getVertexAt(d).id;
					g[l][n] + g[n][m] <= g[l][m] && g[l][n] + g[n][m] != 1 / 0 && (g[l][m] = g[l][n] + g[n][m], h[l][m] || (h[l][m] = []), h[l][m].unshift([e.getVertexAt(d), g[l][m]]))
				}
				return {
					paths: g,
					parents: h
				}
			}
		}, m = {
			compute: function(a) {
				for (var b = a.graph, c = a.source, d = a.target, e = a.nodeFilter, f = a.edgeFilter, g = {}, h = {}, i = {}, l = {
					dist: g,
					previous: h,
					edges: i,
					path: []
				}, m = a.processAll, n = {}, o = {}, p = !(a.strict === !1), q = function(a) {
					return a.getFullId ? a.getFullId() : a.id
				}, r = [], s = function(a) {
					var b = o[a.getFullId()];
					return n[b.v.id]
				}, t = function(a, b) {
					var c, d;
					if ("Port" === a.objectType) {
						for (g[a.getFullId()] = b, c = s(a), d = 0; d < c.length; d++) c[d].p != a && (g[c[d].p.getFullId()] = b + a.getNode().getInternalEdge(a, c[d].p).cost);
						p || (g[a.getNode().id] = b)
					} else for (g[a.id] = b, c = n[a.id], d = 0; d < c.length; d++) g[c[d].p.getFullId()] = b
				}, u = function(a) {
					return e && !e(a) ? 1 / 0 : g[q(a)]
				}, v = function(a, b, c) {
					if ("Port" === a.objectType) {
						for (var d = s(a), e = 0; e < d.length; e++) h[d[e].p.getFullId()] = c.node;
						p || (h[a.getNode().id] = c.node)
					}
					h[b] = c.node
				}, w = function(a, b, c) {
					if ("Port" === a.objectType) {
						for (var d = s(a), e = 0; e < d.length; e++) i[d[e].p.getFullId()] = c;
						p || (i[a.getNode().id] = c)
					}
					i[b] = c
				}, x = 0; x < b.vertices.length; x++) {
					var y = b.vertices[x],
						z = y.getPorts();
					r.push(y);
					var A = {
						v: y,
						i: r.length - 1
					};
					n[y.id] = [], t(y, 1 / 0);
					for (var B = 0; B < z.length; B++) r.push(z[B]), o[z[B].getFullId()] = A, n[y.id].push({
						p: z[B],
						i: r.length - 1
					}), t(z[B], 1 / 0)
				}
				if (null == c && (c = b.getVertex(a.sourceId)), null == d && (d = b.getVertex(a.targetId)), null == c || null == d) return l;
				var C = c,
					D = d;
				c.getNode && (C = c.getNode()), d.getNode && (D = d.getNode()), t(c, 0);
				for (var E = new Array(b.vertices.length), F = 0, G = function(a, b, c, d) {
					for (var e = 0; e < b.length; e++) {
						var f = b[e];
						if (c(f)) {
							var g = d(f),
								h = g.tp || g.tn,
								i = q(h),
								j = u(a.node) + f.getCost(),
								k = u(h);
							k > j && (t(h, j), v(h, i, a), w(h, i, f))
						}
					}
				}; F < r.length;) {
					var H = j(r, E, g, q, u),
						I = H.node ? q(H.node) : null;
					if (!H.node || u(H.node) == 1 / 0) break;
					if (d && (I == q(d) || !p && H.node.isChildOf && H.node.isChildOf(d)) && (l.path = k(g, h, i, d, q), l.pathDistance = l.path[l.path.length - 1].cost, !m)) break;
					E[H.index] = !0, F += 1, G(H, H.node.getAllEdges(), function(a) {
						return f && !f(a) ? !1 : !a.isDirected() || H.node == a.source || !p && a.source.isChildOf && a.source.isChildOf(H.node)
					}, function(a) {
						var b = a.source.getNode ? a.source.getNode() : a.source,
							c = a.source.getNode ? a.source : null,
							d = a.target.getNode ? a.target.getNode() : a.target,
							e = a.target.getNode ? a.target : null;
						return a.source == H.node || !p && a.source.isChildOf && a.source.isChildOf(H.node) ? {
							tn: d,
							tp: e
						} : {
							tn: b,
							tp: c
						}
					})
				}
				return l
			}
		}
}.call(this), 

function() {
	"use strict";
	var a = this,
		b = jsPlumbUtil,
		c = jsPlumbToolkitUtil,
		d = function(a) {
			return a.id
		}, e = function(a) {
			return a.type || "default"
		};
	a.jsPlumbToolkitInstance = function(f) {
		f = f || {};
		var g = f.idFunction || d,
			h = f.typeFunction || e,
			i = f.edgeIdFunction || g,
			j = f.edgeTypeFunction || h,
			k = f.portIdFunction || g,
			l = f.portTypeFunction || h,
			m = f.portExtractor,
			n = this,
			o = !1,
			p = !1,
			q = f.model || {}, r = function(a, d, e) {
				d = null != d && b.isObject(d) ? d : {}, d = b.clone(d), d.id = d.id || c.uuid(), d.type = d.type || a, e(d)
			}, s = f.nodeFactory || r,
			t = f.edgeFactory || r,
			u = f.portFactory || r,
			v = f.autoSave && f.saveUrl,
			w = f.saveUrl,
			x = f.onAutoSaveSuccess || function() {}, y = f.onAutoSaveError || function() {}, z = f.doNotUpdateOriginalData === !0,
			A = {
				portSeparator: f.portSeparator,
				defaultCost: f.defaultCost,
				defaultDirected: f.defaultDirected,
				enableSubgraphs: f.enableSubgraphs
			};
		b.EventGenerator.apply(this, arguments);
		var B = new jsPlumbGraph.Graph(A);
		v && new c.AutoSaver(this, w, x, y), new c.CatchAllEventHandler(this), this.getNodeFactory = function() {
			return s
		}, this.getEdgeFactory = function() {
			return t
		}, this.getPortFactory = function() {
			return u
		}, this.setNodeFactory = function(a) {
			s = a
		}, this.setEdgeFactory = function(a) {
			t = a
		}, this.setPortFactory = function(a) {
			u = a
		}, this.setDebugEnabled = function(a) {
			p = a
		}, this.isDebugEnabled = function() {
			return p
		}, this.getModel = function() {
			return q || {}
		};
		var C, D = function() {
			return null == C && (C = new jsPlumbToolkit.Model(q || {})), C
		}, E = function(a, b) {
			if (null == q) return !0;
			var c = this.getType(a),
				d = this.getType(b),
				e = D(),
				f = a.getNode ? a.getNode() : a,
				g = b.getNode ? b.getNode() : b,
				h = "Node" == a.objectType ? e.getNodeDefinition(c) : e.getPortDefinition(c),
				i = "Node" == b.objectType ? e.getNodeDefinition(d) : e.getPortDefinition(d),
				j = this.getNodeType(f),
				k = this.getNodeType(g),
				l = e.getNodeDefinition(j),
				m = e.getNodeDefinition(k);
			return null != h.maxConnections && a.getEdges().length >= h.maxConnections ? !1 : null != i.maxConnections && b.getEdges().length >= i.maxConnections ? !1 : a == b ? !(l.allowLoopback === !1 || h.allowLoopback === !1 || i.allowLoopback === !1 || m.allowLoopback === !1) : f == g ? !(l.allowNodeLoopback === !1 || h.allowNodeLoopback === !1 || i.allowNodeLoopback === !1 || m.allowNodeLoopback === !1) : !0
		}.bind(this);
		this.beforeConnect = f.beforeConnect || E, this.beforeMoveConnection = f.beforeMoveConnection || E, this.beforeStartConnect = f.beforeStartConnect || function(a, b) {
			return {}
		}, this.beforeDetach = f.beforeDetach || function(a, b, c) {
			return !0
		}, this.beforeStartDetach = f.beforeStartDetach || function(a, b) {
			return !0
		}, this.setSuspendGraph = function(a) {
			o = a
		}, this.setDoNotUpdateOriginalData = function(a) {
			z = a
		}, this.getTypeFunction = function() {
			return h
		}, this.connect = function(a) {
			a = a || {};
			var b;
			if (!o) {
				var c = B.getVertex(a.source),
					d = B.getVertex(a.target),
					e = a.cost,
					f = a.directed;
				if (!c) {
					if (a.doNotCreateMissingNodes) return;
					c = B.addVertex(a.source), n.fire("nodeAdded", {
						data: {},
						node: c
					})
				}
				if (!d) {
					if (a.doNotCreateMissingNodes) return;
					d = B.addVertex(a.target), n.fire("nodeAdded", {
						data: {},
						node: d
					})
				}
				var g = this.beforeConnect(c, d);
				g !== !1 && (b = B.addEdge({
					source: c,
					target: d,
					cost: e,
					directed: f,
					data: a.data
				}), n.fire("edgeAdded", {
					edge: b
				}))
			}
			return b
		}, this.clear = function() {
			return B.clear(), this.fire("graphCleared"), this
		}, this.getGraph = function() {
			return B
		}, this.getNodeCount = function() {
			return B.getVertexCount()
		}, this.getNodeAt = function(a) {
			return B.getVertexAt(a)
		}, this.getNodes = function() {
			return B.getVertices()
		}, this.eachNode = function(a) {
			for (var b = 0, c = B.getVertexCount(); c > b; b++) a(b, B.getVertexAt(b))
		}, this.eachEdge = function(a) {
			for (var b = B.getEdges(), c = 0, d = b.length; d > c; c++) a(c, b[c])
		}, this.getEdgeCount = function() {
			return B.getEdgeCount()
		}, this.getNodeId = function(a) {
			return b.isObject(a) ? g(a) : a
		}, this.getNodeType = function(a) {
			return h(a) || "default"
		}, this.getEdgeId = function(a) {
			return b.isObject(a) ? i(a) : a
		}, this.getEdgeType = function(a) {
			return j(a) || "default"
		}, this.getPortId = function(a) {
			return b.isObject(a) ? k(a) : a
		}, this.getPortType = function(a) {
			return l(a) || "default"
		}, this.getType = function(a) {
			var b = "Node" === a.objectType ? h : "Port" === a.objectType ? l : j;
			return b(a.data) || "default"
		}, this.addNode = function(b, d, e) {
			var f = g(b);
			null == f && "string" != typeof b && (b.id = c.uuid());
			var h = B.addNode(b, g);
			if (null != h) {
				if (null != m) {
					var i = m(h.data, h);
					if (null != i) for (var j = 0; j < i.length; j++) h.addPort(i[j])
				}
				return K || z || a.jsPlumbToolkitIO.manage("addNode", I, J, b, g || B.getIdFunction(), n), e || n.fire("nodeAdded", {
					data: b,
					node: h,
					eventInfo: d
				}), h
			}
			return B.getNode(f)
		}, this.addNodes = function(a) {
			for (var b = 0; b < a.length; b++) n.addNode.apply(n, [a[b]]);
			return n
		}, this.getNode = function(a) {
			return B.getVertex(a)
		}, this.getEdge = function(a) {
			return B.getEdge(a)
		}, this.exists = function(a) {
			for (var b = 0; b < arguments.length; b++) if (null == B.getVertex(arguments[b])) return !1;
			return !0
		}, this.removeNode = function(b, c) {
			b = b.constructor == jsPlumbGraph.Vertex || b.constructor == jsPlumbGraph.Port ? b : B.getVertex(b);
			for (var d = b.getAllEdges() || [], e = 0; e < d.length; e++) n.removeEdge(d[e]);
			return B.deleteVertex(b.id), K || z || a.jsPlumbToolkitIO.manage("removeNode", I, J, b.data, g || B.getIdFunction(), n), c || n.fire("nodeRemoved", {
				node: b,
				nodeId: b.id,
				edges: d
			}), n
		}, this.addEdge = function(b, c, d) {
			var e = B.addEdge(b, i);
			return K || z || a.jsPlumbToolkitIO.manage("addEdge", I, J, e, i || B.getIdFunction(), n), d || n.fire("edgeAdded", {
				edge: e,
				source: c
			}, null), e
		}, this.removeEdge = function(b, c) {
			return b = B.getEdge(b), null != b && (B.deleteEdge(b), K || z || a.jsPlumbToolkitIO.manage("removeEdge", I, J, b.data, i || B.getIdFunction(), n), n.fire("edgeRemoved", {
				edge: b,
				source: c
			}, null)), n
		}, this.edgeMoved = function(a, b, c) {
			var d = (a[0 === c ? "source" : "target"], 0 == c ? "setSource" : "setTarget");
			return this[d](a, b)
		}, this.setTarget = function(a, b, c) {
			var d = B.setTarget.apply(B, arguments);
			return d.success === !1 || c || n.fire("edgeTarget", d), d
		}, this.setSource = function(a, b, c) {
			var d = B.setSource.apply(B, arguments);
			return d.success === !1 || c || n.fire("edgeSource", d), d
		}, this.addNewPort = function(b, c, d, e) {
			b = B.getVertex(b), u({
				node: b,
				type: c
			}, d, function(c) {
				var d = k(c),
					f = b.addPort(d);
				f.data = c, K || z || a.jsPlumbToolkitIO.manage("addPort", I, J, {
					node: b,
					port: f
				}, k || B.getIdFunction(), n), e || n.fire("portAdded", {
					node: b,
					data: c,
					port: f
				}, null)
			})
		}, this.addPort = function(b, c, d) {
			var e = b.addPort(c, k);
			return K || z || a.jsPlumbToolkitIO.manage("addPort", I, J, {
				node: b,
				port: e
			}, k || B.getIdFunction(), n), d || n.fire("portAdded", {
				node: b,
				data: c,
				port: e
			}, null), e
		}, this.removePort = function(a, b, c) {
			var d = !1;
			a = a.constructor == jsPlumbGraph.Vertex || a.constructor == jsPlumbGraph.Port ? a : B.getVertex(a);
			var e = a.getPort(b);
			if (e) {
				var f = e.getAllEdges();
				if (d = a.removePort(e), d && !c) {
					n.fire("portRemoved", {
						node: a,
						port: e,
						edges: f
					}, null);
					for (var g = 0; g < f.length; g++) n.removeEdge(f[g])
				}
			}
			return d
		}, this.remove = function(a) {
			if (null != a) {
				var b = n.getObjectInfo(a);
				n.setSuspendRendering(!0);
				try {
					if (!b.obj || "Node" != b.type && "Edge" != b.type) {
						for (; a.getNodeCount() > 0;) n.removeNode(a.get(0));
						for (; a.getEdgeCount() > 0;) n.removeEdge(a.getEdge(0))
					} else n["remove" + b.type](b.obj)
				} finally {
					n.setSuspendRendering(!1, !0)
				}
			}
		}, this.setSuspendRendering = function(a, b) {
			for (var c in S) S[c].setSuspendRendering(a, b)
		}, this.batch = function(a) {
			n.setSuspendRendering(!0);
			try {
				a()
			} catch (b) {
				jsPlumbUtil.log("Error in transaction " + b)
			} finally {
				n.setSuspendRendering(!1, !0)
			}
		};
		var F = function(a, c, d, e, f) {
			var g = B.getNode(a);
			if (g && g.objectType) {
				if (c) for (var h in c) b.replace(g.data, h, c[h]);
				n.fire(d, e(g), null)
			}
		}.bind(this);
		this.updateNode = function(a, b) {
			F(a, b, "nodeUpdated", function(a) {
				return {
					node: a
				}
			})
		}, this.updatePort = function(a, b) {
			F(a, b, "portUpdated", function(a) {
				return {
					port: a,
					node: a.getNode()
				}
			})
		}, this.updateEdge = function(a, c) {
			var d = B.getEdge(a);
			if (d) {
				if (c) for (var e in c) null == d.data[e] ? d.data[e] = c[e] : b.replace(d.data, e, c[e]);
				n.fire("edgeUpdated", {
					edge: d
				}, null)
			}
		}, this.update = function(a, c) {
			return b.isString(a) && (a = this.getNode(a)), a && a.objectType && this["update" + a.objectType](a, c), a
		}, this.getPath = function(b) {
			return new a.jsPlumbToolkit.Path(this, b)
		};
		var G = this.findGraphObject = function(a) {
			return null == a ? null : "*" === a ? B : a.constructor == jsPlumbGraph.Vertex || a.constructor == jsPlumbGraph.Port ? a : b.isString(a) || b.isObject(a) ? B.getVertex(a) : null
		}, H = function(a, b, c) {
			var d = [],
				e = {}, f = function(a) {
					e[a.getId()] || (d.push(a), e[a.getId()] = !0)
				}, g = function(d, e, g, h) {
					if (null != d) for (var i = d[b]({
						filter: a.filter
					}), j = 0; j < i.length; j++) {
						var k = e && d == B || i[j].source == d || c && i[j].source.constructor == jsPlumbGraph.Port && i[j].source.getNode() == d,
							l = g && d == B || i[j].target == d || c && i[j].target.constructor == jsPlumbGraph.Port && i[j].target.getNode() == d;
						(e && k || g && l || h && (k || l)) && f(i[j])
					}
				};
			return g(G(a.source), !0, !1, !1), g(G(a.target), !1, !0, !1), g(G(a.element), !1, !1, !0), d
		};
		this.getEdges = function(a) {
			return H(a, "getEdges", !1)
		}, this.getAllEdges = function(a) {
			return H(a, "getAllEdges", !0)
		}, this.getAllEdgesFor = function(a, b) {
			return a.getAllEdges({
				filter: b
			})
		};
		var I, J, K, L = function(b, d, e) {
			b = b || {};
			var f = b.type || "json",
				g = b.data,
				h = b.url,
				i = b.jsonp,
				j = b.onload,
				k = b.parameters || {}, l = b.error || function() {};
			if (null == g && null == h) throw new TypeError("You must supply either data or url to load.");
			var m = function(b) {
				I = b, J = f, K = !0, n.fire(d), a.jsPlumbToolkitIO.parse(f, b, n, k), R(e), j && j(n, b), n.fire("graphChanged")
			};
			if (g) m(g);
			else if (h) {
				if (i) {
					var o = -1 === h.indexOf("?") ? "?" : "&";
					h = h + o + "callback=?"
				}
				var p = "json" === f ? f : b.dataType;
				c.ajax({
					url: h,
					success: m,
					dataType: p,
					error: l
				})
			}
			return n
		};
		this.load = function(a) {
			return L(a, "dataLoadStart", "dataLoadEnd")
		}, this.append = function(a) {
			return L(a, "dataAppendStart", "dataAppendEnd")
		}, this.save = function(a) {
			a = a || {};
			var b = this.exportData(a);
			return c.ajax({
				url: a.url,
				type: "POST",
				data: b,
				success: a.success,
				error: a.error
			}), n
		}, this.exportData = function(b) {
			return b = b || {}, a.jsPlumbToolkitIO.exportData(b.type || "json", n, b.parameters)
		};
		var M = function(a) {
			return new c.Selection({
				toolkit: n,
				onClear: a || function() {}
			})
		}, N = M(function(a) {
			n.fire("selectionCleared", {
				selection: a
			})
		});
		f.maxSelectedNodes && N.setMaxNodes(f.maxSelectedNodes), f.maxSelectedEdges && N.setMaxEdges(f.maxSelectedEdges), f.selectionCapacityPolicy && N.setCapacityPolicy(f.selectionCapacityPolicy);
		var O = function(a, b, c, d) {
			return b || c.clear(!0), c.append(a, function(a) {
				d && n.fire("select", {
					append: b,
					obj: a,
					selection: c
				})
			})
		};
		this.setSelection = function(a) {
			O(a, !1, N, !0)
		}, this.select = function(a, b) {
			var c = M(),
				d = O(a, !0, c);
			if (b) for (var e = 0; e < d[0].length; e++) {
				var f = d[0][e];
				if ("Node" == f.objectType || "Port" == f.objectType) for (var g = f.getAllEdges(), h = 0; h < g.length; h++) c.append(g[h])
			}
			return c
		};
		var P = function(a, b, c, d) {
			for (var e = a.getAllEdges(), f = 0, g = e.length; g > f; f++) if (e[f].source === a || e[f].getNode && e[f].getNode() === a) {
				var h = e[f].target,
					i = h.getFullId();
				d[i] || (b.append(h), c && b.append(e[f]), d[i] = !0, P(h, b, c, d))
			}
		};
		this.selectDescendants = function(a, b, c) {
			var d = n.getObjectInfo(a),
				e = M();
			if (d.obj && "Node" === d.obj.objectType) {
				b && O(d.obj, !0, e);
				var f = {};
				f[d.obj.getFullId()] = !0, P(d.obj, e, c, f)
			}
			return e
		}, this.filter = function(a, b) {
			var c = "function" == typeof a ? a : function(c) {
					var d = c.data,
						e = !1;
					for (var f in a) {
						var g = a[f] === d[f];
						if (!g && !b) return !1;
						e = e || g
					}
					return e
				}, d = M();
			return this.eachNode(function(a, b) {
				c(b) && d.append(b);
				for (var e = b.getPorts(), f = 0; f < e.length; f++) c(e[f]) && d.append(e[f])
			}), this.eachEdge(function(a, b) {
				c(b) && d.append(b)
			}), d
		}, this.addToSelection = function(a) {
			var b = this.getObjectInfo(a);
			if (b) {
				var c = O(b.obj, !0, N, !0);
				Q("deselect", c[1]), Q("select", c[0])
			}
		};
		var Q = function(a, b) {
			for (var c = 0; c < b.length; c++) n.fire(a, {
				obj: b[c],
				selection: N
			})
		};
		this.toggleSelection = function(a) {
			var b = this.getObjectInfo(a);
			if (b) {
				var c = [],
					d = N.toggle(b.obj, function(a, b) {
						b || c.push(a)
					});
				Q("deselect", d[1]), Q("deselect", c), Q("select", d[0])
			}
		}, this.removeFromSelection = function(a) {
			var b = this.getObjectInfo(a);
			b && N.remove(b.obj, function(a) {
				n.fire("deselect", {
					obj: a,
					selection: N
				})
			})
		}, this.addPathToSelection = function(a) {
			this.addToSelection(this.getPath(a))
		}, this.selectAll = function() {
			throw new TypeError("not implemented")
		}, this.clearSelection = N.clear, this.getSelection = function() {
			return N
		}, this.setMaxSelectedNodes = function(a) {
			N.setMaxNodes(a)
		}, this.setMaxSelectedEdges = function(a) {
			N.setMaxEdges(a)
		}, this.setSelectionCapacityPolicy = function(a) {
			N.setCapacityPolicy(a)
		};
		var R = function(a) {
			n.setSuspendGraph(!0), n.fire(a), n.setSuspendGraph(!1), K = !1
		}, S = {};
		if (this.render = function(b, c) {
			var d = jsPlumb.extend({}, c || {});
			jsPlumb.extend(d, b), d.toolkit = n, null != b.selection && (b.selection.constructor === jsPlumbToolkitUtil.Selection ? d.toolkit = b.selection : d.toolkit = new jsPlumbToolkitUtil.Selection({
				generator: b.selection,
				toolkit: n
			}));
			var e = d.type || a.jsPlumbToolkit.DefaultRendererType,
				f = new a.jsPlumbToolkit.Renderers[e](d),
				g = d.id || jsPlumbUtil.uuid();
			return S[g] = f, f.id = g, f
		}, this.getRenderer = function(a) {
			return S[a]
		}, this.getRenderers = function() {
			return S
		}, this.getObjectInfo = function(a, b) {
			var c = {
				els: {},
				obj: null,
				type: null,
				id: null,
				el: null
			}, d = function(a) {
				return null != a ? a.jtk ? a : d(a.parentNode) : void 0
			}, e = function(a) {
				var b = {};
				for (var c in S) b[c] = [S[c], S[c].getRenderedElement(a)];
				return b
			};
			if (null != a) {
				if (a.eachNode && a.eachEdge) return {
					obj: a
				};
				if (jsPlumbUtil.isArray(a)) return {
					obj: a
				};
				var f = jsPlumb.getElement(a);
				if (null != f && f.jtk) c.el = f, c.obj = f.jtk.port || f.jtk.node;
				else if (null != a.tagName) {
					var g = d(f);
					null != g && (c.el = g, c.obj = g.jtk.port || g.jtk.node)
				} else {
					if ("string" == typeof a && (a = this.getNode(a)), null == a) return c;
					c.obj = a, null != b && (c.el = b(a))
				}
				null == b && (c.els = e(c.obj)), null != c.obj && (c.id = c.obj.id, c.type = c.obj.objectType)
			}
			return c
		}, f.data) {
			var T = f.dataType || "json";
			n.load({
				data: f.data,
				type: T
			})
		}
	}, b.extend(a.jsPlumbToolkitInstance, b.EventGenerator), a.jsPlumbToolkit = new a.jsPlumbToolkitInstance({}), a.jsPlumbToolkit.DefaultRendererType = null, a.jsPlumbToolkit.ready = jsPlumb.ready, a.jsPlumbToolkit.Renderers = {}, a.jsPlumbToolkit.Widgets = {}, a.jsPlumbToolkit.newInstance = function(b) {
		return new a.jsPlumbToolkitInstance(b)
	}
}.call(this), 
function() {
	var a = jsPlumbToolkit,
		b = jsPlumbToolkitUtil,
		c = jsPlumbUtil;
	a.Model = function(d, e) {
		d = d || {}, d.nodes = d.nodes || {}, d.edges = d.edges || {}, d.ports = d.ports || {};
		var f, g, h = {}, i = function(a) {
			var c = b.mergeWithParents([a, "default"], d.nodes);
			return delete c.parent, c
		}, j = function(a) {
			var c = b.mergeWithParents([a, "default"], d.edges);
			return delete c.parent, c
		}, k = function(a, c) {
			var e = c && c.ports ? b.mergeWithParents([a, "default"], c.ports) : b.mergeWithParents([a, "default"], d.ports);
			return delete e.parent, e
		};
		if ("undefined" != typeof e) {
			for (var l in d.edges) {
				if (f = j(l), f.overlays) for (g = 0; g < f.overlays.length; g++) if (c.isArray(f.overlays[g]) && f.overlays[g][1].events) for (var m in f.overlays[g][1].events) f.overlays[g][1].events[m] = function(a, b) {
					return function(c, d) {
						a.call(b, {
							overlay: c,
							e: d,
							component: c.component,
							edge: c.component.edge
						})
					}
				}(f.overlays[g][1].events[m], f.overlays[g]);
				e.registerConnectionType(l, f)
			}
			for (g in d.ports) f = k(g), e.registerEndpointType(g, f);
			if (d.states) for (var n in d.states) h[n] = new a.UIState(n, d.states[n], e)
		}
		return {
			getNodeDefinition: i,
			getEdgeDefinition: j,
			getPortDefinition: k,
			getState: function(a) {
				return h[a]
			}
		}
	}
}.call(this), 
function() {
	var a = jsPlumbToolkit.ready,
		b = function(a) {
			var b = 0,
				c = function() {
					b--, 0 >= b && e()
				};
			this.add = function(d) {
				b++, jsPlumbToolkitUtil.ajax({
					url: d,
					success: function(b) {
						var d = a.innerHTML;
						d += b, a.innerHTML = d, c()
					},
					error: function(a) {
						c()
					}
				})
			}, this.ensureNotEmpty = function() {
				0 >= b && e()
			}
		}, c = [],
		d = !1,
		e = function() {
			d = !0;
			for (var b = 0; b < c.length; b++) a.call(a, c[b])
		};
	jsPlumbToolkit.ready = function(b) {
		d ? a.call(a, b) : c.push(b)
	}, jsPlumb.ready(function() {
		var a = document.getElementById("jsPlumbToolkitTemplates");
		if (a) e();
		else {
			a = document.createElement("div"), a.style.display = "none", a.id = "jsPlumbToolkitTemplates", document.body.appendChild(a);
			for (var c = new b(a), d = document.getElementsByTagName("script"), f = 0; f < d.length; f++) {
				var g = d[f].getAttribute("type"),
					h = d[f].getAttribute("src");
				"text/x-jtk-templates" == g && c.add(h)
			}
			c.ensureNotEmpty()
		}
	})
}.call(this), 
function() {
	"use strict";
	this.jsPlumbToolkit.Classes = {
		LASSO: "jtk-lasso",
		LASSO_SELECT_DEFEAT: "jtk-lasso-select-defeat",
		MINIVIEW: "jtk-miniview",
		MINIVIEW_CANVAS: "jtk-miniview-canvas",
		MINIVIEW_PANNER: "jtk-miniview-panner",
		MINIVIEW_ELEMENT: "jtk-miniview-element",
		MINIVIEW_PANNING: "jtk-miniview-panning",
		MINIVIEW_COLLAPSE: "jtk-miniview-collapse",
		MINIVIEW_COLLAPSED: "jtk-miniview-collapsed",
		NODE: "jtk-node",
		PORT: "jtk-port",
		SURFACE: "jtk-surface",
		SURFACE_NO_PAN: "jtk-surface-nopan",
		SURFACE_CANVAS: "jtk-surface-canvas",
		SURFACE_PAN: "jtk-surface-pan",
		SURFACE_PAN_LEFT: "jtk-surface-pan-left",
		SURFACE_PAN_TOP: "jtk-surface-pan-top",
		SURFACE_PAN_RIGHT: "jtk-surface-pan-right",
		SURFACE_PAN_BOTTOM: "jtk-surface-pan-bottom",
		SURFACE_PAN_ACTIVE: "jtk-surface-pan-active",
		SURFACE_SELECTED_ELEMENT: "jtk-surface-selected-element",
		SURFACE_SELECTED_CONNECTION: "jtk-surface-selected-connection",
		SURFACE_PANNING: "jtk-surface-panning",
		SURFACE_ELEMENT_DRAGGING: "jtk-surface-element-dragging",
		SURFACE_DROPPABLE_NODE: "jtk-surface-droppable-node",
		TOOLBAR: "jtk-toolbar",
		TOOLBAR_TOOL: "jtk-tool",
		TOOLBAR_TOOL_SELECTED: "jtk-tool-selected",
		TOOLBAR_TOOL_ICON: "jtk-tool-icon"
	}, this.jsPlumbToolkit.Constants = {
		click: "click",
		start: "start",
		stop: "stop",
		drop: "drop",
		disabled: "disabled",
		pan: "pan",
		select: "select",
		drag: "drag",
		left: "left",
		right: "right",
		top: "top",
		bottom: "bottom",
		width: "width",
		height: "height",
		leftmin: "leftmin",
		leftmax: "leftmax",
		topmin: "topmin",
		topmax: "topmax",
		min: "min",
		max: "max",
		nominalSize: "50px",
		px: "px",
		onepx: "1px",
		nopx: "0px",
		em: "em",
		absolute: "absolute",
		relative: "relative",
		none: "none",
		block: "block",
		hidden: "hidden",
		div: "div",
		id: "id",
		plusEquals: "+=",
		minusEquals: "-=",
		dot: ".",
		transform: "transform",
		transformOrigin: "transform-origin",
		nodeType: "Node",
		portType: "Port",
		edgeType: "Edge",
		surfaceNodeDragScope: "surfaceNodeDrag",
		mistletoeLayoutType: "Mistletoe",
		surfaceType: "Surface",
		jtkStatePrefix: "jtk-state-",
		msgCannotSaveState: "Cannot save state",
		msgCannotRestoreState: "Cannot restore state"
	}, this.jsPlumbToolkit.Attributes = {
		jtkNodeId: "jtk-node-id",
		relatedNodeId: "related-node-id"
	}, this.jsPlumbToolkit.Methods = {
		addClass: "addClass",
		removeClass: "removeClass"
	}, this.jsPlumbToolkit.Events = {
		beforeDrop: "beforeDrop",
		beforeDetach: "beforeDetach",
		click: "click",
		canvasClick: "canvasClick",
		canvasDblClick: "canvasDblClick",
		connection: "connection",
		connectionDetached: "connectionDetached",
		connectionMoved: "connectionMoved",
		contentDimensions: "contentDimensions",
		contextmenu: "contextmenu",
		dataLoadStart: "dataLoadStart",
		dataAppendStart: "dataAppendStart",
		dataLoadEnd: "dataLoadEnd",
		dataAppendEnd: "dataAppendEnd",
		dblclick: "dblclick",
		drag: "drag",
		drop: "drop",
		dragover: "dragover",
		dragend: "dragend",
		edgeAdded: "edgeAdded",
		edgeRemoved: "edgeRemoved",
		elementDragged: "elementDragged",
		elementAdded: "elementAdded",
		elementRemoved: "elementRemoved",
		endOverlayAnimation: "endOverlayAnimation",
		graphCleared: "graphCleared",
		modeChanged: "modeChanged",
		mousedown: "mousedown",
		mousemove: "mousemove",
		mouseout: "mouseout",
		mouseup: "mouseup",
		mouseenter: "mouseenter",
		mouseleave: "mouseleave",
		mouseover: "mouseover",
		nodeAdded: "nodeAdded",
		nodeMoveStart: "nodeMoveStart",
		nodeMoveEnd: "nodeMoveEnd",
		nodeRemoved: "nodeRemoved",
		edgeTarget: "edgeTarget",
		edgeSource: "edgeSource",
		objectRepainted: "objectRepainted",
		pan: "pan",
		portAdded: "portAdded",
		portRemoved: "portRemoved",
		redraw: "redraw",
		start: "start",
		startOverlayAnimation: "startOverlayAnimation",
		stateRestored: "stateRestored",
		stop: "stop",
		tap: "tap",
		touchend: "touchend",
		touchmove: "touchmove",
		touchstart: "touchstart",
		unload: "unload",
		portRefreshed: "portRefreshed",
		nodeRefreshed: "nodeRefreshed",
		edgeRefreshed: "edgeRefreshed",
		nodeRendered: "nodeRendered",
		nodeUpdated: "nodeUpdated",
		portUpdated: "portUpdated",
		edgeUpdated: "edgeUpdated",
		zoom: "zoom",
		relayout: "relayout",
		deselect: "deselect",
		selectionCleared: "selectionCleared",
		resize: "resize",
		anchorChanged: "anchorChanged"
	}
}.call(this), 
function() {
	"use strict";
	var a = this;
	a.jsPlumbToolkit.util = {
		Cookies: {
			get: function(a) {
				document.cookie.match(new RegExp(a + "=[a-zA-Z0-9.()=|%/_]+($|;)", "g"));
				return val && 0 != val.length ? unescape(val[0].substring(a.length + 1, val[0].length).replace(";", "")) || null : null
			},
			set: function(a, b, c, d) {
				var e = [a + "=" + escape(b), "/", window.location.host],
					f = function() {
						if ("NaN" == parseInt(d)) return "";
						var a = new Date;
						return a.setTime(a.getTime() + 60 * parseInt(d) * 60 * 1e3), a.toGMTString()
					};
				return d && e.push(f(d)), document.cookie = e.join("; ")
			},
			unset: function(b, c, d) {
				c = c && "string" == typeof c ? c : "", d = d && "string" == typeof d ? d : "", a.jsPlumbToolkit.util.Cookies.get(b) && a.jsPlumbToolkit.util.Cookies.set(b, "", "Thu, 01-Jan-70 00:00:01 GMT", c, d)
			}
		},
		Storage: {
			set: function(b, c) {
				"undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.set(b, c) : localStorage.setItem(b, c)
			},
			get: function(b) {
				return "undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.read(b) : localStorage.getItem(b)
			},
			clear: function(b) {
				"undefined" == typeof localStorage ? a.jsPlumbToolkit.util.Cookies.unset(b) : localStorage.removeItem(b)
			},
			clearAll: function() {
				if ("undefined" == typeof localStorage);
				else for (; localStorage.length > 0;) {
					var a = localStorage.key(0);
					localStorage.removeItem(a)
				}
			},
			setJSON: function(b, c) {
				if ("undefined" == typeof JSON) throw new TypeError("JSON undefined. Cannot store value.");
				a.jsPlumbToolkit.util.Storage.set(b, JSON.stringify(c))
			},
			getJSON: function(b) {
				if ("undefined" == typeof JSON) throw new TypeError("JSON undefined. Cannot retrieve value.");
				return JSON.parse(a.jsPlumbToolkit.util.Storage.get(b))
			}
		}
	}
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkit,
		c = b;
	c.Path = function(a, b) {
		this.bind = a.bind, this.getModel = a.getModel, this.setSuspendGraph = a.setSuspendGraph, this.getNodeId = a.getNodeId, this.getEdgeId = a.getEdgeId, this.getPortId = a.getPortId, this.getNodeType = a.getNodeType, this.getEdgeType = a.getEdgeType, this.getPortType = a.getPortType;
		for (var c = a.getGraph().findPath(b.source, b.target, b.strict, b.nodeFilter, b.edgeFilter), d = function() {
			for (var b = 0; b < c.path.length; b++) c.path[b].edge && a.removeEdge(c.path[b].edge);
			return this
		}.bind(this), e = function() {
			for (var b = 0; b < c.path.length; b++) a.removeNode(c.path[b].vertex);
			return this
		}.bind(this), f = function(b, d) {
			var e = a.findGraphObject(b),
				f = !1;
			if (e) for (var g = 0; g < c.path.length; g++) if (c.path[g].vertex == e || c.path[g].edge == e || !d && "Port" == c.path[g].vertex.objectType && c.path[g].vertex.isChildOf(e)) {
				f = !0;
				break
			}
			return f
		}, g = [], h = {}, i = 0; i < c.path.length; i++) g.push(c.path[i].vertex), h[a.getNodeId(c.path[i].vertex)] = [c.path[i].vertex, i];
		this.getNodes = function() {
			return g
		}, this.getNode = function(a) {
			return h["string" == typeof a ? a : a.id][0]
		}, this.getAllEdgesFor = function(a) {
			var b = h[a.id][1];
			return b < c.path.length - 1 ? [c.path[b + 1].edge] : []
		};
		var j = function(a, b) {
			for (var d = b || 0; d < c.path.length; d++) try {
				a(d, c.path[d])
			} catch (e) {
				jsPlumbUtil.log("Path iterator function failed", e)
			}
		};
		this.each = function(a) {
			j(function(b, c) {
				a(b, c)
			})
		}, this.eachNode = function(a) {
			j(function(b, c) {
				a(b, c.vertex)
			})
		}, this.eachEdge = function(a) {
			j(function(b, c) {
				a(b, c.edge)
			}, 1)
		}, this.getNodeCount = function() {
			return c.path.length
		}, this.getNodeAt = function(a) {
			return c.path[a].vertex
		}, this.getEdgeCount = function() {
			return 0 == c.path.length ? 0 : c.path.length - 1
		}, this.path = c, this.deleteEdges = d, this.deleteNodes = e, this.deleteAll = e, this.isEmpty = function() {
			return 0 == c.path.length
		}, this.getCost = function() {
			return c.pathDistance
		}, this.contains = f, this.exists = function() {
			return null != c.pathDistance
		}, this.selectEdges = function(a) {
			return _selectEdges(a, "getEdges", !1)
		}, this.selectAllEdges = function(a) {
			return _selectEdges(a, "getAllEdges", !0)
		}
	}
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkitIO = {}, c = jsPlumbUtil;
	b.version = "0.1", b.name = "jsPlumbToolkitIO";
	var d = function(a, b, c) {
		for (var d = a.nodes || [], e = a.edges || [], f = a.ports || [], g = 0; g < d.length; g++) b.addNode(d[g]);
		for (var h = 0; h < f.length; h++) {
			var i = b.getNode(f[h].nodeId);
			if (null == i) throw new TypeError("Unknown node [" + f[h].nodeId + "]");
			i.addPort(f[h])
		}
		for (var j = 0; j < e.length; j++) {
			var k = e[j].cost || 1;
			b.addEdge({
				source: e[j].source,
				target: e[j].target,
				cost: k,
				directed: e[j].directed,
				data: e[j].data
			})
		}
	}, e = function(a, b) {
		return a.getGraph().serialize()
	}, f = function(a, b, c) {
		var d = function(a) {
			var c = b.addNode(a);
			if (a.children) for (var e = 0; e < a.children.length; e++) {
				var f = b.addNode(a.children[e]);
				b.addEdge({
					source: c,
					target: f
				}), d(a.children[e])
			}
		};
		d(a)
	};
	b.exporters = {
		json: e
	}, b.parsers = {
		json: d,
		"hierarchical-json": f
	}, b.managers = {
		json: {
			removeNode: function(a, b, d) {
				var e = d(b);
				c.removeWithFunction(a.nodes, function(a) {
					return a.id == e
				})
			},
			removeEdge: function(a, b, d) {
				var e = d(b);
				c.removeWithFunction(a.edges, function(a) {
					return a.data && a.data.id == e
				})
			},
			addNode: function(a, b, c) {
				a.nodes = a.nodes || [], a.nodes.push(b)
			},
			addEdge: function(a, b, c) {
				var d = {
					source: b.source.getFullId(),
					target: b.target.getFullId(),
					data: b.data || {}
				};
				a.edges = a.edges || [], a.edges.push(d)
			},
			addPort: function(a, b, c) {
				a.ports = a.ports || [];
				var d = jsPlumb.extend({}, b.port.data || {});
				d.id = b.port.getFullId(), a.ports.push(d)
			},
			removePort: function(a, b, d) {
				var e = b.port.getFullId();
				c.removeWithFunction(a.ports, function(a) {
					return a.id == e
				})
			}
		}
	}, b.parse = function(a, c, d, e) {
		var f = b.parsers[a];
		if (null == f) throw new Error("jsPlumb Toolkit - parse - [" + a + "] is an unsupported type");
		return f(c, d, e)
	}, b.exportData = function(a, c, d) {
		var e = b.exporters[a];
		if (null === e) throw new Error("jsPlumb Toolkit - exportData - [" + a + "]  is an unsupported type");
		return e(c, d)
	}, b.manage = function(a, c, d, e, f, g) {
		b.managers[d] && b.managers[d][a](c, e, f)
	}
}.call(this), 
function() {
	var a = this,
		b = a.jsPlumbToolkit,
		c = b;
	c.Support = {
		ingest: function(c) {
			var d = c.jsPlumb || a.jsPlumb;
			if (!d.getContainer()) throw new TypeError("No Container set on jsPlumb instance. Cannot continue.");
			var e = b.newInstance(),
				f = d.select(),
				g = {}, h = function() {
					return "default"
				}, i = c.idFunction || function(a) {
					return d.getId(a)
				}, j = c.typeFunction || h,
				k = c.idFunction || function(a) {
					return a.id
				}, l = c.edgeTypeFunction || h,
				m = c.render !== !1,
				n = function(a) {
					var b = i(a),
						c = j(a),
						f = d.getId(a);
					null == g[f] && (g[f] = e.addNode({
						id: b,
						type: c
					}, null, !0), a.jtk = {
						node: g[f]
					})
				}, o = function(a) {
					var b = g[a.sourceId],
						c = g[a.targetId],
						d = k(a),
						f = l(a);
					a.edge = e.addEdge({
						source: b,
						target: c,
						data: {
							id: d,
							type: f
						}
					}, null, !0)
				};
			if (c.nodeSelector) for (var p = d.getContainer().querySelectorAll(c.nodeSelector), q = 0; q < p.length; q++) {
				var r = d.getId(p[q]);
				n(p[q], r), d.manage(r, p[q])
			}
			var s = d.getManagedElements();
			for (var r in s) n(s[r].el, r);
			if (f.each(function(a) {
				o(a)
			}), m) {
				var t = a.jsPlumb.extend({}, c.renderParams || {});
				t.jsPlumbInstance = d, t.container = d.getContainer();
				var u = e.render(t);
				return u.ingest = function(a) {
					n(a), u.importNode(a, i(a))
				}, u
			}
			return e
		}
	}
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkit,
		c = b.Layouts = {
			Decorators: {}
		}, d = jsPlumbUtil,
		e = function(a) {
			var b = 1 / 0,
				c = 1 / 0,
				d = -(1 / 0),
				e = -(1 / 0);
			for (var f in a) b = Math.min(b, a[f][0]), d = Math.max(d, a[f][0]), c = Math.min(c, a[f][1]), e = Math.max(e, a[f][1]);
			return [[b, c], [d, e], Math.abs(b - d), Math.abs(c - e)]
		}, f = function(a) {
			if (null == a) return [];
			for (var b = [], d = function(a) {
				var b = "string" == typeof a ? a : a[0],
					d = c.Decorators[b],
					e = "string" == typeof a ? {} : a[1];
				if (!d) throw new TypeError("Decorator [" + b + "] no registered on jsPlumbToolkit.Layouts.Decorators");
				return new d(e)
			}, e = 0; e < a.length; e++) b.push(d(a[e]));
			return b
		};
	c.AbstractLayout = function(b) {
		b = b || {};
		var c = this,
			d = function() {
				return {
					padding: [0, 0]
				}
			}, g = function() {
				var b = a.jsPlumb.extend(d(), c.defaultParameters || {});
				a.jsPlumb.extend(b, i || {}), i = b
			}, h = b.adapter,
			i = b.parameters || {}, j = b.getElementForNode,
			k = new Magnetizer({
				getPosition: function(a) {
					var b = o[a.id];
					return {
						left: b[0],
						top: b[1]
					}
				},
				getSize: function(a) {
					return v[a.id]
				},
				getId: function(a) {
					return a.id
				},
				setPosition: function(a, b) {
					F(a.id, b.left, b.top)
				},
				padding: i.padding,
				filter: function(a) {
					return c.canMagnetize ? c.canMagnetize(a) : !0
				}
			}),
			l = b.magnetized === !1 ? !1 : c.defaultMagnetized || b.magnetize === !0;
		this.decorators = f(b.decorators), this.adapter = b.adapter;
		var m = b.jsPlumb || a.jsPlumb,
			n = b.jsPlumbToolkit,
			o = {}, p = [],
			q = 1 / 0,
			r = 1 / 0,
			s = -(1 / 0),
			t = -(1 / 0),
			u = {}, v = {}, w = b.container,
			x = m.getSize(w),
			y = b.width || x[0],
			z = b.height || x[1],
			A = !1,
			B = function() {
				A = !1, q = 1 / 0, s = -(1 / 0), r = 1 / 0, t = -(1 / 0);
				for (var a = 0; a < c.decorators.length; a++) c.decorators[a].reset({
					remove: m.remove
				});
				o = {}, p.splice(0), v = {}, c.reset && c.reset()
			};
		this.magnetize = function(a) {
			a = a || {};
			var b = a.event ? "executeAtEvent" : a.origin ? "execute" : "executeAtCenter",
				c = a.event ? [a.event, a.options] : a.origin ? [a.origin, a.options] : [a.options];
			k[b].apply(k, c), J(m.repaintEverything)
		}, this.nodeAdded = function(a, b) {
			var d = b && b.position ? b.position : a.node.data && a.node.data.left && a.node.data.top ? a.node.data : c.adapter.getOffset(a.el);
			this._nodeAdded && this._nodeAdded(a, b), u[a.node.id] = a.node, F(a.node.id, d.left, d.top), C(a.node.id, a.el), k.addElement(a.node)
		}, this.nodeRemoved = function(a) {
			delete o[a], delete v[a], delete u[a], this._nodeRemoved && this._nodeRemoved(a), k.removeElement(b.node)
		};
		var C = function(a, b) {
			var c = v[a];
			return c || (b = b || j(a), null != b ? (c = m.getSize(b), v[a] = c) : c = [0, 0]), c
		}, D = function(a, b, c, d) {
			var e = o[a];
			if (!e) {
				if (null != b && null != c) e = [b, c];
				else {
					if (d) return null;
					e = [Math.floor(Math.random() * (y + 1)), Math.floor(Math.random() * (z + 1))]
				}
				F(a, e[0], e[1])
			}
			return e
		}, E = function(a) {
			q = Math.min(q, a[0]), r = Math.min(r, a[1]), s = Math.max(s, a[0]), t = Math.max(t, a[1])
		}, F = this.setPosition = function(a, b, d, e) {
			var f = o[a];
			f ? (f[0] = parseFloat(b), f[1] = parseFloat(d)) : (f = o[a] = [parseFloat(b), parseFloat(d)], p.push([f, a])), E(f), e && c._nodeMoved && c._nodeMoved(a, b, d)
		}, G = function(a, b, c) {
			b = b || 10, c = c || 10;
			var d = o[a];
			return d || (d = o[a] = []), d[0] = Math.floor(Math.random() * b), d[1] = Math.floor(Math.random() * c), E(d), d
		}, H = function() {
			for (var a in o) console.log(a, o[a][0], o[a][1])
		}, I = function(a, b) {
			var d = j(a);
			if (null != d) {
				var e = o[a];
				return c.adapter.setAbsolutePosition(d, e, b), M[a] = [e[0], e[1]], e.concat(C(a))
			}
			return null
		}.bind(this),
			J = this.draw = function(a) {
				for (var b in o) {
					var d = I(b);
					null != d && (q = Math.min(d[0], q), r = Math.min(d[1], r), s = Math.max(d[0] + d[2], s), t = Math.max(d[1] + d[3], t))
				}
				for (var e = 0; e < c.decorators.length; e++) c.decorators[e].decorate({
					adapter: c.adapter,
					layout: c,
					append: function(a, b, d) {
						c.adapter.append(a, b, d, !0)
					},
					setAbsolutePosition: c.adapter.setAbsolutePosition,
					toolkit: n,
					jsPlumb: m,
					bounds: [q, r, s, t],
					floatElement: c.adapter.floatElement,
					fixElement: c.adapter.fixElement
				});
				a && a()
			}, K = function(a) {
				console.log(a);
				var b = e(o, C, j);
				H(), console.log(b[0], b[1], b[2], b[3])
			};
		this.bb = K;
		var L = this.getPositions = function() {
			return o
		}, M = (this.getPosition = function(a) {
			return o[a]
		}, {});
		this.getSize = function(a) {
			return v[a]
		};
		this.begin = function(a, b) {}, this.end = function(a, b) {};
		var N = function(a) {
			if (null != n) {
				g(), k.setElements(h.getNodes()), this.begin && this.begin(n, i);
				for (var b = function() {
					J(function() {
						l && c.magnetize(), c.end && c.end(n, i), a()
					})
				}; !A;) this.step(n, i);
				b()
			}
		}.bind(this);
		return this.relayout = function(a, b) {
			B(), null != a && (i = a), N(b)
		}, this.layout = function(a) {
			A = !1, N(a)
		}, this.clear = function() {
			B()
		}, {
			adapter: b.adapter,
			jsPlumb: m,
			toolkit: n,
			getPosition: D,
			setPosition: F,
			getRandomPosition: G,
			getSize: C,
			getPositions: L,
			setPositions: function(a) {
				o = a
			},
			width: y,
			height: z,
			reset: B,
			draw: J,
			setDone: function(a) {
				A = a
			}
		}
	}, c.EmptyLayout = function(a) {
		var b = {};
		this.refresh = this.relayout = this.layout = function() {
			this.clear();
			for (var c = a.getNodeCount(), d = 0; c > d; d++) {
				var e = a.getNodeAt(d);
				b[e.getFullId()] = [0, 0]
			}
		}, this.nodeRemoved = function(a) {
			delete b[a.id]
		}, this.nodeAdded = function(a) {
			b[a.id] = !1
		}, this.getPositions = function() {
			return b
		}, this.getPosition = function(a) {
			return b[a]
		}, this.setPosition = function(a, c, d) {
			b[a] = [c, d]
		}, this.clear = function() {
			b = {}
		}
	}, c.Mistletoe = function(b) {
		if (!b.parameters.layout) throw "No layout specified for MistletoeLayout";
		var e = {}, f = a.jsPlumb.extend({}, b);
		f.getElementForNode = function(a) {
			return e[a]
		};
		var g, h, i, j = c.AbstractLayout.apply(this, [f]),
			k = b.parameters.layout,
			l = function() {
				j.setPositions(k.getPositions()), j.draw(), this.fire("redraw")
			}.bind(this);
		d.EventGenerator.apply(this, arguments), this.map = function(a, b) {
			e[a] = b
		};
		var m = function() {
			e = {}, g = k.layout, h = k.relayout, i = k.clear, k.layout = function() {
				g.apply(k, arguments), l()
			}, k.relayout = function() {
				j.reset(), h.apply(k, arguments), l()
			}, k.clear = function() {
				i.apply(k, arguments), j.reset()
			}
		};
		m(), this.setHostLayout = function(a) {
			k = a, m()
		}
	};
	var g = c.AbsoluteBackedLayout = function() {
		var a = c.AbstractLayout.apply(this, arguments),
			b = function(a) {
				return [a.data.left, a.data.top]
			}, d = function(a, c) {
				return (c.locationFunction || b)(a)
			};
		return this.begin = function(b, c) {
			for (var e = a.adapter.getNodeCount(), f = 0; e > f; f++) {
				var g = a.adapter.getNodeAt(f),
					h = b.getNodeId(g.data),
					i = a.getPosition(h, null, null, !0);
				null == i && (i = d(g, c)), this.setPosition(h, i[0], i[1], !0)
			}
		}, this.getAbsolutePosition = function(a, b) {
			return d(a, b)
		}, this.step = function() {
			a.setDone(!0)
		}, a
	};
	d.extend(g, c.AbstractLayout), c.Absolute = function(a) {
		c.AbsoluteBackedLayout.apply(this, arguments)
	}, d.extend(c.Absolute, c.AbsoluteBackedLayout);
	var h = c.AbstractHierarchicalLayout = function(a) {
		var b = this,
			d = c.AbstractLayout.apply(this, arguments);
		return b.begin = function(b, c) {
			c.ignoreLoops = !(a.ignoreLoops === !1), c.getRootNode = c.getRootNode || function(a) {
				return d.adapter.getNodeCount() > 0 ? d.adapter.getNodeAt(0) : void 0
			}, c.getChildEdges = c.getChildEdges || function(a, b) {
				return d.toolkit.getAllEdgesFor(a, function(b) {
					return b.source === a
				})
			}, c.rootNode = c.getRootNode(b), c.rootNode ? c.root = c.rootNode.id : d.setDone(!0)
		}, d
	};
	d.extend(h, c.AbstractLayout)
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkit,
		c = b.Layouts;
	c.Circular = function(a) {
		a = a || {};
		var b = c.AbstractLayout.apply(this, arguments);
		this.defaultParameters = {
			padding: 30,
			locationFunction: a.locationFunction
		}, this.step = function(a, c) {
			var d = b.adapter.getNodeCount();
			if (0 == d) return void b.setDone(!0);
			var e, f, g = 0,
				h = 0,
				i = 10,
				j = 2 * Math.PI / d,
				k = -Math.PI / 2;
			for (e = 0; d > e; e++) f = b.adapter.getNodeAt(e), b.setPosition(f.id, g + Math.sin(k) * i, h + Math.cos(k) * i, !0), k += j;
			var l = b.adapter.getNodeAt(0),
				m = b.getSize(l.id),
				n = b.getPosition(l.id),
				o = {
					x: n[0] - c.padding,
					y: n[1] - c.padding,
					w: m[0] + 2 * c.padding,
					h: m[1] + 2 * c.padding
				}, p = b.adapter.getNodeAt(1),
				q = b.getSize(p.id),
				r = b.getPosition(p.id),
				s = {
					x: r[0] - c.padding,
					y: r[1] - c.padding,
					w: q[0] + 2 * c.padding,
					h: q[1] + 2 * c.padding
				}, t = Farahey.calculateSpacingAdjustment(o, s),
				u = [n[0] + m[0] / 2, n[1] + m[1] / 2],
				v = [r[0] + t.left + q[0] / 2, r[1] + t.top + +(q[1] / 2)],
				w = Math.sqrt(Math.pow(u[0] - v[0], 2) + Math.pow(u[1] - v[1], 2));
			for (i = w / 2 / Math.sin(j / 2), e = 0; d > e; e++) f = b.adapter.getNodeAt(e), b.setPosition(f.id, g + Math.sin(k) * i, h + Math.cos(k) * i, !0), k += j;
			b.setDone(!0)
		}
	}
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkit,
		c = b.Layouts;
	c.Hierarchical = function(a) {
		var b, d, e, f, g, h, i, j, k = c.AbstractHierarchicalLayout.apply(this, arguments),
			l = [],
			m = null != a.parameters ? a.parameters.compress : !1,
			n = [],
			o = [],
			p = k.toolkit.getNodeId,
			q = function(a) {
				var b = n[a];
				return b || (b = {
					nodes: [],
					pointer: 0
				}, n[a] = b), b
			}, r = function(a, b, c, d, f) {
				var g = q(c),
					i = {
						node: a,
						parent: d,
						childGroup: f,
						loc: g.pointer,
						index: g.nodes.length,
						dimensions: b,
						size: b[e]
					}, j = b[0 == e ? 1 : 0];
				return null == l[c] ? l[c] = j : l[c] = Math.max(l[c], j), g.pointer += b[e] + h[e], g.nodes.push(i), i
			}, s = function(a, b) {
				var c = o[b];
				c || (c = [], o[b] = c), a.index = c.length, c.push(a)
			}, t = function(a) {
				if (a.size > 0) {
					var b = a.parent.loc + a.parent.size / 2 - (a.size - h[e]) / 2,
						c = o[a.depth],
						d = -(1 / 0),
						f = 0;
					if (null != c && c.length > 0) {
						var g = c[c.length - 1],
							i = g.nodes[g.nodes.length - 1];
						d = i.loc + i.size + h[e]
					}
					b >= d ? a.loc = b : (f = d - b, a.loc = d);
					for (var j = a.loc, k = 0; k < a.nodes.length; k++) a.nodes[k].loc = j, j += a.nodes[k].size, j += h[e];
					f > 0 && v(a), s(a, a.depth)
				}
			}, u = function(a) {
				var b = a.nodes[0].loc,
					c = a.nodes[a.nodes.length - 1].loc + a.nodes[a.nodes.length - 1].size,
					d = (b + c) / 2,
					e = d - a.parent.size / 2,
					f = e - a.parent.loc;
				if (a.parent.loc = e, !a.parent.root) for (var g = a.parent.childGroup, h = a.parent.childGroupIndex + 1; h < g.nodes.length; h++) g.nodes[h].loc += f
			}, v = function(a) {
				for (var b = a; null != b;) u(b), b = b.parent.childGroup
			}, w = function(a, b) {
				if (!i[a.node.id]) {
					i[a.node.id] = !0;
					var c, d = j(a.node, k.toolkit),
						f = {
							nodes: [],
							loc: 0,
							size: 0,
							parent: a,
							depth: b + 1
						}, g = [];
					for (c = 0; c < d.length; c++) {
						var l = d[c].source === a.node ? d[c].target : d[c].source;
						if (l = k.toolkit.getNode(l), null != l && l !== a.node) {
							var m = k.getSize(p(l)),
								n = r(l, m, b + 1, a, f);
							n.childGroupIndex = f.nodes.length, f.nodes.push(n), f.size += m[e] + h[e], g.push(n)
						}
					}
					for (t(f), c = 0; c < g.length; c++) w(g[c], b + 1)
				}
			};
		this.defaultParameters = {
			padding: [60, 60],
			orientation: "horizontal",
			border: 0,
			locationFunction: a.locationFunction
		};
		var x = this.begin;
		this.begin = function(a, c) {
			x.apply(this, arguments), b = c.orientation, d = "horizontal" === b, e = d ? 0 : 1, f = d ? "width" : "height", g = k.adapter.getNodeCount(), h = c.padding, n.length = 0, o.length = 0, i = {}, j = c.getChildEdges
		}, this.step = function(a, b) {
			var c = k.getSize(b.root),
				d = r(b.rootNode, c, 0, null, null);
			d.root = !0, w(d, 0, null);
			for (var f, g, i = 0, j = function(a, b) {
				var c = 0 == e ? 1 : 0;
				return m && a.parent ? k.getPosition(p(a.parent.node))[c] + a.parent.dimensions[c] + h[c] : b
			}, o = 0; o < n.length; o++) {
				n[o].otherAxis = i;
				for (var q = 0; q < n[o].nodes.length; q++) f = 0 == e ? n[o].nodes[q].loc : j(n[o].nodes[q], i), n[o].nodes[q].parent && k.getPosition(p(n[o].nodes[q].parent.node)), g = 1 == e ? n[o].nodes[q].loc : j(n[o].nodes[q], i), k.setPosition(p(n[o].nodes[q].node), f, g, !0);
				n[o].otherAxisSize = l[o] + h[0 == e ? 1 : 0], i += n[o].otherAxisSize
			}
			k.setDone(!0)
		}, this.getHierarchy = function() {
			return n
		}, this.getOrientation = function() {
			return b
		};
		var y = this.nodeRemoved;
		this.nodeRemoved = function() {
			n = [], y.apply(this, arguments)
		}
	}, jsPlumbUtil.extend(c.Hierarchical, c.AbstractHierarchicalLayout)
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkit,
		c = b.Layouts;
	c.Spring = function(a) {
		this.defaultMagnetized = !0;
		var b = c.AbsoluteBackedLayout.apply(this, arguments);
		this.defaultParameters = {
			padding: [50, 50],
			iterations: 500,
			maxRepulsiveForceDistance: 6,
			k: 2,
			c: .01,
			maxVertexMovement: .5,
			locationFunction: a.locationFunction
		};
		var d, e = this.defaultParameters,
			f = {}, g = a.absoluteBacked !== !1,
			h = 0,
			i = 1 / 0,
			j = -(1 / 0),
			k = 1 / 0,
			l = -(1 / 0),
			m = 1,
			n = 1,
			o = 0,
			p = function(a) {
				a.getNode && (a = a.getNode());
				var c = f[a.id];
				if (!c) {
					var d = b.getRandomPosition(a.id, .5, .5);
					c = f[a.id] = {
						id: a.id,
						n: a,
						sp: d,
						p: [d[0], d[1]],
						f: [0, 0]
					}
				}
				return c
			}, q = function(a, b, c) {
				i = Math.min(i, b), k = Math.min(k, c), j = Math.max(j, b), l = Math.max(l, c), a.p[0] = b, a.p[1] = c
			}, r = function(a, b) {
				if (!a.locked || !b.locked) {
					var c = b.p[0] - a.p[0],
						d = b.p[1] - a.p[1],
						f = c * c + d * d;.01 > f && (c = .1 * Math.random() + .1, d = .1 * Math.random() + .1, f = c * c + d * d);
					var g = Math.sqrt(f);
					if (g < e.maxRepulsiveForceDistance) {
						o++;
						var h = e.k * e.k / g,
							i = h * c / g,
							j = h * d / g;
						b.f[0] += b.locked ? 0 : (a.locked ? 2 : 1) * i, b.f[1] += b.locked ? 0 : (a.locked ? 2 : 1) * j, a.f[0] -= a.locked ? 0 : (b.locked ? 2 : 1) * i, a.f[1] -= a.locked ? 0 : (b.locked ? 2 : 1) * j
					}
				}
			}, s = function(a, b) {
				var c = p(b.target);
				if (!a.locked || !c.locked) {
					o++;
					var d = c.p[0] - a.p[0],
						f = c.p[1] - a.p[1],
						g = d * d + f * f;.01 > g && (d = .1 * Math.random() + .1, f = .1 * Math.random() + .1, g = d * d + f * f);
					var h = Math.sqrt(g);
					h > e.maxRepulsiveForceDistance && (h = e.maxRepulsiveForceDistance, g = h * h);
					var i = (g - e.k * e.k) / e.k;
					(void 0 == b.weight || b.weight < 1) && (b.weight = 1), i *= .5 * Math.log(b.weight) + 1;
					var j = i * d / h,
						k = i * f / h;
					c.f[0] -= c.locked ? 0 : (a.locked ? 2 : 1) * j, c.f[1] -= c.locked ? 0 : (a.locked ? 2 : 1) * k, a.f[0] += a.locked ? 0 : (c.locked ? 2 : 1) * j, a.f[1] += a.locked ? 0 : (c.locked ? 2 : 1) * k
				}
			}, t = function() {
				m = b.width / (j - i) * .62, n = b.height / (l - k) * .62;
				for (var a in f) {
					var c = f[a];
					c.locked || (c.sp = v(c.p), b.setPosition(c.id, c.sp[0], c.sp[1], !0))
				}
			}, u = function(a) {
				return [i + (a[0] - .19 * b.width) / m, k + (a[1] - .19 * b.height) / n]
			}, v = function(a) {
				return [.19 * b.width + (a[0] - i) * m, .19 * b.height + (a[1] - k) * n]
			};
		this._nodeMoved = function(a, b, c) {
			var d = f[a];
			d && (d.sp = [b, c], d.p = u(d.sp))
		}, this.canMagnetize = function(a) {
			return f[a] && f[a].locked !== !0
		}, this.reset = function() {
			f = {}, h = 0, i = k = 1 / 0, j = l = -(1 / 0)
		}, this._nodeRemoved = function(a) {
			delete f[a]
		}, this._nodeAdded = function(a, c) {
			if (c && c.position) {
				var d = p(a.node);
				d && (d.locked = !0, b.setPosition(d.id, c.position.left, c.position.top, !0))
			}
		}, this.begin = function(a, c) {
			h = 0, d = b.adapter.getNodeCount()
		}, this.step = function(a, c) {
			var f, i = [],
				j = function(a) {
					return i[a] ? i[a] : function() {
						return i[a] = p(b.adapter.getNodeAt(a)), i[a]
					}()
				};
			for (o = 0, f = 0; d > f; f++) {
				var k = j(f);
				if (g && !k.locked) {
					var l = this.getAbsolutePosition(k.n, c);
					if (null != l && 2 == l.length && !isNaN(l[0]) && !isNaN(l[1])) {
						q(k, l[0], l[1]), k.sp = k.p, b.setPosition(k.id, l[0], l[1], !0), k.locked = !0;
						continue
					}
				}
				for (var m = f + 1; d > m; m++) {
					var n = j(m);
					r(k, n)
				}
				for (var u = b.toolkit.getAllEdgesFor(k.n), v = 0; v < u.length; v++) s(k, u[v])
			}
			if (0 != o) for (f = 0; d > f; f++) {
				var w = j(f),
					x = e.c * w.f[0],
					y = e.c * w.f[1],
					z = e.maxVertexMovement;
				x > z && (x = z), -z > x && (x = -z), y > z && (y = z), -z > y && (y = -z), q(w, w.p[0] + x, w.p[1] + y), w.f[0] = 0, w.f[1] = 0
			}
			h++, (0 == o || h >= e.iterations) && (t(), b.setDone(!0))
		}, this.end = function() {
			for (var a in f) f[a].locked = !0
		}
	}, jsPlumbUtil.extend(c.Spring, c.AbsoluteBackedLayout)
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkit.Renderers,
		c = a.jsPlumbToolkit,
		d = a.jsPlumbToolkitUtil,
		e = a.jsPlumbUtil;
	c.UIState = function(a, b, c) {
		for (var d in b) if (b.hasOwnProperty(d)) {
			var e = "*" === d ? "e-state-" + a : "e-state-" + a + "-" + d,
				f = "*" === d ? "c-state-" + a : "c-state-" + a + "-" + d;
			c.registerEndpointType(e, b[d]), c.registerConnectionType(f, b[d])
		}
		this.activate = function(d, e, f) {
			d.eachEdge(function(c, d) {
				var h = e.getRenderedConnection(d.getId()),
					i = f.getEdgeType(d.data),
					j = i ? "c-state-" + a + "-" + i : null;
				j && h.addType(j), b["*"] && h.addType("c-state-" + a), g(d, h, d.source, 0, "addType", f), g(d, h, d.target, 1, "addType", f)
			}), d.eachNode(function(a, d) {
				var g = f.getNodeType(d.data),
					h = g ? b[g] : null,
					i = e.getRenderedNode(d.id);
				h && h.cssClass && c.addClass(i, h.cssClass), b["*"] && c.addClass(i, b["*"].cssClass)
			})
		};
		var g = function(b, c, d, e, f, g) {
			var h = c.endpoints[e],
				i = g.getPortType(d.data);
			h[f]("e-state-" + a + "-" + i), h[f]("e-state-" + a)
		};
		this.deactivate = function(d, e, f) {
			d.eachEdge(function(c, d) {
				var h = e.getRenderedConnection(d.getId()),
					i = f.getEdgeType(d.data),
					j = i ? "c-state-" + a + "-" + i : null;
				j && h.removeType(j), b["*"] && h.removeType("c-state-" + a), g(d, h, d.source, 0, "removeType", f), g(d, h, d.target, 1, "removeType", f)
			}), d.eachNode(function(a, d) {
				var g = f.getNodeType(d.data),
					h = g ? b[g] : null,
					i = e.getRenderedNode(d.id);
				h && h.cssClass && c.removeClass(i, h.cssClass), b["*"] && c.removeClass(i, b["*"].cssClass)
			})
		}
	};
	var f = b.atts = {
		NODE: "data-jtk-node-id",
		PORT: "data-jtk-port-id"
	}, g = b.els = {
		SOURCE: "JTK-SOURCE",
		PORT: "JTK-PORT",
		TARGET: "JTK-TARGET"
	}, h = jsPlumbToolkit.Classes,
		i = jsPlumbToolkit.Constants,
		j = jsPlumbToolkit.Events;
	b.mouseEvents = ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave", "mouseover"], b.createElement = function(a, b) {
		var c = document.createElement(a.type || i.div);
		a.units || i.px;
		return null != a.top && (c.style.top = a.top + i.px), null != a.left && (c.style.left = a.left + i.px), null != a.right && (c.style.right = a.right + i.px), null != a.bottom && (c.style.bottom = a.bottom + i.px), c.style.width = a.width, c.style.height = a.height, c.style.position = a.position || i.absolute, a.id && c.setAttribute(i.id, a.id), a.display && (c.style.display = a.display), a.clazz && (c.className = a.clazz), null != b && jsPlumb.appendElement(c, b), c
	};
	var k = function(a, b) {
		var c = document.createElement("div");
		return c.innerHTML = a.name || a.id, c.className = h.NODE, c.style.border = "1px solid #456", c.style.position = "absolute", c
	}, l = '<div data-jtk-node-id="${id}" class="' + h.NODE + '"></div>',
		m = {
			rotors: {
				render: function(a, b) {
					return o.template(a, b).childNodes[0]
				}
			}
		}, n = "rotors",
		o = Rotors.newInstance({
			defaultTemplate: l
		}),
		p = b.DOMElementAdapter = function(a) {
			var b = this.getJsPlumb(),
				c = b.getElement(a.container);
			this.getWidth = function() {
				return b.getSize(c)[0]
			}, this.getHeight = function() {
				return b.getSize(c)[1]
			}, this.append = function(a) {
				var d = b.getElement(a);
				b.appendElement(d, c)
			}, this.remove = function(a) {
				var c = b.getElement(a);
				b.removeElement(c)
			}, this.setAbsolutePosition = jsPlumb.setAbsolutePosition, this.getOffset = function(a, c) {
				return b.getOffset(a, c)
			}
		}, q = b.AbstractRenderer = function(b) {
			b = b || {};
			var i = this,
				l = b.toolkit,
				p = new c.Layouts.EmptyLayout(i),
				q = jsPlumb.getElement(b.container),
				r = !(b.elementsDraggable === !1),
				s = !1,
				t = b.refreshAutomatically !== !1,
				u = b.idFunction || l.getNodeId,
				v = b.typeFunction || l.getNodeType,
				w = (b.edgeIdFunction || l.getEdgeId, b.edgeTypeFunction || l.getEdgeType),
				x = b.portIdFunction || l.getPortId,
				y = b.portTypeFunction || l.getPortType,
				z = b.templateRenderer ? e.isString(b.templateRenderer) ? m[b.templateRenderer] : {
					render: b.templateRenderer
				} : m[n],
				A = b.enhancedView !== !1,
				B = e.merge(b.jsPlumb || {}),
				C = b.jsPlumbInstance || jsPlumb.getInstance(B),
				D = C.getId(q);
			C.bind("beforeDrop", function(a) {
				var b = a.connection.source.jtk.port || a.connection.source.jtk.node,
					c = a.connection.target.jtk.port || a.connection.target.jtk.node,
					d = a.connection.edge;
				return null == d ? l.beforeConnect(b, c) : l.beforeMoveConnection(b, c, d)
			}), C.bind("beforeDrag", function(a) {
				var b = a.source.jtk.port || a.source.jtk.node,
					c = a.endpoint.connectionType;
				return l.beforeStartConnect(b, c)
			}), C.bind("beforeDetach", function(a, b) {
				var c = a.source.jtk.port || a.source.jtk.node,
					d = a.target.jtk.port || a.target.jtk.node,
					e = a.edge;
				return l.beforeDetach(c, d, e, b)
			}), C.bind("beforeStartDetach", function(a) {
				var b = a.source.jtk.port || a.source.jtk.node,
					c = a.connection.edge;
				return l.beforeStartDetach(b, c)
			}), e.EventGenerator.apply(this, arguments), this.getJsPlumb = function() {
				return C
			}, this.getToolkit = function() {
				return l
			};
			var E = [j.canvasClick, j.canvasDblClick, j.nodeAdded, j.nodeRemoved, j.nodeRendered, j.nodeMoveStart, j.nodeMoveEnd, j.portAdded, j.portRemoved, j.edgeAdded, j.edgeRemoved, j.dataLoadEnd, j.anchorChanged, j.objectRepainted, j.modeChanged, j.pan, j.zoom, j.relayout, j.click, j.tap, j.stateRestored, j.startOverlayAnimation, j.endOverlayAnimation],
				F = i.bind,
				G = C.bind;
			if (this.setHoverSuspended = C.setHoverSuspended, this.isHoverSuspended = C.isHoverSuspended, this.setJsPlumbDefaults = function(a) {
				delete a.Container, C.restoreDefaults(), C.importDefaults(a)
			}, this.bind = function(a, b) {
				-1 == e.indexOf(E, a) ? G(a, b) : F(a, b)
			}, b.events) for (var H in b.events) this.bind(H, b.events[H]);
			if (b.interceptors) for (var I in b.interceptors) this.bind(I, b.interceptors[I]);
			var J = !1;
			G(j.connection, function(a) {
				if (null == a.connection.edge) {
					J = !0, a.sourceEndpoint.getParameter("nodeId") || a.sourceEndpoint.setParameter("nodeId", L[a.sourceEndpoint.elementId].id), a.targetEndpoint.getParameter("nodeId") || a.targetEndpoint.setParameter("nodeId", L[a.targetEndpoint.elementId].id);
					var b = a.sourceEndpoint.getParameter("portType"),
						c = Z.getPortDefinition(b),
						d = null != c && c.edgeType ? c.edgeType : "default",
						e = a.sourceEndpoint.getParameter("nodeId"),
						f = a.sourceEndpoint.getParameter("portId"),
						g = a.targetEndpoint.getParameter("nodeId"),
						h = a.targetEndpoint.getParameter("portId"),
						k = e + (f ? "." + f : ""),
						m = g + (h ? "." + h : ""),
						n = {
							sourceNodeId: e,
							sourcePortId: f,
							targetNodeId: g,
							targetPortId: h,
							type: d,
							source: l.getNode(k),
							target: l.getNode(m),
							sourceId: k,
							targetId: m
						}, o = l.getEdgeFactory()(d, a.connection.getData() || {}, function(b) {
							n.edge = l.addEdge({
								source: k,
								target: m,
								cost: a.connection.getCost(),
								directed: a.connection.isDirected(),
								data: b,
								addedByMouse: !0
							}, i), Q[n.edge.getId()] = a.connection, a.connection.edge = n.edge, U(d, n.edge, a.connection), n.addedByMouse = !0, i.fire(j.edgeAdded, n)
						});
					o === !1 && C.detach(a.connection), J = !1
				}
			}), G(j.connectionMoved, function(a) {
				var b = 0 == a.index ? a.newSourceEndpoint : a.newTargetEndpoint;
				l.edgeMoved(a.connection.edge, b.element.jtk.port || b.element.jtk.node, a.index)
			}), G(j.connectionDetached, function(a) {
				J = !0, l.removeEdge(a.connection.edge), J = !1;
				var b = a.sourceEndpoint.getParameters(),
					c = a.targetEndpoint.getParameters(),
					d = b.nodeId + (b.portId ? "." + b.portId : ""),
					e = c.nodeId + (c.portId ? "." + c.portId : "");
				i.fire(j.edgeRemoved, {
					sourceNodeId: b.nodeId,
					targetNodeId: c.nodeId,
					sourcePortId: b.portId,
					targetPortId: c.portId,
					sourceId: d,
					targetId: e,
					source: l.getNode(d),
					target: l.getNode(e),
					edge: a.connection.edge
				})
			});
			var K = {}, L = {}, M = {}, N = [],
				O = function(a) {
					N.push(a)
				}, P = function(a) {
					var b = N.indexOf(a); - 1 != b && N.splice(b, 1)
				};
			this.getNodeCount = function() {
				return N.length
			}, this.getNodeAt = function(a) {
				return N[a]
			}, this.getNodes = function() {
				return N
			}, this.getNode = function(a) {
				return K[a]
			};
			var Q = {}, R = function(a) {
				return Q[a.getId()]
			}, S = function(a) {
				for (var b = [], c = 0; c < a.length; c++) b.push(Q[a[c].getId()]);
				return b
			}, T = function(a, b, c, d) {
				d.bind(a, function(a, e) {
					b.apply(b, [{
						edge: c,
						e: e,
						connection: d,
						toolkit: l,
						renderer: i
					}])
				})
			}, U = function(a, b, c) {
				if (!c.getParameter("edge")) {
					var d = Z.getEdgeDefinition(a);
					if (d && d.events) for (var e in d.events) T(e, d.events[e], b, c)
				}
			}, V = function(a, b) {
				var c = a.endpoints[0].getParameters(),
					d = a.endpoints[1].getParameters(),
					e = c.nodeId + (c.portId ? "." + c.portId : ""),
					f = d.nodeId + (d.portId ? "." + d.portId : "");
				i.fire(j.edgeRemoved, {
					sourceNodeId: c.nodeId,
					targetNodeId: d.nodeId,
					sourcePortId: c.portId,
					targetPortId: d.portId,
					sourceId: e,
					targetId: f,
					source: l.getNode(e),
					target: l.getNode(f),
					edge: b
				})
			};
			if (this.setSuspendRendering = function(a, b) {
				s = a, C.setSuspendDrawing(a), b && this.refresh()
			}, this.bindToolkitEvents !== !1) {
				var W = function() {
					C.setSuspendDrawing(!0), this.setSuspendRendering(!0)
				}.bind(this);
				l.bind(j.dataLoadStart, W), l.bind(j.dataAppendStart, W), l.bind(j.dataLoadEnd, function() {
					this.setSuspendRendering(!1), i.relayout(), C.setSuspendDrawing(!1, !0), p && i.fire(j.dataLoadEnd)
				}.bind(this)), l.bind(j.dataAppendEnd, function() {
					this.setSuspendRendering(!1), i.refresh(), C.setSuspendDrawing(!1, !0), p && i.fire(j.dataAppendEnd)
				}.bind(this));
				var X = function(a, c) {
					var d = K[a.id];
					if (null == d) {
						var e = Z.getNodeDefinition(v(a.data));
						if (e.ignore === !0) return !1;
						if (d = ca(a, a.data, a), !d) throw new Error("Cannot render node");
						var f = C.getId(d);
						K[a.id] = d, L[f] = a, O(a), d.jtk = {
							node: a
						}, i.append(d, f, c ? c.position : null), ga(d, a, a.id);
						var g = {
							node: a,
							el: d
						};
						i.getLayout().nodeAdded(g, b.eventInfo), i.fire(j.nodeAdded, g)
					}
					return d
				};
				l.bind(j.nodeAdded, function(a) {
					var b, c = a.node,
						d = X(c, a.eventInfo);
					if (null != d) {
						var e = C.getSelector(d, "[data-port-id]");
						for (b = 0; b < e.length; b++) {
							var f = e[b].getAttribute("data-port-id");
							M[c.id + "." + f] = e[b], e[b].jtk = e[b].jtk || {
								node: c,
								port: c.getPort(f)
							}
						}
						i.refresh(!0)
					}
				}), l.bind(j.nodeRemoved, function(a) {
					i.getLayout().nodeRemoved(a.nodeId), i.fire(j.nodeRemoved, {
						node: a.nodeId,
						el: K[a.nodeId]
					});
					var b = C.getId(K[a.nodeId]);
					C.remove(K[a.nodeId]), delete K[a.nodeId], delete L[b], P(a.node), i.refresh(!0)
				});
				var Y = function(a) {
					return function() {
						var b = aa(a);
						b.doNotFireConnectionEvent = !0, l.isDebugEnabled() && console.log("Renderer", "adding edge with params", b);
						var c = C.connect(b);
						c.edge = a, Q[a.getId()] = c, U(b.type, a, c), i.fire(j.edgeAdded, {
							source: a.source,
							target: a.target,
							connection: c,
							edge: a
						}), i.refresh(!0)
					}
				};
				l.bind(j.edgeAdded, function(a) {
					if (!J && a.source !== i) {
						var c = a.edge,
							d = Z.getEdgeDefinition(v(c.data || {}));
						if (d && d.ignore === !0) return;
						var e = Y(c);
						b.connectionHandler ? b.connectionHandler(c, e) : e()
					}
				}), l.bind(j.edgeRemoved, function(a) {
					if (!J && a.source !== i) {
						var b = a.edge,
							c = Q[b.getId()];
						c && (l.isDebugEnabled() && console.log("Renderer", "removing edge", b), V(c, b), C.detach({
							connection: Q[b.getId()],
							fireEvent: !1
						}), delete Q[b.getId()])
					}
				}), l.bind(j.edgeTarget, function(a) {
					if (!J) {
						var b = a.edge,
							c = Q[b.getId()],
							d = K[b.target.getFullId()];
						c ? null != d ? (l.isDebugEnabled() && console.log("target change", c), C.setTarget(c, d)) : (delete Q[b.getId()], C.detach({
							connection: c,
							forceDetach: !0,
							fireEvent: !1
						})) : null != d && l.isDebugEnabled() && jsPlumbUtil.log("Target for Edge " + b.getId() + " changed to Node " + d.id + "; we have no valid connection.")
					}
				}), l.bind(j.edgeSource, function(a) {
					if (!J) {
						var b = a.edge,
							c = Q[b.getId()],
							d = K[b.source.getFullId()];
						c ? null != d ? C.setSource(c, d) : (delete Q[b.getId()], C.detach({
							connection: c,
							forceDetach: !0,
							fireEvent: !1
						})) : null != d && l.isDebugEnabled() && jsPlumbUtil.log("Source for Edge " + b.getId() + " changed to Node " + d.id + "; we have no valid connection.")
					}
				}), l.bind("graphCleared", function() {
					for (var a in K) C.remove(K[a], !0);
					p && p.clear(), C.setSuspendEvents(!0), C.batch(C.deleteEveryEndpoint, !0), C.setSuspendEvents(!1), N.length = 0, Q = {}, K = {}, L = {}, M = {}, ea = {}, fa.source = {}, fa.target = {}
				}), l.bind(j.portAdded, function(a) {
					var b = K[a.node.id],
						c = da(a.port, a.data, a.node);
					M[a.node.id + "." + a.port.id] = c, ga(jsPlumb.getElement(c), a.node, a.node.id), i.fire(j.portAdded, {
						node: a.node,
						nodeEl: b,
						port: a.port,
						portEl: c
					}), C.recalculateOffsets(b), i.refresh(!0)
				}), l.bind(j.portRemoved, function(a) {
					var b = K[a.node.id],
						c = a.node.id + "." + a.port.id,
						d = M[c];
					C.setSuspendEvents(!0), C.remove(d), C.setSuspendEvents(!1), delete M[c], i.fire(j.portRemoved, {
						node: a.node,
						port: a.port,
						portEl: d,
						nodeEl: b
					}), C.recalculateOffsets(b), i.refresh(!0)
				}), l.bind(j.edgeUpdated, function(a) {
					var b = Q[a.edge.getId()];
					if (b) {
						var c = aa(a.edge);
						b.setType(c.type, c.data)
					}
				}), l.bind(j.portUpdated, function(a) {
					var b = M[a.port.getFullId()];
					b && ("undefined" != typeof Rotors && o.update(b, a.port.data), i.repaint(K[a.node.id]))
				}), l.bind(j.nodeUpdated, function(a) {
					var b = K[a.node.getFullId()];
					b && ("undefined" != typeof b._rotors && o.update(b, a.node.data), ga(b, a.node, a.node.id), i.repaint(b))
				})
			}
			var Z;
			this.setView = function(a) {
				var b = e.merge(l.getModel(), a || {});
				Z = new c.Model(b, C)
			}, this.setView(b.view);
			var $ = [],
				_ = function(a) {
					return null == a ? l : "string" == typeof a ? l.select(a, !0) : a.jtk ? l.select(a.jtk.port || a.jtk.node, !0) : a
				};
			this.activateState = function(a, b) {
				var c = Z.getState(a);
				c && (b = _(b), c.activate(b, i, l), $.push(c))
			}, this.deactivateState = function(a, b) {
				var c = Z.getState(a);
				c && (b = _(b), c.deactivate(b, i, l), jsPlumbUtil.removeWithFunction($, function(a) {
					return a == c
				}))
			}, this.resetState = function() {
				for (var a = 0; a < $.length; a++) $[a].deactivate(l, i, l);
				$.length = 0
			};
			var aa = function(a) {
				var b = w(a.data),
					c = {
						type: b,
						data: a.data,
						cost: a.getCost(),
						directed: a.isDirected()
					}, f = Z.getEdgeDefinition(b);
				f && f.connector && (c.connector = f.connector);
				var g = function(b) {
					if (a[b].getNode) {
						var f = a[b].getNode(),
							g = a[b].getFullId(),
							h = ea[g];
						if (null == h && (h = fa[b][g]), null == h) {
							var i = a[b],
								j = K[u(f.data)],
								k = v(f.data),
								l = Z.getNodeDefinition(k),
								m = y(i.data),
								n = Z.getPortDefinition(i.id, l),
								o = Z.getPortDefinition(m, l),
								p = e.merge(o, n),
								q = null == p ? {} : d.populate(p, i.data);
							null == q.maxConnections && (q.maxConnections = -1), h = C.addEndpoint(j, q), ea[g] = h, h.port = a[b]
						}
						c[b] = h
					} else c[b] = K[u(a[b].data)]
				};
				return g("source"), g("target"), c
			}, ba = function(a, b, c, d, e, f, g, h) {
				return function(i, j, k) {
					var m, n = b(j),
						o = null,
						p = c(j),
						q = Z[d](p),
						s = j;
					if (A) {
						s = jsPlumb.extend({}, q ? q.parameters || {} : {}), jsPlumb.extend(s, j);
						var t = {};
						for (m in s) s.hasOwnProperty(m) && null != s[m] && (s[m].constructor == Function ? t[m] = s[m](j) : t[m] = s[m]);
						s = t
					}
					if (q) {
						var u = q.template || "jtk-template-" + p;
						o = q.templateRenderer ? q.templateRenderer(u, s, l) : z.render(u, s, l)
					} else o = e(s, n);
					o = C.getElement(o), o.setAttribute(h, n), jsPlumb.addClass(o, g), o.jtk = o.jtk || {}, o.jtk[a] = i, o.jtk.node = k, f && r && ja.makeDraggable && ja.makeDraggable(o, q.dragOptions);
					var v = function(a) {
						C.on(o, a, function(b) {
							q.events[a]({
								node: k,
								el: o,
								e: b
							})
						})
					};
					if (q && q.events) for (m in q.events) v(m);
					return o
				}
			}, ca = ba("node", u, v, "getNodeDefinition", k, !0, h.NODE, f.NODE),
				da = ba("port", x, y, "getPortDefinition", k, !1, h.PORT, f.PORT);
			this.initialize = function() {
				var a, c;
				if (l.setSuspendGraph(!0), C.setSuspendDrawing(!0), b.jsPlumbInstance) {
					var d = b.jsPlumbInstance.select();
					d.each(function(a) {
						Q[a.edge.getId()] = a
					});
					var c = b.jsPlumbInstance.getManagedElements();
					for (var e in c) {
						var f = c[e].el;
						K[f.jtk.node.id] = f, L[b.jsPlumbInstance.getId(f)] = f.jtk.node
					}
					ja.doImport && ja.doImport(K, Q)
				} else {
					for (a = 0; a < l.getNodeCount(); a++) c = l.getNodeAt(a), X(c);
					for (a = 0; a < l.getNodeCount(); a++) if (c = l.getNodeAt(a), K[c.id]) for (var g = l.getAllEdgesFor(c), h = 0; h < g.length; h++) if (g[h].source == c || g[h].source.getNode && g[h].source.getNode() == c) {
						var i = Z.getEdgeDefinition(v(g[h].data));
						if (i && i.ignore === !0) continue;
						var j = aa(g[h]);
						j.doNotFireConnectionEvent = !0;
						var k = C.connect(j);
						null != k && (k.edge = g[h], Q[g[h].getId()] = k, U(j.type, g[h], k))
					}
				}
				this.relayout(), C.setSuspendDrawing(!1, !0), l.setSuspendGraph(!1)
			}, this.getContainer = function() {
				return q
			}, this.getContainerId = function() {
				return D
			}, this.getRenderedElement = function(a) {
				return ("Port" === a.objectType ? M : K)[a.getFullId()]
			}, this.getRenderedNode = function(a) {
				return K[a]
			}, this.getRenderedPort = function(a) {
				return M[a]
			}, this.getRenderedConnection = function(a) {
				return Q[a]
			}, this.setLayout = function(b, c) {
				if (b) {
					var d = C.extend({
						container: q,
						getElementForNode: function(a) {
							return K[a]
						}
					}, b);
					if (d.jsPlumbToolkit = l, d.adapter = i, !a.jsPlumbToolkit.Layouts[d.type]) throw "no such layout [" + d.type + "]";
					p = new a.jsPlumbToolkit.Layouts[d.type](d), c || i.refresh()
				}
			}, this.getLayout = function() {
				return p
			}, this.magnetize = function(a) {
				null != p && p.magnetize(a)
			}, this.refresh = function(a) {
				s || a && !t || (p ? p.layout(function() {
					window.setTimeout(C.repaintEverything, 0)
				}) : C.repaintEverything())
			}, this.setRefreshAutomatically = function(a) {
				t = a
			}, this.relayout = function(a) {
				s || (p ? p.relayout(a, function() {
					C.repaintEverything(), this.fire("relayout", this.getBoundsInfo())
				}.bind(this)) : C.repaintEverything())
			}, this.getPath = function(a) {
				var b = l.getPath(a);
				return b && (b.setVisible = function(a) {
					i.setVisible(b, a)
				}, b.addNodeClass = function(a) {
					b.eachNode(function(b, c) {
						C.addClass(K[c.id], a)
					})
				}, b.removeNodeClass = function(a) {
					b.eachNode(function(b, c) {
						C.removeClass(K[c.id], a)
					})
				}, b.addEdgeClass = function(a) {
					b.eachEdge(function(b, c) {
						Q[c.getId()].addClass(a)
					})
				}, b.removeEdgeClass = function(a) {
					b.eachEdge(function(b, c) {
						Q[c.getId()].removeClass(a)
					})
				}, b.addClass = function(a) {
					this.addNodeClass(a), this.addEdgeClass(a)
				}, b.removeClass = function(a) {
					this.removeNodeClass(a), this.removeEdgeClass(a)
				}), b
			}, this.getPosition = function(a) {
				var b = this.getLayout();
				if (b) {
					var c = ia(a).id;
					return b.getPosition(c)
				}
			}, this.getSize = function(a) {
				return C.getSize(ia(a).el)
			}, this.getCoordinates = function(a) {
				var b = this.getLayout();
				if (b) {
					var c = ia(a),
						d = b.getPosition(c.id),
						e = C.getSize(c.el);
					return {
						x: d[0],
						y: d[1],
						w: e[0],
						h: e[1]
					}
				}
			};
			var ea = {}, fa = {
				source: {},
				target: {}
			}, ga = function(a, b, c, f) {
				f = f || 0;
				var h, j = function(a, f, g, h) {
					var j = a.getAttribute("port-id"),
						k = a.getAttribute("port-type") || "default",
						l = a.getAttribute("scope") || C.getDefaultScope(),
						m = v(b),
						n = Z.getNodeDefinition(m),
						o = Z.getPortDefinition(j, n),
						p = Z.getPortDefinition(k, n),
						q = e.merge(p, o),
						r = null == q ? {} : d.populate(q, b.data),
						s = function(a) {
							return function(d) {
								var e = b.getPort(j),
									f = [{
										portId: j,
										nodeId: c,
										port: e,
										node: b,
										portType: k,
										endpoint: d.endpoint,
										anchor: d.anchor
									}];
								a.apply(a, f)
							}
						}, t = function(a) {
							return function(b) {
								var c = [{
									connection: b.connection || b,
									source: ia(b.source),
									target: ia(b.target),
									scope: b.scope
								}];
								return a.apply(a, c)
							}
						}, u = r.edgeType || "default",
						w = {
							paintStyle: "connectorStyle",
							hoverPaintStyle: "connectorHoverStyle",
							overlays: "connectorOverlays",
							endpointStyle: "paintStyle"
						}, x = Z.getEdgeDefinition(u);
					if (x) for (var y in x) {
						var z = w[y] || y;
						r[z] = x[y]
					}
					if (r.connectionType = u, r.portId = j, r.portType = k, r.scope = l, r.parameters = r.parameters || {}, r.parameters.portId = j, r.parameters.portType = k, r.parameters.scope = l, r.parameters.nodeId = c, r.events = {}, q.events) for (y in q.events) r.events[y] = s(q.events[y]);
					if (q.interceptors) for (y in q.interceptors) r[y] = t(q.interceptors[y]);
					return r.events.anchorChanged = function(a) {
						i.fire("anchorChanged", {
							portId: j,
							nodeId: c,
							portType: k,
							node: b,
							port: b.getPort(j),
							endpoint: a.endpoint,
							anchor: a.anchor
						})
					}, r
				};
				if (a.childNodes) {
					var k, m = [];
					for (h = 0; h < a.childNodes.length; h++) if (3 != a.childNodes[h].nodeType && 8 != a.childNodes[h].nodeType) {
						if (a.childNodes[h].tagName.toUpperCase() == g.PORT && null == a.childNodes[h].getAttribute("jtk-processed")) {
							k = j(a.childNodes[h], !0, !0);
							var n = C.addEndpoint(a, k);
							ea[c + "." + k.portId] = n;
							var p = b.addPort({
								id: k.portId
							});
							a.childNodes[h].setAttribute("jtk-processed", !0), n.graph = {
								node: b,
								port: p
							}, "undefined" != typeof Rotors && o.onUpdate(a, function(a, b) {})
						}
						if (a.childNodes[h].tagName.toUpperCase() == g.SOURCE && null == a.childNodes[h].getAttribute("jtk-processed")) {
							k = j(a.childNodes[h], !0, !1);
							var q = a.childNodes[h].getAttribute("filter");
							if (0 != f && (fa.source[c + "." + k.portId] = a, l.addPort(b, {
								id: k.portId
							}, !0)), q) {
								var r = a.childNodes[h].getAttribute("filter-exclude"),
									s = "true" === r;
								k.filter = q, k.filterExclude = s
							}
							C.makeSource(a, k), a.childNodes[h].setAttribute("jtk-processed", !0), "undefined" != typeof Rotors && o.onUpdate(a, function(a, b) {
								var c = jsPlumb.getSelector(a, "jtk-source");
								if (1 == c.length) {
									var d = j(c[0], !0, !1);
									d.scope && C.setSourceScope(a, d.scope)
								}
							})
						}
						a.childNodes[h].tagName.toUpperCase() == g.TARGET && null == a.childNodes[h].getAttribute("jtk-processed") && (k = j(a.childNodes[h], !1, !0), 0 != f && (fa.target[c + "." + k.portId] = a, l.addPort(b, {
							id: k.portId
						}, !0)), C.makeTarget(a, k), a.childNodes[h].setAttribute("jtk-processed", !0), "undefined" != typeof Rotors && o.onUpdate(a, function(a, b) {
							var c = jsPlumb.getSelector(a, "jtk-target");
							if (1 == c.length) {
								var d = j(c[0], !0, !1);
								d.scope && C.setTargetScope(a, d.scope)
							}
						})), ga(a.childNodes[h], b, c, f + 1)
					}
					for (h = 0; h < m.length; h++) m[h].parentNode.removeChild(m[h])
				}
			};
			this.setLayout(b.layout, !0), this.storePositionsInModel = function(a) {
				a = a || {};
				var b = a.leftAttribute || "left",
					c = a.topAttribute || "top",
					d = p.getPositions();
				for (var e in d) {
					var f = l.getNode(e);
					f.data[b] = d[e][0], f.data[c] = d[e][1]
				}
			}, this.storePositionInModel = function(a) {
				var b = "string" == typeof a ? a : a.id,
					c = "string" == typeof a ? "left" : a.leftAttribute || "left",
					d = "string" == typeof a ? "top" : a.topAttribute || "top",
					e = p.getPosition(b);
				return l.getNode(b).data[c] = e[0], l.getNode(b).data[d] = e[1], e
			};
			var ha = function(a, b, c, d, e, f, g) {
				return a = a || ia(b), a && (p.setPosition(a.id, c, d), e || (C.setAbsolutePosition(a.el, [c, d], f, g), C.revalidate(a.el))), a
			};
			this.setPosition = function(a, b, c, d) {
				return ha(null, a, b, c, d)
			}, this.animateToPosition = function(a, b, c, d) {
				var e = ia(a);
				if (e) {
					var f = p.getPosition(e.id);
					ha(e, a, b, c, !1, [f[0], f[1]], d)
				}
			}, this.setVisible = function(a, b, c) {
				if (null != a) {
					var d = function(a) {
						var d = R(a);
						d && d.setVisible(b), c || (d.endpoints[0].setVisible(b), d.endpoints[1].setVisible(b))
					}, e = function(a, e) {
						if (e && (e.style.display = b ? "block" : "none", !c)) for (var f = l.getAllEdgesFor(a), g = 0; g < f.length; g++) d(f[g])
					}, f = function(a) {
						var c = a.getFullId(),
							d = ea[c];
						d.setVisible(b)
					}, g = function(a) {
						var b = ia(a);
						switch (b.type) {
							case "Edge":
								d(b.obj);
								break;
							case "Node":
								e(b.obj, b.el);
								break;
							case "Port":
								f(b.obj)
						}
					};
					if (a.eachNode && a.eachEdge) a.eachNode(function(a, b) {
						g(b)
					}), a.eachEdge(function(a, b) {
						g(b)
					});
					else if (a.length && "string" != typeof a) for (var h = 0; h < a.length; h++) g(a[h]);
					else g(a)
				}
			};
			var ia = function(a) {
				return a instanceof C.getDefaultConnectionType() && (a = a.edge), l.getObjectInfo(a, function(a) {
					return a.getNode ? M[a.id] : K[a.id]
				})
			}, ja = {
				jsPlumb: C,
				toolkit: l,
				container: q,
				containerId: D,
				getConnectionsForEdges: S,
				getConnectionForEdge: R,
				getElement: function(a) {
					return K[a]
				},
				getNodeForElementId: function(a) {
					return L[a]
				},
				getObjectInfo: ia,
				nodeMap: K,
				reverseNodeMap: L
			};
			return ja
		};
	b.DOM = function(a) {
		q.apply(this, arguments), p.apply(this, arguments)
	}
}.call(this), 

function() {
	"use strict";
	var a = this,
		b = {
			webkit: {
				mac: function(a) {
					return a.deltaY / 120
				},
				win: function(a) {
					return a.deltaY / 100
				}
			},
			safari: function(a) {
				return a.wheelDeltaY / 120
			},
			firefox: {
				mac: function(a) {
					return -1 * a.deltaY * (1 == a.deltaMode ? 25 : 1) / 120
				},
				win: function(a) {
					return -1 * a.deltaY / 3
				}
			},
			ie: function(a) {
				return a.wheelDelta / 120
			},
			"default": function(a) {
				return a.deltaY || a.wheelDelta
			}
		}, c = /Mac/.test(navigator.userAgent) ? "mac" : "win",
		d = -1 != navigator.userAgent.indexOf("Firefox") ? "firefox" : /Safari/.test(navigator.userAgent) ? "safari" : /WebKit/.test(navigator.userAgent) ? "webkit" : /Trident/.test(navigator.userAgent) ? "ie" : "default",
		e = "function" == typeof b[d] ? b[d] : b[d][c],
		f = function(a) {
			return e(a || event)
		}, g = function(a, b) {
			return function(c) {
				b && null != c.mozInputSource && 1 !== c.mozInputSource || (c.normalizedWheelDelta = f(c), a(c))
			}
		}, h = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
	a.addWheelListener = function(a, b, c) {
		var d = g(b, c);
		a.addEventListener ? a.addEventListener(h, d, !1) : a.attachEvent && a.attachEvent("onmousewheel", d)
	}
}.call(this), 
function() {
	var a = this;
	a.PinchListener = function(a) {
		var b = "onpointerdown" in document.documentElement,
			c = "ontouchstart" in document.documentElement,
			d = [0, 0],
			e = 0,
			f = 0,
			g = function(b) {
				a[b](d, f, e, e / f)
			}, h = function() {
				a.onPinchEnd()
			}, i = "onPinchStart",
			j = "onPinch",
			k = "pointerdown",
			l = "pointermove",
			m = "pointerup",
			n = "touchstart",
			o = "touchmove",
			p = "touchend",
			q = function(a, b, c, d) {
				return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2))
			}, r = {
				pointer: function() {
					var b = {}, c = [],
						n = 0,
						o = !1,
						p = function() {
							2 == n && (d = [(c[1].p[0] + c[0].p[0]) / 2, (c[1].p[1] + c[0].p[1]) / 2], e = q(c[1].p[0], c[1].p[1], c[0].p[0], c[0].p[1]))
						}, r = function(a) {
							n >= 2 || o || (c[n] = {
								e: a,
								p: [a.pageX, a.pageY]
							}, b["" + a.pointerId] = n, n++, p(), 2 == n && (f = e, g(i)))
						}, s = function(a) {
							var c = b["" + a.pointerId];
							null != c && (delete b["" + a.pointerId], n--, o = 0 !== n, h())
						}, t = function(a) {
							if (!o && 2 == n) {
								var d = b[a.pointerId];
								null != d && (c[d].p = [a.pageX, a.pageY], p(), g(j))
							}
						};
					a.bind(a.el, k, r), a.bind(document, m, s), a.bind(document, l, t)
				},
				touch: function(a) {
					var b = function(a) {
						return a.touches || []
					}, c = function(a, b) {
						return a.item ? a.item(b) : a[b]
					}, k = function(a) {
						var b = c(a, 0),
							d = c(a, 1);
						return q(b.pageX, b.pageY, d.pageX, d.pageY)
					}, l = function(a) {
						var b = c(a, 0),
							d = c(a, 1);
						return [(b.pageX + d.pageX) / 2, (b.pageY + d.pageY) / 2]
					}, m = !1,
						r = function(c) {
							var h = b(c);
							2 == h.length && a.enableWheelZoom !== !1 && (d = l(h), e = f = k(h), m = !0, a.bind(document, o, t), a.bind(document, p, s), g(i))
						}, s = function(b) {
							m = !1, a.unbind(document, o, t), a.unbind(document, p, s), h()
						}, t = function(a) {
							if (m) {
								var c = b(a);
								2 == c.length && (e = k(c), d = l(c), g(j))
							}
						};
					a.bind(a.el, n, r)
				}
			};
		b ? r.pointer(a) : c && r.touch(a)
	}
}.call(this), 
function() {
	"use strict";
	this.ZoomWidget = function(b) {
		function e(a) {
			if (f()) return {
				w: 0,
				h: 0,
				x: 0,
				y: 0,
				vw: b.width(s),
				vh: b.height(s),
				padding: a,
				z: 1,
				zoom: 1
			};
			a = 0;
			var c = Math.abs(ia.maxx[0][0][0] + ia.maxx[0][1] - ia.minx[0][0][0]),
				d = Math.abs(ia.maxy[0][0][1] + ia.maxy[0][2] - ia.miny[0][0][1]),
				e = b.width(s),
				g = b.height(s),
				h = e / c,
				i = g / d,
				j = Math.min(h, i);
			return {
				w: c,
				h: d,
				x: ia.minx[0][0][0],
				y: ia.miny[0][0][1],
				vw: e,
				vh: g,
				padding: a,
				z: j,
				zoom: $
			}
		}
		function f() {
			for (var a in ja) return !1;
			return !0
		}
		b.events = b.events || {};
		var g, h, i, j, k, l, m = this,
			n = function() {}, o = b.canvas,
			p = b.domElement || function(a) {
				return a
			}, q = p(o),
			r = b.viewport,
			s = p(r),
			t = b.events.zoom || n,
			u = (b.events.maybeZoom || function() {
				return !0
			}, b.events.pan || n),
			v = b.events.mousedown || n,
			w = b.events.mouseup || n,
			x = b.events.mousemove || n,
			y = b.events.transformOrigin || n,
			z = !(b.clamp === !1),
			A = b.clampZoom !== !1,
			B = b.panDistance || 50,
			C = b.enablePan !== !1,
			D = b.enableWheelZoom !== !1,
			E = b.enableAnimation !== !1,
			F = b.wheelFilter || function() {
				return !0
			}, G = b.wheelSensitivity || 10,
			H = b.enablePanButtons !== !1,
			I = b.padding || [0, 0],
			J = b.consumeRightClick !== !1,
			K = b.smartMinimumZoom,
			L = !1,
			M = "mousedown",
			N = "mouseup",
			O = "mousemove",
			P = ["webkit", "Moz", "ms"],
			Q = b.bind,
			R = b.unbind,
			S = !(b.enabled === !1),
			T = b.clampToBackground,
			U = b.clampToBackgroundExtents,
			V = b.filter || function(a) {
				return !1
			}, W = b.width,
			X = b.height,
			Y = 0,
			Z = 0,
			$ = b.zoom || 1,
			_ = [0, 0],
			aa = !1,
			ba = !1,
			ca = !1,
			da = !1,
			ea = b.zoomRange || [.05, 3],
			fa = 150,
			ga = -1,
			ha = -1,
			ia = {
				minx: [],
				maxx: [],
				miny: [],
				maxy: []
			}, ja = {}, ka = {}, la = !1,
			ma = function() {
				ia.minx.sort(function(a, b) {
					return a[0][0] < b[0][0] ? -1 : 1
				}), ia.miny.sort(function(a, b) {
					return a[0][1] < b[0][1] ? -1 : 1
				}), ia.maxx.sort(function(a, b) {
					return a[0][0] + a[1] > b[0][0] + b[1] ? -1 : 1
				}), ia.maxy.sort(function(a, b) {
					return a[0][1] + a[2] > b[0][1] + b[2] ? -1 : 1
				})
			}, na = function(a, b, c, d) {
				null == ja[a] && (ja[a] = [], ia.minx.push(ja[a]), ia.miny.push(ja[a]), ia.maxx.push(ja[a]), ia.maxy.push(ja[a])), ja[a][0] = b, ja[a][1] = c, ja[a][2] = d, ja[a][3] = a, L ? la = !0 : ma()
			};
		this.setSuspendRendering = function(a) {
			L = a, !a && la && ma(), la = !1
		};
		var oa = function(a, b) {
			return function(c) {
				Na(q, a * B, b * B, null, !0, function(a) {
					u(a[0], a[1], $, $, c), g && g.pan(), Ya.pan()
				})
			}
		}, pa = 150,
			qa = 60,
			ra = 10,
			sa = null,
			ta = null,
			ua = null,
			va = function(a, c, d) {
				return function() {
					ua = d, b.addClass(ua, "jtk-surface-pan-active"), b.bind(document, "mouseup", wa), sa = window.setTimeout(function() {
						b.bind(document, N, ya), ta = window.setInterval(xa(a, c), qa)
					}, pa)
				}
			}, wa = function() {
				window.clearTimeout(sa), ua && b.removeClass(ua, "jtk-surface-pan-active"), ua = null
			}, xa = function(a, b) {
				return function(c) {
					var d = Na(q, a * ra, b * ra, null);
					u(d[0], d[1], $, $, c), g && g.pan(), Ya.pan()
				}
			}, ya = function() {
				window.clearTimeout(ta)
			}, za = function(a, c, d, e, f) {
				var g = document.createElement("div");
				g.innerHTML = f || "", g.style.position = "absolute";
				for (var h in c) g.style[h] = c[h];
				return g.className = "jtk-surface-pan jtk-surface-pan-" + a, s.appendChild(g), b.bind(g, "click", oa(d, e)), b.bind(g, "mousedown", va(d, e, g)), g
			};
		H && (za("top", {
			left: "0px",
			top: "0px"
		}, 0, -1, "&#8593;"), za("bottom", {
			left: "0px",
			bottom: "0px"
		}, 0, 1, "&#8595;"), za("left", {
			left: "0px",
			top: "0px"
		}, -1, 0, "&#8592;"), za("right", {
			right: "0px",
			top: "0px"
		}, 1, 0, "&#8594;"));
		var Aa = function(a, b, c) {
			c = c || q;
			for (var d = 0; d < P.length; d++) {
				var e = a.replace(/([a-z]){1}/, function(a) {
					return P[d] + a.toUpperCase()
				});
				c.style[e] = b
			}
			c.style[a] = b
		}, Ba = function(a) {
			Aa("transformOrigin", _[0] + "% " + _[1] + "%", a)
		}, Ca = function(a, c) {
			var d = Oa(),
				e = b.offset(s, !0),
				f = Ma(q),
				g = b.width(o),
				h = b.height(o),
				i = [(a - (e.left + f[0]) - d[0]) / $, (c - (e.top + f[1]) - d[1]) / $];
			return {
				w: g,
				h: h,
				xy: i,
				xScale: i[0] / g,
				yScale: i[1] / h,
				o: [i[0] / g * 100, i[1] / h * 100]
			}
		}, Da = function(a, b, c) {
			var d, e, f, g, h = Ca(a, b),
				i = _[0] / 100 * h.w,
				j = _[1] / 100 * h.h;
			d = -(i * (1 - $)), e = -(j * (1 - $)), _ = h.o, Ba(), i = _[0] / 100 * h.w, j = _[1] / 100 * h.h, f = -(i * (1 - $)), g = -(j * (1 - $));
			var k = Na(q, f - d, g - e, c);
			y && y(_, k)
		}, Ea = function(a) {
			var b = Fa(a);
			Da(b[0], b[1], a)
		}, Fa = this.pageLocation = function(a) {
			if (a.pageX) return [a.pageX, a.pageY];
			var b = Ga(Ha(a), 0);
			return b ? [b.pageX, b.pageY] : [0, 0]
		}, Ga = function(a, b) {
			return a.item ? a.item(b) : a[b]
		}, Ha = function(a) {
			return a.touches || []
		}, Ia = function(a, b, c, d, f) {
			if (!(null == a || isNaN(a) || 0 > a)) {
				var h = ea[0];
				if (K) {
					h = .5;
					var i = e().z,
						j = a / i;
					h > j && (a = i * h)
				} else h > a && (a = h);
				if (a > ea[1] && (a = ea[1]), d) {
					var k = a > $ ? .05 : -.05,
						l = $,
						m = $ > a,
						n = window.setInterval(function() {
							l = Ia(l + k), m && a >= l && window.clearInterval(n), !m && l >= a && window.clearInterval(n)
						});
					return $
				}
				Aa("transform", "scale(" + a + ")");
				var o = $;
				if ($ = a, f || t(Y, Z, $, o, b, c), null != g && g.setZoom(a), Ya && Ya.pan(), A) {
					var p = Ma(q),
						r = La(p[0], p[1]);
					(r[0] != p[0] || r[1] != p[1]) && Ma(q, r[0], r[1], null, null == d ? null : !d)
				}
				return $
			}
		}, Ja = function(a, b, c, d) {
			-fa > b && (b = -fa), b > fa && (b = fa), Ka(i, b, -fa, fa, c, d)
		}, Ka = function(a, b, c, d, e, f) {
			var g = b / (b >= 0 ? d : c),
				h = b >= 0 ? 1 : 0,
				i = a + g * (ea[h] - a);
			Ia(i, e, f)
		}, La = function(a, c, d) {
			if (z || T || U) {
				var f = Oa(),
					h = a,
					i = c,
					j = z ? e() : {
						x: 0,
						y: 0,
						w: 0,
						h: 0,
						vw: b.width(s),
						vh: b.height(s),
						padding: d,
						z: 1
					};
				if (d = (d || 20) * $, (T || U) && null != g) {
					var k = g.getWidth(),
						l = g.getHeight(),
						m = Math.max(j.x + j.w, k),
						n = Math.max(j.y + j.h, l);
					j.w = m - j.w, j.h = n - j.h;
					var o = j.vw / j.w,
						p = j.vh / j.h;
					j.z = Math.min(o, p), U && (d = Math.max(j.vw, j.vh))
				}
				var q = [j.x + j.w, j.y + j.h];
				g && (q[0] = Math.max(q[0], g.getWidth()), q[1] = Math.max(q[1], g.getHeight()));
				var r = a + f[0] + q[0] * $ - d,
					t = c + f[1] + q[1] * $ - d,
					u = a + f[0] + j.x * $ + d,
					v = c + f[1] + j.y * $ + d;
				return 0 > r && (h -= r), u > j.vw && (h -= u - j.vw), 0 > t && (i -= t), v > j.vh && (i -= v - j.vh), [h, i]
			}
			return [a, c]
		}, Ma = function(a, c, d, e, f, g, h) {
			if (1 == arguments.length) return [parseInt(a.style.left, 10) || 0, parseInt(a.style.top, 10) || 0];
			var i = La(c, d);
			return E && !f && b.animate ? b.animate(a, {
				left: i[0],
				top: i[1]
			}, {
				step: h,
				complete: function() {
					g && g(i)
				}
			}) : (a.style.left = i[0] + "px", a.style.top = i[1] + "px", g && g(i)), i
		};
		q.style.left = "0px", q.style.top = "0px";
		var Na = function(a, b, c, d, e, f) {
			var g = Ma(a);
			return Ma(a, g[0] + b, g[1] + c, d, !e, f)
		}, Oa = function() {
			var a = b.width(o),
				c = b.height(o),
				d = _[0] / 100 * a,
				e = _[1] / 100 * c;
			return [d * (1 - $), e * (1 - $)]
		}, Pa = {
			start: function(a, c) {
				if (!ba) {
					var d = a.srcElement || a.target;
					S && (d == q || d == s || d._jtkDecoration || g && g.owns(d) || V(d, a) === !0) && (da = !1, ga = -1, ha = -1, 3 !== a.which || b.enableWheelZoom === !1 || null != a.mozInputSource && 1 !== a.mozInputSource ? c.length <= 1 && (aa = !0, h = Fa(a), l = Ma(q)) : (ca = !0, h = Fa(a), Ea(a), l = Ma(q), i = $)), v(a, m)
				}
			},
			move: function(a, b) {
				var c, d, e;
				if (da = !1, !ba) {
					if (ca) e = Fa(a), c = e[0] - h[0], d = e[1] - h[1], Ja(c, d, a);
					else if (aa && C && null != h) {
						e = Fa(a), c = e[0] - h[0], d = e[1] - h[1];
						var f = Ma(q, l[0] + c, l[1] + d, a, !0);
						u(f[0], f[1], $, $, a), g && g.pan(), Ya && Ya.pan()
					}
					x(a, m)
				}
			},
			end: function(a, b) {
				ba || (ca = !1, h = null, aa = !1, da = !1, R(document, O, Ra), R(document, N, Sa), Q(document, O, Ta), w(a, m))
			},
			contextmenu: function(a) {}
		}, Qa = function(a, b) {
			("contextmenu" !== a || J) && b.preventDefault && b.preventDefault();
			var c = Ha(b);
			Pa[a](b, c)
		}, Ra = function(a) {
			Qa("move", a)
		}, Sa = function(a) {
			Qa("end", a)
		}, Ta = function(a) {
			da = !1
		};
		Q(document, O, Ta);
		var Ua = this.start = function(a) {
			S && null != a && (R(document, O, Ta), Q(document, O, Ra), Q(document, N, Sa), Pa.start(a, Ha(a)))
		};
		if (Q(r, M, Ua), Q(r, "contextmenu", function(a) {
			Qa("contextmenu", a)
		}), D) {
			var Va = function(a) {
				F(a) && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), i = $, da || (Ea(a), da = !0), Ja(0, a.normalizedWheelDelta * G, a, !0))
			};
			addWheelListener(s, Va, !0)
		}
		new PinchListener({
			el: r,
			bind: Q,
			unbind: R,
			enableWheelZoom: b.enableWheelZoom,
			onPinch: function(a, b, c, d) {
				Ia(d * i);
				var e = a[0] - h[0],
					f = a[1] - h[1];
				Ma(q, l[0] + e, l[1] + f, null, !0)
			},
			onPinchStart: function(a, b) {
				ba = !0, h = a, j = k = b, i = $, Da(h[0], h[1]), l = Ma(q)
			},
			onPinchEnd: function() {
				ba = !1, h = null
			}
		}), Ia($, null, !1, !1, !0), Ba(), this.positionChanged = function(a, c, d) {
			d = d || b.id(a);
			var e = c || Ma(a),
				f = b.width(a),
				g = b.height(a);
			ka[d] = a, na(d, e, f, g)
		}, this.add = function(a, b, c, d) {
			this.positionChanged(a, c, b), d && (Q(a, M, Ua), a._jtkDecoration = !0)
		}, this.remove = function(a) {
			a = p(a);
			var c = b.id(a);
			delete ja[c], delete ka[c];
			for (var d in ia) if (ia.hasOwnProperty(d)) {
				for (var e = -1, f = 0; f < ia[d].length; f++) if (ia[d][f][3] === c) {
					e = f;
					break
				} - 1 != e && ia[d].splice(e, 1)
			}
		}, this.reset = function() {
			ia.minx.length = 0, ia.miny.length = 0, ia.maxx.length = 0, ia.maxy.length = 0, ja = {}, ka = {}, Ma(q, 0, 0, null, !0)
		}, this.getBoundsInfo = e, this.zoomToFit = function(a) {
			a = a || {};
			var b = e(a.padding);
			a.doNotZoomIfVisible && b.z > $ || Ia(b.z), m.centerContent({
				bounds: b,
				doNotAnimate: a.doNotAnimate !== !1,
				onComplete: a.onComplete,
				onStep: a.onStep,
				doNotFirePanEvent: a.doNotFirePanEvent
			})
		}, this.zoomToFitIfNecessary = function(a) {
			var b = jsPlumb.extend(a || {});
			b.doNotZoomIfVisible = !0, this.zoomToFit(b)
		}, this.zoomToBackground = function(a) {
			if (a = a || {}, null != g) {
				var b = g.getWidth(),
					c = g.getHeight(),
					d = W(s),
					e = X(s),
					f = d / b,
					h = e / c,
					i = Math.min(f, h),
					j = {
						w: b,
						h: c,
						x: 0,
						y: 0,
						vw: d,
						vh: e,
						padding: 0,
						z: i
					};
				Ia(j.z), m.centerContent({
					bounds: j,
					doNotAnimate: a.doNotAnimate,
					onComplete: a.onComplete,
					onStep: a.onStep
				})
			}
		}, this.setFilter = function(a) {
			V = a || function(a) {
				return !1
			}
		}, this.centerBackground = function() {
			if (null != g) {
				var a = jsPlumb.extend({}, e());
				a.x = g.getWidth() / 2, a.y = g.getHeight() / 2, a.w = 1, a.h = 1, m.centerContent({
					bounds: a,
					doNotAnimate: b.doNotAnimate,
					onComplete: b.onComplete,
					onStep: b.onStep,
					vertical: !0,
					horizontal: !0
				})
			}
		}, this.alignBackground = function(a) {
			if (null != g) {
				var b = a.split(" "),
					c = b[0] || "left",
					d = b[1] || "top",
					f = e(),
					h = "left" === c ? 0 : f.vw - g.getWidth() * $,
					i = "top" === d ? 0 : f.vh - g.getHeight() * $,
					j = Oa();
				Ma(q, h - j[0], i - j[1]), g.pan(), Ya && Ya.pan()
			}
		}, this.positionElementAt = function(a, c, d, e, f, g) {
			e = e || 0, f = f || 0;
			var h = Oa(),
				i = Ma(q),
				j = p(a),
				k = j.parentNode,
				l = b.offset(k),
				m = b.offset(r),
				n = m.left - l.left + (i[0] + h[0]) + c * $ + e,
				o = m.top - l.top + (i[1] + h[1]) + d * $ + f;
			g && 0 > n && (n = 0), g && 0 > o && (o = 0), j.style.left = n + "px", j.style.top = o + "px"
		}, this.positionElementAtPageLocation = function(a, b, c, d, e) {
			var f = this.mapLocation(b, c);
			this.positionElementAt(a, f.left, f.top, d, e)
		}, this.positionElementAtEventLocation = function(a, b, c, d) {
			var e = this.mapEventLocation(b);
			this.positionElementAt(a, e.left, e.top, c, d)
		}, this.zoomToEvent = function(a, b) {
			Ea(a), Ia($ + b, a)
		}, this.relayout = function(a) {
			if (b.enablePan === !1) {
				Ma(q, -a.x + I[0], -a.y + I[1]);
				var c = a.w + (a.x < 0 ? a.x : 0) + I[0],
					d = a.h + (a.y < 0 ? a.y : 0) + I[1];
				q.style.width = c + "px", q.style.height = d + "px";
				var e = 0 == c ? 0 : (a.x - I[0]) / c * 100,
					f = 0 == d ? 0 : (a.y - I[1]) / d * 100;
				this.setTransformOrigin(e, f)
			}
		}, this.nudgeZoom = function(a, c) {
			var d = b.offset(s, !0),
				e = d.left + b.width(s) / 2,
				f = d.top + b.height(s) / 2;
			return Da(e, f), Ia($ + a, c)
		}, this.nudgeWheelZoom = function(a, b) {
			i = $, Ja(0, a, b, !0)
		}, this.centerContent = function(a) {
			a = a || {};
			var b = a.bounds || e(),
				c = Oa(),
				d = b.x * $ + b.w * $ / 2,
				f = b.y * $ + b.h * $ / 2,
				h = b.vw / 2 - d,
				i = b.vh / 2 - f,
				j = Ma(q);
			Ma(q, a.horizontal !== !1 ? h - c[0] : j[0], a.vertical !== !1 ? i - c[1] : j[1], null, a.doNotAnimate, function() {
				a.doNotFirePanEvent || u(a.horizontal !== !1 ? h - j[0] : 0, a.vertical !== !1 ? i - j[1] : 0, $, $), g && g.pan(), Ya && Ya.pan(), a.onComplete && a.onComplete()
			}, a.onStep)
		}, this.centerContentHorizontally = function(a) {
			this.centerContent(jsPlumb.extend({
				horizontal: !0
			}, a))
		}, this.centerContentVertically = function(a) {
			this.centerContent(jsPlumb.extend({
				vertical: !0
			}, a))
		}, this.centerOn = function(a, c, d) {
			var f = jsPlumb.extend({}, e()),
				g = Ma(a),
				h = W(a),
				i = X(a);
			f.x = g[0], f.y = g[1], f.w = h, f.h = i, this.centerContent({
				bounds: f,
				doNotAnimate: b.doNotAnimate,
				onComplete: b.onComplete,
				onStep: b.onStep,
				vertical: d !== !1,
				horizontal: c !== !1
			})
		}, this.centerOnHorizontally = function(a) {
			this.centerOn(a, !0, !1)
		}, this.centerOnVertically = function(a) {
			this.centerOn(a, !1, !0)
		}, this.getViewportCenter = function() {
			var a = jsPlumb.extend({}, e()),
				b = Oa(),
				c = Ma(q),
				d = [a.vw / 2, a.vh / 2];
			return [(d[0] - (c[0] + b[0])) / $, (d[1] - (c[1] + b[1])) / $]
		}, this.setViewportCenter = function(a) {
			var b = jsPlumb.extend({}, e()),
				c = Oa(),
				d = [b.vw / 2, b.vh / 2],
				f = [c[0] + ($ * a[0] + d[0]), c[1] + ($ * a[1] + d[1])];
			Ma(q, f[0], f[1])
		}, this.setClamping = function(a) {
			z = a
		}, this.setZoom = function(a, b, c) {
			return Ia(a, null, null, b, c)
		}, this.setZoomRange = function(a, b) {
			return null != a && 2 == a.length && a[0] < a[1] && null != a[0] && null != a[1] && a[0] > 0 && a[1] > 0 && (ea = a, b || ($ < ea[0] || $ > ea[1]) && Ia($)), this
		}, this.getZoomRange = function() {
			return ea
		}, this.getZoom = function() {
			return $
		}, this.getPan = function() {
			return Ma(q)
		}, this.pan = function(a, b, c) {
			Na(q, a, b, null, c, function(a) {
				u(a[0], a[1], $, $), g && g.pan(), Ya && Ya.pan()
			})
		}, this.setPan = function(a, b, c, d, e) {
			return Ma(q, a, b, null, !c, d, e)
		}, this.setTransformOrigin = function(a, b) {
			_ = [a, b], Ba()
		}, this.mapLocation = function(a, c, d) {
			var e = Oa(),
				f = Ma(q),
				g = s.scrollLeft,
				h = s.scrollTop,
				i = d ? {
					left: 0,
					top: 0
				} : b.offset(s);
			return {
				left: (a - (f[0] + e[0]) - i.left + g) / $,
				top: (c - (f[1] + e[1]) - i.top + h) / $
			}
		}, this.mapEventLocation = function(a, b) {
			var c = Fa(a);
			return this.mapLocation(c[0], c[1], b)
		}, this.setEnabled = function(a) {
			S = a
		}, this.showElementAt = function(a, c, d) {
			var e = p(a),
				f = e.parentNode,
				g = b.offset(f),
				h = b.offset(r),
				i = Oa(),
				j = g.left - h.left + i[0] + c,
				k = g.top - h.top + i[1] + d;
			b.offset(a, {
				left: j,
				top: k
			})
		}, this.getApparentCanvasLocation = function() {
			var a = Oa(),
				b = Ma(q);
			return [b[0] + a[0], b[1] + a[1]]
		}, this.setApparentCanvasLocation = function(a, b) {
			var c = Oa(),
				d = Ma(q, a - c[0], b - c[1], null, !0);
			return g && g.pan(), Ya && Ya.pan(), d
		}, this.applyZoomToElement = function(a, b) {
			b = b || $, Aa("transform", "scale(" + b + ")", a)
		}, this.setTransformOriginForElement = function(a, b) {
			Aa("transformOrigin", b[0] + " " + b[1], a)
		}, this.getTransformOrigin = function() {
			return _
		}, this.floatElement = function(a, b) {
			null != a && (a.style.position = "absolute", a.style.left = b[0] + "px", a.style.top = b[1] + "px", s.appendChild(a))
		};
		var Wa = {}, Xa = function(a) {
			var b = m.getApparentCanvasLocation();
			for (var c in Wa) if (Wa.hasOwnProperty(c)) {
				if (null != a && a != c) continue;
				var d = Wa[c],
					e = function(a, c) {
						d[a] && (b[c] / $ + d.pos[c] < 0 ? d.el.style[a] = -(b[c] / $) + "px" : d.el.style[a] = d.pos[c] + "px")
					};
				e("left", 0), e("top", 1)
			}
		}, Ya = {
			pan: Xa
		};
		this.fixElement = function(a, c, d) {
			if (null != a) {
				var e = b.id(a);
				Wa[e] = {
					el: a,
					left: c.left,
					top: c.top,
					pos: d
				}, a.style.position = "absolute", a.style.left = d[0] + "px", a.style.top = d[1] + "px", q.appendChild(a), Xa(e)
			}
		}, this.findIntersectingNodes = function(a, c, d, e) {
			var f = this.getApparentCanvasLocation(),
				g = b.offset(s),
				h = s.scrollLeft,
				i = s.scrollTop,
				j = [],
				k = {
					x: a[0],
					y: a[1],
					w: c[0],
					h: c[1]
				}, l = d ? Biltong.encloses : Biltong.intersects,
				m = [g.left + f[0] - h, g.top + f[1] - i];
			for (var n in ja) {
				var o = ja[n],
					p = {
						x: m[0] + o[0][0] * $,
						y: m[1] + o[0][1] * $,
						w: o[1] * $,
						h: o[2] * $
					};
				l(k, p) && (null == e || e(n, ka[n], p)) && j.push({
					id: n,
					el: ka[n],
					r: p
				})
			}
			return j
		}, this.findNearbyNodes = function(a, b, c, d) {
			var e = [];
			if (!c || this.isInViewport(a[0], a[1])) {
				e = this.findIntersectingNodes([a[0] - b, a[1] - b], [2 * b, 2 * b], !1, d);
				var f = this.mapLocation(a[0], a[1]);
				e.sort(function(a, b) {
					var c = [a.x + a.w / 2, a.y + a.h / 2],
						d = [b.x + b.w / 2, b.y + b.h / 2],
						e = Biltong.lineLength(f, c),
						g = Biltong.lineLength(f, d);
					return g > e ? -1 : e > g ? 1 : 0
				})
			}
			return e
		}, this.isInViewport = function(a, c) {
			var d = b.offset(s),
				e = b.width(s),
				f = b.height(s);
			return d.left <= a && a <= d.left + e && d.top <= c && c <= d.top + f
		}, this.getElementPositions = function() {
			return ja
		}, this.setFilter = function(a) {
			V = a || function(a) {
				return !1
			}
		}, this.setWheelFilter = function(a) {
			F = a || function(a) {
				return !0
			}
		}, this.setBackground = function(b) {
			var e = b.type || "simple",
				f = {
					simple: a,
					tiled: "absolute" == b.tiling ? d : c
				};
			g = new f[e]({
				canvas: q,
				viewport: s,
				getWidth: W,
				getHeight: X,
				url: b.url,
				zoomWidget: m,
				onBackgroundReady: b.onBackgroundReady,
				options: b,
				img: b.img,
				resolver: b.resolver
			})
		}, b.background && this.setBackground(b.background), this.getBackground = function() {
			return g
		}
	};
	var a = function(a) {
		var b = a.canvas,
			c = a.onBackgroundReady || function() {}, d = new Image;
		d.onload = function() {
			b.style.backgroundImage = "url('" + d.src + "')", b.style.backgroundRepeat = "no-repeat", b.style.width = d.width + "px", b.style.height = d.height + "px", c(this)
		}, d.src = a.img ? a.img.src : a.url, this.owns = function(a) {
			return a == b
		}, this.getWidth = function() {
			return d.width || 0
		}, this.getHeight = function() {
			return d.height || 0
		}, this.setZoom = this.pan = function(a) {}
	}, b = function(a) {
		var b = this,
			c = a.canvas,
			d = a.viewport;
		if (null == a.options.maxZoom) throw new TypeError("Parameter `maxZoom` not set; cannot initialize TiledBackground");
		if (!a.options.tileSize) throw new TypeError("Parameter `tileSize not set; cannot initialize TiledBackground. It should be an array of [x,y] values.");
		if (!a.options.width || !a.options.height) throw new TypeError("Parameters `width` and `height` must be set");
		for (var e = function(c) {
			var d = document.createElement("div");
			d.style.position = "relative", d.style.height = "100%", d.style.width = "100%", d.style.display = "none", a.canvas.appendChild(d), this.zoom = c;
			var e = b.getTileSpecs(c),
				f = [],
				g = function(b, c, d) {
					return a.url.replace("{z}", b).replace("{x}", c).replace("{y}", d)
				}, h = function(b, c, d) {
					return null == a.resolver ? g(b, c, d) : a.resolver(b, c, d)
				};
			this.apparentZoom = Math.min(e[2], e[3]), this.setActive = function(a) {
				d.style.display = a ? "block" : "none"
			}, this.xTiles = e[0], this.yTiles = e[1];
			for (var i = 0; i < this.xTiles; i++) {
				f[i] = f[i] || [];
				for (var j = 0; j < this.yTiles; j++) {
					var k = document.createElement("img");
					k._tiledBg = !0, k.className = "jtk-surface-tile", k.ondragstart = function() {
						return !1
					}, d.appendChild(k), k.style.position = "absolute", k.style.opacity = 0, f[i][j] = [k, new Image, !1]
				}
			}
			var l = Math.pow(2, a.options.maxZoom - c) * a.options.tileSize[0];
			this.scaledImageSize = l;
			var m = function(a, b, d, e) {
				a.style.left = d * l + "px", a.style.top = e * l + "px", a.style.width = l + "px", a.style.height = l + "px", b.onload = function() {
					a.setAttribute("src", b.src), a.style.opacity = 1
				}, b.src = h(c, d, e)
			};
			this.ensureLoaded = function(a, b, c, d) {
				for (var e = a; c >= e; e++) for (var g = b; d >= g; g++) null != f[e] && null != f[e][g] && (f[e][g][2] || (m(f[e][g][0], f[e][g][1], e, g), f[e][g][2] = !0))
			}
		}.bind(this), f = [], g = null, h = 0; h <= a.options.maxZoom; h++) f.push(new e(h));
		c.style.width = a.options.width + "px", c.style.height = a.options.height + "px";
		var i, j = function() {
			if (i <= f[0].apparentZoom) return 0;
			if (i >= f[f.length - 1].apparentZoom) return f.length - 1;
			for (var a = f.length - 1; a > 0; a--) if (f[a].apparentZoom >= i && i >= f[a - 1].apparentZoom) return a
		}, k = function(a) {
			var b = f[a];
			null != g && g != b && g.setActive(!1), b.setActive(!0), g = b
		}, l = function() {
			var b = a.zoomWidget.getApparentCanvasLocation(),
				c = a.getWidth(d),
				e = a.getHeight(d),
				f = g.scaledImageSize * i,
				h = g.scaledImageSize * i,
				j = b[0] < 0 ? Math.floor(-b[0] / f) : b[0] < c ? 0 : null,
				k = b[1] < 0 ? Math.floor(-b[1] / h) : b[1] < e ? 0 : null,
				l = Math.min(g.xTiles, Math.floor((c - b[0]) / f)),
				m = Math.min(g.yTiles, Math.floor((e - b[1]) / h));
			null != j && null != k && g.ensureLoaded(j, k, l, m)
		};
		this.getCurrentLayer = function() {
			return g
		}, this.getWidth = function() {
			return a.options.width
		}, this.getHeight = function() {
			return a.options.height
		};
		var m = a.options.panDebounceTimeout || 50,
			n = a.options.zoomDebounceTimeout || 120,
			o = function(a, b) {
				b = b || 150;
				var c = null;
				return function() {
					window.clearTimeout(c), c = window.setTimeout(a, b)
				}
			}, p = function() {
				k(j()), l()
			}, q = o(p, n),
			r = o(l, m);
		this.setZoom = function(a, b) {
			i = a, b ? p() : q()
		}, this.pan = r, this.owns = function(a) {
			return a == c || 1 == a._tiledBg
		}, this.setZoom(a.zoomWidget.getZoom(), !0), null != a.onBackgroundReady && setTimeout(a.onBackgroundReady, 0)
	}, c = function(a) {
		var c = a.options.width,
			d = a.options.height,
			e = a.options.tileSize;
		this.getTileSpecs = function(a) {
			var b = c > d ? 1 : c / d,
				f = d > c ? 1 : d / c,
				g = Math.pow(2, a + 1) * e[0] * b,
				h = Math.pow(2, a + 1) * e[1] * f,
				i = Math.ceil(g / e[0]),
				j = Math.ceil(h / e[1]);
			return [i, j, g / c, h / d]
		}, b.apply(this, arguments)
	}, d = function(a) {
		var c = a.options.maxZoom,
			d = a.options.width,
			e = a.options.height,
			f = a.options.tileSize;
		this.getTileSpecs = function(a) {
			var b = Math.pow(2, c - a),
				g = Math.ceil(d / b / f[0]),
				h = Math.ceil(e / b / f[1]);
			return [g, h, g * f[0] / d, h * f[1] / e]
		}, b.apply(this, arguments)
	}
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkit,
		c = b.Renderers,
		d = a.jsPlumb,
		e = a.jsPlumbUtil,
		f = jsPlumb.getSelector,
		g = jsPlumbToolkit.Classes,
		h = jsPlumbToolkit.Constants,
		i = jsPlumbToolkit.Events;
	c.Surface = function(a) {
		var j = this;
		c.Surface.SELECT = h.select, c.Surface.PAN = h.pan, c.Surface.DISABLED = h.disabled;
		var k = c.AbstractRenderer.apply(this, arguments);
		c.DOMElementAdapter.apply(this, arguments), this.getObjectInfo = k.getObjectInfo, a = a || {};
		var l, m = d.getElement(a.container),
			n = c.createElement({
				position: h.relative,
				width: h.nominalSize,
				height: h.nominalSize,
				left: 0,
				top: 0,
				clazz: g.SURFACE_CANVAS
			}, m),
			o = !(a.elementsDraggable === !1),
			p = a.dragOptions || {}, q = a.stateHandle,
			r = a.storePositionsInModel !== !1,
			s = a.modelLeftAttribute,
			t = a.modelTopAttribute,
			u = new ZoomWidget({
				viewport: m,
				canvas: n,
				domElement: k.jsPlumb.getElement,
				addClass: k.jsPlumb.addClass,
				removeClass: k.jsPlumb.removeClass,
				offset: this.getOffset,
				consumeRightClick: a.consumeRightClick,
				bind: function() {
					k.jsPlumb.on.apply(k.jsPlumb, arguments)
				},
				unbind: function() {
					k.jsPlumb.off.apply(k.jsPlumb, arguments)
				},
				width: function(a) {
					return k.jsPlumb.getWidth(k.jsPlumb.getElement(a))
				},
				height: function(a) {
					return k.jsPlumb.getHeight(k.jsPlumb.getElement(a))
				},
				id: k.jsPlumb.getId,
				animate: function() {
					k.jsPlumb.animate.apply(k.jsPlumb, arguments)
				},
				dragEvents: {
					stop: jsPlumb.dragEvents[h.stop],
					start: jsPlumb.dragEvents[h.start],
					drag: jsPlumb.dragEvents[h.drag]
				},
				background: a.background,
				padding: a.padding,
				panDistance: a.panDistance,
				enablePan: a.enablePan,
				enableWheelZoom: a.enableWheelZoom,
				wheelSensitivity: a.wheelSensitivity,
				enablePanButtons: a.enablePanButtons,
				enableAnimation: a.enableAnimation,
				clamp: a.clamp,
				clampZoom: a.clampZoom,
				clampToBackground: a.clampToBackground,
				clampToBackgroundExtents: a.clampToBackgroundExtents,
				zoom: a.zoom,
				zoomRange: a.zoomRange,
				extend: k.jsPlumb.extend,
				events: {
					pan: function(a, b, c, d, e) {
						j.fire(i.pan, {
							x: a,
							y: b,
							zoom: c,
							oldZoom: d,
							event: e
						})
					},
					zoom: function(a, b, c, d, e) {
						k.jsPlumb.setZoom(c), j.fire(i.zoom, {
							x: a,
							y: b,
							zoom: c,
							oldZoom: d,
							event: e
						})
					},
					mousedown: function() {
						jsPlumb.addClass(m, g.SURFACE_PANNING)
					},
					mouseup: function() {
						jsPlumb.removeClass(m, g.SURFACE_PANNING)
					}
				}
			}),
			v = [],
			w = a.autoExitSelectMode !== !1,
			x = new b.Widgets.Lasso({
				on: function() {
					k.jsPlumb.on.apply(k.jsPlumb, arguments)
				},
				off: function() {
					k.jsPlumb.off.apply(k.jsPlumb, arguments)
				},
				pageLocation: u.pageLocation,
				canvas: m,
				onStart: function() {
					j.setHoverSuspended(!0), v.length = 0
				},
				onSelect: function(a, b, c, d) {
					var e = [],
						f = u.findIntersectingNodes(a, b, !c[0]);
					k.jsPlumb.clearDragSelection && k.jsPlumb.clearDragSelection(), k.toolkit.clearSelection(), d && v.length > 0 && k.toolkit.deselect(v);
					for (var g = 0; g < f.length; g++) e.push(f[g].el.jtk.node), k.jsPlumb.addToDragSelection && k.jsPlumb.addToDragSelection(f[g].el);
					v = e, k.toolkit.addToSelection(e, d)
				},
				onEnd: function() {
					j.setHoverSuspended(!1), w && j.setMode(h.pan)
				},
				filter: a.lassoFilter
			}),
			y = {
				pan: function() {
					x.setEnabled(!1), u.setEnabled(!0)
				},
				select: function() {
					k.jsPlumb.clearDragSelection && k.jsPlumb.clearDragSelection(), x.setEnabled(!0), u.setEnabled(!1)
				},
				disabled: function() {
					k.jsPlumb.clearDragSelection && k.jsPlumb.clearDragSelection(), x.setEnabled(!0), u.setEnabled(!1)
				}
			}, z = a.mode || h.pan;
		j.bind(i.relayout, function(a) {
			u.relayout(a)
		}), j.bind(i.nodeRemoved, function(a) {
			u.remove(a.el)
		}), k.toolkit.bind(i.graphCleared, function() {
			u.reset()
		}), k.toolkit.bind(i.dataLoadStart, function() {
			u.setSuspendRendering(!0)
		}), k.toolkit.bind(i.dataLoadEnd, function() {
			u.setSuspendRendering(!1), l && l.setVisible(!0), a.zoomToFit && j.zoomToFit()
		}), k.jsPlumb.setContainer(n), jsPlumb.addClass(m, g.SURFACE), a.enablePan === !1 && jsPlumb.addClass(m, g.SURFACE_NO_PAN);
		var A = function(a, b) {
			var c = function(a) {
				var c = a.srcElement || a.target;
				(c == m || c == n) && j.fire(b, a)
			};
			k.jsPlumb.on(n, a, c), k.jsPlumb.on(m, a, c)
		};
		A(i.tap, i.canvasClick), A(i.dblclick, i.canvasDblClick);
		var B = null;
		k.makeDraggable = function(a, b) {
			if (o) {
				var c = d.getElement(a),
					f = k.jsPlumb.getId(c),
					l = k.jsPlumb.extend({}, p),
					n = d.dragEvents[h.stop],
					q = d.dragEvents[h.start],
					v = function(a) {
						var b = d.getDragObject(a),
							c = d.getElement(b);
						return {
							node: c.jtk.node,
							el: b
						}
					};
				null != b && k.jsPlumb.extend(l, b), l[q] = e.wrap(l[q], function() {
					B = u.getBoundsInfo();
					var a = v(arguments);
					a.elementId = f, a.pos = jsPlumb.getAbsolutePosition(c), a.domEl = c, jsPlumb.addClass(m, g.SURFACE_ELEMENT_DRAGGING), j.fire(i.nodeMoveStart, a)
				}), l[n] = e.wrap(l[n], function(a) {
					for (var b = function(a) {
						u.positionChanged(a[0]), jsPlumb.removeClass(m, g.SURFACE_ELEMENT_DRAGGING);
						var b = {
							el: a[0],
							node: a[0].jtk.node,
							pos: [a[1].left, a[1].top]
						};
						j.getLayout().setPosition(b.node.id, b.pos[0], b.pos[1], !0), r !== !1 && (j.storePositionInModel({
							id: b.node.id,
							leftAttribute: s,
							topAttribute: t
						}), k.toolkit.fire("nodeUpdated", {
							node: b.node
						}, null)), j.fire(i.nodeMoveEnd, b)
					}, c = 0; c < a.selection.length; c++) b(a.selection[c])
				}), l.canDrag = function() {
					return !x.isActive()
				}, l.force = !0, k.jsPlumb.draggable(c, l, !1, k.jsPlumb)
			}
		}, k.doImport = function(b) {
			a.jsPlumbInstance.setContainer(n);
			var c = a.jsPlumbInstance.getManagedElements();
			for (var d in c) {
				var e = c[d].el;
				C(e, d)
			}
		};
		var C = this.importNode = function(b, c) {
			var d = a.jsPlumbInstance.getOffset(b),
				e = a.jsPlumbInstance.getId(b);
			b.style.left = d.left + h.px, b.style.top = d.top + h.px, jsPlumb.addClass(b, g.NODE), u.add(b, e, [d.left, d.top], !1), jsPlumb.isAlreadyDraggable(b) && k.makeDraggable(b), k.nodeMap[c] = b, k.reverseNodeMap[e] = b.jtk.node
		};
		this.zoomToFit = u.zoomToFit, this.zoomToFitIfNecessary = u.zoomToFitIfNecessary, this.zoomToBackground = u.zoomToBackground, this.centerOn = function(a, b, c) {
			var d = this.getObjectInfo(a);
			d && d.el && u.centerOn(d.el, b, c)
		}, this.centerOnHorizontally = function(a) {
			this.centerOn(a, !0, !1)
		}, this.centerOnVertically = function(a) {
			this.centerOn(a, !1, !0)
		}, this.centerContent = u.centerContent, this.centerContentHorizontally = u.centerContentHorizontally, this.centerContentVertically = u.centerContentVertically, this.getViewportCenter = u.getViewportCenter, this.setViewportCenter = u.setViewportCenter, this.setStateHandle = function(a) {
			q = a
		}, this.getStateHandle = function() {
			return q
		}, this.getApparentCanvasLocation = u.getApparentCanvasLocation, this.setApparentCanvasLocation = u.setApparentCanvasLocation, this.getBoundsInfo = u.getBoundsInfo, this.setZoom = u.setZoom, this.setZoomRange = u.setZoomRange, this.getZoomRange = u.getZoomRange, this.getZoom = u.getZoom, this.nudgeZoom = u.nudgeZoom, this.nudgeWheelZoom = u.nudgeWheelZoom, this.pageLocation = u.pageLocation, this.getPan = u.getPan, this.pan = u.pan, this.setPan = u.setPan, this.setPanAndZoom = function(a, b, c, d) {
			this.setPan(a, b, !d), this.setZoom(c, !d)
		}, this.setPanFilter = function(a) {
			u.setFilter(a ? function(b, c) {
				return "function" == typeof a ? a.apply(a, [c]) : e.matchesSelector(b, a)
			} : null)
		}, this.setWheelFilter = function(a) {
			u.setWheelFilter(function(b) {
				if (a) {
					var c = b.srcElement || b.target;
					return !e.matchesSelector(c, a)
				}
				return !0
			})
		}, this.setWheelFilter(a.wheelFilter), this.setPanFilter(a.panFilter), this.mapLocation = u.mapLocation, this.mapEventLocation = u.mapEventLocation, this.findNearbyNodes = u.findNearbyNodes, this.findIntersectingNodes = u.findIntersectingNodes, this.isInViewport = u.isInViewport, this.positionElementAt = u.positionElementAt, this.positionElementAtEventLocation = u.positionElementAtEventLocation, this.positionElementAtPageLocation = u.positionElementAtPageLocation, this.setFilter = u.setFilter, this.floatElement = u.floatElement, this.fixElement = u.fixElement;
		var D = this.setPosition,
			E = this.animateToPosition,
			F = function(a, b, c) {
				a && (u.positionChanged(a.el, [b, c]), j.fire(i.nodeMoveEnd, {
					el: a.el,
					id: a.id,
					pos: [b, c],
					node: a.obj,
					bounds: u.getBoundsInfo()
				}))
			};
		this.setPosition = function(a, b, c, d) {
			var e = D.apply(this, arguments);
			F(e, b, c)
		}, this.animateToPosition = function(a, b, c, d) {
			var e = E.apply(this, arguments);
			F(e, b, c)
		}, this.tracePath = function(a) {
			var b = a.path || function() {
					var b = k.getObjectInfo(a.source),
						c = k.getObjectInfo(a.target);
					return k.toolkit.getPath({
						source: b,
						target: c
					})
				}();
			if (b.exists()) {
				for (var c = function(b, c) {
					this.fire(b, {
						edge: c.edge,
						connection: c,
						options: a.options
					})
				}.bind(this), d = [], e = null, f = null, g = b.path.path.length, h = 1; g > h; h++) {
					var i = b.path.path[h].vertex.id,
						j = b.path.previous[i],
						l = !0,
						m = b.path.path[h].edge;
					null != j && (l = j === m.source), e = k.getConnectionForEdge(m), f = e.animateOverlay(a.overlay, jsPlumb.extend(a.options || {}, {
						previous: f,
						isFinal: h === g - 1,
						forwards: l
					})), d.push({
						handler: f,
						connection: e
					})
				}
				return d.length > 0 && (d[0].handler.bind(jsPlumbToolkit.Events.startOverlayAnimation, function() {
					c(jsPlumbToolkit.Events.startOverlayAnimation, d[0].connection)
				}), d[d.length - 1].handler.bind(jsPlumbToolkit.Events.endOverlayAnimation, function() {
					c(jsPlumbToolkit.Events.endOverlayAnimation, d[d.length - 1].connection)
				})), !0
			}
			return k.toolkit.isDebugEnabled() && jsPlumbUtil.log("Cannot trace non existent path"), !1
		}, this.getNodePositions = function() {
			var a = {}, b = u.getElementPositions();
			for (var c in b) {
				var d = k.getNodeForElementId(c);
				a[d.id] = [b[c][0][0], b[c][0][1]]
			}
			return a
		}, this.append = function(a, b, c, d) {
			n.appendChild(a), c && (c = [c.left, c.top]), u.add(a, b, c, d)
		};
		var G = this.setLayout;
		this.setLayout = function(a, b) {
			G(a, b), l && l.setHostLayout(this.getLayout())
		};
		for (var H = function(a) {
			k.jsPlumb.on(n, a, ".jtk-node, .jtk-node *", function(b) {
				var c = b.srcElement || b.target;
				if (null == c && (b = d.getOriginalEvent(b), c = b.srcElement || b.target), null != c && c.jtk) {
					var e = d.extend({
						e: b,
						el: c
					}, c.jtk);
					j.fire(a, e, b)
				}
			})
		}, I = 0; I < c.mouseEvents.length; I++) H(c.mouseEvents[I]);
		k.toolkit.bind(h.select, function(a) {
			if (a.obj.objectType == h.nodeType) {
				var b = k.getElement(a.obj.id);
				b && (jsPlumb.addClass(b, g.SURFACE_SELECTED_ELEMENT), k.jsPlumb.addToDragSelection && k.jsPlumb.addToDragSelection(b))
			} else if (a.obj.objectType == h.edgeType) {
				var c = k.getConnectionForEdge(a.obj);
				c && c.addClass(g.SURFACE_SELECTED_CONNECTION)
			}
		}), k.toolkit.bind(i.selectionCleared, function() {
			k.jsPlumb.clearDragSelection && k.jsPlumb.clearDragSelection(), jsPlumb.removeClass(f("." + g.SURFACE_SELECTED_CONNECTION), g.SURFACE_SELECTED_CONNECTION), jsPlumb.removeClass(f("." + g.SURFACE_SELECTED_ELEMENT), g.SURFACE_SELECTED_ELEMENT)
		}), k.toolkit.bind(i.deselect, function(a) {
			if (a.obj.objectType == h.nodeType) {
				var b = k.getElement(a.obj.id);
				b && (jsPlumb.removeClass(b, g.SURFACE_SELECTED_ELEMENT), k.jsPlumb.removeFromDragSelection && k.jsPlumb.removeFromDragSelection(b))
			} else if (a.obj.objectType == h.edgeType) {
				var c = k.getConnectionForEdge(a.obj);
				c && c.removeClass(g.SURFACE_SELECTED_CONNECTION)
			}
		});
		var J = this.setOffset;
		this.setOffset = function(a, b) {
			J.apply(this, arguments), u.positionChanged(a, [b.left, b.top])
		};
		var K = this.setAbsolutePosition;
		this.setAbsolutePosition = function(a, b, c) {
			K.call(this, a, b), u.positionChanged(a, b), k.jsPlumb.revalidate(a), c && c()
		}, this.setMode = function(a, b) {
			if (!y[a]) throw new TypeError("Surface: unknown mode '" + a + "'");
			z = a, y[a](), a !== h.select || b || k.toolkit.clearSelection(), j.fire(i.modeChanged, a)
		};
		var L = function(a, b) {
			var c = jsPlumb.extend({}, a);
			c.source = k.getObjectInfo(a.source).obj, c.target = k.getObjectInfo(a.target).obj, c.element = k.getObjectInfo(a.element).obj;
			var d = k.toolkit[b](c),
				e = k.getConnectionsForEdges(d);
			return k.jsPlumb.select({
				connections: e
			})
		};
		this.selectEdges = function(a) {
			return L(a, "getEdges")
		}, this.selectAllEdges = function(a) {
			return L(a, "getAllEdges")
		}, this.repaint = function(a) {
			var b = k.getObjectInfo(a);
			b.el && (k.jsPlumb.recalculateOffsets(b.el), k.jsPlumb.revalidate(k.jsPlumb.getId(b.el)), j.fire(i.objectRepainted, b))
		}, this.repaintEverything = k.jsPlumb.repaintEverything, this.setElementsDraggable = function(a) {
			o = a !== !1
		};
		var M = function(a) {
			a = a || {};
			var b = a.dataGenerator || function() {
					return {}
				}, c = a.typeExtractor,
				f = a.locationSetter || function(a, b, c) {
					c.left = a, c.top = b
				}, l = a.droppables,
				n = a.dragOptions || {}, o = a.dropOptions || {}, p = "scope_" + (new Date).getTime(),
				q = function(d, e, g) {
					var h = !0;
					if (a.drop && (h = a.drop.apply(this, arguments) !== !1), h) {
						var i = k.jsPlumb.getDragObject(arguments),
							l = j.getJsPlumb().getOffset(g ? A : i, !0),
							m = u.mapLocation(l.left, l.top),
							n = c ? c(i, d, g, m) : null,
							o = b ? b(n, i, d, m) : {};
						null != n && (o.type = n), f(m.left, m.top, o), k.toolkit.getNodeFactory()(n, o, function(b) {
							var c = k.toolkit.addNode(b, {
								position: m
							});
							a.onDrop && a.onDrop(c, d, m)
						}, d, g)
					}
				}, r = d.dragEvents[h.start],
				s = d.dragEvents[h.drag],
				t = d.dragEvents[h.stop],
				v = d.dragEvents[h.drop],
				w = function() {}, x = a.nativeFilter || [],
				y = a.allowNative,
				z = {};
			if (n[r] = e.wrap(n[r], a.start || w), n[s] = e.wrap(n[s], a.drag || w), n[t] = e.wrap(n[t], a.stop || w), o.scope = p, o[v] = e.wrap(o[v], q), y) {
				var A = document.createElement(h.div);
				A.style.position = h.absolute;
				for (var B = 0; B < x.length; B++) z[x[B]] = !0;
				var C = function(a) {
					return null != a.dataTransfer && 1 === a.dataTransfer.items.length ? 0 == x.length || z[a.dataTransfer.items[0].type] : !1
				};
				document.addEventListener(i.dragover, function(a) {
					a.stopPropagation(), a.preventDefault(), C(a) && (jsPlumb.setAbsolutePosition(A, [a.pageX, a.pageY]), n[s].apply(null, [a, {
						helper: A,
						offset: {
							left: a.pageX,
							top: a.pageY
						}
					}, !0]))
				}, !1), document.addEventListener(i.drop, function(a) {
					a.stopPropagation(), a.preventDefault(), C(a) && (o[v].apply(null, [a, {
						helper: A,
						offset: {
							left: a.pageX,
							top: a.pageY
						}
					}, !0]), n[t].apply(null))
				}, !1), document.addEventListener(i.dragend, function(a) {})
			}
			k.jsPlumb.initDroppable(m, o, h.surfaceNodeDragScope), n.scope = p, n.ignoreZoom = !0, n.doNotRemoveHelper = !0;
			for (var B = 0; B < l.length; B++) {
				var D = k.jsPlumb.getElement(l[B]);
				k.jsPlumb.addClass(D, g.SURFACE_DROPPABLE_NODE), k.jsPlumb.initDraggable(D, n, h.surfaceNodeDragScope, k.jsPlumb)
			}
		};
		this.registerDroppableNodes = function(a) {
			new M(a)
		}, this.createMiniview = function(a) {
			if (null != l) {
				var c = k.jsPlumb.getId(k.jsPlumb.getElement(a.container));
				if (l.getContainerId() == c) return !1
			}
			var e = d.extend({
				surface: j,
				toolkit: k.toolkit,
				surfaceContainerElement: m,
				bounds: u.getBoundsInfo(),
				visible: a.initiallyVisible !== !1 || k.toolkit.getNodeCount() > 0,
				layout: {
					type: h.mistletoeLayoutType,
					parameters: {
						layout: j.getLayout()
					}
				}
			}, a);
			l = new b.Renderers.Miniview(e);
			for (var f in k.nodeMap) {
				var g = k.nodeMap[f];
				l.registerNode({
					el: g,
					node: g.jtk.node,
					pos: jsPlumb.getAbsolutePosition(g)
				})
			}
			return l
		}, a.miniview && this.createMiniview(a.miniview), this.getMiniview = function() {
			return l
		}, this.State = {
			save: function(a, c) {
				if (a = 2 == arguments.length ? arguments[0] : 1 == arguments.length && "string" == typeof arguments[0] ? arguments[0] : q, c = 2 == arguments.length ? arguments[1] : 1 == arguments.length && "function" == typeof arguments[0] ? arguments[0] : function(a, b) {
					return b(a)
				}, a) try {
					c(j.State.serialize(), function(c) {
						b.util.Storage.set(h.jtkStatePrefix + a, c)
					})
				} catch (d) {
					e.log(g.msgCannotSaveState, d)
				}
			},
			serialize: function() {
				var a = u.getPan();
				a.push(u.getZoom()), a.push.apply(a, u.getTransformOrigin());
				var b = a.join(","),
					c = j.getLayout().getPositions(),
					d = [];
				for (var e in c) d.push(e + " " + c[e][0] + " " + c[e][1]);
				return b += "," + d.join("|")
			},
			restore: function(a, c) {
				if (a = 2 == arguments.length ? arguments[0] : 1 == arguments.length && "string" == typeof arguments[0] ? arguments[0] : q, c = 2 == arguments.length ? arguments[1] : 1 == arguments.length && "function" == typeof arguments[0] ? arguments[0] : function(a, b) {
					return b(a)
				}, a) try {
					var d = b.util.Storage.get(h.jtkStatePrefix + a);
					d && c(d, j.State.deserialize)
				} catch (f) {
					e.log(g.msgCannotRestoreState, f)
				}
			},
			deserialize: function(a) {
				for (var b = a.split(","), c = b[5].split("|"), d = j.getLayout(), e = 0; e < c.length; e++) {
					var f = c[e].split(" ");
					try {
						j.setPosition(f[0], parseFloat(f[1]), parseFloat(f[2]))
					} catch (g) {}
				}
				d.draw()
			},
			clear: function(a) {
				a = a || q, a && b.util.Storage.clear(h.jtkStatePrefix + a)
			},
			clearAll: function() {
				b.util.Storage.clearAll()
			}
		}, j.saveState = j.State.save, j.store = b.util.Storage.set, j.retrieve = b.util.Storage.get, j.storeJSON = b.util.Storage.setJSON, j.retrieveJSON = b.util.Storage.getJSON, j.restoreState = function(a) {
			j.State.restore(a), j.getJsPlumb().repaintEverything(), j.fire(i.stateRestored)
		}, j.clearState = function(a) {
			j.state.clear(a)
		}, j.initialize(), a.zoomToFitIfNecessary ? j.zoomToFitIfNecessary() : a.zoomToFit && j.zoomToFit()
	}, b.DefaultRendererType = h.surfaceType
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkit,
		c = b.Renderers,
		d = jsPlumbUtil,
		e = jsPlumb,
		f = jsPlumbToolkit.Classes,
		g = jsPlumbToolkit.Constants,
		h = jsPlumbToolkit.Events,
		i = jsPlumbToolkit.Attributes,
		j = jsPlumbToolkit.Methods;
	c.Miniview = function(a) {
		function b(a) {
			if (o && y && !t) {
				s = o.getBoundsInfo();
				var b = o.getApparentCanvasLocation(),
					c = y.getApparentCanvasLocation(),
					d = y.getZoom(),
					e = d / s.zoom;
				r.style.width = s.vw + g.px, r.style.height = s.vh + g.px, y.applyZoomToElement(r, e);
				var f = [b[0] * e, b[1] * e];
				n = [c[0] - f[0], c[1] - f[1]], jsPlumb.setAbsolutePosition(r, n)
			}
		}
		function k(a) {
			if (null != y) {
				s = o.getBoundsInfo(), a = a || jsPlumb.getAbsolutePosition(r);
				var b = y.getApparentCanvasLocation(),
					c = y.getZoom(),
					d = c / s.zoom,
					e = (b[0] - a[0]) / d,
					f = (b[1] - a[1]) / d,
					g = o.setApparentCanvasLocation(e, f);
				return [b[0] - g[0] * d, b[1] - g[1] * d]
			}
		}
		this.bindToolkitEvents = !1;
		var l = c.AbstractRenderer.apply(this, arguments),
			m = this;
		c.DOMElementAdapter.apply(this, arguments);
		var n, o = a.surface,
			p = e.getElement(a.container),
			q = c.createElement({
				position: g.relative,
				width: g.nominalSize,
				height: g.nominalSize,
				left: 0,
				top: 0,
				clazz: f.MINIVIEW_CANVAS
			}, p),
			r = c.createElement({
				position: g.absolute,
				width: g.nominalSize,
				height: g.nominalSize,
				left: 0,
				top: 0,
				clazz: f.MINIVIEW_PANNER
			}, p),
			s = a.bounds,
			t = a.suspended === !0,
			u = a.collapsible !== !1,
			v = null,
			w = !1,
			x = a.wheelSensitivity || 10,
			y = new ZoomWidget({
				viewport: p,
				canvas: q,
				domElement: e.getElement,
				offset: this.getOffset,
				bind: function() {
					l.jsPlumb.on.apply(l.jsPlumb, arguments)
				},
				unbind: function() {
					l.jsPlumb.off.apply(l.jsPlumb, arguments)
				},
				enableWheelZoom: !1,
				enablePanButtons: !1,
				enablePan: !1,
				enableAnimation: !1,
				width: function(a) {
					return l.jsPlumb.getWidth(l.jsPlumb.getElement(a))
				},
				height: function(a) {
					return l.jsPlumb.getHeight(l.jsPlumb.getElement(a))
				},
				id: l.jsPlumb.getId,
				animate: l.jsPlumb.animate,
				dragEvents: {
					stop: e.dragEvents[g.stop],
					start: e.dragEvents[g.start],
					drag: e.dragEvents[g.drag]
				},
				extend: e.extend,
				events: {
					pan: function() {
						k()
					},
					mousedown: function() {
						jsPlumb.addClass(r, f.MINIVIEW_PANNING)
					},
					mouseup: function() {
						jsPlumb.removeClass(r, f.MINIVIEW_PANNING)
					}
				},
				zoomRange: [-(1 / 0), 1 / 0]
			}),
			z = !1,
			A = null,
			B = null,
			C = !1,
			D = function(a) {
				z = !0, A = y.pageLocation(a), B = jsPlumb.getAbsolutePosition(r), e.on(document, h.mouseup, F), e.on(document, h.mousemove, E), d.consume(a)
			}, E = function(a) {
				if (C = !1, z) {
					var b = y.pageLocation(a),
						c = b[0] - A[0],
						d = b[1] - A[1],
						e = [B[0] + c, B[1] + d];
					k(e);
					jsPlumb.setAbsolutePosition(r, e)
				}
			}, F = function(a) {
				z = !1, A = null, e.off(document, h.mouseup, F), e.off(document, h.mousemove, E)
			}, G = !0,
			H = function(a) {
				d.consume(a), o.nudgeWheelZoom(a.normalizedWheelDelta * x, a)
			};
		e.on(window, h.resize, jsPlumbToolkitUtil.debounce(function() {
			b()
		}, 100)), a.enableWheelZoom !== !1 && addWheelListener(p, H), y.setTransformOriginForElement(r, [0, 0]), jsPlumb.addClass(p, f.MINIVIEW), e.on(r, h.mousedown, D), u && (v = jsPlumb.createElement("div"), v.className = f.MINIVIEW_COLLAPSE, p.appendChild(v), e.on(v, g.click, function(a) {
			w = !w, jsPlumb[w ? j.addClass : j.removeClass](p, f.MINIVIEW_COLLAPSED)
		}));
		var I = function(a) {
			y.zoomToFit({
				onComplete: b,
				onStep: b,
				doNotFirePanEvent: a
			})
		};
		a.toolkit.bind(h.dataLoadEnd, I);
		var J = function(a) {
			s = a.bounds, y.positionChanged(a.el, a.pos), jsPlumb.setAbsolutePosition(l.nodeMap[a.node.id], a.pos), I(!0), this.fire(h.nodeMoveEnd, a)
		}.bind(this),
			K = function(a) {
				var d = e.getSize(a.el),
					h = c.createElement({
						position: g.absolute,
						width: d[0] + g.px,
						height: d[1] + g.px,
						left: 0,
						top: 0,
						clazz: f.MINIVIEW_ELEMENT
					});
				h.relatedElement = a.el, s = o.getBoundsInfo(), h.setAttribute(i.jtkNodeId, a.node.id), h.setAttribute(i.relatedNodeId, a.el.getAttribute(g.id)), q.appendChild(h), y.add(h), l.nodeMap[a.node.id] = h, m.getLayout().map(a.node.id, h), b()
			};
		this.registerNode = function(a) {
			K(a), J(a)
		};
		var L = this.setOffset;
		this.setOffset = function(a, b) {
			L.apply(this, arguments), y.positionChanged(a, [b.left, b.top])
		};
		var M = this.setAbsolutePosition;
		this.setAbsolutePosition = function(a, b) {
			M.call(this, a, b), y.positionChanged(a, b)
		}, this.setVisible = function(a) {
			G = a, p.style.display = a ? g.block : g.none
		}, this.setVisible(a.visible !== !1), this.getPan = y.getPan;
		var N = function(a) {
			var c = l.nodeMap[a.id];
			if (c) {
				var d = e.getSize(c.relatedElement);
				c.style.width = d[0] + g.px, c.style.height = d[1] + g.px, b()
			}
		};
		this.setSuspended = function(a, b) {
			t = a, b && this.update()
		}, this.update = b;
		var O = function(a) {
			var c = a.node,
				d = l.nodeMap[c];
			d && (y.remove(d), delete l.nodeMap[c], l.jsPlumb.removeElement(d)), a.dontUpdatePanner || b()
		}, P = function() {
			for (var a in l.nodeMap) O({
				node: a,
				dontUpdatePanner: !0
			});
			b()
		};
		o.bind(h.pan, b), o.bind(h.zoom, b), o.bind(h.nodeMoveEnd, J), o.bind(h.nodeRemoved, O), o.bind(h.nodeAdded, K), o.bind(h.nodeRendered, K), o.bind(h.relayout, b), o.bind(h.objectRepainted, N), o.bind(h.stateRestored, b), a.toolkit.bind(h.graphCleared, P);
		var Q = function() {
			I(!0)
		};
		m.getLayout().bind(h.redraw, Q), this.setHostLayout = function(a) {
			var b = m.getLayout();
			b && b.setHostLayout(a)
		}, this.setZoom = y.setZoom, this.getZoom = y.getZoom, this.getTransformOrigin = y.getTransformOrigin
	}
}.call(this), 
function() {
	"use strict";
	var a = this,
		b = a.jsPlumbToolkit,
		c = b.Widgets,
		d = jsPlumbUtil,
		e = (/MSIE\s([\d.]+)/.test(navigator.userAgent) && new Number(RegExp.$1) < 9, "ontouchstart" in document.documentElement),
		f = e ? "touchstart" : "mousedown",
		g = e ? "touchend" : "mouseup",
		h = e ? "touchmove" : "mousemove",
		i = function(a, b) {
			a.style.width = b[0] + "px", a.style.height = b[1] + "px"
		};
	c.Lasso = function(a) {
		var b = a.canvas,
			c = !1,
			e = document.createElement("div"),
			j = [0, 0],
			k = a.onStart || function() {}, l = a.onEnd || function() {}, m = a.onSelect || function() {}, n = !1,
			o = function(b) {
				c && !s(b) && (d.consume(b), n = !0, a.on(document, g, q), a.on(document, h, p), a.on(document, "onselectstart", r), j = a.pageLocation(b), jsPlumb.setAbsolutePosition(e, j), i(e, [1, 1]), e.style.display = "block", jsPlumb.addClass(document.body, "jtk-lasso-select-defeat"), k(j, b.shiftKey))
			}, p = function(b) {
				if (n) {
					d.consume(b);
					var c = a.pageLocation(b),
						f = [Math.abs(c[0] - j[0]), Math.abs(c[1] - j[1])],
						g = [Math.min(j[0], c[0]), Math.min(j[1], c[1])];
					[j[0] < c[0], j[1] < c[1]];
					jsPlumb.setAbsolutePosition(e, g), i(e, f), m(g, f, [j[0] < c[0], j[1] < c[1]], b.shiftKey)
				}
			}, q = function(b) {
				n && (n = !1, d.consume(b), a.off(document, g, q), a.off(document, h, p), a.off(document, "onselectstart", r), e.style.display = "none", jsPlumb.removeClass(document.body, "jtk-lasso-select-defeat"), l())
			}, r = function() {
				return !1
			}, s = a.filter ? function(b) {
				var c = b.srcElement || b.target;
				return d.matchesSelector(c, a.filter)
			} : function() {
				return !1
			};
		e.className = "jtk-lasso", document.body.appendChild(e), a.on(b, f, o), this.isActive = function() {
			return n
		}, this.setEnabled = function(a) {
			c = a
		}
	}
}.call(this), 
function() {
	"use strict";
	var a, b, c, d, e, f, g, h, i, j, k, l, m, n = this,
		o = {}, p = {
			ok: "OK",
			cancel: "Cancel"
		}, q = document.body,
		r = !1,
		s = Rotors.newInstance(),
		t = {}, u = !0;
	jsPlumb.ready(function() {
		b = document.createElement("div"), b.className = "jtk-dialog-underlay", jsPlumb.on(b, "click", function() {
			I()
		}), c = document.createElement("div"), c.className = "jtk-dialog-overlay", d = document.createElement("div"), d.className = "jtk-dialog-title", c.appendChild(d), e = document.createElement("div"), e.className = "jtk-dialog-content", c.appendChild(e), f = document.createElement("div"), f.className = "jtk-dialog-buttons", c.appendChild(f)
	});
	var v = function() {
		l = document.createElement("button"), l.className = "jtk-dialog-button jtk-dialog-button-ok", l.innerHTML = p.ok, f.appendChild(l), jsPlumb.on(l, "click", function() {
			I()
		}), m = document.createElement("button"), m.className = "jtk-dialog-button jtk-dialog-button-cancel", m.innerHTML = p.cancel, f.appendChild(m), jsPlumb.on(m, "click", function() {
			I(!0)
		})
	}, w = {
		x: function(a, b, d) {
			var e = q.clientWidth,
				f = (e - d[0]) / 2,
				g = window.pageXOffset || a.scrollLeft || document.body.scrollLeft;
			0 > f && (f = 10), g = b ? g : q.scrollLeft, c.style.left = f + g + "px"
		},
		y: function(a, b, d) {
			var e = q.clientHeight,
				f = .1 * e,
				g = window.pageYOffset || a.scrollTop || document.body.scrollTop;
			0 > f && (f = 10), g = b ? g : q.scrollTop, c.style.top = f + g + "px"
		}
	}, x = function() {
		if (r) {
			var a = document.documentElement,
				d = jsPlumb.getSize(c),
				e = q == document.body,
				f = c.getAttribute("data-axis");
			b.style.position = e ? "fixed" : "absolute", w[f](a, e, d)
		}
	}, y = function(a) {
		27 == a.keyCode && I(!0)
	}, z = function(a) {
		return null == a ? document.body : "string" == typeof a ? document.getElementById(a) : a
	}, A = function(a) {
		if (a.id && o[a.id]) {
			u = a.reposition !== !1, g = a.onOK, h = a.onCancel, i = a.onOpen, j = a.onMaybeClose, k = a.onClose;
			var f = a.position || "top",
				n = "jtk-dialog-overlay-" + f,
				w = "top" === f || "bottom" === f ? "x" : "y",
				A = "jtk-dialog-overlay-" + w;
			v(), l.innerHTML = a.labels ? a.labels.ok || p.ok : p.ok, m.innerHTML = a.labels ? a.labels.cancel || p.cancel : p.cancel, q = z(a.container);
			var C = a.data || {}, D = s.template(a.id, C);
			d.innerHTML = a.title || o[a.id].title || "", e.innerHTML = "";
			for (var E = D.childNodes.length, G = 0; E > G; G++) e.appendChild(D.childNodes[0]);
			q.appendChild(b), q.appendChild(c), jsPlumb.addClass(c, n), jsPlumb.addClass(c, A), b.style.display = "block", c.style.display = "block", c.setAttribute("data-position", f), c.setAttribute("data-axis", w), m.style.visibility = o[a.id].cancelable ? "visible" : "hidden", r = !0, x(), B(C), t.onOpen && t.onOpen(c), i && i(c), jsPlumb.addClass(c, "jtk-dialog-overlay-visible"), jsPlumb.on(document, "keyup", y), u && (jsPlumb.on(window, "resize", x), jsPlumb.on(window, "scroll", x)), jsPlumb.on(c, "click", "[jtk-clear]", function(a) {
				var b = this.getAttribute("jtk-att");
				b && F(c.querySelectorAll("[jtk-att='" + b + "']:not([jtk-clear])"), this)
			}), jsPlumb.on(c, "click", "[jtk-clear-all]", function(a) {
				F(c.querySelectorAll("[jtk-att]:not([jtk-clear])"), this)
			});
			try {
				var H = e.querySelector("[jtk-focus]");
				H && setTimeout(function() {
					H.focus()
				}, 0)
			} catch (I) {}
		}
	}, B = function(a) {
		for (var b = e.querySelectorAll("[jtk-att]"), c = 0; c < b.length; c++) {
			var d = b[c].tagName.toUpperCase(),
				f = "INPUT" === d ? (b[c].getAttribute("type") || "TEXT").toUpperCase() : d,
				g = b[c].getAttribute("jtk-att"),
				h = s.data(a, g);
			null != h && C[f](b[c], h), b[c].getAttribute("jtk-commit") && ("INPUT" === d ? jsPlumb.on(b[c], "keyup", function(a) {
				(10 == a.keyCode || 13 == a.keyCode) && I()
			}) : "TEXTAREA" === d && jsPlumb.on(b[c], "keyup", function(a) {
				!a.ctrlKey || 10 != a.keyCode && 13 != a.keyCode || I()
			}))
		}
	}, C = {
		TEXT: function(a, b) {
			a.value = b
		},
		RADIO: function(a, b) {
			a.checked = a.value == b
		},
		CHECKBOX: function(a, b) {
			a.checked = 1 == b
		},
		SELECT: function(a, b) {
			for (var c = 0; c < a.options.length; c++) if (a.options[c].value == b) return void(a.selectedIndex = c)
		},
		TEXTAREA: function(a, b) {
			a.value = b
		}
	}, D = {
		TEXT: function(a) {
			return a.value
		},
		RADIO: function(a) {
			return a.checked ? a.value : void 0
		},
		CHECKBOX: function(a) {
			return a.checked ? !0 : void 0
		},
		SELECT: function(a) {
			return -1 != a.selectedIndex ? a.options[a.selectedIndex].value : null
		},
		TEXTAREA: function(a) {
			return a.value
		}
	}, E = {
		TEXT: function(a) {
			a.value = ""
		},
		RADIO: function(a) {
			a.checked = !1
		},
		CHECKBOX: function(a) {
			a.checked = !1
		},
		SELECT: function(a) {
			a.selectedIndex = -1;
		},
		TEXTAREA: function(a) {
			a.value = ""
		}
	}, F = function(a, b) {
		for (var c = 0; c < a.length; c++) if (a[c] !== b) {
			var d = a[c].tagName.toUpperCase(),
				e = "INPUT" === d ? (a[c].getAttribute("type") || "TEXT").toUpperCase() : d,
				f = E[e];
			f && f(a[c])
		}
	}, G = function() {
		for (var a = e.querySelectorAll("[jtk-att]"), b = {}, c = 0; c < a.length; c++) {
			var d = a[c].tagName.toUpperCase(),
				f = "INPUT" === d ? (a[c].getAttribute("type") || "TEXT").toUpperCase() : d,
				g = D[f](a[c]),
				h = a[c].getAttribute("jtk-att");
			if (null != g) {
				var i = s.data(b, h);
				null != i ? (jsPlumbUtil.isArray(i) || s.data(b, h, [i]), i.push(g)) : s.data(b, h, g)
			}
		}
		return b
	}, H = function(a, b) {
		try {
			null != a && a.apply(a, Array.prototype.slice.apply(arguments, [1]))
		} catch (c) {}
	}, I = function(d) {
		var f = d ? null : G();
		(d || null == j || j(f) !== !1) && (r = !1, b.style.display = "none", c.style.display = "none", jsPlumb.off(document, "keyup", y), jsPlumb.off(window, "resize", x), jsPlumb.off(window, "scroll", x), jsPlumb.removeClass(c, "jtk-dialog-overlay-visible"), jsPlumb.removeClass(c, "jtk-dialog-overlay-top"), jsPlumb.removeClass(c, "jtk-dialog-overlay-bottom"), jsPlumb.removeClass(c, "jtk-dialog-overlay-left"), jsPlumb.removeClass(c, "jtk-dialog-overlay-right"), jsPlumb.removeClass(c, "jtk-dialog-overlay-x"), jsPlumb.removeClass(c, "jtk-dialog-overlay-y"), c.setAttribute("data-position", ""), c.setAttribute("data-axis", ""), q.removeChild(b), q.removeChild(c), l.parentNode.removeChild(l), m.parentNode.removeChild(m), d ? (H(t.onCancel, e), H(h, e)) : (H(t.onOK, f, e), H(g, f, e)), H(t.onClose), H(k), g = h = i = k = j = a = null)
	};
	n.jsPlumbToolkit.Dialogs = {
		initialize: function(a) {
			a = a || {};
			for (var b = a.selector || ".jtk-dialog", c = jsPlumb.getSelector(b), d = 0; d < c.length; d++) {
				var e = c[d].getAttribute("id");
				null != e && (o[e] = {
					content: c[d].innerHTML,
					title: c[d].getAttribute("title") || "",
					el: c[d],
					cancelable: "false" !== c[d].getAttribute("cancel")
				})
			}
			a.labels && jsPlumb.extend(p, a.labels), a.globals && jsPlumb.extend(t, a.globals)
		},
		show: A,
		hide: function() {
			I(!0)
		},
		clear: F
	}
}.call(this), 
function() {
	"use strict";
	var a = this;
	a.jsPlumbToolkit.DrawingTools = function(a) {
		var b, c, d, e, f, g, h, i, j, k = a.renderer,
			l = k.getToolkit(),
			m = k.getJsPlumb(),
			n = {}, o = a.widthAttribute || "w",
			p = a.heightAttribute || "h",
			q = a.leftAttribute || "left",
			r = a.topAttribute || "top",
			s = function() {
				for (var a in n) {
					var b = n[a];
					b[0] && b[0].parentNode && b[0].parentNode.removeChild(b[0]), delete n[a]
				}
			}, t = function(a, b, c, d) {
				var e = document.createElement(a);
				if (b && (e.className = b), c && c.appendChild(e), d) for (var f in d) e.setAttribute(f, d[f]);
				return e
			}, u = function(a) {
				var b = n[a];
				b && b[0] && b[0].parentNode && b[0].parentNode.removeChild(b[0]), delete n[a]
			}, v = function(a, b) {
				var c = b.getRenderedNode(a.id);
				return u(a.id), c
			}, w = function(a, b) {
				var c = v(a, b);
				if (null != c) {
					var d = t("div", "jtk-draw-skeleton", c),
						e = c.getAttribute("jtk-x-resize"),
						f = c.getAttribute("jtk-y-resize");
					t("div", "jtk-draw-drag", d), t("div", "jtk-draw-handle jtk-draw-handle-tl", d, {
						"data-dir": "tl",
						"data-node-id": a.id
					}), t("div", "jtk-draw-handle jtk-draw-handle-tr", d, {
						"data-dir": "tr",
						"data-node-id": a.id
					}), t("div", "jtk-draw-handle jtk-draw-handle-bl", d, {
						"data-dir": "bl",
						"data-node-id": a.id
					}), t("div", "jtk-draw-handle jtk-draw-handle-br", d, {
						"data-dir": "br",
						"data-node-id": a.id
					}), n[a.id] = [d, "false" !== e, "false" !== f]
				}
			}, x = function(a, d, e, f) {
				var k = {};
				return k[o] = b ? e : h - g, k[p] = c ? f : j - i, k[q] = b ? a : g, k[r] = c ? d : i, k
			}, y = {
				tl: function(a, b) {
					var c = g + a,
						d = i + b,
						e = h - c,
						f = j - d;
					return c >= h && (e = c - h, c = h), d >= j && (f = d - j, d = j), x(c, d, e, f)
				},
				tr: function(a, b) {
					var c = h - g + a,
						d = i + b,
						e = j - d,
						f = g;
					return 0 >= c && (f = g + c, c *= -1), d >= j && (e = d - j, d = j), x(f, d, c, e)
				},
				bl: function(a, b) {
					var c = g + a,
						d = j - i + b,
						e = h - c,
						f = i;
					return c >= h && (e = c - h, c = h), 0 >= d && (f += d, d *= -1), x(c, f, e, d)
				},
				br: function(a, b) {
					var c = h - g + a,
						d = j - i + b,
						e = g,
						f = i;
					return 0 >= c && (e = g + c, c *= -1), 0 >= d && (f += d, d *= -1), x(e, f, c, d)
				}
			};
		l.bind("selectionCleared", function() {
			s()
		}), l.bind("select", function(a) {
			w(a.obj, k)
		}), l.bind("deselect", function(a) {
			v(a.obj, k)
		});
		var z = function(a) {
			var b = k.mapEventLocation(a),
				c = b.left - d.left,
				g = b.top - d.top,
				h = e(c, g, "");
			l.updateNode(f, h), k.setPosition(f, h[q], h[r], !0)
		}, A = function(a) {
			k.storePositionInModel(f.id), m.removeClass(document.body, "jtk-draw-select-defeat"), m.off(document, "mousemove", z), m.off(document, "mouseup", A), jsPlumbUtil.consume(a)
		};
		m.on(document, "mousedown", ".jtk-draw-handle", function(a) {
			var o = this.getAttribute("data-dir"),
				p = this.getAttribute("data-node-id");
			f = l.getNode(p), b = n[p][1], c = n[p][2], d = k.mapEventLocation(a);
			var q = k.getCoordinates(f);
			g = q.x, i = q.y, h = g + q.w, j = i + q.h, e = y[o], m.addClass(document.body, "jtk-draw-select-defeat"), m.on(document, "mousemove", z), m.on(document, "mouseup", A)
		})
	}
}.call(this)