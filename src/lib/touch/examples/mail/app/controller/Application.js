Ext.define('Mail.controller.Application', {
    extend: 'Ext.ux.app.Controller',
    
    config: {
        before: {
            "*": "authenticate"
        },
        
        packages: {
            'Ext.ux.Auth': 'authenticate'
        }
    },
    
    authenticate: function(action) {
        Ext.ux.Auth.authenticate({
            success: action.resume,
            failure: function() {
                alert("You're not logged in, idiot");
            }
        });
    }
});