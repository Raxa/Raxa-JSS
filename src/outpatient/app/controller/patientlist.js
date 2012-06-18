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
            mainTabs: '#main-tabs',
            submitHistory: '#submit-history',
            showContact: 'patientlist-show'
        },

        control: {
            main: {
                push: 'onMainPush'
            },
            contacts: {
                itemtap: 'onContactSelect'
            },
            name: {
                tap: 'sortByName'
            },
            docname: {
                tap: 'sortByDocName'
            },
            urgency: {
                tap: 'sortByUrgency'
            },
            lastvisit: {
                tap: 'sortByLastVisit'
            },
            submitHistory: {
                tap: 'submitHistoryAction'
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
    sortByName: function () {
        store = this.getContact().getStore();
        store.setSorters("firstName");
        store.load();
    },

    sortByDocName: function () {
        store = this.getContact().getStore();
        store.setSorters("nameofdoc");
        store.load();
    },

    sortByUrgency: function () {
        store = this.getContact().getStore();
        store.setSorters("urgency");
        store.load();
    },
    sortByLastVisit: function () {
        store = this.getContact().getStore();
        store.setSorters("lastvisit");
        store.load();
    },

    onSearchKeyUp: function (field) {

        var value = field.getValue();
        var store = this.getContact().getStore();

        store.clearFilter();

        if (value) {
            var searches = value.split(' ');
            var regexps = [];
            var i;

            for (i = 0; i < searches.length; i++) {
                if (!searches[i]) continue;
                regexps.push(new RegExp(searches[i], 'i'));
            }

            store.filter(function (record) {
                var matched = [];

                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i];
                    var didMatch = record.get('firstName').match(search) || record.get('lastName').match(search) || record.get('id').match(search);
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
    },

    submitHistoryAction: function () {
        Ext.getCmp('main-tabs').setActiveItem(1);
    }
});