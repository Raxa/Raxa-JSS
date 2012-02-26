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