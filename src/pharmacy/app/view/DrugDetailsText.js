Ext.define('RaxaEmr.Pharmacy.view.DrugDetailsText', {
    extend: 'Ext.form.Panel',
    alias: 'widget.drugDetailsText',
    border: false,
    layout: 'fit',
    width: 600,
    x:110,
    margin: '20 0 20 0',
    activeItem: 0,
    items:[
    {
        layout: 'hbox',
        border: false,
        items:[{
            flex: 1,
            border: false,
            layout: 'vbox',
            items:[{
                xtype: 'displayfield',
                margin: 5,
                fieldLabel: 'Drug Details',
                id: 'drugDetailsName',
                width: '500',
                value: 'N/A'
            }
//            ,{
//                xtype: 'displayfield',
//                fieldLabel: 'Drug Id',
//                itemId: 'drugDetailsId',
//                value: 'N/A'
//            },{
//                xtype: 'displayfield',
//                fieldLabel: 'Manufacturer',
//                itemId: 'drugDetailsManufacturer',
//                value: 'N/A'
//            },{
//                xtype: 'displayfield',
//                fieldLabel: 'Drug Type',
//                itemId: 'drugDetailsDrugType',
//                value: 'N/A'
//            },{
//                xtype: 'displayfield',
//                fieldLabel: 'Drug Group',
//                itemId: 'drugDetailsDrugGroupName',
//                value: 'N/A'
//            },{
//                xtype: 'displayfield',
//                fieldLabel: 'Regimen',
//                itemId: 'drugDetailsRegimen',
//                value: 'N/A'
//            },{
//                xtype: 'displayfield',
//                fieldLabel: 'Composition',
//                itemId: 'drugDetailsComposition',
//                value: 'N/A'
//            }
        ]
        },{
            flex: 1,
            border: false,
            layout: 'vbox',
            items: [
//                {
//                xtype: 'displayfield',
//                fieldLabel: 'Stock Status'
//            }
        ]
        }
        ]
    }],
    initForDrug: function(drugName){
        var drug = Ext.getStore('allDrugs').getAt(Ext.getStore('allDrugs').find('text', drugName));
        console.log(drug);
        console.log(drugName);
        Ext.getCmp('drugDetailsName').setWidth(300);
        Ext.getCmp('drugDetailsName').setValue(drug.data.text);
    }
});

