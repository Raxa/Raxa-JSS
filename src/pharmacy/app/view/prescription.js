Ext.define('RaxaEmr.Pharmacy.view.prescription', {
    extend: 'Ext.container.Container',
    alias: 'widget.prescription',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    autoScroll: true,
    items:[{
        xtype: 'container',
        layout:{
            type: 'auto',
            align: 'center'
        },
        margin: '-10 0 0 0',
        items:[{
            xtype: 'container',
            border: 0,
            height: 650,
            layout: {
                type: 'absolute'
            },
            //TODO: take out drugASearchGrid - not being used
            //https://raxaemr.atlassian.net/browse/RAXAJSS-411
            //then take out all instances of addpatientgridarea....getLayout..setactiveitem
            //addpatientarea is being used, dont take that out
            items: [{
                layout: 'card',
                id: 'addpatientgridarea',
                border: false,
                activeItem: 0,
                items: [{
                    xtype: 'container',
                    layout: 'absolute',
                    border: false,
                    items:[{
                        xtype: 'gridpanel',
                        id: 'drugASearchGrid',
                        height: 380,
                        styleHtmlContent: false,
                        width: 750,
                        autoScroll: true,
                        columnLines: true,
                        x: 190,
                        y: 180,
                        viewConfig: {
                            stripeRows: false
                        },
                        store: Ext.create('RaxaEmr.Pharmacy.store.drugOrderSearch'),
                        columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            text: 'Name Of drug',
                            dataIndex: 'drugname',
                            resizable: false
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 90,
                            text: 'Dosage',
                            dataIndex: 'dosage',
                            resizable: false
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 93,
                            text: 'Duration',
                            // gets the duration using start and end date of prescription
                            renderer: function(value, metadata, record){
                                var temp = record.getData().endDate - record.getData().startDate
                                temp = temp/(86400000)
                                temp = parseInt(temp) + 1
                                return temp + ' days'
                            },
                            resizable: false
                        },
                        {
                            xtype: 'numbercolumn',
                            width: 65,
                            text: 'Qty',
                            dataIndex: 'quantity',
                            resizable: false
                        },
                        {
                            xtype: 'numbercolumn',
                            text: 'Unit Price',
                            width: 130,
                            resizable: false
                        },
                        {
                            xtype: 'numbercolumn',
                            width: 130,
                            text: 'Item Price',
                            resizable: false
                        }
                        ]
                    },
//                    {
//                        xtype: 'button',
//                        text: 'Review Prescription',
//                        x: 420,
//                        y: 580
//                    },
                    {
                        xtype: 'button',
                        width: 60,
                        text: 'Save',
                        action: 'doneWithNewPatientPrescription',
                        x: 480,
                        y: 580
                    },
                    {
                        xtype: 'button',
                        width: 60,
                        text: 'Print',
                        action: 'printPrescribedDrugs',
                        x: 560,
                        y: 580
                    }]
                },{
                    xtype: 'container',
                    layout: 'absolute',
                    border: false,
                    items:[{
                        xtype: 'prescribedDrugs',
                        x: 190,
                        y: 270
                    },{
                        xtype: 'button',
                        width: 60,
                        text: 'Save',
                        action: 'doneWithQueuedPatientPrescription',
                        x: 330,
                        y: 580
                    },{
                        xtype: 'button',
                        width: 60,
                        text: 'Print',
                        action: 'printPrescribedDrugs',
                        x: 460,
                        y: 580
                    }]
                }]
            },{
                xtype: 'button',
                width: 180,
                text: 'Prescription for New Patient',
                action: 'addPatient',
                x : 0,
                y: 30    
            },
            {
                xtype: 'panel',
                height: 480,
                width: 180,
                layout: {
                    type: 'accordion'
                },
                border: 0,
                x: 0,
                y: 60,
                items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'absolute'
                    },
                    collapsed: false,
                    title: 'Search a Patient',
                    items:[
                    {
                        xtype: 'textfield',
                        emptyText: 'Patient Name or ID',
                        name:'patientName',
                        x: 10,
                        y: 20,
                        id: 'patientNameASearch'
                    },
                    //To be added in after search layer is complete
//                    {
//                        xtype: 'textfield',
//                        emptyText: 'Prescription ID',
//                        x: 10,
//                        y: 60,
//                        id: 'prescriptionIdASearch'
//                    },
//                    {
//                        xtype: 'datefield',
//                        emptyText: 'Prescription Date',
//                        x: 10,
//                        y: 100,
//                        id: 'prescriptionDateASearch'
//                    },
                    {
                        xtype: 'panel',
                        border: 0,
                        layout: 'card',
                        height: 300,
                        width: 180,
                        x: 0,
                        y: 60,
                        activeItem: 0,
                        id: 'searchGrid',
                        items: [{
                            xtype: 'gridpanel',
                            id: 'patientASearchGrid',
                            border: true,
                            height: 300,
                            title: 'Search Results',
                            store: Ext.create('RaxaEmr.Pharmacy.store.ListPatients'),
                            columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 100,
                                text: 'Patient Name',
                                dataIndex : 'name'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 75,
                                dataIndex: 'identifier',
                                text: 'ID'
                            }
                            ]
                        }, {
                            xtype: 'panel',
                            layout: 'vbox',
                            items:[{
                                xtype: 'gridpanel',
                                title: 'prescriptions',
                                border: 0,
                                height: 270,
                                id: 'drugOrderASearchGrid',
                                store: Ext.create('RaxaEmr.Pharmacy.store.drugOrderSearch'),
                                columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 80,
                                    text: 'drug',
                                    dataIndex : 'drugname'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 80,
                                    text: 'Date',
                                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                                    dataIndex : 'startDate'
                                }
                                ]
                            }, {
                                xtype: 'button',
                                width: 80,
                                x: 50,
                                y: 330,
                                text: 'Back',
                                action: 'back'
                            }]
                        }]
                    }]
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'absolute'
                    },
                    collapsed: true,
                    title: 'Patient Queue (Today)',
                    items:[
                    {
                        xtype: 'textfield',
                        emptyText: 'Patient Name',
                        name:'todayPatientName',
                        x: 10,
                        y: 20,
                        enableKeyEvents: true,
                        id: 'todayPatientNameSearch'
                    },
                    {
                        xtype: 'panel',
                        border: 0,
                        layout: 'card',
                        height: 300,
                        width: 180,
                        x: 0,
                        y: 60,
                        activeItem: 0,
                        //to switch between the orders and patient lists, use setActiveItem on this component
                        id: 'todayPatientPanel',
                        items: [{
                            xtype: 'patientsgridpanel',
                            id: 'todayPatientGrid',
                            height: 300,
                            width: 190,
                            title: 'Today', 
                            store: Ext.create('RaxaEmr.Pharmacy.store.ListPatients'),
                            y: 0
                        }, {
                            xtype: 'panel',
                            layout: 'vbox',
                            items:[{
                                xtype: 'gridpanel',
                                title: 'Prescriptions',
                                height: 270,
                                border: 0,
                                id: 'todayPatientsDrugOrders',
                                store: Ext.create('RaxaEmr.Pharmacy.store.drugOrderSearch'),
                                columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 80,
                                    text: 'drug',
                                    dataIndex : 'drugname'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 80,
                                    text: 'Date',
                                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                                    dataIndex : 'startDate'
                                }
                                ]
                            }, {
                                xtype: 'button',
                                width: 80,
                                text: 'Back',
                                action: 'back'
                            }]
                        }]
                    }],
                    listeners: {
                        // as this panal exapands it make the get call for todays patient list to update the list
                        expand: {
                            fn: function(){
                                Ext.getCmp('todayPatientGrid').getStore().load()
                            }
                        }
                    }
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'absolute'
                    },
                    collapsed: true,
                    title: 'Patient Queue (Past 7 Days)',
                    items:[
                    {
                        xtype: 'textfield',
                        emptyText: 'Patient Name',
                        name:'sevenDaysPatientName',
                        x: 10,
                        y: 20,
                        enableKeyEvents: true,
                        id: 'sevenDaysPatientNameSearch'
                    },
                    {
                        xtype: 'panel',
                        border: 0,
                        layout: 'card',
                        height: 300,
                        width: 180,
                        x: 0,
                        y: 60,
                        activeItem: 0,
                        //to switch between the orders and patient lists, use setActiveItem on this component
                        id: 'sevenDaysPatientPanel',
                        items: [{
                            xtype: 'patientsgridpanel',
                            id : 'sevenDaysPatientGrid',
                            title: 'Last 7 Days',
                            height: 300,
                            width: 190,
                            title: 'Last 7 Days', 
                            store: Ext.create('RaxaEmr.Pharmacy.store.ListPatients'),
                            y: 0
                        }, {
                            xtype: 'panel',
                            layout: 'vbox',
                            items:[{
                                xtype: 'gridpanel',
                                title: 'Prescriptions',
                                height: 270,
                                border: 0,
                                id: 'sevenDaysPatientsDrugOrders',
                                store: Ext.create('RaxaEmr.Pharmacy.store.drugOrderSearch'),
                                columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 80,
                                    text: 'drug',
                                    dataIndex : 'drugname'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 80,
                                    text: 'Date',
                                    renderer: Ext.util.Format.dateRenderer('d.m.Y'),
                                    dataIndex : 'startDate'
                                }
                                ]
                            }, {
                                xtype: 'button',
                                width: 80,
                                text: 'Back',
                                action: 'backFromSevenDays'
                            }]
                        }]
                    }],
                    listeners: {
                        // as this panel expands it makes the get call for 1 week patient list to update the list
                        expand: {
                            fn: function(){
                                Ext.getCmp('sevenDaysPatientGrid').getStore().load()
                            }
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    height: 71,
                    collapsed: true,
                    title: 'Pending',
                    columnLines: false,
                    columns: [
                    {
                        xtype: 'numbercolumn',
                        draggable: false,
                        width: 42,
                        dataIndex: 'number',
                        text: 'Sl. No'
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 138,
                        text: 'Patient Name'
                    }]
                }]
            //TODO: patient image
            },
            {
                xtype: 'container',
                layout: 'card',
                id: 'addpatientarea',
                activeItem: 0,
                items:[{
                    xtype: 'container',
                    layout: 'absolute',
                    items:[
                    {
                        xtype: 'panel',
                        id: 'image',
                        height: 110,
                        width: 110,
                        x: 190,
                        y: 60,
                        items:[{
                            html: "<img border=\"0\" src=\"../resources/img/pharmacy.png\" alt=\"Patient Image\" width=\"110\" height=\"110\" />"
                        }]
                    //TODO: patient image
                    },
                    {
                        xtype: 'panel',
                        height: 110,
                        width: 300,
                        layout: {
                            type: 'absolute'
                        },
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Patient Name',
                            id: 'prescriptionPatientName',
                            readOnly: true,
                            value: '',
                            width: 300,
                            x: 10,
                            y: 05
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Patient ID',
                            id: 'prescriptionPatientId',
                            readOnly: true,
                            value: '',
                            width: 300,
                            x: 10,
                            y: 30
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Age',
                            id: 'prescriptionPatientAge',
                            readOnly: true,
                            value: '',
                            width: 300,
                            x: 10,
                            y: 55
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Gender',
                            id: 'prescriptionPatientGender',
                            readOnly: true,
                            value: '',
                            width: 300,
                            x: 10,
                            y: 80
                        }],
                        x: 300,
                        y: 60
                    },
                    {
                        xtype: 'panel',
                        height: 110,
                        width: 340,
                        layout: {
                            type: 'absolute'
                        },
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Doctor\'s Name',
                            readOnly: true,
                            value: '',
                            width: 300,
                            x: 10,
                            y: 05
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Department',
                            readOnly: true,
                            value: '',
                            width: 300,
                            x: 10,
                            y: 30
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Prescription ID',
                            readOnly: true,
                            value: '',
                            width: 300,
                            x: 10,
                            y: 55
                        },{
                            xtype: 'displayfield',
                            fieldLabel: 'Prescription Date',
                            id: 'prescriptionDate',
                            readOnly: true,
                            value: '',
                            width: 300,
                            x: 10,
                            y: 80
                        }],
                        x: 600,
                        y: 60
                    }]
                },{
                    xtype: 'container',
                    layout: 'absolute',
                    items:[{
                        xtype: 'addPatient',
                        height: 195,
                        width: 770,
                        x: 190,
                        y: 60
                    }]
                }]
            }]
        }]
    }]
});
