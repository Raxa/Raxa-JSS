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
 * This script is to generate a html page for printing of Patient basic details.
 */
Ext.define('Registration.controller.PrintCard', {
    extend: 'Ext.app.Controller',
    id: 'printCard',
    views: ['Viewport','RegistrationConfirm', 'RegistrationBMI', 'SearchConfirm'],

    init: function () {
        this.control({
            'registrationbmi button[action=printPatientCard]': {
                click: this.printPatientCard
            },
            "searchconfirm button[action=bmipage]": {
                click: this.storePatientDatafromSearchResult
            },
            "registrationconfirm button[action=submit]": {
                click: this.storePatientDatafromRegistration
            },


        })
    },

    /** This function stores the last selected patient in the localStorage, which will (from Search Result) 
     *  be used to get details while printing of Registration card
     */
    storePatientDatafromSearchResult: function () {
        var selectedPatient = {
            Name: Ext.getCmp('patientNameSearchedPatient').value,
            Age: Ext.getCmp('ageSearchedPatient').value,
            Gender: Ext.getCmp('sexSearchedPatient').value,
            Village: Ext.getCmp('townSearchedPatient').value,
            Tehsil: Ext.getCmp('tehsilSearchedPatient').value,
            OldPatientId: Ext.getCmp('oldPatientIdentifierSearchedPatient').value                
        };
        localStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
    },

    /** This function stores the last selected patient in the localStorage (from New Registration), which will   
     *  be used to get details while printing of Registration card
     */
    storePatientDatafromRegistration: function () {
    	
    	var NameInMultipleLang = Ext.getCmp('patientNameConfirm').text
    	if ( Ext.getCmp('patientNameHindiConfirm').text !==" ")
        {
            NameInMultipleLang = NameInMultipleLang + ' (' + Ext.getCmp('patientNameHindiConfirm').text + ')';
        }
    	
        var selectedPatient = {
            Name: NameInMultipleLang,
            Age: Ext.getCmp('ageConfirm').text,
            Gender: Ext.getCmp('sexConfirm').text,
            Village: Ext.getCmp('townConfirm').text,
            Tehsil: Ext.getCmp('tehsilConfirm').text,
            OldPatientId: Ext.getCmp('oldPatientIdentifierConfirm').text,            
        };
        localStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
    },

    /** This function adds the weight field and patient id (as it is not entered before final view)
     *  and also pops up Registration page on the screen which needs to be printed
     */
    printPatientCard: function () {
        //This is to check whether weight is entered or not (as it is a field on Registration Card)
            var selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
            selectedPatient.Weight = Ext.getCmp('weightIDkg').value;
            selectedPatient.Id = Ext.getCmp('bmiPatientID').value;
            localStorage.setItem('selectedPatient', JSON.stringify(selectedPatient));
            popupWindow = window.open('app/patientCard.html', 'popUpWindow', 'height=500,width=1100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
    }
});
