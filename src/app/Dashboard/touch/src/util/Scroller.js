(function(){

Ext.ScrollManager = new Ext.AbstractManager();

/**
 * @class Ext.util.ScrollView
 * @extends Ext.util.Observable
 *
 * A wrapper class around {@link Ext.util.Scroller Ext.util.Scroller} and {@link Ext.util.Scroller.Indicator Ext.util.Scroller.Indicator}
 * that listens to scroll events and control the scroll indicators
 */
Ext.util.ScrollView = Ext.extend(Ext.util.Observable, {

    /**
     * @cfg {Boolean/String} useIndicators
     * Whether or not to use indicators. Can be either: <ul>
     * <li>{Boolean} true to display both directions, false otherwise</li>
     * <li>{String} 'vertical' or 'horizontal' to display for that specific direction only</li>
     * Defaults to true
     */
    useIndicators: true,

    /**
     * @cfg {Object} indicatorConfig
     * A valid config object for {@link Ext.util.Scroller.Indicator Ext.util.Scroller.Indicator}
     */
    indicatorConfig: {},

    /**
     * @cfg {Number} indicatorMargin
     * The margin value for the indicator relatively to the container.
     * Defaults to <tt>4</tt>
     */
    indicatorMargin: 4,

    constructor: function(el, config) {
        var indicators = [],
            directions = ['vertical', 'horizontal'];

        Ext.util.ScrollView.superclass.constructor.call(this);

        ['useIndicators', 'indicatorConfig', 'indicatorMargin'].forEach(function(c) {
            if (config.hasOwnProperty(c)) {
                this[c] = config[c];
                delete config[c];
            }
        }, this);

        config.scrollView = this;
        this.scroller = new Ext.util.Scroller(el, config);

        if (this.useIndicators === true) {
            directions.forEach(function(d) {
                if (this.scroller[d]) {
                    indicators.push(d);
                }
            }, this);
        } else if (directions.indexOf(this.useIndicators) !== -1) {
            indicators.push(this.useIndicators);
        }

        this.indicators = {};
        this.indicatorOffsetExtras = {};

        indicators.forEach(function(i) {
            this.indicators[i] = new Ext.util.Scroller.Indicator(this.scroller.container, Ext.apply({}, this.indicatorConfig, {type: i}));
        }, this);

        this.mon(this.scroller, {
            scrollstart: this.onScrollStart,
            scrollend: this.onScrollEnd,
            scroll: this.onScroll,
            scope: this
        });
    },

    // @private
    onScrollStart: function() {
        this.showIndicators();
    },

    // @private
    onScrollEnd: function() {
        this.hideIndicators();
    },

    // @private
    onScroll: function(scroller) {
        if (scroller.offsetBoundary == null || (!this.indicators.vertical && !this.indicators.horizontal))
            return;

        var sizeAxis,
            offsetAxis,
            offsetMark,
            boundary = scroller.offsetBoundary,
            offset = scroller.offset;

        this.containerSize = scroller.containerBox;
        this.scrollerSize = scroller.size;
        this.outOfBoundOffset = boundary.getOutOfBoundOffset(offset);
        this.restrictedOffset = boundary.restrict(offset);
        this.boundarySize = boundary.getSize();

        if (!this.indicatorSizes) {
            this.indicatorSizes = {vertical: 0, horizontal: 0};
        }

        if (!this.indicatorOffsets) {
            this.indicatorOffsets = {vertical: 0, horizontal: 0};
        }

        Ext.iterate(this.indicators, function(axis, indicator) {
            sizeAxis = (axis == 'vertical') ? 'height' : 'width';
            offsetAxis = (axis == 'vertical') ? 'y' : 'x';
            offsetMark = (axis == 'vertical') ? 'bottom' : 'right';

            if (this.scrollerSize[sizeAxis] < this.containerSize[sizeAxis]) {
                this.indicatorSizes[axis] = this.containerSize[sizeAxis] * (this.scrollerSize[sizeAxis] / this.containerSize[sizeAxis]);
            }
            else {
                this.indicatorSizes[axis] = this.containerSize[sizeAxis] * (this.containerSize[sizeAxis] / this.scrollerSize[sizeAxis]);
            }
            this.indicatorSizes[axis] -= Math.abs(this.outOfBoundOffset[offsetAxis]);
            this.indicatorSizes[axis] = Math.max(this.indicatorMargin * 4, this.indicatorSizes[axis]);

            if (this.boundarySize[sizeAxis] != 0) {
                this.indicatorOffsets[axis] = (((boundary[offsetMark] - this.restrictedOffset[offsetAxis]) / this.boundarySize[sizeAxis])
                                              * (this.containerSize[sizeAxis] - this.indicatorSizes[axis]));
            } else if (offset[offsetAxis] < boundary[offsetMark]) {
                this.indicatorOffsets[axis] = this.containerSize[sizeAxis] - this.indicatorSizes[axis];
            } else {
                this.indicatorOffsets[axis] = 0;
            }

            indicator.setOffset(this.indicatorOffsetExtras[axis] + this.indicatorOffsets[axis] + this.indicatorMargin);
            indicator.setSize(this.indicatorSizes[axis] - (this.indicatorMargin * 2));
        }, this);
    },

    /*
     * Show the indicators if they are enabled; called automatically when the Scroller starts moving
     * @return {Ext.util.ScrollView} this This ScrollView
     */
    showIndicators : function() {
        Ext.iterate(this.indicators, function(axis, indicator) {
            indicator.show();
            this.indicatorOffsetExtras[axis] = indicator.el.dom.parentNode[axis === 'vertical' ? 'scrollTop' : 'scrollLeft'];
        }, this);

        return this;
    },

     /*
     * Hide the indicators if they are enabled; called automatically when the scrolling ends
     * @return {Ext.util.ScrollView} this This ScrollView
     */
    hideIndicators : function() {
        Ext.iterate(this.indicators, function(axis, indicator) {
            indicator.hide();
        }, this);
    },

    // Inherited docs
    destroy: function() {
        this.scroller.destroy();

        if (this.indicators) {
            Ext.iterate(this.indicators, function(axis, indicator) {
                indicator.destroy();
            }, this);
        }

        return Ext.util.ScrollView.superclass.destroy.apply(this, arguments);
    }
});

/**
 * @class Ext.util.Scroller
 * @extends Ext.util.Draggable
 *
 * Provide the native scrolling experience on iDevices for any DOM element
 */
Ext.util.Scroller = Ext.extend(Ext.util.Draggable, {
    // Inherited
    baseCls: '',

    // Inherited
    draggingCls: '',

    // Inherited
    direction: 'both',

    // Inherited
    constrain: 'parent',

    /**
     * @cfg {Number} outOfBoundRestrictFactor
     * Determines the offset ratio when the scroller is pulled / pushed out of bound (when it's not decelerating)
     * A value of 0.5 means 1px allowed for every 2px. Defaults to 0.5
     */
    outOfBoundRestrictFactor: 0.5,

    /**
     * @cfg {Number} acceleration
     * A higher acceleration gives the scroller more initial velocity. Defaults to 30
     */
    acceleration: 20,

    /**
     * @cfg {Number} fps
     * The desired fps of the deceleration. Defaults to 70.
     */
    // Inherited

    autoAdjustFps: false,

    /**
     * @cfg {Number} friction
     * The friction of the scroller.
     * By raising this value the length that momentum scrolls becomes shorter. This value is best kept
     * between 0 and 1. The default value is 0.5
     */
    friction: 0.5,

    /**
     * @cfg {Number} startMomentumResetTime
     * The time duration in ms to reset the start time of momentum
     * Defaults to 350
     */
    startMomentumResetTime: 350,

    /**
     * @cfg {Number} springTension
     * The tension of the spring that is attached to the scroller when it bounces.
     * By raising this value the bounce becomes shorter. This value is best kept
     * between 0 and 1. The default value is 0.3
     */
    springTension: 0.3,

    /**
     * @cfg {Number} minVelocityForAnimation
     * The minimum velocity to keep animating. Defaults to 1 (1px per second)
     */
    minVelocityForAnimation: 1,

    /**
     * @cfg {Boolean/String} bounces
     * Enable bouncing during scrolling past the bounds. Defaults to true. (Which is 'both').
     * You can also specify 'vertical', 'horizontal', or 'both'
     */
    bounces: true,

    /**
     * @cfg {Boolean} momentum
     * Whether or not to enable scrolling momentum. Defaults to true
     */
    momentum: true,

    cancelRevert: true,

    threshold: 5,

    constructor: function(el, config) {
        el = Ext.get(el);

        var scroller = Ext.ScrollManager.get(el.id);
        if (scroller) {
            return Ext.apply(scroller, config);
        }

        Ext.util.Scroller.superclass.constructor.apply(this, arguments);

        this.addEvents(
            /**
             * @event scrollstart
             * @param {Ext.util.Scroller} this
             * @param {Ext.EventObject} e
             */
            'scrollstart',
            /**
             * @event scroll
             * @param {Ext.util.Scroller} this
             * @param {Object} offsets An object containing the x and y offsets for the scroller.
             */
            'scroll',
            /**
             * @event scrollend
             * @param {Ext.util.Scroller} this
             * @param {Object} offsets An object containing the x and y offsets for the scroller.
             */
            'scrollend',
            /**
             * @event bouncestart
             * @param {Ext.util.Scroller} this
             * @param {Object} info Object containing information regarding the bounce
             */
             'bouncestart',
             /**
              * @event bouncestart
              * @param {Ext.util.Scroller} this
              * @param {Object} info Object containing information regarding the bounce
              */
             'bounceend'
        );

        this.on({
            dragstart: this.onDragStart,
            offsetchange: this.onOffsetChange,
            scope: this
        });

        Ext.ScrollManager.register(this);

        this.el.addCls('x-scroller');
        this.container.addCls('x-scroller-parent');

        if (this.bounces !== false) {
            var both = this.bounces === 'both' || this.bounces === true,
                horizontal = both || this.bounces === 'horizontal',
                vertical = both || this.bounces === 'vertical';

            this.bounces = {
                x: horizontal,
                y: vertical
            };
        }

        this.theta = Math.log(1 - (this.friction / 10));
        this.bouncingVelocityFactor = this.springTension * Math.E;
        this.bouncingTimeFactor = ((1 / this.springTension) * this.acceleration);

        if (!this.decelerationAnimation) {
            this.decelerationAnimation = {};
        }

        if (!this.bouncingAnimation) {
            this.bouncingAnimation = {};
        }

        ['x', 'y'].forEach(function(a) {
            if (!this.decelerationAnimation[a]) {
                this.decelerationAnimation[a] = new Ext.util.Scroller.Animation.Deceleration({
                    acceleration: this.acceleration,
                    theta: this.theta
                });
            }

            if (!this.bouncingAnimation[a]) {
                this.bouncingAnimation[a] = new Ext.util.Scroller.Animation.Bouncing({
                    acceleration: this.acceleration,
                    springTension: this.springTension
                });
            }
        }, this);

        return this;
    },

    // Inherited docs
    updateBoundary: function(animate) {
        Ext.util.Scroller.superclass.updateBoundary.apply(this, arguments);

        this.snapToBoundary(animate);

        return this;
    },

    // Inherited docs
    onOffsetChange: function(scroller, offset) {
        this.fireEvent('scroll', scroller, {
            x: -offset.x,
            y: -offset.y
        });
    },

    // @private
    onTouchStart: function(e) {
        Ext.util.Scroller.superclass.onTouchStart.apply(this, arguments);

        this.stopMomentumAnimation();
    },

    // @private
    onDragStart: function(e) {
        this.fireEvent('scrollstart', this, e);
    },

    // @private
    setStartTime: function(e) {
        this.startTime = e.time;
        this.originalStartTime = (e.event.originalTimeStamp) ? e.event.originalTimeStamp : e.time;
    },

    // @private
    onStart: function(e) {
        if (Ext.util.Scroller.superclass.onStart.apply(this, arguments) !== true)
            return;

        this.setStartTime(e);
        this.lastEventTime = e.time;
        this.startTimeOffset = this.offset.copy();
        this.isScrolling = true;

        //<debug>
        this.momentumAnimationFramesHandled = 0;
        //</debug>
    },

    // @private
    onDrag: function(e) {
        if (Ext.util.Scroller.superclass.onDrag.apply(this, arguments) !== true)
            return;

        this.lastEventTime = e.time;

        if (this.lastEventTime - this.startTime > this.startMomentumResetTime) {
            this.setStartTime(e);
            this.startTimeOffset = this.offset.copy();
        }
    },

    // @private
    onDragEnd: function(e) {
        if (Ext.util.Scroller.superclass.onDragEnd.apply(this, arguments) !== true)
            return;

        if (!this.startMomentumAnimation(e)) {
            this.fireScrollEndEvent();
        }
    },

    // @private
    onOrientationChange: function() {
        Ext.util.Scroller.superclass.onOrientationChange.apply(this, arguments);

        this.snapToBoundary();
    },

    // @private
    fireScrollEndEvent: function() {
        this.isScrolling = false;
        this.isMomentumAnimating = false;
        this.snapToBoundary();
        this.fireEvent('scrollend', this, this.getOffset());

        this.snapToSlot();
    },


    //<debug>
    /*
     * Get the last actual fps performed by this Scroller. Useful for benchmarking
     * @return {Number} The actual fps
     */
    getLastActualFps: function() {
        var duration = (this.momentumAnimationEndTime - this.momentumAnimationStartTime - this.momentumAnimationProcessingTime) / 1000;
        return this.momentumAnimationFramesHandled / duration;
    },
    //</debug>

    /*
     * Similar to {@link Ext.util.Scroller#setOffset setOffset}, but will stop any existing animation
     * @param {Object} pos The new scroll position, e.g {x: 100, y: 200}
     * @param {Number/Boolean} animate Whether or not to animate while changing the scroll position.
     * If it's a number, will be treated as the duration in ms
     * @return {Ext.util.Scroller} this This Scroller
     */
    scrollTo: function(pos, animate) {
        this.stopMomentumAnimation();

        var newOffset = this.offsetBoundary.restrict(new Ext.util.Offset(-pos.x, -pos.y));

        this.setOffset(newOffset, animate);

        return this;
    },

    /*
     * Change the scroll offset by the given amount
     * @param {Ext.util.Offset/Object} offset The amount to scroll by, e.g {x: 100, y: 200}
     * @param {Number/Boolean} animate Whether or not to animate while changing the scroll position.
     * If it's a number, will be treated as the duration in ms
     * @return {Ext.util.Scroller} this This Scroller
     */
    scrollBy: function(offset, animate) {
        this.stopMomentumAnimation();

        var newOffset = this.offset.copy();
        newOffset.x += offset.x;
        newOffset.y += offset.y;

        this.setOffset(newOffset, animate);

        return this;
    },

    // @private
    setSnap: function(snap) {
        this.snap = snap;
    },

    /*
     * Snap this scrollable content back to the container's boundary, if it's currently out of bound
     * @return {Ext.util.Scroller} this This Scroller
     */
    snapToBoundary: function(animate) {
        var offset = this.offsetBoundary.restrict(this.offset);
        this.setOffset(offset, animate);

        return this;
    },

    snapToSlot: function() {
        var offset = this.offsetBoundary.restrict(this.offset);
        offset.round();

        if (this.snap) {
            if (this.snap === true) {
                this.snap = {
                    x: 50,
                    y: 50
                };
            }
            else if (Ext.isNumber(this.snap)) {
                this.snap = {
                    x: this.snap,
                    y: this.snap
                };
            }
            if (this.snap.y) {
                offset.y = Math.round(offset.y / this.snap.y) * this.snap.y;
            }
            if (this.snap.x) {
                offset.x = Math.round(offset.x / this.snap.x) * this.snap.x;
            }

            if (!this.offset.equals(offset)) {
                this.scrollTo({x: -offset.x, y: -offset.y}, this.snapDuration);
            }
        }
    },

    // @private
    startMomentumAnimation: function(e) {
        var me = this,
            originalTime = (e.event.originalTimeStamp) ? e.event.originalTimeStamp : e.time,
            duration = Math.max(40, originalTime - this.originalStartTime);

        this.fireEvent('beforemomentumanimationstart');

        if (
            (!this.momentum || !(duration <= this.startMomentumResetTime)) &&
            !this.offsetBoundary.isOutOfBound(this.offset)
        ) {
            return false;
        }

        // Determine the duration of the momentum
        var minVelocity = this.minVelocityForAnimation,
            currentVelocity,
            currentOffset = this.offset.copy(),
            restrictedOffset,
            acceleration = (duration / this.acceleration);

        this.isBouncing = {x: false, y: false};
        this.isDecelerating = {x: false, y: false};
        this.momentumAnimationStartTime = e.time;
        this.momentumAnimationProcessingTime = 0;
        this.bouncingData = {x: null, y: null};

        // Determine the deceleration velocity
        this.momentumAnimationStartVelocity = {
            x: (this.offset.x - this.startTimeOffset.x) / acceleration,
            y: (this.offset.y - this.startTimeOffset.y) / acceleration
        };

        this.momentumAnimationStartOffset = currentOffset;

        ['x', 'y'].forEach(function(axis) {

            this.isDecelerating[axis] = (Math.abs(this.momentumAnimationStartVelocity[axis]) > minVelocity);

            if (this.bounces && this.bounces[axis]) {
                restrictedOffset = this.offsetBoundary.restrict(axis, currentOffset[axis]);

                if (restrictedOffset !== currentOffset[axis]) {
                    currentVelocity = (currentOffset[axis] - restrictedOffset) * this.bouncingVelocityFactor;

                    this.bouncingData[axis] = {
                        axis: axis,
                        offset: restrictedOffset,
                        time: this.momentumAnimationStartTime,
                        velocity: currentVelocity
                    };

                    this.isBouncing[axis] = true;
                    this.isDecelerating[axis] = false;

                    this.fireEvent('bouncestart', this, this.bouncingData[axis]);

                    this.bouncingAnimation[axis].set({
                        startTime: this.bouncingData[axis].time - this.bouncingTimeFactor,
                        startOffset: this.bouncingData[axis].offset,
                        startVelocity: this.bouncingData[axis].velocity
                    });
                }
            }

            if (this.isDecelerating[axis]) {
                this.decelerationAnimation[axis].set({
                    startVelocity: this.momentumAnimationStartVelocity[axis],
                    startOffset: this.momentumAnimationStartOffset[axis],
                    startTime: this.momentumAnimationStartTime
                });
            }
        }, this);

        if (this.isDecelerating.x || this.isDecelerating.y || this.isBouncing.x || this.isBouncing.y) {
            this.isMomentumAnimating = true;
            this.momentumAnimationFramesHandled = 0;
            this.fireEvent('momentumanimationstart');

            me.handleMomentumAnimationFrame();
            this.momentumAnimationTimer = setInterval(function() {
                me.handleMomentumAnimationFrame();
            }, this.getFrameDuration());
            return true;
        }

        return false;
    },

    // @private
    stopMomentumAnimation: function() {
        if (this.isMomentumAnimating) {
            if (this.momentumAnimationTimer) {
                clearInterval(this.momentumAnimationTimer);
            }
            this.momentumAnimationEndTime = Date.now();

            //<debug>
            var lastFps = this.getLastActualFps();

            if (!this.maxFps || lastFps > this.maxFps) {
                this.maxFps = lastFps;
            }

            if (this.autoAdjustFps) {
                this.fps = this.maxFps;
            }
            //</debug>

            this.isDecelerating = {};
            this.isBouncing = {};

            this.fireEvent('momentumanimationend');
            this.fireScrollEndEvent();

        }

        return this;
    },

    /**
     * @private
     */
    handleMomentumAnimationFrame : function() {
        if (!this.isMomentumAnimating) {
            return;
        }

        var currentTime = Date.now(),
            newOffset = this.offset.copy(),
            offsetBoundary = this.offsetBoundary,
            currentVelocity,
            restrictedOffset,
            outOfBoundDistance;

        ['x', 'y'].forEach(function(axis) {
            if (this.isDecelerating[axis]) {
                newOffset[axis] = this.decelerationAnimation[axis].getOffset();
                currentVelocity = this.momentumAnimationStartVelocity[axis] * this.decelerationAnimation[axis].getFrictionFactor();
                outOfBoundDistance = offsetBoundary.getOutOfBoundOffset(axis, newOffset[axis]);

                // If the new offset is out of boundary, we are going to start a bounce
                if (outOfBoundDistance !== 0) {
                    restrictedOffset = offsetBoundary.restrict(axis, newOffset[axis]);

                    if (this.bounces && this.bounces[axis]) {
                        this.bouncingData[axis] = {
                            axis: axis,
                            offset: restrictedOffset,
                            time: currentTime,
                            velocity: currentVelocity
                        };

                        this.fireEvent('bouncestart', this, this.bouncingData[axis]);

                        this.bouncingAnimation[axis].set({
                            startTime: this.bouncingData[axis].time,
                            startOffset: this.bouncingData[axis].offset,
                            startVelocity: this.bouncingData[axis].velocity
                        });
                        this.isBouncing[axis] = true;
                    }

                    this.isDecelerating[axis] = false;
                }
                else if (Math.abs(currentVelocity) <= 1) {
                    this.isDecelerating[axis] = false;
                }
            }
            else if (this.isBouncing[axis]) {
                newOffset[axis] = this.bouncingAnimation[axis].getOffset();
                restrictedOffset = offsetBoundary.restrict(axis, newOffset[axis]);

                if (Math.abs(newOffset[axis] - restrictedOffset) <= 1) {
                    this.isBouncing[axis] = false;
                    this.fireEvent('bounceend', this, {axis: axis});
                    newOffset[axis] = restrictedOffset;
                }
            }
        }, this);

        if (!this.isDecelerating.x && !this.isDecelerating.y && !this.isBouncing.x && !this.isBouncing.y) {
            this.stopMomentumAnimation();
            return;
        }

        //<debug>
        this.momentumAnimationFramesHandled++;
        this.momentumAnimationProcessingTime += Date.now() - currentTime;
        //</debug>

        this.setOffset(newOffset);
    },

    // Inherited docs
    destroy: function() {
        Ext.ScrollManager.unregister(this);
        return Ext.util.Scroller.superclass.destroy.apply(this, arguments);
    }
});

Ext.util.Scroller.Animation = {};

Ext.util.Scroller.Animation.Deceleration = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    acceleration: 30,
    theta: null,
    startVelocity: null,

    getOffset: function() {
        return this.startOffset - this.startVelocity * (1 - this.getFrictionFactor()) / this.theta;
    },

    getFrictionFactor : function() {
        var deltaTime = Date.now() - this.startTime;

        return Math.exp(deltaTime / this.acceleration * this.theta);
    }
});

Ext.util.Scroller.Animation.Bouncing = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    springTension: 0.3,
    acceleration: 30,
    startVelocity: null,

    getOffset: function() {
        var deltaTime = (Date.now() - this.startTime),
            powTime = (deltaTime / this.acceleration) * Math.pow(Math.E, -this.springTension * (deltaTime / this.acceleration));

        return this.startOffset + (this.startVelocity * powTime);
    }
});

/**
 * @class Ext.util.Indicator
 * @extends Object
 *
 * Represent the Scroll Indicator to be used in a {@link Ext.util.ScrollView ScrollView}
 */
Ext.util.Scroller.Indicator = Ext.extend(Object, {
    baseCls: 'x-scrollbar',

    ui: 'dark',

    /**
     * @cfg {String} type
     * The type of this Indicator, valid values are 'vertical' or 'horizontal'
     */
    type: 'horizontal',

    constructor: function(container, config) {
        this.container = container;

        Ext.apply(this, config);

        this.el = this.container.createChild({
            cls: [this.baseCls, this.baseCls + '-' + this.type, this.baseCls + '-' + this.ui].join(' ')
        });

        this.offset = new Ext.util.Offset();

        this.hide();
    },

    /*
     * Hide this Indicator
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    hide: function() {
        var me = this;

        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
        }

        this.hideTimer = setTimeout(function() {
            me.el.setStyle('opacity', 0);
        }, 100);

        return this;
    },

    /*
     * Show this Indicator
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    show: function() {
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
        }

        this.el.setStyle('opacity', 1);

        return this;
    },

    /*
     * Set the visibility of this Indicator, a wrapper function for
     * {@link Ext.util.Scroller.Indicator#show show} and {@link Ext.util.Scroller.Indicator#show hide}
     * @param {Boolean} isVisible True to show this Indicator, false to hide
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    setVisibility: function(isVisible) {
        return this[isVisible ? 'show' : 'hide']();
    },

    /*
     * Adjust the size of this Indicator, will change the height if {@link Ext.util.Scroller.Indicator#type type}
     * is 'vertical', and width for 'horizontal'
     * @param {Number} size The new size to change to
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    setSize: function(size) {
        if (this.size && size > this.size) {
            size = Math.round(size);
        }

        // this.el.setStyle(height) is cleaner here but let's save some little performance...
        this.el.dom.style[(this.type == 'horizontal') ? 'width' : 'height'] = size + 'px';

        this.size = size;

        return this;
    },

    /*
     * Set the offset position of this Indicator, relative to its container
     * @param {Number} offset The new offset
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    setOffset: function(offset) {
        if (this.type == 'vertical') {
            this.offset.y = offset;
        } else {
            this.offset.x = offset;
        }

        if (!Ext.is.iOS && !Ext.is.Desktop) {
            if (this.type == 'vertical') {
                this.el.dom.style.top = this.offset.y + 'px';
            } else {
                this.el.dom.style.left = this.offset.x + 'px';
            }
        } else {
            Ext.Element.cssTranslate(this.el, this.offset);
        }

        return this;
    }

});

})();
