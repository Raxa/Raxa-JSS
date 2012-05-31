/*
 * File: app.js
 * Author: Karan Singh (staticbit@gmail.com)
 * Date: 31-May-2012
 * Last Update Time: 01:23 PM IST
 */

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    views: [
        'TopToolbar',
        'LogoutConfirmPanel'
    ],
    name: 'Topbar',
    controllers: [
        'LogoutController'
    ],

    launch: function() {

        Ext.create('Topbar.view.TopToolbar', {fullscreen: false});
    }

});
