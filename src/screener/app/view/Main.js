/*
 * This class defines our main view with navigation.View
 * to allow for easy switching between screens, a back button, etc.
 */
/*
 * This allows the dynamically fetching of modules in DropDown in screener screen
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
            xtype: 'fieldset',
            items: [
            {
                xtype: 'selectfield',
                id: 'topbarSelectfield',
                centered: true ,
                value: 'screener' ,
                options: 
                Util.getSelectModules(),
                listeners: {
                    change: function () {
                        console.log(Ext.getCmp('topbarSelectfield').getValue());
                        if(Ext.getCmp('topbarSelectfield').getValue() == 'login') {
                            window.location = '../' ;
                        } else
                        if(Ext.getCmp('topbarSelectfield').getValue() == 'patientfacing') {
                            window.location = "http://patient-facing.github.com"; 
                        } else {
                            window.location = '../'+Ext.getCmp('topbarSelectfield').getValue();
                        }
                    }
                }
            }
            ]
        });
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