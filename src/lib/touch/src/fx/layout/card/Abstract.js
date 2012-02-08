/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Abstract', {
    extend: 'Ext.Evented',
    isAnimation: true,

    config: {
        reverse: null,

        layout: null
    },

    updateLayout: function() {
        this.enable();
    },

    enable: function() {
        var layout = this.getLayout();

        if (layout) {
            layout.onBefore('activeitemchange', 'onActiveItemChange', this);
        }
    },

    disable: function() {
        var layout = this.getLayout();

        if (layout) {
            layout.unBefore('activeitemchange', 'onActiveItemChange', this);
        }
    },

    onActiveItemChange: Ext.emptyFn,

    destroy: function() {
        var layout = this.getLayout();

        if (layout) {
            layout.unBefore('activeitemchange', 'onActiveItemChange', this);
        }
        this.setLayout(null);
    }
});
