Ext.define('Docs.model.Comment', {
    extend: 'Ext.data.Model',
    fields: ['title', 'user_id', 'content_id'],
    
    belongsTo: 'Content'
});