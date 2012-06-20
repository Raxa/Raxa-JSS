var myRecord;

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
			workingArea: '#working-area',
            submitHistory: '#submit-history',
            medicationHistory: '#medication-history',
			reftodocbutton: '#reftodocbutton',
            showContact: 'patientlist-show',
			showlabresulthistorypanel: 'labresulthistorypanel',
			showrefertodocpanel: 'Refer-To-Doc-Panel',
			showmedicationhistorypanel: 'Medication-History-Panel',
			confirmLabResultHistoryButton: '#confirmlabresulthistory',
			confirmMedicationHistoryButton: '#confirmmedicationhistory',
			confirmReferToDocButton: '#confirmrefertodoc',
			labinfo : '#labinfo'
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
            medicationHistory: {
                tap: 'medicationHistoryAction'
            },
            reftodocbutton: {
                tap: 'reftodocbutton'
            },
            labinfo: {
                tap: 'labInfoAction'
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
	
	onMainPop: function(view, item) {
        if (item.xtype == "labresulthistorypanel") {
            this.hideConfirmLabResultHistoryButton();
        }
        if (item.xtype == "Medication-History-Panel") {
            this.hideConfirmMedicationHistoryButton();
        }
        if (item.xtype == "Refer-To-Doc-Panel") {
            this.hideConfirmReferToDocButton();
        }
    },

    onContactSelect: function (list, index, node, record) {

        if (!this.showContact) {
            this.showContact = Ext.create('RaxaEmr.Outpatient.view.patient.more');
        }

        this.showContact.setRecord(record);
        this.getMain().push(this.showContact);
		myRecord = record;
    },
	
	labInfoAction: function (list, index, node) {

        if (!this.showlabresulthistorypanel) {
            this.showlabresulthistorypanel = Ext.create('RaxaEmr.Outpatient.view.patient.labresulthistorypanel');
        }
		
        this.showlabresulthistorypanel.setRecord(myRecord);
        this.getMain().push(this.showlabresulthistorypanel);
		this.showConfirmLabResultHistoryButton();
    },
	
	medicationHistoryAction: function (list, index, node) {

        if (!this.showmedicationhistorypanel) {
            this.showmedicationhistorypanel = Ext.create('RaxaEmr.Outpatient.view.patient.medicationhistorypanel');
        }
		
        this.showmedicationhistorypanel.setRecord(myRecord);
        this.getMain().push(this.showmedicationhistorypanel);
		this.showConfirmMedicationHistoryButton();
    },
	
	reftodocbutton: function (list, index, node) {

        if (!this.showrefertodocpanel) {
            this.showrefertodocpanel = Ext.create('RaxaEmr.Outpatient.view.patient.refertodocpanel');
        }
		
        this.showrefertodocpanel.setRecord(myRecord);
        this.getMain().push(this.showrefertodocpanel);
		this.showConfirmReferToDocButton();
    },
	
	showConfirmLabResultHistoryButton: function() {
        var confirmLabResultHistoryButton = this.getConfirmLabResultHistoryButton();

        if (!confirmLabResultHistoryButton.isHidden()) {
            return;
        }

        confirmLabResultHistoryButton.setHidden(false);
    },
	
	hideConfirmLabResultHistoryButton: function() {
        var confirmLabResultHistoryButton = this.getConfirmLabResultHistoryButton();

        if (confirmLabResultHistoryButton.isHidden()) {
            return;
        }

        confirmLabResultHistoryButton.setHidden(true);
    },
	
	showConfirmMedicationHistoryButton: function() {
        var confirmMedicationHistoryButton = this.getConfirmMedicationHistoryButton();

        if (!confirmMedicationHistoryButton.isHidden()) {
            return;
        }

        confirmMedicationHistoryButton.setHidden(false);
    },
	
	hideConfirmMedicationHistoryButton: function() {
        var confirmMedicationHistoryButton = this.getConfirmMedicationHistoryButton();

        if (confirmMedicationHistoryButton.isHidden()) {
            return;
        }

        confirmMedicationHistoryButton.setHidden(true);
    },
	
	showConfirmReferToDocButton: function() {
        var confirmReferToDocButton = this.getConfirmReferToDocButton();

        if (!confirmReferToDocButton.isHidden()) {
            return;
        }

        confirmReferToDocButton.setHidden(false);
    },
	
	hideConfirmReferToDocButton: function() {
        var confirmReferToDocButton = this.getConfirmReferToDocButton();

        if (confirmReferToDocButton.isHidden()) {
            return;
        }

        confirmReferToDocButton.setHidden(true);
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