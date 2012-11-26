// TODO: Unwind this spaghetti code. 
// Move controlling logic somewhere else, just fire events and listen to updates in view

// ///////////////////////////////////////////////////////////
// Connection: Kinetic to Sencha
//  - bridges via firing Ext events
///////////////////////////////////////////////////////////
// Allows us to throw Ext events, triggering Sencha code when tapping on Kinetic items
var SAVE_LOAD_MASK_MAX_WAIT_TIME = 2000;
Ext.define('KineticToSencha', {
	mixins: ['Ext.mixin.Observable'],
	id: 'k2s',
	config: {
		fullName: ''
	},
	constructor: function(config) {
		this.initConfig(config); // We need to initialize the config options when the class is instantiated
	},
	addMedication: function() {
		this.fireEvent('clickAddMedication');
	},
	clickDiagnosis: function() {
		this.fireEvent('clickOnDiagnosis');
	},
	saveLoadMask: function() {
		var mask = function() {
				console.log('mask off');
				Ext.getCmp('opdPatientDataEntry').setMasked(false)
			}

		console.log('mask on');
		Ext.getCmp('opdPatientDataEntry').setMasked({
			xtype: 'loadmask',
			message: 'Saving...',
			modal: true
		});

		setTimeout(mask, SAVE_LOAD_MASK_MAX_WAIT_TIME);
	},

	// Saves just "drawable" portion of canvas
	saveDrawableCanvas: function() {
		// Convert stage to image. From image, create KineticImage and crop to "drawable" portion
		stage.toImage({
			callback: function(i) {
				i.id = "PatientRecord";
				console.log(i);
				kineticImage = new Kinetic.Image({
					image: i,
					x: 0,
					y: 0,
					id: 'PatientRecord',
					crop: {
						x: DRAWABLE_X_MIN,
						y: DRAWABLE_Y_MIN,
						width: DRAWABLE_X_MAX - DRAWABLE_X_MIN,
						height: DRAWABLE_Y_MAX - DRAWABLE_Y_MIN
					}
				});

				// Create a temp layer and add the "screenshot" image. If it's not added to a layer,
				// or added to the stage, then Kinetic won't allow you to call toDataUrl() on it.
				var temp_layer = new Kinetic.Layer();
				temp_layer.add(kineticImage);
				stage.add(temp_layer);
				var dataUrl = kineticImage.toDataURL({
					callback: function(dataUrl) {
						console.log('callback for dataUrl');
					},
					mimeType: 'image/jpeg',
					quality: .3
				});

				// Delete temp layer
				temp_layer.remove();
				
				// Adds items to history store (list is visible in history view)
				var visitHistoryStore = Ext.getStore('visitHistoryStore');
				visitHistoryStore.add({
					title: 'Visit <x>',
					// date: today
					uuid: 'FAKE-UUID-PUSHED',
					// TODO: need to save/retrieve from OpenMRS
					diagnosisCount: 0,
					treatmentCount: 0,
					imgSrc: dataUrl,
					id: 'PatientRecord'
				});
			}
		});
	}
});

// TODO: take these out of global scope
var g_medication_list = [];
var g_diagnosis_list = [];
var order;
var obs;
var DoctorOrderStore;
var DoctorOrderModel;
var DiagnosisPrinted = 0;
var MedicationPrinted= 0;
var k2s = Ext.create('KineticToSencha', {

	// TODO: Move all of these functions to the define() statement for k2s, and you can call via
	//	k2s.method() instead of k2s.config.method()

	// <TODO: Add Comment describing>
	addOrder: function() {
		//set persist of order true as Doctor may not always have a order
		RaxaEmr.Outpatient.model.DoctorOrder.getFields().items[6].persist = true; //6th field in orders (sorted)
		// RaxaEmr.Outpatient.model.DoctorOrder.getFields().get('orders').setPersist(true); //6th field in orders (sorted)
		var drugPanel = Ext.getStore('drugpanel');

		lengthOfDrugOrder = Ext.getStore('drugpanel').getData().all.length;

		for(var i = 0; i < lengthOfDrugOrder; i++) {
			var drugPanel = Ext.getStore('drugpanel').getData().all[i].data;

			//Drug Orders here
			var OrderModel = Ext.create('RaxaEmr.Outpatient.model.drugOrder', {
				type: 'drugorder',
				patient: myRecord.data.uuid,
				concept: drugPanel.concept,
				drug: drugPanel.uuid,
				startDate: Util.Datetime(new Date(), Util.getUTCGMTdiff()),
				autoExpireDate: Util.Datetime(new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() + drugPanel.duration), Util.getUTCGMTdiff()),
				instructions:drugPanel.routeofadministration,
				quantity : drugPanel.duration,
				//TODO Figure out why dose is creating problem while sending
				//dose: drugPanel.frequency,

				//Pharmacy is using dose. Remove inconsistency
				frequency: drugPanel.frequency,
				orderer: localStorage.loggedInUser
			});
			DoctorOrderModel.data.orders.push(OrderModel.raw);
		} 
	},

	// <TODO: Add Comment describing>
	addObs: function() {
		//TODO set persit TRUE if first order 
		// RaxaEmr.Outpatient.model.DoctorOrder.getFields().items[5].persist= true; //5th field in obs (sorted)
		//TODO set persist FALSE if no item in list
		DoctorOrderModel.data.obs = [];
		lengthOfDiagnosis = Ext.getCmp('diagnosedList').getStore().data.length;
		for(var i = 0; i < lengthOfDiagnosis; i++) {
			console.log(Ext.getCmp('diagnosedList').getStore().data.all[i].data);
			var ObsModel = Ext.create('RaxaEmr.Outpatient.model.DoctorOrderObservation', {
				obsDatetime: Util.Datetime(new Date(), Util.getUTCGMTdiff()),
				person: myRecord.data.uuid,
				//need to set selected patient uuid in localStuiorage
				concept: Ext.getCmp('diagnosedList').getStore().data.all[i].data.id,
				//      value: Ext.getCmp('diagnosedList').getStore().data.all[i].data.complain
			});
			DoctorOrderModel.data.obs.push(ObsModel.raw);
			console.log(ObsModel);
		}
		console.log(DoctorOrderModel);
	},

	// <TODO: Add Comment describing>
	addDoctorRecordImage: function() {
		// TODO UNABLE TO access ControlsLayer here
		// children till 7 are already there and rest goes into 
		// console.log(controlsLayer.children[8].attrs.image.src)
		// DoctorOrderModel.data.obs = [];
		//    (document.getElementById('id-of-doctor-form').src)
		//TODO check all objects of canvas which are saved and then push it as obs 
		// OR store an array of image which can be sent
		//set Image in obs json
		console.log('checking patient records in stage and copying to DoctorOrder store');

		var PatientRecordHistory = Ext.getStore('visitHistoryStore').getData();

		for(var j = 0; j < Ext.getStore('visitHistoryStore').getData().all.length; j++) //j is always 4, but not now.
		{
			if(PatientRecordHistory.all[j].data.id == "PatientRecord") {
				//    if( PatientRecordHistory.all[j].imgSrc.length < 65000){   
				var ObsModel = Ext.create('RaxaEmr.Outpatient.model.DoctorOrderObservation', {
					obsDatetime: Util.Datetime(new Date(), Util.getUTCGMTdiff()),
					person: myRecord.data.uuid,
					//need to set selected patient uuid in localStorage
					concept: localStorage.patientRecordImageUuidconcept,
					value: PatientRecordHistory.all[j].data.imgSrc
				});
				DoctorOrderModel.data.obs.push(ObsModel.raw);
				//  }
				//    else {
				//    Ext.Msg.alert('Error','Can\'t save data on server');
				//    }
			}
		}
		console.log(Ext.getStore('DoctorOrder'));
	},
	//Sending Stage JSON so that high quality doctor records can be generated again
	addDoctorRecordVectorImage: function() {

				var ObsModel = Ext.create('RaxaEmr.Outpatient.model.DoctorOrderObservation', {
					obsDatetime: Util.Datetime(new Date(), Util.getUTCGMTdiff()),
					person: myRecord.data.uuid,
					//need to set selected patient uuid in localStorage
					concept: localStorage.patientRecordVectorImageUuidconcept,
					value: stage.toJSON()
				});
				DoctorOrderModel.data.obs.push(ObsModel.raw);
	},

	// <Comment describing>
	sendDoctorOrderEncounter: function() {
		this.addObs();
		this.addDoctorRecordImage();
		this.addDoctorRecordVectorImage();
		this.addOrder();    
		  
		console.log(DoctorOrderStore);
		DoctorOrderModel.data.patient = myRecord.data.uuid;
		console.log(Ext.getStore('DoctorOrder'));
		DoctorOrderStore.add(DoctorOrderModel);
		console.log(DoctorOrderStore);
		//makes the post call for creating the patient
		DoctorOrderStore.sync({
			success: function(response, records) {
				console.log(arguments);
			},
			failure: function(response, records) {
				console.log(arguments);
			}
		});
	},

	// <Comment describing>
	initStore: function() {
		DoctorOrderStore = Ext.create('RaxaEmr.Outpatient.store.DoctorOrder');
		DoctorOrderModel = Ext.create('RaxaEmr.Outpatient.model.DoctorOrder', {
			//uuid:      //need to get myRecord variable of patientlist accessible here, so made it global variable
			//may need to set it later if new patient is created using DoctorOrder view (currently view/patient/draw.js)
			//other way is to create method in Controller which returns myRecord.data.uuid
			encounterType: localStorage.outUuidencountertype,
			// TODO figure out if should be prescription fill ?
			encounterDatetime: Util.Datetime(new Date(), Util.getUTCGMTdiff()),
			//Should encounterDatetime be time encounter starts or ends?
			provider: localStorage.loggedInUser
		});

		DoctorOrderModel.data.obs = [];
		DoctorOrderModel.data.orders = [];
	},

	listeners: {
		clickAddMedication: function() { // This function will be called when the 'quit' event is fired
			// By default, "this" will be the object that fired the event.
			console.log("k2s: clickAddMedication");
			var displayText = [];
			var store = Ext.getStore('drugpanel');
			var data = store.getData();
			var itemCount = data.getCount();

			for(var i = MedicationPrinted,index=0; i < itemCount; i++,index++) {
				var itemData = data.getAt(i).getData();

				// TODO: Consolidate following code into loop
				if(!itemData.drugname) {
					// If no drug name, skip to next loop iteration
					continue;
				} else {
					displayText[index] = (itemData.drugname);
				}

				var strength = itemData.strength;
				if(strength) {
					displayText[index] += (' ' +strength + 'mg ');
				}

				var frequency = itemData.frequency;
				if(frequency) {
					displayText[index] += (' ' + frequency);
				}

				var instruction = itemData.instruction;
				if(instruction) {
					displayText[index] += (' ' + instruction);
				}

				var quantity = itemData.duration;
				if(quantity) {
					displayText[index] += (' ' + quantity + ' days');
				}
				console.log(displayText)
				// return itemData.drugname || "";
				MedicationPrinted++;
			}
			console.log('display...', displayText);

			// TODO: Trigger refresh of Kinetic UI ... drug list should be updated
			g_medication_list = displayText;

			//TODO UI Designers want prev Diagnosis to be showed (with different color    
			// store.clearData(); // Prevents repeating.. now just need to create multiple prescription text boxes
			Ext.getCmp('drugForm').setHidden(false);
			Ext.getCmp('drugaddform').reset();
			// Ext.getCmp('treatment-panel').setActiveItem(0);
		},

		clickOnDiagnosis: function() { // This function will be called when the 'quit' event is fired
			console.log("k2s: clickOnDiagnosis");
			// Print store. I'll have to pull info from this to print in Canvas
			var displayText = [];
			var store = Ext.getStore('diagnosedDisease');
			var data = store.getData();
			var itemCount = data.getCount();
			console.log('itemcount= '+itemCount); console.log('Diagnosis Printed='+DiagnosisPrinted);
			

			for(var i = DiagnosisPrinted, index=0; i < itemCount; i++, index++) {
				var itemData = data.getAt(i).getData(); console.log(itemData);
				console.log('index='+index+ ' i= '+i);
				displayText[index] = (itemData.complain);
				DiagnosisPrinted++;
			}
			console.log('display...', displayText);
			g_diagnosis_list = displayText;
			// TODO: Trigger refresh of Kinetic UI ... drug list should be updated
			Ext.getCmp('diagnosis-panel').setHidden(false);
			//      Ext.getCmp('drugaddform').reset();
			//      Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.ADD);
		}
	}
});


///////////////////////////////////////////////////////////
// Kinetic JS, drawing Canvas
///////////////////////////////////////////////////////////
imageCount = 0;

var DRAWABLE_X_MIN = 60;
var DRAWABLE_X_MAX = 700; // 708 - strict border
var DIFF = 144; // moving whole thing up a bit ... 1024 - 880 = 144
var DRAWABLE_Y_MIN = 200 - DIFF; // 230 - strict border 
var DRAWABLE_Y_MAX = 1024;
var DEFAULT_MODE = "draw"; // undefined
var STAGE_X = 768; //768
var STAGE_Y = 1024; //1024
var HISTORY_BASE_X = DRAWABLE_X_MAX;
var HISTORY_BASE_Y = DRAWABLE_Y_MIN + 196;
var HISTORY_ITEM_DIM = 64;

var CONTROL_BASE_X = 2;
var CONTROL_BASE_Y = 2;
var CONTROL_ITEM_SPACING = 3;
var CONTROL_ITEM_DIM = 50;
var TOOLBAR_ITEM_DIM = 40;
var TOOLBAR_ITEM_BASE_X = 6;
var TOOLBAR_ITEM_BASE_Y = 6;
var HIGH_Y_OFFSET = 5; // a little extra space

function isInDrawableArea(myX, myY) {
	up = {
		x: myX,
		y: myY
	};

	if((DRAWABLE_X_MIN <= up.x && up.x <= DRAWABLE_X_MAX) && (DRAWABLE_Y_MIN <= up.y && up.y <= DRAWABLE_Y_MAX)) {
		return true;
	} else {
		// console.log("not in drawable area: ", up.x, up.y );  
		return false;
	}
}

// TODO: Remove if unneeded
var stage = new Object;

var setupCanvas = function() {

	var lowY = DRAWABLE_Y_MIN;
	var highY = DRAWABLE_Y_MIN + 10;

	var newLine;
	var newLinePoints = [];
	var prevPos;
	var mode = DEFAULT_MODE;

	var historyYOffset = HISTORY_BASE_Y;

	var backgroundLayer = new Kinetic.Layer({id:'backgroundLayer'});
	var loadedImageLayer = new Kinetic.Layer({id:'loadedImageLayer'}); // For re-loaded thumbs
	var linesLayer = new Kinetic.Layer({id:'linesLayer'});
	var textLayer = new Kinetic.Layer({id:'textLayer'});
	var controlsLayer = new Kinetic.Layer({id:'controlsLayer'});

	// Recreates stage saved in JSON : if there is '/n' in the code, we need to handle the case  
		//var json = '{"attrs":{"width":768,"height":1024,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"id":"stage"},"nodeType":"Stage","children":[{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"width":768,"height":1024,"cornerRadius":0,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"fill":"white"},"nodeType":"Shape","shapeType":"Rect"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":768,"height":880},"nodeType":"Shape","shapeType":"Image"}]},{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"points":[{"x":36,"y":198.5833282470703},{"x":45,"y":199.5833282470703},{"x":56,"y":200.5833282470703},{"x":76,"y":201.5833282470703},{"x":101,"y":204.5833282470703},{"x":135,"y":208.5833282470703},{"x":172,"y":212.5833282470703},{"x":211,"y":215.5833282470703},{"x":252,"y":217.5833282470703},{"x":293,"y":217.5833282470703},{"x":337,"y":213.5833282470703},{"x":383,"y":209.5833282470703},{"x":429,"y":204.5833282470703},{"x":469,"y":198.5833282470703},{"x":500,"y":193.5833282470703},{"x":521,"y":190.5833282470703},{"x":532,"y":188.5833282470703},{"x":540,"y":186.5833282470703},{"x":542,"y":185.5833282470703},{"x":542,"y":185.5833282470703},{"x":542,"y":185.5833282470703},{"x":541,"y":184.5833282470703},{"x":540,"y":184.5833282470703},{"x":540,"y":183.5833282470703},{"x":539,"y":183.5833282470703},{"x":539,"y":183.5833282470703},{"x":539,"y":183.5833282470703},{"x":539,"y":183.5833282470703},{"x":539,"y":183.5833282470703},{"x":538,"y":183.5833282470703}],"lineCap":"butt","dashArray":[],"detectionType":"pixel","visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"stroke":"red"},"nodeType":"Shape","shapeType":"Line"}]},{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Layer","children":[]},{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Layer","children":[]},{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"width":64,"height":64,"cornerRadius":0,"visible":true,"listening":true,"opacity":1,"x":700,"y":292,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"fill":"green","stroke":"black","strokeWidth":4},"nodeType":"Shape","shapeType":"Rect"},{"attrs":{"fontFamily":"ComicSans","text":"new","fontSize":21.333333333333332,"align":"left","verticalAlign":"top","fontStyle":"normal","padding":0,"width":"auto","height":"auto","detectionType":"path","cornerRadius":0,"lineHeight":1.2,"visible":true,"listening":true,"opacity":1,"x":708,"y":313.3333333333333,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"textFill":"white"},"nodeType":"Shape","shapeType":"Text"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":708,"y":90,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":52,"height":52,"stroke":"black","strokeWidth":1},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":708,"y":145,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":52,"height":52,"stroke":"black","strokeWidth":1},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":200,"y":56,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":128,"height":30,"stroke":"black","strokeWidth":1},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":708,"y":200,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":52,"height":52,"stroke":"black","strokeWidth":1},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":350,"y":56,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":150,"height":30,"stroke":"black","strokeWidth":1},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":700,"y":388,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":64,"height":64,"stroke":"black","strokeWidth":4,"id":"PatientRecord"},"nodeType":"Shape","shapeType":"Image"}]}]}';
	// create node using json string
//	var json = '{"attrs":{"width":768,"height":1024,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"id":"stage"},"nodeType":"Stage","children":[{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"width":768,"height":1024,"cornerRadius":0,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"fill":"white"},"nodeType":"Shape","shapeType":"Rect"},{"attrs":{"width":161,"height":52,"cornerRadius":0,"visible":true,"listening":true,"opacity":1,"x":2,"y":2,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"fill":"#2c7cb9"},"nodeType":"Shape","shapeType":"Rect"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":0,"y":56,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":709,"height":835},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":732,"y":56,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":36,"height":835},"nodeType":"Shape","shapeType":"Image"}]},{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"id":"lines"},"nodeType":"Layer","children":[{"attrs":{"points":[{"x":135,"y":168.25758361816406},{"x":136,"y":168.25758361816406},{"x":137,"y":167.25758361816406},{"x":139,"y":167.25758361816406},{"x":140,"y":166.25758361816406},{"x":149,"y":163.25758361816406},{"x":159,"y":160.25758361816406},{"x":173,"y":154.25758361816406},{"x":223,"y":137.25758361816406},{"x":250,"y":130.25758361816406},{"x":297,"y":120.25758361816406},{"x":309,"y":120.25758361816406},{"x":323,"y":120.25758361816406},{"x":361,"y":120.25758361816406},{"x":374,"y":122.25758361816406},{"x":394,"y":130.25758361816406},{"x":399,"y":137.25758361816406},{"x":402,"y":144.25758361816406},{"x":403,"y":176.25758361816406},{"x":399,"y":203.25758361816406},{"x":394,"y":231.25758361816406}],"lineCap":"butt","dashArray":[],"detectionType":"pixel","visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"stroke":"red"},"nodeType":"Shape","shapeType":"Line"},{"attrs":{"points":[{"x":367,"y":340.25758361816406},{"x":368,"y":340.25758361816406},{"x":374,"y":340.25758361816406},{"x":395,"y":340.25758361816406},{"x":419,"y":336.25758361816406},{"x":456,"y":329.25758361816406},{"x":538,"y":306.25758361816406},{"x":581,"y":293.25758361816406},{"x":650,"y":270.25758361816406},{"x":690,"y":255.25758361816406},{"x":695,"y":248.25758361816406},{"x":687,"y":250.25758361816406},{"x":670,"y":257.25758361816406},{"x":661,"y":260.25758361816406},{"x":650,"y":262.25758361816406},{"x":632,"y":269.25758361816406},{"x":623,"y":271.25758361816406},{"x":585,"y":281.25758361816406},{"x":576,"y":283.25758361816406},{"x":567,"y":286.25758361816406},{"x":549,"y":290.25758361816406},{"x":539,"y":292.25758361816406},{"x":529,"y":293.25758361816406},{"x":509,"y":296.25758361816406},{"x":500,"y":297.25758361816406},{"x":491,"y":297.25758361816406},{"x":478,"y":298.25758361816406},{"x":471,"y":298.25758361816406},{"x":466,"y":297.25758361816406},{"x":455,"y":296.25758361816406},{"x":450,"y":296.25758361816406},{"x":447,"y":295.25758361816406},{"x":438,"y":292.25758361816406},{"x":433,"y":291.25758361816406},{"x":429,"y":290.25758361816406},{"x":422,"y":286.25758361816406},{"x":419,"y":284.25758361816406},{"x":415,"y":281.25758361816406},{"x":408,"y":276.25758361816406},{"x":404,"y":274.25758361816406},{"x":397,"y":269.25758361816406},{"x":393,"y":265.25758361816406},{"x":389,"y":261.25758361816406},{"x":380,"y":255.25758361816406},{"x":376,"y":251.25758361816406},{"x":372,"y":248.25758361816406},{"x":365,"y":241.25758361816406},{"x":361,"y":238.25758361816406},{"x":358,"y":234.25758361816406},{"x":350,"y":227.25758361816406},{"x":347,"y":223.25758361816406},{"x":343,"y":219.25758361816406},{"x":337,"y":211.25758361816406},{"x":333,"y":207.25758361816406},{"x":330,"y":203.25758361816406},{"x":327,"y":197.25758361816406},{"x":325,"y":195.25758361816406},{"x":324,"y":193.25758361816406},{"x":323,"y":191.25758361816406},{"x":323,"y":190.25758361816406},{"x":323,"y":190.25758361816406},{"x":324,"y":190.25758361816406},{"x":324,"y":190.25758361816406},{"x":324,"y":189.25758361816406},{"x":324,"y":189.25758361816406},{"x":324,"y":190.25758361816406},{"x":325,"y":190.25758361816406},{"x":326,"y":193.25758361816406},{"x":328,"y":196.25758361816406},{"x":329,"y":199.25758361816406},{"x":330,"y":203.25758361816406},{"x":331,"y":205.25758361816406},{"x":332,"y":206.25758361816406},{"x":331,"y":208.25758361816406}],"lineCap":"butt","dashArray":[],"detectionType":"pixel","visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"stroke":"red"},"nodeType":"Shape","shapeType":"Line"}]},{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"id":"text"},"nodeType":"Layer","children":[{"attrs":{"fontFamily":"Calibri","text":"Diagnoses: * Fever\\n","fontSize":14,"align":"left","verticalAlign":"top","fontStyle":"italic","padding":10,"width":"auto","height":"auto","detectionType":"path","cornerRadius":10,"lineHeight":1.2,"visible":true,"listening":true,"opacity":1,"x":80,"y":345.25758361816406,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"stroke":"#555","strokeWidth":3,"fill":"#f44","textFill":"#000","shadow":{"color":"black","blur":1,"offset":{"x":10,"y":10},"opacity":0.2}},"nodeType":"Shape","shapeType":"Text"},{"attrs":{"fontFamily":"Calibri","text":"Medications: * Paracetamol  60ml - 43 - 100 - 43 - Once Daily - After Meals\\n","fontSize":14,"align":"left","verticalAlign":"top","fontStyle":"italic","padding":10,"width":"auto","height":"auto","detectionType":"path","cornerRadius":10,"lineHeight":1.2,"visible":true,"listening":true,"opacity":1,"x":80,"y":404.25758361816406,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"stroke":"#555","strokeWidth":3,"fill":"#44f","textFill":"#000","shadow":{"color":"black","blur":1,"offset":{"x":10,"y":10},"opacity":0.2}},"nodeType":"Shape","shapeType":"Text"}]},{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Layer","children":[]},{"attrs":{"clearBeforeDraw":true,"visible":true,"listening":true,"opacity":1,"x":0,"y":0,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false},"nodeType":"Layer","children":[{"attrs":{"visible":true,"listening":true,"opacity":1,"x":2,"y":2,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":50,"height":50},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":55,"y":2,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":50,"height":50},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":108,"y":2,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":50,"height":50},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":609,"y":2,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":50,"height":50},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":662,"y":2,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":50,"height":50},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":7,"y":161,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":50,"height":49},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":7,"y":214,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":50,"height":49},"nodeType":"Shape","shapeType":"Image"},{"attrs":{"visible":true,"listening":true,"opacity":1,"x":7,"y":267,"scale":{"x":1,"y":1},"rotation":0,"offset":{"x":0,"y":0},"draggable":false,"width":50,"height":49},"nodeType":"Shape","shapeType":"Image"}]}]}';
//	var stage = Kinetic.Node.create(json, 'container');


	// Setup stage, upon which all layers are built.
	stage = new Kinetic.Stage({
		id: "stage",
		container: "container",
		width: STAGE_X,
		height: STAGE_Y
	});

	// Layers
	stage.add(backgroundLayer);
	stage.add(linesLayer);
	stage.add(textLayer); // in front of "draw" layer, i.e. cant draw on a diagnosis. for now.
	stage.add(loadedImageLayer);
	stage.add(controlsLayer);
	moving = false;

	////////////////////////
	// Event Listeners 
	////////////////////////
	stage.on("mousedown touchstart", function() {
		dragStart();
	});
	stage.on('mousemove touchmove', function() {
		dragMove();
	});
	stage.on("mouseup", function() {
		dragComplete();
	});
	stage.on("touchend", function() {
		dragComplete();
	});
	stage.on("paintDiagnosis", function() {
		console.log('printing Diagnosis');
		console.log(g_diagnosis_list);
		k2s.fireEvent('clickOnDiagnosis');
		Ext.getCmp('diagnosis-panel').setHidden(true);
		drawDiagnosis(g_diagnosis_list);
	});
	stage.on("paintMedication", function() {
		//To be refactored
		console.log('printing Drug Order');
		console.log(g_medication_list);
		k2s.fireEvent('clickAddMedication');
		Ext.getCmp('drugForm').setHidden(true);
		drawDiagnosis(g_medication_list);
	});

	////////////////////////
	// Event Handlers
	////////////////////////
	
	// First touch or click starts a drag event
	function dragStart() {
		var up = stage.getUserPosition();
		if(!up || !isInDrawableArea(up.x, up.y) || mode !== 'draw') {
			return;
		}

		if(moving) {
			moving = false;
			backgroundLayer.draw();
		} else {
			newLinePoints = [];
			prevPos = stage.getUserPosition(); // Mouse or touch
			newLinePoints.push(prevPos);
			newLine = new Kinetic.Line({
				points: newLinePoints,
				stroke: "red",
			});
			linesLayer.add(newLine);

			moving = true;
		}
	}

	// While user holding down the mouse clicker or touch, continue dragging
	function dragMove() {
		var up = stage.getUserPosition();
		if(!up || !isInDrawableArea(up.x, up.y) || mode !== 'draw') {
			return;
		}

		if(moving) {
			var mousePos = stage.getUserPosition(); // Mouse or touch
			var x = mousePos.x;
			var y = mousePos.y;
			newLinePoints.push(mousePos);
			updateBounds(mousePos);
			prevPos = mousePos;

			moving = true;
			linesLayer.drawScene();
		}
	}

	// On release of mouse or touch, done dragging
	function dragComplete() {
		var up = stage.getUserPosition();
		if(!up || !isInDrawableArea(up.x, up.y) || mode !== 'draw') {
			return;
		}

		moving = false;
	}

	// Keep track of the current low and high bounds (y-axis) for where a user
	// has already added content onto the canvas. The idea is that we want to add
	// structured data (diagnoses, prescriptions, ...) into blank areas on the 
	// canvas where the user hasn't yet written.
	function updateBounds(mousePos) {
		var y = mousePos.y;
		if(y < lowY || lowY == undefined) {
			lowY = y;
		}
		if(y > highY || highY == undefined) {
			highY = y + HIGH_Y_OFFSET;
		}
	}

	// SAVING 
	// Save - event handler
	function onSaveCanvas() {
		// Callback, since the stage toDataURL() method is asynchronous, 
		k2s.saveLoadMask();
		k2s.saveDrawableCanvas();
	}

	////////////////////////////////////////////////
	// Initialize
	//  - Draw background
	//  - Add Controls... Pencil, eraser, save
	////////////////////////////////////////////////
	
	// Background - blank white canvas
	background = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: stage.getWidth(),
		height: stage.getHeight(),
		fill: "white"
	});
	backgroundLayer.add(background);

	// Background - toolbar background
	toolbarBackground = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: stage.getWidth(),
		height: DRAWABLE_Y_MIN - 4,
		fill: "#82b0e1"	// Light Blue.
	});
	backgroundLayer.add(toolbarBackground);

	addImageToLayer("resources/images/paper_left.jpg", backgroundLayer, {
		x: 0,
		y: DRAWABLE_Y_MIN,
		width: 709,
		height: 835
	});
	
	addImageToLayer("resources/images/history_right.jpg", backgroundLayer, {
		x: stage.getWidth() - 36,
		y: DRAWABLE_Y_MIN,
		width: 36,
		height: 835
	});

	var controlItems = [{
		// Pencil (Draw mode)
		image: 'resources/images/icons/pen_on.png',
		x: TOOLBAR_ITEM_BASE_X,
		y: TOOLBAR_ITEM_BASE_Y,
		width: TOOLBAR_ITEM_DIM,
		height: TOOLBAR_ITEM_DIM,
		handler: function() {
			console.log('mode = draw');
			mode = "draw";
		}
	}, {
		// Eraser (Erase mode)
		image: 'resources/images/icons/eraser_off.png',
		x: TOOLBAR_ITEM_BASE_X + 1 * (TOOLBAR_ITEM_DIM),
		y: TOOLBAR_ITEM_BASE_Y,
		width: TOOLBAR_ITEM_DIM,
		height: TOOLBAR_ITEM_DIM,
		handler: function() {
			console.log('ERASER: TODO');
			// mode = "erase";
		}
	}, {
		// Keyboard (typed text input)
		image: 'resources/images/icons/text_off.png',
		x: TOOLBAR_ITEM_BASE_X + 2 * (TOOLBAR_ITEM_DIM),
		y: TOOLBAR_ITEM_BASE_Y,
		width: TOOLBAR_ITEM_DIM,
		height: TOOLBAR_ITEM_DIM,
		handler: function() {
			console.log('KEYBOARD: TODO');
			// mode = "keyboard";
		}
	}, {
		// Save
		image: 'resources/images/save.png',
		x: stage.getWidth() - 3 * (CONTROL_ITEM_SPACING + CONTROL_ITEM_DIM),
		y: CONTROL_BASE_Y,
		width: CONTROL_ITEM_DIM,
		height: CONTROL_ITEM_DIM,
		handler: function() {
			console.log('tapped save button');
			onSaveCanvas();
		},
	}, {
		//Temp: Sending OPD Encounter
		image: 'resources/images/EndOfOPD.png',
		x: stage.getWidth() - 2 * (CONTROL_ITEM_SPACING + CONTROL_ITEM_DIM),
		y: CONTROL_BASE_Y,
		width: CONTROL_ITEM_DIM,
		height: CONTROL_ITEM_DIM,
		handler: function() {
			console.log('sending Doctor Encounter');
			k2s.config.sendDoctorOrderEncounter();
			//TODO Move to patientlist and clear canvas
		},
	}, {
		// Add diagnosis
		image: 'resources/images/icons/add_D_off.png',
		x: DRAWABLE_X_MIN - CONTROL_ITEM_SPACING - CONTROL_ITEM_DIM,
		y: CONTROL_BASE_Y + 3 * (CONTROL_ITEM_DIM + CONTROL_ITEM_SPACING),
		width: 50,
		height: 49,
		handler: function() {
			console.log("Bringing diagnoses modal window.")
			onClickDiagnosis();
		}
	}, {
		// Add medication
		image: 'resources/images/icons/add_drug_off.png',
		x: DRAWABLE_X_MIN - CONTROL_ITEM_SPACING - CONTROL_ITEM_DIM,
		y: CONTROL_BASE_Y + 4 * (CONTROL_ITEM_DIM + CONTROL_ITEM_SPACING),
		width: 50,
		height: 49,
		handler: function() {
			onClickMedication();
		}
	}, {
		// Add investigation
		image: 'resources/images/icons/add_investigation_off.png',
		x: DRAWABLE_X_MIN - CONTROL_ITEM_SPACING - CONTROL_ITEM_DIM,
		y: CONTROL_BASE_Y + 5 * (CONTROL_ITEM_DIM + CONTROL_ITEM_SPACING),
		width: 50,
		height: 49,
		handler: function() {
			console.log('INVESTIGATIONS: TODO');
		}
		// }, {
		//   // New
		//   // TODO: There should be some option to delete the entire interaction
		//   //  the whole thing is wrong. wrong patient or something??
		//   image: 'resources/images/new.png',
		//   x: CONTROL_BASE_X,
		//   y: CONTROL_BASE_Y + CONTROL_ITEM_DIM*3 + CONTROL_ITEM_SPACING*3,
		//   width: CONTROL_ITEM_DIM,
		//   height: CONTROL_ITEM_DIM,
		//   handler: function() {
		//       // Reset the drawable canvas to be blank
		//       // Also reset highY, so that text will appear in correct place relative to doctor handwriting
		//       // loadedImageLayer.hide();
		//       linesLayer.removeChildren();
		//       textLayer.removeChildren();
		//       highY = DRAWABLE_Y_MIN;
		//       stage.draw();
		//   }
	}];

	// Creates a 'clickable' item with a touch handler.
	// requires parameters for item: x,y,width,height,src,handler
	function createControlItem(item) {
		var imageObj = new Image();
		imageObj.onload = function() {
			var box = new Kinetic.Image({
				x: item.x,
				y: item.y,
				width: item.width,
				height: item.height,
				// stroke: "black",
				// strokeWidth: 1,
				image: imageObj
			});
			box.on('click touchstart', item.handler);
			controlsLayer.add(box);
			controlsLayer.draw();
		}
		imageObj.src = item.image;
	}

	for(var i = 0; i < controlItems.length; i++) {
		createControlItem(controlItems[i]);
	}

	//
	// Handlers
	//

	function onClickDiagnosis() {
		console.log("add diagnosis");
		k2s.clickDiagnosis();
		//        drawDiagnosis(g_diagnosis_list);
	}

	function onClickMedication() {
		// Get user input
		console.log("add diagnosis")
		// var input = window.prompt("What's the diagnosis?","Tuberculosis");
		// Trigger launch of modal dialog in Sencha
		k2s.addMedication();

		// inserts a dianosis wherever there's untouched space on canvas
		// drawTextAtLowPoint(input);
		//drawDiagnosis(g_medication_list);
	}

	function drawDiagnosis(text) {
		console.log('drawDiagnosis');
		console.log(text);
		if(text) {
			drawTextAtLowPoint(text);
		}
	}

	function drawTextAtLowPoint(text) {
		// text = "Rheumatic Fever";
		// Image on each line.
		// TODO: Needs pointer to the related in the store, so "X" can call delete
		console.log("drawTextAtLowPoint");

		// Set background color of text box according to type of text
		if(text.indexOf('Medications') >= 0) {
			bgFill = '#44f';
		} else if(text.indexOf('Diagnoses') >= 0) {
			bgFill = '#f44';
		} else {
			// bgFill = '#eee';
			bgFill = '#fff';
		}

		var imageObj2 = new Image();
		var myHighY = highY;
		addImageToLayer("resources/images/icons/bullet_diagnosis.png", textLayer, {
			x: DRAWABLE_X_MIN + 20,
			y: myHighY,
			width: 14,
			height: 14			
		});
		console.log(text);
		for(var i=0 ; i < text.length;i++)
		{
			var complexText = new Kinetic.Text({
			x: DRAWABLE_X_MIN + 20 + 20,
			y: highY,
			text: text[i],
			fontSize: 14,
			fontFamily: 'Helvetica',
			textFill: '#000',
			align: 'left',
			});
			textLayer.add(complexText);
			highY += ((complexText.textHeight * (complexText.textArr.length + 1)));	// length + title + space

		}
		// Add "delete" button
		// Note, this creates item on control Layer, not text layer
		createControlItem({
			image: "resources/images/icons/delete.png",
			x: DRAWABLE_X_MAX - 140,
			y: myHighY,
			width: 16,
			height: 16,
			handler: function() {
				console.log('TODO: handle click delete button');
				console.log(this);
				console.log(arguments);
			}
		});


		var handDrawnLineY = highY ;// + 20*(text.length-1);
		addImageToLayer("resources/images/icons/horizontal_crazy_line.png", textLayer, {
				x: DRAWABLE_X_MIN + 20,
				y: handDrawnLineY,
				width: 529,
				height: 9
		});

		// += the height of the "hand drawn line" + "additional spacing"
		highY += (10 + 5);
		
		stage.draw();
	}

	// Cleanup calls to add images, a little
	function addImageToLayer(file, layer, config) {
		var imgObj = new Image();
		imgObj.onload = function() {
			config.image = imgObj;
			var kineticImage = new Kinetic.Image(config);
			layer.add(kineticImage);
			layer.draw();
		}
		imgObj.src = file;		
	}
};