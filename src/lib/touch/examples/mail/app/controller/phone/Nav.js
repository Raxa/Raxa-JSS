Ext.define('Mail.controller.phone.Nav', {
    extend: 'Mail.controller.Nav',
    
    config: {
        refs: {
            nav: 'mailnav container[layout=card]'
        },
        
        control: {
            'viewer button[ui=back]': {
                tap: 'showMessages'
            }
        }
    },
    
    onAccountTap: function(list, index) {
        this.getNav().setActiveItem(1); //this should be addressed with an itemId
    },
    
    showMessages: function() {
        this.getNav().setActiveItem(1);
    }
});