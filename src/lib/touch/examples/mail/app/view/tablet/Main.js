Ext.define('Mail.view.tablet.Main', {
    extend: 'Ext.Panel',
    
    config: {
        fullscreen: true,
        layout: 'hbox',
        items: [
            {
                flex: 1,
                layout: 'vbox',
                itemId: 'main',
                items: [
                    {
                        dock: 'top',
                        xtype: 'toolbar',
                        title: 'Mailboxes'
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'card',
                            animation: {
                                type: 'slide'
                            }
                        },
                        flex: 1,
                        itemId: 'nav',

                        items: [
                            {
                                xtype: 'accountlist'
                            },
                            {
                                xtype: 'messagelist'
                            }
                        ]
                    }
                ]
            },
            {
                flex: 3,
                xtype: 'viewer'
            }
        ]
    }
});