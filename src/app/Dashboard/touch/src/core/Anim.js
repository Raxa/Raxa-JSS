/**
 * @class Ext.Anim
 * @extends Object
 * <p>Ext.Anim is used to excute animations defined in {@link Ext.anims}. The {@link #run} method can take any of the 
 * properties defined below.</p>
 * 
 * <h2>Example usage:</h2>
 * <code><pre>
Ext.Anim.run(this, 'fade', {
    out: false,
    autoClear: true
});
 * </pre></code>
 * 
 * <p>Animations are disabled on Android and Blackberry by default using the {@link #disableAnimations} property.</p>
 * @singleton
 */
Ext.Anim = Ext.extend(Object, {
    isAnim: true,
    
    /**
     * @cfg {Boolean} disableAnimations
     * True to disable animations. By default, animations are disabled on Android and Blackberry
     */
    disableAnimations: false,
//    disableAnimations: (!Ext.is.iOS || Ext.is.Blackberry) ? true : false,

    defaultConfig: {
        /**
         * @cfg {Object} from
         * An object of CSS values which the animation begins with. If you define a CSS property here, you must also 
         * define it in the {@link #to} config.
         */
        from: {},

        /**
         * @cfg {Object} to
         * An object of CSS values which the animation ends with. If you define a CSS property here, you must also 
         * define it in the {@link #from} config.
         */
        to: {},

        /**
         * @cfg {Number} duration
         * Time in milliseconds for the animation to last. 
         * (Defaults to 250).
         */
        duration: 250,

        /**
         * @cfg {Number} delay Time to delay before starting the animation. 
         * (Defaults to 0).
         */
        delay: 0,

        /**
         * @cfg {String} easing
         * Valid values are 'ease', 'linear', ease-in', 'ease-out', 'ease-in-out' or a cubic-bezier curve as defined by CSS. 
         * (Defaults to 'ease-in-out').
         */
        easing: 'ease-in-out',

        /**
         * @cfg {Boolean} autoClear
         * True to remove all custom CSS defined in the {@link #to} config when the animation is over. 
         * (Defaults to true).
         */
        autoClear: true,

        /**
         * @cfg {Boolean} out
         * True if you want the animation to slide out of the screen. 
         * (Defaults to true).
         */
        out: true,

        /**
         * @cfg {String} direction
         * Valid values are 'left', 'right', 'up', 'down' and null. 
         * (Defaults to null).
         */
        direction: null,

        /**
         * @cfg {Boolean} reverse
         * True to reverse the animation direction. For example, if the animation direction was set to 'left', it would 
         * then use 'right'. 
         * (Defaults to false).
         */
        reverse: false
    },

    /**
     * @cfg {Function} before
     * Code to execute before starting the animation.
     */

    /**
     * @cfg {Scope} scope
     * Scope to run the {@link before} function in.
     */

    opposites: {
        'left': 'right',
        'right': 'left',
        'up': 'down',
        'down': 'up'
    },

    constructor: function(config) {
        config = Ext.apply({}, config || {}, this.defaultConfig);
        this.config = config;

        Ext.Anim.superclass.constructor.call(this);

        this.running = {};
    },

    initConfig : function(el, runConfig) {
        var me = this,
            runtime = {},
            config = Ext.apply({}, runConfig || {}, me.config);

        config.el = el = Ext.get(el);

        if (config.reverse && me.opposites[config.direction]) {
            config.direction = me.opposites[config.direction];
        }

        if (me.config.before) {
            me.config.before.call(config, el, config);
        }

        if (runConfig.before) {
            runConfig.before.call(config.scope || config, el, config);
        }

        return config;
    },
    
    run: function(el, config) {
        el = Ext.get(el);
        config = config || {};


        var me = this,
            style = el.dom.style,
            property,
            after = config.after;

        if (me.running[el.id]) {
            me.onTransitionEnd(null, el, {
                config: config,
                after: after
            });
        }

        config = this.initConfig(el, config);

        if (this.disableAnimations) {
            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = config.to[property];
            }
            this.onTransitionEnd(null, el, {
                config: config,
                after: after
            });
            return me;
        }

        el.un('webkitTransitionEnd', me.onTransitionEnd, me);

        style.webkitTransitionDuration = '0ms';
        for (property in config.from) {
            if (!config.from.hasOwnProperty(property)) {
                continue;
            }
            style[property] = config.from[property];
        }

        setTimeout(function() {
            // If this element has been destroyed since the timeout started, do nothing
            if (!el.dom) {
                return;
            }
            
            // If this is a 3d animation we have to set the perspective on the parent
            if (config.is3d === true) {
                el.parent().setStyle({
                    // TODO: Ability to set this with 3dConfig
                    '-webkit-perspective': '1200',
                    '-webkit-transform-style': 'preserve-3d'
                });
            }

            style.webkitTransitionDuration = config.duration + 'ms';
            style.webkitTransitionProperty = 'all';
            style.webkitTransitionTimingFunction = config.easing;

            // Bind our listener that fires after the animation ends
            el.on('webkitTransitionEnd', me.onTransitionEnd, me, {
                config: config,
                after: after
            });

            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = config.to[property];
            }
        }, config.delay || 5);

        me.running[el.id] = config;
        return me;
    },

    onTransitionEnd: function(ev, el, o) {
        el = Ext.get(el);

        if (this.running[el.id] === undefined) {
            return;
        }

        var style = el.dom.style,
            config = o.config,
            property,
            me = this;
            
        el.un('webkitTransitionEnd', me.onTransitionEnd, me);

        if (config.autoClear) {
            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = '';
            }
        }

        style.webkitTransitionDuration = null;
        style.webkitTransitionProperty = null;
        style.webkitTransitionTimingFunction = null;

        if (config.is3d) {
            el.parent().setStyle({
                '-webkit-perspective': '',
                '-webkit-transform-style': ''
            });
        }

        if (me.config.after) {
            me.config.after.call(config, el, config);
        }

        if (o.after) {
            o.after.call(config.scope || me, el, config);
        }

        delete me.running[el.id];
    }
});

Ext.Anim.seed = 1000;

/**
 * Used to run an animation on a specific element. Use the config argument to customize the animation
 * @param {Ext.Element/Element} el The element to animate
 * @param {String} anim The animation type, defined in {@link #Ext.anims}
 * @param {Object} config The config object for the animation
 * @method run
 */
Ext.Anim.run = function(el, anim, config) {
    if (el.isComponent) {
        el = el.el;
    }

    config = config || {};

    if (anim.isAnim) {
        anim.run(el, config);
    }
    else {
        if (Ext.isObject(anim)) {
            if (config.before && anim.before) {
                config.before = Ext.createInterceptor(config.before, anim.before, anim.scope);
            }
            if (config.after && anim.after) {
                config.after = Ext.createInterceptor(config.after, anim.after, anim.scope);
            }
            config = Ext.apply({}, config, anim);
            anim = anim.type;
        }

        if (!Ext.anims[anim]) {
            throw anim + ' is not a valid animation type.';
        }
        else {
            // add el check to make sure dom exists.
            if (el && el.dom) {
                Ext.anims[anim].run(el, config);
            }

        }
    }
};

/**
 * @class Ext.anims
 * <p>Defines different types of animations. <strong>flip, cube, wipe</strong> animations do not work on Android.</p>
 * <p>Please refer to {@link Ext.Anim} on how to use animations.</p>
 * @singleton
 */
Ext.anims = {
    /**
     * Fade Animation
     */
    fade: new Ext.Anim({
        before: function(el) {
            var fromOpacity = 1,
                toOpacity = 1,
                curZ = el.getStyle('z-index') == 'auto' ? 0 : el.getStyle('z-index'),
                zIndex = curZ;

            if (this.out) {
                toOpacity = 0;
            } else {
                zIndex = curZ + 1;
                fromOpacity = 0;
            }

            this.from = {
                'opacity': fromOpacity,
                'z-index': zIndex
            };
            this.to = {
                'opacity': toOpacity,
                'z-index': zIndex
            };
        }
    }),

    /**
     * Slide Animation
     */
    slide: new Ext.Anim({
        direction: 'left',
        cover: false,
        reveal: false,

        before: function(el) {
            var curZ = el.getStyle('z-index') == 'auto' ? 0 : el.getStyle('z-index'),
                zIndex = curZ + 1,
                toX = 0,
                toY = 0,
                fromX = 0,
                fromY = 0,
                elH = el.getHeight(),
                elW = el.getWidth();

            if (this.direction == 'left' || this.direction == 'right') {
                if (this.out == true) {
                    toX = -elW;
                }
                else {
                    fromX = elW;
                }
            }
            else if (this.direction == 'up' || this.direction == 'down') {
                if (this.out == true) {
                    toY = -elH;
                }
                else {
                    fromY = elH;
                }
            }

            if (this.direction == 'right' || this.direction == 'down') {
                toY *= -1;
                toX *= -1;
                fromY *= -1;
                fromX *= -1;
            }

            if (this.cover && this.out) {
                toX = 0;
                toY = 0;
                zIndex = curZ;
            }
            else if (this.reveal && !this.out) {
                fromX = 0;
                fromY = 0;
                zIndex = curZ;
            }

            this.from = {
                '-webkit-transform': 'translate3d(' + fromX + 'px, ' + fromY + 'px, 0)',
                'z-index': zIndex,
                'opacity': 0.99
            };
            this.to = {
                '-webkit-transform': 'translate3d(' + toX + 'px, ' + toY + 'px, 0)',
                'z-index': zIndex,
                'opacity': 1
            };
        }
    }),

    /**
     * Pop Animation
     */
    pop: new Ext.Anim({
        scaleOnExit: true,
        before: function(el) {
            var fromScale = 1,
                toScale = 1,
                fromOpacity = 1,
                toOpacity = 1,
                curZ = el.getStyle('z-index') == 'auto' ? 0 : el.getStyle('z-index'),
                fromZ = curZ,
                toZ = curZ;

            if (!this.out) {
                fromScale = 0.01;
                fromZ = curZ + 1;
                toZ = curZ + 1;
                fromOpacity = 0;
            }
            else {
                if (this.scaleOnExit) {
                    toScale = 0.01;
                    toOpacity = 0;
                } else {
                    toOpacity = 0.8;
                }
            }

            this.from = {
                '-webkit-transform': 'scale(' + fromScale + ')',
                '-webkit-transform-origin': '50% 50%',
                'opacity': fromOpacity,
                'z-index': fromZ
            };

            this.to = {
                '-webkit-transform': 'scale(' + toScale + ')',
                '-webkit-transform-origin': '50% 50%',
                'opacity': toOpacity,
                'z-index': toZ
            };
        }
    })
};