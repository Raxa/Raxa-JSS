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
                            width: 200,
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
                                console.log(record)
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
                            width: 170,
                            text: 'Item Price',
                            resizable: false
                        }
                        ]
                    },
                    {
                        xtype: 'button',
                        text: 'Review Prescription',
                        ui: 'raxa-orange-small',
                        x: 420,
                        y: 580
                    },
                    {
                        xtype: 'button',
                        width: 60,
                        text: 'Done',
                        action: 'done',
                        ui: 'raxa-aqua-small',
                        x: 330,
                        y: 580
                    },
                    {
                        xtype: 'button',
                        width: 60,
                        text: 'Print',
                        action: 'print',
                        ui: 'raxa-aqua-small',
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
                        y: 270,
                    },{
                        xtype: 'button',
                        width: 60,
                        text: 'Done',
                        action: 'done2',
                        ui: 'raxa-aqua-small',
                        x: 330,
                        y: 580
                    },{
                        xtype: 'button',
                        width: 60,
                        text: 'Print',
                        action: 'print2',
                        ui: 'raxa-aqua-small',
                        x: 460,
                        y: 580
                    }]
                }]
            },{
                xtype: 'button',
                width: 180,
                text: 'Add Patient',
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
                    ui: 'raxa-panel',
                    collapsed: false,
                    title: 'Advanced Search',
                    items:[
                    {
                        xtype: 'textfield',
                        emptyText: 'Patient Name',
                        name:'patientName',
                        x: 10,
                        y: 20,
                        id: 'patientNameASearch'
                    },
                    {
                        xtype: 'textfield',
                        emptyText: 'Prescription ID',
                        x: 10,
                        y: 60,
                        id: 'prescriptionIdASearch'
                    },
                    {
                        xtype: 'datefield',
                        emptyText: 'Prescription Date',
                        x: 10,
                        y: 100,
                        id: 'prescriptionDateASearch'
                    },
                    {
                        xtype: 'panel',
                        border: 0,
                        layout: 'card',
                        height: 200,
                        width: 180,
                        x: 0,
                        y: 140,
                        activeItem: 0,
                        id: 'searchGrid',
                        items: [{
                            xtype: 'gridpanel',
                            id: 'patientASearchGrid',
                            border: 0,
                            title: 'Search Results',
                            store: Ext.create('RaxaEmr.Pharmacy.store.drugOrderPatient'),
                            columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 120,
                                text: 'Patient Name',
                                dataIndex : 'display'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 40,
                                dataIndex: 'age',
                                text: 'Age'
                            }
                            ]
                        }, {
                            xtype: 'gridpanel',
                            title: 'prescriptions',
                            border: 0,
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
                        }]
                    }, {
                        xtype: 'button',
                        width: 80,
                        x: 50,
                        y: 340,
                        text: 'Back',
                        ui: 'raxa-orange-small',
                        action: 'back'
                    }]
                },
                {
                    xtype: 'panel',
                    height: 270,
                    layout: {
                        type: 'absolute'
                    },
                    collapsed: true,
                    title: 'My Panel',
                    items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '',
                        emptyText: 'Search Patient',
                        x: 20,
                        y: 30
                    },
                    {
                        xtype: 'patientsgridpanel',
                        id: 'todayPatientGrid',
                        height: 270,
                        width: 190,
                        title: 'Today', 
                        store: Ext.create('RaxaEmr.Pharmacy.store.ListPatients'),
   
                        y: 70
                    }
                    ],
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
                    xtype: 'patientsgridpanel',
                    id : 'sevenDaysPatientGrid',
                    title: 'Last 7 Days(145)',
                     store: Ext.create('RaxaEmr.Pharmacy.store.ListPatients'),
                    listeners: {
                        // as this panal exapands it make the get call for 1 week patient list to update the list
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
                    title: 'Pending (35)',
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
                        width: 146,
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
                        //icon: '../resources/img/pharmacy.'
                        items:[{
                            html: "<img border=\"0\" src=\"../../resources/img/pharmacy.png\" alt=\"Patient Image\" width=\"110\" height=\"110\" />"
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
