Ext.define('Med-Table.store.MorningMedicines',{
    extend:'Ext.data.Store',
    config:{
        model:'Med-Table.model.Medicine',
        data:[
            {
                name:'tab1',
                icon:'resources/images/t1.gif',
                dose:'1 Tablet'
            },
            {
                name:'tab2',
                icon:'resources/images/t2.jpg',
                dose:'1/2 Tablet'
            }
        ]
    }
})


