Ext.define('RaxaEmr.view.smartApp', {
    extend: 'Ext.Container',
    id: 'smartApp',
    initialize: function (args) {
        this.callParent();
    },
    //addApps takes in a string array of the Apps for the current user, populates dashboard icon grid
    addApps: function (args) {
        //must destroy our panel if we ever call again (if the user logs out for example)
        if (Ext.getCmp('appsPanel')) {
            Ext.getCmp('appsPanel').destroy();
        }
        //finding the number of rows for icon grid for best fit
        var numRows = Math.ceil(Math.sqrt(args.length));
        var appsPanel = Ext.create('Ext.Container', {
            centered: true,
            id: 'appsPanel'
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
                    padding: 0,
                    html: '<div style="text-align:center;"><img src="smartApp/' + args[j] + '/icon.png" width="75" height="75"/></div>',

                    listeners: {
                        tap: function () {
                            window.location = 'smartApp/' + this.id;
                        }
                    }
                }]
            });
            appRows[Math.floor(j / numRows)].add(cell);
        }
        for (var i = 0; i < numRows; i++) {
            appsPanel.add(appRows[i]);
        }
        this.add(appsPanel);
    }
});