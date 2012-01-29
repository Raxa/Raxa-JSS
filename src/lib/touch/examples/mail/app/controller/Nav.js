Ext.define('Mail.controller.Nav', {
    extend: 'Ext.ux.app.Controller',
    
    config: {
        control: {
            'messagelist button[ui=back]': {
                tap: 'showAccounts'
            },
            'button[action=compose]': {
                tap: 'onComposeTap'
            },
            'messagelist': {
                itemtap: 'onMessageTap'
            },
            'accountlist list': {
                itemtap: 'onAccountTap'
            }
        }
    },
     
    onComposeTap: function() {
        this.redirectTo('compose');
    },
    
    showAccounts: function() {
        this.redirectTo('accounts');
    },
    
    onMessageTap: function(list, index) {
        this.redirectTo(list.getStore().getAt(index));
    },
    
    onAccountTap: Ext.emptyFn
});