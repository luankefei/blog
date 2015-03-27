/**
author: dk
*/

(function(win) {
	var dkit = {};
	
	dkit.$ = function(){
		var args = arguments;
		if(typeof args[0] == 'string'){
			if(document.getElementById(args[0])){
				return document.getElementById(args[0]);
			} else {
				return null;
			}
		}else{
			return arguments[0];
		}
	};
	
	dkit.getElementByClassName = function(className, tag, parent) {
        parent = parent || document;
        if (!(parent = $(parent))) {
            return false;
        }
        var allTags = (tag == '*' && parent.all) ? parent.all : parent.getElementsByTagName(tag);
        var matchingElements = new Array();
        className = className.replace(/\-/g, '\\-');
        var regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
        var element;
        for (var i = 0, length = allTags.length; i < length; i++) {
            element = allTags[i];
            if (regex.test(element.className)) {
                matchingElements.push(element);
            }
        }
        return matchingElements;
    };
	
	//create element by tag name
	var eles = {
		div: document.createElement('div'),
		ul: document.createElement('ul'),
		li: document.createElement('li'),
		span: document.createElement('span'),
		p: document.createElement('p'),
		a: document.createElement('a'),
		input:document.createElement('input')
	}
	dkit.$c = function(tagName, id, className){
		if(tagName == "input") {
			
			eles[tagName].type = "button";	
			eles[tagName].value = "确定";	
		
		
			
		}
		var ele = eles[tagName].cloneNode(true);
		
		if(id){
			ele.id = id;
		}
		if(className){
			ele.className = className;
		}
		return ele;
	};
	//browser match
	var browserMatch = (function (ua) {
        ua = navigator.userAgent.toLowerCase();
        var match = /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    })();
	
    dkit.browser = {};
	
    if (browserMatch.browser) {
        dkit.browser[browserMatch.browser] = true;
        dkit.browser.version = browserMatch.version;
    }
	//事件绑定修复
	function addEvent(node, type, listener) {
		var customEvents = {'fover': 'mouseover', 'fout': 'mouseout'};
        if (typeof(node) == 'string') {
            node = $(node);
        }
        if (!listener.$$guid) {
            listener.$$guid = addEvent.guid++;
        }
        if (!node.events) {
            node.events = {};
        }
        var handlers = node.events[type],
            isRegisted = !! node.events[type];
        if (!handlers) {
            handlers = node.events[type] = {};
        }
        handlers[listener.$$guid] = listener;
        if (!isRegisted) {
            if (node.addEventListener) {
				if(customEvents[type]){
					node.addEventListener(customEvents[type], handleEventFix, false);
				}else{
					node.addEventListener(type, handleEvent, false);
				}
            } else if (node.attachEvent) {
                var tempFunc;
				if(customEvents[type]){
					tempFunc = function () {
						handleEventFix.call(node, window.event);
					};
					type = customEvents[type];
				}else{
					tempFunc = function () {
						handleEvent.call(node, window.event);
					};
					
				}
                node.attachEvent('on' + type, tempFunc);
            } else {
                node['on' + type] = handleEvent;
            }
        }
    }

    addEvent.guid = 1;

    function removeEvent(node, type, handler) {
        if (node.events && node.events[type]) {
            delete node.events[type][handler.$$guid];
        }
    }

    function handleEvent(event) {
        var returnValue = true;
        event = event || window.event;
        event = fixEvent(event, this);
        var handlers = this.events[event.type];
        for (var i in handlers) {
            this.$$handleEvent = handlers[i];
            if (this.$$handleEvent(event) === false) {
                returnValue = false;
            }
        }
        return returnValue;
    }
	
	function handleEventFix(event) {
        var returnValue = true;
        event = event || window.event;
        event = fixEvent(event, this);
		var type = event.type.replace('mouse', 'f');
        var handlers = this.events[type];
        for (var i in handlers) {
            this.$$handleEvent = handlers[i];
			if(checkHover(event, this)){
				if (this.$$handleEvent(event) === false) {
					returnValue = false;
				}
			}
        }
        return returnValue;
    }

    function fixEvent(event, currentTarget) {
        event.preventDefault || (event.preventDefault = fixEvent.preventDefault);
        event.stopPropagation || (event.stopPropagation = fixEvent.stopPropagation);
        event.target || (event.target = event.srcElement);
        event.currentTarget || (event.currentTarget = currentTarget);
        //event.x && (event.x = fixEvent.x);
        //event.y && (event.y = fixEvent.y);
        return event;
    }

    fixEvent.preventDefault = function () {
        this.returnValue = false;
    };
    fixEvent.stopPropagation = function () {
        this.cancelBubble = true;
    };
	
    dkit.addEvent = addEvent;
	dkit.removeEvent = removeEvent;
	
	dkit.bind = function(targetObj, func) {
        var args = Array.prototype.slice.call(arguments).slice(2);
        return function () {
            return func.apply(targetObj, args.concat(Array.prototype.slice.call(arguments)));
        }
    }
	
	dkit.contains = function(parentNode, childNode) {
        return parentNode.contains ? parentNode != childNode && parentNode.contains(childNode) : !! (parentNode.compareDocumentPosition(childNode) & 16);
    }
	
	function checkHover(e, target) {
        if (dk.getEvent(e).type == "mouseover") {
            return !dkit.contains(target, getEvent(e).relatedTarget || getEvent(e).fromElement) && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target);
        } else {
            return !dkit.contains(target, getEvent(e).relatedTarget || getEvent(e).toElement) && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target);
        }
    }
	
	dkit.getBrowserSize = function() {
        var de = document.documentElement;
        return {
            width: (window.innerWidth || (de && de.clientWidth) || document.body.clientWidth),
            height: (window.innerHeight || (de && de.clientHeight) || document.body.clientHeight)
        }
    }
	
	dkit.getDocSize = function() {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        };
    }
	
	dkit.getNodePosition = function(target) {
        target = $(target)
        if (!target) {
            return null;
        }
        var left = 0,
            top = 0;
        do {
            left += target.offsetLeft || 0;
            top += target.offsetTop || 0;
            target = target.offsetParent;
        } while (target);
        return {
            left: left,
            top: top
        };
    }
	
	dkit.getMousePosition = function(e) {
        var scrollx, scrolly;
        if (typeof(window.pageXOffset) == 'number') {
            scrollx = window.pageXOffset;
            scrolly = window.pageYOffset;
        } else {
            scrollx = document.documentElement.scrollLeft;
            scrolly = document.documentElement.scrollTop;
        }
        return {
            x: e.clientX + scrollx,
            y: e.clientY + scrolly
        }
    }
	//获取滚动条值
	dkit.getScroll = function() {
        var scrollx, scrolly;
        if (typeof(window.pageXOffset) == 'number') {
            scrollx = window.pageXOffset;
            scrolly = window.pageYOffset;
        } else {
            scrollx = document.documentElement.scrollLeft;
            scrolly = document.documentElement.scrollTop;
        }
        return {
            left: scrollx,
            top: scrolly
        };
    }
	//随机数，从m到n
	dkit.ran = function(m, n) {
        return Math.floor((n - m + 1) * Math.random() + m);
    };
	
	var _$ = function (node) {
		if (typeof(node) == 'string') {
			node = dkit.$(node);
		}
		this.node = node;
	};
	_$.prototype = {
		css: function (style, value) { //三个重载方法
			var argNum = arguments.length;
			if (argNum == 1 && typeof(arguments[0]) == 'string') { //按照参数中的样式表的样式名称获取样式的值
				return this.getCss(arguments[0]);
			} else if (argNum == 1 && typeof(arguments[0]) == 'object') { //按照参数中的Json对象设置样式
				var styles = arguments[0];
				for (var i in styles) {
					this.setCss(i, styles[i]);
				}
			} else if (argNum == 2) { //按照参数中的样式名称和值对指定样式进行设置
				this.setCss(arguments[0], arguments[1]);
			}
			return this;
		},
		getCss: function (styleName) {
			var value;
			if (this.node.currentStyle) {
				value = this.node.currentStyle[styleName];
				if (value == 'auto' && styleName == 'width') {
					value = this.node.clientWidth;
				}
				if (value == 'auto' && styleName == 'height') {
					value = this.node.clientHeight;
				}
				if (styleName == 'opacity' && this.supportFilter() && !this.supportOpacity()) {
					var opactiyRex = /opacity=(\d{1,3})/;
					var filterString = this.node.currentStyle['filter'];
					if (opactiyRex.test(filterString)) {
						value = parseFloat(RegExp.$1) / 100;
					}
				}
				return value;
			} else if (window.getComputedStyle) {
				value = window.getComputedStyle(this.node, null).getPropertyValue(this.getSplitName(styleName));
				return value;
			}
		},
		width: function () {
			return this.node.offsetWidth;
		},
		height: function () {
			return this.node.offsetHeight;
		},
		setCss: function (styleName, value) {
			//alert(!!document.body.filters);
			if (styleName == 'opacity') {
				if (this.supportOpacity()) {
					this.node.style.opacity = value;
				} else if (this.supportFilter()) {
					this.node.style.zoom = 1;
					this.node.style.filter = 'alpha(opacity=' + (parseFloat(value) * 100) + ')';
				}
				return;
			}
			regExpNoneUnit = /(?:zIndex|opacity|zoom)/i;
			if (!regExpNoneUnit.test(styleName) && typeof value == 'number') {
				this.node.style[this.getCamelName(styleName)] = value + 'px';
				return;
			}
			
			//alert(styleName);
			this.node.style[this.getCamelName(styleName)] = value;
		},
		getSplitName: function (styleName) {
			return styleName.replace(/([A-Z])/g, '-$1').toLowerCase();
		},
		getCamelName: function (style_name) {
			return style_name.replace(/-([a-z])/g, function (targetStr) {
				return targetStr.slice(1).toUpperCase();
			});
		},
		addClass: function (value) {
			var classNames = (value || '').split(/\s+/);
			if (this.node.className) {
				var className = ' ' + this.node.className + ' ',
					setClass = this.node.className;
				for (var i = 0, len = classNames.length; i < len; i++) {
					if (className.indexOf(' ' + classNames[i] + ' ') < 0) {
						setClass += ' ' + classNames[i];
					}
				}
				this.node.className = dk.trim(setClass);
			} else {
				this.node.className = value;
			}
		},
		removeClass: function (value) {
			var classNames = (value || '').split(/\s+/);
			if (this.node.className) {
				if (value) {
					var className = (' ' + this.node.className + ' ').replace(/[\n\t]/g, ' ');
					for (var i = 0, len = classNames.length; i < len; i++) {
						className = className.replace(' ' + classNames[i] + ' ', ' ');
					}
					this.node.className = dk.trim(className);
				} else {
					this.node.className = '';
				}
			}
		},
		hasClass: function (value) {
			return this.node.className.indexOf(value) > -1;
		},
		supportOpacity: function () {
			return typeof document.createElement("div").style.opacity != 'undefined';
		},
		supportFilter: function () {
			return typeof document.createElement('div').style.filter != 'undefined';
		},
		remove: function(){
			return this.node.parentNode.removeChild(this.node);
		},
		tagName: function(){
			return this.node.tagName.toLowerCase();
		},
		getPosition: function(){
			var target = this.node;
			if (!target) {
				return null;
			}
			var left = 0,
				top = 0;
			do {
				left += target.offsetLeft || 0;
				top += target.offsetTop || 0;
				target = target.offsetParent;
			} while (target);
			return {
				left: left,
				top: top
			};
		}
	};
	
	dkit.$$ = function(node){
		return new _$(node);
	};
	/***** dkit logs *****/
	var console = function(id) {
        id = id || 'defaultDebugLogs';
        var logsWindow = null;
        var initWindow = function () {
            logsWindow = document.createElement('ol');
            logsWindow.setAttribute('id', id);
            var winStyle = logsWindow.style;
            winStyle.position = 'fixed';
            winStyle.top = '10px';
            winStyle.right = '10px';
            winStyle.width = '300px';
            winStyle.height = '600px';
            winStyle.overflow = 'auto';
            winStyle.border = '1px solid #ccc';
            winStyle.background = '#fff';
            winStyle.padding = 0;
            winStyle.margin = 0;
            document.body.appendChild(logsWindow);
        };
        this.writeRow = function (message) {
            logsWindow || initWindow();
            var newItem = document.createElement('li');
            newItem.style.padding = '2px';
            newItem.style.margin = '0 0 1px 0';
            newItem.style.background = '#eee';
            if (typeof(message) == 'undefined') {
                newItem.innerHTML = '<span style=\"color:#f90;\">Message is undefined</span>';
            } else {
                newItem.innerHTML = message;
            }
            logsWindow.appendChild(newItem);
        };
    }

    console.prototype = {
       write: function (message) {

            if (typeof(message) == 'string' && message.length == 0) {
                return this.writeRow('<span style=\"color:#900;\">warning:</span> empty message');
            }
            if (typeof(message) != 'string' && typeof(message) != 'undefined') {
				if(message === null){
					return this.writeRow('<span style=\"color:#900;\">Message is null</span>');
				}
                if (message.toString){
					return this.writeRow(message.toString());
				}
                else{
					return this.writeRow(typeof(message));
				}
            }
            if (typeof(message) == 'undefined') {
                return this.writeRow('<span style=\"color:#f90;\">Message is undefined</span>');
            }
            message = message.replace(/</g, "&lt;").replace(/</g, "&gt;");
            return this.writeRow(message);
        },
        header: function (message) {
            return this.writeRow(message);
        }
    };
	
	dkit.console = new console();
	
	/***********expand the original Object***********/
	String.prototype.trim = function(){
		 return (this || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
	};
	
	if(!win.dkit) {
		win.dkit = dkit;
		win.dkit.version = '0.1';
	}
})(window);