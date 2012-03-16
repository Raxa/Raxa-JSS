// This class is still experimental, docs will be added at a later time
Ext.util.EventSimulator = Ext.extend(Object, {

    supportedEvents: {
        touch: ['touchstart', 'touchmove', 'touchend', 'gesturestart', 'gesturechange', 'gestureend'],
        mouse: ['mousedown', 'mousemove', 'mouseup', 'click']
    },

    getEventTypeByName: function(name) {
        var ret = null;

        Ext.iterate(this.supportedEvents, function(type, events) {
            if (events.indexOf(name) != -1)
                ret = type;
        });

        return ret;
    },

    fire: function(type, target, options) {
        type = type.toLowerCase();

        if (arguments.length == 2) {
            options = target;
            target = document;
        }

        switch(this.getEventTypeByName(type)) {
            case 'touch':
                this.fireTouchEvent.call(this, type, target, options);
                break;

            case 'mouse':
                this.fireMouseEvent.call(this, type, target, options);
                break;

            default:
                throw new Error("Event type " + type + " is currently not supported");
        }

        return this;
    },

    createEvent: function(data, serializable) {

    },

    createEventData: function(event, serializable) {
        switch (this.getEventTypeByName(event.type)) {
            case 'touch':
                return this.createTouchEventData(event.type, event.target, event, serializable);
                break;

            case 'mouse':
                return this.createMouseEventData(event.type, event.target, event, serializable);
                break;

            default:
                throw new Error("Event type " + event.type + " is currently not supported");
        }
    },

    /* Touch events ========================================================================== */

    fireTouchEvent: function(type, target, options) {
        var touchEventData = this.createTouchEventData(type, target, options);

        var touchEvent = this.createTouchEvent(type, touchEventData);
        touchEvent.isSimulated = true;

        return target.dispatchEvent(touchEvent);
    },

    createTouchEventData: function(type, target, options, serializable) {
        var touchEventData = {
            type: type,
            timeStamp: Date.now(),
            bubbles: true,
            cancelable: true,
            detail: 1, // Not sure what this does in "touch" event.
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            scale: 1,
            rotation: 0
        };

        if (!serializable) {
            touchEventData.target = target;
            touchEventData.view = document.defaultView;
        }

        if (options) {
            Ext.iterate(touchEventData, function(key, value) {
                if (options.hasOwnProperty(key)) {
                    touchEventData[key] = options[key];
                }
            });
        }
        
        ['touches', 'targetTouches', 'changedTouches'].forEach(function(touchListName) {
            if (options.hasOwnProperty(touchListName)) {
                touchEventData[touchListName] = this.createTouchList(options[touchListName], target, serializable);
            }
            else {
                touchEventData[touchListName] = this.createTouchList(touchEventData, target, serializable);
            }
        }, this);

        return touchEventData;
    },

    createTouchEvent: function(type, data) {
        if (typeof type != 'string') {
            data = type;
            type = type.type;
        }

        var touchEvent = document.createEvent('TouchEvent');

        if (touchEvent.initTouchEvent.length == 9) {
            touchEvent.initTouchEvent(data.touches, data.targetTouches, data.changedTouches,
                type, data.view, data.screenX, data.screenY, data.clientX, data.clientY);

        } else {
            touchEvent.initTouchEvent(type, data.bubbles, data.cancelable, data.view,
                data.detail, data.screenX, data.screenY, data.pageX, data.pageY, data.ctrlKey,
                data.altKey, data.shiftKey, data.metaKey, data.touches, data.targetTouches,
                data.changedTouches, data.scale, data.rotation);
        }

        return touchEvent;
    },

    createTouch: function(target, options, serializable) {
		if (!document.createTouch || serializable) {
			return {
                pageX: options.pageX,
                pageY: options.pageY,
                clientX: options.pageX,
                clientY: options.pageY,
                screenX: options.pageX,
                screenY: options.pageY,
                identifier: +options.identifier || 0
            };
		}
		
        return document.createTouch(
            document.defaultView,
            target,
            +options.identifier || 0,
            +options.pageX || 0,
            +options.pageY || 0,
            +options.screenX || 0,
            +options.screenY || 0);
    },

    createTouchList: function(data, target, serializable) {
        var touch,
            touches = [];

        if (Ext.isObject(data) && typeof data.target != 'undefined') {
            data = [data];
        }

        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (!serializable && !data[i].target) {
                    data[i].target = target;
                }

                touch = this.createTouch(data[i].target, data[i], serializable);
                touches.push(touch);
            }
        }

		if (!document.createTouchList || serializable) {
			return touches;
		}
		
        return document.createTouchList.apply(document, touches);
    },

    /* Mouse events ======================================================================================= */

    fireMouseEvent: function(type, target, options) {
        var eventData = this.createMouseEventData(type, target, options);

        var event = this.createMouseEvent(type, eventData);
        event.isSimulated = true;
        event.originalTimeStamp = eventData.timeStamp;
        
        return target.dispatchEvent(event);
    },

    createMouseEventData: function(type, target, options, serializable) {
        var mouseEventData = {
            type: type,
            timeStamp: Date.now(),
            bubbles: true, // all mouse events bubble
            cancelable: (type != 'mousemove'), // mousemove is the only event type that can't be cancelled
            detail: 1, // number of mouse clicks must be at least one
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0,
            relatedTarget: null
        }, 
        coordProperties = ['screen', 'client', 'page'],
        coords = {
            x: 0,
            y: 0
        };
        
        if (!serializable) {
            mouseEventData.target = target;
            mouseEventData.view = window;
        }

        if (options) {
            Ext.iterate(mouseEventData, function(key, value) {
                if (options.hasOwnProperty(key)) {
                    mouseEventData[key] = options[key];
                }
            });
        }

        coordProperties.forEach(function(p) {
            if (mouseEventData[p + 'X'] != 0) {
                coords.x = mouseEventData[p + 'X']
            }

            if (mouseEventData[p + 'Y'] != 0) {
                coords.y = mouseEventData[p + 'Y']
            }
        });

        coordProperties.forEach(function(p) {
            if (mouseEventData[p + 'X'] == 0 && coords.x != 0) {
                mouseEventData[p + 'X'] = coords.x;
            }

            if (mouseEventData[p + 'Y'] == 0 && coords.y != 0) {
                mouseEventData[p + 'Y'] = coords.y;
            }
        });

        return mouseEventData;
    },

    createMouseEvent: function(type, data) {
        var mouseEvent = document.createEvent('MouseEvents');

        mouseEvent.initMouseEvent(
            type, data.bubbles, data.cancelable, data.view, data.detail,
            data.screenX, data.screenY, data.clientX, data.clientY,
            data.ctrlKey, data.altKey, data.shiftKey, data.metaKey,
            data.button, data.relatedTarget);

        return mouseEvent;
    }

});