/**
 * @private
 */
Ext.define('Ext.scroll.easing.EaseOut', {
    extend: 'Ext.scroll.easing.Linear',

    config: {
        exponent: 4,
        duration: 1500
    },

    getValue: function() {
        var deltaTime = Ext.Date.now() - this.getStartTime(),
            duration = this.getDuration(),
            startValue = this.getStartValue(),
            endValue = this.getEndValue(),
            distance = this.distance,
            theta = deltaTime / duration,
            thetaC = 1 - theta,
            thetaEnd = 1 - Math.pow(thetaC, this.getExponent()),
            currentValue = startValue + (thetaEnd * distance);

        if (deltaTime >= duration) {
            this.isEnded = true;
            return endValue;
        }

        return currentValue;
    }
});
