Ext.Loader.setPath({
    'Ext.ux.touch.grid': '../lib/touch/Ext.ux.touch.grid',
    //Path to grid code so that grid fuctionalities and view can be accessed
    // 'Screener': '/Raxa-JSS/src/screener/app'//Path to screener module so that store and models of screener can be accessed 
    'Screener': '../screener/app' //Path to screener module so that store and models of screener can be accessed 
});

Ext.application({
    name: 'RaxaEmr.Outpatient',

    requires: ['Ext.MessageBox'],

    models: ['patientlist', 'Grid', 'medicationhistory', 'refertodoc', 'labresulthistory', 'drugpanel', 'cheifcomplain', 'sign', 'diagnosis', 'diagnosedDisease', 'druglist', 'Observation', 'PostList'],
    stores: ['patientlist', 'Grid', 'medicationhistory', 'refertodoc', 'labresulthistory', 'drugpanel', 'cheifcomplain', 'sign', 'diagnosis', 'diagnosedDisease', 'druglist', 'PostLists', 'PatientsList', 'obs'],
    views: ['Viewport'],
    controllers: ['patientlist'],

    // views: ['Main'],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('RaxaEmr.Outpatient.view.Viewport'));
    },

    onUpdated: function() {
        Ext.Msg.confirm("Application Update", "This application has just successfully been updated to the latest version. Reload now?", function(buttonId) {
            if(buttonId === 'yes') {
                window.location.reload();
            }
        });
    }
});