/**
 * This class defines a Patient,
 * with strings for uuid and display, 
 * and model for links
 */
Ext.define('Screener.model.Patient', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'uuid',
            type: 'string'
        }, {
            name: 'display',
            type: 'string'
        }, {
            name: 'links',
            model: 'Screener.model.Links'
        }]
    }
});
