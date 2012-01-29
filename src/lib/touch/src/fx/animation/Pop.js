/**
 * @private
 */
Ext.define('Ext.fx.animation.Pop', {
    extend: 'Ext.fx.animation.Abstract',

    alias: 'animation.pop',

    alternateClassName: 'Ext.fx.animation.PopIn',

    config: {
        /**
         * @cfg {Boolean} out True if you want to make this animation pop out, instead of pop in.
         * @accessor
         */
        out: false
    },

    getData: function() {
        var to = this.getTo(),
            from = this.getFrom(),
            out = this.getOut();

        if (out) {
            from.set('opacity', 1);
            from.setTransform({
                scale: 1
            });

            to.set('opacity', 0);
            to.setTransform({
                scale: 0
            });
        }
        else {
            from.set('opacity', 0);
            from.setTransform({
                scale: 0
            });

            to.set('opacity', 1);
            to.setTransform({
                scale: 1
            });
        }

        return this.callParent(arguments);
    }
});
