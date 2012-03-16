/**
 * @class Ext.util.Draggable
 * @extends Ext.util.Observable
 * A core util class to bring Draggable behavior to any DOM element, acts as a base class for Scroller and Sortable
 * @constructor
 * @param {Mixed} el The element you want to make draggable.
 * @param {Object} config The configuration object for this Draggable.
 */
Ext.util.Draggable = Ext.extend(Ext.util.Observable, {
    baseCls: 'x-draggable',

    draggingCls: 'x-dragging',

    proxyCls: 'x-draggable-proxy',

    // @private
    outOfBoundRestrictFactor: 1,

    /**
     * @cfg {String} direction
     * Possible values: 'vertical', 'horizontal', or 'both'
     * Defaults to 'both'
     */
    direction: 'both',

    fps: Ext.is.Blackberry ? 25 : ((Ext.is.iOS || Ext.is.Desktop) ? 80 : 50),

    /**
     * @cfg {Element/Mixed} constrain Can be either a DOM element, an instance of Ext.Element, 'parent' or null for no constrain
     */
    constrain: window,

    /**
     * The amount of pixels you have to move before the drag operation starts.
     * Defaults to 0
     * @type Number
     */
    threshold: 0,

    /**
     * @cfg {Number} delay
     * How many milliseconds a user must hold the draggable before starting a
     * drag operation. Defaults to 0 or immediate.
     */
    delay: 0,

    /**
     * @cfg {String} cancelSelector
     * A simple CSS selector that represents elements within the draggable
     * that should NOT initiate a drag.
     */
    cancelSelector: null,

    /**
     * @cfg {Boolean} disabled
     * Whether or not the draggable behavior is disabled on instantiation
     * Defaults to false
     */
    disabled: false,

    /**
     * @cfg {Boolean} revert
     * Whether or not the element or it's proxy will be reverted back (with animation)
     * when it's not dropped and held by a Droppable
     */
    revert: false,

    /**
     * @cfg {String} group
     * Draggable and Droppable objects can participate in a group which are
     * capable of interacting. Defaults to 'base'
     */
    group: 'base',

    /**
     * @cfg {Ext.Element/Element/String} eventTarget
     * The element to actually bind touch events to, the only string accepted is 'parent'
     * for convenience.
     * Defaults to this class' element itself
     */

    /**
     * @cfg {Boolean} useCssTransform
     * Whether or not to translate the element using CSS Transform (much faster) instead of
     * left and top properties, defaults to true
     */
    useCssTransform: true,

    // not implemented yet.
    grid: null,
    snap: null,
    proxy: null,
    stack: false,

    /**
     * How long animations for this draggable take by default when using setOffset with animate being true.
     * Defaults to 300.
     * @type Number
     */
    animationDuration: 300,

    /**
     * Whether or not to automatically re-calculate the Scroller's and its container's size on every
     * touchstart.
     * Defaults to true
     * @type Boolean
     */
    updateBoundaryOnTouchStart: true,

    // Properties
    /**
     * Read-only Property representing the region that the Draggable
     * is constrained to.
     * @type Ext.util.Region
     */
    offsetBoundary: null,

    /**
     * Read-only Property representing whether or not the Draggable is currently
     * dragging or not.
     * @type Boolean
     */
    dragging: false,

    /**
     * Read-only value representing whether the Draggable can be moved vertically.
     * This is automatically calculated by Draggable by the direction configuration.
     * @type Boolean
     */
    vertical: false,

    /**
     * Read-only value representing whether the Draggable can be moved horizontally.
     * This is automatically calculated by Draggable by the direction configuration.
     * @type Boolean
     */
    horizontal: false,

    // @private
    monitorOrientation: true,

    constructor: function(el, config) {
        this.el = Ext.get(el);
        this.id = el.id;

        config = config || {};

        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event offsetchange
             * @param {Ext.Draggable} this
             * @param {Ext.util.Offset} offset
             */
            'offsetchange',

            'offsetboundaryupdate'
        );

        Ext.util.Draggable.superclass.constructor.call(this, config);

        if (this.eventTarget === 'parent') {
            this.eventTarget = this.el.parent();
        } else {
            this.eventTarget = (this.eventTarget) ? Ext.get(this.eventTarget) : this.el;
        }

        if (this.direction == 'both') {
            this.horizontal = true;
            this.vertical = true;
        }
        else if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else {
            this.vertical = true;
        }

        this.el.addCls(this.baseCls);

        if (this.proxy) {
            this.getProxyEl().addCls(this.proxyCls);
        }

        this.startEventName = (this.delay > 0) ? 'taphold' : 'dragstart';
        this.dragOptions = (this.delay > 0) ? {holdThreshold: this.delay} : {
            direction: this.direction,
            dragThreshold: this.threshold
        };

        this.container = window;

        if (this.constrain) {
            if (this.constrain === 'parent') {
                this.container = this.el.parent();
            }
            else if (this.constrain !== window) {
                this.container = Ext.get(this.constrain);
            }
        }

        this.offset = new Ext.util.Offset();

        this.linearAnimation = {
            x: new Ext.util.Draggable.Animation.Linear(),
            y: new Ext.util.Draggable.Animation.Linear()
        };

        this.updateBoundary(true);
        this.setDragging(false);

        if (!this.disabled) {
            this.enable();
        }

        return this;
    },

    /**
     * Enable the Draggable.
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    enable: function() {
        return this.setEnabled(true);
    },

    /**
     * Disable the Draggable.
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    disable: function() {
        return this.setEnabled(false);
    },

    /**
     * Combined method to disable or enable the Draggable. This method is called by the enable and
     * disable methods.
     * @param {Boolean} enabled True to enable, false to disable. Defaults to false.
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    setEnabled: function(enabled) {
        this.eventTarget[enabled ? 'on' : 'un'](this.startEventName, this.onStart, this, this.dragOptions);
        this.eventTarget[enabled ? 'on' : 'un']('drag', this.onDrag, this, this.dragOptions);
        this.eventTarget[enabled ? 'on' : 'un']('dragend', this.onDragEnd, this, this.dragOptions);
        this.eventTarget[enabled ? 'on' : 'un']('touchstart', this.onTouchStart, this);

        if (enabled) {
            Ext.EventManager.onOrientationChange(this.onOrientationChange, this);
        } else {
            Ext.EventManager.orientationEvent.removeListener(this.onOrientationChange, this);
        }

        this.disabled = !enabled;

        return this;
    },

    /**
     * Change the Draggable to use css transforms instead of style offsets
     * or the other way around.
     * @param {Boolean} useCssTransform True to use css transforms instead of style offsets.
     * @return {Ext.util.Draggable} this This Draggable instance
     * @public
     */
    setUseCssTransform: function(useCssTransform) {
        if (typeof useCssTransform == 'undefined') {
            useCssTransform = true;
        }

        if (useCssTransform != this.useCssTransform) {
            this.useCssTransform = useCssTransform;

            var resetOffset = new Ext.util.Offset();

            if (useCssTransform == false) {
                this.setStyleOffset(this.offset);
                this.setTransformOffset(resetOffset, true);
            } else {
                this.setTransformOffset(this.offset);
                this.setStyleOffset(resetOffset);
            }
        }

        return this;
    },

    /**
     * Sets the offset of this Draggable relatively to its original offset.
     * @param {Ext.util.Offset/Object} offset An object or Ext.util.Offset instance containing the
     * x and y coordinates.
     * @param {Boolean/Number} animate Whether or not to animate the setting of the offset. True
     * to use the default animationDuration, a number to specify the duration for this operation.
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    setOffset: function(offset, animate) {
        if (!this.horizontal) {
            offset.x = 0;
        }

        if (!this.vertical) {
            offset.y = 0;
        }

        if (!(offset instanceof Ext.util.Offset)) {
            offset = Ext.util.Offset.fromObject(offset);
        }

        offset.round();

        if (!this.offset.equals(offset)) {
            if (animate) {
                this.startAnimation(offset, animate);
            }
            else {
                this.offset = offset;
                this.region = new Ext.util.Region(
                    this.initialRegion.top + offset.y,
                    this.initialRegion.right + offset.x,
                    this.initialRegion.bottom + offset.y,
                    this.initialRegion.left + offset.x
                );

                if (this.useCssTransform) {
                    this.setTransformOffset(offset);
                }
                else {
                    this.setStyleOffset(offset);
                }

                this.fireEvent('offsetchange', this, this.offset);
            }
        }


        return this;
    },

    /**
     * Internal method that sets the transform of the proxyEl.
     * @param {Ext.util.Offset/Object} offset An object or Ext.util.Offset instance containing the
     * x and y coordinates for the transform.
     * @return {Ext.util.Draggable} this This Draggable instance
     * @private
     */
    setTransformOffset: function(offset, clean) {
//        Ext.Element.cssTransform(this.getProxyEl(), {translate: [offset.x, offset.y]});
        // Temporarily use this instead of Ext.Element.cssTransform to save some CPU
        if (clean) {
            this.getProxyEl().dom.style.webkitTransform = '';
        } else {
            Ext.Element.cssTranslate(this.getProxyEl(), offset);
        }

        return this;
    },

    /**
     * Internal method that sets the left and top of the proxyEl.
     * @param {Ext.util.Offset/Object} offset An object or Ext.util.Offset instance containing the
     * x and y coordinates.
     * @return {Ext.util.Draggable} this This Draggable instance
     * @private
     */
    setStyleOffset: function(offset) {
        var el = this.getProxyEl();

        el.dom.style.left = offset.x + 'px';
        el.dom.style.top = offset.y + 'px';

        return this;
    },

    /**
     * Internal method that sets the offset of the Draggable using an animation
     * @param {Ext.util.Offset/Object} offset An object or Ext.util.Offset instance containing the
     * x and y coordinates for the transform.
     * @param {Boolean/Number} animate Whether or not to animate the setting of the offset. True
     * to use the default animationDuration, a number to specify the duration for this operation.
     * @return {Ext.util.Draggable} this This Draggable instance
     * @private
     */
    startAnimation: function(offset, animate) {
        var me = this;

        this.stopAnimation();

        var currentTime = Date.now();
        animate = Ext.isNumber(animate) ? animate : this.animationDuration;

        this.linearAnimation.x.set({
            startOffset: this.offset.x,
            endOffset: offset.x,
            startTime: currentTime,
            duration: animate
        });

        this.linearAnimation.y.set({
            startOffset: this.offset.y,
            endOffset: offset.y,
            startTime: currentTime,
            duration: animate
        });

        this.isAnimating = true;

        this.animationTimer = setInterval(function(){
            me.handleAnimationFrame();
        }, this.getFrameDuration());
        return this;
    },

    // @private
    getFrameDuration: function() {
        return 1000 / this.fps;
    },

    /**
     * Internal method that stops the current offset animation
     * @private
     */
    stopAnimation: function() {
        if (this.isAnimating) {
            clearInterval(this.animationTimer);
            this.isAnimating = false;
            this.setDragging(false);
        }

        return this;
    },

    /**
     * Internal method that handles a frame of the offset animation.
     * @private
     */
    handleAnimationFrame: function() {
        if (!this.isAnimating) {
            return;
        }

        var newOffset = new Ext.util.Offset();
        newOffset.x = this.linearAnimation.x.getOffset();
        newOffset.y = this.linearAnimation.y.getOffset();

        this.setOffset(newOffset);

        if ((newOffset.x === this.linearAnimation.x.endOffset) && (newOffset.y === this.linearAnimation.y.endOffset)) {
            this.stopAnimation();
        }
    },

    /**
     * Returns the current offset relative to the original location of this Draggable.
     * @return {Ext.util.Offset} offset An Ext.util.Offset instance containing the offset.
     */
    getOffset: function() {
        var offset = this.offset.copy();
        offset.y = -offset.y;
        offset.x = -offset.x;
        return offset;
    },

    /**
     * Updates the boundary information for this Draggable. This method shouldn't
     * have to be called by the developer and is mostly used for internal purposes.
     * Might be useful when creating subclasses of Draggable.
     * @param {Boolean} init Whether or not this is happing during instantiation, which we need
     * to apply the transform / style to the DOM element
     * @return {Ext.util.Draggable} this This Draggable instance
     * @private
     */
    updateBoundary: function(init) {
        var offsetBoundary;

        if (typeof init == 'undefined')
            init = false;

        this.size = {
            width: this.el.dom.scrollWidth,
            height: this.el.dom.scrollHeight
        };

        if (this.container === window) {
            this.containerBox = {
                left: 0,
                top: 0,
                right: this.container.innerWidth,
                bottom: this.container.innerHeight,
                width: this.container.innerWidth,
                height: this.container.innerHeight
            };
        }
        else {
            this.containerBox = this.container.getPageBox();
        }

        var elXY = this.el.getXY();

        this.elBox = {
            left: elXY[0] - this.offset.x,
            top: elXY[1] - this.offset.y,
            width: this.size.width,
            height: this.size.height
        };

        this.elBox.bottom = this.elBox.top + this.elBox.height;
        this.elBox.right = this.elBox.left + this.elBox.width;

        this.initialRegion = this.region = new Ext.util.Region(
            elXY[1], elXY[0] + this.elBox.width, elXY[1] + this.elBox.height, elXY[0]
        );

        var top = 0,
            right = 0,
            bottom = 0,
            left = 0;

        if (this.elBox.left < this.containerBox.left) {
            right += this.containerBox.left - this.elBox.left;
        }
        else {
            left -= this.elBox.left - this.containerBox.left;
        }

        if (this.elBox.right > this.containerBox.right) {
            left -= this.elBox.right - this.containerBox.right;
        }
        else {
            right += this.containerBox.right - this.elBox.right;
        }

        if (this.elBox.top < this.containerBox.top) {
            bottom += this.containerBox.top - this.elBox.top;
        }
        else {
            top -= this.elBox.top - this.containerBox.top;
        }

        if (this.elBox.bottom > this.containerBox.bottom) {
            top -= this.elBox.bottom - this.containerBox.bottom;
        }
        else {
            bottom += this.containerBox.bottom - this.elBox.bottom;
        }

        offsetBoundary = new Ext.util.Region(top, right, bottom, left).round();

        if (this.offsetBoundary && this.offsetBoundary.equals(offsetBoundary)) {
            return this;
        }

        this.offsetBoundary = offsetBoundary;

        this.fireEvent('offsetboundaryupdate', this, this.offsetBoundary);

        var currentComputedOffset;

        if (this.useCssTransform) {
            currentComputedOffset = Ext.Element.getComputedTransformOffset(this.getProxyEl());
//        } else {
//            currentComputedOffset = new Ext.util.Offset(this.getProxyEl().getLeft(), this.getProxyEl().getTop());

            if (!this.offset.equals(currentComputedOffset) || init) {
                this.setOffset(currentComputedOffset);
            }
        }

        return this;
    },

    // @private
    onTouchStart: function() {

    },

    /**
     * Fires when the Drag operation starts. Internal use only.
     * @param {Event} e The event object for the drag operation
     * @private
     */
    onStart: function(e) {
        if (this.updateBoundaryOnTouchStart) {
            this.updateBoundary();
        }

        this.stopAnimation();

        this.setDragging(true);
        this.startTouchPoint = new Ext.util.Point(e.startX, e.startY);

        this.startOffset = this.offset.copy();

        this.fireEvent('dragstart', this, e);

        return true;
    },

    /**
     * Gets the new offset from a touch offset.
     * @param {Ext.util.Offset} touchPoint The touch offset instance.
     * @private
     */
    getNewOffsetFromTouchPoint: function(touchPoint) {
        var xDelta = touchPoint.x - this.startTouchPoint.x,
            yDelta = touchPoint.y - this.startTouchPoint.y,
            newOffset = this.offset.copy();

        if(xDelta == 0 && yDelta == 0) {
            return newOffset;
        }

        if (this.horizontal)
            newOffset.x = this.startOffset.x + xDelta;

        if (this.vertical)
            newOffset.y = this.startOffset.y + yDelta;

        return newOffset;
    },

    /**
     * Fires when a drag events happens. Internal use only.
     * @param {Event} e The event object for the drag event
     * @private
     */
    onDrag: function(e) {
        if (!this.dragging) {
            return;
        }

        this.lastTouchPoint = Ext.util.Point.fromEvent(e);
        var newOffset = this.getNewOffsetFromTouchPoint(this.lastTouchPoint);

        if (this.offsetBoundary != null) {
            newOffset = this.offsetBoundary.restrict(newOffset, this.outOfBoundRestrictFactor);
        }

        this.setOffset(newOffset);

        this.fireEvent('drag', this, e);

        // This 'return true' here is to let sub-classes determine whether
        // there's an interuption return before that
        return true;
    },

    /**
     * Fires when a dragend event happens. Internal use only.
     * @param {Event} e The event object for the dragend event
     * @private
     */
    onDragEnd: function(e) {
        if (this.dragging) {
            this.fireEvent('beforedragend', this, e);

            if (this.revert && !this.cancelRevert) {
                this.setOffset(this.startOffset, true);
            } else {
                this.setDragging(false);
            }

            this.fireEvent('dragend', this, e);
        }

        // This 'return true' here is to let sub-classes determine whether
        // there's an interuption return before that
        return true;
    },

    /**
     * Fires when the orientation changes. Internal use only.
     * @private
     */
    onOrientationChange: function() {
        this.updateBoundary();
    },

    /**
     * Sets the dragging flag and adds a dragging class to the element.
     * @param {Boolean} dragging True to enable dragging, false to disable.
     * @private
     */
    setDragging: function(dragging) {
        if (dragging) {
            if (!this.dragging) {
                this.dragging = true;
                this.getProxyEl().addCls(this.draggingCls);
            }
        } else {
            if (this.dragging) {
                this.dragging = false;
                this.getProxyEl().removeCls(this.draggingCls);
            }
        }

        return this;
    },

    /**
     * Returns the element thats is being visually dragged.
     * @returns {Ext.Element} proxy The proxy element.
     */
    getProxyEl: function() {
        return this.proxy || this.el;
    },

    /**
     * Destroys this Draggable instance.
     */
    destroy: function() {
        this.el.removeCls(this.baseCls);
        this.getProxyEl().removeCls(this.proxyCls);
        this.clearListeners();
        this.disable();
    },

    /**
     * This method will reset the initial region of the Draggable.
     * @private
     */
    reset: function() {
        this.startOffset = new Ext.util.Offset(0, 0);
        this.setOffset(this.startOffset);

        var oldInitialRegion = this.initialRegion.copy();

        this.updateBoundary();
        this.initialRegion = this.region = this.getProxyEl().getPageBox(true);
        this.startTouchPoint.x += this.initialRegion.left - oldInitialRegion.left;
        this.startTouchPoint.y += this.initialRegion.top - oldInitialRegion.top;
    },

    /**
     * Use this to move the draggable to a coordinate on the screen.
     * @param {Number} x the vertical coordinate in pixels
     * @param {Number} y the horizontal coordinate in pixels
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    moveTo: function(x, y) {
        this.setOffset(new Ext.util.Offset(x - this.initialRegion.left, y - this.initialRegion.top));
        return this;
    },

    /**
     * Method to determine whether this Draggable is currently dragging.
     * @return {Boolean}
     */
    isDragging: function() {
        return this.dragging;
    },

    /**
     * Method to determine whether this Draggable can be dragged on the y-axis
     * @return {Boolean}
     */
    isVertical : function() {
        return this.vertical;
    },

    /**
     * Method to determine whether this Draggable can be dragged on the x-axis
     * @return {Boolean}
     */
    isHorizontal : function() {
        return this.horizontal;
    }
});

Ext.util.Draggable.Animation = {};

/**
 * @class Ext.util.Draggable.Animation.Abstract
 * @extends Object
 *
 * Provides the abstract methods for a Draggable animation.
 * @private
 * @ignore
 */
Ext.util.Draggable.Animation.Abstract = Ext.extend(Object, {
    /**
     * @cfg {Number} startTime The time the Animation started
     * @private
     */
    startTime: null,

    /**
     * @cfg {Object/Ext.util.Offset} startOffset Object containing the x and y coordinates the
     * Draggable had when the Animation started.
     * @private
     */
    startOffset: 0,

    /**
     * The constructor for an Abstract animation. Applies the config to the Animation.
     * @param {Object} config Object containing the configuration for this Animation.
     * @private
     */
    constructor: function(config) {
        config = config || {};

        this.set(config);

        if (!this.startTime)
            this.startTime = Date.now();
    },

    /**
     * Sets a config value for this Animation.
     * @param {String} name The name of this configuration
     * @param {Mixed} value The value for this configuration
     */
    set: function(name, value) {
        if (Ext.isObject(name)) {
            Ext.apply(this, name);
        }
        else {
            this[name] = value;
        }

        return this;
    },

    /**
     * This method will return the offset of the coordinate that is being animated for any
     * given offset in time based on a different set of variables. Usually these variables are
     * a combination of the startOffset, endOffset, startTime and duration.
     * @return {Number} The offset for the coordinate that is being animated
     */
    getOffset: Ext.emptyFn
});

/**
 * @class Ext.util.Draggable.Animation.Linear
 * @extends Ext.util.Draggable.Animation.Abstract
 *
 * A linear animation that is being used by Draggable's setOffset by default.
 * @private
 * @ignore
 */
Ext.util.Draggable.Animation.Linear = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    /**
     * @cfg {Number} duration The duration of this animation in milliseconds.
     */
    duration: 0,

    /**
     * @cfg {Object/Ext.util.Offset} endOffset Object containing the x and y coordinates the
     * Draggable is animating to.
     * @private
     */
    endOffset: 0,

    getOffset : function() {
        var distance = this.endOffset - this.startOffset,
            deltaTime = Date.now() - this.startTime,
            omegaTime = Math.min(1, (deltaTime / this.duration));

        return this.startOffset + (omegaTime * distance);
    }
});
