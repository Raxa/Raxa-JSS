Ext.define('mUserStories.store.offlineStore',{
    extend:'Ext.data.Store',
    config:{
        model:'mUserStories.model.downModel',
        id: 'offlineStore',
        sorters:'familyName',
        grouper:function(record){
            return record.get('familyName')[0];
        },
        proxy: {
            type: 'localstorage',
            id: 'offlineStoreid'
        }
    }
})