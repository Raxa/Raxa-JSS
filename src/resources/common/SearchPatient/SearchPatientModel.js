/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('RaxaEmr.Common.model.Patient', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        persist: false
    }, {
        name: 'display',
        type: 'string'
    }, {
        name: 'uuid',
    }]
});