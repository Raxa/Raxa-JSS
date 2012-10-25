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
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabOrderForm.lio')
        }, {
			layout: 'hbox',
			items: [{
		        xtype: 'labStore',
		        width: '350px',
		        height: '150px'
		    }, {
				layout: 'vbox',
				items: [{
				    xtype: 'button',
				    ui: 'round',
				    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabOrderForm.plus'),
				    id: 'addLabOrderButton',
				    height: '40px',
				    width: '100px'
				}, {
				    xtype: 'spacer',
				    height: 10
				}, {
					xtype: 'button',
				    ui: 'round',
				    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.LabOrderForm.minus'),
				    id: 'removeLabOrderButton',
				    height: '40px',
				    width: '100px'
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
			}]
		}]
    }
});
