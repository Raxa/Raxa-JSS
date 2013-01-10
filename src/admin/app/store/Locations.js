/**
 * Does the Get call for getting patient location
 */
Ext.define('RaxaEmr.Admin.store.Locations', {
    extend: 'Ext.data.Store',
    xtype: 'locationStore',
    config: {
        model: 'RaxaEmr.Admin.model.Location',
        proxy: {
            type: 'rest',
            headers: Util.getBasicAuthHeaders(),
            url: HOST + '/ws/rest/v1/location?v=full&limit=50',
            reader: {
                type: 'json',
                rootProperty: 'results'
            },
            writer: {
                type: 'json',
                rootProperty: 'results'
            }
        },
        autoLoad: true,
        listeners: {
            load: function() {
                var data = {
                    items : [ ]
                }
                locStore = Ext.getStore('Locations');        
                var topLocArray = [];
                var locLength = locStore.data.items.length;
                for(var loc = 0 ;loc < locLength; loc++) {
                    var parLoc = locStore.data.all[loc].data.parentLocation;
                    if(parLoc === null) {
                        var topLoc = locStore.data.all[loc]
                        topLocArray.push(topLoc);
                    }
                }
                for(var topLocation = 0 ; topLocation < topLocArray.length ; topLocation++) {
                    var childData = {
                        items:[]
                    };
                    var parLocDisplay = topLocArray[topLocation].data.name;
                    childData.text = parLocDisplay;
                    var parUuid = topLocArray[topLocation].data.uuid;
                    var parStore = Ext.getStore('Locations').findRecord('uuid',parUuid);
                    Ext.getStore('Locations').config.recursiveParentChild(parStore,data);
                }
                var store = Ext.getStore('ParChildLocation');
                store.setRoot(data);
            }
        },
    
        recursiveParentChild : function(childStore,childData) {
            console.log("inside recursiveParentChild");
            var subChildData = {
                items:[]
            };
            if(childStore.data.childLocations.length > 0) {
                subChildData.text = childStore.data.name;
                for(var subChild = 0 ; subChild < childStore.data.childLocations.length ; subChild++) {
                    var subChildStore = Ext.getStore('Locations').findRecord('uuid',childStore.data.childLocations[subChild].uuid);
                    Ext.getStore('Locations').config.recursiveParentChild(subChildStore,subChildData);
                }
                childData.items.push(subChildData);
                return childData;
            } 
            else {
                var parChildData = {
                    text : childStore.data.name,
                    leaf: true
                }
                childData.items.push(parChildData);
                return childData;
            }
        }
    }
});
