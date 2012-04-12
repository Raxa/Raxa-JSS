/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.layout.component.ProgressBar
 * @extends Ext.layout.component.Component
 * @private
 */

Ext.define('Ext.layout.component.ProgressBar', {

    /* Begin Definitions */

    alias: ['layout.progressbar'],

    extend: 'Ext.layout.component.Component',

    /* End Definitions */

    type: 'progressbar',

    onLayout: function(width, height) {
        var me = this,
            owner = me.owner,
            textEl = owner.textEl;
        
        me.setElementSize(owner.el, width, height);
        textEl.setWidth(owner.el.getWidth(true));
        
        me.callParent([width, height]);
        
        owner.updateProgress(owner.value);
    }
});
