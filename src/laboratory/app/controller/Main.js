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
 *  This is the controller of Laboratory Module. All the functions should go here 
 */
Ext.define('Laboratory.controller.Main', {
    extend: 'Ext.app.Controller',
    id: 'Main',
    views: ['Viewport', 'Home', 'PaperEntry1', 'PaperEntry2', 'PaperEntry3', 'PaperEntry4','BatchApproval','QueueStatus'],

    init: function () {
        console.log('lab controller loaded');

    }

});
