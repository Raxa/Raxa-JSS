/**
 * @private
 */
Ext.define('Ext.scroll.scroller.Abstract', {

    extend: 'Ext.Evented',

    requires: [
        'Ext.scroll.easing.BoundMomentum',
        'Ext.scroll.easing.EaseOut',
        'Ext.util.SizeMonitor'
    ],

    /**
     * @event maxpositionchange
     * Fires whenever the maximum position has changed
     * @param {Ext.scroll.scroller.Abstract} this
     * @param {Number} maxPosition The new maximum position
     */

    /**
     * @event refresh
     * Fires whenever the Scroller is refreshed
     * @param {Ext.scroll.scroller.Abstract} this
     */

    /**
     * @event scrollstart
     * Fires whenever the scrolling is started
     * @param {Ext.scroll.scroller.Abstract} this
     */

    /**
     * @event scrollend
     * Fires whenever the scrolling is ended
     * @param {Ext.scroll.scroller.Abstract} this
     * @param {Object} position The new position object
     */

    /**
     * @event scroll
     * Fires whenever the Scroller is scrolled
     * @param {Ext.scroll.scroller.Abstract} this
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     */

    config: {
        element: null,

        /**
         * @cfg {String} direction
         * Possible values: 'auto', 'vertical', 'horizontal', or 'both'
         * @accessor
         */
        direction: 'auto',

        momentumEasing: {
            momentum: {
                acceleration: 30,
                friction: 0.5
            },

            bounce: {
                acceleration: 30,
                springTension: 0.3
            },

            minVelocity: 0.2
        },

        snapEasing: {
            duration: 400,
            exponent: 4
        },

        outOfBoundRestrictFactor: 0.5,

        startMomentumResetTime: 300,

        fps: 60,

        maxAbsoluteVelocity: 2,

        containerSize: 'auto',

        containerScrollSize: 'auto',

        size: 'auto',

        snap: null,

        snapOffset: {
            x: 0,
            y: 0
        },

        disabled: null,

        autoRefresh: true,

        directionLock: false,

        cls: Ext.baseCSSPrefix + 'scroll-scroller',

        containerCls: Ext.baseCSSPrefix + 'scroll-container'
    },

    dragStartTime: 0,

    dragEndTime: 0,

    activeEasing: null,

    isDragging: false,

    isAnimating: false,

    constructor: function(config) {
        var element = config && config.element;

        this.doAnimationFrame = Ext.Function.bind(this.doAnimationFrame, this);

        this.listeners = {
            scope: this,
            touchstart: 'onTouchStart',
            dragstart : 'onDragStart',
            drag      : 'onDrag',
            dragend   : 'onDragEnd'
        };

        this.minPosition = { x: 0, y: 0 };

        this.startPosition = { x: 0, y: 0 };

        this.size = { x: 0, y: 0 };

        this.position = { x: 0, y: 0 };

        this.velocity = { x: 0, y: 0 };

        this.isAxisEnabledFlags = { x: false, y: false };

        this.activeEasing = { x: null, y: null };

        this.flickStartPosition = { x: 0, y: 0 };

        this.flickStartTime = { x: 0, y: 0 };

        this.lastDragPosition = { x: 0, y: 0 };

        this.dragDirection = { x: 0, y: 0};

        this.initialConfig = config;

        if (element) {
            delete config.element;
            this.initElement(element);
        }

        return this;
    },

    applyElement: function(element) {
        if (!element) {
            return;
        }

        return Ext.get(element);
    },

    updateElement: function(element) {
        this.initialize();

        element.addCls(this.getCls());

        this.onAfterInitialized();

        return this;
    },

    onAfterInitialized: function() {
        if (!this.getDisabled()) {
            this.attachListeneners();
        }

        this.onConfigUpdate(['containerSize', 'size'], 'refreshMaxPosition');

        this.on('maxpositionchange', 'snapToBoundary');
        this.on('minpositionchange', 'snapToBoundary');
    },

    attachListeneners: function() {
        this.getContainer().on(this.listeners);
    },

    detachListeners: function() {
        this.getContainer().un(this.listeners);
    },

    updateDisabled: function(disabled) {
        if (disabled) {
            this.detachListeners();
        }
        else {
            this.attachListeneners();
        }
    },

    updateFps: function(fps) {
        this.animationInterval = 1000 / fps;
    },

    applyDirection: function(direction) {
        var minPosition = this.getMinPosition(),
            maxPosition = this.getMaxPosition(),
            isHorizontal, isVertical;

        this.givenDirection = direction;

        if (direction === 'auto') {
            isHorizontal = maxPosition.x > minPosition.x;
            isVertical = maxPosition.y > minPosition.y;

            if (isHorizontal && isVertical) {
                direction = 'both';
            }
            else if (isHorizontal) {
                direction = 'horizontal';
            }
            else {
                direction = 'vertical';
            }
        }

        return direction;
    },

    updateDirection: function(direction) {
        var isAxisEnabled = this.isAxisEnabledFlags;

        isAxisEnabled.x = (direction === 'both' || direction === 'horizontal');
        isAxisEnabled.y = (direction === 'both' || direction === 'vertical');
    },

    isAxisEnabled: function(axis) {
        this.getDirection();

        return this.isAxisEnabledFlags[axis];
    },

    applyMomentumEasing: function(easing) {
        var defaultEasingClass = Ext.scroll.easing.BoundMomentum;

        if (!(easing instanceof Ext.scroll.easing.Easing)) {
            return {
                x: new defaultEasingClass(easing),
                y: new defaultEasingClass(easing)
            };
        }

        return {
            x: easing,
            y: easing.clone()
        };
    },

    applySnapEasing: function(easing) {
        var defaultEasingClass = Ext.scroll.easing.EaseOut;

        if (!(easing instanceof Ext.scroll.easing.Easing)) {
            return {
                x: new defaultEasingClass(easing),
                y: new defaultEasingClass(easing)
            };
        }

        return {
            x: easing,
            y: easing.clone()
        };
    },

    getMinPosition: function() {
        var minPosition = this.minPosition;

        if (!minPosition) {
            this.minPosition = minPosition = {
                x: 0,
                y: 0
            };

            this.fireEvent('minpositionchange', this, minPosition);
        }

        return minPosition;
    },

    getMaxPosition: function() {
        var maxPosition = this.maxPosition,
            size, containerSize;

        if (!maxPosition) {
            size = this.getSize();
            containerSize = this.getContainerSize();

            this.maxPosition = maxPosition = {
                x: Math.max(0, size.x - containerSize.x),
                y: Math.max(0, size.y - containerSize.y)
            };

            this.fireEvent('maxpositionchange', this, maxPosition);
        }

        return maxPosition;
    },

    refreshMaxPosition: function() {
        this.maxPosition = null;
        this.getMaxPosition();
    },

    applyContainerSize: function(size) {
        var containerDom, x, y;

        this.givenContainerSize = size;

        if (size === 'auto') {
            containerDom = this.getContainer().dom;

            x = containerDom.offsetWidth;
            y = containerDom.offsetHeight;
        }
        else {
            x = size.x;
            y = size.y;
        }

        return {
            x: x,
            y: y
        };
    },

    applySize: function(size) {
        var dom, x, y;

        this.givenSize = size;

        if (size === 'auto') {
            dom = this.getElement().dom;

            x = dom.offsetWidth;
            y = dom.offsetHeight;
        }
        else {
            x = size.x;
            y = size.y;
        }

        return {
            x: x,
            y: y
        };
    },

    applyContainerScrollSize: function(size) {
        var containerDom, x, y;

        this.givenContainerScrollSize = size;

        if (size === 'auto') {
            containerDom = this.getContainer().dom;

            x = containerDom.scrollWidth;
            y = containerDom.scrollHeight;
        }
        else {
            x = size.x;
            y = size.y;
        }

        return {
            x: x,
            y: y
        };
    },

    getContainer: function() {
        var container = this.container;

        if (!container) {
            container = this.container = this.getElement().getParent();
            container.addCls(this.getContainerCls());
        }

        return container;
    },

    updateAutoRefresh: function(autoRefresh) {
        var SizeMonitor = Ext.util.SizeMonitor;

        if (autoRefresh) {
            this.sizeMonitors = {
                element: new SizeMonitor({
                    element: this.getElement(),
                    callback: this.doRefresh,
                    scope: this
                }),
                container: new SizeMonitor({
                    element: this.getContainer(),
                    callback: this.doRefresh,
                    scope: this
                })
            };
        }
    },

    doRefresh: function() {
        this.stopAnimation();

        this.setSize(this.givenSize);
        this.setContainerSize(this.givenContainerSize);
        this.setContainerScrollSize(this.givenContainerScrollSize);
        this.setDirection(this.givenDirection);

        this.fireEvent('refresh', this);
    },

    refresh: function() {
        var sizeMonitors = this.sizeMonitors;

        if (sizeMonitors) {
            sizeMonitors.element.refresh();
            sizeMonitors.container.refresh();
        }

        this.doRefresh();
    },

    scrollTo: function(x, y) {
        //<deprecated product=touch since=2.0>
        if (typeof x != 'number' && arguments.length === 1) {
            y = x.y;
            x = x.x;
        }
        //</deprecated>

        var position = this.position,
            positionChanged = false,
            actualX = null,
            actualY = null;

        if (this.isAxisEnabled('x')) {
            if (typeof x != 'number') {
                x = position.x;
            }
            else {
                if (position.x !== x) {
                    position.x = x;
                    positionChanged = true;
                }
            }

            actualX = x;
        }

        if (this.isAxisEnabled('y')) {
            if (typeof y != 'number') {
                y = position.y;
            }
            else {
                if (position.y !== y) {
                    position.y = y;
                    positionChanged = true;
                }
            }

            actualY = y;
        }

        if (positionChanged) {
            this.fireEvent('scroll', this, position.x, position.y);
            this.doScrollTo(actualX, actualY);
        }

        return this;
    },

    doScrollTo: function(x, y) {
        var containerDom = this.getContainer().dom;

        if (x !== null) {
            containerDom.scrollLeft = x;
        }

        if (y !== null) {
            containerDom.scrollTop = y;
        }
    },

    onTouchStart: function() {
        this.stopAnimation();
    },

    onDragStart: function(e) {
        var direction = this.getDirection(),
            absDeltaX = e.absDeltaX,
            absDeltaY = e.absDeltaY,
            directionLock = this.getDirectionLock(),
            startPosition = this.startPosition,
            flickStartPosition = this.flickStartPosition,
            flickStartTime = this.flickStartTime,
            lastDragPosition = this.lastDragPosition,
            currentPosition = this.position,
            dragDirection = this.dragDirection,
            x = currentPosition.x,
            y = currentPosition.y,
            now = Ext.Date.now();

        this.isDragging = true;

        if (directionLock && direction !== 'both') {
            if ((direction === 'horizontal' && absDeltaX > absDeltaY)
                || (direction === 'vertical' && absDeltaY > absDeltaX)) {
                e.stopPropagation();
            }
            else {
                this.isDragging = false;
                return;
            }
        }

        this.stopAnimation(true);

        lastDragPosition.x = x;
        lastDragPosition.y = y;

        flickStartPosition.x = x;
        flickStartPosition.y = y;

        startPosition.x = x;
        startPosition.y = y;

        flickStartTime.x = now;
        flickStartTime.y = now;

        dragDirection.x = 0;
        dragDirection.y = 0;

        this.dragStartTime = now;

        this.isDragging = true;

        this.fireEvent('scrollstart', this);
    },

    onAxisDrag: function(axis, delta) {
        if (!this.isAxisEnabled(axis)) {
            return;
        }

        var flickStartPosition = this.flickStartPosition,
            flickStartTime = this.flickStartTime,
            lastDragPosition = this.lastDragPosition,
            dragDirection = this.dragDirection,
            old = this.position[axis],
            min = this.getMinPosition()[axis],
            max = this.getMaxPosition()[axis],
            start = this.startPosition[axis],
            last = lastDragPosition[axis],
            current = start - delta,
            lastDirection = dragDirection[axis],
            restrictFactor = this.getOutOfBoundRestrictFactor(),
            startMomentumResetTime = this.getStartMomentumResetTime(),
            now = Ext.Date.now(),
            distance;

        if (current < min) {
            current *= restrictFactor;
        }
        else if (current > max) {
            distance = current - max;
            current = max + distance * restrictFactor;
        }

        if (current > last) {
            dragDirection[axis] = 1;
        }
        else if (current < last) {
            dragDirection[axis] = -1;
        }

        if ((lastDirection !== 0 && (dragDirection[axis] !== lastDirection)) || (now - flickStartTime[axis]) > startMomentumResetTime) {
            flickStartPosition[axis] = old;
            flickStartTime[axis] = now;
        }

        lastDragPosition[axis] = current;
    },

    onDrag: function(e) {
        if (!this.isDragging) {
            return;
        }

        var lastDragPosition = this.lastDragPosition;

        this.onAxisDrag('x', e.deltaX);
        this.onAxisDrag('y', e.deltaY);

        this.scrollTo(lastDragPosition.x, lastDragPosition.y);
    },

    onDragEnd: function(e) {
        var animationX, animationY;

        if (!this.isDragging) {
            return;
        }

        this.dragEndTime = Ext.Date.now();

        this.onDrag(e);

        this.isDragging = false;

        animationX = this.prepareAnimation('x');
        animationY = this.prepareAnimation('y');

        if (!(animationX === false || animationY === false)) {
            this.isScrolling = true;
        }

        this.startAnimation();
    },

    prepareAnimation: function(axis) {
        if (!this.isAxisEnabled(axis)) {
            return this;
        }

        var currentPosition = this.position[axis],
            flickStartPosition = this.flickStartPosition[axis],
            flickStartTime = this.flickStartTime[axis],
            minPosition = this.getMinPosition()[axis],
            maxPosition = this.getMaxPosition()[axis],
            maxAbsVelocity = this.getMaxAbsoluteVelocity(),
            boundValue = null,
            easing, velocity, duration;

        if (currentPosition < minPosition) {
            boundValue = minPosition;
        }
        else if (currentPosition > maxPosition) {
            boundValue = maxPosition;
        }

        // Out of bound, to be pulled back
        if (boundValue !== null) {
            easing = this.getSnapEasing()[axis];
            easing.setConfig({
                startTime: this.dragEndTime,
                startValue: currentPosition,
                endValue: boundValue
            });
        }
        // Still within boundary, start deceleration
        else {
            duration = this.dragEndTime - flickStartTime;

            if (duration === 0) {
                return false;
            }

            velocity = (currentPosition - flickStartPosition) / (this.dragEndTime - flickStartTime);

            if (velocity === 0) {
                return;
            }

            if (velocity < -maxAbsVelocity) {
                velocity = -maxAbsVelocity;
            }
            else if (velocity > maxAbsVelocity) {
                velocity = maxAbsVelocity;
            }

            easing = this.getMomentumEasing()[axis];
            easing.setConfig({
                startTime: this.dragEndTime,
                startValue: currentPosition,
                startVelocity: velocity,
                minMomentumValue: 0,
                maxMomentumValue: maxPosition
            });
        }

        this.activeEasing[axis] = easing;

        return this;
    },

    prepareSnapAnimation: function(axis) {
        if (!this.isAxisEnabled(axis)) {
            return false;
        }

        var currentPosition = this.position[axis],
            containerSize = this.getContainerSize()[axis],
            containerScrollSize = this.getContainerScrollSize()[axis],
            snap = this.getSnap(),
            offset = this.getSnapOffset()[axis],
            easing, endValue;

        endValue = Math.round((currentPosition + offset) / snap) * snap;

        //if the currentPosition is less than the containerScrollSize - containerSize (so it is at the end of the list), then use it
        if ((containerScrollSize - containerSize) <= currentPosition) {
            return false;
        }

        easing = this.getSnapEasing()[axis];
        easing.setConfig({
            startTime : Ext.Date.now(),
            startValue: currentPosition,
            endValue  : endValue - offset
        });

        this.activeEasing[axis] = easing;

        return endValue;
    },

    startAnimation: function() {
        this.isAnimating = true;
        this.animationTimer = setInterval(this.doAnimationFrame, this.animationInterval);
        this.doAnimationFrame();
    },

    doAnimationFrame: function() {
        if (!this.isAnimating) {
            return;
        }

        var easing = this.activeEasing,
            easingX = easing.x,
            easingY = easing.y,
            isEasingXEnded = easingX === null || easingX.isEnded,
            isEasingYEnded = easingY === null || easingY.isEnded,
            x = null,
            y = null;

        if (isEasingXEnded && isEasingYEnded) {
            this.stopAnimation();
            return;
        }

        if (!isEasingXEnded) {
            x = easingX.getValue();
        }

        if (!isEasingYEnded) {
            y = easingY.getValue();
        }

        this.scrollTo(x, y);
    },

    stopAnimation: function(isOnTouchStart) {
        if (!this.isAnimating) {
            return;
        }

        var activeEasing = this.activeEasing;

        activeEasing.x = null;
        activeEasing.y = null;

        this.isAnimating = false;

        clearInterval(this.animationTimer);

        this.snapToBoundary();

        if (!isOnTouchStart) {
            if (this.onScrollEnd()) {
                this.fireEvent('scrollend', this, this.position);
            }
        }

        this.isScrolling = false;
    },

    scrollToAnimated: function(x, y) {
        var currentPosition = this.position,
            easingX, easingY;

        easingX = this.getSnapEasing().x;
        easingX.setConfig({
            startTime : Ext.Date.now(),
            startValue: currentPosition.x,
            endValue  : x
        });

        easingY = this.getSnapEasing().y;
        easingY.setConfig({
            startTime : Ext.Date.now(),
            startValue: currentPosition.y,
            endValue  : y
        });

        this.activeEasing.x = easingX;
        this.activeEasing.y = easingY;

        this.startAnimation();
    },

    /**
     * Scrolls to the end of the scrollable view
     */
    scrollToEnd: function() {
        this.scrollTo(0, this.getSize().y - this.getContainerSize().y);
    },

    /**
     * Scrolls to the end of the scrollable view, animated.
     */
    scrollToEndAnimated: function() {
        this.scrollToAnimated(0, this.getSize().y - this.getContainerSize().y);
    },

    onScrollEnd: function() {
        if (this.isSnapping) {
            this.isSnapping = false;
            return true;
        }

        // Check the current position and calculate the snapping position
        var snap = this.getSnap(),
            snapX, snapY;

        if (!snap) {
            return true;
        }

        snapX = this.prepareSnapAnimation('x');
        snapY = this.prepareSnapAnimation('y');

        if ((snapX || snapY) && snap && snap > 0) {
            this.isSnapping = true;

            this.startAnimation();

            return false;
        }

        return true;
    },

    snapValueForAxis: function(value, axis) {
        var snap = this.getSnap(),
            offset = this.getSnapOffset()[axis];

        value = Math.round((value + offset) / snap) * snap;

        return value;
    },

    snapToBoundary: function() {
        var position    = this.position,
            minPosition = this.getMinPosition(),
            maxPosition = this.getMaxPosition(),
            minX = minPosition.x,
            minY = minPosition.y,
            maxX = maxPosition.x,
            maxY = maxPosition.y,
            x = position.x,
            y = position.y;

        if (x < minX) {
            x = minX;
        }
        else if (x > maxX) {
            x = maxX;
        }

        if (y < minY) {
            y = minY;
        }
        else if (y > maxY) {
            y = maxY;
        }

        this.scrollTo(x, y);
    },

    destroy: function() {
        var element = this.getElement(),
            sizeMonitors = this.sizeMonitors;

        if (sizeMonitors) {
            sizeMonitors.element.destroy();
            sizeMonitors.container.destroy();
        }

        if (element) {
            element.removeCls(this.getCls());
            this.getContainer().removeCls(this.getContainerCls());
        }

        this.callParent(arguments);
    }

}, function() {
    //<deprecated product=touch since=2.0>

    this.override({
        constructor: function(config) {
            var acceleration, friction, springTension, minVelocity;

            if (config.hasOwnProperty('acceleration')) {
                acceleration = config.acceleration;
                delete config.acceleration;
                //<debug warn>
                Ext.Logger.deprecate("'acceleration' config is deprecated, set momentumEasing.momentum.acceleration and momentumEasing.bounce.acceleration configs instead");
                //</debug>

                Ext.merge(config, {
                    momentumEasing: {
                        momentum: { acceleration: acceleration },
                        bounce: { acceleration: acceleration }
                    }
                });
            }

            if (config.hasOwnProperty('friction')) {
                friction = config.friction;
                delete config.friction;
                //<debug warn>
                Ext.Logger.deprecate("'friction' config is deprecated, set momentumEasing.momentum.friction config instead");
                //</debug>

                Ext.merge(config, {
                    momentumEasing: {
                        momentum: { friction: friction }
                    }
                });
            }

            if (config.hasOwnProperty('springTension')) {
                springTension = config.springTension;
                delete config.springTension;
                //<debug warn>
                Ext.Logger.deprecate("'springTension' config is deprecated, set momentumEasing.momentum.springTension config instead");
                //</debug>

                Ext.merge(config, {
                    momentumEasing: {
                        momentum: { springTension: springTension }
                    }
                });
            }

            if (config.hasOwnProperty('minVelocityForAnimation')) {
                minVelocity = config.minVelocityForAnimation;
                delete config.minVelocityForAnimation;
                //<debug warn>
                Ext.Logger.deprecate("'minVelocityForAnimation' config is deprecated, set momentumEasing.minVelocity config instead");
                //</debug>

                Ext.merge(config, {
                    momentumEasing: {
                        minVelocity: minVelocity
                    }
                });
            }

            this.callOverridden(arguments);
        },

        updateBoundary: function() {
            //<debug warn>
            Ext.Logger.deprecate("updateBoundary() is deprecated, use refresh() instead");
            //</debug>
            return this.refresh();
        },

        scrollBy: function(offset) {
            var position = this.position;

            return this.scrollTo(position.x + offset.x, position.y + offset.y);
        },

        setOffset: function(offset) {
            return this.scrollTo(-offset.x, -offset.y);
        },

        //TODO
        snapToSlot: function() {

        }
    });

    //</deprecated>
});
