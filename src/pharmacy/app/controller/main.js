Ext.define('RaxaEmr.Pharmacy2.controller.main',{
    extend: 'Ext.app.Controller',
    views: ['groups', 'drugs', 'druglist', 'Home', 'add', 'add2'],
    controllers: ['main'],
    models: ['alldrugsmodel', 'drugmodel', 'groupmodel'],
    stores: ['AllDrugslist', 'allgroups', 'groupeddrugs'],
    
    
    init: function() {
        this.control({
            'home button[action=group]': {
                click: this.change
            },
            'alldrugs button[action=back]': {
                click: this.goback
            },
            'home button[action=create]': {
                click: this.creategroup
            },
            'alldrugs': {
                itemdblclick: this.assign
            },
            'addgroup button[action=save]': {
                click: this.newgroup
            },
            'add2group button[action=save]': {
                click: this.groupitem
            },
            'groupgrid': {
                itemclick: this.loadgroup
            },
            'druggrid': {
                itemdblclick: this.removedrug
            }
        });
    },
    
    change: function(button) {
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(1)
    },
    
    goback: function(button) {
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(0);
    },
    
    creategroup: function(button) {
        Ext.widget('addgroup');
    },
    
    assign: function(grid, record) {
        var view = Ext.widget('add2group');
        view.down('form').loadRecord(record);
    },
    
    newgroup: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();
        if(values.groupname == "" || values.regimen == undefined){
            alert('Please fill all fields');
        }
        else if(Ext.getStore('allgroups').find('groupname',values.groupname) != -1) {
            alert('Group Already Created');
        }
        else {
            this.helper(values);
        }
        win.close();
    },
    
    helper: function(values) {
        var g = Ext.create('RaxaEmr.Pharmacy2.model.groupmodel');
        g.set('groupname',values.groupname);
        g.set('regimen',values.regimen);
        Ext.getStore('allgroups').add(g);
        Ext.getStore('allgroups').sync();
    },
    
    groupitem: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();
        var index = Ext.getStore('allgroups').find('groupname',values.field2);
        if(values.drugname == "" || values.field2 == undefined){
            alert('Please fill all fields');
        }
        else if(Ext.getStore('allgroups').getAt(index).drugs().find('drugname',values.drugname) != -1) {
            alert('Drug already assigned to this group');
        }
        else {
            this.helper2(values,index);
        }
        win.close();
    },
    
    helper2: function(values,index) {
        var h = Ext.create('RaxaEmr.Pharmacy2.model.drugmodel');
        var record = Ext.getStore('AllDrugslist').findRecord('drugname',values.drugname);
        h.set('drugname',record.data.drugname);
        h.set('tablets',record.data.tablets);
        h.set('days',record.data.days);
        var store = Ext.getStore('allgroups').getAt(index).drugs();
        store.add(h);
        store.sync();
    },
    
    loadgroup: function(grid, record) {
        var ix = Ext.getStore('allgroups').find('groupname',record.data.groupname);
        Ext.getCmp('ingroup').view.store = Ext.getStore('allgroups').getAt(ix).drugs();
        Ext.getCmp('ingroup').store.storeId = Ext.getStore('allgroups').getAt(ix).data.groupname;
        Ext.getCmp('ingroup').view.refresh();
    },
    
    removedrug: function(grid, record) {
        var x = Ext.getCmp('ingroup').store.storeId;
        var ix = Ext.getStore('allgroups').find('groupname',x);
        var store = Ext.getStore('allgroups').getAt(ix).drugs();
        store.remove(record);
        store.sync();
    }
});