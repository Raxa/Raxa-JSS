/**
 * This is a lab tests dropbox
 * containing various lab tests to choose from
 */
Ext.define("Screener.view.LabStore", {
    xtype: 'labStore',

    extend: 'Ext.form.Panel',

    requires: ['Ext.tab.Panel', 'Ext.form.FieldSet'],

    config: {
        autoscroll: true,
        layout: 'vbox',
        items: [{
            xtype: 'fieldset',
            items: [{
                xtype: 'selectfield',
                label: 'Lab Order',
                name: 'drug',
                options: [{
                    text: 'Amylase',
                    value: 'amylase'
                }, {
                    text: 'Basic Metabolic Panel',
                    value: 'bmp'
                }, {
                    text: 'Complete Blood Count',
                    value: 'cbc'
                }, {
                    text: 'Fetch from database',
                    value: 'db'
                }]
            }]
        }]
    }
});