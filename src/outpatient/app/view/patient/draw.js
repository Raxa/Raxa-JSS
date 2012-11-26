// TODO: must be captured in a setupCanvas method, else will try to affect DOM before it's loaded
///////////////////////////////////////////////////////////
// Connection: Kinetic to Sencha
//  - bridges via firing Ext events
///////////////////////////////////////////////////////////
// Allows us to throw Ext events, triggering Sencha code when tapping on Kinetic items
Ext.define('KineticToSencha', {
  mixins: ['Ext.mixin.Observable'],
  id: 'k2s',
  config: {
    fullName: ''
  },

  constructor: function(config) {
    this.initConfig(config); // We need to initialize the config options when the class is instantiated
  },

  addDiagnosis: function() {
    this.fireEvent('clickAddDiagnosis');
  },
  clickDiagnosis: function() {
      this.fireEvent('clickOnDiagnosis');
      console.log(this);
  },
  
  saveLoadMask: function() {
    var mask = function () {
      console.log('mask off');
      Ext.getCmp('opdPatientDataEntry').setMasked(false)  
    }
    
    console.log('mask on');
    Ext.getCmp('opdPatientDataEntry').setMasked({
      xtype: 'loadmask',
      message: 'Saving...',
      modal: true
    });

    setTimeout (mask, 4000 );

  //   console.log('saveLoadMask');

  //   var p = new Ext.ProgressBar({
  //      renderTo: 'opdPatientDataEntry'
  //   });

  //   //Wait for 5 seconds, then update the status el (progress bar will auto-reset)
  //   var p = Ext.create('Ext.ProgressBar', {
  //      renderTo: Ext.getBody(),
  //      width: 300
  //   });

  //   //Wait for 5 seconds, then update the status el (progress bar will auto-reset)
  //   p.wait({
  //      interval: 500, //bar will move fast!
  //      duration: 30000,
  //      increment: 15,
  //      text: 'Saving...',
  //      scope: this,
  //      fn: function(){
  //         p.updateText('Done!');
  //      }
  //   });
  }
});

g_diagnosis_text = "";
g_diagnosis_list= "";

var order ;
var obs;
var DoctorOrderStore;
var DoctorOrderModel;

var k2s = Ext.create('KineticToSencha', {
  
  addOrder: function() {    
    //set persist of order true as Doctor may not always have a order
    RaxaEmr.Outpatient.model.DoctorOrder.getFields().items[6].persist= true; //6th field in orders (sorted)
    var drugPanel = Ext.getStore('drugpanel');   

    lengthOfDrugOrder = Ext.getStore('drugpanel').getData().all.length;

    for(var i = 0 ; i < lengthOfDrugOrder ; i++)
    {      
      var drugPanel = Ext.getStore('drugpanel').getData().all[i].data;
      
      //Drug Orders here
      var OrderModel = Ext.create('RaxaEmr.Pharmacy.model.drugOrder', {
     			patient: myRecord.data.uuid,  //need to set selected patient uuid in localStorage
			drug: drugPanel.uuid,
			startDate: Util.Datetime(new Date(), Util.getUTCGMTdiff()),
			autoExpireDate: Util.Datetime(new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() + drugPanel.duration), Util.getUTCGMTdiff()),
			concept: '---',//   drugPanel.data.uuid, uuid is not currently stored, need to work on how Drug order is added to store
			dose: drugPanel.frequency,
			quantity: drugPanel.routeofadministration
//			type: 
//			instruction:
		    });
      DoctorOrderModel.data.obs.push(OrderModel.data);  
    }       
  },
    
  addObs: function() {
    //TODO set persit TRUE if first order 
 //0   RaxaEmr.Outpatient.model.DoctorOrder.getFields().items[5].persist= true; //5th field in obs (sorted)

    //TODO set persist FALSE if no item in list

    DoctorOrderModel.data.obs = [];
    
    lengthOfDiagnosis = Ext.getCmp('diagnosedList').getStore().data.length;

    for(var i = 0 ; i < lengthOfDiagnosis ; i++)
    {
      console.log(Ext.getCmp('diagnosedList').getStore().data.all[i]);
      
      var ObsModel = Ext.create('RaxaEmr.Outpatient.model.Observation', {
			obsDatetime: Util.Datetime(new Date(), Util.getUTCGMTdiff()),
			person: myRecord.data.uuid,  //need to set selected patient uuid in localStuiorage
			concept: Ext.getCmp('diagnosedList').getStore().data.all[i].data.id,
		    });
      DoctorOrderModel.data.obs.push(ObsModel.data);  
    }      

  console.log(DoctorOrderModel);
    
  },
  
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
    
    for ( var i=0 ; i < stage.getChildren().length ; i++)
    {  
      for (var j =0 ; j < stage.getChildren()[i].children.length ; j++)  //j is always 4, but not now.
      {
	if(stage.getChildren()[i].children[j].attrs.id=="PatientRecord")
	{
	    console.log( stage.getChildren()[i].children[j].attrs.image);
	 
	     var ObsModel = Ext.create('RaxaEmr.Outpatient.model.Observation', {
			obsDatetime: Util.Datetime(new Date(), Util.getUTCGMTdiff()),
			person:  myRecord.data.uuid,  //need to set selected patient uuid in localStorage
			concept: localStorage.patientRecordImageUuidconcept,
			value: stage.getChildren()[i].children[j].attrs.image.src
		    });
	    DoctorOrderModel.data.obs.push(ObsModel.data);  
	}  
     }  
    }
    console.log(Ext.getStore('DoctorOrder'));
    
  },
  
  sendDoctorOrderEncounter: function() {
  
    // this.addDoctorRecordImage();
    
    //sync store after addObs , addDoctorRecordImage and addOrder

    console.log(Ext.getStore('DoctorOrder'));
    
  },
  
  
  initStore: function() {
    
		DoctorOrderStore = Ext.create('RaxaEmr.Outpatient.store.DoctorOrder');
			    
		DoctorOrderModel = Ext.create('RaxaEmr.Outpatient.model.DoctorOrder', {
			    uuid: null, 		//need to get myRecord variable of patientlist accessible here, so made it global variable
							//may need to set it later if new patient is created using DoctorOrder view (currently view/patient/draw.js)
							//other way is to create method in Controller which returns myRecord.data.uuid
			    encounterType: localStorage.outUuidencountertype,
			    encounterDatetime: Util.Datetime(new Date(), Util.getUTCGMTdiff()),   //Should encounterDatetime be time encounter starts or ends?
			    provider: localStorage.loggedInProvider,
        });
				    
				    

			    DoctorOrderModel.data.obs = [];
			    DoctorOrderModel.data.orders = [];
			    console.log(DoctorOrderStore);
    
//    this.sendDoctorOrderEncounter();
  },
  addDiagnosisTo: function() {
    
    
  },
  

      printDiagnosis: function() {
  
	      // By default, "this" will be the object that fired the event.
      console.log("k2s: clickOnDiagnosis");
      // Ext.getCmp('plusDrugButton').fireEvent('tap'); // hack to press a real button and launch its dialog
      console.log("k2s: NOTE ADDING DIAGNOSES FOR NOW");
      // Print store. I'll have to pull info from this to print in Canvas
      // TODO: let's start with just the drug's name..
      var displayText = "";

      var store = Ext.getStore('diagnosedDisease');
      var data = store.getData();
      var itemCount = data.getCount();
      if(itemCount > 0) {
        displayText += "Diagnoses: \n";
      }

      for(var i = 0; i < itemCount; i++) {
        var itemData = data.getAt(i).getData();
        console.log(itemData);
        console.log(itemData.complain || "");
        displayText += ('* ' + itemData.complain + '\n');
      }
      console.log('display...', displayText);
	

      // TODO: Trigger refresh of Kinetic UI ... drug list should be updated
      g_diagnosis_list = displayText;

 /*     TODO UI Designers want prev Diagnosis to be showed (with different color ) 
      store.clearData(); // Prevents repeating.. now just need to create multiple prescription text boxes
*/
      Ext.getCmp('diagnosis-panel').setHidden(false);
//      Ext.getCmp('drugaddform').reset();
//      Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.ADD);
      
      console.log(g_diagnosis_list);
      
      console.log(this);
      
      console.log(drawTextAtLowPoint);

	//drawDiagnosis('text');
	
this.drawTextAtLowPoint('Hi');
      
    },
  
    
    
  
  
  listeners: {

    clickAddDiagnosis: function() { // This function will be called when the 'quit' event is fired
      // By default, "this" will be the object that fired the event.
      console.log("k2s: clickAddDiagnosis");     console.log(myRecord);
      // Ext.getCmp('plusDrugButton').fireEvent('tap'); // hack to press a real button and launch its dialog
      console.log("k2s: NOTE ADDING DRUGS FOR NOW");
      // Print store. I'll have to pull info from this to print in Canvas
      // TODO: let's start with just the drug's name..
      var displayText = "";

      var store = Ext.getStore('drugpanel');
      var data = store.getData();
      var itemCount = data.getCount();
      if(itemCount > 0) {
        displayText += "Medications: \n";
      }

      for(var i = 0; i < itemCount; i++) {
        var itemData = data.getAt(i).getData();
        console.log(itemData.drugname || "");
        
        if (! itemData.drugname) { continue; }

        displayText += ('* ' + itemData.drugname);
        var duration = itemData.duration;
        if(duration) {
          displayText += (' - ' + duration);
        }

        var strength = itemData.strength;
        if(strength) {displayText += (' - ' +strength);}
        
        var quantity = itemData.duration;
        if(quantity) {displayText += (' - ' +quantity);}

        var frequency = itemData.frequency;
        if(frequency) {displayText += (' - ' +frequency);}
        
        var instruction = itemData.instruction;
        if(instruction) {displayText += (' - ' +instruction);}

        displayText += '\n';

        // return itemData.drugname || "";
      }
      console.log('display...', displayText);

      // TODO: Trigger refresh of Kinetic UI ... drug list should be updated
      g_diagnosis_text = displayText;
      
 /*   
  * 	TODO UI Designers want prev Diagnosis to be showed (with different color    
      store.clearData(); // Prevents repeating.. now just need to create multiple prescription text boxes
  
*/      
      Ext.getCmp('drugForm').setHidden(false);
      Ext.getCmp('drugaddform').reset();
      Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.ADD);
    },
    clickOnDiagnosis: function() { // This function will be called when the 'quit' event is fired
      // By default, "this" will be the object that fired the event.
      console.log("k2s: clickOnDiagnosis");
      // Ext.getCmp('plusDrugButton').fireEvent('tap'); // hack to press a real button and launch its dialog
      console.log("k2s: NOTE ADDING DIAGNOSES FOR NOW");
      // Print store. I'll have to pull info from this to print in Canvas
      // TODO: let's start with just the drug's name..
      var displayText = "";

      var store = Ext.getStore('diagnosedDisease');
      var data = store.getData();
      var itemCount = data.getCount();
      if(itemCount > 0) {
        displayText += "Diagnoses: \n";
      }

      for(var i = 0; i < itemCount; i++) {
        var itemData = data.getAt(i).getData();
        console.log(itemData);
        console.log(itemData.complain || "");
        displayText += ('* ' + itemData.complain + '\n');

        // return itemData.drugname || "";
      }
      console.log('display...', displayText);

      // TODO: Trigger refresh of Kinetic UI ... drug list should be updated
      g_diagnosis_list = displayText;

 /*     TODO UI Designers want prev Diagnosis to be showed (with different color ) 
      store.clearData(); // Prevents repeating.. now just need to create multiple prescription text boxes
*/
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

var DRAWABLE_X_MIN = 0;
var DRAWABLE_X_MAX = 700; // 708 - strict border
var DIFF = 144; // moving whole thing up a bit ... 1024 - 880 = 144
var DRAWABLE_Y_MIN = 240 - DIFF; // 230 - strict border 
var DRAWABLE_Y_MAX = 1024;
var DEFAULT_MODE = "draw"; // undefined
var STAGE_X = 768; //768
var STAGE_Y = 1024; //1024
var HISTORY_BASE_X = DRAWABLE_X_MAX;
var HISTORY_BASE_Y = DRAWABLE_Y_MIN + 196;
var HISTORY_ITEM_DIM = 64;

var CONTROL_BASE_X = DRAWABLE_X_MAX + 8;
var CONTROL_BASE_Y = DRAWABLE_Y_MIN - 6;
var CONTROL_ITEM_SPACING = 3;
var CONTROL_ITEM_DIM = 52;
var HIGH_Y_OFFSET = 5;  // a little extra space

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

stage = new Object;

var setupCanvas = function() {

    var lowY = DRAWABLE_Y_MIN;
    var highY = DRAWABLE_Y_MIN;

    var newLine;
    var newLinePoints = [];
    var prevPos;
    var mode = DEFAULT_MODE;

    var historyYOffset = HISTORY_BASE_Y;

    layer = new Kinetic.Layer();
    loadedImageLayer = new Kinetic.Layer(); // For re-loaded thumbs
    linesLayer = new Kinetic.Layer();
    textLayer = new Kinetic.Layer();
    controlsLayer = new Kinetic.Layer();

    // Setup stage, upon which all layers are built.
    stage = new Kinetic.Stage({
      id: "stage",
      container: "container",
      width: STAGE_X,
      height: STAGE_Y
    });
    GloStage = stage;
    // Layers
    stage.add(layer);
    stage.add(linesLayer);
    stage.add(textLayer); // in front of "draw" layer, i.e. cant draw on a diagnosis. for now.
    stage.add(loadedImageLayer);
    stage.add(controlsLayer);

    moving = false;
    
    //To allow using stage from outside
    function getStage() {
      
      console.log('accessing getStage function in setupCanvas');
      
      return stage;
      
    }
    
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

    ////////////////////////
    // Event Handlers
    ////////////////////////
    // First touch or click starts a drag event


    function dragStart() {
      // console.log('dragStart');
      var up = stage.getUserPosition();
      if(!up || !isInDrawableArea(up.x, up.y) || mode !== 'draw') {
        return;
      }

      if(moving) {
        moving = false;
        layer.draw();
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
      // console.log(up.x, up.y);
      if(!up || !isInDrawableArea(up.x, up.y)) {
        return;
      }

      // console.log('dragMove');
      if(mode !== 'draw') {
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
      console.log('drag complete');

      var up = stage.getUserPosition();
      if(!up || !isInDrawableArea(up.x, up.y)) {
        return;
      }

      if(mode !== 'draw') {
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
        console.log("hi = " + y)
      }
    }

    // SAVING 
    // Save - event handler


    function onSaveCanvas() {
      // Callback, since the stage toDataURL() method is asynchronous, 
      k2s.saveLoadMask();
      stage.toDataURL({
        callback: function(dataUrl) { 
          addHistoryItem('', 'yellow', dataUrl)
        }
      });
    }

    // Save - helper, creates history bar items one-by-one


    function addHistoryItem(name, color, dataUrl) {
      // if No data URL, then it's the "special" case for "today"
      if(!dataUrl) {
        var box = new Kinetic.Rect({
          x: DRAWABLE_X_MAX,
          y: historyYOffset,
          width: HISTORY_ITEM_DIM,
          height: HISTORY_ITEM_DIM,
          fill: color,
          stroke: "black",
          strokeWidth: 4,
          draggable: false,
        });
        updateHistoryBar(box, '');

        // Add text that says "Today"
        var text = new Kinetic.Text({
          x: DRAWABLE_X_MAX + 8,
          y: historyYOffset - (HISTORY_ITEM_DIM + (HISTORY_ITEM_DIM / 2)) + HISTORY_ITEM_DIM / 3,
          fontSize: HISTORY_ITEM_DIM / 3,
          fontFamily: "ComicSans",
          textFill: "white",
          text: name
        });
        text.on('click touchstart', function() {
          // Reset to current visit
          loadImageFromPriorVisit('');
        });

        controlsLayer.add(text);
        controlsLayer.draw();

        return;
      } else {
        // TODO: This code is slow. Generating fns in-line is inefficient? DataUrl is slow?
        // If there is a dataUrl, then use that image to create thumb, linking to previous visit
        var imageObj = new Image();
        imageObj.onload = function() {
          var box = createHistoryLink(imageObj);
          updateHistoryBar(box, dataUrl);
        }
        imageObj.src = dataUrl;

        // Generates an image from the dataUrl

        function createHistoryLink(img) {
          var box = new Kinetic.Image({
            x: DRAWABLE_X_MAX,
            y: historyYOffset,
            width: HISTORY_ITEM_DIM,
            height: HISTORY_ITEM_DIM,
            stroke: "black",
            strokeWidth: 4,
            image: img,
	    id: 'PatientRecord'
            
          });
          return box;
        }

        // Takes image from the dataUrl


        function updateHistoryBar(box, dataUrl) {
          controlsLayer.add(box);
          controlsLayer.draw();
          box.on('click touchstart', function() {
            // Reset to current visit
            loadImageFromPriorVisit(dataUrl);
          });
          historyYOffset += HISTORY_ITEM_DIM + (HISTORY_ITEM_DIM / 2);
        }
      }
    }

    // Load - restore image from a previous visit
    //
    // Note that this canvas is "in front", so the draw line or text actions can still happen
    // but they update a layer behind the 'loadedImageLayer'. When we go back, we reset 
    // the content of the linesLayer and textLayer, so the user doesn't realize that they were 
    // writing on layers in the background.


    function loadImageFromPriorVisit(dataUrl) {
      console.log('loadImageFromPriorVisit');

      // Same idea as function addHistoryItem() ... 
      // if No data URL, then it's the "special" case for "today"
      if(!dataUrl) {
        console.log('no data url');
        // Reset to draw mode
        loadedImageLayer.hide();

        // 
        // TODO: For now, reset the drawing layers.. However, there may be times when we want 
        //  to persist ('today in progress') and flip back-and-forth between today and history
        linesLayer.removeChildren();
        textLayer.removeChildren();

        // Also reset highY, so that text will appear in correct place relative to doctor handwriting
        highY = DRAWABLE_Y_MIN;

        stage.draw();
        return;
      } else {
        var imageObj = new Image();
        imageObj.onload = function() {
          console.log("image loaded");

          var priorVisitImage = new Kinetic.Image({
            x: 0,
            y: 0,
            image: imageObj,
            width: stage.getWidth(),
            height: stage.getHeight()
          });

          loadedImageLayer.add(priorVisitImage);
          loadedImageLayer.draw();
        }
        imageObj.src = dataUrl;

        loadedImageLayer.show();
      }
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
    layer.add(background);

    // Background - image of OPD-lite: paper, inactive (currently) buttons, etc
    var imageObj = new Image();
    imageObj.onload = function() {
      console.log("image loaded");
      console.log(stage.getWidth(), stage.getHeight());
      var backgroundImage = new Kinetic.Image({
        x: 0,
        y: 0,
        image: imageObj,
        width: stage.getWidth(),
        height: 880
      });
      layer.add(backgroundImage);
      layer.draw();
    }
    var file = "resources/images/background-768x880.png";
    imageObj.src = file;

    // History - Add "Today" to the history list
    addHistoryItem('new', 'green', '');

    var controlItems = [{
      handler: function() {
        console.log('mode = draw');
        mode = "draw";
      },
      image: 'resources/images/pencil.png'
    }, {
      handler: function() {
        console.log('disabled, for now, since eraser isnt working');
        // mode = "erase";
      },
      image: 'resources/images/eraser.png'
    },
    // {
    //   handler: function() { console.log('keyboard not implemented');},
    //   image: 'resources/images/keyboard.png'
    // },
    {
      handler: function() {
        console.log('tapped save button');
        onSaveCanvas();
      },
      image: 'resources/images/save.png'
    }];

    function createControlItem(item, offset) {
      console.log(item)
      var pencilImageObj = new Image();
      pencilImageObj.onload = function() {
        var box = new Kinetic.Image({
          x: CONTROL_BASE_X,
          y: CONTROL_BASE_Y + offset * (CONTROL_ITEM_DIM + CONTROL_ITEM_SPACING),
          width: CONTROL_ITEM_DIM,
          height: CONTROL_ITEM_DIM,
          stroke: "black",
          strokeWidth: 1,
          image: pencilImageObj
        });
        box.on('click touchstart', item.handler);
        controlsLayer.add(box);
        controlsLayer.draw();
      }
      pencilImageObj.src = item.image;
    }

    createControlItem(controlItems[0], 0);
    createControlItem(controlItems[1], 1);
    createControlItem(controlItems[2], 2);

    // // Overlaps with "new" history item. just to help make it easier to understand
    // var newImgObj = new Image();
    // newImgObj.onload = function() {
    //   var box = new Kinetic.Image({
    //     x: CONTROL_BASE_X,
    //     y: CONTROL_BASE_Y + CONTROL_ITEM_DIM*3 + CONTROL_ITEM_SPACING*3,
    //     width: CONTROL_ITEM_DIM,
    //     height: CONTROL_ITEM_DIM,
    //     stroke: "black",
    //     strokeWidth: 1,
    //     image: newImgObj
    //   });
    //   box.on('click touchstart', function() {
    //     onSaveCanvas();
    //   });
    //   controlsLayer.add(box);
    //   controlsLayer.draw();
    // }
    // newImgObj.src = 'resources/images/new.png';
    var plusDiagnosisImgObj = new Image();
    plusDiagnosisImgObj.onload = function() {
      var box = new Kinetic.Image({
        x: 200,
        y: DRAWABLE_Y_MIN - 40,
        width: 128,
        height: 30,
        stroke: "black",
        strokeWidth: 1,
        image: plusDiagnosisImgObj
      });
      box.on('click touchstart', function() {
        console.log("Bringing diagnoses modal window.")
        // TODO: Rewrire to pull up diagnosis window.
        //  NOTE... there's some naming confusion because i originally wired up the diagnosis
        //  button to open the medications/prescriptions window
         onClickDiagnosis();
      });
      controlsLayer.add(box);
      controlsLayer.draw();
    }
    plusDiagnosisImgObj.src = 'resources/images/plus_diagnosis.png';

    var plusMedicationImgObj = new Image();
    plusMedicationImgObj.onload = function() {
      var box = new Kinetic.Image({
        x: 350,
        y: DRAWABLE_Y_MIN - 40,
        width: 150,
        height: 30,
        stroke: "black",
        strokeWidth: 1,
        image: plusMedicationImgObj
      });
      box.on('click touchstart', function() {
        onAddDiagnosis();
      });
      controlsLayer.add(box);
      controlsLayer.draw();
    }
    plusMedicationImgObj.src = 'resources/images/plus_medication.png';

    function onClickDiagnosis() {
        console.log("add diagnosis");
        k2s.clickDiagnosis();
        drawDiagnosis(g_diagnosis_list);
    }

    function onAddDiagnosis() {
      // Get user input
      console.log("add diagnosis")
      // var input = window.prompt("What's the diagnosis?","Tuberculosis");
      // Trigger launch of modal dialog in Sencha
      k2s.addDiagnosis();

      // inserts a dianosis wherever there's untouched space on canvas
      // drawTextAtLowPoint(input);
      drawDiagnosis(g_diagnosis_text);
    }

    function drawDiagnosis(text) {
      if(text) {
        drawTextAtLowPoint(text);
      }
    }

    function drawTextAtLowPoint(text) {
      console.log("drawTextAtLowPoint");

      // add the shapes to the layer
      // simpleText.setAttrs({y: highY});
      // console.log(simpleText);
      // console.log(simpleText.y);
      // textLayer.add(simpleText);
      if (text.indexOf('Medications')>=0) {
        bgFill = '#44f';
      } else if (text.indexOf('Diagnoses')>=0) {
        bgFill = '#f44';
      } else {
        bgFill = '#eee';
      }
      var complexText = new Kinetic.Text({
        x: 20,
        // y: 60,
        stroke: '#555',
        strokeWidth: 3,
        fill: bgFill,
        // text: 'DIAGNOSIS: Tuberculosis',
        // text: 'Medication: \n* Acetominophan - 100mg - 2x Daily \n* Acetominopan - 100mg - 2x Daily \n* Acetominopan - 100mg - 2x Daily \n',
        text: '',
        fontSize: 14,
        fontFamily: 'Calibri',
        textFill: '#000',
        // width: 380,
        padding: 10,
        // align: 'center',
        align: 'left',
        fontStyle: 'italic',
        shadow: {
            color: 'black',
            blur: 1,
            offset: [10, 10],
            opacity: 0.2
        },
        cornerRadius: 10
      });

      complexText.setAttrs({
        y: highY,
        text: text,
        fill: bgFill
      });
      console.log(complexText);
      textLayer.add(complexText);
      stage.draw();
      highY += (complexText.textHeight*complexText.textArr.length+1)+30;
      
    }
  };

///////////////////////////////////////////////////////////
// Sencha code
//  - well, it's a glorified canvas, wrapped in Sencha
///////////////////////////////////////////////////////////
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
//the view after clicking one of the patient in the patient list
Ext.define('RaxaEmr.Outpatient.view.patient.draw', {
  extend: 'Ext.Container',
  xtype: 'draw-panel',
  id: 'drawPanel',
  // requires: ['RaxaEmr.Outpatient.view.patient.Grid', 'RaxaEmr.Outpatient.view.patient.medicationhistory', 'RaxaEmr.Outpatient.view.patient.refertodoc', 'RaxaEmr.Outpatient.view.patient.work', 'RaxaEmr.Outpatient.view.patient.labresulthistory'],
  config: {
    layout: 'hbox',
    // scroll: true,
    items: [{
      xtype: 'container',
      id: 'opdPatientDataEntry',
      width: STAGE_X,
      // height:760,
      height: STAGE_Y,
      layout: 'vbox',
      items: [{
        scroll: false,
        html: '<div id="container" ></div>'
        // }, {
        //     xtype: 'drug-grid',
        //     id: 'orderedDrugGrid',
        //     height: 250,
        //     border: 10,
      }],
      listeners: {
        painted: function() {
          console.log("painted");
          setupCanvas();
	  k2s.config.initStore();
        }
      },
      // }, {
      //     // Buttons to navigate while using OPD 
      //     xtype: 'container',
      //     id: 'opdPatientDataEntryControls',
      //     width: 118,
      //     items: [{
      //         xtype: 'button',
      //         text: '+ Drug',
      //         id: 'plusDrugButton',
      //         handler: function () {
      //             Ext.getCmp('drugForm').setHidden(false);
      //             Ext.getCmp('drugaddform').reset();
      //             Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.ADD); // to add more than one treatment
      //         },
      //     }],
    }]
    // }],
  },

  // updateRecord: function (newRecord) {
  //     if (newRecord) {
  //         this.down('#content').setData(newRecord.data);
  //     }
  // }
});

// }());
