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
 * This file is model for labconcepts (Test Specimens & Tests)
 */
Ext.define('Laboratory.model.Concept', {
    extend: 'Ext.data.Model',
      fields: [{
            name: 'Specimen',
            type: 'string',
//	    mapping: 'display',
        }, {
            name: 'Test',
            type: 'string',
	 	    mapping: 'display',
        }, {
            name: 'Result'
        }, {
            name: 'Units',
            type: 'string'
        }, {
            name: 'Flag',
            type: 'string'
        },{
	    	name: 'Uuid',
	  		type: 'string',
	    	mapping: 'uuid'	
	}],

});

