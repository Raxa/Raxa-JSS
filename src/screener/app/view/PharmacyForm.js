/**
 * This screen shows a drug order form 
 * with a button to add additional medications and a submit button.The left side shows patient
 * list
 */
Ext.define("Screener.view.PharmacyForm", {
    xtype: 'pharmacyForm',
    extend: 'Ext.form.Panel',
    config: {
        styleHtmlContent: false,
        xtype: 'orderform',
        autoscroll: true,
        items: [{
            xtype: 'titlebar',
            docked: 'top',
            title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PharmacyForm.phar_ord')
        }, {
            layout: 'hbox',
            items: [{
                xtype: 'drugStore',
                width: '500px',
                id: 'form0',
                scrollable: false
            }, {
                layout: 'vbox',
                items: [{
                    xtype: 'spacer',
                    height: 15
                }, {
                    xtype: 'button',
                    ui: 'round',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PharmacyForm.plus'),
                    id: 'addDrugFormButton',
                    height: '40px',
                    width: '100px'
                }, {
                    xtype: 'spacer',
                    height: 10
                }, {
                    xtype: 'button',
                    ui: 'round',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PharmacyForm.minus'),
                    id: 'removeDrugFormButton',
                    height: '40px',
                    width: '100px',
                }, {
                    xtype: 'spacer',
                    height: 10
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    id: 'drugSubmitButton',
                    height: '40px',
                    text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PharmacyForm.submit'),
                    width: '100px'
                }]
            }]
        }]
    }
});