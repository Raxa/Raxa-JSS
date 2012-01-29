Ext.define('Mail.model.Folder', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'name', 'account_id'],
    
    hasMany: 'Message',
    belongsTo: 'Account'
});