/**
 * @private
 */
Ext.define('Ext.scroll.easing.Bounce', {

    extend: 'Ext.scroll.easing.Easing',

    config: {
        springTension: 0.3,
        acceleration: 30,
        startVelocity: 0
    },

    getValue: function() {
        var deltaTime = Ext.Date.now() - this.getStartTime(),
            theta = (deltaTime / this.getAcceleration()),
            powTime = theta * Math.pow(Math.E, -this.getSpringTension() * theta);

        return this.getStartValue() + (this.getStartVelocity() * powTime);
    }
});
