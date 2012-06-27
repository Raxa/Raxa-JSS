Ext.define('Med-Table.store.AfternoonMedicines',{
    extend:'Ext.data.Store',
    config:{
        model:'Med-Table.model.Medicine',
        data:[
            {
                name:'tab3',
                icon:'resources/images/t3.jpg',
                dose:'1 Tablet'
            },
            {
                name:'tab4',
                icon:'resources/images/t4.gif',
                dose:'2 Tablet'
            }
        ]
    }
});


