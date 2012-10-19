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
            "searchpart1 button[action=cancel]": {
                click: this.cancel
            },
            "searchpart1 button[action=reset]": {
                click: this.reset
            },
            "searchpart2 button[action=modifySearch]": {
                click: this.modifySearch
            },
            "searchconfirm button[action=bmipage]":{
                click: this.gotoIllnessDetails
            }
        });
    },
    //function making the rest call to get the patient with given search quiry
    search: function () {
        if (Ext.getCmp('patientFirstNameSearch').isValid() || Ext.getCmp('PatientIdentifierSearch').isValid()) {
            
            Ext.getBody().mask('Searching...', 'x-mask-loading');
            
            // concatenating the identifier and patient name to make the url for get call
            var Url = HOST + '/ws/rest/v1/patient?q='; // Ext.getCmp('PatientIdentifierSearch').getValue() + "&&v=full";
            if (Ext.getCmp('PatientIdentifierSearch').isValid()) 
            {
                Url = Url + Ext.getCmp('PatientIdentifierSearch').getValue() + "&";
            }
            if (Ext.getCmp('patientFirstNameSearch').isValid()) 
            {
                Url = Url + Ext.getCmp('patientFirstNameSearch').getValue() + "&";
            }
            if (Ext.getCmp('patientLastNameSearch').isValid()) 
            {
                Url = Url + Ext.getCmp('patientLastNameSearch').getValue() + "&";
            }
            Url = Url + "&v=full";
            store = Ext.create('Registration.store.search');
            // setting up the proxy here because url is not fixed
            store.setProxy({
                type: 'rest',
                url: Url,
                headers: Util.getBasicAuthHeaders(),
                reader: {
                    type: 'json',
                    root: 'results'
                }
            });
            Ext.getCmp('patientGrid').view.store = store;
            store.load({
                scope: this,
                callback: function(records, operation, success){
                    Ext.getBody().unmask();
                    if(success){
                        var l = Ext.getCmp('mainRegArea').getLayout();
                        l.setActiveItem(REG_PAGES.SEARCH_2.value);
                        Ext.getCmp('patientGrid').view.refresh();
                    }
                    else{
                        Ext.Msg.alert("Error", Util.getMessageLoadError());
                    }
                }
            });
            return store;
        } else {
            alert("invalid fields");
        }
    },
    
    //cancels search, goes back to home page
    cancel: function(){
        Ext.getCmp('mainRegArea').getLayout().setActiveItem(REG_PAGES.HOME.value);
    },

    //function which reset all the field in search patient form
    reset: function () {
        var fields = [
        'OldPatientIdentifierSearch',
        'PatientIdentifierSearch',
        'patientFirstNameSearch',
        'patientLastNameSearch',
        'relativeFirstNameSearch',
        'relativeLastSearch',
        'DOBSearch',
        'Town/Village/CitySearch',
        'phoneNumberSearch',
        ];

        for (var i=0; i < fields.length; i++)
        {
            Ext.getCmp(fields[i]).reset();
        }
    },

    modifySearch: function () {
        var l = Ext.getCmp('mainRegArea').getLayout();
        l.setActiveItem(REG_PAGES.SEARCH_1.value); //Going to Search Part-1 Screen
    },
    
    gotoIllnessDetails: function() {
        Ext.Ajax.request({
            url : HOST+'/ws/rest/v1/patient/'+localStorage.searchUuid,
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) { 
                Ext.Msg.alert("Error", Util.getMessageLoadError());
            },
            success: function (response) {
                var string = JSON.parse(response.responseText).identifiers[0].display;
                Ext.getCmp('bmiPatientID').setValue(string.substring(string.indexOf('=')+2,string.length));
                Ext.getCmp('bmiPatientName').setValue(Ext.getCmp('patientNameSearchedPatient').getValue());
                var l = Ext.getCmp('mainRegArea').getLayout();
                l.setActiveItem(REG_PAGES.ILLNESS_DETAILS.value);
                localStorage.setItem('navigation', 'Searching Patient'); 
            }
        });
    }
});
