/*
 * File: app/controller/LogoutController.js
 * Author: Karan Singh (staticbit@gmail.com)
 * Date: 31-May-2012
 * Last Update Time: 01:23 PM IST
 */

Ext.define('Topbar.controller.LogoutController', {
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