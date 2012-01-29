Ext.define('Mail.controller.Messages', {
    extend: 'Mail.controller.Application',
    
    config: {
        routes: {
            'message/:id': 'showMessage',
            'compose': 'newMessage'
        },
        
        refs: {
            viewer: 'viewer',
            messageList: 'messagelist'
        },
        
        before: {
            // showMessage: 'prepareShowMessage'
        },
        
        restore: ['showMessage'],
        
        ensureLoaded: {
            newMessage: ['mail']
        }
    },
    
    showMessage: function(id) {
        var message = this.getMessageList().getStore().getById(parseInt(id, 10));
        
        this.getViewer().bindMessage(message);
    },
    
    newMessage: function() {
        console.log('new message');
    },
    
    prepareShowMessage: function(action) {
        console.log('preparing show message');
        this.execute(action, true);
    }
});