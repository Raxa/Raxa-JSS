Ext.Loader.setConfig({
        enabled: true,
        paths: {
            'Ext.i18n': '../lib/i18n' //Path to the i18n library
        }
    });

Ext.require('Ext.i18n.Bundle', function(){
        Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle',{
                bundle: 'RaxaEmrScreener',
                //Specify language here
                lang: 'en-US',
                path: 'app/view', //Path to the .properties file
                noCache: true
            });
    });
