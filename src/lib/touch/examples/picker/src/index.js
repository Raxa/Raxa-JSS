Ext.require([
    'Ext.data.Store',
    'Ext.picker.Picker',
    'Ext.picker.Date',
    'Ext.Button',
    'Ext.Panel'
]);

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function(options) {
        var randomNumber = function(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        };

        var isPhone = Ext.os.deviceType.toLowerCase() == "phone";

        var items = isPhone ? [
            {
                text: 'Today',
                handler: function() {
                    picker.setValueAnimated(new Date());
                }
            },
            {
                text: 'Random',
                handler: function() {
                    picker.setValueAnimated({
                        month: randomNumber(0, 11),
                        day  : randomNumber(0, 28),
                        year : randomNumber(1980, 2011)
                    });
                }
            },
            {
                text: 'useTitles',
                handler: function() {
                    picker.setUseTitles(!picker.getUseTitles());
                }
            },
            { xtype: 'spacer' },
            {
                text: 'Done',
                ui: 'action',
                handler: function() {
                    picker.hide();
                }
            }
        ] : [
            {
                text: 'Select Today',
                handler: function() {
                    picker.setValueAnimated(new Date());
                }
            },
            {
                text: 'Select a random date',
                handler: function() {
                    picker.setValueAnimated({
                        month: randomNumber(0, 11),
                        day  : randomNumber(0, 28),
                        year : randomNumber(1980, 2011)
                    });
                }
            },
            {
                text: 'Toggle useTitles config',
                handler: function() {
                    picker.setUseTitles(!picker.getUseTitles());
                }
            },
            { xtype: 'spacer' },
            {
                text: 'Done',
                ui: 'action',
                handler: function() {
                    picker.hide();
                }
            }
        ];

        var picker = Ext.create('Ext.picker.Date', {
            useTitles: false,
            doneButton: false,
            cancelButton: false,
            toolbar: {
                xtype: 'toolbar',
                items: items
            }
        });
        
        var panel = Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: {
                type : 'vbox',
                align: 'center',
                pack : 'center'
            },
            defaults: {
                margin: 5
            },
            items: [{
                xtype  : 'button',
                ui     : 'normal',
                text   : 'Show Picker',
                margin : 20,
                handler: function() {
                    picker.show();
                }
            }]
        });
    }
});