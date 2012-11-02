
// url : http://www.sencha.com/forum/showthread.php?193512-Slider-unexpected-behaviour-when-using-minValue-maxValue
Ext.define('Override.slider.Slider', {
    override : 'Ext.slider.Slider',

    onThumbDrag : function (thumb, e, offsetX) {
        var index = this.getThumbIndex(thumb),
        offsetValueRatio = this.offsetValueRatio,
        constrainedValue = this.constrainValue(this.getMinValue() + offsetX / offsetValueRatio);

        e.stopPropagation();

        this.setIndexValue(index, constrainedValue);

        this.fireEvent('drag', this, thumb, this.getValue(), e);

        return false;
    },

    setIndexValue : function (index, value, animation) {
        var thumb = this.getThumb(index),
        values = this.getValue(),
        offsetValueRatio = this.offsetValueRatio,
        draggable = thumb.getDraggable();

        draggable.setOffset((value - this.getMinValue()) * offsetValueRatio, null, animation);

        values[index] = value;
    },

    onTap : function (e) {
        if (this.isDisabled()) {
            return;
        }

        var targetElement = Ext.get(e.target);

        if (!targetElement || targetElement.hasCls('x-thumb')) {
            return;
        }

        var touchPointX = e.touch.point.x,
        element = this.element,
        elementX = element.getX(),
        offset = touchPointX - elementX - (this.thumbWidth / 2),
        value = this.constrainValue(this.getMinValue() + offset / this.offsetValueRatio),
        values = this.getValue(),
        minDistance = Infinity,
        ln = values.length,
        i, absDistance, testValue, closestIndex, oldValue, thumb;

        if (ln === 1) {
            closestIndex = 0;
        }
        else {
            for (i = 0; i < ln; i++) {
                testValue = values[i];
                absDistance = Math.abs(testValue - value);

                if (absDistance < minDistance) {
                    minDistance = absDistance;
                    closestIndex = i;
                }
            }
        }

        oldValue = values[closestIndex];
        thumb = this.getThumb(closestIndex);

        this.setIndexValue(closestIndex, value, this.getAnimation());
        this.refreshThumbConstraints(thumb);

        if (oldValue !== value) {
            this.fireEvent('change', this, thumb, value, oldValue);
        }
    },

    updateValue : function (newValue, oldValue) {
        var thumbs = this.getThumbs(),
        ln = newValue.length,
        minValue = this.getMinValue(),
        offset = this.offsetValueRatio,
        i;

        this.setThumbsCount(ln);

        for (i = 0; i < ln; i++) {
            thumbs[i].getDraggable().setExtraConstraint(null).setOffset((newValue[i] - minValue) * offset);
        }

        for (i = 0; i < ln; i++) {
            this.refreshThumbConstraints(thumbs[i]);
        }
    }
});