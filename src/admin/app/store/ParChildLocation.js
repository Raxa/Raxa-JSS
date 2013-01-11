/**
 * Does the Get call for getting patient location
 */
Ext.define('RaxaEmr.Admin.store.ParChildLocation',{
    extend: 'Ext.data.TreeStore',
    xtype: 'parChildLocStore',
    config: {
        model: 'RaxaEmr.Admin.model.ListItem',
        defaultRootProperty: 'items'
    }
});
