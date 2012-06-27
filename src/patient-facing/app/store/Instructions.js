Ext.define('Med-Table.store.Instructions',{
    extend:'Ext.data.Store',
    config:{
        model:'Med-Table.model.Instruction',
        data:[
            {
                instruction:'wash hands',
                image:'resources/images/washhands_with tick-01.png'
            },
            {
                instruction:'no spice',
                image:'resources/images/nospice_with cross-01.png'
            },
            {
                instruction:'no ice cream',
                image:'resources/images/no icecream_with cross-01.png'
            },
            {
                instruction:'eat fruits',
                image:'resources/images/eatfruits_with tick-01.png'
            }
        ]
    }
});


