Ext.define('Docs.model.Content', {
    extend: 'Ext.data.Model',
    fields: ['title', 'type'],
    
    hasMany: 'Comment'
});