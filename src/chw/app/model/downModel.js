/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

Ext.define('mUserStories.model.downModel',{
    extend:'Ext.data.Model',
    config:{
        identifier: 'uuid',
        fields:[{
            name:'givenName',
            mapping:'preferredName.givenName',
            type:'string'
        },{
            name:'familyName',
            mapping:'preferredName.familyName',
            type:'string'
        },{
            name:'gender',
            type:'string'
        },{
            name:'birthdate',
            type:'date'
        },{
            name:'cityVillage',
            type:'string',
            mapping:'preferredAddress.cityVillage'
        }]
    }
})