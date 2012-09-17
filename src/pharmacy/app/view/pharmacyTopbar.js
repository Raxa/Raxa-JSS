TOPBARBUTTONLOGOPATH = '../../resources/img/miniLogo.png';
PHARMACYTOPBARHEIGHT = 65;

Ext.define('RaxaEmr.Pharmacy.view.pharmacyTopbar',{
    extend: 'Ext.container.Container',
    alias: 'widget.pharmacytopbar',
    autoScroll: true,
    width: 960,
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
        height: PHARMACYTOPBARHEIGHT,
        dock: 'top',
        items: [{
            xtype: 'image',
            height: 35,
            width: 40,
            src: '../../resources/img/iconWhite.png'
        },

        {
            xtype: 'button',
            text: 'Patients',
            //TODO: determine why we need different path for local vs. external host
            icon: '../../resources/img/miniLogo.png',
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
            icon: TOPBARBUTTONLOGOPATH,
            iconAlign: 'top',
            scale: 'large',
            width: 80
        }, {
            xtype: 'button',
            text: 'Inventory',
            icon: TOPBARBUTTONLOGOPATH,
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
            icon: TOPBARBUTTONLOGOPATH,
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
            icon: TOPBARBUTTONLOGOPATH,
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
            id: 'alertButton',
            text: 'Alerts',
            width: 60,
            height: 30,
            handler: function(){
                Ext.getStore('alerts').load();
                if(Ext.getCmp('alertPanel').isHidden()){
                    Ext.getCmp('alertPanel').show();
                    this.setText('Close');
                    var x = Ext.getCmp('pharmacytopbar').x + Ext.getCmp('pharmacytopbar').width - Ext.getCmp('alertPanel').width;
                    Ext.getCmp('alertPanel').setPosition(x, PHARMACYTOPBARHEIGHT);
                    Ext.getCmp('alertPanel').setHeight(200);
                    this.setUI('raxa-orange-small');
                }else{
                    Ext.getCmp('alertPanel').hide();
                    this.setText('Alerts');
                    this.setUI('default');
                }
                
            }
        }]
    }]
})