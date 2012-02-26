/**
 * @class Ext.form.Slider
 * @extends Ext.form.Field
 * <p>Form component allowing a user to move a 'thumb' along a slider axis to choose a value. Sliders can equally be used outside
 * of the context of a form. Example usage:</p>
   <pre><code>
new Ext.form.FormPanel({
    items: [
        {
            xtype   : 'sliderfield',
            label   : 'Volume',
            value   : 5,
            minValue: 0,
            maxValue: 10
        }
    ]
});
   </code></pre>
 * Or as a standalone component:
   <pre><code>
var slider = new Ext.form.Slider({
    value: 5,
    minValue: 0,
    maxValue: 10
});

slider.setValue(8); //will update the value and move the thumb;
slider.getValue(); //returns 8
   </code></pre>
 * @xtype sliderfield
 * @xtype slider
 */
Ext.form.Slider = Ext.extend(Ext.form.Field, {
    ui: 'slider',
    /**
     * @cfg {Boolean} useClearIcon @hide
     */

    /**
     * @cfg {String} inputCls Overrides {@link Ext.form.Field}'s inputCls. Defaults to 'x-slider'
     */
    inputCls: 'x-slider',

    inputType: 'slider',

    /**
     * @cfg {Number} minValue The lowest value any thumb on this slider can be set to (defaults to 0)
     */
    minValue: 0,

    /**
     * @cfg {Number} maxValue The highest value any thumb on this slider can be set to (defaults to 100)
     */
    maxValue: 100,

    /**
     * @cfg {Number} animationDuration When set to a number greater than 0, it will be the animation duration in ms, defaults to 200
     */
    animationDuration: 200,

    /**
     * @cfg {Number} value The value to initialize the thumb at (defaults to 0)
     */
    value: 0,

    /**
     * @private
     * @cfg {Number} trackWidth The current track width. Used when the field is hidden so setValue will continue to work (needs
     * the fieldEls width).
     */
    trackWidth: null,

    monitorOrientation: true,

    renderTpl: [
        '<tpl if="label">',
            '<div class="x-form-label"><span>{label}</span></div>',
        '</tpl>',
        '<tpl if="fieldEl">',
            '<div id="{inputId}" name="{name}" class="{fieldCls}"',
            '<tpl if="tabIndex">tabIndex="{tabIndex}"</tpl>',
            '<tpl if="style">style="{style}" </tpl>',
        '/></tpl>'
    ],

    /**
     * @cfg {Number} increment The increment by which to snap each thumb when its value changes. Defaults to 1. Any thumb movement
     * will be snapped to the nearest value that is a multiple of the increment (e.g. if increment is 10 and the user tries to move
     * the thumb to 67, it will be snapped to 70 instead)
     */
    increment: 1,


    /**
     * @cfg {Array} values The values to initialize each thumb with. One thumb will be created for each value. This configuration
     * should always be defined but if it is not then it will be treated as though [0] was passed.
     *
     * This is intentionally doc'd as private and is not fully supported/implemented yet.
     * @private
     */

    /**
     * @cfg {Array} thumbs Optional array of Ext.form.Slider.Thumb instances. Usually {@link values} should be used instead
     */

    // @private
    constructor: function(config) {
        this.addEvents(
            /**
             * @event beforechange
             * Fires before the value of a thumb is changed. Return false to cancel the change
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} newValue The value that the thumb will be set to
             * @param {Number} oldValue The previous value
             */
            'beforechange',

            /**
             * @event change
             * Fires when the value of a thumb is changed.
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} newValue The value that the thumb will be set to
             * @param {Number} oldValue The previous value
             */
            'change',
            /**
             * @event drag
             * Fires while the thumb is actively dragging.
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} value The value of the thumb.
             */
            'drag',
            /**
             * @event dragend
             * Fires when the thumb is finished dragging.
             * @param {Ext.form.Slider} slider The slider instance
             * @param {Ext.form.Slider.Thumb} thumb The thumb instance
             * @param {Number} value The value of the thumb.
             */
            'dragend'
        );

        Ext.form.Slider.superclass.constructor.call(this, config);
    },

    // @private
    initComponent: function() {
        this.tabIndex = -1;

        if (this.increment == 0) {
            this.increment = 1;
        }

        this.increment = Math.abs(this.increment);

        //TODO: This will be removed once multi-thumb support is in place - at that point a 'values' config will be accepted
        //to create the multiple thumbs
        this.values = [this.value];

        Ext.form.Slider.superclass.initComponent.apply(this, arguments);

        if (this.thumbs == undefined) {
            var thumbs = [],
                values = this.values,
                length = values.length,
                i,
                Thumb = this.getThumbClass();

            for (i = 0; i < length; i++) {
                thumbs[thumbs.length] = new Thumb({
                    value: values[i],
                    slider: this,

                    listeners: {
                        scope  : this,
                        drag   : this.onDrag,
                        dragend: this.onThumbDragEnd
                    }
                });
            }

            this.thumbs = thumbs;
        }
    },

    // @private
    initValue: function() {
        var thumb = this.getThumb();

        if (thumb.dragObj) {
            thumb.dragObj.updateBoundary();
        }

        Ext.form.Slider.superclass.initValue.apply(this, arguments);
    },

    onOrientationChange: function() {
        Ext.form.Slider.superclass.onOrientationChange.apply(this, arguments);

        var me = this,
            thumb = this.getThumb();

        if (thumb.dragObj) {
            setTimeout(function() {
                thumb.dragObj.updateBoundary();
                me.moveThumb(thumb, me.getPixelValue(thumb.getValue(), thumb), 0);
            }, 100);
        }
    },

    getThumbClass: function() {
        return Ext.form.Slider.Thumb;
    },

    /**
     * Sets the new value of the slider, constraining it within {@link minValue} and {@link maxValue}, and snapping to the nearest
     * {@link increment} if set
     * @param {Number} value The new value
     * @param {Number} animationDuration Animation duration, 0 for no animation
     * @param {Boolean} moveThumb Whether or not to move the thumb as well. Defaults to true
     * @return {Ext.form.Slider} this This Slider
     */
    setValue: function(value, animationDuration, moveThumb) {
        if (typeof moveThumb == 'undefined') {
            moveThumb = true;
        }

        moveThumb = !!moveThumb;

        //TODO: this should accept a second argument referencing which thumb to move
        var thumb    = this.getThumb(),
            oldValue = thumb.getValue(),
            newValue = this.constrain(value);

        if (this.fireEvent('beforechange', this, thumb, newValue, oldValue) !== false) {
            if (moveThumb) {
                this.moveThumb(thumb, this.getPixelValue(newValue, thumb), animationDuration);
            }

            thumb.setValue(newValue);
            this.doComponentLayout();

            this.fireEvent('change', this, thumb, newValue, oldValue);
        }

        return this;
    },

    /**
     * @private
     * Takes a desired value of a thumb and returns the nearest snap value. e.g if minValue = 0, maxValue = 100, increment = 10 and we
     * pass a value of 67 here, the returned value will be 70. The returned number is constrained within {@link minValue} and {@link maxValue},
     * so in the above example 68 would be returned if {@link maxValue} was set to 68.
     * @param {Number} value The value to snap
     * @return {Number} The snapped value
     */
    constrain: function(value) {
        var remainder = value % this.increment;

        value -= remainder;

        if (Math.abs(remainder) >= (this.increment / 2)) {
            value += (remainder > 0) ? this.increment : -this.increment;
        }

        value = Math.max(this.minValue, value);
        value = Math.min(this.maxValue, value);

        return value;
    },

    /**
     * Returns the current value of the Slider's thumb
     * @return {Number} The thumb value
     */
    getValue: function() {
        //TODO: should return values from multiple thumbs
        return this.getThumb().getValue();
    },

    /**
     * Returns the Thumb instance bound to this Slider
     * @return {Ext.form.Slider.Thumb} The thumb instance
     */
    getThumb: function() {
        //TODO: This function is implemented this way to make the addition of multi-thumb support simpler. This function
        //should be updated to accept a thumb index
        return this.thumbs[0];
    },

    /**
     * @private
     * Maps a pixel value to a slider value. If we have a slider that is 200px wide, where minValue is 100 and maxValue is 500,
     * passing a pixelValue of 38 will return a mapped value of 176
     * @param {Number} pixelValue The pixel value, relative to the left edge of the slider
     * @return {Number} The value based on slider units
     */
    getSliderValue: function(pixelValue, thumb) {
        var trackWidth = thumb.dragObj.offsetBoundary.right,
            range = this.maxValue - this.minValue,
            ratio;

        this.trackWidth = (trackWidth > 0) ? trackWidth : this.trackWidth;
        ratio = range / this.trackWidth;

        return this.minValue + (ratio * (pixelValue));
    },

    /**
     * @private
     * might represent), this returns the pixel on the rendered slider that the thumb should be positioned at
     * @param {Number} value The internal slider value
     * @return {Number} The pixel value, rounded and relative to the left edge of the scroller
     */
    getPixelValue: function(value, thumb) {
        var trackWidth = thumb.dragObj.offsetBoundary.right,
            range = this.maxValue - this.minValue,
            ratio;

        this.trackWidth = (trackWidth > 0) ? trackWidth : this.trackWidth;
        ratio = this.trackWidth / range;

        return (ratio * (value - this.minValue));
    },

    /**
     * @private
     * Creates an Ext.form.Slider.Thumb instance for each configured {@link values value}. Assumes that this.el is already present
     */
    renderThumbs: function() {
        var thumbs = this.thumbs,
            length = thumbs.length,
            i;

        for (i = 0; i < length; i++) {
            thumbs[i].render(this.fieldEl);
        }
    },

    /**
     * @private
     * Updates a thumb after it has been dragged
     */
    onThumbDragEnd: function(draggable) {
        var value = this.getThumbValue(draggable);

        this.setValue(value);
        this.fireEvent('dragend', this, draggable.thumb, this.constrain(value));
    },

    /**
     * @private
     * Get the value for a draggable thumb.
     */
    getThumbValue: function(draggable) {
        var thumb = draggable.thumb;

        return this.getSliderValue(-draggable.getOffset().x, thumb);
    },

    /**
     * @private
     * Fires drag events so the user can interact.
     */
    onDrag: function(draggable){
        var value = this.getThumbValue(draggable);
        this.fireEvent('drag', this, draggable.thumb, this.constrain(value));
    },

    /**
     * @private
     * Updates the value of the nearest thumb on tap events
     */
    onTap: function(e) {
        if (!this.disabled) {
            var sliderBox = this.fieldEl.getPageBox(),
                leftOffset = e.pageX - sliderBox.left,
                thumb = this.getNearest(leftOffset),
                halfThumbWidth = thumb.dragObj.size.width / 2;

            this.setValue(this.getSliderValue(leftOffset - halfThumbWidth, thumb), this.animationDuration, true);
        }
    },

    /**
     * @private
     * Moves the thumb element. Should only ever need to be called from within {@link setValue}
     * @param {Ext.form.Slider.Thumb} thumb The thumb to move
     * @param {Number} pixel The pixel the thumb should be centered on
     * @param {Boolean} animationDuration True to animationDuration the movement
     */
    moveThumb: function(thumb, pixel, animationDuration) {
        thumb.dragObj.setOffset(new Ext.util.Offset(pixel, 0), animationDuration);
    },

    // inherit docs
    afterRender: function(ct) {
        var me = this;

        me.renderThumbs();

        Ext.form.Slider.superclass.afterRender.apply(me, arguments);

        me.fieldEl.on({
            scope: me,
            tap  : me.onTap
        });
    },

    /**
     * @private
     * Finds and returns the nearest {@link Ext.form.Slider.Thumb thumb} to the given value.
     * @param {Number} value The value
     * @return {Ext.form.Slider.Thumb} The nearest thumb
     */
    getNearest: function(value) {
        //TODO: Implemented this way to enable multi-thumb support later
        return this.thumbs[0];
    },

    /**
     * @private
     * Loops through each of the sliders {@link #thumbs} and calls disable/enable on each of them depending
     * on the param specified.
     * @param {Boolean} disable True to disable, false to enable
     */
    setThumbsDisabled: function(disable) {
        var thumbs = this.thumbs,
            ln     = thumbs.length,
            i      = 0;

        for (; i < ln; i++) {
            thumbs[i].dragObj[disable ? 'disable' : 'enable']();
        }
    },

    /**
     * Disables the slider by calling the internal {@link #setThumbsDisabled} method
     */
    disable: function() {
        Ext.form.Slider.superclass.disable.call(this);
        this.setThumbsDisabled(true);
    },

    /**
     * Enables the slider by calling the internal {@link #setThumbsDisabled} method.
     */
    enable: function() {
        Ext.form.Slider.superclass.enable.call(this);
        this.setThumbsDisabled(false);
    }
});

Ext.reg('sliderfield', Ext.form.Slider);

//<deprecated since=1.0>
Ext.reg('slider', Ext.form.Slider);
//</deprecated>
/**
 * @class Ext.form.Slider.Thumb
 * @extends Ext.form.Field
 * @xtype sliderthumb
 * @xtype thumb
 * @ignore
 * Utility class used by Ext.form.Slider - should never need to be used directly.
 */
Ext.form.Slider.Thumb = Ext.extend(Ext.form.Field, {
    isField: false,
    baseCls: 'x-thumb',
    autoCreateField: false,
    draggable: true,

    /**
     * @cfg {Number} value The value to initialize this thumb with (defaults to 0)
     */
    value: 0,

    /**
     * @cfg {Ext.form.Slider} slider The Slider that this thumb is attached to. Required
     */

    // inherit docs
    onRender: function() {
        this.draggable = {
            direction: 'horizontal',
            constrain: this.slider.fieldEl,
            revert: false,
            thumb: this
        };

        Ext.form.Slider.Thumb.superclass.onRender.apply(this, arguments);
    },

    // inherit docs
    setValue: function(newValue) {
        this.value = newValue;

        return this;
    },

    // inherit docs
    getValue: function() {
        return this.value;
    }
});

Ext.reg('sliderthumb', Ext.form.Slider.Thumb);

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('thumb', Ext.form.Slider.Thumb);
//</deprecated>
