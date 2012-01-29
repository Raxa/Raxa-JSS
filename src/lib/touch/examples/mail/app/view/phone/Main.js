Ext.define('Mail.view.phone.Main', {
    extend: 'Ext.Container',
    xtype: 'mailnav',
    
    config: {
        fullscreen: true,
        layout: 'vbox',
        items: [
            {
                dock: 'top',
                xtype: 'toolbar',
                title: 'Mailboxes'
            },
            {
                xtype: 'container',
                layout: 'card',
                flex: 1,
                
                items: [
                    {
                        xtype: 'accountlist'
                    },
                    {
                        xtype: 'messagelist'
                    },
                    {
                        xtype: 'viewer'
                    }
                ]
            }
        ]
    }
});