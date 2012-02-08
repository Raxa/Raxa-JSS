Ext.define('Ext.scroll.scroller.ScrollPosition', {
    extend: 'Ext.scroll.scroller.CssPosition',

    config: {
        stretcherCls: 'x-scroll-stretcher'
    },

    constructor: function() {
        this.stretchSize = { x: 0, y: 0 };

        return this.callParent(arguments);
    },

    getStretcher: function() {
        var stretcher = this.stretcher,
            element;

        if (!stretcher) {
            element = this.getElement();

            if (element) {
                this.stretcher = stretcher = Ext.Element.create({
                    className: this.getStretcherCls()
                });
                stretcher.insertBefore(element);
            }
        }

        return stretcher;
    },

    stretch: function(x, y) {
        var strechSize = this.stretchSize,
            stretcher = this.getStretcher(),
            element = this.getElement();

        strechSize.x = x;
        strechSize.y = y;

        stretcher.setWidth(x * 3);
        stretcher.setHeight(y * 3);

        element.setLeft(x);
        element.setTop(y);

        return this;
    },

    shrink: function() {
        var stretcher = this.getStretcher(),
            element = this.getElement();

        stretcher.setWidth(0);
        stretcher.setHeight(0);

        element.setLeft(0);
        element.setTop(0);
    },

    doScrollTo: function(x, y) {
        var containerDom = this.getContainer().dom,
            stretchSize = this.stretchSize;

        if (x !== null) {
            containerDom.scrollLeft = x + stretchSize.x;
        }

        if (y !== null) {
            containerDom.scrollTop = y + stretchSize.y;
        }
    },

    determinePosition: function() {
        var containerDom = this.getContainer().dom,
            stretchSize = this.stretchSize;

        return {
            x: containerDom.scrollLeft - stretchSize.x,
            y: containerDom.scrollTop - stretchSize.y
        };
    },

    onTouchStart: function() {
        var position = this.determinePosition();

        this.scrollTo(position.x, position.y);

        this.callParent(arguments);
    },

    onAfterInitialized: function() {
        this.callParent(arguments);

        this.refreshStretch();
    },

    refresh: function() {
        this.callParent(arguments);

        this.refreshStretch();
    },

    refreshStretch: function() {
        var position = this.position,
            size,
            containerSize,
            stretchX, stretchY;

        this.shrink();

        size = this.getSize();
        containerSize = this.getContainerSize();

        stretchX = Math.max(size.x, containerSize.x);
        stretchY = Math.max(size.y, containerSize.y);

        this.stretch(stretchX, stretchY);

        this.doScrollTo(position.x, position.y);
    },

    destroy: function() {
        var element = this.getElement();

        if (element) {
            this.getStretcher().destroy();
            element.setLeft(null);
            element.setTop(null);
        }

        this.callParent(arguments);
    }
});
