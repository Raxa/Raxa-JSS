Ext.define('Mail.view.Nav', {
    extend: 'Ext.Container',
    xtype: 'mailnav',
    
    config: {
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
                    }
                ]
            }
        ]
    }
});