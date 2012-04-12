/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * Component layout for Ext.form.FieldSet components
 * @class Ext.layout.component.FieldSet
 * @extends Ext.layout.component.Body
 * @private
 */
Ext.define('Ext.layout.component.FieldSet', {
    extend: 'Ext.layout.component.Body',
    alias: ['layout.fieldset'],

    type: 'fieldset',

    doContainerLayout: function() {
        // Prevent layout/rendering of children if the fieldset is collapsed
        if (!this.owner.collapsed) {
            this.callParent();
        }
    }
});
