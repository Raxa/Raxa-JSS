/**
 * @class Ext.chart.Navigation
 *
 * Handles panning and zooming capabilities.
 * 
 * Used as mixin by Ext.chart.Chart.
 */
Ext.define('Ext.chart.Navigation', {

    constructor: function() {
        this.originalStore = this.store;
    },
    
    /*
    * Zooms the chart to the specified selection range. 
    * Can be used with a selection mask. For example:
    *
    * 
        items: {
            xtype: 'chart',
            animate: true,
            store: store1,
            mask: 'horizontal',
            listeners: {
                select: {
                    fn: function(me, selection) {
                        me.setZoom(selection);
                        me.mask.hide();
                    }
                }
            }
    */
    setZoom: function(zoomConfig) {
        var me = this,
            store = me.substore || me.store,
            bbox = me.chartBBox,
            len = store.getCount(),
            from = (zoomConfig.x / bbox.width * len) >> 0,
            to = Math.ceil(((zoomConfig.x + zoomConfig.width) / bbox.width * len)),
            recFieldsLen, recFields = [], curField, json = [], obj;
        
        store.each(function(rec, i) {
            if (i < from || i > to) {
                return;
            }
            obj = {};
            //get all record field names in a simple array
            if (!recFields.length) {
                rec.fields.each(function(f) {
                    recFields.push(f.name);
                });
                recFieldsLen = recFields.length;
            }
            //append record values to an aggregation record
            for (i = 0; i < recFieldsLen; i++) {
                curField = recFields[i];
                obj[curField] = rec.get(curField);
            }
            json.push(obj);
        });
        me.store = me.substore = Ext.create('Ext.data.JsonStore', {
            fields: recFields,
            data: json
        });
        me.redraw(true);
    },

    /*
    * Restores the zoom to the original value. This can be used to reset 
    * the previous zoom state set by `setZoom`. For example:

        myChart.restoreZoom();

    */ 
    restoreZoom: function() {
        this.store = this.substore = this.originalStore;
        this.redraw(true);
    }
    
});
