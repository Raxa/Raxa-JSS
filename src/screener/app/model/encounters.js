Ext.define('Screener.model.encounters',{
    extend: 'Ext.data.Model',
    config:{
        fields:[{
            name: 'id',
            persist: false
        },'encounterDatetime', 'patient', 'encounterType', 'location', 'provider']
    }
}