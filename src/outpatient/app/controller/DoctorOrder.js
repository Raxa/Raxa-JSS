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

Ext.define('RaxaEmr.Outpatient.controller.DoctorOrder', {
    extend: 'Ext.app.Controller',
    config: {

listeners: {

TestEvent: function() {

	Ext.Msg.Alert('dfdfg');
	console.log('TestEvent Fired');

}
},
        refs: { // all the fields are accessed in the controller through the id of the components 

        },
        control: { //to perform action on specific component accessed through it's id above 

    },
    //this function starts on the load of the module
    init: function () {
	console.log('starting Doctor Order Controller');
       	this.fireEvent('TestEvent');
    }, 

}});
