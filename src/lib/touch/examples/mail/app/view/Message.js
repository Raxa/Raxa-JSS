Ext.define('Mail.view.Message', {
    extend: 'Ext.Container',
    xtype: 'message',
    
    config: {
        scrollable: true,
        cls: 'x-message',
        tpl: Ext.create('Ext.XTemplate', 
            '<div class="x-message-meta">',
                '<div class="x-message-from">',
                    'From: <span>{fromName}</span>',
                '</div>',
                '<div class="x-message-subject-header">',
                    '<p class="x-message-subject">{subject}</p>',
                    '<p class="x-message-date">{sentAt}</p>',
                '</div>',
            '</div>',
            '<div class="x-message-body">{body}</div>'
        )
    },
    
    bindMessage: function(message) {
        var data = Ext.clone(message.data);
        data.body = data.body.replace(/\n/g, '<br /><br />');
        
        this.setData(data);
    }
});