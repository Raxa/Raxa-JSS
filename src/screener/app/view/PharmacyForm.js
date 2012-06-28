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
            title: 'Pharmacy Orders'
        }, {
            layout: 'hbox',
            items: [{
                xtype: 'drugStore',
                width: '350px',
                id: 'form0',
                height: '250px'
            }, {
                layout: 'vbox',
                items: [{
                    xtype: 'spacer',
                    height: 15
                }, {
                    xtype: 'button',
                    ui: 'round',
                    text: '+',
                    id: 'addDrugFormButton',
                    height: '40px',
                    width: '100px'
                }, {
                    xtype: 'spacer',
                    height: 10
                }, {
                    xtype: 'button',
                    ui: 'round',
                    text: '-',
                    id: 'removeDrugFormButton',
                    height: '40px',
                    width: '100px'
                }, {
                    xtype: 'spacer',
                    height: 10
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    id: 'drugSubmitButton',
                    height: '40px',
                    text: 'submit',
                    width: '100px'
                }]
            }]
        }]
    }
});