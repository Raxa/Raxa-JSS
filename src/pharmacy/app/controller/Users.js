Ext.define('pharmacy.controller.Users', {
    extend: 'Ext.app.Controller',
    stores: ['Users'],
    models: ['User'],
    views: ['Viewport'],

init: function() {
        this.control({
            'adddrug button[action=addmod]': {
                click: this.updateUser
            }
        });
    },



    updateUser: function(button) {
//       var win    = button.up('window'),
//                       handler: function() {

        var form = button.up('form').getForm();  
        record = form.getRecord(),
        values = form.getValues(),
 //          }
    record.set(values);
           
  //  win.close();
    }
});