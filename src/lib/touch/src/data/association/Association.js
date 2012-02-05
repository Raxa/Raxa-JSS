/**
 * @author Ed Spencer
 * @class Ext.data.association.Association
 * @extends Object
 *
 * <p>Associations enable you to express relationships between different {@link Ext.data.Model Models}. Let's say we're
 * writing an ecommerce system where Users can make Orders - there's a relationship between these Models that we can
 * express like this:</p>
 *
<pre><code>
Ext.define('User', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['id', 'name', 'email'],
        hasMany: {model: 'Order', name: 'orders'}
    }
});

Ext.define('Order', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['id', 'user_id', 'status', 'price'],
        belongsTo: 'User'
    }
});
</code></pre>
 *
 * <p>We've set up two models - User and Order - and told them about each other. You can set up as many associations on
 * each Model as you need using the two default types - {@link Ext.data.association.HasMany hasMany} and
 * {@link Ext.data.association.BelongsTo belongsTo}. There's much more detail on the usage of each of those inside their
 * documentation pages. If you're not familiar with Models already, {@link Ext.data.Model there is plenty on those too}.</p>
 *
 * <p><u>Further Reading</u></p>
 *
 * <ul style="list-style-type: disc; padding-left: 20px;">
 *   <li>{@link Ext.data.association.HasMany hasMany associations}</li>
 *   <li>{@link Ext.data.association.BelongsTo belongsTo associations}</li>
 *   <li>{@link Ext.data.association.HasOne hasOne associations}</li>
 *   <li>{@link Ext.data.Model using Models}</li>
 * </ul>
 *
 * <b>Self association models</b>
 * <p>We can also have models that create parent/child associations between the same type. Below is an example, where
 * groups can be nested inside other groups:</p>
 * <pre><code>

// Server Data
{
    "groups": {
        "id": 10,
        "parent_id": 100,
        "name": "Main Group",
        "parent_group": {
            "id": 100,
            "parent_id": null,
            "name": "Parent Group"
        },
        "child_groups": [{
            "id": 2,
            "parent_id": 10,
            "name": "Child Group 1"
        },{
            "id": 3,
            "parent_id": 10,
            "name": "Child Group 2"
        },{
            "id": 4,
            "parent_id": 10,
            "name": "Child Group 3"
        }]
    }
}

// Client code
Ext.define('Group', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['id', 'parent_id', 'name'],
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                root: 'groups'
            }
        },
        associations: [{
            type: 'hasMany',
            model: 'Group',
            primaryKey: 'id',
            foreignKey: 'parent_id',
            autoLoad: true,
            associationKey: 'child_groups' // read child data from child_groups
        }, {
            type: 'belongsTo',
            model: 'Group',
            primaryKey: 'id',
            foreignKey: 'parent_id',
            associationKey: 'parent_group' // read parent data from parent_group
        }]
    }
});


Ext.onReady(function(){

    Group.load(10, {
        success: function(group){
            console.log(group.getGroup().get('name'));

            group.groups().each(function(rec){
                console.log(rec.get('name'));
            });
        }
    });

});
 * </code></pre>
 *
 */
Ext.define('Ext.data.association.Association', {
    alternateClassName: 'Ext.data.Association',

    requires: ['Ext.data.ModelManager'],

    config: {
        /**
         * @cfg {String} ownerModel The string name of the model that owns the association. Required
         */
        ownerModel: null,

        ownerName: undefined,

        /**
         * @cfg {String} associatedModel The string name of the model that is being associated with. Required
         */
        associatedModel: null,

        associatedName: undefined,


        /**
         * @cfg {String} associationKey The name of the property in the data to read the association from.
         * Defaults to the name of the associated model.
         */
        associationKey: undefined,

        /**
         * @cfg {String} primaryKey The name of the primary key on the associated model. Defaults to 'id'.
         * In general this will be the {@link Ext.data.Model#idProperty} of the Model.
         */
        primaryKey: 'id',

        /**
         * @cfg {Ext.data.reader.Reader} reader A special reader to read associated data
         */
        reader: null,

        /**
         * @cfg {String} type The type configuration can be used when creating associations using a configuration object.
         * Use 'hasMany' to create a HasMany association
         * <pre><code>
    associations: [{
        type: 'hasMany',
        model: 'User'
    }]
         * </code></pre>
         */
        type: null,

        name: undefined
    },

    statics: {
        create: function(association) {
            if (!association.isAssociation) {
                if (Ext.isString(association)) {
                    association = {
                        type: association
                    };
                }

                switch (association.type) {
                    case 'belongsTo':
                        return Ext.create('Ext.data.association.BelongsTo', association);
                    case 'hasMany':
                        return Ext.create('Ext.data.association.HasMany', association);
                    case 'hasOne':
                        return Ext.create('Ext.data.association.HasOne', association);
                    default:
                        //<debug>
                        Ext.Logger.error('Unknown Association type: "' + association.type + '"');
                        //</debug>
                }
            }

            return association;
        }
    },

    /**
     * Creates the Association object.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        this.initConfig(config);
    },

    applyName: function(name) {
        if (!name) {
            name = this.getAssociatedName();
        }
        return name;
    },

    applyOwnerModel: function(ownerName) {
        var ownerModel = Ext.data.ModelManager.getModel(ownerName);
        if (ownerModel === undefined) {
            Ext.Logger.error('The configured ownerModel was not valid (you tried ' + ownerName + ')');
        }
        return ownerModel;
    },

    applyOwnerName: function(ownerName) {
        if (!ownerName) {
            ownerName = this.getOwnerModel().modelName;
        }
        ownerName = ownerName.slice(ownerName.lastIndexOf('.')+1);
        return ownerName;
    },

    updateOwnerModel: function(ownerModel) {
        this.setOwnerName(ownerModel.modelName);
    },

    applyAssociatedModel: function(associatedName) {
        var associatedModel = Ext.data.ModelManager.types[associatedName];
        if (associatedModel === undefined) {
            Ext.Logger.error('The configured associatedModel was not valid (you tried ' + associatedName + ')');
        }
        return associatedModel;
    },

    applyAssociatedName: function(associatedName) {
        if (!associatedName) {
            associatedName = this.getAssociatedModel().modelName;
        }
        associatedName = associatedName.slice(associatedName.lastIndexOf('.')+1);
        return associatedName;
    },

    updateAssociatedModel: function(associatedModel) {
        this.setAssociatedName(associatedModel.modelName);
    },

    applyReader: function(reader) {
        if (reader) {
            if (Ext.isString(reader)) {
                reader = {
                    type: reader
                };
            }

            if (!reader.isReader) {
                Ext.applyIf(reader, {
                    type: 'json'
                });
            }
        }

        return Ext.factory(reader, Ext.data.Reader, this.getReader(), 'reader');
    },

    updateReader: function(reader) {
        reader.setModel(this.getAssociatedModel());
    }
});
