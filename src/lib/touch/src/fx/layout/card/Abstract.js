/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Abstract', {
    isAnimation: true,

    config: {
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
    }
});
