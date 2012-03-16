/**
 * @class Ext.util.Droppable
 * @extends Ext.util.Observable
 * 
 * @constructor
 */
Ext.util.Droppable = Ext.extend(Ext.util.Observable, {
    baseCls: 'x-droppable',
    /**
     * @cfg {String} activeCls
     * The CSS added to a Droppable when a Draggable in the same group is being
     * dragged. Defaults to 'x-drop-active'.
     */
    activeCls: 'x-drop-active',
    /**
     * @cfg {String} invalidCls
     * The CSS class to add to the droppable when dragging a draggable that is
     * not in the same group. Defaults to 'x-drop-invalid'.
     */
    invalidCls: 'x-drop-invalid',
    /**
     * @cfg {String} hoverCls
     * The CSS class to add to the droppable when hovering over a valid drop. (Defaults to 'x-drop-hover')
     */
    hoverCls: 'x-drop-hover',

    /**
     * @cfg {String} validDropMode
     * Determines when a drop is considered 'valid' whether it simply need to
     * intersect the region or if it needs to be contained within the region.
     * Valid values are: 'intersects' or 'contains'
     */
    validDropMode: 'intersect',

    /**
     * @cfg {Boolean} disabled
     */
    disabled: false,

    /**
     * @cfg {String} group
     * Draggable and Droppable objects can participate in a group which are
     * capable of interacting. Defaults to 'base'
     */
    group: 'base',

    // not yet implemented
    tolerance: null,


    // @private
    monitoring: false,
    
    /**
     * @constructor
     * @param el {Mixed} String, HtmlElement or Ext.Element representing an
     * element on the page.
     * @param config {Object} Configuration options for this class.
     */
    constructor : function(el, config) {
        config = config || {};
        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event dropactivate
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'dropactivate',

            /**
             * @event dropdeactivate
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'dropdeactivate',

            /**
             * @event dropenter
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'dropenter',

            /**
             * @event dropleave
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'dropleave',

            /**
             * @event drop
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'drop'
        );

        this.el = Ext.get(el);
        Ext.util.Droppable.superclass.constructor.call(this);

        if (!this.disabled) {
            this.enable();
        }

        this.el.addCls(this.baseCls);
    },

    // @private
    onDragStart : function(draggable, e) {
        if (draggable.group === this.group) {
            this.monitoring = true;
            this.el.addCls(this.activeCls);
            this.region = this.el.getPageBox(true);

            draggable.on({
                drag: this.onDrag,
                beforedragend: this.onBeforeDragEnd,
                dragend: this.onDragEnd,
                scope: this
            });

            if (this.isDragOver(draggable)) {
                this.setCanDrop(true, draggable, e);
            }

            this.fireEvent('dropactivate', this, draggable, e);
        }
        else {
            draggable.on({
                dragend: function() {
                    this.el.removeCls(this.invalidCls);
                },
                scope: this,
                single: true
            });
            this.el.addCls(this.invalidCls);
        }
    },

    // @private
    isDragOver : function(draggable, region) {
        return this.region[this.validDropMode](draggable.region);
    },

    // @private
    onDrag : function(draggable, e) {
        this.setCanDrop(this.isDragOver(draggable), draggable, e);
    },

    // @private
    setCanDrop : function(canDrop, draggable, e) {
        if (canDrop && !this.canDrop) {
            this.canDrop = true;
            this.el.addCls(this.hoverCls);
            this.fireEvent('dropenter', this, draggable, e);
        }
        else if (!canDrop && this.canDrop) {
            this.canDrop = false;
            this.el.removeCls(this.hoverCls);
            this.fireEvent('dropleave', this, draggable, e);
        }
    },

    // @private
    onBeforeDragEnd: function(draggable, e) {
        draggable.cancelRevert = this.canDrop;
    },

    // @private
    onDragEnd : function(draggable, e) {
        this.monitoring = false;
        this.el.removeCls(this.activeCls);

        draggable.un({
            drag: this.onDrag,
            beforedragend: this.onBeforeDragEnd,
            dragend: this.onDragEnd,
            scope: this
        });


        if (this.canDrop) {
            this.canDrop = false;
            this.el.removeCls(this.hoverCls);
            this.fireEvent('drop', this, draggable, e);
        }

        this.fireEvent('dropdeactivate', this, draggable, e);
    },

    /**
     * Enable the Droppable target.
     * This is invoked immediately after constructing a Droppable if the
     * disabled parameter is NOT set to true.
     */
    enable : function() {
        if (!this.mgr) {
            this.mgr = Ext.util.Observable.observe(Ext.util.Draggable);
        }
        this.mgr.on({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = false;
    },

    /**
     * Disable the Droppable target.
     */
    disable : function() {
        this.mgr.un({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = true;
    },
    
    /**
     * Method to determine whether this Component is currently disabled.
     * @return {Boolean} the disabled state of this Component.
     */
    isDisabled : function() {
        return this.disabled;
    },
    
    /**
     * Method to determine whether this Droppable is currently monitoring drag operations of Draggables.
     * @return {Boolean} the monitoring state of this Droppable
     */
    isMonitoring : function() {
        return this.monitoring;
    }
});
