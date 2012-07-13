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
Ext.Loader.setConfig({
    enabled: true
});
Ext.application({
    name: 'mUserStories',
    controllers: ['basic'],
    models: ['downModel', 'upPersonModel', 'names', 'addresses', 'upPatientModel', 'identifiers','encounterModel', 'resourceModel', 'visitModel'],
    stores: ['downStore', 'upPersonStore', 'location', 'identifiersType', 'upPatientStore','offlineStore','encounterStore','offlineRegisterStore', 'resourceStore', 'visitStore'],
    views: ['loginScreen', 'patientList', 'patientDetails', 'vcNotifications', 'vcScheduling','userToolbar','addOptions','addPatient','addReminder','addAppointment','notificationInbox','resources','resourceDetail','vcToolbar','okCancel', 'mapPanel'],
    launch: function () {
        Ext.create('mUserStories.view.loginScreen');
    }
});