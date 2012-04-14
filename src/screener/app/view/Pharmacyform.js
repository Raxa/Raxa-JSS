

Ext.define("Screener.view.Pharmacyform", {
	
      xtype:'pharmacyform',
extend: 'Ext.form.Panel',
requires: ['Ext.tab.Panel','Ext.form.FieldSet','Ext.form.Panel'],
	
config:{
     styleHtmlContent: true,
		
		autoscroll: true,


      items:[{
              xtype: 'fieldset',
              title: 'order',
		
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
			}

  
          ]
}]

}
	
});