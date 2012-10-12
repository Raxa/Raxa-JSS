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
                fieldLabel: 'Drug Details',
                id: 'drugDetailsName',
                width: '500',
                value: 'N/A'
            },
//            ,{
//                xtype: 'displayfield',
//                fieldLabel: 'Drug Id',
//                itemId: 'drugDetailsId',
//                value: 'N/A'
//            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Manufacturer',
                id: 'drugDetailsManufacturer',
                value: 'N/A'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Supplier',
                id: 'drugDetailsSupplier',
                value: 'N/A'
            }
//            {
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
    initForDrug: function(drugUuid){
        var drug = Ext.getStore('allDrugs').getAt(Ext.getStore('allDrugs').find('uuid', drugUuid));
        var drugInfo = Ext.getStore('drugInfos').getAt(Ext.getStore('drugInfos').find('drugUuid', drug.data.uuid));
        Ext.getCmp('drugDetailsName').setWidth(300);
        Ext.getCmp('drugDetailsName').setValue(drug.data.text);
        if(drugInfo !== undefined){
            Ext.getCmp('drugDetailsManufacturer').setValue(drugInfo.data.name);
            Ext.getCmp('drugDetailsSupplier').setValue(drugInfo.data.description);
        }
    }
});

