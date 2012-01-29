/**
 * @class Ext.anims
 */
Ext.apply(Ext.anims, {
    /**
     * Flip Animation
     */
    flip: new Ext.Anim({
        is3d: true,
        direction: 'left',
        before: function(el) {
            var rotateProp = 'Y',
                fromScale = 1,
                toScale = 1,
                fromRotate = 0,
                toRotate = 0;

            if (this.out) {
                toRotate = -180;
                toScale = 0.8;
            }
            else {
                fromRotate = 180;
                fromScale = 0.8;
            }

            if (this.direction == 'up' || this.direction == 'down') {
                rotateProp = 'X';
            }

            if (this.direction == 'right' || this.direction == 'left') {
                toRotate *= -1;
                fromRotate *= -1;
            }

            this.from = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + fromRotate + 'deg) scale(' + fromScale + ')',
                '-webkit-backface-visibility': 'hidden'
            };
            this.to = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + toRotate + 'deg) scale(' + toScale + ')',
                '-webkit-backface-visibility': 'hidden'
            };
        }
    }),
    
    /**
     * Cube Animation
     */
    cube: new Ext.Anim({
        is3d: true,
        direction: 'left',
        style: 'outer',
        before: function(el) {
            var origin = '0% 0%',
                fromRotate = 0,
                toRotate = 0,
                rotateProp = 'Y',
                fromZ = 0,
                toZ = 0,
                fromOpacity = 1,
                toOpacity = 1,
                zDepth,
                elW = el.getWidth(),
                elH = el.getHeight(),
                showTranslateZ = true,
                fromTranslate = ' translateX(0)',
                toTranslate = '';

            if (this.direction == 'left' || this.direction == 'right') {
                if (this.out) {
                    origin = '100% 100%';
                    toZ = elW;
                    toOpacity = 0.5;
                    toRotate = -90;
                } else {
                    origin = '0% 0%';
                    fromZ = elW;
                    fromOpacity = 0.5;
                    fromRotate = 90;
                }
            } else if (this.direction == 'up' || this.direction == 'down') {
                rotateProp = 'X';
                if (this.out) {
                    origin = '100% 100%';
                    toZ = elH;
                    toRotate = 90;
                } else {
                    origin = '0% 0%';
                    fromZ = elH;
                    fromRotate = -90;
                }
            }

            if (this.direction == 'down' || this.direction == 'right') {
                fromRotate *= -1;
                toRotate *= -1;
                origin = (origin == '0% 0%') ? '100% 100%': '0% 0%';
            }

            if (this.style == 'inner') {
                fromZ *= -1;
                toZ *= -1;
                fromRotate *= -1;
                toRotate *= -1;

                if (!this.out) {
                    toTranslate = ' translateX(0px)';
                    origin = '0% 50%';
                } else {
                    toTranslate = fromTranslate;
                    origin = '100% 50%';
                }
            }

            this.from = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + fromRotate + 'deg)' + (showTranslateZ ? ' translateZ(' + fromZ + 'px)': '') + fromTranslate,
                '-webkit-transform-origin': origin
            };
            this.to = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + toRotate + 'deg) translateZ(' + toZ + 'px)' + toTranslate,
                '-webkit-transform-origin': origin
            };
        },
        duration: 250
    }),
    
    
    /**
     * Wipe Animation.
     * <p>Because of the amount of calculations involved, this animation is best used on small display
     * changes or specifically for phone environments. Does not currently accept any parameters.</p>
     */
    wipe: new Ext.Anim({
        before: function(el) {
            var curZ = el.getStyle('z-index'),
                mask = '',
                toSize = '100%',
                fromSize = '100%';

            if (!this.out) {
                zIndex = curZ + 1;
                mask = '-webkit-gradient(linear, left bottom, right bottom, from(transparent), to(#000), color-stop(66%, #000), color-stop(33%, transparent))';
                toSize = el.getHeight() * 100 + 'px';
                fromSize = el.getHeight();

                this.from = {
                    '-webkit-mask-image': mask,
                    '-webkit-mask-size': el.getWidth() * 3 + 'px ' + el.getHeight() + 'px',
                    'z-index': zIndex,
                    '-webkit-mask-position-x': 0
                };
                this.to = {
                    '-webkit-mask-image': mask,
                    '-webkit-mask-size': el.getWidth() * 3 + 'px ' + el.getHeight() + 'px',
                    'z-index': zIndex,
                    '-webkit-mask-position-x': -el.getWidth() * 2 + 'px'
                };
            }
        },
        duration: 500
    })
});