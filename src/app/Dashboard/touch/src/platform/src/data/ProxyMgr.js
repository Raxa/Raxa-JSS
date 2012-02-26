/**
 * @author Ed Spencer
 * @class Ext.data.ProxyMgr
 * @extends Ext.AbstractManager
 * @singleton
 * @ignore
 */
Ext.data.ProxyMgr = new Ext.AbstractManager({
    create: function(config) {
        if (config == undefined || typeof config == 'string') {
            config = {
                type: config
            };
        }

        if (!(config instanceof Ext.data.Proxy)) {
            Ext.applyIf(config, {
                type : this.defaultProxyType,
                model: this.model
            });

            var type = config[this.typeName] || config.type,
                Constructor = this.types[type];

            if (Constructor == undefined) {
                throw new Error(Ext.util.Format.format("The '{0}' type has not been registered with this manager", type));
            }

            return new Constructor(config);
        } else {
            return config;
        }
    }
});