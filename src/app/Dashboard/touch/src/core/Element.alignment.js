/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
     * Gets the x,y coordinates specified by the anchor position on the element.
     * @param {String} anchor (optional) The specified anchor position (defaults to "c").  See {@link #alignTo}
     * for details on supported anchor positions.
     * @param {Object} size (optional) An object containing the size to use for calculating anchor position
     * {width: (target width), height: (target height)} (defaults to the element's current size)
     * @return {Array} [x, y] An array containing the element's x and y coordinates
     */
    getAnchorXY: function(anchor, local, size) {
        //Passing a different size is useful for pre-calculating anchors,
        //especially for anchored animations that change the el size.
        anchor = (anchor || "tl").toLowerCase();
        size = size || {};

        var me = this,
            vp = me.dom == document.body || me.dom == document,
            width = size.width || vp ? window.innerWidth: me.getWidth(),
            height = size.height || vp ? window.innerHeight: me.getHeight(),
            xy,
            rnd = Math.round,
            myXY = me.getXY(),
            extraX = vp ? 0: !local ? myXY[0] : 0,
            extraY = vp ? 0: !local ? myXY[1] : 0,
            hash = {
                c: [rnd(width * 0.5), rnd(height * 0.5)],
                t: [rnd(width * 0.5), 0],
                l: [0, rnd(height * 0.5)],
                r: [width, rnd(height * 0.5)],
                b: [rnd(width * 0.5), height],
                tl: [0, 0],
                bl: [0, height],
                br: [width, height],
                tr: [width, 0]
            };

        xy = hash[anchor];
        return [xy[0] + extraX, xy[1] + extraY];
    },

    /**
     * Gets the x,y coordinates to align this element with another element. See {@link #alignTo} for more info on the
     * supported position values.
     * @param {Mixed} element The element to align to.
     * @param {String} position (optional, defaults to "tl-bl?") The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @return {Array} [x, y]
     */
    getAlignToXY: function(el, position, offsets) {
        el = Ext.get(el);

        //<debug>
        if (!el || !el.dom) {
            throw new Error("Element.alignToXY with an element that doesn't exist");
        }
        //</debug>
        offsets = offsets || [0, 0];

        if (!position || position == '?') {
            position = 'tl-bl?';
        }
        else if (! (/-/).test(position) && position !== "") {
            position = 'tl-' + position;
        }
        position = position.toLowerCase();

        var me = this,
            matches = position.match(/^([a-z]+)-([a-z]+)(\?)?$/),
            dw = window.innerWidth,
            dh = window.innerHeight,
            p1 = "",
            p2 = "",
            a1,
            a2,
            x,
            y,
            swapX,
            swapY,
            p1x,
            p1y,
            p2x,
            p2y,
            width,
            height,
            region,
            constrain;

        if (!matches) {
            throw "Element.alignTo with an invalid alignment " + position;
        }

        p1 = matches[1];
        p2 = matches[2];
        constrain = !!matches[3];

        //Subtract the aligned el's internal xy from the target's offset xy
        //plus custom offset to get the aligned el's new offset xy
        a1 = me.getAnchorXY(p1, true);
        a2 = el.getAnchorXY(p2, false);

        x = a2[0] - a1[0] + offsets[0];
        y = a2[1] - a1[1] + offsets[1];

        if (constrain) {
            width = me.getWidth();
            height = me.getHeight();

            region = el.getPageBox();

            //If we are at a viewport boundary and the aligned el is anchored on a target border that is
            //perpendicular to the vp border, allow the aligned el to slide on that border,
            //otherwise swap the aligned el to the opposite border of the target.
            p1y = p1.charAt(0);
            p1x = p1.charAt(p1.length - 1);
            p2y = p2.charAt(0);
            p2x = p2.charAt(p2.length - 1);

            swapY = ((p1y == "t" && p2y == "b") || (p1y == "b" && p2y == "t"));
            swapX = ((p1x == "r" && p2x == "l") || (p1x == "l" && p2x == "r"));

            if (x + width > dw) {
                x = swapX ? region.left - width: dw - width;
            }
            if (x < 0) {
                x = swapX ? region.right: 0;
            }
            if (y + height > dh) {
                y = swapY ? region.top - height: dh - height;
            }
            if (y < 0) {
                y = swapY ? region.bottom: 0;
            }
        }

        return [x, y];
    }

    /*
     * Anchors an element to another element and realigns it when the window is resized.
     * @param {Mixed} element The element to align to.
     * @param {String} position The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @param {Boolean/Object} animate (optional) True for the default animation or a standard Element animation config object
     * @param {Boolean/Number} monitorScroll (optional) True to monitor body scroll and reposition. If this parameter
     * is a number, it is used as the buffer delay (defaults to 50ms).
     * @param {Function} callback The function to call after the animation finishes
     * @return {Ext.Element} this
     */
    // anchorTo : function(el, alignment, offsets, animate, monitorScroll, callback){
    //      var me = this,
    //         dom = me.dom,
    //         scroll = !Ext.isEmpty(monitorScroll),
    //         action = function(){
    //             Ext.fly(dom).alignTo(el, alignment, offsets, animate);
    //             Ext.callback(callback, Ext.fly(dom));
    //         },
    //         anchor = this.getAnchor();
    //
    //     // previous listener anchor, remove it
    //     this.removeAnchor();
    //     Ext.apply(anchor, {
    //         fn: action,
    //         scroll: scroll
    //     });
    //
    //     Ext.EventManager.onWindowResize(action, null);
    //
    //     if(scroll){
    //         Ext.EventManager.on(window, 'scroll', action, null,
    //             {buffer: !isNaN(monitorScroll) ? monitorScroll : 50});
    //     }
    //     action.call(me); // align immediately
    //     return me;
    // },
    /*
     * Remove any anchor to this element. See {@link #anchorTo}.
     * @return {Ext.Element} this
     */
    // removeAnchor : function(){
    //     var me = this,
    //         anchor = this.getAnchor();
    //
    //     if(anchor && anchor.fn){
    //         Ext.EventManager.removeResizeListener(anchor.fn);
    //         if(anchor.scroll){
    //             Ext.EventManager.un(window, 'scroll', anchor.fn);
    //         }
    //         delete anchor.fn;
    //     }
    //     return me;
    // },
    //
    // // private
    // getAnchor : function(){
    //     var data = Ext.Element.data,
    //         dom = this.dom;
    //         if (!dom) {
    //             return;
    //         }
    //         var anchor = data(dom, '_anchor');
    //
    //     if(!anchor){
    //         anchor = data(dom, '_anchor', {});
    //     }
    //     return anchor;
    // },
    /*
     * Aligns this element with another element relative to the specified anchor points. If the other element is the
     * document it aligns it to the viewport.
     * The position parameter is optional, and can be specified in any one of the following formats:
     * <ul>
     *   <li><b>Blank</b>: Defaults to aligning the element's top-left corner to the target's bottom-left corner ("tl-bl").</li>
     *   <li><b>One anchor (deprecated)</b>: The passed anchor position is used as the target element's anchor point.
     *       The element being aligned will position its top-left corner (tl) to that point.  <i>This method has been
     *       deprecated in favor of the newer two anchor syntax below</i>.</li>
     *   <li><b>Two anchors</b>: If two values from the table below are passed separated by a dash, the first value is used as the
     *       element's anchor point, and the second value is used as the target's anchor point.</li>
     * </ul>
     * In addition to the anchor points, the position parameter also supports the "?" character.  If "?" is passed at the end of
     * the position string, the element will attempt to align as specified, but the position will be adjusted to constrain to
     * the viewport if necessary.  Note that the element being aligned might be swapped to align to a different position than
     * that specified in order to enforce the viewport constraints.
     * Following are all of the supported anchor positions:
<pre>
Value  Description
-----  -----------------------------
tl     The top left corner (default)
t      The center of the top edge
tr     The top right corner
l      The center of the left edge
c      In the center of the element
r      The center of the right edge
bl     The bottom left corner
b      The center of the bottom edge
br     The bottom right corner
</pre>
Example Usage:
<pre><code>
// align el to other-el using the default positioning ("tl-bl", non-constrained)
el.alignTo("other-el");

// align the top left corner of el with the top right corner of other-el (constrained to viewport)
el.alignTo("other-el", "tr?");

// align the bottom right corner of el with the center left edge of other-el
el.alignTo("other-el", "br-l?");

// align the center of el with the bottom left corner of other-el and
// adjust the x position by -6 pixels (and the y position by 0)
el.alignTo("other-el", "c-bl", [-6, 0]);
</code></pre>
     * @param {Mixed} element The element to align to.
     * @param {String} position (optional, defaults to "tl-bl?") The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    // alignTo : function(element, position, offsets, animate){
    //      var me = this;
    //     return me.setXY(me.getAlignToXY(element, position, offsets),
    //                      me.preanim && !!animate ? me.preanim(arguments, 3) : false);
    // },
    //
    // // private ==>  used outside of core
    // adjustForConstraints : function(xy, parent, offsets){
    //     return this.getConstrainToXY(parent || document, false, offsets, xy) ||  xy;
    // },
    //
    // // private ==>  used outside of core
    // getConstrainToXY : function(el, local, offsets, proposedXY){
    //      var os = {top:0, left:0, bottom:0, right: 0};
    //
    //     return function(el, local, offsets, proposedXY){
    //         el = Ext.get(el);
    //         offsets = offsets ? Ext.applyIf(offsets, os) : os;
    //
    //         var vw, vh, vx = 0, vy = 0;
    //         if(el.dom == document.body || el.dom == document){
    //             vw =Ext.lib.Dom.getViewWidth();
    //             vh = Ext.lib.Dom.getViewHeight();
    //         }else{
    //             vw = el.dom.clientWidth;
    //             vh = el.dom.clientHeight;
    //             if(!local){
    //                 var vxy = el.getXY();
    //                 vx = vxy[0];
    //                 vy = vxy[1];
    //             }
    //         }
    //
    //         var s = el.getScroll();
    //
    //         vx += offsets.left + s.left;
    //         vy += offsets.top + s.top;
    //
    //         vw -= offsets.right;
    //         vh -= offsets.bottom;
    //
    //         var vr = vx + vw,
    //             vb = vy + vh,
    //             xy = proposedXY || (!local ? this.getXY() : [this.getLeft(true), this.getTop(true)]),
    //             x = xy[0], y = xy[1],
    //             offset = this.getConstrainOffset(),
    //             w = this.dom.offsetWidth + offset,
    //             h = this.dom.offsetHeight + offset;
    //
    //         // only move it if it needs it
    //         var moved = false;
    //
    //         // first validate right/bottom
    //         if((x + w) > vr){
    //             x = vr - w;
    //             moved = true;
    //         }
    //         if((y + h) > vb){
    //             y = vb - h;
    //             moved = true;
    //         }
    //         // then make sure top/left isn't negative
    //         if(x < vx){
    //             x = vx;
    //             moved = true;
    //         }
    //         if(y < vy){
    //             y = vy;
    //             moved = true;
    //         }
    //         return moved ? [x, y] : false;
    //     };
    // }(),
    //
    // // private, used internally
    // getConstrainOffset : function(){
    //     return 0;
    // },
    //
    // /**
    // * Calculates the x, y to center this element on the screen
    // * @return {Array} The x, y values [x, y]
    // */
    // getCenterXY : function(){
    //     return this.getAlignToXY(document, 'c-c');
    // },
    //
    // /**
    // * Centers the Element in either the viewport, or another Element.
    // * @param {Mixed} centerIn (optional) The element in which to center the element.
    // */
    // center : function(centerIn) {
    //     return this.alignTo(centerIn || document, 'c-c');
    // }
});
