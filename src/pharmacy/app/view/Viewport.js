Ext.define('pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.adddrug',
    store: 'Users',
//    layout: {
//        align: 'center',
//        pack: 'center',
//        type: 'hbox',
//        title: 'ADD/MODIFY DRUGS'
        
//    },
//    requires: [ 'Ext.tab.*', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', ],



    initComponent: function () {
        this.items = {
                xtype: 'form',
                title: 'ADD/MODIFY DRUGS',
                width: '300',
                layout: {
                    align: 'center',
                    pack: 'center',
                    type: 'vbox'
                },
                
                items: [
                {
                    xtype: 'textfield',
                    name : 'drug',
                    emptyText: 'Drug Name',
                    width: '200',
                },
                {
                    xtype: 'textfield',
                    name : 'mims',
                    emptyText: 'MIMS reference',
                    width: '200'
                },
                {
                    xtype: 'textfield',
                    name : 'form',
                    emptyText: 'Form',
                    width: '200'
                },
                {
                    xtype: 'textfield',
                    name : 'pack',
                    emptyText: 'Pack Size',
                    width: '200'
                },
                {
                    xtype: 'textfield',
                    name : 'di',
                    emptyText: 'Dispencing Instruction',
                    width: '200'
                },
                {
                    xtype: 'textfield',
                    name : 'streat',
                    emptyText: 'Side Treatement',
                    width: '200',
                },
                {
                    xtype: 'textfield',
                    name : 'dosage',
                    emptyText: 'Standard Dosage',
                    width: '200',
                }, {
                    xtype: 'button',    
                    text: 'ADD/MODIFY Drugs',
                    action: 'addmod',
                   
                   handler: function() {
                        this.up('form').getForm();
                   },
                    scope: this,
                },
                    
                ]
            }
            
            
        
        
        

        this.callParent();
    }
});
