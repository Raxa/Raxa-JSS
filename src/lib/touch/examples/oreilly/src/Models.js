Ext.regModel('Proposal', {
    hasMany: {
        model: 'Speaker',
        name: 'speakers'
    },
    fields: ['id', 'title', 'url', 'description', 'day', 'time', 'end_time', 'pretty_time', 'date', 'topics', 'room', 'proposal_type']
});

Ext.regModel('Speaker', {
    hasMany: {
        model: 'Proposal',
        name: 'proposals'
    },
    fields: ['id', 'first_name', 'last_name', 'name', 'position', 'affiliation', 'bio', 'twitter', 'url', 'photo']
});

Ext.regModel('OfflineData', {
    fields: ['id', 'feedname', 'json'],
    proxy: {type: 'localstorage', id: 'oreillyproxy'}
});

Ext.regModel('Video', {
    fields: ['id', 'author', 'video']
});

Ext.regModel('Tweet', {
    fields: ['id', 'text', 'to_user_id', 'from_user', 'created_at', 'profile_image_url']
});