Ext.define('RaxaEmr.controller.Session', {
    extend: 'Ext.app.Controller',	
    config: {
        before: {
            showDashboard: 'doLogin'
        }
    },
    showDashboard: function(){
        console.log('Inside showDashboard');
    },
    
    doLogin: function() {
        console.log('Inside doLogin');
    //called whenever the Login button is tapped
    },

    doLogout: function() {
    //called whenever any Button with action=logout is tapped
    },
    
    launch: function(){
        Ext.create('RaxaEmr.view.Login');
    }    
});