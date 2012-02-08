/*
 * @class Ext.util.translatable.ScrollPosition
 * @private
 *
 * Scroll position implementation
 */
Ext.define('Ext.util.translatable.ScrollPosition', {
    extend: 'Ext.util.translatable.Abstract',

    wrapperWidth: 0,
    wrapperHeight: 0,

    baseCls: 'x-translatable',

    getWrapper: function() {
        var wrapper = this.wrapper,
            baseCls = this.baseCls,
            element = this.getElement(),
            container;

        if (!wrapper) {
            container = element.getParent();

            if (!container) {
                return null;
            }

            wrapper = element.wrap({
                className: baseCls + '-wrapper'
            });

            wrapper.insertFirst(Ext.Element.create({
                className: baseCls + '-stretcher'
            }));

            element.addCls(baseCls);
            container.addCls(baseCls + '-container');

            this.container = container;
            this.wrapper = wrapper;

            this.refresh();
        }

        return wrapper;
    },

    doTranslate: function(translation) {
        var wrapper = this.getWrapper(),
            wrapperDom;

        if (wrapper) {
            wrapperDom = wrapper.dom;

            if ('x' in translation) {
                wrapperDom.scrollLeft = this.wrapperWidth - translation.x;
            }

            if ('y' in translation) {
                wrapperDom.scrollTop = this.wrapperHeight - translation.y;
            }
        }

        return this.callParent(arguments);
    },

    refresh: function() {
        var wrapper = this.getWrapper(),
            wrapperDom;

        if (wrapper) {
            wrapperDom = wrapper.dom;

            this.wrapperWidth = wrapperDom.offsetWidth;
            this.wrapperHeight = wrapperDom.offsetHeight;

            this.callParent(arguments);
        }
    },

    destroy: function() {
        var element = this.getElement(),
            wrapper = this.getWrapper(),
            baseCls = this.baseCls;

        if (wrapper) {
            this.container.removeCls(baseCls + '-container');
            element.unwrap();
            element.removeCls(baseCls);
            wrapper.destroy();
        }

        this.callParent(arguments);
    }
});
