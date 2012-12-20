var store = Ext.create('Ext.data.Store', {
    storeId:'billingItemStore',
    fields:['name', 'cost', 'category'],
    groupField: 'category',
    data: {'billingItems':[
        { "name": "Michael Scott",  "cost": 700, "category": "Medicine" },
        { "name": "Dwight Schrute", "cost": 200, "category": "Radiology" },
        { "name": "Jim Halpert",    "cost": 300, "category": "Radiology" },
        { "name": "Kevin Malone",   "cost": 400, "category": "Medicine" },
        { "name": "Kevin Malone",   "cost": 400, "category": "Other"},
        { "name": "Angela Martin",  "cost": 500, "category": "Labs" }
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'billingItems'
        }
    }
});


Ext.define('RaxaEmr.billing.view.currentbill', {
    extend: 'Ext.grid.Panel',
alias : 'widget.currentbill',
    height: 350,
      width: 200,
    store: Ext.data.StoreManager.lookup('billingItemStore'),
  
    title: 'Current Bill',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Name'
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'cost',
                    text: 'cost'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'discount',
                    text: 'discount'
                }
            ],
            
            features: [{ftype:'grouping'}],
            viewConfig: {

            }
        });

        me.callParent(arguments);
    }

});