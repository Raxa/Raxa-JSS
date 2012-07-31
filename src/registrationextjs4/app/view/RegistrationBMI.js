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
 * This script defines the view RegistrationBMI of the registration module
 */
Ext.define('Registration.view.RegistrationBMI', {
    extend: 'Ext.container.Container',
    alias: 'widget.registrationbmi',
    border: 0,
    padding: 10,
    autoScroll: true,
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    initComponent: function () {
        this.items = {
            xtype: 'panel',
            ui: 'raxa-panel',
            width: 800,
            padding: 20,
            border: 0,
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Patient Identifier',
                    value: 'Patient ID comes here', 
                    id: 'bmiPatientID',
                    readOnly: true,
                },{
                    xtype: 'displayfield',
                    fieldLabel: 'Patient Name',
                    value: 'Patient Name comes here',
                    readOnly: true,
                    id: 'bmiPatientName',
                    padding: '0 0 40 0'
                },{
                    xtype: 'fieldset',
                    title: 'Enter Measures for Body Mass Index',
                    style:{
                        bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
                    },
                    items: [{
                        xtype: 'form',
                        id: 'heightWeightID',
                        ui: 'raxa-panel',
                        border: 0,
                        layout: {
                            align: 'stretch',
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'numberfield',
                            fieldLabel: 'Height (cm)',
                            id: 'heightIDcm',
                            emptyText: 'Enter Height in cm',
                            labelPad: 20,
                            labelWidth: 70,
                            labelAlign: 'right',
                            anchor: '95%',
                            width: 172,
                            margin: '0 10 0 0',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            nanText: 'Invalid Input'
                        }, {
                            xtype: 'numberfield',
                            fieldLabel: 'Weight (kg)',
                            id: 'weightIDkg',
                            emptyText: 'Enter Weight in Kg',
                            labelPad: 20,
                            labelWidth: 95,
                            labelAlign: 'right',
                            width: 200,
                            anchor: '95%',
                            margin: '0 10 0 0',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            nanText: 'Invalid Input',
                            padding: '20 0 40 0'
                        }]
                    }]
                },{
                    xtype: 'fieldset',
                    title: 'BMI',
                    style:{
                        bodyStyle:'border-right:none;border-right:none;border-bottom:none;border-left:none;'
                    },
                    items: [{
                        xtype: 'numberfield',
                        labelPad: 20,
                        fieldLabel: 'BMI',
                        emptyText: 'BMI Value',
                        id: 'bmiNumberfieldID',
                        readOnly: true,
                        width: 172,
                        labelAlign: 'right',
                        labelWidth: 70,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        nanText: 'Invalid Input'
                    }, {
                        xtype: 'container',
                        height: 40,
                        border: 0,
                        layout: {
                            align: 'stretch',
                            pack: 'center',
                            type: 'vbox',
                            padding: 30
                        },
                        items: {
                            xtype: 'slider',
//                            plugins: [{
  //                              xclass : 'Ext.plugin.SliderFill',
    //                            fillCls : ['x-slider-fill4']
      //                      }],
                            id: 'bmiSliderID',
                            disabledCls: 'x-form-readonly',
                            readOnly: true,
                            minValue: 1,
                            maxValue: BMI_MAX                            
                        }
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'BMI Status',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        labelAlign: 'right',
                        labelPad: 20,
                        labelWidth: 70,
                        anchor: '95%',
                        defaults: {
                            hideLabel: 'true'
                        },
                        items: {
                            name: 'bmiStatus',
                            id: 'bmiStatusID',
                            fieldLabel: 'BMI Status',
                            readOnly: true,
                            width: 295,
                            emptyText: 'BMI Status Value',
                            allowBlank: true
                        }
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            pack: 'end'
                        },
                        border: 0,
                        padding: 0,
                        width: 580,
                        items: [{
                            xtype: 'button',
                            margin: '30 0 0 30',
                            align: 'right',
                            width: 60,
                            ui: 'raxa-aqua-small',
                            action: 'bmiSubmit',
                            id: 'submitBMI',
                            text: 'Submit' //Going Back to Home Page - BMI to be Posted Here
                        }]
                    }]
                }]
            }]
        };
        this.callParent();
    }
});


Ext.define('Ext.plugin.SliderFill', {
    extend: 'Ext.util.Observable',
    alias: 'plugin.sliderfill',
    config :{
	fillCls : []
    },
    init: function(cmp) {
        console.log("init");
        console.log(cmp);
        var me = this,
            sliderinner = Ext.get(Ext.DomQuery.select('.x-slider-inner',cmp.element.dom)[0]);
            thumbarr = cmp.getComponent().getThumbs();
	console.log(thumbarr,"thumbarr");

	cmp.on('painted',function(slider){
	    me.onSliderPainted(slider);
	});

	cmp.on('updatedata',function(){
	    console.log("updatedata");
	});
	cmp.on('change',function(slider,sl,thumb){
	    var thumbarr_val = slider.getComponent().getThumbs();
            
	    Ext.defer(function(){
		me.thumbAdjust(slider,thumb,thumbarr_val.indexOf(thumb));
	     },200);
	});
        
    

	Ext.Viewport.on('orientationchange',function(){
	    Ext.defer(function(){
		me.onSliderPainted(cmp);
	    },100);
	});


    },
    onSliderPainted : function(slider){
        var me = this,
            thumbarr = slider.getComponent().getThumbs(),
            fillCls  = me.getFillCls(),
            sliderinner = Ext.get(Ext.DomQuery.select('.x-slider-inner',slider.element.dom)[0]);
	    console.log(me);
	console.log(fillCls,"fillCls")
	Ext.each(thumbarr,function(item,i){
	    console.log(item.translatableBehavior.translatable)
	    var fill_space_id = "fill-"+item.id, width = item.translatableBehavior.translatable.x;
	    console.log(fillCls[i],"blasdas" )
	    Ext.DomHelper.append(sliderinner, {tag: 'div', id: fill_space_id, cls: 'x-slider-fill '+fillCls[i] });
	    if(i > 0){
		var prev_thumb =  slider.getComponent().getThumb(i-1),
		    prev_width =  prev_thumb.translatableBehavior.translatable.x,
		    totalwidth = width - prev_width;
		Ext.get(fill_space_id).setStyle({width : Math.round(totalwidth)+'px',left : prev_width+'px'});
	    } else {
		Ext.get(fill_space_id).setStyle({width : Math.round(width)+'px'});
	    }
	});
	slider.getComponent().on({
	    drag: function(sl,thumb) {
		console.log(thumb,"sdfs");
		var thumbIndex = Ext.Array.indexOf(thumbarr,thumb);
		me.thumbAdjust(slider,thumb,thumbIndex);
	    }
	});
    },
    thumbAdjust : function(slider,thumb,i){
	console.log(thumb,"thumb")
        var fill_space_id = "fill-"+thumb.getId(),
	    thumbarr = slider.getComponent().getThumbs(),
            width  = thumb.translatableBehavior.translatable.x;
                console.log(width);
                if(i == 0){
                    console.log("if");
                    Ext.get(fill_space_id).setStyle({width : Math.round(width)+'px'});
                    if(slider.getComponent().getThumb(i+1)){
                        var next_thumb =  slider.getComponent().getThumb(i+1),
                            fill_id =  "fill-"+next_thumb.id,
                            next_width =  next_thumb.translatableBehavior.translatable.x,
                            totalwidth = next_width - width;
                        Ext.get(fill_id).setStyle({width : Math.round(totalwidth)+'px',left : width+'px'});
                    }
                  
                } else if( i == ((thumbarr.length)-1)){
                    console.log("else if");
                    if(slider.getComponent().getThumb(i-1)){
                    var prev_thumb =  slider.getComponent().getThumb(i-1),
                        prev_width =  prev_thumb.translatableBehavior.translatable.x,
                        totalwidth = width - prev_width;
                        Ext.get(fill_space_id).setStyle({width : Math.round(totalwidth)+'px',left : prev_width+'px'});
                    }
                } else {
                    console.log("else");
                      var prev_thumb =  slider.getComponent().getThumb(i-1),next_thumb =  slider.getComponent().getThumb(i+1),
                        prev_width =  prev_thumb.translatableBehavior.translatable.x,
                        next_width =  next_thumb.translatableBehavior.translatable.x,
                        totalwidth = width - prev_width;
                        Ext.get(fill_space_id).setStyle({width : Math.round(totalwidth)+'px',left : prev_width+'px'});
                        
                        if(slider.getComponent().getThumb(i+1)){
                            var next_thumb =  slider.getComponent().getThumb(i+1),
                                fill_id =  "fill-"+next_thumb.id,
                                next_width =  next_thumb.translatableBehavior.translatable.x,
                                totalwidth = next_width - width;
                            Ext.get(fill_id).setStyle({width : Math.round(totalwidth)+'px',left : width+'px'});
                        }
                }
    }
});