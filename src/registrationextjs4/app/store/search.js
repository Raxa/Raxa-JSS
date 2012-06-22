// store for search patient model
Ext.define('Registration.store.search', {
    extend: 'Ext.data.Store',
    model: 'Registration.model.searchPatient',
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/patient?q=piyush&&v=full',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type: 'json',
            root: 'results'
        }
    },
    listeners: {
        load: {
            fn: function(){
                var Data = this.getProxy().reader.jsonData.results;
                var i
                this.removeAll();
                for(i=0;i<Data.length;i++){
                    var temp = Ext.create('Registration.model.searchPatient',{
                        id: i+1,
                        uuid: Data[i].uuid,
                        birthdate: Data[i].birthdate,
                        gender: Data[i].gender,
                        age: Data[i].age,
                        givenName: Data[i].preferredName.givenName,
                        familyName: Data[i].preferredName.familyName,
                        //   identifier: Data[i].identifers.identifier,
                        attributes : Data[i].attributes
                    })
                    if(Data[i].birthdate == null) temp.data.birthdate = 0
                    if(Data[i].preferredAddress != null)  temp.data.cityVillage = Data[i].preferredAddress.cityVillage;
                    else temp.data.cityVillage = null;
                    if(Data[i].preferredAddress != null) temp.data.address1= Data[i].preferredAddress.address1
                    if(Data[i].preferredAddress != null) temp.data.address2= Data[i].preferredAddress.address2
                    if(Data[i].preferredAddress != null) temp.data.postalCode= Data[i].preferredAddress.postalCode
                    this.add(temp)
                }
            }
        }
    }
});