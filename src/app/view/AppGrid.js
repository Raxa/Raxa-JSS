/*
 * This view contains a grid of buttons that allow the user to choose a module
 * The module icons are located at src/resources/img/*.png
 */
Ext.define('RaxaEmr.view.AppGrid', {
    extend: 'Ext.Container',
    id: 'appGrid',
    config: {
        layout: 'fit'
    },
    initialize: function (args) {
        this.callParent();
    },
    
    //addModules takes in a string array of the modules for the current user, populates dashboard icon grid
    addModules: function (args) {
        //must destroy our panel if we ever call again (if the user logs out for example)
        if (Ext.getCmp('modulesPanel')) {
            Ext.getCmp('modulesPanel').destroy();
        }
        //finding the number of rows for icon grid for best fit
        var numRows = Math.ceil(Math.sqrt(args.length));
        var modulesPanel = Ext.create('Ext.Container', {
            centered: true,
            id: 'modulesPanel'
        });
        var appRows = [];
        for (var i = 0; i < args.length / numRows; i++) {
            appRows[i] = Ext.create('Ext.Panel', {
                layout: {
                    type: 'hbox',
                    pack: 'center'
                }
            });
        }
        for (var j = 0; j < args.length; j++) {
            if (args[j]=='patientfacing'){
                //TODO: DON'T LINK DIRECTLY TO Patient Facing
                var cell = Ext.create('Ext.Panel', {
                    items: [{
                            layout: 'vbox',
                            xtype: 'button',
                            id: args[j],
                            html: '<div style="text-align:center;"><img src="resources/img/' +args[j] + '.png" width="180" height="180"/></div>',

                            listeners: {
                                tap: function () {
                                    window.location = "http://patient-facing.github.com";
                                }
                            }
                        }]
                });
            }
            else {
                var cell = Ext.create('Ext.Panel', {
                    items: [{
                            layout: 'vbox',
                            xtype: 'button',
                            id: args[j],
                            html: '<div style="text-align:center;"><img src="resources/img/' +args[j] + '.png" width="180" height="180"/></div>',

                            listeners: {
                                tap: function () {
                                    window.location = this.id;
                                }
                            }
                        }]
                });
            }
            appRows[Math.floor(j / numRows)].add(cell);
        }     
        for (var i = 0; i < numRows; i++) {
            modulesPanel.add(appRows[i]);
        }
        this.add(modulesPanel);
    }
});