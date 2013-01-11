PHARMACY_TOPBAR_CONSTANTS = {
    TAB_WIDTH : 80,
    BUTTON_HEIGHT : 35,
    BUTTON_WIDTH : 60,
    HEIGHT : 40
};

Ext.define('RaxaEmr.Pharmacy.view.pharmacyTopbar',{
    extend: 'Ext.container.Container',
    alias: 'widget.pharmacyTopBar',
    autoScroll: true,
    width: 960,
    id: 'pharmacyTopbar',
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
        id: 'pharmacyTopbar',
        items: [
	{
	    xtype: 'image',
	    src:  '../resources/img/icon_s.png',
            width: PHARMACY_TOPBAR_CONSTANTS.BUTTON_HEIGHT,
	    listeners: {
	        afterrender: function(c) {
	            c.el.on("click", function() {
			 window.location = '../#Dashboard'; 
		    })
		}
	    }
        }, {
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
                //Ext.getCmp('addpatientgridarea').getLayout().setActiveItem(1);

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
        },
        {
            margin: 5,
            xtype: 'combobox',
            id: 'allStockLocationPicker',
            fieldLabel: 'Your Location',
            store: 'Locations',
            displayField: 'name',
            queryMode: 'local',
            hideTrigger: true,
            forceSelection: true,
            valueField: 'uuid',
            emptyText: 'All Locations',
            listeners: {
                'focus': {
                    fn: function (comboField) {
                        comboField.doQuery(comboField.allQuery, true);
                        comboField.expand();
                    },
                    scope: this
                }
            }
        },
        {
            xtype: 'button',
            id: 'alertButton',
            text: 'Alerts',
            height: PHARMACY_TOPBAR_CONSTANTS.BUTTON_HEIGHT,
            width: PHARMACY_TOPBAR_CONSTANTS.BUTTON_WIDTH,
            handler: function(){
                Ext.getStore('Alerts').load({
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
