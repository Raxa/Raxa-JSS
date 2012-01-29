Ext.define('Kitchensink.view.Buttons', {
    extend: 'Ext.Container',

    config: {
        layout: {
            type : 'vbox',
            pack : 'center',
            align: 'stretch'
        },
        cls   : 'card1',
        scrollable: 'vertical',
        defaults: {
            xtype: 'container',
            flex : 1,
            layout: {
                type : 'hbox',
                align: 'middle'
            },
            defaults: {
                xtype : 'button',
                flex  : 1,
                margin: 10
            }
        },
        items: [
            {
                items: [
                    {text: 'Normal'},
                    {ui: 'round', text: 'Round'},
                    {ui: 'small', text: 'Small'}
                ]
            },
            {
                items: [
                    {ui: 'decline', text: 'Decline'},
                    {ui: 'decline-round', text: 'Round'},
                    {ui: 'decline-small', text: 'Small'}
                ]
            },
            {
                items: Ext.os.deviceType.toLowerCase() == "phone" ? [
                    {ui: 'confirm', text: 'Confirm'},
                    {ui: 'confirm-round', text: 'Round'},
                    {ui: 'confirm-small', text: 'Small'}
                ] : [
                    {ui: 'confirm', text: 'Confirm'},
                    {ui: 'confirm-round', text: 'Round'},
                    {ui: 'confirm-small', text: 'Small'},
                    {ui: 'back', text: 'Back'}
                ]
            },
            {
                xtype : 'toolbar',
                docked: 'bottom',
                ignoreDefaults: true,
                defaults: {
                    xtype: 'button',
                    text : 'Test',
                    flex : 1
                },
                items: Ext.os.deviceType.toLowerCase() == "phone" ? [
                    {ui: 'round'},
                    {ui: 'action'},
                    {ui: 'decline-small'},
                    {ui: 'confirm-round'}
                ] : [
                    {ui: 'round'},
                    {ui: 'drastic'},
                    {ui: 'action'},
                    {ui: 'decline-round'},
                    {ui: 'decline-small'},
                    {ui: 'confirm-round'},
                    {ui: 'confirm-small'}
                ]
            }
        ]
    }
});
