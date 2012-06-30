Ext.define('RaxaEmr.Pharmacy.view.prescription', {
    extend: 'Ext.container.Container',
    alias: 'widget.prescription',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items:[{
        xtype: 'pharmacytopbar'
    },{
        xtype: 'container',
        layout:{
            type: 'auto',
            align: 'center'
        },
        margin: '-10 0 0 100',
        items:[{
            xtype: 'container',
            border: 0,
            height: 488,
            layout: {
                type: 'absolute'
            },
            items: [
            {
                xtype: 'gridpanel',
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
                columns: [
                {
                    xtype: 'numbercolumn',
                    width: 50,
                    text: 'Sl. No'
                },
                {
                    xtype: 'gridcolumn',
                    width: 117,
                    text: 'Name Of drug'
                },
                {
                    xtype: 'gridcolumn',
                    width: 67,
                    text: 'Dosage'
                },
                {
                    xtype: 'gridcolumn',
                    width: 73,
                    text: 'Duration'
                },
                {
                    xtype: 'numbercolumn',
                    width: 38,
                    text: 'Qty'
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
            },
            {
                xtype: 'panel',
                height: 450,
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
                        x: 10,
                        y: 30
                    },
                    {
                        xtype: 'textfield',
                        emptyText: 'Prescription ID',
                        x: 10,
                        y: 80
                    },
                    {
                        xtype: 'datefield',
                        emptyText: 'Prescription Date',
                        x: 10,
                        y: 130
                    },
                    {
                        xtype: 'gridpanel',
                        height: 170,
                        width: 190,
                        title: 'Today',
                        x: 0,
                        y: 170,
                        columns: [
                        {
                            xtype: 'numbercolumn',
                            width: 40,
                            dataIndex: 'number',
                            text: 'Sl. No'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 146,
                            text: 'Patient Name'
                        }
                        ]
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
                        xtype: 'gridpanel',
                        height: 270,
                        width: 190,
                        title: 'Today',
                        x: -2,
                        y: 70,
                        columns: [
                        {
                            xtype: 'numbercolumn',
                            width: 40,
                            dataIndex: 'number',
                            text: 'Sl. No'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 146,
                            text: 'Patient Name'
                        }
                        ]
                    }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    collapsed: true,
                    title: 'Last 7 Days(145)',
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
                    ]
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
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 05
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Patient ID',
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 30
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Age',
                    readOnly: true,
                    width: 300,
                    x: 10,
                    y: 55
                },{
                    xtype: 'textfield',
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