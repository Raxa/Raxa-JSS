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
 * This class provides util methods and constants that are shared by the core, apps and modules specific for ExtJS 4.1
 */

// Maximum age of Patient till which REST WS works is 119
MAX_AGE_OF_PATIENT = 119;

//Creates a xtype: dobdatefield (that links adds limit to
Ext.define('dobdatefield', {
    extend:'Ext.form.DateField',
    alias: 'widget.dobdatefield',
    maxValue: new Date(),
    minValue: new Date(new Date().setFullYear(new Date().getFullYear() - MAX_AGE_OF_PATIENT))
});

var UtilExtJs = {
	//generates error warning on textfield if phone number is not of 10 digit
	validatePhoneNumber: function (component) {
		var EXPECTED_LENGTH = 10;
		var cmp = Ext.getCmp(component);
		var val = cmp.value;
		if (val && val.length > 0)
		{
			if(isNaN(val)) {
				cmp.setActiveError('Contains text other than numbers');
			} else if (val.length != EXPECTED_LENGTH) {
				cmp.setActiveError('Expected length of ' + EXPECTED_LENGTH);
			}
		}
	}
};

// Sets neccessary text formatting like autoCapitalize function
function autoTextFormat(component) {
	// Sets first character in uppercase and rest in lowercase
	var string = component.value;
	if(string)
	{
		component.setValue(string.charAt(0).toUpperCase() + string.toLowerCase().substr(1));
	}
}

