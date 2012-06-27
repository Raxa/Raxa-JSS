Ext.define("RaxaEmr.Pharmacy.controller.main", {
    extend: 'Ext.app.Controller',
    views: ['dispense', 'Viewport', 'mainview', 'Groups', 'groupedDrugs', 'alldrugs', 'add', 'add2', 'prescription'],
    models: ['dispense', 'alldrugsmodel', 'groupmodel', 'drugmodel',],
    stores: ['dispense', 'alldrugsstore', 'groupstore', 'drugstore',],

    init: function () {
        this.control({
            'alldrugs [action=backtogroup]': {
                click: this.goback
            },
            'alldrugs': {
                itemdblclick: this.addtogroup
            },
            'groupdrugs [action=creategroup]': {
                click: this.creategroup
            },
            'groupdrugs [action=group]': {
                click: this.groupdrugs
            },
            'addgroup [action=savegroup]': {
                click: this.savenewgroup
            },
            'add2group [action=save]': {
                click: this.savedrugtogroup
            },
            'groups': {
                itemclick: this.loadgrid
            },
            'drugs': {
                itemdblclick: this.removedrug
            }
        })
    },
    //function to go back to the groups page
    goback: function() {
        var l = Ext.getCmp('mainarea2').getLayout();
        l.setActiveItem(0);
        Ext.getCmp('drugID').view.refresh();
    },
    //creates the window to assign the drug to a group
    addtogroup: function(grid, record) {
        var v = Ext.widget('add2group');
        v.down('textfield').setValue(record.data.drugname);//v.down gives the first child of v with a textfield xtype
    },
    //creates an new window to create a new group
    creategroup: function() {
        Ext.widget('addgroup');
    },
    //goes to view of all drugs
    groupdrugs: function() {
        var l = Ext.getCmp('mainarea2').getLayout();
        l.setActiveItem(1)
    },
    //gets the value from the window created and checks if they are valid and calls its helper
    savenewgroup: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();
        if(values.groupname == "" || values.regimen == undefined){
            Ext.Msg.alert('Please fill all fields');
        }
        else if(Ext.getStore('groupstore').find('groupname',values.groupname) != -1) {
            Ext.Msg.alert('Group Already Created');
        }
        else {
            this.helper(values);
        }
        win.close();
    },
    // creates a new instance of the groupmodel and adds it to store
    helper: function(values) {
        var g = Ext.create('RaxaEmr.Pharmacy.model.groupmodel');
        g.set('groupname',values.groupname);
        g.set('regimen',values.regimen);
        Ext.getStore('groupstore').add(g);
        Ext.getStore('groupstore').sync();
    },
    //gets the value from the window created and checks if they are valid and calls its helper
    savedrugtogroup: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();
        if(Ext.getStore('groupstore').find('groupname',values.field2) == -1){
            Ext.Msg.alert('No such group exists');
        }else{
            var index = Ext.getStore('groupstore').find('groupname',values.field2);
            if(values.drugname == "" || values.field2 == ""){
                Ext.Msg.alert('Please fill all fields');
            }
            else if(Ext.getStore('groupstore').getAt(index).drugs().find('drugname',values.drugname) != -1) {
                Ext.Msg.alert('Drug already assigned to this group');
            }
            else{
                this.helper2(values,index);
            }
        }
        
        win.close();
    },
    // creates a new instance of the drugmodel and adds it to store
    helper2: function(values,index) {
        var h = Ext.create('RaxaEmr.Pharmacy.model.drugmodel');
        var record = Ext.getStore('alldrugsstore').findRecord('drugname',values.drugname);
        h.set('drugname',record.data.drugname);
        h.set('tablets',record.data.tablets);
        h.set('days',record.data.days);
        var store = Ext.getStore('groupstore').getAt(index).drugs();
        store.add(h);
        Ext.getStore('groupstore').sync();
    },
    //changes the store of the bottom grid on the fly when u click a row of the top grid
    loadgrid: function(grid, record) {
        var ix = Ext.getStore('groupstore').find('groupname',record.data.groupname);
        Ext.getCmp('drugID').view.store = Ext.getStore('groupstore').getAt(ix).drugs();
        Ext.getCmp('drugID').store.storeId = Ext.getStore('groupstore').getAt(ix).data.groupname;
        Ext.getCmp('drugID').view.refresh();
    },
    // removes a drug from a group
    removedrug: function(grid, record) {
        var x = Ext.getCmp('drugID').store.storeId;
        var ix = Ext.getStore('groupstore').find('groupname',x);
        var store = Ext.getStore('groupstore').getAt(ix).drugs();
        store.remove(record);
        Ext.getCmp('drugID').view.refresh();
    }
});