/*
 * File: app.js
 * Author: Karan Singh (staticbit@gmail.com)
 * Date: 30-May-2012
 */

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    views: [
        'TopToolbar',
        'LogoutConfirmPanel'
    ],
    name: 'MyApp',
    controllers: [
        'LogoutController'
    ],

    launch: function() {

        Ext.create('MyApp.view.TopToolbar', {fullscreen: true});
    }

});
