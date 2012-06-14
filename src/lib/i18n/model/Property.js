/**
  * Returns ExtJS4 or Sencha Touch 2 model config
  */
var platformizeModelConfig = function(extJsModelConfig) {
    if(Ext.versions.extjs) {
        return extJsModelConfig; // nothing to change, we are on ext
    } else if(Ext.versions.touch) {
        // transform to Sencha Touch 2 data model
        var config = {
            extend: extJsModelConfig.extend,
            config: extJsModelConfig
        };
        delete config.config.extend;
        return config;
    } else {
        Ext.Error.raise('Could not recognize Library');
    }
};

genericConfig = {
    extend: 'Ext.data.Model',
    idProperty: 'key',
    fields: ['key', 'value']
};

Ext.define('Ext.i18n.model.Property', platformizeModelConfig(genericConfig));