/**
 * Simple Select field wrapper. Example usage:
<pre><code>
new Ext.field.Select({
    options: [
        {text: 'First Option',  value: 'first'},
        {text: 'Second Option', value: 'second'},
        {text: 'Third Option',  value: 'third'}
    ]
});
</code></pre>
 */
Ext.define('Ext.field.Select', {
    extend: 'Ext.field.Text',
    xtype: 'selectfield',
    alternateClassName: 'Ext.form.Select',
    requires: [
        'Ext.Panel',
        'Ext.picker.Picker',
        'Ext.data.Store',
        'Ext.data.StoreManager'
    ],

    /**
     * @event change
     * Fires when an option selection has changed
     * @param {Ext.field.Select} this
     * @param {Mixed} newValue The new value
     * @param {Mixed} oldValue The old value
     */

    config: {
        // @inherit
        ui: 'select',

        /**
         * @cfg {Boolean} useClearIcon
         * @hide
         */

        /**
         * @cfg {String/Number} valueField The underlying {@link Ext.data.Field#name data value name} (or numeric Array index) to bind to this
         * Select control. (defaults to 'value')
         * @accessor
         */
        valueField: 'value',

        /**
         * @cfg {String/Number} displayField The underlying {@link Ext.data.Field#name data value name} (or numeric Array index) to bind to this
         * Select control. This resolved value is the visibly rendered value of the available selection options.
         * (defaults to 'text')
         * @accessor
         */
        displayField: 'text',

        /**
         * @cfg {Ext.data.Store} store (Optional) store instance used to provide selection options data.
         * @accessor
         */
        store: null,

        /**
         * @cfg {Array} options (Optional) An array of select options.
    <pre><code>
        [
            {text: 'First Option',  value: 'first'},
            {text: 'Second Option', value: 'second'},
            {text: 'Third Option',  value: 'third'}
        ]
    </code></pre>
         * Note: option object member names should correspond with defined {@link #valueField valueField} and {@link #displayField displayField} values.
         * This config will be ignore if a {@link #store store} instance is provided
         * @accessor
         */
        options: null,

        /**
         * @cfg {String} hiddenName Specify a hiddenName if you're using the {@link Ext.form.Panel#standardSubmit standardSubmit} option.
         * This name will be used to post the underlying value of the select to the server.
         * @accessor
         */
        hiddenName: null,

        /**
         * @cfg {Object} input
         * @hide
         */
        component: {
            useMask: true
        },

        /**
         * @cfg {Boolean} clearIcon
         * @hide
         * @accessor
         */
        clearIcon: false
    },

    /**
     * @cfg {Ext.data.Model} record
     * @private
     */

    /**
     * @cfg {Ext.data.Model} previousRecord
     * @private
     */

    // @private
    constructor: function(config) {
        config = config || {};

        if (!config.store) {
            config.store = true;
        }

        this.callParent([config]);
    },

    // @private
    initialize: function() {
        var me = this;

        me.callParent();
        me.getComponent().on({
            scope: me,
            masktap: 'onMaskTap'
        });
    },

    applyValue: function(value) {
        var record = value,
            index;

        //we call this so that the options configruation gets intiailized, so that a store exists, and we can
        //find the correct value
        this.getOptions();

        if (!(value instanceof Ext.data.Model)) {
            index = this.getStore().find(this.getValueField(), value, null, null, null, true);

            if (index == -1) {
                index = this.getStore().find(this.getDisplayField(), value);
            }

            record = this.getStore().getAt(index);
        }

        return record;
    },

    updateValue: function(newValue, oldValue) {
        this.previousRecord = oldValue;

        if (newValue) {
            this.record = newValue;

            this.callParent([newValue.get(this.getDisplayField())]);
        }

        this.fireEvent('change', this, newValue, oldValue);
    },

    getValue: function() {
        var record = this.record;
        return (record) ? record.get(this.getValueField()) : null;
    },

    getRecord: function() {
        return this.record;
    },

    // @private
    getPicker: function() {
        if (!this.picker) {
            this.picker = Ext.create('Ext.picker.Picker', {
                slots: [{
                    align       : 'center',
                    name        : this.getName(),
                    valueField  : this.getValueField(),
                    displayField: this.getDisplayField(),
                    value       : this.getValue(),
                    store       : this.getStore()
                }],
                listeners: {
                    change: this.onPickerChange,
                    scope: this
                }
            });
        }

        return this.picker;
    },

    // @private
    getListPanel: function() {
        if (!this.listPanel) {
            this.listPanel = Ext.create('Ext.Panel', {
                top     : 0,
                left    : 0,
                modal   : true,
                cls     : Ext.baseCSSPrefix + 'select-overlay',
                layout  : 'fit',
                hideOnMaskTap: true,
                items: {
                    xtype: 'list',
                    store: this.getStore(),
                    itemTpl: '<span class="x-list-label">{' + this.getDisplayField() + '}</span>',
                    listeners: {
                        select : this.onListSelect,
                        itemtap: this.onListTap,
                        scope  : this
                    }
                }
            });
        }

        return this.listPanel;
    },

    // @private
    onMaskTap: function() {
        if (this.getDisabled()) {
            return false;
        }

        this.showComponent();

        return false;
    },

    // @private
    showComponent: function() {
        //check if the store is empty, if it is, return
        if (this.getStore().getCount() === 0) {
            return;
        }

        if (this.getReadOnly()) {
            return;
        }

        this.isFocused = true;

        //hide the keyboard
        Ext.Viewport.hideKeyboard();

        if (Ext.os.deviceType == 'Phone') {
            var picker = this.getPicker(),
                name   = this.getName(),
                value  = {};

            value[name] = this.record.get(this.getValueField());
            picker.setValue(value);
            picker.show();
        } else {
            var listPanel = this.getListPanel(),
                list = listPanel.down('list'),
                store = list.getStore(),
                index = store.find(this.getValueField(), this.getValue()),
                record = store.getAt((index == -1) ? 0 : index);

            listPanel.showBy(this);
            list.select(record, null, true);
        }
    },

    // @private
    onListSelect: function(item, record) {
        var me = this;
        if (record) {
            me.setValue(record);
        }
    },

    onListTap: function() {
        this.listPanel.hide({
            type : 'fade',
            out  : true,
            scope: this
        });
    },

    // @private
    onPickerChange: function(picker, value) {
        var me = this,
            newValue = value[me.getName()],
            store = me.getStore(),
            index = store.find(me.getValueField(), newValue),
            record = store.getAt(index);

        me.setValue(record);
    },

    /**
     * Updates the underlying &lt;options&gt; list with new values.
     * @param {Array} options An array of options configurations to insert or append.
<pre><code>
selectBox.setOptions(
    [   {text: 'First Option',  value: 'first'},
        {text: 'Second Option', value: 'second'},
        {text: 'Third Option',  value: 'third'}
    ]).setValue('third');
</code></pre>
     * Note: option object member names should correspond with defined {@link #valueField valueField} and
     * {@link #displayField displayField} values.
     * @return {Ext.field.Select} this
     */
    updateOptions: function(newOptions) {
        var store = this.getStore();

        if (!newOptions) {
            store.clearData();
        }
        else {
            store.setData(newOptions);
            this.onStoreDataChanged(store);
        }
    },

    applyStore: function(store) {
        if (store === true) {
            store = Ext.create('Ext.data.Store', {
                fields: [this.getValueField(), this.getDisplayField()]
            });
        }

        if (store) {
            store = Ext.data.StoreManager.lookup(store);

            store.on({
                scope: this,
                refresh: this.onStoreDataChanged
            });
        }

        return store;
    },

    updateStore: function(newStore) {
        if (newStore) {
            this.onStoreDataChanged(newStore);
        }
    },

    /**
     * Called when the internal {@link #store}'s data has changed
     */
    onStoreDataChanged: function(store) {
        var initialConfig = this.getInitialConfig(),
            value = this.getValue();

        if (value) {
            this.updateValue(this.applyValue(value));
        } else if (initialConfig.hasOwnProperty('value')) {
            this.setValue(initialConfig.value);
        } else if (store.getCount() > 0) {
            this.setValue(store.getAt(0));
        }
    },

    /**
     * Resets the Select field to the value of the first record in the store.
     * @return {Ext.field.Select} this
     */
    reset: function() {
        var store = this.getStore(),
            record = (this.originalValue) ? this.originalValue : store.getAt(0);

        if (store && record) {
            this.setValue(record);
        }

        return this;
    },

    onFocus: function(e) {
        this.fireEvent('focus', this, e);

        this.isFocused = true;

        Ext.Viewport.hideKeyboard();
        this.showComponent();
    },

    destroy: function() {
        this.callParent(arguments);
        Ext.destroy(this.listPanel, this.picker, this.hiddenField);
    }
});
