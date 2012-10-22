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
        padding: 0,
        items: [{
			xtype: 'fieldset',
            items: [{
                xtype: 'selectfield',
                label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabStore.lab_ord'),
                name: 'drug',
                options: [{
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabStore.amylase'),
                    value: 'amylase'
                }, {
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabStore.basmetpan'),
                    value: 'bmp'
                }, {
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabStore.comblco'),
                    value: 'cbc'
                }, {
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabStore.ffd'),
                    value: 'db'
                }]
			}, {
                xtype: 'checkboxfield',
                name: 'urgent',
                labelWidth: '80px',
                label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabOrderForm.urg'),
                value: '0'
            }]
        }]
    }
});
