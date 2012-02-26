/*
 * In this example, we set up 3 models - User, Order and OrderItem. Each User hasMany Orders,
 * and each Order hasMany OrderItems. First let's define those models:
 */
Ext.regModel('User', {
    fields: ['id', 'name'],
    
    hasMany: {model: 'Order', name: 'orders'},
    
    proxy: {
        type: 'ajax',
        url : 'src/demos/data/userData.json'
    }
});

Ext.regModel('Order', {
    fields: ['id', 'status'],
    
    hasMany: {model: 'OrderItem', name: 'orderItems'}
});

Ext.regModel('OrderItem', {
    fields: ['id', 'quantity', 'price', 'name']
});

/*
 * This panel sets up a DataView, which defines an XTemplate used to render our data. We also set up
 * the toolbar with the "Load Nested Data" button here
 */
demos.Data.nestedLoading = new Ext.Panel({
    layout: 'fit',
    scroll: 'vertical',
    dockedItems: [
        {
            dock: 'top',
            xtype: 'toolbar',
            items: [
                {
                    text: 'Load Nested Data',
                    handler: function() {
                        var panel    = demos.Data.nestedLoading,
                            dataview = panel.items.first(),
                            store    = dataview.store;
                        
                        store.load();
                    }
                },
                {
                    text: 'Explain',
                    handler: function() {
                        demos.Data.nestedLoading.explanation.show();
                    }
                }
            ]
        }
    ],
    
    items: [
        {
            xtype: 'dataview',
            
            /*
             * The XTemplate allows us to easily render the data from our User model, as well as
             * iterating over each User's Orders and OrderItems:
             */
            tpl: [
                '<tpl for=".">',
                    '<div class="user">',
                        '<h3>{name}\'s orders:</h3>',
                        '<tpl for="orders">',
                            '<div class="order" style="padding-left: 20px;">',
                                'Order: {id} ({status})',
                                '<ul>',
                                    '<tpl for="orderItems">',
                                        '<li>{quantity} x {name}</li>',
                                    '</tpl>',
                                '</ul>',
                            '</div>',
                        '</tpl>',
                    '</div>',
                '</tpl>'
            ],
            
            itemSelector: 'div.user',
            styleHtmlContent: true,
            
            store: new Ext.data.Store({
                model: 'User',
                autoLoad: false
            })
        }
    ]
});

/*
 * This panel just contains the floating explanation window and can be safely ignored!
 */
demos.Data.nestedLoading.explanation = new Ext.Panel({ 
    floating: true,
    modal: true,
    centered: true,
    width: 250,
    height: 250,
    styleHtmlContent: true,
    scroll: 'vertical',
    dockedItems: {
        dock : 'top',
        xtype: 'toolbar',
        title: 'Loading Nested Data'
    },
    
    html: [
        '<p>The data package can load deeply nested data in a single request. In this example we are loading a fictional',
        'dataset containing Users, their Orders, and each Order\'s OrderItems.</p>',
        '<p>Instead of pulling down each record in turn, we load the full data set in a single request and allow the data',
        'package to automatically parse the nested data.</p>',
        '<p>As one of the more complex examples, it is worth tapping the "Source" button to see how this is set up.</p>'
    ].join("")
});