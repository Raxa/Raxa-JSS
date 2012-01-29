/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Flip', {
    extend: 'Ext.fx.layout.card.Style',

    alias: 'fx.layout.card.flip',

    config: {
        duration: 500,

        inAnimation: {
            type: 'flip',
            half: true,
            easing: 'ease-out'
        },
        outAnimation: {
            type: 'flip',
            half: true,
            easing: 'ease-in',
            out: true
        }
    },

    updateDuration: function(duration) {
        var halfDuration = duration / 2,
            inAnimation = this.getInAnimation(),
            outAnimation = this.getOutAnimation();

        inAnimation.setDelay(halfDuration);
        inAnimation.setDuration(halfDuration);
        outAnimation.setDuration(halfDuration);
    }
});
