/* store for search patient model */
Ext.define('Registration.store.search', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.searchPatient',
    // the listener was required because store don't load the patient list directly if any of the fields in model
    // is/are null
    listeners: {
        load: {
            fn: function () {
                var Data = this.getProxy().reader.jsonData.results;
                this.removeAll();
                // data in the store is fetched from proxy.reader.jsondata using "for" loop so that fields with null value
                // can be seen in store data
                for (var i = 0; i < Data.length; i++) {
                    var temp = Ext.create('Registration.model.searchPatient', {
                        id: i + 1,
                        uuid: Data[i].uuid,
                        birthdate: Data[i].birthdate,
                        gender: Data[i].gender,
                        age: Data[i].age,
                        givenName: Data[i].person.preferredName.givenName,
                        familyName: Data[i].person.preferredName.familyName,
                        //  we dont get identifiers in patient search GET call so for now its commented
                        // identifier: Data[i].identifers.identifier,
                        attributes: Data[i].person.attributes
                    })
                    if (Data[i].person.birthdate == null) temp.data.birthdate = 0
                    if (Data[i].person.preferredAddress != null) temp.data.cityVillage = Data[i].person.preferredAddress.cityVillage;
                    else temp.data.cityVillage = null;
                    if (Data[i].person.preferredAddress != null) temp.data.address1 = Data[i].person.preferredAddress.address1
                    if (Data[i].person.preferredAddress != null) temp.data.address2 = Data[i].person.preferredAddress.address2
                    if (Data[i].person.preferredAddress != null) temp.data.postalCode = Data[i].person.preferredAddress.postalCode
                    for(var j=0; j<Data[i].person.attributes.length; j++){
                        if(Data[i].person.attributes[j].display.indexOf("Old Patient") !== -1){
                            temp.data.oldPatientIdentifier = Data[i].person.attributes[j].value;
                        }
                    }
                    this.add(temp)
                }
                console.log(this);
            }
        }
    }
});
