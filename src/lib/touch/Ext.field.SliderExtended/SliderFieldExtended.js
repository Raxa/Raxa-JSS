
Ext.define('Ext.field.SliderExtended', {
  extend  : 'Ext.field.Field',
  xtype   : 'sliderfieldextended',
  requires: [
    'Ext.slider.Slider'
  ],
  alternateClassName: 'Ext.form.SliderExtended',

  config: {
    cls: Ext.baseCSSPrefix + 'slider-field-extended',
    tabIndex: -1,
    helperPosition: 'right'
  },

  proxyConfig: {
    value: 0,
    minValue: 0,
    maxValue: 100,
    increment: 1
  },

  constructor: function(config) {
    config = config || {};

    if (config.hasOwnProperty('values')) {
      config.value = config.values;
    }

    this.callParent([config]);
  },
  
  initialize: function() {
    this.callParent();
    
    this.getComponent().on({
      scope: this,
      change: 'onSliderChange',
      dragstart: 'onSliderDragStart',
      drag: 'onSliderDrag',
      dragend: 'onSliderDragEnd'
    });
  },

  getElementConfig: function() {
    var self = this;
    var originalConfig = self.callParent();

    originalConfig.children[1].children = [{
      reference: 'helper',
      tag: 'div',
      cls: Ext.baseCSSPrefix + 'slider-helper',
      children: [
      {
        reference: 'helperInput',
        tag: 'input',
        type: 'number',
        cls: Ext.baseCSSPrefix + 'slider-helper-input'
      }
      ]
    }];

    return originalConfig;
  },
  
  setHelperValue: function(value) {
    var value = value;
    this.helperInput.dom.value = value;
  },
  
  // @private
  applyComponent: function(config) {
    var self = this;
    self.helper.setStyle('float', self.config.helperPosition);
    var changeValue = function(e) {
      var keycode = e.which || window.event.keyCode;
      if( [8, 9, 13, 37, 38, 39, 40, 46].indexOf(Number(keycode)) !== -1 ) return true;
      var helperInputValue = Number(self.helperInput.getValue());
      if(helperInputValue < self.config.minValue || isNaN(helperInputValue))
      helperInputValue = self.config.minValue;
      else if(helperInputValue > self.config.maxValue)
      helperInputValue = self.config.maxValue;
      this.value = helperInputValue;
      self.setValue(helperInputValue);
    };
    self.helperInput.dom.onkeydown = function(e) {
      var keycode = e.which || window.event.keyCode;
      if( [8, 9, 13, 37, 38, 39, 40, 46, 190].indexOf(Number(keycode)) !== -1 ) return true;
      if( keycode > 57 || keycode < 48 ) return false;
    };
    self.helperInput.dom.onchange = changeValue;
    self.helperInput.dom.onclick = changeValue;
    self.helperInput.dom.onkeyup = changeValue;
    self.setHelperValue(self.config.value);
    return Ext.factory(config, Ext.slider.Slider);
  },

  onSliderChange: function(me, thumb, newValue, oldValue) {
    this.setHelperValue(newValue);
    this.fireEvent('change', this, thumb, newValue, oldValue);
  },

  onSliderDragStart: function(me, thumb, newValue, oldValue) {
    this.fireEvent('dragstart', this, thumb, newValue, oldValue);
  },

  onSliderDrag: function(me, thumb, newValue, oldValue) {
    this.setHelperValue(newValue);
    this.fireEvent('drag', this, thumb, newValue, oldValue);
  },

  onSliderDragEnd: function(me, thumb, newValue, oldValue) {
    this.fireEvent('dragend', this, thumb, newValue, oldValue);
  },

  /**
   * Convience method. Calls {@link #setValue}
   */
  setValues: function(value) {
    this.setValue(value);
  },

  /**
   * Convience method. Calls {@link #getValue}
   */
  getValues: function() {
    return this.getValue();
  },

  reset: function() {
    var config = this.config,
      initialValue = (this.config.hasOwnProperty('values')) ? config.values : config.value;

    this.setValue(initialValue);
  },

  doSetDisabled: function(disabled) {
    this.callParent(arguments);

    this.getComponent().setDisabled(disabled);
  }
});
