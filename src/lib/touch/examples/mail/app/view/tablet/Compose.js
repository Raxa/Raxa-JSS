Ext.define('Mail.view.tablet.Compose', {
    extend: 'Ext.Sheet',
    
    config: {
        enter: 'bottom',
        width: 650,
        height: 600,
        layout: 'vbox',
        items: [
            {
                dock: 'top',
                xtype: 'toolbar',
                title: 'New Message',
                items: [
                    {
                        text: 'Cancel',
                        handler: function() {
                            this.up('sheet').hide();
                        }
                    },
                    {
                        text: 'Send'
                    }
                ]
            },
            {
                flex: 1,
                xtype: 'formpanel',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'To'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Subject'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'body'
                    }
                ]
            }
        ]
    }
});