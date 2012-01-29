raxaemr.controllers.LoginFormController = new Ext.Controller({
    submit: function(options) {
        var theForm = options.data;
        
        raxaemr.views.loginForm.submit({
            method: 'GET',
            waitMsg: {
                message: 'Processing',
                cls : 'demos-loading'
            },
            scope: this,
            success: function(form, response) {
                alert('LOGIN SUCCESS');
            },
            failure: function(form, response) {
                Ext.Msg.alert('Authentication Failure', response.errorMessage);
            }
        });
    }

});


