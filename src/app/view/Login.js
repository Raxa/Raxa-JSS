Ext.define('RaxaEmr.view.Login', {
    extend: 'Ext.Container',
    config: {
        fullscreen: true,
        layout: 'vbox',
        id: 'halo',
        items: [{
            xtype: 'topbar',
            docked: 'top',
        }, {
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'spacer'
            }, {
                iconCls: 'settings',
                iconMask: true,
                ui: 'plain',
                handler: function () {
                    if (!this.overlay) {
                        this.overlay = Ext.Viewport.add({
                            xtype: 'panel',
                            modal: true,
                            hideOnMaskTap: true,
                            top: 45,
                            right: 0,
                            style: 'right: -5px;top: 45px',
                            items: [{
                                xtype: 'fieldset',
                                items: [{
                                    xtype: 'textfield',
                                    placeHolder: 'Host URL',
                                    name: 'hostField',
                                    listeners: {
                                        blur: function (field, event, options) {
                                            HOST = field.getValue();
                                            localStorage.setItem("host", HOST);
                                        }
                                    },
                                    width: 450,
                                    style: 'background-color: white;',
                                    value: HOST
                                }]
                            }]
                        });
                    }
                    this.overlay.show();
                }
            }]
        }, {
            id: 'logoPanel',
            centered: true,
            style: 'margin-top: -350px',
            items: [{
                html: '<div style="text-align:center;"><img src="resources/img/logo.png" width="143" height="143"/></div>'
            }, {
                html: '<div class="logoText">Jan Swasthya Sahyog</div>'
            }]
        }, {
            xtype: 'fieldset',
            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.Login.title'),
            align: 'center',
            centered: true,
            width: 350,
            items: [{
                xtype: 'textfield',
                id: 'userName',
                label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.label'),
                clearIcon: true
            }, {
                xtype: 'passwordfield',
                id: 'password',
                label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.passwordfield.label'),
                clearIcon: true
            }]
        }, {
            xtype: 'button',
            text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.button.title'),
            id: 'signInButton',
            ui: 'decline-round',
            centered: true,
            width: 350,
            style: 'margin-top: 180px;'
        }]
    }
});