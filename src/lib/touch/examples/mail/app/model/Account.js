Ext.define('Mail.model.Account', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'address', 'name'],
    
    hasMany: 'Mail.model.Folder'
});