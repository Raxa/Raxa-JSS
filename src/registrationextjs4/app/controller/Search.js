Ext.define('Registration.controller.Search', {
    extend: 'Ext.app.Controller',
    views: ['SearchPart1', 'SearchPart2', 'Viewport', 'SearchConfirm'],
    stores: ['search'],
    models: ['searchPatient'],
    init: function () {
        this.control({
            "searchpart1 button[action=search]": {
                click: this.search
            },
            "searchpart1 button[action=reset]": {
                click: this.reset
            },
            "searchpart2 button[action=viewDetails]": {
                click: this.viewDetails
            },
            "searchpart2 button[action=modifySearch]": {
                click: this.modifySearch
            },
            "searchconfirm button[action=bmipage]":{
                click: this.gotoBMIpage
            }
        })
    },
    //function making the rest call to get the patient with given search quiry
    search: function () {
        if (Ext.getCmp('patientFirstNameSearch').isValid() || Ext.getCmp('PatientIdentifierSearch').isValid()) {
            var Url = HOST + '/ws/rest/v1/patient?q='; // Ext.getCmp('PatientIdentifierSearch').getValue() + "&&v=full";
            if (Ext.getCmp('PatientIdentifierSearch').isValid()) Url = Url + Ext.getCmp('PatientIdentifierSearch').getValue() + "&"
            if (Ext.getCmp('patientFirstNameSearch').isValid()) Url = Url + Ext.getCmp('patientFirstNameSearch').getValue() + "&"
            if (Ext.getCmp('patientLastNameSearch').isValid()) Url = Url + Ext.getCmp('patientLastNameSearch').getValue() + "&"
            Url = Url + "&v=full";
            store = Ext.create('Registration.store.search');
            store.setProxy({
                type: 'rest',
                url: Url,
                headers: Util.getBasicAuthHeaders(),
                reader: {
                    type: 'json',
                    root: 'results'
                }
            })
            Ext.getCmp('patientGrid').view.store = store;
            store.load();
            store.on('datachanged', function () {
                var l = Ext.getCmp('mainRegArea').getLayout();
                l.setActiveItem(REG_PAGES.SEARCH_2.value); //Going to Search Part-2 Page (Result List)
                Ext.getCmp('patientGrid').view.refresh();
            }, this)
        }
    },

    //function which reset all the field in search patient form
    reset: function () {
        Ext.getCmp('OldPatientIdentifierSearch').reset()
        Ext.getCmp('PatientIdentifierSearch').reset()
        Ext.getCmp('patientFirstNameSearch').reset()
        Ext.getCmp('patientLastNameSearch').reset()
        Ext.getCmp('relativeFirstNameSearch').reset()
        Ext.getCmp('relativeLastSearch').reset()
        Ext.getCmp('DOBSearch').reset()
        Ext.getCmp('Town/Village/CitySearch').reset()
        Ext.getCmp('phoneNumberSearch').reset()
    },

    viewDetails: function () {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.SEARCH_CONFIRM.value); //Going to Search Confirm Screen
    },
    
    modifySearch: function () {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.SEARCH_1.value); //Going to Search Part-1 Screen
    },
    
    gotoBMIpage: function() {
        Ext.Ajax.request({
            url : HOST+'/ws/rest/v1/patient/'+localStorage.searchUuid,
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) { 
                console.log('GET failed with response status: '+ response.status); // + response.status);
            },
            success: function (response) {
                var string = JSON.parse(response.responseText).identifiers[0].display;
                Ext.getCmp('bmiPatientID').setValue(string.substring(string.indexOf('=')+2,string.length));
                var l = Ext.getCmp('mainRegArea').getLayout();
                l.setActiveItem(REG_PAGES.REG_BMI.value); 
            }
        });
    }
});