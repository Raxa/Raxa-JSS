/**
 * This screen shows a drug order form 
 * with a button to add additional medications and a submit button.The left side shows patient
 * list
 */
Ext.define("Screener.view.PharmacyForm", {
    xtype: 'pharmacyForm',
    extend: 'Ext.form.Panel',
    requires: ['Ext.tab.Panel', 'Ext.form.FieldSet', 'Ext.MessageBox'],
    config: {
        styleHtmlContent: true,
        xtype: 'orderform',
        autoscroll: true,
        layout: 'vbox',
        items: [{
            layout: 'hbox',
            items: [{
                xtype: 'titlebar',
                docked: 'top',
                title: 'Pharmacy Orders'
            }, {
                xtype: 'drugStore',
                width: '350px',
                height: '250px'
            }, {
                items: [{
                    layout: 'vbox',
                    items: [{
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
                    }]
                }]
            }, {
                xtype: 'spacer',
                height: 20
            }, {
                xtype: 'button',
                ui: 'confirm',
                id: 'drugSubmitButton',
                height: '40px',
                text: 'submit',
                width: '200px',
                handler: function () {
                	// changes the button text to 'Confirm' and 'Cancel'
                	var MB = Ext.MessageBox;
                	Ext.apply(MB, {
	                	YES: { text: 'Confirm', itemId: 'yes', ui: 'action' },
	                	NO: { text: 'Cancel', itemId: 'no' }
	                });
	                	Ext.apply(MB, {
		                	YESNO: [MB.NO, MB.YES]
		                });
		            // on-click, launch MessageBox
		            Ext.get('drugSubmitButton').on('click', function(e){
		              Ext.Msg.confirm("Confirmation", "Are you sure you want to submit your Pharmacy Order?", Ext.emptyFn);
	                });
                }
            }]
        }]
    }
});