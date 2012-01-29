//We can choose to write a totally custom phone Comments controller by extending Ext.app.Controller,
//or just extend Docs.controller.Comments to augment/override the standard behavior
Ext.define('Docs.controller.phone.Comments', {
    extend: 'Docs.controller.Comments',
    
    init: function() {
        this.callParent(arguments);
        
        //we couldn't just add routes above because it would wipe out the default
        //Comments controller routes
        this.addRoutes({
            'special/phone/route': this.doSpecialThing
        });
    }
});