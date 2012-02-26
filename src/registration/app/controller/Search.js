Ext.define('RaxaEmr.Registration.controller.Search', {
    extend: 'Ext.app.Controller',	
    launch: function(){
        console.log('Inside launch function - in registration controller');
        Ext.create('RaxaEmr.Registration.view.PatientSearchForm');
    }    
});
