/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('RaxaEmr.Pharmacy.store.Locations', {
    extend: 'Ext.data.Store',
    model: 'RaxaEmr.Pharmacy.model.Location',
    autoLoad: true,
    id: 'locations',
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/location?v=full',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});

