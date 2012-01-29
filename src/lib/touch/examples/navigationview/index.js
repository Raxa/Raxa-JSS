/**
 * There are two main parts of this example:
 *
 * **Ext.navigation.View**
 * This component is simply a container with a layout, which handles pushing and popping items/views
 * at any time. It will automatically animate between those views, including the back button (if it is
 * visibly) and a user defined title (if defined in your item).
 * 
 * **Ext.ActionSheet**
 * This is simply used to show off some additional functionality of the navigation view component.
 */
Ext.setup({
    requires: [
        'Ext.navigation.View',
        'Ext.ActionSheet',
        'Ext.Button',
        'Ext.Toolbar'
    ],
    onReady: function() {
        /**
         * Create an instance of Ext.navigation.View, which is fullscreen so it is inserted into Ext.Viewport
         */
        var view = Ext.create('Ext.navigation.View', {
            fullscreen: true,

            items: [
                //bottom toolbar containing the settings button
                {
                    docked: 'bottom',
                    xtype: 'toolbar',
                    ui :'light',
                    items: [
                        { xtype: 'spacer' },
                        {
                            iconMask: true,
                            iconCls: 'settings',
                            handler: function() {
                                //check if we can pop a view in the navigation view, if not, disable the pop button
                                //on the action sheet
                                var popButton = optionsSheet.down('#pop');
                                popButton.setDisabled(!view.canPop());


                                var toggleButton = optionsSheet.down('#togglebackbuttontext');
                                toggleButton.setDisabled(!view.canPop());

                                //show the option sheet
                                optionsSheet.show();
                            }
                        }
                    ]
                },

                //first item, which is visibile initially
                {
                    title: 'Ext.navigation.View Example',
                    layout: 'vbox',
                    padding: 10,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Push another view!',
                            handler: function() {
                                //we already have other items in this navigation view, so we can simply use an index if we want
                                view.push(1);
                            }
                        }
                    ]
                },

                //Second item. Show when the button above is pressed.
                {
                    title: 'Second',
                    layout: 'vbox',
                    padding: 10,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Another?',
                            handler: function() {
                                view.push(2);
                            }
                        }
                    ]
                },

                //Third item. Show when the button above is pressed.
                {
                    title: 'Third',
                    layout: 'vbox',
                    padding: 10,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Push a new view',
                            handler: function() {
                                view.push({
                                    title: 'New view',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Pop this view',
                                            handler: function() {
                                                view.pop();
                                            }
                                        }
                                    ]
                                });
                            }
                        }
                    ]
                }
            ]
        });

        /**
         * A ActionSheet which is used to display various options for the Navigation View
         */
        var optionsSheet = Ext.create('Ext.ActionSheet', {
            items: [
                {
                    xtype: 'button',
                    text: 'Add a random view',
                    handler: function() {
                        //use the push method of the navigation view to create a new view
                        view.push({
                            title: Date.now().toString(),
                            padding: 10,
                            html: 'This is a random view.'
                        });

                        //hide the sheet
                        optionsSheet.hide();
                    }
                },
                {
                    xtype: 'button',
                    text: 'Toggle bar visibility',
                    handler: function() {
                        //get the navigation bar, and call show/hide depending if the bar is hidden or not
                        var bar = view.getNavigationBar();
                        bar[bar.isHidden() ? 'show' : 'hide']();

                        //hide the sheet
                        optionsSheet.hide();
                    }
                },
                {
                    xtype: 'button',
                    text: 'Toggle back button text',
                    itemId: 'togglebackbuttontext',
                    handler: function() {
                        //simply call the setter for the useTitleForBackButtonText configuration
                        view.setUseTitleForBackButtonText(!view.getUseTitleForBackButtonText());

                        //hide the sheet
                        optionsSheet.hide();
                    }
                },
                {
                    xtype: 'button',
                    text: 'Pop the current view',
                    itemId: 'pop',
                    handler: function() {
                        //call the pop method in the navigation view
                        view.pop();

                        //hide the sheet
                        optionsSheet.hide();
                    }
                },
                {
                    text: 'Cancel',
                    ui: 'decline',
                    handler: function() {
                        //hide the sheet
                        optionsSheet.hide();
                    }
                }
            ]
        });
    }
});