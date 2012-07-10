// Store for sotring patients when registered offline

Ext.define('mUserStories.store.offlineRegisterStore',{
    extend:'Ext.data.Store',
    config:{
        model:'mUserStories.model.upPersonModel',
//        id: 'offlineRegisterStore',
        sorters:'familyName',
//        grouper:function(record){
//            return record.get('familyName')[0];
//        },
        proxy: {
            type: 'localstorage',
            id: 'offlineRegisterStoreid'
        }
    }
})