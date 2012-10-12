/* store for search patient model */
Ext.define('Registration.store.search', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.searchPatient',
    // the listener was required because store don't load the patient list directly if any of the fields in model
    // is/are null
    listeners: {
        load: {
            fn: function (records, options, success) {
                if(success){
                    var Data = this.getProxy().reader.jsonData.results;
                    this.removeAll();
                    // data in the store is fetched from proxy.reader.jsondata using "for" loop so that fields with null value
                    // can be seen in store data
                    for (var i = 0; i < Data.length; i++) {
                        var temp = Ext.create('Registration.model.searchPatient', {
                            id: i + 1,
                            uuid: Data[i].uuid,
                            birthdate: Data[i].person.birthdate,
                            gender: Data[i].person.gender,
                            age: Data[i].person.age,
                            givenName: Data[i].person.preferredName.givenName,
                            familyName: Data[i].person.preferredName.familyName,
                            identifier: Data[i].identifiers[0].identifier,
                            attributes: Data[i].person.attributes
                        })
                        if (Data[i].person.birthdate == null) temp.data.birthdate = "-"

                        if (Data[i].person.preferredAddress) 
                        {
                        if(Data[i].person.preferredAddress.state)
	                        temp.data.address1 = Data[i].person.preferredAddress.address1
	                        temp.data.address2 = Data[i].person.preferredAddress.address2
	                        temp.data.cityVillage = Data[i].person.preferredAddress.cityVillage
							temp.data.postalCode = Data[i].person.preferredAddress.postalCode
	                        temp.data.stateProvince = Data[i].person.preferredAddress.stateProvince
						}
                        for(var j=0; j<Data[i].person.attributes.length; j++){
                            if(Data[i].person.attributes[j].display.indexOf("Old Patient") !== -1){
                                temp.data.oldPatientIdentifier = Data[i].person.attributes[j].value;
                            }
                        }
                        this.add(temp)
                    }
                }
            }
        }
    }
});
