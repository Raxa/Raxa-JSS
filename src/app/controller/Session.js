Ext.define('RaxaEmr.controller.Session', {
    extend: 'Ext.app.Controller',	
    config: {
        before: {
            showDashboard: 'doLogin'
        },
        refs: {
        	signInButton: '#signInButton',
        	Registration: '#Registration',
        	Screener: '#Screener',
        	Inpatient: '#Inpatient',
        	Outpatient: '#Outpatient',
        	Pharmacy: '#Pharmacy',
        	Billing: '#Billing',
        	Radiology: '#Radiology',
        	Laboratory: '#Laboratory',
        	CHW: '#CHW',
        },
        control: {
        	signInButton: {
        		tap: 'doLogin',
        	},
        	Registration: {
        		tap: function(){ 
        			window.location = "registration"
        		}
        	},
			Screener: {
        		tap: function(){ 
        			window.location = "screener"
        		}
        	},
        	Inpatient: {
        		tap: function(){ 
        			window.location = "inpatient"
        		}
        	},
			Outpatient: {
        		tap: function(){ 
        			window.location = "outpatient"
        		}
        	},
        	Pharmacy: {
        		tap: function(){ 
        			window.location = "pharmacy"
        		}
        	},
			Billing: {
        		tap: function(){ 
        			window.location = "billing"
        		}
        	},
        	Radiology: {
        		tap: function(){ 
        			window.location = "radiology"
        		}
        	},
			CHW: {
        		tap: function(){ 
        			window.location = "chw"
        		}
        	},
        	Laboratory: {
        		tap: function(){ 
        			window.location = "laboratory"
        		}
        	},
        },
    },
    showDashboard: function(){
        console.log('Inside showDashboard');
    },
    
    //called whenever the Login button is tapped
    doLogin: function() {
    	//sending hard-coded modules, need to GET them from server
        var currentApps = [ 'Registration', 'Inpatient', 'Screener', 'Pharmacy', 'Outpatient', 'Laboratory', 'Radiology', 'Billing', 'CHW'];
        Ext.getCmp('appGrid').addModules(currentApps);
        Ext.getCmp('panel').setActiveItem(1);
    },

    doLogout: function() {
    //called whenever any Button with action=logout is tapped
    },
    
    launch: function(){
    	var panel = Ext.create('Ext.Panel', {
    		id : 'panel',
			layout : 'card',
			fullscreen: true,
			items : [{
				xclass: 'RaxaEmr.view.Login',
			}, {
				xclass : 'RaxaEmr.view.Dashboard'
			},
			]
		});

		Ext.Viewport.add(panel);
		panel.setActiveItem(0);

    }    
});