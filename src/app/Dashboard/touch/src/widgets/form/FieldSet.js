/**
 * @class Ext.form.FieldSet
 * @extends Ext.Container
 * <p>Simple FieldSet, can contain fields as items. FieldSets do not add any behavior, other than an optional title, and
 * are just used to group similar fields together. Example usage (within a form):</p>
<pre><code>
new Ext.form.FormPanel({
    items: [
        {
            xtype: 'fieldset',
            title: 'About Me',
            items: [
                {
                    xtype: 'textfield',
                    name : 'firstName',
                    label: 'First Name'
                },
                {
                    xtype: 'textfield',
                    name : 'lastName',
                    label: 'Last Name'
                }
            ]
        }
    ]
});
</code></pre>
 * @xtype fieldset
 */
Ext.form.FieldSet = Ext.extend(Ext.Panel, {
    componentCls: 'x-form-fieldset',

    // @private
    initComponent : function() {
        this.componentLayout = this.getLayout();
        Ext.form.FieldSet.superclass.initComponent.call(this);
    },
    

    /**
     * @cfg {String} title Optional fieldset title, rendered just above the grouped fields
     */

    /**
     * @cfg {String} instructions Optional fieldset instructions, rendered just below the grouped fields
     */

    // @private
    afterLayout : function(layout) {
        Ext.form.FieldSet.superclass.afterLayout.call(this, layout);
        
        if (this.title && !this.titleEl) {
            this.setTitle(this.title);
        } else if (this.titleEl) {
            this.el.insertFirst(this.titleEl);
        }

        if (this.instructions && !this.instructionsEl) {
            this.setInstructions(this.instructions);
        } else if (this.instructionsEl) {
            this.el.appendChild(this.instructionsEl);
        }
    },
    
    /**
     * Sets the title of the current fieldset.
     * @param {String} title The new title
     * @return {Ext.form.FieldSet} this 
     */
    setTitle: function(title){
        if (this.rendered) {
            if (!this.titleEl) {
                this.titleEl = this.el.insertFirst({
                    cls: this.componentCls + '-title'
                });
            }
            this.titleEl.setHTML(title);
        } else {
            this.title = title;
        }
        return this;
    },
    
    /**
     * Sets the instructions of the current fieldset.
     * @param {String} instructions The new instructions
     * @return {Ext.form.FieldSet} this 
     */
    setInstructions: function(instructions){
        if (this.rendered) {
            if (!this.instructionsEl) {
                this.instructionsEl = this.el.createChild({
                    cls: this.componentCls + '-instructions'
                });
            }
            this.instructionsEl.setHTML(instructions);
        } else {
            this.instructions = instructions;
        }
        return this;
    }
});

Ext.reg('fieldset', Ext.form.FieldSet);