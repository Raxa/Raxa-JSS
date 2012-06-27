Ext.define("RaxaEmr.Pharmacy.controller.dispense", {
    extend: 'Ext.app.Controller',

    views: ['dispense', 'Viewport', 'mainview', 'Groups', 'groupedDrugs', 'alldrugs', 'add', 'add2'],
    models: ['dispense', 'alldrugsmodel', 'groupmodel', 'drugmodel',],
    stores: ['dispense', 'alldrugsstore', 'groupstore', 'drugstore',],

    init: function () {
        this.control({
            'viewport [action=dispensepage]': {
                click: this.dispensepage
            },
            'viewport [action=groupmain]': {
                click: this.groupmain
            },
            'viewport [action=prescription]': {
                click: this.prescription
            },
            'Dispense [action=back]': {
                click: this.mainpage
            },
            'groupdrugs [action=back]':{
                click: this.mainpage
            },
            'prescription [action=done]': {
                click: this.mainpage
            }
        })
    },
    
    dispensepage: function() {
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(1)
    },
    
    groupmain: function() {
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(2)
    },
    
    prescription: function() {
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(3)
    },
    
    mainpage: function() {
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(0)
    }
    
});