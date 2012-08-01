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
 * This script initiates the registration module
 */

// model of an encounter

Ext.define('Registration.model.encounterModel', {
    extend: 'Ext.data.Model',
    
    fields: ['encounterDatetime', 'patient', 'encounterType', 'location',
	{
        name: 'provider',
        model: 'Registration.model.providerModel'
    },
    {
        name: 'orders',
        model: 'Registration.model.orderModel'
    },
    {//includes the obs model so that it can be stored at each time
        name: 'obs',
        model: 'Registration.model.obsModel'
    },{
        name: 'id',
        persist: false
    }]
})