Ext.define('Mail.model.Message', {
    extend: 'Ext.data.Model',
    
    fields: ['id', 'subject', 'body', 'fromEmail', 'fromName', 'readStatus', 'sentAt'],
    
    belongsTo: 'Folder'
});