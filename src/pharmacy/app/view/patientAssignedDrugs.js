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
                property: 'startDate', 
                direction : 'DESC'
            }       
        }),
        features: [Ext.create('Ext.grid.feature.Grouping',{
            startCollapsed: true,
            groupHeaderTpl: 
            [
            '{name} ',
            '{[this.formatName(values)]}',
            {
                formatName: function(values) {
                    console.log(" <<<<<values>>>>>> ");
                    console.log(values);
                //                var total = 0;
                //                var firstSupplier;
                //                var fewestMonths;
                //                        
                //                for(var i=0; i<values.children.length; i++){
                //                    total+=values.children[i].data.quantity;
                //                }
                //                return "total: "+total;
                }
            }
            ]
        })
        ], 
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
