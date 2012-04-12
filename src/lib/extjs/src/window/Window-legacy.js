/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/*
 * @class Ext.window.Window
 */
Ext.Window.override({
    /*
     * Anchors this window to another element and realigns it when the window is resized or scrolled.
     * @param {String/HTMLElement/Ext.Element} element The element to align to.
     * @param {String} position The position to align to (see {@link Ext.Element#alignTo} for more details)
     * @param {Number[]} offsets (optional) Offset the positioning by [x, y]
     * @param {Boolean/Number} monitorScroll (optional) true to monitor body scroll and reposition. If this parameter
     * is a number, it is used as the buffer delay (defaults to 50ms).
     * @return {Ext.window.Window} this
     */
    anchorTo: function(el, alignment, offsets, monitorScroll) {
        this.clearAnchor();
        this.anchorTarget = {
            el: el,
            alignment: alignment,
            offsets: offsets
        };

        Ext.EventManager.onWindowResize(this.doAnchor, this);
        var tm = typeof monitorScroll;
        if (tm != 'undefined') {
            Ext.EventManager.on(window, 'scroll', this.doAnchor, this,
            {
                buffer: tm == 'number' ? monitorScroll: 50
            });
        }
        return this.doAnchor();
    },

    /*
     * Performs the anchor, using the saved anchorTarget property.
     * @return {Ext.window.Window} this
     * @private
     */
    doAnchor: function() {
        var o = this.anchorTarget;
        this.alignTo(o.el, o.alignment, o.offsets);
        return this;
    },

    /*
     * Removes any existing anchor from this window. See {@link #anchorTo}.
     * @return {Ext.window.Window} this
     */
    clearAnchor: function() {
        if (this.anchorTarget) {
            Ext.EventManager.removeResizeListener(this.doAnchor, this);
            Ext.EventManager.un(window, 'scroll', this.doAnchor, this);
            delete this.anchorTarget;
        }
        return this;
    }
});
