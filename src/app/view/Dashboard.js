/*
 * This view contains a grid of buttons that allow the user to choose a module
 * The module icons are located at src/resources/img/*.png
 */
Ext.define('RaxaEmr.view.Dashboard', {
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
            var cell = Ext.create('Ext.Panel', {
                items: [{
                    layout: 'vbox',
                    xtype: 'button',
                    id: args[j],
                    //TODO: add in various icons for the modules
                    //icon: 'resources/img/' + args[j] + 'Logo.png',
                    icon: 'resources/img/moduleLogo.png',
                    width: '200px',
                    height: '80px',
                    text: args[j],
                    listeners: {
                        tap: function () {
                            window.location = this.id;
                        }
                    }
                }]
            });
            appRows[Math.floor(j / numRows)].add(cell);
        }
        for (var i = 0; i < args.length / 3; i++) {
            modulesPanel.add(appRows[i]);
        }
        this.add(modulesPanel);
    }
});