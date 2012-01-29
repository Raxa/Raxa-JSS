Ext.define('Docs.model.User', {
    fields: ['username', 'profile_picture_url'],
    
    hasMany: 'Comment'
});