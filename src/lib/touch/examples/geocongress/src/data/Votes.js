Ext.regModel('Votes', {
    fields: ['date','description','result','link']
});

Geo.stores.Votes = new Ext.data.Store({
    model: 'Votes',
    //sorters: 'date',
    getGroupString : function(record) {
        return record.get('date');
    },
    
    loadData: function(data) {        
        Ext.data.Store.prototype.loadData.call(this, data);
        
        this.filter({
            fn: function(r) {
                return r.get('description').indexOf('On Passage') !== -1;
            }
        });
    }
});