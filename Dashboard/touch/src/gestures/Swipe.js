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