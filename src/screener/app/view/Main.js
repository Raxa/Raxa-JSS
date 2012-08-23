/*
 * This class defines our main view with navigation.View
 * to allow for easy switching between screens, a back button, etc.
 */
Ext.define("Screener.view.Main", {
    extend: 'Ext.Container',
    requires: [
        'Screener.view.TopMenu',
        'Screener.view.LabOrderView',
        'Screener.view.PharmacyView',
        'Screener.view.PatientView',
        
        // Stores
        /*'Screener.store.AssignedPatientList',*/
        /*'Screener.store.Doctors',*/
        /*'Screener.store.drugConcept',*/
        /*'Screener.store.drugEncounter',*/
        /*'Screener.store.druglist',*/
        /*'Screener.store.encounterpost',*/
        /*'Screener.store.encounters',*/
        /*'Screener.store.IdentifierType',*/
        /*'Screener.store.Location',*/
        /*'Screener.store.NewPatients',*/
        /*'Screener.store.NewPersons',*/
        /*'Screener.store.PatientList',*/
        /*'Screener.store.Patients',*/
        /*'Screener.store.PatientSummary',*/
        /*'Screener.store.PostLists',*/
    ],
    xtype: 'mainView',
    id: "mainView",
    
    config: {
        layout: {
            type : 'card'
        },
    
        activeItem : 0,
        /*fullscreen: true,*/

        /*//don't delete views so we can switch screens quickly*/
        autoDestroy: false,

        /*items: [{*/
                /*title: "JSS Hospital Screener System",*/
                items: [{
                            xclass: 'Screener.view.TopMenu'
                        }, {
                            xclass: 'Screener.view.PatientView'
                        }, {
                            xclass: 'Screener.view.PharmacyView'
                        }, {
                            xclass: 'Screener.view.LabOrderView'
                    }]
                /*}]*/
                }
            
});
