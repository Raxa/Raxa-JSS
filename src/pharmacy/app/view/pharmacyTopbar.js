TOPBARBUTTONLOGOPATH = '../resources/img/miniLogo.png';
PHARMACYTOPBARHEIGHT = 40;
BUTTON_HEIGHT = 35;

Ext.define('RaxaEmr.Pharmacy.view.pharmacyTopbar',{
    extend: 'Ext.container.Container',
    alias: 'widget.pharmacyTopBar',
    autoScroll: true,
    width: 960,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    // renderTo: Ext.getBody(),
    defaults: {
        flex: 1,
    },
    clearButtonsUI: function(){
        // Ext.getCmp('patientsButton').setUI('default');
        // Ext.getCmp('inventoryButton').setUI('default');
        // Ext.getCmp('adminButton').setUI('default');
        // Ext.getCmp('reportsButton').setUI('default');
        // Ext.getCmp('recordsButton').setUI('default');
    },
    items: [{
        xtype: 'toolbar',
        height: PHARMACYTOPBARHEIGHT,
        dock: 'top',
        items: [
        {
            xtype: 'button',
            text: 'Patients',
            id: 'patientsButton',
            height: BUTTON_HEIGHT,
            // width: 200,
            // //TODO: determine why we need different path for local vs. external host
            icon: '../resources/img/miniLogo.png',
            iconAlign: 'top',
            width: 80,
            // disabled: true,
            handler: function(){
                Ext.getCmp('mainarea').getLayout().setActiveItem(0);
                Ext.getCmp('addpatientarea').getLayout().setActiveItem(0);
                Ext.getCmp('addpatientgridarea').getLayout().setActiveItem(0);

                // Highlight "Patients" tab
                Ext.getCmp('inventoryButton').toggle(false);
                Ext.getCmp('patientsButton').toggle(true);
            }
        },{
            xtype: 'button',
            text: 'Inventory',
            id: 'inventoryButton',
            height: BUTTON_HEIGHT,
            icon: '../resources/img/miniLogo.png',
            iconAlign: 'top',
            width: 80,
            pressed: true,
            handler: function(){
                var l = Ext.getCmp('mainarea').getLayout();
                l.setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.ALLSTOCK.value);
                
                // Highlight "Inventory" tab
                Ext.getCmp('inventoryButton').toggle(true);
                Ext.getCmp('patientsButton').toggle(false);
            }
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            id: 'alertButton',
            text: 'Alerts',
            height: BUTTON_HEIGHT,
            width: 60,
            handler: function(){
                Ext.getStore('alerts').load({
                    scope: this,
                    callback: function(records, operation, success){
                        if(success) {
                            // Do nothing
                        } else {
                            Ext.Msg.alert("Error", Util.getMessageLoadError());
                        }
                    }
                });
                if(Ext.getCmp('alertPanel').isHidden()){
                    Ext.getCmp('alertPanel').show();
                    this.setText('Close');
                    var x = Ext.getCmp('pharmacyTopBar').x + Ext.getCmp('pharmacyTopBar').width - Ext.getCmp('alertPanel').width;
                    Ext.getCmp('alertPanel').setPosition(x, PHARMACYTOPBARHEIGHT);
                    Ext.getCmp('alertPanel').setHeight(200);
                }else{
                    Ext.getCmp('alertPanel').hide();
                    this.setText('Alerts');
                }
            }
        }, {
            xtype: 'tbtext',
            text: 'You are are logged in as ' + localStorage.getItem('username')
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'button',
            height: BUTTON_HEIGHT,
            text: 'Log Out',
            handler: function() {
                Ext.Msg.confirm("Log Out", "Are you sure?", function(btn){
                    if(btn =='yes'){
                        Util.logoutUser();
                        location.reload();
                    }
                });
            }
        }]
    }]
})