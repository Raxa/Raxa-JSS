Ext.regModel('Legislators', {
    idProperty: 'govtrack_id',
    fields: [
        // id's
        'govtrack_id',
        'bioguide_id',
        
        // basic info
        'title',
        'firstname',
        'middlename',
        'lastname',
        'birthdate',
        'gender',
        
        // district info
        'state',
        'district',
        
        // contact info
        'email',
        'fax',
        'phone'
    ]
});

Geo.stores.Legislators = new Ext.data.Store({
    model: 'Legislators'
});