///**
// * This screen defines the main menu buttons for:
// * Add New Patient
// * Assign Patients to Doctors
// * Add Patient Vitals
// * Add Pharmacy order
// * Add Lab Order
// */
//Ext.define("Screener.view.TopMenu", {
 //   extend: 'Ext.Container',
  //  xtype: 'topmenu',
//    requires: ['Screener.view.PharmacyView', 'Screener.view.LabOrderView'],
//
////    config: {
////        layout: 'vbox',
////        /*centered: true,*/
////        items: [{
////            xtype: 'button',
////            id: 'addPatientButton',
////            text: 'Add New Patient',
////            ui: 'round',
////            height: 80,
////            width: 300
////        }, {
////            xtype: 'button',
////            id: 'showPatientsButton',
////            text: 'Assign Patients to Doctors',
////            ui: 'round',
////            height: 80,
////            width: 300
////        }, {
////            xtype: 'button',
////            id: 'showVitalsButton',
////            text: 'Add Patient Vitals',
////            ui: 'round',
////            height: 80,
////            width: 300
////        }, {
////            xtype: 'button',
////            id: 'showPharmacyButton',
////            text: 'Add Pharmacy Order',
////            ui: 'round',
////            height: 80,
////            width: 300
////        }, {
////            xtype: 'button',
////            id: 'showLabButton',
////            text: 'Add Lab Order',
////            ui: 'round',
////            height: 80,
////            width: 300
//////        }, {
//////            xtype: 'loadmask',
//////            message: 'Loading',
//////            id: 'loadMask'	
////        }]
////    }
//
//config: {
//        layout: {
//            type: 'hbox'
//        },
//        height: 490,
//        items: [
//            {
//            xtype: 'tabpanel',
//            border: '1 1 1 0',
//            margin: '0 10 10 0',
//            style: 'border:solid #aaaaaa;',
//            style: 'background-color: #0f0',
//            animation: 'flip',
//            flex: 1,
//            id: 'maintabs',
//            tabBar: {
//                docked: 'left',
//            },
//            items: [{
//              //      id: 'addPatientButton',
//                    xtype: 'patientView',
//               title : '<div style ="height:130px;-webkit-transform:rotate(270deg);-moz-transform:rotate(90deg);-o-transform: rotate(90deg);">OPD</div>',
//            }, {
//               id: 'showPharmacyButton',
//               xtype: 'pharmacylist',
//               title : '<div style ="height:135px;-webkit-transform:rotate(270deg);-moz-transform:rotate(90deg);-o-transform: rotate(90deg);">PHARMACY</div>', 
//            }, {
//                //id: 'showLabButton',
//               xtype: 'labOrder',
//                title : '<div style ="height:135px;-webkit-transform:rotate(270deg);-moz-transform:rotate(90deg);-o-transform: rotate(90deg);">LABORATORY</div>', 
//            }, {
//                title : '<div style ="height:135px;-webkit-transform:rotate(270deg);-moz-transform:rotate(90deg);-o-transform: rotate(90deg);">SURGERY</div>', 
//            },
//            {
//                title : '<div style ="height:135px;-webkit-transform:rotate(270deg);-moz-transform:rotate(90deg);-o-transform: rotate(90deg);">ULTRASOUND</div>', 
//            }
//        
//    ],
//        },
//          ]
//    }
//});
