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
