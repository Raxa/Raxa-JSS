Ext.define('Ext.util.OffsetConstraint', {
    config: {
        from: null,

        to: null
    },

    constructor: function(from, to) {
        var fromBox = this.getBoundingBox(from),
            toBox = this.getBoundingBox(to);
    },

    applyFrom: function() {

    },

    getBoundingBox: function(dom) {
        return dom.getBoundingClientRect();
    }
});
