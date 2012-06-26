Ext.define('RaxaEmr.Pharmacy.view.prescription', {
    extend: 'Ext.container.Container',
    alias: 'widget.prescription',
    layout: {
        type: 'hbox'
    },
    width: 400,
    renderTo: Ext.getBody(),
    border: 1,
    style: {
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: '1px'
    },
    defaults: {
        labelWidth: 80,
        xtype: 'datefield',
        flex: 1,
        style: {
            padding: '10px'
        }
    },
    items: [{
        xtype: 'toolbar',
        height: 65,
        dock: 'top',
        items: [{
            xtype: 'tbtext',
            text: Util.getHospitalName()
        },

        {
            xtype: 'button',
            text: 'Patient Queue',
            icon: '../../resources/img/mLogo.png',
            iconAlign: 'top',
            scale: 'large',
            width: 80

        }, {
            xtype: 'button',
            text: 'Bill Records',
            icon: '../../resources/img/mLogo.png',
            iconAlign: 'top',
            scale: 'large',
            width: 80
        }, {
            xtype: 'button',
            text: 'Inventory',
            icon: '../../resources/img/mLogo.png',
            iconAlign: 'top',
            scale: 'large',
            width: 80
        }, {
            xtype: 'button',
            text: 'Reports',
            icon: '../../resources/img/mLogo.png',
            iconAlign: 'top',
            scale: 'large',
            width: 80
        }, {
            xtype: 'button',
            text: 'Admin',
            icon: '../../resources/img/mLogo.png',
            iconAlign: 'top',
            scale: 'large',
            width: 80
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'tbtext',
            text: Ext.Date.format(new Date(), 'F j, Y, g:i a')
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'button',
            text: 'Alert',
            menu: new Ext.menu.Menu({
                items: []
            })
        }]

    }]
});