Ext.define('Mail.store.Accounts', {
    extend: 'Ext.data.Store',
    alias: 'store.Accounts',
    
    constructor: function() {
        Ext.apply(this, {
            storeId: 'Accounts',
            
            model: 'Mail.model.Account',
            defaultRootProperty: 'items',
            rootVisible: false,
            
            data: [
                {
                    id: 1,
                    name: 'Ed Spencer',
                    address: 'ed@sencha.com'
                },
                {
                    id: 2,
                    name: 'Ed Spencer',
                    address: 'edspencer@me.com'
                }
            ]
        });
        
        this.callParent(arguments);
    }
});