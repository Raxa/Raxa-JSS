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
// TODO: find a way to set the value in the program
// See src/app/view/Login.js
var HOST = 'http://174.129.222.130:8080/motech-platform-server/';
var MRSHOST = 'http://emrjss.jelastic.dogado.eu';
var PAGES = {
    loginScreen: 0,
    familyList: 1,
    diseaseList: 2,
    familyDetails: 3,
    patientDetails: 4,
    visitDetails: 5,
    inventoryList: 6,
    inventoryDetails: 7
}
var USER = new Object();
USER.name = '';
USER.type = 'CHW';
USER.uuid = '';
var CURR_DATE = new Date();
var CURR_LOC = {
    LAT : 0,
    LOG: 0
}
var LOCATION = "";
var CONNECTED = true;