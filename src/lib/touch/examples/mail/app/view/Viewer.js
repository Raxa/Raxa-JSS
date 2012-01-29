Ext.define('Mail.view.Viewer', {
    extend: 'Ext.Container',
    
    config: {
        layout: 'vbox',
        
        items: [
            {
                xtype: 'toolbar',
                layout: {
                    type: 'hbox',
                    pack: 'right'
                },
                items: [
                    {
                        text: 'Back',
                        ui: 'back',
                        hidden: true
                    },
                    {
                        text: 'Archive'
                    },
                    {
                        text: 'Delete'
                    },
                    {
                        text: 'Reply'
                    },
                    {
                        text: 'Compose',
                        action: 'compose'
                    }
                ]
            },
            {
                xtype: 'message',
                flex: 1
            }
        ]
    },
    
    bindMessage: function(message) {
        // this.down('message').setHtml(message.get('body'));
        this.down('message').bindMessage(message);
    },
    
    showBackButton: function() {
        this.down('button[ui=back]').show();
    }
});