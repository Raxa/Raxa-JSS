Ext.define('pharmacy.store.Users', {
    extend: 'Ext.data.Store',
     model: 'pharmacy.model.User',
     autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'data/users.json',
        reader: {
            type: 'json',
            root: 'users',
            successProperty: 'success'
        }
    },
    data: [
        {drug: 'Ed',    mims: 'ed@sencha.com',form: 'asd', pack: '78',di:'jkjk',streat: 'gvbmn',dosage: '9'},
    ]
});