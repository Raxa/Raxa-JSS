Ext.define('Docs.controller.Main', {
    extend: 'Ext.ux.app.Controller',
    
    config: {
        routes: {
            '/': 'showHome'
        },
        
        refs: {
            mainPanel: '#mainPanel'
        }
    },
    
    getMainPanel: function() {
        return Ext.getCmp('mainPanel').down('#content');
    },
    
    showHome: function() {
        this.getMainPanel().setActiveItem({
            xtype: 'panel',
            html: 'Home Page'
        });
    },
    
    authenticate: function(action) {
        //The auth ux wouldn't even be loaded until we
        //first attempt our asynchronous authentication function
        Ext.loadPackage('Ext.ux.auth', function() {
            Ext.ux.auth.authenticate({
                success: action.run,
                failure: this.login
            });
        }, 'Loading...'); //third argument shows a loading mask (modal? hmm)
    },
    
    login: function() {
        //shows a login dialog
    }
});