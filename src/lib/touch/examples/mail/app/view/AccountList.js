Ext.define('Mail.view.AccountList', {
    extend: 'Ext.Container',
    xtype: 'accountlist',
    
    config: {
        items: [
            {
                xtype: 'fieldset',
                title: 'Inboxes',
                
                items: [
                    {
                        xtype: 'list',
                        height: 100, //why do I have to do this?
                        itemTpl: '{address}',
                        store: {
                            type: 'Accounts'
                        }
                    }
                ]
            }
        ]
    }
});