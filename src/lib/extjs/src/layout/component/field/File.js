/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @private
 * @class Ext.layout.component.field.File
 * @extends Ext.layout.component.field.Field
 * Layout class for {@link Ext.form.field.File} fields. Adjusts the input field size to accommodate
 * the file picker trigger button.
 * @private
 */

Ext.define('Ext.layout.component.field.File', {
    alias: ['layout.filefield'],
    extend: 'Ext.layout.component.field.Field',

    type: 'filefield',

    sizeBodyContents: function(width, height) {
        var me = this,
            owner = me.owner;

        if (!owner.buttonOnly) {
            // Decrease the field's width by the width of the button and the configured buttonMargin.
            // Both the text field and the button are floated left in CSS so they'll stack up side by side.
            me.setElementSize(owner.inputEl, Ext.isNumber(width) ? width - owner.button.getWidth() - owner.buttonMargin : width);
        }
    }
});
