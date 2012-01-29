Ext.define('Docs.controller.phone.Content', {
    extend: 'Docs.controller.Content',
    
    init: function() {
        this.control({
            'nestedlist': {
                leafitemtap: this.onNavTap
            }
        });
    },
    
    getMainPanel: function() {
        return Ext.getCmp('mainPanel');
    },
    
    showGuide: function(id) {
        this.getMainPanel().setActiveItem(1);
        this.getMainPanel().down('#guides').setHtml('Guide ' + id);
    },
    
    showVideo: function(id) {
        this.getMainPanel().setActiveItem(2);
        this.getMainPanel().down('#videos').setHtml('Video ' + id);
    },
    
    showApi: function(id) {
        this.getMainPanel().setActiveItem({
            xtype: 'guide',
            html: 'Showing API: ' + id
        });
    }
});