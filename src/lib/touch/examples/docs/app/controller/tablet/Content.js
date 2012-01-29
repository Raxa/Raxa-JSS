Ext.define('Docs.controller.tablet.Content', {
    extend: 'Docs.controller.Content',
    
    init: function() {
        this.control({
            'nestedlist': {
                leafitemtap: this.onNavTap
            }
        });
    },
    
    showGuide: function(id) {
        this.getMainPanel().setActiveItem({
            xtype: 'guide',
            html: 'Showing guide ' + id
        });
    },
    
    showVideo: function(id) {
        this.getMainPanel().add({
            xtype: 'video',
            id: id
        });
    },
    
    showApi: function(id) {
        this.getMainPanel().setActiveItem({
            xtype: 'guide',
            html: 'Showing API: ' + id
        });
    }
});