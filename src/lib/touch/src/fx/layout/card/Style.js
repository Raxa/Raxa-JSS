/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Style', {

    extend: 'Ext.fx.layout.card.Abstract',

    requires: [
        'Ext.fx.Animation'
    ],

    config: {
        inAnimation: {
            before: {
                visibility: null
            },
            preserveEndState: false,
            replacePrevious: true
        },

        outAnimation: {
            preserveEndState: false,
            replacePrevious: true
        }
    },

    constructor: function(config) {
        var animationConfig = {},
            name, inAnimation, outAnimation;

        this.initConfig(config);

        this.endAnimationCounter = 0;

        inAnimation = this.getInAnimation();
        outAnimation = this.getOutAnimation();

        inAnimation.on('animationend', 'incrementEnd', this);
        outAnimation.on('animationend', 'incrementEnd', this);

        for (name in config) {
            if (config.hasOwnProperty(name)) {
                if (!this.hasConfig(name)) {
                    animationConfig[name] = config[name];
                }
            }
        }

        inAnimation.setConfig(animationConfig);
        outAnimation.setConfig(animationConfig);
    },

    incrementEnd: function() {
        this.endAnimationCounter++;

        if (this.endAnimationCounter > 1) {
            this.endAnimationCounter = 0;
            this.fireEvent('animationend', this);
        }
    },

    applyInAnimation: function(animation, inAnimation) {
        return Ext.factory(animation, Ext.fx.Animation, inAnimation);
    },

    applyOutAnimation: function(animation, outAnimation) {
        return Ext.factory(animation, Ext.fx.Animation, outAnimation);
    },

    updateInAnimation: function(animation) {
        animation.setScope(this);
    },

    updateOutAnimation: function(animation) {
        animation.setScope(this);
    },

    onActiveItemChange: function(cardLayout, newItem, oldItem, options, controller) {
        var inAnimation = this.getInAnimation(),
            outAnimation = this.getOutAnimation(),
            inElement, outElement,
            previousInElement, previousOutElement;

        if (newItem && oldItem) {
            inElement = newItem.renderElement;
            outElement = oldItem.renderElement;

            previousInElement = inAnimation.getElement();
            inAnimation.setElement(inElement);

            previousOutElement = outAnimation.getElement();
            outAnimation.setElement(outElement);

            outAnimation.setOnBeforeEnd(function(element, interrupted) {
                if (interrupted || Ext.Animator.hasRunningAnimations(element)) {
                    controller.firingArguments[1] = null;
                    controller.firingArguments[2] = null;
                }
            });
            outAnimation.setOnEnd(function() {
                controller.resume();
            });

            inElement.dom.style.setProperty('visibility', 'hidden', '!important');
            newItem.show();

            Ext.Animator.run([outAnimation, inAnimation]);
            controller.pause();
        }
    }
});
