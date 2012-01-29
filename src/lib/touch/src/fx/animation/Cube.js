/**
 * @private
 */
Ext.define('Ext.fx.animation.Cube', {
    extend: 'Ext.fx.animation.Abstract',

    alias: 'animation.cube',

    config: {
        // @inherit
        before: {
            'transform-style': 'preserve-3d'
        },

        /**
         * @cfg {String} direction The direction of which the slide animates
         * @accessor
         */
        direction: 'right',

        out: false
    },

    getData: function() {
        var to = this.getTo(),
            from = this.getFrom(),
            out  = this.getOut(),
            direction  = this.getDirection(),
            el = this.getElement(),
            elW = el.getWidth(),
            elH = el.getHeight(),
            halfWidth = (elW / 2),
            halfHeight = (elH / 2),
            fromTransform = {},
            toTransform = {},
            originalFromTransform = {
                rotateY: 0,
                translateX: 0,
                translateZ: 0
            },
            originalToTransform = {
                rotateY: 90,
                translateX: halfWidth,
                translateZ: halfWidth
            },
            originalVerticalFromTransform = {
                rotateX: 0,
                translateY: 0,
                translateZ: 0
            },
            originalVerticalToTransform = {
                rotateX: 90,
                translateY: halfHeight,
                translateZ: halfHeight
            },
            tempTransform;

        if (direction == "left" || direction == "right") {
            if (out) {
                toTransform = originalToTransform;
                fromTransform = originalFromTransform;
            } else {
                toTransform = originalFromTransform;
                fromTransform = originalToTransform;
                fromTransform.rotateY *= -1;
                fromTransform.translateX *= -1;
            }

            if (direction === 'right') {
                tempTransform = fromTransform;
                fromTransform = toTransform;
                toTransform = tempTransform;
            }
        }

        if (direction == "up" || direction == "down") {
            if (out) {
                toTransform = originalVerticalFromTransform;
                fromTransform = {
                    rotateX: -90,
                    translateY: halfHeight,
                    translateZ: halfHeight
                };
            } else {
                fromTransform = originalVerticalFromTransform;
                toTransform = {
                    rotateX: 90,
                    translateY: -halfHeight,
                    translateZ: halfHeight
                };
            }

            if (direction == "up") {
                tempTransform = fromTransform;
                fromTransform = toTransform;
                toTransform = tempTransform;
            }
        }

        from.set('transform', fromTransform);
        to.set('transform', toTransform);

        return this.callParent(arguments);
    }
});
