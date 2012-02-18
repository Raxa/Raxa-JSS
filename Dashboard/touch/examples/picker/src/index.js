Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function(options) {
        var datePicker = new Ext.DatePicker({
            useTitles: true,
            value: {
                day: 23,
                month: 2,
                year: 1984
            }
        });
        
        var panel = new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                ui: 'normal',
                text: 'Show DatePicker',
                handler: function() {
                    datePicker.show();
                }
            }]
        });
    }
});