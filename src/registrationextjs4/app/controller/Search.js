var t;
Ext.define('Registration.controller.Search', {
    extend: 'Ext.app.Controller',
    views: ['SearchPart1', 'Viewport', 'SearchConfirm'],
    stores: ['search'],
    models: ['searchPatient'],
    init: function () {
        this.control({
            "searchconfirm button[action = goToHomePage]": {
                click: this.goToHomePage
            },
            "viewport button[action = goToHomePage]": {
                click: this.goToHomePage
            },
            "searchpart1 #PatientIdentifierSearch": {
                keyup: this.onSearchKeyUp
            },
            "searchpart1 #patientFirstNameSearch": {
                keyup: this.onSearchKeyUp
            },
            "searchpart1 #patientLastNameSearch": {
                keyup: this.onSearchKeyUp
            },
            "searchpart1 button[action=cancel]": {
                click: this.cancel
            },
            "searchconfirm button[action=bmipage]":{
                click: this.gotoIllnessDetails
            }
        });
    },
    
    goToHomePage: function () {
        this.cancel();
    },
    
    onSearchKeyUp:function()
    {
        
        var that = this;
        var TimerFn = function(){
            t = setTimeout( function(){
                that.search()
            }, 1400 );
        }
        if ( t )
        {
            clearTimeout( t );
            TimerFn();
        }
        else
        {
            TimerFn();
        }
    },
    //function making the rest call to get the patient with given search quiry
    search: function () {
        
        Ext.getCmp('searchResults').show();
        if((Ext.getCmp('PatientIdentifierSearch').getValue() !== '') || (Ext.getCmp('patientFirstNameSearch').getValue() !== '') || (Ext.getCmp('patientLastNameSearch').getValue()!== '')){
            var myMask = new Ext.LoadMask(Ext.getCmp('patientGrid').el, {
                useMsg: 'Searching...'
            });
            myMask.show();
    
            var Url = HOST + '/ws/rest/v1/patient?q='; // Ext.getCmp('PatientIdentifierSearch').getValue() + "&&v=full";
            if (Ext.getCmp('PatientIdentifierSearch').getValue() !== '') 
            {
                Url = Url + Ext.getCmp('PatientIdentifierSearch').getValue() + "&";
            }
            else if ((Ext.getCmp('patientFirstNameSearch').getValue() !== '') || (Ext.getCmp('patientLastNameSearch').getValue()!== ''))            
            {
                Url = Url + Ext.getCmp('patientFirstNameSearch').getValue()+ ' ' + Ext.getCmp('patientLastNameSearch').getValue();
            }
            Url = Url + "&v=full";
            var store = Ext.create('Registration.store.search');
            // setting up the proxy here because url is not fixed
            var shouldCallAgain = 0;
            var temp = function(shouldCallAgain){
                if (shouldCallAgain++ < 2 ){
                    myMask.show();
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
                            myMask.hide();
                            if(success){
                                if((Ext.getCmp('PatientIdentifierSearch').getValue() !== '')&&((Ext.getCmp('patientFirstNameSearch').getValue() !== '') || (Ext.getCmp('patientLastNameSearch').getValue()!== ''))&&(Ext.getCmp('patientGrid').view.store.totalCount == 0)){
                                    Url = HOST + '/ws/rest/v1/patient?q='+ Ext.getCmp('patientFirstNameSearch').getValue()+ ' ' + Ext.getCmp('patientLastNameSearch').getValue()+'&v=full';
                                    temp(shouldCallAgain);    
                                }
                                Ext.getCmp('searchResults').show();
                                Ext.getCmp('patientGrid').view.refresh();
                            }
                            else{
                                Ext.Msg.alert("Error", Util.getMessageLoadError());
                            }
                        }
                    });
                    return store;
                }
            }
            temp(shouldCallAgain);
        }   
    },
    
    //cancels search, goes back to home page
    cancel: function(){
        Ext.getCmp('mainRegArea').getLayout().setActiveItem(REG_PAGES.HOME.value);
        this.reset();
    },

    //function which reset all the field in search patient form
    reset: function () {
        var fields = [
        'PatientIdentifierSearch',
        'patientFirstNameSearch',
        'patientLastNameSearch'
        ];

        for (var i=0; i < fields.length; i++)
        {
            Ext.getCmp(fields[i]).reset();
        }
        Ext.getCmp('patientGrid').view.store.removeAll();
        Ext.getCmp('patientGrid').view.refresh();
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
