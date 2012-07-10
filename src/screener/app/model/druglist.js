/* model for the drug list in pharmacy form and their values */
Ext.define('Screener.model.druglist', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'value',
            type: 'string',
            mapping: 'uuid'
        }, {
            name: 'text',
            type: 'string',
            mapping: 'name'
        }]
    }
});