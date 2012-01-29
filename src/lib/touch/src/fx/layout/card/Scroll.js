/**
 * @private
 */
Ext.define('Ext.fx.layout.card.Scroll', {
    extend: 'Ext.fx.layout.card.Abstract',

    requires: [
        'Ext.scroll.easing.EaseOut'
    ],

    alias: 'fx.layout.card.scroll',

    config: {
        duration: 500,

        reverse: null
    },

    constructor: function(config) {
        this.initConfig(config);

        this.doAnimationFrame = Ext.Function.bind(this.doAnimationFrame, this);
    },

    getEasing: function() {
        var easing = this.easing;

        if (!easing) {
            this.easing = easing = new Ext.scroll.easing.EaseOut();
        }

        return easing;
    },

    updateDuration: function(duration) {
        this.getEasing().setDuration(duration + 100);
    },

    onActiveItemChange: function(cardLayout, newItem, oldItem, options, controller) {
        var containerElement, inElement, outElement, easing,
            containerWidth, reverse;

        if (newItem && oldItem) {
            if (this.isAnimating) {
                this.stopAnimation();
            }

            containerElement = this.getLayout().container.innerElement;
            containerWidth = containerElement.getWidth();
            easing = this.getEasing();

            inElement = newItem.renderElement;
            outElement = oldItem.renderElement;

            this.oldItem = oldItem;
            this.newItem = newItem;
            this.currentEventController = controller;
            this.containerElement = containerElement;
            this.isReverse = reverse = this.getReverse();

            newItem.show();

            if (reverse) {
                easing.setConfig({
                    startValue: containerWidth,
                    endValue: 0
                });

                containerElement.dom.scrollLeft = containerWidth;
                outElement.setLeft(containerWidth);
            }
            else {
                easing.setConfig({
                    startValue: 0,
                    endValue: containerWidth
                });

                inElement.setLeft(containerWidth);
            }

            this.startAnimation();

            controller.pause();
        }
    },

    startAnimation: function() {
        this.isAnimating = true;
        this.getEasing().setStartTime(Date.now());
        this.timer = setInterval(this.doAnimationFrame, 20);
        this.doAnimationFrame();
    },

    doAnimationFrame: function() {
        var easing = this.getEasing(),
            value;

        if (easing.isEnded) {
            this.stopAnimation();
        }
        else {
            value = easing.getValue();
            this.containerElement.dom.scrollLeft = value;
        }
    },

    stopAnimation: function() {
        this.currentEventController.resume();

        if (this.isReverse) {
            this.oldItem.renderElement.setLeft(null);
        }
        else {
            this.newItem.renderElement.setLeft(null);
        }

        clearInterval(this.timer);
        this.isAnimating = false;
    }
});
