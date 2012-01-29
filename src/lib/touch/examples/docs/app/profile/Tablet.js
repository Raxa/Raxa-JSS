Ext.define('Docs.profile.Tablet', {
    config: {
        namespace: 'tablet',
        controllers: ['Main', 'Content']
    },
    
    isActive: function() {
        return false;
    },

    launch: function() {
        console.log('launching tablet');
    }
});