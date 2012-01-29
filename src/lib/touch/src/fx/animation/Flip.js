/**
 * @private
 */
Ext.define('Ext.fx.animation.Flip', {
    extend: 'Ext.fx.animation.Abstract',

    alias: 'animation.flip',

    config: {
        easing: 'ease-in',

        /**
         * @cfg {String} direction The direction of which the slide animates
         * @accessor
         */
        direction: 'right',

        half: false,

        out: null
    },

    getData: function() {
        var from = this.getFrom(),
            to = this.getTo(),
            direction = this.getDirection(),
            out = this.getOut(),
            half = this.getHalf(),
            rotate = (half) ? 90 : 180,
            fromRotateX = 0,
            fromRotateY = 0,
            toRotateX = 0,
            toRotateY = 0;

        switch (direction) {
            case this.DIRECTION_UP:
                if (out) {
                    toRotateX = rotate;
                }
                else {
                    fromRotateX = -rotate;
                }
                break;

            case this.DIRECTION_DOWN:
                if (out) {
                    toRotateX = -rotate;
                }
                else {
                    fromRotateX = rotate;
                }
                break;

            case this.DIRECTION_RIGHT:
                if (out) {
                    toRotateY = -rotate;
                }
                else {
                    fromRotateY = rotate;
                }
                break;

            case this.DIRECTION_LEFT:
                if (out) {
                    toRotateY = -rotate;
                }
                else {
                    fromRotateY = rotate;
                }
                break;
        }

        from.setTransform({
            rotateX: fromRotateX,
            rotateY: fromRotateY
        });

        to.setTransform({
            rotateX: toRotateX,
            rotateY: toRotateY
        });

        return this.callParent(arguments);
    }
});
