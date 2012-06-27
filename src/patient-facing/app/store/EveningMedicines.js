Ext.define('Med-Table.store.EveningMedicines',{
    extend:'Ext.data.Store',
    config:{
        model:'Med-Table.model.Medicine',
        data:[
            {
                name:'tab5',
                icon:'resources/images/t5.gif',
                dose:'1/2 Tablet'
            },
            {
                name:'tab6',
                icon:'resources/images/t6.gif',
                dose:'1/2 Tablet'
            }
        ]
    }
})


