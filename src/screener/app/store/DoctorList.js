Ext.define('Screener.store.DoctorList', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Screener.model.DoctorList',
        proxy: {
            type: 'ajax',
            url: 'data/doctorList.json',
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        },
        autoLoad: true
    }
});