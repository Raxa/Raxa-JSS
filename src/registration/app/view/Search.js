Ext.define('RaxaEmr.Registration.view.Search', {
	extend: 'Ext.form.Panel',
	xtype: 'searchpage',
    id: 'searchPatientsForm',

	config: {
		title: 'Search',
		iconCls: 'search',
        styleHtmlContent: true,

		// List takes a store and a template
		items: [{
			xtype: 'fieldset',
			title: 'To find the patient information enter patient ID or any 3 of the 4 fields below',
			align: 'center',
			centered: true,
			items: [{
				xtype: 'textfield',
				label: 'Patient ID:',
				clearIcon: true
			},
			{
				xtype: 'textfield',
				label: 'First Name:',
                name: 'firstName',
				clearIcon: true
			},
			{
				xtype: 'textfield',
				label: 'Last Name:',
                name: 'lastName',
				clearIcon: true
			},
			{
				xtype: 'textfield',
				label: 'Father/Husband First Name:',
                name: 'guardianFirstName',
				clearIcon: true
			},
			{
				xtype: 'textfield',
				label: 'Father/Husband Last Name:',
                name: 'guardianLastName',
				clearIcon: true
			},
			{
				xtype: 'datepickerfield',
				label: 'Date of Birth:',
                name: 'dateOfBirth',
				value: new Date(),
				picker: {
					yearFrom: 1930
				},
				clearIcon: true
			},
			{
				xtype: 'textfield',
				label: 'Town/City/Village:',
				clearIcon: true
			},
			{
				xtype: 'textfield',
				label: 'Phone Number:',
				clearIcon: true
			},
			{
				xtype: 'button',
				text: 'Search',
                action: 'searchPatients'
            }]
		}]
	}
});
