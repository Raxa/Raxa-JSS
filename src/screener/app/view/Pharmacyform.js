

Ext.define("Screener.view.Pharmacyform", {
	
      xtype: 'pharmacyform',
extend: 'Ext.form.Panel',
requires: ['Ext.tab.Panel','Ext.form.FieldSet'],
	
config:{
     styleHtmlContent: true,
		xtype:'orderform',
		autoscroll: true,


      items:[{
              xtype: 'fieldset',
              title: 'Pharmacy Order',
		
	 items: [
        {
            xtype: 'textfield',
            name : 'name2',
            label: 'Name'
        },{
            xtype: 'textfield',
            name : 'name3',
            label: 'Name'
        },{
            xtype: 'textfield',
            name : 'name',
            label: 'Name'
        },{
				xtype: 'selectfield',
				label: 'Drug',
				name: 'drug',
				options: [{
					text: 'A',
					value: 'a'
				},
				{
					text: 'B',
					value: 'b'
				},
				{
					text: 'C',
					value: 'c'
				}]
			},
			{xtype: 'combobox',
fieldLabel: 'Combobox',

store: Ext.create('Screener.store.Drugs',{
		        		storeId: 'drugorder'

		        	}),
					displayField: 'drugname',
valueField: 'drugname',
queryMode: 'local',
typeAhead: true
    }

  
          ]
}]

}
	
});