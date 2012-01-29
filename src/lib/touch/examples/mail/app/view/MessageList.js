Ext.define('Mail.view.MessageList', {
    extend: 'Ext.List',
    xtype: 'messagelist',
    
    config: {
        itemTpl: '{subject}',
        
        items: [
            {
                dock: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        text: 'Back',
                        ui: 'back'
                    },
                    {
                        xtype: 'searchfield',
                        flex: 1,
                        placeHolder: 'Search Inbox'
                    }
                ]
            }
        ],
        
        store: {
            type: 'Messages'
        }
    }
});