Ext.define("RaxaEmr.Pharmacy.controller.controls", {
    extend: 'Ext.app.Controller',
    views: ['dispense', 'Viewport', 'GroupDrugs', 'Groups', 'Drugs', 'Alldrugs', 'main', 'add', 'add2'],
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
    
    goback: function() {
        var l = Ext.getCmp('mainarea2').getLayout();
        l.setActiveItem(0);
        Ext.getCmp('drugID').view.refresh();
    },
    
    addtogroup: function(grid, record) {
        var v = Ext.widget('add2group');
        v.down('textfield').setValue(record.data.drugname);
    },
    
    creategroup: function() {
        Ext.widget('addgroup');
    },
    groupdrugs: function() {
        var l = Ext.getCmp('mainarea2').getLayout();
        l.setActiveItem(1)
    },
    
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
    
    helper: function(values) {
        var g = Ext.create('RaxaEmr.Pharmacy.model.groupmodel');
        g.set('groupname',values.groupname);
        g.set('regimen',values.regimen);
        Ext.getStore('groupstore').add(g);
        Ext.getStore('groupstore').sync();
    },
    
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
    
    loadgrid: function(grid, record) {
        var ix = Ext.getStore('groupstore').find('groupname',record.data.groupname);
        console.log(Ext.getComponent('drugID').getTitle());
        Ext.getCmp('drugID').view.store = Ext.getStore('groupstore').getAt(ix).drugs();
        Ext.getCmp('drugID').store.storeId = Ext.getStore('groupstore').getAt(ix).data.groupname;
        Ext.getCmp('drugID').view.refresh();
    },
    
    removedrug: function(grid, record) {
        var x = Ext.getCmp('drugID').store.storeId;
        var ix = Ext.getStore('groupstore').find('groupname',x);
        var store = Ext.getStore('groupstore').getAt(ix).drugs();
        store.remove(record);
        store.sync();
        Ext.getCmp('drugID').view.refresh();
    }
});