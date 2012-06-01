Ext.define('Topbar.controller.LogoutController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            UsernameLabelRef: '#UsernameLabelID'
        }
    },

    launch: function () {
        this.getUsernameLabelRef().setHtml(username);
    }

});