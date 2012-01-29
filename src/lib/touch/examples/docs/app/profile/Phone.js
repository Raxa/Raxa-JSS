Ext.define('Docs.profile.Phone', {
    extend: 'Ext.ux.app.Profile',
    
    config: {
        namespace: 'phone',
        controllers: ['Main', 'Content']
        // views: ['Main']
    },
    
    isActive: function() {
        return true;
    },

    launch: function() {
        console.log('launching phone');
        
        Ext.create('Ext.viewport.Viewport');
        Ext.defer(function() {
            
            // Ext.create('Docs.view.phone.Main');
        }, 1000);
    }
});