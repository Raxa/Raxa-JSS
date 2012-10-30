/**
 * This screen shows a drug order form 
 * with a button to add additional medications and a submit button.The left side shows patient
 * list
 */

Ext.define("Screener.view.VitalsForm", {
	xtype: 'vitalsForm',
	id: 'vitalsForm',
	extend: 'Ext.form.Panel',
	config: {
		styleHtmlContent: false,
		autoscroll: true,
		layout: 'vbox',
		items: [{
			xtype: 'titlebar',
			docked: 'top',
			title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.vitals')
		},
		{
			// Need a separate panel here, so I can show/hide/disable
			xtype: 'panel',
			layout: 'vbox',
			id: 'vitalsInput',
			items: [{
				xtype: 'panel',
				layout: 'hbox',
				items: [{
					// Fieldset for inputting vitals
					xtype: 'fieldset',
                    width: '500px', // TODO: layout should fit screen
					id: 'vitalsFields',
					// TODO: For all inputs, get bounds from OpenMRS concept dictionary
					items: [{
						// Systolic Blood Pressure
						xtype: 'sliderfieldextended',
						label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.sysbp'),
                        labelAlign: 'top',
						minValue: 0,
						maxValue: 250,
                        value: 0,
						stepValue: 1,
						name: 'systolicBloodPressureField'
					},
					{
						// Diastolic Blood Pressure
						xtype: 'sliderfieldextended',
						label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.diasbp'),
                        labelAlign: 'top',
						minValue: 0,
						maxValue: 150,
                        value: 0,
						stepValue: 1,
						name: 'diastolicBloodPressureField'
					},
					{
						// Temperature
						xtype: 'sliderfieldextended',
						label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.temp'),
                        labelAlign: 'top',
                        id: 'tempSliderExt',
                        minValue: 27,   // TODO: Fix visual error in Slider. bar starts at far right and cant slide (this is a Sencha bug)
						maxValue: 43,
                        value: 27,
						stepValue: 0.1,
						name: 'temperatureField'
					},
					{
						// Repiratory Rate
						xtype: 'sliderfieldextended',
						label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.resp_rate'),
                        labelAlign: 'top',
						minValue: 0,
						maxValue: 200,
                        value: 0,
						stepValue: 1,
						name: 'respiratoryRateField'
					},
					{
						// Pulse
						xtype: 'sliderfieldextended',
						label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.pul_rate'),
                        labelAlign: 'top',
						minValue: 0,
						maxValue: 230,
						stepValue: 1,
						name: 'pulseField'
					},
					{
						// Oxygen Saturation
						xtype: 'sliderfieldextended',
						label: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.oxy_sat'),
                        labelAlign: 'top',
						minValue: 0,
						maxValue: 100,
						stepValue: 1,
						name: 'bloodOxygenSaturationField'
                    }]
				}]
			},
			{
				// Submit Button
				xtype: 'button',
				ui: 'confirm',
				id: 'submitVitalsButton',
				height: '40px',
				text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.VitalsForm.submit'),
                width: '100px'
			}]
		}]
	}
});

 Ext.define('Override.slider.Slider', {
    override : 'Ext.slider.Slider',

    onThumbDrag : function (thumb, e, offsetX) {
        var index = this.getThumbIndex(thumb),
        offsetValueRatio = this.offsetValueRatio,
        constrainedValue = this.constrainValue(this.getMinValue() + offsetX / offsetValueRatio);

        e.stopPropagation();

        this.setIndexValue(index, constrainedValue);

        this.fireEvent('drag', this, thumb, this.getValue(), e);

        return false;
    },

    setIndexValue : function (index, value, animation) {
        var thumb = this.getThumb(index),
        values = this.getValue(),
        offsetValueRatio = this.offsetValueRatio,
        draggable = thumb.getDraggable();

        draggable.setOffset((value - this.getMinValue()) * offsetValueRatio, null, animation);

        values[index] = value;
    },

    onTap : function (e) {
        if (this.isDisabled()) {
            return;
        }

        var targetElement = Ext.get(e.target);

        if (!targetElement || targetElement.hasCls('x-thumb')) {
            return;
        }

        var touchPointX = e.touch.point.x,
        element = this.element,
        elementX = element.getX(),
        offset = touchPointX - elementX - (this.thumbWidth / 2),
        value = this.constrainValue(this.getMinValue() + offset / this.offsetValueRatio),
        values = this.getValue(),
        minDistance = Infinity,
        ln = values.length,
        i, absDistance, testValue, closestIndex, oldValue, thumb;

        if (ln === 1) {
            closestIndex = 0;
        }
        else {
            for (i = 0; i < ln; i++) {
                testValue = values[i];
                absDistance = Math.abs(testValue - value);

                if (absDistance < minDistance) {
                    minDistance = absDistance;
                    closestIndex = i;
                }
            }
        }

        oldValue = values[closestIndex];
        thumb = this.getThumb(closestIndex);

        this.setIndexValue(closestIndex, value, this.getAnimation());
        this.refreshThumbConstraints(thumb);

        if (oldValue !== value) {
            this.fireEvent('change', this, thumb, value, oldValue);
        }
    },

    updateValue : function (newValue, oldValue) {
        var thumbs = this.getThumbs(),
        ln = newValue.length,
        minValue = this.getMinValue(),
        offset = this.offsetValueRatio,
        i;

        this.setThumbsCount(ln);

        for (i = 0; i < ln; i++) {
            thumbs[i].getDraggable().setExtraConstraint(null).setOffset((newValue[i] - minValue) * offset);
        }

        for (i = 0; i < ln; i++) {
            this.refreshThumbConstraints(thumbs[i]);
        }
    }
});

