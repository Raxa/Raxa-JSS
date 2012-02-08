/*
 * This is the base scroller implementation.
 *
 * Please look at the {@link Ext.scroll.Scroller} documentation for more information.
 */
Ext.define('Ext.scroll.scroller.Abstract', {

    extend: 'Ext.Evented',

    requires: [
        'Ext.fx.easing.BoundMomentum',
        'Ext.fx.easing.EaseOut',
        'Ext.util.SizeMonitor'
    ],

// Document all members of this class as being part of another class
/**
 * @class Ext.scroll.Scroller
 */

    /**
     * @event maxpositionchange
     * Fires whenever the maximum position has changed
     * @param {Ext.scroll.Scroller} this
     * @param {Number} maxPosition The new maximum position
     */

    /**
     * @event refresh
     * Fires whenever the Scroller is refreshed
     * @param {Ext.scroll.Scroller} this
     */

    /**
     * @event scrollstart
     * Fires whenever the scrolling is started
     * @param {Ext.scroll.Scroller} this
     */

    /**
     * @event scrollend
     * Fires whenever the scrolling is ended
     * @param {Ext.scroll.Scroller} this
     * @param {Object} position The new position object
     */

    /**
     * @event scroll
     * Fires whenever the Scroller is scrolled
     * @param {Ext.scroll.Scroller} this
     * @param {Number} x The new x position
     * @param {Number} y The new y position
     */

    config: {
        /**
         * @cfg {String} direction
         * Possible values: 'auto', 'vertical', 'horizontal', or 'both'
         * @accessor
         */
        direction: 'auto',

        /**
         * @cfg {Number} fps
         * The desired fps of the deceleration.
         * @accessor
         */
        fps: 60,

        /**
         * @cfg {Number} snap
         * The size to snap to vertically.
         * @accessor
         */
        snap: null,

        /**
         * @cfg {Boolean} disabled
         * Whether or not this component is disabled
         * @accessor
         */
        disabled: null,

        /**
         * @cfg {Boolean} directionLock
         * True to lock the direction of the scroller when the user starts scrolling.
         * This is useful when putting a scroller inside a scroller or a {@link Ext.Carousel}.
         * @accessor
         */
        directionLock: false,

        /**
         * @cfg {Object} momentumEasing
         * This is a object configuration which controls the easing propertys for both the momentum of the scroller
         * and the bounce of the scroller.
         *
         * The values are set as properties for momentum and bounce. The default value for {@link #momentumEasing} is:
         *
         *     momentumEasing: {
         *         momentum: {
         *             acceleration: 30,
         *             friction: 0.5
         *         },
         *         bounce: {
         *             acceleration: 30,
         *             springTension: 0.3
         *         }
         *     }
         *
         * When changing these values, you do not have to include everything. The class configuration system will automatically
         * merge your values. So you can do the following:
         *
         *     momentumEasing: {
         *         momentum: {
         *             acceleration: 10
         *         }
         *     }
         *
         * ...and it will still take the scrollers default values.
         * @accessor
         */
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

        /**
         * @cfg
         * @private
         */
        element: null,

        /**
         * @cfg
         * @private
         */
        snapEasing: {
            duration: 400,
            exponent: 4
        },

        /**
         * @cfg
         * @private
         */
        outOfBoundRestrictFactor: 0.5,

        /**
         * @cfg
         * @private
         */
        startMomentumResetTime: 300,

        /**
         * @cfg
         * @private
         */
        maxAbsoluteVelocity: 2,

        /**
         * @cfg
         * @private
         */
        containerSize: 'auto',

        /**
         * @cfg
         * @private
         */
        containerScrollSize: 'auto',

        /**
         * @cfg
         * @private
         */
        size: 'auto',

        /**
         * @cfg
         * @private
         */
        snapOffset: {
            x: 0,
            y: 0
        },

        /**
         * @cfg
         * @private
         */
        autoRefresh: true,

        /**
         * @cfg
         * @private
         */
        cls: Ext.baseCSSPrefix + 'scroll-scroller',

        /**
         * @cfg
         * @private
         */
        containerCls: Ext.baseCSSPrefix + 'scroll-container'
    },

    dragStartTime: 0,

    dragEndTime: 0,

    activeEasing: null,

    isDragging: false,

    isAnimating: false,

    /**
     * @private
     */
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

    /**
     * @private
     */
    applyElement: function(element) {
        if (!element) {
            return;
        }

        return Ext.get(element);
    },

    /**
     * @private
     */
    updateElement: function(element) {
        this.initialize();

        element.addCls(this.getCls());

        this.onAfterInitialized();

        return this;
    },

    /**
     * @private
     */
    onAfterInitialized: function() {
        if (!this.getDisabled()) {
            this.attachListeneners();
        }

        this.onConfigUpdate(['containerSize', 'size'], 'refreshMaxPosition');

        this.on('maxpositionchange', 'snapToBoundary');
        this.on('minpositionchange', 'snapToBoundary');
    },

    /**
     * @private
     */
    attachListeneners: function() {
        this.getContainer().on(this.listeners);
    },

    /**
     * @private
     */
    detachListeners: function() {
        this.getContainer().un(this.listeners);
    },

    /**
     * @private
     */
    updateDisabled: function(disabled) {
        if (disabled) {
            this.detachListeners();
        }
        else {
            this.attachListeneners();
        }
    },

    /**
     * @private
     */
    updateFps: function(fps) {
        this.animationInterval = 1000 / fps;
    },

    /**
     * @private
     */
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

    /**
     * @private
     */
    updateDirection: function(direction) {
        var isAxisEnabled = this.isAxisEnabledFlags;

        isAxisEnabled.x = (direction === 'both' || direction === 'horizontal');
        isAxisEnabled.y = (direction === 'both' || direction === 'vertical');
    },

    /**
     * Returns true if a specified axis is enabled
     * @param {String} axis The axis to check (`x` or `y`).
     * @return {Boolean} True if the axis is enabled
     */
    isAxisEnabled: function(axis) {
        this.getDirection();

        return this.isAxisEnabledFlags[axis];
    },

    /**
     * @private
     */
    applyMomentumEasing: function(easing) {
        var defaultEasingClass = Ext.fx.easing.BoundMomentum;

        if (!(easing instanceof Ext.fx.easing.Abstract)) {
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

    /**
     * @private
     */
    applySnapEasing: function(easing) {
        var defaultEasingClass = Ext.fx.easing.EaseOut;

        if (!(easing instanceof Ext.fx.easing.Abstract)) {
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

    /**
     * @private
     */
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

    /**
     * @private
     */
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

    /**
     * @private
     */
    refreshMaxPosition: function() {
        this.maxPosition = null;
        this.getMaxPosition();
    },

    /**
     * @private
     */
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

    /**
     * @private
     */
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

    /**
     * @private
     */
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

    /**
     * @private
     */
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

    /**
     * @private
     * Returns the container for this scroller
     */
    getContainer: function() {
        var container = this.container;

        if (!container) {
            container = this.container = this.getElement().getParent();
            container.addCls(this.getContainerCls());
        }

        return container;
    },

    /**
     * @private
     */
    doRefresh: function() {
        this.stopAnimation();

        this.setSize(this.givenSize);
        this.setContainerSize(this.givenContainerSize);
        this.setContainerScrollSize(this.givenContainerScrollSize);
        this.setDirection(this.givenDirection);

        this.fireEvent('refresh', this);
    },

    /**
     * Refreshes the scrollers sizes. Useful if the content size has changed and the scroller has somehow missed it.
     * @return {Ext.scroll.Scroller} this
     */
    refresh: function() {
        var sizeMonitors = this.sizeMonitors;

        if (sizeMonitors) {
            sizeMonitors.element.refresh();
            sizeMonitors.container.refresh();
        }

        this.doRefresh();

        return this;
    },

    /**
     * Scrolls to a given location with no animation.
     * Use {@link #scrollToAnimated} to scroll with animation.
     * @param {Number} x The value to scroll on the x axis
     * @param {Number} y The value to scroll on the y axis
     * @return {Ext.scroll.Scroller} this
     */
    scrollTo: function(x, y) {
        //<deprecated product=touch since=2.0>
        if (typeof x != 'number' && arguments.length === 1) {
            //<debug warn>
            Ext.Logger.deprecate("Calling scrollTo() with an object argument is deprecated, " +
                "please pass x and y arguments instead", this);
            //</debug>

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

    /**
     * Scrolls to a specified x+y location using animation.
     * @param {Number} x The value to scroll on the x axis
     * @param {Number} y The value to scroll on the y axis
     * @return {Ext.scroll.Scroller} this
     */
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

        return this;
    },

    /**
     * Scrolls to the end of the scrollable view
     * @return {Ext.scroll.Scroller} this
     */
    scrollToEnd: function() {
        this.scrollTo(0, this.getSize().y - this.getContainerSize().y);
        return this;
    },

    /**
     * Scrolls to the end of the scrollable view, animated.
     * @return {Ext.scroll.Scroller} this
     */
    scrollToEndAnimated: function() {
        this.scrollToAnimated(0, this.getSize().y - this.getContainerSize().y);
        return this;
    },

    /**
     * Attempts to snap to a slot, specified by an index. The is calculated using the {@link #snap}
     * configuration; and if no {@link #snap} value is set it will not work.
     *
     * So lets say you scroller has a {@link #snap} value of 50. If you call this method with the index
     * of `10`, it will scroll on the Y axis to `500px`.
     *
     * @param {Number} index The index of the slot you want to scroll too
     * @param {String} axis The axis you want to scroll. `x` or `y`.
     * @return {Ext.scroll.Scroller/Boolean} this
     */
    snapToSlot: function(index, axis) {
        var snap = this.getSnap(),
            offset = this.getSnapOffset()[axis],
            containerSize = this.getContainerSize(),
            size = this.getSize();

        if (!snap) {
            return false;
        }

        this.scrollToAnimated(0, Math.min(this.getSnap() * index, size.y - containerSize.y));

        return this;
    },

    /**
     * Change the scroll offset by the given amount
     * @param {Number} x The offset to scroll by on the x axis
     * @param {Number} y The offset to scroll by on the y axis
     * @return {Ext.util.Scroller} this
     */
    scrollBy: function(x, y) {
        var position = this.position;
        return this.scrollTo(position.x + offset.x, position.y + offset.y);
    },

    /**
     * Change the scroll offset by the given amount with animation
     * @param {Number} x The offset to scroll by on the x axis
     * @param {Number} y The offset to scroll by on the y axis
     * @return {Ext.util.Scroller} this
     */
    scrollByAnimated: function(x, y) {
        var position = this.position;
        return this.scrollToAnimated(position.x + offset.x, position.y + offset.y);
    },

    /**
     * @private
     */
    doScrollTo: function(x, y) {
        var containerDom = this.getContainer().dom;

        if (x !== null) {
            containerDom.scrollLeft = x;
        }

        if (y !== null) {
            containerDom.scrollTop = y;
        }
    },

    /**
     * @private
     */
    onTouchStart: function() {
        this.stopAnimation();
    },

    /**
     * @private
     */
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

    /**
     * @private
     */
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

    /**
     * @private
     */
    onDrag: function(e) {
        if (!this.isDragging) {
            return;
        }

        var lastDragPosition = this.lastDragPosition;

        this.onAxisDrag('x', e.deltaX);
        this.onAxisDrag('y', e.deltaY);

        this.scrollTo(lastDragPosition.x, lastDragPosition.y);
    },

    /**
     * @private
     */
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

    /**
     * @private
     */
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

    /**
     * @private
     */
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

    /**
     * @private
     */
    startAnimation: function() {
        this.isAnimating = true;
        this.animationTimer = setInterval(this.doAnimationFrame, this.animationInterval);
        this.doAnimationFrame();
    },

    /**
     * @private
     */
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

    /**
     * @private
     * Stops the animation of the scroller at any time.
     */
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

    /**
     * @private
     */
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

        if (Ext.isNumber(snapX) || Ext.isNumber(snapY)) {
            this.isSnapping = true;

            this.startAnimation();

            return false;
        }

        return true;
    },

    /**
     * @private
     * Returns the snapped value of the specified valuea and axis.
     */
    snapValueForAxis: function(value, axis) {
        var snap = this.getSnap(),
            offset = this.getSnapOffset()[axis];

        value = Math.round((value + offset) / snap) * snap;

        return value;
    },

    /**
     * @private
     */
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

        if (element && !element.isDestroyed) {
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

            /**
             * @cfg {Number} acceleration A higher acceleration gives the scroller more initial velocity.
             * @deprecated 2.0.0 Please use {@link #momentumEasing}.momentum.acceleration and {@link #momentumEasing}.bounce.acceleration instead.
             */
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

            /**
             * @cfg {Number} friction The friction of the scroller. By raising this value the length that momentum scrolls
             * becomes shorter. This value is best kept between 0 and 1.
             * @deprecated 2.0.0 Please set the {@link #momentumEasing}.momentum.friction configuration instead
             */
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

        /**
         * Updates the boundary information for this scroller.
         * @return {Ext.scroll.Scroller} this
         * @deprecated 2.0.0 Please use {@link #method-refresh} instead.
         */
        updateBoundary: function() {
            //<debug warn>
            Ext.Logger.deprecate("updateBoundary() is deprecated, use refresh() instead");
            //</debug>
            return this.refresh();
        },

        //we need to support the old way of specifying an object and boolean, so we override the original function
        scrollBy: function(offset, animate) {
            var position = this.position,
                scrollTo;

            //check if offset is not an number
            if (!Ext.isNumber(offset)) {
                //<debug warn>
                Ext.Logger.deprecate("calling scrollBy with an object is no longer supporter. Please pass both the x and y values.");
                //</debug>

                //ensure it is a boolean
                animate = Boolean(animate);

                scrollTo = {
                    x: position.x + offset.x,
                    y: position.y + offset.y
                };
            } else {
                animate = false;

                scrollTo = {
                    x: position.x + offset,
                    y: position.y + animate
                };
            }

            if (animate) {
                this.scrollToAnimated(scrollTo.x, scrollTo.y);
            } else {
                this.scrollTo(scrollTo.x, scrollTo.y);
            }

            return this;
        },

        /**
         * Sets the offset of this scroller.
         * @param {Object} offset The offset to move to
         * @param {Number} offset.x The x axis offset
         * @param {Number} offset.y The y axis offset
         * @return {Ext.scroll.Scroller} this
         */
        setOffset: function(offset) {
            return this.scrollToAnimated(-offset.x, -offset.y);
        }
    });
    //</deprecated>
});
