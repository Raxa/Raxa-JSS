/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('RaxaEmr.Pharmacy.store.Locations', {
    extend: 'Ext.data.Store',
    fields: [{
        name: 'uuid',
        type: 'string'
    }],
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/location',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});

