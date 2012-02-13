/**
 * {@link Ext.ActionSheet ActionSheets} are used to display a list of {@link Ext.Button buttons} in a popup dialog.
 *
 * The key difference between ActionSheet and {@link Ext.Sheet} is that ActionSheets are docked at the bottom of the
 * screen, and the {@link #defaultType} is set to {@link Ext.Button button}.
 *
 * ## Example
 *
 *     @example preview miniphone
 *     var actionSheet = Ext.create('Ext.ActionSheet', {
 *         items: [
 *             {
 *                 text: 'Delete draft',
 *                 ui  : 'decline'
 *             },
 *             {
 *                 text: 'Save draft'
 *             },
 *             {
 *                 text: 'Cancel',
 *                 ui  : 'confirm'
 *             }
 *         ]
 *     });
 *
 *     Ext.Viewport.add(actionSheet);
 *     actionSheet.show();
 *
 * As you can see from the code above, you no longer have to specify a `xtype` when creating buttons within a {@link Ext.ActionSheet ActionSheet},
 * because the {@link #defaultType} is set to {@link Ext.Button button}.
 *
 */
Ext.define('Ext.ActionSheet', {
    extend: 'Ext.Sheet',
    alias : 'widget.actionsheet',
    requires: ['Ext.Button'],

    config: {
        // @inherit
        baseCls: Ext.baseCSSPrefix + 'sheet-action',

        // @inherit
        left: 0,

        // @inherit
        right: 0,

        // @inherit
        bottom: 0,

        // @hide
        centered: false,

        // @inherit
        height: 'auto',

        // @inherit
        defaultType: 'button'
    }
});
