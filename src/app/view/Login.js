Ext.define('RaxaEmr.view.Login', {
    extend: 'Ext.Container',
    config: {
        fullscreen: true,
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        id: 'halo',
        items: [{
            xtype: 'topbar',
            docked: 'top'
        },
        {
            xtype: 'container',
            height: 220,
            id: 'logoPanel',
            items: [{
                html: '<img src="resources/img/logoJSS.png" width="143" height="143"/>'
            }, {
                html: 'Raxa EMR',
                style: 'font-family: "Helvetica Neue",HelveticaNeue,"Helvetica-Neue",Helvetica,"BBAlpha Sans",sans-serif;'
            }]
        },{
            html: "Existing Users",
            style: 'font-family: "Helvetica Neue",HelveticaNeue,"Helvetica-Neue",Helvetica,"BBAlpha Sans",sans-serif; font-weight: bold; text-align: left',
            width: 350
        },{
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                id: 'userName',
    //                label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.textfield.label'),
                label: 'User Name',
                clearIcon: true,
                width: 350
            }, {
                xtype: 'passwordfield',
                id: 'passwordID',
    //                label: Ext.i18n.appBundle.getMsg('RaxaEmr.view.passwordfield.label'),
                label: 'Password',
                clearIcon: true,
                width: 350
            }]
        }, {
            xtype: 'button',
//            text: Ext.i18n.appBundle.getMsg('RaxaEmr.view.button.title'),
            text: 'Sign In',
            margin: '-20 0 40 0',
            id: 'signInButton',
            ui: 'decline-round',
            width: 350,
        }, {
            hidden: true,
            html: "New Users",
                style: 'font-family: "Helvetica Neue",HelveticaNeue,"Helvetica-Neue",Helvetica,"BBAlpha Sans",sans-serif; font-weight: bold; text-align: left',
            width: 350
        }, {
            hidden: true,
            xtype: 'container',
            layout: 'hbox',
            width: 350,
            items: [{
                html: '<img src="resources/img/doctor.png" width="128" height="128"/>'
            },
            {
                xtype: 'container',
                layout: 'vbox',
                height: 128,
                items: [{
                    margin: '20 0 0 0',
                    html: 'Are you a doctor?'
                },{
                    xtype: 'button',
                    text: 'New Provider Account',
                    id: 'newProviderAccountButton',
                    ui: 'decline-round',
                }]
            }]
        },{
            hidden: true,
            xtype: 'container',
            layout: 'hbox',
            width: 350,
            items: [{
                html: '<img src="resources/img/patient.png" width="128" height="128"/>'
            },
            {
                xtype: 'container',
                layout: 'vbox',
                height: 128,
                width: 162,
                items: [{
                    margin: '20 0 0 0',
                    html: 'Do you want access to your medical record?'
                },{
                    xtype: 'button',
                    text: 'New Patient Account',
                    id: 'newPatientAccountButton',
                    ui: 'decline-round',
                }]
            }]
        }]
    }
});
