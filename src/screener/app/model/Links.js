/**
 * This class defines Links,
 * with strings for uri and rel
 */
Ext.define('Screener.model.Links', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'uri',
            type: 'string'
        }, {
            name: 'rel',
            type: 'string'
        }]
    }
});

