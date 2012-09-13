/**
 * This screen shows a Lab order form 
 * with a button to add additional test and a submit button.The left side shows patient
 * list
 */
Ext.define("Screener.view.LabOrderForm", {
    xtype: 'labOrderForm',

    extend: 'Ext.form.Panel',

    requires: ['Ext.tab.Panel', 'Ext.form.FieldSet'],

    config: {
        styleHtmlContent: false,
        xtype: 'orderform',
        autoscroll: true,
        layout: 'vbox',
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabOrderForm.lio')
        }, {
            xtype: 'labStore',
            width: '350px',
            height: '70px'
        }, {
            xtype: 'fieldset',
            width: '200px',
            items: [{
                xtype: 'checkboxfield',
                name: 'urgent',
                labelWidth: '80px',
                label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabOrderForm.urg'),
                value: '0'
            }]
        }, {
            xtype: 'button',
            ui: 'round',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabOrderForm.add_adt'),
            id: 'addLabOrderButton',
            height: '40px',
            width: '200px'
        }, {
            xtype: 'spacer',
            height: 10
        }, {
            xtype: 'button',
            ui: 'confirm',
            text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabOrderForm.submit'),
            id: 'sumbitLabButton',
            height: '40px',
            width: '100px'
        }]
    }
});