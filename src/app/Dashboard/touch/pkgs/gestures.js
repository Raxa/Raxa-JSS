Ext.gesture.Manager = new Ext.AbstractManager({
    eventNames: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    },

    defaultPreventedMouseEvents: ['click'],

    clickMoveThreshold: 5,

    init: function() {
        this.targets = [];

        this.followTouches = [];
        this.currentGestures = [];
        this.currentTargets = [];

        if (!Ext.supports.Touch) {
            Ext.apply(this.eventNames, {
                start: 'mousedown',
                move: 'mousemove',
                end: 'mouseup'
            });
        }

        this.listenerWrappers = {
            start: Ext.createDelegate(this.onTouchStart, this),
            move: Ext.createDelegate(this.onTouchMove, this),
            end: Ext.createDelegate(this.onTouchEnd, this),
            mouse: Ext.createDelegate(this.onMouseEvent, this)
        };

        this.attachListeners();
    },

    freeze: function() {
        this.isFrozen = true;
    },

    thaw: function() {
        this.isFrozen = false;
    },

    getEventSimulator: function() {
        if (!this.eventSimulator) {
            this.eventSimulator = new Ext.util.EventSimulator();
        }

        return this.eventSimulator;
    },

    attachListeners: function() {
        Ext.iterate(this.eventNames, function(key, name) {
            document.addEventListener(name, this.listenerWrappers[key], false);
        }, this);

        if (Ext.supports.Touch) {
            this.defaultPreventedMouseEvents.forEach(function(name) {
                document.addEventListener(name, this.listenerWrappers['mouse'], true);
            }, this);
        }
    },

    detachListeners: function() {
        Ext.iterate(this.eventNames, function(key, name) {
            document.removeEventListener(name, this.listenerWrappers[key], false);
        }, this);

        if (Ext.supports.Touch) {
            this.defaultPreventedMouseEvents.forEach(function(name) {
                document.removeEventListener(name, this.listenerWrappers['mouse'], true);
            }, this);
        }
    },

    onMouseEvent: function(e) {
        if (!e.isSimulated) {
            e.preventDefault();
            e.stopPropagation();
        }
    },

    onTouchStart: function(e) {
        var targets = [],
            target = e.target;

        if (e.stopped === true) {
            return;
        }

        if (Ext.is.Android) {
            if (!(target.tagName && ['input', 'textarea', 'select'].indexOf(target.tagName.toLowerCase()) !== -1)) {
                e.preventDefault();
            }
        }

        if (this.isFrozen) {
            return;
        }

        // There's already a touchstart without any touchend!
        // This used to happen on HTC Desire and HTC Incredible
        // We have to clean it up
        if (this.startEvent) {
            this.onTouchEnd(e);
        }

        this.locks = {};

        this.currentTargets = [target];

        while (target) {
            if (this.targets.indexOf(target) !== -1) {
                targets.unshift(target);
            }

            target = target.parentNode;
            this.currentTargets.push(target);
        }

        this.startEvent = e;
        this.startPoint = Ext.util.Point.fromEvent(e);
        this.lastMovePoint = null;
        this.isClick = true;
        this.handleTargets(targets, e);
    },

    onTouchMove: function(e) {
        if (Ext.is.MultiTouch) {
            e.preventDefault();
        }

        if (!this.startEvent) {
            return;
        }

        if (Ext.is.Desktop) {
            e.target = this.startEvent.target;
        }

        if (this.isFrozen) {
            return;
        }

        var gestures = this.currentGestures,
            gesture,
            touch = e.changedTouches ? e.changedTouches[0] : e;

        this.lastMovePoint = Ext.util.Point.fromEvent(e);

        if (Ext.supports.Touch && this.isClick && !this.lastMovePoint.isWithin(this.startPoint, this.clickMoveThreshold)) {
            this.isClick = false;
        }

        for (var i = 0; i < gestures.length; i++) {
            if (e.stopped) {
                break;
            }

            gesture = gestures[i];

            if (gesture.listenForMove) {
                gesture.onTouchMove(e, touch);
            }
        }
    },

    // This listener is here to always ensure we stop all current gestures
    onTouchEnd: function(e) {
        if (Ext.is.Blackberry) {
            e.preventDefault();
        }

        if (this.isFrozen) {
            return;
        }

        var gestures = this.currentGestures.slice(0),
            ln = gestures.length,
            i, gesture, endPoint,
            needsAnotherMove = false,
            touch = e.changedTouches ? e.changedTouches[0] : e;

        if (this.startPoint) {
            endPoint = Ext.util.Point.fromEvent(e);
            if (!(this.lastMovePoint || this.startPoint)['equals'](endPoint)) {
                needsAnotherMove = true;
            }
        }

        for (i = 0; i < ln; i++) {
            gesture = gestures[i];

            if (!e.stopped && gesture.listenForEnd) {
                // The point has changed, we should execute another onTouchMove before onTouchEnd
                // to deal with the problem of missing events on Androids and alike
                // This significantly improves scrolling experience on Androids!
                if (needsAnotherMove) {
                    gesture.onTouchMove(e, touch);
                }

                gesture.onTouchEnd(e, touch);
            }

            this.stopGesture(gesture);
        }


        if (Ext.supports.Touch && this.isClick) {
            this.isClick = false;
            this.getEventSimulator().fire('click', this.startEvent.target, touch);
        }

        this.lastMovePoint = null;
        this.followTouches = [];
        this.startedChangedTouch = false;
        this.currentTargets = [];
        this.startEvent = null;
        this.startPoint = null;
    },

    handleTargets: function(targets, e) {
        // In handle targets we have to first handle all the capture targets,
        // then all the bubble targets.
        var ln = targets.length,
            i;

        this.startedChangedTouch = false;
        this.startedTouches = Ext.supports.Touch ? e.touches : [e];

        for (i = 0; i < ln; i++) {
            if (e.stopped) {
                break;
            }

            this.handleTarget(targets[i], e, true);
        }

        for (i = ln - 1; i >= 0; i--) {
            if (e.stopped) {
                break;
            }

            this.handleTarget(targets[i], e, false);
        }

        if (this.startedChangedTouch) {
            this.followTouches = this.followTouches.concat((Ext.supports.Touch && e.targetTouches) ? Ext.toArray(e.targetTouches) : [e]);
        }
    },

    handleTarget: function(target, e, capture) {
        var gestures = Ext.Element.data(target, 'x-gestures') || [],
            ln = gestures.length,
            i, gesture;

        for (i = 0; i < ln; i++) {
            gesture = gestures[i];
            if (
                (!!gesture.capture === !!capture) &&
                (this.followTouches.length < gesture.touches) &&
                ((Ext.supports.Touch && e.targetTouches) ? (e.targetTouches.length === gesture.touches) : true)
            ) {
                this.startedChangedTouch = true;
                this.startGesture(gesture);

                if (gesture.listenForStart) {
                    gesture.onTouchStart(e, e.changedTouches ? e.changedTouches[0] : e);
                }

                if (e.stopped) {
                    break;
                }
            }
        }
    },

    startGesture: function(gesture) {
        gesture.started = true;
        this.currentGestures.push(gesture);
    },

    stopGesture: function(gesture) {
        gesture.started = false;
        this.currentGestures.remove(gesture);
    },

    addEventListener: function(target, eventName, listener, options) {
        target = Ext.getDom(target);
        options = options || {};

        var targets = this.targets,
            name = this.getGestureName(eventName),
            gestures = Ext.Element.data(target, 'x-gestures'),
            gesture;

        if (!gestures) {
            gestures = [];
            Ext.Element.data(target, 'x-gestures', gestures);
        }

        // <debug>
        if (!name) {
            throw new Error('Trying to subscribe to unknown event ' + eventName);
        }
        // </debug>

        if (targets.indexOf(target) === -1) {
            this.targets.push(target);
        }

        gesture = this.get(target.id + '-' + name);

        if (!gesture) {
            gesture = this.create(Ext.apply({}, options, {
                target: target,
                type: name
            }));

            gestures.push(gesture);
            // The line below is not needed, Ext.Element.data(target, 'x-gestures') still reference gestures
            // Ext.Element.data(target, 'x-gestures', gestures);
        }

        gesture.addListener(eventName, listener);

        // If there is already a finger down, then instantly start the gesture
        if (this.startedChangedTouch && this.currentTargets.contains(target) && !gesture.started && !options.subsequent) {
            this.startGesture(gesture);
            if (gesture.listenForStart) {
                gesture.onTouchStart(this.startEvent, this.startedTouches[0]);
            }
        }
    },

    removeEventListener: function(target, eventName, listener) {
        target = Ext.getDom(target);

        var name = this.getGestureName(eventName),
            gestures = Ext.Element.data(target, 'x-gestures') || [],
            gesture;

        gesture = this.get(target.id + '-' + name);

        if (gesture) {
            gesture.removeListener(eventName, listener);

            for (name in gesture.listeners) {
                return;
            }

            gesture.destroy();
            gestures.remove(gesture);
            Ext.Element.data(target, 'x-gestures', gestures);
        }
    },

    getGestureName: function(ename) {
        return this.names && this.names[ename];
    },

    registerType: function(type, cls) {
        var handles = cls.prototype.handles,
            i, ln;

        this.types[type] = cls;

        cls[this.typeName] = type;

        if (!handles) {
            handles = cls.prototype.handles = [type];
        }

        this.names = this.names || {};

        for (i = 0, ln = handles.length; i < ln; i++) {
            this.names[handles[i]] = type;
        }
    }
});

Ext.regGesture = function() {
    return Ext.gesture.Manager.registerType.apply(Ext.gesture.Manager, arguments);
};
Ext.TouchEventObjectImpl = Ext.extend(Object, {
    constructor : function(e, args) {
        if (e) {
            this.setEvent(e, args);
        }
    },

    setEvent : function(e, args) {
        Ext.apply(this, {
            event: e,
            time: e.timeStamp
        });

        this.touches = e.touches || [e];
        this.changedTouches = e.changedTouches || [e];
        this.targetTouches = e.targetTouches || [e];
        
        if (args) {
            this.target = args.target;
            Ext.apply(this, args);
        }
        else {
            this.target = e.target;
        }
        return this;
    },

    stopEvent : function() {
        this.stopPropagation();
        this.preventDefault();
    },

    stopPropagation : function() {
        this.event.stopped = true;
    },

    preventDefault : function() {
        this.event.preventDefault();
    },

    getTarget : function(selector, maxDepth, returnEl) {
        if (selector) {
            return Ext.fly(this.target).findParent(selector, maxDepth, returnEl);
        }
        else {
            return returnEl ? Ext.get(this.target) : this.target;
        }
    }
});

Ext.TouchEventObject = new Ext.TouchEventObjectImpl();
Ext.gesture.Gesture = Ext.extend(Object, {    
    listenForStart: true,
    listenForEnd: true,
    listenForMove: true,
    
    disableLocking: false,
    
    touches: 1,
    
    constructor: function(config) {
        config = config || {};
        Ext.apply(this, config);
        
        this.target = Ext.getDom(this.target);
        this.listeners = {};
        
        // <debug>
        if (!this.target) {
            throw new Error('Trying to bind a ' + this.type + ' event to element that does\'nt exist: ' + this.target);
        }
        // </debug>
        
        this.id = this.target.id + '-' + this.type;
        
        Ext.gesture.Gesture.superclass.constructor.call(this);
        Ext.gesture.Manager.register(this);
    },
    
    addListener: function(name, listener) {
        this.listeners[name] = this.listeners[name] || [];
        this.listeners[name].push(listener);
    },
    
    removeListener: function(name, listener) {
        var listeners = this.listeners[name];
            
        if (listeners) {
            listeners.remove(listener);

            if (listeners.length == 0) {
                delete this.listeners[name];
            }

            for (name in this.listeners) {
                if (this.listeners.hasOwnProperty(name)) {
                    return;
                }
            }
            
            this.listeners = {};
        }
    },
    
    fire: function(type, e, args) {
        var listeners = this.listeners && this.listeners[type],
            ln = listeners && listeners.length,
            i;

        if (!this.disableLocking && this.isLocked(type)) {
            return false;
        }
        
        if (ln) {
            args = Ext.apply(args || {}, {
                time: e.timeStamp,
                type: type,
                gesture: this,
                target: (e.target.nodeType == 3) ? e.target.parentNode: e.target
            });
            
            for (i = 0; i < ln; i++) {
                listeners[i](e, args);
            }
        }
        
        return true;
    },
    
    stop: function() {
        Ext.gesture.Manager.stopGesture(this);
    },
    
    lock: function() {
        if (!this.disableLocking) {
            var args = arguments,
                ln = args.length,
                i;

            for (i = 0; i < ln; i++) {
                Ext.gesture.Manager.locks[args[i]] = this.id;
            }            
        }
    },
    
    unlock: function() {
        if (!this.disableLocking) {
            var args = arguments,
                ln = args.length,
                i;

            for (i = 0; i < ln; i++) {
                if (Ext.gesture.Manager.locks[args[i]] == this.id) {
                    delete Ext.gesture.Manager.locks[args[i]]; 
                }
            }            
        }
    },
    
    isLocked : function(type) {
        var lock = Ext.gesture.Manager.locks[type];
        return !!(lock && lock !== this.id);
    },
    
    getLockingGesture : function(type) {
        var lock = Ext.gesture.Manager.locks[type];
        if (lock) {
            return Ext.gesture.Manager.get(lock) || null;
        }
        return null;
    },
    
    onTouchStart: Ext.emptyFn,
    onTouchMove: Ext.emptyFn,
    onTouchEnd: Ext.emptyFn,
    
    destroy: function() {
        this.stop();
        this.listeners = null;
        Ext.gesture.Manager.unregister(this);
    }
});
Ext.gesture.Touch = Ext.extend(Ext.gesture.Gesture, {
    handles: ['touchstart', 'touchmove', 'touchend', 'touchdown'],
    
    touchDownInterval: 500,
    
    onTouchStart: function(e, touch) {
        this.startX = this.previousX = touch.pageX;
        this.startY = this.previousY = touch.pageY;
        this.startTime = this.previousTime = e.timeStamp;

        this.fire('touchstart', e);
        this.lastEvent = e;
        
        if (this.listeners && this.listeners.touchdown) {
            this.touchDownIntervalId = setInterval(Ext.createDelegate(this.touchDownHandler, this), this.touchDownInterval);
        }
    },
    
    onTouchMove: function(e, touch) {
        this.fire('touchmove', e, this.getInfo(touch));
        this.lastEvent = e;
    },
    
    onTouchEnd: function(e) {
        this.fire('touchend', e, this.lastInfo);
        clearInterval(this.touchDownIntervalId);
    },
    
    touchDownHandler : function() {
        this.fire('touchdown', this.lastEvent, this.lastInfo);
    },
    
    getInfo : function(touch) {
        var time = Date.now(),
            deltaX = touch.pageX - this.startX,
            deltaY = touch.pageY - this.startY,
            info = {
                startX: this.startX,
                startY: this.startY,
                previousX: this.previousX,
                previousY: this.previousY,
                pageX: touch.pageX,
                pageY: touch.pageY,
                deltaX: deltaX,
                deltaY: deltaY,
                absDeltaX: Math.abs(deltaX),
                absDeltaY: Math.abs(deltaY),
                previousDeltaX: touch.pageX - this.previousX,
                previousDeltaY: touch.pageY - this.previousY,
                time: time,
                startTime: this.startTime,
                previousTime: this.previousTime,
                deltaTime: time - this.startTime,
                previousDeltaTime: time - this.previousTime
            };
        
        this.previousTime = info.time;
        this.previousX = info.pageX;
        this.previousY = info.pageY;
        this.lastInfo = info;
        
        return info;
    }
});

Ext.regGesture('touch', Ext.gesture.Touch);
Ext.gesture.Tap = Ext.extend(Ext.gesture.Gesture, {
    handles: [
        'tapstart',
        'tapcancel',
        'tap', 
        'doubletap', 
        'taphold',
        'singletap'
    ],
    
    cancelThreshold: 10,
    
    doubleTapThreshold: 800,

    singleTapThreshold: 400,

    holdThreshold: 1000,

    fireClickEvent: false,
    
    onTouchStart : function(e, touch) {
        var me = this;
        
        me.startX = touch.pageX;
        me.startY = touch.pageY;
        me.fire('tapstart', e, me.getInfo(touch));
        
        if (this.listeners.taphold) {    
            me.timeout = setTimeout(function() {
                me.fire('taphold', e, me.getInfo(touch));
                delete me.timeout;
            }, me.holdThreshold);            
        }
        
        me.lastTouch = touch;
    },
    
    onTouchMove : function(e, touch) {
        var me = this;
        if (me.isCancel(touch)) {
            me.fire('tapcancel', e, me.getInfo(touch));
            if (me.timeout) {
                clearTimeout(me.timeout);
                delete me.timeout;
            }
            me.stop();
        }
        
        me.lastTouch = touch;
    },
    
    onTouchEnd : function(e) {
        var me = this,
            info = me.getInfo(me.lastTouch);
        
        this.fireTapEvent(e, info);
        
        if (me.lastTapTime && e.timeStamp - me.lastTapTime <= me.doubleTapThreshold) {
            me.lastTapTime = null;
            e.preventDefault();
            me.fire('doubletap', e, info);
        }
        else {
            me.lastTapTime = e.timeStamp;
        }

        if (me.listeners && me.listeners.singletap && me.singleTapThreshold && !me.preventSingleTap) {
            me.fire('singletap', e, info);
            me.preventSingleTap = true;
            setTimeout(function() {
                me.preventSingleTap = false;
            }, me.singleTapThreshold);
        }
        
        if (me.timeout) {
            clearTimeout(me.timeout);
            delete me.timeout;
        }
    },

    fireTapEvent: function(e, info) {
        this.fire('tap', e, info);
        
        if (e.event)
            e = e.event;

        var target = (e.changedTouches ? e.changedTouches[0] : e).target;

        if (!target.disabled && this.fireClickEvent) {
            var clickEvent = document.createEvent("MouseEvent");
                clickEvent.initMouseEvent('click', e.bubbles, e.cancelable, document.defaultView, e.detail, e.screenX, e.screenY, e.clientX,
                                         e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.metaKey, e.button, e.relatedTarget);
                clickEvent.isSimulated = true;


            target.dispatchEvent(clickEvent);
        }
    },
    
    getInfo : function(touch) {
        var x = touch.pageX,
            y = touch.pageY;
            
        return {
            pageX: x,
            pageY: y,
            startX: x,
            startY: y
        };
    },
    
    isCancel : function(touch) {
        var me = this;
        return (
            Math.abs(touch.pageX - me.startX) >= me.cancelThreshold ||
            Math.abs(touch.pageY - me.startY) >= me.cancelThreshold
        );
    }
});
Ext.regGesture('tap', Ext.gesture.Tap);
Ext.gesture.Swipe = Ext.extend(Ext.gesture.Gesture, {    
    listenForEnd: false,
   
    swipeThreshold: 35,
    swipeTime: 1000,
    
    onTouchStart : function(e, touch) {
        this.startTime = e.timeStamp;
        this.startX = touch.pageX;
        this.startY = touch.pageY;
        this.lock('scroll', 'scrollstart', 'scrollend');
    },
   
    onTouchMove : function(e, touch) {
        var deltaY = touch.pageY - this.startY,
            deltaX = touch.pageX - this.startX,
            absDeltaY = Math.abs(deltaY),
            absDeltaX = Math.abs(deltaX),
            deltaTime = e.timeStamp - this.startTime;

        // If the swipeTime is over, we are not gonna check for it again
        if (absDeltaY - absDeltaX > 3 || deltaTime > this.swipeTime) {
            this.unlock('drag', 'dragstart', 'dragend');
            this.stop();
        }
        else if (absDeltaX > this.swipeThreshold && absDeltaX > absDeltaY) {
           // If this is a swipe, a scroll is not possible anymore
           this.fire('swipe', e, {
               direction: (deltaX < 0) ? 'left' : 'right',
               distance: absDeltaX,
               deltaTime: deltaTime,
               deltaX: deltaX
           });
   
           this.stop();
        }
    }
});
Ext.regGesture('swipe', Ext.gesture.Swipe);
Ext.gesture.Drag = Ext.extend(Ext.gesture.Touch, {
    handles: ['dragstart', 'drag', 'dragend'],

    dragThreshold: 5,

    direction: 'both',

    horizontal: false,
    vertical: false,

    constructor: function() {
        var me = this;
        Ext.gesture.Drag.superclass.constructor.apply(me, arguments);

        if (me.direction == 'both') {
            me.horizontal = true;
            me.vertical = true;
        } else if (me.direction == 'horizontal') {
            me.horizontal = true;
        } else {
            me.vertical = true;
        }

        return me;
    },

    onTouchStart: function(e, touch) {
        var me = this;
        me.startX = me.previousX = touch.pageX;
        me.startY = me.previousY = touch.pageY;
        me.startTime = me.previousTime = e.timeStamp;

        me.dragging = false;
    },

    onTouchMove: function(e, touch) {
        var me = this;
        if (me.isLocked('drag')) {
            return;
        }

        var info = me.getInfo(touch);

        if (!me.dragging) {
            if ((!e.touches || e.touches.length < 2) && me.isDragging(info) && me.fire('dragstart', e, info)) {
                me.dragging = true;
                me.lock('drag', 'dragstart', 'dragend');
                me.fire('drag', e, info);
            }
        } else {
            me.fire('drag', e, info);
        }
    },

    onTouchEnd: function(e) {
        var me = this;
        if (me.dragging) {
            me.fire('dragend', e, me.lastInfo);
        }

        me.dragging = false;
    },

    isDragging: function(info) {
        var me = this;
        return ((me.horizontal && info.absDeltaX >= me.dragThreshold) || (me.vertical && info.absDeltaY >= me.dragThreshold));
    },

    /*
     * Method to determine whether this Sortable is currently disabled.
     * @return {Boolean} the disabled state of this Sortable.
     */
    isVertical: function() {
        return this.vertical;
    },

    /*
     * Method to determine whether this Sortable is currently sorting.
     * @return {Boolean} the sorting state of this Sortable.
     */
    isHorizontal: function() {
        return this.horizontal;
    }
});

Ext.regGesture('drag', Ext.gesture.Drag);
Ext.gesture.Pinch = Ext.extend(Ext.gesture.Gesture, {
    handles: ['pinchstart', 'pinch', 'pinchend'],

    touches: 2,

    onTouchStart: function(e) {
        var me = this;

        if (this.isMultiTouch(e)) {
            me.lock('swipe', 'scroll', 'scrollstart', 'scrollend', 'touchmove', 'touchend', 'touchstart', 'tap', 'tapstart', 'taphold', 'tapcancel', 'doubletap');
            me.pinching = true;

            var targetTouches = e.targetTouches;

            me.startFirstTouch = targetTouches[0];
            me.startSecondTouch = targetTouches[1];

            me.previousDistance = me.startDistance = me.getDistance(me.startFirstTouch, me.startSecondTouch);
            me.previousScale = 1;

            me.fire('pinchstart', e, {
                distance: me.startDistance,
                scale: me.previousScale
            });
        } else if (me.pinching) {
            me.unlock('swipe', 'scroll', 'scrollstart', 'scrollend', 'touchmove', 'touchend', 'touchstart', 'tap', 'tapstart', 'taphold', 'tapcancel', 'doubletap');
            me.pinching = false;
        }
    },

    isMultiTouch: function(e) {
        return e && Ext.supports.Touch && e.targetTouches && e.targetTouches.length > 1;
    },

    onTouchMove: function(e) {
        if (!this.isMultiTouch(e)) {
            this.onTouchEnd(e);
            return;
        }

        if (this.pinching) {
            this.fire('pinch', e, this.getPinchInfo(e));
        }
    },

    onTouchEnd: function(e) {
        if (this.pinching) {
            this.fire('pinchend', e);
        }
    },

    getPinchInfo: function(e) {
        var me = this,
            targetTouches = e.targetTouches,
            firstTouch = targetTouches[0],
            secondTouch = targetTouches[1],
            distance = me.getDistance(firstTouch, secondTouch),
            scale = distance / me.startDistance,
            info = {
            scale: scale,
            deltaScale: scale - 1,
            previousScale: me.previousScale,
            previousDeltaScale: scale - me.previousScale,
            distance: distance,
            deltaDistance: distance - me.startDistance,
            startDistance: me.startDistance,
            previousDistance: me.previousDistance,
            previousDeltaDistance: distance - me.previousDistance,
            firstTouch: firstTouch,
            secondTouch: secondTouch,
            firstPageX: firstTouch.pageX,
            firstPageY: firstTouch.pageY,
            secondPageX: secondTouch.pageX,
            secondPageY: secondTouch.pageY,
            // The midpoint between the touches is (x1 + x2) / 2, (y1 + y2) / 2
            midPointX: (firstTouch.pageX + secondTouch.pageX) / 2,
            midPointY: (firstTouch.pageY + secondTouch.pageY) / 2
        };

        me.previousScale = scale;
        me.previousDistance = distance;

        return info;
    },

    getDistance: function(firstTouch, secondTouch) {
        return Math.sqrt(
        Math.pow(Math.abs(firstTouch.pageX - secondTouch.pageX), 2) + Math.pow(Math.abs(firstTouch.pageY - secondTouch.pageY), 2));
    }
});

Ext.regGesture('pinch', Ext.gesture.Pinch);

