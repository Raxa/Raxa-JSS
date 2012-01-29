/**
 * @private
 */
Ext.define('Ext.scroll.easing.BoundMomentum', {
    extend: 'Ext.scroll.easing.Easing',

    requires: [
        'Ext.scroll.easing.Momentum',
        'Ext.scroll.easing.Bounce'
    ],

    config: {
        momentum: null,

        bounce: null,

        minMomentumValue: 0,

        maxMomentumValue: 0,

        minVelocity: 0.01,

        startVelocity: 0
    },

    applyMomentum: function(config, currentEasing) {
        return Ext.factory(config, Ext.scroll.easing.Momentum, currentEasing);
    },

    applyBounce: function(config, currentEasing) {
        return Ext.factory(config, Ext.scroll.easing.Bounce, currentEasing);
    },

    updateStartTime: function(startTime) {
        this.getMomentum().setStartTime(startTime);

        this.callParent(arguments);
    },

    updateStartVelocity: function(startVelocity) {
        this.getMomentum().setStartVelocity(startVelocity);
    },

    updateStartValue: function(startValue) {
        this.getMomentum().setStartValue(startValue);
    },

    reset: function() {
        this.lastValue = null;

        this.isBouncingBack = false;

        this.isOutOfBound = false;

        return this.callParent(arguments);
    },

    getValue: function() {
        var momentum = this.getMomentum(),
            bounce = this.getBounce(),
            startVelocity = momentum.getStartVelocity(),
            direction = startVelocity > 0 ? 1 : -1,
            minValue = this.getMinMomentumValue(),
            maxValue = this.getMaxMomentumValue(),
            boundedValue = (direction == 1) ? maxValue : minValue,
            lastValue = this.lastValue,
            value, velocity;

        if (startVelocity === 0) {
            return this.getStartValue();
        }

        if (!this.isOutOfBound) {
            value = momentum.getValue();
            velocity = momentum.getVelocity();

            if (Math.abs(velocity) < this.getMinVelocity()) {
                this.isEnded = true;
            }

            if (value >= minValue && value <= maxValue) {
                return value;
            }

            this.isOutOfBound = true;

            bounce.setStartTime(Ext.Date.now())
                  .setStartVelocity(velocity)
                  .setStartValue(boundedValue);
        }

        value = bounce.getValue();

        if (!this.isEnded) {
            if (!this.isBouncingBack) {
                if (lastValue !== null) {
                    if ((direction == 1 && value < lastValue) || (direction == -1 && value > lastValue)) {
                        this.isBouncingBack = true;
                    }
                }
            }
            else {
                if (Math.round(value) == boundedValue) {
                    this.isEnded = true;
                }
            }
        }

        this.lastValue = value;

        return value;
    }
});
