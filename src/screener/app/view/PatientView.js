/*
 * This screen shows a list of patients on the left side,
 * with a button to sort them. The right side shows available
 * doctors, with an assign button on top to give a patient to
 * a doctor.
 */
Ext.define("Screener.view.PatientView", {
	xtype: 'patientView',
	extend: 'Ext.Container',
	config: {
		layout: 'hbox',
		items: [
		//our patient list is built on the Patients store, and has a title and sort button
		{
			xtype: 'patientListView',
			flex: 1
		},
		{
			//our doctor list is built on the Doctors store, and has a title and assign button
			xtype: 'list',
			id: 'doctorList',
			itemTpl: new Ext.XTemplate('<div>({numpatients}){[this.splitter(values.display)]}</div>', {
				splitter: function(str) {
					var name = str.split("- ")[1];
					return 'Dr.' + name;
				}
			}),
			items: [{
				xtype: 'titlebar',
				docked: 'top',
				title: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PatientView.doctors'),
				items: [{
					xtype: 'button',
					id: 'assignButton',
					text: Ext.i18n.appBundle.getMsg('RaxaEmrScreener.view.PatientView.ass'),
					align: 'left',
					disabled: 'true'
				}]
			}],
			flex: 1
		}]
	}
});

