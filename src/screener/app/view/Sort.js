/* 
 * This overlay allows the user to choose whether
 * to sort by name or FIFO id
 */

Ext.define("RaxaEMR.Screener.view.Sort", {
	requires: [ 'Ext.field.Text',
	            'Ext.field.Number'],
	            extend: 'Ext.Panel',
	            xtype: 'sortPanel',
	            config: {
	            	centered: true,
	            	//grey everything else out when open, otherwise keep hidden
	            	modal: true,
	            	hideOnMaskTap: true,
	            	hidden: true,
	            	padding: 30,
	            			items: [
	            			        {
	            			        	xtype: 'button',
	            			        	id: 'sortByBMIButton',
	            			        	text: 'Sort by BMI',
	            			        	ui:'round',

	            			        },
	            			        {
	            			        	xtype: 'button',
	            			        	id: 'sortByFIFOButton',
	            			        	text: 'Sort by FIFO',
	            			        	ui:'round',

	            			        },
	            			        ]
	            },
	            saveForm: function(){
	            	return this.getValues();
	            }

});
