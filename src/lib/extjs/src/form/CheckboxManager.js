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
 * Private utility class for managing all {@link Ext.form.field.Checkbox} fields grouped by name.
 */
Ext.define('Ext.form.CheckboxManager', {
    extend: 'Ext.util.MixedCollection',
    singleton: true,

    getByName: function(name) {
        return this.filterBy(function(item) {
            return item.name == name;
        });
    },

    getWithValue: function(name, value) {
        return this.filterBy(function(item) {
            return item.name == name && item.inputValue == value;
        });
    },

    getChecked: function(name) {
        return this.filterBy(function(item) {
            return item.name == name && item.checked;
        });
    }
});

