Ext.setup({
    onReady: function() {
        app = Ext.create('Ext.ux.app.Application', {
            name: 'Mail',
        
            profiles: ['Phone', 'Tablet'],
        
            views : ['MessageList', 'AccountList', 'Nav', 'Message'],
            models: ['Account', 'Folder', 'Message'],
            stores: ['Accounts', 'Messages']
        });
    }
});