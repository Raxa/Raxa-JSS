/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('RaxaEmr.Pharmacy.view.patientAssignedDrugs',{
    extend: 'Ext.container.Container',
    alias: 'widget.patientAssignedDrugs',
    autoScroll: true,
    //height: 300,
    //styleHtmlContent: false,
    //width: 750,
    width: 780 - 2,
    margin: '0 0 0 0',
    // xtype: 'panel',
    //layout: 'hbox',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items:[{
        xtype: 'gridpanel',
        title: 'prescriptions',
        border: 0,
        //width: 750,
        height: 270,
        id: 'drugOrderASearchGrid',
        store: Ext.create('RaxaEmr.Pharmacy.store.drugOrderSearch',{
            sortOnLoad: true,
            sorters: {
                property : 'startDate', 
                direction : 'DESC'
            }       
        }),
//        features: [Ext.create('Ext.grid.feature.Grouping',{
//            startCollapsed: true,
//            groupHeaderTpl: 
//            [
//            '{name} ',
//            '{[this.formatName(values)]}',
//            {
//                formatName: function(values) {
//                    //                    console.log(" <<<<<values>>>>>> ");
//                    //                    console.log(values);
//                    console.log("<<store name>>");
//                    console.log(Ext.getStore('drugOrderSearch'));
//                //                var total = 0;
//                //                var firstSupplier;
//                //                var fewestMonths;
//                //                        
//                //                for(var i=0; i<values.children.length; i++){
//                //                    total+=values.children[i].data.quantity;
//                //                }
//                //                return "total: "+total;
//                }
//            }
//            ],
//            onGroupClick: function( view, node, group, value) {
//                // console.log(_myAppGlobal.getController('prescription').DrugOrderSelect());
//                console.log("<<<<<<,inside onGroupClick>>>>>>>>");
//                console.log(view);
//                console.log(view.store);
//                console.log(view.store.findRecord('date',group));
//                var storeRec = view.store.findRecord('date',group);
//                console.log(view.store.data.length);
//                for(var i = 0 ; i< view.store.data.length ; i++) {
//                    console.log("date");
//                    // console.log(view.store.data.items[i].data.date);
//                    console.log(group);
//                    if( view.store.data.items[i].data.date === group ) {
//                        console.log("inside if")
//                        console.log(Ext.getStore('orderStore'));
//                        //console.log(view.store.getAt(i).data);
//                        _myAppGlobal.getController('prescription').DrugOrderSelect(view.store.data.items[i]);
//                        console.log(Ext.getStore('orderStore'));
//                    //                                var storeData = {
//                    //                                    ItemPrice: data.ItemPrice,
//                    //                                    date: data.date,
//                    //                                    dosage: data.dosage,
//                    //                                    drugUuid: data.drugUuid,
//                    //                                    drugname: data.drugname,
//                    //                                    endDate: data.endDate,
//                    //                                    frequency: data.frequency,
//                    //                                    instructions: data.instructions,
//                    //                                    quantity: data.quantity,
//                    //                                    startDate: data.startDate,
//                    //                                    unitPrice: data.unitPrice
//                    //                                }
//                    //                                 console.log("<<storeData>>");
//                    //                                 console.log(storeData);
//                    // Ext.getStore('orderStore').add(storeData)
//                    }
//                }
//                //view.store.remove(storeRec); 
//                console.log(view);
//            //                console.log(node);
//            //                console.log(group);
//            //                console.log(value);
//            }
//        })
//        ], 
        
        columns: [
        {
            xtype: 'gridcolumn',
            width: 180,
            text: 'Drug Name',
            dataIndex : 'drugname'
        },
        {
            xtype: 'gridcolumn',
            width: 180,
            text: 'Date',
            renderer: Ext.util.Format.dateRenderer('d.m.Y'),
            dataIndex : 'startDate'
        }
        ]
    }]
});
