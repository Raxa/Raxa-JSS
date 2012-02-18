demos.Picker = new Ext.Panel({
    cls: 'demo-picker',
    items: [{
        xtype: 'datepicker',
        id: 'picker',
        width: (!Ext.is.Phone ? 400 : 320),
        height: Ext.is.Android ? 320 : (!Ext.is.Phone ? 356 : 300),
        useTitles: false,
        floating: true,
        centered: true,
        value: {
            day: 23,
            month: 2,
            year: 1984
        },
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',

            // alignment of the button to the right via
            // flexed components
            items: [{xtype: 'spacer'}, {
                xtype: 'button',
                ui: 'action',
                text: 'Show Value',
                handler: function() {
                    var v = Ext.getCmp('picker').getValue();
                    alert(Ext.encode(v));
                }
            }]
        }]
    }]
});