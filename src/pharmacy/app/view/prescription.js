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
        margin: '-10 0 0 100',
        items:[{
            xtype: 'container',
            border: 0,
            height: 650,
            layout: {
                type: 'absolute'
            },
            items: [
            {
                xtype: 'gridpanel',
                id: 'drugASearchGrid',
                height: 380,
                styleHtmlContent: false,
                width: 780,
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
                    width: 117,
                    text: 'Name Of drug',
                    dataIndex: 'drugname'
                },
                {
                    xtype: 'gridcolumn',
                    width: 67,
                    text: 'Dosage',
                    dataIndex: 'dosage'
                },
                {
                    xtype: 'gridcolumn',
                    width: 73,
                    text: 'Duration',
                    // gets the duration using start and end date of prescription
                    renderer: function(value, metadata, record){
                        console.log(record)
                        var temp = record.getData().endDate - record.getData().startDate
                        temp = temp/(86400000)
                        temp = parseInt(temp) + 1
                        return temp + ' days'
                    }
                },
                {
                    xtype: 'numbercolumn',
                    width: 38,
                    text: 'Qty',
                    dataIndex: 'quantity'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Unit Price'
                },
                {
                    xtype: 'numbercolumn',
                    width: 103,
                    text: 'Item Price'
                }
                ]
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
                x: 0,
                y: 60,
                items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'absolute'
                    },
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
                        y: 70
                    }
                    ],
                    listeners: {
                        // as this panal exapands it make the get call for todays patient list to update the list
                        expand: {
                            fn: function(){
                                console.log(Ext.getCmp('todayPatientGrid').getStore())
                                Ext.getCmp('todayPatientGrid').getStore().load()
                            }
                        }
                    }
                },
                {
                    xtype: 'patientsgridpanel',
                    id : 'sevenDaysPatientGrid',
                    title: 'Last 7 Days(145)',
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
                    }
                    ],
                    viewConfig: {

                }
                }
                ]
            },
            {
                xtype: 'button',
                text: 'Review Prescription',
                x: 320,
                y: 580
            },
            {
                xtype: 'button',
                width: 60,
                text: 'Done',
                action: 'done',
                x: 230,
                y: 580
            },
            {
                xtype: 'button',
                width: 60,
                text: 'Print',
                x: 460,
                y: 580
            },
            {
                xtype: 'panel',
                height: 110,
                width: 110,
                x: 190,
                y: 60,
                items:[{
                    html: "<img border=\"0\" src=\"../../resources/img/pharmacy.png\" alt=\"Patient Image\" width=\"110\" height=\"110\" />"
                }]
            //TODO: patient image
            },
            {
                xtype: 'panel',
                height: 110,
                width: 330,
                layout: {
                    type: 'absolute'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Patient Name',
                    id: 'prescriptionPatientName',
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 05
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Patient ID',
                    id: 'prescriptionPatientId',
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 30
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Age',
                    id: 'prescriptionPatientAge',
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 55
                },{
                    xtype: 'textfield',
                    id: 'prescriptionPatientGender',
                    fieldLabel: 'Gender',
                    readOnly: true,
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
                width: 330,
                layout: {
                    type: 'absolute'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Doctor\'s Name',
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 05
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Department',
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 30
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Prescription ID',
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 55
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Prescription Date',
                    id: 'prescriptionDate',
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 80
                }],
                x: 630,
                y: 60
            }]
        }]
    }]
});