/**
 * @class Ext.DataView
 * @extends Ext.Component
 * A mechanism for displaying data using custom layout templates and formatting. DataView uses an {@link Ext.XTemplate}
 * as its internal templating mechanism, and is bound to an {@link Ext.data.Store}
 * so that as the data in the store changes the view is automatically updated to reflect the changes.  The view also
 * provides built-in behavior for many common events that can occur for its contained items including click, doubleclick,
 * mouseover, mouseout, etc. as well as a built-in selection model. <b>In order to use these features, an {@link #itemSelector}
 * config must be provided for the DataView to determine what nodes it will be working with.</b>
 *
 * <p>The example below binds a DataView to a {@link Ext.data.Store} and renders it into an {@link Ext.Panel}.</p>
 * <pre><code>
var store = new Ext.data.JsonStore({
    url: 'get-images.php',
    root: 'images',
    fields: [
        'name', 'url',
        {name:'size', type: 'float'},
        {name:'lastmod', type:'date', dateFormat:'timestamp'}
    ]
});
store.load();

var tpl = new Ext.XTemplate(
    '&lt;tpl for="."&gt;',
        '&lt;div class="thumb-wrap" id="{name}"&gt;',
        '&lt;div class="thumb"&gt;&lt;img src="{url}" title="{name}"&gt;&lt;/div&gt;',
        '&lt;span class="x-editable"&gt;{shortName}&lt;/span&gt;&lt;/div&gt;',
    '&lt;/tpl&gt;',
    '&lt;div class="x-clear"&gt;&lt;/div&gt;'
);

var panel = new Ext.Panel({
    id:'images-view',
    frame:true,
    width:535,
    autoHeight:true,
    collapsible:true,
    layout:'fit',
    title:'Simple DataView',

    items: new Ext.DataView({
        store: store,
        tpl: tpl,
        autoHeight:true,
        multiSelect: true,
        overCls:'x-view-over',
        itemSelector:'div.thumb-wrap',
        emptyText: 'No images to display'
    })
});
panel.render(document.body);
</code></pre>
 * @constructor
 * Create a new DataView
 * @param {Object} config The config object
 * @xtype dataview
 */
// dataview will extend from DataPanel/BoundPanel
Ext.DataView = Ext.extend(Ext.Component, {
    /**
     * @cfg {String/Array} tpl
     * @required
     * The HTML fragment or an array of fragments that will make up the template used by this DataView.  This should
     * be specified in the same format expected by the constructor of {@link Ext.XTemplate}.
     */
    /**
     * @cfg {Ext.data.Store} store
     * @required
     * The {@link Ext.data.Store} to bind this DataView to.
     */

    /**
     * @cfg {String} itemSelector
     * @required
     * <b>This is a required setting</b>. A simple CSS selector (e.g. <tt>div.some-class</tt> or
     * <tt>span:first-child</tt>) that will be used to determine what nodes this DataView will be
     * working with.
     */
    

    /**
     * @cfg {String} overItemCls
     * A CSS class to apply to each item in the view on mouseover (defaults to undefined).
     */

    /**
     * @cfg {String} loadingText
     * A string to display during data load operations (defaults to undefined).  If specified, this text will be
     * displayed in a loading div and the view's contents will be cleared while loading, otherwise the view's
     * contents will continue to display normally until the new data is loaded and the contents are replaced.
     */
    loadingText: 'Loading...',

    /**
     * @cfg {String} selectedItemCls
     * A CSS class to apply to each selected item in the view (defaults to 'x-view-selected').
     */
    selectedItemCls: "x-item-selected",

    /**
     * @cfg {String} emptyText
     * The text to display in the view when there is no data to display (defaults to '').
     */
    emptyText: "",

    /**
     * @cfg {Boolean} deferEmptyText True to defer emptyText being applied until the store's first load
     */
    deferEmptyText: true,

    /**
     * @cfg {Boolean} trackOver True to enable mouseenter and mouseleave events
     */
    trackOver: false,

    /**
     * @cfg {Boolean} blockRefresh Set this to true to ignore datachanged events on the bound store. This is useful if
     * you wish to provide custom transition animations via a plugin (defaults to false)
     */
    blockRefresh: false,

    /**
     * @cfg {Boolean} disableSelection <p><tt>true</tt> to disable selection within the DataView. Defaults to <tt>false</tt>.
     * This configuration will lock the selection model that the DataView uses.</p>
     */


    //private
    last: false,
    
    triggerEvent: 'click',
    triggerCtEvent: 'containerclick',
    
    addCmpEvents: function() {
        
    },

    // private
    initComponent : function(){
        //<debug>
        var isDef = Ext.isDefined;
        if (!isDef(this.tpl) || !isDef(this.store) || !isDef(this.itemSelector)) {
            throw "DataView requires tpl, store and itemSelector configurations to be defined.";
        }
        //</debug>

        Ext.DataView.superclass.initComponent.call(this);
        if(Ext.isString(this.tpl) || Ext.isArray(this.tpl)){
            this.tpl = new Ext.XTemplate(this.tpl);
        }

        // backwards compat alias for overClass/selectedClass
        // TODO: Consider support for overCls generation Ext.Component config
        if (Ext.isDefined(this.overCls) || Ext.isDefined(this.overClass)) {
            this.overItemCls = this.overCls || this.overClass;
            delete this.overCls;
            delete this.overClass;
            //<debug>
            throw "Using the deprecated overCls or overClass configuration. Use overItemCls.";
            //</debug>
        }

        if (Ext.isDefined(this.selectedCls) || Ext.isDefined(this.selectedClass)) {
            this.selectedItemCls = this.selectedCls || this.selectedClass;
            delete this.selectedCls;
            delete this.selectedClass;
            //<debug>
            throw "Using the deprecated selectedCls or selectedClass configuration. Use selectedItemCls.";
            //</debug>
        }
        
        this.addEvents(
            /**
             * @event beforerefresh
             * Fires before the view is refreshed
             * @param {Ext.DataView} this The DataView object
             */
            'beforerefresh',
            /**
             * @event refresh
             * Fires when the view is refreshed
             * @param {Ext.DataView} this The DataView object
             */
            'refresh'
        );
        
        this.addCmpEvents();

        this.store = Ext.StoreMgr.lookup(this.store)
        this.all = new Ext.CompositeElementLite();
        this.getSelectionModel().bindComponent(this);
    },
    
    onRender : function() {
        Ext.DataView.superclass.onRender.apply(this, arguments);
        if (this.loadingText) {
            this.loadMask = new Ext.LoadMask(this.el, {
                msg: this.loadingText
            });
        }
    },

    getSelectionModel: function(){
        if (!this.selModel) {
            this.selModel = {};
        }

        var mode;
        switch(true) {
            case this.simpleSelect:
                mode = 'SIMPLE';
            break;
            
            case this.multiSelect:
                mode = 'MULTI';
            break;
            
            case this.singleSelect:
            default:
                mode = 'SINGLE';
            break;
        }
        
        Ext.applyIf(this.selModel, {
            allowDeselect: this.allowDeselect,
            mode: mode
        });        
        
        if (!this.selModel.events) {
            this.selModel = new Ext.DataViewSelectionModel(this.selModel);
        }
        
        if (!this.selModel.hasRelaySetup) {
            this.relayEvents(this.selModel, ['selectionchange', 'select', 'deselect']);
            this.selModel.hasRelaySetup = true;
        }

        // lock the selection model if user
        // has disabled selection
        if (this.disableSelection) {
            this.selModel.locked = true;
        }
        
        return this.selModel;
    },

    /**
     * Refreshes the view by reloading the data from the store and re-rendering the template.
     */
    refresh: function() {
        if (!this.rendered) {
            return;
        }
        
        this.fireEvent('beforerefresh', this);
        var el = this.getTargetEl(),
            records = this.store.getRange();

        el.update('');
        if (records.length < 1) {
            if (!this.deferEmptyText || this.hasSkippedEmptyText) {
                el.update(this.emptyText);
            }
            this.all.clear();
        } else {
            this.tpl.overwrite(el, this.collectData(records, 0));
            this.all.fill(Ext.query(this.itemSelector, el.dom));
            this.updateIndexes(0);
        }
        this.hasSkippedEmptyText = true;
        this.fireEvent('refresh', this);
    },

    /**
     * Function which can be overridden to provide custom formatting for each Record that is used by this
     * DataView's {@link #tpl template} to render each node.
     * @param {Array/Object} data The raw data object that was used to create the Record.
     * @param {Number} recordIndex the index number of the Record being prepared for rendering.
     * @param {Record} record The Record being prepared for rendering.
     * @return {Array/Object} The formatted data in a format expected by the internal {@link #tpl template}'s overwrite() method.
     * (either an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'}))
     */
    prepareData: function(data, index, record) {
        if (record) {    
            Ext.apply(data, this.prepareAssociatedData(record));            
        }
        return data;
    },
    
    /**
     * @private
     * This complex-looking method takes a given Model instance and returns an object containing all data from
     * all of that Model's *loaded* associations. It does this recursively - for example if we have a User which
     * hasMany Orders, and each Order hasMany OrderItems, it will return an object like this:
     * 
     * {
     *     orders: [
     *         {
     *             id: 123,
     *             status: 'shipped',
     *             orderItems: [
     *                 ...
     *             ]
     *         }
     *     ]
     * }
     * 
     * This makes it easy to iterate over loaded associations in a DataView.
     * 
     * @param {Ext.data.Model} record The Model instance
     * @param {Array} ids PRIVATE. The set of Model instance internalIds that have already been loaded
     * @return {Object} The nested data set for the Model's loaded associations
     */
    prepareAssociatedData: function(record, ids) {
        //we keep track of all of the internalIds of the models that we have loaded so far in here
        ids = ids || [];
        
        var associations     = record.associations.items,
            associationCount = associations.length,
            associationData  = {},
            associatedStore, associatedName, associatedRecords, associatedRecord,
            associatedRecordCount, association, internalId, i, j;
        
        for (i = 0; i < associationCount; i++) {
            association = associations[i];
            
            //this is the hasMany store filled with the associated data
            associatedStore = record[association.storeName];
            
            //we will use this to contain each associated record's data
            associationData[association.name] = [];
            
            //if it's loaded, put it into the association data
            if (associatedStore && associatedStore.data.length > 0) {
                associatedRecords = associatedStore.data.items;
                associatedRecordCount = associatedRecords.length;
            
                //now we're finally iterating over the records in the association. We do this recursively
                for (j = 0; j < associatedRecordCount; j++) {
                    associatedRecord = associatedRecords[j];
                    internalId = associatedRecord.internalId;
                    
                    //when we load the associations for a specific model instance we add it to the set of loaded ids so that
                    //we don't load it twice. If we don't do this, we can fall into endless recursive loading failures.
                    if (ids.indexOf(internalId) == -1) {
                        ids.push(internalId);
                        
                        associationData[association.name][j] = associatedRecord.data;
                        Ext.apply(associationData[association.name][j], this.prepareAssociatedData(associatedRecord, ids));
                    }
                }
            }
        }
        
        return associationData;
    },

    /**
     * <p>Function which can be overridden which returns the data object passed to this
     * DataView's {@link #tpl template} to render the whole DataView.</p>
     * <p>This is usually an Array of data objects, each element of which is processed by an
     * {@link Ext.XTemplate XTemplate} which uses <tt>'&lt;tpl for="."&gt;'</tt> to iterate over its supplied
     * data object as an Array. However, <i>named</i> properties may be placed into the data object to
     * provide non-repeating data such as headings, totals etc.</p>
     * @param {Array} records An Array of {@link Ext.data.Model}s to be rendered into the DataView.
     * @param {Number} startIndex the index number of the Record being prepared for rendering.
     * @return {Array} An Array of data objects to be processed by a repeating XTemplate. May also
     * contain <i>named</i> properties.
     */
    collectData : function(records, startIndex){
        var r = [],
            i = 0,
            len = records.length;

        for(; i < len; i++){
            r[r.length] = this.prepareData(records[i].data, startIndex + i, records[i]);
        }

        return r;
    },

    // private
    bufferRender : function(records, index){
        var div = document.createElement('div');
        this.tpl.overwrite(div, this.collectData(records, index));
        return Ext.query(this.itemSelector, div);
    },

    // private
    onUpdate : function(ds, record){
        var index = this.store.indexOf(record),
            original,
            node;

        if (index > -1){
            original = this.all.elements[index];
            node = this.bufferRender([record], index)[0];

            this.all.replaceElement(index, node, true);
            this.updateIndexes(index, index);

            // Maintain selection after update
            // TODO: Move to approriate event handler.
            this.selModel.refresh();
        }
    },

    // private
    onAdd : function(ds, records, index){
        if (this.all.getCount() === 0) {
            this.refresh();
            return;
        }

        var nodes = this.bufferRender(records, index), n, a = this.all.elements;
        if (index < this.all.getCount()) {
            n = this.all.item(index).insertSibling(nodes, 'before', true);
            a.splice.apply(a, [index, 0].concat(nodes));
        } else {
            n = this.all.last().insertSibling(nodes, 'after', true);
            a.push.apply(a, nodes);
        }
        this.updateIndexes(index);
    },

    // private
    onRemove : function(ds, record, index){
        this.all.removeElement(index, true);
        this.updateIndexes(index);
        if (this.store.getCount() === 0){
            this.refresh();
        }
    },

    /**
     * Refreshes an individual node's data from the store.
     * @param {Number} index The item's data index in the store
     */
    refreshNode : function(index){
        this.onUpdate(this.store, this.store.getAt(index));
    },

    // private
    updateIndexes : function(startIndex, endIndex){
        var ns = this.all.elements;
        startIndex = startIndex || 0;
        endIndex = endIndex || ((endIndex === 0) ? 0 : (ns.length - 1));
        for(var i = startIndex; i <= endIndex; i++){
            ns[i].viewIndex = i;
        }
    },

    /**
     * Returns the store associated with this DataView.
     * @return {Ext.data.Store} The store
     */
    getStore : function(){
        return this.store;
    },

    /**
     * Changes the data store bound to this view and refreshes it.
     * @param {Store} store The store to bind to this view
     */
    bindStore : function(store, initial) {
        if (!initial && this.store) {
            if (store !== this.store && this.store.autoDestroy) {
                this.store.destroy();
            } 
            else {
                this.mun(this.store, {
                    scope: this,
                    beforeload: this.onBeforeLoad,
                    datachanged: this.onDataChanged,
                    add: this.onAdd,
                    remove: this.onRemove,
                    update: this.onUpdate,
                    clear: this.refresh                    
                });
            }
            if (!store) {
                if (this.loadMask) {
                    this.loadMask.bindStore(null);
                }
                this.store = null;
            }
        }
        if (store) {
            store = Ext.StoreMgr.lookup(store);
            this.mon(store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                datachanged: this.onDataChanged,
                add: this.onAdd,
                remove: this.onRemove,
                update: this.onUpdate,
                clear: this.refresh                    
            });
            if (this.loadMask) {
                this.loadMask.bindStore(store);
            }
        }
        
        this.store = store;
        // Bind the store to our selection model
        this.getSelectionModel().bind(store);
        
        if (store) {
            this.refresh();
        }
    },

    /**
     * @private
     * Calls this.refresh if this.blockRefresh is not true
     */
    onDataChanged: function() {
        if (this.blockRefresh !== true) {
            this.refresh.apply(this, arguments);
        }
    },

    /**
     * Returns the template node the passed child belongs to, or null if it doesn't belong to one.
     * @param {HTMLElement} node
     * @return {HTMLElement} The template node
     */
    findItemByChild: function(node){
        return Ext.fly(node).findParent(this.itemSelector, this.getTargetEl());
    },
    
    /**
     * Returns the template node by the Ext.EventObject or null if it is not found.
     * @param {Ext.EventObject} e
     */
    findTargetByEvent: function(e) {
        return e.getTarget(this.itemSelector, this.getTargetEl());
    },


    /**
     * Gets the currently selected nodes.
     * @return {Array} An array of HTMLElements
     */
    getSelectedNodes: function(){
        var nodes   = [],
            records = this.selModel.getSelection(),
            ln = records.length,
            i  = 0;

        for (; i < ln; i++) {
            nodes.push(this.getNode(records[i]));
        }

        return nodes;
    },

    /**
     * Gets an array of the records from an array of nodes
     * @param {Array} nodes The nodes to evaluate
     * @return {Array} records The {@link Ext.data.Model} objects
     */
    getRecords: function(nodes) {
        var records = [],
            i = 0,
            len = nodes.length;

        for (; i < len; i++) {
            records[records.length] = this.store.getAt(nodes[i].viewIndex);
        }

        return r;
    },

    /**
     * Gets a record from a node
     * @param {HTMLElement} node The node to evaluate
     * @return {Record} record The {@link Ext.data.Model} object
     */
    getRecord: function(node){
        return this.store.getAt(node.viewIndex);
    },

    /**
     * Returns true if the passed node is selected, else false.
     * @param {HTMLElement/Number/Ext.data.Model} node The node, node index or record to check
     * @return {Boolean} True if selected, else false
     */
    isSelected : function(node) {
        // TODO: El/Idx/Record
        var r = this.getRecord(node);
        return this.selModel.isSelected(r);
    },
    
    /**
     * Selects a record instance by record instance or index.
     * @param {Ext.data.Record/Index} records An array of records or an index
     * @param {Boolean} keepExisting
     * @param {Boolean} suppressEvent Set to false to not fire a select event
     */
    select: function(records, keepExisting, suppressEvent) {
        this.selModel.select(records, keepExisting, suppressEvent);
    },

    /**
     * Deselects a record instance by record instance or index.
     * @param {Ext.data.Record/Index} records An array of records or an index
     * @param {Boolean} suppressEvent Set to false to not fire a deselect event
     */
    deselect: function(records, suppressEvent) {
        this.selModel.deselect(records, suppressEvent);
    },

    /**
     * Gets a template node.
     * @param {HTMLElement/String/Number/Ext.data.Model} nodeInfo An HTMLElement template node, index of a template node,
     * the id of a template node or the record associated with the node.
     * @return {HTMLElement} The node or null if it wasn't found
     */
    getNode : function(nodeInfo) {
        if (Ext.isString(nodeInfo)) {
            return document.getElementById(nodeInfo);
        } else if (Ext.isNumber(nodeInfo)) {
            return this.all.elements[nodeInfo];
        } else if (nodeInfo instanceof Ext.data.Model) {
            var idx = this.store.indexOf(nodeInfo);
            return this.all.elements[idx];
        }
        return nodeInfo;
    },

    /**
     * Gets a range nodes.
     * @param {Number} start (optional) The index of the first node in the range
     * @param {Number} end (optional) The index of the last node in the range
     * @return {Array} An array of nodes
     */
    getNodes: function(start, end) {
        var ns = this.all.elements,
            nodes = [],
            i;

        start = start || 0;
        end = !Ext.isDefined(end) ? Math.max(ns.length - 1, 0) : end;
        if (start <= end) {
            for (i = start; i <= end && ns[i]; i++) {
                nodes.push(ns[i]);
            }
        } else {
            for (i = start; i >= end && ns[i]; i--) {
                nodes.push(ns[i]);
            }
        }
        return nodes;
    },

    /**
     * Finds the index of the passed node.
     * @param {HTMLElement/String/Number/Record} nodeInfo An HTMLElement template node, index of a template node, the id of a template node
     * or a record associated with a node.
     * @return {Number} The index of the node or -1
     */
    indexOf: function(node) {
        node = this.getNode(node);
        if (Ext.isNumber(node.viewIndex)) {
            return node.viewIndex;
        }
        return this.all.indexOf(node);
    },

    // private
    onBeforeLoad: function() {
        if (this.loadingText) {
            this.getTargetEl().update('');
            this.all.clear();
        }
    },

    onDestroy : function() {
        this.all.clear();
        Ext.DataView.superclass.onDestroy.call(this);
        this.bindStore(null);
        this.selModel.destroy();
    },

    // invoked by the selection model to maintain visual UI cues
    onItemSelect: function(record) {
        var node = this.getNode(record);
        Ext.fly(node).addCls(this.selectedItemCls);
    },

    // invoked by the selection model to maintain visual UI cues
    onItemDeselect: function(record) {
        var node = this.getNode(record);
        Ext.fly(node).removeCls(this.selectedItemCls);
    },
    
    select: function(records, keepExisting, supressEvents) {
        console.warn("DataView: select will be removed, please access select through a DataView's SelectionModel, ie: view.getSelectionModel().select()");
        var sm = this.getSelectionModel();
        return sm.select.apply(sm, arguments);
    },
    clearSelections: function() {
        console.warn("DataView: clearSelections will be removed, please access deselectAll through DataView's SelectionModel, ie: view.getSelectionModel().deselectAll()");
        var sm = this.getSelectionModel();
        return sm.deselectAll();
    }
});
Ext.reg('dataview', Ext.DataView);


// all of this information is available directly
// from the SelectionModel itself, the only added methods
// to DataView regarding selection will perform some transformation/lookup
// between HTMLElement/Nodes to records and vice versa.
Ext.DataView.override({
    /**
     * @cfg {Boolean} multiSelect
     * True to allow selection of more than one item at a time, false to allow selection of only a single item
     * at a time or no selection at all, depending on the value of {@link #singleSelect} (defaults to false).
     */
    /**
     * @cfg {Boolean} singleSelect
     * True to allow selection of exactly one item at a time, false to allow no selection at all (defaults to false).
     * Note that if {@link #multiSelect} = true, this value will be ignored.
     */
    /**
     * @cfg {Boolean} simpleSelect
     * True to enable multiselection by clicking on multiple items without requiring the user to hold Shift or Ctrl,
     * false to force the user to hold Ctrl or Shift to select more than on item (defaults to false).
     */

    /**
     * Gets the number of selected nodes.
     * @return {Number} The node count
     */
    getSelectionCount : function(){
        return this.selModel.getSelection().length;
    },

    /**
     * Gets an array of the selected records
     * @return {Array} An array of {@link Ext.data.Model} objects
     */
    getSelectedRecords : function(){
        return this.selModel.getSelection();
    }
});