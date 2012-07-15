Ext.define('RaxaEmr.Pharmacy.view.pharmacyTopbar',{
    extend: 'Ext.container.Container',
    alias: 'widget.pharmacytopbar',
    autoScroll: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
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
            width: 80,
            handler: function(){
                var l = Ext.getCmp('mainarea').getLayout();
                l.setActiveItem(0);
                var l1 = Ext.getCmp('addpatientarea').getLayout();
                l1.setActiveItem(0);
                var l2 = Ext.getCmp('addpatientgridarea').getLayout();
                l2.setActiveItem(0);
            }
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
            width: 80,
            handler: function(){
                var l = Ext.getCmp('mainarea').getLayout();
                l.setActiveItem(4);
            }
        }, {
            xtype: 'button',
            text: 'Reports',
            icon: '../../resources/img/mLogo.png',
            iconAlign: 'top',
            scale: 'large',
            width: 80,
            handler: function(){
                var l = Ext.getCmp('mainarea').getLayout();
                l.setActiveItem(2);
            }
        }, {
            xtype: 'button',
            text: 'Admin',
            icon: '../../resources/img/mLogo.png',
            iconAlign: 'top',
            scale: 'large',
            width: 80,
            handler: function(){
                var l = Ext.getCmp('mainarea').getLayout();
                l.setActiveItem(3);
            }
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
})