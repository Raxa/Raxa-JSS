/*
 * @class Ext.util.translatable.CssTransform
 * @private
 *
 * CSS Transform implementation
 */

Ext.define('Ext.util.translatable.CssTransform', {
    extend: 'Ext.util.translatable.Abstract',

    doTranslate: function(translation) {
        var domStyle = this.getElement().dom.style,
            current = this.translation,
            x, y;

        if ('x' in translation) {
            x = translation.x;
        }
        else {
            x = current.x;
        }

        if ('y' in translation) {
            y = translation.y;
        }
        else {
            y = current.y;
        }

        domStyle.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';

        return this.callParent(arguments);
    },

    destroy: function() {
        var element = this.getElement();
        if (element && !element.isDestroyed) {
            element.dom.style.webkitTransform = null;
        }

        this.callParent(arguments);
    }
});
