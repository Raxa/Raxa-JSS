/**
 * A button {@link Ext.Sheet} class designed to popup or slide/anchor a series of {@link Ext.Button}s.
 *
 * # Example
 *
 *     @example preview
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
 *     actionSheet.show();
 *
 */
Ext.define('Ext.ActionSheet', {
    extend: 'Ext.Sheet',
    alias : 'widget.actionsheet',
    requires: ['Ext.Button'],

    config: {
        // @inherit
        cls: Ext.baseCSSPrefix + 'sheet-action',

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
        layout: {
            type : 'vbox',
            align: 'stretch'
        },

        // @inherit
        defaultType: 'button'
    }
});
