Ext.define('Med-Table.store.NightMedicines', {
    extend:'Ext.data.Store',
    config:{
        model:'Med-Table.model.Medicine',
        data:[
            {
                name:'tab7',
                icon:'resources/images/t7.gif',
                dose:'1/2 Tablet'
            },
            {
                name:'tab8',
                icon:'resources/images/t8.png',
                dose:'1/2 Tablet'
            }
        ]
    }
});


