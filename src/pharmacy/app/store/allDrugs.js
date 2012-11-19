Ext.define('RaxaEmr.Pharmacy.store.allDrugs', {
    extend: 'Ext.data.Store',
    id: 'allDrugs',
    model: 'RaxaEmr.Pharmacy.model.Drug',
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
                var drugNameWithSuffix="";
//                if(item.data.strength !== null && item.data.units !== null){
//                    drugNameWithSuffix = " "+item.data.strength+item.data.unts;
//                }
                if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.TABLET)!==-1){
                    drugNameWithSuffix += "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.TABLET+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.SYRUP)!==-1){
                    drugNameWithSuffix += "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.SYRUP+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.OINTMENT)!==-1){
                    drugNameWithSuffix += "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.OINTMENT+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.INJECTION)!==-1){
                    drugNameWithSuffix += "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.INJECTION+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.CREAM)!==-1){
                    drugNameWithSuffix += "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.CREAM+") ";
                }
                else if(item.data.dosageForm.toLowerCase().indexOf(RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.CAPSULE)!==-1){
                    drugNameWithSuffix += "("+RaxaEmr_Pharmacy_Controller_Vars.DOSAGE_FORM_SUFFIX.CAPSULE+") ";
                }
                item.set("text", item.data.name+drugNameWithSuffix);
            }
        }
    }
});