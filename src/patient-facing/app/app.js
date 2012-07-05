Ext.application({
    name: 'Med-Table',

    requires: ['Ext.MessageBox'],

    views: ['Main', 'Schedule', 'CalendarDisplay', 'Menu', 'ExpandedMorning', 'Instructions', 'ExpandedAfternoon', 'ExpandedEvening', 'ExpandedNight'],
    models: ['Medicine', 'Instruction'],
    stores: ['MorningMedicines', 'AfternoonMedicines', 'EveningMedicines', 'NightMedicines', 'Instructions'],


    launch: function () {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('Med-Table.view.Main'));
    },

    onUpdated: function () {
        Ext.Msg.confirm("Application Update", "This application has just successfully been updated to the latest version. Reload now?", function (buttonId) {
            if (buttonId === 'yes') {
                window.location.reload();
            }
        });
    }
});