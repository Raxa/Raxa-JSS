Ext.define('Mail.store.Messages', {
    extend: 'Ext.data.Store',
    alias: 'store.Messages',
    
    requires: ['Ext.ux.Faker'],
    
    constructor: function() {
        console.log('creating store');
        var data  = [],
            count = 50,
            faker = Ext.create('Ext.ux.Faker'),
            i;
        
        for (i = 0; i < count; i++) {
            data[i] = {
                id: i + 1,
                subject: faker.subject(),
                fromEmail: faker.email(),
                fromName: faker.name(),
                body: faker.lorem(Math.ceil(Math.random() * 3)),
                sentAt: '19 November 2011 15:46'
            };
        }
        
        Ext.apply(this, {
            storeId: 'Messages',
            
            model: 'Mail.model.Message',
            defaultRootProperty: 'items',
            rootVisible: false,
            
            data: data
        });
        
        this.callParent(arguments);
    }
});
