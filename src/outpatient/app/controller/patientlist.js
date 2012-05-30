Ext.define('RaxaEmr.Outpatient.controller.patientlist', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainview',
            contacts: 'patientlist',
            contact: '#contact',
            name: '#name',
            docname: '#docname',
            urgency: '#urgency',
            lastvisit: '#lastvisit',
            showContact: 'patientlist-show'
        },

        control: {
            main: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            contacts: {
                itemtap: 'onContactSelect'
            },
            name: {
                tap: 'sortbyname'
            },
            docname: {
                tap: 'sortbydocname'
            },
            urgency: {
                tap: 'sortbyurgency'
            },
            lastvisit: {
                tap: 'sortbylastvisit'
            },
            searchfield: {
                clearicontap: 'onSearchClearIconTap',
                keyup: 'onSearchKeyUp'
            }
        }
    },

    onMainPush: function (view, item) {

        if (item.xtype == "contact-show") {
            this.getContacts().deselectAll();
        }

    },

    onContactSelect: function (list, index, node, record) {

        if (!this.showContact) {
            this.showContact = Ext.create('RaxaEmr.Outpatient.view.patient.more');
        }

        this.showContact.setRecord(record);
        this.getMain().push(this.showContact);
    },
    sortbyname: function () {
        store = this.getContact().getStore();
        store.setSorters("firstName");
        store.load();
    },

    sortbydocname: function () {
        store = this.getContact().getStore();
        store.setSorters("nameofdoc");
        store.load();
    },

    sortbyurgency: function () {
        store = this.getContact().getStore();
        store.setSorters("urgency");
        store.load();
    },
    sortbylastvisit: function () {
        store = this.getContact().getStore();
        store.setSorters("lastvisit");
        store.load();
    },

    onSearchKeyUp: function (field) {

        var value = field.getValue(),
            store = this.getContact().getStore();

        store.clearFilter();

        if (value) {
            var searches = value.split(' '),
                regexps = [],
                i;

            for (i = 0; i < searches.length; i++) {
                if (!searches[i]) continue;
                regexps.push(new RegExp(searches[i], 'i'));
            }

            store.filter(function (record) {
                var matched = [];

                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('firstName').match(search);
                    matched.push(didMatch);
                }

                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    return matched[0];
                }
            });
        }
    },

    onSearchClearIconTap: function () {
        store = this.getContact().getStore();
        store.clearFilter();
    }
});