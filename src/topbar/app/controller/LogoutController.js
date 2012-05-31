/*
 * File: app/controller/LogoutController.js
 * Author: Karan Singh (staticbit@gmail.com)
 * Date: 30-May-2012
 */

Ext.define('MyApp.controller.LogoutController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            UsernameLabelRef: '#UsernameLabelID'
        }
    },

    launch: function() {
        this.getUsernameLabelRef().setHtml(username);
    }

});