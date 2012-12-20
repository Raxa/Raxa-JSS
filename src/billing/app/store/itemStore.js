Ext.define('RaxaEmr.billing.store.itemStore', {
	extend: 'Ext.data.Store',
	fields: ['item_name', 'category', 'quantity', 'price', 'discount', 'discountReason', 'total'],
	groupField: 'category',
	autoLoad: false,
	autoSync: true,
	proxy: {
		type: 'localstorage'
	}
});