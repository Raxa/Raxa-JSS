Ext.define('Mail.profile.Phone', {
    extend: 'Ext.ux.app.Profile',
    
    config: {
        namespace: 'phone',
        name: 'phone',
        
        views: ['Main', 'Viewer'],
        controllers: ['Messages', 'Accounts', 'Nav']
    },
    
    isActive: function() {
        // return Ext.os.is('Phone');
        return false;
    },
    
    launch: function() {
        Ext.create('Mail.view.phone.Main');
    }
});