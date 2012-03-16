/**
 * @class Geo.views.DistrictInfo
 * @extends Ext.form.FormPanel
 *
 * This is the form that enables a user to change their district.
 */
Geo.views.DistrictInfo = Ext.extend(Ext.form.FormPanel, {
    initComponent: function() {
        this.select = new Ext.form.Select({
            name: 'state',
            label: 'State',
            store: Geo.stores.States,
            displayField: 'state',
            valueField: 'abbr'
        });

        this.spinner = new Ext.form.Spinner({
            minValue: 1,
            maxValue: Geo.states[0].maxDistrict,
            value: 1,
            name : 'number',
            cycle: true,
            label: 'District',
            disableInput: true,
            maskField: true
        });

        this.lookup = new Ext.Button({
            text: 'Lookup',
            handler: this.lookupDistrict,
            ui: 'confirm',
            scope: this
        });

        this.fs = new Ext.form.FieldSet({
            items: [this.select, this.spinner]
        });

        this.items = [this.fs, this.lookup];

        Geo.views.DistrictInfo.superclass.initComponent.call(this);
        this.addEvents('lookupDistrict');

        if (this.district) {
            this.updateDistrict(this.district);
        }

        this.select.on('select', this.onStateSelect, this);
    },

    updateDistrict: function(district) {
        this.setValues(district);
        this.capSpinner(district.state);
    },

    // not all states have the same number of districts, in fact some states
    // are "at large" states and have no districts. we cap the maxValue of the
    // spinner based on this information
    capSpinner: function(state) {
        var spinner   = this.spinner,
            currValue = spinner.getValue(),
            idx       = Geo.stores.States.find('abbr', state),
            r         = Geo.stores.States.getAt(idx || 0),
            max       = r.get('maxDistrict');

        if (max === 0) {
            spinner.disable();
        }
        else {
            spinner.maxValue = max;
            spinner.enable();
        }

        if (currValue == 0 && max != 0) {
            spinner.setValue(1);
        }
        else if (max < currValue) {
            spinner.setValue(max);
        }
    },

    // after a user selects a state, cap the spinner
    onStateSelect: function(select, value) {
        this.capSpinner(value);
    },

    lookupDistrict: function() {
        var district = this.getValues();
        this.fireEvent('lookupDistrict', district);
    }
});