/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 *
 * This class provides util methods and constants that are shared by the core, apps and modules
 */

// TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-382
// Move everything inside of Util so not in global scope. Then update
// references from other parts of application. E.g. page enums is a low hanging
// fruit to start with 

/* Phone Number Validation */
Ext.apply(Ext.form.VTypes, {
    phone: function (value, field) {
        return value.replace(/[ \-\(\)]/g, '').length == 10;
    },
    phoneText: 'Invalid, number must be 10 digits',
    phoneMask: /[ \d\-\(\)]/
});

// Set host. If host has been configured in localStorage, use that host.
// Otherwise, use the default host.
LAB_HOST= 'http://openmrs.gielow.me/openmrs-1.8.4';
LAB_USERNAME='Admin';
LAB_PASSWORD='Admin123';

var HOST;
var DEFAULT_HOST = 'http://test.raxa.org:8080/openmrs';
if (localStorage.getItem("host") === null) {
    HOST = DEFAULT_HOST; 
} else { 
    HOST = localStorage.getItem("host"); 
}

var username;
var password;
var timeoutLimit = 150000;
var hospitalName = 'JSS Hospital';
var resourceUuid = {
    "tablet": {
        "resource": "concept",
        "queryTerm": "tablet",
        "varName": "tablet",
        "displayName": "tablet"
    },
    "ointment": {
        "resource": "concept",
        "queryTerm": "ointment",
        "varName": "ointment",
        "displayName": "ointment"
    },
    "syrup": {
        "resource": "concept",
        "queryTerm": "syrup",
        "varName": "syrup",
        "displayName": "SYRUP"
    },
    "solutionForInjection": {
        "resource": "concept",
        "queryTerm": "solution for injection",
        "varName": "solutionForInjection",
        "displayName": "SOLUTION FOR INJECTION"
    },
    "height": {
        "resource": "concept",
        "queryTerm": "height",
        "varName": "height",
        "displayName": "HEIGHT (CM)"
    },
    "weight": {
        "resource": "concept",
        "queryTerm": "weight",
        "varName": "weight",
        "displayName": "WEIGHT (KG)"
    },
    "bmi": {
        "resource": "concept",
        "queryTerm": "bmi",
        "varName": "bmi",
        "displayName": "BODY MASS INDEX"
    },
    "regfee": {
        "resource": "concept",
        "queryTerm": "regfee",
        "varName": "regfee",
        "displayName": "Registration Fee"
    },
    "systolicbloodpressure": {
        "resource": "concept",
        "queryTerm": "SYSTOLIC BLOOD PRESSURE",
        "varName": "systolicbloodpressure",
        "displayName": "SYSTOLIC BLOOD PRESSURE"
    },
    "diastolicbloodpressure": {
        "resource": "concept",
        "queryTerm": "DIASTOLIC BLOOD PRESSURE",
        "varName": "diastolicbloodpressure",
        "displayName": "DIASTOLIC BLOOD PRESSURE"
    },
    "pulse": {
        "resource": "concept",
        "queryTerm": "pulse",
        "varName": "pulse",
        "displayName": "PULSE"
    },
    "respiratoryRate": {
        "resource": "concept",
        "queryTerm": "RESPIRATORY RATE",
        "varName": "respiratoryRate",
        "displayName": "RESPIRATORY RATE"
    },
    "temperature": {
        "resource": "concept",
        "queryTerm": "TEMPERATURE (C)",
        "varName": "temperature",
        "displayName": "TEMPERATURE (C)"
    },
    "bloodoxygensaturation": {
        "resource": "concept",
        "queryTerm": "BLOOD OXYGEN SATURATION",
        "varName": "bloodoxygensaturation",
        "displayName": "BLOOD OXYGEN SATURATION"
    },
    "basic": {
        "resource": "form",
        "queryTerm": "basic",
        "varName": "basic",
        "displayName": "Basic Form - This form contains only the common/core elements needed for most forms"
    },
    "reg": {
        "resource": "encountertype",
        "queryTerm": "reg",
        "varName": "reg",
        "displayName": "REGISTRATION - Registration encounter"
    },
    "screener": {
        "resource": "encountertype",
        "queryTerm": "screener",
        "varName": "screener",
        "displayName": "SCREENER - Screener encounter"
    },
    "screenervitals": {
        "resource": "encountertype",
        "queryTerm": "screenervitals",
        "varName": "screenervitals",
        "displayName": "SCREENERVITALS - Screener Vitals encounter"
    },
    "out": {
        "resource": "encountertype",
        "queryTerm": "out",
        "varName": "out",
        "displayName": "OUTPATIENT - Outpatient encounter"
    },
    "prescription": {
        "resource": "encountertype",
        "queryTerm": "prescription",
        "varName": "prescription",
        "displayName": "PRESCRIPTION - Prescription encounter"
    },
    "prescriptionfill": {
        "resource": "encountertype",
        "queryTerm": "prescriptionfill",
        "varName": "prescriptionfill",
        "displayName": "PRESCRIPTIONFILL - Prescriptionfill encounter"
    },
    "primaryrelative": {
        "resource": "personattributetype",
        "queryTerm": "primary relative",
        "varName": "primaryRelative",
        "displayName": "Primary Relative - Primary Relative"
    },
    "secondarycontact": {
        "resource": "personattributetype",
        "queryTerm": "secondary contact",
        "varName": "secondaryContact",
        "displayName": "Secondary Contact - Secondary Contact"
    },
    "primarycontact": {
        "resource": "personattributetype",
        "queryTerm": "primary contact",
        "varName": "primaryContact",
        "displayName": "Primary Contact - Primary Contact"
    },
    "contactbyphone": {
        "resource": "personattributetype",
        "queryTerm": "contact by phone",
        "varName": "contactByPhone",
        "displayName": "Contact By Phone - Whether to contact this patient by phone"
    },
    "district": {
        "resource": "personattributetype",
        "queryTerm": "district",
        "varName": "district",
        "displayName": "District - District"
    },
    "tehsil": {
        "resource": "personattributetype",
        "queryTerm": "tehsil",
        "varName": "tehsil",
        "displayName": "Tehsil - Tehsil"
    },
    "occupation": {
        "resource": "personattributetype",
        "queryTerm": "occupation",
        "varName": "occupation",
        "displayName": "Occupation - Occupation"
    },
    "education": {
        "resource": "personattributetype",
        "queryTerm": "education",
        "varName": "education",
        "displayName": "Education - Education"
    },
    "caste": {
        "resource": "personattributetype",
        "queryTerm": "caste",
        "varName": "caste",
        "displayName": "Caste - Caste"
    },
    "oldpatientidentificationnumber": {
        "resource": "personattributetype",
        "queryTerm": "old patient identification number",
        "varName": "oldPatientIdentificationNumber",
        "displayName": "Old Patient Identification Number - Old Patient Identification Number"
    }
};

// This is the name of the Patient Identifier Type that is being Auto-Generated by the IDGen Module.
// Put the Identifier Type Name in between the /.* and the .*/
var idPattern = /.*RaxaEMR Identification Number.*/;

//BMI WHO Constants
var WHO_BMI_VSUNDERWEIGHT = 15;
var WHO_BMI_SUNDERWEIGHT = 16;
var WHO_BMI_UNDERWEIGHT = 18.5;
var WHO_BMI_NORMAL = 25;
var WHO_BMI_OVERWEIGHT = 30;
var WHO_BMI_OBESE = 35;
var WHO_BMI_SOBESE = 40;

// BMI Custom Constants
var BMI_MAX = 60;
var BMI_HEIGHT_MAX = 300;
var BMI_HEIGHT_MIN = 0;
var BMI_WEIGHT_MAX = 800;
var BMI_WEIGHT_MIN = 0;

// Enum for Key Maps
var KEY = {
    ENTER: 13
};
var keyMap = {
};

// Enum for Registration Module Page Numbers
var REG_PAGES = {
    HOME: {
        value: 0,
        name: "home"
    },
    REG_1: {
        value: 1,
        name: "registrationpart1"
    },
    REG_CONFIRM: {
        value: 2,
        name: "registrationconfirm"
    },
    REG_BMI: {
        value: 3,
        name: "registrationbmi"
    },
    SEARCH_1: {
        value: 4,
        name: "searchpart1"
    },
    SEARCH_2: {
        value: 5,
        name: "searchpart2"
    },
    SEARCH_CONFIRM: {
        value: 6,
        name: "searchconfirm"
    }
};

var UITIME = 120000;
var ONEDAYMS = 86400000;
var diffinUTC_GMT = 5.5;
//number of hours for everything to be before now
//OpenMRS checks whether encounters are ahead of current time --
//if a system clock is ahead of OpenMRS clock, some things can't be posted
//therefore, we need to fudge our time a few mins behind
var TIME_BEFORE_NOW = 0.1;

// The Util class provids several methods that are shared by the core, apps and modules
var Util = {
    
    // Enum to capture pages in each app. E.g. Util.PAGES.SCREENER.PAGE_NAME
    PAGES: {},

    /*
     * Listener to workaround maxLength bug in HTML5 numberfield with Sencha
     * Number field fails to enforce maxLength, so must add JavaScript listener
     * http://stackoverflow.com/questions/9613743/maxlength-attribute-of-numberfield-in-sencha-touch
     */
    maxLengthListener: function(maxLength) {
        return {
            keyup: function(textfield, e, eOpts) {
                var value = textfield.getValue() + '';
                var length = value.length;

                var MAX_LENGTH = maxLength;
                if (length > MAX_LENGTH) {
                    textfield.setValue(value.substring(0, MAX_LENGTH));
                    return false;
                }
            }
        };
    },

    /**
     *Returns the value of time difference in UTC and GMT
     *@return diffinUTC_GMT
     */
    getUTCGMTdiff: function() {
        return diffinUTC_GMT;
    },
	
    /**
     *Returns the value of time for updating the patients waiting title and automatic refresh
     *@return UITIME 
     */
    getUiTime: function () {
        return UITIME;
    },
	
    /**
     *Returns how many days are left from now to date passed in
     */
    daysFromNow: function(futureDate) {
        var future = new Date(futureDate);
        var now = new Date();
        return Math.ceil((future.getTime()-now.getTime())/ONEDAYMS);
    },


    /**
     *Gets the current time
     */
    getCurrentTime: function(){
        return this.Datetime(new Date(), this.getUTCGMTdiff());
    },

    /**
     *Returns the value of TimeoutLimit for login timeout 
     *@return timeoutLimit for timeout in login 
     */
    Datetime: function (d, hours) {
        if (typeof hours == 'undefined') {
            hours = 0;
        }
        //subtracting time in case our clock is ahead of OpenMRS clock
        hours = hours+TIME_BEFORE_NOW;
        var MS_PER_MINUTE = 60000;
        var k = new Date(d - (60 * hours) * MS_PER_MINUTE);

        function pad(n) {
            return n < 10 ? '0' + n : n;
        }
        return k.getFullYear() + '-' + pad(k.getMonth() + 1) + '-' + pad(k.getDate()) + 'T' + pad(k.getHours()) + ':' + pad(k.getMinutes()) + ':' + pad(k.getSeconds()) + 'Z';
    },
    getTimeoutLimit: function () {
        return timeoutLimit;
    },

    getHospitalName: function () {
        return hospitalName;
    },

    /**
     * Returns all the headers required for Basic Authenticated REST calls
     * @return headers object that includes Authorization, Accept and Content-Type
     */
    getBasicAuthHeaders: function () {
        var headers = {
            "Authorization": localStorage.getItem("basicAuthHeader"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        return headers;
    },

    /**
     * Logout the current user. Ends the current session
     */
    logoutUser: function () {
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/session',
            withCredentials: true,
            useDefaultXhrHeader: false,
            method: 'DELETE'
        });
    },

    /**
     * Saves the Basic Authentication header to Localstorage
     * Verifies if username + password is valid on server and saves as Base4 encoded string of user:pass
     */
    saveBasicAuthHeader: function (username, password) {
        Util.logoutUser(); //Delete existing logged in sessions
        //Check login and save to localStorage if valid
        //We are using a synchronous XMLHttp Request instead of an Asynchronous AJAX request
        var xmlReq = new XMLHttpRequest();
        xmlReq.open("GET", HOST + '/ws/rest/v1/session', false);
        xmlReq.setRequestHeader("Accept", "application/json");
        xmlReq.setRequestHeader("Authorization", "Basic " + window.btoa(username + ":" + password));
        xmlReq.send();
        if (xmlReq.status == "200") {
            var authenticated = Ext.decode(xmlReq.responseText).authenticated;
            if (authenticated) {
                localStorage.setItem("basicAuthHeader", "Basic " + window.btoa(username + ":" + password));
            } else {
                localStorage.removeItem("basicAuthHeader");
            }
        }
    },

    /**
     * Returns all the modules in Raxa
     * @return [ 'login', 'screener', ....]
     */
    getModules: function () {
        //always keep login at first position as its app path is different
        //'registration' (sencha touch version) and 'chw' are removed from the list as they are not being used now
		return ['login', 'screener', 'registrationextjs4', 'outpatient', 'laboratory','pharmacy'];
    },

    getApps: function () {
        //always keep login at first position as its app path is different
        return ['gotStatins', 'problemList'];
    },
    /**
     *Generate six digit randomly generated Device Id  
     *Checks if any key with name "deviceId" is previously stored in localStorage, returns it if availaible
     *@return deviceId
     *
     */
    getDeviceId: function () {
        var deviceId;
        //Checks if localStorage already has deviceId stored in it        
        if (localStorage.getItem("deviceId") === null) {
            var randomNumber = [];
            for (var i = 0; i < 6; i++) {
                //generates random digit from 0 to 10
                randomNumber[i] = (Math.floor(Math.random() * 10));
            }
            deviceId = randomNumber.join('');
            localStorage.setItem("deviceId", deviceId);
            console.log('6-digit randomly generated Device Id: ' + deviceId + ' & is stored in localStorage');

        } else {
            // gets the value of deviceId if available in localStorage 
            deviceId = localStorage.getItem("deviceId");
            console.log('6-digit randomly generated Device Id that was stored in localStorage:' + deviceId);
        }
        return deviceId;
    },

    /**
     * gets the Patient Identifier generated by the IDGen Module
     * Note: The Identifier type must be the 3rd in the list (ie at position 2) for this to work properly.
     */
    getPatientIdentifier: function () {
        var generatedId = (Math.floor(Math.random()*1000000)).toString();
        url = HOST + '/ws/rest/v1/patient?q='+generatedId,
        xmlHttp = new XMLHttpRequest(); 
        xmlHttp.open( "GET", url , false );
        xmlHttp.setRequestHeader("Accept", "application/json");
        xmlHttp.setRequestHeader("Authorization", localStorage.getItem("basicAuthHeader"));
        xmlHttp.send();
        var jsonData = JSON.parse(xmlHttp.responseText);
        if (xmlHttp.status == "200") {
            if(jsonData.results.length > 0) {
                return(Util.getPatientIdentifier());
            } else {
                 return generatedId;
            }
        }
    },
    
  //  getX: function(){return 5},

    //Function to help share Models between ExtJS and Sencha Touch 2
    platformizeModelConfig: function (extJsModelConfig) {
        if (Ext.versions.extjs) {
            return extJsModelConfig; // nothing to change, we are on ext
        } else if (Ext.versions.touch) {
            // transform to Sencha Touch 2 data model
            var config = {
                extend: extJsModelConfig.extend,
                config: extJsModelConfig
            };
            delete config.config.extend;
            return config;
        } else {
            Ext.Error.raise('Could not recognize Library');
        }
    },

    getAttributeFromREST: function (resource, queryParameter, varName, display) {
        //Ajax Request to get Height / Weight / Bmi Attribiutes from Concept Resource
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/' + resource + '?q=' + queryParameter, //'/ws/rest/v1/concept?q=height',
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) {
                console.log('GET failed with response status: ' + response.status); // + response.status);
            },
            success: function (response) {
                console.log("getAttributeFromRest ... resource: " + resource + ", queryParameter: " + queryParameter + ", varName:" + varName + " RESPONSE: " + response.responseText);
                for (var i = 0; i < JSON.parse(response.responseText).results.length; ++i) {
                    if (JSON.parse(response.responseText).results[i].display == display) {
                        if (resource != 'location') {
                            localStorage.setItem(varName + "Uuid" + resource, JSON.parse(response.responseText).results[i].uuid)
                        } else {
                            localStorage.setItem(varName + "Uuid" + resource, display)
                        }
                    }
                }
            }
        });
    },

    getPersonUuidFromProviderUuid: function (uuid) {
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/provider/' + uuid,
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) {
                console.log('GET failed with response status: ' + response.status);
            },
            success: function (response) {
                if (console.log(JSON.parse(response.responseText).person.uuid) != null) {
                    return JSON.parse(response.responseText).person.uuid;
                } else {
                    // TODO: should throw an exception, not return the wrong string
                    // Ext.Error.raise('<Error Text>');
                    return "provider with given uuid does not exist";
                }
            }
        });
    },

    KeyMapButton: function(ComponentName,keyName)
    {
        if(keyMap.keyName!=null)
        {
            this.DestroyKeyMapButton(keyName);
        }
	  keyMap.keyName = Ext.create('Ext.util.KeyMap',Ext.getBody(), [
        {
            key: keyName,
            shift: false,
            ctrl: false,
	      fn:function(){
		var element = Ext.getCmp(ComponentName);
            element.fireEvent('click',element);

                }
            }
        ]);

    },

    DestroyKeyMapButton: function(keyName)
    {
        keyMap.keyName.destroy(true);
        keyMap.keyName=null;
    },
        
    getProviderUuidFromPersonUuid: function (uuid) {
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/provider?v=full',
            method: 'GET',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            failure: function (response) {
                console.log('GET failed with response status: ' + response.status);
            },
            success: function (response) {
                var allProviders = JSON.parse(response.responseText).results;
                for(i=0; i<allProviders.length; i++){
                    if(allProviders[i].person.uuid === uuid){
                        console.log("success");
                        localStorage.setItem("loggedInProvider", allProviders[i].uuid);
                        return allProviders[i].uuid;
                    }
                }
                return "provider with given uuid not found";
            }
        });
    },
    
    /**
     * Returns the uuid of the logged in provider
     */
    getLoggedInProviderUuid: function(){
        if(!localStorage.getItem("loggedInUser")){
            // TODO: should throw an exception, not return the wrong string
            // Ext.Error.raise('<Error Text>');
            return "provider is not logged in";
        }
        if(localStorage.getItem("loggedInProvider")){
            return localStorage.getItem("loggedInProvider");
        }
        this.getProviderUuidFromPersonUuid(localStorage.getItem("loggedInUser"));
        return "setting provider uuid now";
    },
    
    /**
     * Runs before each module. Checks whether user has the privilege to view a specific module
     * If not, redirects to login page.
     * If so, returns true.
     */
    checkModulePrivilege: function(module){
        var privileges = localStorage.getItem("privileges");
        if(privileges!== null && (privileges.indexOf('RaxaEmrView '+module)!==-1 || privileges.indexOf('all privileges')!==-1)){
            return true;
        }
        else{
            window.location = "../";
        }
    },

    /**
     * Sends an alert according to given parameters
     */
    sendAlert: function(alertParams){
        var alertParam = Ext.encode(alertParams);
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/raxacore/raxaalert',
            method: 'POST',
            disableCaching: false,
            headers: Util.getBasicAuthHeaders(),
            params: alertParam,
            failure: function (response) {
                console.log('POST alert failed with response status: ' + response.status);
            }
        });
    }
}
