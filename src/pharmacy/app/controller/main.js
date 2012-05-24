Ext.define('RaxaEmr.Pharmacy.controller.main', {
    extend: 'Ext.app.Controller',
    
    views: ['group', 'drugs', 'unassigned', 'add',],
    stores: ['drugstore','groupstore'],
    models: ['drugmodel', 'groupmodel'],
    store: 'drugstore',
    init: function () {
        this.control({
           'groups': {
                itemclick: this.load
            },
            'list': {
                itemdblclick: this.assign
            },
            'mainviews button[action=assign]': {
                click: this.druglist
            },
            'unassigneddrugs button[action=back]': {
                click: this.goback
            }
        });
    },
    
    load: function(grid, record) {
        Ext.getStore('drugstore').find("root",record.get('name'));
        //drugstore.find("root",record.get('name'));
        console.log(Ext.getStore('drugstore').find("drugstore.root",record.get('name'))+'  '+record.get('name'));
    },
    
    druglist: function() {
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(1);
    },
    
    goback: function() {
        var l = Ext.getCmp('mainarea').getLayout();
        l.setActiveItem(0);
    },
    assign: function(grid, record){
        console.log('hiii');
        //var view = Ext.widget('Add');
        //view.down('form').loadRecord(record);
    }
});