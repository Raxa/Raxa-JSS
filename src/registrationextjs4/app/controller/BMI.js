Ext.define('Registration.controller.BMI', {
    extend: 'Ext.app.Controller',
    views: ['BMICalc', 'Home', 'RegistrationPart1', 'RegistrationPart2', 'ConfirmationScreen', 'Viewport'],
    controllers: ['BMI'],

    init: function () {
        console.log('BMI controller init');
        this.control({
            'BMICalculate #HtWtID textfield': {
                change: {
                    fn: this.getBMIData,
                    buffer: 100
                }
            }

        }, {
            'BMICalculate button[action=calc]': {
                click: {
                    fn: this.getBMIData
                }
            }
        })
    },

    //get values from Bmi Form and calls neccessary methods to calculate BMI & display on Screen
    getBMIData: function () {
        console.log('getBMIData() called');
        var height_cm = parseInt(Ext.getCmp('heightIDcm').getValue()); //Get Height value from Form
        var weight_kg = parseInt(Ext.getCmp('weightIDkg').getValue()); //Get Weight value from Form
        var bmiInfo = this.calculateBMI(height_cm, weight_kg);
        this.updateBMIDisplay(bmiInfo.status, bmiInfo.bmi_rounded, bmiInfo.bmi);
        Ext.getCmp('BMISliderID').setDisabled(true);
    },

    //function to calculate bmi 
    calculateBMI: function (height_cm, weight_kg) {
        console.log('calculateBMI() called');
        if (height_cm == 0 || weight_kg == 0) {
            bmi_rounded = 'Illegal';
            bmi = 'Illegal';
            if (height_cm == 0 && weight_kg == 0) {
                status = 'Height & Weight cant be Zero. Please check the entered Values';
            } else {
                if (weight_kg == 0) {
                    status = 'Weight cant be Zero. Please check the entered Value';
                }
                if (height_cm == 0) {
                    status = 'Height cant be Zero. Please check the entered value';
                }
            }
            return {
                status: status,
                bmi_rounded: bmi_rounded,
                bmi: bmi
            }
        } else {
            var height_m = height_cm / 100; //Convert cm in to m
            var bmi = (weight_kg) / (height_m * height_m); //BMI Calculation
            var bmi_rounded = Math.round(bmi * 100) / 100; //Rounded till 2 digits
            var status = '';

            if (bmi < WHO_BMI_VSUNDERWEIGHT) {
                status = 'Very Severely Underweight';
            }
            if (bmi >= WHO_BMI_VSUNDERWEIGHT && bmi < WHO_BMI_SUNDERWEIGHT) {
                status = 'Severely Underweight';
            }
            if (bmi >= WHO_BMI_SUNDERWEIGHT && bmi < WHO_BMI_UNDERWEIGHT) {
                status = 'Underweight';
            }
            if (bmi >= WHO_BMI_UNDERWEIGHT && bmi < WHO_BMI_NORMAL) {
                status = 'Normal';
            }
            if (bmi >= WHO_BMI_NORMAL && bmi < WHO_BMI_OVERWEIGHT) {
                status = 'Overweight';
            }
            if (bmi >= WHO_BMI_OVERWEIGHT && bmi < WHO_BMI_OBESE) {
                status = 'Obese';
            }
            if (bmi >= WHO_BMI_OBESE && bmi < WHO_BMI_SOBESE) {
                status = 'Severely Obese';
            }
            if (bmi >= WHO_BMI_SOBESE) {
                status = 'Very Severely Obese';
            }

            if (bmi_rounded > BMI_MAX || bmi_rounded < 0.00) {
                status = 'Height & Weight combination is Illegal! Please check the Values';
                bmi_rounded = 'Illegal';
                bmi = 'Illegal';
            }
            return {
                status: status,
                bmi_rounded: bmi_rounded,
                bmi: bmi
            };

        }
    },

    updateBMIDisplay: function (bmiStatusText, bmi_rounded, bmi) {
        Ext.getCmp('BMIStatusID').setValue(bmiStatusText);
        Ext.getCmp('BMITextFieldID').setValue(bmi_rounded); //BMI displayed to user
        Ext.getCmp('BMISliderID').setValue(bmi); //Slider set to calculated BMI
    }


});
