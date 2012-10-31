PHARMACY_TOPBAR_CONSTANTS = {
    TAB_WIDTH : 80,
    BUTTON_HEIGHT : 35,
    BUTTON_WIDTH : 60,
    HEIGHT : 40,
};

Ext.define('RaxaEmr.Pharmacy.view.pharmacyTopbar',{
    extend: 'Ext.container.Container',
    alias: 'widget.pharmacyTopBar',
    autoScroll: true,
    width: 960,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    defaults: {
        flex: 1
    },
    items: [{
        xtype: 'toolbar',
        height: PHARMACY_TOPBAR_CONSTANTS.HEIGHT,
        dock: 'top',
        items: [
        {
            xtype: 'button',
            text: 'Patients',
            id: 'patientsButton',
            height: PHARMACY_TOPBAR_CONSTANTS.BUTTON_HEIGHT,
            width: PHARMACY_TOPBAR_CONSTANTS.TAB_WIDTH,
            handler: function(){
                // TODO: This should just be one call - we should update "main area" layout so it has 2 xtypes only, for
                //  patient and inventory views
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
            height: PHARMACY_TOPBAR_CONSTANTS.BUTTON_HEIGHT,
            width: PHARMACY_TOPBAR_CONSTANTS.TAB_WIDTH,
            pressed: true,  // button appears selected at startup
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
            height: PHARMACY_TOPBAR_CONSTANTS.BUTTON_HEIGHT,
            width: PHARMACY_TOPBAR_CONSTANTS.BUTTON_WIDTH,
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
                    var x = Ext.getCmp('pharmacyTopBar').x + Ext.getCmp('pharmacyTopBar').width - Ext.getCmp('alertPanel').width;
                    Ext.getCmp('alertPanel').setPosition(x, PHARMACY_TOPBAR_CONSTANTS.HEIGHT);
                    Ext.getCmp('alertPanel').setHeight(200);
                    Ext.getCmp('alertPanel').show();
                }else{
                    Ext.getCmp('alertPanel').hide();
                }
            }
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'tbtext',
            text: 'You are are logged in as ' + localStorage.getItem('username')
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'button',
            height: PHARMACY_TOPBAR_CONSTANTS.BUTTON_HEIGHT,
            width: PHARMACY_TOPBAR_CONSTANTS.BUTTON_WIDTH,
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