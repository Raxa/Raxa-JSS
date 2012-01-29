Ext.define('Mail.controller.phone.Messages', {
    extend: 'Mail.controller.Messages',
    
    config: {
        refs: {
            nav: 'mailnav container[layout=card]'
        }
    },
    
    showMessage: function(id) {
        this.callParent(arguments);
        this.getNav().setActiveItem(2);
    }
});