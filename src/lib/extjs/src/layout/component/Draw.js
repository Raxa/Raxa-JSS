/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.layout.component.Draw
 * @extends Ext.layout.component.Component
 * @private
 *
 */

Ext.define('Ext.layout.component.Draw', {

    /* Begin Definitions */

    alias: 'layout.draw',

    extend: 'Ext.layout.component.Auto',

    /* End Definitions */

    type: 'draw',

    onLayout : function(width, height) {
        this.owner.surface.setSize(width, height);
        this.callParent(arguments);
    }
});
