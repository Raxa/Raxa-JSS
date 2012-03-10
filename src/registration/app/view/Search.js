Ext.define('RaxaEmr.Registration.view.Search', {
	extend: 'Ext.Container',
	xtype: 'searchpage',

	config: {
		title: 'Search',
		iconCls: 'star',
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
				clearIcon: true
			},
			{
				xtype: 'textfield',
				label: 'Last Name:',
				clearIcon: true
			},
			{
				xtype: 'textfield',
				label: 'Father/Husband First Name:',
				clearIcon: true
			},
			{
				xtype: 'textfield',
				label: 'Father/Husband Last Name:',
				clearIcon: true
			},
			{
				xtype: 'datepickerfield',
				label: 'Date of Birth:',
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
				handler: function() {
					// Call search
					// Display search results
				}
            }]
		}]
	}
});
