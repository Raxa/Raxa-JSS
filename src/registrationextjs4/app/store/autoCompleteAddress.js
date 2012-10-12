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
 */

Ext.define('Registration.store.autoCompleteAddress', {
    extend: 'Ext.data.Store',
	requires: ['Registration.model.autoCompleteAddress'],
    config: {
        model:  'Registration.model.autoCompleteAddress',
       autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'data/address.json',
       reader: {
            type: 'json',
        }
        },
   //TO-DO: Export data in json: unable to make json reader work now.
        data: [
				['Balod','Chattisgarh'],
				['Baloda Bazar','Chattisgarh'],
				['Balrampur','Chattisgarh'],
				['Bastar','Chattisgarh'],
				['Bemetara','Chattisgarh'],
				['Bijapur','Chattisgarh'],
				['Bilaspur','Chattisgarh'],
				['Dantewada','Chattisgarh'],
				['Dhamtari','Chattisgarh'],
				['Durg','Chattisgarh'],
				['Gariaband','Chattisgarh'],
				['Jashpur','Chattisgarh'],
				['Janjgir-Champa','Chattisgarh'],
				['Kondagaon','Chattisgarh'],
				['Korba','Chattisgarh'],
				['Koriya','Chattisgarh'],
				['Kanker','Chattisgarh'],
				['Kawardha','Chattisgarh'],
				['Mahasamund','Chattisgarh'],
				['Mungeli','Chattisgarh'],
				['Narayanpur','Chattisgarh'],
				['Raigarh','Chattisgarh'],
				['Rajnandgaon','Chattisgarh'],
				['Raipur','Chattisgarh'],
				['Surajpur','Chattisgarh'],
				['Sukma','Chattisgarh'],
				['Surguja','Chattisgarh'],
				['Alirajpur','Madhya Pradesh'],
				['Anuppur','Madhya Pradesh'],
				['Ashok Nagar','Madhya Pradesh'],
				['Balaghat','Madhya Pradesh'],
				['Barwani','Madhya Pradesh'],
				['Betul','Madhya Pradesh'],
				['Bhind','Madhya Pradesh'],
				['Bhopal','Madhya Pradesh'],
				['Burhanpur','Madhya Pradesh'],
				['Chhatarpur','Madhya Pradesh'],
				['Chhindwara','Madhya Pradesh'],
				['Damoh','Madhya Pradesh'],
				['Datia','Madhya Pradesh'],
				['Dewas','Madhya Pradesh'],
				['Dhar','Madhya Pradesh'],
				['Dindori','Madhya Pradesh'],
				['Guna','Madhya Pradesh'],
				['Gwalior','Madhya Pradesh'],
				['Harda','Madhya Pradesh'],
				['Hoshangabad','Madhya Pradesh'],
				['Indore','Madhya Pradesh'],
				['Jabalpur','Madhya Pradesh'],
				['Jhabua','Madhya Pradesh'],
				['Katni','Madhya Pradesh'],
				['Khandwa (East Nimar)','Madhya Pradesh'],
				['Khargone (West Nimar)','Madhya Pradesh'],
				['Mandla','Madhya Pradesh'],
				['Mandsaur','Madhya Pradesh'],
				['Morena','Madhya Pradesh'],
				['Narsinghpur','Madhya Pradesh'],
				['Neemuch','Madhya Pradesh'],
				['Panna','Madhya Pradesh'],
				['Rewa','Madhya Pradesh'],
				['Rajgarh','Madhya Pradesh'],
				['Ratlam','Madhya Pradesh'],
				['Raisen','Madhya Pradesh'],
				['Sagar','Madhya Pradesh'],
				['Satna','Madhya Pradesh'],
				['Sehore','Madhya Pradesh'],
				['Seoni','Madhya Pradesh'],
				['Shahdol','Madhya Pradesh'],
				['Shajapur','Madhya Pradesh'],
				['Sheopur','Madhya Pradesh'],
				['Shivpuri','Madhya Pradesh'],
				['Sidhi','Madhya Pradesh'],
				['Singrauli','Madhya Pradesh'],
				['Tikamgarh','Madhya Pradesh'],
				['Ujjain','Madhya Pradesh'],
				['Umaria','Madhya Pradesh'],
				['Vidisha','Madhya Pradesh']
			]
			}
    
});
