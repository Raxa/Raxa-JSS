/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * Component layout for components which maintain an inner body element which must be resized to synchronize with the
 * Component size.
 * @class Ext.layout.component.Body
 * @extends Ext.layout.component.Component
 * @private
 */

Ext.define('Ext.layout.component.Body', {

    /* Begin Definitions */

    alias: ['layout.body'],

    extend: 'Ext.layout.component.Component',

    uses: ['Ext.layout.container.Container'],

    /* End Definitions */

    type: 'body',
    
    onLayout: function(width, height) {
        var me = this,
            owner = me.owner;

        // Size the Component's encapsulating element according to the dimensions
        me.setTargetSize(width, height);

        // Size the Component's body element according to the content box of the encapsulating element
        me.setBodySize.apply(me, arguments);

        // We need to bind to the owner whenever we do not have a user set height or width.
        if (owner && owner.layout && owner.layout.isLayout) {
            if (!Ext.isNumber(owner.height) || !Ext.isNumber(owner.width)) {
                owner.layout.bindToOwnerCtComponent = true;
            }
            else {
                owner.layout.bindToOwnerCtComponent = false;
            }
        }
        
        me.callParent(arguments);
    },

    /**
     * @private
     * <p>Sizes the Component's body element to fit exactly within the content box of the Component's encapsulating element.<p>
     */
    setBodySize: function(width, height) {
        var me = this,
            owner = me.owner,
            frameSize = owner.frameSize,
            isNumber = Ext.isNumber;

        if (isNumber(width)) {
            width -= owner.el.getFrameWidth('lr') - frameSize.left - frameSize.right;
        }
        if (isNumber(height)) {
            height -= owner.el.getFrameWidth('tb') - frameSize.top - frameSize.bottom;
        }

        me.setElementSize(owner.body, width, height);
    }
});
