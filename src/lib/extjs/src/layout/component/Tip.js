/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * Component layout for Tip/ToolTip/etc. components
 * @class Ext.layout.component.Tip
 * @extends Ext.layout.component.Dock
 * @private
 */

Ext.define('Ext.layout.component.Tip', {

    /* Begin Definitions */

    alias: ['layout.tip'],

    extend: 'Ext.layout.component.Dock',

    /* End Definitions */

    type: 'tip',
    
    onLayout: function(width, height) {
        var me = this,
            owner = me.owner,
            el = owner.el,
            minWidth,
            maxWidth,
            naturalWidth,
            constrainedWidth,
            xy = el.getXY();

        // Position offscreen so the natural width is not affected by the viewport's right edge
        el.setXY([-9999,-9999]);

        // Calculate initial layout
        this.callParent(arguments);

        // Handle min/maxWidth for auto-width tips
        if (!Ext.isNumber(width)) {
            minWidth = owner.minWidth;
            maxWidth = owner.maxWidth;
            // IE6/7 in strict mode have a problem doing an autoWidth
            if (Ext.isStrict && (Ext.isIE6 || Ext.isIE7)) {
                constrainedWidth = me.doAutoWidth();
            } else {
                naturalWidth = el.getWidth();
            }
            if (naturalWidth < minWidth) {
                constrainedWidth = minWidth;
            }
            else if (naturalWidth > maxWidth) {
                constrainedWidth = maxWidth;
            }
            if (constrainedWidth) {
                this.callParent([constrainedWidth, height]);
            }
        }

        // Restore position
        el.setXY(xy);
    },
    
    doAutoWidth: function(){
        var me = this,
            owner = me.owner,
            body = owner.body,
            width = body.getTextWidth();
            
        if (owner.header) {
            width = Math.max(width, owner.header.getWidth());
        }
        if (!Ext.isDefined(me.frameWidth)) {
            me.frameWidth = owner.el.getWidth() - body.getWidth();
        }
        width += me.frameWidth + body.getPadding('lr');
        return width;
    }
});

