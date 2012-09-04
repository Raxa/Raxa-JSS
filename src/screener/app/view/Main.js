/*
 * This class defines our main view with navigation.View
 * to allow for easy switching between screens, a back button, etc.
 */
Ext.define("Screener.view.Main", {
    extend: 'Ext.Container',
    xtype: 'mainView',
    initialize: function (args) {
        var topBar = Ext.create('Topbar.view.TopToolbar', {
            docked: 'top',
            layout: {
                type: 'hbox' ,
                pack: 'center',
                align: 'middle'

        
            },
            // title: 'JSS Hospital Screener System',
            //  title: 'Select',
      
            xtype: 'fieldset',
            // title: 'Select',
            items: [
            {
                 
                xtype: 'selectfield',
                id: 'topbarSelectfield',
                // textAlign: 'center',
               centered: true ,
              //  pack : centered , 
                value: 'screener' ,
                // label: 'Screener',
                options: 
                Util.getSelectModules(),
                
                listeners: {
                   
                    change: function () {
                        //                     for (var i = 0; i < getSelectModules().length ; i++) { 

                        console.log(Ext.getCmp('topbarSelectfield').getValue());
                        if(Ext.getCmp('topbarSelectfield').getValue() == 'login') {
                            console.log("hello");
                            console.log(location.href);
                            window.location = '../' ;
                        //location.href = '../' ; 
                        } else
                        if(Ext.getCmp('topbarSelectfield').getValue() == 'patientfacing') {
                            window.location = "http://patient-facing.github.com"; 
                        } else {
                            window.location = '../'+Ext.getCmp('topbarSelectfield').getValue();
                        //  console.log(location.href);
                        }
                 
                    }
                }
                    
            //   id: 'xxxxx',
            //   Util.getSelectModules()
            // label: 'Screener',
            ////////
            //                options: 
            //                [
            //                    
            //                    
            //                {
            //                    text: Util.getSelectModules(),
            //                    value: 'second'
            //                },
            //                   
            //                {
            //                    text: 'Registration',  
            //                    value: 'first'
            //                },
            //
            //                   
            //
            //                {
            //                    text: 'Out Patient Department',  
            //                    value: 'third'
            //                },
            //                {
            //                    text: 'Laboratory',  
            //                    value: 'fourth'
            //                },
            //                {
            //                    text: 'Pharmacy',  
            //                    value: 'fifth'
            //                },
            //                {
            //                    text: 'Billing',  
            //                    value: 'sixth'
            //                }
            //                ] 

            ///////
                    
           
            }
            ]
                
           
        });
        // Ext.getCmp('id goes here').
       
        this.add(topBar);

    },
    config: {
        fullscreen: true,

        //don't delete views so we can switch screens quickly
        autoDestroy: false,

        items: [{
            title: "JSS Hospital Screener System",
            items: [
            {
                    
                xtype: 'topmenu'
            },
            
            ]
        
        
        }, ]
    }
    
});