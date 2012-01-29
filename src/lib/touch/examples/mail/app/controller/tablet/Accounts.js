Ext.define('Mail.controller.tablet.Accounts', {
    extend: 'Ext.ux.app.Controller',
    
    config: {
        refs: {
            nav: '#nav'
        },
        
        routes: {
            'accounts': 'showAccounts'
        }
    },
    
    showAccounts: function() {
        this.getNav().setActiveItem(0);
    }
});