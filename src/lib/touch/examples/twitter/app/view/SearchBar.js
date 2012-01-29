/*
 * @class Twitter.view.SearchBar
 * @extends Ext.Toolbar
 * 
 * Contains the textfield required to perform twitter searchs.
 */
Ext.define('Twitter.view.SearchBar', {
    extend: 'Ext.Toolbar',
    xtype : 'searchbar',
    requires: ['Ext.field.Text'],

    config: {
        ui: 'searchbar',
        layout: 'vbox',

        items: [
            {
                xtype: 'title',
                title: 'Twitter Search'
            },
            {
                xtype: 'searchfield',
                placeHolder: 'Search...'
            }
        ]
    }
});
