/**
 * @private
 */
Ext.define('Ext.scroll.scroller.CssTransform', {
    extend: 'Ext.scroll.scroller.Abstract',

    doScrollTo: function(x, y) {
        var dom = this.getElement().dom,
            position = this.position;

        if (x === null) {
            x = position.x;
        }

        x = -x;

        if (y === null) {
            y = position.y;
        }

        y = -y;

        dom.style.webkitTransform = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
    }
});
