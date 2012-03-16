Ext.data.TreeReader = Ext.extend(Ext.data.JsonReader, {
    extractData : function(root, returnRecords) {
        var records = Ext.data.TreeReader.superclass.extractData.call(this, root, returnRecords),
            ln = records.length,
            i  = 0,
            record;

        if (returnRecords) {
            for (; i < ln; i++) {
                record = records[i];
                record.doPreload = !!this.getRoot(record.raw);
            }
        }
        return records;
    }
});
Ext.data.ReaderMgr.registerType('tree', Ext.data.TreeReader);