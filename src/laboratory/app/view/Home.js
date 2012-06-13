Ext.define('Laboratory.view.Home', {
    extend: 'Ext.container.Container',
    alias: 'widget.Home',
    autoScroll: true,
    activeItem: 0,
   
    layout: {
         type: 'absolute'
           },
           

            items: [
                {
                    xtype: 'splitter'
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Specimen Collection',
                    x: 20,
                    y: 30
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Queue Status',
                    x: 240,
                    y: 280
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Anonymous Identification',
                    x: 240,
                    y: 230
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Paper Entry',
                    x: 240,
                    y: 180,
                    handler: function () {
                        var l = Ext.getCmp('mainregarea').getLayout();
                        //TO-DO Name view number in controller as PAPER_ENTRY_1 = 1
                        l.setActiveItem(1);
                    }
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Report Delivery/ Print Lab Report',
                    x: 240,
                    y: 130
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Print Lab Order',
                    x: 240,
                    y: 80
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Create  Lab Order',
                    x: 240,
                    y: 30
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Repprts',
                    x: 20,
                    y: 280
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Report Approval',
                    x: 20,
                    y: 230
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Batch Approval',
                    x: 20,
                    y: 180
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Result Entry',
                    x: 20,
                    y: 130
                },
                {
                    xtype: 'button',
                    height: 40,
                    width: 200,
                    text: 'Specimen Registration',
                    x: 20,
                    y: 80
                },
                {
                 layout: 'vbox',
                    xtype: 'button',
                    height: 70,
                    width: 80,
                    text: 'Screener',
                    x: 550,
                    y: 110
                },
                {
                 layout: 'vbox',
                    xtype: 'button',
                    height: 70,
                    width: 80,
                    text: 'In patient',
                    x: 550,
                    y: 30
                },
                {
                    xtype: 'button',
                    height: 70,
                    width: 80,
                    text: 'Laboratory',
                    x: 550,
                    y: 270
                },
                {
                    xtype: 'button',
                    height: 70,
                    width: 80,
                    text: 'OPD',
                    x: 550,
                    y: 190
                }
            ]
       
});
