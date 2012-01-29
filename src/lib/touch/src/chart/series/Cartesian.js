/**
 * @class Ext.chart.series.Cartesian
 * @extends Ext.chart.series.Series
 *
 * Common base class for series implementations which plot values using x/y coordinates.
 *
 */
Ext.define('Ext.chart.series.Cartesian', {

    /* Begin Definitions */

    extend: 'Ext.chart.series.Series',

    alternateClassName: ['Ext.chart.CartesianSeries', 'Ext.chart.CartesianChart'],

    /* End Definitions */

    /**
     * The field used to access the x axis value from the items from the data
     * source.
     *
     * @cfg xField
     * @type String
     */
    xField: null,

    /**
     * The field used to access the y-axis value from the items from the data
     * source.
     *
     * @cfg yField
     * @type String
     */
    yField: null,

    /**
     * @cfg {String} axis
     * The position of the axis to bind the values to. Possible values are 'left', 'bottom', 'top' and 'right'.
     * You must explicitly set this value to bind the values of the line series to the ones in the axis, otherwise a
     * relative scale will be used.
     */
    axis: 'left'
});
