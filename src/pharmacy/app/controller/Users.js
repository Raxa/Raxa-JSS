Ext.define('pharmacy.controller.Users', {
    extend: 'Ext.app.Controller',
    stores: ['Users'],
    models: ['User'],
    views: [
        'Viewport'
    ],
    init: function() {
        this.control({
            'adddrug button[action=addmod]': {
                click: this.updateUser
            }
        });
    },

    updateUser: function(button) {
        console.log('clicked the Save button');
    }
});