/**
 * @class Ext.util.Draggable
 *
 * A core util class to bring Draggable behavior to any DOM element
 */

Ext.define('Ext.util.Draggable', {
    isDraggable: true,

    mixins: [
        'Ext.mixin.Observable'
    ],

    requires: [
        'Ext.util.SizeMonitor',
        'Ext.util.Translatable'
    ],

    /**
     * @event dragstart
     * @preventable initDragStart
     * Fires whenever the component starts to be dragged
     * @param {Ext.util.Draggable} this
     * @param {Ext.EventObject} e the event object
     * @param {Object} offset The offset object
     */

    /**
     * @event drag
     * Fires whenever the component is dragged
     * @param {Ext.util.Draggable} this
     * @param {Ext.EventObject} e the event object
     * @param {Object} offset The offset object
     */

    /**
     * @event dragend
     * Fires whenever the component is dragged
     * @param {Ext.util.Draggable} this
     * @param {Ext.EventObject} e the event object
     */

    config: {
        cls: Ext.baseCSSPrefix + 'draggable',

        draggingCls: Ext.baseCSSPrefix + 'dragging',

        element: null,

        constraint: 'container',

        disabled: null,

        /**
         * @cfg {String} direction
         * Possible values: 'vertical', 'horizontal', or 'both'
         * @accessor
         */
        direction: 'both',

        translatable: {}
    },

    DIRECTION_BOTH: 'both',

    DIRECTION_VERTICAL: 'vertical',

    DIRECTION_HORIZONTAL: 'horizontal',

    /**
     * Creates new Draggable.
     * @param {Mixed} el The element you want to make draggable.
     * @param {Object} config The configuration object for this Draggable.
     */
    constructor: function(config) {
        var element;

        this.sizeMonitors = {};

        this.extraConstraint = {};

        this.initialConfig = config;

        this.offset = {
            x: 0,
            y: 0
        };

        this.listeners = {
            dragstart: 'onDragStart',
            drag     : 'onDrag',
            dragend  : 'onDragEnd',

            scope: this
        };

        if (config && config.element) {
            element = config.element;
            delete config.element;

            this.setElement(element);
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
        element.on(this.listeners);
        element.addCls(this.getCls() || this.config.cls);

        this.sizeMonitors.element = new Ext.util.SizeMonitor({
            element: element,
            callback: this.doRefresh,
            scope: this
        });

        this.initConfig(this.initialConfig);
    },

    applyTranslatable: function(translatable, currentInstance) {
        translatable = Ext.factory(translatable, Ext.util.Translatable, currentInstance);
        translatable.setElement(this.getElement());

        return translatable;
    },

    setExtraConstraint: function(constraint) {
        this.extraConstraint = constraint || {};

        this.refreshConstraint();

        return this;
    },

    addExtraConstraint: function(constraint) {
        Ext.merge(this.extraConstraint, constraint);

        this.refreshConstraint();

        return this;
    },

    applyConstraint: function(newConstraint, currentConstraint) {
        this.currentConstraint = newConstraint;

        if (newConstraint === 'container') {
            return Ext.merge(this.getContainerConstraint(), this.extraConstraint);
        }

        return Ext.merge({}, this.extraConstraint, newConstraint);
    },

    updateConstraint: function() {
        this.refreshOffset();
    },

    getContainerConstraint: function() {
        var container = this.getContainer();

        if (!container) {
            return {
                min: { x: -Infinity, y: -Infinity },
                max: { x: Infinity, y: Infinity }
            };
        }

        var dom = this.getElement().dom,
            containerDom = container.dom,
            width = dom.offsetWidth,
            height = dom.offsetHeight,
            containerWidth = containerDom.offsetWidth,
            containerHeight = containerDom.offsetHeight;

        return {
            min: { x: 0, y: 0 },
            max: { x: containerWidth - width, y: containerHeight - height }
        };
    },

    getContainer: function() {
        var container = this.container;

        if (!container) {
            container = this.getElement().getParent();

            if (container) {
                this.sizeMonitors.container = new Ext.util.SizeMonitor({
                    element: container,
                    callback: this.doRefresh,
                    scope: this
                });

                this.container = container;
            }
        }

        return container;
    },

    detachListeners: function() {
        this.getElement().un(this.listeners);
    },

    isAxisEnabled: function(axis) {
        var direction = this.getDirection();

        if (axis === 'x') {
            return (direction === this.DIRECTION_BOTH || direction === this.DIRECTION_HORIZONTAL);
        }

        return (direction === this.DIRECTION_BOTH || direction === this.DIRECTION_VERTICAL);
    },

    onDragStart: function(e) {
        if (this.getDisabled()) {
            return false;
        }

        this.fireAction('dragstart', [this, e, this.offset], this.initDragStart);
    },

    initDragStart: function(me, e, startOffset) {
        this.dragStartOffset = {
            x: startOffset.x,
            y: startOffset.y
        };

        this.isDragging = true;

        this.getElement().addCls(this.getDraggingCls());
    },

    onDrag: function(e) {
        if (!this.isDragging) {
            return;
        }

        var startOffset = this.dragStartOffset;

        this.fireAction('drag', [this, e, {
            x: startOffset.x + e.deltaX,
            y: startOffset.y + e.deltaY
        }], this.doDrag);
    },

    doDrag: function(me, e, offset) {
        me.setOffset(offset);
    },

    onDragEnd: function(e) {
        if (!this.isDragging) {
            return;
        }

        this.onDrag(e);

        this.isDragging = false;

        this.fireEvent('dragend', this, e);

        this.getElement().removeCls(this.getDraggingCls());
    },

    setOffset: function(offset, animation) {
        var currentOffset = this.offset,
            x = offset.x,
            y = offset.y,
            constraint = this.getConstraint(),
            minOffset = constraint.min,
            maxOffset = constraint.max,
            min = Math.min,
            max = Math.max;

        if (this.isAxisEnabled('x') && typeof x == 'number') {
            x = min(max(x, minOffset.x), maxOffset.x);
        }
        else {
            x = currentOffset.x;
        }

        if (this.isAxisEnabled('y') && typeof y == 'number') {
            y = min(max(y, minOffset.y), maxOffset.y);
        }
        else {
            y = currentOffset.y;
        }

        currentOffset.x = x;
        currentOffset.y = y;

        this.getTranslatable().translate(currentOffset, animation);
    },

    getOffset: function() {
        return this.offset;
    },

    refreshConstraint: function() {
        this.setConstraint(this.currentConstraint);
    },

    refreshOffset: function() {
        this.setOffset(this.offset);
    },

    doRefresh: function() {
        this.refreshConstraint();
        this.getTranslatable().refresh();
        this.refreshOffset();
    },

    refresh: function() {
        var sizeMonitors = this.sizeMonitors;

        if (sizeMonitors.element) {
            sizeMonitors.element.refresh();
        }

        if (sizeMonitors.container) {
            sizeMonitors.container.refresh();
        }

        this.doRefresh();
    },

    /**
     * Enable the Draggable.
     * @return {Ext.util.Draggable} This Draggable instance
     */
    enable: function() {
        return this.setDisabled(false);
    },

    /**
     * Disable the Draggable.
     * @return {Ext.util.Draggable} This Draggable instance
     */
    disable: function() {
        return this.setDisabled(true);
    },

    destroy: function() {
        var sizeMonitors = this.sizeMonitors,
            translatable = this.getTranslatable();

        if (sizeMonitors.element) {
            sizeMonitors.element.destroy();
        }

        if (sizeMonitors.container) {
            sizeMonitors.container.destroy();
        }

        var element = this.getElement();
        if (element && !element.isDestroyed) {
            element.removeCls(this.getCls());
        }
        this.detachListeners();

        if (translatable) {
            translatable.destroy();
        }
    }

}, function() {
    //<deprecated product=touch since=2.0>
    this.override({
        constructor: function(config) {
            if (config && config.constrain) {
                //<debug warn>
                Ext.Logger.deprecate("'constrain' config is deprecated, please use 'contraint' instead");
                //</debug>
                config.contraint = config.constrain;
                delete config.constrain;
            }

            return this.callOverridden(arguments);
        }
    });
    //</deprecated>
});

