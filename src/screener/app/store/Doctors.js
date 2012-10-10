Ext.define('Screener.store.Doctors', {
    requires: ['Screener.model.Doctor'],
    extend: 'Ext.data.Store',
    storeId: 'doctorStore',
    config: {
        model: 'Screener.model.Doctor',
        proxy: {
            type: 'ajax',
            url: HOST +'/ws/rest/v1/provider?v=full',
            headers: Util.getBasicAuthHeaders(),
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        },
        autoLoad: true,
        listeners:{
            'load': function() {
                this.filterBy(function(record){
                    if(record.data.attributes.length > 0){
                        return record.data.attributes[0].display === Util.DOCTOR_ATTRIBUTE;
                    }
                    return false;
                });
            
            }
        }
    }
}); 
