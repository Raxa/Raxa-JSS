describe("Bmi", function () {

    var mainController = null;
    beforeEach(function () {
        if (!mainController) {
            mainController = Application.getController('Main');
        }
    });

    /////////////////////////////////
    // UI Verifications
    /////////////////////////////////
    // Page navigation
    it("Can navigate back to previous page", function () {
        // expect(false).toBeTruthy();
    });

    // Patient ID
    it("Displays correct patient ID at top of the screen", function () {
        // expect(false).toBeTruthy();
    });

    // BMI warning messages
    it("Displays low BMI warning if bmi <= LOW_BMI", function () {
        var height = 166;
        var weight = 30;
        var expectedStatus = 'Underweight';
        var returnedtatus = mainController.calculateBmi(weight, height).status;
        expect(returnedtatus).toEqual(expectedStatus);
    });

    it("Displays no BMI warning if LOW_BMI < bmi < HIGH_BMI", function () {
        var height = 166;
        var weight = 65;
        var expectedStatus = 'Normal';
        var returnedtatus = mainController.calculateBmi(weight, height).status;
        expect(returnedtatus).toEqual(expectedStatus);
    });

    it("Displays high BMI warning if bmi >= HIGH_BMI", function () {
        var height = 166;
        var weight = 75;
        var expectedStatus = 'Overweight';
        var returnedtatus = mainController.calculateBmi(weight, height).status;
        expect(returnedtatus).toEqual(expectedStatus);
    });

    it("Throws an error if BMI is out of bounds", function () {
        var height = 166;
        var weight = 500;
        var statusError = 'Height & weight combination is illegal. Please check the values';
        expect(mainController.calculateBmi(weight, height).status).toEqual(statusError);
    });

    it("Displays error if entered height & weight is zero", function () {
        var height = 0;
        var weight = 0;
        var expectedStatus = 'Height & Weight cant be zero. Please check the entered values';
        var returnedtatus = mainController.calculateBmi(weight, height).status;
        expect(returnedtatus).toEqual(expectedStatus);
    });

    it("Displays error if entered weight is zero", function () {
        var height = 166;
        var weight = 0;
        var expectedStatus = 'Weight cant be zero. Please check the entered value';
        var returnedtatus = mainController.calculateBmi(weight, height).status;
        expect(returnedtatus).toEqual(expectedStatus);
    });

    it("Displays error if entered height is zero", function () {
        var height = 0;
        var weight = 45;
        var expectedStatus = 'Height cant be zero. Please check the entered value';
        var returnedtatus = mainController.calculateBmi(weight, height).status;
        expect(returnedtatus).toEqual(expectedStatus);
    });


    it("Can input a value into the weight box", function () {
        // expect(false).toBeTruthy();
    });

    it("Can input a value into the height box", function () {
        // expect(false).toBeTruthy();
    });

    it("Can update the BMI value after pressing 'calculate BMI' button", function () {
        // TODO: Do we even need this button? Should auto-update
        // expect(false).toBeTruthy();
    });

    it("Verify that pressing submit button navigates to X page", function () {
        // expect(false).toBeTruthy();
    });

    /////////////////////////////////
    // Functionality Verifications
    /////////////////////////////////
    // Verify that BMI calculator works
    it("if height = 166 and weight = 30, then BMI = 10.89", function () {
        var height = 166;
        var weight = 30;
        var expectedBmi = 10.89;
        var calculatedBmi = mainController.calculateBmi(weight, height); //.bmi_rounded;
        expect(calculatedBmi.bmi_rounded).toEqual(expectedBmi);
    });


    it("Verify that pressing submit button causes patient object to get updated BMI", function () {
        /*expect(false).toBeTruthy();*/
    });

    // Verify Rest calls are correctly formatted and return expected response
    it("Verify that pressing submit button makes (?) Rest Call", function () {
        /*expect(false).toBeTruthy();*/
    });

});
