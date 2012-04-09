/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.chart.Navigation
 *
 * Handles panning and zooming capabilities.
 *
 * Used as mixin by Ext.chart.Chart.
 */
Ext.define('Ext.chart.Navigation', {

    constructor: function() {
        this.originalStore = this.store;
    },

    /**
     * Zooms the chart to the specified selection range.
     * Can be used with a selection mask. For example:
     *
     *     items: {
     *         xtype: 'chart',
     *         animate: true,
     *         store: store1,
     *         mask: 'horizontal',
     *         listeners: {
     *             select: {
     *                 fn: function(me, selection) {
     *                     me.setZoom(selection);
     *                     me.mask.hide();
     *                 }
     *             }
     *         }
     *     }
     */
    setZoom: function(zoomConfig) {
        var me = this,
            axes = me.axes,
            bbox = me.chartBBox,
            xScale = 1 / bbox.width,
            yScale = 1 / bbox.height,
            zoomer = {
                x : zoomConfig.x * xScale,
                y : zoomConfig.y * yScale,
                width : zoomConfig.width * xScale,
                height : zoomConfig.height * yScale
            };
        axes.each(function(axis) {
            var ends = axis.calcEnds();
            if (axis.position == 'bottom' || axis.position == 'top') {
                var from = (ends.to - ends.from) * zoomer.x + ends.from,
                    to = (ends.to - ends.from) * zoomer.width + from;
                axis.minimum = from;
                axis.maximum = to;
            } else {
                var to = (ends.to - ends.from) * (1 - zoomer.y) + ends.from,
                    from = to - (ends.to - ends.from) * zoomer.height;
                axis.minimum = from;
                axis.maximum = to;
            }
        });
        me.redraw(false);
    },

    /**
     * Restores the zoom to the original value. This can be used to reset
     * the previous zoom state set by `setZoom`. For example:
     *
     *     myChart.restoreZoom();
     */
    restoreZoom: function() {
        this.store = this.substore = this.originalStore;
        this.redraw(true);
    }

});

