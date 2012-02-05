Ext.define('RaxaEmr.view.Login', {
    extend: 'Ext.Container',
    config: {
        fullscreen: true,
        layout: 'vbox',
        id: 'halo',
        items: [{
            id: 'logoPanel',
            centered: true,
            style: 'margin-top: -350px',
            items: [{
                html: '<div style="text-align:center;"><img src="resources/img/logo.png" width="143" height="143"/></div>'
            },{
                html: '<div class="logoText">Jan Swasthya Sahyog</div>'
            }]
        },{
            xtype: 'fieldset',
            title: 'Please login',
            align: 'center',
            centered: true,
            width: 350,
            items: [{
                xtype: 'textfield',
                label: 'Username',
                clearIcon: true
            },{
                xtype: 'passwordfield',
                label: 'Password',
                clearIcon: true
            }]
        },{
            xtype: 'button',
            text: 'SIGN IN',
            centered: true,
            width: 350,
            style: 'margin-top: 180px;'
        }]
    }
});