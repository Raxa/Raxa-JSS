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
    
    //on entry point for application, give control to Util.getViews()
    launch: function(){
    	//splash loading screen
    	Ext.Viewport.setMasked({
    	   xtype: 'loadmask',
    	   message: 'Loading'
    	});
    	views = Util.getViews();
    },    
    
    //once Util.getViews() is done with AJAX GET calls, it calls this function
    //to start graphics, etc
    //views is the 2-d array of view urls (see Util.getViews() for more info)
    launchAfterAJAX: function(views){
    	//remove loading mask
    	Ext.Viewport.setMasked(false);
        Ext.create('RaxaEmr.view.Login');   	
    }
    
});