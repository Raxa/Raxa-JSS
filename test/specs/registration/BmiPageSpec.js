describe("Bmi", function() {

	var mainController = null;
	beforeEach(function() {
		if (!mainController) {
			mainController = Application.getController('Main');
		}
	});

	/////////////////////////////////
	// UI Verifications
	/////////////////////////////////
	// Page navigation
	it("Can navigate back to previous page", function() {
		/*expect(false).toBeTruthy();*/
	});

	// Patient ID
	it("Displays correct patient ID at top of the screen", function() {
		/*expect(false).toBeTruthy();*/
	});

	// BMI warning messages
	it("Displays low BMI warning if bmi <= LOW_BMI", function() {
		// TODO: Set BMI <= LOW_BMI
		//var LOW_BMI = 20;
		//expect(isBmiLow(LOW_BMI)).toBeTruthy();
		/*expect(false).toBeTruthy();*/
	});

	it("Displays no BMI warning if LOW_BMI < bmi < HIGH_BMI", function() {
		/*expect(false).toBeTruthy();*/
	});

	it("Displays high BMI warning if bmi >= HIGH_BMI", function() {
		/*expect(false).toBeTruthy();*/
	});

	it("Throws an error if BMI is out of bounds", function() {
		/*expect(false).toBeTruthy();*/
	});

	// Color
	// if bmi falls in range [x_1,x_2] -> color = green
	// if bmi falls in range [x_1,x_2] -> color = yellow
	// ...
	// if bmi falls in range [x_1,x_2] -> color = red
	// Inputs
	it("Can input a value into the weight box", function() {
		/*expect(false).toBeTruthy();*/
	});

	it("Can input a value into the height box", function() {
		/*expect(false).toBeTruthy();*/
	});

	it("Can update the BMI value after pressing 'calculate BMI' button", function() {
		// TODO: Do we even need this button? Should auto-update
		/*expect(false).toBeTruthy();*/
	});

	it("Verify that pressing submit button navigates to X page", function() {
		/*expect(false).toBeTruthy();*/
	});

	/////////////////////////////////
	// Functionality Verifications
	/////////////////////////////////
	// Verify that BMI calculator works
	it("if height = h_1 and weight = w_1, then BMI = bmi_1", function() {
		var height = 1;
		var weight = 2;
		var expectedBmi = 2;
		/*expect(calculateBmi(height, weight)).toEqual(expectedBmi);*/
	});

	// verify if height = h_2, weight = w_2, then BMI => BMI_2
	// ...
	// verify if height = h_n, weight = w_n, then BMI => BMI_n
	// Verify Patient object is kept up-to-date
	it("Verify that pressing submit button causes patient object to get updated BMI", function() {
		/*expect(false).toBeTruthy();*/
	});

	// Verify Rest calls are correctly formatted and return expected response
	it("Verify that pressing submit button makes (?) Rest Call", function() {
		/*expect(false).toBeTruthy();*/
	});

	// TODO: Remove this. This is just an example to show how to hook into a
	// controller
	it("Verify example function returns true", function() {
		expect(mainController.testFunction()).toBeTruthy();
	});
});

