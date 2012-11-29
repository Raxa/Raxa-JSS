Ext.define('RaxaEmr.view.Login', {
    extend: 'Ext.Container',
    config: {
        fullscreen: true,
        layout: 'vbox',
        id: 'halo',
        items: [{
            xtype: 'topbar',
            docked: 'top'
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
//            title: Ext.i18n.appBundle.getMsg('RaxaEmr.view.Login.title'),
            title: 'Please login',
            align: 'center',
            centered: true,
            width: 350,
            items: [{
                xtype: 'textfield',
                id: 'userName',
//                label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.label'),
                label: 'Username',
                clearIcon: true
            }, {
                xtype: 'passwordfield',
                id: 'passwordID',
//                label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.passwordfield.label'),
                label: 'Password',
                clearIcon: true
            }]
        }, {
            xtype: 'button',
//            text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.button.title'),
            text: 'Sign In',
            id: 'signInButton',
            ui: 'decline-round',
            centered: true,
            width: 350,
            style: 'margin-top: 180px;'
        }]
    }
});
