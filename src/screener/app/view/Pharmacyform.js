/*This screen shows a drug order form on the right side,
 * with a button to add addtionl medications and a submit button.   The left side shows patient
 * list
 */




Ext.define("Screener.view.Pharmacyform", {
	
      xtype: 'pharmacyform',
	    id:'pform',
extend: 'Ext.form.Panel',
requires: ['Ext.tab.Panel','Ext.form.FieldSet'],
	 
config:{
     styleHtmlContent: true,
		xtype:'orderform',
		autoscroll: true,
		layout:'vbox',


      items:[
	  {
      id:'new',
	  layout:'hbox',
	  items:[
	  {
		        		xtype: 'titlebar',
		        		docked: 'top',
		        		title: 'Pharmacy Orders'},{
              xtype: 'fieldset',
            
			  width:'300px',
		
	 items: [
        {
				xtype: 'selectfield',
				label: 'Drug',
				name: 'drug',
				options: [{
					text: 'Paracetamol',
					value: 'pa'
				},
				{
					text: 'Ciprofloxacin',
					value: 'ci'
				},
				{
					text: 'Celecoxib',
					value: 'ce'
				},{
					text: 'Fetch from database',
					value: 'db'
				}]
			},{
				xtype: 'selectfield',
				label: 'Strength',
				
				name: 'strength',
				options: [{
					text: '250 mg',
					value: '250'
				},{
					text: '500 mg',
					value: '500'
				},
				{
					text: '800 mg',
					value: '800'
				},
				{
					text: 'fetch from database',
					value: 'db'
				}]
			},{
				xtype: 'selectfield',
				label: 'Quantity',
				
				name: 'quantity',
				options: [{
					text: '1',
					value: '1'
				},
				{
					text: '2',
					value: '2'
				},
				{
					text: '3',
					value: '3'
				},{
					text: '4',
					value: '4'
				},{
					text: '5',
					value: '5'
				},{
					text: '10',
					value: '10'
				},{
					text: 'fetch from database',
					value: 'db'
				}]
			},{
				xtype: 'selectfield',
				label: 'Frequency',
				name: 'frequency',
				options: [{
					text: 'once a day',
					value: 'ond'
				},
				{
					text: 'twice a day',
					value: 'bd'
				},
				{
					text: 'thrice a day',
					value: 'tri'
				},{
					text: 'as required',
					value: 'req'
				},{
					text: 'fetch from database',
					value: 'db'
				}]
			},{
				xtype: 'selectfield',
				label: 'Duration',
				name: 'duration',
				options: [{
					text: 'one week',
					value: '1w'
				},
				{
					text: 'one month',
					value: '1m'
				},
				{
					text: 'two months',
					value: '2m'
				},{
					text: 'fetch from database',
					value: 'db'
				}]
			}
			

  
          ]
},{xtype:'button',
ui:'round',
text:'+',
id:'addDrugformButton',
height: '40px',


width:'100px'


},{xtype:'spacer',height:20},{xtype:'button',
ui:'confirm',
id:'drugSubmitButton',

height: '40px',
text:'submit',

width:'200px'
}]}
]

}
	
});