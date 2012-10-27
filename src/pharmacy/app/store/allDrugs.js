Ext.define('RaxaEmr.Pharmacy.store.allDrugs', {
    extend: 'Ext.data.Store',
    id: 'allDrugs',
    fields: [{name: 'text', type: 'string', mapping: 'name'},
        {name: 'uuid', type: 'string', mapping: 'uuid'},
        {name: 'dosageForm', type: 'string'}],
    autoLoad: true,
    autoSync: false,
    proxy: {
        type: 'rest',
        url: HOST + '/ws/rest/v1/raxacore/drug?v=full&limit=300',
        headers: Util.getBasicAuthHeaders(),
        reader: {
            type:'json',
            root: 'results'
        }
    },
    listeners: {
        load: function() {
            for(var i=0; i<this.data.items.length; i++){
                var item = this.data.items[i];
                var drugNameWithPrefix="";
                if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.TABLET)!==-1){
                    drugNameWithPrefix = "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.TABLET+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.SYRUP)!==-1){
                    drugNameWithPrefix = "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.SYRUP+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.OINTMENT)!==-1){
                    drugNameWithPrefix = "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.OINTMENT+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.INJECTION)!==-1){
                    drugNameWithPrefix = "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.INJECTION+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.CREAM)!==-1){
                    drugNameWithPrefix = "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.CREAM+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.CAPSULE)!==-1){
                    drugNameWithPrefix = "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_PREFIX.CAPSULE+") ";
                }
                item.set("text", drugNameWithPrefix+item.data.text);
            }
        }
    }
});