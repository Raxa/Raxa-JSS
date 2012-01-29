/**
 * @private
 */
Ext.define('Ext.scroll.scroller.CssPosition', {
    extend: 'Ext.scroll.scroller.Abstract',

    doScrollTo: function(x, y) {
        var domStyle = this.getElement().dom.style;

        if (x !== null) {
            domStyle.left = (-x) + 'px';
        }

        if (y !== null) {
            domStyle.top = (-y) + 'px';
        }
    }
});
