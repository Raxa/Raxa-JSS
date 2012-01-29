/**
 * @private
 */
Ext.define('Ext.scroll.easing.Linear', {
    extend: 'Ext.scroll.easing.Easing',

    config: {
        duration: 0,
        endValue: 0
    },

    updateStartValue: function(startValue) {
        this.distance = this.getEndValue() - startValue;
    },

    updateEndValue: function(endValue) {
        this.distance = endValue - this.getStartValue();
    },

    getValue: function() {
        var deltaTime = Ext.Date.now() - this.getStartTime(),
            omegaTime = Math.min(1, (deltaTime / this.getDuration()));

        return this.getStartValue() + (omegaTime * this.distance);
    }
});
