/**
 * @class Ext.AbstractStoreSelectionModel
 * @extends Ext.util.Observable
 *
 * Tracks what records are currently selected in a databound widget.
 *
 * This is an abstract class and is not meant to be directly used.
 *
 * DataBound UI widgets such as GridPanel, TreePanel, and ListView
 * should subclass AbstractStoreSelectionModel and provide a way
 * to binding to the component.
 *
 * The abstract methods onSelectChange and onLastFocusChanged should
 * be implemented in these subclasses to update the UI widget.
 */
Ext.AbstractStoreSelectionModel = Ext.extend(Ext.util.Observable, {
    // lastSelected

    /**
     * @cfg {String} mode
     * Modes of selection.
     * Valid values are SINGLE, SIMPLE, and MULTI. Defaults to 'SINGLE'
     */
    
    /**
     * @cfg {Boolean} allowDeselect
     * Allow users to deselect a record in a DataView, List or Grid. Only applicable when the SelectionModel's mode is 'SINGLE'. Defaults to false.
     */
    allowDeselect: false,

    /**
     * @property selected
     * READ-ONLY A MixedCollection that maintains all of the currently selected
     * records.
     */
    selected: null,

    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(this, cfg);

        this.modes = {
            SINGLE: true,
            SIMPLE: true,
            MULTI: true
        };

        // sets this.selectionMode
        this.setSelectionMode(cfg.mode);

        // maintains the currently selected records.
        this.selected = new Ext.util.MixedCollection();

        Ext.AbstractStoreSelectionModel.superclass.constructor.call(this, cfg);
    },

    // binds the store to the selModel.
    bind : function(store, initial){
        if(!initial && this.store){
            if(store !== this.store && this.store.autoDestroy){
                this.store.destroy();
            }else{
                this.store.un("add", this.onStoreAdd, this);
                this.store.un("clear", this.onStoreClear, this);
                this.store.un("remove", this.onStoreRemove, this);
                this.store.un("update", this.onStoreUpdate, this);
            }
        }
        if(store){
            store = Ext.StoreMgr.lookup(store);
            store.on({
                add: this.onStoreAdd,
                clear: this.onStoreClear,
                remove: this.onStoreRemove,
                update: this.onStoreUpdate,
                scope: this
            });
        }
        this.store = store;
        if(store && !initial) {
            this.refresh();
        }
    },

    selectAll: function(silent) {
        var selections = this.store.getRange();
        for (var i = 0, ln = selections.length; i < ln; i++) {
            this.doSelect(selections[i], true, silent);
        }
    },

    deselectAll: function() {
        var selections = this.getSelection();
        for (var i = 0, ln = selections.length; i < ln; i++) {
            this.doDeselect(selections[i]);
        }
    },

    // Provides differentiation of logic between MULTI, SIMPLE and SINGLE
    // selection modes. Requires that an event be passed so that we can know
    // if user held ctrl or shift.
    selectWithEvent: function(record, e) {
        switch (this.selectionMode) {
            case 'MULTI':
                if (e.ctrlKey && this.isSelected(record)) {
                    this.doDeselect(record, false);
                } else if (e.shiftKey && this.lastFocused) {
                    this.selectRange(this.lastFocused, record, e.ctrlKey);
                } else if (e.ctrlKey) {
                    this.doSelect(record, true, false);
                } else if (this.isSelected(record) && !e.shiftKey && !e.ctrlKey && this.selected.getCount() > 1) {
                    this.doSelect(record, false, false);
                } else {
                    this.doSelect(record, false);
                }
                break;
            case 'SIMPLE':
                if (this.isSelected(record)) {
                    this.doDeselect(record);
                } else {
                    this.doSelect(record, true);
                }
                break;
            case 'SINGLE':
                // if allowDeselect is on and this record isSelected, deselect it
                if (this.allowDeselect && this.isSelected(record)) {
                    this.doDeselect(record);
                // select the record and do NOT maintain existing selections
                } else {
                    this.doSelect(record, false);
                }
                break;
        }
    },

    /**
     * Selects a range of rows if the selection model
     * {@link Ext.grid.AbstractSelectionModel#isLocked is not locked}.
     * All rows in between startRow and endRow are also selected.
     * @param {Number} startRow The index of the first row in the range
     * @param {Number} endRow The index of the last row in the range
     * @param {Boolean} keepExisting (optional) True to retain existing selections
     */
    selectRange : function(startRecord, endRecord, keepExisting, dir){
        var i,
            startRow = this.store.indexOf(startRecord),
            endRow = this.store.indexOf(endRecord),
            tmp,
            selectedCount = 0,
            dontDeselect;

        if (this.isLocked()){
            return;
        }

        // swap values
        if (startRow > endRow){
            tmp = endRow;
            endRow = startRow;
            startRow = tmp;
        }

        for (i = startRow; i <= endRow; i++) {
            if (this.isSelected(this.store.getAt(i))) {
                selectedCount++;
            }
        }

        if (!dir) {
            dontDeselect = -1;
        } else {
            dontDeselect = (dir == 'up') ? startRow : endRow;
        }
        for (i = startRow; i <= endRow; i++){
            if (selectedCount == (endRow - startRow + 1)) {
                if (i != dontDeselect) {
                    this.doDeselect(i, true);
                }
            } else {
                this.doSelect(i, true);
            }

        }
    },
    
    /**
     * Selects a record instance by record instance or index.
     * @param {Ext.data.Record/Index} records An array of records or an index
     * @param {Boolean} keepExisting
     * @param {Boolean} suppressEvent Set to false to not fire a select event
     */
    select: function(records, keepExisting, suppressEvent) {
        this.doSelect(records, keepExisting, suppressEvent);
    },

    /**
     * Deselects a record instance by record instance or index.
     * @param {Ext.data.Record/Index} records An array of records or an index
     * @param {Boolean} suppressEvent Set to false to not fire a deselect event
     */
    deselect: function(records, suppressEvent) {
        this.doDeselect(records, suppressEvent);
    },
    
    doSelect: function(records, keepExisting, suppressEvent) {
        if (this.locked) {
            return;
        }
        if (typeof records === "number") {
            records = [this.store.getAt(records)];
        }
        if (this.selectionMode == "SINGLE" && records) {
            var record = records.length ? records[0] : records;
            this.doSingleSelect(record, suppressEvent);
        } else {
            this.doMultiSelect(records, keepExisting, suppressEvent);
        }
    },

    doMultiSelect: function(records, keepExisting, suppressEvent) {
        if (this.locked) {
            return;
        }
        var selected = this.selected,
            change = false,
            record;

        records = !Ext.isArray(records) ? [records] : records;
        if (!keepExisting && selected.getCount() > 0) {
            change = true;
            this.doDeselect(this.getSelection(), true);
        }

        for (var i = 0, ln = records.length; i < ln; i++) {
            record = records[i];
            if (keepExisting && this.isSelected(record)) {
                continue;
            }
            change = true;
            this.lastSelected = record;
            selected.add(record);
            if (!suppressEvent) {
                this.setLastFocused(record);
            }

            this.onSelectChange(record, true, suppressEvent);
        }
        // fire selchange if there was a change and there is no suppressEvent flag
        this.maybeFireSelectionChange(change && !suppressEvent);
    },

    // records can be an index, a record or an array of records
    doDeselect: function(records, suppressEvent) {
        if (this.locked) {
            return;
        }

        if (typeof records === "number") {
            records = [this.store.getAt(records)];
        }

        var change = false,
            selected = this.selected,
            record;

        records = !Ext.isArray(records) ? [records] : records;
        for (var i = 0, ln = records.length; i < ln; i++) {
            record = records[i];
            if (selected.remove(record)) {
                if (this.lastSelected == record) {
                    this.lastSelected = selected.last();
                }
                this.onSelectChange(record, false, suppressEvent);
                change = true;
            }
        }
        // fire selchange if there was a change and there is no suppressEvent flag
        this.maybeFireSelectionChange(change && !suppressEvent);
    },

    doSingleSelect: function(record, suppressEvent) {
        if (this.locked) {
            return;
        }
        // already selected.
        // should we also check beforeselect?
        if (this.isSelected(record)) {
            return;
        }
        var selected = this.selected;
        if (selected.getCount() > 0) {
            this.doDeselect(this.lastSelected, suppressEvent);
        }
        selected.add(record);
        this.lastSelected = record;
        this.onSelectChange(record, true, suppressEvent);
        this.setLastFocused(record);
        this.maybeFireSelectionChange(!suppressEvent);
    },

    /**
     * @param {Ext.data.Record} record
     * Set a record as the last focused record. This does NOT mean
     * that the record has been selected.
     */
    setLastFocused: function(record) {
        var recordBeforeLast = this.lastFocused;
        this.lastFocused = record;
        this.onLastFocusChanged(recordBeforeLast, record);
    },


    // fire selection change as long as true is not passed
    // into maybeFireSelectionChange
    maybeFireSelectionChange: function(fireEvent) {
        if (fireEvent) {
            this.fireEvent('selectionchange', this, this.getSelection());
        }
    },

    /**
     * Returns the last selected record.
     */
    getLastSelected: function() {
        return this.lastSelected;
    },
    
    getLastFocused: function() {
        return this.lastFocused;
    },

    /**
     * Returns an array of the currently selected records.
     */
    getSelection: function() {
        return this.selected.getRange();
    },

    /**
     * Returns the current selectionMode. SINGLE, MULTI or SIMPLE.
     */
    getSelectionMode: function() {
        return this.selectionMode;
    },

    /**
     * Sets the current selectionMode. SINGLE, MULTI or SIMPLE.
     */
    setSelectionMode: function(selMode) {
        selMode = selMode ? selMode.toUpperCase() : 'SINGLE';
        // set to mode specified unless it doesnt exist, in that case
        // use single.
        this.selectionMode = this.modes[selMode] ? selMode : 'SINGLE';
    },

    /**
     * Returns true if the selections are locked.
     * @return {Boolean}
     */
    isLocked: function() {
        return this.locked;
    },

    /**
     * Locks the current selection and disables any changes from
     * happening to the selection.
     * @param {Boolean} locked
     */
    setLocked: function(locked) {
        this.locked = !!locked;
    },

    /**
     * Returns <tt>true</tt> if the specified row is selected.
     * @param {Record/Number} record The record or index of the record to check
     * @return {Boolean}
     */
    isSelected: function(record) {
        record = Ext.isNumber(record) ? this.store.getAt(record) : record;
        return this.selected.indexOf(record) !== -1;
    },
    
    /**
     * Returns true if there is a selected record.
     * @return {Boolean}
     */
    hasSelection: function() {
        return this.selected.getCount() > 0;
    },

    refresh: function() {
        var toBeSelected = [],
            oldSelections = this.getSelection(),
            ln = oldSelections.length,
            selection,
            change,
            i = 0;

        // check to make sure that there are no records
        // missing after the refresh was triggered, prune
        // them from what is to be selected if so
        for (; i < ln; i++) {
            selection = oldSelections[i];
            if (this.store.indexOf(selection) != -1) {
                toBeSelected.push(selection);
            }
        }

        // there was a change from the old selected and
        // the new selection
        if (this.selected.getCount() != toBeSelected.length) {
            change = true;
        }

        this.clearSelections();

        if (toBeSelected.length) {
            // perform the selection again
            this.doSelect(toBeSelected, false, true);
        }
        
        this.maybeFireSelectionChange(change);
    },

    clearSelections: function() {
        // reset the entire selection to nothing
        this.selected.clear();
        this.lastSelected = null;
        this.setLastFocused(null);
    },

    // when a record is added to a store
    onStoreAdd: function() {

    },

    // when a store is cleared remove all selections
    // (if there were any)
    onStoreClear: function() {
        var selected = this.selected;
        if (selected.getCount > 0) {
            selected.clear();
            this.lastSelected = null;
            this.setLastFocused(null);
            this.maybeFireSelectionChange(true);
        }
    },

    // prune records from the SelectionModel if
    // they were selected at the time they were
    // removed.
    onStoreRemove: function(store, record) {
        if (this.locked) {
            return;
        }
        var selected = this.selected;
        if (selected.remove(record)) {
            if (this.lastSelected == record) {
                this.lastSelected = null;
            }
            if (this.getLastFocused() == record) {
                this.setLastFocused(null);
            }
            this.maybeFireSelectionChange(true);
        }
    },

    getCount: function() {
        return this.selected.getCount();
    },

    // cleanup.
    destroy: function() {

    },

    // if records are updated
    onStoreUpdate: function() {

    },

    // @abstract
    onSelectChange: function(record, isSelected, suppressEvent) {

    },

    // @abstract
    onLastFocusChanged: function(oldFocused, newFocused) {

    },

    // @abstract
    onEditorKey: function(field, e) {

    },

    // @abstract
    bindComponent: function(cmp) {

    }
});