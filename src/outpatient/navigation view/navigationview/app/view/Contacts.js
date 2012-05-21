Ext.define('AddressBook.view.Contacts', {
    extend: 'Ext.List',
    xtype: 'contacts',

    config: {
        title: 'Medical Records',
        cls: 'x-contacts',

        store: 'Contacts',
        itemTpl: [
            '<div class="headshot" style="background-image:url(resources/images/headshots/{headshot});"></div>',
			'<div style="float:left;width:30%;">',
				'{firstName}{lastName}',
				'<span>From : {city}, {state}</span>',
				'<span>ID : {id}</span>',
			'</div>',
			'<div style="float:left;width:30%;">',
				'<span>Disease : {disease}</span>',
				'<span>Age : {age}</span>',
			'</div>',
			'<div style="float:right;width:30%;">',
				'<span>{nameofdoc}</span>',
				'<span>Last Visit : {lastvisit}</span>',
				'<span>No. of Visits : {noofvisits}</span>',
			'</div>'
        ].join('')
    }
});
