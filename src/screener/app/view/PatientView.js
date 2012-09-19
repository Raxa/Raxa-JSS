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
        {
            xtype: 'patientListView',
            flex: 1
        },
        {
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
                title: 'Doctors',
                items: [{
                    xtype: 'button',
                    id: 'assignButton',
                    text: 'ASSIGN',
                    align: 'left',
                    disabled: 'true'
                } , 
                ]
            }],
            flex: 1
        }]
    }
});

