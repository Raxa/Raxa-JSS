/*
 * @class Ext.util.translatable.Abstract
 * @private
 *
 * The abstract class. Sub-classes are expected, at the very least, to implement translation logics inside
 * the 'translate' method
 */
Ext.define('Ext.util.translatable.Abstract', {
    mixins: ['Ext.mixin.Observable'],

    requires: ['Ext.fx.Easing'],

    config: {
        element: null,

        easing: {},

        easingX: {},

        easingY: {},

        fps: 60
    },

    constructor: function(config) {
        var element;

        this.doAnimationFrame = Ext.Function.bind(this.doAnimationFrame, this);

        this.translation = {
            x: 0,
            y: 0
        };

        this.activeEasing = {
            x: null,
            y: null
        };

        this.initialConfig = config;

        if (config && config.element) {
            element = config.element;
            delete config.element;

            this.setElement(element);
        }
    },

    applyElement: function(element) {
        if (!element) {
            return;
        }

        return Ext.get(element);
    },

    updateElement: function(element) {
        this.initConfig(this.initialConfig);
        this.refresh();
    },

    factoryEasing: function(easing) {
        return new Ext.fx.Easing(easing);
    },

    applyEasing: function(easing) {
        easing = this.factoryEasing(easing);

        if (!this.getEasingX()) {
            this.setEasingX(easing);
        }

        if (!this.getEasingY()) {
            this.setEasingY(easing);
        }

        return easing;
    },

    applyEasingX: function(easing) {
        return this.factoryEasing(easing);
    },

    applyEasingY: function(easing) {
        return this.factoryEasing(easing);
    },

    updateFps: function(fps) {
        this.animationInterval = 1000 / fps;
    },

    doTranslate: function(translation) {
        var current = this.translation;

        if ('x' in translation) {
            current.x = translation.x;
        }

        if ('y' in translation) {
            current.y = translation.y;
        }

        return this;
    },

    translate: function(translation, animation) {
        this.stopAnimation();

        if (animation) {
            return this.translateAnimated(translation, animation);
        }

        return this.doTranslate(translation);
    },

    translateAnimated: function(translation, animation) {
        if (!Ext.isObject(animation)) {
            animation = {};
        }

        var easing = animation.easing,
            activeEasing = this.activeEasing,
            current = this.translation,
            now = Ext.Date.now(),
            easingX = ('x' in translation) ? (easing || animation.easingX || this.getEasingX()) : null,
            easingY = ('y' in translation) ? (easing || animation.easingY || this.getEasingY()) : null;

        if (easingX) {
            easingX = this.factoryEasing(easingX);
            easingX.setStartTime(now);
            easingX.setStartValue(current.x);
            easingX.setEndValue(translation.x);

            if ('duration' in animation) {
                easingX.setDuration(animation.duration);
            }
        }

        if (easingY) {
            easingY = this.factoryEasing(easingY);
            easingY.setStartTime(now);
            easingY.setStartValue(current.y);
            easingY.setEndValue(translation.y);

            if ('duration' in animation) {
                easingY.setDuration(animation.duration);
            }
        }

        activeEasing.x = easingX;
        activeEasing.y = easingY;

        this.isAnimating = true;
        this.animationTimer = setInterval(this.doAnimationFrame, this.animationInterval, this);

        this.fireEvent('animationstart', this);
    },

    doAnimationFrame: function() {
        if (!this.isAnimating) {
            return;
        }

        var easing = this.activeEasing,
            easingX = easing.x,
            easingY = easing.y,
            isEasingXEnded = easingX === null || easingX.isEnded,
            isEasingYEnded = easingY === null || easingY.isEnded,
            translation = {};

        if (isEasingXEnded && isEasingYEnded) {
            this.stopAnimation();
            return;
        }

        if (!isEasingXEnded) {
            translation.x = Math.round(easingX.getValue());
        }

        if (!isEasingYEnded) {
            translation.y = Math.round(easingY.getValue());
        }

        this.doTranslate(translation);
        this.fireEvent('animationframe', this, translation);
    },

    stopAnimation: function() {
        if (!this.isAnimating) {
            return;
        }

        var activeEasing = this.activeEasing;

        activeEasing.x = null;
        activeEasing.y = null;

        this.isAnimating = false;

        clearInterval(this.animationTimer);
        this.fireEvent('animationend', this);
    },

    refresh: function() {
        this.translate(this.translation);
    }
});
