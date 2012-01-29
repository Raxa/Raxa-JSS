/**
 * @private
 */
Ext.define('Ext.scroll.easing.Easing', {

    config: {
        startTime: 0,
        startValue: 0
    },

    isEnded: false,

    constructor: function(config) {
        this.initConfig(config);

        return this;
    },

    clone: function() {
        var config = this.config,
            cloneConfig = {},
            name;

        for (name in config) {
            if (config.hasOwnProperty(name)) {
                cloneConfig[name] = this[name];
            }
        }

        return new this.self(cloneConfig);
    },

    applyStartTime: function(startTime) {
        if (!startTime) {
            startTime = Ext.Date.now();
        }

        return startTime;
    },

    updateStartTime: function(startTime) {
        this.reset();
    },

    reset: function() {
        this.isEnded = false;
    },

    getValue: Ext.emptyFn
});
