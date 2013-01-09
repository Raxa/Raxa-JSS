Ext.define('SearchPatient.view.SearchPanel', {
    extend: 'Ext.Panel',
    requires: ['SearchPatient.store.Patients'],
    alias: 'widget.BillingSearchPatient',
    itemId: 'SearchPatient',
    title: 'Search a Patient',
    items:[
    {
        xtype: 'textfield',
        emptyText: 'Patient Name or ID',
        name:'patientName',
        itemId: 'patientNameSearch',
        enableKeyEvents: true,
        listeners: {
            'specialkey': function(field, e) {
                if(e.getKey() === KEY.ENTER) {
                    //getting sibling grid (shouldn't use id's here)
                    var searchGrid = this.up().down('grid');
                    if(!Ext.getCmp("searchLoadMask")){
                        var myMask = new Ext.LoadMask(searchGrid, {
                            msg:"Searching",
                            id:"searchLoadMask"
                        });
                    }
                    Ext.getCmp("searchLoadMask").show();
                    if (this.getValue() !== "") {
                        // setting up url with the query for given patient name
                        var Url = HOST + '/ws/rest/v1/patient?q=' + this.getValue() + "&v=full";
                        // setting up the proxy here because url is not fixed
                        searchGrid.getStore().setProxy({
                            type: 'rest',
                                url: Url,
                            headers: Util.getBasicAuthHeaders(),
                            reader: {
                                type: 'json',
                                root: 'results'
                            }
                        });
                        // makes the Get call for the patient list
                        searchGrid.getStore().load({
                            scope: this,
                            callback: function(records, operation, success){
                                if( records === null || records.length <= 0 ) {
                                    Ext.Msg.alert("Results" , "No Patient Found With The Given Name");
                                    this.setValue("");
                                }
                                if(success){
                                    Ext.getCmp("searchLoadMask").hide();
                                }
                                else{
                                    Ext.getCmp("searchLoadMask").hide();
                                    Ext.Msg.alert("Error", Util.getMessageLoadError());
                                }
                            }
                        });
                    }
                }
            }
        }
    },
    {
        xtype: 'gridpanel',
        itemId: 'patientSearchGrid',
        border: true,
        height: 300,
            title: 'Search Results',
        store: Ext.create('SearchPatient.store.Patients'),
        columns: [
        {
            xtype: 'gridcolumn',
            width: 100,
            text: 'Patient Name',
            dataIndex : 'name'
        },
        {
            xtype: 'gridcolumn',
            width: 75,
            dataIndex: 'identifier',
            text: 'ID'
        }
        ],
//        listeners: {
//            select: function(grid, record, row) {
//                console.log(grid);
//                console.log(record);
//                console.log(row);
//            }
//        }
    }]
});