/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('RaxaEmr.Pharmacy.model.Patient', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        persist: false
    }, {
        name: 'person',
        type: 'string'
    }, {
        name: 'identifiers',
        model: 'RaxaEmr.Pharmacy.model.identifiers'
    }]
});