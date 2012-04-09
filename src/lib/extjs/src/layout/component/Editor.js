/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * Component layout for editors
 * @class Ext.layout.component.Editor
 * @extends Ext.layout.component.Component
 * @private
 */
Ext.define('Ext.layout.component.Editor', {

    /* Begin Definitions */

    alias: ['layout.editor'],

    extend: 'Ext.layout.component.Component',

    /* End Definitions */

    onLayout: function(width, height) {
        var me = this,
            owner = me.owner,
            autoSize = owner.autoSize;
            
        if (autoSize === true) {
            autoSize = {
                width: 'field',
                height: 'field'    
            };
        }
        
        if (autoSize) {
            width = me.getDimension(owner, autoSize.width, 'Width', width);
            height = me.getDimension(owner, autoSize.height, 'Height', height);
        }
        me.setTargetSize(width, height);
        owner.field.setSize(width, height);
    },
    
    getDimension: function(owner, type, dimension, actual){
        var method = 'get' + dimension;
        switch (type) {
            case 'boundEl':
                return owner.boundEl[method]();
            case 'field':
                return owner.field[method]();
            default:
                return actual;
        }
    }
});
