/*
 * File: app/view/LogoutConfirmPanel.js
 * Author: Karan Singh (staticbit@gmail.com)
 * Date: 31-May-2012
 * Last Update Time: 01:23 PM IST
 */

Ext.define('Topbar.view.LogoutConfirmPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.LogoutConfirmPanelAlias',

    config: {
        height: 100,
        id: 'LogoutConfirmPanelID',
        left: 0,
        top: 0,
        width: 300,
        hideOnMaskTap: true,
        layout: {
            align: 'center',
            type: 'vbox'
        },
        modal: true,
        scrollable: false,
        items: [
            {
                xtype: 'label',
                html: 'Are you sure?',
                id: 'LogoutConfirmLabelID',
                itemId: 'LogoutConfrimLabel',
                margin: '5 0 0 0'
            },
            {
                xtype: 'actionsheet',
                id: 'LogoutConfirmActionSheetID',
                itemId: 'LogoutConfirmActionSheet',
                layout: {
                    align: 'start',
                    pack: 'center',
                    type: 'hbox'
                },
                modal: false,
                items: [
                    {
                        xtype: 'button',
                        id: 'LogoutConfirmYesID',
                        itemId: 'LogoutConfirmYes',
                        margin: '0 5 0 0',
                        minWidth: 80,
                        ui: 'confirm',
                        text: 'Yes'
                    },
                    {
                        xtype: 'button',
                        id: 'LogoutConfirmNoID',
                        itemId: 'LogoutConfirmNo',
                        margin: '0 0 0 5',
                        minWidth: 80,
                        ui: 'decline',
                        text: 'No'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onLogoutConfirmYesIDTap',
                event: 'tap',
                delegate: '#LogoutConfirmYesID'
            },
            {
                fn: 'onLogoutConfirmNoIDTap',
                event: 'tap',
                delegate: '#LogoutConfirmNoID'
            }
        ]
    },

    onLogoutConfirmYesIDTap: function(button, e, options) {
        Util.logoutUser();
        var logconfirm = Ext.getCmp('LogoutConfirmPanelID');
        logconfirm.hide();
    },

    onLogoutConfirmNoIDTap: function(button, e, options) {
        var logconfirm = Ext.getCmp('LogoutConfirmPanelID');
        logconfirm.hide();
    }

});