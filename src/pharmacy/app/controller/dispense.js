Ext.define("RaxaEmr.Pharmacy.controller.dispense", {
    extend: 'Ext.app.Controller',

    views: ['dispense', 'Viewport', 'GroupDrugs', 'Groups', 'Drugs', 'Alldrugs', 'main', 'add', 'add2'],
    models: ['dispense', 'alldrugsmodel'],
    stores: ['dispense', 'alldrugsstore'],

    init: function () {
        this.control({
            'viewport [action=dispensepage]': {
                click: this.dispensepage
            },
            'viewport [action=groupmain]': {
                click: this.groupmain
            },
            'Dispense [action=back]': {
                click: this.mainpage
            },
            'groupdrugs [action=back]':{
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
    
    mainpage: function() {
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(0)
    }
    
});